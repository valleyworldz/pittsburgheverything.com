import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pittsburgheverything.com'

  // Static pages
  const staticPages = [
    '',
    '/events',
    '/restaurants',
    '/services',
    '/neighborhoods',
    '/deals',
    '/things-to-do',
    '/top-100',
    '/about',
    '/contact',
    '/blog',
    '/newsletter',
    '/careers',
    '/press',
    '/help',
    '/privacy',
    '/terms',
    '/cookies',
    '/accessibility',
    '/sitemap',
    '/api-docs',
    '/submit-business',
    '/advertise',
    '/dashboard',
    '/analytics',
    '/reviews',
    '/integrations',
  ]

  // Dynamic content
  const events = [
    '/events/pittsburgh-food-festival-2025',
    '/events/steelers-vs-browns-2025',
    '/events/christmas-tree-lighting-2025',
    '/events/three-rivers-arts-festival-2025',
    '/events/pittsburgh-marathon-2025',
    '/events/restaurant-week-2025',
    '/events/holiday-market-2025',
    '/events/pittsburgh-film-festival-2025',
  ]

  const restaurants = [
    '/restaurants/primanti-bros',
    '/restaurants/the-porch',
    '/restaurants/fat-heads',
    '/restaurants/monterey-bay',
    '/restaurants/aiellos',
  ]

  const neighborhoods = [
    '/neighborhoods/downtown',
    '/neighborhoods/oakland',
    '/neighborhoods/south-side',
    '/neighborhoods/shadyside',
    '/neighborhoods/lawrenceville',
    '/neighborhoods/strip-district',
  ]

  const services = [
    '/services/restaurants',
    '/services/bars',
    '/services/attractions',
    '/services/hotels',
    '/services/shopping',
    '/services/healthcare',
    '/services/education',
    '/services/government',
  ]

  // Combine all URLs
  const allUrls = [
    ...staticPages,
    ...events,
    ...restaurants,
    ...neighborhoods,
    ...services,
  ]

  return allUrls.map((url) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency: url.includes('/events/') || url.includes('/deals') ? 'weekly' :
                     url.includes('/restaurants/') || url.includes('/services/') ? 'monthly' :
                     'yearly',
    priority: url === '' ? 1.0 :
             url.includes('/events/') || url.includes('/restaurants/') ? 0.8 :
             url.includes('/neighborhoods/') || url.includes('/services/') ? 0.7 :
             0.5,
  }))
}
