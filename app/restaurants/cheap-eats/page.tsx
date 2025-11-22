import { Metadata } from 'next'
import { getCheapEatsRestaurants } from '@/data/pittsburghRestaurants'
import StructuredData from '@/components/StructuredData'
import CheapEatsClient from './CheapEatsClient'

export const metadata: Metadata = {
  title: 'Cheap Eats in Pittsburgh | Budget-Friendly Restaurants | PittsburghEverything',
  description: 'Discover affordable restaurants in Pittsburgh including Fiori\'s Pizza, Peppi\'s, Noodlehead, Aiello\'s, and more. Great food that won\'t break the bank.',
  keywords: 'cheap eats Pittsburgh, budget restaurants, affordable dining, cheap food Pittsburgh, $ restaurants',
  openGraph: {
    title: 'Cheap Eats in Pittsburgh',
    description: 'Discover affordable and budget-friendly restaurants in Pittsburgh.',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 630, alt: 'Pittsburgh Cheap Eats' }]
  }
}

export default function CheapEatsPage() {
  const restaurants = getCheapEatsRestaurants()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Cheap Eats in Pittsburgh",
    "description": "Affordable and budget-friendly restaurants in Pittsburgh, Pennsylvania",
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
      <CheapEatsClient />
    </div>
  )
}

