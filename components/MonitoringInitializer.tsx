'use client'

import { useEffect } from 'react'
import { initializeMonitoring, reportWebVitals } from '@/utils/performance'
import { initializeAccessibility } from '@/utils/accessibility'

export default function MonitoringInitializer() {
  useEffect(() => {
    // Initialize performance monitoring
    initializeMonitoring()

    // Initialize accessibility features
    const cleanup = initializeAccessibility()

    // Web Vitals will be set up by Next.js automatically
    // No need for manual initialization

    // Cleanup on unmount
    return cleanup
  }, [])

  // This component doesn't render anything
  return null
}
