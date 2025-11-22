import { Metadata } from 'next'
import { Suspense } from 'react'
import UnsubscribeClient from './UnsubscribeClient'

export const metadata: Metadata = {
  title: 'Unsubscribe from Pittsburgh Pulse Weekly | PittsburghEverything.com',
  description: 'Unsubscribe from Pittsburgh Pulse Weekly newsletter. We\'re sorry to see you go!',
  robots: {
    index: false,
    follow: false
  }
}

function UnsubscribeFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<UnsubscribeFallback />}>
      <UnsubscribeClient />
    </Suspense>
  )
}

