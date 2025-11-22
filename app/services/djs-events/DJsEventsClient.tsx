'use client'

import { useState, useMemo } from 'react'
import { Grid, List, Music } from 'lucide-react'
import { getDJsEventsServices } from '@/data/pittsburghServices'
import ServiceCard from '@/components/services/ServiceCard'
import ServiceFilters from '@/components/services/ServiceFilters'
import { ServiceListSkeleton } from '@/components/services/LoadingSkeleton'
import ErrorState from '@/components/services/ErrorState'
import { filterServices, sortServices } from '@/utils/serviceUtils'

export default function DJsEventsClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('All Categories')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All Locations')
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [emergencyOnly, setEmergencyOnly] = useState(false)
  const [sortBy, setSortBy] = useState('rating-high')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [error, setError] = useState<string | null>(null)

  const allServices = useMemo(() => {
    try {
      return getDJsEventsServices()
    } catch (err) {
      setError('Failed to load services')
      return []
    }
  }, [])

  const subcategories = useMemo(() => {
    const cats = Array.from(new Set(allServices.map(s => s.subcategory)))
    return ['All Categories', ...cats]
  }, [allServices])

  const neighborhoods = useMemo(() => {
    const hoods = Array.from(new Set(allServices.map(s => s.location.neighborhood)))
    return ['All Locations', ...hoods.sort()]
  }, [allServices])

  const filteredServices = useMemo(() => {
    const filtered = filterServices(allServices, {
      searchQuery,
      subcategory: selectedSubcategory,
      neighborhood: selectedNeighborhood,
      priceRange: selectedPriceRange,
      verifiedOnly,
      emergencyOnly
    })
    return sortServices(filtered, sortBy)
  }, [allServices, searchQuery, selectedSubcategory, selectedNeighborhood, selectedPriceRange, verifiedOnly, emergencyOnly, sortBy])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedSubcategory('All Categories')
    setSelectedNeighborhood('All Locations')
    setSelectedPriceRange('All Prices')
    setVerifiedOnly(false)
    setEmergencyOnly(false)
  }

  const handleContact = (serviceId: string) => {
    const service = allServices.find(s => s.id === serviceId)
    if (service?.contact.website) {
      window.open(service.contact.website, '_blank')
    } else if (service?.contact.phone) {
      window.location.href = `tel:${service.contact.phone}`
    }
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => setError(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedSubcategory={selectedSubcategory}
            onSubcategoryChange={setSelectedSubcategory}
            selectedNeighborhood={selectedNeighborhood}
            onNeighborhoodChange={setSelectedNeighborhood}
            selectedPriceRange={selectedPriceRange}
            onPriceRangeChange={setSelectedPriceRange}
            verifiedOnly={verifiedOnly}
            onVerifiedOnlyChange={setVerifiedOnly}
            emergencyOnly={emergencyOnly}
            onEmergencyOnlyChange={setEmergencyOnly}
            onClearFilters={handleClearFilters}
            subcategories={subcategories}
            neighborhoods={neighborhoods}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} found
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
                  viewMode === 'grid' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
          {filteredServices.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-pittsburgh-black mb-2">No services found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or check back later for new listings.
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
            }>
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onContact={handleContact}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

