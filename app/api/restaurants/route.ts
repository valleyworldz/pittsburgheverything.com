import { NextRequest, NextResponse } from 'next/server'
import { getRestaurantData } from '@/utils/apiIntegrations'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const neighborhood = searchParams.get('neighborhood')

    const restaurants = await getRestaurantData(category || undefined, neighborhood || undefined)

    return NextResponse.json({
      success: true,
      data: restaurants,
      count: restaurants.length,
      filters: { category, neighborhood }
    })
  } catch (error) {
    console.error('Restaurants API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch restaurants' },
      { status: 500 }
    )
  }
}