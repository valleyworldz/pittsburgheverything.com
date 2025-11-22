import { NextRequest, NextResponse } from 'next/server'
import { getScheduleForStop, getStop, isGtfsAvailable } from '@/lib/transit/gtfsService'

/**
 * GET /api/transit/stop/[stopId]/schedule
 * Get schedule for a specific stop
 * 
 * Query params:
 * - date: date in YYYY-MM-DD format (default: today)
 * - routeId: filter by specific route (optional)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { stopId: string } }
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

    const { stopId } = params
    const searchParams = request.nextUrl.searchParams
    
    // Parse date (default to today)
    const dateParam = searchParams.get('date')
    const date = dateParam ? new Date(dateParam) : new Date()
    
    // Validate date
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      )
    }
    
    const routeId = searchParams.get('routeId') || undefined
    
    // Get stop info
    const stop = getStop(stopId)
    if (!stop) {
      return NextResponse.json(
        { error: 'Stop not found', stopId },
        { status: 404 }
      )
    }
    
    // Get schedule
    const schedule = getScheduleForStop(stopId, date, routeId)
    
    return NextResponse.json({
      stop: {
        id: stop.stop_id,
        name: stop.stop_name,
        code: stop.stop_code,
        lat: stop.stop_lat,
        lon: stop.stop_lon
      },
      schedule,
      date: date.toISOString().slice(0, 10),
      routeId: routeId || null,
      count: schedule.length,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Error fetching stop schedule:', error)
    return NextResponse.json(
      { error: 'Failed to fetch schedule', message: error.message },
      { status: 500 }
    )
  }
}

