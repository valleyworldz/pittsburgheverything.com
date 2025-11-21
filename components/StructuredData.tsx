'use client'

import { useEffect } from 'react'

interface StructuredDataProps {
  data: any
}

export default function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    // Remove any existing structured data script
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }

    // Add new structured data script
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data, null, 2)
    document.head.appendChild(script)

    // Cleanup on unmount
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [data])

  // Return null since this component only manages scripts
  return null
}
