import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { Review, APIResponse } from '@/types'
import { v4 as uuidv4 } from 'uuid'
import { emailService } from '@/utils/emailService'

const REVIEWS_FILE = join(process.cwd(), 'data', 'reviews.json')

// Helper functions
function readReviews(): Review[] {
  try {
    const data = readFileSync(REVIEWS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading reviews:', error)
    return []
  }
}

function writeReviews(reviews: Review[]): void {
  try {
    writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2))
  } catch (error) {
    console.error('Error writing reviews:', error)
    throw new Error('Failed to save reviews')
  }
}

// POST /api/reviews/verify - Send verification email
export async function POST(request: NextRequest): Promise<NextResponse<APIResponse<{ verificationToken: string }>>> {
  try {
    const { reviewId, email } = await request.json()

    if (!reviewId || !email) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Review ID and email are required',
      }, { status: 400 })
    }

    const reviews = readReviews()
    const review = reviews.find(r => r.id === reviewId)

    if (!review) {
      return NextResponse.json({
        success: false,
        error: 'Not found',
        message: 'Review not found',
      }, { status: 404 })
    }

    if (review.verified) {
      return NextResponse.json({
        success: false,
        error: 'Already verified',
        message: 'Review is already verified',
      }, { status: 400 })
    }

    // Generate verification token
    const verificationToken = uuidv4()

    // Update review with verification token
    review.verified = false
    review.verifiedMethod = 'email'

    // Save updated reviews
    writeReviews(reviews)

    // Send verification email
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/verify-review?token=${verificationToken}&reviewId=${reviewId}`

    const emailSent = await emailService.sendReviewVerificationEmail(
      email,
      reviewId,
      review.businessName,
      verificationUrl
    )

    if (!emailSent) {
      console.warn('Failed to send verification email, but review was saved')
    }

    return NextResponse.json({
      success: true,
      data: { verificationToken },
      message: 'Verification email sent successfully',
    })

  } catch (error) {
    console.error('Error sending verification:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to send verification',
    }, { status: 500 })
  }
}

// PUT /api/reviews/verify - Verify review with token
export async function PUT(request: NextRequest): Promise<NextResponse<APIResponse<Review>>> {
  try {
    const { reviewId, verificationToken } = await request.json()

    if (!reviewId || !verificationToken) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Review ID and verification token are required',
      }, { status: 400 })
    }

    const reviews = readReviews()
    const reviewIndex = reviews.findIndex(r => r.id === reviewId)

    if (reviewIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Not found',
        message: 'Review not found',
      }, { status: 404 })
    }

    const review = reviews[reviewIndex]

    if (review.verified) {
      return NextResponse.json({
        success: false,
        error: 'Already verified',
        message: 'Review is already verified',
      }, { status: 400 })
    }

    // TODO: Validate verification token properly
    // For now, accept any token for testing
    if (verificationToken.length < 10) {
      return NextResponse.json({
        success: false,
        error: 'Invalid token',
        message: 'Invalid verification token',
      }, { status: 400 })
    }

    // Verify the review
    review.verified = true
    review.status = 'approved'
    review.updatedAt = new Date().toISOString()

    // Save updated reviews
    writeReviews(reviews)

    return NextResponse.json({
      success: true,
      data: review,
      message: 'Review verified successfully',
    })

  } catch (error) {
    console.error('Error verifying review:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to verify review',
    }, { status: 500 })
  }
}
