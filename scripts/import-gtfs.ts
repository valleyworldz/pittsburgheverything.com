/**
 * GTFS Import Script
 * Downloads and imports Pittsburgh Regional Transit GTFS data
 * 
 * Usage: npm run transit:import
 * 
 * This script:
 * 1. Downloads GTFS zip from PRT (or uses local file)
 * 2. Extracts GTFS files
 * 3. Imports into SQLite database
 * 4. Creates indexes for fast queries
 */

import fs from 'fs'
import path from 'path'
import { createReadStream } from 'fs'
import { parse } from 'csv-parse'
import Database from 'better-sqlite3'
import AdmZip from 'adm-zip'

const GTFS_URL = 'https://www.portauthority.org/developer-resources/gtfs-data/'
// Note: Update this URL to the actual PRT GTFS download link when available
// For now, you'll need to manually download the GTFS zip and place it in data/gtfs/prt.zip

const DATA_DIR = path.join(process.cwd(), 'data', 'gtfs')
const GTFS_ZIP_PATH = path.join(DATA_DIR, 'prt.zip')
const GTFS_EXTRACT_DIR = path.join(DATA_DIR, 'prt')
const GTFS_DB_PATH = path.join(DATA_DIR, 'prt.sqlite')

interface GtfsFile {
  name: string
  columns: string[]
  required: boolean
}

const GTFS_FILES: GtfsFile[] = [
  { name: 'agency.txt', columns: [], required: true },
  { name: 'stops.txt', columns: [], required: true },
  { name: 'routes.txt', columns: [], required: true },
  { name: 'trips.txt', columns: [], required: true },
  { name: 'stop_times.txt', columns: [], required: true },
  { name: 'calendar.txt', columns: [], required: false },
  { name: 'calendar_dates.txt', columns: [], required: false },
  { name: 'shapes.txt', columns: [], required: false },
  { name: 'frequencies.txt', columns: [], required: false },
]

async function downloadGtfs(): Promise<void> {
  console.log('📥 Checking for GTFS data...')
  
  // Check if zip already exists
  if (fs.existsSync(GTFS_ZIP_PATH)) {
    console.log(`✅ GTFS zip found at ${GTFS_ZIP_PATH}`)
    return
  }
  
  console.log('⚠️  GTFS zip not found. Please download manually:')
  console.log(`   1. Visit: ${GTFS_URL}`)
  console.log(`   2. Download the GTFS zip file`)
  console.log(`   3. Place it at: ${GTFS_ZIP_PATH}`)
  console.log(`   4. Run this script again`)
  throw new Error('GTFS zip file not found. Please download manually.')
}

async function extractGtfs(): Promise<void> {
  console.log('📦 Extracting GTFS files...')
  
  // Create extract directory
  if (!fs.existsSync(GTFS_EXTRACT_DIR)) {
    fs.mkdirSync(GTFS_EXTRACT_DIR, { recursive: true })
  }
  
  // Extract zip file
  try {
    const zip = new AdmZip(GTFS_ZIP_PATH)
    zip.extractAllTo(GTFS_EXTRACT_DIR, true)
    console.log('✅ GTFS zip extracted')
  } catch (error: any) {
    console.log('⚠️  Could not extract zip. Checking if files already exist...')
    
    // Check if files exist
    const requiredFiles = GTFS_FILES.filter(f => f.required)
    const missingFiles = requiredFiles.filter(f => 
      !fs.existsSync(path.join(GTFS_EXTRACT_DIR, f.name))
    )
    
    if (missingFiles.length > 0) {
      throw new Error(
        `Missing required GTFS files: ${missingFiles.map(f => f.name).join(', ')}\n` +
        `Please extract ${GTFS_ZIP_PATH} manually to ${GTFS_EXTRACT_DIR}`
      )
    }
    
    console.log('✅ GTFS files found (already extracted)')
  }
  
  // Verify required files exist
  const requiredFiles = GTFS_FILES.filter(f => f.required)
  const missingFiles = requiredFiles.filter(f => 
    !fs.existsSync(path.join(GTFS_EXTRACT_DIR, f.name))
  )
  
  if (missingFiles.length > 0) {
    throw new Error(
      `Missing required GTFS files: ${missingFiles.map(f => f.name).join(', ')}`
    )
  }
  
  console.log('✅ GTFS files verified')
}

function createTables(db: Database.Database): void {
  console.log('🗄️  Creating database tables...')
  
  // Drop existing tables
  db.exec(`
    DROP TABLE IF EXISTS stop_times;
    DROP TABLE IF EXISTS trips;
    DROP TABLE IF EXISTS calendar_dates;
    DROP TABLE IF EXISTS calendar;
    DROP TABLE IF EXISTS routes;
    DROP TABLE IF EXISTS stops;
    DROP TABLE IF EXISTS agency;
  `)
  
  // Create tables
  db.exec(`
    CREATE TABLE agency (
      agency_id TEXT PRIMARY KEY,
      agency_name TEXT NOT NULL,
      agency_url TEXT,
      agency_timezone TEXT,
      agency_lang TEXT,
      agency_phone TEXT
    );
    
    CREATE TABLE routes (
      route_id TEXT PRIMARY KEY,
      agency_id TEXT,
      route_short_name TEXT,
      route_long_name TEXT,
      route_desc TEXT,
      route_type INTEGER,
      route_url TEXT,
      route_color TEXT,
      route_text_color TEXT
    );
    
    CREATE TABLE stops (
      stop_id TEXT PRIMARY KEY,
      stop_code TEXT,
      stop_name TEXT NOT NULL,
      stop_desc TEXT,
      stop_lat REAL NOT NULL,
      stop_lon REAL NOT NULL,
      zone_id TEXT,
      stop_url TEXT,
      location_type INTEGER,
      parent_station TEXT,
      stop_timezone TEXT,
      wheelchair_boarding INTEGER
    );
    
    CREATE TABLE trips (
      trip_id TEXT PRIMARY KEY,
      route_id TEXT NOT NULL,
      service_id TEXT NOT NULL,
      trip_headsign TEXT,
      trip_short_name TEXT,
      direction_id INTEGER,
      block_id TEXT,
      shape_id TEXT,
      wheelchair_accessible INTEGER,
      bikes_allowed INTEGER,
      FOREIGN KEY (route_id) REFERENCES routes(route_id)
    );
    
    CREATE TABLE stop_times (
      trip_id TEXT NOT NULL,
      arrival_time TEXT NOT NULL,
      departure_time TEXT NOT NULL,
      stop_id TEXT NOT NULL,
      stop_sequence INTEGER NOT NULL,
      stop_headsign TEXT,
      pickup_type INTEGER,
      drop_off_type INTEGER,
      shape_dist_traveled REAL,
      timepoint INTEGER,
      FOREIGN KEY (trip_id) REFERENCES trips(trip_id),
      FOREIGN KEY (stop_id) REFERENCES stops(stop_id),
      PRIMARY KEY (trip_id, stop_sequence)
    );
    
    CREATE TABLE calendar (
      service_id TEXT PRIMARY KEY,
      monday INTEGER NOT NULL,
      tuesday INTEGER NOT NULL,
      wednesday INTEGER NOT NULL,
      thursday INTEGER NOT NULL,
      friday INTEGER NOT NULL,
      saturday INTEGER NOT NULL,
      sunday INTEGER NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL
    );
    
    CREATE TABLE calendar_dates (
      service_id TEXT NOT NULL,
      date TEXT NOT NULL,
      exception_type INTEGER NOT NULL,
      PRIMARY KEY (service_id, date),
      FOREIGN KEY (service_id) REFERENCES calendar(service_id)
    );
  `)
  
  console.log('✅ Database tables created')
}

async function importCsvFile(
  db: Database.Database,
  filePath: string,
  tableName: string
): Promise<number> {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${tableName} (file not found)`)
    return 0
  }
  
  const fileStream = createReadStream(filePath)
  const parser = parse({
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true
  })
  
  const rows: any[] = []
  
  return new Promise((resolve, reject) => {
    parser.on('data', (row) => {
      rows.push(row)
    })
    
    parser.on('end', () => {
      if (rows.length === 0) {
        console.log(`⚠️  ${tableName}: No data`)
        resolve(0)
        return
      }
      
      // Get column names from first row
      const columns = Object.keys(rows[0])
      const placeholders = columns.map(() => '?').join(', ')
      const columnNames = columns.join(', ')
      
      const insert = db.prepare(
        `INSERT OR REPLACE INTO ${tableName} (${columnNames}) VALUES (${placeholders})`
      )
      
      const insertMany = db.transaction((rows: any[]) => {
        for (const row of rows) {
          const values = columns.map(col => row[col] || null)
          insert.run(...values)
        }
      })
      
      insertMany(rows)
      
      console.log(`✅ ${tableName}: ${rows.length} rows imported`)
      resolve(rows.length)
    })
    
    parser.on('error', reject)
    
    fileStream.pipe(parser)
  })
}

async function createIndexes(db: Database.Database): Promise<void> {
  console.log('📊 Creating indexes...')
  
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_trips_route_id ON trips(route_id);
    CREATE INDEX IF NOT EXISTS idx_trips_service_id ON trips(service_id);
    CREATE INDEX IF NOT EXISTS idx_stop_times_trip_id ON stop_times(trip_id);
    CREATE INDEX IF NOT EXISTS idx_stop_times_stop_id ON stop_times(stop_id);
    CREATE INDEX IF NOT EXISTS idx_stop_times_arrival_time ON stop_times(arrival_time);
    CREATE INDEX IF NOT EXISTS idx_stops_lat_lon ON stops(stop_lat, stop_lon);
    CREATE INDEX IF NOT EXISTS idx_calendar_dates_date ON calendar_dates(date);
  `)
  
  console.log('✅ Indexes created')
}

async function main(): Promise<void> {
  console.log('🚌 Starting GTFS import for Pittsburgh Regional Transit\n')
  
  try {
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    
    // Step 1: Download (or check for) GTFS zip
    await downloadGtfs()
    
    // Step 2: Extract GTFS files
    await extractGtfs()
    
    // Step 3: Create database
    console.log('🗄️  Initializing database...')
    if (fs.existsSync(GTFS_DB_PATH)) {
      fs.unlinkSync(GTFS_DB_PATH)
    }
    const db = new Database(GTFS_DB_PATH)
    
    // Step 4: Create tables
    createTables(db)
    
    // Step 5: Import CSV files
    console.log('\n📥 Importing GTFS files...')
    for (const file of GTFS_FILES) {
      const filePath = path.join(GTFS_EXTRACT_DIR, file.name)
      await importCsvFile(db, filePath, file.name.replace('.txt', ''))
    }
    
    // Step 6: Create indexes
    await createIndexes(db)
    
    // Step 7: Close database
    db.close()
    
    console.log('\n✅ GTFS import complete!')
    console.log(`   Database: ${GTFS_DB_PATH}`)
    console.log(`   Size: ${(fs.statSync(GTFS_DB_PATH).size / 1024 / 1024).toFixed(2)} MB`)
    
  } catch (error: any) {
    console.error('\n❌ GTFS import failed:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export { main as importGtfs }

