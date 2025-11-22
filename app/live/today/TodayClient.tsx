'use client'

import { useState, useEffect } from 'react'
import { Calendar, Cloud, CloudRain, Sun, Thermometer, Wind, Droplet, Eye, RefreshCw, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import AutoRefresh from '@/components/live/AutoRefresh'
import LiveCard from '@/components/live/LiveCard'
import { EventListSkeleton } from '@/components/events/LoadingSkeleton'
import ErrorState from '@/components/events/ErrorState'
import { getEventsToday } from '@/data/pittsburghEvents'
import type { Event } from '@/data/pittsburghEvents'

interface WeatherData {
  temperature: number
  condition: string
  feelsLike: number
  humidity: number
  windSpeed: number
  visibility?: number
  uvIndex?: string
  forecast?: Array<{
    time: string
    temp: number
    condition: string
  }>
  alerts?: Array<{
    title: string
    description: string
    severity: string
  }>
}

export default function TodayClient() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [deals, setDeals] = useState<any[]>([])
  const [highlights, setHighlights] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchTodayData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch weather
      try {
        const weatherRes = await fetch('/api/live/weather?t=' + Date.now())
        if (weatherRes.ok) {
          const weatherData = await weatherRes.json()
          if (weatherData.weather) {
            setWeather({
              temperature: weatherData.weather.temperature || 45,
              condition: weatherData.weather.conditions || 'Partly Cloudy',
              feelsLike: weatherData.weather.feelsLike || weatherData.weather.temperature || 45,
              humidity: weatherData.weather.humidity || 65,
              windSpeed: weatherData.weather.windSpeed || 8,
              visibility: 10,
              uvIndex: 'Low',
              alerts: weatherData.weather.alerts || []
            })
          }
        }
      } catch (err) {
        console.warn('Weather fetch failed:', err)
        setWeather(getMockWeather())
      }

      // Fetch events
      const todayEvents = getEventsToday()
      setEvents(todayEvents)

      // Fetch deals
      try {
        const dealsRes = await fetch('/api/live/deals?t=' + Date.now())
        if (dealsRes.ok) {
          const dealsData = await dealsRes.json()
          if (dealsData.deals && Array.isArray(dealsData.deals)) {
            setDeals(dealsData.deals.slice(0, 3))
          }
        }
      } catch (err) {
        console.warn('Deals fetch failed:', err)
        setDeals(getMockDeals())
      }

      // Generate highlights from weather alerts and events
      const alerts: any[] = []
      if (weather?.alerts && weather.alerts.length > 0) {
        weather.alerts.forEach(alert => {
          alerts.push({
            title: alert.title,
            description: alert.description,
            type: alert.severity === 'extreme' || alert.severity === 'severe' ? 'warning' : 'info',
            icon: '❄️'
          })
        })
      }
      setHighlights(alerts.length > 0 ? alerts : getMockHighlights())

      setLastUpdate(new Date())
    } catch (err) {
      console.error('Error fetching today data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load data')
      // Fallback to mock data
      setWeather(getMockWeather())
      setEvents(getEventsToday())
      setDeals(getMockDeals())
      setHighlights(getMockHighlights())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodayData()
  }, [])

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase()
    if (conditionLower.includes('rain') || conditionLower.includes('storm')) return CloudRain
    if (conditionLower.includes('cloud')) return Cloud
    return Sun
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-red-100 border-red-300'
      case 'alert': return 'bg-orange-100 border-orange-300'
      default: return 'bg-blue-100 border-blue-300'
    }
  }

  if (error && !weather && events.length === 0) {
    return <ErrorState message={error} onRetry={fetchTodayData} />
  }

  const WeatherIcon = weather ? getWeatherIcon(weather.condition) : Cloud

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Weather Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-pittsburgh-black">Today's Weather</h2>
              <AutoRefresh onRefresh={fetchTodayData} interval={300000} />
            </div>

            {loading && !weather ? (
              <div className="animate-pulse">Loading weather...</div>
            ) : weather ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Current Conditions */}
                <div className="text-center">
                  <WeatherIcon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-pittsburgh-black mb-2">
                    {weather.temperature}°F
                  </div>
                  <div className="text-lg text-gray-700 mb-4">{weather.condition}</div>
                  <div className="text-sm text-gray-600">
                    Feels like {weather.feelsLike}°F
                  </div>
                </div>

                {/* Weather Details */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Droplet className="w-5 h-5" />
                      <span>Humidity</span>
                    </div>
                    <span className="font-semibold">{weather.humidity}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Wind className="w-5 h-5" />
                      <span>Wind Speed</span>
                    </div>
                    <span className="font-semibold">{weather.windSpeed} mph</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Eye className="w-5 h-5" />
                      <span>Visibility</span>
                    </div>
                    <span className="font-semibold">{weather.visibility || 10} miles</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Sun className="w-5 h-5" />
                      <span>UV Index</span>
                    </div>
                    <span className="font-semibold">{weather.uvIndex || 'Low'}</span>
                  </div>
                </div>

                {/* Hourly Forecast */}
                <div>
                  <h3 className="font-semibold text-pittsburgh-black mb-3">Hourly Forecast</h3>
                  <div className="space-y-2">
                    {weather.forecast ? (
                      weather.forecast.map((hour, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 w-12">{hour.time}</span>
                          <Cloud className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-semibold w-8">{hour.temp}°</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500">Forecast data loading...</div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Events Today */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-pittsburgh-black mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  Events Today
                </h2>

                {loading && events.length === 0 ? (
                  <EventListSkeleton count={3} />
                ) : events.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No events scheduled for today.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {events.slice(0, 4).map((event) => (
                      <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">{getEventIcon(event.category)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                                {event.category}
                              </span>
                              <span className="text-sm text-gray-500">{event.startTime}</span>
                            </div>
                            <h3 className="text-lg font-bold text-pittsburgh-black mb-1">{event.title}</h3>
                            <p className="text-gray-600 mb-2 text-sm">{event.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{event.location.neighborhood}</span>
                              <span>{event.venue.name}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              event.price.isFree ? 'bg-green-100 text-green-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {event.price.isFree ? 'Free' : `$${event.price.min}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="text-center mt-6">
                  <Link
                    href="/events/today"
                    className="bg-pittsburgh-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors inline-block"
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

                {loading && deals.length === 0 ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-20 bg-gray-200 rounded animate-pulse" />
                    ))}
                  </div>
                ) : deals.length === 0 ? (
                  <div className="text-center py-12">
                    <span className="text-4xl mb-4 block">💰</span>
                    <p className="text-gray-500">No deals available today.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {deals.map((deal: any) => (
                      <div key={deal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-pittsburgh-black mb-1">{deal.title || deal.name}</h3>
                            <p className="text-gray-600 text-sm">{deal.businessName || deal.business}</p>
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold mt-2">
                              {deal.category || 'Deal'}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600 mb-1">
                              {deal.discount || '50%'}
                            </div>
                            {deal.validUntil && (
                              <div className="text-xs text-gray-500">
                                Expires {new Date(deal.validUntil).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="text-center mt-6">
                  <Link
                    href="/live/deals"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
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
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Daily Highlights
                </h2>

                <div className="space-y-3">
                  {highlights.map((highlight, index) => (
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function getEventIcon(category: string) {
  const icons: Record<string, string> = {
    'Sports': '🏈',
    'Music': '🎵',
    'Arts & Culture': '🎨',
    'Food & Drink': '🍺',
    'Family': '👨‍👩‍👧‍👦',
    'Festival': '🎉',
    'Nightlife': '🌙'
  }
  return icons[category] || '📅'
}

function getMockWeather(): WeatherData {
  return {
    temperature: 45,
    condition: 'Partly Cloudy',
    feelsLike: 42,
    humidity: 65,
    windSpeed: 8,
    visibility: 10,
    uvIndex: 'Low',
    forecast: [
      { time: 'Now', temp: 45, condition: 'Partly Cloudy' },
      { time: '2 PM', temp: 48, condition: 'Sunny' },
      { time: '4 PM', temp: 46, condition: 'Cloudy' },
      { time: '6 PM', temp: 42, condition: 'Cloudy' },
      { time: '8 PM', temp: 38, condition: 'Clear' }
    ]
  }
}

function getMockDeals() {
  return [
    {
      id: '1',
      title: '50% Off Lunch Special',
      businessName: 'Mineo\'s Pizza House',
      discount: '50%',
      category: 'Food',
      validUntil: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      title: 'Buy One Get One Coffee',
      businessName: 'Crazy Mocha',
      discount: '50%',
      category: 'Beverages',
      validUntil: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString()
    }
  ]
}

function getMockHighlights() {
  return [
    {
      title: 'Weather Alert',
      description: 'Partly cloudy today with temperatures in the mid-40s.',
      type: 'info',
      icon: '🌤️'
    },
    {
      title: 'Traffic Update',
      description: 'Normal traffic conditions throughout Pittsburgh.',
      type: 'info',
      icon: '🚗'
    }
  ]
}

