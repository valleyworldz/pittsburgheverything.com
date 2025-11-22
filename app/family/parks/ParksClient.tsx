'use client'

import { useState, useMemo } from 'react'
import { Grid, List } from 'lucide-react'
import { getAllParksPlaygrounds, searchParks, getParksByType, getFeaturedParks } from '@/data/pittsburghFamily'
import type { ParkPlayground } from '@/data/pittsburghFamily'
import ParkCard from '@/components/family/ParkCard'
import ParkFilters from '@/components/family/ParkFilters'
import { ParkListSkeleton } from '@/components/family/LoadingSkeleton'
import ErrorState from '@/components/family/ErrorState'

type SortOption = 'name' | 'featured'
type ViewMode = 'grid' | 'list'

export default function ParksClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [type, setType] = useState('all')
  const [neighborhood, setNeighborhood] = useState('all')
  const [featured, setFeatured] = useState(false)
  const [verified, setVerified] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const parks = useMemo(() => {
    let result = getAllParksPlaygrounds()

    // Apply search
    if (searchQuery) {
      result = searchParks(searchQuery)
    }

    // Apply type filter
    if (type !== 'all') {
      result = result.filter(p => p.type === type)
    }

    // Apply neighborhood filter
    if (neighborhood !== 'all') {
      result = result.filter(p => p.location.neighborhood === neighborhood)
    }

    // Apply featured filter
    if (featured) {
      result = result.filter(p => p.featured)
    }

    // Apply verified filter
    if (verified) {
      result = result.filter(p => p.verified)
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'featured':
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return result
  }, [searchQuery, type, neighborhood, featured, verified, sortBy])

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
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Parks & Playgrounds in Pittsburgh</h1>
          <p className="text-xl text-green-100 max-w-2xl">
            Discover beautiful parks, playgrounds, and outdoor spaces perfect for family fun. From playgrounds to nature trails, find your next adventure.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">{parks.length}</div>
            <div className="text-sm text-gray-600">Parks & Playgrounds</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">
              {parks.filter(p => p.amenities.playground).length}
            </div>
            <div className="text-sm text-gray-600">With Playgrounds</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">
              {parks.filter(p => p.featured).length}
            </div>
            <div className="text-sm text-gray-600">Featured Parks</div>
          </div>
        </div>

        {/* Filters */}
        <ParkFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          type={type}
          onTypeChange={setType}
          neighborhood={neighborhood}
          onNeighborhoodChange={setNeighborhood}
          featured={featured}
          onFeaturedChange={setFeatured}
          verified={verified}
          onVerifiedChange={setVerified}
        />

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {parks.length} {parks.length === 1 ? 'park' : 'parks'} found
            </span>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="featured">Featured First</option>
              <option value="name">Name (A-Z)</option>
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

        {/* Parks Grid */}
        {loading ? (
          <ParkListSkeleton count={6} />
        ) : parks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No parks found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
            {parks.map((park) => (
              <ParkCard
                key={park.id}
                park={park}
                onFavorite={handleFavorite}
                isFavorite={favorites.has(park.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

