import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'PittsburghEverything — Everything Pittsburgh in One Place',
  description: 'Events, food, neighborhoods, services, deals and more. Your complete guide to Pittsburgh.',
  keywords: 'Pittsburgh, events, restaurants, neighborhoods, services, deals, local guide',
  authors: [{ name: 'PittsburghEverything' }],
  openGraph: {
    title: 'PittsburghEverything — Everything Pittsburgh in One Place',
    description: 'Events, food, neighborhoods, services, deals and more.',
    url: 'https://pittsburgheverything.com',
    siteName: 'PittsburghEverything',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PittsburghEverything - Everything Pittsburgh',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PittsburghEverything — Everything Pittsburgh in One Place',
    description: 'Events, food, neighborhoods, services, deals and more.',
    images: ['/images/og-image.jpg'],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-pittsburgh-black font-inter">
        <nav className="w-full flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-white sticky top-0 z-50">
          <a href="/" className="font-black text-xl text-pittsburgh-gold hover:text-pittsburgh-gold/80 transition-colors">
            PittsburghEverything
          </a>
          <div className="flex gap-6 text-sm font-medium">
            <a href="/events" className="hover:text-pittsburgh-gold transition-colors">Events</a>
            <a href="/restaurants" className="hover:text-pittsburgh-gold transition-colors">Restaurants</a>
            <a href="/services" className="hover:text-pittsburgh-gold transition-colors">Services</a>
            <a href="/neighborhoods" className="hover:text-pittsburgh-gold transition-colors">Neighborhoods</a>
            <a href="/deals" className="hover:text-pittsburgh-gold transition-colors">Deals</a>
            <a href="/ai-guide" className="hover:text-pittsburgh-gold transition-colors">AI Guide</a>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto py-12 px-4">{children}</main>

        <footer className="border-t border-gray-200 mt-8">
          <div className="max-w-6xl mx-auto px-4 py-6 text-sm flex flex-col md:flex-row justify-between gap-2">
            <span>© {new Date().getFullYear()} PittsburghEverything.</span>
            <div className="flex gap-4">
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/submit-business">Submit Business</a>
              <a href="/dashboard">Dashboard</a>
              <a href="/advertise">Advertise</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
