"use client"

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { siteConfig } from '@/config/site'

interface StructuredDataProps {
  type?: 'WebSite' | 'Organization' | 'LocalBusiness' | 'BreadcrumbList' | 'Article' | 'Event' | 'Restaurant'
  data?: Record<string, any>
}

export default function StructuredData({ type = 'WebSite', data }: StructuredDataProps) {
  const pathname = usePathname()

  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
    }

    switch (type) {
      case 'WebSite':
        return {
          ...baseData,
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description,
          publisher: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: siteConfig.url,
            logo: {
              '@type': 'ImageObject',
              url: `${siteConfig.url}${siteConfig.ogImage}`,
            },
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        }

      case 'Organization':
        return {
          ...baseData,
          name: siteConfig.name,
          url: siteConfig.url,
          logo: `${siteConfig.url}${siteConfig.ogImage}`,
          description: siteConfig.description,
          address: {
            '@type': 'PostalAddress',
            streetAddress: siteConfig.contact.address,
            addressLocality: 'Pittsburgh',
            addressRegion: 'PA',
            postalCode: '15201',
            addressCountry: 'US',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: siteConfig.contact.phone,
            contactType: 'customer service',
            email: siteConfig.contact.email,
          },
          sameAs: [
            siteConfig.social.facebook,
            siteConfig.social.twitter,
            siteConfig.social.instagram,
            siteConfig.social.linkedin,
          ],
        }

      case 'LocalBusiness':
        return {
          ...baseData,
          '@type': 'LocalBusiness',
          name: siteConfig.name,
          image: `${siteConfig.url}${siteConfig.ogImage}`,
          '@id': siteConfig.url,
          url: siteConfig.url,
          telephone: siteConfig.contact.phone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: siteConfig.contact.address,
            addressLocality: 'Pittsburgh',
            addressRegion: 'PA',
            postalCode: '15201',
            addressCountry: 'US',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 40.4406,
            longitude: -79.9959,
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '17:00',
          },
        }

      case 'BreadcrumbList':
        if (!data?.items) return null
        return {
          ...baseData,
          itemListElement: data.items.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        }

      default:
        return { ...baseData, ...data }
    }
  }

  const structuredData = getStructuredData()

  if (!structuredData) {
    return null
  }

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}