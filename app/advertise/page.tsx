import type { Metadata } from 'next'
import { TrendingUp, Users, Target, Star, DollarSign, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Advertise with PittsburghEverything | Reach Pittsburgh Businesses',
  description: 'Promote your business to Pittsburgh locals. Premium listings, featured placements, and targeted advertising to reach the Steel City market.',
  keywords: 'advertise Pittsburgh, business advertising, premium listings, Pittsburgh marketing, local advertising',
  openGraph: {
    title: 'Advertise with PittsburghEverything | Reach Pittsburgh Businesses',
    description: 'Premium advertising opportunities to reach Pittsburgh businesses and consumers.',
    images: [
      {
        url: '/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Advertise with PittsburghEverything',
      },
    ],
  },
}

export default function AdvertisePage() {
  const advertisingOptions = [
    {
      name: 'Basic Listing',
      price: 'Free',
      features: [
        'Business directory listing',
        'Basic contact information',
        'Standard search visibility',
        'Customer reviews section'
      ],
      popular: false,
      cta: 'List Your Business'
    },
    {
      name: 'Premium Listing',
      price: '$49/month',
      features: [
        'Everything in Basic',
        'Enhanced business profile',
        'Photo gallery (up to 10 photos)',
        'Priority search ranking',
        'Featured in category pages',
        'Monthly analytics report'
      ],
      popular: true,
      cta: 'Upgrade to Premium'
    },
    {
      name: 'Featured Business',
      price: '$149/month',
      features: [
        'Everything in Premium',
        'Homepage featured placement',
        'Custom banner advertisement',
        'Social media promotion',
        'Email newsletter feature',
        'Priority customer support',
        'Advanced analytics dashboard'
      ],
      popular: false,
      cta: 'Get Featured'
    },
    {
      name: 'Enterprise Solution',
      price: 'Custom',
      features: [
        'Everything in Featured',
        'Dedicated account manager',
        'Custom integration options',
        'White-label solutions',
        'API access',
        'Custom reporting',
        'Priority feature requests'
      ],
      popular: false,
      cta: 'Contact Sales'
    }
  ]

  const benefits = [
    {
      icon: Users,
      title: 'Targeted Local Audience',
      description: 'Reach Pittsburgh residents actively searching for local businesses and services'
    },
    {
      icon: TrendingUp,
      title: 'Increased Visibility',
      description: 'Appear prominently in local search results and business directories'
    },
    {
      icon: Target,
      title: 'Qualified Leads',
      description: 'Connect with customers who are ready to buy from local businesses'
    },
    {
      icon: Star,
      title: 'Build Trust',
      description: 'Verified reviews and ratings help establish credibility'
    }
  ]

  const stats = [
    { label: 'Traffic Stats', value: 'Powered by Vercel Analytics', description: 'Real-time analytics tracking' },
    { label: 'Business Listings', value: '1000+', description: 'Verified businesses in our directory' },
    { label: 'User Reviews', value: '50K+', description: 'Authentic reviews from locals' },
    { label: 'Pittsburgh Coverage', value: '90 neighborhoods', description: 'Complete city coverage' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold via-yellow-400 to-orange-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Advertise with PittsburghEverything
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Reach Pittsburgh's most engaged local audience. Connect with customers actively searching for your products and services.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>

          <Link
            href="#pricing"
            className="bg-pittsburgh-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-lg"
          >
            View Advertising Options
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Why Advertise with Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join Pittsburgh's most trusted local platform and reach customers who are ready to buy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-pittsburgh-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-pittsburgh-black mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Advertising Options</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect advertising solution for your Pittsburgh business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advertisingOptions.map((option, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-sm border-2 ${
                  option.popular ? 'border-pittsburgh-gold' : 'border-gray-200'
                } overflow-hidden relative`}
              >
                {option.popular && (
                  <div className="bg-pittsburgh-gold text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold text-pittsburgh-black mb-2">{option.name}</h3>
                  <div className="text-3xl font-bold text-pittsburgh-gold mb-6">{option.price}</div>

                  <ul className="space-y-3 mb-8">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={option.cta === 'Contact Sales' ? '/contact' : option.cta === 'List Your Business' ? '/submit-business' : '/contact'}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-center block transition-colors ${
                      option.popular
                        ? 'bg-pittsburgh-gold text-pittsburgh-black hover:bg-yellow-400'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {option.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how Pittsburgh businesses are growing with our advertising platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Since upgrading to Premium, our restaurant has seen a 40% increase in reservations.
                The local targeting is incredible - we're reaching actual Pittsburgh customers."
              </p>
              <div className="font-semibold text-pittsburgh-black">- Maria's Italian Kitchen</div>
              <div className="text-sm text-gray-600">Lawrenceville</div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The Featured Business package transformed our visibility. We're getting calls from
                customers we never would have reached otherwise. Worth every penny!"
              </p>
              <div className="font-semibold text-pittsburgh-black">- Steel City Fitness</div>
              <div className="text-sm text-gray-600">Oakland</div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Being featured on the homepage during the holiday season brought in more customers
                than our biggest sale ever. PittsburghEverything delivers real results."
              </p>
              <div className="font-semibold text-pittsburgh-black">- Shadyside Boutique</div>
              <div className="text-sm text-gray-600">Shadyside</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-pittsburgh-black mb-2">How quickly will I see results?</h3>
              <p className="text-gray-700">Most businesses see increased visibility within 24-48 hours of upgrading. Full results typically appear within 1-2 weeks as our algorithms optimize your placement.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-pittsburgh-black mb-2">Can I change my plan anytime?</h3>
              <p className="text-gray-700">Yes, you can upgrade or downgrade your advertising plan at any time. Changes take effect immediately, and billing adjusts accordingly.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-pittsburgh-black mb-2">Do you offer refunds?</h3>
              <p className="text-gray-700">We offer a 30-day satisfaction guarantee. If you're not happy with your results, we'll refund your payment in full.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-pittsburgh-black mb-2">How do you target local customers?</h3>
              <p className="text-gray-700">Our platform uses advanced geolocation, local search algorithms, and neighborhood-specific targeting to ensure your business reaches relevant Pittsburgh customers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Pittsburgh Business?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join hundreds of successful Pittsburgh businesses already advertising with us.
            Start reaching more local customers today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit-business"
              className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Start Advertising Today
            </Link>
            <Link
              href="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
