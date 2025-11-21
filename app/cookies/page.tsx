import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Cookie, Settings, Shield, BarChart3, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookie Policy | PittsburghEverything',
  description: 'Learn about how we use cookies and tracking technologies on PittsburghEverything. Manage your privacy preferences and cookie settings.',
}

export default function CookiesPage() {
  const lastUpdated = 'November 21, 2025'

  const cookieTypes = [
    {
      title: 'Essential Cookies',
      icon: Shield,
      color: 'green',
      required: true,
      description: 'These cookies are necessary for the website to function and cannot be switched off in our systems.',
      cookies: [
        { name: 'session_token', purpose: 'User authentication and session management', duration: 'Session' },
        { name: 'csrf_token', purpose: 'Security protection against cross-site request forgery', duration: 'Session' },
        { name: 'preferences', purpose: 'Remember your privacy and accessibility preferences', duration: '1 year' }
      ]
    },
    {
      title: 'Analytics Cookies',
      icon: BarChart3,
      color: 'blue',
      required: false,
      description: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.',
      cookies: [
        { name: '_ga', purpose: 'Google Analytics - distinguish users', duration: '2 years' },
        { name: '_gid', purpose: 'Google Analytics - session tracking', duration: '24 hours' },
        { name: '_gat', purpose: 'Google Analytics - throttle request rate', duration: '1 minute' },
        { name: 'page_views', purpose: 'Track page views and user journey', duration: 'Session' }
      ]
    },
    {
      title: 'Functional Cookies',
      icon: Settings,
      color: 'purple',
      required: false,
      description: 'These cookies enable the website to provide enhanced functionality and personalisation.',
      cookies: [
        { name: 'theme', purpose: 'Remember your preferred color scheme', duration: '1 year' },
        { name: 'location', purpose: 'Store location preferences for local content', duration: '30 days' },
        { name: 'language', purpose: 'Remember your language preference', duration: '1 year' }
      ]
    },
    {
      title: 'Marketing Cookies',
      icon: Target,
      color: 'orange',
      required: false,
      description: 'These cookies may be set through our site by our advertising partners to build a profile of your interests.',
      cookies: [
        { name: 'marketing_consent', purpose: 'Track marketing consent preferences', duration: '1 year' },
        { name: 'campaign_source', purpose: 'Track marketing campaign effectiveness', duration: '90 days' },
        { name: 'retargeting_id', purpose: 'Enable personalized advertising', duration: '90 days' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-pittsburgh-gold hover:text-pittsburgh-black transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-pittsburgh-black mb-4">
            Cookie Policy
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            We use cookies and similar technologies to enhance your browsing experience,
            analyze site traffic, and personalize content.
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Last updated: {lastUpdated}</span>
            <span>•</span>
            <span>GDPR & CCPA Compliant</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-pittsburgh-gold/10 rounded-lg flex items-center justify-center">
              <Cookie className="w-6 h-6 text-pittsburgh-gold" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-pittsburgh-black">
                What Are Cookies?
              </h2>
              <p className="text-gray-600 mt-1">
                Cookies are small text files that are stored on your device when you visit our website.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-pittsburgh-black mb-2">Security</h3>
              <p className="text-sm text-gray-600">Secure cookie handling with encryption</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Settings className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-pittsburgh-black mb-2">Control</h3>
              <p className="text-sm text-gray-600">Manage your cookie preferences anytime</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-pittsburgh-black mb-2">Transparency</h3>
              <p className="text-sm text-gray-600">Clear information about all cookies used</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Your Cookie Choices</h4>
            <p className="text-blue-700 text-sm">
              You can control cookie settings through your browser or our cookie preference center.
              Essential cookies cannot be disabled as they are required for website functionality.
            </p>
          </div>
        </div>

        {/* Cookie Categories */}
        <div className="space-y-6">
          {cookieTypes.map((category) => (
            <div key={category.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center`}>
                    <category.icon className={`w-6 h-6 text-${category.color}-600`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-pittsburgh-black">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  {category.required ? (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Required
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">Enable</label>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-pittsburgh-gold border-gray-300 rounded focus:ring-pittsburgh-gold"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Cookie Details */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-semibold text-pittsburgh-black">Cookie Name</th>
                      <th className="text-left py-2 font-semibold text-pittsburgh-black">Purpose</th>
                      <th className="text-left py-2 font-semibold text-pittsburgh-black">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.cookies.map((cookie, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 font-mono text-xs bg-gray-50 px-2 rounded">
                          {cookie.name}
                        </td>
                        <td className="py-3 text-gray-600">
                          {cookie.purpose}
                        </td>
                        <td className="py-3 text-gray-500 text-sm">
                          {cookie.duration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Third-party Cookies */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mt-8">
          <h2 className="text-2xl font-bold text-pittsburgh-black mb-6">
            Third-Party Cookies
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-pittsburgh-black mb-3">Google Analytics</h3>
              <p className="text-gray-600 mb-3">
                We use Google Analytics to understand how visitors use our website. This helps us improve user experience and content.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-blue-800">Analytics Cookies</span>
                    <span className="text-sm text-blue-600 ml-2">(Optional)</span>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-pittsburgh-gold border-gray-300 rounded focus:ring-pittsburgh-gold"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-pittsburgh-black mb-3">Social Media Widgets</h3>
              <p className="text-gray-600 mb-3">
                Social media buttons and widgets may set cookies when you interact with them.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-purple-800">Social Cookies</span>
                    <span className="text-sm text-purple-600 ml-2">(Optional)</span>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-pittsburgh-gold border-gray-300 rounded focus:ring-pittsburgh-gold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cookie Settings */}
        <div className="bg-gradient-to-r from-pittsburgh-gold/10 to-yellow-50 rounded-lg p-8 mt-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-pittsburgh-black mb-4">
              Manage Your Cookie Preferences
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              You can change your cookie preferences at any time. Changes will take effect immediately,
              but may require you to refresh the page.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                Save Preferences
              </button>
              <button className="border border-pittsburgh-gold text-pittsburgh-gold px-8 py-3 rounded-lg font-semibold hover:bg-pittsburgh-gold hover:text-pittsburgh-black transition-colors">
                Reset to Defaults
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>
                You can also manage cookies through your browser settings.
                Learn more about managing cookies in{' '}
                <a href="https://www.aboutcookies.org" className="text-pittsburgh-gold hover:underline" target="_blank" rel="noopener noreferrer">
                  popular browsers
                </a>.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-pittsburgh-black mb-2">
            Questions About Cookies?
          </h3>
          <p className="text-gray-600 mb-4">
            If you have questions about our cookie policy or need help managing your preferences,
            please contact our privacy team.
          </p>
          <a
            href="mailto:privacy@pittsburgheverything.com"
            className="text-pittsburgh-gold hover:text-pittsburgh-black font-medium transition-colors"
          >
            privacy@pittsburgheverything.com
          </a>
        </div>
      </div>
    </div>
  )
}
