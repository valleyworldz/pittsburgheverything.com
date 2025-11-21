'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  loadingMessage: string
  setLoadingMessage: (message: string) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

interface LoadingProviderProps {
  children: ReactNode
}

export default function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('Loading...')

  const value = {
    isLoading,
    setIsLoading,
    loadingMessage,
    setLoadingMessage,
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}

      {/* Global Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center"
            role="dialog"
            aria-labelledby="loading-title"
            aria-describedby="loading-message"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl p-8 shadow-2xl max-w-sm mx-4 text-center"
            >
              {/* Loading Spinner */}
              <div className="relative w-16 h-16 mx-auto mb-4">
                <motion.div
                  className="absolute inset-0 border-4 border-pittsburgh-gold/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-0 border-4 border-transparent border-t-pittsburgh-gold rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              <h2 id="loading-title" className="text-lg font-semibold text-gray-900 mb-2">
                Loading
              </h2>

              <p id="loading-message" className="text-sm text-gray-600">
                {loadingMessage}
              </p>

              {/* Progress indicator */}
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-pittsburgh-gold h-2 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  )
}

// Loading Spinner Component
export function LoadingSpinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <motion.div
        className="w-full h-full border-2 border-pittsburgh-gold/20 border-t-pittsburgh-gold rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

// Skeleton Loader Components
export function SkeletonText({ lines = 1, className = '' }: { lines?: number, className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 rounded animate-pulse"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 animate-pulse ${className}`}>
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  )
}

export function SkeletonImage({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gray-200 animate-pulse rounded-lg ${className}`}>
      <div className="flex items-center justify-center h-full text-gray-400">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  )
}
