// Live News API - Real-time news and updates from Pittsburgh sources

import { NextRequest, NextResponse } from 'next/server'
import { realTimeDataManager } from '@/utils/realtimeDataAggregator'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location') || 'Pittsburgh'
    const category = searchParams.get('category')
    const limit = Math.min(parseInt(searchParams.get('limit') || '15'), 50)

    // Get live news from APIs
    const liveNews = await realTimeDataManager.news.getLiveNews(location, limit)

    // Filter by category if specified
    const filteredNews = category
      ? liveNews.filter(article =>
          article.category.toLowerCase().includes(category.toLowerCase()) ||
          article.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
        )
      : liveNews

    // Add some sample local news if no API data (for demo purposes)
    if (filteredNews.length === 0) {
      const sampleNews = getSampleLocalNews(location, limit)
      filteredNews.push(...sampleNews)
    }

    return NextResponse.json({
      news: filteredNews.slice(0, limit),
      total: filteredNews.length,
      categories: ['Food & Dining', 'Sports', 'Business', 'Weather', 'Events', 'Local News'],
      sources: ['newsapi', 'post-gazette', 'trib-live', 'cbs-pittsburgh'],
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Live news API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch live news' },
      { status: 500 }
    )
  }
}

function getSampleLocalNews(location: string, limit: number): any[] {
  const sampleArticles = [
    {
      id: `sample-1-${Date.now()}`,
      title: `New Restaurant Opens in ${location} - Pittsburgh Food Scene Continues to Grow`,
      summary: `A new dining establishment brings innovative cuisine to the ${location} neighborhood, featuring locally sourced ingredients and a modern atmosphere.`,
      author: 'Pittsburgh Food Critic',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      category: 'Food & Dining',
      tags: ['restaurants', 'local', 'food', location.toLowerCase()],
      url: `https://pittsburgheverything.com/news/restaurant-${location.toLowerCase()}`,
      source: 'post-gazette' as const,
      location
    },
    {
      id: `sample-2-${Date.now()}`,
      title: `Community Event Planned for ${location} This Weekend`,
      summary: `Local residents and businesses are organizing a community gathering featuring live music, food vendors, and family activities.`,
      author: 'Local Reporter',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      category: 'Events',
      tags: ['events', 'community', 'local', location.toLowerCase()],
      url: `https://pittsburgheverything.com/news/event-${location.toLowerCase()}`,
      source: 'trib-live' as const,
      location
    },
    {
      id: `sample-3-${Date.now()}`,
      title: `Steelers Training Camp Updates - Latest from ${location}`,
      summary: `Pittsburgh Steelers continue their preseason preparations with impressive performances and new player developments.`,
      author: 'Sports Editor',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      category: 'Sports',
      tags: ['steelers', 'nfl', 'sports', 'training camp'],
      url: `https://pittsburgheverything.com/news/steelers-${location.toLowerCase()}`,
      source: 'cbs-pittsburgh' as const,
      location: 'Pittsburgh'
    }
  ]

  return sampleArticles.slice(0, Math.min(limit, sampleArticles.length))
}

export async function POST(request: NextRequest) {
  // Admin endpoint to refresh news cache
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await realTimeDataManager.refreshAllData()

    return NextResponse.json({
      success: true,
      message: 'News cache refreshed successfully'
    })

  } catch (error) {
    console.error('News cache refresh error:', error)
    return NextResponse.json(
      { error: 'Failed to refresh news cache' },
      { status: 500 }
    )
  }
}
