'use client'

import { useState, useEffect } from 'react'
import type { ReviewSubmission } from '@/types'

interface ResponsiveReviewFormProps {
  businessId: string
  businessName: string
  category?: string
  onSubmit?: (review: ReviewSubmission) => void
  onCancel?: () => void
}

export default function ResponsiveReviewForm({
  businessId,
  businessName,
  category,
  onSubmit,
  onCancel
}: ResponsiveReviewFormProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [FormComponent, setFormComponent] = useState<any>(null)

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 'ontouchstart' in window
      setIsMobile(mobile)

      // Load appropriate form component
      if (mobile) {
        import('./MobileReviewForm').then(module => {
          setFormComponent(() => module.default)
        })
      } else {
        // Check if we should use category-specific form
        const enhancedCategories = ['restaurants', 'home-services', 'creative', 'tattoo', 'services']
        if (category && enhancedCategories.includes(category)) {
          import('./CategoryReviewForm').then(module => {
            setFormComponent(() => module.default)
          })
        } else {
          // Fallback to basic form (would need to create this)
          import('./ReviewForm').then(module => {
            setFormComponent(() => module.default)
          }).catch(() => {
            // If ReviewForm doesn't exist, use CategoryReviewForm as fallback
            import('./CategoryReviewForm').then(module => {
              setFormComponent(() => module.default)
            })
          })
        }
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [category])

  if (!FormComponent) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pittsburgh-gold"></div>
      </div>
    )
  }

  return (
    <FormComponent
      businessId={businessId}
      businessName={businessName}
      category={category}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  )
}
