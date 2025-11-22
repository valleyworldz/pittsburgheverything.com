import { Metadata } from 'next'
import { Home, FileText, Award, CheckCircle } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import { getMovingGuides } from '@/data/pittsburghGuides'
import MovingGuidesClient from './MovingGuidesClient'

export const metadata: Metadata = {
  title: 'Moving Guides to Pittsburgh | Relocation Resources & Tips',
  description: 'Complete guides for moving to Pittsburgh including neighborhoods, cost of living, jobs, housing, and everything you need for a successful relocation.',
  keywords: 'Pittsburgh moving guides, relocation guide, moving to Pittsburgh, neighborhoods, cost of living',
  openGraph: {
    title: 'Moving Guides to Pittsburgh | Relocation Resources',
    description: 'Complete guides for moving to Pittsburgh.',
    images: [
      {
        url: '/images/guides/moving-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Moving guides to Pittsburgh'
      }
    ]
  }
}

export default function MovingGuidesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Moving Guides to Pittsburgh",
    "description": "Complete guides for moving to Pittsburgh.",
    "url": "https://pittsburgheverything.com/guides/moving",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allGuides = getMovingGuides()
  const totalGuides = allGuides.length
  const featuredCount = allGuides.filter(g => g.featured).length
  const verifiedCount = allGuides.filter(g => g.verified).length
  const totalReadingTime = allGuides.reduce((sum, g) => sum + g.readingTime, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      <section className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Moving Guides to Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Everything you need to know about relocating to Pittsburgh. From finding the perfect neighborhood to understanding the cost of living, we've got you covered.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Home className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{totalGuides}</div>
                <div className="text-sm opacity-75">Moving Guides</div>
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

      <MovingGuidesClient />
    </div>
  )
}

