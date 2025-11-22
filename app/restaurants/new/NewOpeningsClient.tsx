'use client'

import { useState, useMemo, useEffect } from 'react'
import { Sparkles, Calendar, Utensils, Grid, List, SortAsc } from 'lucide-react'
import Link from 'next/link'
import { getNewOpeningsRestaurants } from '@/data/pittsburghRestaurants'
import RestaurantCard from '@/components/restaurants/RestaurantCard'
import RestaurantFilters, { FilterState } from '@/components/restaurants/RestaurantFilters'
import { RestaurantListSkeleton } from '@/components/restaurants/LoadingSkeleton'
import ErrorState from '@/components/restaurants/ErrorState'

export default function NewOpeningsClient() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [allRestaurants, setAllRestaurants] = useState(() => getNewOpeningsRestaurants())
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'newest' | 'rating' | 'name'>('newest')
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    cuisine: [],
    neighborhood: [],
    priceRange: [],
    rating: 0,
    features: [],
    dietaryOptions: [],
    amenities: []
  })
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const filteredRestaurants = useMemo(() => {
    let filtered = [...allRestaurants]

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(searchLower) ||
        r.description.toLowerCase().includes(searchLower) ||
        r.cuisine.some(c => c.toLowerCase().includes(searchLower)) ||
        r.features.some(f => f.toLowerCase().includes(searchLower))
      )
    }

    if (filters.cuisine.length > 0) {
      filtered = filtered.filter(r =>
        r.cuisine.some(c => filters.cuisine.includes(c))
      )
    }

    if (filters.neighborhood.length > 0) {
      filtered = filtered.filter(r =>
        filters.neighborhood.includes(r.location.neighborhood)
      )
    }

    if (filters.priceRange.length > 0) {
      filtered = filtered.filter(r =>
        filters.priceRange.includes(r.priceRange)
      )
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(r => r.rating >= filters.rating)
    }

    if (filters.features.length > 0) {
      filtered = filtered.filter(r =>
        filters.features.some(f =>
          r.features.some(rf => rf.toLowerCase().includes(f.toLowerCase()))
        )
      )
    }

    if (filters.dietaryOptions.length > 0) {
      filtered = filtered.filter(r => {
        if (!r.dietaryOptions) return false
        return filters.dietaryOptions.some(opt => {
          const key = opt.toLowerCase().replace('-', '') as keyof typeof r.dietaryOptions
          return r.dietaryOptions?.[key] === true
        })
      })
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(r => {
        if (!r.amenities) return false
        return filters.amenities.some(amenity => {
          const key = amenity.toLowerCase().replace(/\s+/g, '') as keyof typeof r.amenities
          return r.amenities?.[key] === true
        })
      })
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          if (a.openingDate && b.openingDate) {
            return new Date(b.openingDate).getTime() - new Date(a.openingDate).getTime()
          }
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        case 'rating':
          return b.rating - a.rating
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return filtered
  }, [allRestaurants, filters, sortBy])

  const handleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  return (
    <>
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 text-indigo-200 hover:text-white transition-colors mb-6"
          >
            ← Back to Restaurants
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-16 h-16 text-indigo-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              New <span className="text-indigo-200">Openings</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Be the first to discover Pittsburgh's newest restaurants. From chef-driven concepts to exciting new cuisines, explore what's fresh in the Steel City's dining scene.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                {filteredRestaurants.length} New Spots
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Calendar className="w-4 h-4" />
                2024-2025
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RestaurantFilters onFilterChange={setFilters} initialFilters={filters} />
        </div>
      </section>

      <section className="py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-pittsburgh-black">{filteredRestaurants.length}</span> of {allRestaurants.length} new openings
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'rating' | 'name')}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-indigo-500 text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-indigo-500 text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <RestaurantListSkeleton count={6} />
          ) : error ? (
            <ErrorState message={error} onRetry={() => {
              setError(null)
              setLoading(true)
              setTimeout(() => setLoading(false), 300)
            }} />
          ) : filteredRestaurants.length === 0 ? (
            <div className="text-center py-20">
              <Utensils className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No new openings found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters to see more results.</p>
              <button
                onClick={() => setFilters({
                  search: '',
                  cuisine: [],
                  neighborhood: [],
                  priceRange: [],
                  rating: 0,
                  features: [],
                  dietaryOptions: [],
                  amenities: []
                })}
                className="bg-indigo-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-600 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }>
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onFavorite={handleFavorite}
                  isFavorite={favorites.includes(restaurant.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Stay Updated on New Openings
            </h2>
            <p className="text-gray-700 mb-6">
              Pittsburgh's restaurant scene is constantly evolving. Check back regularly for the latest openings, or subscribe to our newsletter to be notified of new restaurants as they open.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/newsletter"
                className="bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-colors text-center"
              >
                Subscribe to Updates
              </Link>
              <Link
                href="/restaurants/top-picks"
                className="border border-indigo-500 text-indigo-500 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors text-center"
              >
                View Top Picks
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

