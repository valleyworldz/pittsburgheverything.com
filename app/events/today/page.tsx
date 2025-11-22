import { Metadata } from 'next'
import { Calendar, Clock, MapPin, Users, Ticket, Star } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Events Today in Pittsburgh | Today\'s Schedule & Tickets',
  description: 'Find all events happening today in Pittsburgh. Concerts, sports, festivals, and more with tickets and schedules.',
  keywords: 'events today Pittsburgh, concerts today, sports today, festivals today, tickets, schedule',
  openGraph: {
    title: 'Events Today in Pittsburgh | Complete Schedule',
    description: 'Everything happening today in Pittsburgh - concerts, sports, festivals, and events.',
    images: [
      {
        url: '/images/events/events-today-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Events today in Pittsburgh'
      }
    ]
  }
}

export default function EventsTodayPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Events Today in Pittsburgh",
    "description": "Complete schedule of events happening today in Pittsburgh.",
    "url": "https://pittsburgheverything.com/events/today",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const todaysEvents = [
    {
      id: 1,
      title: 'Pittsburgh Steelers vs. Kansas City Chiefs',
      time: '4:30 PM',
      location: 'Heinz Field',
      category: 'Sports',
      price: '$89 - $299',
      description: 'AFC Championship playoff game. Don\'t miss the Steelers battle for the Super Bowl!',
      attendees: '67,000+',
      rating: 4.9,
      image: '/images/events/steelers-game.jpg',
      status: 'live',
      venue: 'Acrisure Stadium'
    },
    {
      id: 2,
      title: 'Winter Beer Festival',
      time: '2:00 PM - 8:00 PM',
      location: 'Strip District',
      category: 'Food & Drink',
      price: '$35',
      description: '50+ local breweries featuring winter seasonal beers, ciders, and local food vendors.',
      attendees: '3,000+',
      rating: 4.7,
      image: '/images/events/beer-festival.jpg',
      status: 'upcoming',
      venue: 'Strip District Pavilion'
    },
    {
      id: 3,
      title: 'Carnegie Museum of Art - Free Admission Day',
      time: '10:00 AM - 5:00 PM',
      location: 'Oakland',
      category: 'Arts & Culture',
      price: 'Free',
      description: 'Explore world-class art collections including Andy Warhol and contemporary exhibits.',
      attendees: '2,500+',
      rating: 4.8,
      image: '/images/events/carnegie-museum.jpg',
      status: 'upcoming',
      venue: 'Carnegie Museum of Art'
    },
    {
      id: 4,
      title: 'Pittsburgh Symphony Orchestra',
      time: '8:00 PM',
      location: 'Downtown Pittsburgh',
      category: 'Arts & Culture',
      price: '$25 - $85',
      description: 'An evening of Mozart and Beethoven performed by the world-renowned PSO.',
      attendees: '2,400',
      rating: 4.9,
      image: '/images/events/pso-concert.jpg',
      status: 'upcoming',
      venue: 'Heinz Hall'
    },
    {
      id: 5,
      title: 'Pittsburgh Ballet Theatre - The Nutcracker',
      time: '7:30 PM',
      location: 'Oakland',
      category: 'Arts & Culture',
      price: '$35 - $125',
      description: 'The holiday classic featuring Tchaikovsky\'s beloved score and stunning choreography.',
      attendees: '1,800',
      rating: 4.8,
      image: '/images/events/nutcracker.jpg',
      status: 'upcoming',
      venue: 'Benedum Center'
    },
    {
      id: 6,
      title: 'Penguins vs. Bruins',
      time: '7:00 PM',
      location: 'Downtown Pittsburgh',
      category: 'Sports',
      price: '$45 - $250',
      description: 'NHL action at PPG Paints Arena. Penguins battle the Boston Bruins.',
      attendees: '18,000+',
      rating: 4.6,
      image: '/images/events/penguins-game.jpg',
      status: 'upcoming',
      venue: 'PPG Paints Arena'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500'
      case 'upcoming': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Sports': return 'bg-blue-100 text-blue-800'
      case 'Arts & Culture': return 'bg-purple-100 text-purple-800'
      case 'Food & Drink': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-yellow-300" />
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                HAPPENING TODAY
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Events Today
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Everything happening today in Pittsburgh. From sports to concerts, find your perfect event.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">6</div>
                <div className="text-sm opacity-75">Events Today</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">85K+</div>
                <div className="text-sm opacity-75">Expected Attendees</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">$25-$299</div>
                <div className="text-sm opacity-75">Price Range</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">Free</div>
                <div className="text-sm opacity-75">Museum Day</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-lg font-semibold mb-2">🎫 Last Minute Tickets Available</p>
              <p className="opacity-90">
                Many events still have tickets available. Book now and join Pittsburgh today!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Today's Complete Schedule
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All events happening today, sorted by start time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {todaysEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Event Status Badge */}
                <div className={`${getStatusColor(event.status)} text-white px-4 py-2 text-center font-bold text-sm`}>
                  {event.status === 'live' ? '🔴 LIVE NOW' : '🟢 UPCOMING'}
                </div>

                {/* Event Image */}
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                      <div className="flex items-center gap-1 text-white text-sm">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{event.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-white text-lg font-bold leading-tight">{event.title}</h3>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4">{event.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {event.attendees} attending
                    </span>
                    <span className="font-semibold text-lg text-green-600">{event.price}</span>
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    📍 {event.venue}
                  </div>

                  <button className="w-full bg-pittsburgh-gold text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2">
                    <Ticket className="w-5 h-5" />
                    {event.price === 'Free' ? 'Get Free Tickets' : 'Get Tickets'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Today's Event Breakdown
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl mb-4">🏈</div>
              <div className="text-2xl font-bold text-pittsburgh-black mb-2">1</div>
              <div className="text-sm text-gray-600">Sports Events</div>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl mb-4">🎨</div>
              <div className="text-2xl font-bold text-pittsburgh-black mb-2">3</div>
              <div className="text-sm text-gray-600">Arts & Culture</div>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl mb-4">🍺</div>
              <div className="text-2xl font-bold text-pittsburgh-black mb-2">1</div>
              <div className="text-sm text-gray-600">Food & Drink</div>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl mb-4">🏟️</div>
              <div className="text-2xl font-bold text-pittsburgh-black mb-2">67K+</div>
              <div className="text-sm text-gray-600">Total Attendees</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't Miss Out</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Pittsburgh has something for everyone today. Find your perfect event and make memories.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events/weekend"
              className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              This Weekend's Events
            </Link>
            <Link
              href="/events"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              Browse All Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
