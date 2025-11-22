import { Metadata } from 'next'
import { Trophy, Utensils, Star, Award } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import { getTop100Restaurants } from '@/data/pittsburghTop100'
import RestaurantsClient from './RestaurantsClient'

export const metadata: Metadata = {
  title: 'Top 100 Restaurants in Pittsburgh | Best Dining Rankings',
  description: 'Discover Pittsburgh\'s top 100 restaurants ranked by ratings, reviews, and expert curation. Find the best fine dining, casual spots, and hidden gems.',
  keywords: 'Pittsburgh top restaurants, best restaurants, fine dining, restaurant rankings, top 100',
  openGraph: {
    title: 'Top 100 Restaurants in Pittsburgh | Best Dining',
    description: 'The definitive ranking of Pittsburgh\'s best restaurants.',
    images: [
      {
        url: '/images/top100/restaurants-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Top 100 restaurants in Pittsburgh'
      }
    ]
  }
}

export default function Top100RestaurantsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Top 100 Restaurants in Pittsburgh",
    "description": "The definitive ranking of Pittsburgh's best restaurants.",
    "url": "https://pittsburgheverything.com/top-100/restaurants",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allRestaurants = getTop100Restaurants()
  const totalRestaurants = allRestaurants.length
  const avgRating = allRestaurants.reduce((sum, r) => sum + r.rating, 0) / totalRestaurants
  const totalReviews = allRestaurants.reduce((sum, r) => sum + r.reviewCount, 0)
  const verifiedCount = allRestaurants.filter(r => r.verified).length

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Top 100 Restaurants in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              The definitive ranking of Pittsburgh's best dining experiences. From fine dining to hidden gems, discover where Pittsburgh eats best.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{totalRestaurants}</div>
                <div className="text-sm opacity-75">Top Restaurants</div>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
                <div className="text-sm opacity-75">Avg Rating</div>
              </div>
              <div className="text-center">
                <Utensils className="w-8 h-8 mx-auto mb-2 text-white" />
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

      <RestaurantsClient />
    </div>
  )
}

