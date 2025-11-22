import { Metadata } from 'next'
import { MapPin, Clock, Star, DollarSign, Users, ExternalLink, Phone, Globe, Sparkles, Calendar } from 'lucide-react'
import Link from 'next/link'
import { getNewOpeningsRestaurants } from '@/data/pittsburghRestaurants'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'New Restaurant Openings in Pittsburgh | Latest Restaurants | PittsburghEverything',
  description: 'Discover the newest restaurant openings in Pittsburgh. Stay up-to-date with the latest dining spots, chef-driven concepts, and exciting new additions to Pittsburgh\'s food scene.',
  keywords: 'new restaurants Pittsburgh, restaurant openings, new dining spots, latest restaurants, recently opened restaurants',
  openGraph: {
    title: 'New Restaurant Openings in Pittsburgh',
    description: 'Discover the latest restaurant openings and newest dining spots in Pittsburgh.',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 630, alt: 'New Pittsburgh Restaurants' }]
  }
}

export default function NewOpeningsPage() {
  const restaurants = getNewOpeningsRestaurants()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "New Restaurant Openings in Pittsburgh",
    "description": "Recently opened restaurants in Pittsburgh, Pennsylvania"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 text-indigo-200 hover:text-white transition-colors mb-6"
          >
            ← Back to Restaurants
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-16 h-16 text-indigo-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              New <span className="text-indigo-200">Openings</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Be the first to discover Pittsburgh\'s newest restaurants. From chef-driven concepts to exciting new cuisines, explore what\'s fresh in the Steel City\'s dining scene.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                {restaurants.length} New Spots
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Calendar className="w-4 h-4" />
                2024-2025
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* New Restaurants Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-2 border-indigo-100 relative">
                <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                  NEW
                </div>
                <div className="relative h-64 bg-gradient-to-br from-indigo-100 to-purple-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-24 h-24 text-indigo-300 opacity-30" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-pittsburgh-black flex items-center gap-1">
                    <Star className="w-4 h-4 fill-pittsburgh-gold text-pittsburgh-gold" />
                    {restaurant.rating}
                  </div>
                  {restaurant.openingDate && (
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-gray-600">
                      Opened {new Date(restaurant.openingDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-pittsburgh-black mb-3">
                    {restaurant.name}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {restaurant.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{restaurant.location.neighborhood}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <DollarSign className="w-4 h-4" />
                      <span>{restaurant.priceRange.repeat(restaurant.priceRange.length)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {restaurant.cuisine.slice(0, 2).map((cuisine) => (
                      <span
                        key={cuisine}
                        className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {cuisine}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm">
                      Try It Now
                    </button>
                    {restaurant.contact?.website && (
                      <a
                        href={restaurant.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm flex items-center gap-1"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Stay Updated on New Openings
            </h2>
            <p className="text-gray-700 mb-6">
              Pittsburgh\'s restaurant scene is constantly evolving. Check back regularly for the latest openings, or subscribe to our newsletter to be notified of new restaurants as they open.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/newsletter"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-center"
              >
                Subscribe to Updates
              </Link>
              <Link
                href="/restaurants/top-picks"
                className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors text-center"
              >
                View Top Picks
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

