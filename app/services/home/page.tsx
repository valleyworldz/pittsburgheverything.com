import { Metadata } from 'next'
import { Home, Wrench, Zap, Droplets, Paintbrush, Sparkles } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import { getHomeServices } from '@/data/pittsburghServices'
import HomeServicesClient from './HomeServicesClient'

export const metadata: Metadata = {
  title: 'Home Services in Pittsburgh | Plumbing, Electrical, HVAC & More',
  description: 'Find trusted home service professionals in Pittsburgh. Plumbing, electrical, HVAC, handyman, cleaning, and landscaping services.',
  keywords: 'Pittsburgh home services, plumbing, electrical, HVAC, handyman, cleaning, landscaping',
  openGraph: {
    title: 'Home Services in Pittsburgh | Trusted Professionals',
    description: 'Connect with licensed and insured home service professionals in Pittsburgh.',
    images: [
      {
        url: '/images/services/home-services-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Home services in Pittsburgh'
      }
    ]
  }
}

export default function HomeServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Home Services in Pittsburgh",
    "description": "Find trusted home service professionals in Pittsburgh.",
    "url": "https://pittsburgheverything.com/services/home",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allServices = getHomeServices()
  const totalServices = allServices.length
  const verifiedCount = allServices.filter(s => s.verified).length
  const emergencyCount = allServices.filter(s => s.emergencyService).length

  const categories = [
    { name: 'Plumbing', icon: Droplets, count: allServices.filter(s => s.subcategory === 'Plumbing').length },
    { name: 'Electrical', icon: Zap, count: allServices.filter(s => s.subcategory === 'Electrical').length },
    { name: 'HVAC', icon: Sparkles, count: allServices.filter(s => s.subcategory === 'HVAC').length },
    { name: 'Handyman', icon: Wrench, count: allServices.filter(s => s.subcategory === 'Handyman').length },
    { name: 'Cleaning', icon: Sparkles, count: allServices.filter(s => s.subcategory === 'Cleaning').length },
    { name: 'Landscaping', icon: Paintbrush, count: allServices.filter(s => s.subcategory === 'Landscaping').length }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Home Services in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Find trusted, licensed professionals for all your home service needs. From plumbing to landscaping.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Home className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{totalServices}+</div>
                <div className="text-sm opacity-75">Service Providers</div>
              </div>
              <div className="text-center">
                <Wrench className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{verifiedCount}</div>
                <div className="text-sm opacity-75">Verified</div>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{emergencyCount}</div>
                <div className="text-sm opacity-75">24/7 Emergency</div>
              </div>
              <div className="text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-75">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Service Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse services by category to find the right professional for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.name} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-pittsburgh-gold/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-pittsburgh-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-pittsburgh-black mb-2">{category.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pittsburgh-gold">{category.count}</span>
                    <span className="text-sm text-gray-500">providers</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <HomeServicesClient />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Are You a Service Provider?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our directory and connect with customers looking for your services.
          </p>
          <Link
            href="/services/submit"
            className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors inline-block"
          >
            Submit Your Business
          </Link>
        </div>
      </section>
    </div>
  )
}

