'use client'

import { Code, Database, Zap, Shield, Book, ExternalLink, Copy, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function InternalApiDocsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h2 className="text-red-800 font-semibold">🔒 INTERNAL ACCESS ONLY</h2>
          <p className="text-red-600 text-sm">This API documentation is for development and integration purposes only.</p>
        </div>
        <h1 className="text-3xl font-bold mb-4">API Documentation</h1>
        <p className="text-xl text-muted-foreground">
          Build amazing applications with PittsburghEverything's comprehensive API
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <Link
            href="/internal/apis"
            className="inline-flex items-center space-x-2 bg-pittsburgh-gold text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            <Database className="w-5 h-5" />
            <span>View API Dashboard</span>
          </Link>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <p className="text-muted-foreground mb-6">
            Everything you need to start building with our API
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Authentication</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>API Key Required</span>
                  </div>
                  <p className="text-muted-foreground">Most endpoints require an API key. Contact our developer team.</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Rate Limits</h3>
                <p className="text-sm text-muted-foreground">
                  Free tier: 1000 requests/hour. Premium plans available for higher limits.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Base URL</h3>
              <code className="block p-3 bg-muted rounded text-sm font-mono">
                https://pittsburgheverything.com/api
              </code>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">API Endpoints</h2>
          <p className="text-muted-foreground mb-6">
            Complete reference for all available endpoints
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span>Real-time Data</span>
              </h3>
              <p className="text-sm text-muted-foreground mb-4">Live updates for weather, events, deals, and news</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded">
                  <span className="font-mono text-sm bg-green-100 text-green-800 px-2 py-1 rounded">GET</span>
                  <code className="font-mono text-sm">/api/live/weather</code>
                  <span className="text-sm text-muted-foreground">Current weather conditions and forecast</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded">
                  <span className="font-mono text-sm bg-green-100 text-green-800 px-2 py-1 rounded">GET</span>
                  <code className="font-mono text-sm">/api/live/events</code>
                  <span className="text-sm text-muted-foreground">Live event listings and updates</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded">
                  <span className="font-mono text-sm bg-green-100 text-green-800 px-2 py-1 rounded">GET</span>
                  <code className="font-mono text-sm">/api/live/deals</code>
                  <span className="text-sm text-muted-foreground">Current deals and promotions</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center space-x-2">
                <Database className="w-5 h-5 text-purple-600" />
                <span>Business Data</span>
              </h3>
              <p className="text-sm text-muted-foreground mb-4">Business listings, reviews, and directory information</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded">
                  <span className="font-mono text-sm bg-green-100 text-green-800 px-2 py-1 rounded">GET</span>
                  <code className="font-mono text-sm">/api/businesses</code>
                  <span className="text-sm text-muted-foreground">Search and filter business listings</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Our developer community and support team are here to help you build amazing applications.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="flex items-center space-x-2 bg-pittsburgh-gold text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors">
              <span>Contact Developer Support</span>
            </button>
            <Link
              href="/help"
              className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Book className="w-4 h-4" />
              <span>View Help Center</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
