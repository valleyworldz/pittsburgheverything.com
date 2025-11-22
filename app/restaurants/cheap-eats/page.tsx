import { Metadata } from 'next'
import { MapPin, Clock, Star, DollarSign, Users, ExternalLink, Phone, Globe, Gift, Utensils } from 'lucide-react'
import Link from 'next/link'
import { getCheapEatsRestaurants } from '@/data/pittsburghRestaurants'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Cheap Eats in Pittsburgh | Budget-Friendly Restaurants | PittsburghEverything',
  description: 'Discover affordable restaurants in Pittsburgh including Fiori\'s Pizza, Peppi\'s, Noodlehead, Aiello\'s, and more. Great food that won\'t break the bank.',
  keywords: 'cheap eats Pittsburgh, budget restaurants, affordable dining, cheap food Pittsburgh, $ restaurants',
  openGraph: {
    title: 'Cheap Eats in Pittsburgh',
    description: 'Discover affordable and budget-friendly restaurants in Pittsburgh.',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 630, alt: 'Pittsburgh Cheap Eats' }]
  }
}

export default function CheapEatsPage() {
  const restaurants = getCheapEatsRestaurants()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Cheap Eats in Pittsburgh",
    "description": "Affordable and budget-friendly restaurants in Pittsburgh, Pennsylvania"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-500 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 text-green-200 hover:text-white transition-colors mb-6"
          >
            ← Back to Restaurants
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Gift className="w-16 h-16 text-green-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Cheap <span className="text-green-200">Eats</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Delicious food that won\'t break the bank! Discover Pittsburgh\'s best budget-friendly restaurants serving amazing meals at affordable prices.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <DollarSign className="w-4 h-4" />
                $ - $$
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Star className="w-4 h-4" />
                High Quality, Low Price
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Cheap Eats Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-2 border-green-100">
                <div className="relative h-64 bg-gradient-to-br from-green-100 to-green-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Utensils className="w-24 h-24 text-green-300 opacity-30" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-pittsburgh-black flex items-center gap-1">
                    <Star className="w-4 h-4 fill-pittsburgh-gold text-pittsburgh-gold" />
                    {restaurant.rating}
                  </div>
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {restaurant.priceRange === '$' ? 'BUDGET' : 'AFFORDABLE'}
                  </div>
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
                    {restaurant.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm">
                      View Menu
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

                  {restaurant.amenities?.takeout && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        ✓ Takeout available
                        {restaurant.amenities.delivery && ' • Delivery available'}
                        {restaurant.features.some(f => f.toLowerCase().includes('cash')) && ' • Cash only'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Budget Dining Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Lunch Specials</h3>
                <p className="text-gray-600 text-sm">Many restaurants offer lunch specials that are significantly cheaper than dinner prices.</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Happy Hour</h3>
                <p className="text-gray-600 text-sm">Check for happy hour deals on food and drinks, typically 4-6 PM on weekdays.</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Share Plates</h3>
                <p className="text-gray-600 text-sm">Many restaurants serve large portions - consider sharing entrees to save money.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

