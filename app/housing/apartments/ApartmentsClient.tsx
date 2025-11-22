'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, MapPin, Filter, Grid, List, DollarSign, Bed, Bath, Car, Dog, Check, X } from 'lucide-react'
import { getAllApartments, getApartmentsByNeighborhood, getAvailableApartments, getPetFriendlyApartments } from '@/data/pittsburghHousing'
import type { ApartmentListing } from '@/data/pittsburghHousing'

export default function ApartmentsClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all')
  const [minRent, setMinRent] = useState<number>(0)
  const [maxRent, setMaxRent] = useState<number>(5000)
  const [bedrooms, setBedrooms] = useState<string>('all')
  const [petFriendly, setPetFriendly] = useState<boolean | null>(null)
  const [parking, setParking] = useState<boolean | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const allApartments = getAllApartments()
  const neighborhoods = Array.from(new Set(allApartments.map(apt => apt.neighborhood))).sort()

  const filteredApartments = useMemo(() => {
    let filtered = allApartments

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(apt =>
        apt.name.toLowerCase().includes(query) ||
        apt.address.toLowerCase().includes(query) ||
        apt.neighborhood.toLowerCase().includes(query) ||
        apt.description.toLowerCase().includes(query)
      )
    }

    // Neighborhood filter
    if (selectedNeighborhood !== 'all') {
      filtered = filtered.filter(apt => apt.neighborhood === selectedNeighborhood)
    }

    // Rent filter
    filtered = filtered.filter(apt => {
      const rents = Object.values(apt.rent).filter(r => r !== undefined) as number[]
      if (rents.length === 0) return false
      const minRentApt = Math.min(...rents)
      const maxRentApt = Math.max(...rents)
      return maxRentApt >= minRent && minRentApt <= maxRent
    })

    // Bedrooms filter
    if (bedrooms !== 'all') {
      const bedCount = parseInt(bedrooms)
      filtered = filtered.filter(apt => {
        if (bedCount === 0) return apt.rent.studio !== undefined
        if (bedCount === 1) return apt.rent.oneBedroom !== undefined
        if (bedCount === 2) return apt.rent.twoBedroom !== undefined
        if (bedCount === 3) return apt.rent.threeBedroom !== undefined
        return true
      })
    }

    // Pet friendly filter
    if (petFriendly !== null) {
      filtered = filtered.filter(apt => apt.petFriendly === petFriendly)
    }

    // Parking filter
    if (parking !== null) {
      filtered = filtered.filter(apt => apt.parking === parking)
    }

    return filtered.sort((a, b) => {
      const aMin = Math.min(...Object.values(a.rent).filter(r => r !== undefined) as number[])
      const bMin = Math.min(...Object.values(b.rent).filter(r => r !== undefined) as number[])
      return aMin - bMin
    })
  }, [searchQuery, selectedNeighborhood, minRent, maxRent, bedrooms, petFriendly, parking, allApartments])

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search apartments by name, address, or neighborhood..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Neighborhood Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Neighborhood
              </label>
              <select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
              >
                <option value="all">All Neighborhoods</option>
                {neighborhoods.map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            {/* Bedrooms Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Bed className="inline w-4 h-4 mr-1" />
                Bedrooms
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
              >
                <option value="all">All Sizes</option>
                <option value="0">Studio</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
              </select>
            </div>

            {/* Rent Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline w-4 h-4 mr-1" />
                Max Rent
              </label>
              <input
                type="number"
                value={maxRent}
                onChange={(e) => setMaxRent(parseInt(e.target.value) || 5000)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                placeholder="Max rent"
              />
            </div>

            {/* View Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                View Mode
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-pittsburgh-gold text-pittsburgh-black border-pittsburgh-gold'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Grid className="inline w-4 h-4 mr-1" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    viewMode === 'list'
                      ? 'bg-pittsburgh-gold text-pittsburgh-black border-pittsburgh-gold'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <List className="inline w-4 h-4 mr-1" />
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={petFriendly === true}
                onChange={(e) => setPetFriendly(e.target.checked ? true : null)}
                className="w-4 h-4 text-pittsburgh-gold focus:ring-pittsburgh-gold"
              />
              <span className="text-sm text-gray-700">Pet Friendly</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={parking === true}
                onChange={(e) => setParking(e.target.checked ? true : null)}
                className="w-4 h-4 text-pittsburgh-gold focus:ring-pittsburgh-gold"
              />
              <span className="text-sm text-gray-700">Parking Available</span>
            </label>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedNeighborhood('all')
                setMinRent(0)
                setMaxRent(5000)
                setBedrooms('all')
                setPetFriendly(null)
                setParking(null)
              }}
              className="text-sm text-pittsburgh-gold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center">
        <p className="text-gray-600">
          Showing <span className="font-bold text-pittsburgh-gold">{filteredApartments.length}</span> of {allApartments.length} apartments
        </p>
      </div>

      {/* Apartments Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApartments.map((apartment) => (
            <ApartmentCard key={apartment.id} apartment={apartment} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApartments.map((apartment) => (
            <ApartmentListItem key={apartment.id} apartment={apartment} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredApartments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No apartments found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

function ApartmentCard({ apartment }: { apartment: ApartmentListing }) {
  const minRent = Math.min(...Object.values(apartment.rent).filter(r => r !== undefined) as number[])
  const maxRent = Math.max(...Object.values(apartment.rent).filter(r => r !== undefined) as number[])

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow overflow-hidden">
      <div className="aspect-video bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <Bed className="w-12 h-12" />
        </div>
        {apartment.available && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Available
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-pittsburgh-black mb-2">{apartment.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {apartment.address}, {apartment.neighborhood}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Rent:</span>
            <span className="font-bold text-pittsburgh-gold">
              ${minRent.toLocaleString()}{minRent !== maxRent ? ` - $${maxRent.toLocaleString()}` : ''}/mo
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Walk Score:</span>
            <span className="font-semibold">{apartment.walkScore}/100</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {apartment.petFriendly && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded flex items-center gap-1">
              <Dog className="w-3 h-3" />
              Pet Friendly
            </span>
          )}
          {apartment.parking && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1">
              <Car className="w-3 h-3" />
              Parking
            </span>
          )}
        </div>

        {apartment.contact.phone && (
          <a
            href={`tel:${apartment.contact.phone}`}
            className="block w-full bg-pittsburgh-gold text-pittsburgh-black text-center py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
          >
            Call {apartment.contact.phone}
          </a>
        )}
      </div>
    </div>
  )
}

function ApartmentListItem({ apartment }: { apartment: ApartmentListing }) {
  const minRent = Math.min(...Object.values(apartment.rent).filter(r => r !== undefined) as number[])
  const maxRent = Math.max(...Object.values(apartment.rent).filter(r => r !== undefined) as number[])

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
          <Bed className="w-12 h-12 text-gray-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold text-pittsburgh-black mb-1">{apartment.name}</h3>
              <p className="text-gray-600 text-sm flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {apartment.address}, {apartment.neighborhood}
              </p>
            </div>
            {apartment.available && (
              <span className="bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">
                Available
              </span>
            )}
          </div>

          <p className="text-gray-700 mb-4 line-clamp-2">{apartment.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-600">Rent</div>
              <div className="font-bold text-pittsburgh-gold">
                ${minRent.toLocaleString()}{minRent !== maxRent ? ` - $${maxRent.toLocaleString()}` : ''}/mo
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Walk Score</div>
              <div className="font-semibold">{apartment.walkScore}/100</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Deposit</div>
              <div className="font-semibold">${apartment.deposit.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Utilities</div>
              <div className="font-semibold capitalize">{apartment.utilities}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {apartment.petFriendly && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded flex items-center gap-1">
                <Dog className="w-3 h-3" />
                Pet Friendly
              </span>
            )}
            {apartment.parking && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1">
                <Car className="w-3 h-3" />
                Parking
              </span>
            )}
            {apartment.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                {amenity}
              </span>
            ))}
          </div>

          {apartment.contact.phone && (
            <a
              href={`tel:${apartment.contact.phone}`}
              className="inline-block bg-pittsburgh-gold text-pittsburgh-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Call {apartment.contact.phone}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

