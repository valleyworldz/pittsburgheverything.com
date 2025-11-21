import type { Metadata } from 'next'
import { HelpCircle, Search, MessageSquare, Phone, Mail, MapPin, CreditCard, Shield, Star, Users } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Help Center | PittsburghEverything',
  description: 'Get help and answers to your questions about PittsburghEverything. Find guides, FAQs, and contact information.',
  keywords: 'help, FAQ, support, contact, PittsburghEverything help',
  openGraph: {
    title: 'Help Center | PittsburghEverything',
    description: 'Get help and answers to your questions about PittsburghEverything.',
    images: [
      {
        url: '/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Help Center',
      },
    ],
  },
}

export default function HelpPage() {
  const faqCategories = [
    {
      title: 'Getting Started',
      icon: Users,
      questions: [
        { q: 'How do I create an account?', a: 'Click the "Sign Up" button in the top right corner and follow the simple registration process.' },
        { q: 'Is PittsburghEverything free to use?', a: 'Yes! Basic browsing and most features are completely free. Business listings have premium options.' },
        { q: 'How do I list my business?', a: 'Visit our submit-business page or contact our team for assistance with business listings.' }
      ]
    },
    {
      title: 'Finding Places',
      icon: MapPin,
      questions: [
        { q: 'How do I search for restaurants?', a: 'Use the search bar or navigate to the Restaurants section. Filter by cuisine, neighborhood, or price range.' },
        { q: 'Can I filter by neighborhood?', a: 'Yes! Each section has neighborhood filters. You can also use our interactive neighborhood map.' },
        { q: 'How do I find events happening today?', a: 'Check the Events section or use our real-time dashboard for live event information.' }
      ]
    },
    {
      title: 'Reviews & Ratings',
      icon: Star,
      questions: [
        { q: 'How do I leave a review?', a: 'Visit any business page and click "Write a Review" to share your experience.' },
        { q: 'Can I edit my review?', a: 'Yes, you can edit reviews within 24 hours of posting. Contact support for longer periods.' },
        { q: 'How are reviews moderated?', a: 'All reviews are moderated for quality and authenticity. Spam and inappropriate content is removed.' }
      ]
    },
    {
      title: 'Deals & Specials',
      icon: CreditCard,
      questions: [
        { q: 'How do I claim a deal?', a: 'Click "Claim This Deal" on any deal card. Show the confirmation at the business.' },
        { q: 'Are deals always available?', a: 'Deals may have limited availability. Check the expiration date and terms for each offer.' },
        { q: 'Can I get notified about new deals?', a: 'Subscribe to our newsletter or enable push notifications for deal alerts.' }
      ]
    },
    {
      title: 'Technical Support',
      icon: Shield,
      questions: [
        { q: 'The site isn\'t loading properly', a: 'Try clearing your browser cache and cookies, or try a different browser.' },
        { q: 'I can\'t submit a form', a: 'Check your internet connection and try refreshing the page. Contact support if issues persist.' },
        { q: 'How do I report a bug?', a: 'Use the contact form or email support@pittsburgheverything.com with details.' }
      ]
    }
  ]

  const contactMethods = [
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our support team',
      availability: 'Mon-Fri, 9AM-5PM EST',
      action: 'Chat Now'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'support@pittsburgheverything.com',
      availability: '24/7 response within 24 hours',
      action: 'Send Email'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: '(412) 555-HELP',
      availability: 'Mon-Fri, 9AM-5PM EST',
      action: 'Call Now'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Help Center
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Get answers to your questions and find the help you need to make the most of PittsburghEverything.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Browse our most common questions by category</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {faqCategories.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className="w-8 h-8 text-pittsburgh-gold" />
                  <h3 className="text-xl font-bold text-pittsburgh-black">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <details key={faqIndex} className="group">
                      <summary className="cursor-pointer font-medium text-gray-900 hover:text-pittsburgh-gold transition-colors flex justify-between items-center">
                        {faq.q}
                        <span className="ml-2 text-pittsburgh-gold group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-3 text-gray-600 pl-4 border-l-2 border-pittsburgh-gold/20">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Still Need Help?</h2>
            <p className="text-xl text-gray-600">Our support team is here to help you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
                <method.icon className="w-12 h-12 text-pittsburgh-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold text-pittsburgh-black mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-3">{method.description}</p>
                <p className="text-sm text-gray-500 mb-4">{method.availability}</p>
                <button className="bg-pittsburgh-gold text-pittsburgh-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                  {method.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Quick Links</h2>
            <p className="text-xl text-gray-600">Find what you need fast</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link href="/contact" className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Mail className="w-8 h-8 text-pittsburgh-gold mx-auto mb-2" />
              <div className="font-semibold text-pittsburgh-black">Contact Us</div>
              <div className="text-sm text-gray-600">Get in touch</div>
            </Link>

            <Link href="/about" className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Users className="w-8 h-8 text-pittsburgh-gold mx-auto mb-2" />
              <div className="font-semibold text-pittsburgh-black">About Us</div>
              <div className="text-sm text-gray-600">Learn about us</div>
            </Link>

            <Link href="/privacy" className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Shield className="w-8 h-8 text-pittsburgh-gold mx-auto mb-2" />
              <div className="font-semibold text-pittsburgh-black">Privacy</div>
              <div className="text-sm text-gray-600">Privacy policy</div>
            </Link>

            <Link href="/terms" className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <HelpCircle className="w-8 h-8 text-pittsburgh-gold mx-auto mb-2" />
              <div className="font-semibold text-pittsburgh-black">Terms</div>
              <div className="text-sm text-gray-600">Terms of service</div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
