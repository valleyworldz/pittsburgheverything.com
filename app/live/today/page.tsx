import { Metadata } from 'next'
import { Calendar } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import TodayClient from './TodayClient'

export const metadata: Metadata = {
  title: 'Today in Pittsburgh | Daily Schedule & What\'s Happening',
  description: 'Your complete guide to what\'s happening today in Pittsburgh. Events, weather, deals, and daily highlights all in one place.',
  keywords: 'today Pittsburgh, daily schedule, events today, weather, deals today, Pittsburgh daily',
  openGraph: {
    title: 'Today in Pittsburgh | Daily Guide',
    description: 'Everything happening today in Pittsburgh - events, weather, deals, and more.',
    images: [
      {
        url: '/images/today/pittsburgh-today.jpg',
        width: 1200,
        height: 630,
        alt: 'Today in Pittsburgh'
      }
    ]
  }
}

export default function TodayPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Today in Pittsburgh",
    "description": "Complete daily guide to events, weather, and activities in Pittsburgh.",
    "url": "https://pittsburgheverything.com/live/today",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-yellow-300" />
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                TODAY
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Today in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Your complete daily guide to Pittsburgh
            </p>

            <div className="text-lg opacity-90">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      </section>

      <TodayClient />
    </div>
  )
}
