import type { Metadata } from 'next'
import { Users, Target, Award, Heart, MapPin, TrendingUp, Star, Globe } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About PittsburghEverything | Your Complete Pittsburgh Guide',
  description: 'Learn about PittsburghEverything.com - Pittsburgh\'s premier local business directory, event calendar, and community resource. Discover our mission to connect locals with the best of the Steel City.',
  keywords: 'about PittsburghEverything, Pittsburgh guide, local business directory, Pittsburgh events, community resource',
  openGraph: {
    title: 'About PittsburghEverything | Your Complete Pittsburgh Guide',
    description: 'Pittsburgh\'s premier local business directory and community resource. Connecting locals with the best restaurants, events, and services in the Steel City.',
    images: [
      {
        url: '/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'About PittsburghEverything',
      },
    ],
  },
}

export default function AboutPage() {
  const stats = [
    { icon: MapPin, label: 'Pittsburgh Neighborhoods', value: '90+', description: 'Complete coverage of all Pittsburgh areas' },
    { icon: Users, label: 'Local Businesses', value: '1000+', description: 'Verified businesses in our directory' },
    { icon: Star, label: 'User Reviews', value: '50,000+', description: 'Authentic reviews from locals' },
    { icon: TrendingUp, label: 'Monthly Visitors', value: '100K+', description: 'Growing community engagement' }
  ]

  const values = [
    {
      icon: Target,
      title: 'Local Focus',
      description: 'Everything we do is designed specifically for Pittsburgh residents, businesses, and visitors. No generic content here.'
    },
    {
      icon: Award,
      title: 'Quality First',
      description: 'We verify every business, event, and piece of information to ensure accuracy and reliability for our users.'
    },
    {
      icon: Heart,
      title: 'Community Driven',
      description: 'Built by locals, for locals. We believe in supporting Pittsburgh businesses and strengthening our community.'
    },
    {
      icon: Globe,
      title: 'Always Current',
      description: 'Real-time updates from multiple sources ensure you always have the most current Pittsburgh information.'
    }
  ]

  const team = [
    {
      name: 'Local Pittsburgh Experts',
      role: 'Content & Community',
      description: 'Our team consists of lifelong Pittsburgh residents and local business owners who understand the unique character of our city.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold via-yellow-400 to-orange-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            About PittsburghEverything
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Your complete guide to Pittsburgh. Connecting locals with the best restaurants, events, businesses, and experiences in the Steel City.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit-business"
              className="bg-pittsburgh-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              List Your Business
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-pittsburgh-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-pittsburgh-black mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To be Pittsburgh's most comprehensive and trusted resource for local information,
              connecting residents, businesses, and visitors with everything the Steel City has to offer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-pittsburgh-black mb-4">What We Do</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pittsburgh-gold rounded-full mt-2"></div>
                  <span>Maintain the most comprehensive business directory in Pittsburgh</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pittsburgh-gold rounded-full mt-2"></div>
                  <span>Provide real-time event calendars and local happenings</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pittsburgh-gold rounded-full mt-2"></div>
                  <span>Curate exclusive deals and promotions from local businesses</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pittsburgh-gold rounded-full mt-2"></div>
                  <span>Offer detailed neighborhood guides and local insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pittsburgh-gold rounded-full mt-2"></div>
                  <span>Provide authentic reviews and recommendations from locals</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-pittsburgh-black mb-4">Why Pittsburgh?</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Pittsburgh is a city of neighborhoods, each with its own unique character,
                  history, and community. From the bustling downtown to the vibrant cultural districts,
                  every corner of Pittsburgh has something special to offer.
                </p>
                <p>
                  Our platform celebrates this diversity by providing hyper-local information
                  that helps residents and visitors discover and engage with all that Pittsburgh has to offer.
                </p>
                <p>
                  Whether you're a lifelong resident or visiting for the first time,
                  PittsburghEverything is your trusted guide to experiencing the best of the Steel City.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do in service of the Pittsburgh community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-pittsburgh-gold rounded-lg flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-pittsburgh-black">{value.title}</h3>
                </div>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pittsburgh natives passionate about showcasing our city's best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-2xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-20 h-20 bg-pittsburgh-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-pittsburgh-black mb-2">{member.name}</h3>
                <p className="text-pittsburgh-gold font-medium mb-4">{member.role}</p>
                <p className="text-gray-700">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Pittsburgh Community</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Whether you're a business owner, local resident, or visitor to Pittsburgh,
            PittsburghEverything is here to help you discover and engage with the best of our city.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit-business"
              className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Add Your Business
            </Link>
            <Link
              href="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/newsletter"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              Join Newsletter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
