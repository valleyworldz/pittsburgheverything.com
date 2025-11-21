import { NextRequest, NextResponse } from 'next/server'
import type { ReviewStats, APIResponse } from '@/types'

// This will use the same helper functions from the main reviews route
// For now, we'll implement it inline to avoid circular imports

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest): Promise<NextResponse<APIResponse<ReviewStats[]>>> {
  try {
    const { searchParams } = request.nextUrl
    const businessId = searchParams.get('businessId')

    // TODO: Implement proper review stats calculation
    // For now, return mock data
    const mockStats: ReviewStats[] = businessId ? [{
      businessId,
      totalReviews: 0,
      averageRating: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      recommendedPercentage: 0,
      verifiedReviews: 0,
      responseRate: 0,
      updatedAt: new Date().toISOString()
    }] : []

    return NextResponse.json({
      success: true,
      data: mockStats,
      message: `Review stats retrieved successfully`,
    })

  } catch (error) {
    console.error('Error fetching review stats:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch review stats',
    }, { status: 500 })
  }
}
