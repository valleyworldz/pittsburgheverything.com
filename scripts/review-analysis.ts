#!/usr/bin/env tsx

import * as fs from 'fs'
import * as path from 'path'

interface ReviewAnalysis {
  totalItems: number
  itemsWithRatings: number
  itemsWithoutRatings: number
  reviewCoverage: number
  averageRating: number
  ratingDistribution: { [key: number]: number }
  ratingRanges: {
    excellent: number // 4.5-5.0
    good: number // 3.5-4.4
    average: number // 2.5-3.4
    poor: number // 1.0-2.4
  }
  categoryBreakdown: { [category: string]: CategoryAnalysis }
  neighborhoodBreakdown: { [neighborhood: string]: NeighborhoodAnalysis }
  topRated: Array<{ name: string, rating: number, category: string, neighborhood?: string }>
  lowestRated: Array<{ name: string, rating: number, category: string, neighborhood?: string }>
  ratingVariance: number
  medianRating: number
  modeRating: number
}

interface CategoryAnalysis {
  count: number
  averageRating: number
  coverage: number
  topRated: string
  lowestRated: string
}

interface NeighborhoodAnalysis {
  count: number
  averageRating: number
  coverage: number
  categories: string[]
}

// Load all data files
function loadDataFiles() {
  const dataDir = path.join(process.cwd(), 'data')

  const files = {
    restaurants: JSON.parse(fs.readFileSync(path.join(dataDir, 'restaurants.json'), 'utf-8')),
    businesses: JSON.parse(fs.readFileSync(path.join(dataDir, 'businesses.json'), 'utf-8')),
    top100: JSON.parse(fs.readFileSync(path.join(dataDir, 'top100.json'), 'utf-8')),
    events: JSON.parse(fs.readFileSync(path.join(dataDir, 'events.json'), 'utf-8')),
    services: JSON.parse(fs.readFileSync(path.join(dataDir, 'services.json'), 'utf-8')),
    deals: JSON.parse(fs.readFileSync(path.join(dataDir, 'deals.json'), 'utf-8')),
    neighborhoods: JSON.parse(fs.readFileSync(path.join(dataDir, 'neighborhoods.json'), 'utf-8'))
  }

  return files
}

// Analyze review data
function analyzeReviews(): ReviewAnalysis {
  const data = loadDataFiles()
  const allItems: Array<{ name: string, rating?: number, category: string, neighborhood?: string }> = []

  // Collect all items with ratings
  data.restaurants.forEach((item: any) => {
    allItems.push({
      name: item.name,
      rating: item.rating,
      category: 'restaurants',
      neighborhood: item.neighborhood
    })
  })

  data.businesses.forEach((item: any) => {
    if (item.category) {
      allItems.push({
        name: item.name,
        rating: undefined, // businesses don't have ratings in current data
        category: item.category,
        neighborhood: item.neighborhood
      })
    }
  })

  data.top100.forEach((item: any) => {
    allItems.push({
      name: item.name,
      rating: item.rating,
      category: item.category.toLowerCase(),
      neighborhood: undefined
    })
  })

  data.services.forEach((item: any) => {
    allItems.push({
      name: item.name,
      rating: undefined,
      category: 'services',
      neighborhood: item.neighborhood
    })
  })

  // Filter items with ratings
  const itemsWithRatings = allItems.filter(item => item.rating !== undefined)
  const itemsWithoutRatings = allItems.filter(item => item.rating === undefined)

  // Calculate basic stats
  const totalItems = allItems.length
  const reviewCoverage = (itemsWithRatings.length / totalItems) * 100
  const ratings = itemsWithRatings.map(item => item.rating!).filter(r => r > 0)

  if (ratings.length === 0) {
    throw new Error('No ratings found in data')
  }

  const averageRating = ratings.reduce((sum, r) => sum + r, 0) / ratings.length

  // Rating distribution
  const ratingDistribution: { [key: number]: number } = {}
  ratings.forEach(rating => {
    const rounded = Math.round(rating * 2) / 2 // Round to nearest 0.5
    ratingDistribution[rounded] = (ratingDistribution[rounded] || 0) + 1
  })

  // Rating ranges
  const ratingRanges = {
    excellent: ratings.filter(r => r >= 4.5).length,
    good: ratings.filter(r => r >= 3.5 && r < 4.5).length,
    average: ratings.filter(r => r >= 2.5 && r < 3.5).length,
    poor: ratings.filter(r => r < 2.5).length
  }

  // Category breakdown
  const categoryBreakdown: { [category: string]: CategoryAnalysis } = {}
  const categories = Array.from(new Set(allItems.map(item => item.category)))

  categories.forEach(category => {
    const categoryItems = allItems.filter(item => item.category === category)
    const categoryWithRatings = categoryItems.filter(item => item.rating !== undefined)

    if (categoryWithRatings.length > 0) {
      const avgRating = categoryWithRatings.reduce((sum, item) => sum + item.rating!, 0) / categoryWithRatings.length
      const coverage = (categoryWithRatings.length / categoryItems.length) * 100

      const sortedByRating = categoryWithRatings.sort((a, b) => (b.rating || 0) - (a.rating || 0))

      categoryBreakdown[category] = {
        count: categoryItems.length,
        averageRating: Math.round(avgRating * 100) / 100,
        coverage: Math.round(coverage * 100) / 100,
        topRated: sortedByRating[0]?.name || 'N/A',
        lowestRated: sortedByRating[sortedByRating.length - 1]?.name || 'N/A'
      }
    } else {
      categoryBreakdown[category] = {
        count: categoryItems.length,
        averageRating: 0,
        coverage: 0,
        topRated: 'N/A',
        lowestRated: 'N/A'
      }
    }
  })

  // Neighborhood breakdown
  const neighborhoodBreakdown: { [neighborhood: string]: NeighborhoodAnalysis } = {}
  const neighborhoods = Array.from(new Set(allItems.map(item => item.neighborhood).filter(n => n)))

  neighborhoods.forEach(neighborhood => {
    if (!neighborhood) return // Skip undefined neighborhoods

    const neighborhoodItems = allItems.filter(item => item.neighborhood === neighborhood)
    const neighborhoodWithRatings = neighborhoodItems.filter(item => item.rating !== undefined)

    const categories = Array.from(new Set(neighborhoodItems.map(item => item.category)))

    if (neighborhoodWithRatings.length > 0) {
      const avgRating = neighborhoodWithRatings.reduce((sum, item) => sum + item.rating!, 0) / neighborhoodWithRatings.length
      const coverage = (neighborhoodWithRatings.length / neighborhoodItems.length) * 100

      neighborhoodBreakdown[neighborhood] = {
        count: neighborhoodItems.length,
        averageRating: Math.round(avgRating * 100) / 100,
        coverage: Math.round(coverage * 100) / 100,
        categories
      }
    } else {
      neighborhoodBreakdown[neighborhood] = {
        count: neighborhoodItems.length,
        averageRating: 0,
        coverage: 0,
        categories
      }
    }
  })

  // Top and lowest rated
  const sortedByRating = itemsWithRatings.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  const topRated = sortedByRating.slice(0, 10).map(item => ({
    name: item.name,
    rating: item.rating!,
    category: item.category,
    neighborhood: item.neighborhood
  }))

  const lowestRated = sortedByRating.slice(-10).reverse().map(item => ({
    name: item.name,
    rating: item.rating!,
    category: item.category,
    neighborhood: item.neighborhood
  }))

  // Statistical calculations
  const sortedRatings = [...ratings].sort((a, b) => a - b)
  const medianRating = sortedRatings.length % 2 === 0
    ? (sortedRatings[sortedRatings.length / 2 - 1] + sortedRatings[sortedRatings.length / 2]) / 2
    : sortedRatings[Math.floor(sortedRatings.length / 2)]

  const ratingVariance = ratings.reduce((sum, r) => sum + Math.pow(r - averageRating, 2), 0) / ratings.length

  const frequency: { [key: number]: number } = {}
  ratings.forEach(r => {
    const rounded = Math.round(r * 2) / 2
    frequency[rounded] = (frequency[rounded] || 0) + 1
  })
  const modeRating = Object.entries(frequency).sort(([,a], [,b]) => b - a)[0][0]

  return {
    totalItems,
    itemsWithRatings: itemsWithRatings.length,
    itemsWithoutRatings: itemsWithoutRatings.length,
    reviewCoverage: Math.round(reviewCoverage * 100) / 100,
    averageRating: Math.round(averageRating * 100) / 100,
    ratingDistribution,
    ratingRanges,
    categoryBreakdown,
    neighborhoodBreakdown,
    topRated,
    lowestRated,
    ratingVariance: Math.round(ratingVariance * 100) / 100,
    medianRating: Math.round(medianRating * 100) / 100,
    modeRating: parseFloat(modeRating)
  }
}

// Generate comprehensive report
function generateReport(analysis: ReviewAnalysis) {
  console.log('='.repeat(80))
  console.log('PITTSBURGH EVERYTHING.COM - COMPREHENSIVE REVIEW ANALYSIS')
  console.log('='.repeat(80))
  console.log()

  console.log('📊 OVERVIEW STATISTICS')
  console.log('-'.repeat(40))
  console.log(`Total Items: ${analysis.totalItems}`)
  console.log(`Items with Ratings: ${analysis.itemsWithRatings}`)
  console.log(`Items without Ratings: ${analysis.itemsWithoutRatings}`)
  console.log(`Review Coverage: ${analysis.reviewCoverage}%`)
  console.log(`Average Rating: ${analysis.averageRating}/5.0`)
  console.log(`Median Rating: ${analysis.medianRating}/5.0`)
  console.log(`Mode Rating: ${analysis.modeRating}/5.0`)
  console.log(`Rating Variance: ${analysis.ratingVariance}`)
  console.log()

  console.log('📈 RATING DISTRIBUTION')
  console.log('-'.repeat(40))
  Object.entries(analysis.ratingDistribution)
    .sort(([a], [b]) => parseFloat(b) - parseFloat(a))
    .forEach(([rating, count]) => {
      const percentage = ((count / analysis.itemsWithRatings) * 100).toFixed(1)
      const bar = '█'.repeat(Math.round((count / Math.max(...Object.values(analysis.ratingDistribution))) * 20))
      console.log(`${rating} ⭐: ${count} items (${percentage}%) ${bar}`)
    })
  console.log()

  console.log('🏆 RATING RANGES')
  console.log('-'.repeat(40))
  console.log(`Excellent (4.5-5.0): ${analysis.ratingRanges.excellent} items (${((analysis.ratingRanges.excellent / analysis.itemsWithRatings) * 100).toFixed(1)}%)`)
  console.log(`Good (3.5-4.4): ${analysis.ratingRanges.good} items (${((analysis.ratingRanges.good / analysis.itemsWithRatings) * 100).toFixed(1)}%)`)
  console.log(`Average (2.5-3.4): ${analysis.ratingRanges.average} items (${((analysis.ratingRanges.average / analysis.itemsWithRatings) * 100).toFixed(1)}%)`)
  console.log(`Poor (1.0-2.4): ${analysis.ratingRanges.poor} items (${((analysis.ratingRanges.poor / analysis.itemsWithRatings) * 100).toFixed(1)}%)`)
  console.log()

  console.log('📂 CATEGORY BREAKDOWN')
  console.log('-'.repeat(40))
  Object.entries(analysis.categoryBreakdown)
    .sort(([,a], [,b]) => b.averageRating - a.averageRating)
    .forEach(([category, stats]) => {
      console.log(`${category.charAt(0).toUpperCase() + category.slice(1)}:`)
      console.log(`  Total: ${stats.count} | Rated: ${Math.round((stats.coverage / 100) * stats.count)} | Coverage: ${stats.coverage}%`)
      console.log(`  Avg Rating: ${stats.averageRating}/5.0`)
      console.log(`  Top Rated: ${stats.topRated}`)
      console.log(`  Lowest Rated: ${stats.lowestRated}`)
      console.log()
    })

  console.log('🏙️  NEIGHBORHOOD BREAKDOWN')
  console.log('-'.repeat(40))
  Object.entries(analysis.neighborhoodBreakdown)
    .sort(([,a], [,b]) => b.averageRating - a.averageRating)
    .forEach(([neighborhood, stats]) => {
      console.log(`${neighborhood}:`)
      console.log(`  Total: ${stats.count} | Rated: ${Math.round((stats.coverage / 100) * stats.count)} | Coverage: ${stats.coverage}%`)
      console.log(`  Avg Rating: ${stats.averageRating}/5.0`)
      console.log(`  Categories: ${stats.categories.join(', ')}`)
      console.log()
    })

  console.log('🥇 TOP 10 RATED ITEMS')
  console.log('-'.repeat(40))
  analysis.topRated.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} (${item.rating}/5.0)`)
    console.log(`   Category: ${item.category}${item.neighborhood ? ` | Neighborhood: ${item.neighborhood}` : ''}`)
  })
  console.log()

  console.log('🥉 LOWEST 10 RATED ITEMS')
  console.log('-'.repeat(40))
  analysis.lowestRated.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} (${item.rating}/5.0)`)
    console.log(`   Category: ${item.category}${item.neighborhood ? ` | Neighborhood: ${item.neighborhood}` : ''}`)
  })
  console.log()

  console.log('🔍 KEY INSIGHTS & RECOMMENDATIONS')
  console.log('-'.repeat(40))

  // Coverage insights
  if (analysis.reviewCoverage < 50) {
    console.log('❌ CRITICAL: Review coverage is very low (<50%). Most listings lack ratings.')
  } else if (analysis.reviewCoverage < 75) {
    console.log('⚠️  WARNING: Review coverage is moderate. Consider expanding review collection.')
  } else {
    console.log('✅ GOOD: Review coverage is strong (>75%).')
  }

  // Rating quality insights
  if (analysis.averageRating >= 4.0) {
    console.log('⭐ EXCELLENT: Average rating is very high. Pittsburgh has quality establishments.')
  } else if (analysis.averageRating >= 3.5) {
    console.log('👍 GOOD: Average rating is solid but room for improvement.')
  } else {
    console.log('⚠️  CONCERNING: Average rating is below 3.5. May indicate quality issues.')
  }

  // Distribution insights
  const excellentPercentage = (analysis.ratingRanges.excellent / analysis.itemsWithRatings) * 100
  if (excellentPercentage > 60) {
    console.log('🌟 OUTSTANDING: Over 60% of rated items are excellent (4.5+).')
  } else if (excellentPercentage > 40) {
    console.log('👍 STRONG: Over 40% of rated items are excellent.')
  }

  // Category gaps
  const categoriesWithoutCoverage = Object.entries(analysis.categoryBreakdown)
    .filter(([, stats]) => stats.coverage === 0)
    .map(([category]) => category)

  if (categoriesWithoutCoverage.length > 0) {
    console.log(`📝 MISSING: No ratings for categories: ${categoriesWithoutCoverage.join(', ')}`)
  }

  // Neighborhood insights
  const neighborhoodsWithoutCoverage = Object.entries(analysis.neighborhoodBreakdown)
    .filter(([, stats]) => stats.coverage === 0)
    .map(([neighborhood]) => neighborhood)

  if (neighborhoodsWithoutCoverage.length > 0) {
    console.log(`🏙️  GAPS: No ratings for neighborhoods: ${neighborhoodsWithoutCoverage.join(', ')}`)
  }

  console.log()
  console.log('📋 ACTION ITEMS')
  console.log('-'.repeat(40))
  console.log('1. Implement review collection system for categories with 0% coverage')
  console.log('2. Focus on gathering reviews for neighborhoods without ratings')
  console.log('3. Consider review verification and quality control processes')
  console.log('4. Analyze why certain establishments have significantly lower ratings')
  console.log('5. Implement review analytics dashboard for ongoing monitoring')
  console.log('6. Consider review incentives for businesses to encourage participation')
  console.log()

  console.log('='.repeat(80))
  console.log('ANALYSIS COMPLETE')
  console.log('='.repeat(80))
}

// Run the analysis
try {
  const analysis = analyzeReviews()
  generateReport(analysis)
} catch (error) {
  console.error('Error during analysis:', error)
  process.exit(1)
}
