// Live Air Quality API - EPA air quality data for Pittsburgh
import { NextRequest, NextResponse } from 'next/server'
import { realTimeDataManager } from '@/utils/realtimeDataAggregator'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location') || 'Pittsburgh'

    // Get air quality data
    const airQualityData = await realTimeDataManager.weather.fetchEPAAirQuality(location)

    if (!airQualityData) {
      // Return fallback data
      return NextResponse.json({
        location: 'Pittsburgh',
        aqi: 45,
        category: 'Good',
        pollutants: [
          { name: 'PM2.5', value: 12.5, unit: 'µg/m³', status: 'Good' },
          { name: 'Ozone', value: 0.035, unit: 'ppm', status: 'Good' }
        ],
        recommendations: [
          'Air quality is good for outdoor activities',
          'No health concerns for general population',
          'Enjoy outdoor recreation'
        ],
        source: 'epa',
        lastUpdated: new Date().toISOString(),
        fallback: true
      })
    }

    // Enhance with recommendations based on AQI
    const recommendations = getAirQualityRecommendations(airQualityData.aqi)

    return NextResponse.json({
      ...airQualityData,
      recommendations,
      lastUpdated: airQualityData.lastUpdated.toISOString()
    })

  } catch (error) {
    console.error('Live air quality API error:', error)

    // Return fallback data
    return NextResponse.json({
      location: 'Pittsburgh',
      aqi: 45,
      category: 'Good',
      pollutants: [
        { name: 'PM2.5', value: 12.5, unit: 'µg/m³', status: 'Good' },
        { name: 'Ozone', value: 0.035, unit: 'ppm', status: 'Good' }
      ],
      recommendations: [
        'Air quality is good for outdoor activities',
        'No health concerns for general population'
      ],
      source: 'epa',
      lastUpdated: new Date().toISOString(),
      fallback: true,
      error: 'Live data unavailable'
    })
  }
}

function getAirQualityRecommendations(aqi: number): string[] {
  const recommendations: string[] = []

  if (aqi <= 50) {
    recommendations.push('✅ Air quality is good - perfect for outdoor activities')
    recommendations.push('🏃‍♂️ Great conditions for running and outdoor exercise')
    recommendations.push('🌳 Enjoy time in parks and nature areas')
  } else if (aqi <= 100) {
    recommendations.push('⚠️ Air quality is moderate - acceptable for most activities')
    recommendations.push('🏠 Consider indoor activities if you have respiratory conditions')
    recommendations.push('🚗 Reduce car idling to help improve air quality')
  } else if (aqi <= 150) {
    recommendations.push('🚨 Air quality is unhealthy for sensitive groups')
    recommendations.push('🏥 People with respiratory issues should limit outdoor activities')
    recommendations.push('🏃‍♂️ Reduce prolonged outdoor exertion')
  } else if (aqi <= 200) {
    recommendations.push('🚫 Air quality is unhealthy - limit outdoor activities')
    recommendations.push('🏠 Stay indoors and keep windows closed')
    recommendations.push('😷 Consider wearing a mask if you must go outside')
  } else if (aqi <= 300) {
    recommendations.push('🚨🚨 Air quality is very unhealthy - avoid outdoor activities')
    recommendations.push('🏠 Remain indoors with air conditioning')
    recommendations.push('🏥 Seek medical attention if experiencing symptoms')
  } else {
    recommendations.push('🚨🚨🚨 Air quality is hazardous - emergency conditions')
    recommendations.push('🏠 Do not go outside - remain indoors')
    recommendations.push('🏥 Seek immediate medical attention if needed')
    recommendations.push('📞 Contact local health authorities')
  }

  return recommendations
}
