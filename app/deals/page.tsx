import type { Metadata } from 'next'
import DealsCarousel from '@/components/DealsCarousel'

export const metadata: Metadata = {
  title: '2025 Hot Deals in Pittsburgh | PittsburghEverything',
  description: 'Save big with the best 2025 deals in Pittsburgh. Winter specials, restaurant deals, service discounts, and exclusive offers.',
  keywords: '2025 Pittsburgh deals, winter discounts, specials, coupons, restaurant deals, Pittsburgh savings',
}

export default function DealsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-4">2025 Pittsburgh Deals</h1>
        <p className="text-xl text-steel-gray max-w-2xl mx-auto">
          Beat the winter chill with amazing deals on restaurants, services, and experiences across Pittsburgh.
        </p>
      </div>

      <div className="bg-gradient-to-r from-pittsburgh-gold to-yellow-500 rounded-xl p-8 text-pittsburgh-black text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2">🔥 2025 WINTER DEALS</h2>
          <p className="text-lg mb-6">Beat the winter chill with hot Pittsburgh savings!</p>
          <div className="text-5xl font-black mb-2">WINTER WARDROBE</div>
          <p className="text-sm opacity-90">Up to 60% off winter essentials + free shipping</p>
          <div className="mt-4 text-xs opacity-75">Valid through March 2025</div>
        </div>
      </div>

      <DealsCarousel />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-xl font-bold mb-4">🏪 Winter Restaurant Deals</h3>
          <p className="text-steel-gray mb-4">
            Warm up with hearty meals and winter specials at Pittsburgh's best dining spots.
          </p>
          <ul className="space-y-2 text-sm text-steel-gray">
            <li>• ❄️ 40% off comfort food and soups</li>
            <li>• 🥂 Winter cocktail specials from $8</li>
            <li>• ☕ Bottomless coffee with brunch</li>
            <li>• 🎓 Student discounts through 2025</li>
            <li>• 👴 Senior dining specials</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-xl font-bold mb-4">🔧 2025 Service Deals</h3>
          <p className="text-steel-gray mb-4">
            Professional services at discounted rates from trusted Pittsburgh businesses.
          </p>
          <ul className="space-y-2 text-sm text-steel-gray">
            <li>• 🚗 Winter oil changes for $24.99</li>
            <li>• 🏠 Free home heating consultations</li>
            <li>• 👴 Senior service discounts</li>
            <li>• 🆕 First-time customer specials</li>
            <li>• ❄️ Snow removal services from $25</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pittsburgh-black to-gray-800 rounded-xl p-8 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pittsburgh-gold/10 to-transparent"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-4">Feature Your 2025 Deals</h2>
          <p className="mb-6 text-gray-200 text-lg">
            Reach thousands of deal-hungry Pittsburghers with your winter specials and 2025 offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition-all duration-200 hover:scale-105 shadow-lg">
              List Your Deal
            </button>
            <button className="border-2 border-pittsburgh-gold text-pittsburgh-gold px-8 py-4 rounded-lg font-bold hover:bg-pittsburgh-gold hover:text-pittsburgh-black transition-all duration-200">
              Contact Sales
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Join 200+ Pittsburgh businesses already saving customers money
          </p>
        </div>
      </div>
    </div>
  )
}
