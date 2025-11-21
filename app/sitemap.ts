import { MetadataRoute } from 'next'
import { ALL_PITTSBURGH_LOCATIONS } from '@/data/pittsburgh-locations'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pittsburgheverything.com'

  // Static pages with SEO priority optimization
  const staticPages = [
    { route: '', priority: 1.0, frequency: 'daily' as const },
    { route: '/restaurants', priority: 0.9, frequency: 'daily' as const },
    { route: '/events', priority: 0.9, frequency: 'daily' as const },
    { route: '/deals', priority: 0.8, frequency: 'daily' as const },
    { route: '/neighborhoods', priority: 0.8, frequency: 'weekly' as const },
    { route: '/services', priority: 0.8, frequency: 'weekly' as const },
    { route: '/things-to-do', priority: 0.8, frequency: 'daily' as const },
    { route: '/top-100', priority: 0.7, frequency: 'weekly' as const },
    { route: '/submit-business', priority: 0.6, frequency: 'monthly' as const },
    { route: '/about', priority: 0.5, frequency: 'monthly' as const },
    { route: '/contact', priority: 0.6, frequency: 'monthly' as const },
    { route: '/privacy', priority: 0.3, frequency: 'yearly' as const },
    { route: '/terms', priority: 0.3, frequency: 'yearly' as const },
    { route: '/cookies', priority: 0.3, frequency: 'yearly' as const },
    { route: '/accessibility', priority: 0.3, frequency: 'yearly' as const },
    { route: '/dashboard', priority: 0.4, frequency: 'weekly' as const },
    { route: '/dashboard/reviews', priority: 0.4, frequency: 'weekly' as const },
    { route: '/dashboard/integrations', priority: 0.4, frequency: 'weekly' as const },
    { route: '/admin/outreach', priority: 0.1, frequency: 'weekly' as const }
  ].map(({ route, priority, frequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: frequency,
    priority
  }))

  // Location pages - High priority for local SEO domination
  const locationPages = ALL_PITTSBURGH_LOCATIONS.map(location => ({
    url: `${baseUrl}/locations/${location.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: location.type === 'neighborhood' ? 0.8 : 0.7
  }))

  // Dynamic restaurant pages
  const restaurantPages = [
    'primanti-bros',
    'the-porch',
    'fat-heads',
    'monterey-bay',
    'aiellos'
  ].map(slug => ({
    url: `${baseUrl}/restaurants/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }))

  // Dynamic event pages
  const eventPages = [
    'pittsburgh-food-festival-2025',
    'steelers-vs-browns-2025',
    'christmas-tree-lighting-2025',
    'three-rivers-arts-festival-2025',
    'pittsburgh-marathon-2025',
    'restaurant-week-2025',
    'holiday-market-2025',
    'pittsburgh-film-festival-2025'
  ].map(slug => ({
    url: `${baseUrl}/events/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6
  }))

  // Service category pages
  const servicePages = [
    '/services/restaurants',
    '/services/bars',
    '/services/attractions',
    '/services/hotels',
    '/services/shopping',
    '/services/healthcare',
    '/services/education',
    '/services/government'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6
  }))

  // Utility pages
  const utilityPages = [
    { route: '/sitemap.xml', priority: 0.3 },
    { route: '/robots.txt', priority: 0.3 }
  ].map(({ route, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority
  }))

  // Combine and sort by priority for SEO optimization
  return [
    ...staticPages,
    ...locationPages,
    ...restaurantPages,
    ...eventPages,
    ...servicePages,
    ...utilityPages
  ].sort((a, b) => b.priority - a.priority)
}
