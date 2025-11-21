'use client'

import { useState, useEffect } from 'react'
import { Star, MessageSquare, TrendingUp, Users, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import type { Review, ReviewStats } from '@/types'

export default function BusinessReviewDashboard() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [responseText, setResponseText] = useState('')

  // Mock business ID - in real app, this would come from authentication
  const businessId = '1' // Primanti Bros for demo

  useEffect(() => {
    fetchReviews()
    fetchStats()
  }, [businessId])

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?businessId=${businessId}&sortBy=newest`)
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
      console.error('Error fetching stats:', error)
    }
  }

  const handleRespondToReview = async (reviewId: string) => {
    if (!responseText.trim()) return

    try {
      const response = await fetch('/api/reviews/respond', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewId,
          businessId,
          content: responseText.trim(),
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Update local state with the response
        setReviews(prev => prev.map(review =>
          review.id === reviewId
            ? { ...review, response: result.data }
            : review
        ))

        setSelectedReview(null)
        setResponseText('')
      } else {
        console.error('Failed to post response:', result.message)
        alert('Failed to post response: ' + result.message)
      }
    } catch (error) {
      console.error('Error responding to review:', error)
      alert('An error occurred while posting your response. Please try again.')
    }
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
        <span className="ml-1 text-sm font-semibold">{rating}/5</span>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Published</span>
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Pending</span>
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Rejected</span>
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{status}</span>
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-pittsburgh-black mb-2">Review Dashboard</h1>
        <p className="text-steel-gray">Manage customer reviews and build your reputation</p>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-pittsburgh-gold" />
              <div>
                <div className="text-2xl font-bold text-pittsburgh-black">{stats.averageRating.toFixed(1)}</div>
                <div className="text-sm text-steel-gray">Average Rating</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-pittsburgh-black">{stats.totalReviews}</div>
                <div className="text-sm text-steel-gray">Total Reviews</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-pittsburgh-black">{stats.recommendedPercentage}%</div>
                <div className="text-sm text-steel-gray">Would Recommend</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-500" />
              <div>
                <div className="text-2xl font-bold text-pittsburgh-black">{stats.verifiedReviews}</div>
                <div className="text-sm text-steel-gray">Verified Reviews</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-pittsburgh-black">Recent Reviews</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {reviews.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-steel-gray mb-2">No Reviews Yet</h3>
              <p className="text-steel-gray">Reviews will appear here once customers start sharing their experiences.</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-pittsburgh-gold/10 rounded-full flex items-center justify-center">
                      <span className="text-pittsburgh-gold font-bold">
                        {review.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-pittsburgh-black">{review.userName}</h3>
                        {renderStars(review.rating)}
                        {getStatusBadge(review.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-steel-gray mb-2">
                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                        {review.verified && (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!review.response && review.status === 'approved' && (
                      <button
                        onClick={() => setSelectedReview(review)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
                      >
                        Respond
                      </button>
                    )}
                  </div>
                </div>

                <div className="ml-14">
                  <h4 className="font-semibold text-pittsburgh-black mb-2">{review.title}</h4>
                  <p className="text-steel-gray mb-3">{review.content}</p>

                  {/* Pros and Cons */}
                  {(review.pros && review.pros.length > 0) || (review.cons && review.cons.length > 0) ? (
                    <div className="mb-3 space-y-2">
                      {review.pros && review.pros.length > 0 && (
                        <div>
                          <span className="text-sm font-medium text-green-700">What they liked:</span>
                          <p className="text-sm text-green-600 mt-1">{review.pros.join(', ')}</p>
                        </div>
                      )}
                      {review.cons && review.cons.length > 0 && (
                        <div>
                          <span className="text-sm font-medium text-red-700">Could be improved:</span>
                          <p className="text-sm text-red-600 mt-1">{review.cons.join(', ')}</p>
                        </div>
                      )}
                    </div>
                  ) : null}

                  {/* Business Response */}
                  {review.response && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-800">Your Response</span>
                        <span className="text-xs text-blue-600">
                          {new Date(review.response.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-blue-700">{review.response.content}</p>
                    </div>
                  )}

                  {/* Response Form */}
                  {selectedReview?.id === review.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-semibold text-pittsburgh-black mb-3">Respond to this review</h5>
                      <textarea
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        placeholder="Write a thoughtful response to show you care about customer feedback..."
                        className="w-full p-3 border border-gray-300 rounded-lg mb-3 h-24 resize-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRespondToReview(review.id)}
                          disabled={!responseText.trim()}
                          className="px-4 py-2 bg-pittsburgh-gold text-pittsburgh-black rounded hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Post Response
                        </button>
                        <button
                          onClick={() => {
                            setSelectedReview(null)
                            setResponseText('')
                          }}
                          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
