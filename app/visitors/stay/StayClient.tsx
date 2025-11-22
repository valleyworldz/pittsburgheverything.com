'use client'

import { useState, useMemo } from 'react'
import { Grid, List, Bed, Star } from 'lucide-react'
import { getAllHotels } from '@/data/pittsburghVisitors'
import type { Hotel } from '@/data/pittsburghVisitors'
import HotelCard from '@/components/visitors/HotelCard'
import { HotelListSkeleton } from '@/components/visitors/LoadingSkeleton'
import ErrorState from '@/components/visitors/ErrorState'

export default function StayClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All Locations')
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices')
  const [minRating, setMinRating] = useState(0)
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [sortBy, setSortBy] = useState('rating-high')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [error, setError] = useState<string | null>(null)

  const allHotels = useMemo(() => {
    try {
      return getAllHotels()
    } catch (err) {
      setError('Failed to load hotels')
      return []
    }
  }, [])

  const categories = useMemo(() => {
    const cats = Array.from(new Set(allHotels.map(h => h.category)))
    return ['All Categories', ...cats.map(c => c.charAt(0).toUpperCase() + c.slice(1).replace('-', ' '))]
  }, [allHotels])

  const neighborhoods = useMemo(() => {
    const hoods = Array.from(new Set(allHotels.map(h => h.location.neighborhood)))
    return ['All Locations', ...hoods.sort()]
  }, [allHotels])

  const filteredHotels = useMemo(() => {
    let filtered = [...allHotels]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(hotel =>
        hotel.name.toLowerCase().includes(query) ||
        hotel.description.toLowerCase().includes(query) ||
        hotel.location.neighborhood.toLowerCase().includes(query)
      )
    }

    if (selectedCategory !== 'All Categories') {
      const category = selectedCategory.toLowerCase().replace(' ', '-')
      filtered = filtered.filter(hotel => hotel.category === category)
    }

    if (selectedNeighborhood !== 'All Locations') {
      filtered = filtered.filter(hotel =>
        hotel.location.neighborhood.toLowerCase() === selectedNeighborhood.toLowerCase()
      )
    }

    if (selectedPriceRange !== 'All Prices') {
      filtered = filtered.filter(hotel => hotel.priceRange === selectedPriceRange)
    }

    if (minRating > 0) {
      filtered = filtered.filter(hotel => hotel.rating >= minRating)
    }

    if (featuredOnly) {
      filtered = filtered.filter(hotel => hotel.featured)
    }

    // Sort
    switch (sortBy) {
      case 'rating-high':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'rating-low':
        filtered.sort((a, b) => a.rating - b.rating)
        break
      case 'reviews-high':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'featured':
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return 0
        })
        break
    }

    return filtered
  }, [allHotels, searchQuery, selectedCategory, selectedNeighborhood, selectedPriceRange, minRating, featuredOnly, sortBy])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All Categories')
    setSelectedNeighborhood('All Locations')
    setSelectedPriceRange('All Prices')
    setMinRating(0)
    setFeaturedOnly(false)
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => setError(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search hotels by name, location, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
              >
                {neighborhoods.map(neighborhood => (
                  <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                ))}
              </select>

              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
              >
                <option value="All Prices">All Prices</option>
                <option value="$">$ - Budget</option>
                <option value="$$">$$ - Moderate</option>
                <option value="$$$">$$$ - Upscale</option>
                <option value="$$$$">$$$$ - Luxury</option>
              </select>

              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
              >
                <option value="0">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
              </select>

              <label className="flex items-center gap-2 px-4 py-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featuredOnly}
                  onChange={(e) => setFeaturedOnly(e.target.checked)}
                  className="rounded border-gray-300 text-pittsburgh-gold focus:ring-pittsburgh-gold"
                />
                <span className="text-sm text-gray-700">Featured Only</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {filteredHotels.length} {filteredHotels.length === 1 ? 'hotel' : 'hotels'} found
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
              >
                <option value="rating-high">Highest Rated</option>
                <option value="rating-low">Lowest Rated</option>
                <option value="reviews-high">Most Reviews</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="featured">Featured First</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredHotels.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Bed className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-pittsburgh-black mb-2">No hotels found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or check back later for new listings.
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
            }>
              {filteredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

