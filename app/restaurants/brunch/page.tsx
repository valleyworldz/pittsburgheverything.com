import { Metadata } from 'next'
import { MapPin, Clock, Star, DollarSign, Users, ExternalLink, Phone, Globe, Coffee, Utensils } from 'lucide-react'
import Link from 'next/link'
import { getBrunchRestaurants } from '@/data/pittsburghRestaurants'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Best Brunch in Pittsburgh | Weekend Brunch Spots | PittsburghEverything',
  description: 'Discover the best brunch restaurants in Pittsburgh including The Porch at Schenley, Walnut Grill, Pamela\'s Diner, and more. Weekend brunch spots with bottomless mimosas and creative menus.',
  keywords: 'brunch Pittsburgh, weekend brunch, best brunch, bottomless mimosas, breakfast restaurants Pittsburgh',
  openGraph: {
    title: 'Best Brunch in Pittsburgh',
    description: 'Discover Pittsburgh\'s best brunch spots for weekend dining.',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 630, alt: 'Pittsburgh Brunch Restaurants' }]
  }
}

export default function BrunchPage() {
  const restaurants = getBrunchRestaurants()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Best Brunch Restaurants in Pittsburgh",
    "description": "Brunch restaurants and weekend breakfast spots in Pittsburgh, Pennsylvania"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 text-orange-200 hover:text-white transition-colors mb-6"
          >
            ← Back to Restaurants
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Coffee className="w-16 h-16 text-orange-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="text-orange-200">Brunch</span> in Pittsburgh
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Start your weekend right with Pittsburgh\'s best brunch spots. From bottomless mimosas to creative breakfast dishes, discover where to brunch in the Steel City.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Coffee className="w-4 h-4" />
                {restaurants.length} Brunch Spots
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Utensils className="w-4 h-4" />
                Weekend Favorites
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Brunch Restaurants Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-2 border-orange-100">
                <div className="relative h-64 bg-gradient-to-br from-orange-100 to-orange-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Coffee className="w-24 h-24 text-orange-300 opacity-30" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-pittsburgh-black flex items-center gap-1">
                    <Star className="w-4 h-4 fill-pittsburgh-gold text-pittsburgh-gold" />
                    {restaurant.rating}
                  </div>
                  {restaurant.features.some(f => f.toLowerCase().includes('bottomless')) && (
                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      BOTTOMLESS
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
                    {restaurant.specialties.filter(s => s.toLowerCase().includes('brunch') || s.toLowerCase().includes('mimosa') || s.toLowerCase().includes('eggs') || s.toLowerCase().includes('toast')).slice(0, 3).map((specialty) => (
                      <span
                        key={specialty}
                        className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-sm">
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

                  {restaurant.contact?.reservations && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        💡 Reservations: {restaurant.contact.reservations}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brunch Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Brunch Tips & Best Practices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Make Reservations</h3>
                <p className="text-gray-600 text-sm mb-2">Popular brunch spots fill up quickly, especially on weekends. Book ahead when possible.</p>
                <p className="text-xs text-gray-500">Check OpenTable or call directly</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Arrive Early</h3>
                <p className="text-gray-600 text-sm mb-2">For restaurants that don't take reservations, arriving before 10 AM can help avoid long waits.</p>
                <p className="text-xs text-gray-500">Especially true for popular spots</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Bottomless Options</h3>
                <p className="text-gray-600 text-sm mb-2">Many restaurants offer bottomless mimosas or Bloody Marys. Check time limits and pricing.</p>
                <p className="text-xs text-gray-500">Usually 1-2 hour limits</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Weekend vs Weekday</h3>
                <p className="text-gray-600 text-sm mb-2">Weekend brunch is busier but often has more menu options. Weekday brunch can be more relaxed.</p>
                <p className="text-xs text-gray-500">Check hours before visiting</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

