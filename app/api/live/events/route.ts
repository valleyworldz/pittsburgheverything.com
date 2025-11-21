// Live Events API - Real-time event data from multiple sources

import { NextRequest, NextResponse } from 'next/server'
import { realTimeDataManager } from '@/utils/realtimeDataAggregator'
import eventsData from '@/data/events.json'

// Helper function to convert 12-hour time to 24-hour format
function convertTo24Hour(time12h: string): string {
  const [time, period] = time12h.split(' ')
  const [hours, minutes] = time.split(':').map(Number)

  let hours24 = hours
  if (period?.toLowerCase() === 'pm' && hours !== 12) {
    hours24 = hours + 12
  } else if (period?.toLowerCase() === 'am' && hours === 12) {
    hours24 = 0
  }

  return `${hours24.toString().padStart(2, '0')}:${minutes?.toString().padStart(2, '0') || '00'}`
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location') || 'Pittsburgh'
    const category = searchParams.get('category')
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50)

    // Get live events from APIs
    const liveEvents = await realTimeDataManager.events.getLiveEvents(location, 25)

    // Combine with static events data
    const staticEvents = eventsData
      .filter(event => {
        const eventDate = new Date(event.date)
        return eventDate >= new Date() // Only future events
      })
      .filter(event => !category || event.category.toLowerCase().includes(category.toLowerCase()))
      .map(event => {
        // Parse date and time more safely
        let startDate: Date
        try {
          const timeStr = event.time.includes('-') ? event.time.split(' - ')[0] : '12:00'
          // Convert 12-hour time to 24-hour format
          const time24 = convertTo24Hour(timeStr.trim())
          const dateTimeStr = `${event.date}T${time24}:00`
          startDate = new Date(dateTimeStr)

          // If the date is invalid, use a fallback
          if (isNaN(startDate.getTime())) {
            startDate = new Date(event.date + 'T12:00:00')
          }
        } catch (error) {
          console.warn(`Invalid date/time for event ${event.id}:`, event.date, event.time)
          startDate = new Date() // Fallback to current date
        }

        return {
          id: event.id,
          title: event.title,
          description: event.description,
          startDate,
          location: {
            name: event.location.split(',')[0],
            address: event.location
          },
          category: event.category,
          price: event.price === 'Free' ? undefined : { min: parseInt(event.price.replace(/[^\d]/g, '')) || 0, currency: 'USD' },
          source: 'manual' as const,
          url: event.url,
          image: event.image,
          lastUpdated: new Date(event.lastUpdated || Date.now()),
          verified: true
        }
      })

    // Combine and deduplicate
    const allEvents = [...liveEvents, ...staticEvents]
    const uniqueEvents = allEvents.filter((event, index, self) =>
      index === self.findIndex(e => e.title === event.title && e.startDate.toDateString() === event.startDate.toDateString())
    )

    // Sort by date and limit
    const sortedEvents = uniqueEvents
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
      .slice(0, limit)

    return NextResponse.json({
      events: sortedEvents,
      total: sortedEvents.length,
      sources: ['eventbrite', 'ticketmaster', 'manual'],
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Live events API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch live events' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // Admin endpoint to refresh event cache
  try {
    // Verify admin access (in production, check authentication)
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await realTimeDataManager.refreshAllData()

    return NextResponse.json({
      success: true,
      message: 'Event cache refreshed successfully'
    })

  } catch (error) {
    console.error('Event cache refresh error:', error)
    return NextResponse.json(
      { error: 'Failed to refresh event cache' },
      { status: 500 }
    )
  }
}
