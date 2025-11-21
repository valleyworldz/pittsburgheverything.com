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
