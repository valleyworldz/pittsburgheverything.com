// Error state component for restaurant pages

import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-20">
      <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        {message || 'We couldn\'t load the restaurants. Please try again.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-pittsburgh-gold text-pittsburgh-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center gap-2 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  )
}

