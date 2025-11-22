import { Metadata } from 'next'
import { MapPin, Clock, Star, DollarSign, Users, Heart, ExternalLink, Phone, Globe, Gift, Calendar } from 'lucide-react'
import Link from 'next/link'
import { getFreeAttractions } from '@/data/pittsburghAttractions'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Free Things to Do in Pittsburgh | No-Cost Attractions | PittsburghEverything',
  description: 'Discover amazing free attractions in Pittsburgh including parks, museums with free days, historic sites, and cultural experiences. Enjoy Pittsburgh without spending a dime.',
  keywords: 'free things to do Pittsburgh, free attractions, free activities, budget-friendly Pittsburgh, no-cost activities',
  openGraph: {
    title: 'Free Things to Do in Pittsburgh',
    description: 'Explore Pittsburgh\'s best free attractions, parks, and cultural experiences.',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 630, alt: 'Free Things to Do in Pittsburgh' }]
  }
}

export default function FreeThingsPage() {
  const attractions = getFreeAttractions()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Free Things to Do in Pittsburgh",
    "description": "Free attractions and activities in Pittsburgh, Pennsylvania"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-500 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/things-to-do"
            className="inline-flex items-center gap-2 text-green-200 hover:text-white transition-colors mb-6"
          >
            ← Back to Things to Do
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Gift className="w-16 h-16 text-green-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Free Things to Do in <span className="text-green-200">Pittsburgh</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Explore Pittsburgh without spending a dime! From beautiful parks to free museum days, discover amazing experiences that won't cost you a thing.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Gift className="w-4 h-4" />
                {attractions.length} Free Attractions
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Star className="w-4 h-4" />
                All Highly Rated
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Free Attractions Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.map((attraction) => (
              <div key={attraction.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-2 border-green-100">
                <div className="relative h-64 bg-gradient-to-br from-green-100 to-green-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-30">
                      {attraction.category.includes('Parks') ? '🌳' :
                       attraction.category.includes('Art') ? '🎨' :
                       attraction.category.includes('Museums') ? '🏛️' : '📍'}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    FREE
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-pittsburgh-black flex items-center gap-1">
                    <Star className="w-4 h-4 fill-pittsburgh-gold text-pittsburgh-gold" />
                    {attraction.rating}
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-pittsburgh-black mb-3">
                    {attraction.name}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {attraction.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{attraction.location.neighborhood}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{attraction.duration}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {attraction.highlights.slice(0, 3).map((highlight) => (
                      <span
                        key={highlight}
                        className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm">
                      Learn More
                    </button>
                    {attraction.contact?.website && (
                      <a
                        href={attraction.contact.website}
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

      {/* Free Museum Days Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Free Museum Days & Special Offers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg text-pittsburgh-black mb-2">Andy Warhol Museum</h3>
                <p className="text-gray-600 text-sm mb-2">Free admission every Friday from 5:00 PM - 10:00 PM</p>
                <p className="text-xs text-gray-500">117 Sandusky Street, North Shore</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg text-pittsburgh-black mb-2">Carnegie Museums</h3>
                <p className="text-gray-600 text-sm mb-2">Free admission for children under 2, discounts for students and seniors</p>
                <p className="text-xs text-gray-500">4400 Forbes Avenue, Oakland</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg text-pittsburgh-black mb-2">Mattress Factory</h3>
                <p className="text-gray-600 text-sm mb-2">Free admission on the first Friday of each month</p>
                <p className="text-xs text-gray-500">500 Sampsonia Way, North Side</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg text-pittsburgh-black mb-2">Bank of America Museums</h3>
                <p className="text-gray-600 text-sm mb-2">Free admission on first full weekend of each month for cardholders</p>
                <p className="text-xs text-gray-500">Various locations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-pittsburgh-black mb-8 text-center">
            Tips for Free Pittsburgh Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Plan Around Free Days</h3>
              <p className="text-gray-600 text-sm">Many museums offer free admission on specific days. Check their websites for current schedules.</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Explore the Parks</h3>
              <p className="text-gray-600 text-sm">Pittsburgh has over 165 parks, all free to explore. Perfect for hiking, picnics, and outdoor activities.</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Check Event Calendars</h3>
              <p className="text-gray-600 text-sm">Many festivals, concerts, and cultural events in Pittsburgh are completely free to attend.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

