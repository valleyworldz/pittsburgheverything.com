// Live Sports API - Real-time sports data from multiple leagues
import { NextRequest, NextResponse } from 'next/server'
import { realTimeDataManager } from '@/utils/realtimeDataAggregator'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const league = searchParams.get('league') || 'all' // nfl, nhl, mlb, or all
    const team = searchParams.get('team') // specific team
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50)

    const sportsData: any = {}

    if (league === 'nfl' || league === 'all') {
      try {
        const nflEvents = await realTimeDataManager.events.fetchESPNEvents('Pittsburgh')
        sportsData.nfl = {
          events: nflEvents.slice(0, limit),
          team: 'Steelers',
          league: 'NFL'
        }
      } catch (error) {
        console.warn('NFL data fetch failed:', error)
        sportsData.nfl = { events: [], error: 'Data unavailable' }
      }
    }

    if (league === 'nhl' || league === 'all') {
      try {
        const nhlEvents = await realTimeDataManager.events.fetchNHLEvents('Pittsburgh')
        sportsData.nhl = {
          events: nhlEvents.slice(0, limit),
          team: 'Penguins',
          league: 'NHL'
        }
      } catch (error) {
        console.warn('NHL data fetch failed:', error)
        sportsData.nhl = { events: [], error: 'Data unavailable' }
      }
    }

    if (league === 'mlb' || league === 'all') {
      try {
        const mlbEvents = await realTimeDataManager.events.fetchMLBEvents('Pittsburgh')
        sportsData.mlb = {
          events: mlbEvents.slice(0, limit),
          team: 'Pirates',
          league: 'MLB'
        }
      } catch (error) {
        console.warn('MLB data fetch failed:', error)
        sportsData.mlb = { events: [], error: 'Data unavailable' }
      }
    }

    return NextResponse.json({
      sports: sportsData,
      total: Object.values(sportsData).reduce((sum: number, league: any) => sum + (league.events?.length || 0), 0),
      leagues: Object.keys(sportsData),
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Live sports API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch live sports data' },
      { status: 500 }
    )
  }
}
