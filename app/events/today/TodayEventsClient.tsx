'use client'

import { useState, useMemo } from 'react'
import { Calendar, Clock, Grid, List, SortAsc, Filter } from 'lucide-react'
import { getEventsToday } from '@/data/pittsburghEvents'
import EventCard from '@/components/events/EventCard'
import EventFilters, { FilterState } from '@/components/events/EventFilters'
import { EventListSkeleton } from '@/components/events/LoadingSkeleton'
import ErrorState from '@/components/events/ErrorState'
import { filterEvents, sortEvents } from '@/utils/eventUtils'
import type { Event } from '@/data/pittsburghEvents'

export default function TodayEventsClient() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [allEvents, setAllEvents] = useState<Event[]>(() => getEventsToday())
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('date-asc')
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: [],
    neighborhood: [],
    priceRange: [],
    dateRange: 'today',
    features: [],
    ageRestriction: []
  })
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [showFilters, setShowFilters] = useState(false)

  const filteredEvents = useMemo(() => {
    let filtered = filterEvents(allEvents, filters)
    return sortEvents(filtered, sortBy)
  }, [allEvents, filters, sortBy])

  const handleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavs = new Set(prev)
      if (newFavs.has(id)) {
        newFavs.delete(id)
      } else {
        newFavs.add(id)
      }
      return newFavs
    })
  }

  const liveEvents = filteredEvents.filter(e => {
    const now = new Date()
    const start = new Date(`${e.startDate}T${e.startTime}`)
    const end = e.endTime ? new Date(`${e.startDate}T${e.endTime}`) : new Date(start.getTime() + 2 * 60 * 60 * 1000)
    return now >= start && now <= end
  })

  const upcomingEvents = filteredEvents.filter(e => {
    const now = new Date()
    const start = new Date(`${e.startDate}T${e.startTime}`)
    return start > now
  })

  if (error) {
    return <ErrorState message={error} onRetry={() => setError(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-yellow-300" />
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                HAPPENING TODAY
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Events Today
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Everything happening today in Pittsburgh. From sports to concerts, find your perfect event.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">{allEvents.length}</div>
                <div className="text-sm opacity-75">Events Today</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">{liveEvents.length}</div>
                <div className="text-sm opacity-75">Live Now</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">
                  {allEvents.filter(e => e.price.isFree).length}
                </div>
                <div className="text-sm opacity-75">Free Events</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">
                  {new Set(allEvents.map(e => e.category)).size}
                </div>
                <div className="text-sm opacity-75">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Controls */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
              >
                <option value="date-asc">Time: Earliest First</option>
                <option value="date-desc">Time: Latest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-pittsburgh-gold text-pittsburgh-black' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-pittsburgh-gold text-pittsburgh-black' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Panel */}
      {showFilters && (
        <section className="py-6 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <EventFilters onFilterChange={setFilters} initialFilters={filters} />
          </div>
        </section>
      )}

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <EventListSkeleton count={6} />
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No events found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters to see more events.
              </p>
            </div>
          ) : (
            <>
              {liveEvents.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-pittsburgh-black mb-6 flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                    Live Now
                  </h2>
                  <div className={`grid grid-cols-1 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-1'} gap-8`}>
                    {liveEvents.map((event, index) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        index={index}
                        showRanking={false}
                        onFavorite={handleFavorite}
                        isFavorite={favorites.has(event.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {upcomingEvents.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-pittsburgh-black mb-6">
                    Upcoming Today
                  </h2>
                  <div className={`grid grid-cols-1 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-1'} gap-8`}>
                    {upcomingEvents.map((event, index) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        index={index}
                        showRanking={false}
                        onFavorite={handleFavorite}
                        isFavorite={favorites.has(event.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

