import { Metadata } from 'next'
import { Trophy, Utensils, Wine, MapPin, Building2, Star, Award } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import { getAllTop100, getTop100Restaurants, getTop100Bars, getTop100Experiences, getTop100Businesses } from '@/data/pittsburghTop100'
import Top100Card from '@/components/top100/Top100Card'

export const metadata: Metadata = {
  title: 'Pittsburgh\'s Top 100 | Best Restaurants, Bars, Experiences & Businesses',
  description: 'The definitive ranking of Pittsburgh\'s absolute best. Discover the top 100 restaurants, bars, experiences, and local businesses ranked by ratings, reviews, and expert curation.',
  keywords: 'Pittsburgh top 100, best restaurants, best bars, best experiences, best businesses, rankings',
  openGraph: {
    title: 'Pittsburgh\'s Top 100 | The Best of Pittsburgh',
    description: 'The definitive ranking of Pittsburgh\'s absolute best.',
    images: [
      {
        url: '/images/top100/pittsburgh-top-100.jpg',
        width: 1200,
        height: 630,
        alt: 'Pittsburgh\'s Top 100'
      }
    ]
  }
}

export default function Top100Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pittsburgh's Top 100",
    "description": "The definitive ranking of Pittsburgh's absolute best.",
    "url": "https://pittsburgheverything.com/top-100",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allItems = getAllTop100()
  const restaurants = getTop100Restaurants()
  const bars = getTop100Bars()
  const experiences = getTop100Experiences()
  const businesses = getTop100Businesses()
  
  const totalItems = allItems.length
  const avgRating = allItems.reduce((sum, item) => sum + item.rating, 0) / totalItems
  const totalReviews = allItems.reduce((sum, item) => sum + item.reviewCount, 0)
  const verifiedCount = allItems.filter(item => item.verified).length

  const categories = [
    {
      title: 'Top 100 Restaurants',
      href: '/top-100/restaurants',
      description: 'The best dining experiences in Pittsburgh',
      icon: Utensils,
      count: restaurants.length,
      color: 'red',
      top3: restaurants.filter(r => r.rank <= 3)
    },
    {
      title: 'Top 100 Bars & Nightlife',
      href: '/top-100/bars',
      description: 'The best bars, cocktail lounges, and nightlife',
      icon: Wine,
      count: bars.length,
      color: 'orange',
      top3: bars.filter(b => b.rank <= 3)
    },
    {
      title: 'Top 100 Experiences',
      href: '/top-100/experiences',
      description: 'The best attractions, museums, and activities',
      icon: MapPin,
      count: experiences.length,
      color: 'blue',
      top3: experiences.filter(e => e.rank <= 3)
    },
    {
      title: 'Top 100 Local Businesses',
      href: '/top-100/businesses',
      description: 'The best local shops, services, and businesses',
      icon: Building2,
      count: businesses.length,
      color: 'green',
      top3: businesses.filter(b => b.rank <= 3)
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
              Pittsburgh's Top 100
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              The definitive ranking of Pittsburgh's absolute best. From iconic restaurants to hidden gems, discover where Pittsburgh truly shines.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">{totalItems}</div>
                <div className="text-sm opacity-75">Top Rankings</div>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
                <div className="text-sm opacity-75">Avg Rating</div>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">{(totalReviews / 1000).toFixed(1)}K</div>
                <div className="text-sm opacity-75">Reviews</div>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">{verifiedCount}</div>
                <div className="text-sm opacity-75">Verified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Browse Top 100 Rankings
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the best of Pittsburgh across all categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className="group bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:bg-white"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    category.color === 'red' ? 'bg-red-100' :
                    category.color === 'orange' ? 'bg-orange-100' :
                    category.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      category.color === 'red' ? 'text-red-600' :
                      category.color === 'orange' ? 'text-orange-600' :
                      category.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                    }`} />
                  </div>

                  <h3 className="text-xl font-bold text-pittsburgh-black mb-2 group-hover:text-pittsburgh-gold transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pittsburgh-gold">{category.count}</span>
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

      {/* Featured Top 3s */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Top 3 Highlights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The cream of the crop - Pittsburgh's absolute best
            </p>
          </div>

          <div className="space-y-12">
            {categories.map((category) => {
              if (category.top3.length === 0) return null
              const Icon = category.icon
              return (
                <div key={category.href}>
                  <div className="flex items-center gap-3 mb-6">
                    <Icon className={`w-6 h-6 ${
                      category.color === 'red' ? 'text-red-600' :
                      category.color === 'orange' ? 'text-orange-600' :
                      category.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                    }`} />
                    <h3 className="text-2xl font-bold text-pittsburgh-black">{category.title}</h3>
                    <Link
                      href={category.href}
                      className="ml-auto text-sm text-pittsburgh-gold hover:underline"
                    >
                      View All →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {category.top3.map((item) => (
                      <Top100Card
                        key={item.id}
                        item={item}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How Rankings Work */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-8">How Rankings Work</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-pittsburgh-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-pittsburgh-gold" />
                </div>
                <h3 className="font-bold mb-2">Community Reviews</h3>
                <p className="text-gray-600 text-sm">
                  Real ratings and reviews from Pittsburgh residents and visitors
                </p>
              </div>
              <div className="text-center">
                <div className="bg-pittsburgh-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-pittsburgh-gold" />
                </div>
                <h3 className="font-bold mb-2">Expert Curation</h3>
                <p className="text-gray-600 text-sm">
                  Local experts, critics, and cultural influencers contribute
                </p>
              </div>
              <div className="text-center">
                <div className="bg-pittsburgh-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-pittsburgh-gold" />
                </div>
                <h3 className="font-bold mb-2">Data-Driven</h3>
                <p className="text-gray-600 text-sm">
                  Visit frequency, social mentions, and quality metrics factored in
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
