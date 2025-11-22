import { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { getEventsThisWeekend } from '@/data/pittsburghEvents'
import WeekendEventsClient from './WeekendEventsClient'

export const metadata: Metadata = {
  title: 'Weekend Events in Pittsburgh | Friday to Sunday Schedule',
  description: 'Complete weekend events guide for Pittsburgh. Concerts, festivals, sports, and activities from Friday through Sunday.',
  keywords: 'weekend events Pittsburgh, weekend activities, concerts weekend, festivals Pittsburgh, weekend schedule',
  openGraph: {
    title: 'Weekend Events in Pittsburgh | Complete Guide',
    description: 'Everything happening this weekend in Pittsburgh - concerts, sports, festivals, and more.',
    images: [
      {
        url: '/images/events/weekend-events-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Weekend events in Pittsburgh'
      }
    ]
  }
}

export default function WeekendEventsPage() {
  const events = getEventsThisWeekend()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Weekend Events in Pittsburgh",
    "description": "Complete guide to weekend events, concerts, and activities in Pittsburgh.",
    "url": "https://pittsburgheverything.com/events/weekend",
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
          }
        }
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />
      <WeekendEventsClient />
    </div>
  )
}
