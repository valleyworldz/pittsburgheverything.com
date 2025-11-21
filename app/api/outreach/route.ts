import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { BusinessOutreach, APIResponse } from '@/types'
import { outreachService } from '@/utils/outreachService'

const OUTREACH_FILE = join(process.cwd(), 'data', 'lawrenceville-businesses.json')

// Helper functions
function readOutreachData(): BusinessOutreach[] {
  try {
    const data = readFileSync(OUTREACH_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading outreach data:', error)
    return []
  }
}

function writeOutreachData(data: BusinessOutreach[]): void {
  try {
    writeFileSync(OUTREACH_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing outreach data:', error)
    throw new Error('Failed to save outreach data')
  }
}

function updateOutreachStatus(businessId: string, status: BusinessOutreach['outreachStatus'], additionalData?: Partial<BusinessOutreach>): BusinessOutreach | null {
  const data = readOutreachData()
  const index = data.findIndex(b => b.id === businessId)

  if (index === -1) return null

  const business = data[index]
  const now = new Date().toISOString()

  // Update status and tracking
  business.outreachStatus = status
  business.lastContactDate = now

  if (status === 'contacted' && !business.firstContactDate) {
    business.firstContactDate = now
  }

  // Apply additional data
  if (additionalData) {
    Object.assign(business, additionalData)
  }

  // Set next follow-up date based on status
  if (status === 'contacted') {
    business.nextFollowUpDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
  } else if (status === 'responded') {
    business.nextFollowUpDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days
  }

  writeOutreachData(data)
  return business
}

// GET /api/outreach - Get outreach campaign data
export async function GET(request: NextRequest): Promise<NextResponse<APIResponse<{
  businesses: BusinessOutreach[]
  stats: {
    total: number
    contacted: number
    responded: number
    signed_up: number
    declined: number
    pending_followup: number
    conversion_rate: number
  }
  next_actions: BusinessOutreach[]
}>>> {
  try {
    const data = readOutreachData()

    // Calculate stats
    const stats = {
      total: data.length,
      contacted: data.filter(b => b.outreachStatus === 'contacted').length,
      responded: data.filter(b => b.outreachStatus === 'responded').length,
      signed_up: data.filter(b => b.outreachStatus === 'signed_up').length,
      declined: data.filter(b => b.outreachStatus === 'declined').length,
      pending_followup: data.filter(b => {
        const nextDate = b.nextFollowUpDate ? new Date(b.nextFollowUpDate) : null
        return nextDate && nextDate <= new Date()
      }).length,
      conversion_rate: 0
    }

    if (stats.contacted > 0) {
      stats.conversion_rate = Math.round((stats.signed_up / stats.contacted) * 100)
    }

    // Get next actions (pending followups and initial contacts)
    const next_actions = data
      .filter(b => {
        if (b.outreachStatus === 'not_contacted') return true
        if (b.outreachStatus === 'contacted' || b.outreachStatus === 'responded') {
          const nextDate = b.nextFollowUpDate ? new Date(b.nextFollowUpDate) : null
          return nextDate && nextDate <= new Date()
        }
        return false
      })
      .sort((a, b) => {
        // Sort by priority then by next follow-up date
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        const aPriority = priorityOrder[a.priority]
        const bPriority = priorityOrder[b.priority]

        if (aPriority !== bPriority) return bPriority - aPriority

        const aDate = a.nextFollowUpDate ? new Date(a.nextFollowUpDate) : new Date(0)
        const bDate = b.nextFollowUpDate ? new Date(b.nextFollowUpDate) : new Date(0)
        return aDate.getTime() - bDate.getTime()
      })
      .slice(0, 10) // Top 10 next actions

    return NextResponse.json({
      success: true,
      data: {
        businesses: data,
        stats,
        next_actions
      },
      message: 'Outreach data retrieved successfully',
    })

  } catch (error) {
    console.error('Error fetching outreach data:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch outreach data',
    }, { status: 500 })
  }
}

// POST /api/outreach - Send outreach email
export async function POST(request: NextRequest): Promise<NextResponse<APIResponse<BusinessOutreach>>> {
  try {
    const { businessId, action } = await request.json()

    if (!businessId) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Business ID is required',
      }, { status: 400 })
    }

    const data = readOutreachData()
    const business = data.find(b => b.id === businessId)

    if (!business) {
      return NextResponse.json({
        success: false,
        error: 'Not found',
        message: 'Business not found in outreach list',
      }, { status: 404 })
    }

    let success = false
    let updatedBusiness: BusinessOutreach | null = null

    switch (action) {
      case 'initial_contact':
        success = await outreachService.sendInitialOutreach(business)
        if (success) {
          updatedBusiness = updateOutreachStatus(businessId, 'contacted', {
            followUpCount: business.followUpCount + 1
          })
        }
        break

      case 'followup':
        const followUpNumber = business.followUpCount + 1
        success = await outreachService.sendFollowUpOutreach(business, followUpNumber)
        if (success) {
          updatedBusiness = updateOutreachStatus(businessId, 'contacted', {
            followUpCount: followUpNumber
          })
        }
        break

      case 'welcome':
        success = await outreachService.sendWelcomeEmail(business)
        if (success) {
          updatedBusiness = updateOutreachStatus(businessId, 'signed_up')
        }
        break

      default:
        return NextResponse.json({
          success: false,
          error: 'Validation error',
          message: 'Invalid action. Use: initial_contact, followup, or welcome',
        }, { status: 400 })
    }

    if (!success) {
      return NextResponse.json({
        success: false,
        error: 'Email error',
        message: 'Failed to send outreach email',
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: updatedBusiness || business,
      message: `${action.replace('_', ' ')} email sent successfully`,
    })

  } catch (error) {
    console.error('Error sending outreach:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to send outreach email',
    }, { status: 500 })
  }
}

// PUT /api/outreach - Update outreach status
export async function PUT(request: NextRequest): Promise<NextResponse<APIResponse<BusinessOutreach>>> {
  try {
    const { businessId, status, notes, response } = await request.json()

    if (!businessId || !status) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Business ID and status are required',
      }, { status: 400 })
    }

    const validStatuses: BusinessOutreach['outreachStatus'][] = ['not_contacted', 'contacted', 'responded', 'signed_up', 'declined']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Invalid status',
      }, { status: 400 })
    }

    const updatedBusiness = updateOutreachStatus(businessId, status, {
      notes,
      response
    })

    if (!updatedBusiness) {
      return NextResponse.json({
        success: false,
        error: 'Not found',
        message: 'Business not found in outreach list',
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: updatedBusiness,
      message: `Business status updated to ${status}`,
    })

  } catch (error) {
    console.error('Error updating outreach status:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to update outreach status',
    }, { status: 500 })
  }
}
