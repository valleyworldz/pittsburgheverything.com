// Site Configuration

export const siteConfig = {
  // Basic site information
  name: 'PittsburghEverything',
  title: 'PittsburghEverything — Everything Pittsburgh in One Place',
  description: 'Events, food, neighborhoods, services, deals and more. Your complete guide to Pittsburgh.',
  url: 'https://pittsburgheverything.com',
  ogImage: '/images/og-image.jpg',

  // Contact information
  contact: {
    email: 'hello@pittsburgheverything.com',
    phone: '(412) 555-PEAK',
    address: '123 Main St, Pittsburgh, PA 15201',
  },

  // Social media links
  social: {
    twitter: 'https://twitter.com/pittsburgheverything',
    facebook: 'https://facebook.com/pittsburgheverything',
    instagram: 'https://instagram.com/pittsburgheverything',
    linkedin: 'https://linkedin.com/company/pittsburgheverything',
  },

  // Business information
  business: {
    name: 'PittsburghEverything LLC',
    founded: 2024,
    mission: 'To be the ultimate guide for everything Pittsburgh',
    values: ['Local Focus', 'Community Driven', 'Authentic Content', 'User Experience'],
  },

  // SEO configuration
  seo: {
    keywords: [
      'Pittsburgh',
      'local guide',
      'events',
      'restaurants',
      'neighborhoods',
      'services',
      'deals',
      'food',
      'attractions',
      'Pittsburgh Pennsylvania',
      'Steel City',
    ],
    ogType: 'website',
    twitterCard: 'summary_large_image',
    robots: 'index, follow',
  },

  // Feature flags
  features: {
    aiGuide: true,
    newsletter: true,
    businessClaims: true,
    leadCapture: true,
    deals: true,
    top100: true,
    events: true,
    restaurants: true,
    services: true,
    neighborhoods: true,
  },

  // Analytics and tracking
  analytics: {
    googleAnalyticsId: process.env.GA_ID,
    mixpanelToken: process.env.MIXPANEL_TOKEN,
    hotjarId: process.env.HOTJAR_ID,
  },

  // Email configuration
  email: {
    newsletterFrom: 'Pittsburgh Pulse <newsletter@pittsburgheverything.com>',
    supportFrom: 'PittsburghEverything Support <support@pittsburgheverything.com>',
    adminEmails: ['admin@pittsburgheverything.com'],
  },

  // Content settings
  content: {
    maxEventsPerPage: 12,
    maxRestaurantsPerPage: 20,
    maxDealsPerPage: 10,
    maxTop100PerPage: 20,
    newsletterFrequency: 'weekly', // daily, weekly, monthly
    cacheTime: 300000, // 5 minutes in milliseconds
  },

  // API settings
  api: {
    timeout: 10000,
    retries: 2,
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    },
  },

  // Business rules
  business: {
    claimCooldown: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    leadResponseTime: 24 * 60 * 60 * 1000, // 24 hours
    premiumPrice: 99.99, // Monthly premium listing price
    featuredPrice: 199.99, // Monthly featured listing price
  },

  // Pittsburgh-specific settings
  pittsburgh: {
    timezone: 'America/New_York',
    currency: 'USD',
    area: 'Pittsburgh Metro Area',
    population: 300000,
    founded: 1758,
    nicknames: ['Steel City', 'City of Bridges', 'The Burgh'],
  },

  // Development settings
  dev: {
    debugMode: process.env.NODE_ENV === 'development',
    mockData: process.env.USE_MOCK_DATA === 'true',
    logLevel: process.env.LOG_LEVEL || 'info',
  },
} as const

// Helper functions
export function getSiteUrl(path = ''): string {
  return `${siteConfig.url}${path}`
}

export function getSocialUrl(platform: keyof typeof siteConfig.social): string {
  return siteConfig.social[platform] || ''
}

export function isFeatureEnabled(feature: keyof typeof siteConfig.features): boolean {
  return siteConfig.features[feature]
}

export function getCacheTime(): number {
  return siteConfig.content.cacheTime
}

export function getContactInfo(): typeof siteConfig.contact {
  return siteConfig.contact
}

export function getBusinessInfo(): typeof siteConfig.business {
  return siteConfig.business
}

// Environment-specific configurations
export const envConfig = {
  development: {
    apiUrl: 'http://localhost:3000/api',
    debug: true,
    mockExternalAPIs: true,
  },
  staging: {
    apiUrl: 'https://staging.pittsburgheverything.com/api',
    debug: false,
    mockExternalAPIs: false,
  },
  production: {
    apiUrl: 'https://pittsburgheverything.com/api',
    debug: false,
    mockExternalAPIs: false,
  },
} as const

export function getCurrentEnv(): keyof typeof envConfig {
  const env = process.env.NODE_ENV || 'development'
  return env as keyof typeof envConfig
}

export function getEnvConfig() {
  return envConfig[getCurrentEnv()]
}

// Validation functions
export function validateConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!siteConfig.name) {
    errors.push('Site name is required')
  }

  if (!siteConfig.url) {
    errors.push('Site URL is required')
  }

  if (!siteConfig.contact.email) {
    errors.push('Contact email is required')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
