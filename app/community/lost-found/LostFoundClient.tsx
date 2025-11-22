'use client'

import { useState, useMemo } from 'react'
import { Search, Plus, Grid, List, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { getLostFound, searchPosts, getPostsByNeighborhood, getFeaturedPosts } from '@/data/pittsburghCommunity'
import type { CommunityPost } from '@/data/pittsburghCommunity'
import PostCard from '@/components/community/PostCard'
import PostFilters from '@/components/community/PostFilters'
import { PostListSkeleton } from '@/components/community/LoadingSkeleton'
import ErrorState from '@/components/community/ErrorState'

type SortOption = 'newest' | 'oldest' | 'most-views' | 'most-responses' | 'featured'
type ViewMode = 'grid' | 'list'

export default function LostFoundClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [neighborhood, setNeighborhood] = useState('All Neighborhoods')
  const [status, setStatus] = useState('all')
  const [featured, setFeatured] = useState(false)
  const [verified, setVerified] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const posts = useMemo(() => {
    let result = getLostFound()

    // Apply search
    if (searchQuery) {
      result = searchPosts(searchQuery).filter(p => p.type === 'lost-found')
    }

    // Apply neighborhood filter
    if (neighborhood !== 'All Neighborhoods') {
      result = result.filter(p => p.neighborhood === neighborhood)
    }

    // Apply status filter
    if (status !== 'all') {
      result = result.filter(p => p.status === status)
    }

    // Apply featured filter
    if (featured) {
      result = result.filter(p => p.featured)
    }

    // Apply verified filter
    if (verified) {
      result = result.filter(p => p.verified)
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'most-views':
          return b.views - a.views
        case 'most-responses':
          return b.responses - a.responses
        case 'featured':
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

    return result
  }, [searchQuery, neighborhood, status, featured, verified, sortBy])

  if (error) {
    return <ErrorState message={error} onRetry={() => setError(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
                <Search className="w-10 h-10" />
                Lost & Found
              </h1>
              <p className="text-xl text-orange-100 max-w-2xl">
                Report lost items or help reunite found items with their owners. Together we can help recover what's lost.
              </p>
            </div>
            <Link
              href="/community/post"
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Post Lost/Found
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Alert Banner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-1">Important Safety Tips</h3>
            <p className="text-sm text-yellow-800">
              When claiming found items, verify ownership with identifying details. Never share personal information publicly. 
              For lost pets, contact local animal shelters and post on social media.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
            <div className="text-sm text-gray-600">Active Posts</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">
              {posts.filter(p => p.status === 'resolved').length}
            </div>
            <div className="text-sm text-gray-600">Items Reunited</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">
              {posts.filter(p => p.featured).length}
            </div>
            <div className="text-sm text-gray-600">Featured Posts</div>
          </div>
        </div>

        {/* Filters */}
        <PostFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          neighborhood={neighborhood}
          onNeighborhoodChange={setNeighborhood}
          status={status}
          onStatusChange={setStatus}
          featured={featured}
          onFeaturedChange={setFeatured}
          verified={verified}
          onVerifiedChange={setVerified}
        />

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
            </span>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most-views">Most Views</option>
              <option value="most-responses">Most Responses</option>
              <option value="featured">Featured First</option>
            </select>
            <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Posts List */}
        {loading ? (
          <PostListSkeleton count={6} />
        ) : posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-4">No lost & found posts found. Try adjusting your filters.</p>
            <Link
              href="/community/post"
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Post Lost or Found Item
            </Link>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

