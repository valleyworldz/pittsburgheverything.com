'use client'

import { useState } from 'react'
import { Mail, CheckCircle, Clock, Users, TrendingUp, Star, Calendar, DollarSign, Utensils, Newspaper, MapPin, Heart, Loader2, AlertCircle, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SubscriptionForm {
  email: string
  name: string
  neighborhood: string
  interests: string[]
}

const interestOptions = [
  { id: 'events', label: 'Events & Entertainment', icon: Calendar },
  { id: 'dining', label: 'Restaurants & Dining', icon: Utensils },
  { id: 'deals', label: 'Deals & Specials', icon: DollarSign },
  { id: 'news', label: 'Local News', icon: Newspaper },
  { id: 'neighborhoods', label: 'Neighborhoods', icon: MapPin },
  { id: 'community', label: 'Community', icon: Heart }
]

export default function NewsletterClient() {
  const [form, setForm] = useState<SubscriptionForm>({
    email: '',
    name: '',
    neighborhood: '',
    interests: []
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [showInterests, setShowInterests] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.email || !form.email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setMessage(data.message || 'Successfully subscribed! Check your email for confirmation.')
        setForm({ email: '', name: '', neighborhood: '', interests: [] })
      } else {
        throw new Error(data.error || 'Failed to subscribe')
      }
    } catch (error: any) {
      setStatus('error')
      setMessage(error.message || 'Something went wrong. Please try again later.')
    }
  }

  const toggleInterest = (interestId: string) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold">Free Weekly Newsletter</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              Pittsburgh Pulse Weekly
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Your free weekly guide to the best of Pittsburgh. Events, deals, dining, and local news delivered every Friday.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <Calendar className="w-10 h-10 mx-auto mb-2 text-yellow-300" />
                <div className="text-3xl font-bold">Weekly</div>
                <div className="text-sm opacity-75">Every Friday</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <Users className="w-10 h-10 mx-auto mb-2 text-yellow-300" />
                <div className="text-3xl font-bold">5,200+</div>
                <div className="text-sm opacity-75">Subscribers</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <TrendingUp className="w-10 h-10 mx-auto mb-2 text-yellow-300" />
                <div className="text-3xl font-bold">94%</div>
                <div className="text-sm opacity-75">Open Rate</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <Star className="w-10 h-10 mx-auto mb-2 text-yellow-300" />
                <div className="text-3xl font-bold">Free</div>
                <div className="text-sm opacity-75">Forever</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup Form */}
      <section className="py-16 bg-white -mt-8 relative z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get Pittsburgh Pulse Weekly
              </h2>
              <p className="text-lg text-gray-600">
                Join thousands of Pittsburghers who start their weekends with curated local content.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Pittsburgh Pulse!</h3>
                  <p className="text-gray-600 mb-6">{message}</p>
                  <p className="text-sm text-gray-500">
                    Check your inbox for a confirmation email. If you don't see it, check your spam folder.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@example.com"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={status === 'loading'}
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={status === 'loading'}
                    />
                  </div>

                  {/* Neighborhood */}
                  <div>
                    <label htmlFor="neighborhood" className="block text-sm font-semibold text-gray-700 mb-2">
                      Neighborhood (Optional)
                    </label>
                    <select
                      id="neighborhood"
                      value={form.neighborhood}
                      onChange={(e) => setForm(prev => ({ ...prev, neighborhood: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={status === 'loading'}
                    >
                      <option value="">Select your neighborhood</option>
                      <option value="Downtown">Downtown</option>
                      <option value="Oakland">Oakland</option>
                      <option value="Shadyside">Shadyside</option>
                      <option value="Lawrenceville">Lawrenceville</option>
                      <option value="South Side">South Side</option>
                      <option value="Strip District">Strip District</option>
                      <option value="Squirrel Hill">Squirrel Hill</option>
                      <option value="Bloomfield">Bloomfield</option>
                      <option value="North Side">North Side</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Interests */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowInterests(!showInterests)}
                      className="flex items-center justify-between w-full text-left text-sm font-semibold text-gray-700 mb-2"
                    >
                      <span>Interests (Optional)</span>
                      <span className="text-xs text-gray-500">
                        {form.interests.length > 0 && `${form.interests.length} selected`}
                      </span>
                    </button>
                    <AnimatePresence>
                      {showInterests && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-hidden"
                        >
                          {interestOptions.map((option) => {
                            const Icon = option.icon
                            const isSelected = form.interests.includes(option.id)
                            return (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() => toggleInterest(option.id)}
                                disabled={status === 'loading'}
                                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                                  isSelected
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                }`}
                              >
                                <Icon className="w-5 h-5" />
                                <span className="text-sm font-medium">{option.label}</span>
                                {isSelected && <CheckCircle className="w-4 h-4 ml-auto" />}
                              </button>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Error Message */}
                  {status === 'error' && message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm">{message}</span>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading' || !form.email}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        <span>Subscribe to Pittsburgh Pulse Weekly</span>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By subscribing, you agree to receive weekly emails from PittsburghEverything. 
                    You can unsubscribe at any time. We respect your privacy.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You'll Get Every Week
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Curated content that helps you make the most of Pittsburgh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Calendar, title: 'Weekend Events', desc: 'Curated list of the best concerts, festivals, and cultural events happening this weekend.' },
              { icon: DollarSign, title: 'Hot Deals', desc: 'Exclusive discounts, happy hours, and special offers from local businesses.' },
              { icon: Utensils, title: 'Dining Picks', desc: 'Restaurant recommendations, seasonal menus, and chef features from around the city.' },
              { icon: Newspaper, title: 'Local News', desc: 'Community updates, business openings, and stories that matter to Pittsburghers.' },
              { icon: MapPin, title: 'Hidden Gems', desc: 'Undiscovered spots, local secrets, and off-the-beaten-path recommendations.' },
              { icon: Heart, title: 'Community Spotlight', desc: 'Profiles of local businesses, community leaders, and Pittsburgh changemakers.' }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sample Newsletter */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sample Newsletter
            </h2>
            <p className="text-xl text-gray-600">
              See what Pittsburgh Pulse Weekly looks like
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden border border-gray-200">
            {/* Newsletter Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">Pittsburgh Pulse Weekly</h3>
                  <p className="opacity-90">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <Mail className="w-8 h-8" />
              </div>
            </div>

            {/* Newsletter Content */}
            <div className="p-6 space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold text-lg text-gray-900 mb-2">🎭 This Weekend's Must-See Events</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Pittsburgh Symphony Orchestra</strong> - Beethoven's 9th at Heinz Hall</li>
                  <li><strong>Carnegie Museum of Art</strong> - New Andy Warhol exhibit opening</li>
                  <li><strong>Festival of Trees</strong> - Holiday lights at PPG Place</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold text-lg text-gray-900 mb-2">💰 Hot Deals This Week</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>50% off appetizers</strong> at Piper's Pub downtown</li>
                  <li><strong>$5 craft beers</strong> at Fat Head's Saloon all week</li>
                  <li><strong>Free kids meal</strong> with adult entree at Ali Baba</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-bold text-lg text-gray-900 mb-2">🍽️ Dining Spotlight</h4>
                <p className="text-gray-700">
                  <strong>The Capital Grille</strong> unveils their seasonal menu featuring local ingredients and classic steakhouse favorites. Don't miss their Friday night wine pairings!
                </p>
              </div>

              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="font-bold text-lg text-gray-900 mb-2">🏙️ Pittsburgh This Week</h4>
                <p className="text-gray-700">
                  The City of Bridges welcomes visitors with new parking options and transit improvements. Plus, catch the last few days of the Pittsburgh Taco Festival downtown.
                </p>
              </div>
            </div>

            {/* Newsletter Footer */}
            <div className="bg-gray-100 p-4 text-center border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Brought to you by <span className="font-semibold text-blue-600">PittsburghEverything</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Subscribers Say</h2>
            <p className="text-xl opacity-90">
              Join thousands of Pittsburghers who love their weekly dose of local goodness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah M.', location: 'Shadyside', quote: 'Pittsburgh Pulse is my Friday ritual. I always discover something new and fun to do in the city!' },
              { name: 'Mike T.', location: 'Lawrenceville', quote: 'The deals section alone saves me money every week. Plus I love supporting local businesses.' },
              { name: 'Jennifer L.', location: 'Oakland', quote: 'As someone new to Pittsburgh, this newsletter has been invaluable for finding community and events.' }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/90 mb-4 italic">"{testimonial.quote}"</p>
                <div className="text-sm text-white/70">
                  — {testimonial.name}, {testimonial.location}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

