import type { Metadata } from 'next'
import { Calendar, User, Tag, ArrowRight, Search, Filter } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pittsburgh Blog | Local News, Events & Insights | PittsburghEverything',
  description: 'Stay updated with the latest Pittsburgh news, events, business insights, and local stories. Your source for everything happening in the Steel City.',
  keywords: 'Pittsburgh blog, local news, Pittsburgh events, business insights, Steel City updates',
  openGraph: {
    title: 'Pittsburgh Blog | Local News & Insights',
    description: 'Latest Pittsburgh news, events, and business insights from PittsburghEverything.',
    images: [
      {
        url: '/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Pittsburgh Blog',
      },
    ],
  },
}

export default function BlogPage() {
  // Mock blog posts - in production, this would come from a CMS or database
  const blogPosts = [
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

  const categories = ['All', 'Food & Dining', 'Business', 'Activities', 'Local Guide', 'Sports', 'Events']
  const featuredPost = blogPosts[0]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold via-yellow-400 to-orange-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Pittsburgh Blog
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Stay informed with the latest Pittsburgh news, business insights, local events, and community stories.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Featured Article</h2>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-lg">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-pittsburgh-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-500 text-sm">{featuredPost.readTime}</span>
                </div>

                <h3 className="text-2xl font-bold text-pittsburgh-black mb-4">
                  {featuredPost.title}
                </h3>

                <p className="text-gray-700 mb-6">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pittsburgh-gold rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-pittsburgh-black">{featuredPost.author}</div>
                      <div className="text-sm text-gray-500">{featuredPost.date}</div>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="bg-pittsburgh-gold text-pittsburgh-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center gap-2"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories and Filters */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-pittsburgh-gold hover:text-white transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <select className="px-4 py-2 rounded-lg bg-white border border-gray-300">
                <option>Latest First</option>
                <option>Oldest First</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
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

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Pittsburgh</h2>
          <p className="text-xl mb-8">
            Get the latest Pittsburgh news, events, and insights delivered to your inbox.
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <button className="bg-pittsburgh-gold text-pittsburgh-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tags */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Popular Topics</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {['Pittsburgh Restaurants', 'Local Events', 'Business News', 'Neighborhood Guides', 'Food Scene', 'Sports', 'Culture', 'Startups', 'Real Estate', 'Entertainment'].map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag.toLowerCase().replace(' ', '-')}`}
                className="bg-white px-4 py-2 rounded-full text-gray-700 hover:bg-pittsburgh-gold hover:text-white transition-colors flex items-center gap-2"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
