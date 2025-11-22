import { Metadata } from 'next'
import { Trophy, Building2, Star, Award } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import { getTop100Businesses } from '@/data/pittsburghTop100'
import BusinessesClient from './BusinessesClient'

export const metadata: Metadata = {
  title: 'Top 100 Local Businesses in Pittsburgh | Best Business Rankings',
  description: 'Discover Pittsburgh\'s top 100 local businesses ranked by ratings, reviews, and expert curation. Support local and find the best shops, services, and more.',
  keywords: 'Pittsburgh top businesses, local businesses, best shops, small business, top 100',
  openGraph: {
    title: 'Top 100 Local Businesses in Pittsburgh | Best Businesses',
    description: 'The definitive ranking of Pittsburgh\'s best local businesses.',
    images: [
      {
        url: '/images/top100/businesses-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Top 100 local businesses in Pittsburgh'
      }
    ]
  }
}

export default function Top100BusinessesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Top 100 Local Businesses in Pittsburgh",
    "description": "The definitive ranking of Pittsburgh's best local businesses.",
    "url": "https://pittsburgheverything.com/top-100/businesses",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allBusinesses = getTop100Businesses()
  const totalBusinesses = allBusinesses.length
  const avgRating = allBusinesses.reduce((sum, b) => sum + b.rating, 0) / totalBusinesses
  const totalReviews = allBusinesses.reduce((sum, b) => sum + b.reviewCount, 0)
  const verifiedCount = allBusinesses.filter(b => b.verified).length

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Top 100 Local Businesses in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              The definitive ranking of Pittsburgh's best local businesses. Support local and discover the shops, services, and businesses that make Pittsburgh great.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{totalBusinesses}</div>
                <div className="text-sm opacity-75">Top Businesses</div>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
                <div className="text-sm opacity-75">Avg Rating</div>
              </div>
              <div className="text-center">
                <Building2 className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{(totalReviews / 1000).toFixed(1)}K</div>
                <div className="text-sm opacity-75">Reviews</div>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{verifiedCount}</div>
                <div className="text-sm opacity-75">Verified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BusinessesClient />
    </div>
  )
}

