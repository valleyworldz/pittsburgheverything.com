import { Metadata } from 'next'
import { MapPin, Clock, Star, DollarSign, Users, Heart, ExternalLink, Phone, Globe } from 'lucide-react'
import Link from 'next/link'
import { getMustSeeAttractions } from '@/data/pittsburghAttractions'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Must-See Spots in Pittsburgh | Top Attractions | PittsburghEverything',
  description: 'Discover Pittsburgh\'s must-see attractions including Carnegie Museums, Andy Warhol Museum, Phipps Conservatory, Duquesne Incline, and more. Your guide to the top sights in the Steel City.',
  keywords: 'Pittsburgh must-see, top attractions, Pittsburgh landmarks, things to see Pittsburgh, tourist attractions',
  openGraph: {
    title: 'Must-See Spots in Pittsburgh | Top Attractions',
    description: 'Discover the top attractions and must-see spots in Pittsburgh, from world-class museums to iconic landmarks.',
    images: [
      {
        url: '/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Pittsburgh Must-See Attractions'
      }
    ]
  }
}

export default function MustSeePage() {
  const attractions = getMustSeeAttractions()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Must-See Spots in Pittsburgh",
    "description": "Top attractions and must-see spots in Pittsburgh, Pennsylvania",
    "itemListElement": attractions.map((attraction, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "TouristAttraction",
        "name": attraction.name,
        "description": attraction.description,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": attraction.location.address,
          "addressLocality": "Pittsburgh",
          "addressRegion": "PA"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": attraction.rating,
          "reviewCount": attraction.reviewCount || 0
        }
      }
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/things-to-do"
            className="inline-flex items-center gap-2 text-pittsburgh-gold hover:text-white transition-colors mb-6"
          >
            ← Back to Things to Do
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Must-See Spots in <span className="text-pittsburgh-gold">Pittsburgh</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Discover the top attractions that make Pittsburgh a world-class destination. From iconic museums to breathtaking views, these are the experiences you can't miss.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Star className="w-4 h-4" />
                {attractions.length} Top Attractions
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Users className="w-4 h-4" />
                Rated 4.7+ Stars
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Attractions Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.map((attraction) => (
              <div key={attraction.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Image */}
                <div className="relative h-64 bg-gradient-to-br from-pittsburgh-gold/20 to-pittsburgh-black/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-30">
                      {attraction.category.includes('Museums') ? '🏛️' :
                       attraction.category.includes('Parks') ? '🌳' :
                       attraction.category.includes('Sports') ? '⚽' :
                       attraction.category.includes('Art') ? '🎨' : '📍'}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-pittsburgh-black flex items-center gap-1">
                    <Star className="w-4 h-4 fill-pittsburgh-gold text-pittsburgh-gold" />
                    {attraction.rating}
                  </div>
                  {attraction.pricing.free && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      FREE
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-2xl font-bold text-pittsburgh-black">
                      {attraction.name}
                    </h2>
                    <button className="text-pittsburgh-gold hover:text-pittsburgh-black transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {attraction.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{attraction.location.neighborhood}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{attraction.duration}</span>
                    </div>
                    {attraction.pricing.adult && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <DollarSign className="w-4 h-4" />
                        <span>From {attraction.pricing.adult}</span>
                      </div>
                    )}
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {attraction.highlights.slice(0, 3).map((highlight) => (
                      <span
                        key={highlight}
                        className="bg-pittsburgh-gold/10 text-pittsburgh-gold px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Best For */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Best for:</p>
                    <div className="flex flex-wrap gap-1">
                      {attraction.bestFor.slice(0, 3).map((group) => (
                        <span
                          key={group}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-pittsburgh-gold text-pittsburgh-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-sm">
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

                  {/* Contact Info */}
                  {attraction.contact && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        {attraction.contact.phone && (
                          <a href={`tel:${attraction.contact.phone}`} className="flex items-center gap-1 hover:text-pittsburgh-gold">
                            <Phone className="w-3 h-3" />
                            {attraction.contact.phone}
                          </a>
                        )}
                        {attraction.contact.website && (
                          <a
                            href={attraction.contact.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-pittsburgh-gold"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Website
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

      {/* Planning Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-pittsburgh-gold/10 to-pittsburgh-black/10 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Plan Your Pittsburgh Visit
            </h2>
            <p className="text-gray-700 mb-6">
              Make the most of your time in Pittsburgh with our curated itineraries and insider tips.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/things-to-do/free"
                className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-pittsburgh-black mb-2">Free Attractions</h3>
                <p className="text-sm text-gray-600">Explore Pittsburgh without spending a dime</p>
              </Link>
              <Link
                href="/things-to-do/museums"
                className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-pittsburgh-black mb-2">Museums & Culture</h3>
                <p className="text-sm text-gray-600">World-class museums and cultural institutions</p>
              </Link>
              <Link
                href="/events"
                className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-pittsburgh-black mb-2">Current Events</h3>
                <p className="text-sm text-gray-600">What's happening in Pittsburgh right now</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

