'use client'

import { useState, useMemo } from 'react'
import { Grid, List } from 'lucide-react'
import { getAllPetFriendlySpots, searchPetFriendlySpots, getPetFriendlySpotsByType, getFeaturedPetFriendlySpots } from '@/data/pittsburghPets'
import type { PetFriendlySpot } from '@/data/pittsburghPets'
import PetFriendlySpotCard from '@/components/pets/PetFriendlySpotCard'
import PetFilters from '@/components/pets/PetFilters'
import { PetFriendlySpotListSkeleton } from '@/components/pets/LoadingSkeleton'
import ErrorState from '@/components/pets/ErrorState'

type SortOption = 'name' | 'rating' | 'featured'
type ViewMode = 'grid' | 'list'

export default function PetFriendlySpotsClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [type, setType] = useState('all')
  const [featured, setFeatured] = useState(false)
  const [verified, setVerified] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const spots = useMemo(() => {
    let result = getAllPetFriendlySpots()

    // Apply search
    if (searchQuery) {
      result = searchPetFriendlySpots(searchQuery)
    }

    // Apply type filter
    if (type !== 'all') {
      result = result.filter(s => s.type === type)
    }

    // Apply featured filter
    if (featured) {
      result = result.filter(s => s.featured)
    }

    // Apply verified filter
    if (verified) {
      result = result.filter(s => s.verified)
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'featured':
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return (b.rating || 0) - (a.rating || 0)
        default:
          return 0
      }
    })

    return result
  }, [searchQuery, type, featured, verified, sortBy])

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
          <h1 className="text-4xl font-bold mb-4">Pet-Friendly Spots in Pittsburgh</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Discover restaurants, hotels, cafes, and businesses where your pets are welcome. Find the perfect spot to bring your furry friend.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">{spots.length}</div>
            <div className="text-sm text-gray-600">Pet-Friendly Spots</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">
              {spots.filter(s => s.type === 'restaurant').length}
            </div>
            <div className="text-sm text-gray-600">Restaurants</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">
              {spots.filter(s => s.featured).length}
            </div>
            <div className="text-sm text-gray-600">Featured Spots</div>
          </div>
        </div>

        {/* Filters */}
        <PetFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          type={type}
          onTypeChange={setType}
          featured={featured}
          onFeaturedChange={setFeatured}
          verified={verified}
          onVerifiedChange={setVerified}
        />

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {spots.length} {spots.length === 1 ? 'spot' : 'spots'} found
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

        {/* Spots Grid */}
        {loading ? (
          <PetFriendlySpotListSkeleton count={6} />
        ) : spots.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No pet-friendly spots found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
            {spots.map((spot) => (
              <PetFriendlySpotCard
                key={spot.id}
                spot={spot}
                onFavorite={handleFavorite}
                isFavorite={favorites.has(spot.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

