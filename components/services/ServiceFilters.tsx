'use client'

import { Search, Filter, X } from 'lucide-react'
import { useState } from 'react'

interface ServiceFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedSubcategory: string
  onSubcategoryChange: (subcategory: string) => void
  selectedNeighborhood: string
  onNeighborhoodChange: (neighborhood: string) => void
  selectedPriceRange: string
  onPriceRangeChange: (range: string) => void
  verifiedOnly: boolean
  onVerifiedOnlyChange: (verified: boolean) => void
  emergencyOnly: boolean
  onEmergencyOnlyChange: (emergency: boolean) => void
  onClearFilters: () => void
  subcategories: string[]
  neighborhoods: string[]
}

export default function ServiceFilters({
  searchQuery,
  onSearchChange,
  selectedSubcategory,
  onSubcategoryChange,
  selectedNeighborhood,
  onNeighborhoodChange,
  selectedPriceRange,
  onPriceRangeChange,
  verifiedOnly,
  onVerifiedOnlyChange,
  emergencyOnly,
  onEmergencyOnlyChange,
  onClearFilters,
  subcategories,
  neighborhoods
}: ServiceFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const priceRanges = ['All Prices', 'Budget Friendly ($)', 'Moderate ($$)', 'Premium ($$$)', 'Luxury ($$$$)']

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedSubcategory !== 'All Categories' ||
    selectedNeighborhood !== 'All Locations' ||
    selectedPriceRange !== 'All Prices' ||
    verifiedOnly ||
    emergencyOnly

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search services by name, description, or specialty..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <select
          value={selectedSubcategory}
          onChange={(e) => onSubcategoryChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
        >
          <option value="All Categories">All Categories</option>
          {subcategories.map(cat => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-pittsburgh-black mb-2">
                Price Range
              </label>
              <select
                value={selectedPriceRange}
                onChange={(e) => onPriceRangeChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>

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
                checked={emergencyOnly}
                onChange={(e) => onEmergencyOnlyChange(e.target.checked)}
                className="rounded border-gray-300 text-pittsburgh-gold focus:ring-pittsburgh-gold"
              />
              <span className="text-sm text-gray-700">Emergency Service Available</span>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

