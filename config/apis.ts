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

  pittsburghRegionalTransit: {
    name: 'Pittsburgh Regional Transit',
    description: 'PRT ConnectCard and transit information',
    url: 'https://www.rideprt.org',
    freeTier: 'Public transit data access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['transit routes', 'fares', 'schedules', 'accessibility info'],
    status: 'inactive',
    category: 'transit'
  },

  pittsburghParks: {
    name: 'Pittsburgh Parks & Recreation',
    description: 'Park facilities, programs, and recreational activities',
    url: 'https://pittsburghpa.gov/parks',
    freeTier: 'Public information access',
    rateLimit: 'None specified',
    enabled: false,
    dataTypes: ['park locations', 'facilities', 'programs', 'events'],
    status: 'inactive',
    category: 'culture'
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

