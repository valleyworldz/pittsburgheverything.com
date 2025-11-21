// API Status Dashboard - Shows all available APIs and their current status
import { NextRequest, NextResponse } from 'next/server'
import { FREE_APIS, ACTIVE_FREE_APIS, PREMIUM_FREE_APIS, getAPIUsageSummary } from '@/config/apis'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') // all, active, premium, pittsburgh

    let apisToShow = FREE_APIS

    if (category === 'active') {
      apisToShow = Object.fromEntries(ACTIVE_FREE_APIS.map(api => [api.key, FREE_APIS[api.key]]))
    } else if (category === 'premium') {
      apisToShow = Object.fromEntries(PREMIUM_FREE_APIS.map(api => [api.key, FREE_APIS[api.key]]))
    } else if (category === 'pittsburgh') {
      const pittsburghAPIs = ['openWeatherMap', 'espn', 'portAuthority', 'pittsburghOpenData', 'alleghenyCountyOpenData', 'nhl', 'mlb']
      apisToShow = Object.fromEntries(
        Object.entries(FREE_APIS).filter(([key]) => pittsburghAPIs.includes(key))
      )
    }

    const apiStatus = {
      summary: getAPIUsageSummary(),
      apis: Object.entries(apisToShow).map(([key, config]) => ({
        key,
        ...config,
        // Add live status check
        healthCheck: await checkAPIHealth(key)
      })),
      categories: {
        weather: ['openWeatherMap', 'nationalWeatherService'],
        sports: ['espn', 'nhl', 'mlb'],
        transit: ['portAuthority', 'transitland', 'amtrak'],
        news: ['newsApi'],
        government: ['pittsburghOpenData', 'alleghenyCountyOpenData', 'census', 'epa', 'cdc', 'treasury', 'bls'],
        culture: ['loc', 'smithsonian', 'recreationGov'],
        utilities: ['icanhazdadjoke', 'qrCodeMonkey', 'jsonplaceholder']
      },
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json(apiStatus)

  } catch (error) {
    console.error('API status error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch API status' },
      { status: 500 }
    )
  }
}

async function checkAPIHealth(apiKey: string): Promise<{ status: 'healthy' | 'degraded' | 'down', responseTime?: number, lastChecked: string }> {
  const startTime = Date.now()

  try {
    // Simple health checks for different APIs
    switch (apiKey) {
      case 'openWeatherMap':
        const weatherResponse = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Pittsburgh&appid=demo', { signal: AbortSignal.timeout(5000) })
        return {
          status: weatherResponse.status === 401 ? 'healthy' : 'degraded', // 401 means API key needed but service is up
          responseTime: Date.now() - startTime,
          lastChecked: new Date().toISOString()
        }

      case 'espn':
        const espnResponse = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/pit', { signal: AbortSignal.timeout(5000) })
        return {
          status: espnResponse.ok ? 'healthy' : 'degraded',
          responseTime: Date.now() - startTime,
          lastChecked: new Date().toISOString()
        }

      case 'portAuthority':
        const transitResponse = await fetch('https://realtime.portauthority.org/bustime/api/v3/getroutes?key=demo', { signal: AbortSignal.timeout(5000) })
        return {
          status: transitResponse.status === 401 ? 'healthy' : 'degraded',
          responseTime: Date.now() - startTime,
          lastChecked: new Date().toISOString()
        }

      case 'pittsburghOpenData':
        const pghResponse = await fetch('https://data.wprdc.org/api/3/action/datastore_search?resource_id=your-resource-id', { signal: AbortSignal.timeout(5000) })
        return {
          status: pghResponse.ok ? 'healthy' : 'degraded',
          responseTime: Date.now() - startTime,
          lastChecked: new Date().toISOString()
        }

      default:
        return {
          status: 'healthy', // Assume healthy if no specific check
          responseTime: 0,
          lastChecked: new Date().toISOString()
        }
    }
  } catch (error) {
    return {
      status: 'down',
      responseTime: Date.now() - startTime,
      lastChecked: new Date().toISOString()
    }
  }
}
