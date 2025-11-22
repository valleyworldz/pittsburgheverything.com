import { Metadata } from 'next'
import { Briefcase, MapPin, DollarSign, Clock, Building } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import LocalJobsClient from './LocalJobsClient'

export const metadata: Metadata = {
  title: 'Local Jobs in Pittsburgh | Full-Time & Part-Time Employment',
  description: 'Find local jobs in Pittsburgh. Browse full-time and part-time positions from local employers. Career opportunities across all industries.',
  keywords: 'local jobs Pittsburgh, employment, full-time jobs, part-time jobs, career opportunities',
  openGraph: {
    title: 'Local Jobs in Pittsburgh | Employment Opportunities',
    description: 'Browse local job listings in Pittsburgh. Find full-time and part-time positions from trusted employers.',
    images: [
      {
        url: '/images/jobs/local-jobs-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Local jobs in Pittsburgh'
      }
    ]
  }
}

export default function LocalJobsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Local Jobs in Pittsburgh",
    "description": "Find full-time and part-time job opportunities from local Pittsburgh employers.",
    "url": "https://pittsburgheverything.com/jobs/local",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Local Jobs in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Find meaningful work with Pittsburgh employers. From entry-level to executive positions across all industries.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">350+</div>
                <div className="text-sm opacity-75">Active Listings</div>
              </div>
              <div className="text-center">
                <Building className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm opacity-75">Local Employers</div>
              </div>
              <div className="text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">$65K</div>
                <div className="text-sm opacity-75">Avg Salary</div>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">7 days</div>
                <div className="text-sm opacity-75">Avg Response</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/jobs/hiring"
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Clock className="w-5 h-5" />
                Urgent Hiring
              </Link>
              <Link
                href="/jobs/post"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors inline-flex items-center justify-center gap-2"
              >
                <Briefcase className="w-5 h-5" />
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LocalJobsClient />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find the Right Job?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Employers are actively looking for talent. Post your job opening and connect with qualified candidates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/jobs/post"
              className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Post a Job Opening
            </Link>
            <Link
              href="/jobs/hiring"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              View Urgent Openings
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
