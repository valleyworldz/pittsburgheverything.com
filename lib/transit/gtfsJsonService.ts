/**
 * GTFS JSON Service
 * Lightweight JSON-based GTFS service for serverless environments
 * Falls back to JSON when SQLite is unavailable
 */

import fs from 'fs'
import path from 'path'
import type { Stop, Route } from './gtfsService'

const JSON_DATA_DIR = path.join(process.cwd(), 'data', 'gtfs', 'json')

interface RouteJson {
  route_id: string
  route_short_name: string
  route_long_name: string
}

let stopsCache: Stop[] | null = null
let stopsIndexCache: Record<string, string[]> | null = null
let routesCache: RouteJson[] | null = null
let stopRoutesCache: Record<string, string[]> | null = null

function loadStops(): Stop[] {
  if (stopsCache) return stopsCache
  
  const filePath = path.join(JSON_DATA_DIR, 'stops.json')
  if (!fs.existsSync(filePath)) {
    return []
  }
  
  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    stopsCache = JSON.parse(data) as Stop[]
    return stopsCache
  } catch (error) {
    console.error('Error loading stops JSON:', error)
    return []
  }
}

function loadStopsIndex(): Record<string, string[]> {
  if (stopsIndexCache) return stopsIndexCache
  
  const filePath = path.join(JSON_DATA_DIR, 'stops-index.json')
  if (!fs.existsSync(filePath)) {
    return {}
  }
  
  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    stopsIndexCache = JSON.parse(data) as Record<string, string[]>
    return stopsIndexCache
  } catch (error) {
    console.error('Error loading stops index JSON:', error)
    return {}
  }
}

function loadRoutes(): RouteJson[] {
  if (routesCache) return routesCache
  
  const filePath = path.join(JSON_DATA_DIR, 'routes.json')
  if (!fs.existsSync(filePath)) {
    return []
  }
  
  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    routesCache = JSON.parse(data) as RouteJson[]
    return routesCache
  } catch (error) {
    console.error('Error loading routes JSON:', error)
    return []
  }
}

function loadStopRoutes(): Record<string, string[]> {
  if (stopRoutesCache) return stopRoutesCache
  
  const filePath = path.join(JSON_DATA_DIR, 'stop-routes.json')
  if (!fs.existsSync(filePath)) {
    return {}
  }
  
  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    stopRoutesCache = JSON.parse(data) as Record<string, string[]>
    return stopRoutesCache
  } catch (error) {
    console.error('Error loading stop-routes JSON:', error)
    return {}
  }
}

export function isJsonGtfsAvailable(): boolean {
  const stopsFile = path.join(JSON_DATA_DIR, 'stops.json')
  return fs.existsSync(stopsFile)
}

export function searchStopsJson(query: string, limit: number = 20): Stop[] {
  if (!isJsonGtfsAvailable()) {
    return []
  }

  const stops = loadStops()
  const index = loadStopsIndex()
  const queryLower = query.toLowerCase().trim()

  // Search in index
  const matchingStopIds = new Set<string>()
  
  // Exact match
  if (index[queryLower]) {
    index[queryLower].forEach(id => matchingStopIds.add(id))
  }

  // Partial matches
  Object.keys(index).forEach(key => {
    if (key.includes(queryLower) && queryLower.length >= 2) {
      index[key].forEach(id => matchingStopIds.add(id))
    }
  })

  // Also search stop names directly
  stops.forEach(stop => {
    if (
      stop.stop_name.toLowerCase().includes(queryLower) ||
      stop.stop_id.includes(query) ||
      stop.stop_code?.toLowerCase().includes(queryLower)
    ) {
      matchingStopIds.add(stop.stop_id)
    }
  })

  // Get matching stops
  const matchingStops = Array.from(matchingStopIds)
    .map(id => stops.find(s => s.stop_id === id))
    .filter((stop): stop is Stop => stop !== undefined)
    .slice(0, limit)

  return matchingStops
}

export function getStopsNearJson(
  lat: number,
  lon: number,
  radiusMeters: number = 500
): Array<Stop & { distance: number }> {
  if (!isJsonGtfsAvailable()) {
    return []
  }

  const stops = loadStops()
  const results: Array<Stop & { distance: number }> = []

  for (const stop of stops) {
    const stopLat = typeof stop.stop_lat === 'string' ? parseFloat(stop.stop_lat) : stop.stop_lat
    const stopLon = typeof stop.stop_lon === 'string' ? parseFloat(stop.stop_lon) : stop.stop_lon

    if (isNaN(stopLat) || isNaN(stopLon)) continue

    // Haversine formula
    const R = 6371000 // Earth radius in meters
    const dLat = (stopLat - lat) * Math.PI / 180
    const dLon = (stopLon - lon) * Math.PI / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat * Math.PI / 180) * Math.cos(stopLat * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    if (distance <= radiusMeters) {
      results.push({ ...stop, distance })
    }
  }

  return results.sort((a, b) => a.distance - b.distance).slice(0, 50)
}

export function getRoutesJson(): Route[] {
  const routesJson = loadRoutes()
  // Convert RouteJson[] to Route[]
  return routesJson.map(r => ({
    route_id: r.route_id,
    route_short_name: r.route_short_name,
    route_long_name: r.route_long_name,
    route_type: 3, // Default to bus (GTFS route_type 3)
    route_color: undefined,
    route_text_color: undefined
  }))
}

export function getStopJson(stopId: string): Stop | null {
  const stops = loadStops()
  return stops.find(s => s.stop_id === stopId) || null
}

export function getStopsForRouteJson(routeId: string): Stop[] {
  if (!isJsonGtfsAvailable()) {
    return []
  }

  const stops = loadStops()
  const stopRoutes = loadStopRoutes()
  const matchingStopIds = stopRoutes[routeId] || []
  
  return stops.filter(s => matchingStopIds.includes(s.stop_id))
}

