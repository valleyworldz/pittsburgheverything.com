import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { Review } from '@/types'
import { v4 as uuidv4 } from 'uuid'

interface ImportedReview {
  source: 'google' | 'yelp' | 'facebook'
  externalId: string
  rating: number
  title?: string
  content: string
  authorName: string
  authorPhoto?: string
  date: string
  response?: string
  verified: boolean
}

interface ImportResult {
  success: boolean
  imported: number
  skipped: number
  errors: string[]
  reviews: Review[]
}

export class ReviewImportService {
  private static instance: ReviewImportService

  private constructor() {}

  static getInstance(): ReviewImportService {
    if (!ReviewImportService.instance) {
      ReviewImportService.instance = new ReviewImportService()
    }
    return ReviewImportService.instance
  }

  // Simulate Google Reviews API import
  async importGoogleReviews(businessId: string, placeId?: string): Promise<ImportResult> {
    // In production, this would call Google Places API
    // For demo purposes, we'll simulate some reviews
    const mockReviews: ImportedReview[] = [
      {
        source: 'google',
        externalId: 'g1',
        rating: 5,
        title: 'Amazing experience!',
        content: 'Outstanding service and delicious food. The staff was incredibly friendly and attentive. Highly recommend!',
        authorName: 'Sarah Johnson',
        date: '2025-01-15T14:30:00Z',
        verified: true,
      },
      {
        source: 'google',
        externalId: 'g2',
        rating: 4,
        content: 'Great local spot with excellent coffee and pastries. A bit crowded during peak hours but worth the wait.',
        authorName: 'Mike Chen',
        date: '2025-01-10T09:15:00Z',
        verified: true,
      },
      {
        source: 'google',
        externalId: 'g3',
        rating: 5,
        title: 'Best in Lawrenceville',
        content: 'This place has become our go-to spot. The quality is consistently excellent and the atmosphere is perfect.',
        authorName: 'Jennifer Park',
        date: '2025-01-05T18:45:00Z',
        response: 'Thank you for the kind words! We\'re thrilled to be your go-to spot.',
        verified: true,
      },
    ]

    return this.processImportedReviews(businessId, mockReviews)
  }

  // Simulate Yelp Reviews API import
  async importYelpReviews(businessId: string, yelpId?: string): Promise<ImportResult> {
    // In production, this would call Yelp Fusion API
    const mockReviews: ImportedReview[] = [
      {
        source: 'yelp',
        externalId: 'y1',
        rating: 4,
        content: 'Solid coffee shop with great ambiance. The pastries are fresh and the staff knows their coffee. Good wifi for remote work.',
        authorName: 'David Wilson',
        date: '2025-01-12T11:20:00Z',
        verified: true,
      },
      {
        source: 'yelp',
        externalId: 'y2',
        rating: 5,
        title: 'Hidden gem!',
        content: 'Discovered this place through a friend\'s recommendation. The quality of both food and service exceeded expectations. Will definitely return.',
        authorName: 'Lisa Rodriguez',
        date: '2025-01-08T16:30:00Z',
        verified: true,
      },
    ]

    return this.processImportedReviews(businessId, mockReviews)
  }

  // Simulate Facebook Reviews import
  async importFacebookReviews(businessId: string, pageId?: string): Promise<ImportResult> {
    // In production, this would call Facebook Graph API
    const mockReviews: ImportedReview[] = [
      {
        source: 'facebook',
        externalId: 'f1',
        rating: 5,
        content: 'Love this place! The community feel is amazing and the products are top-notch. Support local business!',
        authorName: 'Tom Anderson',
        date: '2025-01-14T13:15:00Z',
        verified: true,
      },
    ]

    return this.processImportedReviews(businessId, mockReviews)
  }

  private async processImportedReviews(businessId: string, importedReviews: ImportedReview[]): Promise<ImportResult> {
    const result: ImportResult = {
      success: true,
      imported: 0,
      skipped: 0,
      errors: [],
      reviews: [],
    }

    // Get existing reviews to check for duplicates
    const existingReviews = this.getExistingReviews()
    const existingExternalIds = new Set(
      existingReviews
        .filter(r => r.businessId === businessId)
        .map(r => `${r.status}_${r.createdAt}`) // Simple duplicate check
    )

    for (const imported of importedReviews) {
      try {
        // Check for duplicates (simplified check)
        const duplicateKey = `${imported.source}_${imported.date}`
        if (existingExternalIds.has(duplicateKey)) {
          result.skipped++
          continue
        }

        // Convert to our Review format
        const review: Review = {
          id: uuidv4(),
          businessId,
          businessName: '', // Will be populated by business lookup
          businessCategory: '', // Will be populated by business lookup
          businessNeighborhood: '', // Will be populated by business lookup
          userName: imported.authorName,
          rating: imported.rating as any,
          title: imported.title || '',
          content: imported.content,
          verified: imported.verified,
          helpful: 0,
          notHelpful: 0,
          images: [],
          createdAt: imported.date,
          updatedAt: imported.date,
          status: 'approved', // Imported reviews are pre-approved
        }

        // Add business response if it exists
        if (imported.response) {
          review.response = {
            id: uuidv4(),
            businessId,
            reviewId: review.id,
            content: imported.response,
            createdAt: new Date(Date.parse(imported.date) + 86400000).toISOString(), // 1 day later
            updatedAt: new Date(Date.parse(imported.date) + 86400000).toISOString(),
          }
        }

        result.reviews.push(review)
        result.imported++

      } catch (error) {
        result.errors.push(`Failed to process review ${imported.externalId}: ${error}`)
      }
    }

    // Save imported reviews
    if (result.reviews.length > 0) {
      this.saveImportedReviews(result.reviews)
    }

    return result
  }

  private getExistingReviews(): Review[] {
    try {
      const reviewsFile = join(process.cwd(), 'data', 'reviews.json')
      const data = readFileSync(reviewsFile, 'utf8')
      return JSON.parse(data)
    } catch (error) {
      console.error('Error reading existing reviews:', error)
      return []
    }
  }

  private saveImportedReviews(reviews: Review[]): void {
    try {
      const reviewsFile = join(process.cwd(), 'data', 'reviews.json')
      const existingReviews = this.getExistingReviews()
      const allReviews = [...existingReviews, ...reviews]

      writeFileSync(reviewsFile, JSON.stringify(allReviews, null, 2))
    } catch (error) {
      console.error('Error saving imported reviews:', error)
      throw new Error('Failed to save imported reviews')
    }
  }

  // Get import statistics for a business
  getImportStats(businessId: string): {
    totalImported: number
    bySource: { google: number; yelp: number; facebook: number }
    lastImport?: string
  } {
    const reviews = this.getExistingReviews()
    const businessReviews = reviews.filter(r => r.businessId === businessId)

    const stats = {
      totalImported: businessReviews.length,
      bySource: { google: 0, yelp: 0, facebook: 0 },
      lastImport: undefined as string | undefined,
    }

    // In a real implementation, we'd track import metadata
    // For now, we'll just count reviews (simplified)

    return stats
  }
}

// Export singleton instance
export const reviewImportService = ReviewImportService.getInstance()
