// PWA Utilities for PittsburghEverything.com
// Progressive Web App functionality, push notifications, and offline management

export interface NotificationAction {
  action: string
  title: string
  icon?: string
}

export interface PushNotificationData {
  title: string
  body: string
  icon?: string
  badge?: string
  image?: string
  tag?: string
  requireInteraction?: boolean
  data?: any
  actions?: NotificationAction[]
}

export interface PWASubscription {
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
}

export interface GeolocationData {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
}

export interface PWAAnalytics {
  installPromptShown: boolean
  installPromptAccepted: boolean
  pushNotificationsEnabled: boolean
  offlineUsage: number
  cacheHits: number
  serviceWorkerStatus: 'installing' | 'installed' | 'activated' | 'redundant' | 'unknown'
}

// PWA Installation Management
export class PWAInstallManager {
  private deferredPrompt: any = null
  private installPromptShown = false

  constructor() {
    this.init()
  }

  private init() {
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('PWA: Install prompt available')
      e.preventDefault()
      this.deferredPrompt = e
      this.installPromptShown = true

      // Dispatch custom event for UI updates
      window.dispatchEvent(new CustomEvent('pwa-install-available', {
        detail: { prompt: e }
      }))
    })

    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      console.log('PWA: App installed successfully')
      this.deferredPrompt = null
      this.installPromptShown = false

      window.dispatchEvent(new CustomEvent('pwa-installed'))
    })

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('PWA: App is running in standalone mode')
      window.dispatchEvent(new CustomEvent('pwa-running-standalone'))
    }
  }

  async showInstallPrompt(): Promise<boolean> {
    if (!this.deferredPrompt) {
      console.warn('PWA: No install prompt available')
      return false
    }

    this.deferredPrompt.prompt()
    const { outcome } = await this.deferredPrompt.userChoice

    console.log(`PWA: Install prompt outcome: ${outcome}`)
    this.deferredPrompt = null

    return outcome === 'accepted'
  }

  isInstallable(): boolean {
    return this.deferredPrompt !== null
  }

  isInstalled(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true
  }
}

// Push Notification Manager
export class PushNotificationManager {
  private vapidPublicKey: string
  private subscription: PWASubscription | null = null

  constructor(vapidPublicKey: string) {
    this.vapidPublicKey = vapidPublicKey
    this.init()
  }

  private async init() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('PWA: Push notifications not supported')
      return
    }

    try {
      const registration = await navigator.serviceWorker.ready
      const existingSubscription = await registration.pushManager.getSubscription()

      if (existingSubscription) {
        this.subscription = {
          endpoint: existingSubscription.endpoint,
          keys: {
            p256dh: btoa(String.fromCharCode(...Array.from(new Uint8Array(existingSubscription.getKey('p256dh')!)))),
            auth: btoa(String.fromCharCode(...Array.from(new Uint8Array(existingSubscription.getKey('auth')!))))
          }
        }
        console.log('PWA: Existing push subscription found')
      }
    } catch (error) {
      console.error('PWA: Error initializing push notifications:', error)
    }
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('PWA: Notifications not supported')
      return 'denied'
    }

    const permission = await Notification.requestPermission()
    console.log(`PWA: Notification permission: ${permission}`)

    if (permission === 'granted') {
      await this.subscribe()
    }

    return permission
  }

  async subscribe(): Promise<PWASubscription | null> {
    try {
      const registration = await navigator.serviceWorker.ready

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey) as any
      })

      this.subscription = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: btoa(String.fromCharCode(...Array.from(new Uint8Array(subscription.getKey('p256dh')!)))),
          auth: btoa(String.fromCharCode(...Array.from(new Uint8Array(subscription.getKey('auth')!))))
        }
      }

      // Send subscription to server
      await this.sendSubscriptionToServer(this.subscription)

      console.log('PWA: Push subscription created')
      return this.subscription
    } catch (error) {
      console.error('PWA: Error subscribing to push notifications:', error)
      return null
    }
  }

  async unsubscribe(): Promise<boolean> {
    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()

      if (subscription) {
        const success = await subscription.unsubscribe()
        if (success) {
          this.subscription = null
          await this.removeSubscriptionFromServer(subscription.endpoint)
          console.log('PWA: Push subscription removed')
        }
        return success
      }
      return false
    } catch (error) {
      console.error('PWA: Error unsubscribing from push notifications:', error)
      return false
    }
  }

  async sendNotification(data: PushNotificationData): Promise<boolean> {
    if (!this.subscription) {
      console.warn('PWA: No push subscription available')
      return false
    }

    try {
      const response = await fetch('/api/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription: this.subscription,
          notification: data
        })
      })

      return response.ok
    } catch (error) {
      console.error('PWA: Error sending push notification:', error)
      return false
    }
  }

  private async sendSubscriptionToServer(subscription: PWASubscription): Promise<void> {
    try {
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription })
      })
    } catch (error) {
      console.error('PWA: Error sending subscription to server:', error)
    }
  }

  private async removeSubscriptionFromServer(endpoint: string): Promise<void> {
    try {
      await fetch('/api/push/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint })
      })
    } catch (error) {
      console.error('PWA: Error removing subscription from server:', error)
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
    const rawData = window.atob(base64)
    return new Uint8Array(rawData.length).map((_, i) => rawData.charCodeAt(i))
  }

  getSubscription(): PWASubscription | null {
    return this.subscription
  }

  isSubscribed(): boolean {
    return this.subscription !== null
  }
}

// Geolocation Manager for Local Features
export class GeolocationManager {
  private watchId: number | null = null
  private currentPosition: GeolocationData | null = null

  async getCurrentPosition(options?: PositionOptions): Promise<GeolocationData> {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject(new Error('Geolocation not supported'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData: GeolocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          }

          this.currentPosition = locationData
          resolve(locationData)
        },
        (error) => {
          reject(error)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
          ...options
        }
      )
    })
  }

  async watchPosition(callback: (position: GeolocationData) => void, options?: PositionOptions): Promise<void> {
    if (!('geolocation' in navigator)) {
      throw new Error('Geolocation not supported')
    }

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const locationData: GeolocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        }

        this.currentPosition = locationData
        callback(locationData)
      },
      (error) => {
        console.error('Geolocation watch error:', error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
        ...options
      }
    )
  }

  stopWatching(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId)
      this.watchId = null
    }
  }

  getCurrentPositionData(): GeolocationData | null {
    return this.currentPosition
  }

  // Calculate distance between two points using Haversine formula
  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 3959 // Earth's radius in miles
    const dLat = this.toRadians(lat2 - lat1)
    const dLng = this.toRadians(lng2 - lng1)

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Find nearby locations
  findNearbyLocations(
    userLat: number,
    userLng: number,
    locations: Array<{ lat: number; lng: number; id: string; name: string }>,
    maxDistance: number = 25
  ): Array<{ id: string; name: string; distance: number }> {
    return locations
      .map(location => ({
        id: location.id,
        name: location.name,
        distance: this.calculateDistance(userLat, userLng, location.lat, location.lng)
      }))
      .filter(location => location.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance)
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }
}

// Offline Manager for PWA
export class OfflineManager {
  private isOnline = navigator.onLine
  private pendingActions: Array<{
    id: string
    action: () => Promise<any>
    timestamp: number
  }> = []

  constructor() {
    this.init()
  }

  private init() {
    window.addEventListener('online', () => {
      console.log('PWA: Back online')
      this.isOnline = true
      this.processPendingActions()
      window.dispatchEvent(new CustomEvent('pwa-online'))
    })

    window.addEventListener('offline', () => {
      console.log('PWA: Gone offline')
      this.isOnline = false
      window.dispatchEvent(new CustomEvent('pwa-offline'))
    })
  }

  isOnlineStatus(): boolean {
    return this.isOnline
  }

  async queueAction(action: () => Promise<any>): Promise<string> {
    const actionId = `action-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    if (this.isOnline) {
      try {
        await action()
        return actionId
      } catch (error) {
        // If action fails, queue it for later
        this.pendingActions.push({
          id: actionId,
          action,
          timestamp: Date.now()
        })
      }
    } else {
      this.pendingActions.push({
        id: actionId,
        action,
        timestamp: Date.now()
      })
    }

    return actionId
  }

  private async processPendingActions() {
    if (this.pendingActions.length === 0) return

    console.log(`PWA: Processing ${this.pendingActions.length} pending actions`)

    const actionsToProcess = [...this.pendingActions]
    this.pendingActions = []

    for (const pendingAction of actionsToProcess) {
      try {
        await pendingAction.action()
        console.log(`PWA: Processed pending action ${pendingAction.id}`)
      } catch (error) {
        console.error(`PWA: Failed to process pending action ${pendingAction.id}:`, error)
        // Re-queue failed actions
        this.pendingActions.push(pendingAction)
      }
    }
  }

  getPendingActionCount(): number {
    return this.pendingActions.length
  }

  clearPendingActions(): void {
    this.pendingActions = []
  }
}

// PWA Analytics Tracker
export class PWAAnalyticsTracker {
  private analytics: PWAAnalytics = {
    installPromptShown: false,
    installPromptAccepted: false,
    pushNotificationsEnabled: false,
    offlineUsage: 0,
    cacheHits: 0,
    serviceWorkerStatus: 'unknown'
  }

  constructor() {
    this.loadAnalytics()
    this.initTracking()
  }

  private initTracking() {
    // Track install prompt events
    window.addEventListener('pwa-install-available', () => {
      this.analytics.installPromptShown = true
      this.saveAnalytics()
    })

    window.addEventListener('pwa-installed', () => {
      this.analytics.installPromptAccepted = true
      this.saveAnalytics()
    })

    // Track online/offline status
    let offlineStartTime = 0
    window.addEventListener('pwa-offline', () => {
      offlineStartTime = Date.now()
    })

    window.addEventListener('pwa-online', () => {
      if (offlineStartTime > 0) {
        const offlineDuration = Date.now() - offlineStartTime
        this.analytics.offlineUsage += offlineDuration
        this.saveAnalytics()
        offlineStartTime = 0
      }
    })

    // Track service worker status
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        this.analytics.serviceWorkerStatus = 'activated'
        this.saveAnalytics()

        registration.addEventListener('updatefound', () => {
          this.analytics.serviceWorkerStatus = 'installing'
          this.saveAnalytics()
        })
      })
    }

    // Track cache hits (this would need to be implemented in service worker)
    window.addEventListener('pwa-cache-hit', () => {
      this.analytics.cacheHits++
      this.saveAnalytics()
    })
  }

  trackPushNotificationEnabled(enabled: boolean) {
    this.analytics.pushNotificationsEnabled = enabled
    this.saveAnalytics()
  }

  getAnalytics(): PWAAnalytics {
    return { ...this.analytics }
  }

  private saveAnalytics() {
    try {
      localStorage.setItem('pwa-analytics', JSON.stringify(this.analytics))
    } catch (error) {
      console.warn('PWA: Failed to save analytics:', error)
    }
  }

  private loadAnalytics() {
    try {
      const saved = localStorage.getItem('pwa-analytics')
      if (saved) {
        this.analytics = { ...this.analytics, ...JSON.parse(saved) }
      }
    } catch (error) {
      console.warn('PWA: Failed to load analytics:', error)
    }
  }
}

// Main PWA Manager
export class PWAManager {
  public installManager: PWAInstallManager
  public notificationManager: PushNotificationManager
  public geolocationManager: GeolocationManager
  public offlineManager: OfflineManager
  public analyticsTracker: PWAAnalyticsTracker

  constructor(vapidPublicKey: string) {
    this.installManager = new PWAInstallManager()
    this.notificationManager = new PushNotificationManager(vapidPublicKey)
    this.geolocationManager = new GeolocationManager()
    this.offlineManager = new OfflineManager()
    this.analyticsTracker = new PWAAnalyticsTracker()
  }

  async init(): Promise<void> {
    // Register service worker if not already registered
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        })

        console.log('PWA: Service worker registered:', registration.scope)

        // Handle service worker updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available
                window.dispatchEvent(new CustomEvent('pwa-update-available', {
                  detail: { registration }
                }))
              }
            })
          }
        })
      } catch (error) {
        console.error('PWA: Service worker registration failed:', error)
      }
    }
  }

  async updateServiceWorker(): Promise<void> {
    const registration = await navigator.serviceWorker.ready
    await registration.update()
  }

  // Send local notification (for demo/testing)
  async sendLocalNotification(data: PushNotificationData): Promise<void> {
    if (Notification.permission === 'granted') {
      const notification = new Notification(data.title, {
        body: data.body,
        icon: data.icon || '/images/og-image.svg',
        badge: data.badge || '/images/og-image.svg',
        tag: data.tag,
        requireInteraction: data.requireInteraction,
        data: data.data
      } as any)

      notification.onclick = () => {
        window.focus()
        if (data.data?.url) {
          window.location.href = data.data.url
        }
        notification.close()
      }
    }
  }
}

// Initialize PWA Manager (VAPID key should be in environment variables)
export const pwaManager = new PWAManager(process.env.VAPID_PUBLIC_KEY || '')

// PWA Manager is available as a named export
