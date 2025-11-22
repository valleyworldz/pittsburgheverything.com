import { NextRequest, NextResponse } from 'next/server'
import { getStopsForRoute, getRoute, isGtfsAvailable } from '@/lib/transit/gtfsService'

/**
 * GET /api/transit/route/[routeId]/stops
 * Get all stops for a specific route
 * 
 * Query params:
 * - directionId: filter by direction (0 or 1, optional)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { routeId: string } }
) {
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

    const { routeId } = params
    const searchParams = request.nextUrl.searchParams
    const directionId = searchParams.get('directionId')
      ? parseInt(searchParams.get('directionId')!)
      : undefined

    // Get route info
    const route = getRoute(routeId)
    if (!route) {
      return NextResponse.json(
        { error: 'Route not found', routeId },
        { status: 404 }
      )
    }

    // Get stops
    const stops = getStopsForRoute(routeId, directionId)

    return NextResponse.json({
      route: {
        id: route.route_id,
        shortName: route.route_short_name,
        longName: route.route_long_name,
        type: route.route_type
      },
      stops,
      directionId: directionId ?? null,
      count: stops.length,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Error fetching route stops:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stops', message: error.message },
      { status: 500 }
    )
  }
}

