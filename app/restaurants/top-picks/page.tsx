import { Metadata } from 'next'
import { getTopPicksRestaurants } from '@/data/pittsburghRestaurants'
import StructuredData from '@/components/StructuredData'
import TopPicksClient from './TopPicksClient'

export const metadata: Metadata = {
  title: 'Top Restaurant Picks in Pittsburgh | Best Dining | PittsburghEverything',
  description: 'Discover Pittsburgh\'s top-rated restaurants including Primanti Bros, The Porch at Schenley, Eleven, Fat Head\'s, and more. The best dining experiences in the Steel City.',
  keywords: 'best restaurants Pittsburgh, top restaurants, highest rated restaurants, Pittsburgh dining, fine dining Pittsburgh',
  openGraph: {
    title: 'Top Restaurant Picks in Pittsburgh',
    description: 'Discover the highest-rated and most popular restaurants in Pittsburgh.',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 630, alt: 'Top Pittsburgh Restaurants' }]
  }
}

export default function TopPicksPage() {
  const restaurants = getTopPicksRestaurants()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Top Restaurant Picks in Pittsburgh",
    "description": "Highest-rated and most popular restaurants in Pittsburgh, Pennsylvania",
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
      <TopPicksClient />
    </div>
  )
}
