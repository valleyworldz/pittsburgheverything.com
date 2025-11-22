import { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { getFamilyEvents } from '@/data/pittsburghEvents'
import FamilyEventsClient from './FamilyEventsClient'

export const metadata: Metadata = {
  title: 'Family Events in Pittsburgh | Kids Activities & Family Fun',
  description: 'Family-friendly events and activities in Pittsburgh. Kids events, family festivals, and activities suitable for all ages.',
  keywords: 'family events Pittsburgh, kids activities, family fun, children events, family festivals',
  openGraph: {
    title: 'Family Events in Pittsburgh | Kids & Family Activities',
    description: 'Discover family-friendly events and activities for all ages in Pittsburgh.',
    images: [
      {
        url: '/images/events/family-events-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Family events in Pittsburgh'
      }
    ]
  }
}

export default function FamilyEventsPage() {
  const events = getFamilyEvents()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Family Events in Pittsburgh",
    "description": "Family-friendly events and activities suitable for all ages.",
    "url": "https://pittsburgheverything.com/events/family",
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
      <FamilyEventsClient />
    </div>
  )
}
