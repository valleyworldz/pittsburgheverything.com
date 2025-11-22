'use client'

import { useState, useEffect } from 'react'
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

export default function UnsubscribeClient() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const emailParam = searchParams.get('email')
    const token = searchParams.get('token')
    
    if (emailParam) {
      setEmail(emailParam)
      // Auto-unsubscribe if token is present
      if (token) {
        handleUnsubscribe(emailParam, token)
      }
    }
  }, [searchParams])

  const handleUnsubscribe = async (unsubscribeEmail?: string, token?: string) => {
    const emailToUnsubscribe = unsubscribeEmail || email

    if (!emailToUnsubscribe || !emailToUnsubscribe.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const params = new URLSearchParams({
        action: 'unsubscribe',
        email: emailToUnsubscribe,
        ...(token && { token })
      })

      const response = await fetch(`/api/newsletter?${params.toString()}`, {
        method: 'GET'
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setMessage(data.message || 'You have been successfully unsubscribed.')
      } else {
        throw new Error(data.error || 'Failed to unsubscribe')
      }
    } catch (error: any) {
      setStatus('error')
      setMessage(error.message || 'Something went wrong. Please try again later.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Unsubscribe from Pittsburgh Pulse Weekly
          </h1>
          <p className="text-gray-600">
            We're sorry to see you go! You can resubscribe anytime.
          </p>
        </div>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Unsubscribed Successfully</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500">
              You will no longer receive Pittsburgh Pulse Weekly emails. 
              You can resubscribe anytime from our newsletter page.
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleUnsubscribe()
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={status === 'loading'}
              />
            </div>

            {status === 'error' && message && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading' || !email}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Unsubscribing...</span>
                </>
              ) : (
                <span>Unsubscribe</span>
              )}
            </button>
          </form>
        )}

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Changed your mind?
          </p>
          <a
            href="/newsletter"
            className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
          >
            Resubscribe to Pittsburgh Pulse Weekly
          </a>
        </div>
      </motion.div>
    </div>
  )
}

