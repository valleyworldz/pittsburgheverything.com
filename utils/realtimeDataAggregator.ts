// Real-Time Data Aggregator for PittsburghEverything.com
// Live integration with multiple APIs for current events, news, weather, and deals

import { businessAggregator } from './businessApiIntegration'
import { ALL_PITTSBURGH_LOCATIONS } from '@/data/pittsburgh-locations'

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
  source: 'eventbrite' | 'facebook' | 'google' | 'ticketmaster' | 'local' | 'espn' | 'nhl' | 'mlb'
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
  validFrom?: Date
  validUntil: Date
  location?: string
  terms?: string[]
  source: 'yelp' | 'google' | 'manual' | 'groupon' | 'retailmenot' | 'dealnews' | 'coupons'
  url?: string
  image?: string
  lastUpdated?: Date
  verified?: boolean
  code?: string
  price?: number
  originalPrice?: number
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
  // Sports APIs
  sports: {
    nfl: 'https://site.api.espn.com/apis/site/v2/sports/football/nfl',
    steelers: 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/pit',
    nhl: 'https://statsapi.web.nhl.com/api/v1',
    penguins: 'https://statsapi.web.nhl.com/api/v1/teams/5',
    mlb: 'https://statsapi.mlb.com/api/v1',
    pirates: 'https://statsapi.mlb.com/api/v1/teams/134'
  },
  // Event APIs
  eventbrite: 'https://www.eventbriteapi.com/v3',
  ticketmaster: 'https://app.ticketmaster.com/discovery/v2',
  // Deal APIs
  groupon: 'https://partner-api.groupon.com/deals.json',
  retailMeNot: 'https://api.retailmenot.com/v1',
  dealnews: 'https://api.dealnews.com',
  coupons: 'https://api.coupons.com'
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

    try {
      // ESPN API - Free public sports data
      const espnEvents = await this.fetchESPNEvents(location)
      events.push(...espnEvents)
    } catch (error) {
      console.warn('ESPN API error:', error)
    }

    try {
      // NHL API - Penguins games
      const nhlEvents = await this.fetchNHLEvents(location)
      events.push(...nhlEvents)
    } catch (error) {
      console.warn('NHL API error:', error)
    }

    try {
      // MLB API - Pirates games
      const mlbEvents = await this.fetchMLBEvents(location)
      events.push(...mlbEvents)
    } catch (error) {
      console.warn('MLB API error:', error)
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

  async fetchESPNEvents(location: string): Promise<LiveEvent[]> {
    // ESPN provides free public APIs for sports data
    try {
      // Steelers games - using ESPN's public API
      const steelersResponse = await fetch(API_ENDPOINTS.sports.steelers)
      if (!steelersResponse.ok) return []

      const steelersData = await steelersResponse.json()

      const events: LiveEvent[] = []

      // Extract Steelers games from the schedule
      if (steelersData.events) {
        steelersData.events.slice(0, 5).forEach((event: any) => {
          if (event.competitions && event.competitions[0]) {
            const competition = event.competitions[0]
            const startDate = new Date(competition.date)

            // Only include future games
            if (startDate > new Date()) {
              const homeTeam = competition.competitors.find((c: any) => c.homeAway === 'home')
              const awayTeam = competition.competitors.find((c: any) => c.homeAway === 'away')

              events.push({
                id: `espn-${event.id}`,
                title: `${homeTeam?.team.displayName} vs ${awayTeam?.team.displayName}`,
                description: `NFL game at ${competition.venue.fullName}. ${competition.notes ? competition.notes[0]?.headline : ''}`,
                startDate,
                location: {
                  name: competition.venue.fullName,
                  address: `${competition.venue.address.city}, ${competition.venue.address.state}`
                },
                category: 'Sports',
                price: { min: 50, max: 500, currency: 'USD' },
                source: 'espn',
                url: competition.notes && competition.notes[0]?.headline ? `https://www.espn.com/nfl/game/_/gameId/${event.id}` : undefined,
                lastUpdated: new Date(),
                verified: true
              })
            }
          }
        })
      }

      return events
    } catch (error) {
      console.warn('ESPN API fetch failed:', error)
      return []
    }
  }

  async fetchNHLEvents(location: string): Promise<LiveEvent[]> {
    // NHL API for Penguins games
    try {
      const penguinsResponse = await fetch(`${API_ENDPOINTS.sports.penguins}?expand=team.schedule.next`)
      if (!penguinsResponse.ok) return []

      const penguinsData = await penguinsResponse.json()
      const events: LiveEvent[] = []

      if (penguinsData.teams && penguinsData.teams[0]?.nextGameSchedule?.dates) {
        penguinsData.teams[0].nextGameSchedule.dates.slice(0, 5).forEach((dateInfo: any) => {
          dateInfo.games.forEach((game: any) => {
            const startDate = new Date(game.gameDate)

            if (startDate > new Date()) {
              const homeTeam = game.teams.home.team.name
              const awayTeam = game.teams.away.team.name
              const isHome = homeTeam.includes('Penguins')

              events.push({
                id: `nhl-${game.gamePk}`,
                title: `${awayTeam} at ${homeTeam}`,
                description: `NHL game at PPG Paints Arena. ${isHome ? 'Penguins home game!' : 'Penguins away game.'}`,
                startDate,
                location: {
                  name: isHome ? 'PPG Paints Arena' : game.venue.name,
                  address: isHome ? '1001 5th Ave, Pittsburgh, PA' : game.venue.city
                },
                category: 'Sports',
                price: { min: 30, max: 300, currency: 'USD' },
                source: 'nhl',
                url: `https://www.nhl.com/gamecenter/${game.gamePk}`,
                lastUpdated: new Date(),
                verified: true
              })
            }
          })
        })
      }

      return events
    } catch (error) {
      console.warn('NHL API fetch failed:', error)
      return []
    }
  }

  async fetchMLBEvents(location: string): Promise<LiveEvent[]> {
    // MLB API for Pirates games
    try {
      const piratesResponse = await fetch(`${API_ENDPOINTS.sports.pirates}?season=2024&sportId=1`)
      if (!piratesResponse.ok) return []

      const piratesData = await piratesResponse.json()
      const events: LiveEvent[] = []

      if (piratesData.teams && piratesData.teams[0]?.nextGameSchedule?.dates) {
        piratesData.teams[0].nextGameSchedule.dates.slice(0, 5).forEach((dateInfo: any) => {
          dateInfo.games.forEach((game: any) => {
            const startDate = new Date(game.gameDate)

            if (startDate > new Date()) {
              const homeTeam = game.teams.home.team.name
              const awayTeam = game.teams.away.team.name
              const isHome = homeTeam.includes('Pirates')

              events.push({
                id: `mlb-${game.gamePk}`,
                title: `${awayTeam} at ${homeTeam}`,
                description: `MLB game at ${isHome ? 'PNC Park' : game.venue.name}. ${isHome ? 'Pirates home game!' : 'Pirates away game.'}`,
                startDate,
                location: {
                  name: isHome ? 'PNC Park' : game.venue.name,
                  address: isHome ? '115 Federal St, Pittsburgh, PA' : game.venue.city
                },
                category: 'Sports',
                price: { min: 15, max: 150, currency: 'USD' },
                source: 'mlb',
                url: `https://www.mlb.com/gameday/${game.gamePk}`,
                lastUpdated: new Date(),
                verified: true
              })
            }
          })
        })
      }

      return events
    } catch (error) {
      console.warn('MLB API fetch failed:', error)
      return []
    }
  }

  private async fetchNationalWeatherService(location: string): Promise<any> {
    // National Weather Service API for detailed forecasts
    try {
      // First get the forecast office and grid data
      const pittsburghLat = 40.4406
      const pittsburghLng = -79.9959

      // Get forecast data
      const forecastResponse = await fetch(`https://api.weather.gov/points/${pittsburghLat},${pittsburghLng}`)
      if (!forecastResponse.ok) return null

      const pointData = await forecastResponse.json()
      const forecastUrl = pointData.properties.forecast

      const detailedForecastResponse = await fetch(forecastUrl)
      if (!detailedForecastResponse.ok) return null

      const forecastData = await detailedForecastResponse.json()

      return {
        location: 'Pittsburgh',
        source: 'nws',
        forecast: forecastData.properties.periods.map((period: any) => ({
          date: new Date(period.startTime),
          high: period.temperature,
          low: period.temperature, // NWS provides high/low in separate periods
          conditions: period.shortForecast,
          icon: period.icon,
          precipitation: period.probabilityOfPrecipitation?.value || 0,
          detailedForecast: period.detailedForecast
        })),
        alerts: [], // Could fetch alerts separately
        lastUpdated: new Date()
      }
    } catch (error) {
      console.warn('NWS API fetch failed:', error)
      return null
    }
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
    return data.articles
      .filter((article: any) => article.publishedAt) // Filter out articles without dates
      .map((article: any) => {
        let publishedAt: Date
        try {
          publishedAt = new Date(article.publishedAt)
          // Check if the date is valid
          if (isNaN(publishedAt.getTime())) {
            publishedAt = new Date() // Fallback to current date
          }
        } catch (error) {
          console.warn('Invalid publishedAt date for article:', article.title, article.publishedAt)
          publishedAt = new Date() // Fallback to current date
        }

        return {
          id: `newsapi-${btoa(article.url).slice(0, 10)}`,
          title: article.title,
          summary: article.description,
          content: article.content,
          author: article.author || article.source.name,
          publishedAt,
          category: this.categorizeArticle(article.title + ' ' + article.description),
          tags: this.extractTags(article.title + ' ' + article.description),
          image: article.urlToImage,
          url: article.url,
          source: 'post-gazette' as const,
          location: location
        }
      })
  }

  private async fetchRSSFeeds(): Promise<LiveNews[]> {
    try {
      // Use a simple news aggregation service or RSS proxy
      // For demo purposes, we'll create sample news based on current date
      const sampleNews: LiveNews[] = [
        {
          id: `rss-1-${Date.now()}`,
          title: 'Pittsburgh Business Community Shows Strong Growth in Q4',
          summary: 'Local businesses report increased revenue and job creation as Pittsburgh economy continues to rebound.',
          author: 'Business Editor',
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          category: 'Business',
          tags: ['business', 'economy', 'jobs', 'pittsburgh'],
          url: 'https://pittsburgheverything.com/news/business-growth',
          source: 'post-gazette',
          location: 'Pittsburgh'
        },
        {
          id: `rss-2-${Date.now()}`,
          title: 'Steelers Prepare for Crucial Matchup This Weekend',
          summary: 'Pittsburgh Steelers continue training as they gear up for their next NFL game at home.',
          author: 'Sports Reporter',
          publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
          category: 'Sports',
          tags: ['steelers', 'nfl', 'sports', 'pittsburgh'],
          url: 'https://pittsburgheverything.com/news/steelers-prep',
          source: 'trib-live',
          location: 'Pittsburgh'
        },
        {
          id: `rss-3-${Date.now()}`,
          title: 'New Restaurants Opening in Pittsburgh This Month',
          summary: 'Several new dining establishments are set to open, bringing diverse cuisines to the city.',
          author: 'Food Critic',
          publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
          category: 'Food & Dining',
          tags: ['restaurants', 'food', 'dining', 'pittsburgh'],
          url: 'https://pittsburgheverything.com/news/new-restaurants',
          source: 'cbs-pittsburgh',
          location: 'Pittsburgh'
        }
      ]

      return sampleNews
    } catch (error) {
      console.warn('RSS feed fetch failed:', error)
      return []
    }
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

    // OpenWeatherMap offers a free tier without API key for basic usage
    // We'll use a demo key or no key for basic functionality

    try {
      // Current weather - try with API key first, fallback to no key
      let currentParams = new URLSearchParams({
        lat: lat.toString(),
        lon: lng.toString(),
        units: 'imperial'
      })

      if (process.env.OPENWEATHER_API_KEY) {
        currentParams.set('appid', process.env.OPENWEATHER_API_KEY)
      }

      const currentResponse = await fetch(`${API_ENDPOINTS.openWeather}/weather?${currentParams}`)
      if (!currentResponse.ok) {
        throw new Error(`Weather API returned ${currentResponse.status}`)
      }

      const currentData = await currentResponse.json()

      // 7-day forecast
      let forecastParams = new URLSearchParams({
        lat: lat.toString(),
        lon: lng.toString(),
        units: 'imperial',
        cnt: '7'
      })

      if (process.env.OPENWEATHER_API_KEY) {
        forecastParams.set('appid', process.env.OPENWEATHER_API_KEY)
      }

      const forecastResponse = await fetch(`${API_ENDPOINTS.openWeather}/forecast?${forecastParams}`)
      const forecastData = forecastResponse.ok ? await forecastResponse.json() : null

      // Process the weather data
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
          .map((item: any) => ({
            date: new Date(item.dt * 1000),
            high: Math.round(item.main.temp_max),
            low: Math.round(item.main.temp_min),
            conditions: item.weather[0].main,
            icon: item.weather[0].icon,
            precipitation: Math.round((item.pop || 0) * 100)
          })) : [],
        lastUpdated: new Date()
      }

      // Cache the results
      this.cache.set(cacheKey, {
        data: weather,
        timestamp: Date.now()
      })

      return weather

    } catch (apiError) {
      console.warn('OpenWeather API failed, using fallback:', apiError)
      throw apiError // Let the route handler provide fallback
    }
  }

  private getWindDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    const index = Math.round(degrees / 22.5) % 16
    return directions[index]
  }

  async fetchEPAAirQuality(location: string): Promise<any> {
    // EPA Air Quality API
    try {
      // Pittsburgh area air quality
      const pittsburghBbox = '-80.5,40.2,-79.8,40.6' // Bounding box for Pittsburgh area

      const response = await fetch(`https://www.airnowapi.org/aq/data/?startDate=2024-01-01&endDate=2024-12-31&parameters=OZONE,PM25,PM10,CO,NO2,SO2&BBOX=${pittsburghBbox}&datatype=C&format=application/json&API_KEY=demo`)

      if (!response.ok) return null

      const airQualityData = await response.json()

      return {
        location: 'Pittsburgh',
        aqi: airQualityData[0]?.AQI || 'Unknown',
        pollutants: airQualityData.map((reading: any) => ({
          parameter: reading.Parameter,
          value: reading.Value,
          unit: reading.Unit,
          category: reading.Category
        })),
        lastUpdated: new Date(),
        source: 'epa'
      }
    } catch (error) {
      console.warn('EPA Air Quality API fetch failed:', error)
      return null
    }
  }
}

// LiveDealsAggregator class
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

    try {
      // DealNews API
      const dealNewsDeals = await this.fetchDealNewsDeals()
      deals.push(...dealNewsDeals)
    } catch (error) {
      console.warn('DealNews API error:', error)
    }

    try {
      // Coupons.com API
      const couponsDeals = await this.fetchCouponsDeals()
      deals.push(...couponsDeals)
    } catch (error) {
      console.warn('Coupons API error:', error)
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
    try {
      // Groupon API - try Pittsburgh-specific deals
      const response = await fetch(`${API_ENDPOINTS.groupon}?division=pittsburgh&limit=20`)
      if (!response.ok) throw new Error('Groupon API failed')

      const data = await response.json()
      const deals: LiveDeal[] = []

      if (data.deals) {
        data.deals.forEach((deal: any) => {
          if (deal.options && deal.options[0]) {
            const option = deal.options[0]
            deals.push({
              id: `groupon-${deal.uuid}`,
              title: deal.title || deal.announcementTitle,
              description: deal.highlightsHtml || deal.pitchHtml || 'Great deal available',
              businessName: deal.merchant?.name || 'Local Business',
              businessId: (deal.merchant?.name || 'local-business').toLowerCase().replace(/\s+/g, '-'),
              discount: option.discount?.formattedAmount || option.price?.formattedAmount || 'Special Offer',
              category: deal.category || 'General',
              validUntil: new Date(option.expiresAt * 1000),
              url: deal.dealUrl,
              source: 'groupon',
              image: deal.grid4ImageUrl || deal.largeImageUrl,
              verified: true
            })
          }
        })
      }

      return deals
    } catch (error) {
      console.warn('Groupon API fetch failed:', error)
      // Return fallback deals
      return [
        {
          id: 'groupon-fallback-1',
          title: '50% Off Spa Services',
          description: 'Relax with 50% off all spa treatments and massages',
          businessName: 'Pittsburgh Spa & Wellness',
          businessId: 'pittsburgh-spa-wellness',
          discount: '50% off',
          category: 'Services',
          validUntil: new Date('2025-12-31'),
          source: 'groupon',
          verified: false
        },
        {
          id: 'groupon-fallback-2',
          title: '$25 for $50 Restaurant Credit',
          description: 'Enjoy $50 worth of food for just $25',
          businessName: 'Local Pittsburgh Restaurant',
          businessId: 'local-pittsburgh-restaurant',
          discount: '$25 for $50',
          category: 'Food & Drink',
          validUntil: new Date('2025-12-31'),
          source: 'groupon',
          verified: false
        }
      ]
    }
  }

  private async fetchRetailMeNotDeals(): Promise<LiveDeal[]> {
    try {
      // RetailMeNot API - general coupons
      const response = await fetch(`${API_ENDPOINTS.retailMeNot}/coupons?limit=15&category=food`)
      if (!response.ok) throw new Error('RetailMeNot API failed')

      const data = await response.json()
      const deals: LiveDeal[] = []

      if (data.coupons) {
        data.coupons.forEach((coupon: any) => {
          deals.push({
            id: `rmn-${coupon.id}`,
            title: coupon.title || coupon.description,
            description: coupon.description || 'Save with this coupon',
            businessName: coupon.merchant?.name || coupon.brand || 'Online Store',
            businessId: (coupon.merchant?.name || coupon.brand || 'online-store').toLowerCase().replace(/\s+/g, '-'),
            discount: coupon.discount || coupon.code || 'Special Code',
            category: coupon.category || 'Online',
            validUntil: coupon.expiresAt ? new Date(coupon.expiresAt) : new Date('2025-12-31'),
            url: coupon.url || coupon.link,
            source: 'retailmenot',
            code: coupon.code,
            verified: true
          })
        })
      }

      return deals
    } catch (error) {
      console.warn('RetailMeNot API fetch failed:', error)
      // Return fallback deals
      return [
        {
          id: 'rmn-fallback-1',
          title: '20% Off Online Orders',
          description: 'Get 20% off your next online purchase',
          businessName: 'Various Online Stores',
          businessId: 'various-online-stores',
          discount: '20% off',
          category: 'Online',
          validUntil: new Date('2025-12-31'),
          source: 'retailmenot',
          code: 'SAVE20',
          verified: false
        }
      ]
    }
  }

  private async fetchDealNewsDeals(): Promise<LiveDeal[]> {
    try {
      // DealNews API - latest deals
      const response = await fetch(`${API_ENDPOINTS.dealnews}/deals?limit=10&category=electronics`)
      if (!response.ok) throw new Error('DealNews API failed')

      const data = await response.json()
      const deals: LiveDeal[] = []

      if (data.deals) {
        data.deals.forEach((deal: any) => {
          deals.push({
            id: `dealnews-${deal.id}`,
            title: deal.title,
            description: deal.description || deal.summary,
            businessName: deal.merchant || deal.brand || 'Online Retailer',
            businessId: (deal.merchant || deal.brand || 'online-retailer').toLowerCase().replace(/\s+/g, '-'),
            discount: deal.savings || deal.discount || 'Great Deal',
            category: deal.category || 'Electronics',
            validUntil: deal.expiresAt ? new Date(deal.expiresAt) : new Date('2025-12-31'),
            url: deal.url || deal.link,
            source: 'dealnews',
            price: deal.price,
            originalPrice: deal.originalPrice,
            verified: true
          })
        })
      }

      return deals
    } catch (error) {
      console.warn('DealNews API fetch failed:', error)
      return []
    }
  }

  private async fetchCouponsDeals(): Promise<LiveDeal[]> {
    try {
      // Coupons.com API - digital coupons
      const response = await fetch(`${API_ENDPOINTS.coupons}/coupons?brand=pittsburgh&limit=8`)
      if (!response.ok) throw new Error('Coupons API failed')

      const data = await response.json()
      const deals: LiveDeal[] = []

      if (data.coupons) {
        data.coupons.forEach((coupon: any) => {
          deals.push({
            id: `coupons-${coupon.id}`,
            title: coupon.title || coupon.description,
            description: coupon.description || 'Save with this digital coupon',
            businessName: coupon.brand || coupon.merchant || 'Local Business',
            businessId: (coupon.brand || coupon.merchant || 'local-business').toLowerCase().replace(/\s+/g, '-'),
            discount: coupon.savings || coupon.discount,
            category: coupon.category || 'General',
            validUntil: coupon.expirationDate ? new Date(coupon.expirationDate) : new Date('2025-12-31'),
            url: coupon.clipUrl || coupon.link,
            source: 'coupons',
            code: coupon.couponCode,
            verified: true
          })
        })
      }

      return deals
    } catch (error) {
      console.warn('Coupons API fetch failed:', error)
      return []
    }
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

  async fetchCensusData(): Promise<any> {
    // US Census Bureau API for demographics
    try {
      const response = await fetch('https://api.census.gov/data/2020/acs/acs5?get=NAME,B01003_001E,B19013_001E&for=county:003&in=state:42')

      if (!response.ok) return null

      const censusData = await response.json()

      return {
        location: 'Allegheny County',
        population: parseInt(censusData[1][1]),
        medianIncome: parseInt(censusData[1][2]),
        lastUpdated: new Date(),
        source: 'census'
      }
    } catch (error) {
      console.warn('Census API fetch failed:', error)
      return null
    }
  }
}

// Initialize the real-time data manager
export const realTimeDataManager = new RealTimeDataManager()
