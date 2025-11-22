'use client'

import { useState, useMemo } from 'react'
import { Grid, List, Wine, Star } from 'lucide-react'
import { getTop100Bars } from '@/data/pittsburghTop100'
import type { Top100Item } from '@/data/pittsburghTop100'
import Top100Card from '@/components/top100/Top100Card'
import Top100Filters from '@/components/top100/Top100Filters'
import { Top100ListSkeleton } from '@/components/top100/LoadingSkeleton'
import ErrorState from '@/components/top100/ErrorState'
import { filterTop100, sortTop100 } from '@/utils/top100Utils'

export default function BarsClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All Locations')
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices')
  const [minRating, setMinRating] = useState(0)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [trendingOnly, setTrendingOnly] = useState(false)
  const [sortBy, setSortBy] = useState('rank-asc')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [error, setError] = useState<string | null>(null)

  const allItems = useMemo(() => {
    try {
      return getTop100Bars()
    } catch (err) {
      setError('Failed to load bars')
      return []
    }
  }, [])

  const categories = useMemo(() => {
    const cats = Array.from(new Set(allItems.map(item => item.category)))
    return ['All Categories', ...cats]
  }, [allItems])

  const neighborhoods = useMemo(() => {
    const hoods = Array.from(new Set(allItems.map(item => item.location.neighborhood)))
    return ['All Locations', ...hoods.sort()]
  }, [allItems])

  const filteredItems = useMemo(() => {
    const filtered = filterTop100(allItems, {
      searchQuery,
      category: selectedCategory,
      neighborhood: selectedNeighborhood,
      priceRange: selectedPriceRange,
      minRating,
      verifiedOnly,
      trendingOnly
    })
    return sortTop100(filtered, sortBy)
  }, [allItems, searchQuery, selectedCategory, selectedNeighborhood, selectedPriceRange, minRating, verifiedOnly, trendingOnly, sortBy])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All Categories')
    setSelectedNeighborhood('All Locations')
    setSelectedPriceRange('All Prices')
    setMinRating(0)
    setVerifiedOnly(false)
    setTrendingOnly(false)
  }

  const handleContact = (itemId: string) => {
    const item = allItems.find(i => i.id === itemId)
    if (item?.website) {
      window.open(item.website, '_blank')
    } else if (item?.phone) {
      window.location.href = `tel:${item.phone}`
    }
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => setError(null)} />
  }

  const top3 = filteredItems.filter(item => item.rank <= 3)
  const rest = filteredItems.filter(item => item.rank > 3)

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Top100Filters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedNeighborhood={selectedNeighborhood}
            onNeighborhoodChange={setSelectedNeighborhood}
            selectedPriceRange={selectedPriceRange}
            onPriceRangeChange={setSelectedPriceRange}
            minRating={minRating}
            onMinRatingChange={setMinRating}
            verifiedOnly={verifiedOnly}
            onVerifiedOnlyChange={setVerifiedOnly}
            trendingOnly={trendingOnly}
            onTrendingOnlyChange={setTrendingOnly}
            onClearFilters={handleClearFilters}
            categories={categories}
            neighborhoods={neighborhoods}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {filteredItems.length} {filteredItems.length === 1 ? 'bar' : 'bars'} found
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
              >
                <option value="rank-asc">Rank (Low to High)</option>
                <option value="rank-desc">Rank (High to Low)</option>
                <option value="rating-high">Highest Rated</option>
                <option value="reviews-high">Most Reviews</option>
                <option value="name-asc">Name A-Z</option>
                <option value="trending">Trending First</option>
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
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Wine className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-pittsburgh-black mb-2">No bars found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or check back later for new rankings.
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              {top3.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-pittsburgh-black mb-6 flex items-center gap-2">
                    <Wine className="w-6 h-6 text-orange-500" />
                    Top 3 Bars & Nightlife
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {top3.map((item) => (
                      <Top100Card
                        key={item.id}
                        item={item}
                        onContact={handleContact}
                      />
                    ))}
                  </div>
                </div>
              )}

              {rest.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-pittsburgh-black mb-6">Complete Rankings</h2>
                  <div className={viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                  }>
                    {rest.map((item) => (
                      <Top100Card
                        key={item.id}
                        item={item}
                        onContact={handleContact}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

