import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { Review, ReviewResponse, APIResponse } from '@/types'
import { v4 as uuidv4 } from 'uuid'

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

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest): Promise<NextResponse<APIResponse<ReviewResponse>>> {
  try {
    const { reviewId, businessId, content } = await request.json()

    // Validate required fields
    if (!reviewId || !businessId || !content) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Missing required fields: reviewId, businessId, content',
      }, { status: 400 })
    }

    if (content.length < 10) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Response must be at least 10 characters long',
      }, { status: 400 })
    }

    if (content.length > 1000) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Response must be less than 1000 characters',
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

    // Verify the business ID matches
    if (review.businessId !== businessId) {
      return NextResponse.json({
        success: false,
        error: 'Forbidden',
        message: 'You can only respond to reviews for your business',
      }, { status: 403 })
    }

    // Check if review is approved (only approved reviews can be responded to)
    if (review.status !== 'approved') {
      return NextResponse.json({
        success: false,
        error: 'Forbidden',
        message: 'Can only respond to published reviews',
      }, { status: 403 })
    }

    // Check if response already exists
    if (review.response) {
      return NextResponse.json({
        success: false,
        error: 'Conflict',
        message: 'Response already exists for this review',
      }, { status: 409 })
    }

    // Create the response
    const response: ReviewResponse = {
      id: uuidv4(),
      businessId,
      reviewId,
      content: content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Update the review with the response
    review.response = response
    review.updatedAt = new Date().toISOString()

    // Save the updated reviews
    writeReviews(reviews)

    return NextResponse.json({
      success: true,
      data: response,
      message: 'Response posted successfully',
    }, { status: 201 })

  } catch (error) {
    console.error('Error posting review response:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to post response',
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse<APIResponse<ReviewResponse>>> {
  try {
    const { reviewId, businessId, content } = await request.json()

    // Validate required fields
    if (!reviewId || !businessId || !content) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Missing required fields: reviewId, businessId, content',
      }, { status: 400 })
    }

    if (content.length < 10) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Response must be at least 10 characters long',
      }, { status: 400 })
    }

    if (content.length > 1000) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Response must be less than 1000 characters',
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

    // Verify the business ID matches
    if (review.businessId !== businessId) {
      return NextResponse.json({
        success: false,
        error: 'Forbidden',
        message: 'You can only update responses for your business',
      }, { status: 403 })
    }

    // Check if response exists
    if (!review.response) {
      return NextResponse.json({
        success: false,
        error: 'Not found',
        message: 'No response found for this review',
      }, { status: 404 })
    }

    // Update the response
    review.response.content = content.trim()
    review.response.updatedAt = new Date().toISOString()
    review.updatedAt = new Date().toISOString()

    // Save the updated reviews
    writeReviews(reviews)

    return NextResponse.json({
      success: true,
      data: review.response,
      message: 'Response updated successfully',
    })

  } catch (error) {
    console.error('Error updating review response:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to update response',
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse<APIResponse<{ deleted: boolean }>>> {
  try {
    const { searchParams } = new URL(request.url)
    const reviewId = searchParams.get('reviewId')
    const businessId = searchParams.get('businessId')

    if (!reviewId || !businessId) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Missing required parameters: reviewId, businessId',
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

    // Verify the business ID matches
    if (review.businessId !== businessId) {
      return NextResponse.json({
        success: false,
        error: 'Forbidden',
        message: 'You can only delete responses for your business',
      }, { status: 403 })
    }

    // Remove the response
    delete review.response
    review.updatedAt = new Date().toISOString()

    // Save the updated reviews
    writeReviews(reviews)

    return NextResponse.json({
      success: true,
      data: { deleted: true },
      message: 'Response deleted successfully',
    })

  } catch (error) {
    console.error('Error deleting review response:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to delete response',
    }, { status: 500 })
  }
}
