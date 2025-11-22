import { Metadata } from 'next'
import { getNewOpeningsRestaurants } from '@/data/pittsburghRestaurants'
import StructuredData from '@/components/StructuredData'
import NewOpeningsClient from './NewOpeningsClient'

export const metadata: Metadata = {
  title: 'New Restaurant Openings in Pittsburgh | Latest Restaurants | PittsburghEverything',
  description: 'Discover the newest restaurant openings in Pittsburgh. Stay up-to-date with the latest dining spots, chef-driven concepts, and exciting new additions to Pittsburgh\'s food scene.',
  keywords: 'new restaurants Pittsburgh, restaurant openings, new dining spots, latest restaurants, recently opened restaurants',
  openGraph: {
    title: 'New Restaurant Openings in Pittsburgh',
    description: 'Discover the latest restaurant openings and newest dining spots in Pittsburgh.',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 630, alt: 'New Pittsburgh Restaurants' }]
  }
}

export default function NewOpeningsPage() {
  const restaurants = getNewOpeningsRestaurants()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "New Restaurant Openings in Pittsburgh",
    "description": "Recently opened restaurants in Pittsburgh, Pennsylvania",
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
        "priceRange": restaurant.priceRange,
        "openingDate": restaurant.openingDate
      }
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />
      <NewOpeningsClient />
    </div>
  )
}

