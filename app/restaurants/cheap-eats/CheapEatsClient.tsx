'use client'

import { useState, useMemo, useEffect } from 'react'
import { Gift, Utensils, Grid, List, SortAsc } from 'lucide-react'
import Link from 'next/link'
import { getCheapEatsRestaurants } from '@/data/pittsburghRestaurants'
import RestaurantCard from '@/components/restaurants/RestaurantCard'
import RestaurantFilters, { FilterState } from '@/components/restaurants/RestaurantFilters'
import { RestaurantListSkeleton } from '@/components/restaurants/LoadingSkeleton'
import ErrorState from '@/components/restaurants/ErrorState'

export default function CheapEatsClient() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [allRestaurants, setAllRestaurants] = useState(() => getCheapEatsRestaurants())
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name' | 'price'>('rating')
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    cuisine: [],
    neighborhood: [],
    priceRange: ['$', '$$'],
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
        case 'price':
          const priceOrder = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 }
          return priceOrder[a.priceRange] - priceOrder[b.priceRange]
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
      <section className="bg-gradient-to-br from-green-500 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 text-green-200 hover:text-white transition-colors mb-6"
          >
            ← Back to Restaurants
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Gift className="w-16 h-16 text-green-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Cheap <span className="text-green-200">Eats</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Delicious food that won't break the bank! Discover Pittsburgh's best budget-friendly restaurants serving amazing meals at affordable prices.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Gift className="w-4 h-4" />
                {filteredRestaurants.length} Budget Options
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Utensils className="w-4 h-4" />
                $ - $$
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
              Showing <span className="font-semibold text-pittsburgh-black">{filteredRestaurants.length}</span> of {allRestaurants.length} budget-friendly restaurants
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'rating' | 'reviews' | 'name' | 'price')}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="price">Sort by Price</option>
                  <option value="reviews">Sort by Reviews</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-green-500 text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-green-500 text-white'
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
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No restaurants found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters to see more results.</p>
              <button
                onClick={() => setFilters({
                  search: '',
                  cuisine: [],
                  neighborhood: [],
                  priceRange: ['$', '$$'],
                  rating: 0,
                  features: [],
                  dietaryOptions: [],
                  amenities: []
                })}
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
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
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Budget Dining Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Lunch Specials</h3>
                <p className="text-gray-600 text-sm">Many restaurants offer lunch specials that are significantly cheaper than dinner prices.</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Happy Hour</h3>
                <p className="text-gray-600 text-sm">Check for happy hour deals on food and drinks, typically 4-6 PM on weekdays.</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Share Plates</h3>
                <p className="text-gray-600 text-sm">Many restaurants serve large portions - consider sharing entrees to save money.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

