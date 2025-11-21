import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Eye, Ear, MousePointer, Keyboard, Monitor, Smartphone, CheckCircle, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Accessibility Statement | PittsburghEverything',
  description: 'Our commitment to digital accessibility. Learn about our accessibility features, standards compliance, and how we ensure an inclusive experience for all users.',
}

export default function AccessibilityPage() {
  const lastUpdated = 'November 21, 2025'

  const accessibilityFeatures = [
    {
      category: 'Visual Accessibility',
      icon: Eye,
      features: [
        { name: 'High Contrast Mode', status: 'available', description: 'Toggle high contrast for better visibility' },
        { name: 'Font Size Adjustment', status: 'available', description: 'Browser-based text resizing supported' },
        { name: 'Color Blind Friendly', status: 'compliant', description: 'Color schemes designed for accessibility' },
        { name: 'Focus Indicators', status: 'available', description: 'Visible focus rings on all interactive elements' }
      ]
    },
    {
      category: 'Motor Accessibility',
      icon: MousePointer,
      features: [
        { name: 'Keyboard Navigation', status: 'compliant', description: 'Full keyboard accessibility throughout site' },
        { name: 'Touch Targets', status: 'compliant', description: 'Minimum 44px touch targets on mobile' },
        { name: 'Reduced Motion', status: 'available', description: 'Respects prefers-reduced-motion setting' },
        { name: 'Voice Control', status: 'supported', description: 'Compatible with voice control software' }
      ]
    },
    {
      category: 'Auditory Accessibility',
      icon: Ear,
      features: [
        { name: 'Screen Reader Support', status: 'compliant', description: 'WCAG 2.1 AA compliant screen reader support' },
        { name: 'Alt Text', status: 'compliant', description: 'All images have descriptive alt text' },
        { name: 'Semantic HTML', status: 'compliant', description: 'Proper heading structure and landmarks' },
        { name: 'Live Regions', status: 'available', description: 'Dynamic content announced to screen readers' }
      ]
    },
    {
      category: 'Cognitive Accessibility',
      icon: Monitor,
      features: [
        { name: 'Clear Language', status: 'compliant', description: 'Simple, clear language throughout' },
        { name: 'Consistent Navigation', status: 'compliant', description: 'Predictable navigation patterns' },
        { name: 'Error Prevention', status: 'available', description: 'Form validation and error prevention' },
        { name: 'Progressive Disclosure', status: 'available', description: 'Information revealed gradually' }
      ]
    }
  ]

  const standards = [
    {
      name: 'WCAG 2.1 AA',
      description: 'Web Content Accessibility Guidelines 2.1 Level AA',
      status: 'compliant',
      details: 'Meets all Level A and AA success criteria'
    },
    {
      name: 'Section 508',
      description: 'U.S. federal accessibility standard',
      status: 'compliant',
      details: 'Compliant with federal accessibility requirements'
    },
    {
      name: 'ADA Standards',
      description: 'Americans with Disabilities Act accessibility guidelines',
      status: 'compliant',
      details: 'Digital accessibility standards for public accommodations'
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
            Accessibility Statement
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            PittsburghEverything is committed to ensuring digital accessibility for people with disabilities.
            We are continually improving the user experience for everyone.
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Last updated: {lastUpdated}</span>
            <span>•</span>
            <span>WCAG 2.1 AA Compliant</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Commitment Statement */}
        <div className="bg-gradient-to-r from-pittsburgh-gold/10 to-yellow-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-pittsburgh-black mb-4">
            Our Accessibility Commitment
          </h2>
          <p className="text-gray-600 mb-4">
            At PittsburghEverything, we believe that everyone should have equal access to information
            about Pittsburgh. We are committed to making our website accessible to people with disabilities
            and are continually working to improve our accessibility features.
          </p>
          <p className="text-gray-600">
            This website conforms to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
            We regularly audit our site and make improvements to ensure ongoing compliance.
          </p>
        </div>

        {/* Accessibility Features */}
        <div className="space-y-8 mb-12">
          {accessibilityFeatures.map((category) => (
            <div key={category.category} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-pittsburgh-gold/10 rounded-lg flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-pittsburgh-gold" />
                </div>
                <h2 className="text-2xl font-bold text-pittsburgh-black">
                  {category.category}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.features.map((feature) => (
                  <div key={feature.name} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-pittsburgh-black">
                        {feature.name}
                      </h3>
                      {feature.status === 'compliant' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : feature.status === 'available' ? (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                    <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                      feature.status === 'compliant'
                        ? 'bg-green-100 text-green-800'
                        : feature.status === 'available'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {feature.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Standards Compliance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-pittsburgh-black mb-6">
            Accessibility Standards
          </h2>

          <div className="space-y-4">
            {standards.map((standard) => (
              <div key={standard.name} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-pittsburgh-black mb-1">
                    {standard.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {standard.description}
                  </p>
                  <p className="text-green-700 text-sm font-medium">
                    {standard.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browser and Device Support */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-pittsburgh-black mb-6">
            Browser and Assistive Technology Support
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-pittsburgh-black mb-3 flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Supported Browsers
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Chrome 90+ (recommended)</li>
                <li>• Firefox 88+</li>
                <li>• Safari 14+</li>
                <li>• Edge 90+</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-pittsburgh-black mb-3 flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Mobile Accessibility
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• iOS VoiceOver</li>
                <li>• Android TalkBack</li>
                <li>• Mobile screen readers</li>
                <li>• Touch navigation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How to Use Accessibility Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            How to Use Our Accessibility Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-800 mb-3">Keyboard Shortcuts</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li><kbd className="bg-blue-200 px-1 rounded">Tab</kbd> - Navigate between links and buttons</li>
                <li><kbd className="bg-blue-200 px-1 rounded">Enter</kbd> - Activate selected element</li>
                <li><kbd className="bg-blue-200 px-1 rounded">Escape</kbd> - Close modals or menus</li>
                <li><kbd className="bg-blue-200 px-1 rounded">Shift + Tab</kbd> - Navigate backwards</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-blue-800 mb-3">Accessibility Settings</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• Use browser zoom (Ctrl/Cmd + +)</li>
                <li>• Enable high contrast mode</li>
                <li>• Adjust font size in browser settings</li>
                <li>• Use screen reader software</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feedback and Contact */}
        <div className="bg-gradient-to-r from-pittsburgh-gold/10 to-yellow-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-pittsburgh-black mb-4">
            Accessibility Feedback
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We are committed to continually improving accessibility. If you experience any difficulties
            using our website or have suggestions for improvement, please let us know.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:accessibility@pittsburgheverything.com"
              className="bg-pittsburgh-gold text-pittsburgh-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center gap-2"
            >
              Report Accessibility Issue
            </a>
            <Link
              href="/contact"
              className="border border-pittsburgh-gold text-pittsburgh-gold px-6 py-3 rounded-lg font-semibold hover:bg-pittsburgh-gold hover:text-pittsburgh-black transition-colors inline-flex items-center justify-center gap-2"
            >
              Contact Support
            </Link>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>
              Response time: We aim to respond to accessibility concerns within 2 business days.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            This accessibility statement was last updated on {lastUpdated}.
            We regularly review and update our accessibility features and practices.
          </p>
        </div>
      </div>
    </div>
  )
}
