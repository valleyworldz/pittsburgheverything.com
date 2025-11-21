// API Configuration

export const apiConfig = {
  // Base settings
  baseUrl: process.env.API_BASE_URL || 'https://pittsburgheverything.com/api',
  timeout: 10000,
  retries: 2,

  // External API keys (loaded from environment)
  keys: {
    openai: process.env.OPENAI_API_KEY,
    googleMaps: process.env.GOOGLE_MAPS_API_KEY,
    stripe: process.env.STRIPE_SECRET_KEY,
    mailchimp: process.env.MAILCHIMP_API_KEY,
    sendgrid: process.env.SENDGRID_API_KEY,
  },

  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  },

  // CORS settings
  cors: {
    origin: [
      'https://pittsburgheverything.com',
      'https://www.pittsburgheverything.com',
      process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null,
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
    ],
  },

  // Cache settings
  cache: {
    defaultTtl: 300, // 5 minutes
    endpoints: {
      '/api/events': 600, // 10 minutes
      '/api/restaurants': 600,
      '/api/neighborhoods': 3600, // 1 hour
      '/api/deals': 300, // 5 minutes
      '/api/top100': 1800, // 30 minutes
    },
  },

  // Pagination defaults
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
    defaultPage: 1,
  },

  // API endpoints
  endpoints: {
    leads: '/leads',
    businesses: '/businesses',
    events: '/events',
    restaurants: '/restaurants',
    neighborhoods: '/neighborhoods',
    deals: '/deals',
    newsletter: '/newsletter',
    search: '/search',
    ai: '/ai',
  },

  // Request/response settings
  request: {
    defaultHeaders: {
      'Content-Type': 'application/json',
      'User-Agent': 'PittsburghEverything-API/1.0',
    },
    retryableStatusCodes: [408, 429, 500, 502, 503, 504],
    retryDelay: 1000, // Base delay in ms
    maxRetryDelay: 10000,
  },

  // Response formatting
  response: {
    successStatusCodes: [200, 201, 202, 204],
    includeMetadata: true,
    defaultErrorMessage: 'An error occurred while processing your request',
  },

  // Validation settings
  validation: {
    sanitizeInput: true,
    checkSpam: true,
    validateEmails: true,
    maxRequestSize: '10mb',
  },

  // Monitoring and logging
  monitoring: {
    enableMetrics: true,
    logRequests: process.env.NODE_ENV === 'development',
    logErrors: true,
    trackPerformance: true,
  },

  // Third-party integrations
  integrations: {
    openai: {
      enabled: !!process.env.OPENAI_API_KEY,
      model: 'gpt-3.5-turbo',
      maxTokens: 1000,
      temperature: 0.7,
    },
    stripe: {
      enabled: !!process.env.STRIPE_SECRET_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      currency: 'usd',
    },
    email: {
      provider: process.env.EMAIL_PROVIDER || 'nodemailer', // nodemailer, sendgrid, mailgun
      from: 'PittsburghEverything <noreply@pittsburgheverything.com>',
    },
    maps: {
      provider: 'google', // google, mapbox
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
} as const

// Helper functions
export function getApiUrl(endpoint: string): string {
  return `${apiConfig.baseUrl}${endpoint}`
}

export function getEndpoint(path: keyof typeof apiConfig.endpoints): string {
  return apiConfig.endpoints[path]
}

export function isIntegrationEnabled(integration: keyof typeof apiConfig.integrations): boolean {
  const config = apiConfig.integrations[integration]

  // Handle different integration types
  if (integration === 'email') {
    return !!(process.env.SMTP_USER || process.env.SENDGRID_API_KEY)
  }

  return config && 'enabled' in config && config.enabled === true
}

export function getCacheTtl(endpoint: string): number {
  return (apiConfig.cache.endpoints as any)[endpoint] || apiConfig.cache.defaultTtl
}

export function shouldRetry(statusCode: number): boolean {
  return apiConfig.request.retryableStatusCodes.includes(statusCode as any)
}

export function getRetryDelay(attempt: number): number {
  const delay = apiConfig.request.retryDelay * Math.pow(2, attempt)
  return Math.min(delay, apiConfig.request.maxRetryDelay)
}

export function isValidApiKey(key: string): boolean {
  // Simple validation - in production, implement proper API key validation
  return Boolean(key && key.length > 10)
}

// API client configuration for external services
export const externalApiConfig = {
  openai: {
    baseUrl: 'https://api.openai.com/v1',
    headers: {
      'Authorization': `Bearer ${apiConfig.keys.openai}`,
      'Content-Type': 'application/json',
    },
  },
  googleMaps: {
    baseUrl: 'https://maps.googleapis.com/maps/api',
    key: apiConfig.keys.googleMaps,
  },
  stripe: {
    baseUrl: 'https://api.stripe.com/v1',
    headers: {
      'Authorization': `Bearer ${apiConfig.keys.stripe}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
} as const

// Error codes and messages
export const apiErrors = {
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    message: 'The provided data is invalid',
    statusCode: 400,
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    message: 'Authentication required',
    statusCode: 401,
  },
  FORBIDDEN: {
    code: 'FORBIDDEN',
    message: 'Access denied',
    statusCode: 403,
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'Resource not found',
    statusCode: 404,
  },
  RATE_LIMITED: {
    code: 'RATE_LIMITED',
    message: 'Too many requests',
    statusCode: 429,
  },
  INTERNAL_ERROR: {
    code: 'INTERNAL_ERROR',
    message: 'Internal server error',
    statusCode: 500,
  },
} as const

// Response helpers
export function createSuccessResponse<T>(data: T, message?: string) {
  return {
    success: true,
    data,
    message: message || 'Request completed successfully',
    timestamp: new Date().toISOString(),
  }
}

export function createErrorResponse(error: keyof typeof apiErrors, details?: any) {
  const errorInfo = apiErrors[error]
  return {
    success: false,
    error: errorInfo.code,
    message: errorInfo.message,
    details,
    timestamp: new Date().toISOString(),
  }
}

// Validation helpers
export function validateApiRequest(body: any, schema: any): { isValid: boolean; errors?: any } {
  try {
    // Simple validation - in production, use proper validation library
    if (!body) {
      return { isValid: false, errors: ['Request body is required'] }
    }

    // Check required fields
    if (schema.required) {
      const missing = schema.required.filter((field: string) => !body[field])
      if (missing.length > 0) {
        return {
          isValid: false,
          errors: [`Missing required fields: ${missing.join(', ')}`]
        }
      }
    }

    return { isValid: true }
  } catch (error) {
    return {
      isValid: false,
      errors: ['Validation failed']
    }
  }
}
