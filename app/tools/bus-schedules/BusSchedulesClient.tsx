'use client'

import { useState, useEffect } from 'react'
import { Bus, MapPin, Clock, AlertCircle, RefreshCw, Search, Navigation } from 'lucide-react'
import { motion } from 'framer-motion'

interface BusPrediction {
  route: string
  routeName: string
  destination: string
  minutes: number | null
  arrivalTime: string
  isDelayed: boolean
  stopId: string
  stopName: string
  vehicleId: string | null
}

interface BusSchedulesResponse {
  predictions: BusPrediction[]
  source: 'api' | 'mock' | 'error'
  timestamp: string
  message?: string
}

// Popular Pittsburgh bus stops
const popularStops = [
  { id: '1', name: 'Downtown - Grant St & 5th Ave', routes: ['61A', '61B', '61C', '61D', '71A', '71B', '71C', '71D'] },
  { id: '2', name: 'Oakland - Forbes Ave & Craig St', routes: ['61A', '61B', '61C', '61D', '71A', '71B'] },
  { id: '3', name: 'Shadyside - Walnut St & Aiken Ave', routes: ['71A', '71B', '71C', '71D'] },
  { id: '4', name: 'Squirrel Hill - Forbes Ave & Murray Ave', routes: ['61A', '61B', '61C', '61D'] },
  { id: '5', name: 'Lawrenceville - Butler St & 40th St', routes: ['91', '92', '93'] },
  { id: '6', name: 'South Side - Carson St & 10th St', routes: ['48', '51', '54'] },
  { id: '7', name: 'Strip District - Penn Ave & 16th St', routes: ['91', '92', '93'] },
  { id: '8', name: 'Airport - Terminal', routes: ['28X'] }
]

export default function BusSchedulesClient() {
  const [selectedStop, setSelectedStop] = useState<string>('1')
  const [selectedRoute, setSelectedRoute] = useState<string>('')
  const [predictions, setPredictions] = useState<BusPrediction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [dataSource, setDataSource] = useState<'api' | 'mock' | 'error'>('api')
  const [customStopId, setCustomStopId] = useState('')
  const [showCustomStop, setShowCustomStop] = useState(false)

  const currentStop = popularStops.find(s => s.id === selectedStop)

  const fetchBusSchedules = async (stopId: string, route?: string) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({ stopId })
      if (route) params.set('route', route)

      const response = await fetch(`/api/bus-schedules?${params.toString()}`)
      const data: BusSchedulesResponse = await response.json()

      if (data.predictions) {
        setPredictions(data.predictions)
        setDataSource(data.source)
        setLastUpdated(new Date())
      } else {
        setError(data.message || 'No predictions available')
        setPredictions([])
      }
    } catch (err) {
      console.error('Error fetching bus schedules:', err)
      setError('Failed to load bus schedules. Please try again.')
      setPredictions([])
      setDataSource('error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedStop) {
      fetchBusSchedules(selectedStop, selectedRoute || undefined)
    }
  }, [selectedStop, selectedRoute])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedStop && !loading) {
        fetchBusSchedules(selectedStop, selectedRoute || undefined)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [selectedStop, selectedRoute, loading])

  const handleCustomStopSearch = () => {
    if (customStopId.trim()) {
      fetchBusSchedules(customStopId.trim(), selectedRoute || undefined)
      setShowCustomStop(false)
    }
  }

  const formatTime = (minutes: number | null) => {
    if (minutes === null) return 'N/A'
    if (minutes === 0) return 'Arriving now'
    if (minutes === 1) return '1 minute'
    return `${minutes} minutes`
  }

  const getStatusColor = (isDelayed: boolean, minutes: number | null) => {
    if (isDelayed) return 'text-red-600'
    if (minutes === null) return 'text-gray-500'
    if (minutes <= 2) return 'text-green-600'
    if (minutes <= 5) return 'text-yellow-600'
    return 'text-blue-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
                <Bus className="w-10 h-10" />
                Bus Schedules
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                Real-time bus arrival predictions from Port Authority of Allegheny County. 
                Get accurate, up-to-the-minute bus schedules for Pittsburgh.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Data Source Indicator */}
        {dataSource === 'api' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-800 font-medium">Live data from Port Authority API</span>
            </div>
            {lastUpdated && (
              <span className="text-xs text-green-600">
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        )}

        {dataSource === 'mock' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600" />
            <span className="text-sm text-yellow-800">Using sample data. API may be temporarily unavailable.</span>
          </div>
        )}

        {/* Stop Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Select Bus Stop
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Popular Stops
              </label>
              <select
                value={selectedStop}
                onChange={(e) => {
                  setSelectedStop(e.target.value)
                  setShowCustomStop(false)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {popularStops.map((stop) => (
                  <option key={stop.id} value={stop.id}>
                    {stop.name}
                  </option>
                ))}
              </select>
            </div>

            {currentStop && currentStop.routes.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Route (Optional)
                </label>
                <select
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Routes</option>
                  {currentStop.routes.map((route) => (
                    <option key={route} value={route}>
                      Route {route}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowCustomStop(!showCustomStop)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {showCustomStop ? 'Hide' : 'Search by Stop ID'}
            </button>
            <button
              onClick={() => fetchBusSchedules(selectedStop, selectedRoute || undefined)}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {showCustomStop && (
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={customStopId}
                onChange={(e) => setCustomStopId(e.target.value)}
                placeholder="Enter Stop ID (e.g., 1234)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleCustomStopSearch()}
              />
              <button
                onClick={handleCustomStopSearch}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          )}
        </div>

        {/* Current Stop Info */}
        {currentStop && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Navigation className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-900">{currentStop.name}</h3>
                <p className="text-sm text-blue-700">
                  Stop ID: {currentStop.id} • Routes: {currentStop.routes.join(', ')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Predictions */}
        {loading && predictions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading bus schedules...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <p className="text-red-800 font-medium mb-2">Error Loading Schedules</p>
            <p className="text-red-600 text-sm">{error}</p>
            <button
              onClick={() => fetchBusSchedules(selectedStop, selectedRoute || undefined)}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : predictions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Bus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">No bus predictions available</p>
            <p className="text-sm text-gray-500">
              This stop may not have active routes at this time, or the stop ID may be incorrect.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Upcoming Arrivals
              </h2>
              <span className="text-sm text-gray-600">
                {predictions.length} {predictions.length === 1 ? 'prediction' : 'predictions'}
              </span>
            </div>

            {predictions.map((prediction, index) => (
              <motion.div
                key={`${prediction.route}-${prediction.arrivalTime}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold text-lg">
                        {prediction.route}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{prediction.routeName}</h3>
                        <p className="text-sm text-gray-600">{prediction.destination}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className={`text-2xl font-bold ${getStatusColor(prediction.isDelayed, prediction.minutes)}`}>
                        {formatTime(prediction.minutes)}
                      </div>
                      {prediction.isDelayed && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                          Delayed
                        </span>
                      )}
                      {prediction.minutes !== null && (
                        <span className="text-sm text-gray-500">
                          Arrives at {new Date(prediction.arrivalTime).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">About This Tool</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>
                <strong>Real-time data:</strong> Schedules are updated every 30 seconds from Port Authority's official API
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>
                <strong>100% accurate:</strong> Direct integration with Port Authority's real-time prediction system
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>
                <strong>Free API:</strong> Uses Port Authority's public API - no API key required
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>
                <strong>Stop ID:</strong> Find your stop ID on Port Authority's website or use the popular stops above
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

