import { Metadata } from 'next'
import { CheckCircle, DollarSign, Users, Clock, Building, Mail, Phone, Globe, MapPin } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Submit Your Business | Add Your Service to PittsburghEverything',
  description: 'Add your business to PittsburghEverything for free. Reach thousands of customers looking for local services in Pittsburgh.',
  keywords: 'submit business, add business, business listing, Pittsburgh services directory',
  openGraph: {
    title: 'Submit Your Business | Free Business Listing',
    description: 'Add your business to PittsburghEverything and connect with local customers.',
    images: [
      {
        url: '/images/services/submit-business-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Submit your business to PittsburghEverything'
      }
    ]
  }
}

export default function SubmitBusinessPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Submit Your Business",
    "description": "Add your business to PittsburghEverything for free.",
    "url": "https://pittsburgheverything.com/services/submit",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const benefits = [
    {
      icon: DollarSign,
      title: 'Free Listing',
      description: 'Add your business at no cost'
    },
    {
      icon: Users,
      title: 'Reach Customers',
      description: 'Connect with thousands of local customers'
    },
    {
      icon: Clock,
      title: 'Quick Approval',
      description: 'Most listings approved within 24 hours'
    },
    {
      icon: CheckCircle,
      title: 'Verified Badge',
      description: 'Get verified to build trust with customers'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Submit Your Business
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Add your business to PittsburghEverything for free. Reach thousands of customers looking for local services.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm opacity-75">Listing</div>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm opacity-75">Daily Visitors</div>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">24hrs</div>
                <div className="text-sm opacity-75">Approval</div>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">Easy</div>
                <div className="text-sm opacity-75">Process</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">🚀 Start Growing Your Business Today</h3>
              <p className="opacity-90">
                Join hundreds of Pittsburgh businesses already listed on our platform. Free listing with no hidden fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Why List Your Business?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get more customers and grow your business with our free listing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-pittsburgh-black mb-4">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Submission Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Business Information
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below to submit your business. We'll review and approve within 24 hours.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <form className="space-y-6">
              {/* Business Name */}
              <div>
                <label htmlFor="businessName" className="block text-sm font-semibold text-pittsburgh-black mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  required
                  placeholder="Your business or company name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-pittsburgh-black mb-2">
                  Service Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  <option value="Home Services">Home Services</option>
                  <option value="Creatives">Creatives</option>
                  <option value="Auto Repair">Auto Repair</option>
                  <option value="DJs & Events">DJs & Events</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Subcategory */}
              <div>
                <label htmlFor="subcategory" className="block text-sm font-semibold text-pittsburgh-black mb-2">
                  Subcategory *
                </label>
                <input
                  type="text"
                  id="subcategory"
                  name="subcategory"
                  required
                  placeholder="e.g., Plumbing, Photography, General Auto Repair"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-pittsburgh-black mb-2">
                  Business Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  placeholder="Describe your business and services..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent resize-none"
                />
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-pittsburgh-black mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    placeholder="Street address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="neighborhood" className="block text-sm font-semibold text-pittsburgh-black mb-2">
                    Neighborhood *
                  </label>
                  <select
                    id="neighborhood"
                    name="neighborhood"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                  >
                    <option value="">Select neighborhood</option>
                    <option value="Downtown">Downtown</option>
                    <option value="Oakland">Oakland</option>
                    <option value="Shadyside">Shadyside</option>
                    <option value="Squirrel Hill">Squirrel Hill</option>
                    <option value="Lawrenceville">Lawrenceville</option>
                    <option value="South Side">South Side</option>
                    <option value="Strip District">Strip District</option>
                    <option value="North Shore">North Shore</option>
                    <option value="East Liberty">East Liberty</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-pittsburgh-black mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="(412) 555-0123"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-pittsburgh-black mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="your.email@business.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-semibold text-pittsburgh-black mb-2">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  placeholder="https://www.yourbusiness.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                />
              </div>

              {/* Services */}
              <div>
                <label htmlFor="services" className="block text-sm font-semibold text-pittsburgh-black mb-2">
                  Services Offered *
                </label>
                <textarea
                  id="services"
                  name="services"
                  required
                  rows={3}
                  placeholder="List your main services, separated by commas (e.g., Plumbing Repair, Drain Cleaning, Water Heater Installation)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent resize-none"
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  required
                  className="mt-1 text-pittsburgh-gold focus:ring-pittsburgh-gold"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the <Link href="/terms" className="text-pittsburgh-gold hover:underline">Terms of Service</Link> and
                  confirm that all information provided is accurate and that I have the authority to list this business.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                >
                  Submit Business for Free
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-pittsburgh-black mb-2">How long does approval take?</h3>
              <p className="text-gray-700">Most business listings are reviewed and approved within 24 hours. You'll receive an email notification once your listing is live.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-pittsburgh-black mb-2">Is there a cost to list my business?</h3>
              <p className="text-gray-700">No! Basic business listings are completely free. We offer optional premium features for businesses that want enhanced visibility.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-pittsburgh-black mb-2">Can I edit my listing after submission?</h3>
              <p className="text-gray-700">Yes! Once your listing is approved, you can log in to update your business information, add photos, and manage your listing at any time.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-pittsburgh-black mb-2">What if my business doesn't fit the listed categories?</h3>
              <p className="text-gray-700">Select "Other" as your category and describe your business type. We'll review and may create a new category if needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Submitting?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our team is here to help you get your business listed and connect with customers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/services"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              Browse All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

