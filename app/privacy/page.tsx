import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Shield, Eye, Lock, Users, Database } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | PittsburghEverything',
  description: 'Learn how PittsburghEverything collects, uses, and protects your personal information. Our comprehensive privacy policy covers data collection, cookies, and user rights.',
}

export default function PrivacyPage() {
  const lastUpdated = 'November 21, 2025'

  const sections = [
    {
      title: 'Information We Collect',
      icon: Database,
      content: [
        'Personal information you provide (name, email, phone)',
        'Usage data and analytics information',
        'Location data for local recommendations',
        'Device and browser information',
        'Communication preferences and history'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: Users,
      content: [
        'Provide personalized local recommendations',
        'Send relevant updates and notifications',
        'Improve our services and user experience',
        'Process reviews and business submissions',
        'Comply with legal obligations'
      ]
    },
    {
      title: 'Information Sharing',
      icon: Eye,
      content: [
        'We do not sell your personal information',
        'Shared only with your explicit consent',
        'Service providers for website operations',
        'Legal requirements and safety concerns',
        'Business transfers in case of sale'
      ]
    },
    {
      title: 'Data Security',
      icon: Shield,
      content: [
        'Industry-standard encryption methods',
        'Secure data storage and transmission',
        'Regular security audits and updates',
        'Limited employee access to personal data',
        'Immediate breach notification procedures'
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
            Privacy Policy
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Last updated: {lastUpdated}</span>
            <span>•</span>
            <span>Effective immediately</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-pittsburgh-black mb-4">
            Our Commitment to Privacy
          </h2>
          <p className="text-gray-600 mb-6">
            PittsburghEverything is committed to protecting your privacy and ensuring transparency
            in how we handle your personal information. We believe in minimal data collection,
            maximum security, and giving you control over your data.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Lock className="w-8 h-8 text-pittsburgh-gold mx-auto mb-3" />
              <h3 className="font-semibold text-pittsburgh-black mb-2">Data Security</h3>
              <p className="text-sm text-gray-600">Your information is encrypted and securely stored</p>
            </div>
            <div className="text-center">
              <Eye className="w-8 h-8 text-pittsburgh-gold mx-auto mb-3" />
              <h3 className="font-semibold text-pittsburgh-black mb-2">Transparency</h3>
              <p className="text-sm text-gray-600">Clear information about data collection and use</p>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-pittsburgh-gold mx-auto mb-3" />
              <h3 className="font-semibold text-pittsburgh-black mb-2">Your Control</h3>
              <p className="text-sm text-gray-600">Access, update, and delete your data anytime</p>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={section.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-pittsburgh-gold/10 rounded-lg flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-pittsburgh-gold" />
                </div>
                <h2 className="text-2xl font-bold text-pittsburgh-black">
                  {section.title}
                </h2>
              </div>

              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-pittsburgh-gold rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cookies Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mt-8">
          <h2 className="text-2xl font-bold text-pittsburgh-black mb-6">
            Cookies and Tracking
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-pittsburgh-black mb-3">Essential Cookies</h3>
              <p className="text-gray-600 mb-3">
                Required for website functionality, user authentication, and security.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-green-800">Always Active</span>
                </div>
                <p className="text-sm text-green-700">These cookies are necessary for the website to function properly.</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-pittsburgh-black mb-3">Analytics Cookies</h3>
              <p className="text-gray-600 mb-3">
                Help us understand how visitors use our website to improve user experience.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-blue-800">Optional</span>
                </div>
                <p className="text-sm text-blue-700">We use Google Analytics to track website usage and improve our services.</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-pittsburgh-black mb-3">Marketing Cookies</h3>
              <p className="text-gray-600 mb-3">
                Used to deliver relevant advertisements and track campaign effectiveness.
              </p>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="font-medium text-orange-800">Optional</span>
                </div>
                <p className="text-sm text-orange-700">Third-party cookies for targeted advertising and retargeting.</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Rights */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mt-8">
          <h2 className="text-2xl font-bold text-pittsburgh-black mb-6">
            Your Rights and Choices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Access Your Data',
                description: 'Request a copy of all personal information we have about you.',
                action: 'Data Access Request'
              },
              {
                title: 'Update Information',
                description: 'Correct or update your personal information at any time.',
                action: 'Update Profile'
              },
              {
                title: 'Delete Your Data',
                description: 'Request complete removal of your personal information.',
                action: 'Data Deletion Request'
              },
              {
                title: 'Opt Out',
                description: 'Unsubscribe from marketing communications and analytics tracking.',
                action: 'Manage Preferences'
              }
            ].map((right) => (
              <div key={right.title} className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-pittsburgh-black mb-2">
                  {right.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {right.description}
                </p>
                <button className="text-pittsburgh-gold hover:text-pittsburgh-black font-medium text-sm transition-colors">
                  {right.action} →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-pittsburgh-gold/10 to-yellow-50 rounded-lg p-8 mt-8 text-center">
          <h2 className="text-2xl font-bold text-pittsburgh-black mb-4">
            Questions About Privacy?
          </h2>
          <p className="text-gray-600 mb-6">
            If you have any questions about this privacy policy or our data practices,
            please don't hesitate to contact us.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:privacy@pittsburgheverything.com"
              className="bg-pittsburgh-gold text-pittsburgh-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center gap-2"
            >
              Email Privacy Team
            </a>
            <Link
              href="/contact"
              className="border border-pittsburgh-gold text-pittsburgh-gold px-6 py-3 rounded-lg font-semibold hover:bg-pittsburgh-gold hover:text-pittsburgh-black transition-colors inline-flex items-center justify-center gap-2"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            This privacy policy was last updated on {lastUpdated}.
            We may update this policy periodically to reflect changes in our practices.
          </p>
        </div>
      </div>
    </div>
  )
}
