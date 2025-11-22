import { Metadata } from 'next'
import { Tag, MapPin, Clock, DollarSign, Star, Zap } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Live Deals in Pittsburgh | Real-Time Discounts & Special Offers',
  description: 'Find live deals in Pittsburgh. Real-time discounts, flash sales, and special offers from local businesses. Updated every minute.',
  keywords: 'Pittsburgh deals, live discounts, flash sales, special offers, local deals, real-time offers',
  openGraph: {
    title: 'Live Deals in Pittsburgh | Real-Time Discounts',
    description: 'Discover live deals and special offers in Pittsburgh. Real-time discounts from local businesses.',
    images: [
      {
        url: '/images/deals/live-deals-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Live deals in Pittsburgh'
      }
    ]
  }
}

export default function LiveDealsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Live Deals in Pittsburgh",
    "description": "Real-time discounts and special offers from Pittsburgh businesses.",
    "url": "https://pittsburgheverything.com/live/deals",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const liveDeals = [
    {
      id: 1,
      title: '50% Off Pizza Lunch Special',
      business: 'Mineo\'s Pizza House',
      location: 'Oakland',
      originalPrice: '$18.99',
      salePrice: '$9.50',
      discount: '50%',
      timeLeft: '2h 15m',
      description: 'Large cheese pizza with your choice of toppings. Valid Monday-Friday 11am-2pm.',
      tags: ['Pizza', 'Lunch', 'Italian'],
      rating: 4.8,
      reviews: 127,
      image: '/images/deals/pizza-deal.jpg',
      urgency: 'high'
    },
    {
      id: 2,
      title: 'Buy One Get One Free Coffee',
      business: 'Crazy Mocha',
      location: 'Multiple locations',
      originalPrice: '$4.50',
      salePrice: '$2.25',
      discount: '50%',
      timeLeft: '45m',
      description: 'BOGO on any specialty coffee drink. Valid with student ID.',
      tags: ['Coffee', 'BOGO', 'Student'],
      rating: 4.6,
      reviews: 89,
      image: '/images/deals/coffee-deal.jpg',
      urgency: 'critical'
    },
    {
      id: 3,
      title: '25% Off All Services',
      business: 'Pittsburgh Barbershop',
      location: 'Shadyside',
      originalPrice: '$35',
      salePrice: '$26.25',
      discount: '25%',
      timeLeft: '5h 30m',
      description: 'Haircut, shave, and style combo. First-time customers only.',
      tags: ['Hair', 'Grooming', 'Services'],
      rating: 4.9,
      reviews: 203,
      image: '/images/deals/barber-deal.jpg',
      urgency: 'medium'
    },
    {
      id: 4,
      title: 'Free Dessert with Entree',
      business: 'The Capital Grille',
      location: 'Downtown',
      originalPrice: '$12',
      salePrice: '$0',
      discount: 'FREE',
      timeLeft: '1h 20m',
      description: 'Complimentary dessert with any entree purchase. Limited availability.',
      tags: ['Restaurant', 'Dessert', 'Free'],
      rating: 4.7,
      reviews: 156,
      image: '/images/deals/dessert-deal.jpg',
      urgency: 'critical'
    },
    {
      id: 5,
      title: '30% Off Wine Selection',
      business: 'Wine & Spirits Store',
      location: 'Strip District',
      originalPrice: '$25',
      salePrice: '$17.50',
      discount: '30%',
      timeLeft: '3h 45m',
      description: 'Discount on all wines $20+. Mix and match any bottles.',
      tags: ['Wine', 'Alcohol', 'Discount'],
      rating: 4.5,
      reviews: 78,
      image: '/images/deals/wine-deal.jpg',
      urgency: 'medium'
    },
    {
      id: 6,
      title: 'Kids Eat Free',
      business: 'California Pizza Kitchen',
      location: 'Station Square',
      originalPrice: '$12',
      salePrice: '$0',
      discount: 'FREE',
      timeLeft: '6h 10m',
      description: 'Kids under 12 eat free with adult entree purchase. Valid Sunday evenings.',
      tags: ['Family', 'Kids', 'Free'],
      rating: 4.4,
      reviews: 92,
      image: '/images/deals/kids-deal.jpg',
      urgency: 'low'
    }
  ]

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      default: return 'bg-green-500'
    }
  }

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'ENDING SOON'
      case 'high': return 'HOT DEAL'
      case 'medium': return 'GOOD DEAL'
      default: return 'STEAL'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-yellow-300" />
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                LIVE NOW
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Live Deals in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Real-time discounts and special offers from Pittsburgh businesses. Updated every minute.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">24</div>
                <div className="text-sm opacity-75">Active Deals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">$2.5K</div>
                <div className="text-sm opacity-75">Avg Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">50+</div>
                <div className="text-sm opacity-75">Businesses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">1min</div>
                <div className="text-sm opacity-75">Update Freq</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-lg font-semibold mb-2">⚡ Flash Deals Alert</p>
              <p className="opacity-90">
                New deals appear instantly. Some offers expire in minutes - act fast!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Deals Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              🔥 Hot Deals Right Now
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These deals are live and expiring soon. Don't miss out!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveDeals.map((deal) => (
              <div key={deal.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Deal Badge */}
                <div className={`px-4 py-2 ${getUrgencyColor(deal.urgency)} text-white text-center font-bold text-sm`}>
                  {getUrgencyText(deal.urgency)}
                </div>

                {/* Deal Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-pittsburgh-black mb-2">{deal.title}</h3>
                      <p className="text-gray-600 mb-3">{deal.business}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {deal.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {deal.timeLeft} left
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{deal.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {deal.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold">{deal.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({deal.reviews} reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-sm text-gray-500 line-through">{deal.originalPrice}</div>
                        <div className="text-2xl font-bold text-green-600">{deal.salePrice}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-white font-bold text-sm ${getUrgencyColor(deal.urgency)}`}>
                        {deal.discount}
                      </div>
                    </div>
                    <button className="bg-pittsburgh-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                      Claim Deal
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deal Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Browse Deal Categories
            </h2>
            <p className="text-xl text-gray-600">
              Find deals in your favorite categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link href="/deals" className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <Tag className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-pittsburgh-black mb-2">Food & Dining</h3>
              <p className="text-gray-600 text-sm">Restaurants, cafes, takeout</p>
              <div className="text-2xl font-bold text-green-600 mt-2">12 deals</div>
            </Link>

            <Link href="/deals" className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-pittsburgh-black mb-2">Services</h3>
              <p className="text-gray-600 text-sm">Hair, nails, spa, repairs</p>
              <div className="text-2xl font-bold text-blue-600 mt-2">8 deals</div>
            </Link>

            <Link href="/deals" className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <Star className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-pittsburgh-black mb-2">Shopping</h3>
              <p className="text-gray-600 text-sm">Clothing, electronics, retail</p>
              <div className="text-2xl font-bold text-purple-600 mt-2">6 deals</div>
            </Link>

            <Link href="/deals" className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <MapPin className="w-8 h-8 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold text-pittsburgh-black mb-2">Local Only</h3>
              <p className="text-gray-600 text-sm">Pittsburgh exclusive deals</p>
              <div className="text-2xl font-bold text-red-600 mt-2">4 deals</div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss a Deal Again</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get notified instantly when new deals go live in Pittsburgh.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
              Enable Deal Alerts
            </button>
            <Link
              href="/deals"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              View All Deals
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
