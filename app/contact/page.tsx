import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, Building } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Us | PittsburghEverything',
  description: 'Get in touch with PittsburghEverything. Contact us for business listings, partnerships, press inquiries, or general questions about Pittsburgh.',
  keywords: 'contact PittsburghEverything, business listings, partnerships, press contact, Pittsburgh directory support',
  openGraph: {
    title: 'Contact Us | PittsburghEverything',
    description: 'Get in touch with PittsburghEverything for business listings, partnerships, and support.',
    images: [
      {
        url: '/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Contact PittsburghEverything',
      },
    ],
  },
}

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us an email for general inquiries',
      contact: 'hello@pittsburgheverything.com',
      action: 'mailto:hello@pittsburgheverything.com'
    },
    {
      icon: Building,
      title: 'Business Listings',
      description: 'Add or update your business listing',
      contact: 'listings@pittsburgheverything.com',
      action: '/submit-business'
    },
    {
      icon: MessageCircle,
      title: 'Partnerships',
      description: 'Business partnerships and collaborations',
      contact: 'partners@pittsburgheverything.com',
      action: 'mailto:partners@pittsburgheverything.com'
    },
    {
      icon: HelpCircle,
      title: 'Support',
      description: 'Technical support and help',
      contact: 'support@pittsburgheverything.com',
      action: 'mailto:support@pittsburgheverything.com'
    }
  ]

  const officeInfo = {
    address: '600 Grant St, Pittsburgh, PA 15219',
    phone: '+1 (412) 555-PEAK',
    hours: 'Monday - Friday: 9:00 AM - 5:00 PM EST',
    timezone: 'Eastern Time Zone'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold via-yellow-400 to-orange-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Have questions about Pittsburgh? Want to list your business?
            We're here to help you discover and engage with the Steel City.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the best way to reach us based on your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-pittsburgh-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-pittsburgh-black mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                {method.action.startsWith('mailto:') || method.action.startsWith('tel:') ? (
                  <a
                    href={method.action}
                    className="text-pittsburgh-gold font-semibold hover:underline"
                  >
                    {method.contact}
                  </a>
                ) : (
                  <Link
                    href={method.action}
                    className="text-pittsburgh-gold font-semibold hover:underline"
                  >
                    {method.contact}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-pittsburgh-black mb-6">Send Us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="business">Business Listing Inquiry</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">General Feedback</option>
                    <option value="press">Press/Media Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-pittsburgh-gold text-pittsburgh-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Office Info */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-pittsburgh-black mb-6">Office Information</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-pittsburgh-gold mt-1" />
                    <div>
                      <h4 className="font-semibold text-pittsburgh-black">Address</h4>
                      <p className="text-gray-600">{officeInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-pittsburgh-gold mt-1" />
                    <div>
                      <h4 className="font-semibold text-pittsburgh-black">Phone</h4>
                      <p className="text-gray-600">{officeInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-pittsburgh-gold mt-1" />
                    <div>
                      <h4 className="font-semibold text-pittsburgh-black">Business Hours</h4>
                      <p className="text-gray-600">{officeInfo.hours}</p>
                      <p className="text-sm text-gray-500 mt-1">{officeInfo.timezone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-pittsburgh-black mb-6">Quick Answers</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-pittsburgh-black mb-2">How do I list my business?</h4>
                    <p className="text-gray-600 text-sm">
                      Visit our <Link href="/submit-business" className="text-pittsburgh-gold hover:underline">business submission page</Link> or email listings@pittsburgheverything.com
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-pittsburgh-black mb-2">How often is information updated?</h4>
                    <p className="text-gray-600 text-sm">
                      We update our content daily with real-time data from multiple sources to ensure accuracy.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-pittsburgh-black mb-2">Is the service free?</h4>
                    <p className="text-gray-600 text-sm">
                      Basic business listings and user access are free. Premium features are available for businesses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Find Us in Pittsburgh</h2>
            <p className="text-xl text-gray-600">
              Located in the heart of downtown Pittsburgh's Golden Triangle.
            </p>
          </div>

          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Interactive map would be embedded here</p>
              <p className="text-sm text-gray-500 mt-2">{officeInfo.address}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
