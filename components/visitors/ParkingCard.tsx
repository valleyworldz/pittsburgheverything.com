'use client'

import { MapPin, Clock, DollarSign, Car, CheckCircle } from 'lucide-react'

interface ParkingCardProps {
  parking: {
    id: string
    name: string
    type: 'garage' | 'lot' | 'street' | 'valet'
    location: {
      address: string
      neighborhood: string
      coordinates?: {
        lat: number
        lng: number
      }
    }
    hours?: string
    rates?: {
      hourly?: number
      daily?: number
      monthly?: number
      notes?: string
    }
    capacity?: number
    accessibility: boolean
    phone?: string
    website?: string
  }
}

export default function ParkingCard({ parking }: ParkingCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'garage':
        return 'bg-blue-100 text-blue-800'
      case 'lot':
        return 'bg-green-100 text-green-800'
      case 'street':
        return 'bg-orange-100 text-orange-800'
      case 'valet':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(parking.type)}`}>
              {parking.type.charAt(0).toUpperCase() + parking.type.slice(1)}
            </span>
            {parking.accessibility && (
              <div className="relative group">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Accessible
                </span>
              </div>
            )}
          </div>

          <h3 className="text-xl font-bold text-pittsburgh-black mb-1">
            {parking.name}
          </h3>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <MapPin className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">{parking.location.address}</span>
      </div>

      {parking.hours && (
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <Clock className="w-4 h-4" />
          <span>{parking.hours}</span>
        </div>
      )}

      {parking.rates && (
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-pittsburgh-black mb-2">
            <DollarSign className="w-4 h-4" />
            <span>Rates</span>
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            {parking.rates.hourly && (
              <div>Hourly: ${parking.rates.hourly.toFixed(2)}</div>
            )}
            {parking.rates.daily && (
              <div>Daily: ${parking.rates.daily.toFixed(2)}</div>
            )}
            {parking.rates.monthly && (
              <div>Monthly: ${parking.rates.monthly.toFixed(2)}</div>
            )}
            {parking.rates.notes && (
              <div className="text-xs text-gray-500 italic">{parking.rates.notes}</div>
            )}
          </div>
        </div>
      )}

      {parking.capacity && (
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Car className="w-4 h-4" />
          <span>Capacity: {parking.capacity} spaces</span>
        </div>
      )}

      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        {parking.phone && (
          <a
            href={`tel:${parking.phone}`}
            className="text-sm text-gray-600 hover:text-pittsburgh-gold transition-colors"
          >
            {parking.phone}
          </a>
        )}
        {parking.website && (
          <a
            href={parking.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-pittsburgh-gold hover:underline"
          >
            Website
          </a>
        )}
      </div>
    </div>
  )
}

