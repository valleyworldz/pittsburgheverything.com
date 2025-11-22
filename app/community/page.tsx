import { Metadata } from 'next'
import { MessageSquare, Search, Filter, Plus, Eye, Heart, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import { getRecentPosts, getAllCommunityPosts } from '@/data/pittsburghCommunity'
import PostCard from '@/components/community/PostCard'

export const metadata: Metadata = {
  title: 'Pittsburgh Community | Questions, Lost & Found, Volunteer',
  description: 'Connect with the Pittsburgh community. Ask questions, post lost & found items, and find volunteer opportunities.',
  keywords: 'Pittsburgh community, questions, lost found, volunteer, local forum',
  openGraph: {
    title: 'Pittsburgh Community Hub',
    description: 'Connect with locals, ask questions, and find community resources.',
    images: [
      {
        url: '/images/community/pittsburgh-community.jpg',
        width: 1200,
        height: 630,
        alt: 'Pittsburgh community forum'
      }
    ]
  }
}

// Get recent posts from data
const communityPosts = getRecentPosts(10)


export default function CommunityPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pittsburgh Community Forum",
    "description": "Local community forum for questions, lost & found, and volunteer opportunities in Pittsburgh.",
    "url": "https://pittsburgheverything.com/community",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Pittsburgh Community
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Connect with your neighbors. Ask questions, find lost items, and discover volunteer opportunities in Pittsburgh.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/community/ask"
                className="bg-white text-pittsburgh-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Ask a Question
              </Link>
              <Link
                href="/community/post"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors inline-flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Start Discussion
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-pittsburgh-gold">2,847</div>
              <div className="text-gray-600">Community Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pittsburgh-gold">1,234</div>
              <div className="text-gray-600">Questions Answered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pittsburgh-gold">89</div>
              <div className="text-gray-600">Items Reunited</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pittsburgh-gold">156</div>
              <div className="text-gray-600">Volunteer Hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-pittsburgh-black mb-4">Browse by Category</h3>
                <div className="space-y-2">
                  <Link
                    href="/community/questions"
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Questions</span>
                  </Link>
                  <Link
                    href="/community/lost-found"
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <Search className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">Lost & Found</span>
                  </Link>
                  <Link
                    href="/community/volunteer"
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <Heart className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Volunteer</span>
                  </Link>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-semibold text-pittsburgh-black mb-3">Popular Neighborhoods</h4>
                  <div className="space-y-1">
                    {['Lawrenceville', 'Shadyside', 'Squirrel Hill', 'Downtown', 'South Side'].map(neighborhood => (
                      <button key={neighborhood} className="block w-full text-left text-sm text-gray-600 hover:text-pittsburgh-gold py-1">
                        {neighborhood}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-3">
              {/* Search and Filter Bar */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search community posts..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="w-4 h-4" />
                    <span className="text-sm">Filter</span>
                  </button>
                </div>
              </div>

              {/* Posts Feed */}
              <div className="space-y-4">
                {communityPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-8">
                <button className="bg-pittsburgh-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                  Load More Posts
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Community Guidelines
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Help us keep PittsburghEverything a welcoming space for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-pittsburgh-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-pittsburgh-black mb-2">Be Respectful</h3>
              <p className="text-gray-600">Treat others with kindness and respect. No harassment or discriminatory language.</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-pittsburgh-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-pittsburgh-black mb-2">Stay On Topic</h3>
              <p className="text-gray-600">Keep discussions relevant to Pittsburgh and the community. Use appropriate categories.</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-pittsburgh-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-pittsburgh-black mb-2">Help Others</h3>
              <p className="text-gray-600">Share your local knowledge and help fellow Pittsburghers with accurate information.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
