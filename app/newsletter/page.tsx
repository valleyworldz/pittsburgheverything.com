import { Metadata } from 'next'
import { Mail, CheckCircle, Clock, Users, TrendingUp, Star, Calendar, DollarSign, Utensils, Newspaper, MapPin, Heart } from 'lucide-react'
import NewsletterSignup from '@/components/NewsletterSignup'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Pittsburgh Pulse Weekly | Free Newsletter',
  description: 'Subscribe to Pittsburgh Pulse Weekly - your free weekly guide to Pittsburgh events, deals, news, and community highlights.',
  keywords: 'Pittsburgh newsletter, weekly guide, events, deals, local news',
  openGraph: {
    title: 'Pittsburgh Pulse Weekly Newsletter',
    description: 'Free weekly newsletter with Pittsburgh events, deals, dining, and local news.',
    images: [
      {
        url: '/images/newsletter/pittsburgh-pulse.jpg',
        width: 1200,
        height: 630,
        alt: 'Pittsburgh Pulse Weekly newsletter'
      }
    ]
  }
}

export default function NewsletterPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Newsletter",
    "name": "Pittsburgh Pulse Weekly",
    "description": "Weekly newsletter featuring Pittsburgh events, deals, dining recommendations, and local news.",
    "url": "https://pittsburgheverything.com/newsletter",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    },
    "distributionFrequency": "Weekly"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Pittsburgh Pulse Weekly
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Your free weekly guide to the best of Pittsburgh. Events, deals, dining, and local news delivered every Friday.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">Weekly</div>
                <div className="text-sm opacity-75">Every Friday</div>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">5,200+</div>
                <div className="text-sm opacity-75">Subscribers</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">94%</div>
                <div className="text-sm opacity-75">Open Rate</div>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm opacity-75">Forever</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Get Pittsburgh Pulse Weekly
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of Pittsburghers who start their weekends with curated local content.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              What You'll Get Every Week
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Curated content that helps you make the most of Pittsburgh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-pittsburgh-gold rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-pittsburgh-black mb-2">Weekend Events</h3>
              <p className="text-gray-700">
                Curated list of the best concerts, festivals, and cultural events happening this weekend.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-pittsburgh-gold rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-pittsburgh-black mb-2">Hot Deals</h3>
              <p className="text-gray-700">
                Exclusive discounts, happy hours, and special offers from local businesses.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-pittsburgh-gold rounded-lg flex items-center justify-center mb-4">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-pittsburgh-black mb-2">Dining Picks</h3>
              <p className="text-gray-700">
                Restaurant recommendations, seasonal menus, and chef features from around the city.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-pittsburgh-gold rounded-lg flex items-center justify-center mb-4">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-pittsburgh-black mb-2">Local News</h3>
              <p className="text-gray-700">
                Community updates, business openings, and stories that matter to Pittsburghers.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-pittsburgh-gold rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-pittsburgh-black mb-2">Hidden Gems</h3>
              <p className="text-gray-700">
                Undiscovered spots, local secrets, and off-the-beaten-path recommendations.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-pittsburgh-gold rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-pittsburgh-black mb-2">Community Spotlight</h3>
              <p className="text-gray-700">
                Profiles of local businesses, community leaders, and Pittsburgh changemakers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Newsletter */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Sample Newsletter
            </h2>
            <p className="text-xl text-gray-600">
              See what Pittsburgh Pulse Weekly looks like
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
            {/* Newsletter Header */}
            <div className="bg-gradient-to-r from-pittsburgh-gold to-yellow-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">Pittsburgh Pulse Weekly</h3>
                  <p className="opacity-90">January 24, 2025</p>
                </div>
                <Mail className="w-8 h-8" />
              </div>
            </div>

            {/* Newsletter Content */}
            <div className="p-6 space-y-6">
              <div className="border-l-4 border-pittsburgh-gold pl-4">
                <h4 className="font-bold text-lg text-pittsburgh-black mb-2">🎭 This Weekend's Must-See Events</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Pittsburgh Symphony Orchestra</strong> - Beethoven's 9th at Heinz Hall</li>
                  <li><strong>Carnegie Museum of Art</strong> - New Andy Warhol exhibit opening</li>
                  <li><strong>Festival of Trees</strong> - Holiday lights at PPG Place</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold text-lg text-pittsburgh-black mb-2">💰 Hot Deals This Week</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>50% off appetizers</strong> at Piper's Pub downtown</li>
                  <li><strong>$5 craft beers</strong> at Fat Head's Saloon all week</li>
                  <li><strong>Free kids meal</strong> with adult entree at Ali Baba</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold text-lg text-pittsburgh-black mb-2">🍽️ Dining Spotlight</h4>
                <p className="text-gray-700">
                  <strong>The Capital Grille</strong> unveils their seasonal menu featuring local ingredients and classic steakhouse favorites. Don't miss their Friday night wine pairings!
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-bold text-lg text-pittsburgh-black mb-2">🏙️ Pittsburgh This Week</h4>
                <p className="text-gray-700">
                  The City of Bridges welcomes visitors with new parking options and transit improvements. Plus, catch the last few days of the Pittsburgh Taco Festival downtown.
                </p>
              </div>
            </div>

            {/* Newsletter Footer */}
            <div className="bg-gray-100 p-4 text-center">
              <p className="text-sm text-gray-600">
                Brought to you by <span className="font-semibold text-pittsburgh-gold">PittsburghEverything</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Subscribers Say</h2>
            <p className="text-xl opacity-90">
              Join thousands of Pittsburghers who love their weekly dose of local goodness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-pittsburgh-gold fill-current" />
                ))}
              </div>
              <p className="text-white/90 mb-4 italic">
                "Pittsburgh Pulse is my Friday ritual. I always discover something new and fun to do in the city!"
              </p>
              <div className="text-sm text-white/70">
                — Sarah M., Shadyside
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-pittsburgh-gold fill-current" />
                ))}
              </div>
              <p className="text-white/90 mb-4 italic">
                "The deals section alone saves me money every week. Plus I love supporting local businesses."
              </p>
              <div className="text-sm text-white/70">
                — Mike T., Lawrenceville
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-pittsburgh-gold fill-current" />
                ))}
              </div>
              <p className="text-white/90 mb-4 italic">
                "As someone new to Pittsburgh, this newsletter has been invaluable for finding community and events."
              </p>
              <div className="text-sm text-white/70">
                — Jennifer L., Oakland
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}