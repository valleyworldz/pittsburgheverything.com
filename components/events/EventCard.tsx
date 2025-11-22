'use client'

import { useState, useEffect } from 'react'
import { MapPin, Clock, Calendar, DollarSign, Users, Ticket, Share2, Heart, Navigation, ExternalLink, Star } from 'lucide-react'
import Link from 'next/link'
import type { Event } from '@/data/pittsburghEvents'

interface EventCardProps {
  event: Event
  index?: number
  showRanking?: boolean
  onFavorite?: (id: string) => void
  isFavorite?: boolean
}

export default function EventCard({ 
  event, 
  index, 
  showRanking = false,
  onFavorite,
  isFavorite = false
}: EventCardProps) {
  const [imageError, setImageError] = useState(false)
  const [timeUntil, setTimeUntil] = useState<string>('')

  useEffect(() => {
    const updateTimeUntil = () => {
      const now = new Date()
      const eventDate = new Date(`${event.startDate}T${event.startTime}`)
      const diff = eventDate.getTime() - now.getTime()

      if (diff < 0) {
        setTimeUntil('Happening Now')
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      if (days > 0) {
        setTimeUntil(`${days}d ${hours}h`)
      } else if (hours > 0) {
        setTimeUntil(`${hours}h ${minutes}m`)
      } else {
        setTimeUntil(`${minutes}m`)
      }
    }

    updateTimeUntil()
    const interval = setInterval(updateTimeUntil, 60000) // Update every minute
    
    return () => clearInterval(interval)
  }, [event.startDate, event.startTime])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: `/events/${event.id}`
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/events/${event.id}`)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Sports': 'bg-blue-500',
      'Music': 'bg-purple-500',
      'Arts & Culture': 'bg-pink-500',
      'Food & Drink': 'bg-green-500',
      'Family': 'bg-yellow-500',
      'Festival': 'bg-orange-500',
      'Nightlife': 'bg-indigo-500',
      'Comedy': 'bg-red-500',
      'Theater': 'bg-teal-500'
    }
    return colors[category] || 'bg-gray-500'
  }

  const isHappeningNow = () => {
    const now = new Date()
    const start = new Date(`${event.startDate}T${event.startTime}`)
    const end = event.endTime ? new Date(`${event.startDate}T${event.endTime}`) : new Date(start.getTime() + 2 * 60 * 60 * 1000)
    return now >= start && now <= end
  }

  const isUpcoming = () => {
    const now = new Date()
    const start = new Date(`${event.startDate}T${event.startTime}`)
    return start > now
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
      {/* Image/Header Section */}
      <div className="relative h-64 bg-gradient-to-br from-pittsburgh-gold/20 to-pittsburgh-black/20 overflow-hidden">
        {event.image && !imageError ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Calendar className="w-24 h-24 text-pittsburgh-gold opacity-30" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {showRanking && index !== undefined && index < 3 && (
            <div className="bg-pittsburgh-gold text-pittsburgh-black px-3 py-1 rounded-full text-xs font-bold z-10">
              #{index + 1}
            </div>
          )}
          {isHappeningNow() && (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              LIVE NOW
            </div>
          )}
          {event.verified && (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              ✓ Verified
            </div>
          )}
        </div>

        {/* Category & Time */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
          <div className={`${getCategoryColor(event.category)} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
            {event.category}
          </div>
          {isUpcoming() && (
            <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-gray-600">
              {timeUntil}
            </div>
          )}
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onFavorite && (
            <button
              onClick={() => onFavorite(event.id)}
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
              {event.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <MapPin className="w-4 h-4" />
              <span>{event.location.neighborhood}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Date & Time */}
        <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="font-semibold">{formatDate(event.startDate)}</span>
            {event.endDate && event.endDate !== event.startDate && (
              <span className="text-gray-500">- {formatDate(event.endDate)}</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>{event.startTime}</span>
            {event.endTime && <span className="text-gray-500">- {event.endTime}</span>}
          </div>
        </div>

        {/* Venue */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Users className="w-4 h-4" />
          <span>{event.venue.name}</span>
          {event.venue.capacity && (
            <span className="text-gray-400">• {event.venue.capacity.toLocaleString()} capacity</span>
          )}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {event.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="bg-pittsburgh-gold/10 text-pittsburgh-gold px-2 py-1 rounded-full text-xs font-medium"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            {event.price.isFree ? (
              <span className="text-green-600 font-bold text-lg">FREE</span>
            ) : (
              <span className="text-pittsburgh-black font-bold text-lg">
                ${event.price.min}
                {event.price.max && event.price.max !== event.price.min && ` - $${event.price.max}`}
              </span>
            )}
            {event.price.notes && (
              <p className="text-xs text-gray-500">{event.price.notes}</p>
            )}
          </div>
          <div className="flex gap-2">
            {event.ticketUrl ? (
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pittsburgh-gold text-pittsburgh-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-sm flex items-center gap-1"
              >
                <Ticket className="w-4 h-4" />
                Tickets
              </a>
            ) : (
              <button className="bg-pittsburgh-gold text-pittsburgh-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-sm">
                Learn More
              </button>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 mt-4">
          {event.location.coordinates && (
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${event.location.coordinates.lat},${event.location.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-pittsburgh-gold transition-colors"
            >
              <Navigation className="w-3 h-3" />
              Directions
            </a>
          )}
          {event.website && (
            <a
              href={event.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-pittsburgh-gold transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Website
            </a>
          )}
          {event.ageRestriction && (
            <span className="text-xs text-gray-500">
              {event.ageRestriction}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

