import { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { getNightlifeEvents } from '@/data/pittsburghEvents'
import NightlifeClient from './NightlifeClient'

export const metadata: Metadata = {
  title: 'Nightlife in Pittsburgh | Bars, Clubs & Entertainment',
  description: 'Pittsburgh nightlife guide featuring bars, clubs, live music, and entertainment venues. Find the best nightlife spots in the city.',
  keywords: 'nightlife Pittsburgh, bars Pittsburgh, clubs Pittsburgh, live music, entertainment venues',
  openGraph: {
    title: 'Pittsburgh Nightlife | Bars, Clubs & Entertainment',
    description: 'Discover Pittsburgh\'s vibrant nightlife scene with bars, clubs, and live entertainment.',
    images: [
      {
        url: '/images/events/nightlife-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Nightlife in Pittsburgh'
      }
    ]
  }
}

export default function NightlifePage() {
  const events = getNightlifeEvents()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pittsburgh Nightlife",
    "description": "Guide to bars, clubs, and entertainment venues in Pittsburgh.",
    "url": "https://pittsburgheverything.com/events/nightlife",
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
      <NightlifeClient />
    </div>
  )
}
