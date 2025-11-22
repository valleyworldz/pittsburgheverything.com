/**
 * GTFS Transit Service
 * Provides clean functions to query GTFS data for Pittsburgh Regional Transit
 * 
 * This service uses SQLite database populated from PRT GTFS static data
 * No API keys required - uses official GTFS schedule data
 */

import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const GTFS_DB_PATH = path.join(process.cwd(), 'data', 'gtfs', 'prt.sqlite')

// Ensure data directory exists
const dataDir = path.dirname(GTFS_DB_PATH)
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

let db: Database.Database | null = null

function getDb(): Database.Database {
  if (!db) {
    if (!fs.existsSync(GTFS_DB_PATH)) {
      throw new Error(
        `GTFS database not found at ${GTFS_DB_PATH}. Please run the GTFS import script first.`
      )
    }
    db = new Database(GTFS_DB_PATH, { readonly: true })
  }
  return db
}

export interface Route {
  route_id: string
  route_short_name: string
  route_long_name: string
  route_type: number | string
  route_color?: string
  route_text_color?: string
}

export interface Stop {
  stop_id: string
  stop_name: string
  stop_lat: number | string
  stop_lon: number | string
  stop_code?: string
  location_type?: number | string
  parent_station?: string
}

export interface StopTime {
  trip_id: string
  arrival_time: string
  departure_time: string
  stop_id: string
  stop_sequence: number
  pickup_type?: number
  drop_off_type?: number
}

export interface Trip {
  trip_id: string
  route_id: string
  service_id: string
  trip_headsign?: string
  direction_id?: number
  block_id?: string
  shape_id?: string
}

export interface ScheduleEntry {
  routeId: string
  routeName: string
  headsign: string
  arrivalTime: string
  departureTime: string
  stopSequence: number
  directionId?: number
}

/**
 * Get all routes
 */
export function getRoutes(): Route[] {
  const database = getDb()
  const stmt = database.prepare(`
    SELECT 
      route_id,
      route_short_name,
      route_long_name,
      CAST(route_type AS INTEGER) as route_type,
      route_color,
      route_text_color
    FROM routes
    WHERE route_short_name IS NOT NULL AND route_short_name != ''
    ORDER BY CAST(route_short_name AS INTEGER), route_short_name, route_long_name
  `)
  return stmt.all() as Route[]
}

/**
 * Get a specific route by ID
 */
export function getRoute(routeId: string): Route | null {
  const database = getDb()
  const stmt = database.prepare(`
    SELECT 
      route_id,
      route_short_name,
      route_long_name,
      route_type,
      route_color,
      route_text_color
    FROM routes
    WHERE route_id = ?
  `)
  return (stmt.get(routeId) as Route) || null
}

/**
 * Get all stops for a specific route
 */
export function getStopsForRoute(
  routeId: string,
  directionId?: number
): Stop[] {
  const database = getDb()
  
  let query = `
    SELECT DISTINCT 
      s.stop_id,
      s.stop_name,
      CAST(s.stop_lat AS REAL) as stop_lat,
      CAST(s.stop_lon AS REAL) as stop_lon,
      s.stop_code,
      s.location_type,
      s.parent_station
    FROM stops s
    JOIN stop_times st ON st.stop_id = s.stop_id
    JOIN trips t ON t.trip_id = st.trip_id
    WHERE t.route_id = ?
  `
  
  const params: any[] = [routeId]
  
  if (directionId !== undefined) {
    query += ' AND CAST(t.direction_id AS INTEGER) = ?'
    params.push(directionId)
  }
  
  query += ' ORDER BY s.stop_name'
  
  const stmt = database.prepare(query)
  const results = stmt.all(...params) as Stop[]
  return results.map(r => ({
    ...r,
    stop_lat: typeof r.stop_lat === 'string' ? parseFloat(r.stop_lat) : r.stop_lat,
    stop_lon: typeof r.stop_lon === 'string' ? parseFloat(r.stop_lon) : r.stop_lon
  }))
}

/**
 * Get schedule for a specific stop on a specific date
 */
export function getScheduleForStop(
  stopId: string,
  date: Date,
  routeId?: string
): ScheduleEntry[] {
  const database = getDb()
  
  // Determine day of week (0=Sunday, 6=Saturday)
  const dayOfWeek = date.getDay()
  const dayColumns = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const dayColumn = dayColumns[dayOfWeek]
  
  // Get active service_ids for this date
  const dateStr = date.toISOString().slice(0, 10) // YYYY-MM-DD
  
  // Check calendar.txt for regular service
  const calendarStmt = database.prepare(`
    SELECT service_id
    FROM calendar
    WHERE CAST(${dayColumn} AS INTEGER) = 1
      AND start_date <= ?
      AND end_date >= ?
  `)
  
  const calendarServices = calendarStmt.all(dateStr, dateStr) as Array<{ service_id: string }>
  
  // Check calendar_dates.txt for exceptions
  const exceptionsStmt = database.prepare(`
    SELECT service_id, CAST(exception_type AS INTEGER) as exception_type
    FROM calendar_dates
    WHERE date = ?
  `)
  
  const exceptions = exceptionsStmt.all(dateStr) as Array<{ service_id: string; exception_type: number }>
  
  // Build list of active service_ids
  // exception_type 1 = service added, 2 = service removed
  const activeServiceIds = new Set<string>()
  
  // Add services from calendar
  calendarServices.forEach(s => activeServiceIds.add(s.service_id))
  
  // Apply exceptions
  exceptions.forEach(ex => {
    if (ex.exception_type === 1) {
      activeServiceIds.add(ex.service_id) // Add service
    } else if (ex.exception_type === 2) {
      activeServiceIds.delete(ex.service_id) // Remove service
    }
  })
  
  if (activeServiceIds.size === 0) {
    return [] // No service on this date
  }
  
  // Get stop times for active services
  const serviceIdsArray = Array.from(activeServiceIds)
  const placeholders = serviceIdsArray.map(() => '?').join(',')
  
  let query = `
    SELECT
      t.route_id,
      r.route_short_name || ' - ' || COALESCE(r.route_long_name, '') as route_name,
      COALESCE(t.trip_headsign, '') as headsign,
      st.arrival_time,
      st.departure_time,
      CAST(st.stop_sequence AS INTEGER) as stop_sequence,
      CAST(t.direction_id AS INTEGER) as direction_id
    FROM stop_times st
    JOIN trips t ON t.trip_id = st.trip_id
    JOIN routes r ON r.route_id = t.route_id
    WHERE st.stop_id = ?
      AND t.service_id IN (${placeholders})
  `
  
  const params: any[] = [stopId, ...serviceIdsArray]
  
  if (routeId) {
    query += ' AND t.route_id = ?'
    params.push(routeId)
  }
  
  query += ' ORDER BY st.arrival_time'
  
  const stmt = database.prepare(query)
  const results = stmt.all(...params) as Array<{
    route_id: string
    route_name: string
    headsign: string
    arrival_time: string
    departure_time: string
    stop_sequence: number
    direction_id: number | null
  }>
  
  return results.map(r => ({
    routeId: r.route_id,
    routeName: r.route_name,
    headsign: r.headsign,
    arrivalTime: r.arrival_time,
    departureTime: r.departure_time,
    stopSequence: r.stop_sequence,
    directionId: r.direction_id ?? undefined
  }))
}

/**
 * Get a specific stop by ID
 */
export function getStop(stopId: string): Stop | null {
  const database = getDb()
  const stmt = database.prepare(`
    SELECT 
      stop_id,
      stop_name,
      CAST(stop_lat AS REAL) as stop_lat,
      CAST(stop_lon AS REAL) as stop_lon,
      stop_code,
      location_type,
      parent_station
    FROM stops
    WHERE stop_id = ?
  `)
  const result = stmt.get(stopId) as Stop | undefined
  if (result && typeof result.stop_lat === 'string') {
    result.stop_lat = parseFloat(result.stop_lat)
    result.stop_lon = parseFloat(result.stop_lon as string)
  }
  return result || null
}

/**
 * Search stops by name
 */
export function searchStops(query: string, limit: number = 20): Stop[] {
  const database = getDb()
  const searchTerm = `%${query}%`
  const stmt = database.prepare(`
    SELECT 
      stop_id,
      stop_name,
      stop_lat,
      stop_lon,
      stop_code,
      location_type,
      parent_station
    FROM stops
    WHERE stop_name LIKE ? OR stop_code LIKE ?
    ORDER BY stop_name
    LIMIT ?
  `)
  return stmt.all(searchTerm, searchTerm, limit) as Stop[]
}

/**
 * Get stops near a location (using Haversine formula)
 */
export function getStopsNear(
  lat: number,
  lon: number,
  radiusMeters: number = 500
): Array<Stop & { distance: number }> {
  const database = getDb()
  
  // Haversine formula approximation
  // For small distances, we can use a simpler bounding box first
  const latDelta = radiusMeters / 111000 // roughly 1 degree = 111km
  const lonDelta = radiusMeters / (111000 * Math.cos(lat * Math.PI / 180))
  
  const stmt = database.prepare(`
    SELECT 
      stop_id,
      stop_name,
      CAST(stop_lat AS REAL) as stop_lat,
      CAST(stop_lon AS REAL) as stop_lon,
      stop_code,
      location_type,
      parent_station,
      (
        6371000 * acos(
          cos(radians(?)) * cos(radians(CAST(stop_lat AS REAL))) *
          cos(radians(CAST(stop_lon AS REAL)) - radians(?)) +
          sin(radians(?)) * sin(radians(CAST(stop_lat AS REAL)))
        )
      ) as distance
    FROM stops
    WHERE CAST(stop_lat AS REAL) BETWEEN ? AND ?
      AND CAST(stop_lon AS REAL) BETWEEN ? AND ?
    HAVING distance <= ?
    ORDER BY distance
    LIMIT 50
  `)
  
  const results = stmt.all(
    lat, lon, lat, // for acos
    lat - latDelta, lat + latDelta,
    lon - lonDelta, lon + lonDelta,
    radiusMeters
  ) as Array<Stop & { distance: number }>
  
  return results.map(r => ({
    ...r,
    stop_lat: typeof r.stop_lat === 'string' ? parseFloat(r.stop_lat) : r.stop_lat,
    stop_lon: typeof r.stop_lon === 'string' ? parseFloat(r.stop_lon) : r.stop_lon
  }))
}

/**
 * Get trips for a route
 */
export function getTripsForRoute(
  routeId: string,
  serviceId?: string
): Trip[] {
  const database = getDb()
  
  let query = `
    SELECT 
      trip_id,
      route_id,
      service_id,
      trip_headsign,
      direction_id,
      block_id,
      shape_id
    FROM trips
    WHERE route_id = ?
  `
  
  const params: any[] = [routeId]
  
  if (serviceId) {
    query += ' AND service_id = ?'
    params.push(serviceId)
  }
  
  query += ' ORDER BY trip_headsign, direction_id'
  
  const stmt = database.prepare(query)
  return stmt.all(...params) as Trip[]
}

/**
 * Get all stops served by multiple routes
 */
export function getStopsWithRoutes(): Array<Stop & { routes: string[] }> {
  const database = getDb()
  const stmt = database.prepare(`
    SELECT DISTINCT
      s.stop_id,
      s.stop_name,
      s.stop_lat,
      s.stop_lon,
      s.stop_code,
      s.location_type,
      s.parent_station,
      GROUP_CONCAT(DISTINCT t.route_id) as routes
    FROM stops s
    JOIN stop_times st ON st.stop_id = s.stop_id
    JOIN trips t ON t.trip_id = st.trip_id
    GROUP BY s.stop_id
    ORDER BY s.stop_name
  `)
  
  const results = stmt.all() as Array<Stop & { routes: string }>
  
  return results.map(r => ({
    ...r,
    routes: r.routes ? r.routes.split(',') : []
  }))
}

/**
 * Check if GTFS database exists and is valid
 */
export function isGtfsAvailable(): boolean {
  try {
    if (!fs.existsSync(GTFS_DB_PATH)) {
      return false
    }
    const database = new Database(GTFS_DB_PATH, { readonly: true })
    const stmt = database.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='routes'")
    const result = stmt.get()
    database.close()
    return !!result
  } catch {
    return false
  }
}

/**
 * Close database connection (for cleanup)
 */
export function closeDb(): void {
  if (db) {
    db.close()
    db = null
  }
}

