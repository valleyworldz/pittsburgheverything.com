import { Metadata } from 'next'
import { Calendar, FileText, Award, CheckCircle } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import { getWeekendGuides } from '@/data/pittsburghGuides'
import WeekendGuidesClient from './WeekendGuidesClient'

export const metadata: Metadata = {
  title: 'Weekend Guides to Pittsburgh | Perfect Weekend Itineraries',
  description: 'Discover weekend guides to Pittsburgh with perfect itineraries for romantic getaways, family fun, adventure, and more.',
  keywords: 'Pittsburgh weekend guides, weekend itineraries, weekend getaways, weekend activities',
  openGraph: {
    title: 'Weekend Guides to Pittsburgh | Perfect Weekend Itineraries',
    description: 'Weekend guides with perfect itineraries for Pittsburgh.',
    images: [
      {
        url: '/images/guides/weekend-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Weekend guides to Pittsburgh'
      }
    ]
  }
}

export default function WeekendGuidesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Weekend Guides to Pittsburgh",
    "description": "Weekend guides with perfect itineraries for Pittsburgh.",
    "url": "https://pittsburgheverything.com/guides/weekend",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allGuides = getWeekendGuides()
  const totalGuides = allGuides.length
  const featuredCount = allGuides.filter(g => g.featured).length
  const verifiedCount = allGuides.filter(g => g.verified).length
  const totalReadingTime = allGuides.reduce((sum, g) => sum + g.readingTime, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Weekend Guides to Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Plan the perfect weekend in Pittsburgh with our curated guides. From romantic getaways to family adventures, find the ideal weekend itinerary.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{totalGuides}</div>
                <div className="text-sm opacity-75">Weekend Guides</div>
              </div>
              <div className="text-center">
                <FileText className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{totalReadingTime}+</div>
                <div className="text-sm opacity-75">Min Read</div>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{featuredCount}</div>
                <div className="text-sm opacity-75">Featured</div>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{verifiedCount}</div>
                <div className="text-sm opacity-75">Verified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WeekendGuidesClient />
    </div>
  )
}

