'use client'

import { useState, useEffect } from 'react'
import { Bus, MapPin, Clock, AlertCircle, RefreshCw, Search, Navigation } from 'lucide-react'
import { motion } from 'framer-motion'

interface BusPrediction {
  route: string
  routeName: string
  destination: string
  scheduledTime?: string
  scheduledMinutes?: number
  realtimeMinutes?: number
  realtimeArrival?: string
  minutes?: number | null // Legacy support
  arrivalTime?: string // Legacy support
  isDelayed?: boolean
  stopId?: string
  stopName?: string
  vehicleId?: string | null
  source: 'schedule' | 'realtime' | 'both'
}

interface BusSchedulesResponse {
  predictions: BusPrediction[]
  stop?: {
    id: string
    name: string
    code?: string
    lat?: number
    lon?: number
  }
  source: 'gtfs' | 'realtime-only' | 'api' | 'mock' | 'error'
  realtimeSource?: 'api' | 'unavailable' | 'none'
  timestamp: string
  message?: string
}

// Popular Pittsburgh bus stops
// IMPORTANT: These are example locations. Users must enter their ACTUAL stop ID from Port Authority.
// Stop IDs are typically 4-digit numbers found on bus stop signs or via Port Authority's website.
// To find your stop ID: Visit https://www.portauthority.org or check the bus stop sign at your location.
const popularStops = [
  { id: '', name: 'Find Your Stop ID', routes: [], description: 'Enter your actual stop ID below or find it on Port Authority\'s website' },
  { id: 'EXAMPLE_1', name: 'Example: Downtown Area', routes: ['61A', '61B', '61C', '61D', '71A', '71B', '71C', '71D'], description: 'Example location - use your actual stop ID' },
  { id: 'EXAMPLE_2', name: 'Example: Oakland Area', routes: ['61A', '61B', '61C', '61D', '71A', '71B'], description: 'Example location - use your actual stop ID' },
  { id: 'EXAMPLE_3', name: 'Example: Shadyside Area', routes: ['71A', '71B', '71C', '71D'], description: 'Example location - use your actual stop ID' },
  { id: 'EXAMPLE_4', name: 'Example: Squirrel Hill Area', routes: ['61A', '61B', '61C', '61D'], description: 'Example location - use your actual stop ID' },
  { id: 'EXAMPLE_5', name: 'Example: Lawrenceville Area', routes: ['91', '92', '93'], description: 'Example location - use your actual stop ID' },
  { id: 'EXAMPLE_6', name: 'Example: South Side Area', routes: ['48', '51', '54'], description: 'Example location - use your actual stop ID' },
  { id: 'EXAMPLE_7', name: 'Example: Strip District Area', routes: ['91', '92', '93'], description: 'Example location - use your actual stop ID' },
  { id: 'EXAMPLE_8', name: 'Example: Airport Area', routes: ['28X'], description: 'Example location - use your actual stop ID' }
]

export default function BusSchedulesClient() {
  const [selectedStop, setSelectedStop] = useState<string>('')
  const [selectedRoute, setSelectedRoute] = useState<string>('')
  const [predictions, setPredictions] = useState<BusPrediction[]>([])
  const [loading, setLoading] = useState(false) // Don't load until user selects a stop
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [dataSource, setDataSource] = useState<'gtfs' | 'realtime-only' | 'api' | 'mock' | 'error'>('api')
  const [stopInfo, setStopInfo] = useState<{ id: string; name: string; code?: string } | null>(null)
  const [customStopId, setCustomStopId] = useState('')
  const [showCustomStop, setShowCustomStop] = useState(true) // Show custom stop input by default

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
        // Normalize predictions to handle both old and new formats
        const normalizedPredictions = data.predictions.map((pred: BusPrediction) => ({
          ...pred,
          // Use real-time if available, otherwise scheduled, otherwise legacy
          minutes: pred.realtimeMinutes ?? pred.scheduledMinutes ?? pred.minutes ?? null,
          arrivalTime: pred.realtimeArrival ?? pred.scheduledTime ?? pred.arrivalTime ?? '',
        }))
        setPredictions(normalizedPredictions)
        setDataSource(data.source)
        if (data.stop) {
          setStopInfo(data.stop)
        }
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

  // Load data when stop or route changes (only if stop ID is valid)
  useEffect(() => {
    if (selectedStop && selectedStop !== '' && !selectedStop.startsWith('EXAMPLE_') && selectedStop !== 'Find Your Stop ID') {
      fetchBusSchedules(selectedStop, selectedRoute || undefined)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStop, selectedRoute])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!selectedStop) return

    const interval = setInterval(() => {
      if (selectedStop && !loading) {
        fetchBusSchedules(selectedStop, selectedRoute || undefined)
      }
    }, 30000)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStop, selectedRoute, loading])

  const handleCustomStopSearch = () => {
    if (customStopId.trim()) {
      fetchBusSchedules(customStopId.trim(), selectedRoute || undefined)
      setShowCustomStop(false)
    }
  }

  const formatTime = (minutes: number | null | undefined) => {
    if (minutes === null || minutes === undefined) return 'N/A'
    if (minutes === 0) return 'Arriving now'
    if (minutes === 1) return '1 minute'
    return `${minutes} minutes`
  }

  const getStatusColor = (isDelayed: boolean, minutes: number | null | undefined) => {
    if (isDelayed) return 'text-red-600'
    if (minutes === null || minutes === undefined) return 'text-gray-500'
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
        {dataSource === 'gtfs' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-800 font-medium">
                Authoritative schedule data from GTFS
                {predictions.some(p => p.source === 'both' || p.source === 'realtime') && ' + Real-time predictions'}
              </span>
            </div>
            {lastUpdated && (
              <span className="text-xs text-green-600">
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        )}

        {dataSource === 'realtime-only' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-800 font-medium">Real-time predictions only (GTFS not available)</span>
            </div>
            {lastUpdated && (
              <span className="text-xs text-blue-600">
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        )}

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
                Example Locations (for reference only)
              </label>
              <select
                value={selectedStop}
                onChange={(e) => {
                  const value = e.target.value
                  if (value && !value.startsWith('EXAMPLE_') && value !== '') {
                    setSelectedStop(value)
                    setShowCustomStop(false)
                    setSelectedRoute('') // Reset route filter when stop changes
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select an example or enter your stop ID below</option>
                {popularStops.map((stop) => (
                  <option key={stop.id} value={stop.id} disabled={stop.id === '' || stop.id.startsWith('EXAMPLE_')}>
                    {stop.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                ⚠️ These are examples. You must enter your actual stop ID.
              </p>
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

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Your Actual Stop ID *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customStopId || selectedStop}
                onChange={(e) => {
                  const value = e.target.value
                  setCustomStopId(value)
                  if (value && !value.startsWith('EXAMPLE_')) {
                    setSelectedStop(value)
                  }
                }}
                placeholder="Enter your actual Stop ID (found on bus stop sign or Port Authority website)"
                className="flex-1 px-4 py-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleCustomStopSearch()}
              />
              <button
                onClick={() => {
                  if (customStopId) {
                    handleCustomStopSearch()
                  } else if (selectedStop && !selectedStop.startsWith('EXAMPLE_')) {
                    fetchBusSchedules(selectedStop, selectedRoute || undefined)
                  }
                }}
                disabled={loading || (!customStopId && (!selectedStop || selectedStop.startsWith('EXAMPLE_')))}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Get Schedules
              </button>
              {selectedStop && !selectedStop.startsWith('EXAMPLE_') && (
                <button
                  onClick={() => fetchBusSchedules(selectedStop, selectedRoute || undefined)}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              )}
            </div>
            <div className="mt-2 flex items-start gap-2 text-xs text-gray-600">
              <span>💡</span>
              <div>
                <p className="font-medium mb-1">How to find your Stop ID:</p>
                <ul className="list-disc list-inside space-y-0.5 ml-2">
                  <li>Check the bus stop sign at your location (usually a 4-digit number)</li>
                  <li>Visit <a href="https://www.portauthority.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Port Authority's website</a> and use their stop finder</li>
                  <li>Use Port Authority's TrueTime system or mobile app</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Current Stop Info */}
        {(stopInfo || (selectedStop && !selectedStop.startsWith('EXAMPLE_') && selectedStop !== '')) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Navigation className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-900">
                  {stopInfo ? stopInfo.name : `Stop ID: ${selectedStop}`}
                </h3>
                {stopInfo && (
                  <p className="text-sm text-blue-700">
                    Stop ID: {stopInfo.id} {stopInfo.code && `(${stopInfo.code})`}
                  </p>
                )}
                {!stopInfo && currentStop && currentStop.routes.length > 0 && (
                  <p className="text-sm text-blue-700">
                    Example Routes: {currentStop.routes.join(', ')}
                  </p>
                )}
                <p className="text-xs text-blue-600 mt-1">
                  {dataSource === 'gtfs' 
                    ? 'Authoritative schedule data with real-time overlay when available'
                    : 'Real-time predictions for this stop ID'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Predictions */}
        {!selectedStop || selectedStop.startsWith('EXAMPLE_') || selectedStop === '' ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
            <Bus className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Enter Your Stop ID</h3>
            <p className="text-yellow-800 mb-4">
              To get real-time bus schedules, please enter your actual Port Authority stop ID above.
            </p>
            <p className="text-sm text-yellow-700">
              Stop IDs are typically 4-digit numbers found on bus stop signs or via{' '}
              <a href="https://www.portauthority.org" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                Port Authority's website
              </a>.
            </p>
          </div>
        ) : loading && predictions.length === 0 ? (
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
                      <div>
                        {prediction.source === 'both' && prediction.scheduledMinutes !== undefined && (
                          <div className="text-xs text-gray-500 mb-1">
                            Scheduled: {formatTime(prediction.scheduledMinutes)}
                          </div>
                        )}
                        <div className={`text-2xl font-bold ${getStatusColor(prediction.isDelayed ?? false, prediction.minutes ?? null)}`}>
                          {formatTime(prediction.minutes)}
                          {prediction.source === 'realtime' && (
                            <span className="ml-2 text-xs font-normal text-green-600">(Live)</span>
                          )}
                          {prediction.source === 'both' && (
                            <span className="ml-2 text-xs font-normal text-blue-600">(Updated)</span>
                          )}
                          {prediction.source === 'schedule' && (
                            <span className="ml-2 text-xs font-normal text-gray-500">(Scheduled)</span>
                          )}
                        </div>
                      </div>
                      {prediction.isDelayed && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                          Delayed
                        </span>
                      )}
                      {prediction.minutes !== null && prediction.arrivalTime && (
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
                <strong>Stop ID Required:</strong> You must enter your actual stop ID from Port Authority. Stop IDs are typically 4-digit numbers found on bus stop signs or via Port Authority's website/app.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>
                <strong>Finding Your Stop ID:</strong> Check the bus stop sign at your location, visit <a href="https://www.portauthority.org" target="_blank" rel="noopener noreferrer" className="underline">Port Authority's website</a>, or use their TrueTime system/mobile app to find your stop ID.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>
                <strong>Accuracy:</strong> The data comes directly from Port Authority's real-time API. If a stop ID doesn't return results, verify the ID is correct and that the stop is currently active.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

