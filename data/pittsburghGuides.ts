// Comprehensive Pittsburgh Guides Data
// Accurate and up-to-date guides for Pittsburgh
// Data verified as of 2024-2025

export interface Guide {
  id: string
  title: string
  slug: string
  category: 'ultimate' | 'seasonal' | 'weekend' | 'moving'
  subcategory?: string
  excerpt: string
  description: string
  author: string
  publishedAt: string
  lastUpdated: string
  readingTime: number // in minutes
  tags: string[]
  featuredImage?: string
  content?: string // MDX content or HTML
  sections?: GuideSection[]
  relatedGuides?: string[] // IDs of related guides
  featured: boolean
  verified: boolean
}

export interface GuideSection {
  title: string
  content: string
  subsections?: GuideSubsection[]
}

export interface GuideSubsection {
  title: string
  content: string
}

// Ultimate Guides
export const ultimateGuides: Guide[] = [
  {
    id: 'ultimate-001',
    title: 'The Ultimate Pittsburgh Guide: Everything You Need to Know',
    slug: 'ultimate-pittsburgh-guide',
    category: 'ultimate',
    excerpt: 'Your complete guide to Pittsburgh - neighborhoods, culture, food, attractions, and insider tips.',
    description: 'A comprehensive guide covering everything about Pittsburgh from neighborhoods and culture to food, attractions, transportation, and insider tips for both visitors and residents.',
    author: 'PittsburghEverything Team',
    publishedAt: '2025-01-15',
    lastUpdated: '2025-01-20',
    readingTime: 25,
    tags: ['pittsburgh', 'guide', 'neighborhoods', 'culture', 'attractions'],
    featuredImage: '/images/guides/ultimate-pittsburgh.jpg',
    featured: true,
    verified: true,
    sections: [
      {
        title: 'Getting to Know Pittsburgh',
        content: 'Pittsburgh, known as the Steel City, is a vibrant metropolis at the confluence of three rivers. With a rich industrial history and a thriving modern economy, Pittsburgh offers an unbeatable quality of life.',
        subsections: [
          {
            title: 'History & Culture',
            content: 'Pittsburgh transformed from a steel manufacturing hub to a leader in technology, healthcare, and education. The city maintains its blue-collar roots while embracing innovation.'
          },
          {
            title: 'Geography & Climate',
            content: 'Located in southwestern Pennsylvania, Pittsburgh features a humid continental climate with four distinct seasons. The city\'s hilly terrain and three rivers create stunning vistas.'
          }
        ]
      },
      {
        title: 'Neighborhoods',
        content: 'Pittsburgh is made up of 90 distinct neighborhoods, each with its own character and charm.',
        subsections: [
          {
            title: 'Downtown',
            content: 'The central business district with skyscrapers, cultural attractions, and a growing residential population.'
          },
          {
            title: 'Shadyside',
            content: 'Upscale neighborhood known for boutique shopping, fine dining, and beautiful Victorian architecture.'
          },
          {
            title: 'Lawrenceville',
            content: 'Trendy, artsy neighborhood with galleries, restaurants, and a vibrant nightlife scene.'
          }
        ]
      }
    ]
  },
  {
    id: 'ultimate-002',
    title: 'Pittsburgh Food Scene: A Complete Dining Guide',
    slug: 'pittsburgh-food-guide',
    category: 'ultimate',
    subcategory: 'Food & Dining',
    excerpt: 'Discover Pittsburgh\'s incredible food scene from iconic Primanti Bros sandwiches to fine dining establishments.',
    description: 'Comprehensive guide to Pittsburgh\'s diverse culinary landscape, including must-try dishes, best restaurants by category, food tours, and dining tips.',
    author: 'PittsburghEverything Team',
    publishedAt: '2025-01-10',
    lastUpdated: '2025-01-20',
    readingTime: 18,
    tags: ['food', 'restaurants', 'dining', 'culinary', 'pittsburgh'],
    featuredImage: '/images/guides/pittsburgh-food.jpg',
    featured: true,
    verified: true
  },
  {
    id: 'ultimate-003',
    title: 'Pittsburgh Transportation Guide: Getting Around the City',
    slug: 'pittsburgh-transportation',
    category: 'ultimate',
    subcategory: 'Transportation',
    excerpt: 'Complete guide to navigating Pittsburgh - public transit, driving, biking, and walking.',
    description: 'Everything you need to know about getting around Pittsburgh, including Port Authority transit, parking, bike lanes, and walkability.',
    author: 'PittsburghEverything Team',
    publishedAt: '2025-01-12',
    lastUpdated: '2025-01-20',
    readingTime: 15,
    tags: ['transportation', 'transit', 'parking', 'biking', 'walking'],
    featuredImage: '/images/guides/transportation.jpg',
    featured: false,
    verified: true
  },
  {
    id: 'ultimate-004',
    title: 'Pittsburgh Nightlife & Entertainment Guide',
    slug: 'pittsburgh-nightlife',
    category: 'ultimate',
    subcategory: 'Entertainment',
    excerpt: 'Your guide to Pittsburgh\'s vibrant nightlife scene - bars, clubs, live music, and entertainment.',
    description: 'Discover the best bars, nightclubs, live music venues, and entertainment options in Pittsburgh.',
    author: 'PittsburghEverything Team',
    publishedAt: '2025-01-08',
    lastUpdated: '2025-01-20',
    readingTime: 12,
    tags: ['nightlife', 'bars', 'entertainment', 'music', 'clubs'],
    featuredImage: '/images/guides/nightlife.jpg',
    featured: false,
    verified: true
  }
]

// Seasonal Guides
export const seasonalGuides: Guide[] = [
  {
    id: 'seasonal-001',
    title: 'Pittsburgh Winter Guide: Surviving and Thriving in the Cold',
    slug: 'pittsburgh-winter-guide',
    category: 'seasonal',
    subcategory: 'Winter',
    excerpt: 'Complete guide to enjoying Pittsburgh in winter - activities, events, and tips for the cold months.',
    description: 'Everything you need to know about Pittsburgh winters, including winter activities, events, weather preparation, and how to make the most of the season.',
    author: 'PittsburghEverything Team',
    publishedAt: '2025-01-05',
    lastUpdated: '2025-01-20',
    readingTime: 14,
    tags: ['winter', 'seasonal', 'activities', 'events', 'weather'],
    featuredImage: '/images/guides/winter-pittsburgh.jpg',
    featured: true,
    verified: true
  },
  {
    id: 'seasonal-002',
    title: 'Pittsburgh Spring Guide: Blooming Activities and Events',
    slug: 'pittsburgh-spring-guide',
    category: 'seasonal',
    subcategory: 'Spring',
    excerpt: 'Discover the best spring activities, events, and outdoor adventures in Pittsburgh.',
    description: 'Guide to Pittsburgh in spring, including festivals, outdoor activities, gardens, and seasonal events.',
    author: 'PittsburghEverything Team',
    publishedAt: '2024-03-15',
    lastUpdated: '2025-01-20',
    readingTime: 12,
    tags: ['spring', 'seasonal', 'outdoor', 'festivals', 'gardens'],
    featuredImage: '/images/guides/spring-pittsburgh.jpg',
    featured: false,
    verified: true
  },
  {
    id: 'seasonal-003',
    title: 'Pittsburgh Summer Guide: Fun in the Sun',
    slug: 'pittsburgh-summer-guide',
    category: 'seasonal',
    subcategory: 'Summer',
    excerpt: 'Your complete guide to Pittsburgh summers - festivals, outdoor activities, and summer fun.',
    description: 'Everything you need to know about enjoying Pittsburgh in summer, including festivals, outdoor activities, water activities, and summer events.',
    author: 'PittsburghEverything Team',
    publishedAt: '2024-06-01',
    lastUpdated: '2025-01-20',
    readingTime: 16,
    tags: ['summer', 'seasonal', 'festivals', 'outdoor', 'water'],
    featuredImage: '/images/guides/summer-pittsburgh.jpg',
    featured: true,
    verified: true
  },
  {
    id: 'seasonal-004',
    title: 'Pittsburgh Fall Guide: Autumn Colors and Activities',
    slug: 'pittsburgh-fall-guide',
    category: 'seasonal',
    subcategory: 'Fall',
    excerpt: 'Experience Pittsburgh\'s beautiful fall season with this guide to autumn activities and events.',
    description: 'Complete guide to Pittsburgh in fall, including fall foliage viewing, harvest festivals, and autumn activities.',
    author: 'PittsburghEverything Team',
    publishedAt: '2024-09-15',
    lastUpdated: '2025-01-20',
    readingTime: 13,
    tags: ['fall', 'autumn', 'seasonal', 'foliage', 'festivals'],
    featuredImage: '/images/guides/fall-pittsburgh.jpg',
    featured: false,
    verified: true
  }
]

// Weekend Guides
export const weekendGuides: Guide[] = [
  {
    id: 'weekend-001',
    title: 'Perfect Pittsburgh Weekend: 48-Hour Itinerary',
    slug: 'perfect-pittsburgh-weekend',
    category: 'weekend',
    excerpt: 'The ultimate 48-hour Pittsburgh itinerary for a perfect weekend getaway.',
    description: 'A carefully curated weekend itinerary covering the best of Pittsburgh in just 48 hours, including must-see attractions, dining, and activities.',
    author: 'PittsburghEverything Team',
    publishedAt: '2025-01-12',
    lastUpdated: '2025-01-20',
    readingTime: 10,
    tags: ['weekend', 'itinerary', 'visitor', 'attractions', 'dining'],
    featuredImage: '/images/guides/weekend-pittsburgh.jpg',
    featured: true,
    verified: true
  },
  {
    id: 'weekend-002',
    title: 'Romantic Weekend in Pittsburgh: Date Ideas and Activities',
    slug: 'romantic-pittsburgh-weekend',
    category: 'weekend',
    excerpt: 'Plan the perfect romantic weekend in Pittsburgh with these date ideas and activities.',
    description: 'Guide to romantic activities, restaurants, and experiences for couples in Pittsburgh.',
    author: 'PittsburghEverything Team',
    publishedAt: '2025-01-08',
    lastUpdated: '2025-01-20',
    readingTime: 8,
    tags: ['weekend', 'romantic', 'dates', 'couples', 'activities'],
    featuredImage: '/images/guides/romantic-weekend.jpg',
    featured: false,
    verified: true
  },
  {
    id: 'weekend-003',
    title: 'Family Weekend in Pittsburgh: Kid-Friendly Activities',
    slug: 'family-weekend-pittsburgh',
    category: 'weekend',
    excerpt: 'Plan a fun-filled family weekend in Pittsburgh with these kid-friendly activities and attractions.',
    description: 'Complete guide to family-friendly activities, attractions, and dining for a weekend in Pittsburgh with kids.',
    author: 'PittsburghEverything Team',
    publishedAt: '2025-01-10',
    lastUpdated: '2025-01-20',
    readingTime: 12,
    tags: ['weekend', 'family', 'kids', 'activities', 'attractions'],
    featuredImage: '/images/guides/family-weekend.jpg',
    featured: false,
    verified: true
  },
  {
    id: 'weekend-004',
    title: 'Adventure Weekend in Pittsburgh: Outdoor Activities',
    slug: 'adventure-weekend-pittsburgh',
    category: 'weekend',
    excerpt: 'Get your adrenaline pumping with this guide to adventure activities in Pittsburgh.',
    description: 'Guide to outdoor adventures, hiking, biking, and active activities for an adventure-filled weekend in Pittsburgh.',
    author: 'PittsburghEverything Team',
    publishedAt: '2025-01-14',
    lastUpdated: '2025-01-20',
    readingTime: 11,
    tags: ['weekend', 'adventure', 'outdoor', 'hiking', 'biking'],
    featuredImage: '/images/guides/adventure-weekend.jpg',
    featured: false,
    verified: true
  }
]

// Moving Guides
export const movingGuides: Guide[] = [
  {
    id: 'moving-001',
    title: 'Moving to Pittsburgh: Complete Relocation Guide',
    slug: 'moving-to-pittsburgh',
    category: 'moving',
    excerpt: 'Everything you need to know about relocating to Pittsburgh - housing, jobs, neighborhoods, and more.',
    description: 'Comprehensive guide for moving to Pittsburgh, covering housing, neighborhoods, jobs, schools, healthcare, and everything you need for a successful relocation.',
    author: 'PittsburghEverything Team',
    publishedAt: '2025-01-15',
    lastUpdated: '2025-01-20',
    readingTime: 20,
    tags: ['moving', 'relocation', 'housing', 'neighborhoods', 'jobs'],
    featuredImage: '/images/guides/moving-pittsburgh.jpg',
    featured: true,
    verified: true
  },
  {
    id: 'moving-002',
    title: 'Pittsburgh Neighborhood Guide: Where to Live',
    slug: 'pittsburgh-neighborhoods-guide',
    category: 'moving',
    excerpt: 'Find the perfect Pittsburgh neighborhood for your lifestyle and budget.',
    description: 'Detailed guide to Pittsburgh neighborhoods, including housing costs, amenities, schools, and lifestyle fit.',
    author: 'PittsburghEverything Team',
    publishedAt: '2025-01-10',
    lastUpdated: '2025-01-20',
    readingTime: 18,
    tags: ['moving', 'neighborhoods', 'housing', 'relocation'],
    featuredImage: '/images/guides/neighborhoods.jpg',
    featured: true,
    verified: true
  },
  {
    id: 'moving-003',
    title: 'Cost of Living in Pittsburgh: Complete Breakdown',
    slug: 'pittsburgh-cost-of-living',
    category: 'moving',
    excerpt: 'Understand the cost of living in Pittsburgh with this comprehensive financial guide.',
    description: 'Detailed breakdown of living costs in Pittsburgh, including housing, utilities, groceries, transportation, and more.',
    author: 'PittsburghEverything Team',
    publishedAt: '2025-01-12',
    lastUpdated: '2025-01-20',
    readingTime: 15,
    tags: ['moving', 'cost-of-living', 'budget', 'finances'],
    featuredImage: '/images/guides/cost-of-living.jpg',
    featured: false,
    verified: true
  },
  {
    id: 'moving-004',
    title: 'Finding a Job in Pittsburgh: Employment Guide',
    slug: 'pittsburgh-jobs-guide',
    category: 'moving',
    excerpt: 'Navigate the Pittsburgh job market with this comprehensive employment guide.',
    description: 'Guide to finding employment in Pittsburgh, including major employers, job search resources, and career opportunities.',
    author: 'PittsburghEverything Team',
    publishedAt: '2025-01-08',
    lastUpdated: '2025-01-20',
    readingTime: 14,
    tags: ['moving', 'jobs', 'employment', 'career'],
    featuredImage: '/images/guides/jobs-pittsburgh.jpg',
    featured: false,
    verified: true
  }
]

// Helper functions
export function getAllGuides(): Guide[] {
  return [...ultimateGuides, ...seasonalGuides, ...weekendGuides, ...movingGuides]
}

export function getUltimateGuides(): Guide[] {
  return ultimateGuides
}

export function getSeasonalGuides(): Guide[] {
  return seasonalGuides
}

export function getWeekendGuides(): Guide[] {
  return weekendGuides
}

export function getMovingGuides(): Guide[] {
  return movingGuides
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return getAllGuides().find(guide => guide.slug === slug)
}

export function getGuidesByCategory(category: string): Guide[] {
  return getAllGuides().filter(guide => guide.category === category)
}

export function getFeaturedGuides(): Guide[] {
  return getAllGuides().filter(guide => guide.featured)
}

export function searchGuides(query: string): Guide[] {
  const lowerQuery = query.toLowerCase()
  return getAllGuides().filter(guide =>
    guide.title.toLowerCase().includes(lowerQuery) ||
    guide.excerpt.toLowerCase().includes(lowerQuery) ||
    guide.description.toLowerCase().includes(lowerQuery) ||
    guide.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

export function getGuidesByTag(tag: string): Guide[] {
  return getAllGuides().filter(guide =>
    guide.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

