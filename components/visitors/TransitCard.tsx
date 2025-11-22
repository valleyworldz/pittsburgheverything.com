'use client'

import { Bus, Train, Mountain, Bike, Car, Phone, Globe, DollarSign } from 'lucide-react'

interface TransitCardProps {
  transit: {
    id: string
    name: string
    type: 'bus' | 'light-rail' | 'incline' | 'bike-share' | 'taxi' | 'rideshare'
    description: string
    routes?: string[]
    website?: string
    phone?: string
    fare?: {
      single?: number
      day?: number
      monthly?: number
      notes?: string
    }
  }
}

export default function TransitCard({ transit }: TransitCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bus':
        return Bus
      case 'light-rail':
        return Train
      case 'incline':
        return Mountain
      case 'bike-share':
        return Bike
      case 'taxi':
      case 'rideshare':
        return Car
      default:
        return Bus
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bus':
        return 'bg-blue-100 text-blue-800'
      case 'light-rail':
        return 'bg-green-100 text-green-800'
      case 'incline':
        return 'bg-purple-100 text-purple-800'
      case 'bike-share':
        return 'bg-orange-100 text-orange-800'
      case 'taxi':
      case 'rideshare':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const Icon = getTypeIcon(transit.type)

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(transit.type)}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(transit.type)}`}>
              {transit.type.charAt(0).toUpperCase() + transit.type.slice(1).replace('-', ' ')}
            </span>
          </div>

          <h3 className="text-xl font-bold text-pittsburgh-black mb-1">
            {transit.name}
          </h3>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-4">{transit.description}</p>

      {transit.routes && transit.routes.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-semibold text-pittsburgh-black mb-2">Routes:</div>
          <div className="flex flex-wrap gap-2">
            {transit.routes.map((route, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {route}
              </span>
            ))}
          </div>
        </div>
      )}

      {transit.fare && (
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-pittsburgh-black mb-2">
            <DollarSign className="w-4 h-4" />
            <span>Fares</span>
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            {transit.fare.single && (
              <div>Single Ride: ${transit.fare.single.toFixed(2)}</div>
            )}
            {transit.fare.day && (
              <div>Day Pass: ${transit.fare.day.toFixed(2)}</div>
            )}
            {transit.fare.monthly && (
              <div>Monthly: ${transit.fare.monthly.toFixed(2)}</div>
            )}
            {transit.fare.notes && (
              <div className="text-xs text-gray-500 italic">{transit.fare.notes}</div>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        {transit.phone && (
          <a
            href={`tel:${transit.phone}`}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-pittsburgh-gold transition-colors"
          >
            <Phone className="w-4 h-4" />
            {transit.phone}
          </a>
        )}
        {transit.website && (
          <a
            href={transit.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-pittsburgh-gold hover:underline"
          >
            <Globe className="w-4 h-4" />
            Website
          </a>
        )}
      </div>
    </div>
  )
}

