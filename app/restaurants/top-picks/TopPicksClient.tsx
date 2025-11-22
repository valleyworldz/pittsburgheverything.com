'use client'

import { useState, useMemo, useEffect } from 'react'
import { MapPin, Clock, Star, DollarSign, Users, Heart, ExternalLink, Phone, Globe, Award, Utensils, Grid, List, SortAsc, Filter } from 'lucide-react'
import Link from 'next/link'
import { getTopPicksRestaurants } from '@/data/pittsburghRestaurants'
import RestaurantCard from '@/components/restaurants/RestaurantCard'
import RestaurantFilters, { FilterState } from '@/components/restaurants/RestaurantFilters'
import RestaurantListSkeleton from '@/components/restaurants/LoadingSkeleton'
import ErrorState from '@/components/restaurants/ErrorState'

export default function TopPicksClient() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [allRestaurants, setAllRestaurants] = useState(() => getTopPicksRestaurants())
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
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Apply filters
  const filteredRestaurants = useMemo(() => {
    let filtered = [...allRestaurants]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(searchLower) ||
        r.description.toLowerCase().includes(searchLower) ||
        r.cuisine.some(c => c.toLowerCase().includes(searchLower)) ||
        r.features.some(f => f.toLowerCase().includes(searchLower))
      )
    }

    // Cuisine filter
    if (filters.cuisine.length > 0) {
      filtered = filtered.filter(r =>
        r.cuisine.some(c => filters.cuisine.includes(c))
      )
    }

    // Neighborhood filter
    if (filters.neighborhood.length > 0) {
      filtered = filtered.filter(r =>
        filters.neighborhood.includes(r.location.neighborhood)
      )
    }

    // Price range filter
    if (filters.priceRange.length > 0) {
      filtered = filtered.filter(r =>
        filters.priceRange.includes(r.priceRange)
      )
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(r => r.rating >= filters.rating)
    }

    // Features filter
    if (filters.features.length > 0) {
      filtered = filtered.filter(r =>
        filters.features.some(f =>
          r.features.some(rf => rf.toLowerCase().includes(f.toLowerCase()))
        )
      )
    }

    // Dietary options filter
    if (filters.dietaryOptions.length > 0) {
      filtered = filtered.filter(r => {
        if (!r.dietaryOptions) return false
        return filters.dietaryOptions.some(opt => {
          const key = opt.toLowerCase().replace('-', '') as keyof typeof r.dietaryOptions
          return r.dietaryOptions?.[key] === true
        })
      })
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(r => {
        if (!r.amenities) return false
        return filters.amenities.some(amenity => {
          const key = amenity.toLowerCase().replace(/\s+/g, '') as keyof typeof r.amenities
          return r.amenities?.[key] === true
        })
      })
    }

    // Sort
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
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 text-pittsburgh-gold hover:text-white transition-colors mb-6"
          >
            ← Back to Restaurants
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Award className="w-16 h-16 text-pittsburgh-gold" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Top Restaurant <span className="text-pittsburgh-gold">Picks</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Discover Pittsburgh's highest-rated and most beloved restaurants. These are the places locals and visitors rave about - from iconic institutions to fine dining destinations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Award className="w-4 h-4" />
                {filteredRestaurants.length} Top Restaurants
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Star className="w-4 h-4" />
                4.6+ Star Rating
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Users className="w-4 h-4" />
                {allRestaurants.reduce((sum, r) => sum + (r.reviewCount || 0), 0).toLocaleString()}+ Reviews
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
              Showing <span className="font-semibold text-pittsburgh-black">{filteredRestaurants.length}</span> of {allRestaurants.length} top restaurants
            </div>
            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'rating' | 'reviews' | 'name')}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="reviews">Sort by Reviews</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
              {/* View Mode */}
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-pittsburgh-gold text-pittsburgh-black'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-pittsburgh-gold text-pittsburgh-black'
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
                className="bg-pittsburgh-gold text-pittsburgh-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
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
              {filteredRestaurants.map((restaurant, index) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  index={index}
                  showRanking={true}
                  onFavorite={handleFavorite}
                  isFavorite={favorites.includes(restaurant.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why These Are Top Picks */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-pittsburgh-gold/10 to-pittsburgh-black/10 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-6 text-center">
              Why These Are Top Picks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6">
                <div className="w-12 h-12 bg-pittsburgh-gold rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-pittsburgh-black" />
                </div>
                <h3 className="font-bold text-lg mb-2">High Ratings</h3>
                <p className="text-gray-600 text-sm">All restaurants have 4.6+ star ratings with thousands of verified reviews from real diners.</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <div className="w-12 h-12 bg-pittsburgh-gold rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-pittsburgh-black" />
                </div>
                <h3 className="font-bold text-lg mb-2">Popular Choice</h3>
                <p className="text-gray-600 text-sm">These are the restaurants locals and visitors consistently recommend and return to time and again.</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <div className="w-12 h-12 bg-pittsburgh-gold rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-pittsburgh-black" />
                </div>
                <h3 className="font-bold text-lg mb-2">Consistent Quality</h3>
                <p className="text-gray-600 text-sm">Known for maintaining high standards and exceptional dining experiences that exceed expectations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

