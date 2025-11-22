import { Metadata } from 'next'
import { getBrunchRestaurants } from '@/data/pittsburghRestaurants'
import StructuredData from '@/components/StructuredData'
import BrunchClient from './BrunchClient'

export const metadata: Metadata = {
  title: 'Best Brunch in Pittsburgh | Weekend Brunch Spots | PittsburghEverything',
  description: 'Discover the best brunch restaurants in Pittsburgh including The Porch at Schenley, Walnut Grill, Pamela\'s Diner, and more. Weekend brunch spots with bottomless mimosas and creative menus.',
  keywords: 'brunch Pittsburgh, weekend brunch, best brunch, bottomless mimosas, breakfast restaurants Pittsburgh',
  openGraph: {
    title: 'Best Brunch in Pittsburgh',
    description: 'Discover Pittsburgh\'s best brunch spots for weekend dining.',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 630, alt: 'Pittsburgh Brunch Restaurants' }]
  }
}

export default function BrunchPage() {
  const restaurants = getBrunchRestaurants()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Best Brunch Restaurants in Pittsburgh",
    "description": "Brunch restaurants and weekend breakfast spots in Pittsburgh, Pennsylvania",
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
      <BrunchClient />
    </div>
  )
}

