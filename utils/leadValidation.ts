// Lead Validation and Processing Utilities

import { z } from 'zod'

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  sanitizedData?: any
}

export interface LeadScore {
  score: number // 0-100
  reasons: string[]
  recommendedAction: string
}

// Lead validation schema
export const leadSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),

  email: z.string()
    .email('Invalid email address')
    .max(254, 'Email address is too long'),

  phone: z.string()
    .optional()
    .refine((phone) => {
      if (!phone) return true
      const cleaned = phone.replace(/\D/g, '')
      return cleaned.length >= 10 && cleaned.length <= 11
    }, 'Phone number must be 10 or 11 digits'),

  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),

  category: z.enum([
    'restaurants',
    'events',
    'services',
    'neighborhoods',
    'business-listing',
    'advertising',
    'partnership',
    'other'
  ], { errorMap: () => ({ message: 'Please select a valid category' }) }),

  businessInterest: z.string()
    .optional()
    .refine((val) => !val || val.length <= 200, 'Business interest description is too long'),
})

// Business claim validation schema
export const businessClaimSchema = z.object({
  businessId: z.string()
    .min(1, 'Business ID is required')
    .max(100, 'Business ID is invalid'),

  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),

  email: z.string()
    .email('Invalid email address')
    .max(254, 'Email address is too long'),

  phone: z.string()
    .optional()
    .refine((phone) => {
      if (!phone) return true
      const cleaned = phone.replace(/\D/g, '')
      return cleaned.length >= 10 && cleaned.length <= 11
    }, 'Phone number must be 10 or 11 digits'),

  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),

  ownershipProof: z.string()
    .optional()
    .refine((val) => !val || val.length <= 500, 'Ownership proof description is too long'),
})

/**
 * Validate lead data
 */
export function validateLead(data: any): ValidationResult {
  try {
    const sanitizedData = leadSchema.parse(data)
    return {
      isValid: true,
      errors: [],
      sanitizedData,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => err.message)
      return {
        isValid: false,
        errors,
      }
    }

    return {
      isValid: false,
      errors: ['Validation failed'],
    }
  }
}

/**
 * Validate business claim data
 */
export function validateBusinessClaim(data: any): ValidationResult {
  try {
    const sanitizedData = businessClaimSchema.parse(data)
    return {
      isValid: true,
      errors: [],
      sanitizedData,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => err.message)
      return {
        isValid: false,
        errors,
      }
    }

    return {
      isValid: false,
      errors: ['Validation failed'],
    }
  }
}

/**
 * Score lead quality
 */
export function scoreLead(lead: any): LeadScore {
  let score = 50 // Base score
  const reasons: string[] = []

  // Name quality (+10 if has first and last name)
  if (lead.name && lead.name.split(' ').length >= 2) {
    score += 10
    reasons.push('Complete name provided')
  }

  // Email quality (+10 if business email)
  if (lead.email && (lead.email.includes('.com') || lead.email.includes('.org'))) {
    score += 10
    reasons.push('Professional email address')
  }

  // Phone provided (+10)
  if (lead.phone) {
    score += 10
    reasons.push('Phone number provided')
  }

  // Message length (+10 if detailed)
  if (lead.message && lead.message.length > 50) {
    score += 10
    reasons.push('Detailed inquiry')
  }

  // Category specificity (+10 for specific categories)
  const highValueCategories = ['business-listing', 'advertising', 'partnership']
  if (lead.category && highValueCategories.includes(lead.category)) {
    score += 10
    reasons.push('High-value category')
  }

  // Business interest (+5 if specified)
  if (lead.businessInterest) {
    score += 5
    reasons.push('Business interest specified')
  }

  // Cap at 100
  score = Math.min(100, score)

  let recommendedAction = 'Respond within 24 hours'
  if (score >= 80) {
    recommendedAction = 'Respond immediately - high priority lead'
  } else if (score >= 60) {
    recommendedAction = 'Respond within 24 hours'
  } else {
    recommendedAction = 'Respond within 1 week'
  }

  return {
    score,
    reasons,
    recommendedAction,
  }
}

/**
 * Detect spam patterns
 */
export function detectSpam(text: string): {
  isSpam: boolean
  confidence: number
  reasons: string[]
} {
  const reasons: string[] = []
  let spamScore = 0

  // Check for excessive caps
  const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length
  if (capsRatio > 0.3) {
    spamScore += 30
    reasons.push('Excessive capitalization')
  }

  // Check for spam keywords
  const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'free money', 'urgent']
  const hasSpamKeywords = spamKeywords.some(keyword =>
    text.toLowerCase().includes(keyword)
  )
  if (hasSpamKeywords) {
    spamScore += 50
    reasons.push('Contains spam keywords')
  }

  // Check for excessive punctuation
  const punctuationRatio = (text.match(/[!?.]{2,}/g) || []).length
  if (punctuationRatio > 2) {
    spamScore += 20
    reasons.push('Excessive punctuation')
  }

  // Check for repeated characters
  const hasRepeatedChars = /(.)\1{3,}/.test(text)
  if (hasRepeatedChars) {
    spamScore += 25
    reasons.push('Repeated characters')
  }

  // Check for suspicious URLs
  const urlRegex = /https?:\/\/[^\s]+/g
  const urls = text.match(urlRegex) || []
  if (urls.length > 2) {
    spamScore += 40
    reasons.push('Multiple URLs')
  }

  return {
    isSpam: spamScore >= 50,
    confidence: Math.min(100, spamScore),
    reasons,
  }
}

/**
 * Sanitize input text
 */
export function sanitizeInput(text: string): string {
  return text
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .substring(0, 10000) // Limit length
}

/**
 * Check for duplicate leads
 */
export function checkDuplicateLead(newLead: any, existingLeads: any[]): {
  isDuplicate: boolean
  existingLead?: any
  similarity: number
} {
  for (const existing of existingLeads) {
    let similarity = 0

    // Email match (high similarity)
    if (existing.email === newLead.email) {
      similarity += 50
    }

    // Phone match
    if (existing.phone && newLead.phone && existing.phone === newLead.phone) {
      similarity += 30
    }

    // Name similarity (basic check)
    if (existing.name && newLead.name) {
      const name1 = existing.name.toLowerCase().replace(/\s+/g, '')
      const name2 = newLead.name.toLowerCase().replace(/\s+/g, '')
      if (name1 === name2) {
        similarity += 20
      }
    }

    // Recent submission (within 24 hours)
    const timeDiff = Date.now() - new Date(existing.createdAt).getTime()
    const isRecent = timeDiff < 24 * 60 * 60 * 1000
    if (isRecent) {
      similarity += 10
    }

    if (similarity >= 70) {
      return {
        isDuplicate: true,
        existingLead: existing,
        similarity,
      }
    }
  }

  return {
    isDuplicate: false,
    similarity: 0,
  }
}

/**
 * Format lead for email notification
 */
export function formatLeadForEmail(lead: any): string {
  return `
New Lead Received:

Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone || 'Not provided'}
Category: ${lead.category}
Business Interest: ${lead.businessInterest || 'Not specified'}

Message:
${lead.message}

Lead Score: ${scoreLead(lead).score}/100
Recommended Action: ${scoreLead(lead).recommendedAction}

Submitted: ${new Date(lead.createdAt).toLocaleString()}
  `.trim()
}
