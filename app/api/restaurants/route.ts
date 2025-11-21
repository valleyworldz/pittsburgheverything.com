import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import type { Restaurant, APIResponse } from '@/types'

// Mark this route as dynamic to allow query parameters
export const dynamic = 'force-dynamic'

const RESTAURANTS_FILE = join(process.cwd(), 'data', 'restaurants.json')

// Helper function to read restaurants from file
function readRestaurants(): Restaurant[] {
  try {
    const data = readFileSync(RESTAURANTS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading restaurants:', error)
    return []
  }
}

export async function GET(request: NextRequest): Promise<NextResponse<APIResponse<Restaurant[]>>> {
  try {
    const { searchParams } = request.nextUrl
    const cuisine = searchParams.get('cuisine')
    const neighborhood = searchParams.get('neighborhood')
    const priceRange = searchParams.get('priceRange')
    const rating = searchParams.get('rating')
    const limit = searchParams.get('limit')
    const sort = searchParams.get('sort') // 'rating', 'name', etc.

    let restaurants = readRestaurants()

    // Filter by cuisine
    if (cuisine) {
      restaurants = restaurants.filter(r => r.cuisine.toLowerCase() === cuisine.toLowerCase())
    }

    // Filter by neighborhood
    if (neighborhood) {
      restaurants = restaurants.filter(r => r.neighborhood.toLowerCase() === neighborhood.toLowerCase())
    }

    // Filter by price range
    if (priceRange) {
      restaurants = restaurants.filter(r => r.priceRange === priceRange)
    }

    // Filter by minimum rating
    if (rating) {
      const minRating = parseFloat(rating)
      if (!isNaN(minRating)) {
        restaurants = restaurants.filter(r => r.rating >= minRating)
      }
    }

    // Sort restaurants
    if (sort) {
      switch (sort) {
        case 'rating':
          restaurants.sort((a, b) => b.rating - a.rating)
          break
        case 'name':
          restaurants.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'price-low':
          restaurants.sort((a, b) => a.priceRange.length - b.priceRange.length)
          break
        case 'price-high':
          restaurants.sort((a, b) => b.priceRange.length - a.priceRange.length)
          break
        default:
          // Default sort by rating
          restaurants.sort((a, b) => b.rating - a.rating)
      }
    } else {
      // Default sort by rating descending
      restaurants.sort((a, b) => b.rating - a.rating)
    }

    // Apply limit
    if (limit) {
      const limitNum = parseInt(limit, 10)
      if (!isNaN(limitNum) && limitNum > 0) {
        restaurants = restaurants.slice(0, limitNum)
      }
    }

    return NextResponse.json({
      success: true,
      data: restaurants,
      message: `${restaurants.length} restaurants found`,
    })

  } catch (error) {
    console.error('Error fetching restaurants:', error)

    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch restaurants',
    }, { status: 500 })
  }
}
