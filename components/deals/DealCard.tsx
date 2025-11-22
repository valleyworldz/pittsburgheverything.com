'use client'

import { MapPin, Phone, Globe, Share2, Heart, Clock, Tag, CheckCircle, DollarSign, Calendar } from 'lucide-react'
import { useState } from 'react'
import type { Deal } from '@/data/pittsburghDeals'
import CountdownTimer from '@/components/live/CountdownTimer'

interface DealCardProps {
  deal: Deal
  onContact?: (dealId: string) => void
  onShare?: (dealId: string) => void
}

export default function DealCard({ deal, onContact, onShare }: DealCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: `${deal.title} at ${deal.business.name}`,
        text: deal.description,
        url: window.location.href
      }).catch(() => {})
    } else if (onShare) {
      onShare(deal.id)
    }
  }

  const getDiscountColor = (type: string) => {
    switch (type) {
      case 'percentage':
        return 'bg-red-500'
      case 'dollar':
        return 'bg-green-500'
      case 'buy-one-get-one':
        return 'bg-purple-500'
      case 'free-item':
        return 'bg-blue-500'
      default:
        return 'bg-pittsburgh-gold'
    }
  }

  const isActive = () => {
    const today = new Date()
    const validFrom = new Date(deal.validFrom)
    const validUntil = new Date(deal.validUntil)
    return today >= validFrom && today <= validUntil
  }

  const isToday = () => {
    if (!deal.daysOfWeek || deal.daysOfWeek.length === 0) return true
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
    return deal.daysOfWeek.includes(today)
  }

  const isNow = () => {
    if (!deal.timeRange) return true
    const now = new Date()
    const currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    const [start, end] = [deal.timeRange.start, deal.timeRange.end]
    // Simple time comparison (could be enhanced)
    return true // For now, assume active if day matches
  }

  const canUse = isActive() && isToday() && isNow()

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-all duration-300 border-l-4 ${
      deal.featured ? 'border-pittsburgh-gold' : 'border-transparent'
    } ${!canUse ? 'opacity-75' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {deal.verified && (
              <div className="relative group">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Verified Deal
                </span>
              </div>
            )}
            {deal.featured && (
              <span className="bg-pittsburgh-gold text-pittsburgh-black px-2 py-1 rounded-full text-xs font-semibold">
                Featured
              </span>
            )}
            {deal.discount && (
              <span className={`${getDiscountColor(deal.discount.type)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                {deal.discount.display}
              </span>
            )}
            {!canUse && (
              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs font-semibold">
                Not Available Now
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-pittsburgh-black mb-1 hover:text-pittsburgh-gold transition-colors">
            {deal.title}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-gray-600 font-medium">{deal.business.name}</span>
            {deal.business.rating && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span className="text-yellow-500">★</span>
                <span>{deal.business.rating}</span>
                {deal.business.reviewCount && (
                  <span className="text-gray-400">({deal.business.reviewCount})</span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={handleFavorite}
            className={`p-2 rounded-full transition-colors ${
              isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
            aria-label="Save deal"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full text-gray-400 hover:text-pittsburgh-gold hover:bg-yellow-50 transition-colors"
            aria-label="Share deal"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{deal.description}</p>

      {/* Location and Details */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 flex-wrap">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {deal.business.location.neighborhood}
        </span>
        {deal.savings && (
          <span className="flex items-center gap-1 text-green-600 font-semibold">
            <DollarSign className="w-4 h-4" />
            Save ${deal.savings}
          </span>
        )}
        {deal.daysOfWeek && deal.daysOfWeek.length > 0 && (
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {deal.daysOfWeek.join(', ')}
          </span>
        )}
        {deal.timeRange && (
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {deal.timeRange.start} - {deal.timeRange.end}
          </span>
        )}
      </div>

      {/* Countdown Timer */}
      {deal.validUntil && (
        <div className="mb-4 p-3 bg-red-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-red-700 mb-1">
            <Clock className="w-4 h-4" />
            <span className="font-semibold">Expires:</span>
          </div>
          <CountdownTimer endTime={new Date(deal.validUntil).toISOString()} />
        </div>
      )}

      {/* Restrictions */}
      {deal.restrictions && deal.restrictions.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Restrictions:</p>
          <ul className="text-xs text-gray-600 space-y-1">
            {deal.restrictions.slice(0, 2).map((restriction, index) => (
              <li key={index} className="flex items-start gap-1">
                <span className="text-gray-400">•</span>
                <span>{restriction}</span>
              </li>
            ))}
            {deal.restrictions.length > 2 && (
              <li className="text-gray-500">+{deal.restrictions.length - 2} more</li>
            )}
          </ul>
        </div>
      )}

      {/* Usage Stats */}
      {deal.maxUses && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Deal Usage</span>
            <span>{deal.currentUses || 0} / {deal.maxUses} used</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-pittsburgh-gold h-2 rounded-full transition-all"
              style={{ width: `${((deal.currentUses || 0) / deal.maxUses) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          {deal.business.phone && (
            <a
              href={`tel:${deal.business.phone}`}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-pittsburgh-gold transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
          )}
          {deal.business.website && (
            <a
              href={deal.business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-pittsburgh-gold transition-colors"
            >
              <Globe className="w-4 h-4" />
              Website
            </a>
          )}
        </div>
        {deal.couponCode && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Code:</span>
            <span className="bg-gray-100 text-pittsburgh-black px-2 py-1 rounded text-xs font-mono font-semibold">
              {deal.couponCode}
            </span>
          </div>
        )}
        <button
          onClick={() => onContact?.(deal.id)}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            canUse
              ? 'bg-pittsburgh-gold text-white hover:bg-yellow-500'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
          disabled={!canUse}
        >
          {deal.redemptionMethod === 'coupon-code' ? 'Get Code' : 'Claim Deal'}
        </button>
      </div>
    </div>
  )
}

