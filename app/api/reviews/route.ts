import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { Review, ReviewSubmission, ReviewFilters, ReviewStats, APIResponse, PaginatedResponse } from '@/types'
import { v4 as uuidv4 } from 'uuid'

// Mark this route as dynamic to allow query parameters
export const dynamic = 'force-dynamic'

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

function calculateReviewStats(businessId?: string): ReviewStats[] {
  const reviews = readReviews()
  const businessReviews = businessId
    ? reviews.filter(r => r.businessId === businessId && r.status === 'approved')
    : reviews.filter(r => r.status === 'approved')

  if (businessId) {
    const stats = businessReviews.reduce((acc, review) => {
      acc.totalReviews++
      acc.averageRating += review.rating
      acc.ratingDistribution[review.rating as keyof typeof acc.ratingDistribution]++
      if (review.verified) acc.verifiedReviews++
      if (review.response) acc.responseRate++

      return acc
    }, {
      businessId,
      totalReviews: 0,
      averageRating: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      recommendedPercentage: 0,
      verifiedReviews: 0,
      responseRate: 0,
      updatedAt: new Date().toISOString()
    })

    if (stats.totalReviews > 0) {
      stats.averageRating = Math.round((stats.averageRating / stats.totalReviews) * 100) / 100
      stats.recommendedPercentage = Math.round(
        ((stats.ratingDistribution[4] + stats.ratingDistribution[5]) / stats.totalReviews) * 100
      )
      stats.responseRate = Math.round((stats.responseRate / stats.totalReviews) * 100)
    }

    return [stats]
  }

  // Group by business for overall stats
  const businessStats = new Map<string, ReviewStats>()

  businessReviews.forEach(review => {
    if (!businessStats.has(review.businessId)) {
      businessStats.set(review.businessId, {
        businessId: review.businessId,
        totalReviews: 0,
        averageRating: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        recommendedPercentage: 0,
        verifiedReviews: 0,
        responseRate: 0,
        updatedAt: new Date().toISOString()
      })
    }

    const stats = businessStats.get(review.businessId)!
    stats.totalReviews++
    stats.averageRating += review.rating
    stats.ratingDistribution[review.rating as keyof typeof stats.ratingDistribution]++
    if (review.verified) stats.verifiedReviews++
    if (review.response) stats.responseRate++
  })

  return Array.from(businessStats.values()).map(stats => {
    if (stats.totalReviews > 0) {
      stats.averageRating = Math.round((stats.averageRating / stats.totalReviews) * 100) / 100
      stats.recommendedPercentage = Math.round(
        ((stats.ratingDistribution[4] + stats.ratingDistribution[5]) / stats.totalReviews) * 100
      )
      stats.responseRate = Math.round((stats.responseRate / stats.totalReviews) * 100)
    }
    return stats
  })
}

// GET /api/reviews - Fetch reviews with filtering and pagination
export async function GET(request: NextRequest): Promise<NextResponse<APIResponse<PaginatedResponse<Review>>>> {
  try {
    const { searchParams } = request.nextUrl

    // Parse filters
    const filters: ReviewFilters = {
      businessId: searchParams.get('businessId') || undefined,
      category: searchParams.get('category') || undefined,
      neighborhood: searchParams.get('neighborhood') || undefined,
      rating: searchParams.get('rating') ? parseInt(searchParams.get('rating')!) as any : undefined,
      verified: searchParams.get('verified') ? searchParams.get('verified') === 'true' : undefined,
      sortBy: (searchParams.get('sortBy') as any) || 'newest',
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0,
    }

    let reviews = readReviews()

    // Apply filters
    if (filters.businessId) {
      reviews = reviews.filter(r => r.businessId === filters.businessId)
    }

    if (filters.category) {
      reviews = reviews.filter(r => r.businessCategory === filters.category)
    }

    if (filters.neighborhood) {
      reviews = reviews.filter(r => r.businessNeighborhood === filters.neighborhood)
    }

    if (filters.rating) {
      reviews = reviews.filter(r => r.rating === filters.rating)
    }

    if (filters.verified !== undefined) {
      reviews = reviews.filter(r => r.verified === filters.verified)
    }

    // Only show approved reviews by default
    reviews = reviews.filter(r => r.status === 'approved')

    // Apply sorting
    switch (filters.sortBy) {
      case 'newest':
        reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'oldest':
        reviews.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case 'highest':
        reviews.sort((a, b) => b.rating - a.rating)
        break
      case 'lowest':
        reviews.sort((a, b) => a.rating - b.rating)
        break
      case 'helpful':
        reviews.sort((a, b) => (b.helpful - b.notHelpful) - (a.helpful - a.notHelpful))
        break
    }

    // Apply pagination
    const total = reviews.length
    const start = filters.offset || 0
    const limit = filters.limit || 20
    const paginatedReviews = reviews.slice(start, start + limit)

    const response: PaginatedResponse<Review> = {
      data: paginatedReviews,
      total,
      page: Math.floor(start / limit) + 1,
      limit,
      totalPages: Math.ceil(total / limit)
    }

    return NextResponse.json({
      success: true,
      data: response,
      message: `${paginatedReviews.length} reviews found`,
    })

  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch reviews',
    }, { status: 500 })
  }
}

// POST /api/reviews - Create new review
export async function POST(request: NextRequest): Promise<NextResponse<APIResponse<Review>>> {
  try {
    const body: ReviewSubmission = await request.json()

    // Basic validation
    if (!body.businessId || !body.userName || !body.rating || !body.title || !body.content) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Missing required fields',
      }, { status: 400 })
    }

    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Rating must be between 1 and 5',
      }, { status: 400 })
    }

    // TODO: Get business details from business data
    const businessName = 'Unknown Business' // Will be populated from business lookup
    const businessCategory = 'general' // Will be populated from business lookup
    const businessNeighborhood = 'unknown' // Will be populated from business lookup

    const newReview: Review = {
      id: uuidv4(),
      businessId: body.businessId,
      businessName,
      businessCategory,
      businessNeighborhood,
      userName: body.userName,
      userEmail: body.userEmail,
      rating: body.rating,
      title: body.title,
      content: body.content,
      pros: body.pros,
      cons: body.cons,
      verified: false, // Will be verified through email/phone
      helpful: 0,
      notHelpful: 0,
      images: [], // TODO: Handle image uploads
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'pending' // Reviews need approval before being public
    }

    const reviews = readReviews()
    reviews.push(newReview)
    writeReviews(reviews)

    return NextResponse.json({
      success: true,
      data: newReview,
      message: 'Review submitted successfully. It will be published after review.',
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to create review',
    }, { status: 500 })
  }
}
