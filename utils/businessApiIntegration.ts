// Business API Integration System for PittsburghEverything.com
// Real-time integration with Google Places, Yelp, and local business data sources

import { ALL_PITTSBURGH_LOCATIONS } from '@/data/pittsburgh-locations'

// API Configuration
export interface APIConfig {
  googlePlaces: {
    apiKey: string
    baseUrl: string
    rateLimit: number
  }
  yelp: {
    apiKey: string
    baseUrl: string
    rateLimit: number
  }
  tripAdvisor: {
    apiKey: string
    baseUrl: string
  }
  eventbrite: {
    apiKey: string
    baseUrl: string
  }
  weather: {
    apiKey: string
    baseUrl: string
  }
}

// Default API configuration (keys should be in environment variables)
export const DEFAULT_API_CONFIG: APIConfig = {
  googlePlaces: {
    apiKey: process.env.GOOGLE_PLACES_API_KEY || '',
    baseUrl: 'https://maps.googleapis.com/maps/api/place',
    rateLimit: 100 // requests per minute
  },
  yelp: {
    apiKey: process.env.YELP_API_KEY || '',
    baseUrl: 'https://api.yelp.com/v3',
    rateLimit: 5000 // requests per day
  },
  tripAdvisor: {
    apiKey: process.env.TRIPADVISOR_API_KEY || '',
    baseUrl: 'https://api.tripadvisor.com/api/internal/1.14'
  },
  eventbrite: {
    apiKey: process.env.EVENTBRITE_API_KEY || '',
    baseUrl: 'https://www.eventbriteapi.com/v3'
  },
  weather: {
    apiKey: process.env.OPENWEATHER_API_KEY || '',
    baseUrl: 'https://api.openweathermap.org/data/2.5'
  }
}

// Business Data Interfaces
export interface BusinessData {
  id: string
  name: string
  category: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  coordinates: {
    lat: number
    lng: number
  }
  phone?: string
  website?: string
  rating?: number
  reviewCount?: number
  priceRange?: string
  hours?: BusinessHours
  photos?: string[]
  description?: string
  attributes?: Record<string, any>
  source: 'google' | 'yelp' | 'tripadvisor' | 'manual'
  lastUpdated: Date
  verified: boolean
}

export interface BusinessHours {
  monday?: string
  tuesday?: string
  wednesday?: string
  thursday?: string
  friday?: string
  saturday?: string
  sunday?: string
}

export interface EventData {
  id: string
  title: string
  description: string
  startDate: Date
  endDate?: Date
  location: {
    name: string
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  organizer: string
  price?: {
    min: number
    max: number
    currency: string
  }
  category: string
  url?: string
  image?: string
  source: 'eventbrite' | 'google' | 'facebook' | 'manual'
  lastUpdated: Date
}

// Rate limiting utility
class RateLimiter {
  private requests: number[] = []
  private limit: number
  private window: number

  constructor(limit: number, windowMs: number = 60000) {
    this.limit = limit
    this.window = windowMs
  }

  async waitForSlot(): Promise<void> {
    const now = Date.now()
    this.requests = this.requests.filter(time => now - time < this.window)

    if (this.requests.length >= this.limit) {
      const oldestRequest = Math.min(...this.requests)
      const waitTime = this.window - (now - oldestRequest)
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }

    this.requests.push(now)
  }
}

// Google Places API Integration
export class GooglePlacesAPI {
  private apiKey: string
  private baseUrl: string
  private rateLimiter: RateLimiter

  constructor(config: APIConfig['googlePlaces']) {
    this.apiKey = config.apiKey
    this.baseUrl = config.baseUrl
    this.rateLimiter = new RateLimiter(config.rateLimit)
  }

  async searchPlaces(query: string, location: string, radius: number = 5000): Promise<any[]> {
    await this.rateLimiter.waitForSlot()

    const params = new URLSearchParams({
      query,
      location: `${ALL_PITTSBURGH_LOCATIONS[0].coordinates.lat},${ALL_PITTSBURGH_LOCATIONS[0].coordinates.lng}`,
      radius: radius.toString(),
      key: this.apiKey
    })

    const response = await fetch(`${this.baseUrl}/textsearch/json?${params}`)
    const data = await response.json()

    if (data.status !== 'OK') {
      throw new Error(`Google Places API error: ${data.status}`)
    }

    return data.results
  }

  async getPlaceDetails(placeId: string): Promise<any> {
    await this.rateLimiter.waitForSlot()

    const params = new URLSearchParams({
      place_id: placeId,
      fields: 'name,formatted_address,geometry,formatted_phone_number,website,rating,reviews,opening_hours,photos,types,price_level',
      key: this.apiKey
    })

    const response = await fetch(`${this.baseUrl}/details/json?${params}`)
    const data = await response.json()

    if (data.status !== 'OK') {
      throw new Error(`Google Places API error: ${data.status}`)
    }

    return data.result
  }

  async getNearbyPlaces(location: {lat: number, lng: number}, type: string, radius: number = 1500): Promise<any[]> {
    await this.rateLimiter.waitForSlot()

    const params = new URLSearchParams({
      location: `${location.lat},${location.lng}`,
      type,
      radius: radius.toString(),
      key: this.apiKey
    })

    const response = await fetch(`${this.baseUrl}/nearbysearch/json?${params}`)
    const data = await response.json()

    if (data.status !== 'OK') {
      throw new Error(`Google Places API error: ${data.status}`)
    }

    return data.results
  }
}

// Yelp API Integration
export class YelpAPI {
  private apiKey: string
  private baseUrl: string
  private rateLimiter: RateLimiter

  constructor(config: APIConfig['yelp']) {
    this.apiKey = config.apiKey
    this.baseUrl = config.baseUrl
    this.rateLimiter = new RateLimiter(config.rateLimit, 86400000) // daily limit
  }

  async searchBusinesses(term: string, location: string, categories?: string): Promise<any> {
    await this.rateLimiter.waitForSlot()

    const params = new URLSearchParams({
      term,
      location,
      categories: categories || '',
      limit: '50'
    })

    const response = await fetch(`${this.baseUrl}/businesses/search?${params}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Yelp API error: ${response.status}`)
    }

    return await response.json()
  }

  async getBusinessDetails(businessId: string): Promise<any> {
    await this.rateLimiter.waitForSlot()

    const response = await fetch(`${this.baseUrl}/businesses/${businessId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Yelp API error: ${response.status}`)
    }

    return await response.json()
  }

  async getBusinessReviews(businessId: string): Promise<any> {
    await this.rateLimiter.waitForSlot()

    const response = await fetch(`${this.baseUrl}/businesses/${businessId}/reviews`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Yelp API error: ${response.status}`)
    }

    return await response.json()
  }
}

// Weather API Integration
export class WeatherAPI {
  private apiKey: string
  private baseUrl: string

  constructor(config: APIConfig['weather']) {
    this.apiKey = config.apiKey
    this.baseUrl = config.baseUrl
  }

  async getCurrentWeather(lat: number, lng: number): Promise<any> {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lon: lng.toString(),
      appid: this.apiKey,
      units: 'imperial'
    })

    const response = await fetch(`${this.baseUrl}/weather?${params}`)
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    return await response.json()
  }

  async getWeatherForecast(lat: number, lng: number, days: number = 7): Promise<any> {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lon: lng.toString(),
      appid: this.apiKey,
      units: 'imperial',
      cnt: (days * 8).toString() // 8 data points per day
    })

    const response = await fetch(`${this.baseUrl}/forecast?${params}`)
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    return await response.json()
  }
}

// Eventbrite API Integration
export class EventbriteAPI {
  private apiKey: string
  private baseUrl: string

  constructor(config: APIConfig['eventbrite']) {
    this.apiKey = config.apiKey
    this.baseUrl = config.baseUrl
  }

  async searchEvents(query: string = 'Pittsburgh', location?: string): Promise<any> {
    const params = new URLSearchParams({
      q: query,
      'location.address': location || 'Pittsburgh, PA',
      'location.within': '25mi',
      expand: 'venue,organizer',
      status: 'live'
    })

    const response = await fetch(`${this.baseUrl}/events/search/?${params}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Eventbrite API error: ${response.status}`)
    }

    return await response.json()
  }

  async getEventDetails(eventId: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/events/${eventId}/`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Eventbrite API error: ${response.status}`)
    }

    return await response.json()
  }
}

// Main Business Data Aggregator
export class BusinessDataAggregator {
  private googlePlaces: GooglePlacesAPI
  private yelp: YelpAPI
  private weather: WeatherAPI
  private eventbrite: EventbriteAPI

  constructor(config: APIConfig) {
    this.googlePlaces = new GooglePlacesAPI(config.googlePlaces)
    this.yelp = new YelpAPI(config.yelp)
    this.weather = new WeatherAPI(config.weather)
    this.eventbrite = new EventbriteAPI(config.eventbrite)
  }

  // Aggregate business data from multiple sources
  async getBusinessData(businessName: string, location: string): Promise<BusinessData[]> {
    const results: BusinessData[] = []

    try {
      // Google Places search
      const googleResults = await this.googlePlaces.searchPlaces(businessName, location)
      for (const result of googleResults.slice(0, 3)) {
        const details = await this.googlePlaces.getPlaceDetails(result.place_id)
        results.push(this.transformGoogleData(details, 'google'))
      }
    } catch (error) {
      console.warn('Google Places API error:', error)
    }

    try {
      // Yelp search
      const yelpResults = await this.yelp.searchBusinesses(businessName, location)
      for (const business of yelpResults.businesses.slice(0, 3)) {
        const details = await this.yelp.getBusinessDetails(business.id)
        results.push(this.transformYelpData(details, 'yelp'))
      }
    } catch (error) {
      console.warn('Yelp API error:', error)
    }

    return results
  }

  // Get local events
  async getLocalEvents(location: string = 'Pittsburgh'): Promise<EventData[]> {
    const events: EventData[] = []

    try {
      const eventbriteEvents = await this.eventbrite.searchEvents('', location)
      for (const event of eventbriteEvents.events.slice(0, 10)) {
        events.push(this.transformEventbriteData(event, 'eventbrite'))
      }
    } catch (error) {
      console.warn('Eventbrite API error:', error)
    }

    return events
  }

  // Get weather data for locations
  async getWeatherData(lat: number, lng: number): Promise<any> {
    return await this.weather.getCurrentWeather(lat, lng)
  }

  // Transform Google Places data to our format
  private transformGoogleData(data: any, source: 'google'): BusinessData {
    return {
      id: data.place_id,
      name: data.name,
      category: data.types?.[0] || 'business',
      address: this.parseAddress(data.formatted_address),
      coordinates: {
        lat: data.geometry.location.lat,
        lng: data.geometry.location.lng
      },
      phone: data.formatted_phone_number,
      website: data.website,
      rating: data.rating,
      reviewCount: data.user_ratings_total,
      priceRange: '$'.repeat(data.price_level || 1),
      hours: data.opening_hours,
      photos: data.photos?.map((photo: any) => photo.photo_reference) || [],
      description: data.editorial_summary?.overview,
      source,
      lastUpdated: new Date(),
      verified: true
    }
  }

  // Transform Yelp data to our format
  private transformYelpData(data: any, source: 'yelp'): BusinessData {
    return {
      id: data.id,
      name: data.name,
      category: data.categories?.[0]?.title || 'business',
      address: {
        street: data.location?.address1 || '',
        city: data.location?.city || '',
        state: data.location?.state || '',
        zipCode: data.location?.zip_code || '',
        country: 'US'
      },
      coordinates: {
        lat: data.coordinates?.latitude || 0,
        lng: data.coordinates?.longitude || 0
      },
      phone: data.display_phone,
      website: data.url,
      rating: data.rating,
      reviewCount: data.review_count,
      priceRange: data.price,
      hours: data.hours,
      photos: data.photos || [],
      description: data.description,
      source,
      lastUpdated: new Date(),
      verified: true
    }
  }

  // Transform Eventbrite data
  private transformEventbriteData(data: any, source: 'eventbrite'): EventData {
    return {
      id: data.id,
      title: data.name.text,
      description: data.description?.text || '',
      startDate: new Date(data.start.local),
      endDate: data.end ? new Date(data.end.local) : undefined,
      location: {
        name: data.venue?.name || 'TBD',
        address: data.venue ? `${data.venue.address.localized_address_display}` : 'TBD',
        coordinates: {
          lat: data.venue?.latitude || 40.4406,
          lng: data.venue?.longitude || -79.9959
        }
      },
      organizer: data.organizer?.name || 'Unknown',
      price: data.ticket_availability ? {
        min: data.ticket_availability.minimum_ticket_price?.major_value || 0,
        max: data.ticket_availability.maximum_ticket_price?.major_value || 0,
        currency: 'USD'
      } : undefined,
      category: data.category?.name || 'General',
      url: data.url,
      image: data.logo?.url,
      source,
      lastUpdated: new Date()
    }
  }

  // Parse address string into components
  private parseAddress(formattedAddress: string): BusinessData['address'] {
    const parts = formattedAddress.split(', ')
    return {
      street: parts[0] || '',
      city: parts[1] || '',
      state: parts[2]?.split(' ')[0] || '',
      zipCode: parts[2]?.split(' ')[1] || '',
      country: 'US'
    }
  }
}

// Initialize aggregator with default config
export const businessAggregator = new BusinessDataAggregator(DEFAULT_API_CONFIG)

// Business aggregator is available as a named export
