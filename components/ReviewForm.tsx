'use client'

import { useState, useEffect } from 'react'
import { Star, Send, Loader2 } from 'lucide-react'
import type { ReviewSubmission, Rating } from '@/types'

interface ReviewFormProps {
  businessId: string
  businessName: string
  category?: string
  onSubmit?: (review: ReviewSubmission) => void
  onCancel?: () => void
}

export default function ReviewForm({ businessId, businessName, category, onSubmit, onCancel }: ReviewFormProps) {
  const [useCategoryForm, setUseCategoryForm] = useState(false)
  const [CategoryReviewForm, setCategoryReviewForm] = useState<any>(null)

  useEffect(() => {
    // If category is provided and it's one of our enhanced categories, load CategoryReviewForm
    const enhancedCategories = ['restaurants', 'home-services', 'creative', 'tattoo', 'services']

    if (category && enhancedCategories.includes(category)) {
      import('./CategoryReviewForm').then(module => {
        setCategoryReviewForm(() => module.default)
        setUseCategoryForm(true)
      })
    }
  }, [category])

  if (useCategoryForm && CategoryReviewForm) {
    return (
      <CategoryReviewForm
        businessId={businessId}
        businessName={businessName}
        category={category}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    )
  }
  const [formData, setFormData] = useState<ReviewSubmission>({
    businessId,
    userName: '',
    userEmail: '',
    rating: 5,
    title: '',
    content: '',
    pros: [],
    cons: [],
  })

  const [prosInput, setProsInput] = useState('')
  const [consInput, setConsInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating: rating as Rating }))
  }

  const addPro = () => {
    if (prosInput.trim()) {
      setFormData(prev => ({
        ...prev,
        pros: [...(prev.pros || []), prosInput.trim()]
      }))
      setProsInput('')
    }
  }

  const removePro = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pros: prev.pros?.filter((_, i) => i !== index) || []
    }))
  }

  const addCon = () => {
    if (consInput.trim()) {
      setFormData(prev => ({
        ...prev,
        cons: [...(prev.cons || []), consInput.trim()]
      }))
      setConsInput('')
    }
  }

  const removeCon = (index: number) => {
    setFormData(prev => ({
      ...prev,
      cons: prev.cons?.filter((_, i) => i !== index) || []
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Submit the review
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        // Send verification email if email was provided
        if (formData.userEmail) {
          await fetch('/api/reviews/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              reviewId: result.data.id,
              email: formData.userEmail,
            }),
          })
          // Note: We don't check the email result here to avoid blocking the success flow
        }

        setSubmitStatus('success')
        onSubmit?.(formData)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (rating: number, interactive = true) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={interactive ? () => handleRatingChange(star) : undefined}
            className={`w-8 h-8 ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            disabled={!interactive}
          >
            <Star
              className={`w-full h-full ${
                star <= rating
                  ? 'text-pittsburgh-gold fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-lg font-semibold text-pittsburgh-black">
          {rating}/5
        </span>
      </div>
    )
  }

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Review Submitted!</h3>
        <p className="text-green-700 mb-4">
          Thank you for your review. We've sent a verification email to{' '}
          <strong>{formData.userEmail || 'your email address'}</strong>.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
          <h4 className="font-semibold text-blue-800 mb-2">Next Steps:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>1. Check your email for a verification link</li>
            <li>2. Click the link to verify your review</li>
            <li>3. Your review will be published immediately</li>
            <li>4. You'll receive confirmation once it's live</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-pittsburgh-black mb-2">
          Write a Review
        </h2>
        <p className="text-steel-gray">
          Share your experience with <span className="font-semibold">{businessName}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-pittsburgh-black mb-3">
            Overall Rating *
          </label>
          {renderStars(formData.rating)}
        </div>

        {/* User Name */}
        <div>
          <label htmlFor="userName" className="block text-sm font-semibold text-pittsburgh-black mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="userName"
            value={formData.userName}
            onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="userEmail" className="block text-sm font-semibold text-pittsburgh-black mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="userEmail"
            value={formData.userEmail}
            onChange={(e) => setFormData(prev => ({ ...prev, userEmail: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
            placeholder="your.email@example.com"
          />
          <p className="text-xs text-steel-gray mt-1">
            Optional, but helps verify your review
          </p>
        </div>

        {/* Review Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-pittsburgh-black mb-2">
            Review Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
            placeholder="Summarize your experience"
            required
          />
        </div>

        {/* Review Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-semibold text-pittsburgh-black mb-2">
            Your Review *
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent h-32 resize-none"
            placeholder="Tell others about your experience. What did you like? What could be improved?"
            required
          />
          <p className="text-xs text-steel-gray mt-1">
            Minimum 50 characters required
          </p>
        </div>

        {/* Pros */}
        <div>
          <label className="block text-sm font-semibold text-pittsburgh-black mb-2">
            What did you like? (Optional)
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={prosInput}
              onChange={(e) => setProsInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPro())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
              placeholder="Great service, amazing food, etc."
            />
            <button
              type="button"
              onClick={addPro}
              className="px-4 py-2 bg-pittsburgh-gold text-pittsburgh-black rounded-lg hover:bg-yellow-400 transition-colors font-medium"
            >
              Add
            </button>
          </div>
          {formData.pros && formData.pros.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.pros.map((pro, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  {pro}
                  <button
                    type="button"
                    onClick={() => removePro(index)}
                    className="text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Cons */}
        <div>
          <label className="block text-sm font-semibold text-pittsburgh-black mb-2">
            What could be improved? (Optional)
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={consInput}
              onChange={(e) => setConsInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCon())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
              placeholder="Slow service, expensive, etc."
            />
            <button
              type="button"
              onClick={addCon}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              Add
            </button>
          </div>
          {formData.cons && formData.cons.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.cons.map((con, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                >
                  {con}
                  <button
                    type="button"
                    onClick={() => removeCon(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Submit Status */}
        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">
              There was an error submitting your review. Please try again.
            </p>
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4 border-t border-gray-200">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-gray-300 text-steel-gray rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !formData.userName || !formData.title || !formData.content || formData.content.length < 50}
            className="flex-1 px-6 py-3 bg-pittsburgh-gold text-pittsburgh-black rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Review
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
