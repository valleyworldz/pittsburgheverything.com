import { Metadata } from 'next'
import { getAllNeighborhoods, pittsburghRestaurants } from '@/data/pittsburghRestaurants'
import StructuredData from '@/components/StructuredData'
import NeighborhoodsClient from './NeighborhoodsClient'

export const metadata: Metadata = {
  title: 'Restaurants by Neighborhood in Pittsburgh | Dining by Area | PittsburghEverything',
  description: 'Explore Pittsburgh restaurants organized by neighborhood. Find the best dining in Strip District, Lawrenceville, Shadyside, Oakland, South Side, and more.',
  keywords: 'Pittsburgh restaurants by neighborhood, Strip District restaurants, Lawrenceville restaurants, Shadyside restaurants, Oakland restaurants',
  openGraph: {
    title: 'Restaurants by Neighborhood in Pittsburgh',
    description: 'Discover the best restaurants in each Pittsburgh neighborhood.',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 630, alt: 'Pittsburgh Restaurants by Neighborhood' }]
  }
}

export default function NeighborhoodsPage() {
  const neighborhoods = getAllNeighborhoods()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Restaurants by Neighborhood in Pittsburgh",
    "description": "Restaurants organized by neighborhood in Pittsburgh, Pennsylvania",
    "numberOfItems": neighborhoods.length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />
      <NeighborhoodsClient />
    </div>
  )
}

