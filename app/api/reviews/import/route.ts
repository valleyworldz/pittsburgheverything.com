import { NextRequest, NextResponse } from 'next/server'
import type { APIResponse } from '@/types'
import { reviewImportService } from '@/utils/reviewImportService'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest): Promise<NextResponse<APIResponse<{
  imported: number
  skipped: number
  errors: string[]
  reviews: any[]
}>>> {
  try {
    const { businessId, source, credentials } = await request.json()

    if (!businessId || !source) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Business ID and source are required',
      }, { status: 400 })
    }

    if (!['google', 'yelp', 'facebook'].includes(source)) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Invalid source. Must be: google, yelp, or facebook',
      }, { status: 400 })
    }

    let result

    switch (source) {
      case 'google':
        result = await reviewImportService.importGoogleReviews(businessId, credentials?.placeId)
        break
      case 'yelp':
        result = await reviewImportService.importYelpReviews(businessId, credentials?.yelpId)
        break
      case 'facebook':
        result = await reviewImportService.importFacebookReviews(businessId, credentials?.pageId)
        break
      default:
        throw new Error('Unsupported source')
    }

    return NextResponse.json({
      success: true,
      data: {
        imported: result.imported,
        skipped: result.skipped,
        errors: result.errors,
        reviews: result.reviews,
      },
      message: `Successfully imported ${result.imported} reviews from ${source}`,
    })

  } catch (error) {
    console.error('Error importing reviews:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to import reviews',
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest): Promise<NextResponse<APIResponse<{
  totalImported: number
  bySource: { google: number; yelp: number; facebook: number }
  lastImport?: string
}>>> {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get('businessId')

    if (!businessId) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Business ID is required',
      }, { status: 400 })
    }

    const stats = reviewImportService.getImportStats(businessId)

    return NextResponse.json({
      success: true,
      data: stats,
      message: 'Import statistics retrieved successfully',
    })

  } catch (error) {
    console.error('Error fetching import stats:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch import statistics',
    }, { status: 500 })
  }
}
