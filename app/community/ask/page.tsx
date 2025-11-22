import { Metadata } from 'next'
import { ArrowLeft, MessageSquare, Send } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Ask a Question | Pittsburgh Community',
  description: 'Ask the Pittsburgh community for recommendations, advice, and local knowledge.',
  keywords: 'Pittsburgh questions, community forum, ask locals',
}

export default function AskQuestionPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Ask a Question - Pittsburgh Community",
    "description": "Ask questions to the Pittsburgh community and get local recommendations.",
    "url": "https://pittsburgheverything.com/community/ask"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Community
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black">Ask a Question</h1>
          </div>
          <p className="text-xl opacity-90">
            Get help from the Pittsburgh community. Ask about restaurants, neighborhoods, services, or anything local.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <form className="space-y-6">
              {/* Question Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Question Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="e.g., Best Italian restaurants in Bloomfield?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-1 text-sm text-gray-500">Be specific so others can help you better</p>
              </div>

              {/* Question Details */}
              <div>
                <label htmlFor="body" className="block text-sm font-semibold text-gray-700 mb-2">
                  Question Details *
                </label>
                <textarea
                  id="body"
                  name="body"
                  required
                  rows={8}
                  placeholder="Provide more context about your question. What are you looking for? What have you already tried?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <p className="mt-1 text-sm text-gray-500">The more details you provide, the better answers you'll get</p>
              </div>

              {/* Neighborhood */}
              <div>
                <label htmlFor="neighborhood" className="block text-sm font-semibold text-gray-700 mb-2">
                  Neighborhood (Optional)
                </label>
                <select
                  id="neighborhood"
                  name="neighborhood"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a neighborhood</option>
                  <option value="Downtown">Downtown</option>
                  <option value="Oakland">Oakland</option>
                  <option value="Shadyside">Shadyside</option>
                  <option value="Squirrel Hill">Squirrel Hill</option>
                  <option value="Lawrenceville">Lawrenceville</option>
                  <option value="South Side">South Side</option>
                  <option value="Bloomfield">Bloomfield</option>
                  <option value="Strip District">Strip District</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="First name or nickname"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-sm text-gray-500">We'll notify you when someone responds</p>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-2">
                  Tags (Optional)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="e.g., restaurants, dining, Bloomfield"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-1 text-sm text-gray-500">Add tags to help others find your question</p>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Post Question
                </button>
                <Link
                  href="/community"
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
                >
                  Cancel
                </Link>
              </div>

              <p className="text-sm text-gray-500 text-center">
                By posting, you agree to our community guidelines. Questions are typically answered within 24 hours.
              </p>
            </form>
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="font-bold text-blue-900 mb-4">Tips for Getting Great Answers</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Be specific about what you're looking for</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Include your neighborhood if relevant</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Search existing questions first to avoid duplicates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Be respectful and thank people who help</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

