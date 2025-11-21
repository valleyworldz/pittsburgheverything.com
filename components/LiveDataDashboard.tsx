'use client'

import { useState, useEffect } from 'react'
import { Calendar, Newspaper, Cloud, Tag, MapPin, RefreshCw, TrendingUp } from 'lucide-react'

interface LiveEvent {
  id: string
  title: string
  description: string
  startDate: Date
  location: {
    name: string
    address: string
  }
  category: string
  price?: any
  source: string
  url?: string
  image?: string
}

interface LiveNews {
  id: string
  title: string
  summary: string
  author: string
  publishedAt: Date
  category: string
  tags: string[]
  url: string
  source: string
}

interface LiveWeather {
  location: string
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  windDirection: string
  conditions: string
  icon: string
  forecast: any[]
}

interface LiveDeal {
  id: string
  title: string
  businessName: string
  discount: string
  category: string
  validUntil: Date
  location: string
}

interface LiveDataDashboardProps {
  location?: string
  compact?: boolean
}

export default function LiveDataDashboard({ location = 'Pittsburgh', compact = false }: LiveDataDashboardProps) {
  const [events, setEvents] = useState<LiveEvent[]>([])
  const [news, setNews] = useState<LiveNews[]>([])
  const [weather, setWeather] = useState<LiveWeather | null>(null)
  const [deals, setDeals] = useState<LiveDeal[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchLiveData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [eventsRes, newsRes, weatherRes, dealsRes] = await Promise.allSettled([
        fetch(`/api/live/events?location=${encodeURIComponent(location)}&limit=${compact ? 5 : 10}`),
        fetch(`/api/live/news?location=${encodeURIComponent(location)}&limit=${compact ? 3 : 6}`),
        fetch(`/api/live/weather?location=${encodeURIComponent(location)}`),
        fetch(`/api/live/deals?location=${encodeURIComponent(location)}&limit=${compact ? 4 : 8}`)
      ])

      if (eventsRes.status === 'fulfilled' && eventsRes.value.ok) {
        const data = await eventsRes.value.json()
        setEvents(data.events || [])
      }

      if (newsRes.status === 'fulfilled' && newsRes.value.ok) {
        const data = await newsRes.value.json()
        setNews(data.news || [])
      }

      if (weatherRes.status === 'fulfilled' && weatherRes.value.ok) {
        const data = await weatherRes.value.json()
        setWeather(data.weather)
      }

      if (dealsRes.status === 'fulfilled' && dealsRes.value.ok) {
        const data = await dealsRes.value.json()
        setDeals(data.deals || [])
      }

      setLastUpdated(new Date())
    } catch (err) {
      setError('Failed to load live data')
      console.error('Live data fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLiveData()

    // Refresh data every 15 minutes
    const interval = setInterval(fetchLiveData, 15 * 60 * 1000)

    return () => clearInterval(interval)
  }, [location])

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date)
  }

  const getWeatherIcon = (condition: string) => {
    const iconMap: { [key: string]: string } = {
      'Clear': '☀️',
      'Sunny': '☀️',
      'Partly Cloudy': '⛅',
      'Cloudy': '☁️',
      'Overcast': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Snow': '❄️',
      'Thunderstorm': '⛈️',
      'Fog': '🌫️'
    }
    return iconMap[condition] || '🌤️'
  }

  if (loading && !lastUpdated) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">⚠️ {error}</div>
        <button
          onClick={fetchLiveData}
          className="bg-pittsburgh-gold text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-pittsburgh-black">
            Live {location} Data
          </h2>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-1">
              Last updated: {formatDate(lastUpdated)}
            </p>
          )}
        </div>
        <button
          onClick={fetchLiveData}
          disabled={loading}
          className="flex items-center gap-2 bg-pittsburgh-gold text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Weather Card */}
      {weather && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Cloud className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Current Weather</h3>
                <p className="text-sm text-gray-600">{weather.location}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {getWeatherIcon(weather.conditions)} {weather.temperature}°F
              </div>
              <div className="text-sm text-gray-600">Feels like {weather.feelsLike}°F</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Conditions:</span>
              <div className="font-medium">{weather.conditions}</div>
            </div>
            <div>
              <span className="text-gray-600">Humidity:</span>
              <div className="font-medium">{weather.humidity}%</div>
            </div>
            <div>
              <span className="text-gray-600">Wind:</span>
              <div className="font-medium">{weather.windSpeed} mph {weather.windDirection}</div>
            </div>
            <div>
              <span className="text-gray-600">Visibility:</span>
              <div className="font-medium">Good</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-pittsburgh-gold to-yellow-400 p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-white" />
              <h3 className="text-lg font-semibold text-white">
                Upcoming Events ({events.length})
              </h3>
            </div>
          </div>

          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {events.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No upcoming events found</p>
            ) : (
              events.map((event) => (
                <div key={event.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                      {event.title}
                    </h4>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-2 whitespace-nowrap">
                      {event.category}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">
                    📅 {formatDate(event.startDate)}
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    📍 {event.location.name}
                  </div>
                  {event.price && (
                    <div className="text-xs font-medium text-green-600">
                      {typeof event.price === 'string' ? event.price : `$${event.price.min}+`}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* News Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
            <div className="flex items-center gap-3">
              <Newspaper className="w-6 h-6 text-white" />
              <h3 className="text-lg font-semibold text-white">
                Local News ({news.length})
              </h3>
            </div>
          </div>

          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {news.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent news found</p>
            ) : (
              news.map((article) => (
                <div key={article.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                  <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {article.summary}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{article.source}</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Deals Section */}
      {deals.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
            <div className="flex items-center gap-3">
              <Tag className="w-6 h-6 text-white" />
              <h3 className="text-lg font-semibold text-white">
                Current Deals ({deals.length})
              </h3>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {deals.map((deal) => (
                <div key={deal.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                    {deal.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    {deal.businessName}
                  </p>
                  <div className="text-sm font-semibold text-red-600 mb-1">
                    {deal.discount}
                  </div>
                  <div className="text-xs text-gray-500">
                    Expires: {deal.validUntil.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Data Sources Footer */}
      <div className="text-center text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Eventbrite
          </span>
          <span className="flex items-center gap-1">
            <Newspaper className="w-3 h-3" />
            NewsAPI
          </span>
          <span className="flex items-center gap-1">
            <Cloud className="w-3 h-3" />
            OpenWeather
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            Live Data Sources
          </span>
        </div>
        <p className="mt-2">Real-time data updates every 15 minutes</p>
      </div>
    </div>
  )
}
