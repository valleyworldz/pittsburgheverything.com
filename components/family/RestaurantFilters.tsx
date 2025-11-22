'use client'

import { Search, Filter, X } from 'lucide-react'
import { useState } from 'react'

interface RestaurantFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  cuisine: string
  onCuisineChange: (cuisine: string) => void
  priceRange: string
  onPriceRangeChange: (range: string) => void
  neighborhood: string
  onNeighborhoodChange: (neighborhood: string) => void
  rating: string
  onRatingChange: (rating: string) => void
  featured: boolean
  onFeaturedChange: (featured: boolean) => void
  verified: boolean
  onVerifiedChange: (verified: boolean) => void
}

const cuisines = [
  { value: 'all', label: 'All Cuisines' },
  { value: 'American', label: 'American' },
  { value: 'Mexican', label: 'Mexican' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Asian', label: 'Asian' },
  { value: 'Diner', label: 'Diner' }
]

const priceRanges = [
  { value: 'all', label: 'All Prices' },
  { value: '$', label: '$' },
  { value: '$$', label: '$$' },
  { value: '$$$', label: '$$$' },
  { value: '$$$$', label: '$$$$' }
]

const ratings = [
  { value: 'all', label: 'All Ratings' },
  { value: '4.5', label: '4.5+ Stars' },
  { value: '4.0', label: '4.0+ Stars' },
  { value: '3.5', label: '3.5+ Stars' }
]

export default function RestaurantFilters({
  searchQuery,
  onSearchChange,
  cuisine,
  onCuisineChange,
  priceRange,
  onPriceRangeChange,
  neighborhood,
  onNeighborhoodChange,
  rating,
  onRatingChange,
  featured,
  onFeaturedChange,
  verified,
  onVerifiedChange
}: RestaurantFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const hasActiveFilters = cuisine !== 'all' || priceRange !== 'all' || neighborhood !== 'all' || rating !== 'all' || featured || verified

  const clearFilters = () => {
    onCuisineChange('all')
    onPriceRangeChange('all')
    onNeighborhoodChange('all')
    onRatingChange('all')
    onFeaturedChange(false)
    onVerifiedChange(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
              Active
            </span>
          )}
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {/* Filter Options */}
      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Cuisine */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cuisine</label>
            <select
              value={cuisine}
              onChange={(e) => onCuisineChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {cuisines.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
            <select
              value={priceRange}
              onChange={(e) => onPriceRangeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
            <select
              value={rating}
              onChange={(e) => onRatingChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {ratings.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Options</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => onFeaturedChange(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Featured Only</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={verified}
                  onChange={(e) => onVerifiedChange(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Verified Only</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

