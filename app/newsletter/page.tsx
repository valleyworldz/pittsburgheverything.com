import { Metadata } from 'next'
import NewsletterClient from './NewsletterClient'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Pittsburgh Pulse Weekly | Free Newsletter | PittsburghEverything.com',
  description: 'Subscribe to Pittsburgh Pulse Weekly - your free weekly guide to Pittsburgh events, deals, news, and community highlights. Join 5,200+ subscribers.',
  keywords: 'Pittsburgh newsletter, weekly guide, events, deals, local news, Pittsburgh email, subscribe',
  openGraph: {
    title: 'Pittsburgh Pulse Weekly Newsletter',
    description: 'Free weekly newsletter with Pittsburgh events, deals, dining, and local news.',
    type: 'website',
    images: [
      {
        url: '/images/newsletter/pittsburgh-pulse.jpg',
        width: 1200,
        height: 630,
        alt: 'Pittsburgh Pulse Weekly newsletter'
      }
    ]
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function NewsletterPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Newsletter",
    "name": "Pittsburgh Pulse Weekly",
    "description": "Weekly newsletter featuring Pittsburgh events, deals, dining recommendations, and local news.",
    "url": "https://pittsburgheverything.com/newsletter",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything",
      "url": "https://pittsburgheverything.com"
    },
    "distributionFrequency": "Weekly",
    "audience": {
      "@type": "Audience",
      "audienceType": "Pittsburgh residents and visitors"
    }
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <NewsletterClient />
    </>
  )
}
