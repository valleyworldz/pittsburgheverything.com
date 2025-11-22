import { Metadata } from 'next'
import { MapPin, Clock, Star, Building, Users, ExternalLink, Globe, Phone, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { getMuseumAttractions } from '@/data/pittsburghAttractions'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Museums & Culture in Pittsburgh | Art & History Museums | PittsburghEverything',
  description: 'Explore Pittsburgh\'s world-class museums including Carnegie Museums, Andy Warhol Museum, Heinz History Center, and more. Discover art, history, science, and culture in the Steel City.',
  keywords: 'Pittsburgh museums, art museums, history museums, Carnegie museums, cultural attractions',
  openGraph: {
    title: 'Museums & Culture in Pittsburgh',
    description: 'Discover Pittsburgh\'s world-class museums and cultural institutions.',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 630, alt: 'Pittsburgh Museums' }]
  }
}

export default function MuseumsPage() {
  const museums = getMuseumAttractions()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Museums & Culture in Pittsburgh",
    "description": "Museums and cultural institutions in Pittsburgh, Pennsylvania"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/things-to-do"
            className="inline-flex items-center gap-2 text-purple-200 hover:text-white transition-colors mb-6"
          >
            ← Back to Things to Do
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Building className="w-16 h-16 text-purple-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Museums & <span className="text-purple-200">Culture</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Explore Pittsburgh\'s world-class museums, from art and history to science and culture. The Steel City is home to some of America\'s finest cultural institutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Building className="w-4 h-4" />
                {museums.length} Museums
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Star className="w-4 h-4" />
                World-Class Collections
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Museums Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {museums.map((museum) => (
              <div key={museum.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-2 border-purple-100">
                <div className="relative h-64 bg-gradient-to-br from-purple-100 to-purple-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Building className="w-24 h-24 text-purple-300 opacity-30" />
                  </div>
                  {museum.pricing.free && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      FREE
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-pittsburgh-black flex items-center gap-1">
                    <Star className="w-4 h-4 fill-pittsburgh-gold text-pittsburgh-gold" />
                    {museum.rating}
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-pittsburgh-black mb-3">
                    {museum.name}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {museum.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{museum.location.neighborhood}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{museum.duration}</span>
                    </div>
                    {museum.pricing.adult && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <DollarSign className="w-4 h-4" />
                        <span>From {museum.pricing.adult}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {museum.highlights.slice(0, 3).map((highlight) => (
                      <span
                        key={highlight}
                        className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm">
                      Visit Museum
                    </button>
                    {museum.contact?.website && (
                      <a
                        href={museum.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm flex items-center gap-1"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {museum.contact && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        {museum.contact.phone && (
                          <a href={`tel:${museum.contact.phone}`} className="flex items-center gap-1 hover:text-purple-600">
                            <Phone className="w-3 h-3" />
                            {museum.contact.phone}
                          </a>
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

      {/* Museum Passes Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Museum Passes & Discounts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg text-pittsburgh-black mb-2">Carnegie Museums Pass</h3>
                <p className="text-gray-600 text-sm mb-2">Combined admission to Art and Natural History museums. Valid for one year.</p>
                <p className="text-xs text-gray-500">Save on multiple visits</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg text-pittsburgh-black mb-2">Student & Senior Discounts</h3>
                <p className="text-gray-600 text-sm mb-2">Most museums offer discounted admission for students and seniors with valid ID.</p>
                <p className="text-xs text-gray-500">Check individual museum websites</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg text-pittsburgh-black mb-2">Free Museum Days</h3>
                <p className="text-gray-600 text-sm mb-2">Many museums offer free admission on specific days. Check our Free Things to Do page for details.</p>
                <Link href="/things-to-do/free" className="text-purple-600 text-xs hover:underline">Learn more →</Link>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg text-pittsburgh-black mb-2">Group Rates</h3>
                <p className="text-gray-600 text-sm mb-2">Special pricing available for groups of 10 or more. Advance reservations required.</p>
                <p className="text-xs text-gray-500">Contact museums directly</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

