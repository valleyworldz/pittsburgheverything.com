// Core Data Types

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  price: string
  image?: string
  url?: string
  tags?: string[]
}

export interface Restaurant {
  id: string
  name: string
  description: string
  cuisine: string
  priceRange: string
  rating: number
  address: string
  phone?: string
  website?: string
  image?: string
  neighborhood: string
  features?: string[]
  hours?: {
    [key: string]: string
  }
}

export interface Business {
  id: string
  name: string
  description: string
  category: string
  subcategory?: string
  address: string
  phone?: string
  email?: string
  website?: string
  image?: string
  neighborhood: string
  rating?: number
  priceRange?: string
  features?: string[]
  hours?: {
    [key: string]: string
  }
  claimed?: boolean
  premium?: boolean
}

export interface Neighborhood {
  id: string
  name: string
  description: string
  population?: number
  medianIncome?: number
  walkScore?: number
  image?: string
  boundaries?: any
  attractions?: string[]
  demographics?: {
    medianAge?: number
    educationLevel?: string
    housingType?: string
  }
}

export interface Deal {
  id: string
  title: string
  description: string
  businessId: string
  businessName: string
  discount: string
  originalPrice?: number
  discountedPrice?: number
  expiresAt?: string
  category: string
  image?: string
  terms?: string
  // Enhanced deal fields
  rating?: number
  reviewCount?: number
  verified?: boolean
  location?: string
  code?: string
  savingsPercent?: number
  minimumPurchase?: number
  source?: string
  url?: string
  price?: number
}

export interface Top100Item {
  rank: number
  name: string
  category: string
  description: string
  rating: number
  address?: string
  image?: string
  reason: string
}

// API Types

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  category: string
  businessInterest?: string
  createdAt: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
}

export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Form Types

export interface LeadFormData {
  name: string
  email: string
  phone?: string
  message: string
  category: string
  businessInterest?: string
}

export interface BusinessClaimData {
  businessId: string
  name: string
  email: string
  phone?: string
  message: string
  ownershipProof?: string
}

// Search and Filter Types

export interface SearchFilters {
  query?: string
  category?: string
  neighborhood?: string
  priceRange?: string
  rating?: number
  features?: string[]
}

export interface SortOption {
  field: string
  direction: 'asc' | 'desc'
}

// Configuration Types

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  keywords: string[]
  social: {
    twitter?: string
    facebook?: string
    instagram?: string
  }
}

export interface APIConfig {
  baseUrl: string
  timeout: number
  retries: number
}

// Utility Types

export type CategoryType = 'events' | 'restaurants' | 'services' | 'neighborhoods' | 'deals'

export type PriceRange = '$' | '$$' | '$$$' | '$$$$'

export type Rating = 1 | 2 | 3 | 4 | 5

export type BusinessStatus = 'active' | 'inactive' | 'pending' | 'suspended'

// Outreach System Types

export interface BusinessOutreach {
  id: string
  businessName: string
  category: string
  email: string
  phone?: string
  address?: string
  contactPerson?: string
  notes?: string
  outreachStatus: 'not_contacted' | 'contacted' | 'responded' | 'signed_up' | 'declined'
  priority: 'high' | 'medium' | 'low'
  firstContactDate?: string
  lastContactDate?: string
  followUpCount: number
  nextFollowUpDate?: string
  response?: string
}

// Review System Types

export interface Review {
  id: string
  businessId: string
  businessName: string
  businessCategory: string
  businessNeighborhood: string
  userId?: string // Optional for anonymous reviews
  userName: string
  userEmail?: string
  rating: Rating
  title: string
  content: string
  pros?: string[]
  cons?: string[]
  verified: boolean
  verifiedMethod?: 'email' | 'phone' | 'purchase' | 'in-person'
  helpful: number
  notHelpful: number
  images?: string[]
  response?: ReviewResponse
  createdAt: string
  updatedAt: string
  status: 'pending' | 'approved' | 'rejected' | 'flagged'
}

export interface ReviewResponse {
  id: string
  businessId: string
  reviewId: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface ReviewStats {
  businessId: string
  totalReviews: number
  averageRating: number
  ratingDistribution: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
  recommendedPercentage: number
  verifiedReviews: number
  responseRate: number
  lastReviewDate?: string
  updatedAt: string
}

export interface ReviewSubmission {
  businessId: string
  userName: string
  userEmail?: string
  rating: Rating
  title: string
  content: string
  pros?: string[]
  cons?: string[]
  images?: File[]
  verificationToken?: string
}

export interface ReviewFilters {
  businessId?: string
  category?: string
  neighborhood?: string
  rating?: Rating
  verified?: boolean
  sortBy?: 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful'
  limit?: number
  offset?: number
}

export interface ReviewAnalytics {
  businessId: string
  period: 'week' | 'month' | 'quarter' | 'year'
  startDate: string
  endDate: string
  metrics: {
    totalReviews: number
    averageRating: number
    ratingTrend: number[]
    reviewVolumeTrend: number[]
    responseRate: number
    verifiedRate: number
  }
  insights: {
    topKeywords: Array<{ word: string, count: number }>
    sentimentScore: number
    improvementAreas: string[]
    strengths: string[]
  }
}
