'use client'

import { useState, useMemo, useEffect } from 'react'
import { Heart, Sparkles, Grid, List, SortAsc } from 'lucide-react'
import Link from 'next/link'
import { getDateNightRestaurants } from '@/data/pittsburghRestaurants'
import RestaurantCard from '@/components/restaurants/RestaurantCard'
import RestaurantFilters, { FilterState } from '@/components/restaurants/RestaurantFilters'
import RestaurantListSkeleton from '@/components/restaurants/LoadingSkeleton'
import ErrorState from '@/components/restaurants/ErrorState'

export default function DateNightClient() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [allRestaurants, setAllRestaurants] = useState(() => getDateNightRestaurants())
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating')
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
        case 'rating':
          return b.rating - a.rating
        case 'reviews':
          return (b.reviewCount || 0) - (a.reviewCount || 0)
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
      <section className="bg-gradient-to-br from-pink-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 text-pink-200 hover:text-white transition-colors mb-6"
          >
            ← Back to Restaurants
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Heart className="w-16 h-16 text-pink-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Date Night <span className="text-pink-200">Restaurants</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Create unforgettable moments at Pittsburgh's most romantic restaurants. From intimate fine dining to stunning views, these are the perfect spots for anniversaries, proposals, and special dates.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Heart className="w-4 h-4" />
                {filteredRestaurants.length} Romantic Spots
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                Special Occasions
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
              Showing <span className="font-semibold text-pittsburgh-black">{filteredRestaurants.length}</span> of {allRestaurants.length} date night spots
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'rating' | 'reviews' | 'name')}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="reviews">Sort by Reviews</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-pink-500 text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-pink-500 text-white'
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
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No restaurants found</h3>
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
                className="bg-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
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
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Perfect Date Night Planning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Make Reservations Early</h3>
                <p className="text-gray-600 text-sm">Popular date night spots book up weeks in advance, especially on weekends and holidays.</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Consider the View</h3>
                <p className="text-gray-600 text-sm">Request window seats or tables with views when making reservations for extra romance.</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Dress Code</h3>
                <p className="text-gray-600 text-sm">Fine dining restaurants may have dress codes. Check ahead to ensure you're appropriately dressed.</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Special Occasions</h3>
                <p className="text-gray-600 text-sm">Mention anniversaries, proposals, or special occasions when booking - many restaurants offer special touches.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

