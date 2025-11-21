'use client'

import { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, Wind, Thermometer, Calendar, Clock, MapPin, Users, Bus, Car, Newspaper } from 'lucide-react'
import {
  getPittsburghWeather,
  getSteelersGames,
  getBusArrivals,
  getParkingAvailability,
  getPittsburghNews,
  type WeatherData,
  type SportsEvent,
  type TransitData,
  type ParkingData
} from '@/utils/apiIntegrations'

interface RealTimeDashboardProps {
  compact?: boolean
}

export default function RealTimeDashboard({ compact = false }: RealTimeDashboardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [steelersGames, setSteelersGames] = useState<SportsEvent[]>([])
  const [transitData, setTransitData] = useState<TransitData[]>([])
  const [parkingData, setParkingData] = useState<ParkingData[]>([])
  const [newsData, setNewsData] = useState<Array<{title: string, description: string, url: string, publishedAt: string}>>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    loadRealTimeData()

    // Update data every 5 minutes
    const interval = setInterval(loadRealTimeData, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const loadRealTimeData = async () => {
    try {
      const [
        weatherData,
        gamesData,
        transitInfo,
        parkingInfo,
        newsInfo
      ] = await Promise.all([
        getPittsburghWeather(),
        getSteelersGames(),
        getBusArrivals(),
        getParkingAvailability(),
        getPittsburghNews()
      ])

      setWeather(weatherData)
      setSteelersGames(gamesData.slice(0, compact ? 1 : 3))
      setTransitData(transitInfo.slice(0, compact ? 2 : 5))
      setParkingData(parkingInfo.slice(0, compact ? 2 : 4))
      setNewsData(newsInfo.slice(0, compact ? 2 : 3))
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to load real-time data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="w-6 h-6 text-yellow-500" />
      case 'cloudy':
      case 'overcast':
        return <Cloud className="w-6 h-6 text-gray-500" />
      case 'rainy':
      case 'rain':
        return <CloudRain className="w-6 h-6 text-blue-500" />
      default:
        return <Cloud className="w-6 h-6 text-gray-400" />
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-pittsburgh-black">Real-Time Pittsburgh</h2>
        <div className="text-sm text-steel-gray">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      {/* Weather */}
      {weather && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center gap-4 mb-4">
            {getWeatherIcon(weather.condition)}
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Current Weather</h3>
              <p className="text-sm text-blue-700">Pittsburgh, PA</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900">{weather.temperature}°F</div>
              <div className="text-sm text-blue-700">{weather.condition}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Wind className="w-4 h-4 text-blue-600" />
                <span className="text-lg font-semibold text-blue-900">{weather.windSpeed}</span>
              </div>
              <div className="text-sm text-blue-700">mph wind</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Thermometer className="w-4 h-4 text-blue-600" />
                <span className="text-lg font-semibold text-blue-900">{weather.humidity}%</span>
              </div>
              <div className="text-sm text-blue-700">humidity</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-900">
                {weather.forecast[0]?.high || 'N/A'}°
              </div>
              <div className="text-sm text-blue-700">High today</div>
            </div>
          </div>
        </div>
      )}

      {/* Grid Layout for Other Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Steelers Games */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-pittsburgh-gold" />
            <h3 className="font-semibold text-pittsburgh-black">Steelers Games</h3>
          </div>
          <div className="space-y-3">
            {steelersGames.map((game) => (
              <div key={game.id} className="border-l-4 border-pittsburgh-gold pl-3 py-2">
                <div className="text-sm font-medium text-pittsburgh-black">
                  {game.awayTeam} @ {game.homeTeam}
                </div>
                <div className="flex items-center gap-2 text-xs text-steel-gray">
                  <Calendar className="w-3 h-3" />
                  {new Date(game.date).toLocaleDateString()}
                  <Clock className="w-3 h-3 ml-2" />
                  {game.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transit Data */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bus className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-pittsburgh-black">Bus Arrivals</h3>
          </div>
          <div className="space-y-3">
            {transitData.map((bus, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <div className="font-medium text-sm text-pittsburgh-black">
                    Route {bus.route}
                  </div>
                  <div className="text-xs text-steel-gray">{bus.destination}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-sm text-pittsburgh-black">
                    {bus.nextArrival}
                  </div>
                  <div className={`text-xs ${bus.status === 'delayed' ? 'text-red-500' : 'text-green-600'}`}>
                    {bus.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Parking */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Car className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-pittsburgh-black">Parking</h3>
          </div>
          <div className="space-y-3">
            {parkingData.map((parking, index) => (
              <div key={index} className="py-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-pittsburgh-black">
                    {parking.location}
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    {parking.availableSpaces}/{parking.totalSpaces}
                  </span>
                </div>
                <div className="text-xs text-steel-gray">
                  ${parking.price}/hr • Updated {new Date(parking.lastUpdated).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local News */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-pittsburgh-black">Local News</h3>
          </div>
          <div className="space-y-3">
            {newsData.map((news, index) => (
              <div key={index} className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0">
                <h4 className="text-sm font-medium text-pittsburgh-black line-clamp-2 mb-1">
                  {news.title}
                </h4>
                <div className="text-xs text-steel-gray">
                  {new Date(news.publishedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-steel-gray">
        <p>Data provided by free public APIs • Updates every 5 minutes</p>
        <p className="mt-1">Weather: OpenWeatherMap • Sports: ESPN • Transit: Port Authority • News: NewsAPI</p>
      </div>
    </div>
  )
}
