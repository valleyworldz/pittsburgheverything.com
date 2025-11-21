import type { Metadata } from 'next'
import { Star, MessageCircle, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Reviews Dashboard | PittsburghEverything',
  description: 'Manage and monitor all reviews across Pittsburgh businesses on our platform.',
  keywords: 'reviews dashboard, business reviews, customer feedback, Pittsburgh reviews',
}

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-pittsburgh-gold via-yellow-400 to-orange-400 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Star className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Reviews Dashboard</h1>
          </div>
          <p className="text-xl opacity-90">
            Monitor and manage all customer reviews for Pittsburgh businesses.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageCircle className="w-16 h-16 text-pittsburgh-gold mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-pittsburgh-black mb-4">Review Management System</h2>
          <p className="text-gray-600">
            Comprehensive review monitoring and response platform for Pittsburgh businesses.
          </p>
        </div>
      </section>
    </div>
  )
}
