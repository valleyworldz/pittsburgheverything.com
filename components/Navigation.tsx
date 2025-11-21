'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, Bell, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navigationItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/events', label: 'Events', icon: '📅' },
  { href: '/restaurants', label: 'Restaurants', icon: '🍽️' },
  { href: '/services', label: 'Services', icon: '🛠️' },
  { href: '/neighborhoods', label: 'Neighborhoods', icon: '🏘️' },
  { href: '/deals', label: 'Deals', icon: '💰' },
  { href: '/things-to-do', label: 'Things to Do', icon: '🎭' },
  { href: '/top-100', label: 'Top 100', icon: '⭐' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
          : 'bg-white border-b border-gray-100'
      }`}
      role="banner"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2 rounded-lg p-1"
            aria-label="PittsburghEverything - Go to homepage"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-black"
            >
              <span className="text-pittsburgh-gold group-hover:text-yellow-500 transition-colors">
                Pittsburgh
              </span>
              <span className="text-pittsburgh-black group-hover:text-gray-800 transition-colors">
                Everything
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2 ${
                  isActive(item.href)
                    ? 'text-pittsburgh-gold bg-pittsburgh-gold/10'
                    : 'text-gray-700 hover:text-pittsburgh-black hover:bg-gray-50'
                }`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                <span className="flex items-center space-x-2">
                  <span aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </span>
                {isActive(item.href) && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pittsburgh-gold rounded-full"
                    layoutId="activeIndicator"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Search */}
            <button
              className="p-2 text-gray-600 hover:text-pittsburgh-gold hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2"
              aria-label="Search PittsburghEverything"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button
              className="relative p-2 text-gray-600 hover:text-pittsburgh-gold hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </button>

            {/* User Account */}
            <button
              className="p-2 text-gray-600 hover:text-pittsburgh-gold hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2"
              aria-label="User account menu"
            >
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-pittsburgh-gold hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-gray-200 bg-white"
              role="menu"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2 ${
                      isActive(item.href)
                        ? 'text-pittsburgh-gold bg-pittsburgh-gold/10'
                        : 'text-gray-700 hover:text-pittsburgh-black hover:bg-gray-50'
                    }`}
                    role="menuitem"
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    <span className="flex items-center space-x-3">
                      <span className="text-lg" aria-hidden="true">{item.icon}</span>
                      <span>{item.label}</span>
                    </span>
                  </Link>
                ))}

                {/* Mobile Action Buttons */}
                <div className="border-t border-gray-200 pt-3 mt-3 space-y-1">
                  <button className="flex items-center space-x-3 w-full px-3 py-3 text-left text-gray-700 hover:text-pittsburgh-black hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2">
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-3 py-3 text-left text-gray-700 hover:text-pittsburgh-black hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2">
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-3 py-3 text-left text-gray-700 hover:text-pittsburgh-black hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2">
                    <User className="w-5 h-5" />
                    <span>Account</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
