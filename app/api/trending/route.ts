import { NextRequest, NextResponse } from 'next/server'
import { getPittsburghWeather, getPittsburghNews, getSteelersGames, getLocalEvents, getLocalDeals } from '@/utils/apiIntegrations'

export async function GET() {
  try {
    // Fetch all trending data in parallel
    const [weather, news, sports, events, deals] = await Promise.all([
      getPittsburghWeather(),
      getPittsburghNews(),
      getSteelersGames(),
      getLocalEvents(),
      getLocalDeals()
    ])

    // Combine and sort by relevance/timing
    const trendingItems = []

    // Add weather if available
    if (weather) {
      trendingItems.push({
        type: 'weather',
        title: `Pittsburgh Weather: ${weather.condition}, ${weather.temperature}°F`,
        description: `Feels like ${weather.temperature}°F with ${weather.humidity}% humidity`,
        priority: weather.temperature < 32 ? 'high' : 'normal',
        icon: 'cloud-rain'
      })
    }

    // Add other trending items
    trendingItems.push(
      ...news.slice(0, 3).map(item => ({
        type: 'news',
        title: item.title,
        description: item.description?.substring(0, 100) + '...',
        priority: 'normal',
        icon: 'newspaper'
      })),
      ...sports.slice(0, 2).map(game => ({
        type: 'sports',
        title: `${game.homeTeam} vs ${game.awayTeam}`,
        description: `${game.date} at ${game.venue}`,
        priority: 'high',
        icon: 'football'
      })),
      ...events.slice(0, 2).map(event => ({
        type: 'events',
        title: event.name,
        description: `${event.startDate} at ${event.venue}`,
        priority: 'normal',
        icon: 'calendar'
      })),
      ...deals.slice(0, 2).map(deal => ({
        type: 'deals',
        title: deal.title,
        description: `${deal.discount} at ${deal.business}`,
        priority: 'high',
        icon: 'tag'
      }))
    )

    // Sort by priority (high first, then normal)
    trendingItems.sort((a, b) => {
      if (a.priority === 'high' && b.priority !== 'high') return -1
      if (b.priority === 'high' && a.priority !== 'high') return 1
      return 0
    })

    return NextResponse.json({
      success: true,
      data: trendingItems.slice(0, 10), // Return top 10 trending items
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Trending API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trending data' },
      { status: 500 }
    )
  }
}
