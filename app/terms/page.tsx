import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, FileText, Shield, Users, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | PittsburghEverything',
  description: 'Read our terms of service and usage agreement. Understand your rights and responsibilities when using PittsburghEverything.',
}

export default function TermsPage() {
  const lastUpdated = 'November 21, 2025'

  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: FileText,
      content: `By accessing and using PittsburghEverything, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      title: 'Use License',
      icon: Shield,
      content: `Permission is granted to temporarily access the materials (information or software) on PittsburghEverything for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:

• modify or copy the materials
• use the materials for any commercial purpose or for any public display (commercial or non-commercial)
• attempt to decompile or reverse engineer any software contained on PittsburghEverything
• remove any copyright or other proprietary notations from the materials

This license shall automatically terminate if you violate any of these restrictions and may be terminated by PittsburghEverything at any time.`
    },
    {
      title: 'User Responsibilities',
      icon: Users,
      content: `As a user of PittsburghEverything, you agree to:

• Provide accurate and current information when creating an account or submitting content
• Respect other users and maintain appropriate conduct in reviews and comments
• Not use the service for any illegal or unauthorized purpose
• Not submit false or misleading information about businesses or services
• Respect intellectual property rights of others
• Not attempt to gain unauthorized access to our systems or networks

Violation of these terms may result in account suspension or termination.`
    },
    {
      title: 'Content and Reviews',
      icon: AlertTriangle,
      content: `PittsburghEverything allows users to submit reviews, photos, and other content. By submitting content, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, display, and distribute your content.

You are solely responsible for the content you submit and must ensure that:

• You own the rights to the content or have permission to use it
• The content does not violate any laws or third-party rights
• The content is accurate and not misleading
• The content does not contain harmful, offensive, or inappropriate material

We reserve the right to remove content that violates these terms or our community guidelines.`
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
            Terms of Service
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            These terms govern your use of PittsburghEverything and outline our rights and responsibilities.
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Last updated: {lastUpdated}</span>
            <span>•</span>
            <span>Effective for all users</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-pittsburgh-black mb-4">
            Agreement Overview
          </h2>
          <p className="text-gray-600 mb-4">
            Welcome to PittsburghEverything. These Terms of Service ("Terms") govern your use of our website,
            mobile application, and related services (collectively, the "Service"). By using PittsburghEverything,
            you agree to these Terms.
          </p>
          <p className="text-gray-600">
            Please read these Terms carefully. If you do not agree with any part of these Terms,
            you must not use our Service.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={section.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-pittsburgh-gold/10 rounded-lg flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-pittsburgh-gold" />
                </div>
                <h2 className="text-2xl font-bold text-pittsburgh-black">
                  {index + 1}. {section.title}
                </h2>
              </div>

              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Service Availability */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mt-8">
          <h2 className="text-2xl font-bold text-pittsburgh-black mb-6">
            5. Service Availability and Changes
          </h2>

          <div className="space-y-4 text-gray-600">
            <p>
              PittsburghEverything strives to provide continuous service but cannot guarantee
              uninterrupted availability. We may modify, suspend, or discontinue any part of
              the Service at any time.
            </p>

            <p>
              We reserve the right to change these Terms at any time. When we make changes,
              we will update the "Last updated" date at the top of this page. Your continued
              use of the Service after changes become effective constitutes acceptance of the new Terms.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-1">Important Notice</h4>
                  <p className="text-yellow-700 text-sm">
                    We will notify users of significant changes to these Terms via email or
                    prominent notice on our Service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Limitation of Liability */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mt-8">
          <h2 className="text-2xl font-bold text-pittsburgh-black mb-6">
            6. Limitation of Liability
          </h2>

          <div className="text-gray-600 space-y-4">
            <p>
              PittsburghEverything and its affiliates, officers, directors, employees, agents,
              suppliers, and licensors shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including without limitation, loss of profits,
              data, use, goodwill, or other intangible losses.
            </p>

            <p>
              Our total liability arising out of or relating to these Terms or the Service shall
              not exceed the amount paid by you to us in the twelve months preceding the claim.
            </p>

            <p>
              Some jurisdictions do not allow the exclusion of certain warranties or the limitation
              or exclusion of liability for incidental or consequential damages. Accordingly, some
              of the above limitations may not apply to you.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-pittsburgh-gold/10 to-yellow-50 rounded-lg p-8 mt-8 text-center">
          <h2 className="text-2xl font-bold text-pittsburgh-black mb-4">
            Questions About These Terms?
          </h2>
          <p className="text-gray-600 mb-6">
            If you have any questions about these Terms of Service or need clarification,
            please contact our legal team.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:legal@pittsburgheverything.com"
              className="bg-pittsburgh-gold text-pittsburgh-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center gap-2"
            >
              Contact Legal Team
            </a>
            <Link
              href="/contact"
              className="border border-pittsburgh-gold text-pittsburgh-gold px-6 py-3 rounded-lg font-semibold hover:bg-pittsburgh-gold hover:text-pittsburgh-black transition-colors inline-flex items-center justify-center gap-2"
            >
              General Support
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            These terms were last updated on {lastUpdated}.
            Continued use of PittsburghEverything constitutes acceptance of these terms.
          </p>
        </div>
      </div>
    </div>
  )
}
