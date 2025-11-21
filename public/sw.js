// Service Worker for PittsburghEverything.com PWA
// Enables offline functionality, caching, and push notifications

const CACHE_NAME = 'pittsburgheverything-v1'
const STATIC_CACHE = 'pittsburgheverything-static-v1'
const DYNAMIC_CACHE = 'pittsburgheverything-dynamic-v1'
const API_CACHE = 'pittsburgheverything-api-v1'

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/images/og-image.svg',
  '/images/placeholder-restaurant.svg',
  '/images/placeholder-event.svg',
  '/images/placeholder-deal.svg',
  '/offline.html'
]

// API endpoints to cache
const API_ENDPOINTS = [
  '/api/businesses',
  '/api/events',
  '/api/deals',
  '/api/reviews',
  '/api/reviews/stats'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Service Worker: Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE && cacheName !== API_CACHE) {
              console.log('Service Worker: Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      }),
      // Take control of all clients immediately
      self.clients.claim()
    ])
  )
})

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request))
    return
  }

  // Handle page requests (navigation)
  if (request.mode === 'navigate') {
    event.respondWith(handlePageRequest(request))
    return
  }

  // Handle static assets and other requests
  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          return response
        }

        return fetch(request)
          .then(response => {
            // Cache successful GET requests
            if (request.method === 'GET' && response.status === 200) {
              const responseClone = response.clone()
              caches.open(DYNAMIC_CACHE).then(cache => {
                cache.put(request, responseClone)
              })
            }
            return response
          })
          .catch(() => {
            // Return offline fallback for failed requests
            if (request.destination === 'document') {
              return caches.match('/offline.html')
            }
          })
      })
  )
})

// Handle API requests with network-first strategy
async function handleApiRequest(request) {
  try {
    // Try network first
    const response = await fetch(request)

    // Cache successful responses
    if (response.status === 200) {
      const responseClone = response.clone()
      caches.open(API_CACHE).then(cache => {
        cache.put(request, responseClone)
      })
    }

    return response
  } catch (error) {
    // Fall back to cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // Return offline API response
    return new Response(
      JSON.stringify({
        error: 'Offline',
        message: 'You are currently offline. Some features may not be available.',
        offline: true
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

// Handle page requests with cache-first strategy
async function handlePageRequest(request) {
  try {
    // Try cache first for faster loading
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // Try network
    const response = await fetch(request)

    // Cache successful page responses
    if (response.status === 200) {
      const responseClone = response.clone()
      caches.open(DYNAMIC_CACHE).then(cache => {
        cache.put(request, responseClone)
      })
    }

    return response
  } catch (error) {
    // Return offline page
    return caches.match('/offline.html')
  }
}

// Push notification event
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received')

  let data = {}
  if (event.data) {
    data = event.data.json()
  }

  const options = {
    body: data.body || 'Check out the latest Pittsburgh updates!',
    icon: '/images/og-image.svg',
    badge: '/images/og-image.svg',
    image: data.image,
    data: {
      url: data.url || '/',
      type: data.type || 'general'
    },
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/images/og-image.svg'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ],
    requireInteraction: true,
    silent: false,
    tag: data.tag || 'pittsburgh-update',
    renotify: true
  }

  event.waitUntil(
    self.registration.showNotification(
      data.title || 'Pittsburgh Everything',
      options
    )
  )
})

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked')

  event.notification.close()

  if (event.action === 'dismiss') {
    return
  }

  const urlToOpen = event.notification.data?.url || '/'

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        // Check if we already have a window open
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus()
          }
        }

        // Open new window
        if (self.clients.openWindow) {
          return self.clients.openWindow(urlToOpen)
        }
      })
  )
})

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag)

  if (event.tag === 'background-sync-reviews') {
    event.waitUntil(syncPendingReviews())
  }

  if (event.tag === 'background-sync-events') {
    event.waitUntil(syncPendingEvents())
  }

  if (event.tag === 'background-sync-location') {
    event.waitUntil(syncLocationData())
  }
})

// Sync pending reviews when back online
async function syncPendingReviews() {
  try {
    const cache = await caches.open('pending-reviews')
    const keys = await cache.keys()

    for (const request of keys) {
      try {
        await fetch(request)
        await cache.delete(request)
      } catch (error) {
        console.error('Failed to sync review:', error)
      }
    }
  } catch (error) {
    console.error('Review sync failed:', error)
  }
}

// Sync pending events
async function syncPendingEvents() {
  try {
    const cache = await caches.open('pending-events')
    const keys = await cache.keys()

    for (const request of keys) {
      try {
        await fetch(request)
        await cache.delete(request)
      } catch (error) {
        console.error('Failed to sync event:', error)
      }
    }
  } catch (error) {
    console.error('Event sync failed:', error)
  }
}

// Sync location data
async function syncLocationData() {
  try {
    // Get current location and sync with server
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords

        try {
          await fetch('/api/location/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude })
          })
        } catch (error) {
          console.error('Location sync failed:', error)
        }
      })
    }
  } catch (error) {
    console.error('Location sync failed:', error)
  }
}

// Periodic background sync for content updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-update') {
    event.waitUntil(updateContentCache())
  }
})

async function updateContentCache() {
  try {
    // Update local business data
    const businessResponse = await fetch('/api/businesses?updated_since=' + Date.now())
    if (businessResponse.ok) {
      const businesses = await businessResponse.json()
      await caches.open('business-data').then(cache => {
        cache.put('/api/businesses', new Response(JSON.stringify(businesses)))
      })
    }

    // Update events data
    const eventsResponse = await fetch('/api/events?updated_since=' + Date.now())
    if (eventsResponse.ok) {
      const events = await eventsResponse.json()
      await caches.open('events-data').then(cache => {
        cache.put('/api/events', new Response(JSON.stringify(events)))
      })
    }
  } catch (error) {
    console.error('Content update failed:', error)
  }
}

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  const { type, data } = event.data

  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting()
      break

    case 'GET_VERSION':
      event.ports[0].postMessage({ version: '1.0.0' })
      break

    case 'CACHE_REVIEW':
      cachePendingReview(data)
      break

    case 'CACHE_EVENT':
      cachePendingEvent(data)
      break

    default:
      console.log('Unknown message type:', type)
  }
})

async function cachePendingReview(reviewData) {
  const request = new Request('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData)
  })

  const cache = await caches.open('pending-reviews')
  await cache.put(request, new Response(JSON.stringify({ queued: true })))
}

async function cachePendingEvent(eventData) {
  const request = new Request('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData)
  })

  const cache = await caches.open('pending-events')
  await cache.put(request, new Response(JSON.stringify({ queued: true })))
}