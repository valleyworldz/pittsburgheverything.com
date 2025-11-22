import { Metadata } from 'next'
import { MapPin, Clock, Star, Users, Heart, ExternalLink, Globe, Phone, DollarSign, Baby } from 'lucide-react'
import Link from 'next/link'
import { getFamilyAttractions } from '@/data/pittsburghAttractions'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Kids & Family Activities in Pittsburgh | Family-Friendly Attractions | PittsburghEverything',
  description: 'Discover the best family-friendly activities in Pittsburgh including the zoo, science center, museums, parks, and kid-friendly attractions. Perfect activities for families with children.',
  keywords: 'family activities Pittsburgh, kids activities, family-friendly, Pittsburgh zoo, children attractions',
  openGraph: {
    title: 'Kids & Family Activities in Pittsburgh',
    description: 'Family-friendly attractions and activities for kids in Pittsburgh.',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 630, alt: 'Pittsburgh Family Activities' }]
  }
}

export default function FamilyPage() {
  const attractions = getFamilyAttractions()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Kids & Family Activities in Pittsburgh",
    "description": "Family-friendly attractions and activities in Pittsburgh, Pennsylvania"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-500 to-pink-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/things-to-do"
            className="inline-flex items-center gap-2 text-pink-200 hover:text-white transition-colors mb-6"
          >
            ← Back to Things to Do
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Users className="w-16 h-16 text-pink-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Kids & <span className="text-pink-200">Family</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Fun for the whole family! Discover Pittsburgh\'s best family-friendly attractions, from interactive museums to outdoor adventures that kids and parents will love.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Baby className="w-4 h-4" />
                {attractions.length} Family Attractions
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Heart className="w-4 h-4" />
                Kid-Approved
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Family Attractions Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.map((attraction) => (
              <div key={attraction.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-2 border-pink-100">
                <div className="relative h-64 bg-gradient-to-br from-pink-100 to-pink-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-30">
                      {attraction.category.includes('Zoo') ? '🦁' :
                       attraction.category.includes('Science') ? '🔬' :
                       attraction.category.includes('Museums') ? '🏛️' : '🎨'}
                    </div>
                  </div>
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
                    {attraction.pricing.adult && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <DollarSign className="w-4 h-4" />
                        <span>From {attraction.pricing.adult}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {attraction.highlights.slice(0, 3).map((highlight) => (
                      <span
                        key={highlight}
                        className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 transition-colors text-sm">
                      Plan Visit
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

      {/* Family Tips Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-pittsburgh-black mb-8 text-center">
            Family-Friendly Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">Best Times to Visit</h3>
              <p className="text-gray-600 text-sm">Weekday mornings are typically less crowded. Many attractions offer early bird specials.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">Pack Essentials</h3>
              <p className="text-gray-600 text-sm">Bring snacks, water, sunscreen, and comfortable walking shoes for the whole family.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">Age Recommendations</h3>
              <p className="text-gray-600 text-sm">Check attraction websites for age-appropriate activities and height requirements for rides.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

