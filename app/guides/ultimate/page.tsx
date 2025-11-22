import { Metadata } from 'next'
import { BookOpen, FileText, Award, CheckCircle } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import { getUltimateGuides } from '@/data/pittsburghGuides'
import UltimateGuidesClient from './UltimateGuidesClient'

export const metadata: Metadata = {
  title: 'Ultimate Guides to Pittsburgh | Comprehensive City Guides',
  description: 'Discover comprehensive guides to Pittsburgh covering neighborhoods, food, transportation, nightlife, and everything you need to know about the city.',
  keywords: 'Pittsburgh guides, ultimate guides, city guides, comprehensive guides, Pittsburgh information',
  openGraph: {
    title: 'Ultimate Guides to Pittsburgh | Comprehensive City Guides',
    description: 'Comprehensive guides covering everything about Pittsburgh.',
    images: [
      {
        url: '/images/guides/ultimate-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Ultimate guides to Pittsburgh'
      }
    ]
  }
}

export default function UltimateGuidesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Ultimate Guides to Pittsburgh",
    "description": "Comprehensive guides covering everything about Pittsburgh.",
    "url": "https://pittsburgheverything.com/guides/ultimate",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allGuides = getUltimateGuides()
  const totalGuides = allGuides.length
  const featuredCount = allGuides.filter(g => g.featured).length
  const verifiedCount = allGuides.filter(g => g.verified).length
  const totalReadingTime = allGuides.reduce((sum, g) => sum + g.readingTime, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Ultimate Guides to Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Comprehensive guides covering everything you need to know about Pittsburgh - from neighborhoods and culture to food, transportation, and entertainment.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{totalGuides}</div>
                <div className="text-sm opacity-75">Ultimate Guides</div>
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

      <UltimateGuidesClient />
    </div>
  )
}

