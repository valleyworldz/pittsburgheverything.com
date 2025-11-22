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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 text-orange-200 hover:text-white transition-colors mb-6"
          >
            ← Back to Restaurants
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Coffee className="w-16 h-16 text-orange-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="text-orange-200">Brunch</span> in Pittsburgh
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Start your weekend right with Pittsburgh\'s best brunch spots. From bottomless mimosas to creative breakfast dishes, discover where to brunch in the Steel City.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Coffee className="w-4 h-4" />
                {restaurants.length} Brunch Spots
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Utensils className="w-4 h-4" />
                Weekend Favorites
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

