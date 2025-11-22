/**
 * GTFS Refresh Script
 * Downloads and imports GTFS data
 * 
 * Usage: npm run transit:refresh
 * 
 * This script:
 * 1. Downloads latest GTFS data (if available)
 * 2. Imports into database
 * 3. Can be run on a schedule (cron, etc.)
 */

import { downloadGtfs } from './download-gtfs'
import { importGtfs } from './import-gtfs'

async function main(): Promise<void> {
  console.log('🔄 Refreshing GTFS data...\n')
  
  try {
    // Step 1: Download (may fail if URL not available, that's OK)
    try {
      console.log('📥 Step 1: Downloading GTFS data...')
      await downloadGtfs()
    } catch (error: any) {
      console.log(`⚠️  Download step: ${error.message}`)
      console.log('   Continuing with existing file if available...\n')
    }

    // Step 2: Import
    console.log('📦 Step 2: Importing GTFS data...')
    await importGtfs()
    
    console.log('\n✅ GTFS refresh complete!')
  } catch (error: any) {
    console.error('\n❌ GTFS refresh failed:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export { main as refreshGtfs }

