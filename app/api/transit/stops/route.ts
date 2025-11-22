import { NextRequest, NextResponse } from 'next/server'
import { searchStops, getStopsWithRoutes, getStopsNear, isGtfsAvailable } from '@/lib/transit/gtfsService'

/**
 * GET /api/transit/stops
 * Search stops, get stops near location, or get all stops with routes
 * 
 * Query params:
 * - q: search query (searches stop name, code, and ID)
 * - limit: max results (default: 20)
 * - withRoutes: include routes for each stop (default: false)
 * - lat: latitude for nearby stops search
 * - lon: longitude for nearby stops search
 * - radius: search radius in meters (default: 500)
 */
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const limit = parseInt(searchParams.get('limit') || '20')
    const withRoutes = searchParams.get('withRoutes') === 'true'
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')
    const radius = parseInt(searchParams.get('radius') || '500')

    // Check if GTFS is available (but don't fail if not - return empty results)
    let gtfsAvailable = false
    try {
      gtfsAvailable = isGtfsAvailable()
    } catch (error: any) {
      console.error('Error checking GTFS availability:', error?.message || error)
      gtfsAvailable = false
    }

    if (!gtfsAvailable) {
      console.warn('GTFS data not available - returning empty results')
      return NextResponse.json({
        stops: [],
        count: 0,
        error: 'GTFS data not available',
        message: 'Stop search is temporarily unavailable. GTFS database may not be imported yet.',
        timestamp: new Date().toISOString()
      }, { status: 200 }) // Return 200 with empty results instead of 503
    }

    // Get stops near location
    if (lat && lon) {
      const latitude = parseFloat(lat)
      const longitude = parseFloat(lon)
      
      if (isNaN(latitude) || isNaN(longitude)) {
        return NextResponse.json(
          { error: 'Invalid latitude or longitude', stops: [], count: 0 },
          { status: 400 }
        )
      }

      try {
        const stops = getStopsNear(latitude, longitude, radius)
        return NextResponse.json({
          stops,
          count: stops.length,
          location: { lat: latitude, lon: longitude },
          radius,
          timestamp: new Date().toISOString()
        })
      } catch (error: any) {
        console.error('Error fetching nearby stops:', error)
        return NextResponse.json({
          stops: [],
          count: 0,
          error: 'Failed to fetch nearby stops',
          message: error.message,
          timestamp: new Date().toISOString()
        }, { status: 200 })
      }
    }

    if (query) {
      // Search stops
      try {
        const stops = searchStops(query, limit)
        return NextResponse.json({
          stops,
          count: stops.length,
          query,
          timestamp: new Date().toISOString()
        })
      } catch (error: any) {
        console.error('Error searching stops:', error?.message || error, error?.stack)
        return NextResponse.json({
          stops: [],
          count: 0,
          error: 'Failed to search stops',
          message: error?.message || 'Database query failed',
          timestamp: new Date().toISOString()
        }, { status: 200 })
      }
    } else if (withRoutes) {
      // Get all stops with routes
      try {
        const stops = getStopsWithRoutes()
        return NextResponse.json({
          stops,
          count: stops.length,
          timestamp: new Date().toISOString()
        })
      } catch (error: any) {
        console.error('Error fetching stops with routes:', error)
        return NextResponse.json({
          stops: [],
          count: 0,
          error: 'Failed to fetch stops',
          message: error.message,
          timestamp: new Date().toISOString()
        }, { status: 200 })
      }
    } else {
      return NextResponse.json(
        { error: 'Please provide a search query (q), location (lat/lon), or set withRoutes=true', stops: [], count: 0 },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('Error in stops API:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch stops', 
        message: error.message,
        stops: [],
        count: 0,
        timestamp: new Date().toISOString()
      },
      { status: 200 } // Return 200 with error info instead of 500
    )
  }
}

