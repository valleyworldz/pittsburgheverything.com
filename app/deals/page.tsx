import type { Metadata } from 'next'
import DealsCarousel from '@/components/DealsCarousel'

export const metadata: Metadata = {
  title: 'Hot Deals in Pittsburgh | PittsburghEverything',
  description: 'Save big with the best deals in Pittsburgh. Restaurant specials, service discounts, and exclusive offers.',
  keywords: 'Pittsburgh deals, discounts, specials, coupons, restaurant deals',
}

export default function DealsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-4">Pittsburgh Deals</h1>
        <p className="text-xl text-steel-gray max-w-2xl mx-auto">
          Score amazing deals on restaurants, services, and experiences across Pittsburgh.
        </p>
      </div>

      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-black mb-2">🔥 FLASH SALE</h2>
        <p className="text-lg mb-4">Limited time offers - save up to 50%!</p>
        <div className="text-4xl font-black">48 : 23 : 15</div>
        <p className="text-sm mt-2">Hours : Minutes : Seconds</p>
      </div>

      <DealsCarousel />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-xl font-bold mb-4">🏪 Restaurant Deals</h3>
          <p className="text-steel-gray mb-4">
            From happy hour specials to weekend brunch deals, save on Pittsburgh's best dining.
          </p>
          <ul className="space-y-2 text-sm text-steel-gray">
            <li>• 50% off appetizers at local favorites</li>
            <li>• $5 craft beer specials</li>
            <li>• Bottomless mimosa brunches</li>
            <li>• Student and senior discounts</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-xl font-bold mb-4">🔧 Service Deals</h3>
          <p className="text-steel-gray mb-4">
            Professional services at discounted rates from trusted Pittsburgh businesses.
          </p>
          <ul className="space-y-2 text-sm text-steel-gray">
            <li>• Oil changes for $29.99</li>
            <li>• Free consultations</li>
            <li>• Senior citizen discounts</li>
            <li>• First-time customer specials</li>
          </ul>
        </div>
      </div>

      <div className="bg-pittsburgh-black rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-black mb-4">Want to Feature Your Deal?</h2>
        <p className="mb-6 text-gray-200">
          Reach thousands of deal-hungry Pittsburghers with your special offers.
        </p>
        <button className="bg-pittsburgh-gold text-pittsburgh-black px-6 py-3 rounded-lg font-semibold hover:bg-pittsburgh-gold/90 transition-colors">
          List Your Deal
        </button>
      </div>
    </div>
  )
}
