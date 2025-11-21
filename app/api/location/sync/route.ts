// Location Sync API for PWA
// Handle geolocation data synchronization for local features

import { NextRequest, NextResponse } from 'next/server'

interface LocationData {
  latitude: number
  longitude: number
  accuracy?: number
  timestamp?: number
  userId?: string
  sessionId?: string
}

// In-memory storage for demo (use database in production)
let locationHistory: LocationData[] = []

export async function POST(request: NextRequest) {
  try {
    const locationData: LocationData = await request.json()

    // Validate required fields
    if (typeof locationData.latitude !== 'number' ||
        typeof locationData.longitude !== 'number') {
      return NextResponse.json(
        { error: 'Invalid location data: latitude and longitude required' },
        { status: 400 }
      )
    }

    // Validate coordinate ranges
    if (locationData.latitude < -90 || locationData.latitude > 90 ||
        locationData.longitude < -180 || locationData.longitude > 180) {
      return NextResponse.json(
        { error: 'Invalid coordinates: out of range' },
        { status: 400 }
      )
    }

    // Add metadata
    const enrichedData: LocationData & { id: string; receivedAt: Date } = {
      ...locationData,
      id: `loc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      receivedAt: new Date(),
      timestamp: locationData.timestamp || Date.now()
    }

    // Store location data (limit to last 100 entries for demo)
    locationHistory.unshift(enrichedData)
    if (locationHistory.length > 100) {
      locationHistory = locationHistory.slice(0, 100)
    }

    console.log('Location data synced:', {
      id: enrichedData.id,
      lat: enrichedData.latitude,
      lng: enrichedData.longitude,
      accuracy: enrichedData.accuracy
    })

    // Find nearby Pittsburgh locations based on coordinates
    const nearbyLocations = findNearbyLocations(
      enrichedData.latitude,
      enrichedData.longitude
    )

    return NextResponse.json({
      success: true,
      message: 'Location synced successfully',
      locationId: enrichedData.id,
      nearbyLocations,
      timestamp: enrichedData.receivedAt
    })

  } catch (error) {
    console.error('Location sync error:', error)
    return NextResponse.json(
      { error: 'Failed to sync location' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50)

  let filteredLocations = locationHistory

  if (userId) {
    filteredLocations = locationHistory.filter(loc => loc.userId === userId)
  }

  const recentLocations = filteredLocations
    .slice(0, limit)
    .map((loc, index) => ({
      id: `location-${index}`,
      latitude: loc.latitude,
      longitude: loc.longitude,
      accuracy: loc.accuracy,
      timestamp: loc.timestamp,
      receivedAt: (loc as any).receivedAt
    }))

  return NextResponse.json({
    locations: recentLocations,
    total: filteredLocations.length,
    limit
  })
}

// Helper function to find nearby Pittsburgh locations
function findNearbyLocations(userLat: number, userLng: number): Array<{
  id: string
  name: string
  type: string
  distance: number
  coordinates: { lat: number; lng: number }
}> {
  const pittsburghLocations = [
    {
      id: 'downtown-pittsburgh',
      name: 'Downtown Pittsburgh',
      type: 'neighborhood',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    {
      id: 'oakland-pittsburgh',
      name: 'Oakland',
      type: 'neighborhood',
      coordinates: { lat: 40.4417, lng: -79.9628 }
    },
    {
      id: 'shadyside-pittsburgh',
      name: 'Shadyside',
      type: 'neighborhood',
      coordinates: { lat: 40.4556, lng: -79.9378 }
    },
    {
      id: 'south-side-pittsburgh',
      name: 'South Side',
      type: 'neighborhood',
      coordinates: { lat: 40.4284, lng: -79.9847 }
    },
    {
      id: 'lawrenceville-pittsburgh',
      name: 'Lawrenceville',
      type: 'neighborhood',
      coordinates: { lat: 40.4684, lng: -79.9625 }
    },
    {
      id: 'cranberry-township',
      name: 'Cranberry Township',
      type: 'suburb',
      coordinates: { lat: 40.6947, lng: -80.1087 }
    },
    {
      id: 'robinson-township',
      name: 'Robinson Township',
      type: 'suburb',
      coordinates: { lat: 40.4534, lng: -80.1625 }
    }
  ]

  return pittsburghLocations
    .map(location => ({
      ...location,
      distance: calculateDistance(userLat, userLng, location.coordinates.lat, location.coordinates.lng)
    }))
    .filter(location => location.distance <= 25) // Within 25 miles
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5) // Return top 5 closest
}

// Calculate distance using Haversine formula
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959 // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1)
  const dLng = toRadians(lng2 - lng1)

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round((R * c) * 10) / 10 // Round to 1 decimal place
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}
