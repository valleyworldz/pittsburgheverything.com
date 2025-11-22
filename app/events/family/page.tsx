import { Metadata } from 'next'
import { Users, Heart, Clock, MapPin, Star } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Family Events in Pittsburgh | Kids Activities & Family Fun',
  description: 'Family-friendly events and activities in Pittsburgh. Kids events, family festivals, and activities suitable for all ages.',
  keywords: 'family events Pittsburgh, kids activities, family fun, children events, family festivals',
  openGraph: {
    title: 'Family Events in Pittsburgh | Kids & Family Activities',
    description: 'Discover family-friendly events and activities for all ages in Pittsburgh.',
    images: [
      {
        url: '/images/events/family-events-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Family events in Pittsburgh'
      }
    ]
  }
}

export default function FamilyEventsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Family Events in Pittsburgh",
    "description": "Family-friendly events and activities suitable for all ages.",
    "url": "https://pittsburgheverything.com/events/family",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const familyEvents = [
    {
      title: 'Carnegie Museum Free Family Day',
      venue: 'Oakland',
      time: '10am-5pm',
      age: 'All Ages',
      price: 'Free',
      description: 'Free admission with family activities and exhibits',
      rating: 4.8
    },
    {
      title: 'Kids Eat Free Night',
      venue: 'Multiple Restaurants',
      time: 'Sunday Evenings',
      age: 'Under 12',
      price: 'Free for Kids',
      description: 'Children under 12 eat free with adult purchase',
      rating: 4.6
    },
    {
      title: 'Pittsburgh Zoo Family Festival',
      venue: 'Highland Park',
      time: '10am-4pm',
      age: 'All Ages',
      price: '$25/family',
      description: 'Zoo exhibits plus family entertainment and crafts',
      rating: 4.7
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <StructuredData data={structuredData} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-8 h-8 text-yellow-300" />
            <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              FAMILY FRIENDLY
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6">Family Events</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Create lasting memories with family-friendly activities in Pittsburgh
          </p>
        </div>
      </section>

      {/* Family Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {familyEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-semibold">
                    {event.age}
                  </span>
                  <span className="text-sm text-gray-500">{event.time}</span>
                </div>

                <h3 className="text-xl font-bold text-pittsburgh-black mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.venue}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{event.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-green-600">{event.price}</span>
                  <button className="bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Family Time in Pittsburgh</h2>
          <p className="text-xl mb-8">From museums to zoos, find activities the whole family will love.</p>
          <Link href="/events" className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            More Family Events
          </Link>
        </div>
      </section>
    </div>
  )
}
