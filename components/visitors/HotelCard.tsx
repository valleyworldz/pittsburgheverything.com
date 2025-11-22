'use client'

import { MapPin, Phone, Globe, Share2, Heart, Star, Bed, CheckCircle, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import type { Hotel } from '@/data/pittsburghVisitors'

interface HotelCardProps {
  hotel: Hotel
  onShare?: (hotelId: string) => void
}

export default function HotelCard({ hotel, onShare }: HotelCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: hotel.name,
        text: hotel.description,
        url: window.location.href
      }).catch(() => {})
    } else if (onShare) {
      onShare(hotel.id)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'luxury':
        return 'bg-yellow-100 text-yellow-800'
      case 'boutique':
        return 'bg-purple-100 text-purple-800'
      case 'business':
        return 'bg-blue-100 text-blue-800'
      case 'budget':
        return 'bg-green-100 text-green-800'
      case 'extended-stay':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-all duration-300 border-l-4 ${
      hotel.featured ? 'border-pittsburgh-gold' : 'border-transparent'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {hotel.verified && (
              <div className="relative group">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Verified Hotel
                </span>
              </div>
            )}
            {hotel.featured && (
              <span className="bg-pittsburgh-gold text-pittsburgh-black px-2 py-1 rounded-full text-xs font-semibold">
                Featured
              </span>
            )}
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(hotel.category)}`}>
              {hotel.category.charAt(0).toUpperCase() + hotel.category.slice(1)}
            </span>
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold">
              {hotel.priceRange}
            </span>
          </div>

          <h3 className="text-xl font-bold text-pittsburgh-black mb-1 hover:text-pittsburgh-gold transition-colors">
            {hotel.name}
          </h3>
        </div>

        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          <button
            onClick={handleFavorite}
            className={`p-2 rounded-full transition-colors ${
              isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
            aria-label="Save hotel"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full text-gray-400 hover:text-pittsburgh-gold hover:bg-yellow-50 transition-colors"
            aria-label="Share hotel"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 text-yellow-500 fill-current" />
          <span className="font-bold text-pittsburgh-black">{hotel.rating}</span>
        </div>
        <span className="text-sm text-gray-500">
          ({hotel.reviewCount.toLocaleString()} {hotel.reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{hotel.description}</p>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <MapPin className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">{hotel.location.neighborhood}</span>
      </div>

      {hotel.amenities && hotel.amenities.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {hotel.amenities.slice(0, 6).map((amenity, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 6 && (
              <span className="text-xs text-gray-500">+{hotel.amenities.length - 6}</span>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          {hotel.phone && (
            <a
              href={`tel:${hotel.phone}`}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-pittsburgh-gold transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
          )}
          {hotel.website && (
            <a
              href={hotel.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-pittsburgh-gold transition-colors"
            >
              <Globe className="w-4 h-4" />
              Website
            </a>
          )}
        </div>
        {hotel.bookingUrl && (
          <a
            href={hotel.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pittsburgh-gold text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors inline-flex items-center gap-2 text-sm"
          >
            Book Now
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  )
}

