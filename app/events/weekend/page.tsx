import { Metadata } from 'next'
import { Calendar, MapPin, Clock, Users, Ticket } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Weekend Events in Pittsburgh | Friday to Sunday Schedule',
  description: 'Complete weekend events guide for Pittsburgh. Concerts, festivals, sports, and activities from Friday through Sunday.',
  keywords: 'weekend events Pittsburgh, weekend activities, concerts weekend, festivals Pittsburgh, weekend schedule',
  openGraph: {
    title: 'Weekend Events in Pittsburgh | Complete Guide',
    description: 'Everything happening this weekend in Pittsburgh - concerts, sports, festivals, and more.',
    images: [
      {
        url: '/images/events/weekend-events-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Weekend events in Pittsburgh'
      }
    ]
  }
}

export default function WeekendEventsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Weekend Events in Pittsburgh",
    "description": "Complete guide to weekend events, concerts, and activities in Pittsburgh.",
    "url": "https://pittsburgheverything.com/events/weekend",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const weekendEvents = [
    {
      day: 'Friday',
      date: 'Tomorrow',
      events: [
        {
          title: 'Winter Beer Festival',
          time: '6:00 PM - 11:00 PM',
          location: 'Strip District',
          category: 'Food & Drink',
          price: '$35',
          description: '50+ craft beers and local food vendors'
        },
        {
          title: 'Comedy Night at Stage AE',
          time: '8:00 PM',
          location: 'Downtown',
          category: 'Entertainment',
          price: '$25-45',
          description: 'Stand-up comedy with local comedians'
        }
      ]
    },
    {
      day: 'Saturday',
      date: 'Day After Tomorrow',
      events: [
        {
          title: 'Pittsburgh Steelers vs. Chiefs',
          time: '4:30 PM',
          location: 'Heinz Field',
          category: 'Sports',
          price: '$89-299',
          description: 'AFC Championship playoff game'
        },
        {
          title: 'Pittsburgh Symphony Orchestra',
          time: '8:00 PM',
          location: 'Heinz Hall',
          category: 'Arts & Culture',
          price: '$25-85',
          description: 'Mozart and Beethoven concert'
        },
        {
          title: 'Holiday Market at Market Square',
          time: '10:00 AM - 6:00 PM',
          location: 'Downtown',
          category: 'Shopping',
          price: 'Free',
          description: 'Artisan crafts and holiday treats'
        }
      ]
    },
    {
      day: 'Sunday',
      date: 'Sunday',
      events: [
        {
          title: 'Brunch & Jazz at Blue Note Grill',
          time: '11:00 AM - 2:00 PM',
          location: 'Oakland',
          category: 'Food & Drink',
          price: '$35-55',
          description: 'Jazz music with Sunday brunch'
        },
        {
          title: 'Pittsburgh Ballet - Nutcracker',
          time: '2:00 PM',
          location: 'Benedum Center',
          category: 'Arts & Culture',
          price: '$35-125',
          description: 'Holiday ballet performance'
        },
        {
          title: 'Family Fun Day at Carnegie Museum',
          time: '10:00 AM - 5:00 PM',
          location: 'Oakland',
          category: 'Family',
          price: 'Free',
          description: 'Free admission and family activities'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6">Weekend Events</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Your complete guide to Pittsburgh weekend activities
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-lg font-semibold">This Weekend: Steelers Game + Beer Festival</p>
          </div>
        </div>
      </section>

      {/* Weekend Schedule */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {weekendEvents.map((daySchedule, dayIndex) => (
              <div key={dayIndex} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-pittsburgh-black text-white p-6">
                  <h2 className="text-2xl font-bold">{daySchedule.day}</h2>
                  <p className="text-pittsburgh-gold">{daySchedule.date}</p>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    {daySchedule.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                                {event.category}
                              </span>
                              <span className="text-sm text-gray-500">{event.time}</span>
                            </div>

                            <h3 className="text-lg font-bold text-pittsburgh-black mb-1">{event.title}</h3>
                            <p className="text-gray-600 mb-2">{event.description}</p>

                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {event.location}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <div className="text-xl font-bold text-green-600">{event.price}</div>
                            <button className="bg-pittsburgh-gold text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                              Get Tickets
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Perfect Weekend</h2>
          <p className="text-xl mb-8">From sports to concerts, Pittsburgh has it all this weekend.</p>
          <Link href="/events" className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
            Explore All Events
          </Link>
        </div>
      </section>
    </div>
  )
}
