"use client"

import { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Tag as TagIcon, Search } from 'lucide-react'

export default function BlogTagPage() {
  const params = useParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const tagName = params.tag as string

  // Mock blog posts data (same as in blog index page)
  const allBlogPosts = [
    {
      id: 'pittsburgh-restaurant-week-2025',
      title: 'Ultimate Guide to Pittsburgh Restaurant Week 2025',
      excerpt: 'Everything you need to know about this year\'s Restaurant Week, including participating restaurants, menu highlights, and reservation tips.',
      author: 'Pittsburgh Food Critic',
      date: '2025-01-20',
      category: 'Food & Dining',
      tags: ['restaurant week', 'dining', 'food', 'events'],
      image: '/images/events/food-festival.svg',
      readTime: '5 min read'
    },
    {
      id: 'best-pittsburgh-winter-activities',
      title: 'Top Winter Activities in Pittsburgh: Beat the Cold',
      excerpt: 'From indoor attractions to winter sports, discover the best ways to enjoy Pittsburgh during the colder months.',
      author: 'Local Guide',
      date: '2025-01-18',
      category: 'Activities',
      tags: ['winter', 'activities', 'indoor', 'sports'],
      image: '/images/og-image.svg',
      readTime: '7 min read'
    },
    {
      id: 'pittsburgh-business-growth-2025',
      title: 'Pittsburgh Business Landscape: Growth Trends for 2025',
      excerpt: 'Analysis of emerging business sectors, startup scene, and economic opportunities in Pittsburgh for the coming year.',
      author: 'Business Analyst',
      date: '2025-01-15',
      category: 'Business',
      tags: ['business', 'economy', 'startups', 'trends'],
      image: '/images/og-image.svg',
      readTime: '8 min read'
    },
    {
      id: 'hidden-gems-pittsburgh',
      title: 'Hidden Gems: Underrated Spots in Pittsburgh Neighborhoods',
      excerpt: 'Discover lesser-known but amazing local businesses, parks, and attractions throughout Pittsburgh\'s diverse neighborhoods.',
      author: 'Local Explorer',
      date: '2025-01-12',
      category: 'Local Guide',
      tags: ['hidden gems', 'neighborhoods', 'local', 'discover'],
      image: '/images/og-image.svg',
      readTime: '6 min read'
    },
    {
      id: 'pittsburgh-coffee-scene',
      title: 'The Evolution of Pittsburgh\'s Coffee Culture',
      excerpt: 'From local roasteries to specialty cafes, explore how Pittsburgh has become a coffee destination.',
      author: 'Food Writer',
      date: '2025-01-10',
      category: 'Food & Dining',
      tags: ['coffee', 'culture', 'local', 'roasteries'],
      image: '/images/deals/crazy-mocha-student.svg',
      readTime: '4 min read'
    },
    {
      id: 'pittsburgh-sports-preview',
      title: 'Pittsburgh Sports Preview: 2025 Season Outlook',
      excerpt: 'What to expect from the Steelers, Penguins, and Pirates in the coming season, plus local sports events.',
      author: 'Sports Editor',
      date: '2025-01-08',
      category: 'Sports',
      tags: ['steelers', 'penguins', 'pirates', 'sports'],
      image: '/images/events/steelers-game.svg',
      readTime: '9 min read'
    }
  ]

  // Filter posts by tag and search query
  const filteredPosts = useMemo(() => {
    let filtered = allBlogPosts.filter(post =>
      post.tags.some(tag => tag.toLowerCase().replace(/\s+/g, '-') === tagName.toLowerCase())
    )

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    return filtered
  }, [tagName, searchQuery])

  // Get display name for the tag
  const displayTagName = tagName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  if (filteredPosts.length === 0 && !searchQuery) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <TagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tag Not Found</h1>
          <p className="text-gray-600 mb-4">No articles found with the tag "{displayTagName}"</p>
          <Link href="/blog" className="text-pittsburgh-gold hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-pittsburgh-gold transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <TagIcon className="w-8 h-8 text-pittsburgh-gold" />
            <h1 className="text-3xl font-bold text-pittsburgh-black">
              Articles tagged "{displayTagName}"
            </h1>
          </div>

          <p className="text-gray-600 mb-6">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
          </p>

          {/* Search within tag */}
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search within "${displayTagName}"...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
            <p className="text-gray-500 mb-4">
              No articles match your search "{searchQuery}" within the "{displayTagName}" tag
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-pittsburgh-gold hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-pittsburgh-gold text-white px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-xs">{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-pittsburgh-black mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>

                    <Link
                      href={`/blog/${post.id}`}
                      className="text-pittsburgh-gold font-medium hover:underline text-sm"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Related Tags */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-pittsburgh-black mb-6">Explore More Topics</h2>
          <div className="flex flex-wrap gap-3">
            {[
              'Pittsburgh Restaurants',
              'Local Events',
              'Business News',
              'Neighborhood Guides',
              'Food Scene',
              'Sports',
              'Culture',
              'Startups',
              'Real Estate',
              'Entertainment'
            ].filter(tag => tag.toLowerCase().replace(/\s+/g, '-') !== tagName).map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white px-4 py-2 rounded-full text-gray-700 hover:bg-pittsburgh-gold hover:text-white transition-colors flex items-center gap-2"
              >
                <TagIcon className="w-3 h-3" />
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
