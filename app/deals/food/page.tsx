import { Metadata } from 'next'
import { Utensils, DollarSign, Tag, Sparkles } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import { getFoodDeals } from '@/data/pittsburghDeals'
import FoodDealsClient from './FoodDealsClient'

export const metadata: Metadata = {
  title: 'Food Deals in Pittsburgh | Restaurant Discounts & Specials',
  description: 'Find the best food deals in Pittsburgh. Restaurant discounts, meal specials, and dining offers. Save money on great food.',
  keywords: 'Pittsburgh food deals, restaurant discounts, dining specials, meal deals, food coupons',
  openGraph: {
    title: 'Food Deals in Pittsburgh | Restaurant Discounts',
    description: 'Save money on great food with the best restaurant deals in Pittsburgh.',
    images: [
      {
        url: '/images/deals/food-deals-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Food deals in Pittsburgh'
      }
    ]
  }
}

export default function FoodDealsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Food Deals in Pittsburgh",
    "description": "Find the best food deals and restaurant discounts in Pittsburgh.",
    "url": "https://pittsburgheverything.com/deals/food",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allDeals = getFoodDeals()
  const totalDeals = allDeals.length
  const verifiedCount = allDeals.filter(d => d.verified).length
  const totalSavings = allDeals.reduce((sum, deal) => sum + (deal.savings || 0), 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Food Deals in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Save money on great food! Find restaurant discounts, meal specials, and dining offers across Pittsburgh.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Utensils className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{totalDeals}+</div>
                <div className="text-sm opacity-75">Active Deals</div>
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
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-75">Real Deals</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FoodDealsClient />

      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Are You a Restaurant Owner?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            List your food deals and specials to reach thousands of hungry customers in Pittsburgh.
          </p>
          <Link
            href="/services/submit"
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-block"
          >
            Submit Your Deal
          </Link>
        </div>
      </section>
    </div>
  )
}

