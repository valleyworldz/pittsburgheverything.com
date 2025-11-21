// Push Notification Subscription API
// Handle push notification subscriptions for PWA

import { NextRequest, NextResponse } from 'next/server'

interface PushSubscription {
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
}

interface SubscriptionRequest {
  subscription: PushSubscription
  userId?: string
  preferences?: {
    events: boolean
    deals: boolean
    reviews: boolean
    local: boolean
  }
}

// In-memory storage for demo (use database in production)
let subscriptions: Array<SubscriptionRequest & { id: string; createdAt: Date }> = []

export async function POST(request: NextRequest) {
  try {
    const body: SubscriptionRequest = await request.json()

    if (!body.subscription || !body.subscription.endpoint) {
      return NextResponse.json(
        { error: 'Invalid subscription data' },
        { status: 400 }
      )
    }

    // Check if subscription already exists
    const existingIndex = subscriptions.findIndex(
      sub => sub.subscription.endpoint === body.subscription.endpoint
    )

    const subscriptionData = {
      ...body,
      id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      preferences: body.preferences || {
        events: true,
        deals: true,
        reviews: false,
        local: true
      }
    }

    if (existingIndex >= 0) {
      // Update existing subscription
      subscriptions[existingIndex] = subscriptionData
      console.log('Push subscription updated:', subscriptionData.id)
    } else {
      // Add new subscription
      subscriptions.push(subscriptionData)
      console.log('Push subscription added:', subscriptionData.id)
    }

    return NextResponse.json({
      success: true,
      message: 'Subscription saved successfully',
      subscriptionId: subscriptionData.id
    })

  } catch (error) {
    console.error('Push subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to save subscription' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Return subscription count for monitoring
  return NextResponse.json({
    totalSubscriptions: subscriptions.length,
    activeSubscriptions: subscriptions.filter(sub => {
      // Consider active if created within last 30 days
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return sub.createdAt > thirtyDaysAgo
    }).length
  })
}
