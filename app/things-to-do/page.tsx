'use client'

import { Calendar, MapPin, Clock, Star, Heart, Camera, Coffee, Music, Mountain, TreePine, Building, Waves, Sparkles, Gift, Users } from 'lucide-react'
import Link from 'next/link'
import Hero from '@/components/Hero'
import { siteConfig } from '@/config/site'
import { pittsburghAttractions } from '@/data/pittsburghAttractions'

const activityCategories = [
  {
    title: 'Cultural & Museums',
    icon: Building,
    description: 'World-class museums and cultural institutions',
    activities: [
      {
        name: 'Carnegie Museum of Art',
        description: 'One of the oldest art museums in the US with extensive collections',
        image: '/images/placeholder-event.svg',
        rating: 4.7,
        price: '$15',
        duration: '2-3 hours',
        location: 'Oakland',
        highlights: ['American art', 'European masterpieces', 'Contemporary exhibits']
      },
      {
        name: 'Andy Warhol Museum',
        description: 'Dedicated to the life and work of Pittsburgh\'s famous pop artist',
        image: '/images/placeholder-event.svg',
        rating: 4.6,
        price: '$20',
        duration: '1-2 hours',
        location: 'North Shore',
        highlights: ['Warhol\'s art', 'Interactive exhibits', 'Film screenings']
      },
      {
        name: 'Carnegie Museum of Natural History',
        description: 'Dinosaurs, gems, and ancient artifacts from around the world',
        image: '/images/placeholder-event.svg',
        rating: 4.8,
        price: '$15',
        duration: '2-4 hours',
        location: 'Oakland',
        highlights: ['Dinosaur fossils', 'Gem collection', 'Planetarium']
      }
    ]
  },
  {
    title: 'Outdoor & Nature',
    icon: TreePine,
    description: 'Parks, trails, and scenic outdoor experiences',
    activities: [
      {
        name: 'Phipps Conservatory',
        description: 'Victorian glasshouse with seasonal exhibits and butterfly garden',
        image: '/images/placeholder-event.svg',
        rating: 4.9,
        price: '$14.95',
        duration: '1-2 hours',
        location: 'Oakland',
        highlights: ['Tropical plants', 'Seasonal exhibits', 'Butterfly garden']
      },
      {
        name: 'Schenley Park',
        description: 'Large urban park with trails, golf, and Flagstaff Hill overlook',
        image: '/images/placeholder-event.svg',
        rating: 4.7,
        price: 'Free',
        duration: '1-4 hours',
        location: 'Schenley Park',
        highlights: ['Hiking trails', 'Panoramic views', 'Recreation facilities']
      },
      {
        name: 'Frick Park',
        description: 'Pittsburgh\'s largest city park with meadows, streams, and trails',
        image: '/images/placeholder-event.svg',
        rating: 4.6,
        price: 'Free',
        duration: '2-6 hours',
        location: 'Squirrel Hill',
        highlights: ['Wildflower meadows', 'Bowling green', 'Dog park']
      }
    ]
  },
  {
    title: 'Sports & Entertainment',
    icon: Star,
    description: 'Professional sports and live entertainment venues',
    activities: [
      {
        name: 'PNC Park',
        description: 'Home of the Pittsburgh Pirates with great views and atmosphere',
        image: '/images/placeholder-event.svg',
        rating: 4.8,
        price: '$15-85',
        duration: '3-4 hours',
        location: 'North Shore',
        highlights: ['Baseball games', 'Manual Labor statue', 'River views']
      },
      {
        name: 'Heinz Field',
        description: 'Home of Steelers and Pitt Panthers football',
        image: '/images/placeholder-event.svg',
        rating: 4.7,
        price: '$50-150',
        duration: '3-4 hours',
        location: 'North Shore',
        highlights: ['NFL games', 'College football', 'Concert venue']
      },
      {
        name: 'Stage AE',
        description: 'Outdoor concert venue along the Allegheny River',
        image: '/images/placeholder-event.svg',
        rating: 4.5,
        price: '$20-80',
        duration: '2-4 hours',
        location: 'North Shore',
        highlights: ['Concert venue', 'River views', 'Outdoor atmosphere']
      }
    ]
  },
  {
    title: 'Food & Drink Experiences',
    icon: Coffee,
    description: 'Culinary tours, breweries, and unique dining experiences',
    activities: [
      {
        name: 'Brewery Tours',
        description: 'Explore Pittsburgh\'s craft beer scene with brewery tours',
        image: '/images/placeholder-event.svg',
        rating: 4.8,
        price: '$15-25',
        duration: '1-2 hours',
        location: 'Various',
        highlights: ['Craft beer tasting', 'Brewery history', 'Behind-the-scenes tours']
      },
      {
        name: 'Strip District Food Tour',
        description: 'Explore ethnic markets and specialty food shops',
        image: '/images/placeholder-event.svg',
        rating: 4.7,
        price: '$35-50',
        duration: '2-3 hours',
        location: 'Strip District',
        highlights: ['International foods', 'Local vendors', 'Culinary history']
      },
      {
        name: 'Primanti Bros. Experience',
        description: 'Try Pittsburgh\'s famous sandwich with fries and coleslaw inside',
        image: '/images/placeholder-event.svg',
        rating: 4.6,
        price: '$12-15',
        duration: '30-45 min',
        location: 'Oakland',
        highlights: ['Iconic sandwich', 'Pittsburgh tradition', 'Quick service']
      }
    ]
  },
  {
    title: 'Adventure & Thrills',
    icon: Mountain,
    description: 'Adrenaline-pumping activities and outdoor adventures',
    activities: [
      {
        name: 'Duquesne Incline',
        description: 'Historic cable car ride with panoramic city views',
        image: '/images/placeholder-event.svg',
        rating: 4.9,
        price: '$2.75',
        duration: '20-30 min',
        location: 'South Side',
        highlights: ['Cable car ride', 'City views', 'Historic landmark']
      },
      {
        name: 'Gateway Clipper Fleet',
        description: 'Boat cruises on the three rivers with sightseeing tours',
        image: '/images/placeholder-event.svg',
        rating: 4.5,
        price: '$25-35',
        duration: '1-2 hours',
        location: 'Point State Park',
        highlights: ['River cruises', 'City tours', 'Dinner cruises available']
      },
      {
        name: 'Randyland',
        description: 'Whimsical art installation and outdoor adventure playground',
        image: '/images/placeholder-event.svg',
        rating: 4.4,
        price: 'Free',
        duration: '30-60 min',
        location: 'North Side',
        highlights: ['Street art', 'Interactive exhibits', 'Colorful displays']
      }
    ]
  },
  {
    title: 'Historical & Educational',
    icon: Building,
    description: 'Learn about Pittsburgh\'s rich history and heritage',
    activities: [
      {
        name: 'Fort Pitt Museum',
        description: 'Learn about the French and Indian War and early Pittsburgh',
        image: '/images/placeholder-event.svg',
        rating: 4.6,
        price: '$8',
        duration: '1-2 hours',
        location: 'Point State Park',
        highlights: ['Colonial history', 'Interactive exhibits', 'Battle reenactments']
      },
      {
        name: 'Soldiers & Sailors Memorial',
        description: 'Civil War memorial with museum and Hall of Valor',
        image: '/images/placeholder-event.svg',
        rating: 4.5,
        price: 'Free',
        duration: '45-90 min',
        location: 'Oakland',
        highlights: ['Civil War history', 'Military artifacts', 'Memorial hall']
      },
      {
        name: 'Carnegie Mellon University Tours',
        description: 'Explore one of the world\'s top research universities',
        image: '/images/placeholder-event.svg',
        rating: 4.7,
        price: 'Free',
        duration: '1 hour',
        location: 'Schenley Park',
        highlights: ['Campus tours', 'Innovation exhibits', 'Research facilities']
      }
    ]
  }
]

export default function ThingsToDoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pittsburgh-gold/10 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black text-pittsburgh-black mb-6">
              Things to Do in <span className="text-pittsburgh-gold">Pittsburgh</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover Pittsburgh's diverse attractions, from world-class museums and outdoor adventures
              to cultural experiences and hidden gems. The Steel City offers something for everyone.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                90+ Neighborhoods
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Year-round Activities
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                World-class Attractions
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-pittsburgh-black mb-4">
              Explore by Category
            </h2>
            <p className="text-gray-600">
              Find exactly what you're looking for
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link
              href="/things-to-do/must-see"
              className="bg-gradient-to-br from-pittsburgh-gold to-yellow-400 text-pittsburgh-black rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
            >
              <Star className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold text-sm">Must-See</div>
            </Link>
            <Link
              href="/things-to-do/free"
              className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
            >
              <Gift className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold text-sm">Free Things</div>
            </Link>
            <Link
              href="/things-to-do/outdoor"
              className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
            >
              <TreePine className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold text-sm">Outdoor</div>
            </Link>
            <Link
              href="/things-to-do/museums"
              className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
            >
              <Building className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold text-sm">Museums</div>
            </Link>
            <Link
              href="/things-to-do/family"
              className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
            >
              <Users className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold text-sm">Family</div>
            </Link>
            <Link
              href="/things-to-do/hidden"
              className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
            >
              <Sparkles className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold text-sm">Hidden Gems</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Activity Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activityCategories.map((category, categoryIndex) => (
            <div key={category.title} className="mb-16 last:mb-0">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-pittsburgh-gold rounded-lg flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-pittsburgh-black" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-pittsburgh-black">
                    {category.title}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Activities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.activities.map((activity, index) => (
                  <div key={activity.name} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={activity.image}
                        alt={activity.name}
                        className="w-full h-48 object-cover"
                      />
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
                        {activity.highlights.slice(0, 2).map((highlight) => (
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

              {/* View More Link */}
              <div className="text-center mt-8">
                <Link
                  href={`/things-to-do/${category.title.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}
                  className="inline-flex items-center gap-2 text-pittsburgh-gold hover:text-pittsburgh-black font-semibold transition-colors"
                >
                  View all {category.title.toLowerCase()} activities
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal Activities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Seasonal Activities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pittsburgh offers unique experiences throughout the year, from winter festivals to summer river activities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                season: 'Winter',
                month: 'Dec - Feb',
                activities: ['Christmas Tree Lighting', 'Ice Skating at PPG Place', 'Holiday Markets', 'Steelers Playoffs'],
                color: 'from-blue-500 to-blue-600'
              },
              {
                season: 'Spring',
                month: 'Mar - May',
                activities: ['Cherry Blossom Festival', 'Pittsburgh Marathon', 'River Cruises', 'Garden Tours'],
                color: 'from-green-500 to-green-600'
              },
              {
                season: 'Summer',
                month: 'Jun - Aug',
                activities: ['River Regatta', 'Outdoor Concerts', 'Frick Park Events', 'Baseball Games'],
                color: 'from-yellow-500 to-orange-500'
              },
              {
                season: 'Fall',
                month: 'Sep - Nov',
                activities: ['Oktoberfest', 'Fall Foliage Tours', 'Food Festivals', 'Steelers Season'],
                color: 'from-red-500 to-orange-500'
              }
            ].map((season) => (
              <div key={season.season} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 bg-gradient-to-r ${season.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Calendar className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-pittsburgh-black mb-2">
                  {season.season}
                </h3>

                <p className="text-sm text-gray-500 mb-4">
                  {season.month}
                </p>

                <ul className="space-y-2">
                  {season.activities.map((activity) => (
                    <li key={activity} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-pittsburgh-gold rounded-full"></div>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Explore Pittsburgh?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Download our free guide to the best things to do in Pittsburgh, or start planning your visit with our personalized recommendations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ai-guide"
              className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Waves className="w-5 h-5" />
              Get AI Recommendations
            </Link>
            <Link
              href="/events"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors inline-flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Browse Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
