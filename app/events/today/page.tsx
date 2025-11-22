import { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { getEventsToday } from '@/data/pittsburghEvents'
import TodayEventsClient from './TodayEventsClient'

export const metadata: Metadata = {
  title: 'Events Today in Pittsburgh | Today\'s Schedule & Tickets',
  description: 'Find all events happening today in Pittsburgh. Concerts, sports, festivals, and more with tickets and schedules.',
  keywords: 'events today Pittsburgh, concerts today, sports today, festivals today, tickets, schedule',
  openGraph: {
    title: 'Events Today in Pittsburgh | Complete Schedule',
    description: 'Everything happening today in Pittsburgh - concerts, sports, festivals, and events.',
    images: [
      {
        url: '/images/events/events-today-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Events today in Pittsburgh'
      }
    ]
  }
}

export default function EventsTodayPage() {
  const events = getEventsToday()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Events Today in Pittsburgh",
    "description": "Complete schedule of events happening today in Pittsburgh.",
    "url": "https://pittsburgheverything.com/events/today",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": events.length,
      "itemListElement": events.map((event, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Event",
          "name": event.title,
          "startDate": `${event.startDate}T${event.startTime}`,
          "location": {
            "@type": "Place",
            "name": event.venue.name,
            "address": event.location.address
          },
          "offers": {
            "@type": "Offer",
            "price": event.price.isFree ? "0" : event.price.min.toString(),
            "priceCurrency": event.price.currency
          }
        }
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />
      <TodayEventsClient />
    </div>
  )
}
