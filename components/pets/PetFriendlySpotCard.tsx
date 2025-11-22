'use client'

import { useState } from 'react'
import { MapPin, Clock, Star, Heart, Share2, Phone, Globe, Award, Dog } from 'lucide-react'
import type { PetFriendlySpot } from '@/data/pittsburghPets'
import { motion } from 'framer-motion'

interface PetFriendlySpotCardProps {
  spot: PetFriendlySpot
  onFavorite?: (id: string) => void
  isFavorite?: boolean
}

export default function PetFriendlySpotCard({ spot, onFavorite, isFavorite = false }: PetFriendlySpotCardProps) {
  const [imageError, setImageError] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: spot.name,
          text: spot.description,
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    }
  }

  const getTypeLabel = () => {
    return spot.type.charAt(0).toUpperCase() + spot.type.slice(1)
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
          <div>
            <h3 className="text-xl font-bold text-gray-900">{spot.name}</h3>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded mt-1 inline-block">
              {getTypeLabel()}
            </span>
          </div>
          {spot.rating && (
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold">{spot.rating}</span>
              {spot.reviewCount && (
                <span className="text-xs text-gray-500">({spot.reviewCount})</span>
              )}
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{spot.description}</p>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{spot.location.neighborhood}</span>
        </div>

        {spot.featured && (
          <div className="inline-flex items-center gap-1 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold mb-2">
            <Award className="w-3 h-3" />
            Featured
          </div>
        )}
        {spot.verified && (
          <div className="inline-flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold mb-2 ml-2">
            Verified
          </div>
        )}
      </div>

      {/* Pet Policy */}
      <div className="p-4 bg-blue-50">
        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
          <Dog className="w-4 h-4" />
          Pet Policy
        </h4>
        <div className="space-y-1 text-xs text-gray-700">
          {spot.petPolicy.allowed ? (
            <>
              <div className="flex items-center gap-1 text-green-700 font-semibold">
                <span>✓</span>
                <span>Pets Welcome</span>
              </div>
              {spot.petPolicy.leashRequired && (
                <div>• Leash required</div>
              )}
              {spot.petPolicy.outdoorOnly && (
                <div>• Outdoor seating only</div>
              )}
              {spot.petPolicy.restrictions && (
                <div>• {spot.petPolicy.restrictions}</div>
              )}
              {spot.petPolicy.sizeLimit && (
                <div>• Size limit: {spot.petPolicy.sizeLimit}</div>
              )}
              {spot.petPolicy.fee !== undefined && spot.petPolicy.fee > 0 && (
                <div>• Fee: ${spot.petPolicy.fee}</div>
              )}
              {spot.petPolicy.notes && (
                <div className="text-gray-600 italic">• {spot.petPolicy.notes}</div>
              )}
            </>
          ) : (
            <div className="text-red-700">Pets not allowed</div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t flex gap-2">
        <button
          onClick={() => onFavorite?.(spot.id)}
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
        {spot.phone && (
          <a
            href={`tel:${spot.phone}`}
            className="flex-1 px-3 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700 transition-colors text-sm"
          >
            <Phone className="w-4 h-4 inline mr-1" />
            Call
          </a>
        )}
        {spot.website && (
          <a
            href={spot.website}
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

