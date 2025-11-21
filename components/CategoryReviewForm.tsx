'use client'

import { useState } from 'react'
import { Star, Send, Loader2, ChefHat, Wrench, Palette, Heart, Clock, DollarSign } from 'lucide-react'
import type { ReviewSubmission, Rating } from '@/types'

interface CategoryReviewFormProps {
  businessId: string
  businessName: string
  category: string
  onSubmit?: (review: ReviewSubmission) => void
  onCancel?: () => void
}

export default function CategoryReviewForm({
  businessId,
  businessName,
  category,
  onSubmit,
  onCancel
}: CategoryReviewFormProps) {
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

  const [customFields, setCustomFields] = useState<Record<string, any>>({})
  const [prosInput, setProsInput] = useState('')
  const [consInput, setConsInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Category-specific configurations
  const categoryConfig = {
    restaurants: {
      icon: ChefHat,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      fields: [
        { key: 'foodQuality', label: 'Food Quality', type: 'rating', required: false },
        { key: 'service', label: 'Service', type: 'rating', required: false },
        { key: 'ambiance', label: 'Ambiance', type: 'rating', required: false },
        { key: 'value', label: 'Value for Money', type: 'rating', required: false },
        { key: 'waitTime', label: 'Wait Time', type: 'select', options: ['No wait', '5-15 min', '15-30 min', '30+ min'], required: false },
        { key: 'wouldReturn', label: 'Would you return?', type: 'boolean', required: false },
      ],
      suggestedPros: ['Delicious food', 'Great service', 'Nice atmosphere', 'Good value', 'Friendly staff'],
      suggestedCons: ['Long wait times', 'Overpriced', 'Poor service', 'Food quality issues', 'Limited menu'],
      placeholder: 'Tell us about your dining experience. What did you order? How was the service?',
    },
    'home-services': {
      icon: Wrench,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      fields: [
        { key: 'quality', label: 'Work Quality', type: 'rating', required: false },
        { key: 'timeliness', label: 'Timeliness', type: 'rating', required: false },
        { key: 'communication', label: 'Communication', type: 'rating', required: false },
        { key: 'professionalism', label: 'Professionalism', type: 'rating', required: false },
        { key: 'pricing', label: 'Fair Pricing', type: 'rating', required: false },
        { key: 'wouldRecommend', label: 'Would recommend?', type: 'boolean', required: false },
      ],
      suggestedPros: ['Professional service', 'Quality workmanship', 'On-time arrival', 'Clear communication', 'Fair pricing'],
      suggestedCons: ['Late arrival', 'Poor communication', 'Subpar quality', 'Overcharged', 'Unprofessional'],
      placeholder: 'Tell us about your experience with this service. Were they on time? Did they explain everything clearly?',
    },
    creative: {
      icon: Palette,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      fields: [
        { key: 'creativity', label: 'Creativity', type: 'rating', required: false },
        { key: 'quality', label: 'Quality of Work', type: 'rating', required: false },
        { key: 'communication', label: 'Communication', type: 'rating', required: false },
        { key: 'timeline', label: 'Met Timeline', type: 'rating', required: false },
        { key: 'vision', label: 'Understood Vision', type: 'rating', required: false },
        { key: 'satisfied', label: 'Overall Satisfaction', type: 'boolean', required: false },
      ],
      suggestedPros: ['Creative vision', 'Quality work', 'Good communication', 'Met deadlines', 'Understood needs'],
      suggestedCons: ['Missed deadlines', 'Poor communication', 'Didn\'t meet expectations', 'Quality issues', 'Unresponsive'],
      placeholder: 'Tell us about your creative project. Did they capture your vision? Were they professional?',
    },
    tattoo: {
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      fields: [
        { key: 'design', label: 'Design Quality', type: 'rating', required: false },
        { key: 'hygiene', label: 'Cleanliness & Hygiene', type: 'rating', required: false },
        { key: 'pain', label: 'Pain Management', type: 'rating', required: false },
        { key: 'healing', label: 'Healing Process', type: 'rating', required: false },
        { key: 'consultation', label: 'Consultation Experience', type: 'rating', required: false },
        { key: 'wouldReturn', label: 'Would get another tattoo?', type: 'boolean', required: false },
      ],
      suggestedPros: ['Beautiful design', 'Clean facility', 'Professional artist', 'Good pain management', 'Excellent healing'],
      suggestedCons: ['Painful experience', 'Design not as expected', 'Unclean facility', 'Poor healing', 'Unprofessional'],
      placeholder: 'Tell us about your tattoo experience. How was the design process? The actual tattooing?',
    },
    services: {
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      fields: [
        { key: 'service', label: 'Service Quality', type: 'rating', required: false },
        { key: 'knowledge', label: 'Staff Knowledge', type: 'rating', required: false },
        { key: 'efficiency', label: 'Efficiency', type: 'rating', required: false },
        { key: 'friendliness', label: 'Friendliness', type: 'rating', required: false },
        { key: 'value', label: 'Value for Money', type: 'rating', required: false },
        { key: 'satisfied', label: 'Overall Satisfaction', type: 'boolean', required: false },
      ],
      suggestedPros: ['Excellent service', 'Knowledgeable staff', 'Efficient process', 'Friendly team', 'Good value'],
      suggestedCons: ['Poor service', 'Unknowledgeable staff', 'Slow process', 'Unfriendly', 'Overpriced'],
      placeholder: 'Tell us about your experience with this service. How was the staff? The process?',
    },
  }

  const config = categoryConfig[category as keyof typeof categoryConfig] || categoryConfig.services

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating: rating as Rating }))
  }

  const handleCustomFieldChange = (key: string, value: any) => {
    setCustomFields(prev => ({ ...prev, [key]: value }))
  }

  const addPro = (pro: string) => {
    if (pro.trim() && !formData.pros?.includes(pro.trim())) {
      setFormData(prev => ({
        ...prev,
        pros: [...(prev.pros || []), pro.trim()]
      }))
    }
  }

  const removePro = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pros: prev.pros?.filter((_, i) => i !== index) || []
    }))
  }

  const addCon = (con: string) => {
    if (con.trim() && !formData.cons?.includes(con.trim())) {
      setFormData(prev => ({
        ...prev,
        cons: [...(prev.cons || []), con.trim()]
      }))
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
      // Include custom fields in the review content
      let enhancedContent = formData.content

      // Add category-specific ratings to content
      const customRatings = Object.entries(customFields)
        .filter(([_, value]) => typeof value === 'number')
        .map(([key, value]) => `${key}: ${value}/5`)
        .join(', ')

      if (customRatings) {
        enhancedContent += `\n\nDetailed Ratings: ${customRatings}`
      }

      // Add boolean responses
      const booleanResponses = Object.entries(customFields)
        .filter(([_, value]) => typeof value === 'boolean')
        .map(([key, value]) => `${key}: ${value ? 'Yes' : 'No'}`)
        .join(', ')

      if (booleanResponses) {
        enhancedContent += `\n\nAdditional Feedback: ${booleanResponses}`
      }

      const submissionData = {
        ...formData,
        content: enhancedContent,
      }

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
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
        }

        setSubmitStatus('success')
        onSubmit?.(submissionData)
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

  const renderStars = (rating: number, interactive = true, onChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={interactive ? () => onChange?.(star) : undefined}
            className={`w-6 h-6 ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
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
        <span className="ml-2 text-sm font-semibold text-pittsburgh-black">
          {rating}/5
        </span>
      </div>
    )
  }

  const renderField = (field: any) => {
    switch (field.type) {
      case 'rating':
        return (
          <div key={field.key} className="mb-4">
            <label className="block text-sm font-semibold text-pittsburgh-black mb-2">
              {field.label} {field.required && '*'}
            </label>
            {renderStars(
              customFields[field.key] || 3,
              true,
              (rating) => handleCustomFieldChange(field.key, rating)
            )}
          </div>
        )

      case 'select':
        return (
          <div key={field.key} className="mb-4">
            <label className="block text-sm font-semibold text-pittsburgh-black mb-2">
              {field.label} {field.required && '*'}
            </label>
            <select
              value={customFields[field.key] || ''}
              onChange={(e) => handleCustomFieldChange(field.key, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
            >
              <option value="">Select...</option>
              {field.options.map((option: string) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )

      case 'boolean':
        return (
          <div key={field.key} className="mb-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={customFields[field.key] || false}
                onChange={(e) => handleCustomFieldChange(field.key, e.target.checked)}
                className="w-4 h-4 text-pittsburgh-gold border-gray-300 rounded focus:ring-pittsburgh-gold"
              />
              <span className="text-sm font-semibold text-pittsburgh-black">
                {field.label} {field.required && '*'}
              </span>
            </label>
          </div>
        )

      default:
        return null
    }
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
          Thank you for your detailed review of <strong>{businessName}</strong>.
        </p>
        {formData.userEmail && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h4 className="font-semibold text-blue-800 mb-2">Next Steps:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>1. Check your email for a verification link</li>
              <li>2. Click the link to verify your review</li>
              <li>3. Your review will be published immediately</li>
              <li>4. You'll receive confirmation once it's live</li>
            </ul>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg border ${config.borderColor} p-6`}>
      {/* Header */}
      <div className={`${config.bgColor} border ${config.borderColor} rounded-lg p-4 mb-6`}>
        <div className="flex items-center gap-3 mb-2">
          <config.icon className={`w-6 h-6 ${config.color}`} />
          <h2 className="text-xl font-bold text-pittsburgh-black">
            Review {businessName}
          </h2>
        </div>
        <p className="text-steel-gray text-sm">
          Share your experience to help others in Pittsburgh make better decisions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Overall Rating */}
        <div>
          <label className="block text-sm font-semibold text-pittsburgh-black mb-3">
            Overall Rating *
          </label>
          {renderStars(formData.rating)}
        </div>

        {/* Category-specific fields */}
        <div className={`${config.bgColor} border ${config.borderColor} rounded-lg p-4`}>
          <h3 className="text-lg font-semibold text-pittsburgh-black mb-4 flex items-center gap-2">
            <config.icon className={`w-5 h-5 ${config.color}`} />
            Detailed Feedback
          </h3>
          {config.fields.map(renderField)}
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            placeholder={config.placeholder}
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
            {config.suggestedPros.map((pro) => (
              <button
                key={pro}
                type="button"
                onClick={() => addPro(pro)}
                className="px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm hover:bg-green-100 transition-colors"
              >
                + {pro}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={prosInput}
              onChange={(e) => setProsInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPro(prosInput))}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
              placeholder="Add your own positive feedback"
            />
            <button
              type="button"
              onClick={() => addPro(prosInput)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
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
                    className="text-green-600 hover:text-green-800 ml-1"
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
            {config.suggestedCons.map((con) => (
              <button
                key={con}
                type="button"
                onClick={() => addCon(con)}
                className="px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm hover:bg-red-100 transition-colors"
              >
                + {con}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={consInput}
              onChange={(e) => setConsInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCon(consInput))}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
              placeholder="Add your own constructive feedback"
            />
            <button
              type="button"
              onClick={() => addCon(consInput)}
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
                    className="text-red-600 hover:text-red-800 ml-1"
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
