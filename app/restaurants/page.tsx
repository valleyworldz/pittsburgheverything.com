import type { Metadata } from 'next'
import RestaurantList from '@/components/RestaurantList'

export const metadata: Metadata = {
  title: 'Best Restaurants in Pittsburgh | PittsburghEverything',
  description: 'Find the best restaurants in Pittsburgh. From iconic Primanti Bros sandwiches to fine dining experiences.',
  keywords: 'Pittsburgh restaurants, dining, food, Primanti Bros, Italian, seafood',
}

export default function RestaurantsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-4">Pittsburgh Restaurants</h1>
        <p className="text-xl text-steel-gray max-w-2xl mx-auto">
          From iconic sandwiches to world-class dining, explore Pittsburgh's incredible food scene.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Cuisine Filter */}
          <div>
            <label className="block text-sm font-medium text-steel-gray mb-2">
              Cuisine Type
            </label>
            <select className="input-primary">
              <option>All Cuisines</option>
              <option>American</option>
              <option>Italian</option>
              <option>Seafood</option>
              <option>Pizza</option>
              <option>Asian</option>
              <option>Mexican</option>
            </select>
          </div>

          {/* Neighborhood Filter */}
          <div>
            <label className="block text-sm font-medium text-steel-gray mb-2">
              Neighborhood
            </label>
            <select className="input-primary">
              <option>All Neighborhoods</option>
              <option>Oakland</option>
              <option>Downtown</option>
              <option>South Side</option>
              <option>Strip District</option>
              <option>Lawrenceville</option>
              <option>Shadyside</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-steel-gray mb-2">
              Price Range
            </label>
            <select className="input-primary">
              <option>Any Price</option>
              <option>$ - Budget</option>
              <option>$$ - Moderate</option>
              <option>$$$ - Expensive</option>
              <option>$$$$ - Very Expensive</option>
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-steel-gray mb-2">
              Minimum Rating
            </label>
            <select className="input-primary">
              <option>Any Rating</option>
              <option>4.5+ Stars</option>
              <option>4.0+ Stars</option>
              <option>3.5+ Stars</option>
            </select>
          </div>
        </div>
      </div>

      <RestaurantList />

      <div className="bg-gradient-to-r from-pittsburgh-gold/10 to-pittsburgh-gold/5 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-black mb-4">Own a Restaurant?</h2>
        <p className="mb-6 text-steel-gray">
          Get featured on Pittsburgh's premier restaurant guide and reach more customers.
        </p>
        <button className="btn-primary">
          Claim Your Listing
        </button>
      </div>
    </div>
  )
}
