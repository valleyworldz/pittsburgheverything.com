import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, TrendingUp, Home, Users, GraduationCap, Shield, Check, X } from 'lucide-react'
import { getTopRatedAreas, getBestAreasByCategory } from '@/data/pittsburghHousing'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Best Areas to Live in Pittsburgh | Top Neighborhoods Guide 2025',
  description: 'Discover the best neighborhoods to live in Pittsburgh. Rankings for families, young professionals, students, and retirees. Compare schools, safety, and cost of living.',
  keywords: 'best neighborhoods Pittsburgh, best areas to live, Pittsburgh neighborhoods, where to live Pittsburgh, best schools Pittsburgh',
  openGraph: {
    title: 'Best Areas to Live in Pittsburgh 2025',
    description: 'Find your perfect neighborhood in Pittsburgh. Rankings, comparisons, and detailed guides.',
    images: [
      {
        url: '/images/housing/best-areas-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Best areas to live in Pittsburgh'
      }
    ]
  }
}

export default function BestAreasPage() {
  const topAreas = getTopRatedAreas(10)
  const familyAreas = getBestAreasByCategory('best-for-families')
  const professionalAreas = getBestAreasByCategory('best-for-young-professionals')
  const studentAreas = getBestAreasByCategory('best-for-students')

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Best Areas to Live in Pittsburgh 2025",
    "description": "Comprehensive guide to the best neighborhoods in Pittsburgh for different lifestyles",
    "author": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best Areas to Live in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Find your perfect neighborhood based on lifestyle, budget, and priorities. Rankings for families, professionals, students, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Top Rated Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Top Rated Neighborhoods
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our top picks based on quality of life, amenities, schools, and community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topAreas.map((area, index) => (
              <div key={area.id} className="bg-gray-50 rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-pittsburgh-gold rounded-full flex items-center justify-center text-pittsburgh-black font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-pittsburgh-black">{area.name}</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold">{area.score.toFixed(1)}</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{area.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Median Rent:</span>
                    <span className="font-semibold">${area.medianRent.toLocaleString()}/mo</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Median Home:</span>
                    <span className="font-semibold">${area.medianHomePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Walk Score:</span>
                    <span className="font-semibold">{area.walkScore}/100</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">School Rating:</span>
                    <span className="font-semibold">{area.schoolRating.toFixed(1)}/10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Safety:</span>
                    <span className="font-semibold">{area.safetyRating.toFixed(1)}/10</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {area.highlights.slice(0, 3).map((highlight, idx) => (
                      <span key={idx} className="text-xs bg-pittsburgh-gold/20 text-pittsburgh-black px-2 py-1 rounded">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/neighborhoods/${area.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-pittsburgh-gold hover:underline text-sm font-semibold"
                  >
                    View Full Guide →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best for Families */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-8 h-8 text-pittsburgh-gold" />
              <h2 className="text-3xl font-bold text-pittsburgh-black">
                Best for Families
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Neighborhoods with excellent schools, safe streets, and family-friendly amenities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {familyAreas.map((area) => (
              <AreaComparisonCard key={area.id} area={area} />
            ))}
          </div>
        </div>
      </section>

      {/* Best for Young Professionals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-pittsburgh-gold" />
              <h2 className="text-3xl font-bold text-pittsburgh-black">
                Best for Young Professionals
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vibrant neighborhoods with great nightlife, dining, and career opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {professionalAreas.map((area) => (
              <AreaComparisonCard key={area.id} area={area} />
            ))}
          </div>
        </div>
      </section>

      {/* Best for Students */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <GraduationCap className="w-8 h-8 text-pittsburgh-gold" />
              <h2 className="text-3xl font-bold text-pittsburgh-black">
                Best for Students
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Affordable neighborhoods close to universities with student-friendly amenities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studentAreas.map((area) => (
              <AreaComparisonCard key={area.id} area={area} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function AreaComparisonCard({ area }: { area: any }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-pittsburgh-black mb-2">{area.name}</h3>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="font-bold">{area.score.toFixed(1)}/10</span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-6">{area.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="text-sm text-gray-600 mb-1">Median Rent</div>
          <div className="font-bold text-lg">${area.medianRent.toLocaleString()}/mo</div>
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">Median Home</div>
          <div className="font-bold text-lg">${area.medianHomePrice.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">Walk Score</div>
          <div className="font-bold text-lg">{area.walkScore}/100</div>
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">School Rating</div>
          <div className="font-bold text-lg">{area.schoolRating.toFixed(1)}/10</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-1">
            <Check className="w-4 h-4" />
            Pros
          </div>
          <ul className="space-y-1">
            {area.pros.slice(0, 3).map((pro: string, idx: number) => (
              <li key={idx} className="text-sm text-gray-700">• {pro}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-1">
            <X className="w-4 h-4" />
            Cons
          </div>
          <ul className="space-y-1">
            {area.cons.slice(0, 3).map((con: string, idx: number) => (
              <li key={idx} className="text-sm text-gray-700">• {con}</li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        href={`/neighborhoods/${area.name.toLowerCase().replace(/\s+/g, '-')}`}
        className="block text-center bg-pittsburgh-gold text-pittsburgh-black py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
      >
        View Full Neighborhood Guide
      </Link>
    </div>
  )
}

