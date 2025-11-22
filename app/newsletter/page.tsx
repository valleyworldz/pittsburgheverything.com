"use client"

import { useState } from 'react'
import { Mail, Bell, Calendar, Gift, CheckCircle, AlertCircle } from 'lucide-react'

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [frequency, setFrequency] = useState('weekly')
  const [interests, setInterests] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleInterestChange = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          frequency,
          interests,
          source: 'newsletter_signup',
          message: `Newsletter signup: ${frequency} frequency, interests: ${interests.join(', ')}`
        })
      })

      if (!response.ok) throw new Error('Subscription failed')

      setStatus('success')
      setMessage('Successfully subscribed! Check your email for confirmation.')
      setEmail('')
      setInterests([])
    } catch (error) {
      setStatus('error')
      setMessage('Failed to subscribe. Please try again.')
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-pittsburgh-gold via-yellow-400 to-orange-400 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Mail className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Pittsburgh Newsletter</h1>
          </div>
          <p className="text-xl opacity-90">
            Stay updated with the best of Pittsburgh delivered to your inbox.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Bell className="w-16 h-16 text-pittsburgh-gold mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-pittsburgh-black mb-4">Weekly Pittsburgh Digest</h2>
          <p className="text-gray-600 mb-8">
            Get curated updates on local events, exclusive deals, business news, and community highlights every week.
          </p>

          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">What You'll Receive:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-8">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-pittsburgh-gold mt-1" />
                <div>
                  <div className="font-medium">Weekly Events Calendar</div>
                  <div className="text-sm text-gray-600">Never miss important local happenings</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Gift className="w-5 h-5 text-pittsburgh-gold mt-1" />
                <div>
                  <div className="font-medium">Exclusive Deals</div>
                  <div className="text-sm text-gray-600">Special offers from local businesses</div>
                </div>
              </div>
            </div>

            {/* Newsletter Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Newsletter Frequency
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                >
                  <option value="weekly">Weekly Digest</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly Roundup</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  I'm interested in: (optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Local Events',
                    'Restaurant Deals',
                    'Business News',
                    'Neighborhood Guides',
                    'Sports Updates',
                    'Cultural Activities'
                  ].map((interest) => (
                    <label key={interest} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="rounded border-gray-300 text-pittsburgh-gold focus:ring-pittsburgh-gold"
                      />
                      <span className="text-sm">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting' || !email.trim()}
                className="w-full bg-pittsburgh-gold text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Bell className="w-4 h-4" />
                    Subscribe to Newsletter
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span>{message}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span>{message}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
