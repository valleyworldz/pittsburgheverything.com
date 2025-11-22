import { Metadata } from 'next'
import { Calendar, FileText, Award, CheckCircle } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import { getSeasonalGuides } from '@/data/pittsburghGuides'
import SeasonalGuidesClient from './SeasonalGuidesClient'

export const metadata: Metadata = {
  title: 'Seasonal Guides to Pittsburgh | Year-Round Activities & Events',
  description: 'Discover seasonal guides to Pittsburgh covering winter, spring, summer, and fall activities, events, and experiences.',
  keywords: 'Pittsburgh seasonal guides, winter guide, spring guide, summer guide, fall guide, seasonal activities',
  openGraph: {
    title: 'Seasonal Guides to Pittsburgh | Year-Round Activities',
    description: 'Seasonal guides covering Pittsburgh throughout the year.',
    images: [
      {
        url: '/images/guides/seasonal-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Seasonal guides to Pittsburgh'
      }
    ]
  }
}

export default function SeasonalGuidesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Seasonal Guides to Pittsburgh",
    "description": "Seasonal guides covering Pittsburgh throughout the year.",
    "url": "https://pittsburgheverything.com/guides/seasonal",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allGuides = getSeasonalGuides()
  const totalGuides = allGuides.length
  const featuredCount = allGuides.filter(g => g.featured).length
  const verifiedCount = allGuides.filter(g => g.verified).length
  const totalReadingTime = allGuides.reduce((sum, g) => sum + g.readingTime, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Seasonal Guides to Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover Pittsburgh throughout the year with our seasonal guides. From winter activities to summer festivals, find the best experiences for every season.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{totalGuides}</div>
                <div className="text-sm opacity-75">Seasonal Guides</div>
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

      <SeasonalGuidesClient />
    </div>
  )
}

