'use client'

import { useState, useMemo } from 'react'
import { Grid, List } from 'lucide-react'
import { getAllFamilyRestaurants, searchFamilyRestaurants, getFeaturedFamilyRestaurants } from '@/data/pittsburghFamily'
import type { FamilyRestaurant } from '@/data/pittsburghFamily'
import RestaurantCard from '@/components/family/RestaurantCard'
import RestaurantFilters from '@/components/family/RestaurantFilters'
import { RestaurantListSkeleton } from '@/components/family/LoadingSkeleton'
import ErrorState from '@/components/family/ErrorState'

type SortOption = 'name' | 'rating' | 'price' | 'featured'
type ViewMode = 'grid' | 'list'

export default function RestaurantsClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [cuisine, setCuisine] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [neighborhood, setNeighborhood] = useState('all')
  const [rating, setRating] = useState('all')
  const [featured, setFeatured] = useState(false)
  const [verified, setVerified] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const restaurants = useMemo(() => {
    let result = getAllFamilyRestaurants()

    // Apply search
    if (searchQuery) {
      result = searchFamilyRestaurants(searchQuery)
    }

    // Apply cuisine filter
    if (cuisine !== 'all') {
      result = result.filter(r => r.cuisine.includes(cuisine))
    }

    // Apply price range filter
    if (priceRange !== 'all') {
      result = result.filter(r => r.priceRange === priceRange)
    }

    // Apply neighborhood filter
    if (neighborhood !== 'all') {
      result = result.filter(r => r.location.neighborhood === neighborhood)
    }

    // Apply rating filter
    if (rating !== 'all') {
      const minRating = parseFloat(rating)
      result = result.filter(r => r.rating >= minRating)
    }

    // Apply featured filter
    if (featured) {
      result = result.filter(r => r.featured)
    }

    // Apply verified filter
    if (verified) {
      result = result.filter(r => r.verified)
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'rating':
          return b.rating - a.rating
        case 'price':
          const priceOrder = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 }
          return priceOrder[a.priceRange] - priceOrder[b.priceRange]
        case 'featured':
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.rating - a.rating
        default:
          return 0
      }
    })

    return result
  }, [searchQuery, cuisine, priceRange, neighborhood, rating, featured, verified, sortBy])

  const handleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => setError(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Family Restaurants in Pittsburgh</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Find kid-friendly restaurants with high chairs, kids menus, and family-friendly atmospheres. Perfect for dining out with the whole family.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">{restaurants.length}</div>
            <div className="text-sm text-gray-600">Family Restaurants</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">
              {restaurants.filter(r => r.amenities.kidsMenu).length}
            </div>
            <div className="text-sm text-gray-600">With Kids Menus</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">
              {restaurants.filter(r => r.featured).length}
            </div>
            <div className="text-sm text-gray-600">Featured Restaurants</div>
          </div>
        </div>

        {/* Filters */}
        <RestaurantFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          cuisine={cuisine}
          onCuisineChange={setCuisine}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          neighborhood={neighborhood}
          onNeighborhoodChange={setNeighborhood}
          rating={rating}
          onRatingChange={setRating}
          featured={featured}
          onFeaturedChange={setFeatured}
          verified={verified}
          onVerifiedChange={setVerified}
        />

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {restaurants.length} {restaurants.length === 1 ? 'restaurant' : 'restaurants'} found
            </span>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="featured">Featured First</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name (A-Z)</option>
              <option value="price">Price (Low to High)</option>
            </select>
            <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Restaurants Grid */}
        {loading ? (
          <RestaurantListSkeleton count={6} />
        ) : restaurants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No restaurants found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onFavorite={handleFavorite}
                isFavorite={favorites.has(restaurant.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

