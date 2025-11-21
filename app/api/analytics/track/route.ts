// Analytics tracking endpoint for user interactions and events

import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for demo (use database in production)
let analyticsEvents: any[] = []

interface AnalyticsEvent {
  event: string
  userId?: string
  sessionId?: string
  timestamp: number
  url?: string
  referrer?: string
  userAgent?: string
  data?: any
  ip?: string
}

export async function POST(request: NextRequest) {
  try {
    const eventData: AnalyticsEvent = await request.json()

    // Validate required fields
    if (!eventData.event) {
      return NextResponse.json(
        { error: 'Event type is required' },
        { status: 400 }
      )
    }

    // Enrich with server data
    const enrichedEvent: AnalyticsEvent & { id: string; receivedAt: Date } = {
      ...eventData,
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      receivedAt: new Date(),
      ip: request.headers.get('x-forwarded-for') ||
          request.headers.get('x-real-ip') ||
          'unknown',
      timestamp: eventData.timestamp || Date.now()
    }

    // Store event (limit to last 1000 events for demo)
    analyticsEvents.unshift(enrichedEvent)
    if (analyticsEvents.length > 1000) {
      analyticsEvents = analyticsEvents.slice(0, 1000)
    }

    console.log('Analytics event tracked:', {
      event: enrichedEvent.event,
      userId: enrichedEvent.userId,
      url: enrichedEvent.url,
      timestamp: enrichedEvent.timestamp
    })

    return NextResponse.json({
      success: true,
      eventId: enrichedEvent.id,
      message: 'Event tracked successfully'
    })

  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Return analytics summary for monitoring
  const { searchParams } = new URL(request.url)
  const hours = parseInt(searchParams.get('hours') || '24')

  const cutoffTime = Date.now() - (hours * 60 * 60 * 1000)
  const recentEvents = analyticsEvents.filter(event => event.timestamp > cutoffTime)

  // Aggregate event types
  const eventTypes: { [key: string]: number } = {}
  recentEvents.forEach(event => {
    eventTypes[event.event] = (eventTypes[event.event] || 0) + 1
  })

  // Aggregate page views
  const pageViews = recentEvents.filter(event => event.event === 'page_view').length
  const uniqueUsers = new Set(recentEvents.map(event => event.userId || event.sessionId)).size

  return NextResponse.json({
    summary: {
      totalEvents: recentEvents.length,
      uniqueUsers,
      pageViews,
      timeRange: `${hours} hours`
    },
    eventTypes,
    recentEvents: recentEvents.slice(0, 10).map(event => ({
      id: event.id,
      event: event.event,
      timestamp: event.timestamp,
      url: event.url
    }))
  })
}
