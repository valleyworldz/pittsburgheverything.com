// API Status Dashboard - Shows all available APIs and their current status
import { NextRequest, NextResponse } from 'next/server'
import { FREE_APIS, ACTIVE_FREE_APIS, PREMIUM_FREE_APIS, API_CATEGORIES, getAPIUsageSummary } from '@/config/apis'

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

    // Group APIs by category
    const apisByCategory = Object.entries(apisToShow).reduce((acc, [key, config]) => {
      const category = (config as any).category || 'utilities'
      if (!acc[category]) acc[category] = []
      acc[category].push({
        key,
        ...config,
        healthCheck: await checkAPIHealth(key)
      })
      return acc
    }, {} as Record<string, any[]>)

    const apiStatus = {
      summary: getAPIUsageSummary(),
      categories: API_CATEGORIES,
      apisByCategory,
      totalAPIs: Object.keys(apisToShow).length,
      activeAPIs: Object.values(apisToShow).filter(api => api.enabled).length,
      categoryStats: Object.entries(API_CATEGORIES).map(([key, name]) => ({
        key,
        name,
        count: apisByCategory[key]?.length || 0,
        active: apisByCategory[key]?.filter((api: any) => api.enabled).length || 0
      })),
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
