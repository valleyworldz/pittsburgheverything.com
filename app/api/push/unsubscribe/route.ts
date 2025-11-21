// Push Notification Unsubscribe API
// Handle push notification unsubscriptions

import { NextRequest, NextResponse } from 'next/server'

// Import subscription storage (in production, use database)
let subscriptions: Array<any> = []

interface UnsubscribeRequest {
  endpoint: string
  userId?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: UnsubscribeRequest = await request.json()

    if (!body.endpoint) {
      return NextResponse.json(
        { error: 'Endpoint is required' },
        { status: 400 }
      )
    }

    // Find and remove subscription
    const initialLength = subscriptions.length
    subscriptions = subscriptions.filter(
      sub => sub.subscription.endpoint !== body.endpoint
    )

    const removed = initialLength - subscriptions.length

    console.log(`Push subscription removed: ${body.endpoint} (${removed} subscriptions)`)

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed',
      removedCount: removed
    })

  } catch (error) {
    console.error('Push unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    )
  }
}
