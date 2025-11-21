'use client'

import { useState } from 'react'
import { Search, MapPin, Calendar, Utensils, Store, Tag } from 'lucide-react'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery)
  }

  return (
    <section className="text-center mb-16 hero-pattern">
      <div className="animate-fade-in">
        <h1 className="text-5xl lg:text-6xl font-black mb-6 text-pittsburgh-black leading-tight">
          Everything Pittsburgh
          <span className="block text-pittsburgh-gold">In One Place</span>
        </h1>

        <p className="text-xl text-steel-gray mb-12 max-w-3xl mx-auto leading-relaxed">
          Events, restaurants, neighborhoods, services, deals, hidden gems & more.
          Your complete guide to everything happening in Pittsburgh.
        </p>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-primary text-lg py-4 pl-12 pr-4"
              placeholder="Search Pittsburgh (events, food, neighborhoods...)"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-steel-gray w-5 h-5" />
          </div>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
          <div className="text-center group cursor-pointer">
            <div className="bg-pittsburgh-gold/10 rounded-full p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center group-hover:bg-pittsburgh-gold/20 transition-colors">
              <Calendar className="w-8 h-8 text-pittsburgh-gold" />
            </div>
            <span className="text-sm font-medium text-steel-gray group-hover:text-pittsburgh-black transition-colors">Events</span>
          </div>

          <div className="text-center group cursor-pointer">
            <div className="bg-pittsburgh-gold/10 rounded-full p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center group-hover:bg-pittsburgh-gold/20 transition-colors">
              <Utensils className="w-8 h-8 text-pittsburgh-gold" />
            </div>
            <span className="text-sm font-medium text-steel-gray group-hover:text-pittsburgh-black transition-colors">Restaurants</span>
          </div>

          <div className="text-center group cursor-pointer">
            <div className="bg-pittsburgh-gold/10 rounded-full p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center group-hover:bg-pittsburgh-gold/20 transition-colors">
              <MapPin className="w-8 h-8 text-pittsburgh-gold" />
            </div>
            <span className="text-sm font-medium text-steel-gray group-hover:text-pittsburgh-black transition-colors">Neighborhoods</span>
          </div>

          <div className="text-center group cursor-pointer">
            <div className="bg-pittsburgh-gold/10 rounded-full p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center group-hover:bg-pittsburgh-gold/20 transition-colors">
              <Store className="w-8 h-8 text-pittsburgh-gold" />
            </div>
            <span className="text-sm font-medium text-steel-gray group-hover:text-pittsburgh-black transition-colors">Services</span>
          </div>

          <div className="text-center group cursor-pointer">
            <div className="bg-pittsburgh-gold/10 rounded-full p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center group-hover:bg-pittsburgh-gold/20 transition-colors">
              <Tag className="w-8 h-8 text-pittsburgh-gold" />
            </div>
            <span className="text-sm font-medium text-steel-gray group-hover:text-pittsburgh-black transition-colors">Deals</span>
          </div>

          <div className="text-center group cursor-pointer">
            <div className="bg-pittsburgh-gold/10 rounded-full p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center group-hover:bg-pittsburgh-gold/20 transition-colors">
              <Search className="w-8 h-8 text-pittsburgh-gold" />
            </div>
            <span className="text-sm font-medium text-steel-gray group-hover:text-pittsburgh-black transition-colors">AI Guide</span>
          </div>
        </div>
      </div>
    </section>
  )
}
