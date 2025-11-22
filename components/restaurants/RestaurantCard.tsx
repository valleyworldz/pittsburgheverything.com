'use client'

import { useState } from 'react'
import { MapPin, Clock, Star, DollarSign, Phone, Globe, ExternalLink, Heart, Share2, Navigation, Calendar, Users, Utensils } from 'lucide-react'
import Link from 'next/link'
import type { Restaurant } from '@/data/pittsburghRestaurants'

interface RestaurantCardProps {
  restaurant: Restaurant
  index?: number
  showRanking?: boolean
  onFavorite?: (id: string) => void
  isFavorite?: boolean
}

export default function RestaurantCard({ 
  restaurant, 
  index, 
  showRanking = false,
  onFavorite,
  isFavorite = false
}: RestaurantCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isOpen, setIsOpen] = useState(true) // Would be calculated from hours

  const getCurrentStatus = () => {
    const now = new Date()
    const day = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()]
    const hours = restaurant.hours[day as keyof typeof restaurant.hours]
    
    if (!hours || hours === 'Closed') return { isOpen: false, status: 'Closed' }
    if (hours === '24 hours') return { isOpen: true, status: 'Open 24 Hours' }
    
    // Simple check - would need proper parsing in production
    return { isOpen: true, status: `Open until ${hours.split(' - ')[1] || 'late'}` }
  }

  const status = getCurrentStatus()

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: restaurant.name,
          text: restaurant.description,
          url: `/restaurants/${restaurant.id}`
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/restaurants/${restaurant.id}`)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
      {/* Image/Header Section */}
      <div className="relative h-64 bg-gradient-to-br from-pittsburgh-gold/20 to-pittsburgh-black/20 overflow-hidden">
        {restaurant.image && !imageError ? (
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Utensils className="w-24 h-24 text-pittsburgh-gold opacity-30" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {showRanking && index !== undefined && index < 3 && (
            <div className="bg-pittsburgh-gold text-pittsburgh-black px-3 py-1 rounded-full text-xs font-bold z-10">
              #{index + 1} PICK
            </div>
          )}
          {restaurant.isNew && (
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              NEW
            </div>
          )}
        </div>

        {/* Rating & Status */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
          <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-pittsburgh-black flex items-center gap-1">
            <Star className="w-4 h-4 fill-pittsburgh-gold text-pittsburgh-gold" />
            {restaurant.rating}
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            status.isOpen 
              ? 'bg-green-500/90 text-white' 
              : 'bg-gray-500/90 text-white'
          }`}>
            {status.isOpen ? 'Open Now' : 'Closed'}
          </div>
        </div>

        {/* Review Count */}
        {restaurant.reviewCount && (
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-gray-600">
            {restaurant.reviewCount.toLocaleString()} reviews
          </div>
        )}

        {/* Action Buttons Overlay */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onFavorite && (
            <button
              onClick={() => onFavorite(restaurant.id)}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 text-gray-700 hover:bg-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          )}
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-pittsburgh-black mb-1">
              {restaurant.name}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.location.neighborhood}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-pittsburgh-gold">
              {restaurant.priceRange.repeat(restaurant.priceRange.length)}
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {restaurant.description}
        </p>

        {/* Cuisine Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {restaurant.cuisine.slice(0, 3).map((cuisine) => (
            <span
              key={cuisine}
              className="bg-pittsburgh-gold/10 text-pittsburgh-gold px-2 py-1 rounded-full text-xs font-medium"
            >
              {cuisine}
            </span>
          ))}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-4">
          {restaurant.features.slice(0, 4).map((feature) => (
            <span
              key={feature}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Hours & Status */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">
          <Clock className="w-4 h-4" />
          <span>{status.status}</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Link
            href={`/restaurants/${restaurant.id}`}
            className="flex-1 bg-pittsburgh-gold text-pittsburgh-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-sm text-center"
          >
            View Details
          </Link>
          {restaurant.contact?.website && (
            <a
              href={restaurant.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm flex items-center justify-center gap-1"
            >
              <Globe className="w-4 h-4" />
              Website
            </a>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
          {restaurant.contact?.phone && (
            <a
              href={`tel:${restaurant.contact.phone}`}
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-pittsburgh-gold transition-colors"
            >
              <Phone className="w-3 h-3" />
              Call
            </a>
          )}
          {restaurant.location.coordinates && (
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${restaurant.location.coordinates.lat},${restaurant.location.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-pittsburgh-gold transition-colors"
            >
              <Navigation className="w-3 h-3" />
              Directions
            </a>
          )}
          {restaurant.contact?.reservations && (
            <a
              href={restaurant.contact.reservations === 'OpenTable' 
                ? `https://www.opentable.com/r/${restaurant.name.toLowerCase().replace(/\s+/g, '-')}-pittsburgh`
                : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-pittsburgh-gold transition-colors"
            >
              <Calendar className="w-3 h-3" />
              Reserve
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

