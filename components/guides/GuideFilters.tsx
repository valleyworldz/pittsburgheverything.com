'use client'

import { Search, Filter, X, Tag } from 'lucide-react'
import { useState } from 'react'

interface GuideFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedTag: string
  onTagChange: (tag: string) => void
  featuredOnly: boolean
  onFeaturedOnlyChange: (featured: boolean) => void
  verifiedOnly: boolean
  onVerifiedOnlyChange: (verified: boolean) => void
  onClearFilters: () => void
  categories: string[]
  tags: string[]
}

export default function GuideFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTag,
  onTagChange,
  featuredOnly,
  onFeaturedOnlyChange,
  verifiedOnly,
  onVerifiedOnlyChange,
  onClearFilters,
  categories,
  tags
}: GuideFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All Categories' ||
    selectedTag !== 'All Tags' ||
    featuredOnly ||
    verifiedOnly

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search guides by title, content, or tags..."
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
          value={selectedTag}
          onChange={(e) => onTagChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
        >
          <option value="All Tags">All Tags</option>
          {tags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
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
                checked={featuredOnly}
                onChange={(e) => onFeaturedOnlyChange(e.target.checked)}
                className="rounded border-gray-300 text-pittsburgh-gold focus:ring-pittsburgh-gold"
              />
              <span className="text-sm text-gray-700">Featured Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => onVerifiedOnlyChange(e.target.checked)}
                className="rounded border-gray-300 text-pittsburgh-gold focus:ring-pittsburgh-gold"
              />
              <span className="text-sm text-gray-700">Verified Only</span>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

