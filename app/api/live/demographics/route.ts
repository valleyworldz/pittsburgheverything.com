// Live Demographics API - Census and demographic data
import { NextRequest, NextResponse } from 'next/server'
import { realTimeDataManager } from '@/utils/realtimeDataAggregator'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location') || 'Pittsburgh'
    const dataType = searchParams.get('type') || 'overview' // overview, detailed, trends

    // Get census/demographic data
    const censusData = await realTimeDataManager.fetchCensusData()

    if (!censusData) {
      // Return fallback demographic data for Pittsburgh
      return NextResponse.json({
        location: 'Allegheny County, PA',
        demographics: {
          population: 1219879,
          medianAge: 42.8,
          medianIncome: 61393,
          educationLevel: "Bachelor's degree or higher: 45.2%",
          raceBreakdown: {
            white: 78.2,
            black: 13.1,
            asian: 4.5,
            hispanic: 2.8,
            other: 1.4
          },
          housing: {
            medianHomeValue: 221400,
            homeownershipRate: 65.3,
            medianRent: 987
          }
        },
        insights: [
          'Allegheny County has a diverse population with strong educational attainment',
          'Median income is above national average',
          'Homeownership rates are healthy for the region'
        ],
        source: 'census',
        lastUpdated: new Date().toISOString(),
        fallback: true
      })
    }

    // Enhance with additional insights
    const insights = generateDemographicInsights(censusData)

    return NextResponse.json({
      location: censusData.location,
      demographics: censusData,
      insights,
      source: censusData.source,
      lastUpdated: censusData.lastUpdated.toISOString()
    })

  } catch (error) {
    console.error('Live demographics API error:', error)

    // Return fallback data
    return NextResponse.json({
      location: 'Allegheny County, PA',
      demographics: {
        population: 1219879,
        medianAge: 42.8,
        medianIncome: 61393,
        educationLevel: "Bachelor's degree or higher: 45.2%"
      },
      insights: [
        'Allegheny County serves as Pittsburgh\'s economic hub',
        'Strong educational institutions drive local demographics',
        'Population has remained stable with slight growth in suburbs'
      ],
      source: 'census',
      lastUpdated: new Date().toISOString(),
      fallback: true,
      error: 'Live demographic data unavailable'
    })
  }
}

function generateDemographicInsights(data: any): string[] {
  const insights: string[] = []

  if (data.medianIncome > 60000) {
    insights.push('💰 Above-average median income indicates strong local economy')
    insights.push('🏠 Higher-income households support premium housing market')
  }

  if (data.population > 1000000) {
    insights.push('👥 Large population provides diverse community and services')
    insights.push('🏢 Urban amenities and cultural institutions well-supported')
  }

  insights.push('📚 Proximity to universities contributes to educated workforce')
  insights.push('🏭 Historical manufacturing base transitioning to tech and healthcare')
  insights.push('🌳 Good quality of life with access to parks and recreation')

  return insights
}
