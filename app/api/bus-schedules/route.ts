import { NextRequest, NextResponse } from 'next/server'
import { 
  getScheduleForStop, 
  getStop, 
  isGtfsAvailable,
  getStopsWithRoutes 
} from '@/lib/transit/gtfsService'

/**
 * Bus Schedules API
 * Combines GTFS static schedules (authoritative) with real-time predictions (when available)
 * 
 * Query params:
 * - stopId: Stop ID (required)
 * - route: Route ID (optional filter)
 * - date: Date in YYYY-MM-DD format (default: today)
 * - includeRealtime: Include real-time predictions (default: true)
 */

interface BusPrediction {
  rt: string
  rtdir: string
  des: string
  prdctdn: string
  prdtm: string
  dly?: boolean
  stpid: string
  stpnm: string
  vid?: string
}

interface ScheduleEntry {
  route: string
  routeName: string
  destination: string
  scheduledTime: string
  scheduledMinutes?: number
  realtimeMinutes?: number
  realtimeArrival?: string
  isDelayed?: boolean
  vehicleId?: string | null
  source: 'schedule' | 'realtime' | 'both'
}

/**
 * Get bus schedules with optional real-time predictions overlay
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const stopId = searchParams.get('stopId')
  const route = searchParams.get('route')
  const dateParam = searchParams.get('date')
  const includeRealtime = searchParams.get('includeRealtime') !== 'false'

  if (!stopId) {
    return NextResponse.json(
      { error: 'Stop ID is required' },
      { status: 400 }
    )
  }

  try {
    // Parse date (default to today)
    let date: Date
    if (dateParam) {
      date = new Date(dateParam)
      if (isNaN(date.getTime())) {
        return NextResponse.json(
          { error: 'Invalid date format. Use YYYY-MM-DD' },
          { status: 400 }
        )
      }
    } else {
      date = new Date()
    }

    // Check if GTFS is available
    const gtfsAvailable = isGtfsAvailable()
    
    let scheduleEntries: ScheduleEntry[] = []
    let stopInfo = null

    if (gtfsAvailable) {
      // Get stop info
      const stop = getStop(stopId)
      if (!stop) {
        return NextResponse.json(
          { 
            error: 'Stop not found',
            stopId,
            message: 'Please verify the stop ID is correct. You can search for stops at /api/transit/stops?q=searchterm'
          },
          { status: 404 }
        )
      }

      stopInfo = {
        id: stop.stop_id,
        name: stop.stop_name,
        code: stop.stop_code,
        lat: stop.stop_lat,
        lon: stop.stop_lon
      }

      // Get GTFS schedule
      const schedule = getScheduleForStop(stopId, date, route || undefined)
      
      // Convert to ScheduleEntry format
      scheduleEntries = schedule.map(s => {
        // Parse time (HH:MM:SS format)
        if (!s.arrivalTime) {
          return {
            route: s.routeId,
            routeName: s.routeName,
            destination: s.headsign || 'Unknown',
            scheduledTime: '',
            source: 'schedule' as const
          }
        }
        const timeParts = s.arrivalTime.split(':')
        if (timeParts.length < 2) {
          return {
            route: s.routeId,
            routeName: s.routeName,
            destination: s.headsign || 'Unknown',
            scheduledTime: s.arrivalTime,
            source: 'schedule' as const
          }
        }
        const [hours, minutes] = timeParts.map(Number)
        const scheduledDate = new Date(date.getTime())
        scheduledDate.setHours(hours, minutes, 0, 0)
        
        // Calculate minutes until arrival
        const now = new Date()
        const minutesUntil = Math.round((scheduledDate.getTime() - now.getTime()) / 60000)
        
        return {
          route: s.routeId,
          routeName: s.routeName,
          destination: s.headsign || 'Unknown',
          scheduledTime: s.arrivalTime,
          scheduledMinutes: minutesUntil,
          source: 'schedule' as const
        }
      })

      // Filter to upcoming times only (next 2 hours)
      const twoHoursFromNow = new Date()
      twoHoursFromNow.setHours(twoHoursFromNow.getHours() + 2)
      
      scheduleEntries = scheduleEntries.filter(entry => {
        const entryTime = new Date(date)
        const [hours, minutes] = entry.scheduledTime.split(':').map(Number)
        entryTime.setHours(hours, minutes, 0, 0)
        return entryTime >= new Date() && entryTime <= twoHoursFromNow
      })

      // Sort by scheduled time
      scheduleEntries.sort((a, b) => {
        const timeA = a.scheduledTime
        const timeB = b.scheduledTime
        return timeA.localeCompare(timeB)
      })
    }

    // Overlay real-time predictions if requested and available
    // ALWAYS try real-time if schedule is empty (serverless fallback)
    let realtimePredictions: any[] = []
    let realtimeSource = 'none'
    let realtimeError: string | null = null

    if (includeRealtime || scheduleEntries.length === 0) {
      try {
        realtimePredictions = await fetchRealtimePredictions(stopId, route || undefined)
        realtimeSource = realtimePredictions.length > 0 ? 'api' : 'empty'
        if (realtimePredictions.length === 0) {
          realtimeError = 'No real-time predictions available for this stop at this time.'
        }
      } catch (error: any) {
        console.error('Real-time API error:', error)
        realtimeSource = 'error'
        realtimeError = error.message || 'Real-time API unavailable'
      }
    }

    // Merge real-time with schedule
    if (realtimePredictions.length > 0 && scheduleEntries.length > 0) {
      // Create a map of route+destination to merge
      const scheduleMap = new Map<string, ScheduleEntry>()
      
      scheduleEntries.forEach(entry => {
        const key = `${entry.route}-${entry.destination}`
        if (!scheduleMap.has(key) || 
            (entry.scheduledMinutes !== undefined && entry.scheduledMinutes >= 0)) {
          scheduleMap.set(key, entry)
        }
      })

      // Overlay real-time data
      realtimePredictions.forEach((pred: any) => {
        const key = `${pred.route}-${pred.destination}`
        const scheduleEntry = scheduleMap.get(key)
        
        if (scheduleEntry) {
          // Update with real-time data
          scheduleEntry.realtimeMinutes = pred.minutes
          scheduleEntry.realtimeArrival = pred.arrivalTime
          scheduleEntry.isDelayed = pred.isDelayed
          scheduleEntry.vehicleId = pred.vehicleId
          scheduleEntry.source = 'both'
        } else {
          // Real-time only (not in schedule for today)
          scheduleMap.set(key, {
            route: pred.route,
            routeName: pred.routeName,
            destination: pred.destination,
            scheduledTime: '',
            realtimeMinutes: pred.minutes,
            realtimeArrival: pred.arrivalTime,
            isDelayed: pred.isDelayed,
            vehicleId: pred.vehicleId,
            source: 'realtime'
          })
        }
      })

      scheduleEntries = Array.from(scheduleMap.values())
      
      // Sort by real-time if available, otherwise scheduled
      scheduleEntries.sort((a, b) => {
        const timeA = a.realtimeMinutes ?? a.scheduledMinutes ?? 999
        const timeB = b.realtimeMinutes ?? b.scheduledMinutes ?? 999
        return timeA - timeB
      })
    } else if (realtimePredictions.length > 0 && scheduleEntries.length === 0) {
      // Real-time only (no GTFS schedule available - serverless fallback)
      scheduleEntries = realtimePredictions.map((pred: any) => ({
        route: pred.route,
        routeName: pred.routeName,
        destination: pred.destination,
        scheduledTime: '',
        realtimeMinutes: pred.minutes,
        realtimeArrival: pred.arrivalTime,
        isDelayed: pred.isDelayed,
        vehicleId: pred.vehicleId,
        source: 'realtime'
      }))
    } else if (scheduleEntries.length === 0 && realtimePredictions.length === 0) {
      // No data available from either source
      // This could mean:
      // 1. Stop has no active routes at this time
      // 2. Real-time API is down
      // 3. GTFS schedule not available (serverless) and no real-time data
      console.warn(`No schedule or real-time data for stop ${stopId}`)
    }

    // Build helpful message
    let message = ''
    if (scheduleEntries.length === 0) {
      if (!gtfsAvailable && realtimeSource === 'error') {
        message = 'GTFS schedule data not available in serverless environment. Real-time API error: ' + (realtimeError || 'Unknown error')
      } else if (!gtfsAvailable && realtimeSource === 'empty') {
        message = 'GTFS schedule data not available in serverless environment. No real-time predictions available for this stop at this time. This stop may not have active routes currently, or the stop ID may be incorrect.'
      } else if (!gtfsAvailable) {
        message = 'GTFS schedule data not available in serverless environment. Using real-time predictions only.'
      } else if (realtimeSource === 'empty' || realtimeSource === 'error') {
        message = 'No bus predictions available. This stop may not have active routes at this time, or the stop ID may be incorrect.'
      } else {
        message = 'No bus predictions available. This stop may not have active routes at this time.'
      }
    } else if (gtfsAvailable) {
      message = 'Schedule data from GTFS (authoritative). Real-time predictions overlaid when available.'
    } else {
      message = 'Real-time predictions only (GTFS schedule not available in serverless).'
    }

    return NextResponse.json({
      predictions: scheduleEntries,
      stop: stopInfo,
      source: gtfsAvailable ? 'gtfs' : (realtimePredictions.length > 0 ? 'realtime-only' : 'none'),
      realtimeSource,
      realtimeError,
      date: date.toISOString().slice(0, 10),
      route: route || null,
      count: scheduleEntries.length,
      timestamp: new Date().toISOString(),
      message,
      debug: {
        gtfsAvailable,
        scheduleCount: scheduleEntries.length,
        realtimeCount: realtimePredictions.length,
        realtimeSource
      }
    })
  } catch (error: any) {
    console.error('Bus schedules API error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch bus schedules',
        message: error.message,
        predictions: [],
        source: 'error'
      },
      { status: 500 }
    )
  }
}

/**
 * Fetch real-time predictions from Port Authority API
 */
async function fetchRealtimePredictions(
  stopId: string,
  route?: string
): Promise<any[]> {
  const apiKey = process.env.PORT_AUTHORITY_API_KEY
  
  // Check if API key is configured
  if (!apiKey || apiKey === 'demo' || apiKey.trim() === '') {
    console.warn('Port Authority API key not configured. Real-time predictions unavailable.')
    throw new Error('Port Authority API key not configured. Please set PORT_AUTHORITY_API_KEY environment variable. Visit https://www.portauthority.org/developer-resources/ to register for an API key.')
  }
  
  const apiUrl = new URL('https://realtime.portauthority.org/bustime/api/v3/getpredictions')
  
  apiUrl.searchParams.set('key', apiKey)
  apiUrl.searchParams.set('stpid', stopId)
  apiUrl.searchParams.set('format', 'json')
  
  if (route) {
    apiUrl.searchParams.set('rt', route)
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

  try {
    const response = await fetch(apiUrl.toString(), {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'PittsburghEverything/1.0'
      },
      next: { revalidate: 30 },
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    
    if (data['bustime-response']?.error) {
      const errorMsg = data['bustime-response'].error[0]?.msg || 'Unknown error'
      console.warn(`Port Authority API error for stop ${stopId}:`, errorMsg)
      
      // If it's an API key error, throw so we can show a helpful message
      if (errorMsg.includes('API access key') || errorMsg.includes('Invalid API')) {
        throw new Error('Port Authority API key is invalid or missing. Please set PORT_AUTHORITY_API_KEY environment variable.')
      }
      
      // For other errors, return empty array so schedule can still be shown
      return []
    }
    
    const predictions = data['bustime-response']?.prd || []

    if (predictions.length === 0) {
      console.log(`No real-time predictions for stop ${stopId}`)
    }

    return predictions.map((pred: BusPrediction) => ({
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
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.log('Real-time API timeout')
    }
    return []
  }
}
