// Automated Review Management System for PittsburghEverything.com
// Monitor, analyze, and respond to reviews across all platforms

export interface Review {
  id: string
  platform: 'google' | 'yelp' | 'facebook' | 'tripadvisor' | 'manual'
  businessId: string
  authorName: string
  authorAvatar?: string
  rating: number
  title?: string
  content: string
  date: Date
  response?: ReviewResponse
  verified: boolean
  helpful: number
  photos?: string[]
  source: string
}

export interface ReviewResponse {
  id: string
  content: string
  date: Date
  author: string
  platform: string
  status: 'draft' | 'published' | 'scheduled'
  sentiment: 'positive' | 'neutral' | 'negative'
}

export interface ReviewAnalytics {
  totalReviews: number
  averageRating: number
  ratingDistribution: { [key: number]: number }
  platformBreakdown: { [platform: string]: number }
  sentimentAnalysis: {
    positive: number
    neutral: number
    negative: number
  }
  responseRate: number
  averageResponseTime: number
  trendingTopics: string[]
  reviewVelocity: number // reviews per day
}

export interface ReviewAlert {
  id: string
  reviewId: string
  type: 'new_negative' | 'new_review' | 'response_needed' | 'rating_drop'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  suggestedResponse?: string
  createdAt: Date
}

// Review Monitoring System
export class ReviewMonitor {
  private platforms: ReviewPlatform[]
  private alertThresholds: {
    negativeRatingThreshold: number
    responseTimeHours: number
    dailyReviewLimit: number
  }

  constructor(platforms: ReviewPlatform[]) {
    this.platforms = platforms
    this.alertThresholds = {
      negativeRatingThreshold: 3,
      responseTimeHours: 24,
      dailyReviewLimit: 50
    }
  }

  async fetchLatestReviews(businessId: string, days: number = 7): Promise<Review[]> {
    const allReviews: Review[] = []

    for (const platform of this.platforms) {
      try {
        const reviews = await platform.getReviews(businessId, days)
        allReviews.push(...reviews)
      } catch (error) {
        console.error(`Failed to fetch reviews from ${platform.name}:`, error)
      }
    }

    return allReviews.sort((a, b) => b.date.getTime() - a.date.getTime())
  }

  async checkForAlerts(businessId: string): Promise<ReviewAlert[]> {
    const alerts: ReviewAlert[] = []
    const reviews = await this.fetchLatestReviews(businessId, 1) // Last 24 hours

    for (const review of reviews) {
      // Negative review alert
      if (review.rating <= this.alertThresholds.negativeRatingThreshold) {
        alerts.push({
          id: `alert-${review.id}`,
          reviewId: review.id,
          type: 'new_negative',
          severity: review.rating <= 2 ? 'critical' : 'high',
          message: `New ${review.rating}-star review on ${review.platform}`,
          suggestedResponse: this.generateResponseSuggestion(review),
          createdAt: new Date()
        })
      }

      // Response needed alert
      if (!review.response && this.needsResponse(review)) {
        const hoursSinceReview = (Date.now() - review.date.getTime()) / (1000 * 60 * 60)
        if (hoursSinceReview > this.alertThresholds.responseTimeHours) {
          alerts.push({
            id: `response-${review.id}`,
            reviewId: review.id,
            type: 'response_needed',
            severity: 'medium',
            message: `Review needs response - ${Math.round(hoursSinceReview)} hours old`,
            suggestedResponse: this.generateResponseSuggestion(review),
            createdAt: new Date()
          })
        }
      }
    }

    return alerts
  }

  private needsResponse(review: Review): boolean {
    // Always respond to reviews 3 stars or below
    if (review.rating <= 3) return true

    // Respond to 4-5 star reviews with specific feedback or questions
    if (review.rating >= 4 && (review.content.includes('?') || review.content.length > 100)) return true

    return false
  }

  private generateResponseSuggestion(review: Review): string {
    const templates = {
      1: "We're truly sorry to hear about your experience. We'd like to make this right - please contact us directly so we can address your concerns.",
      2: "Thank you for your feedback. We're disappointed this didn't meet your expectations and would like to discuss how we can improve.",
      3: "Thank you for your honest feedback. We appreciate you taking the time to review us and are committed to continuous improvement.",
      4: "Thank you for the great review! We're thrilled you enjoyed your experience and appreciate your support.",
      5: "Wow, thank you so much for the amazing review! We're honored to have provided such a great experience for you."
    }

    let response = templates[review.rating as keyof typeof templates] || templates[5]

    // Add personalized elements
    if (review.content.toLowerCase().includes('food')) {
      response += " We'd love to hear more about what you enjoyed most about the food."
    }
    if (review.content.toLowerCase().includes('service')) {
      response += " Our team is here to ensure every guest has an excellent experience."
    }
    if (review.content.toLowerCase().includes('atmosphere') || review.content.toLowerCase().includes('decor')) {
      response += " We're glad you enjoyed the ambiance!"
    }

    return response
  }
}

// Platform-specific review interfaces
export interface ReviewPlatform {
  name: string
  getReviews(businessId: string, days: number): Promise<Review[]>
  postResponse(reviewId: string, response: string): Promise<boolean>
  getAnalytics(businessId: string): Promise<Partial<ReviewAnalytics>>
}

// Google Reviews Platform
export class GoogleReviewsPlatform implements ReviewPlatform {
  name = 'Google'

  async getReviews(businessId: string, days: number): Promise<Review[]> {
    // Implementation would use Google My Business API
    // For now, return mock data
    return []
  }

  async postResponse(reviewId: string, response: string): Promise<boolean> {
    // Implementation would use Google My Business API
    return true
  }

  async getAnalytics(businessId: string): Promise<Partial<ReviewAnalytics>> {
    return {
      totalReviews: 150,
      averageRating: 4.2,
      platformBreakdown: { google: 150 }
    }
  }
}

// Yelp Reviews Platform
export class YelpReviewsPlatform implements ReviewPlatform {
  name = 'Yelp'

  async getReviews(businessId: string, days: number): Promise<Review[]> {
    // Implementation would use Yelp API
    return []
  }

  async postResponse(reviewId: string, response: string): Promise<boolean> {
    return true
  }

  async getAnalytics(businessId: string): Promise<Partial<ReviewAnalytics>> {
    return {
      totalReviews: 89,
      averageRating: 3.8,
      platformBreakdown: { yelp: 89 }
    }
  }
}

// Facebook Reviews Platform
export class FacebookReviewsPlatform implements ReviewPlatform {
  name = 'Facebook'

  async getReviews(businessId: string, days: number): Promise<Review[]> {
    return []
  }

  async postResponse(reviewId: string, response: string): Promise<boolean> {
    return true
  }

  async getAnalytics(businessId: string): Promise<Partial<ReviewAnalytics>> {
    return {
      totalReviews: 45,
      averageRating: 4.5,
      platformBreakdown: { facebook: 45 }
    }
  }
}

// Review Response Generator
export class ReviewResponseGenerator {
  private templates: { [key: string]: string[] }

  constructor() {
    this.templates = {
      positive: [
        "Thank you so much for the wonderful review! We're thrilled you had a great experience.",
        "We're honored by your kind words! Thank you for choosing us.",
        "Your feedback means the world to us! Thank you for the amazing review.",
        "We're so grateful for your support and wonderful review!"
      ],
      neutral: [
        "Thank you for your feedback. We appreciate you taking the time to review us.",
        "We value your honest feedback and are always looking to improve.",
        "Thank you for sharing your experience with us.",
        "We appreciate your review and are committed to serving you better."
      ],
      negative: [
        "We're truly sorry to hear about your experience. We'd like to make this right - please contact us directly.",
        "Thank you for bringing this to our attention. We take your feedback seriously and would like to discuss this further.",
        "We're disappointed this didn't meet your expectations and would like to address your concerns personally.",
        "Your satisfaction is our top priority. Please reach out to us so we can resolve this matter."
      ]
    }
  }

  generateResponse(review: Review, tone: 'professional' | 'friendly' | 'empathetic' = 'professional'): string {
    const sentiment = this.analyzeSentiment(review)
    const templates = this.templates[sentiment]

    let response = templates[Math.floor(Math.random() * templates.length)]

    // Add personalization based on review content
    if (review.content.toLowerCase().includes('food')) {
      response += " We hope to have the pleasure of serving you again soon."
    }

    if (review.content.toLowerCase().includes('service')) {
      response += " Our team is committed to providing excellent service to all our guests."
    }

    if (review.content.toLowerCase().includes('atmosphere')) {
      response += " We're glad you enjoyed your visit!"
    }

    // Add business-specific elements
    response += "\n\n- The PittsburghEverything Team"

    return response
  }

  private analyzeSentiment(review: Review): 'positive' | 'neutral' | 'negative' {
    if (review.rating >= 4) return 'positive'
    if (review.rating <= 2) return 'negative'
    return 'neutral'
  }
}

// Review Analytics Engine
export class ReviewAnalyticsEngine {
  calculateAnalytics(reviews: Review[]): ReviewAnalytics {
    const totalReviews = reviews.length
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews

    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    reviews.forEach(review => {
      ratingDistribution[review.rating as keyof typeof ratingDistribution]++
    })

    const platformBreakdown: { [key: string]: number } = {}
    reviews.forEach(review => {
      platformBreakdown[review.platform] = (platformBreakdown[review.platform] || 0) + 1
    })

    const sentimentAnalysis = {
      positive: reviews.filter(r => r.rating >= 4).length,
      neutral: reviews.filter(r => r.rating === 3).length,
      negative: reviews.filter(r => r.rating <= 2).length
    }

    const responseRate = (reviews.filter(r => r.response).length / totalReviews) * 100

    const responseTimes = reviews
      .filter(r => r.response)
      .map(r => (r.response!.date.getTime() - r.date.getTime()) / (1000 * 60 * 60))
    const averageResponseTime = responseTimes.length > 0
      ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length
      : 0

    const reviewVelocity = this.calculateVelocity(reviews)

    return {
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10,
      ratingDistribution,
      platformBreakdown,
      sentimentAnalysis,
      responseRate: Math.round(responseRate),
      averageResponseTime: Math.round(averageResponseTime * 10) / 10,
      trendingTopics: this.extractTrendingTopics(reviews),
      reviewVelocity
    }
  }

  private calculateVelocity(reviews: Review[]): number {
    if (reviews.length === 0) return 0

    const sortedReviews = reviews.sort((a, b) => b.date.getTime() - a.date.getTime())
    const newest = sortedReviews[0].date
    const oldest = sortedReviews[sortedReviews.length - 1].date
    const daysDiff = (newest.getTime() - oldest.getTime()) / (1000 * 60 * 60 * 24)

    return daysDiff > 0 ? reviews.length / daysDiff : reviews.length
  }

  private extractTrendingTopics(reviews: Review[]): string[] {
    const words = reviews
      .flatMap(review => review.content.toLowerCase().split(/\W+/))
      .filter(word => word.length > 3)
      .filter(word => !['that', 'with', 'this', 'they', 'were', 'have', 'been', 'from', 'their', 'would'].includes(word))

    const wordCount: { [key: string]: number } = {}
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1
    })

    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word)
  }
}

// Review Campaign Manager
export class ReviewCampaignManager {
  private campaigns: ReviewCampaign[]

  constructor() {
    this.campaigns = []
  }

  createCampaign(campaign: Omit<ReviewCampaign, 'id' | 'createdAt' | 'status'>): ReviewCampaign {
    const newCampaign: ReviewCampaign = {
      ...campaign,
      id: `campaign-${Date.now()}`,
      createdAt: new Date(),
      status: 'active'
    }

    this.campaigns.push(newCampaign)
    return newCampaign
  }

  async sendReviewRequests(campaignId: string): Promise<{ sent: number, errors: number }> {
    const campaign = this.campaigns.find(c => c.id === campaignId)
    if (!campaign) throw new Error('Campaign not found')

    // Implementation would integrate with email service
    // For now, return mock results
    return { sent: campaign.targetContacts, errors: 0 }
  }

  getCampaignAnalytics(campaignId: string): CampaignAnalytics {
    // Mock analytics
    return {
      campaignId,
      totalSent: 500,
      totalReviews: 25,
      averageRating: 4.3,
      responseRate: 5,
      platformBreakdown: {
        google: 15,
        yelp: 8,
        facebook: 2
      }
    }
  }
}

export interface ReviewCampaign {
  id: string
  name: string
  description: string
  targetContacts: number
  platforms: string[]
  message: string
  status: 'draft' | 'active' | 'paused' | 'completed'
  createdAt: Date
  endDate?: Date
}

export interface CampaignAnalytics {
  campaignId: string
  totalSent: number
  totalReviews: number
  averageRating: number
  responseRate: number
  platformBreakdown: { [platform: string]: number }
}

// Initialize review management system
export const reviewMonitor = new ReviewMonitor([
  new GoogleReviewsPlatform(),
  new YelpReviewsPlatform(),
  new FacebookReviewsPlatform()
])

export const responseGenerator = new ReviewResponseGenerator()
export const analyticsEngine = new ReviewAnalyticsEngine()
export const campaignManager = new ReviewCampaignManager()
