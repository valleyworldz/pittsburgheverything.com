import { Metadata } from 'next'
import { Palette, Camera, Video, PenTool, Sparkles } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import { getCreativeServices } from '@/data/pittsburghServices'
import CreativesClient from './CreativesClient'

export const metadata: Metadata = {
  title: 'Creative Services in Pittsburgh | Photography, Design, Video & Writing',
  description: 'Find talented creative professionals in Pittsburgh. Photography, graphic design, videography, and writing services.',
  keywords: 'Pittsburgh creative services, photography, graphic design, videography, writing, creative professionals',
  openGraph: {
    title: 'Creative Services in Pittsburgh | Talented Professionals',
    description: 'Connect with creative professionals for your photography, design, video, and writing needs.',
    images: [
      {
        url: '/images/services/creative-services-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Creative services in Pittsburgh'
      }
    ]
  }
}

export default function CreativesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Creative Services in Pittsburgh",
    "description": "Find talented creative professionals in Pittsburgh.",
    "url": "https://pittsburgheverything.com/services/creatives",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allServices = getCreativeServices()
  const totalServices = allServices.length
  const verifiedCount = allServices.filter(s => s.verified).length

  const categories = [
    { name: 'Photography', icon: Camera, count: allServices.filter(s => s.subcategory === 'Photography').length },
    { name: 'Graphic Design', icon: PenTool, count: allServices.filter(s => s.subcategory === 'Graphic Design').length },
    { name: 'Videography', icon: Video, count: allServices.filter(s => s.subcategory === 'Videography').length },
    { name: 'Writing', icon: PenTool, count: allServices.filter(s => s.subcategory === 'Writing').length }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Creative Services in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Connect with talented creative professionals for photography, design, video, and writing services.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Palette className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{totalServices}+</div>
                <div className="text-sm opacity-75">Creative Professionals</div>
              </div>
              <div className="text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{verifiedCount}</div>
                <div className="text-sm opacity-75">Verified</div>
              </div>
              <div className="text-center">
                <Camera className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">4.8+</div>
                <div className="text-sm opacity-75">Avg Rating</div>
              </div>
              <div className="text-center">
                <Video className="w-8 h-8 mx-auto mb-2 text-white" />
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
              Creative Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse creative services by category
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.name} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-pittsburgh-black mb-2">{category.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">{category.count}</span>
                    <span className="text-sm text-gray-500">providers</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <CreativesClient />

      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Are You a Creative Professional?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our directory and showcase your creative work to potential clients.
          </p>
          <Link
            href="/services/submit"
            className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-block"
          >
            Submit Your Business
          </Link>
        </div>
      </section>
    </div>
  )
}

