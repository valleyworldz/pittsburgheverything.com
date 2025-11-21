// Google My Business Setup & Optimization for PittsburghEverything.com
// Complete GMB profile configuration and management system

export interface GMBProfile {
  businessName: string
  storeCode?: string
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
  primaryPhone: string
  additionalPhones?: string[]
  primaryCategory: string
  additionalCategories: string[]
  websiteUrl: string
  businessHours: {
    [key: string]: {
      open: string
      close: string
      isOpen: boolean
    }
  }
  attributes: {
    [key: string]: boolean | string
  }
  labels?: string[]
  description: string
  photos: {
    profile: string[]
    logo: string
    cover: string
    additional: string[]
  }
  services: Array<{
    name: string
    description: string
    price?: {
      min: number
      max: number
      currency: string
    }
  }>
  products?: Array<{
    name: string
    description: string
    price?: {
      amount: number
      currency: string
    }
  }>
}

// Optimized GMB Profile for PittsburghEverything.com
export const PITTSBURGH_EVERYTHING_GMB_PROFILE: GMBProfile = {
  businessName: 'PittsburghEverything',
  address: {
    streetAddress: '600 Grant St',
    addressLocality: 'Pittsburgh',
    addressRegion: 'PA',
    postalCode: '15219',
    addressCountry: 'US'
  },
  geo: {
    latitude: 40.4417,
    longitude: -79.9959
  },
  primaryPhone: '+1-412-555-PEAK',
  websiteUrl: 'https://pittsburgheverything.com',
  primaryCategory: 'Internet Company',
  additionalCategories: [
    'Advertising Agency',
    'Marketing Agency',
    'Local Business',
    'Tourist Information Center',
    'Business Information Service'
  ],
  businessHours: {
    monday: { open: '09:00', close: '17:00', isOpen: true },
    tuesday: { open: '09:00', close: '17:00', isOpen: true },
    wednesday: { open: '09:00', close: '17:00', isOpen: true },
    thursday: { open: '09:00', close: '17:00', isOpen: true },
    friday: { open: '09:00', close: '17:00', isOpen: true },
    saturday: { open: '10:00', close: '16:00', isOpen: true },
    sunday: { open: '10:00', close: '16:00', isOpen: true }
  },
  attributes: {
    'online_appointments': true,
    'online_estimates': true,
    'mobile_services': true,
    'wheelchair_accessible': true,
    'women_led': false,
    'black_owned': false,
    'hispanic_owned': false,
    'asian_owned': false,
    'lgbtq_owned': false,
    'veteran_led': false
  },
  description: `PittsburghEverything.com - Your Complete Guide to Pittsburgh! Find restaurants, events, deals, neighborhoods, and everything the Steel City has to offer. From downtown attractions to local dining, we cover it all. Pittsburgh's premier local business directory and community resource.`,
  photos: {
    profile: [
      '/images/og-image.svg',
      '/images/pittsburgh-skyline.jpg'
    ],
    logo: '/images/og-image.svg',
    cover: '/images/pittsburgh-skyline.jpg',
    additional: [
      '/images/restaurants/primanti-bros.svg',
      '/images/events/christmas-tree.svg',
      '/images/deals/primanti-appetizers.svg'
    ]
  },
  services: [
    {
      name: 'Restaurant Recommendations',
      description: 'Personalized restaurant recommendations for any occasion, cuisine type, or location in Pittsburgh'
    },
    {
      name: 'Event Discovery',
      description: 'Find the best events, concerts, festivals, and activities happening in Pittsburgh'
    },
    {
      name: 'Local Deals & Discounts',
      description: 'Exclusive deals and special offers from Pittsburgh businesses and restaurants'
    },
    {
      name: 'Neighborhood Guides',
      description: 'Comprehensive guides to all Pittsburgh neighborhoods with local insights and recommendations'
    },
    {
      name: 'Business Directory',
      description: 'Complete directory of Pittsburgh businesses, services, and local companies'
    },
    {
      name: 'Local Business Listings',
      description: 'Premium business listings and marketing services for Pittsburgh businesses'
    }
  ]
}

// GMB Optimization Checklist
export const GMB_OPTIMIZATION_STEPS = [
  {
    step: 1,
    title: 'Claim & Verify Business',
    description: 'Claim PittsburghEverything.com on Google My Business and verify ownership',
    completed: false,
    priority: 'critical',
    estimatedTime: '1 hour',
    requirements: ['Google account', 'Business verification method']
  },
  {
    step: 2,
    title: 'Complete Business Information',
    description: 'Fill out all business details including hours, address, phone, website',
    completed: false,
    priority: 'critical',
    estimatedTime: '30 minutes',
    requirements: ['Accurate business information']
  },
  {
    step: 3,
    title: 'Add High-Quality Photos',
    description: 'Upload professional photos including logo, cover, and business images',
    completed: false,
    priority: 'high',
    estimatedTime: '45 minutes',
    requirements: ['High-resolution images', 'Business logo', 'Cover photo']
  },
  {
    step: 4,
    title: 'Select Primary & Additional Categories',
    description: 'Choose most relevant business categories for better search visibility',
    completed: false,
    priority: 'high',
    estimatedTime: '15 minutes',
    requirements: ['Research relevant categories']
  },
  {
    step: 5,
    title: 'Write Compelling Description',
    description: 'Create SEO-optimized business description with keywords and value proposition',
    completed: false,
    priority: 'high',
    estimatedTime: '30 minutes',
    requirements: ['Keyword research', 'Clear value proposition']
  },
  {
    step: 6,
    title: 'Add Services & Attributes',
    description: 'List services offered and set relevant business attributes',
    completed: false,
    priority: 'medium',
    estimatedTime: '20 minutes',
    requirements: ['Service list', 'Business attributes']
  },
  {
    step: 7,
    title: 'Set Up Posts & Updates',
    description: 'Create system for regular Google Posts about local events and deals',
    completed: false,
    priority: 'medium',
    estimatedTime: '1 hour',
    requirements: ['Content calendar', 'Local news feed']
  },
  {
    step: 8,
    title: 'Enable Messaging & Reviews',
    description: 'Set up Google messaging and review response system',
    completed: false,
    priority: 'high',
    estimatedTime: '15 minutes',
    requirements: ['Response templates', 'Review monitoring']
  },
  {
    step: 9,
    title: 'Add Products (if applicable)',
    description: 'List any products or services with pricing information',
    completed: false,
    priority: 'low',
    estimatedTime: '20 minutes',
    requirements: ['Product catalog', 'Pricing information']
  },
  {
    step: 10,
    title: 'Set Up Insights & Analytics',
    description: 'Configure Google My Business insights for performance tracking',
    completed: false,
    priority: 'medium',
    estimatedTime: '10 minutes',
    requirements: ['Analytics access', 'Performance tracking goals']
  }
]

// GMB Post Templates for Local Engagement
export const GMB_POST_TEMPLATES = {
  event: {
    title: '🎉 Upcoming Pittsburgh Event!',
    content: 'Check out this amazing event happening in Pittsburgh! [Event Name] at [Location] on [Date]. Don\'t miss out on the fun!',
    callToAction: 'LEARN_MORE',
    mediaType: 'image'
  },
  deal: {
    title: '💰 Special Deal Alert!',
    content: 'Save big at [Business Name] in [Neighborhood]! [Deal Description]. Limited time offer!',
    callToAction: 'CALL',
    mediaType: 'image'
  },
  restaurant: {
    title: '🍽️ Pittsburgh Dining Spotlight',
    content: 'Discover amazing cuisine at [Restaurant Name] in [Neighborhood]! [Brief description of specialty or atmosphere]',
    callToAction: 'LEARN_MORE',
    mediaType: 'image'
  },
  neighborhood: {
    title: '🏙️ Explore Pittsburgh Neighborhoods',
    content: 'Discover the charm of [Neighborhood Name]! From [attraction1] to [attraction2], there\'s something for everyone.',
    callToAction: 'LEARN_MORE',
    mediaType: 'image'
  },
  seasonal: {
    title: '🍂 Pittsburgh Seasonal Update',
    content: 'Fall is here in Pittsburgh! Enjoy [seasonal activity] at [location]. The Steel City is beautiful this time of year!',
    callToAction: 'LEARN_MORE',
    mediaType: 'image'
  }
}

// GMB Q&A Responses for Common Questions
export const GMB_QA_RESPONSES = {
  'What services do you offer?': 'We provide comprehensive information about Pittsburgh restaurants, events, deals, neighborhoods, and local businesses. Think of us as your complete guide to everything Pittsburgh!',
  'Do you have office hours?': 'Our website is available 24/7! For customer service inquiries, we\'re here Monday-Friday 9AM-5PM EST.',
  'How do I list my business?': 'Visit our Submit Business page at pittsburgheverything.com/submit-business to add your Pittsburgh business to our directory!',
  'Do you offer advertising?': 'Yes! We offer premium business listings and advertising opportunities. Contact us at advertise@pittsburgheverything.com for details.',
  'Are your listings free?': 'Basic business listings are free! We also offer premium featured listings with enhanced visibility.',
  'How often is information updated?': 'We update our information daily to ensure you have the most current Pittsburgh business and event data.',
  'Do you cover all Pittsburgh neighborhoods?': 'Yes! We cover all Pittsburgh neighborhoods including Downtown, Oakland, Shadyside, South Side, Lawrenceville, and surrounding areas.',
  'Can I submit event information?': 'Absolutely! Share your Pittsburgh event details with us and we\'ll help promote it to our community.'
}

// GMB Performance Metrics to Track
export const GMB_METRICS = [
  'total_views',
  'search_views',
  'map_views',
  'website_clicks',
  'phone_calls',
  'directions_requests',
  'photo_views',
  'review_count',
  'average_rating',
  'popular_times',
  'post_engagement',
  'qa_responses'
]

// Generate GMB API payload for bulk updates
export function generateGMBUpdatePayload(updates: Partial<GMBProfile>): any {
  const payload: any = {
    languageCode: 'en-US',
    ...updates
  }

  // Format hours for API
  if (updates.businessHours) {
    payload.regularHours = {
      periods: Object.entries(updates.businessHours).map(([day, hours]) => ({
        openDay: day.toUpperCase(),
        openTime: hours.open.replace(':', ''),
        closeDay: day.toUpperCase(),
        closeTime: hours.close.replace(':', '')
      }))
    }
  }

  return payload
}

// Validate GMB profile completeness
export function validateGMBProfile(profile: GMBProfile): {
  score: number
  issues: string[]
  recommendations: string[]
} {
  const issues: string[] = []
  const recommendations: string[] = []
  let score = 100

  // Required fields check
  if (!profile.businessName) {
    issues.push('Business name is required')
    score -= 20
  }

  if (!profile.address.streetAddress) {
    issues.push('Street address is required')
    score -= 20
  }

  if (!profile.primaryPhone) {
    issues.push('Phone number is required')
    score -= 15
  }

  if (!profile.websiteUrl) {
    issues.push('Website URL is required')
    score -= 15
  }

  if (!profile.primaryCategory) {
    issues.push('Primary category is required')
    score -= 10
  }

  // Optimization checks
  if (!profile.description || profile.description.length < 50) {
    recommendations.push('Add a detailed business description (minimum 50 characters)')
    score -= 10
  }

  if (!profile.photos.logo) {
    recommendations.push('Upload a business logo')
    score -= 5
  }

  if (!profile.photos.cover) {
    recommendations.push('Add a cover photo')
    score -= 5
  }

  if (!profile.services || profile.services.length === 0) {
    recommendations.push('Add your services to help customers understand what you offer')
    score -= 5
  }

  return {
    score: Math.max(0, score),
    issues,
    recommendations
  }
}
