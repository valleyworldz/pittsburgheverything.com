'use client'

import { useState } from 'react'
import { Star, ThumbsUp, ThumbsDown, Shield, CheckCircle, MessageCircle } from 'lucide-react'
import type { Review } from '@/types'

interface ReviewCardProps {
  review: Review
  showBusiness?: boolean
  compact?: boolean
  onHelpful?: (reviewId: string, helpful: boolean) => void
}

export default function ReviewCard({ review, showBusiness = false, compact = false, onHelpful }: ReviewCardProps) {
  const [userVote, setUserVote] = useState<'helpful' | 'notHelpful' | null>(null)

  const handleVote = (helpful: boolean) => {
    if (userVote !== null) return // Already voted

    setUserVote(helpful ? 'helpful' : 'notHelpful')
    onHelpful?.(review.id, helpful)
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
        <span className="ml-2 text-sm font-semibold text-pittsburgh-black">
          {rating}/5
        </span>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (compact) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {renderStars(review.rating)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-pittsburgh-black truncate">
                {review.title}
              </h4>
              {review.verified && (
                <div title="Verified Review">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
              )}
            </div>
            <p className="text-steel-gray text-sm mb-2 line-clamp-2">
              {review.content}
            </p>
            <div className="flex items-center gap-4 text-xs text-steel-gray">
              <span>{review.userName}</span>
              <span>{formatDate(review.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-pittsburgh-gold/10 rounded-full flex items-center justify-center">
              <span className="text-pittsburgh-gold font-bold text-lg">
                {review.userName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-pittsburgh-black">
                {review.userName}
              </h3>
              {review.verified && (
                <div className="flex items-center gap-1 text-green-600 text-sm" title="Verified Review">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verified</span>
                </div>
              )}
            </div>
            {showBusiness && (
              <p className="text-steel-gray text-sm mb-2">
                {review.businessName} • {review.businessCategory}
              </p>
            )}
            {renderStars(review.rating)}
          </div>
        </div>
        <div className="text-right text-sm text-steel-gray">
          {formatDate(review.createdAt)}
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-4">
        <h4 className="font-semibold text-pittsburgh-black mb-2">
          {review.title}
        </h4>
        <p className="text-steel-gray leading-relaxed">
          {review.content}
        </p>
      </div>

      {/* Pros and Cons */}
      {(review.pros && review.pros.length > 0) || (review.cons && review.cons.length > 0) && (
        <div className="mb-4 space-y-3">
          {review.pros && review.pros.length > 0 && (
            <div>
              <h5 className="text-sm font-semibold text-green-700 mb-2">What they liked:</h5>
              <ul className="space-y-1">
                {review.pros.map((pro, index) => (
                  <li key={index} className="text-sm text-green-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {review.cons && review.cons.length > 0 && (
            <div>
              <h5 className="text-sm font-semibold text-red-700 mb-2">Could be improved:</h5>
              <ul className="space-y-1">
                {review.cons.map((con, index) => (
                  <li key={index} className="text-sm text-red-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Business Response */}
      {review.response && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-800">
              Response from {review.businessName}
            </span>
          </div>
          <p className="text-blue-700 text-sm leading-relaxed">
            {review.response.content}
          </p>
          <p className="text-blue-600 text-xs mt-2">
            {formatDate(review.response.createdAt)}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleVote(true)}
            disabled={userVote !== null}
            className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full transition-colors ${
              userVote === 'helpful'
                ? 'bg-green-100 text-green-700'
                : userVote === null
                ? 'hover:bg-green-50 text-steel-gray hover:text-green-600'
                : 'text-steel-gray opacity-50 cursor-not-allowed'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>Helpful ({review.helpful + (userVote === 'helpful' ? 1 : 0)})</span>
          </button>
          <button
            onClick={() => handleVote(false)}
            disabled={userVote !== null}
            className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full transition-colors ${
              userVote === 'notHelpful'
                ? 'bg-red-100 text-red-700'
                : userVote === null
                ? 'hover:bg-red-50 text-steel-gray hover:text-red-600'
                : 'text-steel-gray opacity-50 cursor-not-allowed'
            }`}
          >
            <ThumbsDown className="w-4 h-4" />
            <span>Not helpful ({review.notHelpful + (userVote === 'notHelpful' ? 1 : 0)})</span>
          </button>
        </div>

        <div className="text-xs text-steel-gray">
          Review #{review.id.slice(0, 8)}
        </div>
      </div>
    </div>
  )
}
