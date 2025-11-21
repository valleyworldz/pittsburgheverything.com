'use client'

import { Calendar, MapPin, Clock, Star, Heart, ArrowLeft, BookOpen, GraduationCap, Building2, Landmark } from 'lucide-react'
import Link from 'next/link'

export default function HistoricalEducationalPage() {
  const activities = [
    {
      name: 'Carnegie Museum of Art',
      description: 'Premier art museum with extensive collections of American and European art, contemporary works, and special exhibitions.',
      image: '/images/placeholder-event.svg',
      rating: 4.7,
      price: '$15',
      duration: '2-3 hours',
      location: 'Oakland',
      highlights: ['American art masterpieces', 'European collections', 'Contemporary exhibits', 'Educational programs'],
      category: 'Museum',
      type: 'art'
    },
    {
      name: 'Andy Warhol Museum',
      description: 'Dedicated to the life and work of Pittsburgh\'s most famous artist, featuring the world\'s largest collection of Warhol\'s work.',
      image: '/images/placeholder-event.svg',
      rating: 4.6,
      price: '$20',
      duration: '1-2 hours',
      location: 'North Shore',
      highlights: ['Warhol\'s complete works', 'Interactive exhibits', 'Film screenings', 'Artist studio'],
      category: 'Museum',
      type: 'art'
    },
    {
      name: 'Carnegie Museum of Natural History',
      description: 'Explore dinosaurs, ancient artifacts, and natural science exhibits from around the world.',
      image: '/images/placeholder-event.svg',
      rating: 4.8,
      price: '$15',
      duration: '2-4 hours',
      location: 'Oakland',
      highlights: ['Dinosaur fossils', 'Gem collection', 'Planetarium', 'Research library'],
      category: 'Museum',
      type: 'science'
    },
    {
      name: 'Heinz History Center',
      description: 'Interactive exhibits on Pittsburgh and regional history, from the French and Indian War to the present.',
      image: '/images/placeholder-event.svg',
      rating: 4.5,
      price: '$18',
      duration: '2-3 hours',
      location: 'Strip District',
      highlights: ['Local history exhibits', 'Interactive displays', 'Sports Hall of Fame', 'Research center'],
      category: 'History Museum',
      type: 'history'
    },
    {
      name: 'Senator John Heinz History Center',
      description: 'Explore Pittsburgh\'s industrial heritage and the stories of its people through engaging exhibits and artifacts.',
      image: '/images/placeholder-event.svg',
      rating: 4.4,
      price: '$18',
      duration: '2-3 hours',
      location: 'Strip District',
      highlights: ['Industrial history', 'Immigration stories', 'Cultural exhibits', 'Family activities'],
      category: 'History Museum',
      type: 'history'
    },
    {
      name: 'Carnegie Mellon University Campus Tour',
      description: 'Explore one of the world\'s leading research universities, known for computer science, robotics, and innovation.',
      image: '/images/placeholder-event.svg',
      rating: 4.5,
      price: 'Free',
      duration: '1-2 hours',
      location: 'Schenley Park',
      highlights: ['Innovation hub', 'Research facilities', 'Student life', 'Architecture'],
      category: 'University',
      type: 'education'
    },
    {
      name: 'University of Pittsburgh Tour',
      description: 'Visit Pitt\'s beautiful campus, including the iconic Cathedral of Learning and its Nationality Rooms.',
      image: '/images/placeholder-event.svg',
      rating: 4.6,
      price: '$5',
      duration: '1-2 hours',
      location: 'Oakland',
      highlights: ['Cathedral of Learning', 'Nationality Rooms', 'Research centers', 'Historic architecture'],
      category: 'University',
      type: 'education'
    },
    {
      name: 'Duquesne University Campus',
      description: 'Explore Duquesne\'s beautiful bluff location with its blend of historic and modern architecture.',
      image: '/images/placeholder-event.svg',
      rating: 4.3,
      price: 'Free',
      duration: '1 hour',
      location: 'Bluff',
      highlights: ['Historic buildings', 'Modern architecture', 'River views', 'Student center'],
      category: 'University',
      type: 'education'
    },
    {
      name: 'Point State Park Historical Walk',
      description: 'Learn about Pittsburgh\'s founding at the confluence of three rivers, with historical markers and exhibits.',
      image: '/images/placeholder-event.svg',
      rating: 4.4,
      price: 'Free',
      duration: '1-2 hours',
      location: 'Downtown',
      highlights: ['Fort Pitt history', 'River confluence', 'Historical markers', 'Scenic views'],
      category: 'Historical Site',
      type: 'history'
    },
    {
      name: 'Randyland Art Installation',
      description: 'Experience Pittsburgh\'s famous outsider art environment with colorful sculptures and installations.',
      image: '/images/placeholder-event.svg',
      rating: 4.2,
      price: 'Free',
      duration: '30-45 minutes',
      location: 'Strip District',
      highlights: ['Outsider art', 'Colorful sculptures', 'Local artist', 'Public art'],
      category: 'Public Art',
      type: 'art'
    },
    {
      name: 'Pittsburgh Glass Center',
      description: 'Watch live glass blowing demonstrations and take classes to learn about glass art techniques.',
      image: '/images/placeholder-event.svg',
      rating: 4.6,
      price: '$12',
      duration: '1 hour',
      location: 'Lawrenceville',
      highlights: ['Glass blowing demos', 'Art classes', 'Studio tours', 'Hands-on activities'],
      category: 'Arts Education',
      type: 'art'
    },
    {
      name: 'Carnegie Science Center',
      description: 'Interactive science exhibits, planetarium, and hands-on learning experiences for all ages.',
      image: '/images/placeholder-event.svg',
      rating: 4.5,
      price: '$25',
      duration: '3-4 hours',
      location: 'North Shore',
      highlights: ['Interactive exhibits', 'Planetarium', 'Science demonstrations', 'Robotics shows'],
      category: 'Science Center',
      type: 'science'
    }
  ]

  const categories = [
    { name: 'Art & Museums', icon: Building2, count: activities.filter(a => a.type === 'art').length },
    { name: 'History', icon: Landmark, count: activities.filter(a => a.type === 'history').length },
    { name: 'Science & Education', icon: GraduationCap, count: activities.filter(a => a.type === 'science' || a.type === 'education').length }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/things-to-do"
            className="inline-flex items-center gap-2 text-pittsburgh-gold hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Things to Do
          </Link>

          <div className="text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Historical & Educational
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Discover Pittsburgh's rich history, world-class museums, and educational institutions that make our city a center of learning and culture.
            </p>
          </div>
        </div>
      </section>

      {/* Category Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, index) => (
              <div key={index} className="text-center">
                <cat.icon className="w-8 h-8 text-pittsburgh-gold mx-auto mb-2" />
                <div className="text-2xl font-bold text-pittsburgh-black">{cat.count}</div>
                <div className="text-gray-600">{cat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <div key={activity.name} className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={activity.image}
                    alt={activity.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-pittsburgh-gold text-pittsburgh-black px-3 py-1 rounded-full text-sm font-semibold">
                    {activity.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-pittsburgh-black">
                    ⭐ {activity.rating}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-pittsburgh-black mb-2">
                    {activity.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {activity.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{activity.duration}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {activity.highlights.slice(0, 3).map((highlight) => (
                      <span
                        key={highlight}
                        className="bg-pittsburgh-gold/10 text-pittsburgh-gold px-2 py-1 rounded-full text-xs"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-pittsburgh-gold">
                      {activity.price}
                    </span>
                        <button className="bg-pittsburgh-gold text-pittsburgh-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-sm">
                          Learn More
                        </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Why Pittsburgh for Learning?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pittsburgh is a hub of education and innovation, home to world-class universities and research institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-lg font-bold text-pittsburgh-black mb-2">Top Universities</h3>
              <p className="text-gray-600 text-sm">Carnegie Mellon, Pitt, Duquesne, and Chatham universities call Pittsburgh home.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🧬</div>
              <h3 className="text-lg font-bold text-pittsburgh-black mb-2">Medical Research</h3>
              <p className="text-gray-600 text-sm">World-leading medical research and healthcare innovation.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-lg font-bold text-pittsburgh-black mb-2">Tech Innovation</h3>
              <p className="text-gray-600 text-sm">Silicon Valley of the East with cutting-edge robotics and AI research.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-lg font-bold text-pittsburgh-black mb-2">Cultural Heritage</h3>
              <p className="text-gray-600 text-sm">Rich industrial history and cultural institutions preserving our heritage.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Explore More Categories</h2>
            <p className="text-xl text-gray-600">Discover other ways to experience Pittsburgh</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link href="/things-to-do/cultural-museums" className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Building2 className="w-8 h-8 text-pittsburgh-gold mx-auto mb-2" />
              <div className="font-semibold text-pittsburgh-black">Cultural & Museums</div>
            </Link>

            <Link href="/things-to-do/outdoor-nature" className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Heart className="w-8 h-8 text-pittsburgh-gold mx-auto mb-2" />
              <div className="font-semibold text-pittsburgh-black">Outdoor & Nature</div>
            </Link>

            <Link href="/things-to-do/sports-entertainment" className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Star className="w-8 h-8 text-pittsburgh-gold mx-auto mb-2" />
              <div className="font-semibold text-pittsburgh-black">Sports & Entertainment</div>
            </Link>

            <Link href="/things-to-do/food-drink" className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <GraduationCap className="w-8 h-8 text-pittsburgh-gold mx-auto mb-2" />
              <div className="font-semibold text-pittsburgh-black">Food & Drink</div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
