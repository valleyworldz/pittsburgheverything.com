import { NextRequest, NextResponse } from 'next/server'

/**
 * Port Authority of Allegheny County Bus Schedules API
 * Real-time bus arrival predictions and route information
 * Free public API - no API key required
 */

interface BusPrediction {
  rt: string // Route number
  rtdir: string // Route direction
  des: string // Destination
  prdctdn: string // Prediction countdown (minutes)
  prdtm: string // Predicted arrival time
  dly?: boolean // Delay flag
  stpid: string // Stop ID
  stpnm: string // Stop name
  vid?: string // Vehicle ID
}

interface BusRoute {
  rt: string // Route number
  rtnm: string // Route name
  rtclr?: string // Route color
}

interface BusStop {
  stpid: string // Stop ID
  stpnm: string // Stop name
  lat: number
  lon: number
  routes?: string[] // Routes serving this stop
}

/**
 * Get real-time bus predictions for a specific stop
 * Uses Port Authority real-time API
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const stopId = searchParams.get('stopId')
  const route = searchParams.get('route')

  if (!stopId) {
    return NextResponse.json(
      { error: 'Stop ID is required' },
      { status: 400 }
    )
  }

  try {

    // Port Authority Real-Time API
    // Documentation: https://realtime.portauthority.org/bustime/api/v3/
    // Note: The API may require a valid API key for production use
    // For now, we'll use the demo endpoint
    const apiUrl = new URL('https://realtime.portauthority.org/bustime/api/v3/getpredictions')
    
    // Port Authority API typically requires an API key
    // Using demo key - in production, this should be an environment variable
    apiUrl.searchParams.set('key', process.env.PORT_AUTHORITY_API_KEY || 'demo')
    apiUrl.searchParams.set('stpid', stopId)
    apiUrl.searchParams.set('format', 'json')
    
    if (route) {
      apiUrl.searchParams.set('rt', route)
    }

    // Create AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(apiUrl.toString(), {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'PittsburghEverything/1.0'
      },
      next: { revalidate: 30 }, // Cache for 30 seconds
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      console.error('Port Authority API error:', response.status, response.statusText, errorText)
      // Return mock data as fallback
      return NextResponse.json({
        predictions: getMockPredictions(stopId, route || undefined),
        source: 'mock',
        timestamp: new Date().toISOString(),
        message: 'Using sample data. API may require authentication or stop ID may be invalid.'
      })
    }

    const data = await response.json()
    
    // Check for API errors
    if (data['bustime-response']?.error) {
      const error = data['bustime-response'].error[0]
      console.error('Port Authority API error:', error)
      return NextResponse.json({
        predictions: getMockPredictions(stopId, route || undefined),
        source: 'mock',
        timestamp: new Date().toISOString(),
        message: error.msg || 'API returned an error. Using sample data.'
      })
    }
    
    const predictions = data['bustime-response']?.prd || []

    if (predictions.length === 0) {
      return NextResponse.json({
        predictions: getMockPredictions(stopId, route || undefined),
        source: 'mock',
        timestamp: new Date().toISOString(),
        message: 'No real-time predictions available. Showing sample data.'
      })
    }

    // Format predictions
    const formattedPredictions = predictions.map((pred: BusPrediction) => ({
      route: pred.rt,
      routeName: pred.rtdir || `Route ${pred.rt}`,
      destination: pred.des,
      minutes: pred.prdctdn ? parseInt(pred.prdctdn) : null,
      arrivalTime: pred.prdtm,
      isDelayed: pred.dly || false,
      stopId: pred.stpid,
      stopName: pred.stpnm,
      vehicleId: pred.vid
    }))

    return NextResponse.json({
      predictions: formattedPredictions,
      source: 'api',
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Bus schedules API error:', error)
    
    // Handle timeout or network errors
    if (error.name === 'AbortError' || error.name === 'TimeoutError') {
      return NextResponse.json({
        predictions: getMockPredictions(stopId, route || undefined),
        source: 'mock',
        timestamp: new Date().toISOString(),
        message: 'Request timed out. Using sample data.'
      })
    }
    
    return NextResponse.json(
      {
        error: 'Failed to fetch bus schedules',
        predictions: getMockPredictions(stopId, route || undefined),
        source: 'mock',
        timestamp: new Date().toISOString(),
        message: 'API unavailable. Using sample data.'
      },
      { status: 200 } // Return 200 with mock data instead of error
    )
  }
}

/**
 * Get popular bus stops in Pittsburgh
 */
function getMockPredictions(stopId: string, route?: string): any[] {
  const popularRoutes = ['61A', '61B', '61C', '61D', '71A', '71B', '71C', '71D', '28X', 'P1', 'P2', 'P3']
  const selectedRoute = route || popularRoutes[Math.floor(Math.random() * popularRoutes.length)]
  
  return [
    {
      route: selectedRoute,
      routeName: `Route ${selectedRoute}`,
      destination: 'Downtown',
      minutes: Math.floor(Math.random() * 15) + 2,
      arrivalTime: new Date(Date.now() + (Math.floor(Math.random() * 15) + 2) * 60000).toISOString(),
      isDelayed: Math.random() > 0.8,
      stopId: stopId,
      stopName: 'Pittsburgh Stop',
      vehicleId: null
    },
    {
      route: selectedRoute,
      routeName: `Route ${selectedRoute}`,
      destination: 'Downtown',
      minutes: Math.floor(Math.random() * 20) + 15,
      arrivalTime: new Date(Date.now() + (Math.floor(Math.random() * 20) + 15) * 60000).toISOString(),
      isDelayed: false,
      stopId: stopId,
      stopName: 'Pittsburgh Stop',
      vehicleId: null
    }
  ]
}

