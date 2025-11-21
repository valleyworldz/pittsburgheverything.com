'use client'

import { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock } from 'lucide-react'
import type { Event } from '@/types'

interface EventGridProps {
  limit?: number
}

export default function EventGrid({ limit }: EventGridProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch events from API
    // For now, using mock data
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Pittsburgh Food Festival',
        description: 'Celebrate Pittsburgh\'s diverse culinary scene',
        date: '2024-12-01',
        time: '12:00 PM',
        location: 'Point State Park',
        category: 'Food & Drink',
        price: 'Free',
        image: '/images/events/food-festival.jpg'
      },
      {
        id: '2',
        title: 'Steelers Game',
        description: 'Pittsburgh Steelers vs. Cleveland Browns',
        date: '2024-12-05',
        time: '1:00 PM',
        location: 'Acrisure Stadium',
        category: 'Sports',
        price: '$50+',
        image: '/images/events/steelers-game.jpg'
      },
      {
        id: '3',
        title: 'Christmas Tree Lighting',
        description: 'Downtown Pittsburgh Christmas celebration',
        date: '2024-11-30',
        time: '6:00 PM',
        location: 'Market Square',
        category: 'Holiday',
        price: 'Free',
        image: '/images/events/christmas-tree.jpg'
      }
    ]

    setEvents(mockEvents)
    setLoading(false)
  }, [])

  const displayEvents = limit ? events.slice(0, limit) : events

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
            <div className="bg-gray-200 rounded h-4 mb-2"></div>
            <div className="bg-gray-200 rounded h-4 w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayEvents.map((event) => (
        <div key={event.id} className="card group cursor-pointer hover:scale-105 transition-transform">
          <div className="relative">
            <img
              src={event.image || '/images/placeholder-event.jpg'}
              alt={event.title}
              className="w-full h-48 object-cover rounded-t-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/images/placeholder-event.jpg'
              }}
            />
            <div className="absolute top-4 right-4 bg-pittsburgh-gold text-pittsburgh-black px-3 py-1 rounded-full text-sm font-semibold">
              {event.category}
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 group-hover:text-pittsburgh-gold transition-colors">
              {event.title}
            </h3>

            <p className="text-steel-gray mb-4 line-clamp-2">
              {event.description}
            </p>

            <div className="space-y-2 text-sm text-steel-gray">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-pittsburgh-gold font-semibold">
                {event.price}
              </span>
              <button className="text-pittsburgh-gold hover:text-pittsburgh-black font-medium transition-colors">
                Learn More →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
