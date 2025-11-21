import type { Metadata } from 'next'
import { Code, Database, Zap, Shield, Book, ExternalLink, Copy, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'API Documentation | PittsburghEverything',
  description: 'Complete API documentation for PittsburghEverything. Access real-time data, business listings, events, and more through our developer-friendly APIs.',
  keywords: 'API documentation, developer docs, Pittsburgh API, real-time data, business listings API',
  openGraph: {
    title: 'API Documentation | PittsburghEverything',
    description: 'Complete API documentation for PittsburghEverything developer platform.',
    images: [
      {
        url: '/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'API Documentation',
      },
    ],
  },
}

export default function ApiDocsPage() {
  const apiEndpoints = [
    {
      category: 'Real-time Data',
      icon: Zap,
      description: 'Live updates for weather, events, deals, and news',
      endpoints: [
        {
          method: 'GET',
          path: '/api/live/weather',
          description: 'Current weather conditions and forecast'
        },
        {
          method: 'GET',
          path: '/api/live/events',
          description: 'Live event listings and updates'
        },
        {
          method: 'GET',
          path: '/api/live/deals',
          description: 'Current deals and promotions'
        },
        {
          method: 'GET',
          path: '/api/live/news',
          description: 'Local news and announcements'
        }
      ]
    },
    {
      category: 'Business Data',
      icon: Database,
      description: 'Business listings, reviews, and directory information',
      endpoints: [
        {
          method: 'GET',
          path: '/api/businesses',
          description: 'Search and filter business listings'
        },
        {
          method: 'POST',
          path: '/api/businesses',
          description: 'Submit new business listing'
        },
        {
          method: 'GET',
          path: '/api/reviews',
          description: 'Retrieve business reviews'
        },
        {
          method: 'POST',
          path: '/api/reviews',
          description: 'Submit business review'
        }
      ]
    },
    {
      category: 'Analytics',
      icon: Code,
      description: 'Track user interactions and site analytics',
      endpoints: [
        {
          method: 'POST',
          path: '/api/analytics/track',
          description: 'Track user events and interactions'
        },
        {
          method: 'GET',
          path: '/api/analytics/track',
          description: 'Retrieve analytics data and reports'
        }
      ]
    },
    {
      category: 'Location Data',
      icon: Shield,
      description: 'Neighborhood information and location services',
      endpoints: [
        {
          method: 'GET',
          path: '/api/neighborhoods',
          description: 'Neighborhood information and guides'
        },
        {
          method: 'GET',
          path: '/api/location/sync',
          description: 'Location-based data synchronization'
        }
      ]
    }
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Code className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            API Documentation
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Build amazing applications with PittsburghEverything's comprehensive API. Access real-time data, business listings, and community insights.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#getting-started"
              className="bg-white text-pittsburgh-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="#endpoints"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              View Endpoints
            </Link>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section id="getting-started" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Getting Started</h2>
            <p className="text-xl text-gray-600">Everything you need to start building with our API</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-pittsburgh-black mb-6">Authentication</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-pittsburgh-black mb-2">API Key Required</h4>
                  <p className="text-gray-600 text-sm">
                    Most endpoints require an API key. Get yours by contacting our developer team.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-pittsburgh-black mb-2">Rate Limits</h4>
                  <p className="text-gray-600 text-sm">
                    Free tier: 1000 requests/hour. Premium plans available for higher limits.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-pittsburgh-black mb-2">Base URL</h4>
                  <code className="text-sm bg-gray-200 px-2 py-1 rounded">
                    https://pittsburgheverything.com/api
                  </code>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-pittsburgh-black mb-6">Example Request</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white">GET Weather Data</span>
                  <button
                    onClick={() => copyToClipboard(`curl -X GET "https://pittsburgheverything.com/api/live/weather" \\
  -H "Authorization: Bearer YOUR_API_KEY"`)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {`curl -X GET "https://pittsburgheverything.com/api/live/weather" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
              </div>

              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white">Response</span>
                  <button
                    onClick={() => copyToClipboard(`{
  "location": "Pittsburgh, PA",
  "temperature": 72,
  "description": "partly cloudy",
  "humidity": 65,
  "windSpeed": 8
}`)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {`{
  "location": "Pittsburgh, PA",
  "temperature": 72,
  "description": "partly cloudy",
  "humidity": 65,
  "windSpeed": 8
}`}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section id="endpoints" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">API Endpoints</h2>
            <p className="text-xl text-gray-600">Complete reference for all available endpoints</p>
          </div>

          <div className="space-y-8">
            {apiEndpoints.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-pittsburgh-gold/10 to-yellow-50 p-6 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <category.icon className="w-8 h-8 text-pittsburgh-gold" />
                    <div>
                      <h3 className="text-xl font-bold text-pittsburgh-black">{category.category}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {category.endpoints.map((endpoint, endpointIndex) => (
                      <div key={endpointIndex} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                              endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {endpoint.method}
                            </span>
                            <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                              {endpoint.path}
                            </code>
                          </div>
                          <button
                            onClick={() => copyToClipboard(endpoint.path)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-gray-600 text-sm">{endpoint.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDKs and Libraries */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">SDKs & Libraries</h2>
            <p className="text-xl text-gray-600">Official libraries to get you started faster</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-lg font-bold text-pittsburgh-black mb-2">JavaScript SDK</h3>
              <p className="text-gray-600 text-sm mb-4">Official JavaScript library for web applications</p>
              <button className="text-pittsburgh-gold hover:text-pittsburgh-black font-semibold">
                Coming Soon
              </button>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">🐍</div>
              <h3 className="text-lg font-bold text-pittsburgh-black mb-2">Python SDK</h3>
              <p className="text-gray-600 text-sm mb-4">Python library for data analysis and automation</p>
              <button className="text-pittsburgh-gold hover:text-pittsburgh-black font-semibold">
                Coming Soon
              </button>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">📡</div>
              <h3 className="text-lg font-bold text-pittsburgh-black mb-2">REST API</h3>
              <p className="text-gray-600 text-sm mb-4">Direct REST API access for any language</p>
              <Link
                href="#endpoints"
                className="text-pittsburgh-gold hover:text-pittsburgh-black font-semibold"
              >
                View Documentation →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Book className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
          <p className="text-xl mb-8 opacity-90">
            Our developer community and support team are here to help you build amazing applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-pittsburgh-gold text-pittsburgh-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Contact Developer Support
            </Link>
            <Link
              href="/help"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              View Help Center
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
