/**
 * GTFS Download Script
 * Downloads Pittsburgh Regional Transit GTFS data
 * 
 * Usage: npm run transit:download
 * 
 * Note: Update GTFS_URL with the actual PRT GTFS download URL
 */

import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'

const GTFS_URL = process.env.PRT_GTFS_URL || 'https://www.rideprt.org/developerresources/GTFS.zip'
// Direct download URL for PRT GTFS data

const DATA_DIR = path.join(process.cwd(), 'data', 'gtfs')
const GTFS_ZIP_PATH = path.join(DATA_DIR, 'prt.zip')

async function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    
    const file = fs.createWriteStream(dest)
    
    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        if (response.headers.location) {
          file.close()
          fs.unlinkSync(dest)
          return downloadFile(response.headers.location, dest).then(resolve).catch(reject)
        }
      }
      
      if (response.statusCode !== 200) {
        file.close()
        fs.unlinkSync(dest)
        reject(new Error(`Failed to download: ${response.statusCode} ${response.statusMessage}`))
        return
      }
      
      const totalSize = parseInt(response.headers['content-length'] || '0', 10)
      let downloadedSize = 0
      
      response.on('data', (chunk) => {
        downloadedSize += chunk.length
        if (totalSize > 0) {
          const percent = ((downloadedSize / totalSize) * 100).toFixed(1)
          process.stdout.write(`\rDownloading: ${percent}% (${(downloadedSize / 1024 / 1024).toFixed(2)} MB)`)
        }
      })
      
      response.pipe(file)
      
      file.on('finish', () => {
        file.close()
        console.log('\n✅ Download complete')
        resolve()
      })
    }).on('error', (err) => {
      file.close()
      if (fs.existsSync(dest)) {
        fs.unlinkSync(dest)
      }
      reject(err)
    })
  })
}

async function main(): Promise<void> {
  console.log('📥 Downloading PRT GTFS data...\n')
  
  try {
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    
    // Check if file already exists
    if (fs.existsSync(GTFS_ZIP_PATH)) {
      const stats = fs.statSync(GTFS_ZIP_PATH)
      const ageDays = (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60 * 24)
      
      if (ageDays < 7) {
        console.log(`✅ GTFS file already exists (${ageDays.toFixed(1)} days old)`)
        console.log(`   Location: ${GTFS_ZIP_PATH}`)
        console.log(`   To re-download, delete the file first`)
        return
      } else {
        console.log(`⚠️  GTFS file is ${ageDays.toFixed(1)} days old`)
        console.log(`   Consider downloading a fresh copy`)
      }
    }
    
    // Check if URL is a direct download link
    if (!GTFS_URL.endsWith('.zip') && !GTFS_URL.includes('/download/')) {
      console.log('⚠️  GTFS URL does not appear to be a direct download link')
      console.log(`   URL: ${GTFS_URL}`)
      console.log('\n📋 Manual Download Instructions:')
      console.log('   1. Visit the PRT developer resources page')
      console.log('   2. Find and download the GTFS zip file')
      console.log('   3. Place it at:', GTFS_ZIP_PATH)
      console.log('   4. Run: npm run transit:import')
      console.log('\n💡 Tip: Update PRT_GTFS_URL environment variable with direct download URL')
      return
    }
    
    console.log(`Downloading from: ${GTFS_URL}`)
    console.log(`Saving to: ${GTFS_ZIP_PATH}\n`)
    
    await downloadFile(GTFS_URL, GTFS_ZIP_PATH)
    
    const stats = fs.statSync(GTFS_ZIP_PATH)
    console.log(`\n✅ Download complete`)
    console.log(`   File: ${GTFS_ZIP_PATH}`)
    console.log(`   Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`)
    console.log(`\n📦 Next step: Run 'npm run transit:import' to import the data`)
    
  } catch (error: any) {
    console.error('\n❌ Download failed:', error.message)
    console.log('\n📋 Manual Download Instructions:')
    console.log('   1. Visit: https://www.portauthority.org/developer-resources/gtfs-data/')
    console.log('   2. Download the GTFS zip file')
    console.log('   3. Place it at:', GTFS_ZIP_PATH)
    console.log('   4. Run: npm run transit:import')
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export { main as downloadGtfs }

