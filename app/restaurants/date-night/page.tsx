import { Metadata } from 'next'
import { MapPin, Clock, Star, DollarSign, Users, ExternalLink, Phone, Globe, Heart, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { getDateNightRestaurants } from '@/data/pittsburghRestaurants'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Date Night Restaurants in Pittsburgh | Romantic Dining | PittsburghEverything',
  description: 'Discover the best date night restaurants in Pittsburgh including fine dining, romantic spots, and special occasion destinations. Perfect restaurants for anniversaries, proposals, and romantic dinners.',
  keywords: 'date night restaurants Pittsburgh, romantic dining, fine dining Pittsburgh, special occasion restaurants, anniversary dinner',
  openGraph: {
    title: 'Date Night Restaurants in Pittsburgh',
    description: 'Discover Pittsburgh\'s most romantic and special occasion restaurants.',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 630, alt: 'Pittsburgh Date Night Restaurants' }]
  }
}

export default function DateNightPage() {
  const restaurants = getDateNightRestaurants()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Date Night Restaurants in Pittsburgh",
    "description": "Romantic and special occasion restaurants in Pittsburgh, Pennsylvania"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 text-pink-200 hover:text-white transition-colors mb-6"
          >
            ← Back to Restaurants
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Heart className="w-16 h-16 text-pink-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Date Night <span className="text-pink-200">Restaurants</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Create unforgettable moments at Pittsburgh\'s most romantic restaurants. From intimate fine dining to stunning views, these are the perfect spots for anniversaries, proposals, and special dates.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Heart className="w-4 h-4" />
                {restaurants.length} Romantic Spots
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                Special Occasions
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Date Night Restaurants Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-2 border-pink-100">
                <div className="relative h-64 bg-gradient-to-br from-pink-100 to-purple-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="w-24 h-24 text-pink-300 opacity-30" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-pittsburgh-black flex items-center gap-1">
                    <Star className="w-4 h-4 fill-pittsburgh-gold text-pittsburgh-gold" />
                    {restaurant.rating}
                  </div>
                  {(restaurant.priceRange === '$$$$' || restaurant.features.some(f => f.toLowerCase().includes('romantic'))) && (
                    <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      ROMANTIC
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
                    {restaurant.features.filter(f => f.toLowerCase().includes('romantic') || f.toLowerCase().includes('fine') || f.toLowerCase().includes('wine') || f.toLowerCase().includes('view')).slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 transition-colors text-sm">
                      Make Reservation
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

                  {restaurant.contact?.reservations && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-pink-600 font-medium">
                        💡 {restaurant.contact.reservations === 'Required' ? 'Reservations Required' : `Reservations: ${restaurant.contact.reservations}`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Date Night Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Perfect Date Night Planning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Make Reservations Early</h3>
                <p className="text-gray-600 text-sm">Popular date night spots book up weeks in advance, especially on weekends and holidays.</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Consider the View</h3>
                <p className="text-gray-600 text-sm">Request window seats or tables with views when making reservations for extra romance.</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Dress Code</h3>
                <p className="text-gray-600 text-sm">Fine dining restaurants may have dress codes. Check ahead to ensure you\'re appropriately dressed.</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Special Occasions</h3>
                <p className="text-gray-600 text-sm">Mention anniversaries, proposals, or special occasions when booking - many restaurants offer special touches.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

