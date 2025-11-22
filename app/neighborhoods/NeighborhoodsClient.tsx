'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, MapPin, Filter, Grid, List, ArrowRight } from 'lucide-react'
import { getAllNeighborhoods, searchNeighborhoods, getNeighborhoodsByDirection, getNeighborhoodsByType } from '@/data/pittsburghNeighborhoods'
import type { NeighborhoodData } from '@/data/pittsburghNeighborhoods'

export default function NeighborhoodsClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDirection, setSelectedDirection] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const allNeighborhoods = getAllNeighborhoods()

  const filteredNeighborhoods = useMemo(() => {
    let filtered = allNeighborhoods

    // Apply search
    if (searchQuery) {
      filtered = searchNeighborhoods(searchQuery)
    }

    // Apply direction filter
    if (selectedDirection !== 'all') {
      filtered = filtered.filter(n => n.direction === selectedDirection)
    }

    // Apply type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(n => n.type === selectedType)
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name))
  }, [searchQuery, selectedDirection, selectedType, allNeighborhoods])

  const directions = ['all', 'Central', 'North', 'South', 'East', 'West', 'Northeast', 'Northwest', 'Southeast', 'Southwest']
  const types = ['all', 'neighborhood', 'suburb', 'township', 'borough']

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
              placeholder="Search neighborhoods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Direction Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Direction
              </label>
              <select
                value={selectedDirection}
                onChange={(e) => setSelectedDirection(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
              >
                {directions.map(dir => (
                  <option key={dir} value={dir}>
                    {dir === 'all' ? 'All Directions' : dir}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="inline w-4 h-4 mr-1" />
                Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
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
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center">
        <p className="text-gray-600">
          Showing <span className="font-bold text-pittsburgh-gold">{filteredNeighborhoods.length}</span> of {allNeighborhoods.length} neighborhoods
        </p>
      </div>

      {/* Neighborhoods Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNeighborhoods.map((neighborhood) => (
            <NeighborhoodCard key={neighborhood.id} neighborhood={neighborhood} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNeighborhoods.map((neighborhood) => (
            <NeighborhoodListItem key={neighborhood.id} neighborhood={neighborhood} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredNeighborhoods.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No neighborhoods found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedDirection('all')
              setSelectedType('all')
            }}
            className="mt-4 text-pittsburgh-gold hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}

function NeighborhoodCard({ neighborhood }: { neighborhood: NeighborhoodData }) {
  return (
    <Link
      href={`/neighborhoods/${neighborhood.slug}`}
      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 group"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-pittsburgh-black group-hover:text-pittsburgh-gold transition-colors">
              {neighborhood.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {neighborhood.type.charAt(0).toUpperCase() + neighborhood.type.slice(1)} • {neighborhood.direction}
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-pittsburgh-gold transition-colors" />
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">
          {neighborhood.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{neighborhood.distanceFromDowntown} mi</span>
          </div>
          <div>
            <span className="font-semibold">Walk Score:</span> {neighborhood.walkScore}/100
          </div>
        </div>

        {neighborhood.highlights.length > 0 && (
          <div className="pt-2 border-t">
            <div className="flex flex-wrap gap-2">
              {neighborhood.highlights.slice(0, 3).map((highlight, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-pittsburgh-gold/10 text-pittsburgh-black px-2 py-1 rounded"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}

function NeighborhoodListItem({ neighborhood }: { neighborhood: NeighborhoodData }) {
  return (
    <Link
      href={`/neighborhoods/${neighborhood.slug}`}
      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 group flex items-center justify-between"
    >
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-bold text-pittsburgh-black group-hover:text-pittsburgh-gold transition-colors">
              {neighborhood.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {neighborhood.type.charAt(0).toUpperCase() + neighborhood.type.slice(1)} • {neighborhood.direction} • {neighborhood.distanceFromDowntown} mi from downtown
            </p>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3">
          {neighborhood.description}
        </p>

        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div>
            <span className="font-semibold">Population:</span> {neighborhood.population.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">Walk Score:</span> {neighborhood.walkScore}/100
          </div>
          <div>
            <span className="font-semibold">Median Income:</span> ${neighborhood.medianIncome.toLocaleString()}
          </div>
        </div>
      </div>

      <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-pittsburgh-gold transition-colors ml-4" />
    </Link>
  )
}

