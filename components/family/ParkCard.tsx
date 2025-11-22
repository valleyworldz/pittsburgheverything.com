'use client'

import { useState } from 'react'
import { MapPin, Clock, Heart, Share2, Globe, Award, Trees } from 'lucide-react'
import type { ParkPlayground } from '@/data/pittsburghFamily'
import { motion } from 'framer-motion'

interface ParkCardProps {
  park: ParkPlayground
  onFavorite?: (id: string) => void
  isFavorite?: boolean
}

export default function ParkCard({ park, onFavorite, isFavorite = false }: ParkCardProps) {
  const [imageError, setImageError] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: park.name,
          text: park.description,
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
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-green-400 to-blue-500">
        {!imageError && park.images && park.images[0] ? (
          <img
            src={park.images[0]}
            alt={park.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
            <Trees className="w-12 h-12" />
          </div>
        )}
        {park.featured && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
            <Award className="w-3 h-3" />
            Featured
          </div>
        )}
        {park.verified && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
            Verified
          </div>
        )}
        <div className="absolute bottom-2 right-2 flex gap-2">
          <button
            onClick={() => onFavorite?.(park.id)}
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
          <h3 className="text-xl font-bold text-gray-900">{park.name}</h3>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded capitalize">
            {park.type.replace('-', ' ')}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{park.description}</p>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{park.location.neighborhood}</span>
          {park.ageRange && (
            <>
              <span className="text-gray-300">•</span>
              <span>{park.ageRange}</span>
            </>
          )}
        </div>

        {park.hours && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Clock className="w-4 h-4" />
            <span>{park.hours}</span>
          </div>
        )}

        {/* Features */}
        {park.features && park.features.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Features</h4>
            <div className="flex flex-wrap gap-1">
              {park.features.slice(0, 6).map((feature, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Amenities */}
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Amenities</h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            {park.amenities.playground && <div>✓ Playground</div>}
            {park.amenities.splashPad && <div>✓ Splash Pad</div>}
            {park.amenities.sportsFields && <div>✓ Sports Fields</div>}
            {park.amenities.walkingTrails && <div>✓ Walking Trails</div>}
            {park.amenities.picnicAreas && <div>✓ Picnic Areas</div>}
            {park.amenities.restrooms && <div>✓ Restrooms</div>}
            {park.amenities.parking && <div>✓ Parking</div>}
            {park.amenities.wheelchairAccessible && <div>✓ Wheelchair Accessible</div>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          {park.website && (
            <a
              href={park.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 text-center rounded hover:bg-gray-300 transition-colors text-sm"
            >
              <Globe className="w-4 h-4 inline mr-1" />
              Website
            </a>
          )}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(park.location.address)}`}
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

