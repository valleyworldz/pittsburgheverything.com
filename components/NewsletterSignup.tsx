'use client'

import { useState } from 'react'
import { Mail, Check, Loader2 } from 'lucide-react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setStatus('error')
      setMessage('Please enter your email address')
      return
    }

    setStatus('loading')

    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setMessage('Welcome to PittsburghEverything! Check your email for confirmation.')
        setEmail('')
      } else {
        throw new Error('Failed to subscribe')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again later.')
    }
  }

  return (
    <section className="bg-gradient-to-r from-pittsburgh-black to-steel-gray rounded-xl p-8 md:p-12 text-center text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4">
          <Mail className="w-32 h-32" />
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black mb-4">
          Get the Pittsburgh Pulse
        </h2>

        <p className="text-lg mb-8 text-gray-200">
          Join Pittsburghers getting weekly updates on the best events,
          hottest deals, and hidden gems in our city. Delivered every Friday.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg text-pittsburgh-black placeholder:text-steel-gray focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold"
                disabled={status === 'loading'}
              />
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-steel-gray" />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[120px] justify-center"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Joining...
                </>
              ) : status === 'success' ? (
                <>
                  <Check className="w-4 h-4" />
                  Joined!
                </>
              ) : (
                'Join Now'
              )}
            </button>
          </div>

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              status === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}
        </form>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-300">
          <div className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-pittsburgh-gold" />
            <span>Weekly event roundup</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-pittsburgh-gold" />
            <span>Exclusive deals & discounts</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-pittsburgh-gold" />
            <span>Local business spotlights</span>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          No spam, ever. Unsubscribe anytime.
          Your email stays private and secure.
        </p>
      </div>
    </section>
  )
}
