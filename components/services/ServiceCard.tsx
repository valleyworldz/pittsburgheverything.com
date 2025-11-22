'use client'

import { MapPin, Phone, Mail, Globe, Star, Share2, Heart, Clock, CheckCircle, DollarSign } from 'lucide-react'
import { useState } from 'react'
import type { ServiceBusiness } from '@/data/pittsburghServices'

interface ServiceCardProps {
  service: ServiceBusiness
  onContact?: (serviceId: string) => void
  onShare?: (serviceId: string) => void
}

export default function ServiceCard({ service, onContact, onShare }: ServiceCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: service.name,
        text: service.description,
        url: window.location.href
      }).catch(() => {})
    } else if (onShare) {
      onShare(service.id)
    }
  }

  const getPriceRangeDisplay = (range: string) => {
    const ranges: Record<string, string> = {
      '$': 'Budget Friendly',
      '$$': 'Moderate',
      '$$$': 'Premium',
      '$$$$': 'Luxury'
    }
    return ranges[range] || range
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < fullStars
                ? 'fill-yellow-400 text-yellow-400'
                : i === fullStars && hasHalfStar
                ? 'fill-yellow-400/50 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({service.reviewCount})</span>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-pittsburgh-gold">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-pittsburgh-black">{service.name}</h3>
            {service.verified && (
              <div className="relative group">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Verified Business
                </span>
              </div>
            )}
            {service.featured && (
              <span className="bg-pittsburgh-gold text-pittsburgh-black px-2 py-1 rounded-full text-xs font-semibold">
                Featured
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-2">{service.subcategory}</p>
          {renderStars(service.rating)}
        </div>

        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={handleFavorite}
            className={`p-2 rounded-full transition-colors ${
              isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
            aria-label="Save service"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full text-gray-400 hover:text-pittsburgh-gold hover:bg-yellow-50 transition-colors"
            aria-label="Share service"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{service.description}</p>

      {/* Location and Details */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 flex-wrap">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {service.location.neighborhood}
        </span>
        <span className="flex items-center gap-1">
          <DollarSign className="w-4 h-4" />
          {getPriceRangeDisplay(service.priceRange)}
        </span>
        {service.yearsInBusiness && (
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {service.yearsInBusiness} years
          </span>
        )}
        {service.emergencyService && (
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
            24/7 Emergency
          </span>
        )}
      </div>

      {/* Services */}
      {service.services && service.services.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Services:</p>
          <div className="flex flex-wrap gap-2">
            {service.services.slice(0, 4).map((s, index) => (
              <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                {s}
              </span>
            ))}
            {service.services.length > 4 && (
              <span className="text-xs text-gray-500 px-2 py-1">+{service.services.length - 4} more</span>
            )}
          </div>
        </div>
      )}

      {/* Contact Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          {service.contact.phone && (
            <a
              href={`tel:${service.contact.phone}`}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-pittsburgh-gold transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
          )}
          {service.contact.email && (
            <a
              href={`mailto:${service.contact.email}`}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-pittsburgh-gold transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
          )}
          {service.contact.website && (
            <a
              href={service.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-pittsburgh-gold transition-colors"
            >
              <Globe className="w-4 h-4" />
              Website
            </a>
          )}
        </div>
        {service.acceptsOnlineBooking && (
          <button
            onClick={() => onContact?.(service.id)}
            className="bg-pittsburgh-gold text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  )
}

