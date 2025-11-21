// Live Weather API - Real-time weather data for Pittsburgh locations

import { NextRequest, NextResponse } from 'next/server'
import { realTimeDataManager } from '@/utils/realtimeDataAggregator'
import { ALL_PITTSBURGH_LOCATIONS } from '@/data/pittsburgh-locations'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location') || 'Pittsburgh'
    const lat = parseFloat(searchParams.get('lat') || '40.4406')
    const lng = parseFloat(searchParams.get('lng') || '-79.9959')

    // Validate coordinates
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return NextResponse.json(
        { error: 'Invalid coordinates' },
        { status: 400 }
      )
    }

    // Get live weather data
    const weather = await realTimeDataManager.weather.getLiveWeather(lat, lng, location)

    // Add weather-based recommendations
    const recommendations = getWeatherRecommendations(weather)

    return NextResponse.json({
      weather,
      recommendations,
      location: {
        name: location,
        coordinates: { lat, lng }
      },
      lastUpdated: weather.lastUpdated.toISOString()
    })

  } catch (error) {
    console.error('Live weather API error:', error)

    // Return fallback weather data
    const fallbackWeather = getFallbackWeather()
    return NextResponse.json({
      weather: fallbackWeather,
      recommendations: [],
      fallback: true,
      error: 'Live weather data unavailable'
    })
  }
}

function getWeatherRecommendations(weather: any): string[] {
  const recommendations: string[] = []

  // Temperature-based recommendations
  if (weather.temperature < 32) {
    recommendations.push('❄️ Bundle up! Freezing temperatures today')
    recommendations.push('☕ Visit indoor cafes and restaurants')
    recommendations.push('🏠 Consider indoor activities and events')
  } else if (weather.temperature < 50) {
    recommendations.push('🧥 Cool weather - bring a jacket')
    recommendations.push('☕ Perfect weather for coffee shops')
    recommendations.push('🏃‍♂️ Great conditions for indoor workouts')
  } else if (weather.temperature > 80) {
    recommendations.push('🌞 Hot day! Stay hydrated')
    recommendations.push('🍨 Visit ice cream shops and outdoor cafes')
    recommendations.push('🏖️ Check out outdoor events and festivals')
  }

  // Precipitation recommendations
  if (weather.forecast.some((day: any) => day.precipitation > 50)) {
    recommendations.push('🌧️ Rain expected - check indoor event alternatives')
    recommendations.push('🏛️ Visit museums and indoor attractions')
    recommendations.push('🍽️ Consider restaurants with indoor seating')
  }

  // Wind recommendations
  if (weather.windSpeed > 20) {
    recommendations.push('💨 Windy conditions - secure loose items')
    recommendations.push('🏃‍♂️ Great day for indoor fitness activities')
  }

  // Activity-specific recommendations
  recommendations.push('🍺 Check happy hours at local breweries')
  recommendations.push('🎭 See what\'s happening at Pittsburgh theaters')
  recommendations.push('🏟️ Catch a Steelers or Penguins game')

  return recommendations.slice(0, 5) // Limit to 5 recommendations
}

function getFallbackWeather(): any {
  const currentDate = new Date()
  const currentHour = currentDate.getHours()

  // Generate realistic fallback weather based on season and time
  const month = currentDate.getMonth()
  let baseTemp = 70

  if (month >= 11 || month <= 2) { // Winter
    baseTemp = 35
  } else if (month >= 5 && month <= 8) { // Summer
    baseTemp = 78
  } else if (month >= 3 && month <= 4) { // Spring
    baseTemp = 55
  } else { // Fall
    baseTemp = 60
  }

  // Add some variation based on time of day
  const tempVariation = Math.sin((currentHour - 6) / 24 * 2 * Math.PI) * 10
  const temperature = Math.round(baseTemp + tempVariation)

  return {
    location: 'Pittsburgh',
    temperature,
    feelsLike: temperature - 2,
    humidity: 65,
    windSpeed: 8,
    windDirection: 'SW',
    conditions: temperature > 70 ? 'Sunny' : temperature > 50 ? 'Partly Cloudy' : 'Cloudy',
    icon: '01d',
    forecast: Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() + i)
      return {
        date,
        high: Math.round(baseTemp + Math.random() * 10),
        low: Math.round(baseTemp - 10 - Math.random() * 5),
        conditions: 'Partly Cloudy',
        icon: '02d',
        precipitation: Math.floor(Math.random() * 30)
      }
    }),
    lastUpdated: currentDate
  }
}

// Get weather for all Pittsburgh locations
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get weather for all major Pittsburgh locations
    const weatherPromises = ALL_PITTSBURGH_LOCATIONS.map(async (location) => {
      try {
        const weather = await realTimeDataManager.weather.getLiveWeather(
          location.coordinates.lat,
          location.coordinates.lng,
          location.name
        )
        return {
          location: location.name,
          weather,
          success: true
        }
      } catch (error) {
        return {
          location: location.name,
          weather: getFallbackWeather(),
          success: false,
          error: 'Weather data unavailable'
        }
      }
    })

    const weatherData = await Promise.all(weatherPromises)

    return NextResponse.json({
      locations: weatherData,
      total: weatherData.length,
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Bulk weather API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bulk weather data' },
      { status: 500 }
    )
  }
}
