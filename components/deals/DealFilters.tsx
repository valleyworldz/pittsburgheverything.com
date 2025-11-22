'use client'

import { Search, Filter, X, Clock, MapPin, Tag } from 'lucide-react'
import { useState } from 'react'

interface DealFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedNeighborhood: string
  onNeighborhoodChange: (neighborhood: string) => void
  selectedDay: string
  onDayChange: (day: string) => void
  activeOnly: boolean
  onActiveOnlyChange: (active: boolean) => void
  verifiedOnly: boolean
  onVerifiedOnlyChange: (verified: boolean) => void
  onClearFilters: () => void
  categories: string[]
  neighborhoods: string[]
}

const daysOfWeek = ['All Days', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function DealFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedNeighborhood,
  onNeighborhoodChange,
  selectedDay,
  onDayChange,
  activeOnly,
  onActiveOnlyChange,
  verifiedOnly,
  onVerifiedOnlyChange,
  onClearFilters,
  categories,
  neighborhoods
}: DealFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All Categories' ||
    selectedNeighborhood !== 'All Locations' ||
    selectedDay !== 'All Days' ||
    activeOnly ||
    verifiedOnly

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search deals by name, business, or description..."
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
          value={selectedDay}
          onChange={(e) => onDayChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
        >
          {daysOfWeek.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
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
                checked={activeOnly}
                onChange={(e) => onActiveOnlyChange(e.target.checked)}
                className="rounded border-gray-300 text-pittsburgh-gold focus:ring-pittsburgh-gold"
              />
              <span className="text-sm text-gray-700">Active Deals Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => onVerifiedOnlyChange(e.target.checked)}
                className="rounded border-gray-300 text-pittsburgh-gold focus:ring-pittsburgh-gold"
              />
              <span className="text-sm text-gray-700">Verified Deals Only</span>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

