// Service Worker for PittsburghEverything PWA
const CACHE_NAME = 'pittsburgheverything-v1.0.0'
const STATIC_CACHE = 'pittsburgheverything-static-v1.0.0'
const API_CACHE = 'pittsburgheverything-api-v1.0.0'

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/manifest.json',
  '/images/og-image.svg',
  '/images/placeholder-restaurant.svg',
  '/images/placeholder-event.svg',
  '/images/placeholder-deal.svg',
  '/images/default-business.svg'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_FILES)
      })
      .then(() => {
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== API_CACHE) {
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      return self.clients.claim()
    })
  )
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(API_CACHE).then((cache) => {
        return fetch(request)
          .then((response) => {
            // Cache successful API responses for 5 minutes
            if (response.status === 200) {
              cache.put(request, response.clone())
            }
            return response
          })
          .catch(() => {
            // Return cached API response if available
            return cache.match(request)
          })
      })
    )
    return
  }

  // Handle image requests
  if (url.pathname.startsWith('/images/') ||
      url.hostname.includes('images.unsplash.com') ||
      url.hostname.includes('maps.googleapis.com')) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.match(request)
          .then((response) => {
            if (response) {
              return response
            }
            return fetch(request).then((response) => {
              if (response.status === 200) {
                cache.put(request, response.clone())
              }
              return response
            })
          })
      })
    )
    return
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful navigation responses
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseClone)
            })
          }
          return response
        })
        .catch(() => {
          // Return cached page or offline fallback
          return caches.match(request)
            .then((response) => {
              return response || caches.match('/')
            })
        })
    )
    return
  }

  // Default: try cache first, then network
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          return response
        }
        return fetch(request).then((response) => {
          // Don't cache error responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }

          const responseClone = response.clone()
          caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseClone)
            })

          return response
        })
      })
  )
})

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  // Handle offline actions when connection is restored
  try {
    const cache = await caches.open(API_CACHE)
    const keys = await cache.keys()

    for (const request of keys) {
      if (request.url.includes('/api/reviews') ||
          request.url.includes('/api/email')) {
        try {
          await fetch(request)
        } catch (error) {
          console.error('Background sync failed:', error)
        }
      }
    }
  } catch (error) {
    console.error('Background sync error:', error)
  }
}

// Push notifications (for future implementation)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/images/og-image.svg',
      badge: '/images/og-image.svg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    }

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  )
})
