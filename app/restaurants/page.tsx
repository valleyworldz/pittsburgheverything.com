import type { Metadata } from 'next'
import Link from 'next/link'
import { Award, Coffee, Heart, Gift, Building2, Sparkles, Utensils, Star, MapPin, ArrowRight } from 'lucide-react'
import RestaurantList from '@/components/RestaurantList'
import { pittsburghRestaurants, getAllNeighborhoods } from '@/data/pittsburghRestaurants'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Best Restaurants in Pittsburgh | Complete Dining Guide | PittsburghEverything',
  description: 'Discover the best restaurants in Pittsburgh. From iconic Primanti Bros sandwiches to fine dining experiences. Complete guide with top picks, brunch spots, date night restaurants, cheap eats, and neighborhood guides.',
  keywords: 'Pittsburgh restaurants, dining, food, Primanti Bros, Italian, seafood, best restaurants Pittsburgh, brunch, date night, cheap eats',
  openGraph: {
    title: 'Best Restaurants in Pittsburgh',
    description: 'Complete guide to Pittsburgh\'s best restaurants, from iconic institutions to fine dining.',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 630, alt: 'Pittsburgh Restaurants' }]
  }
}

export default function RestaurantsPage() {
  const neighborhoods = getAllNeighborhoods()
  const totalRestaurants = pittsburghRestaurants.length

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Best Restaurants in Pittsburgh",
    "description": "Complete guide to restaurants in Pittsburgh, Pennsylvania"
  }

  const quickNavItems = [
    {
      title: 'Top Picks',
      description: 'Highest-rated restaurants',
      href: '/restaurants/top-picks',
      icon: Award,
      color: 'from-pittsburgh-gold to-pittsburgh-black',
      count: pittsburghRestaurants.filter(r => r.rating >= 4.6 && r.reviewCount && r.reviewCount >= 2000).length
    },
    {
      title: 'Brunch',
      description: 'Weekend brunch spots',
      href: '/restaurants/brunch',
      icon: Coffee,
      color: 'from-orange-500 to-orange-700',
      count: pittsburghRestaurants.filter(r => r.features.some(f => f.toLowerCase().includes('brunch'))).length
    },
    {
      title: 'Date Night',
      description: 'Romantic dining',
      href: '/restaurants/date-night',
      icon: Heart,
      color: 'from-pink-600 to-purple-700',
      count: pittsburghRestaurants.filter(r => r.bestFor.some(b => b.toLowerCase().includes('date'))).length
    },
    {
      title: 'Cheap Eats',
      description: 'Budget-friendly options',
      href: '/restaurants/cheap-eats',
      icon: Gift,
      color: 'from-green-500 to-green-700',
      count: pittsburghRestaurants.filter(r => r.priceRange === '$' || (r.priceRange === '$$' && r.rating >= 4.5)).length
    },
    {
      title: 'By Neighborhood',
      description: 'Explore by area',
      href: '/restaurants/neighborhoods',
      icon: Building2,
      color: 'from-blue-600 to-blue-800',
      count: neighborhoods.length
    },
    {
      title: 'New Openings',
      description: 'Latest restaurants',
      href: '/restaurants/new',
      icon: Sparkles,
      color: 'from-indigo-600 to-purple-700',
      count: pittsburghRestaurants.filter(r => r.isNew || (r.openingDate && new Date(r.openingDate) >= new Date('2024-01-01'))).length
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Utensils className="w-16 h-16 text-pittsburgh-gold" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Pittsburgh <span className="text-pittsburgh-gold">Restaurants</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              From iconic Primanti Bros sandwiches to world-class fine dining, explore Pittsburgh\'s incredible food scene. Discover {totalRestaurants}+ restaurants across {neighborhoods.length} neighborhoods.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Utensils className="w-4 h-4" />
                {totalRestaurants}+ Restaurants
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4" />
                {neighborhoods.length} Neighborhoods
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Star className="w-4 h-4" />
                Verified Reviews
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-pittsburgh-black mb-8 text-center">
            Explore by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all border-2 border-gray-100 hover:border-pittsburgh-gold"
                >
                  <div className={`bg-gradient-to-br ${item.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="w-12 h-12" />
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
                        {item.count}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-white/90 text-sm">{item.description}</p>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <span className="text-pittsburgh-gold font-semibold text-sm">Explore →</span>
                    <ArrowRight className="w-5 h-5 text-pittsburgh-gold group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* All Restaurants List */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              All Restaurants
            </h2>
            <p className="text-gray-600">
              Browse our complete directory of Pittsburgh restaurants. Use filters below to find exactly what you\'re looking for.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
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
                  <option>Thai</option>
                  <option>Barbecue</option>
                  <option>Fine Dining</option>
                </select>
              </div>

              {/* Neighborhood Filter */}
              <div>
                <label className="block text-sm font-medium text-steel-gray mb-2">
                  Neighborhood
                </label>
                <select className="input-primary">
                  <option>All Neighborhoods</option>
                  {neighborhoods.map(hood => (
                    <option key={hood}>{hood}</option>
                  ))}
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-pittsburgh-gold/10 to-pittsburgh-gold/5 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-black mb-4">Own a Restaurant?</h2>
            <p className="mb-6 text-steel-gray max-w-2xl mx-auto">
              Get featured on Pittsburgh\'s premier restaurant guide and reach more customers. Claim your listing today and showcase your restaurant to thousands of diners.
            </p>
            <Link
              href="/business"
              className="inline-block bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
            >
              Claim Your Listing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
