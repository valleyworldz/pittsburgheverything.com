// Environment Configuration and Validation

import { z } from 'zod'

// Environment schema validation
const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),

  // Database (if using external DB)
  DATABASE_URL: z.string().optional(),

  // API Keys
  OPENAI_API_KEY: z.string().optional(),
  GOOGLE_MAPS_API_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  MAILCHIMP_API_KEY: z.string().optional(),
  SENDGRID_API_KEY: z.string().optional(),

  // Email configuration
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(val => val ? parseInt(val) : 587).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_SECURE: z.string().transform(val => val === 'true').optional(),

  // Application settings
  ADMIN_EMAIL: z.string().email().optional(),
  SITE_URL: z.string().url().optional(),
  API_BASE_URL: z.string().url().optional(),

  // Feature flags
  USE_MOCK_DATA: z.string().transform(val => val === 'true').default('false'),
  ENABLE_AI: z.string().transform(val => val === 'true').default('true'),
  ENABLE_NEWSLETTER: z.string().transform(val => val === 'true').default('true'),

  // Development settings
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  DEBUG_MODE: z.string().transform(val => val === 'true').default('false'),

  // File upload settings
  MAX_FILE_SIZE: z.string().transform(val => val ? parseInt(val) : 5242880).optional(), // 5MB default
  UPLOAD_DIR: z.string().default('./uploads'),

  // Cache settings
  REDIS_URL: z.string().optional(),
  CACHE_TTL: z.string().transform(val => val ? parseInt(val) : 300).optional(),

  // Analytics
  GA_ID: z.string().optional(),
  MIXPANEL_TOKEN: z.string().optional(),
  HOTJAR_ID: z.string().optional(),

  // Security
  JWT_SECRET: z.string().min(32).optional(),
  ENCRYPTION_KEY: z.string().min(32).optional(),

  // Third-party integrations
  SLACK_WEBHOOK: z.string().optional(),
  ZAPIER_WEBHOOK: z.string().optional(),
})

// Parse and validate environment variables
let env: z.infer<typeof envSchema>

try {
  env = envSchema.parse(process.env)
} catch (error) {
  console.error('❌ Environment validation failed:', error)
  // Provide defaults for development
  env = {
    NODE_ENV: 'development',
    USE_MOCK_DATA: false,
    ENABLE_AI: true,
    ENABLE_NEWSLETTER: true,
    LOG_LEVEL: 'info',
    DEBUG_MODE: false,
    UPLOAD_DIR: './uploads',
  } as any
}

// Export validated environment
export { env }

// Helper functions for environment checks
export const isDevelopment = env.NODE_ENV === 'development'
export const isStaging = env.NODE_ENV === 'staging'
export const isProduction = env.NODE_ENV === 'production'

// Feature flags
export const features = {
  ai: env.ENABLE_AI && !!env.OPENAI_API_KEY,
  newsletter: env.ENABLE_NEWSLETTER,
  mockData: env.USE_MOCK_DATA,
  analytics: !!(env.GA_ID || env.MIXPANEL_TOKEN),
  fileUploads: true,
  caching: !!env.REDIS_URL,
}

// API key validation
export const hasApiKeys = {
  openai: !!env.OPENAI_API_KEY,
  googleMaps: !!env.GOOGLE_MAPS_API_KEY,
  stripe: !!env.STRIPE_SECRET_KEY,
  email: !!(env.SMTP_USER || env.SENDGRID_API_KEY),
}

// Configuration validation
export function validateConfiguration(): {
  isValid: boolean
  errors: string[]
  warnings: string[]
} {
  const errors: string[] = []
  const warnings: string[] = []

  // Required configurations
  if (!env.ADMIN_EMAIL) {
    warnings.push('ADMIN_EMAIL not set - email notifications may not work')
  }

  if (!env.SITE_URL) {
    warnings.push('SITE_URL not set - some features may not work correctly')
  }

  // API key warnings
  if (!env.OPENAI_API_KEY) {
    warnings.push('OPENAI_API_KEY not set - AI features will be disabled')
  }

  if (!env.GOOGLE_MAPS_API_KEY) {
    warnings.push('GOOGLE_MAPS_API_KEY not set - map features will be limited')
  }

  if (!env.STRIPE_SECRET_KEY) {
    warnings.push('STRIPE_SECRET_KEY not set - payment features will be disabled')
  }

  // Email configuration
  if (!env.SMTP_USER && !env.SENDGRID_API_KEY) {
    warnings.push('No email provider configured - email features will be disabled')
  }

  // Security checks
  if (!env.JWT_SECRET && isProduction) {
    errors.push('JWT_SECRET must be set in production')
  }

  if (!env.ENCRYPTION_KEY && isProduction) {
    errors.push('ENCRYPTION_KEY must be set in production')
  }

  // File system checks (runtime)
  try {
    const fs = require('fs')
    if (!fs.existsSync(env.UPLOAD_DIR)) {
      warnings.push(`Upload directory ${env.UPLOAD_DIR} does not exist`)
    }
  } catch {
    // Ignore in environments where fs is not available
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

// Configuration summary
export function getConfigSummary(): {
  environment: string
  features: Record<string, boolean>
  integrations: Record<string, boolean>
} {
  return {
    environment: env.NODE_ENV,
    features,
    integrations: hasApiKeys,
  }
}

// Safe environment variable access
export function getEnvVar(key: keyof typeof env, defaultValue?: any): any {
  return env[key] ?? defaultValue
}

// Environment-specific configurations
export const envSpecificConfig = {
  development: {
    logLevel: 'debug',
    enableDebugMode: true,
    mockExternalAPIs: true,
    corsOrigin: ['http://localhost:3000', 'http://localhost:3001'],
  },
  staging: {
    logLevel: 'info',
    enableDebugMode: false,
    mockExternalAPIs: false,
    corsOrigin: ['https://staging.pittsburgheverything.com'],
  },
  production: {
    logLevel: 'warn',
    enableDebugMode: false,
    mockExternalAPIs: false,
    corsOrigin: ['https://pittsburgheverything.com', 'https://www.pittsburgheverything.com'],
  },
} as const

export function getEnvSpecificConfig() {
  return envSpecificConfig[env.NODE_ENV as keyof typeof envSpecificConfig] || envSpecificConfig.development
}

// Database configuration (if using external DB)
export const dbConfig = {
  url: env.DATABASE_URL,
  ssl: isProduction,
  maxConnections: isProduction ? 20 : 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}

// Cache configuration
export const cacheConfig = {
  enabled: !!env.REDIS_URL,
  url: env.REDIS_URL,
  ttl: env.CACHE_TTL || 300,
}

// Export validation result
export const configValidation = validateConfiguration()
