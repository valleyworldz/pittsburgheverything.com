'use client'

import { useState } from 'react'
import { Star, ThumbsUp, ThumbsDown, Shield, CheckCircle, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'
import type { Review } from '@/types'

interface MobileReviewCardProps {
  review: Review
  showBusiness?: boolean
  compact?: boolean
  onHelpful?: (reviewId: string, helpful: boolean) => void
}

export default function MobileReviewCard({ review, showBusiness = false, compact = false, onHelpful }: MobileReviewCardProps) {
  const [userVote, setUserVote] = useState<'helpful' | 'notHelpful' | null>(null)
  const [showFullContent, setShowFullContent] = useState(false)
  const [showResponse, setShowResponse] = useState(false)

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
        <span className="ml-1 text-sm font-semibold text-pittsburgh-black">
          {rating}
        </span>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return diffInHours < 1 ? 'Just now' : `${diffInHours}h ago`
    } else if (diffInHours < 24 * 7) {
      return `${Math.floor(diffInHours / 24)}d ago`
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  const contentPreview = review.content.length > 150 ? review.content.substring(0, 150) + '...' : review.content

  if (compact) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 active:bg-gray-50 transition-colors">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-pittsburgh-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-pittsburgh-gold font-bold text-sm">
              {review.userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-pittsburgh-black text-sm truncate">
                  {review.userName}
                </span>
                {review.verified && (
                  <Shield className="w-3 h-3 text-green-600 flex-shrink-0" />
                )}
              </div>
              {renderStars(review.rating)}
            </div>
            <p className="text-steel-gray text-sm mb-2 line-clamp-2">
              {review.title || contentPreview}
            </p>
            <div className="flex items-center justify-between text-xs text-steel-gray">
              <span>{formatDate(review.createdAt)}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleVote(true)}
                  className={`flex items-center gap-1 ${
                    userVote === 'helpful' ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{review.helpful + (userVote === 'helpful' ? 1 : 0)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-pittsburgh-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-pittsburgh-gold font-bold">
              {review.userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-pittsburgh-black truncate">
                  {review.userName}
                </h3>
                {review.verified && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">Verified</span>
                  </div>
                )}
              </div>
              <span className="text-xs text-steel-gray">{formatDate(review.createdAt)}</span>
            </div>
            {showBusiness && (
              <p className="text-steel-gray text-sm mb-2 truncate">
                {review.businessName}
              </p>
            )}
            {renderStars(review.rating)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {review.title && (
          <h4 className="font-semibold text-pittsburgh-black mb-2">
            {review.title}
          </h4>
        )}

        <div className="text-steel-gray leading-relaxed">
          {showFullContent ? review.content : contentPreview}
          {review.content.length > 150 && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-pittsburgh-gold hover:text-pittsburgh-black text-sm font-medium ml-1"
            >
              {showFullContent ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Pros and Cons */}
        {(review.pros && review.pros.length > 0) || (review.cons && review.cons.length > 0) ? (
          <div className="mt-3 space-y-2">
            {review.pros && review.pros.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-green-700 mb-1">What they liked:</h5>
                <div className="flex flex-wrap gap-1">
                  {review.pros.map((pro, index) => (
                    <span key={index} className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      {pro}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {review.cons && review.cons.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-red-700 mb-1">Could be improved:</h5>
                <div className="flex flex-wrap gap-1">
                  {review.cons.map((con, index) => (
                    <span key={index} className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                      {con}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}

        {/* Business Response */}
        {review.response && (
          <div className="mt-4 border-l-4 border-blue-400 bg-blue-50 p-3 rounded-r-lg">
            <button
              onClick={() => setShowResponse(!showResponse)}
              className="flex items-center gap-2 text-blue-700 font-medium text-sm mb-2"
            >
              <MessageCircle className="w-4 h-4" />
              Business Response
              {showResponse ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showResponse && (
              <div>
                <p className="text-blue-800 text-sm leading-relaxed">
                  {review.response.content}
                </p>
                <p className="text-blue-600 text-xs mt-1">
                  {formatDate(review.response.createdAt)}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleVote(true)}
              disabled={userVote !== null}
              className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full transition-colors touch-manipulation ${
                userVote === 'helpful'
                  ? 'bg-green-100 text-green-700'
                  : userVote === null
                  ? 'hover:bg-green-50 text-steel-gray hover:text-green-600 active:bg-green-100'
                  : 'text-steel-gray opacity-50 cursor-not-allowed'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Helpful ({review.helpful + (userVote === 'helpful' ? 1 : 0)})</span>
            </button>
            <button
              onClick={() => handleVote(false)}
              disabled={userVote !== null}
              className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full transition-colors touch-manipulation ${
                userVote === 'notHelpful'
                  ? 'bg-red-100 text-red-700'
                  : userVote === null
                  ? 'hover:bg-red-50 text-steel-gray hover:text-red-600 active:bg-red-100'
                  : 'text-steel-gray opacity-50 cursor-not-allowed'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              <span>Not helpful ({review.notHelpful + (userVote === 'notHelpful' ? 1 : 0)})</span>
            </button>
          </div>

          <div className="text-xs text-steel-gray">
            #{review.id.slice(0, 6)}
          </div>
        </div>
      </div>
    </div>
  )
}
