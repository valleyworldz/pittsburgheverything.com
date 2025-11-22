import { Metadata } from 'next'
import { Trophy, Wine, Star, Award } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import { getTop100Bars } from '@/data/pittsburghTop100'
import BarsClient from './BarsClient'

export const metadata: Metadata = {
  title: 'Top 100 Bars & Nightlife in Pittsburgh | Best Bars Rankings',
  description: 'Discover Pittsburgh\'s top 100 bars and nightlife spots ranked by ratings, reviews, and expert curation. Find the best cocktail bars, sports bars, and nightclubs.',
  keywords: 'Pittsburgh top bars, best bars, nightlife, cocktail bars, sports bars, top 100',
  openGraph: {
    title: 'Top 100 Bars & Nightlife in Pittsburgh | Best Bars',
    description: 'The definitive ranking of Pittsburgh\'s best bars and nightlife.',
    images: [
      {
        url: '/images/top100/bars-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Top 100 bars in Pittsburgh'
      }
    ]
  }
}

export default function Top100BarsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Top 100 Bars & Nightlife in Pittsburgh",
    "description": "The definitive ranking of Pittsburgh's best bars and nightlife.",
    "url": "https://pittsburgheverything.com/top-100/bars",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allBars = getTop100Bars()
  const totalBars = allBars.length
  const avgRating = allBars.reduce((sum, b) => sum + b.rating, 0) / totalBars
  const totalReviews = allBars.reduce((sum, b) => sum + b.reviewCount, 0)
  const verifiedCount = allBars.filter(b => b.verified).length

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      <section className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Top 100 Bars & Nightlife in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              The definitive ranking of Pittsburgh's best bars, cocktail lounges, and nightlife spots. From craft cocktails to sports bars, discover where Pittsburgh drinks best.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{totalBars}</div>
                <div className="text-sm opacity-75">Top Bars</div>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
                <div className="text-sm opacity-75">Avg Rating</div>
              </div>
              <div className="text-center">
                <Wine className="w-8 h-8 mx-auto mb-2 text-white" />
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

      <BarsClient />
    </div>
  )
}

