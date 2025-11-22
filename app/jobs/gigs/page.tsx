import { Metadata } from 'next'
import { DollarSign, Clock, MapPin, Users, Briefcase, Zap } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import GigsClient from './GigsClient'

export const metadata: Metadata = {
  title: 'Gigs in Pittsburgh | Freelance Work, Side Hustles & Temporary Jobs',
  description: 'Find flexible gigs in Pittsburgh. Freelance work, side hustles, and temporary opportunities. Set your own schedule and earn extra income.',
  keywords: 'gigs Pittsburgh, freelance work, side hustles, temporary jobs, flexible work, part-time gigs',
  openGraph: {
    title: 'Gigs in Pittsburgh | Freelance & Flexible Work',
    description: 'Find flexible gigs, freelance work, and side hustles in Pittsburgh. Set your own schedule and earn on your terms.',
    images: [
      {
        url: '/images/jobs/gigs-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Freelance gigs in Pittsburgh'
      }
    ]
  }
}

export default function GigsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Gigs in Pittsburgh",
    "description": "Find freelance work, side hustles, and flexible gig opportunities in Pittsburgh.",
    "url": "https://pittsburgheverything.com/jobs/gigs",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const gigCategories = [
    {
      title: 'Delivery & Rideshare',
      gigs: 45,
      icon: Zap,
      color: 'blue',
      description: 'Uber, Lyft, DoorDash, Uber Eats'
    },
    {
      title: 'Creative Services',
      gigs: 28,
      icon: Users,
      color: 'purple',
      description: 'Photography, graphic design, writing'
    },
    {
      title: 'Home Services',
      gigs: 32,
      icon: Briefcase,
      color: 'green',
      description: 'Cleaning, repairs, lawn care'
    },
    {
      title: 'Events & Entertainment',
      gigs: 19,
      icon: Clock,
      color: 'orange',
      description: 'Bartending, DJ, event staff'
    },
    {
      title: 'Retail & Sales',
      gigs: 41,
      icon: DollarSign,
      color: 'red',
      description: 'Seasonal retail, product demos'
    },
    {
      title: 'Online & Remote',
      gigs: 23,
      icon: MapPin,
      color: 'teal',
      description: 'Virtual assistance, online tutoring'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Gigs in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Flexible work opportunities. Set your own schedule and earn extra income with freelance gigs and side hustles.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Zap className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">85+</div>
                <div className="text-sm opacity-75">Active Gigs</div>
              </div>
              <div className="text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">$15-50</div>
                <div className="text-sm opacity-75">Avg Hourly</div>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">Flexible</div>
                <div className="text-sm opacity-75">Schedule</div>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">Quick</div>
                <div className="text-sm opacity-75">Start</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">💰 Earn on Your Terms</h3>
              <p className="opacity-90">
                Choose gigs that fit your schedule. Work when you want, earn what you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gig Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Explore Gig Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find flexible work that matches your skills and interests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gigCategories.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.title} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    category.color === 'blue' ? 'bg-blue-100' :
                    category.color === 'purple' ? 'bg-purple-100' :
                    category.color === 'green' ? 'bg-green-100' :
                    category.color === 'orange' ? 'bg-orange-100' :
                    category.color === 'red' ? 'bg-red-100' :
                    'bg-teal-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      category.color === 'blue' ? 'text-blue-600' :
                      category.color === 'purple' ? 'text-purple-600' :
                      category.color === 'green' ? 'text-green-600' :
                      category.color === 'orange' ? 'text-orange-600' :
                      category.color === 'red' ? 'text-red-600' :
                      'text-teal-600'
                    }`} />
                  </div>

                  <h3 className="text-xl font-bold text-pittsburgh-black mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pittsburgh-gold">{category.gigs}</span>
                    <span className="text-sm text-gray-500">available</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <GigsClient />

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              How Gig Work Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to start earning with flexible gigs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-pittsburgh-black mb-4">Choose Your Gigs</h3>
              <p className="text-gray-700">
                Browse available opportunities that match your skills, schedule, and interests.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-pittsburgh-black mb-4">Set Your Schedule</h3>
              <p className="text-gray-700">
                Work when you want. Accept gigs that fit your availability and lifestyle.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-pittsburgh-black mb-4">Get Paid Quickly</h3>
              <p className="text-gray-700">
                Complete gigs and get paid promptly. Many offer same-week payment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Gigging?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Take control of your schedule and income. Find gigs that work for you in Pittsburgh.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#featured-gigs"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Available Gigs
            </Link>
            <Link
              href="/jobs/post"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Post a Gig Opportunity
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
