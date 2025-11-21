'use client'

import { useState, useEffect } from 'react'
import { Trophy, Star, TrendingUp, Award, Crown } from 'lucide-react'
import Link from 'next/link'
import type { Top100Item } from '@/types'

interface Top100TableProps {
  category?: string
  limit?: number
}

const categories = [
  'All',
  'Restaurants',
  'Events',
  'Services',
  'Attractions',
  'Bars & Nightlife',
  'Shopping',
  'Parks & Outdoors'
]

export default function Top100Table({ category = 'All', limit }: Top100TableProps) {
  const [items, setItems] = useState<Top100Item[]>([])
  const [selectedCategory, setSelectedCategory] = useState(category)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch top 100 data from API
    // For now, using mock data
    const mockItems: Top100Item[] = [
      {
        rank: 1,
        name: 'Primanti Bros.',
        category: 'Restaurants',
        description: 'Iconic Pittsburgh sandwich shop with fries and coleslaw in every sandwich',
        rating: 4.8,
        address: '3803 Forbes Ave, Oakland',
        reason: 'Most iconic Pittsburgh food experience'
      },
      {
        rank: 2,
        name: 'Phipps Conservatory',
        category: 'Attractions',
        description: 'World-class botanical gardens and art installations',
        rating: 4.9,
        address: '1 Schenley Park, Oakland',
        reason: 'Most beautiful indoor garden in America'
      },
      {
        rank: 3,
        name: 'Carnegie Museum of Art',
        category: 'Attractions',
        description: 'Premier art museum with extensive collections',
        rating: 4.7,
        address: '4400 Forbes Ave, Oakland',
        reason: 'World-class art collection in Pittsburgh'
      },
      {
        rank: 4,
        name: 'Fat Head\'s Saloon',
        category: 'Bars & Nightlife',
        description: 'Craft beer and artisanal pizza in the heart of Pittsburgh',
        rating: 4.6,
        address: '1805 E Carson St, South Side',
        reason: 'Best craft beer selection in the city'
      },
      {
        rank: 5,
        name: 'The Porch at Schenley',
        category: 'Restaurants',
        description: 'Farm-to-table American cuisine in a beautiful setting',
        rating: 4.7,
        address: '221 Schenley Dr, Oakland',
        reason: 'Most romantic dining experience'
      },
      {
        rank: 6,
        name: 'Point State Park',
        category: 'Parks & Outdoors',
        description: 'Historic park at the confluence of three rivers',
        rating: 4.5,
        address: '601 Commonwealth Pl, Downtown',
        reason: 'Most historic park in Pittsburgh'
      },
      {
        rank: 7,
        name: 'Duquesne Incline',
        category: 'Attractions',
        description: 'Historic cable car ride with panoramic city views',
        rating: 4.4,
        address: '1220 Grandview Ave, Mt. Washington',
        reason: 'Best view of Pittsburgh skyline'
      },
      {
        rank: 8,
        name: 'Strip District',
        category: 'Shopping',
        description: 'Historic warehouse district with specialty shops',
        rating: 4.3,
        address: 'Various locations, Strip District',
        reason: 'Best shopping district in Pittsburgh'
      }
    ]

    setItems(mockItems)
    setLoading(false)
  }, [])

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory)

  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />
    if (rank === 2) return <Award className="w-6 h-6 text-gray-400" />
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />
    return <Trophy className="w-5 h-5 text-pittsburgh-gold" />
  }

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
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-6"></div>
        </div>
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pittsburgh-gold to-yellow-400 text-pittsburgh-black px-6 py-3 rounded-full font-black text-xl mb-4">
          <Trophy className="w-6 h-6" />
          Pittsburgh's Top 100
        </div>
        <p className="text-lg text-steel-gray max-w-2xl mx-auto">
          The definitive ranking of Pittsburgh's best restaurants, attractions, events, and experiences
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedCategory === cat
                ? 'bg-pittsburgh-gold text-pittsburgh-black'
                : 'bg-gray-100 text-steel-gray hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rankings Table */}
      <div className="space-y-4">
        {displayItems.map((item) => (
          <div
            key={`${item.category}-${item.rank}`}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow group cursor-pointer"
            onClick={() => {
              // Navigate based on category
              const categoryRoutes = {
                'Restaurants': '/restaurants',
                'Events': '/events',
                'Services': '/services',
                'Attractions': '/things-to-do',
                'Bars & Nightlife': '/deals?category=bars',
                'Shopping': '/deals?category=shopping',
                'Parks & Outdoors': '/things-to-do?category=outdoors'
              }

              const route = categoryRoutes[item.category as keyof typeof categoryRoutes] || '/'
              window.location.href = route
            }}
          >
            <div className="flex items-start gap-6">
              {/* Rank */}
              <div className="flex-shrink-0 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pittsburgh-gold to-yellow-400 text-pittsburgh-black font-black text-xl mb-2">
                  {item.rank}
                </div>
                <div className="flex justify-center">
                  {getRankIcon(item.rank)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-pittsburgh-black group-hover:text-pittsburgh-gold transition-colors mb-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-steel-gray">
                      <span className="bg-pittsburgh-gold/10 text-pittsburgh-gold px-3 py-1 rounded-full font-semibold">
                        {item.category}
                      </span>
                      {renderStars(item.rating)}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-steel-gray mb-1">Rank</div>
                    <div className="text-2xl font-black text-pittsburgh-gold">
                      #{item.rank}
                    </div>
                  </div>
                </div>

                <p className="text-steel-gray mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-semibold text-pittsburgh-black">Why #{item.rank}:</span>
                    <span className="text-steel-gray ml-2">{item.reason}</span>
                  </div>

                  {item.address && (
                    <div className="text-sm text-steel-gray">
                      📍 {item.address}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {limit && filteredItems.length > limit && (
        <div className="text-center">
          <Link href="/top-100" className="btn-secondary">
            View Full Top 100 List
          </Link>
        </div>
      )}

      {/* Footer Stats */}
      <div className="bg-gradient-to-r from-pittsburgh-black to-steel-gray rounded-xl p-6 text-white text-center">
        <h3 className="text-xl font-black mb-4">How Rankings Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <Star className="w-8 h-8 text-pittsburgh-gold mx-auto mb-2" />
            <div className="font-semibold mb-1">Community Reviews</div>
            <div className="text-gray-300">Real ratings from Pittsburghers</div>
          </div>
          <div>
            <TrendingUp className="w-8 h-8 text-pittsburgh-gold mx-auto mb-2" />
            <div className="font-semibold mb-1">Data-Driven</div>
            <div className="text-gray-300">Based on visits, ratings, and trends</div>
          </div>
          <div>
            <Award className="w-8 h-8 text-pittsburgh-gold mx-auto mb-2" />
            <div className="font-semibold mb-1">Expert Curation</div>
            <div className="text-gray-300">Local experts and influencers</div>
          </div>
        </div>
      </div>
    </div>
  )
}
