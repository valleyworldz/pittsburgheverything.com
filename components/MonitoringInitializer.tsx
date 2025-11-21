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

    // Set up Web Vitals reporting
    if (typeof window !== 'undefined') {
      // Import web-vitals dynamically
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(reportWebVitals)
        getFID(reportWebVitals)
        getFCP(reportWebVitals)
        getLCP(reportWebVitals)
        getTTFB(reportWebVitals)
      }).catch(err => {
        console.warn('Web Vitals not available:', err)
      })
    }

    // Cleanup on unmount
    return cleanup
  }, [])

  // This component doesn't render anything
  return null
}
