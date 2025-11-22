'use client'

import { useState, useMemo, useEffect } from 'react'
import { MapPin, Clock, Star, DollarSign, Users, ExternalLink, Phone, Globe, Coffee, Utensils, Grid, List, SortAsc } from 'lucide-react'
import Link from 'next/link'
import { getBrunchRestaurants } from '@/data/pittsburghRestaurants'
import RestaurantCard from '@/components/restaurants/RestaurantCard'
import RestaurantFilters, { FilterState } from '@/components/restaurants/RestaurantFilters'
import { RestaurantListSkeleton } from '@/components/restaurants/LoadingSkeleton'
import ErrorState from '@/components/restaurants/ErrorState'

export default function BrunchClient() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [allRestaurants, setAllRestaurants] = useState(() => getBrunchRestaurants())
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 text-orange-200 hover:text-white transition-colors mb-6"
          >
            ← Back to Restaurants
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Coffee className="w-16 h-16 text-orange-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="text-orange-200">Brunch</span> in Pittsburgh
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Start your weekend right with Pittsburgh's best brunch spots. From bottomless mimosas to creative breakfast dishes, discover where to brunch in the Steel City.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Coffee className="w-4 h-4" />
                {filteredRestaurants.length} Brunch Spots
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Utensils className="w-4 h-4" />
                Weekend Favorites
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Controls */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RestaurantFilters onFilterChange={setFilters} initialFilters={filters} />
        </div>
      </section>

      {/* Sort & View Controls */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-pittsburgh-black">{filteredRestaurants.length}</span> of {allRestaurants.length} brunch spots
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'rating' | 'reviews' | 'name')}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-orange-500 text-white'
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

      {/* Restaurants Grid/List */}
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
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No brunch spots found</h3>
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
                className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
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

      {/* Brunch Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Brunch Tips & Best Practices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Make Reservations</h3>
                <p className="text-gray-600 text-sm mb-2">Popular brunch spots fill up quickly, especially on weekends. Book ahead when possible.</p>
                <p className="text-xs text-gray-500">Check OpenTable or call directly</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Arrive Early</h3>
                <p className="text-gray-600 text-sm mb-2">For restaurants that don't take reservations, arriving before 10 AM can help avoid long waits.</p>
                <p className="text-xs text-gray-500">Especially true for popular spots</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Bottomless Options</h3>
                <p className="text-gray-600 text-sm mb-2">Many restaurants offer bottomless mimosas or Bloody Marys. Check time limits and pricing.</p>
                <p className="text-xs text-gray-500">Usually 1-2 hour limits</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Weekend vs Weekday</h3>
                <p className="text-gray-600 text-sm mb-2">Weekend brunch is busier but often has more menu options. Weekday brunch can be more relaxed.</p>
                <p className="text-xs text-gray-500">Check hours before visiting</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

