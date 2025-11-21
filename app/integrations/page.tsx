import type { Metadata } from 'next'
import { Zap, Settings, Link } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Integrations | PittsburghEverything',
  description: 'Connect your business with third-party services and platforms.',
  keywords: 'integrations, API connections, third-party services, business tools',
}

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-pittsburgh-gold via-yellow-400 to-orange-400 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Link className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Integrations</h1>
          </div>
          <p className="text-xl opacity-90">
            Connect your business with popular third-party services and platforms.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Zap className="w-16 h-16 text-pittsburgh-gold mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-pittsburgh-black mb-4">Business Integrations</h2>
          <p className="text-gray-600">
            Seamlessly connect with CRM, email marketing, accounting, and other business tools.
          </p>
        </div>
      </section>
    </div>
  )
}
