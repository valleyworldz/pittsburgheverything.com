import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import type { Neighborhood, APIResponse } from '@/types'

const NEIGHBORHOODS_FILE = join(process.cwd(), 'data', 'neighborhoods.json')

// Helper function to read neighborhoods from file
function readNeighborhoods(): Neighborhood[] {
  try {
    const data = readFileSync(NEIGHBORHOODS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading neighborhoods:', error)
    return []
  }
}

export async function GET(request: NextRequest): Promise<NextResponse<APIResponse<Neighborhood[]>>> {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const sort = searchParams.get('sort') // 'population', 'walkScore', 'name'

    let neighborhoods = readNeighborhoods()

    // Sort neighborhoods
    if (sort) {
      switch (sort) {
        case 'population':
          neighborhoods.sort((a, b) => (b.population || 0) - (a.population || 0))
          break
        case 'walkScore':
          neighborhoods.sort((a, b) => (b.walkScore || 0) - (a.walkScore || 0))
          break
        case 'name':
          neighborhoods.sort((a, b) => a.name.localeCompare(b.name))
          break
        default:
          // Default sort by walk score
          neighborhoods.sort((a, b) => (b.walkScore || 0) - (a.walkScore || 0))
      }
    } else {
      // Default sort by walk score descending
      neighborhoods.sort((a, b) => (b.walkScore || 0) - (a.walkScore || 0))
    }

    // Apply limit
    if (limit) {
      const limitNum = parseInt(limit, 10)
      if (!isNaN(limitNum) && limitNum > 0) {
        neighborhoods = neighborhoods.slice(0, limitNum)
      }
    }

    return NextResponse.json({
      success: true,
      data: neighborhoods,
      message: `${neighborhoods.length} neighborhoods found`,
    })

  } catch (error) {
    console.error('Error fetching neighborhoods:', error)

    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch neighborhoods',
    }, { status: 500 })
  }
}
