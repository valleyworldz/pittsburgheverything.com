'use client'

import { useState } from 'react'
import { MapPin, Clock, TrendingUp, ExternalLink, Share2, Heart } from 'lucide-react'
import CountdownTimer from './CountdownTimer'

interface LiveCardProps {
  id: string
  type: 'event' | 'deal' | 'news' | 'weather' | 'sports'
  title: string
  subtitle?: string
  description: string
  location?: string
  time?: string
  endTime?: Date | string
  trending?: string
  priority?: 'high' | 'normal' | 'low'
  icon?: string
  image?: string
  url?: string
  metadata?: Record<string, any>
  onFavorite?: (id: string) => void
  isFavorite?: boolean
}

export default function LiveCard({
  id,
  type,
  title,
  subtitle,
  description,
  location,
  time,
  endTime,
  trending,
  priority = 'normal',
  icon,
  image,
  url,
  metadata,
  onFavorite,
  isFavorite = false
}: LiveCardProps) {
  const [imageError, setImageError] = useState(false)

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'event': 'bg-blue-500',
      'deal': 'bg-green-500',
      'news': 'bg-purple-500',
      'weather': 'bg-orange-500',
      'sports': 'bg-red-500'
    }
    return colors[type] || 'bg-gray-500'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-blue-500'
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: url || window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(url || window.location.href)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
      {/* Header Badge */}
      <div className={`${getTypeColor(type)} text-white px-4 py-2 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          {trending && (
            <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-bold">
              {trending}
            </span>
          )}
          <span className="text-xs font-semibold uppercase">{type}</span>
        </div>
        {priority === 'high' && (
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="text-xs font-bold">LIVE</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          {icon && (
            <div className="text-3xl flex-shrink-0">{icon}</div>
          )}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-pittsburgh-black mb-1">
              {title}
            </h3>
            {subtitle && (
              <p className="text-gray-600 text-sm mb-2">{subtitle}</p>
            )}
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {onFavorite && (
              <button
                onClick={() => onFavorite(id)}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            )}
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>

        {/* Metadata */}
        <div className="space-y-2 mb-4">
          {location && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          )}
          {time && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{time}</span>
            </div>
          )}
          {endTime && (
            <div className="flex items-center gap-2 text-sm">
              <CountdownTimer endTime={endTime} />
            </div>
          )}
        </div>

        {/* Additional Metadata */}
        {metadata && Object.keys(metadata).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(metadata).slice(0, 3).map(([key, value]) => (
              <span
                key={key}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
              >
                {key}: {String(value)}
              </span>
            ))}
          </div>
        )}

        {/* Action Button */}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-pittsburgh-gold text-pittsburgh-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-sm"
          >
            Learn More
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  )
}

