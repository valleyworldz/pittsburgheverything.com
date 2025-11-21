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
        try {
          const validUntil = new Date(deal.expiresAt || deal.validThrough)
          return !isNaN(validUntil.getTime()) && validUntil >= new Date() // Only current deals with valid dates
        } catch (error) {
          console.warn(`Invalid date for deal ${deal.id}:`, deal.expiresAt, deal.validThrough)
          return false
        }
      })
      .filter(deal => !category || deal.category.toLowerCase().includes(category.toLowerCase()))
      .map(deal => {
        let validFrom: Date
        let validUntil: Date

        try {
          validFrom = deal.validThrough
            ? new Date(deal.validThrough)
            : new Date(Date.now() - 86400000) // 1 day ago if no start date

          if (isNaN(validFrom.getTime())) {
            validFrom = new Date(Date.now() - 86400000)
          }

          validUntil = new Date(deal.expiresAt || deal.validThrough)

          if (isNaN(validUntil.getTime())) {
            // Fallback to 30 days from now if invalid
            validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          }
        } catch (error) {
          console.warn(`Date parsing error for deal ${deal.id}:`, error)
          validFrom = new Date(Date.now() - 86400000)
          validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }

        return {
          id: deal.id,
          title: deal.title,
          businessName: deal.businessName,
          businessId: deal.businessId,
          description: deal.description,
          discount: deal.discount,
          category: deal.category,
          validFrom,
          validUntil,
          location: deal.neighborhood || location,
          terms: deal.terms || [],
          source: 'manual' as const,
          url: deal.link || undefined,
          image: deal.image,
          lastUpdated: new Date()
        }
      })

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
