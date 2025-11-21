// API Fetcher Utility with Error Handling and Caching

export interface FetchOptions extends Omit<RequestInit, 'cache'> {
  timeout?: number
  retries?: number
  cache?: boolean
  cacheTime?: number
}

export interface APIResponse<T = any> {
  data?: T
  error?: string
  success: boolean
  status: number
  headers: Headers
}

class Cache {
  private cache = new Map<string, { data: any; timestamp: number }>()

  set(key: string, data: any, ttl = 300000): void { // 5 minutes default
    this.cache.set(key, { data, timestamp: Date.now() + ttl })
  }

  get(key: string): any | null {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() > item.timestamp) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  clear(): void {
    this.cache.clear()
  }
}

const cache = new Cache()

/**
 * Enhanced fetch with timeout, retries, and caching
 */
export async function fetcher<T = any>(
  url: string,
  options: FetchOptions = {}
): Promise<APIResponse<T>> {
  const {
    timeout = 10000,
    retries = 2,
    cache: useCache = false,
    cacheTime = 300000,
    ...fetchOptions
  } = options

  // Check cache first
  if (useCache) {
    const cached = cache.get(url)
    if (cached) {
      return {
        data: cached,
        success: true,
        status: 200,
        headers: new Headers(),
      }
    }
  }

  let lastError: Error | null = null

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      // Cache the result if caching is enabled
      if (useCache) {
        cache.set(url, data, cacheTime)
      }

      return {
        data,
        success: true,
        status: response.status,
        headers: response.headers,
      }

    } catch (error) {
      lastError = error as Error

      // Don't retry on certain errors
      if (error instanceof Error && (
        error.name === 'AbortError' ||
        error.message.includes('400') ||
        error.message.includes('401') ||
        error.message.includes('403')
      )) {
        break
      }

      // Wait before retry (exponential backoff)
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
      }
    }
  }

  return {
    error: lastError?.message || 'Request failed',
    success: false,
    status: 0,
    headers: new Headers(),
  }
}

/**
 * GET request helper
 */
export async function get<T = any>(
  url: string,
  options: Omit<FetchOptions, 'method'> = {}
): Promise<APIResponse<T>> {
  return fetcher<T>(url, { ...options, method: 'GET' })
}

/**
 * POST request helper
 */
export async function post<T = any>(
  url: string,
  data: any,
  options: Omit<FetchOptions, 'method' | 'body'> = {}
): Promise<APIResponse<T>> {
  return fetcher<T>(url, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(data),
  })
}

/**
 * PUT request helper
 */
export async function put<T = any>(
  url: string,
  data: any,
  options: Omit<FetchOptions, 'method' | 'body'> = {}
): Promise<APIResponse<T>> {
  return fetcher<T>(url, {
    ...options,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(data),
  })
}

/**
 * DELETE request helper
 */
export async function del<T = any>(
  url: string,
  options: Omit<FetchOptions, 'method'> = {}
): Promise<APIResponse<T>> {
  return fetcher<T>(url, { ...options, method: 'DELETE' })
}

/**
 * API client for our application
 */
export class APIClient {
  private baseUrl: string
  private defaultOptions: FetchOptions

  constructor(baseUrl = '', defaultOptions: FetchOptions = {}) {
    this.baseUrl = baseUrl
    this.defaultOptions = defaultOptions
  }

  private buildUrl(endpoint: string): string {
    return this.baseUrl + endpoint
  }

  async get<T = any>(endpoint: string, options: FetchOptions = {}): Promise<APIResponse<T>> {
    return get<T>(this.buildUrl(endpoint), { ...this.defaultOptions, ...options })
  }

  async post<T = any>(endpoint: string, data: any, options: FetchOptions = {}): Promise<APIResponse<T>> {
    return post<T>(this.buildUrl(endpoint), data, { ...this.defaultOptions, ...options })
  }

  async put<T = any>(endpoint: string, data: any, options: FetchOptions = {}): Promise<APIResponse<T>> {
    return put<T>(this.buildUrl(endpoint), data, { ...this.defaultOptions, ...options })
  }

  async delete<T = any>(endpoint: string, options: FetchOptions = {}): Promise<APIResponse<T>> {
    return del<T>(this.buildUrl(endpoint), { ...this.defaultOptions, ...options })
  }
}

// Default API client instance
export const apiClient = new APIClient('/api', {
  timeout: 10000,
  retries: 2,
  cache: true,
  cacheTime: 300000, // 5 minutes
})

/**
 * Specialized functions for our data types
 */
export const api = {
  // Events
  getEvents: (params?: { category?: string; limit?: number; upcoming?: boolean }) => {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.set('category', params.category)
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.upcoming) searchParams.set('upcoming', 'true')

    return apiClient.get(`/events?${searchParams}`)
  },

  // Restaurants
  getRestaurants: (params?: { cuisine?: string; neighborhood?: string; limit?: number }) => {
    const searchParams = new URLSearchParams()
    if (params?.cuisine) searchParams.set('cuisine', params.cuisine)
    if (params?.neighborhood) searchParams.set('neighborhood', params.neighborhood)
    if (params?.limit) searchParams.set('limit', params.limit.toString())

    return apiClient.get(`/restaurants?${searchParams}`)
  },

  // Businesses
  getBusinesses: (params?: { category?: string; neighborhood?: string }) => {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.set('category', params.category)
    if (params?.neighborhood) searchParams.set('neighborhood', params.neighborhood)

    return apiClient.get(`/businesses?${searchParams}`)
  },

  // Neighborhoods
  getNeighborhoods: (params?: { limit?: number }) => {
    const searchParams = new URLSearchParams()
    if (params?.limit) searchParams.set('limit', params.limit.toString())

    return apiClient.get(`/neighborhoods?${searchParams}`)
  },

  // Leads
  submitLead: (leadData: any) => apiClient.post('/leads', leadData),

  // Business claims
  claimBusiness: (claimData: any) => apiClient.post('/businesses', claimData),
}
