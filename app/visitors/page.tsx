import { Metadata } from 'next'
import { Bed, MapPin, Car, Info, Hotel, Calendar, Bus } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import { getAllHotels, getAllParkingLocations, getAllTransitOptions } from '@/data/pittsburghVisitors'
import HotelCard from '@/components/visitors/HotelCard'

export const metadata: Metadata = {
  title: 'For Visitors to Pittsburgh | Complete Travel & Visitor Guide',
  description: 'Everything visitors need to know about Pittsburgh. Find hotels, transportation, first-time visitor tips, and complete travel information.',
  keywords: 'Pittsburgh visitors, travel guide, hotels, parking, transit, visitor information, Pittsburgh tourism',
  openGraph: {
    title: 'For Visitors to Pittsburgh | Complete Travel Guide',
    description: 'Everything visitors need to know about Pittsburgh.',
    images: [
      {
        url: '/images/visitors/pittsburgh-visitors.jpg',
        width: 1200,
        height: 630,
        alt: 'Pittsburgh visitor guide'
      }
    ]
  }
}

export default function VisitorsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "For Visitors to Pittsburgh",
    "description": "Everything visitors need to know about Pittsburgh.",
    "url": "https://pittsburgheverything.com/visitors",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allHotels = getAllHotels()
  const allParking = getAllParkingLocations()
  const allTransit = getAllTransitOptions()
  
  const totalHotels = allHotels.length
  const featuredHotels = allHotels.filter(h => h.featured).slice(0, 3)
  const totalParking = allParking.length
  const totalTransit = allTransit.length

  const visitorCategories = [
    {
      title: 'Where to Stay',
      href: '/visitors/stay',
      description: 'Find the perfect hotel or accommodation for your visit',
      icon: Bed,
      count: totalHotels,
      color: 'blue'
    },
    {
      title: 'First-Time Guide',
      href: '/visitors/first-time',
      description: 'Complete guide for first-time visitors to Pittsburgh',
      icon: Info,
      color: 'gold'
    },
    {
      title: 'Parking & Transit',
      href: '/visitors/parking',
      description: 'Parking locations and public transportation options',
      icon: Car,
      count: `${totalParking} parking, ${totalTransit} transit`,
      color: 'green'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              For Visitors to Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Everything you need to know for your Pittsburgh visit. From where to stay to how to get around, we've got you covered.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Hotel className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">{totalHotels}</div>
                <div className="text-sm opacity-75">Hotels</div>
              </div>
              <div className="text-center">
                <Car className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">{totalParking}</div>
                <div className="text-sm opacity-75">Parking Spots</div>
              </div>
              <div className="text-center">
                <Bus className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">{totalTransit}</div>
                <div className="text-sm opacity-75">Transit Options</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Visitor Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for a perfect Pittsburgh visit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visitorCategories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className="group bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:bg-white"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    category.color === 'blue' ? 'bg-blue-100' :
                    category.color === 'gold' ? 'bg-yellow-100' : 'bg-green-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      category.color === 'blue' ? 'text-blue-600' :
                      category.color === 'gold' ? 'text-yellow-600' : 'text-green-600'
                    }`} />
                  </div>

                  <h3 className="text-xl font-bold text-pittsburgh-black mb-2 group-hover:text-pittsburgh-gold transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>

                  <div className="flex items-center justify-between">
                    {category.count && (
                      <span className="text-lg font-bold text-pittsburgh-gold">{category.count}</span>
                    )}
                    <span className="text-sm text-gray-500 group-hover:text-pittsburgh-gold transition-colors">
                      Learn More →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      {featuredHotels.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
                Featured Hotels
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Top-rated accommodations in Pittsburgh
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/visitors/stay"
                className="bg-pittsburgh-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors inline-flex items-center gap-2"
              >
                <Bed className="w-5 h-5" />
                View All Hotels
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

