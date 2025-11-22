'use client'

import { useState } from 'react'
import { Filter, X, Search, SlidersHorizontal } from 'lucide-react'
import { getAllNeighborhoods } from '@/data/pittsburghRestaurants'

interface RestaurantFiltersProps {
  onFilterChange: (filters: FilterState) => void
  initialFilters?: FilterState
}

export interface FilterState {
  search: string
  cuisine: string[]
  neighborhood: string[]
  priceRange: string[]
  rating: number
  features: string[]
  dietaryOptions: string[]
  amenities: string[]
}

const CUISINES = [
  'American', 'Italian', 'Seafood', 'Pizza', 'Thai', 'Barbecue',
  'Fine Dining', 'Contemporary', 'Farm-to-Table', 'Latin', 'Argentine'
]

const FEATURES = [
  'Brunch', 'Romantic', 'Late Night', 'Outdoor Seating', 'Live Music',
  'Happy Hour', 'Takeout', 'Delivery', 'Reservations', 'Private Dining'
]

const DIETARY_OPTIONS = [
  'Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher'
]

const AMENITIES = [
  'Parking', 'Outdoor Seating', 'Wheelchair Accessible', 'WiFi', 'Live Music', 'Happy Hour'
]

export default function RestaurantFilters({ onFilterChange, initialFilters }: RestaurantFiltersProps) {
  const neighborhoods = getAllNeighborhoods()
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>(initialFilters || {
    search: '',
    cuisine: [],
    neighborhood: [],
    priceRange: [],
    rating: 0,
    features: [],
    dietaryOptions: [],
    amenities: []
  })

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const toggleArrayItem = (key: 'cuisine' | 'neighborhood' | 'priceRange' | 'features' | 'dietaryOptions' | 'amenities', value: string) => {
    const current = filters[key] as string[]
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value]
    updateFilter(key, updated)
  }

  const clearFilters = () => {
    const cleared = {
      search: '',
      cuisine: [],
      neighborhood: [],
      priceRange: [],
      rating: 0,
      features: [],
      dietaryOptions: [],
      amenities: []
    }
    setFilters(cleared)
    onFilterChange(cleared)
  }

  const activeFilterCount = 
    filters.search.length +
    filters.cuisine.length +
    filters.neighborhood.length +
    filters.priceRange.length +
    (filters.rating > 0 ? 1 : 0) +
    filters.features.length +
    filters.dietaryOptions.length +
    filters.amenities.length

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
            Search Restaurants
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              placeholder="Search by name, cuisine, or feature..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
            />
          </div>
        </div>

        {/* Cuisine */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cuisine Type
          </label>
          <div className="flex flex-wrap gap-2">
            {CUISINES.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => toggleArrayItem('cuisine', cuisine)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filters.cuisine.includes(cuisine)
                    ? 'bg-pittsburgh-gold text-pittsburgh-black font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cuisine}
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

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="flex gap-2">
            {['$', '$$', '$$$', '$$$$'].map((price) => (
              <button
                key={price}
                onClick={() => toggleArrayItem('priceRange', price)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  filters.priceRange.includes(price)
                    ? 'bg-pittsburgh-gold text-pittsburgh-black'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {price.repeat(price.length)}
              </button>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Rating: {filters.rating > 0 ? `${filters.rating}+` : 'Any'}
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={filters.rating}
            onChange={(e) => updateFilter('rating', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Any</span>
            <span>5.0</span>
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
                    ? 'bg-pittsburgh-gold text-pittsburgh-black font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dietary Options
          </label>
          <div className="flex flex-wrap gap-2">
            {DIETARY_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => toggleArrayItem('dietaryOptions', option)}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  filters.dietaryOptions.includes(option)
                    ? 'bg-green-500 text-white font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amenities
          </label>
          <div className="flex flex-wrap gap-2">
            {AMENITIES.map((amenity) => (
              <button
                key={amenity}
                onClick={() => toggleArrayItem('amenities', amenity)}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  filters.amenities.includes(amenity)
                    ? 'bg-blue-500 text-white font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {amenity}
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

