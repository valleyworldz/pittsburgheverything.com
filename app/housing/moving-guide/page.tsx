import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Calendar, Truck, FileText, Home, MapPin, DollarSign, Users, Phone, Mail } from 'lucide-react'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Moving to Pittsburgh Guide | Complete Relocation Checklist 2025',
  description: 'Complete guide to moving to Pittsburgh. Checklists, resources, utilities setup, and everything you need to know for a smooth relocation.',
  keywords: 'moving to Pittsburgh, Pittsburgh relocation guide, moving checklist, Pittsburgh utilities, Pittsburgh DMV',
  openGraph: {
    title: 'Complete Moving to Pittsburgh Guide 2025',
    description: 'Everything you need to know about moving to Pittsburgh - checklists, resources, and tips.',
    images: [
      {
        url: '/images/housing/moving-to-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Moving to Pittsburgh guide'
      }
    ]
  }
}

export default function MovingGuidePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Moving to Pittsburgh Guide",
    "description": "Complete step-by-step guide for moving to Pittsburgh",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Research Neighborhoods",
        "text": "Research Pittsburgh neighborhoods to find the best fit for your lifestyle"
      },
      {
        "@type": "HowToStep",
        "name": "Find Housing",
        "text": "Search for apartments or homes in your chosen neighborhood"
      },
      {
        "@type": "HowToStep",
        "name": "Set Up Utilities",
        "text": "Contact utility companies to set up service before moving"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Complete Moving to Pittsburgh Guide
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Everything you need to know for a smooth relocation to Pittsburgh. Checklists, resources, and expert tips.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="#checklist" className="text-center p-4 bg-gray-50 rounded-lg hover:bg-pittsburgh-gold/10 transition-colors">
              <CheckCircle className="w-6 h-6 mx-auto mb-2 text-pittsburgh-gold" />
              <div className="font-semibold">Checklist</div>
            </Link>
            <Link href="#utilities" className="text-center p-4 bg-gray-50 rounded-lg hover:bg-pittsburgh-gold/10 transition-colors">
              <Truck className="w-6 h-6 mx-auto mb-2 text-pittsburgh-gold" />
              <div className="font-semibold">Utilities</div>
            </Link>
            <Link href="#dmv" className="text-center p-4 bg-gray-50 rounded-lg hover:bg-pittsburgh-gold/10 transition-colors">
              <FileText className="w-6 h-6 mx-auto mb-2 text-pittsburgh-gold" />
              <div className="font-semibold">DMV</div>
            </Link>
            <Link href="#resources" className="text-center p-4 bg-gray-50 rounded-lg hover:bg-pittsburgh-gold/10 transition-colors">
              <MapPin className="w-6 h-6 mx-auto mb-2 text-pittsburgh-gold" />
              <div className="font-semibold">Resources</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Moving Checklist */}
      <section id="checklist" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Moving Checklist
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Use this comprehensive checklist to ensure nothing is forgotten
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 2 Months Before */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-pittsburgh-gold" />
                <h3 className="text-xl font-bold text-pittsburgh-black">2 Months Before</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Research Pittsburgh neighborhoods</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Start apartment/house hunting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Get quotes from moving companies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Begin decluttering and packing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Notify current landlord (if renting)</span>
                </li>
              </ul>
            </div>

            {/* 1 Month Before */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-pittsburgh-gold" />
                <h3 className="text-xl font-bold text-pittsburgh-black">1 Month Before</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Book moving company</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Set up utilities (electric, gas, water, internet)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Change address with USPS</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Update address with banks, credit cards</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Transfer medical records</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Register children for school</span>
                </li>
              </ul>
            </div>

            {/* 1 Week Before */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-pittsburgh-gold" />
                <h3 className="text-xl font-bold text-pittsburgh-black">1 Week Before</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Confirm moving date with movers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Pack essentials box</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Clean current residence</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Plan route to new home</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Arrange pet care if needed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Utilities Setup */}
      <section id="utilities" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Setting Up Utilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Contact information and setup guides for all essential utilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UtilityCard
              name="Electricity"
              provider="Duquesne Light"
              phone="(412) 393-7100"
              website="https://www.duquesnelight.com"
              description="Primary electricity provider for Pittsburgh area"
            />
            <UtilityCard
              name="Natural Gas"
              provider="Peoples Natural Gas"
              phone="(412) 227-5100"
              website="https://www.peoples-gas.com"
              description="Natural gas service for heating and cooking"
            />
            <UtilityCard
              name="Water & Sewer"
              provider="Pittsburgh Water & Sewer Authority"
              phone="(412) 255-2423"
              website="https://www.pgh2o.com"
              description="Water and sewer services"
            />
            <UtilityCard
              name="Internet"
              provider="Xfinity / Verizon"
              phone="(800) 934-6489"
              website="https://www.xfinity.com"
              description="High-speed internet and cable TV"
            />
            <UtilityCard
              name="Trash & Recycling"
              provider="City of Pittsburgh"
              phone="(412) 255-2773"
              website="https://pittsburghpa.gov"
              description="Municipal trash and recycling collection"
            />
            <UtilityCard
              name="Phone"
              provider="Various"
              phone="Varies"
              website=""
              description="Landline and mobile phone services"
            />
          </div>
        </div>
      </section>

      {/* DMV & Government */}
      <section id="dmv" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              DMV & Government Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Important government services and registration requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-pittsburgh-black mb-4">Driver's License</h3>
              <p className="text-gray-700 mb-4">
                You must transfer your out-of-state driver's license within 60 days of establishing residency.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Valid out-of-state license</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Proof of residency (lease, utility bill)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Social Security card</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Payment ($30.50 for 4-year license)</span>
                </li>
              </ul>
              <div className="text-sm text-gray-600">
                <strong>Location:</strong> PennDOT Driver License Center<br />
                <strong>Phone:</strong> (412) 442-7000
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-pittsburgh-black mb-4">Vehicle Registration</h3>
              <p className="text-gray-700 mb-4">
                Register your vehicle within 20 days of establishing residency.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Out-of-state title or registration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Proof of insurance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Vehicle inspection (within 10 days)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Payment (varies by vehicle)</span>
                </li>
              </ul>
              <div className="text-sm text-gray-600">
                <strong>Location:</strong> PennDOT Vehicle Registration<br />
                <strong>Phone:</strong> (412) 442-7000
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section id="resources" className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Additional Resources</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Helpful links and resources for your move to Pittsburgh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/neighborhoods" className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
              <MapPin className="w-8 h-8 mb-3 text-pittsburgh-gold" />
              <h3 className="text-xl font-bold mb-2">Neighborhoods</h3>
              <p className="text-white/80">Explore all Pittsburgh neighborhoods</p>
            </Link>
            <Link href="/housing/apartments" className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
              <Home className="w-8 h-8 mb-3 text-pittsburgh-gold" />
              <h3 className="text-xl font-bold mb-2">Find Housing</h3>
              <p className="text-white/80">Search apartments and homes</p>
            </Link>
            <Link href="/housing/cost-of-living" className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
              <DollarSign className="w-8 h-8 mb-3 text-pittsburgh-gold" />
              <h3 className="text-xl font-bold mb-2">Cost of Living</h3>
              <p className="text-white/80">Understand living costs in Pittsburgh</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function UtilityCard({ name, provider, phone, website, description }: {
  name: string
  provider: string
  phone: string
  website: string
  description: string
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-xl font-bold text-pittsburgh-black mb-2">{name}</h3>
      <p className="text-sm font-semibold text-pittsburgh-gold mb-2">{provider}</p>
      <p className="text-gray-700 text-sm mb-4">{description}</p>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4 text-gray-500" />
          <a href={`tel:${phone}`} className="text-pittsburgh-gold hover:underline">{phone}</a>
        </div>
        {website && (
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-gray-500" />
            <a href={website} target="_blank" rel="noopener noreferrer" className="text-pittsburgh-gold hover:underline">
              Visit Website
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

