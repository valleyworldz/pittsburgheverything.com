import { Metadata } from 'next'
import { TrendingUp, Clock, MapPin, Users, Star, Zap } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Trending in Pittsburgh | What\'s Hot Right Now',
  description: 'Discover what\'s trending in Pittsburgh. Real-time updates on popular events, deals, news, and activities happening right now.',
  keywords: 'Pittsburgh trending, what\'s hot, popular events, trending news, real-time updates',
  openGraph: {
    title: 'Trending in Pittsburgh | What\'s Hot Right Now',
    description: 'See what\'s trending in Pittsburgh with real-time updates on events, deals, and activities.',
    images: [
      {
        url: '/images/trending/pittsburgh-trending.jpg',
        width: 1200,
        height: 630,
        alt: 'Trending in Pittsburgh'
      }
    ]
  }
}

export default function TrendingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Trending in Pittsburgh",
    "description": "Real-time updates on what's hot and trending in Pittsburgh.",
    "url": "https://pittsburgheverything.com/live/trending",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const trendingItems = [
    {
      id: 1,
      type: 'event',
      title: 'Pittsburgh Steelers vs. Chiefs',
      subtitle: 'AFC Championship Game',
      location: 'Heinz Field',
      time: 'Today 4:30 PM',
      trending: '#1 Trending',
      description: 'Over 67,000 fans expected for this crucial playoff game.',
      image: '/images/trending/steelers-game.jpg',
      category: 'Sports',
      attendees: '67K+',
      icon: '🏈'
    },
    {
      id: 2,
      type: 'deal',
      title: '50% Off at Mineo\'s Pizza',
      subtitle: 'Lunch Special Deal',
      location: 'Oakland',
      time: 'Expires in 2h',
      trending: '#2 Trending',
      description: 'Large cheese pizza for $9.50. Limited time offer.',
      image: '/images/trending/pizza-deal.jpg',
      category: 'Food',
      savings: '$9.49',
      icon: '🍕'
    },
    {
      id: 3,
      type: 'news',
      title: 'New Tech Hub Opens Downtown',
      subtitle: 'Innovation District Expansion',
      location: 'Downtown Pittsburgh',
      time: 'Breaking 30m ago',
      trending: '#3 Trending',
      description: 'Google announces $50M investment in Pittsburgh tech scene.',
      image: '/images/trending/tech-hub.jpg',
      category: 'Business',
      reads: '12.5K',
      icon: '💼'
    },
    {
      id: 4,
      type: 'event',
      title: 'Winter Beer Festival',
      subtitle: 'Craft Beer & Food Festival',
      location: 'Strip District',
      time: 'This Weekend',
      trending: '#4 Trending',
      description: '50+ local breweries featuring winter seasonal beers.',
      image: '/images/trending/beer-festival.jpg',
      category: 'Food & Drink',
      attendees: '5K+',
      icon: '🍺'
    },
    {
      id: 5,
      type: 'weather',
      title: 'Snow Storm Warning',
      subtitle: 'Heavy Snow Expected',
      location: 'Greater Pittsburgh',
      time: 'Tonight - Tomorrow',
      trending: '#5 Trending',
      description: '6-10 inches of snow expected. Schools and businesses closing early.',
      image: '/images/trending/snow-storm.jpg',
      category: 'Weather',
      severity: 'High',
      icon: '❄️'
    },
    {
      id: 6,
      type: 'deal',
      title: 'Kids Eat Free at Local Restaurants',
      subtitle: 'Family Dining Deal',
      location: 'Multiple locations',
      time: 'Sunday evenings',
      trending: '#6 Trending',
      description: 'Children under 12 eat free with adult purchase.',
      image: '/images/trending/family-deal.jpg',
      category: 'Family',
      locations: '15 spots',
      icon: '👨‍👩‍👧‍👦'
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'event': return 'bg-blue-100 text-blue-800'
      case 'deal': return 'bg-green-100 text-green-800'
      case 'news': return 'bg-purple-100 text-purple-800'
      case 'weather': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-yellow-300" />
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                LIVE NOW
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Trending in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Real-time updates on what's hot and happening right now in Pittsburgh.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">24</div>
                <div className="text-sm opacity-75">Active Trends</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">50K+</div>
                <div className="text-sm opacity-75">Daily Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">100+</div>
                <div className="text-sm opacity-75">Data Sources</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">1min</div>
                <div className="text-sm opacity-75">Update Rate</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-lg font-semibold mb-2">📊 Real-Time Analytics</p>
              <p className="opacity-90">
                Trends update every minute based on social media, news, events, and user activity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Items */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              🔥 What's Trending Right Now
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The most talked-about and popular items in Pittsburgh today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Trending Badge */}
                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 text-center font-bold text-sm">
                  {item.trending}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(item.type)}`}>
                          {item.type.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(item.category.toLowerCase())}`}>
                          {item.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-pittsburgh-black mb-1">{item.title}</h3>
                      <p className="text-gray-600 mb-3">{item.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{item.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {item.time}
                    </span>
                  </div>

                  {/* Item-specific stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      {item.attendees && (
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-semibold">{item.attendees}</span>
                        </div>
                      )}
                      {item.savings && (
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-semibold text-green-600">Save {item.savings}</span>
                        </div>
                      )}
                      {item.reads && (
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-semibold">{item.reads} reads</span>
                        </div>
                      )}
                      {item.severity && (
                        <div className="flex items-center gap-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            item.severity === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.severity}
                          </span>
                        </div>
                      )}
                      {item.locations && (
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-semibold">{item.locations} locations</span>
                        </div>
                      )}
                    </div>

                    <button className="bg-pittsburgh-gold text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors text-sm">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trend Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600">
              Explore trending topics in different areas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link href="/events" className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="font-bold text-pittsburgh-black mb-2">Events</h3>
              <p className="text-gray-600 text-sm">Concerts, festivals, sports</p>
              <div className="text-2xl font-bold text-blue-600 mt-2">8 trending</div>
            </Link>

            <Link href="/live/deals" className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-bold text-pittsburgh-black mb-2">Deals</h3>
              <p className="text-gray-600 text-sm">Discounts, specials, offers</p>
              <div className="text-2xl font-bold text-green-600 mt-2">12 trending</div>
            </Link>

            <Link href="/restaurants" className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="font-bold text-pittsburgh-black mb-2">Food</h3>
              <p className="text-gray-600 text-sm">Restaurants, cafes, dining</p>
              <div className="text-2xl font-bold text-red-600 mt-2">15 trending</div>
            </Link>

            <Link href="/neighborhoods" className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏙️</div>
              <h3 className="font-bold text-pittsburgh-black mb-2">Places</h3>
              <p className="text-gray-600 text-sm">Neighborhoods, attractions</p>
              <div className="text-2xl font-bold text-purple-600 mt-2">6 trending</div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Ahead of the Trends</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get personalized trend notifications based on your interests and location.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
              Enable Trend Alerts
            </button>
            <Link
              href="/"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              Explore Pittsburgh
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
