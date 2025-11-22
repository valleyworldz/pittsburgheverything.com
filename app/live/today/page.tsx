import { Metadata } from 'next'
import { Calendar, Clock, MapPin, Sun, Cloud, CloudRain, Thermometer, Wind } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Today in Pittsburgh | Daily Schedule & What\'s Happening',
  description: 'Your complete guide to what\'s happening today in Pittsburgh. Events, weather, deals, and daily highlights all in one place.',
  keywords: 'today Pittsburgh, daily schedule, events today, weather, deals today, Pittsburgh daily',
  openGraph: {
    title: 'Today in Pittsburgh | Daily Guide',
    description: 'Everything happening today in Pittsburgh - events, weather, deals, and more.',
    images: [
      {
        url: '/images/today/pittsburgh-today.jpg',
        width: 1200,
        height: 630,
        alt: 'Today in Pittsburgh'
      }
    ]
  }
}

export default function TodayPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Today in Pittsburgh",
    "description": "Complete daily guide to events, weather, and activities in Pittsburgh.",
    "url": "https://pittsburgheverything.com/live/today",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const currentWeather = {
    temperature: 32,
    condition: 'Snow',
    humidity: 78,
    windSpeed: 12,
    feelsLike: 25,
    icon: CloudRain,
    forecast: [
      { time: 'Now', temp: 32, icon: CloudRain },
      { time: '2 PM', temp: 30, icon: CloudRain },
      { time: '4 PM', temp: 28, icon: CloudRain },
      { time: '6 PM', temp: 26, icon: CloudRain },
      { time: '8 PM', temp: 24, icon: CloudRain }
    ]
  }

  const todaysEvents = [
    {
      id: 1,
      title: 'Steelers vs. Chiefs',
      time: '4:30 PM',
      location: 'Heinz Field',
      category: 'Sports',
      description: 'AFC Championship playoff game',
      tickets: 'Sold Out',
      icon: '🏈'
    },
    {
      id: 2,
      title: 'Winter Beer Festival',
      time: '2:00 PM - 8:00 PM',
      location: 'Strip District',
      category: 'Food & Drink',
      description: '50+ craft beers and local food vendors',
      tickets: '$35',
      icon: '🍺'
    },
    {
      id: 3,
      title: 'Carnegie Museum Free Day',
      time: '10:00 AM - 5:00 PM',
      location: 'Oakland',
      category: 'Arts & Culture',
      description: 'Free admission to all exhibits',
      tickets: 'Free',
      icon: '🎨'
    },
    {
      id: 4,
      title: 'Pittsburgh Symphony Orchestra',
      time: '8:00 PM',
      location: 'Heinz Hall',
      category: 'Arts & Culture',
      description: 'Mozart and Beethoven concert',
      tickets: '$25 - $85',
      icon: '🎼'
    }
  ]

  const todaysDeals = [
    {
      id: 1,
      title: '50% Off Lunch Special',
      business: 'Mineo\'s Pizza House',
      discount: '50%',
      expires: '2:00 PM',
      category: 'Food'
    },
    {
      id: 2,
      title: 'Buy One Get One Coffee',
      business: 'Crazy Mocha',
      discount: '50%',
      expires: '5:00 PM',
      category: 'Beverages'
    },
    {
      id: 3,
      title: 'Kids Eat Free',
      business: 'Multiple Restaurants',
      discount: '100%',
      expires: '9:00 PM',
      category: 'Family'
    }
  ]

  const dailyHighlights = [
    {
      title: 'Weather Alert',
      description: 'Heavy snow expected tonight. 6-10 inches accumulation.',
      type: 'warning',
      icon: '❄️'
    },
    {
      title: 'Traffic Update',
      description: 'I-279 southbound lane closed due to accident. Expect delays.',
      type: 'alert',
      icon: '🚧'
    },
    {
      title: 'Parks Closing Early',
      description: 'All city parks closing at 4 PM due to weather.',
      type: 'info',
      icon: '🌳'
    },
    {
      title: 'School Delay',
      description: 'Pittsburgh Public Schools delayed 2 hours tomorrow.',
      type: 'info',
      icon: '🏫'
    }
  ]

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-red-100 border-red-300'
      case 'alert': return 'bg-orange-100 border-orange-300'
      default: return 'bg-blue-100 border-blue-300'
    }
  }

  const WeatherIcon = currentWeather.icon

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-yellow-300" />
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                TODAY
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Today in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Your complete daily guide to Pittsburgh
            </p>

            <div className="text-lg opacity-90">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Weather Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-pittsburgh-black">Today's Weather</h2>
              <div className="text-sm text-gray-600">Updated 5 min ago</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Conditions */}
              <div className="text-center">
                <WeatherIcon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-pittsburgh-black mb-2">{currentWeather.temperature}°F</div>
                <div className="text-lg text-gray-700 mb-4">{currentWeather.condition}</div>
                <div className="text-sm text-gray-600">Feels like {currentWeather.feelsLike}°F</div>
              </div>

              {/* Weather Details */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Humidity</span>
                  <span className="font-semibold">{currentWeather.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wind Speed</span>
                  <span className="font-semibold">{currentWeather.windSpeed} mph</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Visibility</span>
                  <span className="font-semibold">2.5 miles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">UV Index</span>
                  <span className="font-semibold">Low</span>
                </div>
              </div>

              {/* Hourly Forecast */}
              <div>
                <h3 className="font-semibold text-pittsburgh-black mb-3">Hourly Forecast</h3>
                <div className="space-y-2">
                  {currentWeather.forecast.map((hour, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 w-12">{hour.time}</span>
                      <CloudRain className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold w-8">{hour.temp}°</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Events Today */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-pittsburgh-black mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  Events Today
                </h2>

                <div className="space-y-4">
                  {todaysEvents.map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{event.icon}</div>
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

                        <div className="text-right">
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            event.tickets === 'Free' ? 'bg-green-100 text-green-800' :
                            event.tickets === 'Sold Out' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {event.tickets}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <Link
                    href="/events"
                    className="bg-pittsburgh-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                  >
                    View All Events
                  </Link>
                </div>
              </div>

              {/* Deals Today */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-pittsburgh-black mb-6 flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  Today's Best Deals
                </h2>

                <div className="space-y-4">
                  {todaysDeals.map((deal) => (
                    <div key={deal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-pittsburgh-black mb-1">{deal.title}</h3>
                          <p className="text-gray-600 text-sm">{deal.business}</p>
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold mt-2">
                            {deal.category}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600 mb-1">{deal.discount}</div>
                          <div className="text-sm text-gray-500">Expires {deal.expires}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <Link
                    href="/live/deals"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    View All Deals
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Daily Highlights */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-pittsburgh-black mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  Daily Highlights
                </h2>

                <div className="space-y-3">
                  {dailyHighlights.map((highlight, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${getAlertColor(highlight.type)}`}>
                      <div className="flex items-start gap-3">
                        <div className="text-xl">{highlight.icon}</div>
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900 mb-1">{highlight.title}</h4>
                          <p className="text-sm text-gray-700">{highlight.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-pittsburgh-black mb-4">Quick Links</h2>

                <div className="space-y-3">
                  <Link href="/live/trending" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📈</span>
                      <div>
                        <div className="font-semibold text-sm">Trending Now</div>
                        <div className="text-xs text-gray-600">What's hot today</div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/events/today" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎭</span>
                      <div>
                        <div className="font-semibold text-sm">Events Today</div>
                        <div className="text-xs text-gray-600">Full schedule</div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/restaurants" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🍽️</span>
                      <div>
                        <div className="font-semibold text-sm">Restaurant Hours</div>
                        <div className="text-xs text-gray-600">Today's specials</div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/jobs/hiring" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💼</span>
                      <div>
                        <div className="font-semibold text-sm">Hiring Now</div>
                        <div className="text-xs text-gray-600">Urgent openings</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
