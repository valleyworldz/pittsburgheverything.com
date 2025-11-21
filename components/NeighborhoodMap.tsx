'use client'

import { useState, useEffect } from 'react'
import { MapPin, Users, Home, TrendingUp, Star } from 'lucide-react'
import Link from 'next/link'
import type { Neighborhood } from '@/types'

interface NeighborhoodMapProps {
  interactive?: boolean
  limit?: number
}

const pittsburghNeighborhoods = [
  {
    id: 'downtown',
    name: 'Downtown',
    description: 'The heart of Pittsburgh with skyscrapers, businesses, and cultural attractions',
    population: 5000,
    walkScore: 95,
    image: '/images/neighborhoods/downtown.svg',
    attractions: ['Point State Park', 'Duquesne Incline', 'PPG Paints Arena'],
    medianIncome: 75000
  },
  {
    id: 'oakland',
    name: 'Oakland',
    description: 'Home to universities, hospitals, and the famous Cathedral of Learning',
    population: 25000,
    walkScore: 88,
    image: '/images/neighborhoods/oakland.svg',
    attractions: ['Carnegie Museum', 'Phipps Conservatory', 'Heinz Field'],
    medianIncome: 45000
  },
  {
    id: 'south-side',
    name: 'South Side',
    description: 'Historic flats with trendy shops, restaurants, and nightlife',
    population: 12000,
    walkScore: 82,
    image: '/images/neighborhoods/south-side.svg',
    attractions: ['South Side Works', 'Carnegie Library', 'Station Square'],
    medianIncome: 65000
  },
  {
    id: 'strip-district',
    name: 'Strip District',
    description: 'Historic warehouse district now filled with specialty shops and food vendors',
    population: 800,
    walkScore: 90,
    image: '/images/neighborhoods/strip-district.svg',
    attractions: ['Whole Foods Market', 'Penn Avenue Fish Company', 'Local craft breweries'],
    medianIncome: 70000
  },
  {
    id: 'lawrenceville',
    name: 'Lawrenceville',
    description: 'Artsy neighborhood with galleries, boutiques, and historic architecture',
    population: 8000,
    walkScore: 85,
    image: '/images/neighborhoods/lawrenceville.svg',
    attractions: ['Lawrenceville Arts & Entertainment District', 'Murry Avenue shops', 'Local theaters'],
    medianIncome: 55000
  },
  {
    id: 'shadyside',
    name: 'Shadyside',
    description: 'Upscale neighborhood with high-end shopping and dining',
    population: 15000,
    walkScore: 78,
    image: '/images/neighborhoods/shadyside.svg',
    attractions: ['Walnut Street shopping', 'Rodef Shalom Congregation', 'Frick Park'],
    medianIncome: 85000
  }
]

export default function NeighborhoodMap({ interactive = true, limit }: NeighborhoodMapProps) {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | null>(null)
  const [hoveredNeighborhood, setHoveredNeighborhood] = useState<string | null>(null)

  const displayNeighborhoods = limit ? pittsburghNeighborhoods.slice(0, limit) : pittsburghNeighborhoods

  const handleNeighborhoodClick = (neighborhood: Neighborhood) => {
    if (interactive) {
      setSelectedNeighborhood(neighborhood)
    }
  }

  return (
    <div className="space-y-6">
      {/* Map Visualization */}
      <div className="relative bg-gradient-to-br from-pittsburgh-gold/5 to-steel-gray/5 rounded-xl p-6 border">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-black mb-2">Pittsburgh Neighborhoods</h3>
          <p className="text-steel-gray">Explore the diverse communities that make our city special</p>
        </div>

        {/* Simple Map Representation */}
        <div className="relative h-96 bg-white rounded-lg overflow-hidden shadow-inner">
          {/* Pittsburgh Skyline Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-pittsburgh-black/10 to-transparent"></div>

          {/* Rivers */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-blue-300/30"></div>
          <div className="absolute top-2/3 left-0 right-0 h-1 bg-blue-300/20"></div>

          {/* Neighborhood Pins */}
          {displayNeighborhoods.map((neighborhood, index) => {
            // Position pins in a rough Pittsburgh layout
            const positions = [
              { top: '20%', left: '45%' }, // Downtown
              { top: '35%', left: '40%' }, // Oakland
              { top: '60%', left: '50%' }, // South Side
              { top: '45%', left: '35%' }, // Strip District
              { top: '25%', left: '60%' }, // Lawrenceville
              { top: '30%', left: '25%' }, // Shadyside
            ]

            const position = positions[index] || { top: '50%', left: '50%' }

            return (
              <button
                key={neighborhood.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  hoveredNeighborhood === neighborhood.id || selectedNeighborhood?.id === neighborhood.id
                    ? 'scale-125 z-10'
                    : 'scale-100'
                }`}
                style={{ top: position.top, left: position.left }}
                onMouseEnter={() => setHoveredNeighborhood(neighborhood.id)}
                onMouseLeave={() => setHoveredNeighborhood(null)}
                onClick={() => handleNeighborhoodClick(neighborhood)}
              >
                <div className="relative">
                  <MapPin
                    className={`w-8 h-8 ${
                      hoveredNeighborhood === neighborhood.id || selectedNeighborhood?.id === neighborhood.id
                        ? 'text-pittsburgh-gold drop-shadow-lg'
                        : 'text-steel-gray'
                    } transition-colors`}
                    fill="currentColor"
                  />
                  <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                    hoveredNeighborhood === neighborhood.id || selectedNeighborhood?.id === neighborhood.id
                      ? 'bg-pittsburgh-gold text-pittsburgh-black'
                      : 'bg-white text-steel-gray shadow-md'
                  } transition-all`}>
                    {neighborhood.name}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-steel-gray">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-300/30 rounded"></div>
            <span>Three Rivers</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-steel-gray" fill="currentColor" />
            <span>Neighborhood</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-pittsburgh-gold" fill="currentColor" />
            <span>Selected</span>
          </div>
        </div>
      </div>

      {/* Selected Neighborhood Details */}
      {selectedNeighborhood && (
        <div className="card animate-fade-in">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={selectedNeighborhood.image || '/images/placeholder-neighborhood.svg'}
                alt={selectedNeighborhood.name}
                className="w-full h-48 md:h-full object-cover rounded-l-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = '/images/placeholder-neighborhood.svg'
                }}
              />
            </div>

            <div className="md:w-2/3 p-6">
              <h3 className="text-2xl font-black mb-4">{selectedNeighborhood.name}</h3>

              <p className="text-steel-gray mb-6">
                {selectedNeighborhood.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <Users className="w-6 h-6 text-pittsburgh-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-pittsburgh-black">
                    {selectedNeighborhood.population?.toLocaleString() || 'N/A'}
                  </div>
                  <div className="text-sm text-steel-gray">Population</div>
                </div>

                <div className="text-center">
                  <TrendingUp className="w-6 h-6 text-pittsburgh-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-pittsburgh-black">
                    {selectedNeighborhood.walkScore || 'N/A'}
                  </div>
                  <div className="text-sm text-steel-gray">Walk Score</div>
                </div>

                <div className="text-center">
                  <Home className="w-6 h-6 text-pittsburgh-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-pittsburgh-black">
                    ${selectedNeighborhood.medianIncome?.toLocaleString() || 'N/A'}
                  </div>
                  <div className="text-sm text-steel-gray">Median Income</div>
                </div>

                <div className="text-center">
                  <Star className="w-6 h-6 text-pittsburgh-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-pittsburgh-black">
                    {selectedNeighborhood.attractions?.length || 0}
                  </div>
                  <div className="text-sm text-steel-gray">Attractions</div>
                </div>
              </div>

              {selectedNeighborhood.attractions && (
                <div>
                  <h4 className="font-bold mb-3">Popular Attractions</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedNeighborhood.attractions.map((attraction) => (
                      <span
                        key={attraction}
                        className="bg-pittsburgh-gold/10 text-pittsburgh-gold px-3 py-1 rounded-full text-sm"
                      >
                        {attraction}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex gap-4">
                <Link
                  href={`/neighborhoods/${selectedNeighborhood.id}`}
                  className="btn-primary"
                >
                  Explore {selectedNeighborhood.name}
                </Link>
                <button
                  onClick={() => {
                    // Open Google Maps with neighborhood location
                    const query = encodeURIComponent(`${selectedNeighborhood.name}, Pittsburgh, PA`)
                    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank')
                  }}
                  className="btn-outline"
                >
                  View on Map
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Neighborhood Grid */}
      {!selectedNeighborhood && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayNeighborhoods.map((neighborhood) => (
            <div
              key={neighborhood.id}
              className="card cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleNeighborhoodClick(neighborhood)}
            >
              <div className="relative">
                <img
                  src={neighborhood.image || '/images/placeholder-neighborhood.svg'}
                  alt={neighborhood.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/images/placeholder-neighborhood.svg'
                  }}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                  {neighborhood.name}
                </div>
              </div>

              <div className="p-6">
                <p className="text-steel-gray mb-4 line-clamp-3">
                  {neighborhood.description}
                </p>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-pittsburgh-black">
                      {neighborhood.walkScore}
                    </div>
                    <div className="text-xs text-steel-gray">Walk Score</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-pittsburgh-black">
                      {neighborhood.population?.toLocaleString() || 'N/A'}
                    </div>
                    <div className="text-xs text-steel-gray">Population</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-pittsburgh-black">
                      {neighborhood.attractions?.length || 0}
                    </div>
                    <div className="text-xs text-steel-gray">Attractions</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
