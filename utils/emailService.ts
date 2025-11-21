import { apiConfig, isIntegrationEnabled } from '@/config/api'

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export class EmailService {
  private static instance: EmailService

  private constructor() {}

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      // Check if email is enabled
      if (!isIntegrationEnabled('email')) {
        console.log('Email service disabled, logging email instead:')
        console.log('To:', options.to)
        console.log('Subject:', options.subject)
        console.log('HTML:', options.html.substring(0, 200) + '...')
        return true
      }

      // For now, we'll use a simple implementation
      // In production, this would integrate with SendGrid, Mailgun, etc.
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      })

      if (!response.ok) {
        throw new Error(`Email service returned ${response.status}`)
      }

      return true
    } catch (error) {
      console.error('Failed to send email:', error)
      return false
    }
  }

  async sendReviewVerificationEmail(
    email: string,
    reviewId: string,
    businessName: string,
    verificationUrl: string
  ): Promise<boolean> {
    const subject = `Verify Your Review for ${businessName}`
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Verify Your Review</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 20px; background: white; border: 1px solid #dee2e6; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
            .footer { margin-top: 20px; font-size: 12px; color: #6c757d; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="color: #495057; margin: 0;">PittsburghEverything.com</h1>
              <p style="margin: 10px 0 0 0;">Verify Your Review</p>
            </div>
            <div class="content">
              <h2>Thank you for your review!</h2>
              <p>We received your review for <strong>${businessName}</strong> and want to make sure it's authentic.</p>

              <p>To verify your review and publish it on our site, please click the button below:</p>

              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify My Review</a>
              </div>

              <p><strong>Why verify?</strong> Verified reviews help other customers trust your feedback and help businesses improve their services.</p>

              <p>If you didn't write this review, you can safely ignore this email.</p>

              <div class="footer">
                <p>This email was sent by PittsburghEverything.com<br>
                Questions? Contact us at support@pittsburgheverything.com</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const text = `
      Thank you for your review of ${businessName}!

      To verify your review and publish it on PittsburghEverything.com, please visit:
      ${verificationUrl}

      Why verify? Verified reviews help other customers trust your feedback.

      If you didn't write this review, you can safely ignore this email.

      PittsburghEverything.com
      support@pittsburgheverything.com
    `

    return this.sendEmail({
      to: email,
      subject,
      html,
      text,
    })
  }

  async sendReviewApprovedEmail(
    email: string,
    reviewId: string,
    businessName: string,
    reviewUrl: string
  ): Promise<boolean> {
    const subject = `Your Review for ${businessName} is Now Live!`
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Review Approved</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #28a745; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 20px; background: white; border: 1px solid #dee2e6; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Review Approved! ✅</h1>
            </div>
            <div class="content">
              <h2>Great news!</h2>
              <p>Your review for <strong>${businessName}</strong> has been verified and is now live on PittsburghEverything.com!</p>

              <div style="text-align: center;">
                <a href="${reviewUrl}" class="button">View Your Review</a>
              </div>

              <p>Thank you for helping the Pittsburgh community make better decisions. Your feedback matters!</p>

              <p>Want to review more businesses? Visit <a href="https://pittsburgheverything.com">PittsburghEverything.com</a></p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to: email,
      subject,
      html,
    })
  }

  async sendBusinessReviewNotification(
    businessEmail: string,
    businessName: string,
    reviewCount: number,
    dashboardUrl: string
  ): Promise<boolean> {
    const subject = `New Review for ${businessName}`
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Review Notification</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #007bff; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 20px; background: white; border: 1px solid #dee2e6; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
            .stats { background: #f8f9fa; padding: 15px; border-radius: 4px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Customer Review</h1>
            </div>
            <div class="content">
              <h2>You have a new review!</h2>
              <p>A customer has left a review for <strong>${businessName}</strong>.</p>

              <div class="stats">
                <strong>Total Reviews:</strong> ${reviewCount}<br>
                <strong>Review Status:</strong> Awaiting your response
              </div>

              <div style="text-align: center;">
                <a href="${dashboardUrl}" class="button">View & Respond to Review</a>
              </div>

              <p>Responding to reviews helps build trust with customers and can improve your online reputation.</p>

              <p>This notification was sent by PittsburghEverything.com</p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to: businessEmail,
      subject,
      html,
    })
  }
}

// Export singleton instance
export const emailService = EmailService.getInstance()
