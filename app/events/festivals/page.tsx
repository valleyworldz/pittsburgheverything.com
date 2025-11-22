import { Metadata } from 'next'
import { PartyPopper, Calendar, MapPin, Users, Music } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Festivals in Pittsburgh | Cultural Events & Celebrations',
  description: 'Pittsburgh festivals and cultural celebrations. From beer festivals to cultural events, find all major festivals in the Steel City.',
  keywords: 'festivals Pittsburgh, cultural events, beer festivals, celebrations Pittsburgh, cultural festivals',
  openGraph: {
    title: 'Festivals in Pittsburgh | Cultural Events & Celebrations',
    description: 'Discover festivals and cultural celebrations happening in Pittsburgh.',
    images: [
      {
        url: '/images/events/festivals-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Festivals in Pittsburgh'
      }
    ]
  }
}

export default function FestivalsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Festivals in Pittsburgh",
    "description": "Cultural events and festivals in Pittsburgh.",
    "url": "https://pittsburgheverything.com/events/festivals",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const festivals = [
    {
      title: 'Winter Beer Festival',
      location: 'Strip District',
      dates: 'This Weekend',
      description: '50+ craft breweries featuring winter seasonal beers and local food',
      attendees: '5,000+ expected',
      price: '$35',
      highlights: ['Craft Beer', 'Local Food', 'Live Music']
    },
    {
      title: 'Holiday Market at Market Square',
      location: 'Downtown',
      dates: 'Daily through December',
      description: 'Artisan crafts, holiday treats, and seasonal entertainment',
      attendees: '10,000+ daily',
      price: 'Free',
      highlights: ['Crafts', 'Food', 'Entertainment']
    },
    {
      title: 'Pittsburgh Taco Festival',
      location: 'Various locations',
      dates: 'Spring 2025',
      description: 'Celebrating Pittsburgh\'s diverse food culture with tacos from around the world',
      attendees: '15,000+ expected',
      price: '$20-40',
      highlights: ['Global Cuisine', 'Live Music', 'Cultural Shows']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <StructuredData data={structuredData} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <PartyPopper className="w-8 h-8 text-yellow-300" />
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              FESTIVALS
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6">Pittsburgh Festivals</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Celebrate culture, food, and community at Pittsburgh's best festivals
          </p>
        </div>
      </section>

      {/* Featured Festivals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {festivals.map((festival, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">
                        Festival
                      </span>
                      <span className="text-sm text-gray-500">{festival.dates}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-pittsburgh-black mb-2">{festival.title}</h3>
                    <p className="text-gray-600 mb-4">{festival.description}</p>

                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {festival.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {festival.attendees}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {festival.highlights.map((highlight, idx) => (
                        <span key={idx} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:text-right">
                    <div className="text-3xl font-bold text-green-600 mb-4">{festival.price}</div>
                    <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors w-full lg:w-auto">
                      Get Tickets
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience Pittsburgh Culture</h2>
          <p className="text-xl mb-8">From beer festivals to cultural celebrations, join the community spirit.</p>
          <Link href="/events" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            All Festivals & Events
          </Link>
        </div>
      </section>
    </div>
  )
}
