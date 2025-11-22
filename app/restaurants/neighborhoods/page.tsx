import { Metadata } from 'next'
import { MapPin, Clock, Star, DollarSign, Users, ExternalLink, Phone, Globe, Building2, Utensils } from 'lucide-react'
import Link from 'next/link'
import { getAllNeighborhoods, getRestaurantsByNeighborhood, pittsburghRestaurants } from '@/data/pittsburghRestaurants'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Restaurants by Neighborhood in Pittsburgh | Dining by Area | PittsburghEverything',
  description: 'Explore Pittsburgh restaurants organized by neighborhood. Find the best dining in Strip District, Lawrenceville, Shadyside, Oakland, South Side, and more.',
  keywords: 'Pittsburgh restaurants by neighborhood, Strip District restaurants, Lawrenceville restaurants, Shadyside restaurants, Oakland restaurants',
  openGraph: {
    title: 'Restaurants by Neighborhood in Pittsburgh',
    description: 'Discover the best restaurants in each Pittsburgh neighborhood.',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 630, alt: 'Pittsburgh Restaurants by Neighborhood' }]
  }
}

export default function NeighborhoodsPage() {
  const neighborhoods = getAllNeighborhoods()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Restaurants by Neighborhood in Pittsburgh",
    "description": "Restaurants organized by neighborhood in Pittsburgh, Pennsylvania"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6"
          >
            ← Back to Restaurants
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Building2 className="w-16 h-16 text-blue-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Restaurants by <span className="text-blue-200">Neighborhood</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Explore Pittsburgh\'s diverse dining scene neighborhood by neighborhood. From the historic Strip District to trendy Lawrenceville, discover the best restaurants in each area.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Building2 className="w-4 h-4" />
                {neighborhoods.length} Neighborhoods
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Utensils className="w-4 h-4" />
                {pittsburghRestaurants.length}+ Restaurants
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {neighborhoods.map((neighborhood) => {
              const restaurants = getRestaurantsByNeighborhood(neighborhood)
              return (
                <div key={neighborhood} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-2 border-blue-100">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-pittsburgh-black">
                          {neighborhood}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {restaurants.length} {restaurants.length === 1 ? 'restaurant' : 'restaurants'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      {restaurants.slice(0, 3).map((restaurant) => (
                        <div key={restaurant.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex-1">
                            <h3 className="font-semibold text-pittsburgh-black text-sm mb-1">
                              {restaurant.name}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Star className="w-3 h-3 fill-pittsburgh-gold text-pittsburgh-gold" />
                              <span>{restaurant.rating}</span>
                              <span>•</span>
                              <span>{restaurant.priceRange.repeat(restaurant.priceRange.length)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {restaurants.length > 3 && (
                      <button className="w-full text-blue-600 hover:text-blue-700 font-semibold text-sm">
                        View all {restaurants.length} restaurants →
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular Neighborhoods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-pittsburgh-black mb-8 text-center">
            Popular Dining Neighborhoods
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Strip District', desc: 'Historic markets, ethnic food, food halls', count: getRestaurantsByNeighborhood('Strip District').length },
              { name: 'Lawrenceville', desc: 'Trendy spots, craft cocktails, creative cuisine', count: getRestaurantsByNeighborhood('Lawrenceville').length },
              { name: 'Shadyside', desc: 'Upscale dining, brunch spots, fine dining', count: getRestaurantsByNeighborhood('Shadyside').length },
              { name: 'Oakland', desc: 'Student-friendly, diverse options, late night', count: getRestaurantsByNeighborhood('Oakland').length }
            ].map((hood) => (
              <div key={hood.name} className="bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="font-bold text-lg text-pittsburgh-black mb-2">{hood.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{hood.desc}</p>
                <p className="text-pittsburgh-gold font-semibold">{hood.count} restaurants</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

