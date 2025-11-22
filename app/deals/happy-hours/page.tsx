import { Metadata } from 'next'
import { Clock, Wine, Beer, Sparkles } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import { getHappyHours } from '@/data/pittsburghDeals'
import HappyHoursClient from './HappyHoursClient'

export const metadata: Metadata = {
  title: 'Happy Hours in Pittsburgh | Drink Specials & Bar Deals',
  description: 'Find the best happy hours in Pittsburgh. Drink specials, bar deals, and discounted appetizers. Save on drinks and food.',
  keywords: 'Pittsburgh happy hours, drink specials, bar deals, happy hour deals, discounted drinks',
  openGraph: {
    title: 'Happy Hours in Pittsburgh | Drink Specials',
    description: 'Find the best happy hour deals and drink specials in Pittsburgh.',
    images: [
      {
        url: '/images/deals/happy-hours-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Happy hours in Pittsburgh'
      }
    ]
  }
}

export default function HappyHoursPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Happy Hours in Pittsburgh",
    "description": "Find the best happy hour deals and drink specials in Pittsburgh.",
    "url": "https://pittsburgheverything.com/deals/happy-hours",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allDeals = getHappyHours()
  const totalDeals = allDeals.length
  const verifiedCount = allDeals.filter(d => d.verified).length

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      <section className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Happy Hours in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Find the best drink specials and bar deals. Save on cocktails, beer, wine, and appetizers.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{totalDeals}+</div>
                <div className="text-sm opacity-75">Happy Hours</div>
              </div>
              <div className="text-center">
                <Wine className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">$3-5</div>
                <div className="text-sm opacity-75">Drink Prices</div>
              </div>
              <div className="text-center">
                <Beer className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{verifiedCount}</div>
                <div className="text-sm opacity-75">Verified</div>
              </div>
              <div className="text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">Daily</div>
                <div className="text-sm opacity-75">Updated</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HappyHoursClient />

      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Are You a Bar or Restaurant?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            List your happy hour specials to attract customers during off-peak hours.
          </p>
          <Link
            href="/services/submit"
            className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors inline-block"
          >
            Submit Your Happy Hour
          </Link>
        </div>
      </section>
    </div>
  )
}

