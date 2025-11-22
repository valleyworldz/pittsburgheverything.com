import { Metadata } from 'next'
import { Zap } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import DealsClient from './DealsClient'

export const metadata: Metadata = {
  title: 'Live Deals in Pittsburgh | Real-Time Discounts & Special Offers',
  description: 'Find live deals in Pittsburgh. Real-time discounts, flash sales, and special offers from local businesses. Updated every minute.',
  keywords: 'Pittsburgh deals, live discounts, flash sales, special offers, local deals, real-time offers',
  openGraph: {
    title: 'Live Deals in Pittsburgh | Real-Time Discounts',
    description: 'Discover live deals and special offers in Pittsburgh. Real-time discounts from local businesses.',
    images: [
      {
        url: '/images/deals/live-deals-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Live deals in Pittsburgh'
      }
    ]
  }
}

export default function LiveDealsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Live Deals in Pittsburgh",
    "description": "Real-time discounts and special offers from Pittsburgh businesses.",
    "url": "https://pittsburgheverything.com/live/deals",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-yellow-300" />
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                LIVE NOW
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Live Deals in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Real-time discounts and special offers from Pittsburgh businesses. Updated every minute.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">24</div>
                <div className="text-sm opacity-75">Active Deals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">$2.5K</div>
                <div className="text-sm opacity-75">Avg Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">50+</div>
                <div className="text-sm opacity-75">Businesses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">1min</div>
                <div className="text-sm opacity-75">Update Freq</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-lg font-semibold mb-2">⚡ Flash Deals Alert</p>
              <p className="opacity-90">
                New deals appear instantly. Some offers expire in minutes - act fast!
              </p>
            </div>
          </div>
        </div>
      </section>

      <DealsClient />
    </div>
  )
}
