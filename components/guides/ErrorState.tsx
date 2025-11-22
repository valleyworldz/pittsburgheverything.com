import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export default function ErrorState({ message = 'Failed to load guides. Please try again.', onRetry }: ErrorStateProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
      <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-pittsburgh-black mb-2">Something went wrong</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-pittsburgh-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors inline-flex items-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>
      )}
    </div>
  )
}

