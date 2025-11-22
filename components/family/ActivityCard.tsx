'use client'

import { useState } from 'react'
import { MapPin, Clock, DollarSign, Star, Heart, Share2, Phone, Globe, Users, Award } from 'lucide-react'
import type { KidsActivity } from '@/data/pittsburghFamily'
import { motion } from 'framer-motion'

interface ActivityCardProps {
  activity: KidsActivity
  onFavorite?: (id: string) => void
  isFavorite?: boolean
}

export default function ActivityCard({ activity, onFavorite, isFavorite = false }: ActivityCardProps) {
  const [imageError, setImageError] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: activity.name,
          text: activity.description,
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    }
  }

  const getPriceDisplay = () => {
    if (activity.priceRange === 'Free') return 'Free'
    if (activity.price) {
      if (activity.price.family) return `Family: $${activity.price.family}`
      if (activity.price.child && activity.price.adult) {
        return `Child: $${activity.price.child} | Adult: $${activity.price.adult}`
      }
      if (activity.price.child) return `$${activity.price.child}`
      if (activity.price.adult) return `$${activity.price.adult}`
    }
    return activity.priceRange
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
        {!imageError && activity.images && activity.images[0] ? (
          <img
            src={activity.images[0]}
            alt={activity.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
            {activity.name.charAt(0)}
          </div>
        )}
        {activity.featured && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
            <Award className="w-3 h-3" />
            Featured
          </div>
        )}
        {activity.verified && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
            Verified
          </div>
        )}
        <div className="absolute bottom-2 right-2 flex gap-2">
          <button
            onClick={() => onFavorite?.(activity.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full backdrop-blur-sm bg-white/80 text-gray-700 hover:bg-white transition-colors"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{activity.name}</h3>
          {activity.rating && (
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold">{activity.rating}</span>
              {activity.reviewCount && (
                <span className="text-xs text-gray-500">({activity.reviewCount})</span>
              )}
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{activity.description}</p>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{activity.location.neighborhood}</span>
          <span className="text-gray-300">•</span>
          <Users className="w-4 h-4" />
          <span>{activity.ageRange}</span>
        </div>

        <div className="flex items-center gap-4 text-sm mb-3">
          {activity.hours && (
            <div className="flex items-center gap-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Open</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-gray-600">
            <DollarSign className="w-4 h-4" />
            <span>{getPriceDisplay()}</span>
          </div>
        </div>

        {activity.features && activity.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {activity.features.slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-4">
          {activity.phone && (
            <a
              href={`tel:${activity.phone}`}
              className="flex-1 px-3 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700 transition-colors text-sm"
            >
              <Phone className="w-4 h-4 inline mr-1" />
              Call
            </a>
          )}
          {activity.website && (
            <a
              href={activity.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 text-center rounded hover:bg-gray-300 transition-colors text-sm"
            >
              <Globe className="w-4 h-4 inline mr-1" />
              Website
            </a>
          )}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 bg-green-600 text-white text-center rounded hover:bg-green-700 transition-colors text-sm"
          >
            <MapPin className="w-4 h-4 inline mr-1" />
            Directions
          </a>
        </div>
      </div>
    </motion.div>
  )
}

