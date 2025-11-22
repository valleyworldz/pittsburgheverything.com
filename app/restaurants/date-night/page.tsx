import { Metadata } from 'next'
import { getDateNightRestaurants } from '@/data/pittsburghRestaurants'
import StructuredData from '@/components/StructuredData'
import DateNightClient from './DateNightClient'

export const metadata: Metadata = {
  title: 'Date Night Restaurants in Pittsburgh | Romantic Dining | PittsburghEverything',
  description: 'Discover the best date night restaurants in Pittsburgh including fine dining, romantic spots, and special occasion destinations. Perfect restaurants for anniversaries, proposals, and romantic dinners.',
  keywords: 'date night restaurants Pittsburgh, romantic dining, fine dining Pittsburgh, special occasion restaurants, anniversary dinner',
  openGraph: {
    title: 'Date Night Restaurants in Pittsburgh',
    description: 'Discover Pittsburgh\'s most romantic and special occasion restaurants.',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 630, alt: 'Pittsburgh Date Night Restaurants' }]
  }
}

export default function DateNightPage() {
  const restaurants = getDateNightRestaurants()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Date Night Restaurants in Pittsburgh",
    "description": "Romantic and special occasion restaurants in Pittsburgh, Pennsylvania",
    "numberOfItems": restaurants.length,
    "itemListElement": restaurants.map((restaurant, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Restaurant",
        "name": restaurant.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": restaurant.location.address,
          "addressLocality": restaurant.location.neighborhood,
          "addressRegion": "PA",
          "addressCountry": "US"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": restaurant.rating,
          "reviewCount": restaurant.reviewCount || 0
        },
        "priceRange": restaurant.priceRange
      }
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />
      <DateNightClient />
    </div>
  )
}

