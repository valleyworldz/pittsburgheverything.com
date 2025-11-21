// Google Business Profile & Local Citation Optimization for Pittsburgh SEO Domination
// Complete GMB optimization and citation building strategies

export interface GoogleBusinessProfile {
  businessName: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo: {
    latitude: number
    longitude: number
  }
  telephone: string
  website: string
  openingHours: Array<{
    dayOfWeek: string
    opens: string
    closes: string
  }>
  description: string
  categories: string[]
  attributes: Record<string, boolean | string>
  photos: Array<{
    url: string
    caption: string
    category: string
  }>
  services: Array<{
    name: string
    description: string
    price?: string
  }>
  reviews: Array<{
    author: string
    rating: number
    text: string
    date: string
  }>
}

export interface LocalCitation {
  directory: string
  url: string
  napConsistency: boolean
  backlinkValue: number
  domainAuthority: number
  lastUpdated: string
}

// Generate optimized Google Business Profile data
export function generateOptimizedGBP(business: any): GoogleBusinessProfile {
  return {
    businessName: optimizeBusinessName(business.name),
    address: {
      streetAddress: business.address,
      addressLocality: business.neighborhood || business.city || 'Pittsburgh',
      addressRegion: 'PA',
      postalCode: business.zipCode || '15201',
      addressCountry: 'US'
    },
    geo: {
      latitude: business.coordinates?.lat || 40.4406,
      longitude: business.coordinates?.lng || -79.9959
    },
    telephone: formatPhoneForGBP(business.phone),
    website: business.website || `https://pittsburgheverything.com/businesses/${business.id}`,
    openingHours: formatOpeningHoursForGBP(business.hours),
    description: generateGBPDescription(business),
    categories: getPrimaryCategories(business.category),
    attributes: generateGBPAttributes(business),
    photos: generateGBPPhotos(business),
    services: generateGBPServices(business),
    reviews: business.reviews || []
  }
}

// Optimize business name for GBP
function optimizeBusinessName(name: string): string {
  // GBP has 30 character limit for display name
  if (name.length <= 30) return name

  // Try to keep the most important part
  const words = name.split(' ')
  let optimized = words[0] // Always keep first word

  for (let i = 1; i < words.length; i++) {
    if ((optimized + ' ' + words[i]).length <= 27) { // Leave room for "..."
      optimized += ' ' + words[i]
    } else {
      optimized += '...'
      break
    }
  }

  return optimized
}

// Format phone number for GBP
function formatPhoneForGBP(phone: string): string {
  if (!phone) return ''

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')

  // Format as (XXX) XXX-XXXX
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  // Format as +1 (XXX) XXX-XXXX for international
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }

  return phone // Return original if can't format
}

// Format opening hours for GBP schema
function formatOpeningHoursForGBP(hours: any): Array<{
  dayOfWeek: string
  opens: string
  closes: string
}> {
  if (!hours) return []

  const dayMap: Record<string, string> = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  }

  const formatted: Array<{
    dayOfWeek: string
    opens: string
    closes: string
  }> = []

  Object.entries(hours).forEach(([day, timeRange]) => {
    if (timeRange && timeRange !== 'Closed' && typeof timeRange === 'string') {
      const dayName = dayMap[day]
      if (dayName) {
        // Parse time range like "9:00 AM - 5:00 PM"
        const match = timeRange.match(/(\d+:\d+\s*[APM]+)\s*-\s*(\d+:\d+\s*[APM]+)/i)
        if (match) {
          formatted.push({
            dayOfWeek: `https://schema.org/${dayName}`,
            opens: convertTo24Hour(match[1]),
            closes: convertTo24Hour(match[2])
          })
        }
      }
    }
  })

  return formatted
}

// Convert 12-hour time to 24-hour format
function convertTo24Hour(time12: string): string {
  const match = time12.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!match) return time12

  let [_, hours, minutes, ampm] = match
  let hour24 = parseInt(hours)

  if (ampm.toUpperCase() === 'PM' && hour24 !== 12) {
    hour24 += 12
  } else if (ampm.toUpperCase() === 'AM' && hour24 === 12) {
    hour24 = 0
  }

  return `${hour24.toString().padStart(2, '0')}:${minutes}:00`
}

// Generate optimized GBP description
function generateGBPDescription(business: any): string {
  const maxLength = 750 // GBP description limit

  let description = `${business.name} in ${business.neighborhood || business.city || 'Pittsburgh'}, Pennsylvania. `

  if (business.description) {
    description += business.description + ' '
  }

  // Add location-specific context
  description += `Located in the heart of ${business.neighborhood || 'Pittsburgh'}, we serve the local community with exceptional ${business.category} services. `

  // Add call-to-action
  description += `Visit us today or call to learn more about our offerings.`

  return description.length > maxLength ? description.substring(0, maxLength - 3) + '...' : description
}

// Get primary categories for GBP
function getPrimaryCategories(category: string): string[] {
  const categoryMap: Record<string, string[]> = {
    'restaurant': ['Restaurant', 'Food & Drink'],
    'bar': ['Bar', 'Food & Drink'],
    'cafe': ['Coffee shop', 'Food & Drink'],
    'hotel': ['Hotel', 'Travel & Transportation'],
    'shopping': ['Shopping center', 'Shopping'],
    'healthcare': ['Medical clinic', 'Health & Medical'],
    'education': ['School', 'Education'],
    'services': ['Business services', 'Professional Services'],
    'attractions': ['Tourist attraction', 'Travel & Transportation']
  }

  return categoryMap[category] || [category]
}

// Generate GBP attributes
function generateGBPAttributes(business: any): Record<string, boolean | string> {
  const attributes: Record<string, boolean | string> = {}

  // Common attributes based on business type
  if (business.category === 'restaurant') {
    attributes['restaurant_reservations'] = business.reservations || false
    attributes['restaurant_takeout'] = business.takeout !== false
    attributes['restaurant_delivery'] = business.delivery || false
    attributes['restaurant_dine_in'] = true
    attributes['restaurant_good_for_kids'] = business.familyFriendly || false
    attributes['restaurant_wheelchair_accessible'] = business.accessible || true
  }

  if (business.category === 'bar') {
    attributes['bar_live_music'] = business.liveMusic || false
    attributes['bar_happy_hour'] = business.happyHour || false
    attributes['bar_wheelchair_accessible'] = business.accessible || true
  }

  return attributes
}

// Generate GBP photos
function generateGBPPhotos(business: any): Array<{
  url: string
  caption: string
  category: string
}> {
  const photos: Array<{
    url: string
    caption: string
    category: string
  }> = []

  // Profile photo (required)
  photos.push({
    url: business.image || '/images/placeholder-restaurant.svg',
    caption: `${business.name} - Exterior`,
    category: 'profile'
  })

  // Additional photos if available
  if (business.images && business.images.length > 1) {
    business.images.slice(1, 10).forEach((image: string, index: number) => {
      photos.push({
        url: image,
        caption: `${business.name} - Interior ${index + 1}`,
        category: 'additional'
      })
    })
  }

  // Menu photo for restaurants
  if (business.category === 'restaurant' && business.menu) {
    photos.push({
      url: business.menu,
      caption: `${business.name} - Menu`,
      category: 'menu'
    })
  }

  return photos
}

// Generate GBP services
function generateGBPServices(business: any): Array<{
  name: string
  description: string
  price?: string
}> {
  // This would be populated from business services data
  return [
    {
      name: business.category,
      description: `Professional ${business.category} services in ${business.neighborhood || 'Pittsburgh'}`
    }
  ]
}

// Local citation building strategy
export const LOCAL_CITATIONS = [
  // High-authority local directories
  {
    directory: 'Google My Business',
    url: 'https://www.google.com/business/',
    napConsistency: true,
    backlinkValue: 10,
    domainAuthority: 100,
    category: 'primary'
  },
  {
    directory: 'Bing Places',
    url: 'https://www.bingplaces.com/',
    napConsistency: true,
    backlinkValue: 8,
    domainAuthority: 95,
    category: 'primary'
  },
  {
    directory: 'Apple Maps',
    url: 'https://mapsconnect.apple.com/',
    napConsistency: true,
    backlinkValue: 7,
    domainAuthority: 90,
    category: 'primary'
  },

  // Local Pittsburgh directories
  {
    directory: 'Pittsburgh Business Times',
    url: 'https://www.bizjournals.com/pittsburgh/',
    napConsistency: true,
    backlinkValue: 6,
    domainAuthority: 85,
    category: 'local'
  },
  {
    directory: 'Pittsburgh Post-Gazette',
    url: 'https://www.post-gazette.com/',
    napConsistency: false,
    backlinkValue: 7,
    domainAuthority: 88,
    category: 'local'
  },
  {
    directory: 'Visit Pittsburgh',
    url: 'https://www.visitpittsburgh.com/',
    napConsistency: true,
    backlinkValue: 6,
    domainAuthority: 80,
    category: 'local'
  },

  // Industry-specific directories
  {
    directory: 'Yelp',
    url: 'https://www.yelp.com/',
    napConsistency: true,
    backlinkValue: 8,
    domainAuthority: 92,
    category: 'industry'
  },
  {
    directory: 'TripAdvisor',
    url: 'https://www.tripadvisor.com/',
    napConsistency: true,
    backlinkValue: 8,
    domainAuthority: 90,
    category: 'industry'
  },
  {
    directory: 'OpenTable',
    url: 'https://www.opentable.com/',
    napConsistency: true,
    backlinkValue: 7,
    domainAuthority: 85,
    category: 'restaurant'
  },

  // General business directories
  {
    directory: 'Yellow Pages',
    url: 'https://www.yellowpages.com/',
    napConsistency: true,
    backlinkValue: 5,
    domainAuthority: 75,
    category: 'general'
  },
  {
    directory: 'Yext',
    url: 'https://www.yext.com/',
    napConsistency: true,
    backlinkValue: 4,
    domainAuthority: 70,
    category: 'general'
  },
  {
    directory: 'Angie\'s List',
    url: 'https://www.angieslist.com/',
    napConsistency: true,
    backlinkValue: 6,
    domainAuthority: 82,
    category: 'general'
  }
]

// Generate citation building strategy
export function generateCitationStrategy(business: any): LocalCitation[] {
  const relevantCitations = LOCAL_CITATIONS.filter(citation => {
    if (business.category === 'restaurant' && citation.category === 'restaurant') return true
    if (citation.category === 'primary' || citation.category === 'local' || citation.category === 'general') return true
    return false
  })

  return relevantCitations.map(citation => ({
    ...citation,
    lastUpdated: new Date().toISOString()
  }))
}

// GBP optimization checklist
export const GBP_OPTIMIZATION_CHECKLIST = [
  'Complete business profile with accurate NAP',
  'Add high-quality photos (at least 10)',
  'Write compelling business description',
  'Set up services and attributes',
  'Add business hours',
  'Enable messaging and call tracking',
  'Add products/services with descriptions',
  'Set up regular posts and updates',
  'Encourage and respond to reviews',
  'Claim and optimize Google Posts',
  'Set up insights and analytics monitoring',
  'Add website and booking links',
  'Enable Q&A section',
  'Set up regular photo updates',
  'Monitor and respond to reviews daily'
]

// Local SEO ranking factors for Pittsburgh
export const LOCAL_SEO_RANKING_FACTORS = [
  // On-page factors
  'Google Business Profile optimization',
  'Local keyword optimization',
  'NAP consistency across directories',
  'Local schema markup',
  'Mobile-friendly design',
  'Fast page load speed',

  // Off-page factors
  'Quality backlinks from local sites',
  'Online reviews and ratings',
  'Local citations',
  'Social media engagement',
  'Local community involvement',

  // Technical factors
  'Local XML sitemap',
  'Proper geo-targeting',
  'Local internal linking',
  'SSL certificate',
  'Structured data markup'
]
