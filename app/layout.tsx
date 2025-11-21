import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { useEffect } from 'react'
import './globals.css'
import { siteConfig } from '@/config/site'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SkipToContent from '@/components/SkipToContent'
import LoadingProvider from '@/components/LoadingProvider'
import ErrorBoundary from '@/components/ErrorBoundary'
import MonitoringInitializer from '@/components/MonitoringInitializer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | PittsburghEverything'
  },
  description: siteConfig.description,
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: 'PittsburghEverything Team' }],
  creator: 'PittsburghEverything',
  publisher: 'PittsburghEverything',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'PittsburghEverything - Your Complete Pittsburgh Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@PittsburghEverything',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* DNS prefetch for common domains */}
        <link rel="dns-prefetch" href="//api.openweathermap.org" />
        <link rel="dns-prefetch" href="//site.api.espn.com" />
        <link rel="dns-prefetch" href="//realtime.portauthority.org" />

        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/images/og-image.svg" sizes="any" />
        <link rel="apple-touch-icon" href="/images/og-image.svg" />

        {/* Canonical URL will be handled by individual pages */}
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        {/* Skip to main content for accessibility */}
        <SkipToContent />

        {/* Error boundary for better error handling */}
        <ErrorBoundary>
          {/* Loading provider for global loading states */}
          <LoadingProvider>
            {/* Monitoring and analytics initialization */}
            <MonitoringInitializer />

            {/* Header with optimized navigation */}
            <Navigation />

            {/* Main content with proper semantic structure */}
            <main
              id="main-content"
              className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
              role="main"
            >
              {children}
            </main>

            {/* Footer with comprehensive links */}
            <Footer />
          </LoadingProvider>
        </ErrorBoundary>

        {/* Analytics and performance monitoring */}
        <Analytics />
        <SpeedInsights />

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: siteConfig.name,
              url: siteConfig.url,
              description: siteConfig.description,
              publisher: {
                '@type': 'Organization',
                name: 'PittsburghEverything',
                url: siteConfig.url,
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: `${siteConfig.url}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
