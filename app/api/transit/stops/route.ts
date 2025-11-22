import { NextRequest, NextResponse } from 'next/server'
import { searchStops, getStopsWithRoutes, isGtfsAvailable } from '@/lib/transit/gtfsService'

/**
 * GET /api/transit/stops
 * Search stops or get all stops with routes
 * 
 * Query params:
 * - q: search query (searches stop name and code)
 * - limit: max results (default: 20)
 * - withRoutes: include routes for each stop (default: false)
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
        { error: 'Please provide a search query (q) or set withRoutes=true' },
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

