import type { Metadata } from 'next'
import EventGrid from '@/components/EventGrid'

export const metadata: Metadata = {
  title: 'Events in Pittsburgh | PittsburghEverything',
  description: 'Discover the best events happening in Pittsburgh. From concerts and festivals to sports and cultural events.',
  keywords: 'Pittsburgh events, concerts, festivals, sports, cultural events',
}

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-4">Pittsburgh Events</h1>
        <p className="text-xl text-steel-gray max-w-2xl mx-auto">
          Never miss a beat. Discover concerts, festivals, sports events, and cultural happenings across Pittsburgh.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-4 py-2 bg-pittsburgh-gold text-pittsburgh-black rounded-full font-semibold">
            All Events
          </button>
          <button className="px-4 py-2 bg-gray-100 text-steel-gray rounded-full hover:bg-gray-200 transition-colors">
            Music & Concerts
          </button>
          <button className="px-4 py-2 bg-gray-100 text-steel-gray rounded-full hover:bg-gray-200 transition-colors">
            Sports
          </button>
          <button className="px-4 py-2 bg-gray-100 text-steel-gray rounded-full hover:bg-gray-200 transition-colors">
            Food & Drink
          </button>
          <button className="px-4 py-2 bg-gray-100 text-steel-gray rounded-full hover:bg-gray-200 transition-colors">
            Arts & Culture
          </button>
          <button className="px-4 py-2 bg-gray-100 text-steel-gray rounded-full hover:bg-gray-200 transition-colors">
            Holiday
          </button>
        </div>
      </div>

      <EventGrid />

      <div className="bg-gradient-to-r from-pittsburgh-black to-steel-gray rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-black mb-4">Want to List Your Event?</h2>
        <p className="mb-6 text-gray-200">
          Reach thousands of Pittsburghers interested in local events.
        </p>
        <button className="bg-pittsburgh-gold text-pittsburgh-black px-6 py-3 rounded-lg font-semibold hover:bg-pittsburgh-gold/90 transition-colors">
          List Your Event
        </button>
      </div>
    </div>
  )
}
