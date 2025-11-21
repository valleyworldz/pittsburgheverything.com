'use client'

import { useState, useEffect } from 'react'
import { Star, Filter, SortAsc, Plus, MessageSquare } from 'lucide-react'
import ReviewCard from './ReviewCard'
import ReviewForm from './ReviewForm'
import type { Review, ReviewStats, ReviewFilters, Rating } from '@/types'

interface ReviewListProps {
  businessId: string
  businessName: string
  initialReviews?: Review[]
  showStats?: boolean
  allowSubmission?: boolean
}

export default function ReviewList({
  businessId,
  businessName,
  initialReviews = [],
  showStats = true,
  allowSubmission = true
}: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [filters, setFilters] = useState<ReviewFilters>({
    businessId,
    sortBy: 'newest',
    limit: 10
  })

  // Fetch reviews and stats
  useEffect(() => {
    fetchReviews()
    if (showStats) {
      fetchStats()
    }
  }, [businessId, filters])

  const fetchReviews = async () => {
    try {
      const queryParams = new URLSearchParams()
      if (filters.businessId) queryParams.set('businessId', filters.businessId)
      if (filters.rating) queryParams.set('rating', filters.rating.toString())
      if (filters.verified !== undefined) queryParams.set('verified', filters.verified.toString())
      if (filters.sortBy) queryParams.set('sortBy', filters.sortBy)
      if (filters.limit) queryParams.set('limit', filters.limit.toString())

      const response = await fetch(`/api/reviews?${queryParams}`)
      const result = await response.json()

      if (result.success) {
        setReviews(result.data.data)
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/reviews/stats?businessId=${businessId}`)
      const result = await response.json()

      if (result.success && result.data.length > 0) {
        setStats(result.data[0])
      }
    } catch (error) {
      console.error('Error fetching review stats:', error)
    }
  }

  const handleReviewSubmit = (review: any) => {
    setShowReviewForm(false)
    // Refresh reviews after submission
    fetchReviews()
    fetchStats()
  }

  const handleHelpfulVote = async (reviewId: string, helpful: boolean) => {
    // TODO: Implement voting API
    console.log('Vote:', reviewId, helpful)
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'text-pittsburgh-gold fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
        </div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse bg-white rounded-lg border p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-pittsburgh-black flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            Customer Reviews
          </h2>
          {stats && (
            <p className="text-steel-gray mt-1">
              {stats.totalReviews} reviews • {stats.averageRating.toFixed(1)} average rating
            </p>
          )}
        </div>
        {allowSubmission && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Write a Review
          </button>
        )}
      </div>

      {/* Review Stats */}
      {showStats && stats && (
        <div className="bg-gradient-to-r from-pittsburgh-gold/10 to-yellow-50 rounded-lg p-6 border border-pittsburgh-gold/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-pittsburgh-black mb-1">
                {stats.averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(stats.averageRating))}
              </div>
              <div className="text-sm text-steel-gray">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-black text-pittsburgh-black mb-1">
                {stats.totalReviews}
              </div>
              <div className="text-sm text-steel-gray">Total Reviews</div>
            </div>
            <div>
              <div className="text-3xl font-black text-pittsburgh-black mb-1">
                {stats.recommendedPercentage}%
              </div>
              <div className="text-sm text-steel-gray">Would Recommend</div>
            </div>
            <div>
              <div className="text-3xl font-black text-pittsburgh-black mb-1">
                {stats.verifiedReviews}
              </div>
              <div className="text-sm text-steel-gray">Verified Reviews</div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="mt-6 pt-6 border-t border-pittsburgh-gold/20">
            <h3 className="text-lg font-semibold text-pittsburgh-black mb-4">Rating Breakdown</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]
                const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0

                return (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="w-3 h-3 text-pittsburgh-gold fill-current" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-pittsburgh-gold h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-sm text-steel-gray">
                      {count}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <ReviewForm
                businessId={businessId}
                businessName={businessName}
                onSubmit={handleReviewSubmit}
                onCancel={() => setShowReviewForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Filters and Sorting */}
      <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-steel-gray" />
          <span className="text-sm font-medium text-pittsburgh-black">Filter:</span>
        </div>

        <select
          value={filters.rating || ''}
          onChange={(e) => setFilters(prev => ({
            ...prev,
            rating: e.target.value ? parseInt(e.target.value) as Rating : undefined
          }))}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
        >
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>

        <select
          value={filters.verified === undefined ? '' : filters.verified.toString()}
          onChange={(e) => setFilters(prev => ({
            ...prev,
            verified: e.target.value === '' ? undefined : e.target.value === 'true'
          }))}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
        >
          <option value="">All Reviews</option>
          <option value="true">Verified Only</option>
        </select>

        <div className="flex items-center gap-2 ml-auto">
          <SortAsc className="w-4 h-4 text-steel-gray" />
          <span className="text-sm font-medium text-pittsburgh-black">Sort:</span>
        </div>

        <select
          value={filters.sortBy}
          onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-steel-gray mb-2">No Reviews Yet</h3>
          <p className="text-steel-gray mb-6">
            Be the first to share your experience with {businessName}!
          </p>
          {allowSubmission && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="btn-primary"
            >
              Write the First Review
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onHelpful={handleHelpfulVote}
            />
          ))}

          {/* Load More */}
          {reviews.length >= (filters.limit || 10) && (
            <div className="text-center">
              <button
                onClick={() => setFilters(prev => ({
                  ...prev,
                  limit: (prev.limit || 10) + 10
                }))}
                className="btn-secondary"
              >
                Load More Reviews
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
