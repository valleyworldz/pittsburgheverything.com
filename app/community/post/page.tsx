import { Metadata } from 'next'
import { ArrowLeft, MessageSquare, Search, Heart, Send } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Post to Community | Pittsburgh Community',
  description: 'Post lost & found items, volunteer opportunities, or start a discussion in the Pittsburgh community.',
  keywords: 'Pittsburgh community, lost found, volunteer, discussion',
}

export default function PostToCommunityPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Post to Community - Pittsburgh Community",
    "description": "Post lost & found items, volunteer opportunities, or discussions to the Pittsburgh community.",
    "url": "https://pittsburgheverything.com/community/post"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Header */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-12">
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
            <h1 className="text-3xl md:text-4xl font-black">Post to Community</h1>
          </div>
          <p className="text-xl opacity-90">
            Share lost & found items, volunteer opportunities, or start a community discussion.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <form className="space-y-6">
              {/* Post Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Post Type *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="relative">
                    <input
                      type="radio"
                      name="type"
                      value="lost-found"
                      className="peer sr-only"
                      defaultChecked
                    />
                    <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-orange-500 transition-colors peer-checked:border-orange-500 peer-checked:bg-orange-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Search className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Lost & Found</div>
                          <div className="text-sm text-gray-600">Missing or found items</div>
                        </div>
                      </div>
                    </div>
                  </label>

                  <label className="relative">
                    <input
                      type="radio"
                      name="type"
                      value="volunteer"
                      className="peer sr-only"
                    />
                    <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-green-500 transition-colors peer-checked:border-green-500 peer-checked:bg-green-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Heart className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Volunteer</div>
                          <div className="text-sm text-gray-600">Opportunities to help</div>
                        </div>
                      </div>
                    </div>
                  </label>

                  <label className="relative">
                    <input
                      type="radio"
                      name="type"
                      value="discussion"
                      className="peer sr-only"
                    />
                    <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors peer-checked:border-blue-500 peer-checked:bg-blue-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Discussion</div>
                          <div className="text-sm text-gray-600">General topic</div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="e.g., Found: Black wallet in Schenley Park"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="body" className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="body"
                  name="body"
                  required
                  rows={8}
                  placeholder="Provide details about your post. For lost & found: describe the item, location, and contact info. For volunteer: describe the opportunity, time commitment, and how to get involved."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent resize-none"
                />
              </div>

              {/* Location Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="neighborhood" className="block text-sm font-semibold text-gray-700 mb-2">
                    Neighborhood *
                  </label>
                  <select
                    id="neighborhood"
                    name="neighborhood"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
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
                    <option value="Schenley Park">Schenley Park</option>
                    <option value="Regent Square">Regent Square</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                    Specific Location (Optional)
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="e.g., Near the fountain, 123 Main St"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                  />
                </div>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                  />
                  <p className="mt-1 text-sm text-gray-500">We'll notify you of responses</p>
                </div>
              </div>

              {/* Phone (Optional) */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="(412) 555-0123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                />
                <p className="mt-1 text-sm text-gray-500">For lost & found items, phone helps with quick contact</p>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-pittsburgh-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Post to Community
                </button>
                <Link
                  href="/community"
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
                >
                  Cancel
                </Link>
              </div>

              <p className="text-sm text-gray-500 text-center">
                By posting, you agree to our community guidelines. Posts are reviewed before being published.
              </p>
            </form>
          </div>

          {/* Guidelines */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Posting Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-pittsburgh-gold mt-1">•</span>
                <span><strong>Lost & Found:</strong> Include detailed description, location found/lost, and contact information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pittsburgh-gold mt-1">•</span>
                <span><strong>Volunteer:</strong> Describe the opportunity, time commitment, skills needed, and how to get involved</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pittsburgh-gold mt-1">•</span>
                <span><strong>Discussion:</strong> Keep topics relevant to Pittsburgh and the local community</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pittsburgh-gold mt-1">•</span>
                <span>All posts are reviewed for appropriateness before being published</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

