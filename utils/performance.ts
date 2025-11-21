// Performance Monitoring and Analytics for PittsburghEverything

export interface PerformanceMetrics {
  // Core Web Vitals
  FCP?: number // First Contentful Paint
  LCP?: number // Largest Contentful Paint
  FID?: number // First Input Delay
  CLS?: number // Cumulative Layout Shift
  TTFB?: number // Time to First Byte

  // Additional metrics
  TBT?: number // Total Blocking Time
  SI?: number // Speed Index
  loadTime?: number
  domContentLoaded?: number
  firstPaint?: number

  // Custom metrics
  apiResponseTime?: number
  imageLoadTime?: number
  searchTime?: number

  // Device and connection info
  deviceType?: string
  connectionType?: string
  effectiveType?: string
}

export interface UserAnalytics {
  sessionId: string
  userId?: string
  pageViews: number
  timeOnPage: number
  bounceRate: boolean
  interactions: string[]
  searchQueries: string[]
  errorCount: number
  deviceInfo: {
    userAgent: string
    screenSize: string
    viewport: string
    touchEnabled: boolean
  }
}

// Performance monitoring class
export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {}
  private observers: PerformanceObserver[] = []
  private startTime: number

  constructor() {
    this.startTime = performance.now()
    this.initializeObservers()
  }

  private initializeObservers() {
    // Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          this.metrics.LCP = lastEntry.startTime
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        this.observers.push(lcpObserver)
      } catch (e) {
        console.warn('LCP observer not supported')
      }

      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            this.metrics.FID = entry.processingStart - entry.startTime
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })
        this.observers.push(fidObserver)
      } catch (e) {
        console.warn('FID observer not supported')
      }

      // Cumulative Layout Shift
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          })
          this.metrics.CLS = clsValue
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
        this.observers.push(clsObserver)
      } catch (e) {
        console.warn('CLS observer not supported')
      }

      // Navigation Timing
      try {
        const navigationObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            if (entry.entryType === 'navigation') {
              this.metrics.loadTime = entry.loadEventEnd - entry.loadEventStart
              this.metrics.domContentLoaded = entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart
              this.metrics.TTFB = entry.responseStart - entry.requestStart
            }
          })
        })
        navigationObserver.observe({ entryTypes: ['navigation'] })
        this.observers.push(navigationObserver)
      } catch (e) {
        console.warn('Navigation observer not supported')
      }
    }

    // Fallback for browsers without PerformanceObserver
    if ('performance' in window && 'timing' in performance) {
      const timing = performance.timing
      setTimeout(() => {
        this.metrics.loadTime = timing.loadEventEnd - timing.loadEventStart
        this.metrics.domContentLoaded = timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart
        this.metrics.TTFB = timing.responseStart - timing.requestStart
      }, 0)
    }
  }

  // Get current metrics
  getMetrics(): PerformanceMetrics {
    // Add device and connection info
    if ('navigator' in window) {
      this.metrics.deviceType = /Mobile|Android|iP(hone|od|ad)/.test(navigator.userAgent) ? 'mobile' : 'desktop'

      // Connection info (if available)
      const connection = (navigator as any).connection
      if (connection) {
        this.metrics.connectionType = connection.type
        this.metrics.effectiveType = connection.effectiveType
      }
    }

    return { ...this.metrics }
  }

  // Track custom metrics
  trackMetric(name: keyof PerformanceMetrics, value: number) {
    ;(this.metrics as any)[name] = value
  }

  // Track API response time
  trackAPIResponse(url: string, startTime: number, endTime: number) {
    const responseTime = endTime - startTime
    this.metrics.apiResponseTime = responseTime

    // Send to analytics
    this.sendToAnalytics('api_response', {
      url,
      responseTime,
      timestamp: Date.now()
    })
  }

  // Track user interactions
  trackInteraction(interactionType: string, element: string, value?: any) {
    this.sendToAnalytics('user_interaction', {
      type: interactionType,
      element,
      value,
      timestamp: Date.now(),
      page: window.location.pathname
    })
  }

  // Send data to analytics service
  private sendToAnalytics(eventName: string, data: any) {
    // In production, send to your analytics service
    if (typeof window !== 'undefined') {
      // Vercel Analytics
      if ((window as any).va) {
        ;(window as any).va('event', {
          name: eventName,
          properties: data
        })
      }

      // Custom analytics endpoint
      if (process.env.NODE_ENV === 'production') {
        fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event: eventName,
            data,
            userAgent: navigator.userAgent,
            url: window.location.href,
            timestamp: Date.now()
          })
        }).catch(err => console.warn('Analytics send failed:', err))
      }
    }
  }

  // Clean up observers
  destroy() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// User analytics tracking
export class UserAnalyticsTracker {
  private sessionId: string
  private sessionStart: number
  private pageViews: number = 0
  private interactions: string[] = []
  private searchQueries: string[] = []
  private errors: Error[] = []

  constructor() {
    this.sessionId = this.generateSessionId()
    this.sessionStart = Date.now()

    // Track page views
    this.trackPageView()

    // Track errors
    window.addEventListener('error', (event) => {
      this.trackError(event.error, event.message, event.filename, event.lineno)
    })

    window.addEventListener('unhandledrejection', (event) => {
      this.trackError(event.reason, 'Unhandled Promise Rejection')
    })
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  trackPageView() {
    this.pageViews++
    this.sendAnalytics('page_view', {
      path: window.location.pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent
    })
  }

  trackInteraction(type: string, element: string, data?: any) {
    this.interactions.push(`${type}:${element}`)
    this.sendAnalytics('interaction', {
      type,
      element,
      data,
      timestamp: Date.now()
    })
  }

  trackSearch(query: string, results: number) {
    this.searchQueries.push(query)
    this.sendAnalytics('search', {
      query,
      results,
      timestamp: Date.now()
    })
  }

  trackError(error: Error | any, message?: string, file?: string, line?: number) {
    const errorData = {
      message: message || error?.message || 'Unknown error',
      stack: error?.stack,
      file,
      line,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    }

    this.errors.push(error)
    this.sendAnalytics('error', errorData)

    // Also send to error monitoring service
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      ;(window as any).Sentry.captureException(error, {
        extra: errorData
      })
    }
  }

  getAnalyticsData(): UserAnalytics {
    return {
      sessionId: this.sessionId,
      pageViews: this.pageViews,
      timeOnPage: Date.now() - this.sessionStart,
      bounceRate: this.pageViews === 1,
      interactions: this.interactions,
      searchQueries: this.searchQueries,
      errorCount: this.errors.length,
      deviceInfo: {
        userAgent: navigator.userAgent,
        screenSize: `${screen.width}x${screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        touchEnabled: 'ontouchstart' in window
      }
    }
  }

  private sendAnalytics(eventType: string, data: any) {
    // Send to analytics service
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: this.sessionId,
          eventType,
          data,
          timestamp: Date.now()
        })
      }).catch(err => console.warn('Analytics tracking failed:', err))
    }

    // Also send to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Analytics: ${eventType}`, data)
    }
  }
}

// Global instances
let performanceMonitor: PerformanceMonitor | null = null
let userAnalytics: UserAnalyticsTracker | null = null

// Initialize monitoring
export function initializeMonitoring() {
  if (typeof window !== 'undefined') {
    performanceMonitor = new PerformanceMonitor()
    userAnalytics = new UserAnalyticsTracker()

    // Track initial page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (performanceMonitor) {
          const metrics = performanceMonitor.getMetrics()
          console.log('Performance metrics:', metrics)

          // Send metrics to analytics
          if (userAnalytics) {
            userAnalytics.trackInteraction('page_load', 'document', metrics)
          }
        }
      }, 0)
    })

    // Track navigation
    window.addEventListener('beforeunload', () => {
      if (userAnalytics) {
        const analytics = userAnalytics.getAnalyticsData()
        // Send final analytics data
        navigator.sendBeacon('/api/analytics/session', JSON.stringify(analytics))
      }
    })
  }
}

// Export utilities
export function getPerformanceMonitor(): PerformanceMonitor | null {
  return performanceMonitor
}

export function getUserAnalytics(): UserAnalyticsTracker | null {
  return userAnalytics
}

// Utility functions for tracking
export function trackAPIRequest(url: string) {
  const startTime = performance.now()
  return {
    end: () => {
      const endTime = performance.now()
      if (performanceMonitor) {
        performanceMonitor.trackAPIResponse(url, startTime, endTime)
      }
    }
  }
}

export function trackUserInteraction(type: string, element: string, data?: any) {
  if (userAnalytics) {
    userAnalytics.trackInteraction(type, element, data)
  }
}

export function trackSearch(query: string, results: number) {
  if (userAnalytics) {
    userAnalytics.trackSearch(query, results)
  }
}

// Web Vitals reporting
export function reportWebVitals(metric: any) {
  // Send to analytics service
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.value),
      custom_map: { metric_value: metric.value }
    })
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric.name, metric.value)
  }
}
