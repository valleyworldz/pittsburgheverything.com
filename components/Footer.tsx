import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react'
import { siteConfig } from '@/config/site'

const footerSections = [
  {
    title: 'Explore Pittsburgh',
    links: [
      { href: '/events', label: 'Events' },
      { href: '/restaurants', label: 'Restaurants' },
      { href: '/neighborhoods', label: 'Neighborhoods' },
      { href: '/services', label: 'Local Services' },
      { href: '/deals', label: 'Deals & Offers' },
      { href: '/things-to-do', label: 'Things to Do' },
      { href: '/top-100', label: 'Top 100 Places' },
    ],
  },
  {
    title: 'For Businesses',
    links: [
      { href: '/submit-business', label: 'Submit Your Business' },
      { href: '/advertise', label: 'Advertise with Us' },
      { href: '/dashboard', label: 'Business Dashboard' },
      { href: '/analytics', label: 'Business Analytics' },
      { href: '/reviews', label: 'Manage Reviews' },
      { href: '/integrations', label: 'API Integrations' },
    ],
  },
  {
    title: 'Community',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' },
      { href: '/blog', label: 'Blog' },
      { href: '/newsletter', label: 'Newsletter' },
      { href: '/careers', label: 'Careers' },
      { href: '/press', label: 'Press' },
      { href: '/help', label: 'Help Center' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
    { href: '/cookies', label: 'Cookie Policy' },
    { href: '/accessibility', label: 'Accessibility' },
    { href: '/sitemap', label: 'Sitemap' },
    ],
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="bg-gray-900 text-white border-t border-gray-800"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <div className="text-2xl font-black">
                <span className="text-pittsburgh-gold">Pittsburgh</span>
                <span className="text-white">Everything</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Your complete guide to Pittsburgh. Discover the best restaurants, events,
              deals, and everything the Steel City has to offer. Real-time updates powered by local APIs.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              {[
                { icon: Facebook, href: siteConfig.social.facebook, label: 'Facebook' },
                { icon: Twitter, href: siteConfig.social.twitter, label: 'Twitter' },
                { icon: Instagram, href: siteConfig.social.instagram, label: 'Instagram' },
                { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-gray-400 hover:text-pittsburgh-gold transition-colors p-2 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label={`Follow us on ${label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-pittsburgh-gold" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-pittsburgh-gold transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-pittsburgh-gold" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="hover:text-pittsburgh-gold transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-pittsburgh-gold mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-pittsburgh-gold transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-1 py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-400 flex items-center space-x-1">
              <span>© {currentYear} PittsburghEverything.</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" aria-hidden="true" />
              <span>in Pittsburgh, PA.</span>
            </div>

            {/* Additional Links */}
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-pittsburgh-gold transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-pittsburgh-gold transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-pittsburgh-gold transition-colors"
              >
                Cookies
              </Link>
              <Link
                href="/accessibility"
                className="text-gray-400 hover:text-pittsburgh-gold transition-colors"
              >
                Accessibility
              </Link>
            </div>

            {/* Performance & Status */}
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>All Systems Operational</span>
              </div>
              <span>•</span>
              <span>Real-time data active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: siteConfig.name,
            url: siteConfig.url,
            logo: `${siteConfig.url}/images/og-image.svg`,
            description: siteConfig.description,
            address: {
              '@type': 'PostalAddress',
              streetAddress: siteConfig.contact.address,
              addressLocality: 'Pittsburgh',
              addressRegion: 'PA',
              postalCode: '15201',
              addressCountry: 'US',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: siteConfig.contact.phone,
              contactType: 'customer service',
              email: siteConfig.contact.email,
            },
            sameAs: [
              siteConfig.social.facebook,
              siteConfig.social.twitter,
              siteConfig.social.instagram,
              siteConfig.social.linkedin,
            ],
          }),
        }}
      />
    </footer>
  )
}
