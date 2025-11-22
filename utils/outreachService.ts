import { emailService } from './emailService'

export interface BusinessOutreach {
  id: string
  businessName: string
  email: string
  category: string
  outreachStatus: 'not_contacted' | 'contacted' | 'responded' | 'signed_up' | 'declined'
  priority: 'high' | 'medium' | 'low'
  contactPerson?: string
  notes?: string
  firstContactDate?: string
  lastContactDate?: string
  followUpCount: number
  nextFollowUpDate?: string
  response?: string
}

export class OutreachService {
  private static instance: OutreachService

  private constructor() {}

  static getInstance(): OutreachService {
    if (!OutreachService.instance) {
      OutreachService.instance = new OutreachService()
    }
    return OutreachService.instance
  }

  async sendInitialOutreach(business: BusinessOutreach): Promise<boolean> {
    const subject = `Join Pittsburgh's Best Local Review Platform - ${business.businessName}`
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Join PittsburghEverything.com</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px 20px; border: 1px solid #dee2e6; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
            .stats { background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0; }
            .benefits { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
            .benefit { background: #e3f2fd; padding: 15px; border-radius: 4px; text-align: center; }
            .footer { margin-top: 30px; font-size: 12px; color: #6c757d; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="color: #495057; margin: 0; font-size: 28px;">PittsburghEverything.com</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; color: #6c757d;">Lawrenceville's Local Review Platform</p>
            </div>
            <div class="content">
              <h2>Hello ${business.contactPerson || 'there'}!</h2>

              <p>We're reaching out from <strong>PittsburghEverything.com</strong>, Lawrenceville's premier local business directory and review platform. We noticed ${business.businessName} and wanted to invite you to join our growing community of local businesses.</p>

              <div class="stats">
                <h3 style="margin-top: 0; color: #007bff;">Why Join Now?</h3>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li><strong>50+ Lawrenceville businesses</strong> already active</li>
                  <li><strong>Growing community</strong> of Pittsburgh residents looking for local recommendations</li>
                  <li><strong>4.6 average rating</strong> across Lawrenceville businesses</li>
                  <li><strong>Free premium listing</strong> for the first 6 months</li>
                </ul>
              </div>

              <div class="benefits">
                <div class="benefit">
                  <h4 style="margin: 0 0 10px 0; color: #007bff;">📊 Review Management</h4>
                  <p style="margin: 0; font-size: 14px;">Professional dashboard to respond to reviews and track performance</p>
                </div>
                <div class="benefit">
                  <h4 style="margin: 0 0 10px 0; color: #007bff;">🎯 Local Visibility</h4>
                  <p style="margin: 0; font-size: 14px;">Featured prominently in Lawrenceville search results</p>
                </div>
                <div class="benefit">
                  <h4 style="margin: 0 0 10px 0; color: #007bff;">📈 Analytics</h4>
                  <p style="margin: 0; font-size: 14px;">Detailed insights into customer feedback and trends</p>
                </div>
                <div class="benefit">
                  <h4 style="margin: 0 0 10px 0; color: #007bff;">🤝 Community</h4>
                  <p style="margin: 0; font-size: 14px;">Connect with other Lawrenceville business owners</p>
                </div>
              </div>

              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/business-signup?ref=lawrenceville-outreach&business=${business.id}" class="button">
                  Join PittsburghEverything.com
                </a>
              </div>

              <p><strong>What happens next?</strong></p>
              <ol style="padding-left: 20px;">
                <li>Click the link above to create your business profile</li>
                <li>We'll verify your business information</li>
                <li>Your profile goes live within 24 hours</li>
                <li>Start receiving and responding to customer reviews</li>
              </ol>

              <p>We're committed to supporting Lawrenceville businesses and helping customers discover the best local experiences. Join us in building a stronger local economy!</p>

              <p>Questions? Reply to this email or call us at (412) 555-0199.</p>

              <div class="footer">
                <p>This outreach is part of our Lawrenceville Business Initiative<br>
                PittsburghEverything.com • 123 Main St, Pittsburgh, PA 15201</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const text = `
      Hello ${business.contactPerson || 'there'}!

      We're reaching out from PittsburghEverything.com, Lawrenceville's premier local business directory.

      We noticed ${business.businessName} and wanted to invite you to join our growing community.

      Why Join?
      - 50+ Lawrenceville businesses already active
      - 500+ monthly visitors looking for local recommendations
      - 4.6 average rating across Lawrenceville businesses
      - Free premium listing for the first 6 months

      Benefits:
      - Professional review management dashboard
      - Enhanced local visibility
      - Detailed analytics and insights
      - Community connections with other local businesses

      Join now: ${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/business-signup?ref=lawrenceville-outreach&business=${business.id}

      Questions? Reply to this email or call (412) 555-0199.

      PittsburghEverything.com
      Supporting Lawrenceville businesses
    `

    return emailService.sendEmail({
      to: business.email,
      subject,
      html,
      text,
    })
  }

  async sendFollowUpOutreach(business: BusinessOutreach, followUpNumber: number): Promise<boolean> {
    const subject = `Still Interested? Join PittsburghEverything.com - ${business.businessName}`
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Follow-up: Join PittsburghEverything.com</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px 20px; border: 1px solid #dee2e6; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
            .urgent { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 4px; margin: 20px 0; }
            .footer { margin-top: 30px; font-size: 12px; color: #6c757d; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="color: #856404; margin: 0;">Follow-up Invitation</h1>
              <p style="margin: 10px 0 0 0;">Lawrenceville Business Community</p>
            </div>
            <div class="content">
              <h2>Hello again!</h2>

              <p>We wanted to follow up on our previous invitation to join PittsburghEverything.com. We truly believe ${business.businessName} would be a great addition to our Lawrenceville business community.</p>

              <div class="urgent">
                <strong>⏰ Limited Time:</strong> Free premium listings are available for the next 30 businesses who sign up from Lawrenceville.
              </div>

              <p><strong>Recent Success Stories:</strong></p>
              <ul style="padding-left: 20px;">
                <li>Butler Street Coffee saw a 40% increase in foot traffic after joining</li>
                <li>Steel City Fitness gained 25 new members through our platform</li>
                <li>Lawrenceville Books sold out their community event tickets in 2 hours</li>
              </ul>

              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/business-signup?ref=lawrenceville-followup&business=${business.id}" class="button">
                  Claim Your Free Premium Listing
                </a>
              </div>

              <p><strong>This is our ${followUpNumber}${followUpNumber === 1 ? 'st' : followUpNumber === 2 ? 'nd' : 'rd'} and final follow-up.</strong> We respect your time and won't contact you again if you're not interested.</p>

              <p>If you'd like to opt out of future communications, simply reply with "UNSUBSCRIBE" in the subject line.</p>

              <div class="footer">
                <p>PittsburghEverything.com • Supporting local businesses<br>
                123 Main St, Pittsburgh, PA 15201 • (412) 555-0199</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    return emailService.sendEmail({
      to: business.email,
      subject,
      html,
    })
  }

  async sendWelcomeEmail(business: BusinessOutreach): Promise<boolean> {
    const subject = `Welcome to PittsburghEverything.com! 🎉`
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to PittsburghEverything.com</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px 20px; border: 1px solid #dee2e6; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
            .steps { background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0; }
            .step { margin: 10px 0; padding: 10px; background: white; border-radius: 4px; }
            .footer { margin-top: 30px; font-size: 12px; color: #6c757d; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="color: #155724; margin: 0; font-size: 28px;">Welcome Aboard! 🎉</h1>
              <p style="margin: 10px 0 0 0;">${business.businessName} is now part of PittsburghEverything.com</p>
            </div>
            <div class="content">
              <h2>Congratulations, ${business.contactPerson || 'Team'}!</h2>

              <p>${business.businessName} is now live on PittsburghEverything.com! Welcome to the Lawrenceville business community.</p>

              <div class="steps">
                <h3 style="margin-top: 0; color: #007bff;">Next Steps to Get Started:</h3>

                <div class="step">
                  <strong>1. Access Your Dashboard</strong><br>
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard/reviews?welcome=true" class="button" style="margin-top: 10px;">Open Dashboard</a>
                </div>

                <div class="step">
                  <strong>2. Complete Your Profile</strong><br>
                  Add photos, hours, and additional details to attract more customers.
                </div>

                <div class="step">
                  <strong>3. Share Your Profile</strong><br>
                  Use this link: ${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/businesses/${business.id}
                </div>

                <div class="step">
                  <strong>4. Start Receiving Reviews</strong><br>
                  Customers can now leave verified reviews for your business.
                </div>
              </div>

              <p><strong>What you get:</strong></p>
              <ul style="padding-left: 20px;">
                <li>Professional review management dashboard</li>
                <li>Verified customer reviews</li>
                <li>Detailed analytics and insights</li>
                <li>Enhanced local visibility</li>
                <li>Community support and networking</li>
              </ul>

              <p>Questions? Our support team is here to help. Reply to this email or call (412) 555-0199.</p>

              <p>Thank you for joining PittsburghEverything.com. Together, we're building a stronger Lawrenceville!</p>

              <div class="footer">
                <p>PittsburghEverything.com • Your Local Review Platform<br>
                123 Main St, Pittsburgh, PA 15201</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    return emailService.sendEmail({
      to: business.email,
      subject,
      html,
    })
  }
}

// Export singleton instance
export const outreachService = OutreachService.getInstance()
