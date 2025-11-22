'use client'

import { useState, useMemo } from 'react'
import { Grid, List, Car, Bus } from 'lucide-react'
import { getAllParkingLocations, getAllTransitOptions } from '@/data/pittsburghVisitors'
import type { ParkingLocation, TransitOption } from '@/data/pittsburghVisitors'
import ParkingCard from '@/components/visitors/ParkingCard'
import TransitCard from '@/components/visitors/TransitCard'

export default function ParkingTransitClient() {
  const [activeTab, setActiveTab] = useState<'parking' | 'transit'>('parking')
  const [parkingType, setParkingType] = useState('All Types')
  const [transitType, setTransitType] = useState('All Types')

  const allParking = useMemo(() => getAllParkingLocations(), [])
  const allTransit = useMemo(() => getAllTransitOptions(), [])

  const parkingTypes = useMemo(() => {
    const types = Array.from(new Set(allParking.map(p => p.type)))
    return ['All Types', ...types.map(t => t.charAt(0).toUpperCase() + t.slice(1))]
  }, [allParking])

  const transitTypes = useMemo(() => {
    const types = Array.from(new Set(allTransit.map(t => t.type)))
    return ['All Types', ...types.map(t => t.charAt(0).toUpperCase() + t.slice(1).replace('-', ' '))]
  }, [allTransit])

  const filteredParking = useMemo(() => {
    if (parkingType === 'All Types') return allParking
    const type = parkingType.toLowerCase()
    return allParking.filter(p => p.type === type)
  }, [allParking, parkingType])

  const filteredTransit = useMemo(() => {
    if (transitType === 'All Types') return allTransit
    const type = transitType.toLowerCase().replace(' ', '-')
    return allTransit.filter(t => t.type === type)
  }, [allTransit, transitType])

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex items-center gap-4 mb-6 border-b">
            <button
              onClick={() => setActiveTab('parking')}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === 'parking'
                  ? 'border-pittsburgh-gold text-pittsburgh-gold'
                  : 'border-transparent text-gray-600 hover:text-pittsburgh-gold'
              }`}
            >
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5" />
                <span>Parking</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('transit')}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === 'transit'
                  ? 'border-pittsburgh-gold text-pittsburgh-gold'
                  : 'border-transparent text-gray-600 hover:text-pittsburgh-gold'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bus className="w-5 h-5" />
                <span>Transit</span>
              </div>
            </button>
          </div>

          {/* Filters */}
          {activeTab === 'parking' && (
            <div className="mb-6">
              <select
                value={parkingType}
                onChange={(e) => setParkingType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
              >
                {parkingTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          )}

          {activeTab === 'transit' && (
            <div className="mb-6">
              <select
                value={transitType}
                onChange={(e) => setTransitType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
              >
                {transitTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'parking' && (
            <div>
              <h2 className="text-2xl font-bold text-pittsburgh-black mb-6">
                Parking Locations ({filteredParking.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredParking.map((parking) => (
                  <ParkingCard
                    key={parking.id}
                    parking={parking}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'transit' && (
            <div>
              <h2 className="text-2xl font-bold text-pittsburgh-black mb-6">
                Transit Options ({filteredTransit.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTransit.map((transit) => (
                  <TransitCard
                    key={transit.id}
                    transit={transit}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

