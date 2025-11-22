import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://pittsburgheverything.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/dashboard/',
          '/analytics/',
          '/api/private/',
          '/api/admin/',
          '/devdash/',
          '/_next/',
          '/api/debug/',
          '/staging/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/dashboard/',
          '/analytics/',
          '/api/private/',
          '/api/admin/',
          '/devdash/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/dashboard/',
          '/analytics/',
          '/api/private/',
          '/api/admin/',
          '/devdash/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
