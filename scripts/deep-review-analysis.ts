#!/usr/bin/env tsx

import * as fs from 'fs'
import * as path from 'path'

interface RatingPattern {
  category: string
  neighborhood?: string
  rating: number
  name: string
  priceRange?: string
  cuisine?: string
}

interface CorrelationAnalysis {
  priceVsRating: {
    correlation: number
    rSquared: number
    interpretation: string
  }
  neighborhoodVsRating: {
    [neighborhood: string]: {
      avgRating: number
      count: number
      stdDev: number
    }
  }
  cuisineVsRating: {
    [cuisine: string]: {
      avgRating: number
      count: number
      stdDev: number
    }
  }
}

interface TrendAnalysis {
  ratingClusters: Array<{
    range: string
    count: number
    percentage: number
    items: string[]
  }>
  outlierAnalysis: {
    highOutliers: Array<{ name: string, rating: number, expected: number }>
    lowOutliers: Array<{ name: string, rating: number, expected: number }>
  }
  consistencyScore: number
}

// Load and analyze all rating data
function loadRatingData(): RatingPattern[] {
  const dataDir = path.join(process.cwd(), 'data')
  const patterns: RatingPattern[] = []

  // Load restaurants
  const restaurants = JSON.parse(fs.readFileSync(path.join(dataDir, 'restaurants.json'), 'utf-8'))
  restaurants.forEach((item: any) => {
    patterns.push({
      category: 'restaurant',
      neighborhood: item.neighborhood,
      rating: item.rating,
      name: item.name,
      priceRange: item.priceRange,
      cuisine: item.cuisine
    })
  })

  // Load top 100
  const top100 = JSON.parse(fs.readFileSync(path.join(dataDir, 'top100.json'), 'utf-8'))
  top100.forEach((item: any) => {
    patterns.push({
      category: item.category.toLowerCase(),
      rating: item.rating,
      name: item.name
    })
  })

  return patterns
}

// Calculate correlation coefficient
function calculateCorrelation(x: number[], y: number[]): number {
  const n = x.length
  const sumX = x.reduce((a, b) => a + b, 0)
  const sumY = y.reduce((a, b) => a + b, 0)
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0)
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0)
  const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0)

  const numerator = n * sumXY - sumX * sumY
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))

  return denominator === 0 ? 0 : numerator / denominator
}

// Calculate standard deviation
function calculateStdDev(values: number[]): number {
  const mean = values.reduce((a, b) => a + b, 0) / values.length
  const variance = values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / values.length
  return Math.sqrt(variance)
}

// Analyze correlations
function analyzeCorrelations(patterns: RatingPattern[]): CorrelationAnalysis {
  // Price vs Rating correlation
  const priceToNumber = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 }
  const restaurantsWithPrice = patterns.filter(p => p.category === 'restaurant' && p.priceRange)

  const prices = restaurantsWithPrice.map(p => priceToNumber[p.priceRange as keyof typeof priceToNumber] || 0)
  const ratings = restaurantsWithPrice.map(p => p.rating)

  const priceRatingCorrelation = calculateCorrelation(prices, ratings)
  const rSquared = Math.pow(priceRatingCorrelation, 2)

  // Neighborhood analysis
  const neighborhoodStats: { [key: string]: { ratings: number[], avgRating: number, count: number, stdDev: number } } = {}

  patterns.forEach(pattern => {
    if (pattern.neighborhood) {
      if (!neighborhoodStats[pattern.neighborhood]) {
        neighborhoodStats[pattern.neighborhood] = { ratings: [], avgRating: 0, count: 0, stdDev: 0 }
      }
      neighborhoodStats[pattern.neighborhood].ratings.push(pattern.rating)
      neighborhoodStats[pattern.neighborhood].count++
    }
  })

  Object.keys(neighborhoodStats).forEach(neighborhood => {
    const stats = neighborhoodStats[neighborhood]
    stats.avgRating = stats.ratings.reduce((a, b) => a + b, 0) / stats.ratings.length
    stats.stdDev = calculateStdDev(stats.ratings)
  })

  // Cuisine analysis
  const cuisineStats: { [key: string]: { ratings: number[], avgRating: number, count: number, stdDev: number } } = {}

  patterns.filter(p => p.cuisine).forEach(pattern => {
    const cuisine = pattern.cuisine!
    if (!cuisineStats[cuisine]) {
      cuisineStats[cuisine] = { ratings: [], avgRating: 0, count: 0, stdDev: 0 }
    }
    cuisineStats[cuisine].ratings.push(pattern.rating)
    cuisineStats[cuisine].count++
  })

  Object.keys(cuisineStats).forEach(cuisine => {
    const stats = cuisineStats[cuisine]
    stats.avgRating = stats.ratings.reduce((a, b) => a + b, 0) / stats.ratings.length
    stats.stdDev = calculateStdDev(stats.ratings)
  })

  return {
    priceVsRating: {
      correlation: Math.round(priceRatingCorrelation * 1000) / 1000,
      rSquared: Math.round(rSquared * 1000) / 1000,
      interpretation: Math.abs(priceRatingCorrelation) < 0.3 ? 'Weak correlation' :
                     Math.abs(priceRatingCorrelation) < 0.7 ? 'Moderate correlation' :
                     'Strong correlation'
    },
    neighborhoodVsRating: Object.fromEntries(
      Object.entries(neighborhoodStats).map(([n, s]) => [n, {
        avgRating: Math.round(s.avgRating * 100) / 100,
        count: s.count,
        stdDev: Math.round(s.stdDev * 100) / 100
      }])
    ),
    cuisineVsRating: Object.fromEntries(
      Object.entries(cuisineStats).map(([c, s]) => [c, {
        avgRating: Math.round(s.avgRating * 100) / 100,
        count: s.count,
        stdDev: Math.round(s.stdDev * 100) / 100
      }])
    )
  }
}

// Analyze trends and patterns
function analyzeTrends(patterns: RatingPattern[]): TrendAnalysis {
  // Rating clusters
  const clusters = [
    { range: '4.8-5.0', min: 4.8, max: 5.0, items: [] as string[], count: 0, percentage: 0 },
    { range: '4.5-4.7', min: 4.5, max: 4.7, items: [] as string[], count: 0, percentage: 0 },
    { range: '4.0-4.4', min: 4.0, max: 4.4, items: [] as string[], count: 0, percentage: 0 },
    { range: '3.5-3.9', min: 3.5, max: 3.9, items: [] as string[], count: 0, percentage: 0 },
    { range: '3.0-3.4', min: 3.0, max: 3.4, items: [] as string[], count: 0, percentage: 0 },
    { range: '0.0-2.9', min: 0.0, max: 2.9, items: [] as string[], count: 0, percentage: 0 }
  ]

  patterns.forEach(pattern => {
    const cluster = clusters.find(c => pattern.rating >= c.min && pattern.rating <= c.max)
    if (cluster) {
      cluster.items.push(pattern.name)
    }
  })

  const totalRated = patterns.length
  clusters.forEach(cluster => {
    cluster.count = cluster.items.length
    cluster.percentage = Math.round((cluster.count / totalRated) * 1000) / 10
  })

  // Outlier analysis using IQR method
  const ratings = patterns.map(p => p.rating).sort((a, b) => a - b)
  const q1 = ratings[Math.floor(ratings.length * 0.25)]
  const q3 = ratings[Math.floor(ratings.length * 0.75)]
  const iqr = q3 - q1
  const lowerBound = q1 - 1.5 * iqr
  const upperBound = q3 + 1.5 * iqr

  const highOutliers = patterns.filter(p => p.rating > upperBound).map(p => ({
    name: p.name,
    rating: p.rating,
    expected: upperBound
  }))

  const lowOutliers = patterns.filter(p => p.rating < lowerBound).map(p => ({
    name: p.name,
    rating: p.rating,
    expected: lowerBound
  }))

  // Consistency score (inverse of coefficient of variation)
  const mean = ratings.reduce((a, b) => a + b, 0) / ratings.length
  const stdDev = calculateStdDev(ratings)
  const coefficientOfVariation = stdDev / mean
  const consistencyScore = Math.max(0, Math.round((1 - coefficientOfVariation) * 1000) / 10)

  return {
    ratingClusters: clusters.filter(c => c.count > 0),
    outlierAnalysis: { highOutliers, lowOutliers },
    consistencyScore
  }
}

// Generate comprehensive deep analysis report
function generateDeepAnalysisReport() {
  console.log('🔬 DEEP REVIEW ANALYSIS - PATTERNS & CORRELATIONS')
  console.log('='.repeat(80))

  const patterns = loadRatingData()
  const correlations = analyzeCorrelations(patterns)
  const trends = analyzeTrends(patterns)

  console.log(`\n📊 DATA OVERVIEW`)
  console.log(`Total rated items analyzed: ${patterns.length}`)
  console.log(`Categories represented: ${Array.from(new Set(patterns.map(p => p.category))).length}`)
  console.log(`Neighborhoods represented: ${Array.from(new Set(patterns.map(p => p.neighborhood).filter(n => n))).length}`)
  console.log(`Cuisine types represented: ${Array.from(new Set(patterns.map(p => p.cuisine).filter(c => c))).length}`)

  console.log(`\n💰 PRICE VS RATING CORRELATION`)
  console.log(`Correlation coefficient: ${correlations.priceVsRating.correlation}`)
  console.log(`R-squared: ${correlations.priceVsRating.rSquared}`)
  console.log(`Interpretation: ${correlations.priceVsRating.interpretation}`)

  if (Math.abs(correlations.priceVsRating.correlation) > 0.3) {
    if (correlations.priceVsRating.correlation > 0) {
      console.log(`📈 Insight: Higher-priced restaurants tend to have higher ratings`)
    } else {
      console.log(`📉 Insight: Lower-priced restaurants tend to have higher ratings`)
    }
  } else {
    console.log(`🔄 Insight: Price has minimal impact on ratings`)
  }

  console.log(`\n🏙️  NEIGHBORHOOD RATING ANALYSIS`)
  Object.entries(correlations.neighborhoodVsRating)
    .sort(([,a], [,b]) => b.avgRating - a.avgRating)
    .forEach(([neighborhood, stats]) => {
      console.log(`${neighborhood}:`)
      console.log(`  Average Rating: ${stats.avgRating}/5.0 (${stats.count} items)`)
      console.log(`  Consistency: ${stats.stdDev < 0.2 ? 'Very High' : stats.stdDev < 0.4 ? 'High' : stats.stdDev < 0.6 ? 'Moderate' : 'Low'}`)
    })

  console.log(`\n🍽️  CUISINE RATING ANALYSIS`)
  Object.entries(correlations.cuisineVsRating)
    .sort(([,a], [,b]) => b.avgRating - a.avgRating)
    .forEach(([cuisine, stats]) => {
      console.log(`${cuisine}:`)
      console.log(`  Average Rating: ${stats.avgRating}/5.0 (${stats.count} items)`)
      console.log(`  Consistency: ${stats.stdDev < 0.2 ? 'Very High' : stats.stdDev < 0.4 ? 'High' : stats.stdDev < 0.6 ? 'Moderate' : 'Low'}`)
    })

  console.log(`\n📈 RATING DISTRIBUTION CLUSTERS`)
  trends.ratingClusters.forEach(cluster => {
    console.log(`${cluster.range} stars: ${cluster.count} items (${cluster.percentage}%)`)
    if (cluster.items.length <= 5) {
      console.log(`  Items: ${cluster.items.join(', ')}`)
    } else {
      console.log(`  Top items: ${cluster.items.slice(0, 3).join(', ')}...`)
    }
  })

  console.log(`\n🎯 OUTLIER ANALYSIS`)
  console.log(`Overall rating consistency score: ${trends.consistencyScore}/100`)

  if (trends.outlierAnalysis.highOutliers.length > 0) {
    console.log(`High outliers (exceptionally high ratings):`)
    trends.outlierAnalysis.highOutliers.forEach(outlier => {
      console.log(`  ${outlier.name}: ${outlier.rating}/5.0 (expected max: ${outlier.expected.toFixed(1)})`)
    })
  }

  if (trends.outlierAnalysis.lowOutliers.length > 0) {
    console.log(`Low outliers (exceptionally low ratings):`)
    trends.outlierAnalysis.lowOutliers.forEach(outlier => {
      console.log(`  ${outlier.name}: ${outlier.rating}/5.0 (expected min: ${outlier.expected.toFixed(1)})`)
    })
  }

  console.log(`\n🔍 KEY PATTERNS & INSIGHTS`)

  // Identify top performing categories
  const categoryPerformance = Object.entries(correlations.cuisineVsRating)
    .sort(([,a], [,b]) => b.avgRating - a.avgRating)

  if (categoryPerformance.length > 0) {
    console.log(`🥇 Top performing cuisine: ${categoryPerformance[0][0]} (${categoryPerformance[0][1].avgRating}/5.0)`)
    console.log(`🥉 Lowest performing cuisine: ${categoryPerformance[categoryPerformance.length - 1][0]} (${categoryPerformance[categoryPerformance.length - 1][1].avgRating}/5.0)`)
  }

  // Neighborhood insights
  const neighborhoodPerformance = Object.entries(correlations.neighborhoodVsRating)
    .sort(([,a], [,b]) => b.avgRating - a.avgRating)

  if (neighborhoodPerformance.length > 0) {
    console.log(`🏆 Highest rated neighborhood: ${neighborhoodPerformance[0][0]} (${neighborhoodPerformance[0][1].avgRating}/5.0)`)
    console.log(`📍 Most consistent neighborhood: ${
      Object.entries(correlations.neighborhoodVsRating)
        .sort(([,a], [,b]) => a.stdDev - b.stdDev)[0][0]
    }`)
  }

  // Rating distribution insights
  const excellentCount = trends.ratingClusters.find(c => c.range === '4.8-5.0')?.count || 0
  const goodCount = trends.ratingClusters.find(c => c.range === '4.5-4.7')?.count || 0
  const excellentPercentage = ((excellentCount + goodCount) / patterns.length) * 100

  if (excellentPercentage > 80) {
    console.log(`🌟 EXCEPTIONAL: ${excellentPercentage.toFixed(1)}% of rated items are 4.5+ stars`)
  } else if (excellentPercentage > 60) {
    console.log(`⭐ STRONG: ${excellentPercentage.toFixed(1)}% of rated items are 4.5+ stars`)
  }

  console.log(`\n📋 STRATEGIC RECOMMENDATIONS`)

  // Price positioning recommendations
  if (correlations.priceVsRating.correlation > 0.5) {
    console.log(`💰 PRICE POSITIONING: Higher price points correlate with higher ratings. Consider premium positioning for new establishments.`)
  } else if (correlations.priceVsRating.correlation < -0.3) {
    console.log(`💰 PRICE POSITIONING: Value-driven establishments tend to rate higher. Focus on quality-to-price ratio.`)
  }

  // Neighborhood expansion recommendations
  const unratedNeighborhoods = ['Lawrenceville', 'Downtown', 'East Liberty', 'Pittsburgh Region']
  console.log(`🏙️  EXPANSION OPPORTUNITIES: Focus review collection in: ${unratedNeighborhoods.join(', ')}`)

  // Category expansion recommendations
  const unratedCategories = ['services', 'home-services', 'tattoo', 'creative']
  console.log(`📂 CATEGORY GAPS: Prioritize review systems for: ${unratedCategories.join(', ')}`)

  // Quality improvement recommendations
  if (trends.consistencyScore < 70) {
    console.log(`🔧 QUALITY IMPROVEMENT: Rating consistency is low. Focus on quality control and standards.`)
  }

  console.log(`\n🎯 NEXT STEPS`)
  console.log(`1. Implement dynamic review collection system`)
  console.log(`2. Create neighborhood-specific marketing campaigns`)
  console.log(`3. Develop category-specific review incentives`)
  console.log(`4. Build real-time rating analytics dashboard`)
  console.log(`5. Establish review quality verification processes`)

  console.log('\n' + '='.repeat(80))
  console.log('DEEP ANALYSIS COMPLETE')
  console.log('='.repeat(80))
}

// Run the deep analysis
generateDeepAnalysisReport()
