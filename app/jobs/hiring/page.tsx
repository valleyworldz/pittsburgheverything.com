import { Metadata } from 'next'
import { Clock, MapPin, DollarSign, Briefcase, Search } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Hiring Now in Pittsburgh | Urgent Job Openings & Immediate Employment',
  description: 'Urgent job openings in Pittsburgh. Find immediate hiring opportunities from top employers. Apply today for same-day interviews.',
  keywords: 'hiring now Pittsburgh, urgent jobs, immediate employment, job openings, same day hire',
  openGraph: {
    title: 'Hiring Now in Pittsburgh | Urgent Job Openings',
    description: 'Find immediate job opportunities in Pittsburgh. Same-day interviews available from top employers.',
    images: [
      {
        url: '/images/jobs/hiring-now-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Hiring now in Pittsburgh - urgent job openings'
      }
    ]
  }
}

export default function HiringNowPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Hiring Now - Pittsburgh Job Openings",
    "description": "Urgent job openings and immediate hiring opportunities in Pittsburgh.",
    "url": "https://pittsburgheverything.com/jobs/hiring",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const urgentJobs = [
    {
      title: 'Line Cook',
      company: 'The Capital Grille',
      location: 'Downtown Pittsburgh',
      salary: '$18-22/hour',
      type: 'Full-time',
      urgency: 'Interview today',
      posted: '2 hours ago',
      description: 'Immediate opening for experienced line cook. No experience required for entry-level.'
    },
    {
      title: 'Bartender',
      company: 'Fat Head\'s Saloon',
      location: 'Strip District',
      salary: '$15/hour + tips',
      type: 'Part-time',
      urgency: 'Start tomorrow',
      posted: '4 hours ago',
      description: 'Busy craft beer bar needs experienced bartender. TIPS certification preferred.'
    },
    {
      title: 'Delivery Driver',
      company: 'Uber Eats',
      location: 'Pittsburgh Metro',
      salary: '$18-25/hour + tips',
      type: 'Flexible',
      urgency: 'Apply now, start today',
      posted: '1 hour ago',
      description: 'Flexible schedule, great earnings. Use your own vehicle or company car available.'
    },
    {
      title: 'Retail Associate',
      company: 'Giant Eagle',
      location: 'Oakland',
      salary: '$15-17/hour',
      type: 'Part-time',
      urgency: 'Hiring immediately',
      posted: '6 hours ago',
      description: 'Customer service focused retail position. Morning and evening shifts available.'
    },
    {
      title: 'Housekeeper',
      company: 'Hilton Garden Inn',
      location: 'Downtown Pittsburgh',
      salary: '$16-18/hour',
      type: 'Full-time',
      urgency: 'Urgent need',
      posted: '3 hours ago',
      description: 'Hotel housekeeping position. Experience preferred but will train motivated candidates.'
    },
    {
      title: 'Cashier',
      company: 'Sheetz',
      location: 'Multiple locations',
      salary: '$14-16/hour',
      type: 'Part-time',
      urgency: 'Now hiring',
      posted: '5 hours ago',
      description: 'Convenience store cashier. Fast-paced environment with great benefits.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-8 h-8 text-white" />
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-semibold">URGENT</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Hiring Now in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Immediate job openings with same-day interviews available. Start working tomorrow!
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">120+</div>
                <div className="text-sm opacity-75">Open Positions</div>
              </div>
              <div className="text-center">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm opacity-75">Employers</div>
              </div>
              <div className="text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">$15-25</div>
                <div className="text-sm opacity-75">Avg Hourly</div>
              </div>
              <div className="text-center">
                <Search className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">24hrs</div>
                <div className="text-sm opacity-75">Avg Time to Hire</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">⚡ Same-Day Hiring Available</h3>
              <p className="opacity-90">
                Many positions offer immediate interviews and next-day starts. Perfect for those seeking quick employment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Urgent Job Openings
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These employers are actively hiring and need staff immediately. Apply now for fastest response.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {urgentJobs.map((job, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow border-l-4 border-red-500">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {job.urgency}
                      </span>
                      <span className="text-xs text-gray-500">{job.posted}</span>
                    </div>

                    <h3 className="text-xl font-bold text-pittsburgh-black mb-1">{job.title}</h3>
                    <p className="text-gray-600 mb-3">{job.company}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.type}
                      </span>
                    </div>

                    <p className="text-gray-700 text-sm mb-4">{job.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-600">{job.salary}</span>
                  </div>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              How Same-Day Hiring Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get hired quickly with our streamlined process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-pittsburgh-black mb-4">1. Apply Online</h3>
              <p className="text-gray-700">
                Submit your application through our platform. Takes less than 5 minutes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-pittsburgh-black mb-4">2. Same-Day Interview</h3>
              <p className="text-gray-700">
                Many employers offer immediate phone or in-person interviews. No waiting weeks!
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-pittsburgh-black mb-4">3. Start Tomorrow</h3>
              <p className="text-gray-700">
                Qualified candidates can often start their new job the very next day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Hiring */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Industries Actively Hiring
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Diverse opportunities across Pittsburgh's economy
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
              <h3 className="text-lg font-bold text-blue-800 mb-2">Hospitality</h3>
              <p className="text-blue-600 text-sm mb-3">Restaurants, bars, hotels</p>
              <div className="text-2xl font-bold text-blue-800">35%</div>
              <div className="text-xs text-blue-600">of openings</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
              <h3 className="text-lg font-bold text-green-800 mb-2">Retail</h3>
              <p className="text-green-600 text-sm mb-3">Stores, services, sales</p>
              <div className="text-2xl font-bold text-green-800">25%</div>
              <div className="text-xs text-green-600">of openings</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
              <h3 className="text-lg font-bold text-purple-800 mb-2">Transportation</h3>
              <p className="text-purple-600 text-sm mb-3">Delivery, rideshare, logistics</p>
              <div className="text-2xl font-bold text-purple-800">20%</div>
              <div className="text-xs text-purple-600">of openings</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 text-center">
              <h3 className="text-lg font-bold text-orange-800 mb-2">Other</h3>
              <p className="text-orange-600 text-sm mb-3">Healthcare, offices, more</p>
              <div className="text-2xl font-bold text-orange-800">20%</div>
              <div className="text-xs text-orange-600">of openings</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Working?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            These positions won't last long. Apply now and you could be working tomorrow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#job-listings"
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Browse All Openings
            </Link>
            <Link
              href="/jobs/post"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              Post Your Job
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
