import type { Metadata } from 'next'
import { getAllApartments } from '@/data/pittsburghHousing'
import ApartmentsClient from './ApartmentsClient'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Pittsburgh Apartments for Rent | Find Your Perfect Home | PittsburghEverything',
  description: 'Search hundreds of apartments for rent in Pittsburgh. Filter by neighborhood, price, bedrooms, and amenities. Find your perfect Pittsburgh apartment.',
  keywords: 'Pittsburgh apartments, apartments for rent, Pittsburgh housing, rental listings, Pittsburgh real estate',
  openGraph: {
    title: 'Pittsburgh Apartments for Rent | PittsburghEverything',
    description: 'Find your perfect apartment in Pittsburgh. Search by neighborhood, price, and amenities.',
    images: [
      {
        url: '/images/housing/pittsburgh-apartments.jpg',
        width: 1200,
        height: 630,
        alt: 'Pittsburgh apartments for rent'
      }
    ]
  }
}

export default function ApartmentsPage() {
  const allApartments = getAllApartments()
  const totalListings = allApartments.length
  const avgRent = Math.round(
    allApartments.reduce((sum, apt) => {
      const rents = Object.values(apt.rent).filter(r => r !== undefined) as number[]
      return sum + (rents.length > 0 ? Math.min(...rents) : 0)
    }, 0) / totalListings
  )

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Pittsburgh Apartments for Rent",
    "description": "Comprehensive list of apartments for rent in Pittsburgh",
    "numberOfItems": totalListings,
    "itemListElement": allApartments.map((apt, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Apartment",
        "name": apt.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": apt.address,
          "addressLocality": apt.neighborhood,
          "addressRegion": "PA",
          "postalCode": apt.zipCode
        },
        "priceRange": `$${Math.min(...Object.values(apt.rent).filter(r => r !== undefined) as number[])} - $${Math.max(...Object.values(apt.rent).filter(r => r !== undefined) as number[])}`,
        "amenityFeature": apt.amenities.map(amenity => ({
          "@type": "LocationFeatureSpecification",
          "name": amenity
        }))
      }
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Pittsburgh Apartments for Rent
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Find your perfect apartment in Pittsburgh. Search {totalListings}+ listings by neighborhood, price, and amenities.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{totalListings}+</div>
                <div className="text-sm opacity-75">Listings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">${avgRent}</div>
                <div className="text-sm opacity-75">Avg Rent</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">21+</div>
                <div className="text-sm opacity-75">Neighborhoods</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-sm opacity-75">Verified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apartments Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ApartmentsClient />
        </div>
      </section>
    </div>
  )
}

