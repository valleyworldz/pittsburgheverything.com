import { Metadata } from 'next'
import { Calendar, DollarSign, Tag, Sparkles } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import { getWeeklySpecials } from '@/data/pittsburghDeals'
import WeeklySpecialsClient from './WeeklySpecialsClient'

export const metadata: Metadata = {
  title: 'Weekly Specials in Pittsburgh | Daily Restaurant Deals & Promotions',
  description: 'Find weekly specials in Pittsburgh. Daily restaurant deals, promotions, and recurring specials. Save money every day of the week.',
  keywords: 'Pittsburgh weekly specials, daily deals, restaurant promotions, recurring specials, day-specific deals',
  openGraph: {
    title: 'Weekly Specials in Pittsburgh | Daily Deals',
    description: 'Find weekly specials and daily restaurant deals in Pittsburgh.',
    images: [
      {
        url: '/images/deals/weekly-specials-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Weekly specials in Pittsburgh'
      }
    ]
  }
}

export default function WeeklySpecialsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Weekly Specials in Pittsburgh",
    "description": "Find weekly specials and daily restaurant deals in Pittsburgh.",
    "url": "https://pittsburgheverything.com/deals/weekly",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allDeals = getWeeklySpecials()
  const totalDeals = allDeals.length
  const verifiedCount = allDeals.filter(d => d.verified).length
  const totalSavings = allDeals.reduce((sum, deal) => sum + (deal.savings || 0), 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Weekly Specials in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Find daily restaurant deals and recurring weekly specials. Save money every day of the week!
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{totalDeals}+</div>
                <div className="text-sm opacity-75">Weekly Specials</div>
              </div>
              <div className="text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">${totalSavings}+</div>
                <div className="text-sm opacity-75">Total Savings</div>
              </div>
              <div className="text-center">
                <Tag className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{verifiedCount}</div>
                <div className="text-sm opacity-75">Verified</div>
              </div>
              <div className="text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">7 Days</div>
                <div className="text-sm opacity-75">A Week</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WeeklySpecialsClient />

      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Are You a Restaurant Owner?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            List your weekly specials to attract customers on specific days of the week.
          </p>
          <Link
            href="/services/submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Submit Your Weekly Special
          </Link>
        </div>
      </section>
    </div>
  )
}

