// Real-Time Data Aggregator for PittsburghEverything.com
// Live integration with multiple APIs for current events, news, weather, and deals

import { businessAggregator } from './businessApiIntegration'

// Real-time data interfaces
export interface LiveEvent {
  id: string
  title: string
  description: string
  startDate: Date
  endDate?: Date
  location: {
    name: string
    address: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  category: string
  price?: {
    min: number
    max: number
    currency: string
  }
  source: 'eventbrite' | 'facebook' | 'google' | 'ticketmaster' | 'local'
  url?: string
  image?: string
  lastUpdated: Date
  verified: boolean
}

export interface LiveNews {
  id: string
  title: string
  summary: string
  content?: string
  author: string
  publishedAt: Date
  category: string
  tags: string[]
  image?: string
  url: string
  source: 'post-gazette' | 'trib-live' | 'cbs-pittsburgh' | 'wpxi' | 'rss'
  location?: string
}

export interface LiveDeal {
  id: string
  title: string
  businessName: string
  businessId: string
  description: string
  discount: string
  category: string
  validFrom: Date
  validUntil: Date
  location: string
  terms: string[]
  source: 'yelp' | 'google' | 'manual' | 'groupon' | 'retailmenot'
  url?: string
  image?: string
  lastUpdated: Date
}

export interface LiveWeather {
  location: string
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  windDirection: string
  conditions: string
  icon: string
  forecast: Array<{
    date: Date
    high: number
    low: number
    conditions: string
    icon: string
    precipitation: number
  }>
  alerts?: Array<{
    title: string
    description: string
    severity: 'minor' | 'moderate' | 'severe' | 'extreme'
    start: Date
    end: Date
  }>
  lastUpdated: Date
}

// API Configuration
const API_ENDPOINTS = {
  // News APIs
  newsAPI: 'https://newsapi.org/v2',
  // Weather APIs
  openWeather: 'https://api.openweathermap.org/data/2.5',
  // Event APIs
  eventbrite: 'https://www.eventbriteapi.com/v3',
  ticketmaster: 'https://app.ticketmaster.com/discovery/v2',
  // Deal APIs
  groupon: 'https://partner-api.groupon.com/deals.json',
  retailMeNot: 'https://api.retailmenot.com/v1'
}

// Real-Time Events Aggregator
export class LiveEventsAggregator {
  private cache: Map<string, { data: LiveEvent[], timestamp: number }> = new Map()
  private readonly CACHE_DURATION = 15 * 60 * 1000 // 15 minutes

  async getLiveEvents(location: string = 'Pittsburgh', radius: number = 25): Promise<LiveEvent[]> {
    const cacheKey = `events-${location}-${radius}`
    const cached = this.cache.get(cacheKey)

    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    const events: LiveEvent[] = []

    try {
      // Eventbrite API
      const eventbriteEvents = await this.fetchEventbriteEvents(location)
      events.push(...eventbriteEvents)
    } catch (error) {
      console.warn('Eventbrite API error:', error)
    }

    try {
      // Ticketmaster API
      const ticketmasterEvents = await this.fetchTicketmasterEvents(location)
      events.push(...ticketmasterEvents)
    } catch (error) {
      console.warn('Ticketmaster API error:', error)
    }

    try {
      // Facebook Events (if available)
      const facebookEvents = await this.fetchFacebookEvents(location)
      events.push(...facebookEvents)
    } catch (error) {
      console.warn('Facebook Events API error:', error)
    }

    // Sort by date and deduplicate
    const uniqueEvents = this.deduplicateEvents(events)
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
      .slice(0, 50) // Limit to 50 events

    // Cache the results
    this.cache.set(cacheKey, {
      data: uniqueEvents,
      timestamp: Date.now()
    })

    return uniqueEvents
  }

  private async fetchEventbriteEvents(location: string): Promise<LiveEvent[]> {
    if (!process.env.EVENTBRITE_API_KEY) return []

    const params = new URLSearchParams({
      q: `Pittsburgh ${location}`,
      'location.address': `${location}, PA`,
      'location.within': '25mi',
      expand: 'venue,organizer',
      status: 'live',
      sort_by: 'date'
    })

    const response = await fetch(`${API_ENDPOINTS.eventbrite}/events/search/?${params}`, {
      headers: {
        'Authorization': `Bearer ${process.env.EVENTBRITE_API_KEY}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) return []

    const data = await response.json()
    return data.events.map(this.transformEventbriteEvent)
  }

  private async fetchTicketmasterEvents(location: string): Promise<LiveEvent[]> {
    if (!process.env.TICKETMASTER_API_KEY) return []

    const params = new URLSearchParams({
      apikey: process.env.TICKETMASTER_API_KEY,
      city: location,
      stateCode: 'PA',
      size: '20',
      sort: 'date,asc'
    })

    const response = await fetch(`${API_ENDPOINTS.ticketmaster}/events.json?${params}`)
    if (!response.ok) return []

    const data = await response.json()
    return data._embedded?.events?.map(this.transformTicketmasterEvent) || []
  }

  private async fetchFacebookEvents(location: string): Promise<LiveEvent[]> {
    // Facebook Events API would require special setup
    // For now, return empty array
    return []
  }

  private transformEventbriteEvent(event: any): LiveEvent {
    return {
      id: `eventbrite-${event.id}`,
      title: event.name.text,
      description: event.description?.text || event.name.text,
      startDate: new Date(event.start.local),
      endDate: event.end ? new Date(event.end.local) : undefined,
      location: {
        name: event.venue?.name || 'TBD',
        address: event.venue ? `${event.venue.address.localized_address_display}` : 'TBD',
        coordinates: event.venue ? {
          lat: event.venue.latitude,
          lng: event.venue.longitude
        } : undefined
      },
      category: event.category?.name || 'General',
      price: event.ticket_availability ? {
        min: event.ticket_availability.minimum_ticket_price?.major_value || 0,
        max: event.ticket_availability.maximum_ticket_price?.major_value || 0,
        currency: 'USD'
      } : undefined,
      source: 'eventbrite',
      url: event.url,
      image: event.logo?.url,
      lastUpdated: new Date(),
      verified: true
    }
  }

  private transformTicketmasterEvent(event: any): LiveEvent {
    return {
      id: `ticketmaster-${event.id}`,
      title: event.name,
      description: event.info || event.pleaseNote || event.name,
      startDate: new Date(event.dates.start.dateTime),
      location: {
        name: event._embedded?.venues?.[0]?.name || 'TBD',
        address: event._embedded?.venues?.[0] ?
          `${event._embedded.venues[0].address?.line1 || ''}, ${event._embedded.venues[0].city?.name || ''}` : 'TBD'
      },
      category: event.classifications?.[0]?.segment?.name || 'Entertainment',
      price: event.priceRanges ? {
        min: event.priceRanges[0].min,
        max: event.priceRanges[0].max,
        currency: event.priceRanges[0].currency
      } : undefined,
      source: 'ticketmaster',
      url: event.url,
      image: event.images?.find((img: any) => img.ratio === '16_9')?.url,
      lastUpdated: new Date(),
      verified: true
    }
  }

  private deduplicateEvents(events: LiveEvent[]): LiveEvent[] {
    const seen = new Set<string>()
    return events.filter(event => {
      const key = `${event.title}-${event.location.name}-${event.startDate.toDateString()}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }
}

// Live News Aggregator
export class LiveNewsAggregator {
  private cache: Map<string, { data: LiveNews[], timestamp: number }> = new Map()
  private readonly CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

  async getLiveNews(location: string = 'Pittsburgh', limit: number = 20): Promise<LiveNews[]> {
    const cacheKey = `news-${location}`
    const cached = this.cache.get(cacheKey)

    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    const news: LiveNews[] = []

    try {
      // NewsAPI for Pittsburgh news
      const newsApiArticles = await this.fetchNewsAPI(location)
      news.push(...newsApiArticles)
    } catch (error) {
      console.warn('NewsAPI error:', error)
    }

    try {
      // RSS feeds from local news sources
      const rssArticles = await this.fetchRSSFeeds()
      news.push(...rssArticles)
    } catch (error) {
      console.warn('RSS fetch error:', error)
    }

    // Sort by date and deduplicate
    const uniqueNews = this.deduplicateNews(news)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, limit)

    // Cache the results
    this.cache.set(cacheKey, {
      data: uniqueNews,
      timestamp: Date.now()
    })

    return uniqueNews
  }

  private async fetchNewsAPI(location: string): Promise<LiveNews[]> {
    if (!process.env.NEWSAPI_KEY) return []

    const params = new URLSearchParams({
      q: `"${location}" OR Pittsburgh`,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: '20',
      apiKey: process.env.NEWSAPI_KEY
    })

    const response = await fetch(`${API_ENDPOINTS.newsAPI}/everything?${params}`)
    if (!response.ok) return []

    const data = await response.json()
    return data.articles.map((article: any) => ({
      id: `newsapi-${btoa(article.url).slice(0, 10)}`,
      title: article.title,
      summary: article.description,
      content: article.content,
      author: article.author || article.source.name,
      publishedAt: new Date(article.publishedAt),
      category: this.categorizeArticle(article.title + ' ' + article.description),
      tags: this.extractTags(article.title + ' ' + article.description),
      image: article.urlToImage,
      url: article.url,
      source: 'post-gazette' as const,
      location: location
    }))
  }

  private async fetchRSSFeeds(): Promise<LiveNews[]> {
    // In a real implementation, you'd fetch from RSS feeds of:
    // - Pittsburgh Post-Gazette
    // - TribLIVE
    // - CBS Pittsburgh
    // - WPXI
    // For now, return sample data
    return []
  }

  private categorizeArticle(text: string): string {
    const lowerText = text.toLowerCase()

    if (lowerText.includes('restaurant') || lowerText.includes('food') || lowerText.includes('dining')) {
      return 'Food & Dining'
    }
    if (lowerText.includes('sports') || lowerText.includes('steelers') || lowerText.includes('penguins')) {
      return 'Sports'
    }
    if (lowerText.includes('business') || lowerText.includes('economy') || lowerText.includes('jobs')) {
      return 'Business'
    }
    if (lowerText.includes('weather') || lowerText.includes('storm') || lowerText.includes('temperature')) {
      return 'Weather'
    }
    if (lowerText.includes('event') || lowerText.includes('festival') || lowerText.includes('concert')) {
      return 'Events'
    }

    return 'Local News'
  }

  private extractTags(text: string): string[] {
    const tags: string[] = []
    const lowerText = text.toLowerCase()

    if (lowerText.includes('pittsburgh')) tags.push('pittsburgh')
    if (lowerText.includes('downtown')) tags.push('downtown')
    if (lowerText.includes('oakland')) tags.push('oakland')
    if (lowerText.includes('restaurant')) tags.push('restaurants')
    if (lowerText.includes('food')) tags.push('food')
    if (lowerText.includes('event')) tags.push('events')
    if (lowerText.includes('sports')) tags.push('sports')

    return tags
  }

  private deduplicateNews(news: LiveNews[]): LiveNews[] {
    const seen = new Set<string>()
    return news.filter(item => {
      const key = `${item.title}-${item.source}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }
}

// Live Weather Aggregator
export class LiveWeatherAggregator {
  private cache: Map<string, { data: LiveWeather, timestamp: number }> = new Map()
  private readonly CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

  async getLiveWeather(lat: number, lng: number, location: string = 'Pittsburgh'): Promise<LiveWeather> {
    const cacheKey = `weather-${lat}-${lng}`
    const cached = this.cache.get(cacheKey)

    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    if (!process.env.OPENWEATHER_API_KEY) {
      throw new Error('OpenWeather API key not configured')
    }

    // Current weather
    const currentParams = new URLSearchParams({
      lat: lat.toString(),
      lon: lng.toString(),
      appid: process.env.OPENWEATHER_API_KEY,
      units: 'imperial'
    })

    const currentResponse = await fetch(`${API_ENDPOINTS.openWeather}/weather?${currentParams}`)
    if (!currentResponse.ok) {
      throw new Error('Failed to fetch current weather')
    }

    const currentData = await currentResponse.json()

    // 7-day forecast
    const forecastParams = new URLSearchParams({
      lat: lat.toString(),
      lon: lng.toString(),
      appid: process.env.OPENWEATHER_API_KEY,
      units: 'imperial',
      cnt: '7'
    })

    const forecastResponse = await fetch(`${API_ENDPOINTS.openWeather}/forecast?${forecastParams}`)
    const forecastData = forecastResponse.ok ? await forecastResponse.json() : null

    const weather: LiveWeather = {
      location,
      temperature: Math.round(currentData.main.temp),
      feelsLike: Math.round(currentData.main.feels_like),
      humidity: currentData.main.humidity,
      windSpeed: Math.round(currentData.wind.speed),
      windDirection: this.getWindDirection(currentData.wind.deg),
      conditions: currentData.weather[0].main,
      icon: currentData.weather[0].icon,
      forecast: forecastData ? forecastData.list
        .filter((item: any, index: number) => index % 8 === 0) // One per day
        .slice(0, 7)
        .map((item: any) => ({
          date: new Date(item.dt * 1000),
          high: Math.round(item.main.temp_max),
          low: Math.round(item.main.temp_min),
          conditions: item.weather[0].main,
          icon: item.weather[0].icon,
          precipitation: item.pop * 100 // Probability as percentage
        })) : [],
      lastUpdated: new Date()
    }

    // Cache the results
    this.cache.set(cacheKey, {
      data: weather,
      timestamp: Date.now()
    })

    return weather
  }

  private getWindDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    const index = Math.round(degrees / 22.5) % 16
    return directions[index]
  }
}

// Live Deals Aggregator
export class LiveDealsAggregator {
  private cache: Map<string, { data: LiveDeal[], timestamp: number }> = new Map()
  private readonly CACHE_DURATION = 60 * 60 * 1000 // 1 hour

  async getLiveDeals(location: string = 'Pittsburgh'): Promise<LiveDeal[]> {
    const cacheKey = `deals-${location}`
    const cached = this.cache.get(cacheKey)

    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    const deals: LiveDeal[] = []

    try {
      // Groupon API
      const grouponDeals = await this.fetchGrouponDeals(location)
      deals.push(...grouponDeals)
    } catch (error) {
      console.warn('Groupon API error:', error)
    }

    try {
      // RetailMeNot API
      const retailMeNotDeals = await this.fetchRetailMeNotDeals()
      deals.push(...retailMeNotDeals)
    } catch (error) {
      console.warn('RetailMeNot API error:', error)
    }

    // Deduplicate and sort by validity
    const uniqueDeals = this.deduplicateDeals(deals)
      .filter(deal => deal.validUntil > new Date()) // Only current deals
      .sort((a, b) => a.validUntil.getTime() - b.validUntil.getTime())
      .slice(0, 30) // Limit to 30 deals

    // Cache the results
    this.cache.set(cacheKey, {
      data: uniqueDeals,
      timestamp: Date.now()
    })

    return uniqueDeals
  }

  private async fetchGrouponDeals(location: string): Promise<LiveDeal[]> {
    // Groupon API implementation would go here
    // For now, return empty array
    return []
  }

  private async fetchRetailMeNotDeals(): Promise<LiveDeal[]> {
    // RetailMeNot API implementation would go here
    // For now, return empty array
    return []
  }

  private deduplicateDeals(deals: LiveDeal[]): LiveDeal[] {
    const seen = new Set<string>()
    return deals.filter(deal => {
      const key = `${deal.businessName}-${deal.title}-${deal.discount}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }
}

// Main Real-Time Data Manager
export class RealTimeDataManager {
  public events: LiveEventsAggregator
  public news: LiveNewsAggregator
  public weather: LiveWeatherAggregator
  public deals: LiveDealsAggregator

  constructor() {
    this.events = new LiveEventsAggregator()
    this.news = new LiveNewsAggregator()
    this.weather = new LiveWeatherAggregator()
    this.deals = new LiveDealsAggregator()
  }

  // Get comprehensive real-time data for a location
  async getLocationData(location: string, lat?: number, lng?: number): Promise<{
    events: LiveEvent[]
    news: LiveNews[]
    weather?: LiveWeather
    deals: LiveDeal[]
  }> {
    const [events, news, deals] = await Promise.all([
      this.events.getLiveEvents(location),
      this.news.getLiveNews(location, 10),
      this.deals.getLiveDeals(location)
    ])

    let weather: LiveWeather | undefined
    if (lat && lng) {
      try {
        weather = await this.weather.getLiveWeather(lat, lng, location)
      } catch (error) {
        console.warn('Weather fetch failed:', error)
      }
    }

    return {
      events,
      news,
      weather,
      deals
    }
  }

  // Get emergency/local alerts
  async getLocalAlerts(location: string): Promise<any[]> {
    // Implementation for weather alerts, local emergencies, etc.
    // For now, return empty array
    return []
  }

  // Refresh all cached data
  async refreshAllData(): Promise<void> {
    // Clear all caches to force fresh data on next request
    this.events['cache'].clear()
    this.news['cache'].clear()
    this.weather['cache'].clear()
    this.deals['cache'].clear()

    console.log('All real-time data caches cleared - fresh data will be fetched on next request')
  }
}

// Initialize the real-time data manager
export const realTimeDataManager = new RealTimeDataManager()
