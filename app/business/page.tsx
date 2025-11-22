import { Metadata } from 'next'
import { Check, Star, Zap, Crown, Building2, Users, TrendingUp, DollarSign } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Business Center | List Your Business on PittsburghEverything',
  description: 'Grow your Pittsburgh business with premium listings, advertising, and local marketing. Free basic listings available.',
  keywords: 'Pittsburgh business directory, advertise local business, business listings',
  openGraph: {
    title: 'Pittsburgh Business Center',
    description: 'List and promote your Pittsburgh business with premium features and advertising options.',
    images: [
      {
        url: '/images/business/business-center.jpg',
        width: 1200,
        height: 630,
        alt: 'Pittsburgh Business Center'
      }
    ]
  }
}

const pricingTiers = [
  {
    name: 'Free',
    icon: Building2,
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Basic business listing',
      'Contact information',
      'Hours of operation',
      'Category placement',
      'Mobile responsive',
      'Basic SEO optimization'
    ],
    limitations: [
      'No photos',
      'Basic description only',
      'Standard placement',
      'Community support'
    ],
    popular: false,
    cta: 'List My Business',
    href: '/submit-business'
  },
  {
    name: 'Featured',
    icon: Star,
    price: 29,
    period: 'month',
    description: 'Stand out from the competition',
    features: [
      'Everything in Free',
      'Up to 5 photos',
      'Enhanced description',
      'Priority placement',
      'Featured in category',
      'Newsletter mention (1x/month)',
      'Basic analytics',
      'Email support'
    ],
    limitations: [
      'Limited to 1 category',
      'No custom branding'
    ],
    popular: true,
    cta: 'Go Featured',
    href: '/business/upgrade?plan=featured'
  },
  {
    name: 'Premium',
    icon: Crown,
    price: 99,
    period: 'month',
    description: 'Maximum visibility and leads',
    features: [
      'Everything in Featured',
      'Unlimited photos',
      'Video integration',
      'Multiple categories',
      'Top placement in searches',
      'Newsletter feature (2x/month)',
      'Lead routing system',
      'Custom branding options',
      'Priority support',
      'Advanced analytics',
      'API access'
    ],
    limitations: [],
    popular: false,
    cta: 'Go Premium',
    href: '/business/upgrade?plan=premium'
  }
]

const businessStats = [
  { label: 'Active Business Listings', value: '2,847', icon: Building2 },
  { label: 'Monthly Page Views', value: '150K+', icon: Users },
  { label: 'Average Leads/Month', value: '450', icon: TrendingUp },
  { label: 'Customer Satisfaction', value: '98%', icon: Star }
]

export default function BusinessCenterPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pittsburgh Business Center",
    "description": "List and promote your Pittsburgh business with premium features and advertising options.",
    "url": "https://pittsburgheverything.com/business",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    },
    "offers": pricingTiers.map(tier => ({
      "@type": "Offer",
      "name": tier.name,
      "price": tier.price,
      "priceCurrency": "USD"
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Business Center
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Grow your Pittsburgh business with premium listings, advertising, and local marketing solutions.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {businessStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center">
                    <Icon className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm opacity-75">{stat.label}</div>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/submit-business"
                className="bg-white text-pittsburgh-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Building2 className="w-5 h-5" />
                List My Business Free
              </Link>
              <Link
                href="#pricing"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors inline-flex items-center justify-center gap-2"
              >
                <DollarSign className="w-5 h-5" />
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Business Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Why Choose PittsburghEverything?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of Pittsburgh businesses reaching local customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pittsburgh-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-pittsburgh-black mb-4">Local Focus</h3>
              <p className="text-gray-700">
                We understand Pittsburgh businesses and connect you with local customers actively searching for your services.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pittsburgh-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-pittsburgh-black mb-4">Proven Results</h3>
              <p className="text-gray-700">
                Our businesses see an average of 450 leads per month, with featured listings getting 3x more visibility.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pittsburgh-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-pittsburgh-black mb-4">98% Satisfaction</h3>
              <p className="text-gray-700">
                Pittsburgh businesses love our platform, with 98% satisfaction rate and growing referral network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free and upgrade as your business grows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => {
              const Icon = tier.icon
              return (
                <div
                  key={tier.name}
                  className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                    tier.popular ? 'ring-2 ring-pittsburgh-gold scale-105' : ''
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-pittsburgh-gold text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    <div className="flex items-center justify-center w-12 h-12 bg-pittsburgh-gold rounded-lg mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-pittsburgh-black mb-2">{tier.name}</h3>
                    <p className="text-gray-600 mb-4">{tier.description}</p>

                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-pittsburgh-black">${tier.price}</span>
                        <span className="text-gray-600 ml-1">/{tier.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {tier.limitations.length > 0 && (
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2 font-medium">Limitations:</p>
                        <ul className="space-y-1">
                          {tier.limitations.map((limitation, limitIndex) => (
                            <li key={limitIndex} className="text-sm text-gray-500">• {limitation}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Link
                      href={tier.href}
                      className={`w-full block text-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                        tier.popular
                          ? 'bg-pittsburgh-gold text-white hover:bg-yellow-500 shadow-lg'
                          : tier.price === 0
                          ? 'bg-gray-900 text-white hover:bg-gray-800'
                          : 'bg-pittsburgh-gold text-white hover:bg-yellow-500'
                      }`}
                    >
                      {tier.cta}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Money-back guarantee */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-sm">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700 font-medium">30-day money-back guarantee on all paid plans</span>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Business Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how Pittsburgh businesses are growing with our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pittsburgh-gold rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">AB</span>
                </div>
                <div>
                  <h4 className="font-bold text-pittsburgh-black">Ali Baba</h4>
                  <p className="text-sm text-gray-600">Middle Eastern Restaurant</p>
                </div>
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                "Since upgrading to Featured, our reservations increased by 40%. The newsletter mentions have been incredible for bringing in new customers."
              </blockquote>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pittsburgh-gold rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">CG</span>
                </div>
                <div>
                  <h4 className="font-bold text-pittsburgh-black">Crazy Mocha</h4>
                  <p className="text-sm text-gray-600">Coffee Roaster</p>
                </div>
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                "The Premium plan's lead routing system saves us hours every week. We get qualified customers calling directly instead of tire-kickers."
              </blockquote>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pittsburgh-gold rounded-full flex items-center justify-center mr-4">
                  <span className="text-sm text-white font-bold">P</span>
                </div>
                <div>
                  <h4 className="font-bold text-pittsburgh-black">Piper's Pub</h4>
                  <p className="text-sm text-gray-600">Irish Pub</p>
                </div>
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                "Started with free listing, now on Premium. Our weekend crowds have doubled thanks to the top search placement and newsletter features."
              </blockquote>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-pittsburgh-black mb-2">How quickly will I see results?</h3>
              <p className="text-gray-700">Most businesses see increased inquiries within 1-2 weeks of listing. Featured and Premium listings typically see results within 3-5 days.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-pittsburgh-black mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-700">Yes! You can upgrade or downgrade at any time. Changes take effect immediately, and we'll prorate any billing adjustments.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-pittsburgh-black mb-2">What if I'm not satisfied?</h3>
              <p className="text-gray-700">We offer a 30-day money-back guarantee on all paid plans. If you're not seeing results, we'll refund your payment in full.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-pittsburgh-black mb-2">Do you offer custom advertising?</h3>
              <p className="text-gray-700">Yes! Contact us for custom sponsorships, banner ads, and exclusive partnerships. We can create tailored campaigns for your business needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of Pittsburgh businesses reaching local customers every day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit-business"
              className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              List My Business Free
            </Link>
            <Link
              href="#pricing"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              View Premium Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
