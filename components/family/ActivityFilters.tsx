'use client'

import { Search, Filter, X } from 'lucide-react'
import { useState } from 'react'

interface ActivityFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  category: string
  onCategoryChange: (category: string) => void
  priceRange: string
  onPriceRangeChange: (range: string) => void
  ageRange: string
  onAgeRangeChange: (range: string) => void
  featured: boolean
  onFeaturedChange: (featured: boolean) => void
  verified: boolean
  onVerifiedChange: (verified: boolean) => void
}

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'indoor', label: 'Indoor' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'educational', label: 'Educational' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'sports', label: 'Sports' },
  { value: 'arts', label: 'Arts' }
]

const priceRanges = [
  { value: 'all', label: 'All Prices' },
  { value: 'Free', label: 'Free' },
  { value: '$', label: '$' },
  { value: '$$', label: '$$' },
  { value: '$$$', label: '$$$' }
]

const ageRanges = [
  { value: 'all', label: 'All Ages' },
  { value: 'All Ages', label: 'All Ages' },
  { value: '2-5', label: 'Toddlers (2-5)' },
  { value: '5-12', label: 'Kids (5-12)' },
  { value: '10+', label: '10+' }
]

export default function ActivityFilters({
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  ageRange,
  onAgeRangeChange,
  featured,
  onFeaturedChange,
  verified,
  onVerifiedChange
}: ActivityFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const hasActiveFilters = category !== 'all' || priceRange !== 'all' || ageRange !== 'all' || featured || verified

  const clearFilters = () => {
    onCategoryChange('all')
    onPriceRangeChange('all')
    onAgeRangeChange('all')
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
          placeholder="Search activities..."
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
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
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

          {/* Age Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Age Range</label>
            <select
              value={ageRange}
              onChange={(e) => onAgeRangeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {ageRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
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

