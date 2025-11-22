import { Metadata } from 'next'
import { BookOpen, Calendar, Home, FileText, Award, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import { getAllGuides, getUltimateGuides, getSeasonalGuides, getWeekendGuides, getMovingGuides } from '@/data/pittsburghGuides'
import GuideCard from '@/components/guides/GuideCard'

export const metadata: Metadata = {
  title: 'Pittsburgh Guides | Ultimate, Seasonal, Weekend & Moving Guides',
  description: 'Comprehensive guides to Pittsburgh covering everything from ultimate city guides to seasonal activities, weekend itineraries, and moving resources.',
  keywords: 'Pittsburgh guides, city guides, ultimate guides, seasonal guides, weekend guides, moving guides',
  openGraph: {
    title: 'Pittsburgh Guides | Comprehensive City Guides',
    description: 'Comprehensive guides covering everything about Pittsburgh.',
    images: [
      {
        url: '/images/guides/pittsburgh-guides.jpg',
        width: 1200,
        height: 630,
        alt: 'Pittsburgh guides'
      }
    ]
  }
}

export default function GuidesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pittsburgh Guides",
    "description": "Comprehensive guides covering everything about Pittsburgh.",
    "url": "https://pittsburgheverything.com/guides",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allGuides = getAllGuides()
  const ultimateGuides = getUltimateGuides()
  const seasonalGuides = getSeasonalGuides()
  const weekendGuides = getWeekendGuides()
  const movingGuides = getMovingGuides()
  
  const totalGuides = allGuides.length
  const featuredCount = allGuides.filter(g => g.featured).length
  const verifiedCount = allGuides.filter(g => g.verified).length
  const totalReadingTime = allGuides.reduce((sum, g) => sum + g.readingTime, 0)

  const guideCategories = [
    {
      title: 'Ultimate Guides',
      href: '/guides/ultimate',
      description: 'Comprehensive guides covering everything about Pittsburgh',
      icon: BookOpen,
      count: ultimateGuides.length,
      color: 'blue',
      featured: ultimateGuides.filter(g => g.featured).slice(0, 2)
    },
    {
      title: 'Seasonal Guides',
      href: '/guides/seasonal',
      description: 'Year-round guides for every season',
      icon: Calendar,
      count: seasonalGuides.length,
      color: 'green',
      featured: seasonalGuides.filter(g => g.featured).slice(0, 2)
    },
    {
      title: 'Weekend Guides',
      href: '/guides/weekend',
      description: 'Perfect weekend itineraries and activities',
      icon: FileText,
      count: weekendGuides.length,
      color: 'purple',
      featured: weekendGuides.filter(g => g.featured).slice(0, 2)
    },
    {
      title: 'Moving Guides',
      href: '/guides/moving',
      description: 'Complete relocation resources and tips',
      icon: Home,
      count: movingGuides.length,
      color: 'orange',
      featured: movingGuides.filter(g => g.featured).slice(0, 2)
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Pittsburgh Guides
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Your comprehensive resource for everything Pittsburgh. From ultimate city guides to seasonal activities, weekend itineraries, and moving resources.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">{totalGuides}</div>
                <div className="text-sm opacity-75">Total Guides</div>
              </div>
              <div className="text-center">
                <FileText className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">{totalReadingTime}+</div>
                <div className="text-sm opacity-75">Min Read</div>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">{featuredCount}</div>
                <div className="text-sm opacity-75">Featured</div>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">{verifiedCount}</div>
                <div className="text-sm opacity-75">Verified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Browse Guides by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect guide for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guideCategories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className="group bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:bg-white"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    category.color === 'blue' ? 'bg-blue-100' :
                    category.color === 'green' ? 'bg-green-100' :
                    category.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      category.color === 'blue' ? 'text-blue-600' :
                      category.color === 'green' ? 'text-green-600' :
                      category.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                    }`} />
                  </div>

                  <h3 className="text-xl font-bold text-pittsburgh-black mb-2 group-hover:text-pittsburgh-gold transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pittsburgh-gold">{category.count}</span>
                    <span className="text-sm text-gray-500 group-hover:text-pittsburgh-gold transition-colors">
                      View →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Featured Guides
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't miss these essential guides to Pittsburgh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allGuides.filter(g => g.featured).slice(0, 6).map((guide) => (
              <GuideCard
                key={guide.id}
                guide={guide}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

