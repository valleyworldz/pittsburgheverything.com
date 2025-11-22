import { Metadata } from 'next'
import { Car, Bus, MapPin, DollarSign } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import { getAllParkingLocations, getAllTransitOptions } from '@/data/pittsburghVisitors'
import ParkingTransitClient from './ParkingTransitClient'

export const metadata: Metadata = {
  title: 'Parking & Transit in Pittsburgh | Transportation Guide',
  description: 'Complete guide to parking and public transportation in Pittsburgh. Find parking garages, lots, bus routes, light rail, and transit options.',
  keywords: 'Pittsburgh parking, public transit, Port Authority, bus routes, light rail, transportation, parking garages',
  openGraph: {
    title: 'Parking & Transit in Pittsburgh | Transportation Guide',
    description: 'Complete guide to parking and public transportation in Pittsburgh.',
    images: [
      {
        url: '/images/visitors/parking-transit-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Parking and transit in Pittsburgh'
      }
    ]
  }
}

export default function ParkingTransitPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Parking & Transit in Pittsburgh",
    "description": "Complete guide to parking and public transportation in Pittsburgh.",
    "url": "https://pittsburgheverything.com/visitors/parking",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allParking = getAllParkingLocations()
  const allTransit = getAllTransitOptions()
  const totalParking = allParking.length
  const totalTransit = allTransit.length

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Parking & Transit in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Complete guide to getting around Pittsburgh. Find parking locations, public transit options, and transportation tips.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Car className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{totalParking}</div>
                <div className="text-sm opacity-75">Parking Locations</div>
              </div>
              <div className="text-center">
                <Bus className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{totalTransit}</div>
                <div className="text-sm opacity-75">Transit Options</div>
              </div>
              <div className="text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm opacity-75">Available</div>
              </div>
              <div className="text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">$2.75</div>
                <div className="text-sm opacity-75">Transit Fare</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ParkingTransitClient />
    </div>
  )
}

