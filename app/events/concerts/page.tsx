import { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { getConcerts } from '@/data/pittsburghEvents'
import ConcertsClient from './ConcertsClient'

export const metadata: Metadata = {
  title: 'Concerts in Pittsburgh | Live Music & Performances',
  description: 'Find concerts and live music performances in Pittsburgh. From symphony orchestras to rock concerts, discover all upcoming shows.',
  keywords: 'concerts Pittsburgh, live music, symphony, performances, shows Pittsburgh',
  openGraph: {
    title: 'Concerts in Pittsburgh | Live Music Events',
    description: 'Discover live music performances and concerts happening in Pittsburgh.',
    images: [
      {
        url: '/images/events/concerts-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Concerts in Pittsburgh'
      }
    ]
  }
}

export default function ConcertsPage() {
  const events = getConcerts()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Concerts in Pittsburgh",
    "description": "Live music performances and concerts in Pittsburgh.",
    "url": "https://pittsburgheverything.com/events/concerts",
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
          "@type": "MusicEvent",
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
      <ConcertsClient />
    </div>
  )
}
