import { Metadata } from 'next'
import { TrendingUp } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import TrendingClient from './TrendingClient'

export const metadata: Metadata = {
  title: 'Trending in Pittsburgh | What\'s Hot Right Now',
  description: 'Discover what\'s trending in Pittsburgh. Real-time updates on popular events, deals, news, and activities happening right now.',
  keywords: 'Pittsburgh trending, what\'s hot, popular events, trending news, real-time updates',
  openGraph: {
    title: 'Trending in Pittsburgh | What\'s Hot Right Now',
    description: 'See what\'s trending in Pittsburgh with real-time updates on events, deals, and activities.',
    images: [
      {
        url: '/images/trending/pittsburgh-trending.jpg',
        width: 1200,
        height: 630,
        alt: 'Trending in Pittsburgh'
      }
    ]
  }
}

export default function TrendingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Trending in Pittsburgh",
    "description": "Real-time updates on what's hot and trending in Pittsburgh.",
    "url": "https://pittsburgheverything.com/live/trending",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-yellow-300" />
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                LIVE NOW
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Trending in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Real-time updates on what's hot and happening right now in Pittsburgh.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">24</div>
                <div className="text-sm opacity-75">Active Trends</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">50K+</div>
                <div className="text-sm opacity-75">Daily Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">100+</div>
                <div className="text-sm opacity-75">Data Sources</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">1min</div>
                <div className="text-sm opacity-75">Update Rate</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-lg font-semibold mb-2">📊 Real-Time Analytics</p>
              <p className="opacity-90">
                Trends update every minute based on social media, news, events, and user activity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrendingClient />
    </div>
  )
}
