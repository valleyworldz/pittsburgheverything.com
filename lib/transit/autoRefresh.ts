/**
 * Auto-refresh GTFS data
 * Checks and refreshes GTFS data on application startup and periodically
 */

import { isGtfsAvailable } from './gtfsService'
import fs from 'fs'
import path from 'path'

const GTFS_DB_PATH = path.join(process.cwd(), 'data', 'gtfs', 'prt.sqlite')
const REFRESH_INTERVAL_DAYS = 7 // Refresh if data is older than 7 days

/**
 * Check if GTFS data needs refresh
 */
export function shouldRefreshGtfs(): boolean {
  if (!fs.existsSync(GTFS_DB_PATH)) {
    return true // No database, needs import
  }

  const stats = fs.statSync(GTFS_DB_PATH)
  const ageDays = (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60 * 24)
  
  return ageDays > REFRESH_INTERVAL_DAYS
}

/**
 * Get GTFS data age in days
 */
export function getGtfsAge(): number | null {
  if (!fs.existsSync(GTFS_DB_PATH)) {
    return null
  }

  const stats = fs.statSync(GTFS_DB_PATH)
  return Math.floor((Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60 * 24))
}

/**
 * Initialize GTFS auto-refresh
 * Call this on application startup
 */
export async function initGtfsAutoRefresh(): Promise<void> {
  if (process.env.NODE_ENV === 'development') {
    // Skip auto-refresh in development
    return
  }

  if (!isGtfsAvailable()) {
    console.log('⚠️  GTFS data not available. Run: npm run transit:import')
    return
  }

  if (shouldRefreshGtfs()) {
    const age = getGtfsAge()
    console.log(`🔄 GTFS data is ${age} days old. Consider refreshing: npm run transit:refresh`)
    
    // Optionally trigger refresh in background (uncomment if desired)
    // Note: This requires the refresh endpoint to be accessible
    /*
    try {
      const baseUrl = process.env.SITE_URL || 'http://localhost:3000'
      await fetch(`${baseUrl}/api/transit/refresh`, { method: 'POST' })
      console.log('✅ GTFS refresh triggered')
    } catch (error) {
      console.log('⚠️  Could not trigger auto-refresh:', error)
    }
    */
  } else {
    const age = getGtfsAge()
    console.log(`✅ GTFS data is up to date (${age} days old)`)
  }
}

