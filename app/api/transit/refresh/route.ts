import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'

const execAsync = promisify(exec)
const PROJECT_ROOT = process.cwd()

/**
 * POST /api/transit/refresh
 * Refresh GTFS data (download + import)
 * 
 * This endpoint can be called:
 * - Manually via API
 * - By a cron job / scheduled task
 * - On application startup (optional)
 * 
 * Query params:
 * - force: Force refresh even if data is recent (default: false)
 */
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const force = searchParams.get('force') === 'true'

    console.log('🔄 Starting GTFS refresh...')

    // Run refresh script
    try {
      const { stdout, stderr } = await execAsync(
        'npm run transit:refresh',
        { cwd: PROJECT_ROOT, timeout: 300000 } // 5 minute timeout
      )
      
      if (stderr && !stderr.includes('⚠️')) {
        console.error('Refresh stderr:', stderr)
      }
      
      console.log('Refresh output:', stdout)
    } catch (error: any) {
      // Check if it's just a download warning (file not found is OK if zip exists)
      const fs = require('fs')
      const GTFS_ZIP_PATH = path.join(PROJECT_ROOT, 'data', 'gtfs', 'prt.zip')
      
      if (!fs.existsSync(GTFS_ZIP_PATH)) {
        throw new Error('GTFS zip file not found. Please download manually first.')
      }
      
      // If zip exists, try import only
      console.log('⚠️  Download step failed, trying import only...')
      const { stdout, stderr } = await execAsync(
        'npm run transit:import',
        { cwd: PROJECT_ROOT, timeout: 300000 }
      )
      
      if (stderr && !stderr.includes('⚠️')) {
        throw new Error(stderr)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'GTFS data refreshed successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('❌ GTFS refresh failed:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: 'GTFS refresh failed. Check logs for details.'
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/transit/refresh
 * Check GTFS data status
 */
export async function GET() {
  const fs = require('fs')
  const path = require('path')
  
  const GTFS_DB_PATH = path.join(process.cwd(), 'data', 'gtfs', 'prt.sqlite')
  const GTFS_ZIP_PATH = path.join(process.cwd(), 'data', 'gtfs', 'prt.zip')

  const dbExists = fs.existsSync(GTFS_DB_PATH)
  const zipExists = fs.existsSync(GTFS_ZIP_PATH)

  let dbAge = null
  let zipAge = null
  let dbSize = null

  if (dbExists) {
    const stats = fs.statSync(GTFS_DB_PATH)
    dbAge = Math.floor((Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60 * 24))
    dbSize = (stats.size / 1024 / 1024).toFixed(2)
  }

  if (zipExists) {
    const stats = fs.statSync(GTFS_ZIP_PATH)
    zipAge = Math.floor((Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60 * 24))
  }

  return NextResponse.json({
    database: {
      exists: dbExists,
      ageDays: dbAge,
      sizeMB: dbSize
    },
    zip: {
      exists: zipExists,
      ageDays: zipAge
    },
    status: dbExists ? 'ready' : 'not_imported',
    needsRefresh: dbAge !== null && dbAge > 30, // Suggest refresh if > 30 days old
    timestamp: new Date().toISOString()
  })
}

