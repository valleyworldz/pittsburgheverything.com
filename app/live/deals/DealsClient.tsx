'use client'

import { useState, useEffect, useMemo } from 'react'
import { Tag, Zap, Filter, Grid, List, DollarSign, Clock, Star, MapPin } from 'lucide-react'
import LiveCard from '@/components/live/LiveCard'
import CountdownTimer from '@/components/live/CountdownTimer'
import AutoRefresh from '@/components/live/AutoRefresh'
import { EventListSkeleton } from '@/components/events/LoadingSkeleton'
import ErrorState from '@/components/events/ErrorState'

interface Deal {
  id: string
  title: string
  businessName: string
  description: string
  discount: string
  category: string
  validUntil: string | Date
  location?: string
  originalPrice?: string
  salePrice?: string
  rating?: number
  reviewCount?: number
  savings?: number
  savingsPercent?: number
  url?: string
  urgency?: 'critical' | 'high' | 'medium' | 'low'
}

export default function DealsClient() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('time')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const fetchDeals = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/live/deals?t=' + Date.now())
      if (!response.ok) throw new Error('Failed to fetch deals')

      const data = await response.json()

      if (data.deals && Array.isArray(data.deals)) {
        const transformedDeals: Deal[] = data.deals.map((deal: any) => ({
          id: deal.id || `deal-${Date.now()}-${Math.random()}`,
          title: deal.title || deal.name || 'Special Deal',
          businessName: deal.businessName || deal.business || 'Local Business',
          description: deal.description || '',
          discount: deal.discount || '50%',
          category: deal.category || 'General',
          validUntil: deal.validUntil ? new Date(deal.validUntil) : new Date(Date.now() + 24 * 60 * 60 * 1000),
          location: deal.location || 'Pittsburgh',
          originalPrice: deal.originalPrice ? `$${deal.originalPrice}` : undefined,
          salePrice: deal.price ? `$${deal.price}` : undefined,
          rating: deal.rating,
          reviewCount: deal.reviewCount,
          savings: deal.savings,
          savingsPercent: deal.savingsPercent,
          url: deal.url,
          urgency: calculateUrgency(deal.validUntil)
        }))
        setDeals(transformedDeals)
      } else {
        throw new Error('Invalid data format')
      }
    } catch (err) {
      console.error('Error fetching deals:', err)
      setError(err instanceof Error ? err.message : 'Failed to load deals')
      setDeals(getMockDeals())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDeals()
  }, [])

  const calculateUrgency = (validUntil?: string | Date): 'critical' | 'high' | 'medium' | 'low' => {
    if (!validUntil) return 'low'
    const end = typeof validUntil === 'string' ? new Date(validUntil) : validUntil
    const hoursLeft = (end.getTime() - Date.now()) / (1000 * 60 * 60)
    if (hoursLeft < 1) return 'critical'
    if (hoursLeft < 3) return 'high'
    if (hoursLeft < 12) return 'medium'
    return 'low'
  }

  const filteredAndSortedDeals = useMemo(() => {
    let filtered = deals

    if (filter !== 'all') {
      filtered = filtered.filter(deal => deal.category.toLowerCase() === filter.toLowerCase())
    }

    // Sort deals
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'time':
          const aTime = typeof a.validUntil === 'string' ? new Date(a.validUntil).getTime() : a.validUntil.getTime()
          const bTime = typeof b.validUntil === 'string' ? new Date(b.validUntil).getTime() : b.validUntil.getTime()
          return aTime - bTime
        case 'discount':
          const aDiscount = parseFloat(a.discount.replace('%', '')) || 0
          const bDiscount = parseFloat(b.discount.replace('%', '')) || 0
          return bDiscount - aDiscount
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [deals, filter, sortBy])

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

  const getUrgencyColor = (urgency?: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      default: return 'bg-green-500'
    }
  }

  const getUrgencyText = (urgency?: string) => {
    switch (urgency) {
      case 'critical': return 'ENDING SOON'
      case 'high': return 'HOT DEAL'
      case 'medium': return 'GOOD DEAL'
      default: return 'LIVE'
    }
  }

  if (error && deals.length === 0) {
    return <ErrorState message={error} onRetry={fetchDeals} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Controls */}
      <section className="py-6 bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 flex-wrap">
              <AutoRefresh onRefresh={fetchDeals} interval={60000} />
              <div className="flex gap-2">
                {['all', 'Food', 'Services', 'Shopping', 'Entertainment'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat.toLowerCase())}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      filter === cat.toLowerCase()
                        ? 'bg-pittsburgh-gold text-pittsburgh-black'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
              >
                <option value="time">Time: Ending Soon</option>
                <option value="discount">Discount: Highest First</option>
                <option value="rating">Rating: Highest First</option>
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

      {/* Deals Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && deals.length === 0 ? (
            <EventListSkeleton count={6} />
          ) : filteredAndSortedDeals.length === 0 ? (
            <div className="text-center py-20">
              <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No deals found</h3>
              <p className="text-gray-500">Try adjusting your filters or check back later.</p>
            </div>
          ) : (
            <div className={`grid grid-cols-1 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-1'} gap-8`}>
              {filteredAndSortedDeals.map((deal) => (
                <div key={deal.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
                  {/* Deal Badge */}
                  <div className={`px-4 py-2 ${getUrgencyColor(deal.urgency)} text-white text-center font-bold text-sm flex items-center justify-center gap-2`}>
                    <Zap className="w-4 h-4" />
                    {getUrgencyText(deal.urgency)}
                  </div>

                  {/* Deal Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-pittsburgh-black mb-2">{deal.title}</h3>
                        <p className="text-gray-600 mb-3 text-sm">{deal.businessName}</p>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          {deal.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {deal.location}
                            </span>
                          )}
                          {deal.rating && (
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              {deal.rating}
                              {deal.reviewCount && ` (${deal.reviewCount})`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 text-sm line-clamp-2">{deal.description}</p>

                    {/* Countdown Timer */}
                    <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Expires in:</span>
                        <CountdownTimer 
                          endTime={deal.validUntil} 
                          className="text-orange-600 font-bold"
                        />
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mb-4">
                      <div className="flex items-center gap-3">
                        {deal.originalPrice && (
                          <div className="text-center">
                            <div className="text-sm text-gray-500 line-through">{deal.originalPrice}</div>
                            <div className="text-2xl font-bold text-green-600">{deal.salePrice || deal.discount}</div>
                          </div>
                        )}
                        {!deal.originalPrice && (
                          <div className="text-2xl font-bold text-green-600">{deal.discount}</div>
                        )}
                        {deal.savings && (
                          <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                            Save ${deal.savings}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-pittsburgh-gold text-pittsburgh-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2">
                      <Tag className="w-4 h-4" />
                      Claim Deal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function getMockDeals(): Deal[] {
  return [
    {
      id: '1',
      title: '50% Off Pizza Lunch Special',
      businessName: 'Mineo\'s Pizza House',
      description: 'Large cheese pizza with your choice of toppings. Valid Monday-Friday 11am-2pm.',
      discount: '50%',
      category: 'Food',
      validUntil: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      location: 'Oakland',
      originalPrice: '$18.99',
      salePrice: '$9.50',
      rating: 4.8,
      reviewCount: 127,
      savings: 9.49,
      urgency: 'high'
    },
    {
      id: '2',
      title: 'Buy One Get One Free Coffee',
      businessName: 'Crazy Mocha',
      description: 'BOGO on any specialty coffee drink. Valid with student ID.',
      discount: '50%',
      category: 'Beverages',
      validUntil: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
      location: 'Multiple locations',
      originalPrice: '$4.50',
      salePrice: '$2.25',
      rating: 4.6,
      reviewCount: 89,
      savings: 2.25,
      urgency: 'critical'
    },
    {
      id: '3',
      title: '25% Off All Services',
      businessName: 'Pittsburgh Barbershop',
      description: 'Haircut, shave, and style combo. First-time customers only.',
      discount: '25%',
      category: 'Services',
      validUntil: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
      location: 'Shadyside',
      originalPrice: '$35',
      salePrice: '$26.25',
      rating: 4.9,
      reviewCount: 203,
      savings: 8.75,
      urgency: 'medium'
    }
  ]
}

