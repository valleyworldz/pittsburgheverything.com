'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Search, Bell, User, ChevronDown, Home, Calendar, Utensils, Wrench, MapPin, DollarSign, Theater, Star } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

// Enhanced navigation items with better icons and descriptions
const navigationItems = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
    description: 'Homepage',
    shortcut: 'Alt+H'
  },
  {
    href: '/events',
    label: 'Events',
    icon: Calendar,
    description: 'Local events and entertainment',
    shortcut: 'Alt+E'
  },
  {
    href: '/restaurants',
    label: 'Restaurants',
    icon: Utensils,
    description: 'Dining and food scene',
    shortcut: 'Alt+R'
  },
  {
    href: '/services',
    label: 'Services',
    icon: Wrench,
    description: 'Local services and businesses',
    shortcut: 'Alt+S'
  },
  {
    href: '/neighborhoods',
    label: 'Neighborhoods',
    icon: MapPin,
    description: 'Explore Pittsburgh neighborhoods',
    shortcut: 'Alt+N'
  },
  {
    href: '/deals',
    label: 'Deals',
    icon: DollarSign,
    description: 'Savings and special offers',
    shortcut: 'Alt+D'
  },
  {
    href: '/things-to-do',
    label: 'Things to Do',
    icon: Theater,
    description: 'Activities and attractions',
    shortcut: 'Alt+T'
  },
  {
    href: '/top-100',
    label: 'Top 100',
    icon: Star,
    description: 'Best of Pittsburgh',
    shortcut: 'Alt+1'
  },
]

// Skip to main content link component
function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-pittsburgh-gold focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white transition-all"
    >
      Skip to main content
    </a>
  )
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const lastScrollY = useRef(0)

  // Enhanced scroll detection with hide/show behavior
  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY.current ? "down" : "up"
    const shouldHide = direction === "down" && latest > 100
    const shouldShow = direction === "up" || latest < 10

    if (shouldHide) setIsVisible(false)
    if (shouldShow) setIsVisible(true)

    setIsScrolled(latest > 10)
    lastScrollY.current = latest
  })

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + key shortcuts
      if (e.altKey) {
        const item = navigationItems.find(item => item.shortcut === `Alt+${e.key.toUpperCase()}`)
        if (item) {
          e.preventDefault()
          router.push(item.href)
        }
      }

      // Escape key handling
      if (e.key === 'Escape') {
        setIsOpen(false)
        setIsSearchOpen(false)
      }

      // Search shortcut
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
        setTimeout(() => searchInputRef.current?.focus(), 100)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [router])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  // Focus management for mobile menu
  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      const firstLink = mobileMenuRef.current.querySelector('a')
      firstLink?.focus()
    }
  }, [isOpen])

  const isActive = useCallback((href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }, [pathname])

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('search') as string
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsSearchOpen(false)
    }
  }

  return (
    <>
      <SkipToContent />

      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200/50'
            : 'bg-white/90 backdrop-blur-sm border-b border-gray-100/50'
        }`}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Enhanced Logo */}
            <Link
              href="/"
              className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2 rounded-xl p-2 transition-all duration-200"
              aria-label="PittsburghEverything - Go to homepage"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="text-2xl lg:text-3xl font-black tracking-tight"
              >
                <span className="text-pittsburgh-gold group-hover:text-yellow-500 transition-all duration-300 drop-shadow-sm">
                  Pittsburgh
                </span>
                <span className="text-pittsburgh-black group-hover:text-gray-800 transition-all duration-300 ml-1">
                  Everything
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1" role="menubar">
              {navigationItems.map((item, index) => {
                const Icon = item.icon
                const isItemActive = isActive(item.href)

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={`relative group px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2 focus:ring-offset-white ${
                        isItemActive
                          ? 'text-pittsburgh-gold bg-gradient-to-r from-pittsburgh-gold/10 to-yellow-50 shadow-sm'
                          : 'text-gray-700 hover:text-pittsburgh-black hover:bg-gray-50/80 hover:shadow-md'
                      }`}
                      role="menuitem"
                      aria-current={isItemActive ? 'page' : undefined}
                      aria-describedby={`nav-${item.label.toLowerCase().replace(' ', '-')}-description`}
                      title={`${item.description} (${item.shortcut})`}
                    >
                      <motion.span
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className={`w-4 h-4 transition-colors ${
                          isItemActive ? 'text-pittsburgh-gold' : 'text-gray-500 group-hover:text-pittsburgh-gold'
                        }`} />
                        <span className="relative">
                          {item.label}
                          {isItemActive && (
                            <motion.div
                              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pittsburgh-gold rounded-full"
                              layoutId="activeUnderline"
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </span>
                      </motion.span>

                      {/* Tooltip */}
                      <div
                        id={`nav-${item.label.toLowerCase().replace(' ', '-')}-description`}
                        className="sr-only"
                      >
                        {item.description}. Keyboard shortcut: {item.shortcut}
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Enhanced Action Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              {/* Search */}
              <div className="relative">
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.form
                      initial={{ opacity: 0, scale: 0.95, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95, x: 20 }}
                      onSubmit={handleSearchSubmit}
                      className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50"
                    >
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          ref={searchInputRef}
                          name="search"
                          type="text"
                          placeholder="Search Pittsburgh..."
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                          autoComplete="off"
                        />
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Press Enter to search
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`p-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2 ${
                    isSearchOpen
                      ? 'bg-pittsburgh-gold/10 text-pittsburgh-gold shadow-sm'
                      : 'text-gray-600 hover:text-pittsburgh-gold hover:bg-gray-50/80'
                  }`}
                  aria-label="Search PittsburghEverything"
                  aria-expanded={isSearchOpen}
                  aria-controls="search-menu"
                >
                  <Search className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-3 text-gray-600 hover:text-pittsburgh-gold hover:bg-gray-50/80 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2"
                aria-label="View notifications (3 unread)"
              >
                <Bell className="w-5 h-5" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full text-xs flex items-center justify-center text-white font-bold shadow-lg border-2 border-white"
                >
                  3
                </motion.span>
              </motion.button>

              {/* User Account */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 text-gray-600 hover:text-pittsburgh-gold hover:bg-gray-50/80 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2"
                aria-label="User account menu"
              >
                <User className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2 ${
                isOpen
                  ? 'bg-pittsburgh-gold/10 text-pittsburgh-gold shadow-sm'
                  : 'text-gray-600 hover:text-pittsburgh-gold hover:bg-gray-50/80'
              }`}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </motion.button>
          </div>

          {/* Enhanced Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={mobileMenuRef}
                id="mobile-menu"
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  opacity: { duration: 0.2 }
                }}
                className="lg:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md shadow-xl rounded-b-2xl overflow-hidden"
                role="menu"
                aria-label="Mobile navigation menu"
              >
                <div className="px-4 pt-4 pb-6 space-y-2">
                  {navigationItems.map((item, index) => {
                    const Icon = item.icon
                    const isItemActive = isActive(item.href)

                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <Link
                          href={item.href}
                          className={`group flex items-center space-x-4 w-full px-4 py-4 rounded-xl text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2 ${
                            isItemActive
                              ? 'text-pittsburgh-gold bg-gradient-to-r from-pittsburgh-gold/10 to-yellow-50 shadow-sm'
                              : 'text-gray-700 hover:text-pittsburgh-black hover:bg-gray-50/80 hover:shadow-md'
                          }`}
                          role="menuitem"
                          aria-current={isItemActive ? 'page' : undefined}
                          onClick={() => setIsOpen(false)}
                        >
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Icon className={`w-6 h-6 transition-colors ${
                              isItemActive ? 'text-pittsburgh-gold' : 'text-gray-500 group-hover:text-pittsburgh-gold'
                            }`} />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span>{item.label}</span>
                              <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.shortcut}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}

                  {/* Mobile Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="border-t border-gray-200/50 pt-4 mt-4 space-y-2"
                  >
                    <button
                      onClick={() => {
                        setIsSearchOpen(true)
                        setIsOpen(false)
                        setTimeout(() => searchInputRef.current?.focus(), 300)
                      }}
                      className="flex items-center space-x-4 w-full px-4 py-4 text-left text-gray-700 hover:text-pittsburgh-black hover:bg-gray-50/80 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2"
                    >
                      <Search className="w-6 h-6 text-gray-500" />
                      <span className="font-medium">Search</span>
                    </button>

                    <button className="flex items-center space-x-4 w-full px-4 py-4 text-left text-gray-700 hover:text-pittsburgh-black hover:bg-gray-50/80 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2">
                      <Bell className="w-6 h-6 text-gray-500" />
                      <span className="font-medium">Notifications</span>
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">3</span>
                    </button>

                    <button className="flex items-center space-x-4 w-full px-4 py-4 text-left text-gray-700 hover:text-pittsburgh-black hover:bg-gray-50/80 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2">
                      <User className="w-6 h-6 text-gray-500" />
                      <span className="font-medium">Account</span>
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  )
}
