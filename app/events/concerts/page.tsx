import { Metadata } from 'next'
import { Music, Calendar, MapPin, Ticket } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Concerts in Pittsburgh | Live Music & Performances',
  description: 'Find concerts and live music performances in Pittsburgh. From symphony orchestras to rock concerts, discover all upcoming shows.',
  keywords: 'concerts Pittsburgh, live music, symphony, performances, shows Pittsburgh',
  openGraph: {
    title: 'Concerts in Pittsburgh | Live Music Events',
    description: 'Discover live music performances and concerts happening in Pittsburgh.',
    images: [
      {
        url: '/images/events/concerts-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Concerts in Pittsburgh'
      }
    ]
  }
}

export default function ConcertsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Concerts in Pittsburgh",
    "description": "Live music performances and concerts in Pittsburgh.",
    "url": "https://pittsburgheverything.com/events/concerts",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const concerts = [
    {
      artist: 'Pittsburgh Symphony Orchestra',
      venue: 'Heinz Hall',
      date: 'Tonight 8:00 PM',
      genre: 'Classical',
      price: '$25-85',
      description: 'Mozart and Beethoven masterpieces'
    },
    {
      artist: 'Local Jazz Ensemble',
      venue: 'Blue Note Grill',
      date: 'Saturday 8:00 PM',
      genre: 'Jazz',
      price: '$20',
      description: 'Smooth jazz with dinner service'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="w-8 h-8 text-yellow-300" />
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              LIVE MUSIC
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6">Concerts in Pittsburgh</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            From classical symphony to rock concerts, experience live music in the Steel City
          </p>
        </div>
      </section>

      {/* Featured Concerts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {concerts.map((concert, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                    {concert.genre}
                  </span>
                  <span className="text-sm text-gray-500">{concert.date}</span>
                </div>

                <h3 className="text-2xl font-bold text-pittsburgh-black mb-2">{concert.artist}</h3>
                <p className="text-gray-600 mb-4">{concert.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {concert.venue}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-green-600">{concert.price}</span>
                  <button className="bg-pittsburgh-gold text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                    Get Tickets
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience Live Music</h2>
          <p className="text-xl mb-8">From symphony halls to intimate venues, Pittsburgh has music for every taste.</p>
          <Link href="/events" className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
            Find More Concerts
          </Link>
        </div>
      </section>
    </div>
  )
}
