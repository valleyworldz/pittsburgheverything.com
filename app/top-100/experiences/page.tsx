import { Metadata } from 'next'
import { Trophy, MapPin, Star, Award } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import { getTop100Experiences } from '@/data/pittsburghTop100'
import ExperiencesClient from './ExperiencesClient'

export const metadata: Metadata = {
  title: 'Top 100 Experiences in Pittsburgh | Best Attractions & Activities',
  description: 'Discover Pittsburgh\'s top 100 experiences ranked by ratings, reviews, and expert curation. Find the best attractions, museums, outdoor activities, and more.',
  keywords: 'Pittsburgh top experiences, best attractions, things to do, museums, activities, top 100',
  openGraph: {
    title: 'Top 100 Experiences in Pittsburgh | Best Attractions',
    description: 'The definitive ranking of Pittsburgh\'s best experiences and attractions.',
    images: [
      {
        url: '/images/top100/experiences-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Top 100 experiences in Pittsburgh'
      }
    ]
  }
}

export default function Top100ExperiencesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Top 100 Experiences in Pittsburgh",
    "description": "The definitive ranking of Pittsburgh's best experiences and attractions.",
    "url": "https://pittsburgheverything.com/top-100/experiences",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allExperiences = getTop100Experiences()
  const totalExperiences = allExperiences.length
  const avgRating = allExperiences.reduce((sum, e) => sum + e.rating, 0) / totalExperiences
  const totalReviews = allExperiences.reduce((sum, e) => sum + e.reviewCount, 0)
  const verifiedCount = allExperiences.filter(e => e.verified).length

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Top 100 Experiences in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              The definitive ranking of Pittsburgh's best experiences. From world-class museums to scenic attractions, discover what makes Pittsburgh special.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{totalExperiences}</div>
                <div className="text-sm opacity-75">Top Experiences</div>
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
                <div className="text-2xl font-bold">{verifiedCount}</div>
                <div className="text-sm opacity-75">Verified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ExperiencesClient />
    </div>
  )
}

