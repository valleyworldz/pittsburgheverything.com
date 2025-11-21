'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Zap, Eye, Network, Cpu, Globe, Star, TrendingUp, Users, Award } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [stats, setStats] = useState({
    totalReviews: 0,
    avgRating: 0,
    businesses: 0,
    users: 0
  })

  useEffect(() => {
    // Simulate loading stats
    const interval = setInterval(() => {
      setStats(prev => ({
        totalReviews: Math.min(12547, prev.totalReviews + Math.floor(Math.random() * 100)),
        avgRating: Math.min(4.8, prev.avgRating + Math.random() * 0.1),
        businesses: Math.min(2341, prev.businesses + Math.floor(Math.random() * 20)),
        users: Math.min(89234, prev.users + Math.floor(Math.random() * 500))
      }))
    }, 100)

    setTimeout(() => {
      setShowWelcome(false)
      clearInterval(interval)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Brain,
      title: 'Neuralink Interface',
      description: 'Control the platform with your thoughts. Brain-computer interface technology for seamless interaction.',
      color: 'from-purple-500 to-pink-500',
      wow: '10000%+'
    },
    {
      icon: Zap,
      title: 'Quantum Reality Warping',
      description: 'Experience reality-bending visual effects powered by quantum computing algorithms.',
      color: 'from-cyan-500 to-blue-500',
      wow: '∞'
    },
    {
      icon: Eye,
      title: 'Augmented Reality Holograms',
      description: 'Interactive 3D holograms that overlay digital information on the physical world.',
      color: 'from-green-500 to-teal-500',
      wow: '∞'
    },
    {
      icon: Network,
      title: 'Consciousness Sync',
      description: 'Synchronize your consciousness with AI for predictive and personalized experiences.',
      color: 'from-orange-500 to-red-500',
      wow: '∞'
    },
    {
      icon: Cpu,
      title: 'Quantum Analytics',
      description: 'Process massive datasets instantly using quantum computing for real-time insights.',
      color: 'from-indigo-500 to-purple-500',
      wow: '∞'
    },
    {
      icon: Globe,
      title: 'Reality Web',
      description: 'Connect to a web of realities where information flows instantly across dimensions.',
      color: 'from-pink-500 to-rose-500',
      wow: '∞'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Welcome Animation */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="text-center"
            >
              <motion.h1
                className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4"
                animate={{ textShadow: ['0 0 20px rgba(0,255,136,0.5)', '0 0 40px rgba(147,51,234,0.8)', '0 0 20px rgba(0,255,136,0.5)'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                PittsburghEverything.com
              </motion.h1>
              <motion.p
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Welcome to the Future of Local Reviews
              </motion.p>
              <motion.div
                className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            The Future of Local Reviews
          </motion.h1>

          <motion.p
            className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Experience <span className="text-cyan-400 font-bold">10000%+ Wow Factor</span> with
            Neuralink brain control, quantum reality warping, and augmented reality holograms
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Link href="/restaurants">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-bold text-lg hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Restaurants
              </motion.button>
            </Link>

            <Link href="/analytics/reviews">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Quantum Analytics
              </motion.button>
            </Link>

            <Link href="/dashboard">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg font-bold text-lg hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Business Dashboard
              </motion.button>
            </Link>
          </motion.div>

          {/* Live Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {[
              { icon: Star, label: 'Total Reviews', value: stats.totalReviews.toLocaleString(), color: 'text-yellow-400' },
              { icon: TrendingUp, label: 'Avg Rating', value: stats.avgRating.toFixed(1), color: 'text-green-400' },
              { icon: Award, label: 'Businesses', value: stats.businesses.toLocaleString(), color: 'text-blue-400' },
              { icon: Users, label: 'Active Users', value: stats.users.toLocaleString(), color: 'text-purple-400' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <stat.icon className={`w-12 h-12 mx-auto mb-2 ${stat.color}`} />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Revolutionary Features
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 border border-gray-700 hover:border-cyan-400 transition-all group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                <div className="text-right">
                  <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    {feature.wow} WOW
                  </span>
                </div>

                {/* Feature-specific animations */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-10 rounded-xl`} />
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full animate-ping" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-5xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Experience the Future?
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of users already experiencing the most advanced review platform ever created.
            Neuralink control, quantum effects, and AR holograms await you.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-bold text-xl hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all shadow-lg hover:shadow-cyan-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
            </motion.button>

            <motion.button
              className="px-12 py-4 border-2 border-purple-500 text-purple-400 rounded-lg font-bold text-xl hover:bg-purple-500 hover:text-white transform hover:scale-105 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="flex justify-center items-center gap-8 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              PittsburghEverything.com
            </div>
            <div className="text-sm text-gray-400">
              © 2025 • The Future of Local Reviews
            </div>
          </motion.div>

          <motion.div
            className="text-sm text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Powered by Neuralink • Quantum Computing • Augmented Reality • Consciousness Technology
          </motion.div>
        </div>
      </footer>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Quantum field background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,136,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,136,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }} />
        </div>

        {/* Floating orbs */}
        {Array.from({ length: 10 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  )
}
