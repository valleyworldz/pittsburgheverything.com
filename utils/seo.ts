// SEO Utility Functions

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  canonical?: string
  ogImage?: string
  structuredData?: any
}

/**
 * Generate SEO-optimized title
 */
export function generateSEOTitle(baseTitle: string, suffix = 'PittsburghEverything'): string {
  return `${baseTitle} | ${suffix}`
}

/**
 * Generate SEO-optimized description
 */
export function generateSEODescription(content: string, maxLength = 160): string {
  if (content.length <= maxLength) return content

  const truncated = content.substring(0, maxLength - 3)
  const lastSpace = truncated.lastIndexOf(' ')

  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...'
}

/**
 * Generate meta keywords from content
 */
export function generateKeywords(content: string, additionalKeywords: string[] = []): string[] {
  const baseKeywords = [
    'Pittsburgh',
    'local',
    'events',
    'restaurants',
    'services',
    'neighborhoods'
  ]

  // Extract keywords from content (simple word frequency analysis)
  const words = content.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3)

  const wordCount: { [key: string]: number } = {}
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1
  })

  const topWords = Object.entries(wordCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([word]) => word)

  return [...baseKeywords, ...topWords, ...additionalKeywords]
    .filter((keyword, index, arr) => arr.indexOf(keyword) === index) // Remove duplicates
    .slice(0, 10)
}

/**
 * Generate structured data for businesses
 */
export function generateBusinessStructuredData(business: any): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressLocality: 'Pittsburgh',
      addressRegion: 'PA',
      postalCode: business.address.match(/\b\d{5}\b/)?.[0] || '',
    },
    telephone: business.phone,
    url: business.website,
    aggregateRating: business.rating ? {
      '@type': 'AggregateRating',
      ratingValue: business.rating,
      reviewCount: Math.floor(Math.random() * 50) + 10, // Mock review count
    } : undefined,
    priceRange: business.priceRange,
  }
}

/**
 * Generate structured data for events
 */
export function generateEventStructuredData(event: any): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.date,
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Pittsburgh',
        addressRegion: 'PA',
      },
    },
    offers: {
      '@type': 'Offer',
      price: event.price.replace(/[^\d.]/g, '') || '0',
      priceCurrency: 'USD',
    },
  }
}

/**
 * Generate structured data for restaurants
 */
export function generateRestaurantStructuredData(restaurant: any): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    description: restaurant.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: restaurant.address,
      addressLocality: 'Pittsburgh',
      addressRegion: 'PA',
      postalCode: restaurant.address.match(/\b\d{5}\b/)?.[0] || '',
    },
    telephone: restaurant.phone,
    url: restaurant.website,
    servesCuisine: restaurant.cuisine,
    priceRange: restaurant.priceRange,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: restaurant.rating,
      reviewCount: Math.floor(Math.random() * 100) + 20,
    },
    openingHours: restaurant.hours ? Object.entries(restaurant.hours).map(([day, hours]) =>
      `${day.substring(0, 2).toUpperCase()}${day.substring(2)} ${hours}`
    ) : undefined,
  }
}

/**
 * Generate Open Graph meta tags
 */
export function generateOpenGraphTags(data: {
  title: string
  description: string
  url: string
  image?: string
  type?: 'website' | 'article' | 'product'
}): any {
  return {
    'og:title': data.title,
    'og:description': data.description,
    'og:url': data.url,
    'og:image': data.image || '/images/og-default.jpg',
    'og:type': data.type || 'website',
    'og:site_name': 'PittsburghEverything',
  }
}

/**
 * Generate Twitter Card meta tags
 */
export function generateTwitterCardTags(data: {
  title: string
  description: string
  image?: string
  card?: 'summary' | 'summary_large_image'
}): any {
  return {
    'twitter:card': data.card || 'summary_large_image',
    'twitter:title': data.title,
    'twitter:description': data.description,
    'twitter:image': data.image || '/images/twitter-default.jpg',
  }
}

/**
 * Slugify text for URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Generate URL-friendly business name
 */
export function generateBusinessSlug(name: string, neighborhood: string): string {
  return `${slugify(name)}-${slugify(neighborhood)}`
}

/**
 * Extract location from address string
 */
export function parseAddress(address: string): {
  street: string
  city: string
  state: string
  zip: string
} {
  // Simple address parser - in production, use a proper geocoding service
  const parts = address.split(',').map(part => part.trim())

  return {
    street: parts[0] || '',
    city: parts[1] || 'Pittsburgh',
    state: 'PA',
    zip: address.match(/\b\d{5}\b/)?.[0] || '',
  }
}
