'use client'

import { useState, useRef } from 'react'
import { Star, Camera, MapPin, Send, X, Upload, Loader2 } from 'lucide-react'
import type { ReviewSubmission, Rating } from '@/types'

interface MobileReviewFormProps {
  businessId: string
  businessName: string
  category?: string
  onSubmit?: (review: ReviewSubmission) => void
  onCancel?: () => void
}

export default function MobileReviewForm({
  businessId,
  businessName,
  category,
  onSubmit,
  onCancel
}: MobileReviewFormProps) {
  const [step, setStep] = useState(1) // 1: Rating, 2: Details, 3: Photos, 4: Submit
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

  const [photos, setPhotos] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleRatingChange = (rating: Rating) => {
    setFormData(prev => ({ ...prev, rating }))
    setStep(2) // Auto-advance to details
  }

  const handlePhotoCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setPhotos(prev => [...prev, ...files].slice(0, 3)) // Max 3 photos
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const submissionData = {
        ...formData,
        images: photos, // Will be handled by parent component
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

  const renderStars = (rating: number, interactive = true) => {
    return (
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={interactive ? () => handleRatingChange(star as Rating) : undefined}
            className={`w-12 h-12 ${interactive ? 'active:scale-110 transition-transform' : ''}`}
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
        <div className="text-center">
          <div className="text-3xl font-bold text-pittsburgh-black">{rating}</div>
          <div className="text-sm text-steel-gray">out of 5</div>
        </div>
      </div>
    )
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3, 4].map((stepNumber) => (
        <div
          key={stepNumber}
          className={`w-3 h-3 rounded-full ${
            stepNumber === step
              ? 'bg-pittsburgh-gold'
              : stepNumber < step
              ? 'bg-green-500'
              : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  )

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-sm w-full">
          <div className="text-green-600 mb-4">
            <svg className="w-20 h-20 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-4">Review Submitted!</h2>
          <p className="text-green-700 mb-6 leading-relaxed">
            Thank you for sharing your experience with {businessName}!
          </p>
          {formData.userEmail && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
              <h4 className="font-semibold text-blue-800 mb-2 text-sm">Next Steps:</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Check your email for verification</li>
                <li>• Your review will be published soon</li>
                <li>• You'll receive confirmation</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 p-2"
        >
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-pittsburgh-black">Write Review</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="p-4">
        <StepIndicator />

        {step === 1 && (
          <div className="text-center">
            <div className="mb-6">
              <MapPin className="w-8 h-8 text-pittsburgh-gold mx-auto mb-2" />
              <h2 className="text-xl font-bold text-pittsburgh-black mb-1">{businessName}</h2>
              <p className="text-steel-gray">How would you rate your experience?</p>
            </div>
            {renderStars(formData.rating)}
            <p className="text-sm text-steel-gray mt-4">
              Tap the stars to rate your experience
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-pittsburgh-black mb-2">Tell us more</h2>
              <p className="text-steel-gray">Share details about your experience</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-pittsburgh-black mb-2">
                Your Name *
              </label>
              <input
                type="text"
                value={formData.userName}
                onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent text-base"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-pittsburgh-black mb-2">
                Email (for verification)
              </label>
              <input
                type="email"
                value={formData.userEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, userEmail: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent text-base"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-pittsburgh-black mb-2">
                Review Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent text-base"
                placeholder="Summarize your experience"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-pittsburgh-black mb-2">
                Your Review *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent h-32 resize-none text-base"
                placeholder="Tell others about your experience..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 px-6 py-3 border border-gray-300 text-steel-gray rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!formData.userName || !formData.content}
                className="flex-1 px-6 py-3 bg-pittsburgh-gold text-pittsburgh-black rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <div className="mb-6">
              <Camera className="w-12 h-12 text-pittsburgh-gold mx-auto mb-3" />
              <h2 className="text-xl font-bold text-pittsburgh-black mb-2">Add Photos</h2>
              <p className="text-steel-gray">Show others what you experienced</p>
            </div>

            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-6">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Review photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {photos.length < 3 && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-pittsburgh-gold transition-colors"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                  </button>
                )}
              </div>
            )}

            {photos.length === 0 && (
              <div className="mb-6">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-pittsburgh-gold transition-colors flex flex-col items-center"
                >
                  <Camera className="w-12 h-12 text-gray-400 mb-3" />
                  <span className="text-steel-gray">Tap to add photos</span>
                  <span className="text-xs text-steel-gray mt-1">Up to 3 photos</span>
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              capture="environment"
              onChange={handlePhotoCapture}
              className="hidden"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 px-6 py-3 border border-gray-300 text-steel-gray rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 px-6 py-3 bg-pittsburgh-gold text-pittsburgh-black rounded-lg hover:bg-yellow-400 transition-colors font-semibold"
              >
                Review
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-pittsburgh-black mb-2">Review Your Submission</h2>
              <p className="text-steel-gray">Make sure everything looks good</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-pittsburgh-black">{businessName}</span>
                {renderStars(formData.rating, false)}
              </div>

              {formData.title && (
                <h3 className="font-semibold text-pittsburgh-black mb-2">{formData.title}</h3>
              )}

              <p className="text-steel-gray text-sm leading-relaxed mb-3">{formData.content}</p>

              <div className="text-xs text-steel-gray">
                by {formData.userName}
              </div>
            </div>

            {photos.length > 0 && (
              <div>
                <h3 className="font-semibold text-pittsburgh-black mb-3">Photos ({photos.length})</h3>
                <div className="grid grid-cols-3 gap-2">
                  {photos.map((photo, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(photo)}
                      alt={`Review photo ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">
                  There was an error submitting your review. Please try again.
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(3)}
                className="flex-1 px-6 py-3 border border-gray-300 text-steel-gray rounded-lg hover:bg-gray-50 transition-colors font-medium"
                disabled={isSubmitting}
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.userName || !formData.content}
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
          </div>
        )}
      </div>
    </div>
  )
}
