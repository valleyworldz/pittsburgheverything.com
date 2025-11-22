import { Metadata } from 'next'
import { DollarSign, Utensils, Clock, Calendar, Tag, Sparkles } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import { getAllDeals, getFoodDeals, getHappyHours, getWeeklySpecials } from '@/data/pittsburghDeals'
import DealCard from '@/components/deals/DealCard'

export const metadata: Metadata = {
  title: 'Deals & Specials in Pittsburgh | Food Deals, Happy Hours & Weekly Specials',
  description: 'Find the best deals and specials in Pittsburgh. Food deals, happy hours, weekly specials, and restaurant discounts. Save money on dining and entertainment.',
  keywords: 'Pittsburgh deals, food deals, happy hours, weekly specials, restaurant discounts, savings',
  openGraph: {
    title: 'Deals & Specials in Pittsburgh | Save Money',
    description: 'Find the best deals, discounts, and specials in Pittsburgh.',
    images: [
      {
        url: '/images/deals/pittsburgh-deals.jpg',
        width: 1200,
        height: 630,
        alt: 'Deals and specials in Pittsburgh'
      }
    ]
  }
}

export default function DealsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Deals & Specials in Pittsburgh",
    "description": "Find the best deals, discounts, and specials in Pittsburgh.",
    "url": "https://pittsburgheverything.com/deals",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allDeals = getAllDeals()
  const foodDeals = getFoodDeals()
  const happyHours = getHappyHours()
  const weeklySpecials = getWeeklySpecials()
  
  const totalDeals = allDeals.length
  const verifiedCount = allDeals.filter(d => d.verified).length
  const totalSavings = allDeals.reduce((sum, deal) => sum + (deal.savings || 0), 0)
  const featuredDeals = allDeals.filter(d => d.featured).slice(0, 6)

  const dealCategories = [
    {
      title: 'Food Deals',
      href: '/deals/food',
      description: 'Restaurant discounts and meal specials',
      icon: Utensils,
      count: foodDeals.length,
      color: 'red'
    },
    {
      title: 'Happy Hours',
      href: '/deals/happy-hours',
      description: 'Drink specials and bar deals',
      icon: Clock,
      count: happyHours.length,
      color: 'orange'
    },
    {
      title: 'Weekly Specials',
      href: '/deals/weekly',
      description: 'Daily deals and recurring promotions',
      icon: Calendar,
      count: weeklySpecials.length,
      color: 'blue'
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
              Deals & Specials in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Save money on dining, drinks, and entertainment. Find the best deals and specials across Pittsburgh.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Tag className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">{totalDeals}+</div>
                <div className="text-sm opacity-75">Active Deals</div>
              </div>
              <div className="text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">${totalSavings}+</div>
                <div className="text-sm opacity-75">Total Savings</div>
              </div>
              <div className="text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">{verifiedCount}</div>
                <div className="text-sm opacity-75">Verified</div>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">Daily</div>
                <div className="text-sm opacity-75">Updated</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deal Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Browse Deals by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect deal for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dealCategories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className="group bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:bg-white"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    category.color === 'red' ? 'bg-red-100' :
                    category.color === 'orange' ? 'bg-orange-100' : 'bg-blue-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      category.color === 'red' ? 'text-red-600' :
                      category.color === 'orange' ? 'text-orange-600' : 'text-blue-600'
                    }`} />
                  </div>

                  <h3 className="text-xl font-bold text-pittsburgh-black mb-2 group-hover:text-pittsburgh-gold transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pittsburgh-gold">{category.count}+</span>
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

      {/* Featured Deals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Featured Deals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't miss these amazing offers from top Pittsburgh businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDeals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/deals/food"
              className="bg-pittsburgh-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors inline-flex items-center gap-2"
            >
              <Tag className="w-5 h-5" />
              View All Deals
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Have a Deal to Share?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            List your deals and specials to reach thousands of deal-hungry customers in Pittsburgh.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services/submit"
              className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Submit Your Deal
            </Link>
            <Link
              href="/deals/food"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              Browse All Deals
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
