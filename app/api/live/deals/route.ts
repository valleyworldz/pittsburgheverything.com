// Live Deals API - Real-time deals and promotions from multiple sources

import { NextRequest, NextResponse } from 'next/server'
import { realTimeDataManager } from '@/utils/realtimeDataAggregator'
import dealsData from '@/data/deals.json'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location') || 'Pittsburgh'
    const category = searchParams.get('category')
    const limit = Math.min(parseInt(searchParams.get('limit') || '15'), 50)

    // Get live deals from APIs
    const liveDeals = await realTimeDataManager.deals.getLiveDeals(location)

    // Combine with static deals data
    const staticDeals = dealsData
      .filter(deal => {
        const validUntil = new Date(deal.expiresAt || deal.validThrough)
        return validUntil >= new Date() // Only current deals
      })
      .filter(deal => !category || deal.category.toLowerCase().includes(category.toLowerCase()))
      .map(deal => ({
        id: deal.id,
        title: deal.title,
        businessName: deal.businessName,
        businessId: deal.businessId,
        description: deal.description,
        discount: deal.discount,
        category: deal.category,
        validFrom: new Date(deal.validThrough ? deal.validThrough : Date.now() - 86400000), // 1 day ago if no start date
        validUntil: new Date(deal.expiresAt || deal.validThrough),
        location: deal.neighborhood || location,
        terms: deal.terms || [],
        source: 'manual' as const,
        url: deal.link || undefined,
        image: deal.image,
        lastUpdated: new Date()
      }))

    // Combine and deduplicate
    const allDeals = [...liveDeals, ...staticDeals]
    const uniqueDeals = allDeals.filter((deal, index, self) =>
      index === self.findIndex(d => d.businessName === deal.businessName && d.discount === deal.discount)
    )

    // Sort by expiration date and limit
    const sortedDeals = uniqueDeals
      .sort((a, b) => a.validUntil.getTime() - b.validUntil.getTime())
      .slice(0, limit)

    return NextResponse.json({
      deals: sortedDeals,
      total: sortedDeals.length,
      categories: ['Food & Drink', 'Beauty & Wellness', 'Auto Services', 'Shopping', 'Entertainment'],
      sources: ['groupon', 'retailmenot', 'yelp', 'manual'],
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Live deals API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch live deals' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // Admin endpoint to refresh deals cache
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
      message: 'Deals cache refreshed successfully'
    })

  } catch (error) {
    console.error('Deals cache refresh error:', error)
    return NextResponse.json(
      { error: 'Failed to refresh deals cache' },
      { status: 500 }
    )
  }
}

// Get deals by location
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { location, categories } = body

    if (!location) {
      return NextResponse.json(
        { error: 'Location is required' },
        { status: 400 }
      )
    }

    const deals = await realTimeDataManager.deals.getLiveDeals(location)

    // Filter by categories if specified
    const filteredDeals = categories && categories.length > 0
      ? deals.filter(deal => categories.some((cat: string) =>
          deal.category.toLowerCase().includes(cat.toLowerCase())
        ))
      : deals

    return NextResponse.json({
      deals: filteredDeals,
      location,
      categories: categories || [],
      total: filteredDeals.length,
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Location deals API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch location deals' },
      { status: 500 }
    )
  }
}
