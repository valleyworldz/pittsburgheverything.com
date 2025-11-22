'use client'

import { MapPin, Phone, Globe, Share2, Heart, Star, Award, TrendingUp, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import type { Top100Item } from '@/data/pittsburghTop100'

interface Top100CardProps {
  item: Top100Item
  onContact?: (itemId: string) => void
  onShare?: (itemId: string) => void
}

export default function Top100Card({ item, onContact, onShare }: Top100CardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: `#${item.rank} ${item.name} - Pittsburgh's Top 100`,
        text: item.description,
        url: window.location.href
      }).catch(() => {})
    } else if (onShare) {
      onShare(item.id)
    }
  }

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500 text-yellow-900'
    if (rank <= 3) return 'bg-gray-300 text-gray-800'
    if (rank <= 10) return 'bg-orange-200 text-orange-800'
    return 'bg-blue-100 text-blue-800'
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-all duration-300 border-l-4 ${
      item.rank === 1 ? 'border-yellow-500' :
      item.rank <= 3 ? 'border-gray-400' :
      item.rank <= 10 ? 'border-orange-400' : 'border-blue-400'
    }`}>
      {/* Header with Rank */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className={`${getRankBadgeColor(item.rank)} w-12 h-12 rounded-full flex items-center justify-center font-black text-lg flex-shrink-0`}>
            {getRankIcon(item.rank)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-xl font-bold text-pittsburgh-black hover:text-pittsburgh-gold transition-colors truncate">
                {item.name}
              </h3>
              {item.verified && (
                <div className="relative group">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Verified
                  </span>
                </div>
              )}
              {item.trending && (
                <div className="flex items-center gap-1 text-orange-500 flex-shrink-0">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-semibold">Trending</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
              <span className="font-medium">{item.category}</span>
              {item.subcategory && (
                <>
                  <span className="text-gray-400">•</span>
                  <span>{item.subcategory}</span>
                </>
              )}
              {item.priceRange && (
                <>
                  <span className="text-gray-400">•</span>
                  <span>{item.priceRange}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          <button
            onClick={handleFavorite}
            className={`p-2 rounded-full transition-colors ${
              isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
            aria-label="Save to favorites"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full text-gray-400 hover:text-pittsburgh-gold hover:bg-yellow-50 transition-colors"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 text-yellow-500 fill-current" />
          <span className="font-bold text-pittsburgh-black">{item.rating}</span>
        </div>
        <span className="text-sm text-gray-500">
          ({item.reviewCount.toLocaleString()} {item.reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{item.description}</p>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <MapPin className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">{item.location.neighborhood}</span>
      </div>

      {/* Awards */}
      {item.awards && item.awards.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Award className="w-4 h-4 text-pittsburgh-gold flex-shrink-0" />
            {item.awards.slice(0, 2).map((award, index) => (
              <span key={index} className="text-xs bg-yellow-50 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                {award}
              </span>
            ))}
            {item.awards.length > 2 && (
              <span className="text-xs text-gray-500">+{item.awards.length - 2} more</span>
            )}
          </div>
        </div>
      )}

      {/* Features */}
      {item.features && item.features.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {item.features.slice(0, 4).map((feature, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
            {item.features.length > 4 && (
              <span className="text-xs text-gray-500">+{item.features.length - 4}</span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          {item.phone && (
            <a
              href={`tel:${item.phone}`}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-pittsburgh-gold transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
          )}
          {item.website && (
            <a
              href={item.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-pittsburgh-gold transition-colors"
            >
              <Globe className="w-4 h-4" />
              Website
            </a>
          )}
        </div>
        <button
          onClick={() => onContact?.(item.id)}
          className="bg-pittsburgh-gold text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  )
}

