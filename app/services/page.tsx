import type { Metadata } from 'next'
import ServiceDirectory from '@/components/ServiceDirectory'

export const metadata: Metadata = {
  title: 'Local Services in Pittsburgh | PittsburghEverything',
  description: 'Find trusted local services in Pittsburgh. From healthcare and legal services to home improvement and professional services.',
  keywords: 'Pittsburgh services, healthcare, legal, home services, professional services',
}

export default function ServicesPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-4">Pittsburgh Services</h1>
        <p className="text-xl text-steel-gray max-w-2xl mx-auto">
          Connect with trusted local professionals and service providers across Pittsburgh.
        </p>
      </div>

      <div className="bg-gradient-to-r from-pittsburgh-black to-steel-gray rounded-xl p-8 text-white">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-black text-pittsburgh-gold mb-2">500+</div>
            <div className="text-sm">Verified Businesses</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-black text-pittsburgh-gold mb-2">50+</div>
            <div className="text-sm">Service Categories</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-black text-pittsburgh-gold mb-2">24/7</div>
            <div className="text-sm">Emergency Services</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-black text-pittsburgh-gold mb-2">100%</div>
            <div className="text-sm">Satisfaction Guarantee</div>
          </div>
        </div>
      </div>

      <ServiceDirectory />

      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <h2 className="text-2xl font-black mb-4">Need a Specific Service?</h2>
        <p className="mb-6 text-steel-gray">
          Can't find what you're looking for? Let us know and we'll help connect you with the right professional.
        </p>
        <button className="btn-primary">
          Request Service
        </button>
      </div>
    </div>
  )
}
