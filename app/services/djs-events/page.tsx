import { Metadata } from 'next'
import { Music, Calendar, Camera, Sparkles } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import { getDJsEventsServices } from '@/data/pittsburghServices'
import DJsEventsClient from './DJsEventsClient'

export const metadata: Metadata = {
  title: 'DJs & Events in Pittsburgh | Wedding DJs, Event Planning & Entertainment',
  description: 'Find professional DJs, event planners, and entertainment services in Pittsburgh. Wedding DJs, party planning, and event rentals.',
  keywords: 'Pittsburgh DJs, event planning, wedding DJs, party planning, event entertainment, photo booth rentals',
  openGraph: {
    title: 'DJs & Events in Pittsburgh | Professional Entertainment',
    description: 'Find professional DJs, event planners, and entertainment services for your next event.',
    images: [
      {
        url: '/images/services/djs-events-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'DJs and events in Pittsburgh'
      }
    ]
  }
}

export default function DJsEventsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "DJs & Events in Pittsburgh",
    "description": "Find professional DJs, event planners, and entertainment services in Pittsburgh.",
    "url": "https://pittsburgheverything.com/services/djs-events",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allServices = getDJsEventsServices()
  const totalServices = allServices.length
  const verifiedCount = allServices.filter(s => s.verified).length

  const categories = [
    { name: 'DJ Services', icon: Music, count: allServices.filter(s => s.subcategory === 'DJ Services').length },
    { name: 'Event Planning', icon: Calendar, count: allServices.filter(s => s.subcategory === 'Event Planning').length },
    { name: 'Event Rentals', icon: Camera, count: allServices.filter(s => s.subcategory === 'Event Rentals').length }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      <section className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              DJs & Events in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Find professional DJs, event planners, and entertainment services for your next event.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Music className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{totalServices}+</div>
                <div className="text-sm opacity-75">Entertainment Services</div>
              </div>
              <div className="text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{verifiedCount}</div>
                <div className="text-sm opacity-75">Verified</div>
              </div>
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">4.8+</div>
                <div className="text-sm opacity-75">Avg Rating</div>
              </div>
              <div className="text-center">
                <Camera className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-75">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Service Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse entertainment and event services by category
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.name} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-pittsburgh-black mb-2">{category.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-600">{category.count}</span>
                    <span className="text-sm text-gray-500">providers</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <DJsEventsClient />

      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Are You a DJ or Event Professional?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our directory and connect with customers planning their next event.
          </p>
          <Link
            href="/services/submit"
            className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors inline-block"
          >
            Submit Your Business
          </Link>
        </div>
      </section>
    </div>
  )
}

