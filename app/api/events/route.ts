import { NextRequest, NextResponse } from 'next/server'
import { getLocalEvents } from '@/utils/apiIntegrations'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const date = searchParams.get('date')

    const events = await getLocalEvents(category || undefined, date || undefined)

    return NextResponse.json({
      success: true,
      data: events,
      count: events.length
    })
  } catch (error) {
    console.error('Events API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}