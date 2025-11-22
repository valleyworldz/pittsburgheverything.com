'use client'

import { Clock, User, Calendar, BookOpen, Share2, Heart, CheckCircle, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import type { Guide } from '@/data/pittsburghGuides'

interface GuideCardProps {
  guide: Guide
  onShare?: (guideId: string) => void
}

export default function GuideCard({ guide, onShare }: GuideCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: guide.title,
        text: guide.excerpt,
        url: `/guides/${guide.category}/${guide.slug}`
      }).catch(() => {})
    } else if (onShare) {
      onShare(guide.id)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ultimate':
        return 'bg-blue-100 text-blue-800'
      case 'seasonal':
        return 'bg-green-100 text-green-800'
      case 'weekend':
        return 'bg-purple-100 text-purple-800'
      case 'moving':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'ultimate':
        return 'Ultimate'
      case 'seasonal':
        return 'Seasonal'
      case 'weekend':
        return 'Weekend'
      case 'moving':
        return 'Moving'
      default:
        return category
    }
  }

  return (
    <Link
      href={`/guides/${guide.category}/${guide.slug}`}
      className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-transparent hover:border-pittsburgh-gold"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(guide.category)}`}>
              {getCategoryLabel(guide.category)}
            </span>
            {guide.verified && (
              <div className="relative group">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Verified Guide
                </span>
              </div>
            )}
            {guide.featured && (
              <span className="bg-pittsburgh-gold text-pittsburgh-black px-2 py-1 rounded-full text-xs font-semibold">
                Featured
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-pittsburgh-black mb-2 hover:text-pittsburgh-gold transition-colors">
            {guide.title}
          </h3>
          {guide.subcategory && (
            <p className="text-sm text-gray-500 mb-2">{guide.subcategory}</p>
          )}
        </div>

        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          <button
            onClick={handleFavorite}
            className={`p-2 rounded-full transition-colors ${
              isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
            aria-label="Save guide"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full text-gray-400 hover:text-pittsburgh-gold hover:bg-yellow-50 transition-colors"
            aria-label="Share guide"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{guide.excerpt}</p>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 flex-wrap">
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {guide.readingTime} min read
        </span>
        <span className="flex items-center gap-1">
          <User className="w-4 h-4" />
          {guide.author}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {new Date(guide.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      {guide.tags && guide.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {guide.tags.slice(0, 4).map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
          {guide.tags.length > 4 && (
            <span className="text-xs text-gray-500">+{guide.tags.length - 4}</span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-600">Last updated: {new Date(guide.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        <span className="flex items-center gap-1 text-pittsburgh-gold font-semibold text-sm hover:gap-2 transition-all">
          Read Guide
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  )
}

