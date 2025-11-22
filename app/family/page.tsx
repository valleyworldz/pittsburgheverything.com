import { Metadata } from 'next'
import Link from 'next/link'
import { Users, Utensils, Trees, ArrowRight } from 'lucide-react'
import { getAllKidsActivities, getAllFamilyRestaurants, getAllParksPlaygrounds } from '@/data/pittsburghFamily'

export const metadata: Metadata = {
  title: 'Family Activities & Services in Pittsburgh | PittsburghEverything.com',
  description: 'Discover family-friendly activities, restaurants, and parks in Pittsburgh. Find the perfect activities for kids of all ages.',
  keywords: 'family, kids, Pittsburgh, activities, restaurants, parks, playgrounds, children',
  openGraph: {
    title: 'Family Activities & Services in Pittsburgh',
    description: 'Discover family-friendly activities, restaurants, and parks in Pittsburgh.',
    type: 'website'
  }
}

export default function FamilyPage() {
  const activities = getAllKidsActivities()
  const restaurants = getAllFamilyRestaurants()
  const parks = getAllParksPlaygrounds()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Family Fun in Pittsburgh</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Discover the best family-friendly activities, restaurants, and parks in Pittsburgh. 
            Find perfect adventures for kids of all ages.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/family/activities"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Kids Activities</h2>
                <p className="text-sm text-gray-600">{activities.length} activities</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Discover fun and educational activities for kids of all ages. From museums to entertainment venues.
            </p>
            <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
              Explore Activities
              <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/family/restaurants"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Utensils className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Family Restaurants</h2>
                <p className="text-sm text-gray-600">{restaurants.length} restaurants</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Find kid-friendly restaurants with high chairs, kids menus, and family-friendly atmospheres.
            </p>
            <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
              Find Restaurants
              <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/family/parks"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Trees className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Parks & Playgrounds</h2>
                <p className="text-sm text-gray-600">{parks.length} parks</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Discover beautiful parks, playgrounds, and outdoor spaces perfect for family fun.
            </p>
            <div className="flex items-center text-green-600 font-semibold group-hover:gap-2 transition-all">
              Explore Parks
              <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {activities.length + restaurants.length + parks.length}
            </div>
            <div className="text-gray-600">Total Family Resources</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {activities.filter(a => a.priceRange === 'Free').length + parks.length}
            </div>
            <div className="text-gray-600">Free Activities</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {activities.filter(a => a.featured).length + restaurants.filter(r => r.featured).length + parks.filter(p => p.featured).length}
            </div>
            <div className="text-gray-600">Featured Options</div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Family Fun Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Planning Your Visit</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Check hours and availability before visiting</li>
                <li>• Look for free or discounted admission days</li>
                <li>• Pack snacks and water for outdoor activities</li>
                <li>• Consider age-appropriate activities for your children</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dining with Kids</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Call ahead to confirm high chairs and kids menus</li>
                <li>• Look for restaurants with play areas or activities</li>
                <li>• Consider noise levels and family-friendly atmospheres</li>
                <li>• Check for special kids meal deals</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

