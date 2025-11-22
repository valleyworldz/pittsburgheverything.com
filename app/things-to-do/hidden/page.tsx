import { Metadata } from 'next'
import { MapPin, Clock, Star, Sparkles, Users, ExternalLink, Globe, Phone, DollarSign, Eye } from 'lucide-react'
import Link from 'next/link'
import { getHiddenGems } from '@/data/pittsburghAttractions'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Hidden Gems in Pittsburgh | Unique Local Spots | PittsburghEverything',
  description: 'Discover Pittsburgh\'s hidden gems and unique local spots that only locals know about. From quirky museums to secret viewpoints, explore the Steel City\'s best-kept secrets.',
  keywords: 'hidden gems Pittsburgh, unique attractions, local secrets, off the beaten path, Pittsburgh hidden spots',
  openGraph: {
    title: 'Hidden Gems in Pittsburgh',
    description: 'Discover Pittsburgh\'s unique hidden gems and local secrets.',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 630, alt: 'Pittsburgh Hidden Gems' }]
  }
}

export default function HiddenGemsPage() {
  const gems = getHiddenGems()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Hidden Gems in Pittsburgh",
    "description": "Unique and hidden attractions in Pittsburgh, Pennsylvania"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/things-to-do"
            className="inline-flex items-center gap-2 text-indigo-200 hover:text-white transition-colors mb-6"
          >
            ← Back to Things to Do
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-16 h-16 text-indigo-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Hidden <span className="text-indigo-200">Gems</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Go beyond the tourist trail and discover Pittsburgh\'s best-kept secrets. These unique local spots offer authentic experiences that only insiders know about.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Eye className="w-4 h-4" />
                {gems.length} Hidden Spots
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                Local Secrets
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Gems Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gems.map((gem) => (
              <div key={gem.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-2 border-indigo-100 relative">
                <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                  HIDDEN GEM
                </div>
                <div className="relative h-64 bg-gradient-to-br from-indigo-100 to-indigo-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-24 h-24 text-indigo-300 opacity-30" />
                  </div>
                  {gem.pricing.free && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      FREE
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-pittsburgh-black flex items-center gap-1">
                    <Star className="w-4 h-4 fill-pittsburgh-gold text-pittsburgh-gold" />
                    {gem.rating}
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-pittsburgh-black mb-3">
                    {gem.name}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {gem.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{gem.location.neighborhood}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{gem.duration}</span>
                    </div>
                    {gem.pricing.adult && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <DollarSign className="w-4 h-4" />
                        <span>From {gem.pricing.adult}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {gem.highlights.slice(0, 3).map((highlight) => (
                      <span
                        key={highlight}
                        className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm">
                      Discover
                    </button>
                    {gem.contact?.website && (
                      <a
                        href={gem.contact.website}
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

      {/* More Hidden Gems Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              More Local Secrets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg text-pittsburgh-black mb-2">Secret Viewpoints</h3>
                <p className="text-gray-600 text-sm mb-2">Beyond Mount Washington, discover lesser-known spots with stunning city views.</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• West End Overlook</li>
                  <li>• Grandview Avenue (beyond the incline)</li>
                  <li>• Fineview Overlook</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg text-pittsburgh-black mb-2">Neighborhood Gems</h3>
                <p className="text-gray-600 text-sm mb-2">Explore local favorites in Pittsburgh\'s unique neighborhoods.</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Lawrenceville\'s art scene</li>
                  <li>• Bloomfield\'s Little Italy</li>
                  <li>• Polish Hill\'s cultural spots</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

