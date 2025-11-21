'use client'

import { useState } from 'react'
import { Star, MapPin, Phone, Globe, Clock, Heart, Share2, ExternalLink } from 'lucide-react'
import ReviewList from './ReviewList'
import type { Restaurant } from '@/types'

interface RestaurantDetailProps {
  restaurant: Restaurant
}

export default function RestaurantDetail({ restaurant }: RestaurantDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview')

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'text-pittsburgh-gold fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-lg font-semibold text-pittsburgh-black">
          {rating}/5
        </span>
      </div>
    )
  }

  const getPriceRangeDescription = (priceRange: string) => {
    const prices = {
      '$': 'Budget-friendly',
      '$$': 'Moderate',
      '$$$': 'Upscale',
      '$$$$': 'Fine dining'
    }
    return prices[priceRange as keyof typeof prices] || priceRange
  }

  const formatHours = (hours: { [key: string]: string }) => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    return days.map((day, index) => ({
      day: dayNames[index],
      hours: hours[day] || 'Closed'
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-pittsburgh-black to-steel-gray">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${restaurant.image || '/images/placeholder-restaurant.svg'})` }}
        ></div>
        <div className="relative z-10 container mx-auto px-4 py-16 h-full flex items-end">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-pittsburgh-gold text-pittsburgh-black px-3 py-1 rounded-full text-sm font-semibold">
                {restaurant.cuisine}
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                {restaurant.neighborhood}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              {restaurant.name}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
              {restaurant.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                    activeTab === 'overview'
                      ? 'text-pittsburgh-gold border-b-2 border-pittsburgh-gold'
                      : 'text-steel-gray hover:text-pittsburgh-black'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                    activeTab === 'reviews'
                      ? 'text-pittsburgh-gold border-b-2 border-pittsburgh-gold'
                      : 'text-steel-gray hover:text-pittsburgh-black'
                  }`}
                >
                  Reviews
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'overview' ? (
                  <div className="space-y-6">
                    {/* Rating and Price */}
                    <div className="flex items-center gap-6">
                      {renderStars(restaurant.rating)}
                      <div className="text-steel-gray">
                        • {getPriceRangeDescription(restaurant.priceRange)}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-bold text-pittsburgh-black mb-3">About</h3>
                      <p className="text-steel-gray leading-relaxed">
                        {restaurant.description}
                      </p>
                    </div>

                    {/* Features */}
                    {restaurant.features && restaurant.features.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-pittsburgh-black mb-3">Highlights</h3>
                        <div className="flex flex-wrap gap-2">
                          {restaurant.features.map((feature) => (
                            <span
                              key={feature}
                              className="bg-pittsburgh-gold/10 text-pittsburgh-gold px-4 py-2 rounded-full text-sm font-semibold"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Hours */}
                    {restaurant.hours && (
                      <div>
                        <h3 className="text-xl font-bold text-pittsburgh-black mb-3">Hours</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          {formatHours(restaurant.hours).map(({ day, hours }) => (
                            <div key={day} className="flex justify-between items-center py-2">
                              <span className="font-medium text-pittsburgh-black">{day}</span>
                              <span className="text-steel-gray">{hours}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <ReviewList
                    businessId={restaurant.id}
                    businessName={restaurant.name}
                    showStats={true}
                    allowSubmission={true}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-pittsburgh-black mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-pittsburgh-gold text-pittsburgh-black rounded-lg hover:bg-yellow-400 transition-colors font-semibold">
                  <Phone className="w-5 h-5" />
                  Call Now
                </button>

                {restaurant.website && (
                  <a
                    href={restaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-3 px-4 py-3 border border-pittsburgh-gold text-pittsburgh-gold rounded-lg hover:bg-pittsburgh-gold hover:text-white transition-colors font-semibold"
                  >
                    <Globe className="w-5 h-5" />
                    Visit Website
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                )}

                <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-300 text-steel-gray rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5" />
                  Save to Favorites
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-300 text-steel-gray rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-pittsburgh-black mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-pittsburgh-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-pittsburgh-black font-medium">Address</p>
                    <p className="text-steel-gray">{restaurant.address}</p>
                  </div>
                </div>

                {restaurant.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-pittsburgh-gold flex-shrink-0" />
                    <div>
                      <p className="text-pittsburgh-black font-medium">Phone</p>
                      <p className="text-steel-gray">{restaurant.phone}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-pittsburgh-gold flex-shrink-0" />
                  <div>
                    <p className="text-pittsburgh-black font-medium">Cuisine</p>
                    <p className="text-steel-gray">{restaurant.cuisine}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-pittsburgh-gold flex-shrink-0" />
                  <div>
                    <p className="text-pittsburgh-black font-medium">Neighborhood</p>
                    <p className="text-steel-gray">{restaurant.neighborhood}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Summary */}
            <div className="bg-gradient-to-br from-pittsburgh-gold/10 to-yellow-50 rounded-lg border border-pittsburgh-gold/20 p-6">
              <h3 className="text-lg font-bold text-pittsburgh-black mb-4">Rating Summary</h3>
              <div className="text-center">
                <div className="text-4xl font-black text-pittsburgh-black mb-2">
                  {restaurant.rating}
                </div>
                <div className="flex justify-center mb-3">
                  {renderStars(Math.round(restaurant.rating))}
                </div>
                <p className="text-steel-gray text-sm">
                  Based on community reviews
                </p>
                <p className="text-steel-gray text-sm mt-1">
                  {getPriceRangeDescription(restaurant.priceRange)} • {restaurant.cuisine}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
