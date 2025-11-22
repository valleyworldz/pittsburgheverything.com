'use client'

import { Search, Filter, X, MapPin, Tag } from 'lucide-react'
import { useState } from 'react'

interface Top100FiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedNeighborhood: string
  onNeighborhoodChange: (neighborhood: string) => void
  selectedPriceRange: string
  onPriceRangeChange: (priceRange: string) => void
  minRating: number
  onMinRatingChange: (rating: number) => void
  verifiedOnly: boolean
  onVerifiedOnlyChange: (verified: boolean) => void
  trendingOnly: boolean
  onTrendingOnlyChange: (trending: boolean) => void
  onClearFilters: () => void
  categories: string[]
  neighborhoods: string[]
}

export default function Top100Filters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedNeighborhood,
  onNeighborhoodChange,
  selectedPriceRange,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
  verifiedOnly,
  onVerifiedOnlyChange,
  trendingOnly,
  onTrendingOnlyChange,
  onClearFilters,
  categories,
  neighborhoods
}: Top100FiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All Categories' ||
    selectedNeighborhood !== 'All Locations' ||
    selectedPriceRange !== 'All Prices' ||
    minRating > 0 ||
    verifiedOnly ||
    trendingOnly

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, category, or neighborhood..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
        >
          <option value="All Categories">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={selectedNeighborhood}
          onChange={(e) => onNeighborhoodChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
        >
          <option value="All Locations">All Locations</option>
          {neighborhoods.map(neighborhood => (
            <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
          ))}
        </select>

        <select
          value={selectedPriceRange}
          onChange={(e) => onPriceRangeChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
        >
          <option value="All Prices">All Prices</option>
          <option value="$">$ - Budget Friendly</option>
          <option value="$$">$$ - Moderate</option>
          <option value="$$$">$$$ - Upscale</option>
          <option value="$$$$">$$$$ - Fine Dining</option>
        </select>

        <select
          value={minRating}
          onChange={(e) => onMinRatingChange(Number(e.target.value))}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
        >
          <option value="0">All Ratings</option>
          <option value="4.5">4.5+ Stars</option>
          <option value="4.0">4.0+ Stars</option>
          <option value="3.5">3.5+ Stars</option>
        </select>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center gap-2 text-sm"
        >
          <Filter className="w-4 h-4" />
          More Filters
        </button>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors inline-flex items-center gap-2 text-sm"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t pt-4 space-y-4">
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => onVerifiedOnlyChange(e.target.checked)}
                className="rounded border-gray-300 text-pittsburgh-gold focus:ring-pittsburgh-gold"
              />
              <span className="text-sm text-gray-700">Verified Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={trendingOnly}
                onChange={(e) => onTrendingOnlyChange(e.target.checked)}
                className="rounded border-gray-300 text-pittsburgh-gold focus:ring-pittsburgh-gold"
              />
              <span className="text-sm text-gray-700">Trending Only</span>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

