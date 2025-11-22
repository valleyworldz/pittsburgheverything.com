import { Metadata } from 'next'
import { Bed, Star, MapPin, Award } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import { getAllHotels } from '@/data/pittsburghVisitors'
import StayClient from './StayClient'

export const metadata: Metadata = {
  title: 'Where to Stay in Pittsburgh | Hotels & Accommodations Guide',
  description: 'Find the best hotels and accommodations in Pittsburgh. From luxury to budget-friendly, discover where to stay for your visit.',
  keywords: 'Pittsburgh hotels, accommodations, where to stay, hotels downtown, Pittsburgh lodging',
  openGraph: {
    title: 'Where to Stay in Pittsburgh | Hotels & Accommodations',
    description: 'Find the best hotels and accommodations in Pittsburgh.',
    images: [
      {
        url: '/images/visitors/hotels-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Hotels in Pittsburgh'
      }
    ]
  }
}

export default function WhereToStayPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Where to Stay in Pittsburgh",
    "description": "Find the best hotels and accommodations in Pittsburgh.",
    "url": "https://pittsburgheverything.com/visitors/stay",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allHotels = getAllHotels()
  const totalHotels = allHotels.length
  const avgRating = allHotels.reduce((sum, h) => sum + h.rating, 0) / totalHotels
  const totalReviews = allHotels.reduce((sum, h) => sum + h.reviewCount, 0)
  const featuredCount = allHotels.filter(h => h.featured).length

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Where to Stay in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Find the perfect accommodation for your Pittsburgh visit. From luxury hotels to budget-friendly options, we've got you covered.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Bed className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{totalHotels}</div>
                <div className="text-sm opacity-75">Hotels</div>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
                <div className="text-sm opacity-75">Avg Rating</div>
              </div>
              <div className="text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{(totalReviews / 1000).toFixed(1)}K</div>
                <div className="text-sm opacity-75">Reviews</div>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{featuredCount}</div>
                <div className="text-sm opacity-75">Featured</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StayClient />
    </div>
  )
}

