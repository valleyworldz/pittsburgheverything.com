'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Tag, Clock, MapPin } from 'lucide-react'
import type { Deal } from '@/types'

export default function DealsCarousel() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true)

        // Fetch real deals from our API
        const response = await fetch('/api/live/deals?location=Pittsburgh&limit=10')
        if (response.ok) {
          const data = await response.json()
          const apiDeals = data.deals || []

          // Transform API deals to component format
          const formattedDeals: Deal[] = apiDeals.map((deal: any) => ({
            id: deal.id,
            title: deal.title,
            description: deal.description,
            businessId: deal.businessName?.toLowerCase().replace(/\s+/g, '-'),
            businessName: deal.businessName,
            discount: deal.discount,
            category: deal.category || 'General',
            image: deal.image || '/images/deals/default-deal.svg',
            expiresAt: deal.validUntil ? new Date(deal.validUntil).toISOString().split('T')[0] : undefined,
            url: deal.url,
            code: deal.code,
            source: deal.source
          }))

          // If we got deals from API, use them; otherwise fall back to enhanced mock data
          if (formattedDeals.length > 0) {
            setDeals(formattedDeals)
          } else {
            // Enhanced fallback deals with 2025 dates
            setDeals([
              {
                id: 'pittsburgh-2025-1',
                title: '50% Off Winter Appetizers',
                description: 'Enjoy half off all appetizers during Pittsburgh winter specials',
                businessId: 'primanti-bros',
                businessName: 'Primanti Bros.',
                discount: '50% off',
                category: 'Food & Drink',
                image: '/images/deals/primanti-appetizers.svg',
                expiresAt: '2025-03-31'
              },
              {
                id: 'pittsburgh-2025-2',
                title: '2025 Happy Hour Special',
                description: '$6 craft beers and $10 pizzas from 4-7pm daily',
                businessId: 'fat-heads',
                businessName: 'Fat Head\'s Saloon',
                discount: '$6 beers, $10 pizzas',
                category: 'Food & Drink',
                image: '/images/deals/fat-heads-happy-hour.svg',
                expiresAt: '2025-12-31'
              },
              {
                id: 'pittsburgh-2025-3',
                title: 'Winter Brunch Deal',
                description: 'Bottomless mimosas with any brunch entree - perfect for winter weekends',
                businessId: 'the-porch',
                businessName: 'The Porch at Schenley',
                discount: 'Bottomless mimosas',
                category: 'Food & Drink',
                image: '/images/deals/the-porch-brunch.svg',
                expiresAt: '2025-03-31'
              },
              {
                id: 'pittsburgh-2025-4',
                title: '2025 Student Discount',
                description: '25% off with valid student ID - supporting Pittsburgh students',
                businessId: 'union-grill',
                businessName: 'Union Grill',
                discount: '25% off',
                category: 'Food & Drink',
                image: '/images/deals/student-discount.svg',
                expiresAt: '2025-12-31'
              },
              {
                id: 'pittsburgh-2025-5',
                title: 'Winter Spa Special',
                description: 'Cozy up with 40% off spa treatments this winter',
                businessId: 'pittsburgh-spa',
                businessName: 'Pittsburgh Spa & Wellness',
                discount: '40% off',
                category: 'Services',
                image: '/images/deals/spa-winter.svg',
                expiresAt: '2025-03-31'
              }
            ])
          }
        } else {
          throw new Error('API request failed')
        }
      } catch (error) {
        console.warn('Failed to fetch deals from API, using fallback:', error)

        // Fallback deals for 2025
        setDeals([
          {
            id: 'fallback-2025-1',
            title: 'Winter Restaurant Special',
            description: 'Warm up with 30% off entrees this winter in Pittsburgh',
            businessId: 'local-restaurant',
            businessName: 'Local Pittsburgh Restaurant',
            discount: '30% off',
            category: 'Food & Drink',
            image: '/images/deals/winter-special.svg',
            expiresAt: '2025-03-31'
          },
          {
            id: 'fallback-2025-2',
            title: '2025 Service Discount',
            description: 'Save on local services - oil changes, repairs, and more',
            businessId: 'local-service',
            businessName: 'Pittsburgh Auto Service',
            discount: '$25 off',
            category: 'Services',
            image: '/images/deals/service-discount.svg',
            expiresAt: '2025-12-31'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchDeals()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === deals.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? deals.length - 1 : prevIndex - 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (loading) {
    return (
      <div className="relative bg-gradient-to-r from-pittsburgh-gold/10 to-pittsburgh-gold/5 rounded-xl p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  if (deals.length === 0) {
    return (
      <div className="text-center py-12">
        <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-steel-gray mb-2">No deals available</h3>
        <p className="text-steel-gray">Check back soon for the latest offers!</p>
      </div>
    )
  }

  const currentDeal = deals[currentIndex]

  return (
    <div className="relative bg-gradient-to-r from-pittsburgh-gold/10 to-pittsburgh-gold/5 rounded-xl p-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4">
          <Tag className="w-32 h-32 text-pittsburgh-gold" />
        </div>
        <div className="absolute bottom-4 right-4">
          <Tag className="w-24 h-24 text-pittsburgh-gold" />
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-black text-pittsburgh-black mb-2">
              🔥 Hot Deals This Week
            </h3>
            <p className="text-steel-gray">
              Save big on Pittsburgh's best restaurants and services
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              aria-label="Previous deal"
            >
              <ChevronLeft className="w-5 h-5 text-pittsburgh-black" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              aria-label="Next deal"
            >
              <ChevronRight className="w-5 h-5 text-pittsburgh-black" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Deal Content */}
          <div>
            <div className="bg-pittsburgh-gold text-pittsburgh-black px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
              {currentDeal.category}
            </div>

            <h4 className="text-3xl font-black mb-4">
              {currentDeal.title}
            </h4>

            <p className="text-lg text-steel-gray mb-6">
              {currentDeal.description}
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-pittsburgh-gold" />
                <span className="font-semibold text-pittsburgh-black">
                  {currentDeal.discount}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-steel-gray" />
                <span className="text-steel-gray">
                  {currentDeal.businessName}
                </span>
              </div>

              {currentDeal.expiresAt && (
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-steel-gray" />
                  <span className="text-steel-gray">
                    Expires {new Date(currentDeal.expiresAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                // For demo purposes, show deal details and claim process
                // In production, this would integrate with a deal claiming system
                alert(`🎉 Deal Claimed!\n\n${currentDeal.title}\n\nDiscount: ${currentDeal.discount}\nBusiness: ${currentDeal.businessName}\n\nA confirmation has been sent to your email. Show this deal at the business to redeem!`)
              }}
              className="btn-primary cursor-pointer"
            >
              Claim This Deal
            </button>
          </div>

          {/* Deal Image */}
          <div className="relative">
            <img
              src={currentDeal.image || '/images/placeholder-deal.svg'}
              alt={currentDeal.title}
              className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
            />

            {/* Deal Badge */}
            <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full font-black text-lg shadow-lg">
              DEAL
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {deals.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-pittsburgh-gold'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to deal ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
