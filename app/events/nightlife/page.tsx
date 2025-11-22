import { Metadata } from 'next'
import { Moon, Music, Wine, Clock, MapPin } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Nightlife in Pittsburgh | Bars, Clubs & Entertainment',
  description: 'Pittsburgh nightlife guide featuring bars, clubs, live music, and entertainment venues. Find the best nightlife spots in the city.',
  keywords: 'nightlife Pittsburgh, bars Pittsburgh, clubs Pittsburgh, live music, entertainment venues',
  openGraph: {
    title: 'Pittsburgh Nightlife | Bars, Clubs & Entertainment',
    description: 'Discover Pittsburgh\'s vibrant nightlife scene with bars, clubs, and live entertainment.',
    images: [
      {
        url: '/images/events/nightlife-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Nightlife in Pittsburgh'
      }
    ]
  }
}

export default function NightlifePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pittsburgh Nightlife",
    "description": "Guide to bars, clubs, and entertainment venues in Pittsburgh.",
    "url": "https://pittsburgheverything.com/events/nightlife",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const nightlifeVenues = [
    {
      name: 'Fat Head\'s Saloon',
      type: 'Brewery',
      location: 'Strip District',
      hours: '11am-2am',
      description: 'Award-winning craft beers and pub fare',
      specialties: ['Craft Beer', 'Burgers', 'Live Music']
    },
    {
      name: 'The Smiling Moose',
      type: 'Bar & Grill',
      location: 'Oakland',
      hours: '11am-2am',
      description: 'Sports bar with 100+ beers and giant burgers',
      specialties: ['Sports', 'Beer Selection', 'Comfort Food']
    },
    {
      name: 'Club Diversity',
      type: 'Nightclub',
      location: 'Downtown',
      hours: '9pm-2am',
      description: 'Multi-level nightclub with DJs and dancing',
      specialties: ['Dancing', 'DJ Music', 'Late Night']
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <StructuredData data={structuredData} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-800 to-pink-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Moon className="w-8 h-8 text-yellow-300" />
            <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              AFTER DARK
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6">Pittsburgh Nightlife</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Bars, clubs, and entertainment that keeps Pittsburgh awake
          </p>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nightlifeVenues.map((venue, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-purple-600 text-white rounded-full text-xs font-semibold">
                    {venue.type}
                  </span>
                  <span className="text-sm text-gray-300">{venue.hours}</span>
                </div>

                <h3 className="text-xl font-bold mb-2">{venue.name}</h3>
                <p className="text-gray-300 mb-3">{venue.description}</p>

                <div className="flex items-center gap-1 text-sm text-gray-400 mb-4">
                  <MapPin className="w-4 h-4" />
                  {venue.location}
                </div>

                <div className="flex flex-wrap gap-2">
                  {venue.specialties.map((specialty, idx) => (
                    <span key={idx} className="bg-gray-600 text-gray-200 px-2 py-1 rounded-full text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-pink-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience Pittsburgh After Dark</h2>
          <p className="text-xl mb-8">From craft beer bars to late-night clubs, find your nightlife vibe.</p>
          <Link href="/events" className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
            Explore All Venues
          </Link>
        </div>
      </section>
    </div>
  )
}
