'use client'

import { useState, useMemo } from 'react'
import { Grid, List, AlertCircle } from 'lucide-react'
import { getAllVetsGroomers, searchVetsGroomers, getVetsGroomersByType, getEmergencyVets, getFeaturedVetsGroomers } from '@/data/pittsburghPets'
import type { VetGroomer } from '@/data/pittsburghPets'
import VetGroomerCard from '@/components/pets/VetGroomerCard'
import PetFilters from '@/components/pets/PetFilters'
import { VetGroomerListSkeleton } from '@/components/pets/LoadingSkeleton'
import ErrorState from '@/components/pets/ErrorState'

type SortOption = 'name' | 'rating' | 'featured' | 'emergency'
type ViewMode = 'grid' | 'list'

export default function VetsGroomersClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [type, setType] = useState('all')
  const [emergency, setEmergency] = useState(false)
  const [featured, setFeatured] = useState(false)
  const [verified, setVerified] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const vets = useMemo(() => {
    let result = getAllVetsGroomers()

    // Apply search
    if (searchQuery) {
      result = searchVetsGroomers(searchQuery)
    }

    // Apply type filter
    if (type !== 'all') {
      result = result.filter(v => v.type === type)
    }

    // Apply emergency filter
    if (emergency) {
      result = result.filter(v => v.emergency)
    }

    // Apply featured filter
    if (featured) {
      result = result.filter(v => v.featured)
    }

    // Apply verified filter
    if (verified) {
      result = result.filter(v => v.verified)
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'emergency':
          if (a.emergency && !b.emergency) return -1
          if (!a.emergency && b.emergency) return 1
          return a.name.localeCompare(b.name)
        case 'featured':
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return (b.rating || 0) - (a.rating || 0)
        default:
          return 0
      }
    })

    return result
  }, [searchQuery, type, emergency, featured, verified, sortBy])

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
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Vets & Groomers in Pittsburgh</h1>
          <p className="text-xl text-purple-100 max-w-2xl">
            Find trusted veterinary clinics and professional grooming services for your pets. From routine care to emergency services.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Emergency Alert */}
        {emergency && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-900">Emergency Services Available</h3>
              <p className="text-sm text-red-700">Showing 24/7 emergency veterinary services</p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">{vets.length}</div>
            <div className="text-sm text-gray-600">Vets & Groomers</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">
              {vets.filter(v => v.emergency).length}
            </div>
            <div className="text-sm text-gray-600">Emergency Services</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">
              {vets.filter(v => v.featured).length}
            </div>
            <div className="text-sm text-gray-600">Featured Services</div>
          </div>
        </div>

        {/* Filters */}
        <PetFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          type={type}
          onTypeChange={setType}
          emergency={emergency}
          onEmergencyChange={setEmergency}
          featured={featured}
          onFeaturedChange={setFeatured}
          verified={verified}
          onVerifiedChange={setVerified}
        />

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {vets.length} {vets.length === 1 ? 'service' : 'services'} found
            </span>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="featured">Featured First</option>
              <option value="emergency">Emergency First</option>
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

        {/* Vets Grid */}
        {loading ? (
          <VetGroomerListSkeleton count={6} />
        ) : vets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No vets or groomers found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
            {vets.map((vet) => (
              <VetGroomerCard
                key={vet.id}
                vet={vet}
                onFavorite={handleFavorite}
                isFavorite={favorites.has(vet.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

