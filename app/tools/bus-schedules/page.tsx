import { Metadata } from 'next'
import BusSchedulesClient from './BusSchedulesClient'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Bus Schedules | Real-Time Transit | PittsburghEverything.com',
  description: 'Get real-time bus arrival predictions from Port Authority of Allegheny County. 100% accurate bus schedules for Pittsburgh with live updates every 30 seconds.',
  keywords: 'Pittsburgh bus schedules, Port Authority transit, real-time bus arrivals, Pittsburgh public transit, bus times Pittsburgh',
  openGraph: {
    title: 'Real-Time Bus Schedules | PittsburghEverything',
    description: 'Get accurate, real-time bus arrival predictions for Pittsburgh from Port Authority.',
    type: 'website'
  }
}

export default function BusSchedulesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Pittsburgh Bus Schedules",
    "description": "Real-time bus arrival predictions from Port Authority of Allegheny County",
    "url": "https://pittsburgheverything.com/tools/bus-schedules",
    "applicationCategory": "TravelApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": {
      "@type": "Organization",
      "name": "PittsburghEverything",
      "url": "https://pittsburgheverything.com"
    }
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <BusSchedulesClient />
    </>
  )
}

