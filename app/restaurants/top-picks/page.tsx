import { Metadata } from 'next'
import { MapPin, Clock, Star, DollarSign, Users, Heart, ExternalLink, Phone, Globe, Award, Utensils } from 'lucide-react'
import Link from 'next/link'
import { getTopPicksRestaurants } from '@/data/pittsburghRestaurants'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Top Restaurant Picks in Pittsburgh | Best Dining | PittsburghEverything',
  description: 'Discover Pittsburgh\'s top-rated restaurants including Primanti Bros, The Porch at Schenley, Eleven, Fat Head\'s, and more. The best dining experiences in the Steel City.',
  keywords: 'best restaurants Pittsburgh, top restaurants, highest rated restaurants, Pittsburgh dining, fine dining Pittsburgh',
  openGraph: {
    title: 'Top Restaurant Picks in Pittsburgh',
    description: 'Discover the highest-rated and most popular restaurants in Pittsburgh.',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 630, alt: 'Top Pittsburgh Restaurants' }]
  }
}

export default function TopPicksPage() {
  const restaurants = getTopPicksRestaurants()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Top Restaurant Picks in Pittsburgh",
    "description": "Highest-rated and most popular restaurants in Pittsburgh, Pennsylvania"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 text-pittsburgh-gold hover:text-white transition-colors mb-6"
          >
            ← Back to Restaurants
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Award className="w-16 h-16 text-pittsburgh-gold" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Top Restaurant <span className="text-pittsburgh-gold">Picks</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Discover Pittsburgh\'s highest-rated and most beloved restaurants. These are the places locals and visitors rave about - from iconic institutions to fine dining destinations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Award className="w-4 h-4" />
                {restaurants.length} Top Restaurants
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Star className="w-4 h-4" />
                4.6+ Star Rating
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant, index) => (
              <div key={restaurant.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative">
                {index < 3 && (
                  <div className="absolute top-4 left-4 bg-pittsburgh-gold text-pittsburgh-black px-3 py-1 rounded-full text-xs font-bold z-10">
                    #{index + 1} PICK
                  </div>
                )}
                <div className="relative h-64 bg-gradient-to-br from-pittsburgh-gold/20 to-pittsburgh-black/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Utensils className="w-24 h-24 text-pittsburgh-gold opacity-30" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-pittsburgh-black flex items-center gap-1">
                    <Star className="w-4 h-4 fill-pittsburgh-gold text-pittsburgh-gold" />
                    {restaurant.rating}
                  </div>
                  {restaurant.reviewCount && (
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-gray-600">
                      {restaurant.reviewCount.toLocaleString()} reviews
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
                        className="bg-pittsburgh-gold/10 text-pittsburgh-gold px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {cuisine}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {restaurant.specialties.slice(0, 2).map((specialty) => (
                      <span
                        key={specialty}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-pittsburgh-gold text-pittsburgh-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-sm">
                      View Details
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

                  {restaurant.contact && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        {restaurant.contact.phone && (
                          <a href={`tel:${restaurant.contact.phone}`} className="flex items-center gap-1 hover:text-pittsburgh-gold">
                            <Phone className="w-3 h-3" />
                            {restaurant.contact.phone}
                          </a>
                        )}
                        {restaurant.contact.reservations && (
                          <span className="text-pittsburgh-gold font-medium">
                            Reservations: {restaurant.contact.reservations}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why These Are Top Picks */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-pittsburgh-gold/10 to-pittsburgh-black/10 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Why These Are Top Picks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6">
                <div className="w-12 h-12 bg-pittsburgh-gold rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-pittsburgh-black" />
                </div>
                <h3 className="font-bold text-lg mb-2">High Ratings</h3>
                <p className="text-gray-600 text-sm">All restaurants have 4.6+ star ratings with thousands of verified reviews.</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <div className="w-12 h-12 bg-pittsburgh-gold rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-pittsburgh-black" />
                </div>
                <h3 className="font-bold text-lg mb-2">Popular Choice</h3>
                <p className="text-gray-600 text-sm">These are the restaurants locals and visitors consistently recommend.</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <div className="w-12 h-12 bg-pittsburgh-gold rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-pittsburgh-black" />
                </div>
                <h3 className="font-bold text-lg mb-2">Consistent Quality</h3>
                <p className="text-gray-600 text-sm">Known for maintaining high standards and exceptional dining experiences.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

