'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Utensils, MapPin, Store, Tag, Sparkles, ArrowRight, TrendingUp, Users, Star, Zap } from 'lucide-react'
import Link from 'next/link'
import Hero from '@/components/Hero'
import EventGrid from '@/components/EventGrid'
import RestaurantList from '@/components/RestaurantList'
import ServiceDirectory from '@/components/ServiceDirectory'
import AIGuideWidget from '@/components/AIGuideWidget'
import NewsletterSignup from '@/components/NewsletterSignup'
import Pittsburgh3DBackground from '@/components/Pittsburgh3DBackground'
import RealTimeDashboard from '@/components/RealTimeDashboard'
import { SkeletonCard, useLoading } from '@/components/LoadingProvider'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'discover' | 'eat' | 'explore' | 'live'>('discover')
  const { setIsLoading, setLoadingMessage } = useLoading()

  const quickLinks = [
    { icon: Calendar, label: 'Events', href: '/events', color: 'from-blue-500 to-cyan-500' },
    { icon: Utensils, label: 'Restaurants', href: '/restaurants', color: 'from-yellow-500 to-orange-500' },
    { icon: MapPin, label: 'Neighborhoods', href: '/neighborhoods', color: 'from-green-500 to-teal-500' },
    { icon: Store, label: 'Services', href: '/services', color: 'from-purple-500 to-pink-500' },
    { icon: Tag, label: 'Deals', href: '/deals', color: 'from-red-500 to-rose-500' },
    { icon: Sparkles, label: 'Top 100', href: '/top-100', color: 'from-indigo-500 to-purple-500' },
  ]

  const tabContent = {
    discover: {
      title: 'Discover Pittsburgh',
      description: 'Real-time updates, events, and everything happening in the Steel City',
      icon: TrendingUp,
      content: (
        <>
          {/* Real-Time Dashboard */}
          <RealTimeDashboard />

          {/* Featured Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <div className="flex justify-between items-baseline mb-8">
              <div>
                <h2 className="text-3xl font-extrabold mb-2 text-pittsburgh-black">
                  Trending Events
                </h2>
                <p className="text-gray-600">
                  What's happening around the Steel City this week
                </p>
              </div>
              <Link
                href="/events"
                className="text-sm font-semibold text-pittsburgh-gold hover:text-pittsburgh-black flex items-center gap-1 group"
              >
                View All Events
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <EventGrid limit={6} />
          </motion.div>
        </>
      ),
    },
    eat: {
      title: 'Dining & Food Scene',
      description: 'From Primanti Bros to farm-to-table dining, explore Pittsburgh\'s culinary landscape',
      icon: Utensils,
      content: (
        <>
          {/* Featured Restaurants */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-baseline mb-8">
              <div>
                <h2 className="text-3xl font-extrabold mb-2 text-pittsburgh-black">
                  Where to Eat in Pittsburgh
                </h2>
                <p className="text-gray-600">
                  Discover the best restaurants, from iconic Primanti Bros to hidden gems
                </p>
              </div>
              <Link
                href="/restaurants"
                className="text-sm font-semibold text-pittsburgh-gold hover:text-pittsburgh-black flex items-center gap-1 group"
              >
                See All Restaurants
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <RestaurantList limit={8} />
          </motion.div>

          {/* Food Specials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <div className="flex justify-between items-baseline mb-8">
              <div>
                <h2 className="text-3xl font-extrabold mb-2 text-pittsburgh-black">
                  Food Deals & Specials
                </h2>
                <p className="text-gray-600">
                  Save on meals, happy hours, and special dining experiences
                </p>
              </div>
              <Link
                href="/deals?category=food"
                className="text-sm font-semibold text-pittsburgh-gold hover:text-pittsburgh-black flex items-center gap-1 group"
              >
                View Food Deals
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            {/* Food deals would be filtered here */}
          </motion.div>
        </>
      ),
    },
    explore: {
      title: 'Explore Neighborhoods',
      description: 'Navigate Pittsburgh\'s diverse neighborhoods from Downtown to the South Side',
      icon: MapPin,
      content: (
        <>
          {/* Neighborhood Spotlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Downtown Pittsburgh</h3>
              <p className="text-gray-600 mb-6">
                The heart of the city with skyscrapers, cultural attractions, and urban energy.
              </p>
              <Link
                href="/neighborhoods/downtown"
                className="inline-flex items-center gap-2 bg-pittsburgh-gold text-pittsburgh-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Explore Downtown
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lawrenceville</h3>
              <p className="text-gray-600 mb-6">
                Artsy neighborhood with galleries, boutiques, and historic architecture.
              </p>
              <Link
                href="/neighborhoods/lawrenceville"
                className="inline-flex items-center gap-2 bg-pittsburgh-gold text-pittsburgh-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Explore Lawrenceville
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Local Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold mb-2 text-pittsburgh-black">
                Pittsburgh Local Services
              </h2>
              <p className="text-gray-600">
                Find trusted local businesses — from roofers and HVAC to photographers and DJs
              </p>
            </div>
            <ServiceDirectory limit={6} />
          </motion.div>
        </>
      ),
    },
    live: {
      title: 'Living in Pittsburgh',
      description: 'Everything you need to know about living, working, and thriving in the Steel City',
      icon: Users,
      content: (
        <>
          {/* Lifestyle Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <Link href="/things-to-do" className="group">
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-pittsburgh-gold transition-colors group-hover:shadow-lg">
                <div className="w-12 h-12 bg-pittsburgh-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pittsburgh-gold/20 transition-colors">
                  <Sparkles className="w-6 h-6 text-pittsburgh-gold" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pittsburgh-gold transition-colors">
                  Things to Do
                </h3>
                <p className="text-gray-600 text-sm">
                  Attractions, activities, and entertainment options across Pittsburgh
                </p>
              </div>
            </Link>

            <Link href="/top-100" className="group">
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-pittsburgh-gold transition-colors group-hover:shadow-lg">
                <div className="w-12 h-12 bg-pittsburgh-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pittsburgh-gold/20 transition-colors">
                  <Star className="w-6 h-6 text-pittsburgh-gold" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pittsburgh-gold transition-colors">
                  Top 100 Places
                </h3>
                <p className="text-gray-600 text-sm">
                  Pittsburgh's most beloved restaurants, bars, and attractions
                </p>
              </div>
            </Link>

            <Link href="/deals" className="group">
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-pittsburgh-gold transition-colors group-hover:shadow-lg">
                <div className="w-12 h-12 bg-pittsburgh-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pittsburgh-gold/20 transition-colors">
                  <Tag className="w-6 h-6 text-pittsburgh-gold" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pittsburgh-gold transition-colors">
                  Current Deals
                </h3>
                <p className="text-gray-600 text-sm">
                  Save money on dining, services, and entertainment
                </p>
              </div>
            </Link>
          </motion.div>

          {/* AI Guide Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold mb-2 text-pittsburgh-black">
                Ask Pittsburgh (AI Guide)
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get instant answers about Pittsburgh — where to eat, what to do, which neighborhoods fit your vibe, and more
              </p>
            </div>
            <AIGuideWidget />
          </motion.div>
        </>
      ),
    },
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Subtle 3D Pittsburgh Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <Pittsburgh3DBackground />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Hero Section with Pittsburgh Focus */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Hero />
        </motion.div>

      {/* Quick Links with Animated Icons */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {quickLinks.map((link, index) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-yellow-400 hover:shadow-lg transition-all group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${link.color} p-3 mb-3 mx-auto group-hover:scale-110 transition-transform`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <link.icon className="w-full h-full text-white" />
                  </motion.div>
                  <p className="text-sm font-semibold text-center text-gray-700 group-hover:text-yellow-600 transition-colors">
                    {link.label}
                  </p>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <motion.div
            className="flex flex-wrap justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {Object.entries(tabContent).map(([key, tab], index) => {
              const Icon = tab.icon
              const isActive = activeTab === key

              return (
                <motion.button
                  key={key}
                  onClick={() => setActiveTab(key as typeof activeTab)}
                  className={`relative px-6 py-4 mx-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2 ${
                    isActive
                      ? 'text-pittsburgh-black bg-pittsburgh-gold shadow-lg'
                      : 'text-gray-600 hover:text-pittsburgh-black hover:bg-gray-50'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-pittsburgh-black' : 'text-pittsburgh-gold'}`} />
                    <span>{tab.title}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pittsburgh-black rounded-full"
                      layoutId="activeTabIndicator"
                    />
                  )}
                </motion.button>
              )
            })}
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {tabContent[activeTab].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Real-Time Pittsburgh Dashboard */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold mb-2 text-pittsburgh-black">
              Live Pittsburgh Updates
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real-time weather, Steelers scores, bus arrivals, parking availability, and local news
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <RealTimeDashboard />
          </motion.div>
        </div>
      </section>


      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-br from-pittsburgh-gold/5 to-yellow-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <NewsletterSignup />
          </motion.div>
        </div>
      </section>

      {/* Pittsburgh Stats Section */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-pittsburgh-gold rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-pittsburgh-gold rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-pittsburgh-gold rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Pittsburgh by the Numbers</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover why the Steel City continues to thrive and grow
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              { number: '302K', label: 'Pittsburgh Residents', icon: MapPin, description: 'Metro population' },
              { number: '90+', label: 'Neighborhoods', icon: MapPin, description: 'Unique communities' },
              { number: '2.5K+', label: 'Restaurants', icon: Utensils, description: 'Dining options' },
              { number: '1500+', label: 'Events/Year', icon: Calendar, description: 'Annual happenings' },
              { number: '26', label: 'Bridges', icon: Zap, description: 'City of Bridges' },
              { number: '85%', label: 'Walk Score', icon: TrendingUp, description: 'Downtown rating' },
              { number: '3', label: 'Rivers', icon: Users, description: 'Three Rivers City' },
              { number: '1775', label: 'Founded', icon: Star, description: 'Established date' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-pittsburgh-gold/50 transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-pittsburgh-gold" />
                <div className="text-3xl font-extrabold mb-1 text-white">
                  {stat.number}
                </div>
                <div className="text-sm font-semibold text-pittsburgh-gold mb-1">{stat.label}</div>
                <div className="text-xs text-gray-300">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Stats Row */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-pittsburgh-gold mb-2">🏆</div>
              <div className="text-lg font-semibold text-white mb-1">Super Bowl Champion</div>
              <div className="text-sm text-gray-300">Steelers 2009, 2011</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pittsburgh-gold mb-2">🎓</div>
              <div className="text-lg font-semibold text-white mb-1">Top Universities</div>
              <div className="text-sm text-gray-300">CMU, Pitt, Duquesne</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pittsburgh-gold mb-2">🏭</div>
              <div className="text-lg font-semibold text-white mb-1">Innovation Hub</div>
              <div className="text-sm text-gray-300">Tech & Robotics Capital</div>
            </div>
          </motion.div>
        </div>
      </section>

      </div>
    </div>
  )
}
