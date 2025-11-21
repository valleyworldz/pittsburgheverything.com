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

// ===== API CATEGORIES =====
// Each API belongs to one primary category for better organization

export const API_CATEGORIES = {
  weather: 'Weather & Environment',
  sports: 'Sports & Entertainment',
  transit: 'Transportation & Transit',
  government: 'Government & Public Data',
  health: 'Health & Education',
  business: 'Business & Economy',
  culture: 'Culture & Recreation',
  utilities: 'Utilities & Tools'
} as const

export const FREE_APIS: Record<string, APIConfig> = {
  // ===== WEATHER & ENVIRONMENT =====
  openWeatherMap: {
    name: 'OpenWeatherMap',
    description: 'Current weather, forecasts, and air quality data',
    url: 'https://openweathermap.org/api',
    freeTier: '1000 calls/day, 60 calls/minute',
    rateLimit: '60/minute',
    enabled: true,
    dataTypes: ['current weather', '5-day forecast', 'air quality', 'historical weather'],
    status: 'active',
    category: 'weather'
  },

  nationalWeatherService: {
    name: 'National Weather Service',
    description: 'Official US weather data with detailed forecasts',
    url: 'https://api.weather.gov',
    freeTier: 'Unlimited public access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['detailed forecasts', 'weather alerts', 'radar data', 'observations'],
    status: 'inactive',
    category: 'weather'
  },

  epa: {
    name: 'EPA Air Quality API',
    description: 'Air quality data and environmental information',
    url: 'https://aqs.epa.gov/data/api',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['air quality', 'pollution data', 'environmental alerts'],
    status: 'inactive',
    category: 'weather'
  },

  // ===== SPORTS & ENTERTAINMENT =====
  espn: {
    name: 'ESPN API',
    description: 'Sports scores, schedules, and team information',
    url: 'https://site.api.espn.com/apis/site/v2/sports',
    freeTier: 'Unlimited (no key required)',
    rateLimit: 'None specified',
    enabled: true,
    dataTypes: ['live scores', 'schedules', 'team stats', 'player info'],
    status: 'active',
    category: 'sports'
  },

  nhl: {
    name: 'NHL API',
    description: 'NHL scores, schedules, and Penguins information',
    url: 'https://statsapi.web.nhl.com/api/v1',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['nhl scores', 'penguins stats', 'schedules', 'player info'],
    status: 'inactive',
    category: 'sports'
  },

  mlb: {
    name: 'MLB API',
    description: 'MLB scores, schedules, and Pirates information',
    url: 'https://statsapi.mlb.com/api/v1',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['mlb scores', 'pirates stats', 'schedules', 'player info'],
    status: 'inactive',
    category: 'sports'
  },

  // ===== TRANSPORTATION & TRANSIT =====
  portAuthority: {
    name: 'Port Authority of Allegheny County',
    description: 'Real-time bus and light rail information',
    url: 'https://realtime.portauthority.org',
    freeTier: 'Unlimited public access',
    rateLimit: 'None specified',
    enabled: true,
    dataTypes: ['bus arrivals', 'route info', 'service alerts', 'vehicle locations'],
    status: 'active',
    category: 'transit'
  },

  transitland: {
    name: 'Transitland',
    description: 'Global public transit data and GTFS feeds',
    url: 'https://www.transit.land',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['global transit', 'GTFS feeds', 'route planning', 'accessibility'],
    status: 'inactive',
    category: 'transit'
  },

  amtrak: {
    name: 'Amtrak API',
    description: 'Train schedules and station information',
    url: 'https://api.amtrak.com',
    freeTier: 'Limited public access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['train schedules', 'station info', 'routes'],
    status: 'inactive',
    category: 'transit'
  },

  // ===== GOVERNMENT & PUBLIC DATA =====
  pittsburghOpenData: {
    name: 'City of Pittsburgh Open Data',
    description: 'Public data about parking, permits, and city services',
    url: 'https://data.wprdc.org',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: true,
    dataTypes: ['parking meters', 'building permits', 'crime data', 'business licenses'],
    status: 'active',
    category: 'government'
  },

  alleghenyCountyOpenData: {
    name: 'Allegheny County Open Data',
    description: 'County-wide data including health, education, and public services',
    url: 'https://data.alleghenycounty.us',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['health data', 'education stats', 'property data', 'demographics'],
    status: 'inactive',
    category: 'government'
  },

  census: {
    name: 'US Census Bureau API',
    description: 'Demographic and population data',
    url: 'https://www.census.gov/data/developers/data-sets.html',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['population data', 'demographics', 'housing stats'],
    status: 'inactive',
    category: 'government'
  },

  // ===== HEALTH & EDUCATION =====
  cdc: {
    name: 'CDC Data API',
    description: 'Public health data and statistics',
    url: 'https://data.cdc.gov/resource',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['health stats', 'disease tracking', 'vaccination data'],
    status: 'inactive',
    category: 'health'
  },

  // ===== BUSINESS & ECONOMY =====
  bls: {
    name: 'Bureau of Labor Statistics API',
    description: 'Employment, unemployment, and economic data',
    url: 'https://www.bls.gov/developers/api_signature_v2.htm',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['employment data', 'wage info', 'economic indicators'],
    status: 'inactive',
    category: 'business'
  },

  treasury: {
    name: 'US Treasury API',
    description: 'Economic data and government financial information',
    url: 'https://fiscaldata.treasury.gov/services/api/fiscal_service',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['economic indicators', 'government spending', 'debt data'],
    status: 'inactive',
    category: 'business'
  },

  usda: {
    name: 'USDA API',
    description: 'Agriculture, food, and rural development data',
    url: 'https://www.usda.gov/data.json',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['food data', 'agricultural info', 'rural development'],
    status: 'inactive',
    category: 'business'
  },

  // ===== CULTURE & RECREATION =====
  smithsonian: {
    name: 'Smithsonian Open Access API',
    description: 'Museum collections and educational content',
    url: 'https://api.si.edu/openaccess/api/v1.0',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['museum collections', 'artifacts', 'educational content'],
    status: 'inactive',
    category: 'culture'
  },

  loc: {
    name: 'Library of Congress API',
    description: 'Historical documents, photos, and cultural resources',
    url: 'https://www.loc.gov/apis',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['historical photos', 'documents', 'cultural resources'],
    status: 'inactive',
    category: 'culture'
  },

  recreationGov: {
    name: 'Recreation.gov',
    description: 'National parks, campgrounds, and outdoor recreation',
    url: 'https://ridb.recreation.gov',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['campgrounds', 'trails', 'permits', 'facilities'],
    status: 'inactive',
    category: 'culture'
  },

  // ===== NEWS & INFORMATION =====
  newsApi: {
    name: 'NewsAPI',
    description: 'Local and national news headlines',
    url: 'https://newsapi.org',
    freeTier: '100 requests/day (free tier)',
    rateLimit: '100/day',
    enabled: true,
    dataTypes: ['headlines', 'articles', 'sources', 'categories'],
    status: 'active',
    category: 'culture'
  },

  // ===== UTILITIES & TOOLS =====
  icanhazdadjoke: {
    name: 'icanhazdadjoke API',
    description: 'Random dad jokes for fun content',
    url: 'https://icanhazdadjoke.com/api',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['jokes', 'humor', 'entertainment'],
    status: 'inactive',
    category: 'utilities'
  },

  qrCodeMonkey: {
    name: 'QR Code Monkey API',
    description: 'Generate QR codes for sharing',
    url: 'https://www.qrcode-monkey.com',
    freeTier: 'Limited free access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['qr codes', 'sharing', 'utilities'],
    status: 'inactive',
    category: 'utilities'
  },

  jsonplaceholder: {
    name: 'JSONPlaceholder',
    description: 'Fake REST API for testing and prototyping',
    url: 'https://jsonplaceholder.typicode.com',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['test data', 'prototyping', 'development'],
    status: 'inactive',
    category: 'utilities'
  },

  // ===== PITTSBURGH-SPECIFIC FREE APIs =====
  alleghenyCountyOpenData: {
    name: 'Allegheny County Open Data',
    description: 'County-wide data including health, education, and public services',
    url: 'https://data.alleghenycounty.us',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['health data', 'education stats', 'property data', 'demographics'],
    status: 'inactive'
  },

  pittsburghRegionalTransit: {
    name: 'Pittsburgh Regional Transit',
    description: 'PRT ConnectCard and transit information',
    url: 'https://www.rideprt.org',
    freeTier: 'Public transit data access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['transit routes', 'fares', 'schedules', 'accessibility info'],
    status: 'inactive'
  },

  pittsburghParks: {
    name: 'Pittsburgh Parks & Recreation',
    description: 'Park facilities, programs, and recreational activities',
    url: 'https://pittsburghpa.gov/parks',
    freeTier: 'Public information access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['park locations', 'facilities', 'programs', 'events'],
    status: 'inactive'
  },

  // ===== NATIONAL/REGIONAL FREE APIs =====
  nationalWeatherService: {
    name: 'National Weather Service',
    description: 'Official US weather data with detailed forecasts',
    url: 'https://api.weather.gov',
    freeTier: 'Unlimited public access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['detailed forecasts', 'weather alerts', 'radar data', 'observations'],
    status: 'inactive'
  },

  recreationGov: {
    name: 'Recreation.gov',
    description: 'National parks, campgrounds, and outdoor recreation',
    url: 'https://ridb.recreation.gov',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['campgrounds', 'trails', 'permits', 'facilities'],
    status: 'inactive'
  },

  transitland: {
    name: 'Transitland',
    description: 'Global public transit data and GTFS feeds',
    url: 'https://www.transit.land',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['global transit', 'GTFS feeds', 'route planning', 'accessibility'],
    status: 'inactive'
  },

  // ===== SPORTS & ENTERTAINMENT =====
  nhl: {
    name: 'NHL API',
    description: 'NHL scores, schedules, and Penguins information',
    url: 'https://statsapi.web.nhl.com/api/v1',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['nhl scores', 'penguins stats', 'schedules', 'player info'],
    status: 'inactive'
  },

  mlb: {
    name: 'MLB Stats API',
    description: 'MLB scores, schedules, and Pirates information',
    url: 'https://statsapi.mlb.com/api/v1',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['mlb scores', 'pirates stats', 'schedules', 'player info'],
    status: 'inactive'
  },

  // ===== HEALTH & ENVIRONMENT =====
  epa: {
    name: 'EPA Air Quality API',
    description: 'Air quality data and environmental information',
    url: 'https://aqs.epa.gov/data/api',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['air quality', 'pollution data', 'environmental alerts'],
    status: 'inactive'
  },

  cdc: {
    name: 'CDC Data API',
    description: 'Public health data and statistics',
    url: 'https://data.cdc.gov',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['health stats', 'disease tracking', 'vaccination data'],
    status: 'inactive'
  },

  // ===== EDUCATION & CULTURE =====
  loc: {
    name: 'Library of Congress API',
    description: 'Historical documents, photos, and cultural resources',
    url: 'https://www.loc.gov/apis',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['historical photos', 'documents', 'cultural resources'],
    status: 'inactive'
  },

  smithsonian: {
    name: 'Smithsonian Open Access API',
    description: 'Museum collections and educational content',
    url: 'https://api.si.edu/openaccess/api/v1.0',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['museum collections', 'artifacts', 'educational content'],
    status: 'inactive'
  },

  // ===== TRAVEL & TRANSPORTATION =====
  amtrak: {
    name: 'Amtrak API',
    description: 'Train schedules and station information',
    url: 'https://api.amtrak.com',
    freeTier: 'Limited public access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['train schedules', 'station info', 'routes'],
    status: 'inactive'
  },

  // ===== FINANCIAL & BUSINESS =====
  treasury: {
    name: 'US Treasury API',
    description: 'Economic data and government financial information',
    url: 'https://fiscaldata.treasury.gov/api-documentation',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['economic indicators', 'government spending', 'debt data'],
    status: 'inactive'
  },

  bls: {
    name: 'Bureau of Labor Statistics API',
    description: 'Employment, unemployment, and economic data',
    url: 'https://www.bls.gov/developers/api_signature_v2.htm',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['employment data', 'wage info', 'economic indicators'],
    status: 'inactive'
  },

  // ===== GOVERNMENT & PUBLIC DATA =====
  usda: {
    name: 'USDA API',
    description: 'Agriculture, food, and rural development data',
    url: 'https://www.usda.gov/data.json',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['food data', 'agricultural info', 'rural development'],
    status: 'inactive'
  },

  census: {
    name: 'US Census Bureau API',
    description: 'Demographic and population data',
    url: 'https://www.census.gov/data/developers/data-sets.html',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['population data', 'demographics', 'housing stats'],
    status: 'inactive'
  },

  // ===== UTILITY & INFRASTRUCTURE =====
  icanhazdadjoke: {
    name: 'icanhazdadjoke API',
    description: 'Random dad jokes for fun content',
    url: 'https://icanhazdadjoke.com/api',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['jokes', 'humor', 'entertainment'],
    status: 'inactive'
  },

  qrCodeMonkey: {
    name: 'QR Code Monkey API',
    description: 'Generate QR codes for sharing',
    url: 'https://www.qrcode-monkey.com',
    freeTier: 'Limited free access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['qr codes', 'sharing', 'utilities'],
    status: 'inactive'
  },

  // ===== DEVELOPMENT & TESTING =====
  jsonplaceholder: {
    name: 'JSONPlaceholder',
    description: 'Fake REST API for testing and prototyping',
    url: 'https://jsonplaceholder.typicode.com',
    freeTier: 'Unlimited access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['test data', 'prototyping', 'development'],
    status: 'inactive'
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
  // Weather & Environment
  weather: {
    current: 'https://api.openweathermap.org/data/2.5/weather',
    forecast: 'https://api.openweathermap.org/data/2.5/forecast',
    historical: 'https://api.openweathermap.org/data/2.5/onecall/timemachine',
    nws: 'https://api.weather.gov'
  },

  // Sports & Entertainment
  sports: {
    nfl: 'https://site.api.espn.com/apis/site/v2/sports/football/nfl',
    steelers: 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/pit',
    nhl: 'https://statsapi.web.nhl.com/api/v1',
    penguins: 'https://statsapi.web.nhl.com/api/v1/teams/5',
    mlb: 'https://statsapi.mlb.com/api/v1',
    pirates: 'https://statsapi.mlb.com/api/v1/teams/134'
  },

  // Pittsburgh Local Data
  pittsburghData: {
    parking: 'https://data.wprdc.org/api/3/action/datastore_search',
    permits: 'https://data.wprdc.org/api/3/action/datastore_search',
    crime: 'https://data.wprdc.org/api/3/action/datastore_search',
    business: 'https://data.wprdc.org/api/3/action/datastore_search',
    demographics: 'https://data.wprdc.org/api/3/action/datastore_search'
  },

  alleghenyData: {
    health: 'https://data.alleghenycounty.us/resource',
    education: 'https://data.alleghenycounty.us/resource',
    property: 'https://data.alleghenycounty.us/resource'
  },

  // Transportation
  transit: {
    busTime: 'https://realtime.portauthority.org/bustime/api/v3',
    predictions: 'https://realtime.portauthority.org/bustime/api/v3/getpredictions',
    routes: 'https://realtime.portauthority.org/bustime/api/v3/getroutes',
    transitland: 'https://transit.land/api/v1'
  },

  // National Data
  national: {
    census: 'https://api.census.gov/data',
    bls: 'https://api.bls.gov/publicAPI/v2',
    treasury: 'https://api.fiscaldata.treasury.gov/services/api/fiscal_service',
    epa: 'https://aqs.epa.gov/data/api',
    cdc: 'https://data.cdc.gov/resource',
    usda: 'https://www.usda.gov/data.json'
  },

  // News & Information
  news: {
    headlines: 'https://newsapi.org/v2/top-headlines',
    everything: 'https://newsapi.org/v2/everything',
    sources: 'https://newsapi.org/v2/sources'
  },

  // Culture & Education
  culture: {
    loc: 'https://www.loc.gov/search',
    smithsonian: 'https://api.si.edu/openaccess/api/v1.0',
    recreation: 'https://ridb.recreation.gov/api/v1'
  },

  // Fun & Utility
  fun: {
    jokes: 'https://icanhazdadjoke.com/api',
    qr: 'https://api.qrcode-monkey.com',
    test: 'https://jsonplaceholder.typicode.com'
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
