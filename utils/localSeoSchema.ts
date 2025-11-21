// Advanced Local SEO Schema Markup for Pittsburgh Domination
// Generates comprehensive structured data for local search optimization

export interface LocalBusinessSchema {
  '@context': string
  '@type': string
  '@id'?: string
  name: string
  description: string
  url?: string
  logo?: string
  image?: string[]
  telephone?: string
  email?: string
  address: {
    '@type': string
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo?: {
    '@type': string
    latitude: number
    longitude: number
  }
  openingHours?: string[]
  priceRange?: string
  servesCuisine?: string[]
  aggregateRating?: {
    '@type': string
    ratingValue: number
    reviewCount: number
    bestRating?: number
    worstRating?: number
  }
  review?: Array<{
    '@type': string
    author: {
      '@type': string
      name: string
    }
    reviewRating: {
      '@type': string
      ratingValue: number
      bestRating?: number
    }
    reviewBody: string
    datePublished: string
  }>
  sameAs?: string[]
  hasOfferCatalog?: {
    '@type': string
    name: string
    itemListElement: Array<{
      '@type': string
      itemOffered: {
        '@type': string
        name: string
        description: string
        price: string
        priceCurrency: string
      }
    }>
  }
  event?: Array<{
    '@type': string
    name: string
    description: string
    startDate: string
    endDate?: string
    location: {
      '@type': string
      name: string
      address: {
        '@type': string
        streetAddress: string
        addressLocality: string
        addressRegion: string
        postalCode: string
      }
    }
    offers: {
      '@type': string
      price: string
      priceCurrency: string
      availability: string
      validFrom: string
    }
  }>
}

// Generate comprehensive local business schema
export function generateLocalBusinessSchema(business: any, reviews: any[] = [], events: any[] = []): LocalBusinessSchema {
  const baseSchema: LocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': getBusinessType(business.category),
    name: business.name,
    description: business.description,
    url: business.website || `https://pittsburgheverything.com/businesses/${business.id}`,
    logo: business.logo || '/images/og-image.svg',
    image: business.images || [business.image || '/images/placeholder-restaurant.svg'],
    telephone: business.phone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressLocality: business.neighborhood || business.city || 'Pittsburgh',
      addressRegion: 'PA',
      postalCode: business.zipCode || '15201',
      addressCountry: 'US'
    },
    geo: business.coordinates ? {
      '@type': 'GeoCoordinates',
      latitude: business.coordinates.lat,
      longitude: business.coordinates.lng
    } : undefined,
    openingHours: business.hours ? formatOpeningHours(business.hours) : undefined,
    priceRange: business.priceRange,
    servesCuisine: business.category === 'restaurant' ? [business.cuisine] : undefined,
  }

  // Add aggregate rating if reviews exist
  if (reviews && reviews.length > 0) {
    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    baseSchema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1
    }

    // Add up to 3 sample reviews
    baseSchema.review = reviews.slice(0, 3).map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author || 'Anonymous'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5
      },
      reviewBody: review.content || review.comment || '',
      datePublished: review.date || new Date().toISOString().split('T')[0]
    }))
  }

  // Add social media links
  if (business.socialMedia) {
    baseSchema.sameAs = Object.values(business.socialMedia).filter(Boolean) as string[]
  }

  // Add events if available
  if (events && events.length > 0) {
    baseSchema.event = events.slice(0, 5).map(event => ({
      '@type': 'Event',
      name: event.title,
      description: event.description,
      startDate: event.date,
      endDate: event.endDate,
      location: {
        '@type': 'Place',
        name: event.location,
        address: {
          '@type': 'PostalAddress',
          streetAddress: event.address || 'TBD',
          addressLocality: event.city || 'Pittsburgh',
          addressRegion: 'PA',
          postalCode: event.zipCode || '15201'
        }
      },
      offers: {
        '@type': 'Offer',
        price: event.price || '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        validFrom: event.date
      }
    }))
  }

  return baseSchema
}

// Get appropriate schema.org business type
function getBusinessType(category: string): string {
  const typeMap: Record<string, string> = {
    'restaurant': 'Restaurant',
    'bar': 'BarOrPub',
    'cafe': 'CafeOrCoffeeShop',
    'hotel': 'Hotel',
    'shopping': 'Store',
    'healthcare': 'MedicalBusiness',
    'education': 'EducationalOrganization',
    'entertainment': 'EntertainmentBusiness',
    'automotive': 'AutoRepair',
    'real-estate': 'RealEstateAgent',
    'services': 'LocalBusiness',
    'attractions': 'TouristAttraction'
  }

  return typeMap[category] || 'LocalBusiness'
}

// Format opening hours for schema
function formatOpeningHours(hours: any): string[] {
  if (!hours) return []

  const dayMap: Record<string, string> = {
    monday: 'Mo',
    tuesday: 'Tu',
    wednesday: 'We',
    thursday: 'Th',
    friday: 'Fr',
    saturday: 'Sa',
    sunday: 'Su'
  }

  const formattedHours: string[] = []

  Object.entries(hours).forEach(([day, timeRange]) => {
    if (timeRange && timeRange !== 'Closed') {
      const dayCode = dayMap[day]
      if (dayCode) {
        formattedHours.push(`${dayCode} ${timeRange}`)
      }
    }
  })

  return formattedHours
}

// Generate Organization schema for the main site
export function generateOrganizationSchema(): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://pittsburgheverything.com/#organization',
    name: 'PittsburghEverything',
    alternateName: 'Pittsburgh Everything',
    url: 'https://pittsburgheverything.com',
    logo: 'https://pittsburgheverything.com/images/og-image.svg',
    description: 'Your complete guide to Pittsburgh. Find restaurants, events, deals, neighborhoods, and everything the Steel City has to offer.',
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'PittsburghEverything Team'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pittsburgh',
      addressRegion: 'PA',
      postalCode: '15201',
      addressCountry: 'US'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-412-555-PEAK',
        contactType: 'customer service',
        areaServed: 'US',
        availableLanguage: 'English'
      },
      {
        '@type': 'ContactPoint',
        email: 'hello@pittsburgheverything.com',
        contactType: 'customer service',
        areaServed: 'US',
        availableLanguage: 'English'
      }
    ],
    sameAs: [
      'https://twitter.com/pittsburgheverything',
      'https://facebook.com/pittsburgheverything',
      'https://instagram.com/pittsburgheverything',
      'https://linkedin.com/company/pittsburgheverything'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pittsburgh Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Restaurant Recommendations',
            description: 'Personalized restaurant recommendations for Pittsburgh'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Event Discovery',
            description: 'Find the best events and activities in Pittsburgh'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Local Deals',
            description: 'Exclusive deals and offers from Pittsburgh businesses'
          }
        }
      ]
    }
  }
}

// Generate WebSite schema with search functionality
export function generateWebSiteSchema(): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://pittsburgheverything.com/#website',
    url: 'https://pittsburgheverything.com',
    name: 'PittsburghEverything',
    description: 'Complete guide to Pittsburgh restaurants, events, deals, and neighborhoods',
    inLanguage: 'en-US',
    publisher: {
      '@id': 'https://pittsburgheverything.com/#organization'
    },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://pittsburgheverything.com/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    ],
    about: {
      '@type': 'City',
      name: 'Pittsburgh',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Pittsburgh',
        addressRegion: 'PA',
        addressCountry: 'US'
      }
    }
  }
}

// Generate BreadcrumbList schema
export function generateBreadcrumbSchema(breadcrumbs: Array<{name: string, url: string}>): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  }
}

// Generate FAQ schema for location pages
export function generateLocationFAQSchema(locationName: string): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What are the best restaurants in ${locationName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Find the top-rated restaurants in ${locationName} with reviews, menus, and reservations. From fine dining to casual eateries, discover the best places to eat in ${locationName}, Pittsburgh.`
        }
      },
      {
        '@type': 'Question',
        name: `What events are happening in ${locationName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Check out upcoming events, festivals, and activities in ${locationName}. From concerts and art shows to community gatherings, stay updated with everything happening in ${locationName}.`
        }
      },
      {
        '@type': 'Question',
        name: `Where can I find deals in ${locationName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Discover exclusive deals, discounts, and special offers from businesses in ${locationName}. Save money on dining, shopping, and entertainment throughout ${locationName}, Pittsburgh.`
        }
      },
      {
        '@type': 'Question',
        name: `How do I get to ${locationName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Learn about transportation options to ${locationName} including public transit, parking, and major highways. Find the best ways to travel to and around ${locationName}.`
        }
      },
      {
        '@type': 'Question',
        name: `What are the schools like in ${locationName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Get information about schools, education options, and community resources in ${locationName}. Learn about public schools, private institutions, and educational opportunities.`
        }
      }
    ]
  }
}

// Generate HowTo schema for location guides
export function generateLocationHowToSchema(locationName: string): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `Ultimate Guide to ${locationName}, Pittsburgh`,
    description: `Complete guide to living, working, and visiting ${locationName}, Pittsburgh. Find restaurants, events, housing, and local insights.`,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Explore Neighborhood Highlights',
        text: `Discover what makes ${locationName} special with our overview of local attractions, history, and community features.`
      },
      {
        '@type': 'HowToStep',
        name: 'Find Great Places to Eat',
        text: `Browse top-rated restaurants, cafes, and dining options in ${locationName} with reviews and recommendations.`
      },
      {
        '@type': 'HowToStep',
        name: 'Check Local Events',
        text: `Stay updated with festivals, concerts, and community events happening in ${locationName}.`
      },
      {
        '@type': 'HowToStep',
        name: 'Discover Shopping & Services',
        text: `Find local businesses, shopping districts, and essential services throughout ${locationName}.`
      },
      {
        '@type': 'HowToStep',
        name: 'Plan Your Transportation',
        text: `Learn about public transit, parking, and transportation options for getting around ${locationName}.`
      }
    ]
  }
}
