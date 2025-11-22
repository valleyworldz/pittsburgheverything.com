import { NextResponse } from 'next/server'
import { getRoutes, isGtfsAvailable } from '@/lib/transit/gtfsService'

/**
 * GET /api/transit/routes
 * Get all transit routes
 */
export async function GET() {
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

    const routes = getRoutes()
    
    return NextResponse.json({
      routes,
      count: routes.length,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Error fetching routes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch routes', message: error.message },
      { status: 500 }
    )
  }
}

