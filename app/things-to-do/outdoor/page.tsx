import { Metadata } from 'next'
import { MapPin, Clock, Star, TreePine, Mountain, Waves, Users, ExternalLink, Globe } from 'lucide-react'
import Link from 'next/link'
import { getOutdoorAttractions } from '@/data/pittsburghAttractions'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Outdoor & Parks in Pittsburgh | Nature Activities | PittsburghEverything',
  description: 'Explore Pittsburgh\'s beautiful parks, hiking trails, outdoor activities, and nature experiences. From Schenley Park to Frick Park, discover the best outdoor spaces in the Steel City.',
  keywords: 'Pittsburgh parks, outdoor activities, hiking trails, nature Pittsburgh, parks and recreation',
  openGraph: {
    title: 'Outdoor & Parks in Pittsburgh',
    description: 'Discover Pittsburgh\'s beautiful parks, trails, and outdoor recreation opportunities.',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 630, alt: 'Pittsburgh Outdoor Activities' }]
  }
}

export default function OutdoorPage() {
  const attractions = getOutdoorAttractions()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Outdoor & Parks in Pittsburgh",
    "description": "Parks and outdoor activities in Pittsburgh, Pennsylvania"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/things-to-do"
            className="inline-flex items-center gap-2 text-green-200 hover:text-white transition-colors mb-6"
          >
            ← Back to Things to Do
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <TreePine className="w-16 h-16 text-green-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Outdoor & <span className="text-green-200">Parks</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Discover Pittsburgh\'s natural beauty with 165+ parks, miles of trails, and endless outdoor recreation opportunities. From urban parks to riverfront trails, experience the great outdoors in the Steel City.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <TreePine className="w-4 h-4" />
                165+ Parks
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Mountain className="w-4 h-4" />
                Miles of Trails
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Parks Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.map((attraction) => (
              <div key={attraction.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-2 border-green-100">
                <div className="relative h-64 bg-gradient-to-br from-green-100 to-green-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <TreePine className="w-24 h-24 text-green-300 opacity-30" />
                  </div>
                  {attraction.pricing.free && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      FREE
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-pittsburgh-black flex items-center gap-1">
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
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm">
                      Explore Park
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

      {/* Activities Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-pittsburgh-black mb-8 text-center">
            Popular Outdoor Activities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Mountain, title: 'Hiking', description: 'Explore miles of trails in Frick Park, Schenley Park, and more' },
              { icon: Waves, title: 'River Activities', description: 'Kayaking, paddleboarding, and river cruises on the three rivers' },
              { icon: TreePine, title: 'Picnicking', description: 'Beautiful picnic spots in parks throughout the city' },
              { icon: Users, title: 'Sports & Recreation', description: 'Tennis, golf, basketball, and more in city parks' }
            ].map((activity) => (
              <div key={activity.title} className="bg-gray-50 rounded-lg p-6 text-center">
                <activity.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-pittsburgh-black mb-2">{activity.title}</h3>
                <p className="text-gray-600 text-sm">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

