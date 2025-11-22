/**
 * Convert GTFS SQLite to JSON format for serverless compatibility
 * Creates lightweight JSON files that work in serverless environments
 * 
 * Usage: npm run transit:convert-json
 */

import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'

const GTFS_DB_PATH = path.join(process.cwd(), 'data', 'gtfs', 'prt.sqlite')
const JSON_OUTPUT_DIR = path.join(process.cwd(), 'data', 'gtfs', 'json')

interface Stop {
  stop_id: string
  stop_name: string
  stop_lat: number
  stop_lon: number
  stop_code?: string
}

interface Route {
  route_id: string
  route_short_name: string
  route_long_name: string
}

async function convertToJson(): Promise<void> {
  console.log('🔄 Converting GTFS SQLite to JSON format...\n')

  if (!fs.existsSync(GTFS_DB_PATH)) {
    console.error('❌ GTFS database not found. Please run: npm run transit:import')
    process.exit(1)
  }

  // Create output directory
  if (!fs.existsSync(JSON_OUTPUT_DIR)) {
    fs.mkdirSync(JSON_OUTPUT_DIR, { recursive: true })
  }

  try {
    const db = new Database(GTFS_DB_PATH, { readonly: true })

    // Convert stops to JSON
    console.log('📝 Converting stops...')
    const stops = db.prepare(`
      SELECT 
        stop_id,
        stop_name,
        CAST(stop_lat AS REAL) as stop_lat,
        CAST(stop_lon AS REAL) as stop_lon,
        stop_code
      FROM stops
      ORDER BY stop_name
    `).all() as Stop[]

    // Create search index (lowercase for case-insensitive search)
    const stopsIndex: Record<string, string[]> = {}
    stops.forEach(stop => {
      const searchTerms = [
        stop.stop_name.toLowerCase(),
        stop.stop_id,
        stop.stop_code?.toLowerCase() || ''
      ].filter(Boolean)

      searchTerms.forEach(term => {
        if (!stopsIndex[term]) {
          stopsIndex[term] = []
        }
        if (!stopsIndex[term].includes(stop.stop_id)) {
          stopsIndex[term].push(stop.stop_id)
        }
      })
    })

    // Save stops and index
    fs.writeFileSync(
      path.join(JSON_OUTPUT_DIR, 'stops.json'),
      JSON.stringify(stops, null, 2)
    )
    fs.writeFileSync(
      path.join(JSON_OUTPUT_DIR, 'stops-index.json'),
      JSON.stringify(stopsIndex, null, 2)
    )
    console.log(`✅ Converted ${stops.length} stops`)

    // Convert routes to JSON
    console.log('📝 Converting routes...')
    const routes = db.prepare(`
      SELECT 
        route_id,
        route_short_name,
        route_long_name
      FROM routes
      WHERE route_short_name IS NOT NULL AND route_short_name != ''
      ORDER BY CAST(route_short_name AS INTEGER), route_short_name
    `).all() as Route[]

    fs.writeFileSync(
      path.join(JSON_OUTPUT_DIR, 'routes.json'),
      JSON.stringify(routes, null, 2)
    )
    console.log(`✅ Converted ${routes.length} routes`)

    // Create stop-to-routes mapping (for quick lookup)
    console.log('📝 Creating stop-to-routes mapping...')
    const stopRoutes = db.prepare(`
      SELECT DISTINCT
        st.stop_id,
        t.route_id
      FROM stop_times st
      JOIN trips t ON t.trip_id = st.trip_id
    `).all() as Array<{ stop_id: string; route_id: string }>

    const stopRoutesMap: Record<string, string[]> = {}
    stopRoutes.forEach(({ stop_id, route_id }) => {
      if (!stopRoutesMap[stop_id]) {
        stopRoutesMap[stop_id] = []
      }
      if (!stopRoutesMap[stop_id].includes(route_id)) {
        stopRoutesMap[stop_id].push(route_id)
      }
    })

    fs.writeFileSync(
      path.join(JSON_OUTPUT_DIR, 'stop-routes.json'),
      JSON.stringify(stopRoutesMap, null, 2)
    )
    console.log(`✅ Created mapping for ${Object.keys(stopRoutesMap).length} stops`)

    db.close()

    const totalSize = [
      path.join(JSON_OUTPUT_DIR, 'stops.json'),
      path.join(JSON_OUTPUT_DIR, 'stops-index.json'),
      path.join(JSON_OUTPUT_DIR, 'routes.json'),
      path.join(JSON_OUTPUT_DIR, 'stop-routes.json')
    ].reduce((sum, file) => {
      if (fs.existsSync(file)) {
        return sum + fs.statSync(file).size
      }
      return sum
    }, 0)

    console.log(`\n✅ Conversion complete!`)
    console.log(`   Total JSON size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`)
    console.log(`   Output directory: ${JSON_OUTPUT_DIR}`)
    console.log(`\n💡 JSON files work in serverless environments!`)

  } catch (error: any) {
    console.error('❌ Conversion failed:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  convertToJson()
}

export { convertToJson }

