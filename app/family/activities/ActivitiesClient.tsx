'use client'

import { useState, useMemo } from 'react'
import { Grid, List, Star, TrendingUp } from 'lucide-react'
import { getAllKidsActivities, searchKidsActivities, getKidsActivitiesByCategory, getFeaturedKidsActivities } from '@/data/pittsburghFamily'
import type { KidsActivity } from '@/data/pittsburghFamily'
import ActivityCard from '@/components/family/ActivityCard'
import ActivityFilters from '@/components/family/ActivityFilters'
import { ActivityListSkeleton } from '@/components/family/LoadingSkeleton'
import ErrorState from '@/components/family/ErrorState'

type SortOption = 'name' | 'rating' | 'price' | 'featured'
type ViewMode = 'grid' | 'list'

export default function ActivitiesClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [ageRange, setAgeRange] = useState('all')
  const [featured, setFeatured] = useState(false)
  const [verified, setVerified] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const activities = useMemo(() => {
    let result = getAllKidsActivities()

    // Apply search
    if (searchQuery) {
      result = searchKidsActivities(searchQuery)
    }

    // Apply category filter
    if (category !== 'all') {
      result = result.filter(a => a.category === category)
    }

    // Apply price range filter
    if (priceRange !== 'all') {
      result = result.filter(a => a.priceRange === priceRange)
    }

    // Apply age range filter
    if (ageRange !== 'all') {
      result = result.filter(a => a.ageRange.includes(ageRange) || a.ageRange === 'All Ages')
    }

    // Apply featured filter
    if (featured) {
      result = result.filter(a => a.featured)
    }

    // Apply verified filter
    if (verified) {
      result = result.filter(a => a.verified)
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'price':
          const aPrice = a.price?.child || a.price?.adult || 0
          const bPrice = b.price?.child || b.price?.adult || 0
          return aPrice - bPrice
        case 'featured':
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return (b.rating || 0) - (a.rating || 0)
        default:
          return 0
      }
    })

    return result
  }, [searchQuery, category, priceRange, ageRange, featured, verified, sortBy])

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
          <h1 className="text-4xl font-bold mb-4">Kids Activities in Pittsburgh</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Discover fun and educational activities for kids of all ages. From museums to parks, find the perfect family adventure.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">{activities.length}</div>
            <div className="text-sm text-gray-600">Activities Available</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">
              {activities.filter(a => a.priceRange === 'Free').length}
            </div>
            <div className="text-sm text-gray-600">Free Activities</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">
              {activities.filter(a => a.featured).length}
            </div>
            <div className="text-sm text-gray-600">Featured Activities</div>
          </div>
        </div>

        {/* Filters */}
        <ActivityFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          category={category}
          onCategoryChange={setCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          ageRange={ageRange}
          onAgeRangeChange={setAgeRange}
          featured={featured}
          onFeaturedChange={setFeatured}
          verified={verified}
          onVerifiedChange={setVerified}
        />

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {activities.length} {activities.length === 1 ? 'activity' : 'activities'} found
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

        {/* Activities Grid */}
        {loading ? (
          <ActivityListSkeleton count={6} />
        ) : activities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No activities found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onFavorite={handleFavorite}
                isFavorite={favorites.has(activity.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

