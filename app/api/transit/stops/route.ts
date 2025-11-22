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
export async function GET(request: NextRequest) {
  try {
    if (!isGtfsAvailable()) {
      return NextResponse.json(
        {
          error: 'GTFS data not available',
          message: 'Please run the GTFS import script first: npm run transit:import'
        },
        { status: 503 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const limit = parseInt(searchParams.get('limit') || '20')
    const withRoutes = searchParams.get('withRoutes') === 'true'
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')
    const radius = parseInt(searchParams.get('radius') || '500')

    // Get stops near location
    if (lat && lon) {
      const latitude = parseFloat(lat)
      const longitude = parseFloat(lon)
      
      if (isNaN(latitude) || isNaN(longitude)) {
        return NextResponse.json(
          { error: 'Invalid latitude or longitude' },
          { status: 400 }
        )
      }

      const stops = getStopsNear(latitude, longitude, radius)
      return NextResponse.json({
        stops,
        count: stops.length,
        location: { lat: latitude, lon: longitude },
        radius,
        timestamp: new Date().toISOString()
      })
    }

    if (query) {
      // Search stops
      const stops = searchStops(query, limit)
      return NextResponse.json({
        stops,
        count: stops.length,
        query,
        timestamp: new Date().toISOString()
      })
    } else if (withRoutes) {
      // Get all stops with routes
      const stops = getStopsWithRoutes()
      return NextResponse.json({
        stops,
        count: stops.length,
        timestamp: new Date().toISOString()
      })
    } else {
      return NextResponse.json(
        { error: 'Please provide a search query (q), location (lat/lon), or set withRoutes=true' },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('Error fetching stops:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stops', message: error.message },
      { status: 500 }
    )
  }
}

