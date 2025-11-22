import { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { getFestivals } from '@/data/pittsburghEvents'
import FestivalsClient from './FestivalsClient'

export const metadata: Metadata = {
  title: 'Festivals in Pittsburgh | Cultural Events & Celebrations',
  description: 'Pittsburgh festivals and cultural celebrations. From beer festivals to cultural events, find all major festivals in the Steel City.',
  keywords: 'festivals Pittsburgh, cultural events, beer festivals, celebrations Pittsburgh, cultural festivals',
  openGraph: {
    title: 'Festivals in Pittsburgh | Cultural Events & Celebrations',
    description: 'Discover festivals and cultural celebrations happening in Pittsburgh.',
    images: [
      {
        url: '/images/events/festivals-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Festivals in Pittsburgh'
      }
    ]
  }
}

export default function FestivalsPage() {
  const events = getFestivals()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Festivals in Pittsburgh",
    "description": "Cultural events and festivals in Pittsburgh.",
    "url": "https://pittsburgheverything.com/events/festivals",
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
      <FestivalsClient />
    </div>
  )
}
