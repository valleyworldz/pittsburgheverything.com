"use client"

import { useEffect } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

interface GoogleAnalyticsProps {
  gaId?: string
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const measurementId = gaId || process.env.NEXT_PUBLIC_GA_ID

  useEffect(() => {
    if (!measurementId || typeof window === 'undefined') return

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []
    window.gtag = function(...args: any[]) {
      if (window.dataLayer) {
        window.dataLayer.push(args)
      }
    }
    if (window.gtag) {
      window.gtag('js', new Date())
      window.gtag('config', measurementId, {
        page_path: window.location.pathname,
      })
    }
  }, [measurementId])

  if (!measurementId) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  )
}
