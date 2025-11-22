import { Metadata } from 'next'
import { Wrench, Car, Settings, Sparkles } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import { getAutoRepairServices } from '@/data/pittsburghServices'
import AutoRepairClient from './AutoRepairClient'

export const metadata: Metadata = {
  title: 'Auto Repair in Pittsburgh | Car Repair, Tire Service & Body Shops',
  description: 'Find trusted auto repair shops in Pittsburgh. General repair, tire service, body shops, and more. Licensed and insured.',
  keywords: 'Pittsburgh auto repair, car repair, tire service, body shop, auto mechanics',
  openGraph: {
    title: 'Auto Repair in Pittsburgh | Trusted Mechanics',
    description: 'Find licensed and insured auto repair professionals in Pittsburgh.',
    images: [
      {
        url: '/images/services/auto-repair-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Auto repair in Pittsburgh'
      }
    ]
  }
}

export default function AutoRepairPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Auto Repair in Pittsburgh",
    "description": "Find trusted auto repair shops in Pittsburgh.",
    "url": "https://pittsburgheverything.com/services/auto",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allServices = getAutoRepairServices()
  const totalServices = allServices.length
  const verifiedCount = allServices.filter(s => s.verified).length

  const categories = [
    { name: 'General Auto Repair', icon: Wrench, count: allServices.filter(s => s.subcategory === 'General Auto Repair').length },
    { name: 'Tire Service', icon: Car, count: allServices.filter(s => s.subcategory === 'Tire Service').length },
    { name: 'Body Shop', icon: Settings, count: allServices.filter(s => s.subcategory === 'Body Shop').length }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Auto Repair in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Find trusted, licensed auto repair professionals. All makes and models welcome.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Car className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{totalServices}+</div>
                <div className="text-sm opacity-75">Auto Shops</div>
              </div>
              <div className="text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{verifiedCount}</div>
                <div className="text-sm opacity-75">Verified</div>
              </div>
              <div className="text-center">
                <Wrench className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">4.7+</div>
                <div className="text-sm opacity-75">Avg Rating</div>
              </div>
              <div className="text-center">
                <Settings className="w-8 h-8 mx-auto mb-2 text-white" />
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
              Browse auto repair services by category
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.name} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-pittsburgh-black mb-2">{category.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{category.count}</span>
                    <span className="text-sm text-gray-500">shops</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <AutoRepairClient />

      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Are You an Auto Repair Shop?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our directory and connect with customers looking for auto repair services.
          </p>
          <Link
            href="/services/submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Submit Your Business
          </Link>
        </div>
      </section>
    </div>
  )
}

