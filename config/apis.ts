// Free API Configuration for PittsburghEverything
// All APIs listed here are free and don't require API keys for basic usage

export interface APIConfig {
  name: string
  description: string
  url: string
  freeTier: string
  rateLimit: string
  enabled: boolean
  dataTypes: string[]
  lastUsed?: Date
  status: 'active' | 'inactive' | 'error'
}

export const FREE_APIS: Record<string, APIConfig> = {
  openWeatherMap: {
    name: 'OpenWeatherMap',
    description: 'Current weather, forecasts, and air quality data',
    url: 'https://openweathermap.org/api',
    freeTier: '1000 calls/day, 60 calls/minute',
    rateLimit: '60/minute',
    enabled: true,
    dataTypes: ['current weather', '5-day forecast', 'air quality', 'historical weather'],
    status: 'active'
  },

  espn: {
    name: 'ESPN API',
    description: 'Sports scores, schedules, and team information',
    url: 'https://site.api.espn.com/apis/site/v2/sports',
    freeTier: 'Unlimited (no key required)',
    rateLimit: 'None specified',
    enabled: true,
    dataTypes: ['live scores', 'schedules', 'team stats', 'player info'],
    status: 'active'
  },

  portAuthority: {
    name: 'Port Authority of Allegheny County',
    description: 'Real-time bus and light rail information',
    url: 'https://realtime.portauthority.org',
    freeTier: 'Unlimited public access',
    rateLimit: 'None specified',
    enabled: true,
    dataTypes: ['bus arrivals', 'route info', 'service alerts', 'vehicle locations'],
    status: 'active'
  },

  pittsburghOpenData: {
    name: 'City of Pittsburgh Open Data',
    description: 'Public data about parking, permits, and city services',
    url: 'https://data.wprdc.org',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: true,
    dataTypes: ['parking meters', 'building permits', 'crime data', 'business licenses'],
    status: 'active'
  },

  newsApi: {
    name: 'NewsAPI',
    description: 'Local and national news headlines',
    url: 'https://newsapi.org',
    freeTier: '100 requests/day (free tier)',
    rateLimit: '100/day',
    enabled: true,
    dataTypes: ['headlines', 'articles', 'sources', 'categories'],
    status: 'active'
  },

  googlePlaces: {
    name: 'Google Places API',
    description: 'Business listings, reviews, and location data',
    url: 'https://developers.google.com/places',
    freeTier: '$200/month credit (about 40,000 calls)',
    rateLimit: '60/minute',
    enabled: false, // Requires API key
    dataTypes: ['business details', 'reviews', 'photos', 'place search'],
    status: 'inactive'
  },

  yelpFusion: {
    name: 'Yelp Fusion API',
    description: 'Restaurant and business reviews, ratings',
    url: 'https://www.yelp.com/developers',
    freeTier: '300 calls/day (free tier)',
    rateLimit: '300/day',
    enabled: false, // Requires API key
    dataTypes: ['business reviews', 'ratings', 'photos', 'business info'],
    status: 'inactive'
  },

  eventbrite: {
    name: 'Eventbrite API',
    description: 'Local events, tickets, and venue information',
    url: 'https://www.eventbrite.com/platform/api/',
    freeTier: '1000 calls/month (free tier)',
    rateLimit: '1000/month',
    enabled: false, // Requires API key
    dataTypes: ['events', 'tickets', 'venues', 'categories'],
    status: 'inactive'
  },

  ticketmaster: {
    name: 'Ticketmaster Discovery API',
    description: 'Events, concerts, sports tickets',
    url: 'https://developer.ticketmaster.com/',
    freeTier: '5000 calls/month (free tier)',
    rateLimit: '5000/month',
    enabled: false, // Requires API key
    dataTypes: ['events', 'venues', 'artists', 'tickets'],
    status: 'inactive'
  },

  foursquare: {
    name: 'Foursquare Places API',
    description: 'Venue and location data, check-ins',
    url: 'https://developer.foursquare.com/',
    freeTier: '99,500 calls/month (free tier)',
    rateLimit: '99,500/month',
    enabled: false, // Requires API key
    dataTypes: ['venues', 'places', 'check-ins', 'photos'],
    status: 'inactive'
  },

  mapbox: {
    name: 'Mapbox',
    description: 'Maps, geocoding, and location services',
    url: 'https://www.mapbox.com/',
    freeTier: '50,000 requests/month',
    rateLimit: '50,000/month',
    enabled: false, // Requires API key
    dataTypes: ['maps', 'geocoding', 'directions', 'places'],
    status: 'inactive'
  },

  here: {
    name: 'HERE Technologies',
    description: 'Maps, routing, and location services',
    url: 'https://developer.here.com/',
    freeTier: '250,000 transactions/month',
    rateLimit: '250,000/month',
    enabled: false, // Requires API key
    dataTypes: ['routing', 'geocoding', 'traffic', 'places'],
    status: 'inactive'
  }
}

// Active free APIs that don't require keys
export const ACTIVE_FREE_APIS = Object.entries(FREE_APIS)
  .filter(([, config]) => config.enabled && config.status === 'active')
  .map(([key, config]) => ({ key, ...config }))

// APIs that require keys but offer generous free tiers
export const PREMIUM_FREE_APIS = Object.entries(FREE_APIS)
  .filter(([, config]) => !config.enabled && config.freeTier.includes('free tier'))
  .map(([key, config]) => ({ key, ...config }))

export function getAPIConfig(apiKey: string): APIConfig | null {
  return FREE_APIS[apiKey] || null
}

export function updateAPIStatus(apiKey: string, status: 'active' | 'inactive' | 'error') {
  if (FREE_APIS[apiKey]) {
    FREE_APIS[apiKey].status = status
    FREE_APIS[apiKey].lastUsed = new Date()
  }
}

export function getAPIUsageSummary() {
  const active = ACTIVE_FREE_APIS.length
  const premium = PREMIUM_FREE_APIS.length
  const total = Object.keys(FREE_APIS).length

  return {
    active,
    premium,
    total,
    activePercentage: Math.round((active / total) * 100),
    premiumPercentage: Math.round((premium / total) * 100)
  }
}

// API endpoints for different services
export const API_ENDPOINTS = {
  weather: {
    current: 'https://api.openweathermap.org/data/2.5/weather',
    forecast: 'https://api.openweathermap.org/data/2.5/forecast',
    historical: 'https://api.openweathermap.org/data/2.5/onecall/timemachine'
  },
  sports: {
    nfl: 'https://site.api.espn.com/apis/site/v2/sports/football/nfl',
    steelers: 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/pit'
  },
  transit: {
    busTime: 'https://realtime.portauthority.org/bustime/api/v3',
    predictions: 'https://realtime.portauthority.org/bustime/api/v3/getpredictions',
    routes: 'https://realtime.portauthority.org/bustime/api/v3/getroutes'
  },
  news: {
    headlines: 'https://newsapi.org/v2/top-headlines',
    everything: 'https://newsapi.org/v2/everything',
    sources: 'https://newsapi.org/v2/sources'
  },
  pittsburghData: {
    parking: 'https://data.wprdc.org/api/3/action/datastore_search',
    permits: 'https://data.wprdc.org/api/3/action/datastore_search',
    crime: 'https://data.wprdc.org/api/3/action/datastore_search'
  }
} as const

// Default API keys (empty for free APIs, placeholder for others)
export const API_KEYS = {
  openWeatherMap: '', // Free tier doesn't require key
  newsApi: '', // Use demo for free tier
  googlePlaces: process.env.GOOGLE_PLACES_API_KEY || '',
  yelpFusion: process.env.YELP_API_KEY || '',
  eventbrite: process.env.EVENTBRITE_API_KEY || '',
  ticketmaster: process.env.TICKETMASTER_API_KEY || '',
  foursquare: process.env.FOURSQUARE_API_KEY || '',
  mapbox: process.env.MAPBOX_API_KEY || '',
  here: process.env.HERE_API_KEY || ''
} as const

// Pittsburgh-specific API configurations
export const PITTSBURGH_CONFIG = {
  coordinates: {
    lat: 40.4406,
    lng: -79.9959
  },
  timezone: 'America/New_York',
  county: 'Allegheny',
  state: 'PA',
  zipCode: '15201'
} as const
