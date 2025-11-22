/**
 * Complete GTFS Setup Script
 * Downloads and imports GTFS data in one go
 * 
 * Usage: npm run transit:setup
 */

import { downloadGtfs } from './download-gtfs'
import { importGtfs } from './import-gtfs'
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data', 'gtfs')
const GTFS_ZIP_PATH = path.join(DATA_DIR, 'prt.zip')

async function main(): Promise<void> {
  console.log('🚌 Setting up GTFS data for Pittsburgh Regional Transit\n')
  console.log('This will download and import official PRT transit schedules.\n')

  try {
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }

    // Step 1: Try to download
    console.log('📥 Step 1: Downloading GTFS data...')
    try {
      await downloadGtfs()
    } catch (error: any) {
      console.log(`\n⚠️  Automatic download not available: ${error.message}`)
      console.log('\n📋 Manual Download Required:')
      console.log('   1. Visit: https://www.portauthority.org/developer-resources/gtfs-data/')
      console.log('   2. Download the GTFS zip file')
      console.log('   3. Place it at:', GTFS_ZIP_PATH)
      console.log('\n   Then run: npm run transit:import\n')
      
      // Check if file already exists
      if (fs.existsSync(GTFS_ZIP_PATH)) {
        console.log('✅ Found existing GTFS zip file, proceeding with import...\n')
      } else {
        console.log('❌ GTFS zip file not found. Please download manually first.')
        process.exit(1)
      }
    }

    // Step 2: Import
    console.log('📦 Step 2: Importing GTFS data into database...')
    await importGtfs()

    console.log('\n✅ GTFS setup complete!')
    console.log('   Your bus schedules tool now has 100% accurate schedule data.')
    console.log('\n💡 Next steps:')
    console.log('   - Test the API: GET /api/transit/routes')
    console.log('   - Visit: /tools/bus-schedules')
    console.log('   - Set up auto-refresh: See docs/GTFS_SETUP.md')
    
  } catch (error: any) {
    console.error('\n❌ GTFS setup failed:', error.message)
    console.log('\n📋 Troubleshooting:')
    console.log('   1. Ensure GTFS zip file exists at:', GTFS_ZIP_PATH)
    console.log('   2. Check file permissions')
    console.log('   3. Verify zip file is not corrupted')
    console.log('   4. Run: npm run transit:import (if download succeeded)')
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export { main as setupGtfs }

