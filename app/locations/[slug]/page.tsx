import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Users, DollarSign, Car, Bus, Bike, Home, Star, Calendar, Clock } from 'lucide-react'
import { ALL_PITTSBURGH_LOCATIONS, generateLocationSchema, generateLocationKeywords } from '@/data/pittsburgh-locations'
import StructuredData from '@/components/StructuredData'

interface LocationPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const location = ALL_PITTSBURGH_LOCATIONS.find(loc => loc.id === params.slug)

  if (!location) {
    return {
      title: 'Location Not Found | PittsburghEverything'
    }
  }

  const keywords = generateLocationKeywords(location)

  return {
    title: location.seo.title,
    description: location.seo.description,
    keywords: keywords.join(', '),
    openGraph: {
      title: location.seo.title,
      description: location.seo.description,
      images: [
        {
          url: '/images/og-image.svg',
          width: 1200,
          height: 630,
          alt: `${location.name} Pittsburgh Guide`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: location.seo.title,
      description: location.seo.description,
      images: ['/images/og-image.svg'],
    },
    other: {
      'geo.region': `US-PA-${location.zipCodes[0]}`,
      'geo.placename': location.name,
      'geo.position': `${location.coordinates.lat};${location.coordinates.lng}`,
      'ICBM': `${location.coordinates.lat}, ${location.coordinates.lng}`,
    },
  }
}

export async function generateStaticParams() {
  return ALL_PITTSBURGH_LOCATIONS.map((location) => ({
    slug: location.id,
  }))
}

export default function LocationPage({ params }: LocationPageProps) {
  const location = ALL_PITTSBURGH_LOCATIONS.find(loc => loc.id === params.slug)

  if (!location) {
    notFound()
  }

  const schemaData = generateLocationSchema(location)

  return (
    <>
      <StructuredData data={schemaData} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-pittsburgh-gold/10 to-yellow-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-black text-pittsburgh-black mb-6">
                {location.seo.h1}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {location.content.overview}
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                  <Users className="w-8 h-8 text-pittsburgh-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-pittsburgh-black">{location.population.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Residents</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                  <DollarSign className="w-8 h-8 text-pittsburgh-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-pittsburgh-black">${location.content.realEstate.medianHomePrice.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Median Home Price</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                  <MapPin className="w-8 h-8 text-pittsburgh-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-pittsburgh-black">{location.content.realEstate.walkScore}</div>
                  <div className="text-sm text-gray-600">Walk Score</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                  <Home className="w-8 h-8 text-pittsburgh-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-pittsburgh-black">{location.content.demographics.medianAge}</div>
                  <div className="text-sm text-gray-600">Median Age</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/restaurants?neighborhood=${location.name}`}
                  className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Find Restaurants
                </Link>
                <Link
                  href={`/events?location=${location.name}`}
                  className="border border-pittsburgh-gold text-pittsburgh-gold px-8 py-3 rounded-lg font-semibold hover:bg-pittsburgh-gold hover:text-pittsburgh-black transition-colors inline-flex items-center justify-center gap-2"
                >
                  Local Events
                </Link>
                <Link
                  href={`/deals?location=${location.name}`}
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Current Deals
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
                Why Choose {location.name}?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover what makes {location.name} special and why it's a great place to live, work, and play.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {location.content.highlights.map((highlight, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="w-12 h-12 bg-pittsburgh-gold rounded-lg flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-pittsburgh-black" />
                  </div>
                  <p className="text-gray-700 font-medium">{highlight}</p>
                </div>
              ))}
            </div>

            {/* Demographics */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-pittsburgh-black mb-6 text-center">
                Community Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pittsburgh-gold mb-2">
                    ${location.content.demographics.medianIncome.toLocaleString()}
                  </div>
                  <div className="text-gray-600">Median Income</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pittsburgh-gold mb-2">
                    {location.content.demographics.medianAge}
                  </div>
                  <div className="text-gray-600">Median Age</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pittsburgh-gold mb-2">
                    {location.content.demographics.educationLevel}
                  </div>
                  <div className="text-gray-600">Education Level</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Attractions Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
                Top Attractions in {location.name}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore the best places to visit, things to do, and attractions that make {location.name} special.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {location.content.attractions.map((attraction, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-pittsburgh-gold/20 to-yellow-50 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-pittsburgh-gold mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-600">{attraction.type}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-pittsburgh-black mb-2">
                      {attraction.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {attraction.description}
                    </p>
                    <div className="flex items-center text-sm text-pittsburgh-gold">
                      <Star className="w-4 h-4 mr-1" />
                      <span>Popular Attraction</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dining Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
                Dining in {location.name}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From casual eateries to fine dining, discover the best places to eat in {location.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {location.content.dining.map((category, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-pittsburgh-black mb-4">
                    {category.category}
                  </h3>
                  <ul className="space-y-3">
                    {category.spots.map((spot, spotIndex) => (
                      <li key={spotIndex} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-pittsburgh-gold rounded-full"></div>
                        <span className="text-gray-700">{spot}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Transportation & Lifestyle */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Transportation */}
              <div>
                <h2 className="text-3xl font-bold text-pittsburgh-black mb-6">
                  Getting Around {location.name}
                </h2>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Bus className="w-6 h-6 text-pittsburgh-gold" />
                      <h3 className="text-xl font-semibold text-pittsburgh-black">Public Transit</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600 ml-9">
                      {location.content.transportation.public.map((option, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-pittsburgh-gold rounded-full"></div>
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Car className="w-6 h-6 text-pittsburgh-gold" />
                      <h3 className="text-xl font-semibold text-pittsburgh-black">Parking</h3>
                    </div>
                    <p className="text-gray-600 ml-9">{location.content.transportation.parking}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="w-6 h-6 text-pittsburgh-gold" />
                      <h3 className="text-xl font-semibold text-pittsburgh-black">Major Highways</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-9">
                      {location.content.transportation.highways.map((highway, index) => (
                        <span key={index} className="bg-pittsburgh-gold/10 text-pittsburgh-gold px-3 py-1 rounded-full text-sm">
                          {highway}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lifestyle Scores */}
              <div>
                <h2 className="text-3xl font-bold text-pittsburgh-black mb-6">
                  Lifestyle Scores
                </h2>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-pittsburgh-black">Walk Score</span>
                      <span className="text-2xl font-bold text-pittsburgh-gold">{location.content.realEstate.walkScore}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-pittsburgh-gold h-3 rounded-full"
                        style={{ width: `${location.content.realEstate.walkScore}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {location.content.realEstate.walkScore >= 90 ? 'Excellent' :
                       location.content.realEstate.walkScore >= 70 ? 'Very Good' :
                       location.content.realEstate.walkScore >= 50 ? 'Good' :
                       location.content.realEstate.walkScore >= 25 ? 'Average' : 'Poor'} walkability
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-pittsburgh-black">Transit Score</span>
                      <span className="text-2xl font-bold text-pittsburgh-gold">{location.content.realEstate.transitScore}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-pittsburgh-gold h-3 rounded-full"
                        style={{ width: `${location.content.realEstate.transitScore}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Public transportation access</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-pittsburgh-black">Bike Score</span>
                      <span className="text-2xl font-bold text-pittsburgh-gold">{location.content.realEstate.bikeScore}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-pittsburgh-gold h-3 rounded-full"
                        style={{ width: `${location.content.realEstate.bikeScore}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Cycling infrastructure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Explore More of {location.name}
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover restaurants, events, deals, and everything happening in {location.name}.
              Stay connected with the latest updates and local recommendations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/restaurants?neighborhood=${location.name}`}
                className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
                Local Restaurants
              </Link>
              <Link
                href={`/events?location=${location.name}`}
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors inline-flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Upcoming Events
              </Link>
              <Link
                href={`/deals?location=${location.name}`}
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors inline-flex items-center justify-center gap-2"
              >
                <Star className="w-5 h-5" />
                Special Deals
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
