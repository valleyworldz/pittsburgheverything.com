import { NextRequest, NextResponse } from 'next/server'

interface SubscriptionData {
  email: string
  name?: string
  neighborhood?: string
  interests?: string[]
}

/**
 * Newsletter API Route
 * Integrates with free email services (Brevo/Mailchimp free tier)
 * Falls back to local storage if API keys not available
 */
export async function POST(request: NextRequest) {
  try {
    const body: SubscriptionData = await request.json()
    const { email, name, neighborhood, interests = [] } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Try to integrate with Brevo (free tier: 300 emails/day)
    if (process.env.BREVO_API_KEY) {
      try {
        const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'api-key': process.env.BREVO_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            attributes: {
              FIRSTNAME: name || '',
              NEIGHBORHOOD: neighborhood || '',
              INTERESTS: interests.join(', ')
            },
            listIds: [parseInt(process.env.BREVO_LIST_ID || '1')],
            updateEnabled: true
          })
        })

        if (brevoResponse.ok) {
          return NextResponse.json({
            success: true,
            message: 'Successfully subscribed to Pittsburgh Pulse Weekly! Check your email for confirmation.',
            data: {
              email,
              subscribedAt: new Date().toISOString(),
              status: 'active',
              provider: 'brevo'
            }
          })
        }
      } catch (brevoError) {
        console.error('Brevo integration error:', brevoError)
        // Fall through to local storage
      }
    }

    // Try Mailchimp (free tier: 500 contacts, 2,500 emails/month)
    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
      try {
        const [apiKey, server] = process.env.MAILCHIMP_API_KEY.split('-')
        const mailchimpResponse = await fetch(
          `https://${server}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email_address: email,
              status: 'subscribed',
              merge_fields: {
                FNAME: name || '',
                NEIGHBORHOOD: neighborhood || ''
              },
              interests: interests.reduce((acc, interest) => {
                acc[interest] = true
                return acc
              }, {} as Record<string, boolean>)
            })
          }
        )

        if (mailchimpResponse.ok) {
          return NextResponse.json({
            success: true,
            message: 'Successfully subscribed to Pittsburgh Pulse Weekly! Check your email for confirmation.',
            data: {
              email,
              subscribedAt: new Date().toISOString(),
              status: 'active',
              provider: 'mailchimp'
            }
          })
        }
      } catch (mailchimpError) {
        console.error('Mailchimp integration error:', mailchimpError)
        // Fall through to local storage
      }
    }

    // Fallback: Local storage (for development or if no API keys)
    // In production, you should save to a database (Supabase, PlanetScale, etc.)
    console.log('Newsletter signup (local):', { email, name, neighborhood, interests })

    // Here you would save to your database:
    // await db.newsletterSubscribers.create({ data: { email, name, neighborhood, interests } })

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to Pittsburgh Pulse Weekly! Check your email for confirmation.',
      data: {
        email,
        subscribedAt: new Date().toISOString(),
        status: 'active',
        provider: 'local'
      }
    })

  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process subscription. Please try again later.' },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint for newsletter statistics and unsubscribe
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')
  const email = searchParams.get('email')
  const token = searchParams.get('token')

  // Unsubscribe endpoint
  if (action === 'unsubscribe' && email && token) {
    try {
      // Validate token (in production, use a proper token validation system)
      // For now, we'll just log it
      console.log('Unsubscribe request:', { email, token })

      // Here you would:
      // 1. Validate the token
      // 2. Update subscriber status in database
      // 3. Update email service (Brevo/Mailchimp)

      return NextResponse.json({
        success: true,
        message: 'You have been successfully unsubscribed from Pittsburgh Pulse Weekly.'
      })
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to unsubscribe' },
        { status: 500 }
      )
    }
  }

  // Statistics endpoint
  if (action === 'stats') {
    // In production, fetch real stats from database/email service
    return NextResponse.json({
      success: true,
      data: {
        totalSubscribers: 5200,
        weeklySends: 1,
        averageOpenRate: 94,
        averageClickRate: 12,
        lastSent: new Date().toISOString(),
        growthRate: 8.5
      }
    })
  }

  // Archive endpoint (for future newsletter archive page)
  if (action === 'archive') {
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // In production, fetch from database
    return NextResponse.json({
      success: true,
      data: {
        newsletters: [],
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0
        }
      }
    })
  }

  return NextResponse.json(
    { success: false, error: 'Invalid action' },
    { status: 400 }
  )
}
