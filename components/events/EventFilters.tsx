'use client'

import { useState } from 'react'
import { Filter, X, Search, SlidersHorizontal, Calendar, MapPin, DollarSign } from 'lucide-react'
import { getAllNeighborhoods } from '@/data/pittsburghEvents'

interface EventFiltersProps {
  onFilterChange: (filters: FilterState) => void
  initialFilters?: FilterState
}

export interface FilterState {
  search: string
  category: string[]
  neighborhood: string[]
  priceRange: string[]
  dateRange: string
  features: string[]
  ageRestriction: string[]
}

const CATEGORIES = [
  'Sports', 'Music', 'Arts & Culture', 'Food & Drink', 
  'Family', 'Festival', 'Nightlife', 'Comedy', 'Theater'
]

const FEATURES = [
  'Free', 'Live Music', 'Food Available', 'Parking Available',
  'Family-Friendly', 'Wheelchair Accessible', 'Public Transit'
]

const AGE_RESTRICTIONS = [
  'All Ages', '18+', '21+', 'Family-Friendly'
]

export default function EventFilters({ onFilterChange, initialFilters }: EventFiltersProps) {
  const neighborhoods = getAllNeighborhoods()
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>(initialFilters || {
    search: '',
    category: [],
    neighborhood: [],
    priceRange: [],
    dateRange: 'all',
    features: [],
    ageRestriction: []
  })

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const toggleArrayItem = (key: 'category' | 'neighborhood' | 'priceRange' | 'features' | 'ageRestriction', value: string) => {
    const current = filters[key] as string[]
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value]
    updateFilter(key, updated)
  }

  const clearFilters = () => {
    const cleared = {
      search: '',
      category: [],
      neighborhood: [],
      priceRange: [],
      dateRange: 'all',
      features: [],
      ageRestriction: []
    }
    setFilters(cleared)
    onFilterChange(cleared)
  }

  const activeFilterCount = 
    filters.search.length +
    filters.category.length +
    filters.neighborhood.length +
    filters.priceRange.length +
    (filters.dateRange !== 'all' ? 1 : 0) +
    filters.features.length +
    filters.ageRestriction.length

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      {/* Mobile Toggle */}
      <div className="md:hidden flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-pittsburgh-black font-semibold"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-pittsburgh-gold text-pittsburgh-black px-2 py-0.5 rounded-full text-xs font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-pittsburgh-gold"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filters Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block space-y-6`}>
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Events
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              placeholder="Search by name, venue, or description..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => toggleArrayItem('category', category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filters.category.includes(category)
                    ? 'bg-pittsburgh-gold text-pittsburgh-black font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Neighborhood */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Neighborhood
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
            {neighborhoods.map((hood) => (
              <button
                key={hood}
                onClick={() => toggleArrayItem('neighborhood', hood)}
                className={`px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                  filters.neighborhood.includes(hood)
                    ? 'bg-pittsburgh-gold text-pittsburgh-black font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {hood}
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            When
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => updateFilter('dateRange', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="weekend">This Weekend</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => toggleArrayItem('priceRange', 'free')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                filters.priceRange.includes('free')
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Free
            </button>
            <button
              onClick={() => toggleArrayItem('priceRange', 'under-25')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                filters.priceRange.includes('under-25')
                  ? 'bg-pittsburgh-gold text-pittsburgh-black'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Under $25
            </button>
            <button
              onClick={() => toggleArrayItem('priceRange', '25-50')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                filters.priceRange.includes('25-50')
                  ? 'bg-pittsburgh-gold text-pittsburgh-black'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              $25-$50
            </button>
            <button
              onClick={() => toggleArrayItem('priceRange', '50+')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                filters.priceRange.includes('50+')
                  ? 'bg-pittsburgh-gold text-pittsburgh-black'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              $50+
            </button>
          </div>
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Features
          </label>
          <div className="flex flex-wrap gap-2">
            {FEATURES.map((feature) => (
              <button
                key={feature}
                onClick={() => toggleArrayItem('features', feature)}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  filters.features.includes(feature)
                    ? 'bg-blue-500 text-white font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>

        {/* Age Restriction */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age Restriction
          </label>
          <div className="flex flex-wrap gap-2">
            {AGE_RESTRICTIONS.map((age) => (
              <button
                key={age}
                onClick={() => toggleArrayItem('ageRestriction', age)}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  filters.ageRestriction.includes(age)
                    ? 'bg-purple-500 text-white font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  )
}

