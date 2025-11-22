'use client'

import { useState, useMemo } from 'react'
import { Grid, List } from 'lucide-react'
import { getAllDogParks, searchDogParks, getDogParksBySize, getFeaturedDogParks } from '@/data/pittsburghPets'
import type { DogPark } from '@/data/pittsburghPets'
import DogParkCard from '@/components/pets/DogParkCard'
import PetFilters from '@/components/pets/PetFilters'
import { DogParkListSkeleton } from '@/components/pets/LoadingSkeleton'
import ErrorState from '@/components/pets/ErrorState'

type SortOption = 'name' | 'featured' | 'size'
type ViewMode = 'grid' | 'list'

export default function DogParksClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [size, setSize] = useState('all')
  const [featured, setFeatured] = useState(false)
  const [verified, setVerified] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const parks = useMemo(() => {
    let result = getAllDogParks()

    // Apply search
    if (searchQuery) {
      result = searchDogParks(searchQuery)
    }

    // Apply size filter
    if (size !== 'all') {
      result = result.filter(p => p.size === size)
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
        case 'size':
          const sizeOrder = { 'small': 1, 'medium': 2, 'large': 3 }
          return sizeOrder[a.size] - sizeOrder[b.size]
        case 'featured':
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return result
  }, [searchQuery, size, featured, verified, sortBy])

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
          <h1 className="text-4xl font-bold mb-4">Dog Parks in Pittsburgh</h1>
          <p className="text-xl text-green-100 max-w-2xl">
            Find the perfect off-leash dog park for your furry friend. Discover fenced areas, amenities, and rules for safe play.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">{parks.length}</div>
            <div className="text-sm text-gray-600">Dog Parks</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">
              {parks.filter(p => p.amenities.fenced).length}
            </div>
            <div className="text-sm text-gray-600">Fenced Parks</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">
              {parks.filter(p => p.featured).length}
            </div>
            <div className="text-sm text-gray-600">Featured Parks</div>
          </div>
        </div>

        {/* Filters */}
        <PetFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          size={size}
          onSizeChange={setSize}
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
              <option value="size">Size</option>
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
          <DogParkListSkeleton count={6} />
        ) : parks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No dog parks found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
            {parks.map((park) => (
              <DogParkCard
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

