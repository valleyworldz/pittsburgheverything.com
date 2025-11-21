import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/config/site'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b border-gray-200">
          <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
            <a href="/" className="font-extrabold text-2xl text-yellow-500">
              Pittsburgh<span className="text-black">Everything</span>
            </a>
            <div className="hidden md:flex gap-6 text-sm font-medium">
              <a href="/events">Events</a>
              <a href="/restaurants">Restaurants</a>
              <a href="/services">Services</a>
              <a href="/neighborhoods">Neighborhoods</a>
              <a href="/things-to-do">Things to Do</a>
              <a href="/deals">Deals</a>
              <a href="/top-100">Top 100</a>
              <a href="/ai-guide">AI Guide</a>
            </div>
          </nav>
        </header>
        <main className="flex-1 max-w-6xl mx-auto px-4 py-10">{children}</main>
        <footer className="border-t border-gray-200 mt-8">
          <div className="max-w-6xl mx-auto px-4 py-6 text-sm flex flex-col md:flex-row justify-between gap-2">
            <span>© {new Date().getFullYear()} PittsburghEverything.</span>
            <div className="flex gap-4">
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/submit-business">Submit Business</a>
              <a href="/dashboard">Dashboard</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
