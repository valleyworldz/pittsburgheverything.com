'use client'

import { useState, useEffect, useMemo } from 'react'
import { TrendingUp, RefreshCw, Filter, Grid, List } from 'lucide-react'
import LiveCard from '@/components/live/LiveCard'
import AutoRefresh from '@/components/live/AutoRefresh'
import { EventListSkeleton } from '@/components/events/LoadingSkeleton'
import ErrorState from '@/components/events/ErrorState'

interface TrendingItem {
  id: string
  type: 'event' | 'deal' | 'news' | 'weather' | 'sports'
  title: string
  subtitle?: string
  description: string
  location?: string
  time?: string
  endTime?: string
  trending?: string
  priority: 'high' | 'normal' | 'low'
  icon?: string
  url?: string
  metadata?: Record<string, any>
}

export default function TrendingClient() {
  const [trendingItems, setTrendingItems] = useState<TrendingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [filter, setFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const fetchTrendingData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/trending?t=' + Date.now())
      if (!response.ok) throw new Error('Failed to fetch trending data')
      
      const data = await response.json()
      
      if (data.success && data.data) {
        // Transform API data to TrendingItem format
        const items: TrendingItem[] = data.data.map((item: any, index: number) => ({
          id: `trending-${index}-${Date.now()}`,
          type: item.type === 'events' ? 'event' : item.type === 'deals' ? 'deal' : item.type,
          title: item.title,
          description: item.description || '',
          location: item.location,
          time: item.time,
          endTime: item.endTime,
          trending: `#${index + 1} Trending`,
          priority: item.priority || 'normal',
          icon: getIconForType(item.type),
          url: item.url,
          metadata: item.metadata || {}
        }))
        
        setTrendingItems(items)
        setLastUpdate(new Date())
      } else {
        throw new Error('Invalid data format')
      }
    } catch (err) {
      console.error('Error fetching trending data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load trending data')
      // Fallback to mock data
      setTrendingItems(getMockTrendingData())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrendingData()
  }, [])

  const filteredItems = useMemo(() => {
    if (filter === 'all') return trendingItems
    return trendingItems.filter(item => item.type === filter)
  }, [trendingItems, filter])

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

  const getIconForType = (type: string) => {
    const icons: Record<string, string> = {
      'events': '🎭',
      'event': '🎭',
      'deals': '💰',
      'deal': '💰',
      'news': '📰',
      'sports': '🏈',
      'weather': '🌤️'
    }
    return icons[type] || '📌'
  }

  if (error && trendingItems.length === 0) {
    return <ErrorState message={error} onRetry={fetchTrendingData} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Controls */}
      <section className="py-6 bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <AutoRefresh onRefresh={fetchTrendingData} interval={60000} />
              <div className="flex gap-2">
                {['all', 'event', 'deal', 'news', 'sports', 'weather'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      filter === type
                        ? 'bg-pittsburgh-gold text-pittsburgh-black'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
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

      {/* Trending Items */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && trendingItems.length === 0 ? (
            <EventListSkeleton count={6} />
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No trending items found</h3>
              <p className="text-gray-500">Try adjusting your filters or check back later.</p>
            </div>
          ) : (
            <div className={`grid grid-cols-1 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-1'} gap-8`}>
              {filteredItems.map((item) => (
                <LiveCard
                  key={item.id}
                  {...item}
                  onFavorite={handleFavorite}
                  isFavorite={favorites.has(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function getMockTrendingData(): TrendingItem[] {
  return [
    {
      id: '1',
      type: 'sports',
      title: 'Pittsburgh Steelers vs. Chiefs',
      subtitle: 'AFC Championship Game',
      description: 'Over 67,000 fans expected for this crucial playoff game.',
      location: 'Acrisure Stadium',
      time: 'Today 4:30 PM',
      trending: '#1 Trending',
      priority: 'high',
      icon: '🏈',
      metadata: { attendees: '67K+', category: 'Sports' }
    },
    {
      id: '2',
      type: 'deal',
      title: '50% Off at Mineo\'s Pizza',
      subtitle: 'Lunch Special Deal',
      description: 'Large cheese pizza for $9.50. Limited time offer.',
      location: 'Oakland',
      time: 'Expires in 2h',
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      trending: '#2 Trending',
      priority: 'high',
      icon: '🍕',
      metadata: { discount: '50%', savings: '$9.49' }
    },
    {
      id: '3',
      type: 'news',
      title: 'New Tech Hub Opens Downtown',
      subtitle: 'Innovation District Expansion',
      description: 'Google announces $50M investment in Pittsburgh tech scene.',
      location: 'Downtown Pittsburgh',
      time: 'Breaking 30m ago',
      trending: '#3 Trending',
      priority: 'normal',
      icon: '💼',
      metadata: { reads: '12.5K', category: 'Business' }
    }
  ]
}

