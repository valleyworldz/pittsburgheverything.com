'use client'

import { useState, useMemo } from 'react'
import { Grid, List, Clock } from 'lucide-react'
import { getHappyHours } from '@/data/pittsburghDeals'
import type { Deal } from '@/data/pittsburghDeals'
import DealCard from '@/components/deals/DealCard'
import DealFilters from '@/components/deals/DealFilters'
import { DealListSkeleton } from '@/components/deals/LoadingSkeleton'
import ErrorState from '@/components/deals/ErrorState'
import { filterDeals, sortDeals, getCurrentDay } from '@/utils/dealUtils'

export default function HappyHoursClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All Locations')
  const [selectedDay, setSelectedDay] = useState(getCurrentDay())
  const [activeOnly, setActiveOnly] = useState(true) // Default to active only for happy hours
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState('name-asc')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [error, setError] = useState<string | null>(null)

  const allDeals = useMemo(() => {
    try {
      return getHappyHours()
    } catch (err) {
      setError('Failed to load happy hours')
      return []
    }
  }, [])

  const categories = useMemo(() => {
    const cats = Array.from(new Set(allDeals.map(d => d.category)))
    return ['All Categories', ...cats]
  }, [allDeals])

  const neighborhoods = useMemo(() => {
    const hoods = Array.from(new Set(allDeals.map(d => d.business.location.neighborhood)))
    return ['All Locations', ...hoods.sort()]
  }, [allDeals])

  const filteredDeals = useMemo(() => {
    const filtered = filterDeals(allDeals, {
      searchQuery,
      category: selectedCategory,
      neighborhood: selectedNeighborhood,
      day: selectedDay,
      activeOnly,
      verifiedOnly,
      dealType: 'happy-hour'
    })
    return sortDeals(filtered, sortBy)
  }, [allDeals, searchQuery, selectedCategory, selectedNeighborhood, selectedDay, activeOnly, verifiedOnly, sortBy])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All Categories')
    setSelectedNeighborhood('All Locations')
    setSelectedDay(getCurrentDay())
    setActiveOnly(true)
    setVerifiedOnly(false)
  }

  const handleContact = (dealId: string) => {
    const deal = allDeals.find(d => d.id === dealId)
    if (deal?.business.website) {
      window.open(deal.business.website, '_blank')
    } else if (deal?.business.phone) {
      window.location.href = `tel:${deal.business.phone}`
    }
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => setError(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DealFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedNeighborhood={selectedNeighborhood}
            onNeighborhoodChange={setSelectedNeighborhood}
            selectedDay={selectedDay}
            onDayChange={setSelectedDay}
            activeOnly={activeOnly}
            onActiveOnlyChange={setActiveOnly}
            verifiedOnly={verifiedOnly}
            onVerifiedOnlyChange={setVerifiedOnly}
            onClearFilters={handleClearFilters}
            categories={categories}
            neighborhoods={neighborhoods}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {filteredDeals.length} {filteredDeals.length === 1 ? 'happy hour' : 'happy hours'} found
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
              >
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="rating-high">Highest Rated</option>
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
          {filteredDeals.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-pittsburgh-black mb-2">No happy hours found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or check back later for new happy hour specials.
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
              {filteredDeals.map((deal) => (
                <DealCard
                  key={deal.id}
                  deal={deal}
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

