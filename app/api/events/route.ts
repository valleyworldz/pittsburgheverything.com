import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import type { Event, APIResponse } from '@/types'

const EVENTS_FILE = join(process.cwd(), 'data', 'events.json')

// Helper function to read events from file
function readEvents(): Event[] {
  try {
    const data = readFileSync(EVENTS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading events:', error)
    return []
  }
}

export async function GET(request: NextRequest): Promise<NextResponse<APIResponse<Event[]>>> {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')
    const upcoming = searchParams.get('upcoming')

    let events = readEvents()

    // Filter by category
    if (category) {
      events = events.filter(event => event.category.toLowerCase() === category.toLowerCase())
    }

    // Filter for upcoming events only
    if (upcoming === 'true') {
      const now = new Date()
      events = events.filter(event => new Date(event.date) >= now)
    }

    // Sort by date (upcoming first)
    events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Apply limit
    if (limit) {
      const limitNum = parseInt(limit, 10)
      if (!isNaN(limitNum) && limitNum > 0) {
        events = events.slice(0, limitNum)
      }
    }

    return NextResponse.json({
      success: true,
      data: events,
      message: `${events.length} events found`,
    })

  } catch (error) {
    console.error('Error fetching events:', error)

    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch events',
    }, { status: 500 })
  }
}
