// Email Utility Functions

import nodemailer from 'nodemailer'

export interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
  attachments?: Array<{
    filename: string
    content: Buffer | string
    contentType?: string
  }>
}

export interface NewsletterOptions {
  subject: string
  content: string
  recipients: string[]
  previewText?: string
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null

  constructor() {
    this.initializeTransporter()
  }

  private initializeTransporter() {
    const smtpConfig = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }

    // Only initialize if we have SMTP credentials
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      this.transporter = nodemailer.createTransport(smtpConfig)
    }
  }

  async sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string; messageId?: string }> {
    if (!this.transporter) {
      console.warn('Email service not configured - skipping email send')
      return { success: false, error: 'Email service not configured' }
    }

    try {
      const mailOptions = {
        from: options.from || process.env.SMTP_USER,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || this.htmlToText(options.html),
        attachments: options.attachments,
      }

      const result = await this.transporter.sendMail(mailOptions)

      return {
        success: true,
        messageId: result.messageId,
      }
    } catch (error) {
      console.error('Email send error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  async sendLeadNotification(lead: any): Promise<{ success: boolean; error?: string }> {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@pittsburgheverything.com'

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #FDB927; color: #000; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .lead-details { background: white; padding: 15px; border-radius: 5px; margin: 10px 0; }
            .score { display: inline-block; padding: 5px 10px; background: #4CAF50; color: white; border-radius: 3px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 New Lead Alert</h1>
              <p>PittsburghEverything.com</p>
            </div>

            <div class="content">
              <h2>New Lead Received</h2>

              <div class="lead-details">
                <strong>Name:</strong> ${lead.name}<br>
                <strong>Email:</strong> ${lead.email}<br>
                <strong>Phone:</strong> ${lead.phone || 'Not provided'}<br>
                <strong>Category:</strong> ${lead.category}<br>
                <strong>Business Interest:</strong> ${lead.businessInterest || 'Not specified'}<br>
                <strong>Submitted:</strong> ${new Date(lead.createdAt).toLocaleString()}
              </div>

              <h3>Message:</h3>
              <p>${lead.message.replace(/\n/g, '<br>')}</p>

              <p><span class="score">Lead Score: ${lead.score || 'N/A'}/100</span></p>

              <p><strong>Recommended Action:</strong> ${lead.recommendedAction || 'Respond promptly'}</p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to: adminEmail,
      subject: `New Lead: ${lead.category} - ${lead.name}`,
      html,
    })
  }

  async sendLeadConfirmation(lead: any): Promise<{ success: boolean; error?: string }> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #FDB927; color: #000; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .next-steps { background: white; padding: 15px; border-radius: 5px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome to PittsburghEverything!</h1>
            </div>

            <div class="content">
              <p>Hi ${lead.name},</p>

              <p>Thank you for reaching out to PittsburghEverything! We've received your message and will get back to you within 24 hours.</p>

              <div class="next-steps">
                <h3>What happens next?</h3>
                <ul>
                  <li>Our team will review your inquiry</li>
                  <li>We'll reach out with personalized recommendations</li>
                  <li>You'll receive information about ${lead.category} opportunities</li>
                </ul>
              </div>

              <p>In the meantime, feel free to explore our site for:</p>
              <ul>
                <li>🍽️ <a href="https://pittsburgheverything.com/restaurants">Restaurant guides</a></li>
                <li>🎭 <a href="https://pittsburgheverything.com/events">Local events</a></li>
                <li>🏪 <a href="https://pittsburgheverything.com/services">Business services</a></li>
                <li>🏆 <a href="https://pittsburgheverything.com/top-100">Top 100 rankings</a></li>
              </ul>

              <p>Best regards,<br>The PittsburghEverything Team</p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to: lead.email,
      subject: 'Thank you for contacting PittsburghEverything!',
      html,
    })
  }

  async sendNewsletter(options: NewsletterOptions): Promise<{ success: boolean; errors: string[] }> {
    const errors: string[] = []
    let successCount = 0

    // Send in batches to avoid overwhelming the SMTP server
    const batchSize = 50

    for (let i = 0; i < options.recipients.length; i += batchSize) {
      const batch = options.recipients.slice(i, i + batchSize)

      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #FDB927; color: #000; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #f9f9f9; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
              .unsubscribe { color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🌟 Pittsburgh Pulse</h1>
                <p>Your weekly guide to Pittsburgh</p>
              </div>

              <div class="content">
                ${options.content}
              </div>

              <div class="footer">
                <p>You're receiving this because you subscribed to PittsburghEverything updates.</p>
                <p class="unsubscribe">
                  <a href="[UNSUBSCRIBE_URL]">Unsubscribe</a> |
                  <a href="https://pittsburgheverything.com">Visit PittsburghEverything.com</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `

      const result = await this.sendEmail({
        to: batch,
        subject: options.subject,
        html,
      })

      if (result.success) {
        successCount += batch.length
      } else {
        errors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${result.error}`)
      }

      // Small delay between batches
      if (i + batchSize < options.recipients.length) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    return {
      success: errors.length === 0,
      errors,
    }
  }

  async sendBusinessClaimNotification(claim: any): Promise<{ success: boolean; error?: string }> {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@pittsburgheverything.com'

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #FDB927; color: #000; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .claim-details { background: white; padding: 15px; border-radius: 5px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏢 Business Claim Request</h1>
            </div>

            <div class="content">
              <h2>New Business Claim</h2>

              <div class="claim-details">
                <strong>Business ID:</strong> ${claim.businessId}<br>
                <strong>Claimant Name:</strong> ${claim.name}<br>
                <strong>Email:</strong> ${claim.email}<br>
                <strong>Phone:</strong> ${claim.phone || 'Not provided'}<br>
                <strong>Ownership Proof:</strong> ${claim.ownershipProof || 'Not provided'}<br>
                <strong>Submitted:</strong> ${new Date().toLocaleString()}
              </div>

              <h3>Message:</h3>
              <p>${claim.message.replace(/\n/g, '<br>')}</p>

              <p><strong>Next Steps:</strong></p>
              <ul>
                <li>Verify ownership documentation</li>
                <li>Contact claimant for additional information if needed</li>
                <li>Approve or deny the claim within 48 hours</li>
                <li>Update business listing with claimant information</li>
              </ul>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to: adminEmail,
      subject: `Business Claim Request - ${claim.name}`,
      html,
    })
  }

  private htmlToText(html: string): string {
    return html
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()
  }
}

// Export singleton instance
export const emailService = new EmailService()

// Utility functions
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function generateUnsubscribeUrl(email: string): string {
  const encodedEmail = encodeURIComponent(email)
  return `https://pittsburgheverything.com/unsubscribe?email=${encodedEmail}`
}

export function generateNewsletterContent(
  events: any[],
  deals: any[],
  restaurants: any[],
  topItems: any[]
): string {
  return `
    <h2>This Week in Pittsburgh</h2>

    <h3>🎭 Featured Events</h3>
    <ul>
      ${events.slice(0, 3).map(event => `<li><strong>${event.title}</strong> - ${event.date} at ${event.location}</li>`).join('')}
    </ul>

    <h3>🔥 Hot Deals</h3>
    <ul>
      ${deals.slice(0, 3).map(deal => `<li><strong>${deal.title}</strong> at ${deal.businessName} - ${deal.discount}</li>`).join('')}
    </ul>

    <h3>🍽️ New Restaurant Spotlight</h3>
    <p><strong>${restaurants[0]?.name}</strong> - ${restaurants[0]?.description}</p>

    <h3>🏆 Top 100 Update</h3>
    <p>This week's #1: <strong>${topItems[0]?.name}</strong> - ${topItems[0]?.reason}</p>
  `
}
