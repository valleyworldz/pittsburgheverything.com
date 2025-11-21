// Advanced Local Keyword Optimization for Pittsburgh SEO Domination
// Generates comprehensive keyword strategies for local search dominance

export interface KeywordCluster {
  primary: string
  secondary: string[]
  longTail: string[]
  localVariations: string[]
  voiceSearch: string[]
  questionBased: string[]
  seasonal: string[]
  intent: 'informational' | 'transactional' | 'navigational' | 'commercial'
  difficulty: 'low' | 'medium' | 'high'
  volume: number
  cpc: number
}

// Master keyword database for Pittsburgh local SEO
export const PITTSBURGH_KEYWORD_MASTER = {
  // Core location keywords
  locations: [
    'pittsburgh',
    'pittsburgh pa',
    'pittsburgh pennsylvania',
    'steel city',
    'city of bridges',
    'downtown pittsburgh',
    'oakland pittsburgh',
    'shadyside pittsburgh',
    'south side pittsburgh',
    'lawrenceville pittsburgh',
    'strip district pittsburgh',
    'squirrel hill pittsburgh',
    'cranberry township',
    'robinson township',
    'monroeville',
    'murrysville',
    'bethel park',
    'mt lebanon',
    'fox chapel',
    'aspen wall',
    'sewickley',
    'ross township',
    'shaler township',
    'pine township',
    'west busch',
    'hempfield township'
  ],

  // Restaurant and dining keywords
  dining: [
    'restaurants',
    'best restaurants',
    'top restaurants',
    'fine dining',
    'casual dining',
    'italian restaurants',
    'steakhouse',
    'seafood restaurants',
    'pizza places',
    'burgers',
    'barbecue',
    'chinese food',
    'thai restaurants',
    'mexican restaurants',
    'indian restaurants',
    'japanese restaurants',
    'korean restaurants',
    'mediterranean food',
    'french restaurants',
    'german restaurants',
    'irish pubs',
    'craft beer',
    'wine bars',
    'cocktail bars',
    'speakeasies',
    'rooftop bars',
    'sports bars',
    'dive bars',
    'breweries',
    'wineries',
    'distilleries',
    'coffee shops',
    'cafes',
    'bakery',
    'ice cream',
    'desserts',
    'brunch spots',
    'late night dining',
    'delivery restaurants',
    'takeout food'
  ],

  // Event and entertainment keywords
  events: [
    'events',
    'things to do',
    'attractions',
    'festivals',
    'concerts',
    'theater',
    'museums',
    'art galleries',
    'sports events',
    'steelers games',
    'penguins games',
    'pirates games',
    'baseball games',
    'football games',
    'hockey games',
    'concerts pittsburgh',
    'live music',
    'comedy shows',
    'broadway shows',
    'ballet',
    'opera',
    'symphony',
    'jazz concerts',
    'rock concerts',
    'country concerts',
    'electronic music',
    'rave parties',
    'nightclubs',
    'dance clubs',
    'karaoke bars',
    'pool halls',
    'arcades',
    'escape rooms',
    'virtual reality',
    'laser tag',
    'mini golf',
    'bowling alleys',
    'movie theaters',
    'imax theaters',
    'drive in movies',
    'film festivals',
    'art festivals',
    'food festivals',
    'beer festivals',
    'wine festivals',
    'christmas events',
    'halloween events',
    'fourth of july',
    'labor day events',
    'thanksgiving events'
  ],

  // Deal and shopping keywords
  deals: [
    'deals',
    'coupons',
    'discounts',
    'special offers',
    'happy hour',
    'drink specials',
    'food specials',
    'half price',
    'buy one get one',
    'free',
    'complimentary',
    'promotions',
    'sales',
    'clearance',
    'markdowns',
    'student discounts',
    'senior discounts',
    'military discounts',
    'group discounts',
    'birthday specials',
    'anniversary deals',
    'valentines day specials',
    'mothers day deals',
    'fathers day specials',
    'holiday deals',
    'black friday',
    'cyber monday',
    'shopping',
    'boutiques',
    'department stores',
    'mall shopping',
    'outlet shopping',
    'thrift stores',
    'antique shops',
    'bookstores',
    'music stores',
    'electronics stores',
    'home goods',
    'furniture stores',
    'garden centers',
    'pet stores',
    'toy stores',
    'sporting goods',
    'bike shops',
    'running stores',
    'golf shops',
    'hiking gear'
  ],

  // Service and business keywords
  services: [
    'services',
    'businesses',
    'companies',
    'professional services',
    'hair salons',
    'barbershops',
    'nail salons',
    'spas',
    'massage therapy',
    'tattoo shops',
    'piercing studios',
    'dentists',
    'doctors',
    'hospitals',
    'urgent care',
    'pharmacies',
    'veterinarians',
    'pet grooming',
    'auto repair',
    'car washes',
    'gas stations',
    'tire shops',
    'oil changes',
    'detail shops',
    'lawyers',
    'accountants',
    'financial advisors',
    'insurance agents',
    'real estate agents',
    'mortgage brokers',
    'property management',
    'cleaning services',
    'landscaping',
    'plumbers',
    'electricians',
    'hvac services',
    'roofing contractors',
    'painters',
    'carpenters',
    'handymen',
    'moving companies',
    'storage facilities',
    'banks',
    'credit unions',
    'atms',
    'libraries',
    'post offices',
    'shipping services',
    'dry cleaners',
    'laundromats',
    'tailors',
    'shoe repair',
    'watch repair',
    'key cutting',
    'print shops',
    'photography studios',
    'music lessons',
    'dance studios',
    'yoga studios',
    'gyms',
    'fitness centers',
    'personal trainers',
    'physical therapy',
    'chiropractors',
    'acupuncture',
    'counseling services',
    'tutoring services'
  ]
}

// Generate comprehensive keyword clusters for local SEO
export function generateKeywordClusters(location: string, category: string): KeywordCluster[] {
  const locationNormalized = location.toLowerCase().replace(/\s+/g, ' ')
  const categoryNormalized = category.toLowerCase()

  const clusters: KeywordCluster[] = []

  // Base location + category combinations
  const primaryKeywords = [
    `${categoryNormalized} ${locationNormalized}`,
    `best ${categoryNormalized} ${locationNormalized}`,
    `${locationNormalized} ${categoryNormalized}`,
    `${categoryNormalized} in ${locationNormalized}`,
    `${locationNormalized} ${categoryNormalized} guide`
  ]

  primaryKeywords.forEach(primary => {
    clusters.push({
      primary,
      secondary: generateSecondaryKeywords(primary, categoryNormalized),
      longTail: generateLongTailKeywords(primary, locationNormalized, categoryNormalized),
      localVariations: generateLocalVariations(primary, locationNormalized),
      voiceSearch: generateVoiceSearchKeywords(primary, locationNormalized, categoryNormalized),
      questionBased: generateQuestionKeywords(primary, locationNormalized, categoryNormalized),
      seasonal: generateSeasonalKeywords(primary, categoryNormalized),
      intent: determineIntent(categoryNormalized),
      difficulty: calculateDifficulty(primary),
      volume: estimateVolume(primary),
      cpc: estimateCPC(primary, categoryNormalized)
    })
  })

  return clusters
}

// Generate secondary keywords (related terms)
function generateSecondaryKeywords(primary: string, category: string): string[] {
  const secondaryTerms = []

  // Add category variations
  if (category.includes('restaurant')) {
    secondaryTerms.push(
      primary.replace('restaurant', 'dining'),
      primary.replace('restaurant', 'eatery'),
      primary.replace('restaurant', 'bistro')
    )
  }

  if (category.includes('bar')) {
    secondaryTerms.push(
      primary.replace('bar', 'pub'),
      primary.replace('bar', 'lounge'),
      primary.replace('bar', 'tavern')
    )
  }

  // Add quality modifiers
  secondaryTerms.push(
    `top ${primary}`,
    `best ${primary}`,
    `highly rated ${primary}`,
    `popular ${primary}`,
    `recommended ${primary}`
  )

  return secondaryTerms
}

// Generate long-tail keywords (3+ word phrases)
function generateLongTailKeywords(primary: string, location: string, category: string): string[] {
  const longTail = []

  // Time-based long tails
  longTail.push(
    `${primary} near me`,
    `${primary} open now`,
    `${primary} open late`,
    `${primary} open sunday`,
    `${primary} delivery`,
    `${primary} takeout`,
    `${primary} reservations`,
    `${primary} happy hour`,
    `${primary} brunch`,
    `${primary} lunch specials`
  )

  // Quality and type modifiers
  longTail.push(
    `best rated ${primary}`,
    `highly rated ${primary}`,
    `top rated ${primary}`,
    `family friendly ${primary}`,
    `romantic ${primary}`,
    `casual ${primary}`,
    `upscale ${primary}`,
    `affordable ${primary}`,
    `luxury ${primary}`
  )

  // Specific features
  if (category.includes('restaurant')) {
    longTail.push(
      `${primary} with outdoor seating`,
      `${primary} with parking`,
      `${primary} with wifi`,
      `${primary} that deliver`,
      `${primary} for groups`,
      `${primary} for dates`,
      `${primary} for families`
    )
  }

  if (category.includes('bar')) {
    longTail.push(
      `${primary} with live music`,
      `${primary} with pool tables`,
      `${primary} with dart boards`,
      `${primary} with craft beer`,
      `${primary} with wine selection`,
      `${primary} with happy hour`
    )
  }

  return longTail
}

// Generate local variations (different ways to reference location)
function generateLocalVariations(primary: string, location: string): string[] {
  const variations = []

  // Pittsburgh specific variations
  if (location.includes('pittsburgh')) {
    variations.push(
      primary.replace('pittsburgh', 'pitt'),
      primary.replace('pittsburgh', 'steel city'),
      primary.replace('pittsburgh', 'pg'),
      primary.replace('pittsburgh', 'pgh')
    )
  }

  // Neighborhood variations
  const neighborhoods = [
    'downtown', 'oakland', 'shadyside', 'south side', 'lawrenceville',
    'strip district', 'squirrel hill', 'bloomfield', 'highland park',
    'regent square', 'mt washington', 'carnegie', 'greentree'
  ]

  neighborhoods.forEach(neighborhood => {
    variations.push(primary.replace(location, neighborhood))
  })

  // Directional references
  variations.push(
    `${primary} north`,
    `${primary} south`,
    `${primary} east`,
    `${primary} west`,
    `${primary} near downtown`,
    `${primary} in suburbs`
  )

  return variations
}

// Generate voice search keywords (natural language queries)
function generateVoiceSearchKeywords(primary: string, location: string, category: string): string[] {
  const voiceQueries = []

  // Conversational starters
  voiceQueries.push(
    `where can i find ${primary}`,
    `what are the best ${primary}`,
    `show me ${primary}`,
    `find ${primary} near me`,
    `directions to ${primary}`,
    `how do i get to ${primary}`
  )

  // Question format
  voiceQueries.push(
    `what's the best ${primary}`,
    `where is the closest ${primary}`,
    `are there any good ${primary}`,
    `can you recommend ${primary}`,
    `what's open for ${primary}`
  )

  // Specific requests
  if (category.includes('restaurant')) {
    voiceQueries.push(
      `where can i eat in ${location}`,
      `find restaurants in ${location}`,
      `good places to eat in ${location}`,
      `restaurant recommendations in ${location}`,
      `where to dine in ${location}`
    )
  }

  if (category.includes('bar')) {
    voiceQueries.push(
      `where can i get a drink in ${location}`,
      `good bars in ${location}`,
      `places to drink in ${location}`,
      `craft beer bars in ${location}`,
      `happy hour spots in ${location}`
    )
  }

  return voiceQueries
}

// Generate question-based keywords (SEO-friendly questions)
function generateQuestionKeywords(primary: string, location: string, category: string): string[] {
  const questions = []

  // General questions
  questions.push(
    `what is the best ${primary}`,
    `where can i find ${primary}`,
    `how do i choose ${primary}`,
    `what makes a good ${primary}`,
    `why choose ${primary}`
  )

  // Location-specific questions
  questions.push(
    `best ${primary} in ${location}`,
    `top rated ${primary} in ${location}`,
    `highly recommended ${primary} in ${location}`,
    `where to find ${primary} in ${location}`,
    `good ${primary} near ${location}`
  )

  // Category-specific questions
  if (category.includes('restaurant')) {
    questions.push(
      `what type of food is ${primary}`,
      `does ${primary} take reservations`,
      `is ${primary} family friendly`,
      `does ${primary} have outdoor seating`,
      `what are the hours for ${primary}`
    )
  }

  if (category.includes('bar')) {
    questions.push(
      `does ${primary} have live music`,
      `what kind of beer does ${primary} have`,
      `is ${primary} a sports bar`,
      `does ${primary} have happy hour`,
      `what time does ${primary} close`
    )
  }

  return questions
}

// Generate seasonal keywords
function generateSeasonalKeywords(primary: string, category: string): string[] {
  const seasonal = []

  // Holiday seasons
  seasonal.push(
    `christmas ${primary}`,
    `holiday ${primary}`,
    `thanksgiving ${primary}`,
    `halloween ${primary}`,
    `easter ${primary}`,
    `valentines day ${primary}`,
    `mothers day ${primary}`,
    `fathers day ${primary}`
  )

  // Weather seasons
  seasonal.push(
    `summer ${primary}`,
    `winter ${primary}`,
    `fall ${primary}`,
    `spring ${primary}`,
    `outdoor ${primary}`,
    `indoor ${primary}`
  )

  // Event seasons
  seasonal.push(
    `festival ${primary}`,
    `season ${primary}`,
    `special event ${primary}`,
    `game day ${primary}`,
    `weekend ${primary}`
  )

  return seasonal
}

// Determine search intent
function determineIntent(category: string): 'informational' | 'transactional' | 'navigational' | 'commercial' {
  if (category.includes('guide') || category.includes('what') || category.includes('how')) {
    return 'informational'
  }
  if (category.includes('buy') || category.includes('order') || category.includes('book')) {
    return 'transactional'
  }
  if (category.includes('near me') || category.includes('directions')) {
    return 'navigational'
  }
  return 'commercial'
}

// Calculate keyword difficulty (simplified)
function calculateDifficulty(keyword: string): 'low' | 'medium' | 'high' {
  const words = keyword.split(' ').length
  const hasLocation = keyword.toLowerCase().includes('pittsburgh')
  const hasCompetition = keyword.includes('best') || keyword.includes('top')

  if (words >= 4 && hasLocation) return 'low'
  if (words >= 3 || hasLocation) return 'medium'
  return 'high'
}

// Estimate search volume (simplified)
function estimateVolume(keyword: string): number {
  const words = keyword.split(' ').length
  const hasLocation = keyword.toLowerCase().includes('pittsburgh')
  const modifiers = ['best', 'top', 'near', 'good', 'great'].filter(m => keyword.includes(m)).length

  let baseVolume = 100

  if (hasLocation) baseVolume *= 3
  if (words >= 3) baseVolume *= 2
  baseVolume += (modifiers * 50)

  return Math.min(baseVolume, 10000)
}

// Estimate cost per click (simplified)
function estimateCPC(keyword: string, category: string): number {
  let baseCPC = 1.50

  if (category.includes('restaurant') || category.includes('hotel')) baseCPC *= 2
  if (keyword.includes('best') || keyword.includes('top')) baseCPC *= 1.5
  if (keyword.includes('pittsburgh')) baseCPC *= 0.8

  return Math.round(baseCPC * 100) / 100
}

// Generate comprehensive SEO title
export function generateSEOTitle(keyword: string, location: string, type: string = ''): string {
  const templates = [
    `${keyword} | ${location} Guide | PittsburghEverything`,
    `Best ${keyword} in ${location} | PittsburghEverything`,
    `${location} ${keyword} | Complete Guide | PittsburghEverything`,
    `Top ${keyword} ${location} | Reviews & Recommendations`,
    `${keyword} Near ${location} | Find Local ${type}`
  ]

  return templates[Math.floor(Math.random() * templates.length)]
}

// Generate meta description
export function generateMetaDescription(keyword: string, location: string, highlights: string[] = []): string {
  const baseDesc = `Complete guide to ${keyword} in ${location}. Find the best options, reviews, and recommendations. ${highlights.slice(0, 2).join('. ')}`

  if (baseDesc.length > 155) {
    return baseDesc.substring(0, 152) + '...'
  }

  return baseDesc
}

// Generate comprehensive keyword strategy report
export function generateKeywordStrategyReport(location: string, categories: string[]): any {
  const report = {
    location,
    generatedAt: new Date().toISOString(),
    totalKeywords: 0,
    clusters: [] as KeywordCluster[],
    recommendations: [] as string[],
    contentIdeas: [] as string[]
  }

  categories.forEach(category => {
    const clusters = generateKeywordClusters(location, category)
    report.clusters.push(...clusters)
    report.totalKeywords += clusters.reduce((sum, cluster) =>
      sum + cluster.secondary.length + cluster.longTail.length + cluster.localVariations.length, 0
    )
  })

  // Generate recommendations
  report.recommendations = [
    `Target ${report.totalKeywords} local keywords for ${location}`,
    'Focus on long-tail keywords for better conversion rates',
    'Optimize for voice search with natural language queries',
    'Create location-specific landing pages',
    'Build local citations and business listings',
    'Implement local schema markup',
    'Target seasonal and event-based keywords'
  ]

  // Generate content ideas
  report.contentIdeas = [
    `${location} Restaurant Guide - Complete Dining Directory`,
    `Best Things to Do in ${location} - Local Attractions`,
    `Where to Shop in ${location} - Local Business Guide`,
    `${location} Events Calendar - What's Happening`,
    `Living in ${location} - Neighborhood Guide`,
    `${location} Business Directory - Local Services`,
    `Day Trips from ${location} - Nearby Attractions`,
    `${location} Food Scene - Culinary Guide`
  ]

  return report
}
