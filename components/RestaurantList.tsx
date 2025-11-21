'use client'

import { useState, useEffect } from 'react'
import { Star, MapPin, Phone, Globe, Clock } from 'lucide-react'
import type { Restaurant } from '@/types'

interface RestaurantListProps {
  limit?: number
}

export default function RestaurantList({ limit }: RestaurantListProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch restaurants from API
    // For now, using mock data
    const mockRestaurants: Restaurant[] = [
      {
        id: '1',
        name: 'Primanti Bros.',
        description: 'Iconic Pittsburgh sandwich shop with fries and coleslaw in every sandwich',
        cuisine: 'American',
        priceRange: '$$',
        rating: 4.5,
        address: '3803 Forbes Ave, Pittsburgh, PA 15213',
        phone: '(412) 621-4444',
        website: 'https://primantibros.com',
        neighborhood: 'Oakland',
        image: '/images/restaurants/primanti-bros.svg',
        features: ['Sandwiches', 'Late Night', 'Iconic']
      },
      {
        id: '2',
        name: 'The Porch at Schenley',
        description: 'Farm-to-table American cuisine in a beautiful historic setting',
        cuisine: 'American',
        priceRange: '$$$',
        rating: 4.7,
        address: '221 Schenley Dr, Pittsburgh, PA 15213',
        phone: '(412) 687-6724',
        website: 'https://theporchatschenley.com',
        neighborhood: 'Schenley Park',
        image: '/images/restaurants/the-porch.svg',
        features: ['Farm-to-Table', 'Historic', 'Cocktails']
      },
      {
        id: '3',
        name: 'Fat Head\'s Saloon',
        description: 'Craft beer and artisanal pizza in the heart of Pittsburgh',
        cuisine: 'Pizza',
        priceRange: '$$',
        rating: 4.6,
        address: '1805 E Carson St, Pittsburgh, PA 15203',
        phone: '(412) 431-7433',
        website: 'https://fatheads.com',
        neighborhood: 'South Side',
        image: '/images/restaurants/fat-heads.svg',
        features: ['Craft Beer', 'Pizza', 'Sports Bar']
      }
    ]

    setRestaurants(mockRestaurants)
    setLoading(false)
  }, [])

  const displayRestaurants = limit ? restaurants.slice(0, limit) : restaurants

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'text-pittsburgh-gold fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-steel-gray">({rating})</span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayRestaurants.map((restaurant) => (
        <div key={restaurant.id} className="card group cursor-pointer hover:scale-105 transition-transform">
          <div className="relative">
            <img
              src={restaurant.image || '/images/placeholder-restaurant.svg'}
              alt={restaurant.name}
              className="w-full h-48 object-cover rounded-t-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/images/placeholder-restaurant.svg'
              }}
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
              {restaurant.cuisine}
            </div>
            <div className="absolute top-4 right-4 bg-pittsburgh-gold text-pittsburgh-black px-3 py-1 rounded-full text-sm font-semibold">
              {restaurant.priceRange}
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 group-hover:text-pittsburgh-gold transition-colors">
              {restaurant.name}
            </h3>

            <p className="text-steel-gray mb-3 text-sm">
              {restaurant.neighborhood}
            </p>

            {renderStars(restaurant.rating)}

            <p className="text-steel-gray mb-4 mt-2 line-clamp-2 text-sm">
              {restaurant.description}
            </p>

            <div className="space-y-2 text-sm text-steel-gray">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="line-clamp-1">{restaurant.address}</span>
              </div>

              {restaurant.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{restaurant.phone}</span>
                </div>
              )}
            </div>

            {restaurant.features && (
              <div className="mt-4 flex flex-wrap gap-2">
                {restaurant.features.slice(0, 3).map((feature) => (
                  <span
                    key={feature}
                    className="bg-gray-100 text-steel-gray px-2 py-1 rounded-full text-xs"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {restaurant.website && (
                  <a
                    href={restaurant.website}
                    className="text-pittsburgh-gold hover:text-pittsburgh-black transition-colors"
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
              <a
                href={`/restaurants/${restaurant.id}`}
                className="text-pittsburgh-gold hover:text-pittsburgh-black font-medium transition-colors text-sm"
              >
                View Details & Reviews →
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
