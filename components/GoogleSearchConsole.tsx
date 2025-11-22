'use client'

import { useEffect } from 'react'

interface GoogleSearchConsoleProps {
  verificationCode?: string
}

export default function GoogleSearchConsole({ verificationCode }: GoogleSearchConsoleProps) {
  // Use provided code, then env var, then fallback to actual verification code
  const code = verificationCode || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'hPFeJhF-yg2ZIX_YHJ95h0ZkxtVn1IlUeUssncEcXXI'

  useEffect(() => {
    // Ensure the verification code is set (not placeholder)
    const finalCode = code && code !== 'your-google-site-verification' 
      ? code 
      : 'hPFeJhF-yg2ZIX_YHJ95h0ZkxtVn1IlUeUssncEcXXI'

    // Check if meta tag already exists
    let metaTag = document.querySelector('meta[name="google-site-verification"]')
    
    if (!metaTag) {
      // Create meta tag if it doesn't exist
      metaTag = document.createElement('meta')
      metaTag.setAttribute('name', 'google-site-verification')
      document.head.appendChild(metaTag)
    }
    
    // Update content with correct verification code
    metaTag.setAttribute('content', finalCode)
  }, [code])

  // This component doesn't render anything visible
  return null
}
