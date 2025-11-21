// Map and Location Utilities

export interface Coordinates {
  lat: number
  lng: number
}

export interface Bounds {
  north: number
  south: number
  east: number
  west: number
}

export interface PlaceResult {
  id: string
  name: string
  address: string
  coordinates: Coordinates
  rating?: number
  types: string[]
}

export interface RouteInfo {
  distance: number // in meters
  duration: number // in seconds
  polyline?: string
}

// Pittsburgh area bounds (approximate)
export const PITTSBURGH_BOUNDS: Bounds = {
  north: 40.5,
  south: 40.35,
  east: -79.85,
  west: -80.05,
}

// Pittsburgh city center coordinates
export const PITTSBURGH_CENTER: Coordinates = {
  lat: 40.4406,
  lng: -79.9959,
}

// Neighborhood coordinates (approximate centers)
export const NEIGHBORHOOD_COORDINATES: Record<string, Coordinates> = {
  downtown: { lat: 40.4406, lng: -80.0025 },
  oakland: { lat: 40.4417, lng: -79.9562 },
  'south-side': { lat: 40.4284, lng: -79.9806 },
  'strip-district': { lat: 40.4511, lng: -79.9814 },
  lawrenceville: { lat: 40.4684, lng: -79.9628 },
  shadyside: { lat: 40.4556, lng: -79.9344 },
  squirrel: { lat: 40.4379, lng: -79.9233 },
  bloomfield: { lat: 40.4619, lng: -79.9494 },
  'east-liberty': { lat: 40.4614, lng: -79.9242 },
  'north-oakland': { lat: 40.4494, lng: -79.9548 },
}

/**
 * Calculate distance between two coordinates using Haversine formula
 */
export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371e3 // Earth's radius in meters
  const φ1 = (coord1.lat * Math.PI) / 180
  const φ2 = (coord2.lat * Math.PI) / 180
  const Δφ = ((coord2.lat - coord1.lat) * Math.PI) / 180
  const Δλ = ((coord2.lng - coord1.lng) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

/**
 * Check if coordinates are within Pittsburgh bounds
 */
export function isInPittsburgh(coordinates: Coordinates): boolean {
  return (
    coordinates.lat >= PITTSBURGH_BOUNDS.south &&
    coordinates.lat <= PITTSBURGH_BOUNDS.north &&
    coordinates.lng >= PITTSBURGH_BOUNDS.west &&
    coordinates.lng <= PITTSBURGH_BOUNDS.east
  )
}

/**
 * Get coordinates for a neighborhood
 */
export function getNeighborhoodCoordinates(neighborhoodId: string): Coordinates | null {
  return NEIGHBORHOOD_COORDINATES[neighborhoodId] || null
}

/**
 * Find nearest neighborhood to coordinates
 */
export function findNearestNeighborhood(coordinates: Coordinates): {
  neighborhood: string
  coordinates: Coordinates
  distance: number
} {
  let nearest = { neighborhood: '', coordinates: { lat: 0, lng: 0 }, distance: Infinity }

  for (const [neighborhood, coords] of Object.entries(NEIGHBORHOOD_COORDINATES)) {
    const distance = calculateDistance(coordinates, coords)
    if (distance < nearest.distance) {
      nearest = { neighborhood, coordinates: coords, distance }
    }
  }

  return nearest
}

/**
 * Format distance for display
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`
  }
  return `${(meters / 1000).toFixed(1)}km`
}

/**
 * Generate Google Maps URL for directions
 */
export function generateDirectionsUrl(
  origin: Coordinates,
  destination: Coordinates,
  mode: 'driving' | 'walking' | 'transit' = 'driving'
): string {
  const baseUrl = 'https://www.google.com/maps/dir/'
  const originStr = `${origin.lat},${origin.lng}`
  const destStr = `${destination.lat},${destination.lng}`

  return `${baseUrl}${originStr}/${destStr}/@${origin.lat},${origin.lng},15z/data=!3m1!4b1!4m2!4m1!3e${mode === 'walking' ? 1 : mode === 'transit' ? 3 : 0}`
}

/**
 * Generate Google Maps embed URL
 */
export function generateMapEmbedUrl(
  center: Coordinates,
  zoom: number = 13,
  markers?: Coordinates[]
): string {
  let url = `https://www.google.com/maps/embed/v1/view?key=${process.env.GOOGLE_MAPS_API_KEY}&center=${center.lat},${center.lng}&zoom=${zoom}`

  if (markers && markers.length > 0) {
    const markersStr = markers.map(m => `${m.lat},${m.lng}`).join('|')
    url += `&markers=${markersStr}`
  }

  return url
}

/**
 * Parse address to extract coordinates (mock implementation)
 * In production, use Google Maps Geocoding API
 */
export function geocodeAddress(address: string): Promise<Coordinates | null> {
  return new Promise((resolve) => {
    // Mock geocoding - in production, use actual geocoding service
    // For now, return Pittsburgh center for any Pittsburgh address
    if (address.toLowerCase().includes('pittsburgh')) {
      setTimeout(() => resolve(PITTSBURGH_CENTER), 100)
    } else {
      setTimeout(() => resolve(null), 100)
    }
  })
}

/**
 * Calculate bounds that contain all coordinates
 */
export function calculateBounds(coordinates: Coordinates[]): Bounds | null {
  if (coordinates.length === 0) return null

  let north = -90
  let south = 90
  let east = -180
  let west = 180

  for (const coord of coordinates) {
    north = Math.max(north, coord.lat)
    south = Math.min(south, coord.lat)
    east = Math.max(east, coord.lng)
    west = Math.min(west, coord.lng)
  }

  // Add padding
  const latPadding = (north - south) * 0.1
  const lngPadding = (east - west) * 0.1

  return {
    north: north + latPadding,
    south: south - latPadding,
    east: east + lngPadding,
    west: west - lngPadding,
  }
}

/**
 * Check if point is within bounds
 */
export function isWithinBounds(point: Coordinates, bounds: Bounds): boolean {
  return (
    point.lat >= bounds.south &&
    point.lat <= bounds.north &&
    point.lng >= bounds.west &&
    point.lng <= bounds.east
  )
}

/**
 * Calculate center point of bounds
 */
export function getBoundsCenter(bounds: Bounds): Coordinates {
  return {
    lat: (bounds.north + bounds.south) / 2,
    lng: (bounds.east + bounds.west) / 2,
  }
}

/**
 * Generate walking directions (simplified)
 */
export function generateWalkingDirections(
  start: Coordinates,
  end: Coordinates
): { instructions: string[]; totalDistance: number; totalDuration: number } {
  const distance = calculateDistance(start, end)
  const duration = Math.round(distance / 1.4) // Average walking speed ~1.4 m/s

  // Mock instructions - in production, use routing service
  const instructions = [
    `Head ${distance > 500 ? 'north' : 'south'} for ${formatDistance(distance)}`,
    'Continue straight until you reach your destination',
  ]

  return {
    instructions,
    totalDistance: distance,
    totalDuration: duration,
  }
}

/**
 * Filter locations within radius
 */
export function filterLocationsWithinRadius(
  center: Coordinates,
  locations: Array<{ coordinates: Coordinates; [key: string]: any }>,
  radiusMeters: number
): Array<{ coordinates: Coordinates; distance: number; [key: string]: any }> {
  return locations
    .map(location => ({
      ...location,
      distance: calculateDistance(center, location.coordinates),
    }))
    .filter(location => location.distance <= radiusMeters)
    .sort((a, b) => a.distance - b.distance)
}

/**
 * Generate location-based recommendations
 */
export function generateLocationRecommendations(
  userLocation: Coordinates,
  interests: string[],
  maxResults: number = 5
): Array<{
  type: string
  name: string
  distance: number
  reason: string
}> {
  const recommendations: Array<{
    type: string
    name: string
    coordinates: Coordinates
    reason: string
  }> = []

  // Mock recommendations based on interests
  if (interests.includes('food') || interests.includes('restaurants')) {
    recommendations.push(
      {
        type: 'restaurant',
        name: 'Primanti Bros.',
        coordinates: NEIGHBORHOOD_COORDINATES.oakland,
        reason: 'Iconic Pittsburgh sandwich experience',
      },
      {
        type: 'restaurant',
        name: 'Fat Head\'s Saloon',
        coordinates: NEIGHBORHOOD_COORDINATES['south-side'],
        reason: 'Craft beer and artisanal pizza',
      }
    )
  }

  if (interests.includes('events') || interests.includes('culture')) {
    recommendations.push(
      {
        type: 'attraction',
        name: 'Carnegie Museum of Art',
        coordinates: NEIGHBORHOOD_COORDINATES.oakland,
        reason: 'World-class art collection',
      },
      {
        type: 'attraction',
        name: 'Point State Park',
        coordinates: NEIGHBORHOOD_COORDINATES.downtown,
        reason: 'Historic park at three rivers confluence',
      }
    )
  }

  // Calculate distances and sort
  return recommendations
    .map(rec => ({
      ...rec,
      distance: calculateDistance(userLocation, rec.coordinates),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, maxResults)
}

/**
 * Pittsburgh-specific utilities
 */

/**
 * Get Pittsburgh river information for a location
 */
export function getRiverInfo(coordinates: Coordinates): {
  nearestRiver: string
  distance: number
} {
  // Simplified - Pittsburgh has three rivers: Allegheny, Monongahela, Ohio
  const rivers = [
    { name: 'Allegheny River', lat: 40.44, lng: -80.01 },
    { name: 'Monongahela River', lat: 40.43, lng: -80.00 },
    { name: 'Ohio River', lat: 40.44, lng: -80.01 },
  ]

  let nearest = { name: '', distance: Infinity }

  for (const river of rivers) {
    const distance = calculateDistance(coordinates, { lat: river.lat, lng: river.lng })
    if (distance < nearest.distance) {
      nearest = { name: river.name, distance }
    }
  }

  return { nearestRiver: nearest.name, distance: nearest.distance }
}

/**
 * Check if location is in a walkable neighborhood
 */
export function isWalkableArea(coordinates: Coordinates): {
  isWalkable: boolean
  walkScore: number
} {
  const nearestNeighborhood = findNearestNeighborhood(coordinates)

  // Mock walk scores based on neighborhoods
  const walkScores: Record<string, number> = {
    downtown: 95,
    'strip-district': 90,
    oakland: 88,
    'south-side': 82,
    lawrenceville: 85,
    shadyside: 78,
  }

  const walkScore = walkScores[nearestNeighborhood.neighborhood] || 70

  return {
    isWalkable: walkScore >= 70,
    walkScore,
  }
}
