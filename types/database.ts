// Database schemas for PittsburghEverything sections

export interface CommunityPost {
  id: string
  type: 'question' | 'lost-found' | 'volunteer'
  title: string
  body: string
  authorName?: string
  authorEmail?: string
  neighborhood?: string
  status: 'pending' | 'approved' | 'hidden' | 'resolved'
  createdAt: string
  updatedAt: string
  responses?: CommunityResponse[]
  tags?: string[]
  location?: {
    lat: number
    lng: number
    address?: string
  }
}

export interface CommunityResponse {
  id: string
  postId: string
  authorName?: string
  authorEmail?: string
  body: string
  createdAt: string
  isAdminResponse?: boolean
}

export interface HousingListing {
  id: string
  type: 'apartment' | 'house' | 'condo' | 'room'
  title: string
  description: string
  address: string
  neighborhood: string
  price: number
  priceType: 'month' | 'week' | 'day'
  bedrooms: number
  bathrooms: number
  squareFeet?: number
  availableDate: string
  leaseType: 'short-term' | 'long-term' | 'sublet'
  amenities: string[]
  images: string[]
  contactName: string
  contactEmail: string
  contactPhone?: string
  status: 'active' | 'pending' | 'rented'
  createdAt: string
  updatedAt: string
}

export interface RealEstateAgent {
  id: string
  name: string
  company?: string
  title: string
  email: string
  phone: string
  website?: string
  headshot?: string
  bio: string
  specialties: string[]
  neighborhoods: string[]
  languages: string[]
  certifications?: string[]
  featured: boolean
  tier: 'free' | 'featured' | 'premium'
  createdAt: string
  updatedAt: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  name?: string
  neighborhood?: string
  interests: string[]
  subscribedAt: string
  unsubscribedAt?: string
  status: 'active' | 'unsubscribed' | 'bounced'
  source: string
}

export interface GuideContent {
  id: string
  slug: string
  title: string
  category: 'ultimate' | 'seasonal' | 'weekend' | 'moving' | 'visitor'
  season?: 'spring' | 'summer' | 'fall' | 'winter'
  excerpt: string
  content: string // Markdown content
  featuredImage?: string
  author: string
  publishedAt: string
  updatedAt: string
  tags: string[]
  relatedGuides: string[]
  seoTitle?: string
  seoDescription?: string
  readingTime: number
}

export interface VisitorAccommodation {
  id: string
  name: string
  type: 'hotel' | 'bnb' | 'hostel' | 'apartment'
  description: string
  address: string
  neighborhood: string
  priceRange: string
  rating?: number
  amenities: string[]
  website?: string
  phone?: string
  image?: string
  featured: boolean
}

export interface MediaItem {
  id: string
  type: 'photo' | 'video'
  title: string
  description?: string
  category: string // 'events', 'skyline', 'neighborhoods', 'food', etc.
  url: string
  thumbnail?: string
  tags: string[]
  neighborhood?: string
  uploadedBy?: string
  uploadedAt: string
  featured: boolean
  altText: string
}

export interface CensusData {
  neighborhood: string
  medianIncome: number
  medianRent: number
  medianHomeValue: number
  population: number
  averageAge: number
  educationLevel: string
  unemploymentRate: number
  commuteTime: number
  lastUpdated: string
}

export interface BusinessPricingTier {
  id: string
  name: string
  tier: 'free' | 'featured' | 'premium'
  price: number // Monthly or one-time
  features: string[]
  popular?: boolean
  stripePriceId?: string
}

// Form submission schemas
export interface BusinessSubmission {
  id: string
  businessName: string
  category: string
  subcategory?: string
  description: string
  address: string
  phone?: string
  email: string
  website?: string
  hours?: string
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
  images?: string[]
  ownerName: string
  ownerEmail: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  approvedAt?: string
  rejectionReason?: string
}

export interface JobPosting {
  id: string
  title: string
  company: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'freelance'
  salary?: {
    min?: number
    max?: number
    currency: string
    period: 'hour' | 'month' | 'year'
  }
  description: string
  requirements: string[]
  benefits?: string[]
  contactEmail: string
  applicationUrl?: string
  postedBy: string
  status: 'active' | 'filled' | 'expired'
  postedAt: string
  expiresAt?: string
}

// AI Guide conversation schemas
export interface AIConversation {
  id: string
  sessionId: string
  userId?: string
  messages: AIConversationMessage[]
  createdAt: string
  updatedAt: string
  context?: {
    location?: string
    interests?: string[]
    previousQueries?: string[]
  }
}

export interface AIConversationMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  metadata?: {
    confidence?: number
    sources?: string[]
    suggestedActions?: string[]
  }
}

// Analytics and tracking
export interface NewsletterAnalytics {
  id: string
  subject: string
  sentAt: string
  recipientCount: number
  openRate: number
  clickRate: number
  unsubscribeRate: number
  topLinks: Array<{
    url: string
    clicks: number
  }>
}

export interface BusinessLead {
  id: string
  businessId: string
  type: 'inquiry' | 'advertising' | 'partnership'
  contactName: string
  contactEmail: string
  contactPhone?: string
  message: string
  status: 'new' | 'contacted' | 'qualified' | 'closed' | 'lost'
  createdAt: string
  updatedAt: string
  assignedTo?: string
  notes?: string[]
}
