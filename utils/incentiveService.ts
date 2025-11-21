import { emailService } from './emailService'
import { v4 as uuidv4 } from 'uuid'

export interface ReviewIncentive {
  id: string
  businessId: string
  businessName: string
  type: 'discount' | 'free_item' | 'loyalty_points' | 'custom'
  title: string
  description: string
  value: string // e.g., "10% off", "Free coffee", "50 points"
  conditions: string // e.g., "Leave a review within 7 days"
  validUntil?: string
  isActive: boolean
  redemptions: number
  maxRedemptions?: number
  createdAt: string
  updatedAt: string
}

export interface IncentiveRedemption {
  id: string
  incentiveId: string
  customerEmail: string
  customerName: string
  reviewId: string
  redemptionCode: string
  redeemedAt?: string
  expiresAt: string
  status: 'pending' | 'sent' | 'redeemed' | 'expired'
}

export class IncentiveService {
  private static instance: IncentiveService

  private constructor() {}

  static getInstance(): IncentiveService {
    if (!IncentiveService.instance) {
      IncentiveService.instance = new IncentiveService()
    }
    return IncentiveService.instance
  }

  // Create a new review incentive
  createIncentive(incentive: Omit<ReviewIncentive, 'id' | 'redemptions' | 'createdAt' | 'updatedAt'>): ReviewIncentive {
    const newIncentive: ReviewIncentive = {
      ...incentive,
      id: uuidv4(),
      redemptions: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // TODO: Save to database
    console.log('Created incentive:', newIncentive)

    return newIncentive
  }

  // Generate redemption for a customer
  generateRedemption(
    incentiveId: string,
    customerEmail: string,
    customerName: string,
    reviewId: string
  ): IncentiveRedemption {
    const redemptionCode = this.generateRedemptionCode()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days

    const redemption: IncentiveRedemption = {
      id: uuidv4(),
      incentiveId,
      customerEmail,
      customerName,
      reviewId,
      redemptionCode,
      expiresAt,
      status: 'pending',
    }

    // TODO: Save to database
    console.log('Generated redemption:', redemption)

    return redemption
  }

  // Send incentive redemption email
  async sendIncentiveRedemption(
    customerEmail: string,
    customerName: string,
    incentive: ReviewIncentive,
    redemptionCode: string,
    businessName: string
  ): Promise<boolean> {
    const subject = `Thank you for your review! Here's your ${incentive.title}`

    const redemptionUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/redeem?code=${redemptionCode}`

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Your Review Incentive</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px 20px; border: 1px solid #dee2e6; border-radius: 0 0 8px 8px; }
            .incentive { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
            .code { background: #f8f9fa; border: 2px dashed #28a745; padding: 15px; border-radius: 4px; text-align: center; margin: 20px 0; font-family: monospace; font-size: 18px; font-weight: bold; letter-spacing: 2px; }
            .button { display: inline-block; background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
            .conditions { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 4px; margin: 20px 0; }
            .footer { margin-top: 30px; font-size: 12px; color: #6c757d; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="color: #495057; margin: 0; font-size: 28px;">🎉 Thank You!</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px;">Your review means the world to us</p>
            </div>
            <div class="content">
              <h2>Hello ${customerName}!</h2>

              <p>Thank you so much for taking the time to leave a review for <strong>${businessName}</strong>. Your feedback helps us improve and helps other customers discover our business.</p>

              <div class="incentive">
                <h3 style="margin: 0 0 10px 0; font-size: 24px;">🎁 Your Reward</h3>
                <p style="margin: 0; font-size: 18px; font-weight: bold;">${incentive.title}</p>
                <p style="margin: 5px 0 0 0; font-size: 16px;">${incentive.value}</p>
              </div>

              <p><strong>Your redemption code:</strong></p>
              <div class="code">${redemptionCode}</div>

              <div style="text-align: center;">
                <a href="${redemptionUrl}" class="button">
                  Redeem Your Reward
                </a>
              </div>

              <div class="conditions">
                <h4 style="margin: 0 0 10px 0; color: #856404;">Important Details:</h4>
                <p style="margin: 0;">${incentive.conditions}</p>
                ${incentive.validUntil ? `<p style="margin: 5px 0 0 0;"><strong>Valid until:</strong> ${new Date(incentive.validUntil).toLocaleDateString()}</p>` : ''}
              </div>

              <p>We truly appreciate your support of local businesses. Come back and see us soon!</p>

              <p>Best regards,<br>The ${businessName} Team</p>

              <div class="footer">
                <p>This incentive is provided by PittsburghEverything.com in partnership with ${businessName}<br>
                Questions? Contact ${businessName} directly or email support@pittsburgheverything.com</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const text = `
      Hello ${customerName}!

      Thank you for your review of ${businessName}!

      As a token of our appreciation, here's your reward:
      ${incentive.title} - ${incentive.value}

      Your redemption code: ${redemptionCode}

      Redeem here: ${redemptionUrl}

      Conditions: ${incentive.conditions}
      ${incentive.validUntil ? `Valid until: ${new Date(incentive.validUntil).toLocaleDateString()}` : ''}

      Thank you for supporting local businesses!

      The ${businessName} Team
    `

    return emailService.sendEmail({
      to: customerEmail,
      subject,
      html,
      text,
    })
  }

  // Process review submission and send incentive
  async processReviewIncentive(
    businessId: string,
    customerEmail: string,
    customerName: string,
    reviewId: string
  ): Promise<boolean> {
    // Get active incentives for the business
    const incentives = this.getActiveIncentives(businessId)

    if (incentives.length === 0) {
      return true // No incentives to process, but not an error
    }

    // Use the first active incentive (in production, you might want more sophisticated selection)
    const incentive = incentives[0]

    // Check if we've hit the redemption limit
    if (incentive.maxRedemptions && incentive.redemptions >= incentive.maxRedemptions) {
      return true // Limit reached, but not an error
    }

    // Generate redemption
    const redemption = this.generateRedemption(incentive.id, customerEmail, customerName, reviewId)

    // Send the incentive email
    const emailSent = await this.sendIncentiveRedemption(
      customerEmail,
      customerName,
      incentive,
      redemption.redemptionCode,
      incentive.businessName
    )

    if (emailSent) {
      // Update incentive redemption count
      this.incrementRedemptionCount(incentive.id)
    }

    return emailSent
  }

  private getActiveIncentives(businessId: string): ReviewIncentive[] {
    // TODO: Fetch from database
    // For now, return mock data
    return [
      {
        id: 'inc-001',
        businessId,
        businessName: 'Sample Business',
        type: 'discount' as const,
        title: '10% Off Your Next Visit',
        description: 'Thank you for your review! Get 10% off your next purchase.',
        value: '10% off',
        conditions: 'Valid for 30 days after redemption. One use per customer. Cannot be combined with other offers.',
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true,
        redemptions: 0,
        maxRedemptions: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'inc-002',
        businessId,
        businessName: 'Sample Business',
        type: 'free_item' as const,
        title: 'Free Coffee with Purchase',
        description: 'Enjoy a free coffee with any purchase over $10.',
        value: 'Free coffee',
        conditions: 'Valid for 14 days. One free coffee per customer.',
        validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: false,
        redemptions: 25,
        maxRedemptions: 50,
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ].filter(inc => inc.businessId === businessId && inc.isActive)
  }

  private incrementRedemptionCount(incentiveId: string): void {
    // TODO: Update database
    console.log('Incremented redemption count for incentive:', incentiveId)
  }

  private generateRedemptionCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
  }

  // Get incentive statistics for a business
  getIncentiveStats(businessId: string): {
    totalIncentives: number
    activeIncentives: number
    totalRedemptions: number
    redemptionRate: number
  } {
    // TODO: Fetch from database
    return {
      totalIncentives: 1,
      activeIncentives: 1,
      totalRedemptions: 0,
      redemptionRate: 0,
    }
  }
}

// Export singleton instance
export const incentiveService = IncentiveService.getInstance()
