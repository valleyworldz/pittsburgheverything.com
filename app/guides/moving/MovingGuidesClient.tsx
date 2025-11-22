'use client'

import { useState, useMemo } from 'react'
import { Grid, List, Home } from 'lucide-react'
import { getMovingGuides } from '@/data/pittsburghGuides'
import type { Guide } from '@/data/pittsburghGuides'
import GuideCard from '@/components/guides/GuideCard'
import GuideFilters from '@/components/guides/GuideFilters'
import { GuideListSkeleton } from '@/components/guides/LoadingSkeleton'
import ErrorState from '@/components/guides/ErrorState'
import { filterGuides, sortGuides } from '@/utils/guideUtils'

export default function MovingGuidesClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedTag, setSelectedTag] = useState('All Tags')
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [error, setError] = useState<string | null>(null)

  const allGuides = useMemo(() => {
    try {
      return getMovingGuides()
    } catch (err) {
      setError('Failed to load guides')
      return []
    }
  }, [])

  const categories = useMemo(() => {
    const cats = Array.from(new Set(allGuides.map(g => g.subcategory || g.category).filter(Boolean)))
    return ['All Categories', ...cats]
  }, [allGuides])

  const tags = useMemo(() => {
    const allTags = allGuides.flatMap(g => g.tags)
    const uniqueTags = Array.from(new Set(allTags))
    return ['All Tags', ...uniqueTags.sort()]
  }, [allGuides])

  const filteredGuides = useMemo(() => {
    const filtered = filterGuides(allGuides, {
      searchQuery,
      category: selectedCategory,
      tag: selectedTag,
      featuredOnly,
      verifiedOnly
    })
    return sortGuides(filtered, sortBy)
  }, [allGuides, searchQuery, selectedCategory, selectedTag, featuredOnly, verifiedOnly, sortBy])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All Categories')
    setSelectedTag('All Tags')
    setFeaturedOnly(false)
    setVerifiedOnly(false)
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => setError(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GuideFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedTag={selectedTag}
            onTagChange={setSelectedTag}
            featuredOnly={featuredOnly}
            onFeaturedOnlyChange={setFeaturedOnly}
            verifiedOnly={verifiedOnly}
            onVerifiedOnlyChange={setVerifiedOnly}
            onClearFilters={handleClearFilters}
            categories={categories}
            tags={tags}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {filteredGuides.length} {filteredGuides.length === 1 ? 'guide' : 'guides'} found
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="updated">Recently Updated</option>
                <option value="reading-time-asc">Shortest Read</option>
                <option value="reading-time-desc">Longest Read</option>
                <option value="title-asc">Title A-Z</option>
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
          {filteredGuides.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-pittsburgh-black mb-2">No guides found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or check back later for new guides.
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
              {filteredGuides.map((guide) => (
                <GuideCard
                  key={guide.id}
                  guide={guide}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

