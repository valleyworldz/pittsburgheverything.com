import { NextRequest, NextResponse } from 'next/server'
import { getLocalDeals } from '@/utils/apiIntegrations'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const location = searchParams.get('location')

    const deals = await getLocalDeals()

    // Filter deals if category or location specified
    let filteredDeals = deals
    if (category) {
      filteredDeals = filteredDeals.filter(deal =>
        deal.category.toLowerCase().includes(category.toLowerCase())
      )
    }

    return NextResponse.json({
      success: true,
      data: filteredDeals,
      count: filteredDeals.length,
      filters: { category, location }
    })
  } catch (error) {
    console.error('Deals API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch deals' },
      { status: 500 }
    )
  }
}
