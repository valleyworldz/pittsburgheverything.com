'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Utensils, MapPin, Store, Tag, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Hero from '@/components/Hero'
import EventGrid from '@/components/EventGrid'
import RestaurantList from '@/components/RestaurantList'
import ServiceDirectory from '@/components/ServiceDirectory'
import AIGuideWidget from '@/components/AIGuideWidget'
import NewsletterSignup from '@/components/NewsletterSignup'
import Pittsburgh3DBackground from '@/components/Pittsburgh3DBackground'

export default function HomePage() {
  const quickLinks = [
    { icon: Calendar, label: 'Events', href: '/events', color: 'from-blue-500 to-cyan-500' },
    { icon: Utensils, label: 'Restaurants', href: '/restaurants', color: 'from-yellow-500 to-orange-500' },
    { icon: MapPin, label: 'Neighborhoods', href: '/neighborhoods', color: 'from-green-500 to-teal-500' },
    { icon: Store, label: 'Services', href: '/services', color: 'from-purple-500 to-pink-500' },
    { icon: Tag, label: 'Deals', href: '/deals', color: 'from-red-500 to-rose-500' },
    { icon: Sparkles, label: 'Top 100', href: '/top-100', color: 'from-indigo-500 to-purple-500' },
  ]

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

      {/* Trending Events Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="flex justify-between items-baseline mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-3xl font-extrabold mb-2 text-pittsburgh-black">
                Trending Events in Pittsburgh
              </h2>
              <p className="text-gray-600">
                What's happening around the Steel City this week
              </p>
            </div>
            <Link
              href="/events"
              className="text-sm font-semibold text-yellow-600 hover:text-yellow-700 flex items-center gap-1 group"
            >
              View All Events
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <EventGrid limit={6} />
        </div>
      </section>

      {/* Featured Restaurants Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="flex justify-between items-baseline mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
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
              className="text-sm font-semibold text-yellow-600 hover:text-yellow-700 flex items-center gap-1 group"
            >
              See All Restaurants
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <RestaurantList limit={8} />
        </div>
      </section>

      {/* Local Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold mb-2 text-pittsburgh-black">
              Pittsburgh Local Services
            </h2>
            <p className="text-gray-600">
              Find trusted local businesses — from roofers and HVAC to photographers and DJs
            </p>
          </motion.div>
          <ServiceDirectory limit={6} />
        </div>
      </section>

      {/* AI Guide Widget Section */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold mb-2 text-pittsburgh-black">
              Ask Pittsburgh (AI Guide)
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get instant answers about Pittsburgh — where to eat, what to do, which neighborhoods fit your vibe, and more
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AIGuideWidget />
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-white">
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
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              { number: '300K+', label: 'Pittsburgh Residents', icon: MapPin },
              { number: '90+', label: 'Neighborhoods', icon: MapPin },
              { number: '500+', label: 'Restaurants', icon: Utensils },
              { number: '1000+', label: 'Events Per Year', icon: Calendar },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-pittsburgh-gold" />
                <div className="text-4xl font-extrabold mb-2 text-pittsburgh-gold">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      </div>
    </div>
  )
}
