'use client'

import { useState } from 'react'
import { MapPin, Clock, DollarSign, Star, Heart, Share2, Phone, Globe, Utensils, Award } from 'lucide-react'
import type { FamilyRestaurant } from '@/data/pittsburghFamily'
import { motion } from 'framer-motion'

interface RestaurantCardProps {
  restaurant: FamilyRestaurant
  onFavorite?: (id: string) => void
  isFavorite?: boolean
}

// Helper function to check if restaurant is open
function checkIfOpen(hours?: { [key: string]: string }): boolean | null {
  if (!hours) return null
  
  const now = new Date()
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const currentDay = dayNames[now.getDay()]
  const todayHours = hours[currentDay]
  
  if (!todayHours || todayHours === 'Closed') return false
  if (todayHours === '24 Hours') return true
  
  // Simple check - if hours exist, assume open (can be enhanced)
  return true
}

export default function RestaurantCard({ restaurant, onFavorite, isFavorite = false }: RestaurantCardProps) {
  const [imageError, setImageError] = useState(false)
  const isOpen = checkIfOpen(restaurant.hours)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: restaurant.name,
          text: restaurant.description,
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{restaurant.name}</h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">{restaurant.rating}</span>
            {restaurant.reviewCount && (
              <span className="text-xs text-gray-500">({restaurant.reviewCount})</span>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{restaurant.description}</p>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{restaurant.location.neighborhood}</span>
          <span className="text-gray-300">•</span>
          <DollarSign className="w-4 h-4" />
          <span>{restaurant.priceRange}</span>
        </div>

        {isOpen !== null && (
          <div className="flex items-center gap-2 text-sm mb-3">
            <Clock className="w-4 h-4" />
            <span className={isOpen ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
              {isOpen ? 'Open Now' : 'Closed'}
            </span>
          </div>
        )}

        {restaurant.featured && (
          <div className="inline-flex items-center gap-1 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold mb-2">
            <Award className="w-3 h-3" />
            Featured
          </div>
        )}
        {restaurant.verified && (
          <div className="inline-flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold mb-2 ml-2">
            Verified
          </div>
        )}
      </div>

      {/* Kid-Friendly Features */}
      <div className="p-4 bg-blue-50">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Kid-Friendly Features</h4>
        <div className="flex flex-wrap gap-2 mb-3">
          {restaurant.kidFriendlyFeatures.map((feature, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          {restaurant.amenities.highChairs && (
            <div className="flex items-center gap-1">
              <Utensils className="w-3 h-3" />
              <span>High Chairs</span>
            </div>
          )}
          {restaurant.amenities.changingTables && (
            <div className="flex items-center gap-1">
              <span>✓</span>
              <span>Changing Tables</span>
            </div>
          )}
          {restaurant.amenities.kidsMenu && (
            <div className="flex items-center gap-1">
              <span>✓</span>
              <span>Kids Menu</span>
            </div>
          )}
          {restaurant.amenities.playArea && (
            <div className="flex items-center gap-1">
              <span>✓</span>
              <span>Play Area</span>
            </div>
          )}
          {restaurant.amenities.strollerFriendly && (
            <div className="flex items-center gap-1">
              <span>✓</span>
              <span>Stroller Friendly</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <span>Noise:</span>
            <span className="capitalize">{restaurant.amenities.noiseLevel}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t flex gap-2">
        <button
          onClick={() => onFavorite?.(restaurant.id)}
          className={`p-2 rounded transition-colors ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        <button
          onClick={handleShare}
          className="p-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
        {restaurant.phone && (
          <a
            href={`tel:${restaurant.phone}`}
            className="flex-1 px-3 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700 transition-colors text-sm"
          >
            <Phone className="w-4 h-4 inline mr-1" />
            Call
          </a>
        )}
        {restaurant.website && (
          <a
            href={restaurant.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 text-center rounded hover:bg-gray-300 transition-colors text-sm"
          >
            <Globe className="w-4 h-4 inline mr-1" />
            Website
          </a>
        )}
      </div>
    </motion.div>
  )
}

