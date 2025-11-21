'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react'

function VerifyReviewContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'invalid'>('loading')
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const verifyReview = async () => {
      const token = searchParams.get('token')
      const reviewId = searchParams.get('reviewId')

      if (!token || !reviewId) {
        setStatus('invalid')
        setMessage('Invalid verification link. Missing token or review ID.')
        return
      }

      try {
        const response = await fetch('/api/reviews/verify', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reviewId,
            verificationToken: token,
          }),
        })

        const result = await response.json()

        if (result.success) {
          setStatus('success')
          setMessage('Your review has been verified and is now live! Thank you for helping the Pittsburgh community.')
        } else {
          setStatus('error')
          setMessage(result.message || 'Failed to verify review. The link may be expired or invalid.')
        }
      } catch (error) {
        console.error('Verification error:', error)
        setStatus('error')
        setMessage('An error occurred while verifying your review. Please try again later.')
      }
    }

    verifyReview()
  }, [searchParams])

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-500" />
      case 'error':
        return <XCircle className="w-16 h-16 text-red-500" />
      case 'invalid':
        return <AlertCircle className="w-16 h-16 text-yellow-500" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'text-blue-600'
      case 'success':
        return 'text-green-600'
      case 'error':
        return 'text-red-600'
      case 'invalid':
        return 'text-yellow-600'
    }
  }

  const handleGoHome = () => {
    router.push('/')
  }

  const handleGoToBusiness = () => {
    // TODO: Navigate to the business page that was reviewed
    router.push('/restaurants')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          {getStatusIcon()}
        </div>

        <h1 className={`text-2xl font-bold mb-4 ${getStatusColor()}`}>
          {status === 'loading' && 'Verifying Your Review...'}
          {status === 'success' && 'Review Verified!'}
          {status === 'error' && 'Verification Failed'}
          {status === 'invalid' && 'Invalid Link'}
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          {message}
        </p>

        {status !== 'loading' && (
          <div className="space-y-3">
            {status === 'success' && (
              <button
                onClick={handleGoToBusiness}
                className="w-full bg-pittsburgh-gold text-pittsburgh-black py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors font-semibold"
              >
                View My Review
              </button>
            )}

            <button
              onClick={handleGoHome}
              className={`w-full py-3 px-6 rounded-lg transition-colors font-semibold ${
                status === 'success'
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-pittsburgh-gold text-pittsburgh-black hover:bg-yellow-400'
              }`}
            >
              {status === 'success' ? 'Back to Home' : 'Return Home'}
            </button>

            {status === 'error' && (
              <p className="text-sm text-gray-500 mt-4">
                If you continue having issues, please contact support@pittsburgheverything.com
              </p>
            )}
          </div>
        )}

        {status === 'success' && (
          <div className="mt-8 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">What happens next?</h3>
            <ul className="text-sm text-green-700 space-y-1 text-left">
              <li>• Your review is now live and visible to other users</li>
              <li>• The business will be notified of your review</li>
              <li>• You may receive updates about the business</li>
              <li>• Your feedback helps improve Pittsburgh's local scene</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default function VerifyReviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading verification...</p>
        </div>
      </div>
    }>
      <VerifyReviewContent />
    </Suspense>
  )
}
