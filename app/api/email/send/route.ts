import { NextRequest, NextResponse } from 'next/server'
import { apiConfig } from '@/config/api'
import type { APIResponse } from '@/types'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest): Promise<NextResponse<APIResponse<{ messageId?: string }>>> {
  try {
    const { to, subject, html, text } = await request.json()

    // Validate required fields
    if (!to || !subject || !html) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Missing required fields: to, subject, html',
      }, { status: 400 })
    }

    // For now, we'll log the email instead of actually sending it
    // In production, this would integrate with SendGrid, Mailgun, etc.
    console.log('📧 EMAIL SENT (simulated):')
    console.log('To:', to)
    console.log('Subject:', subject)
    console.log('HTML Length:', html.length)
    console.log('Text:', text ? text.substring(0, 100) + '...' : 'N/A')
    console.log('---')

    // Simulate successful sending
    return NextResponse.json({
      success: true,
      data: {
        messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      },
      message: 'Email sent successfully (simulated)',
    })

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to send email',
    }, { status: 500 })
  }
}
