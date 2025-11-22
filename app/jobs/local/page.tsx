import { Metadata } from 'next'
import { Briefcase, MapPin, DollarSign, Clock, Search, Filter, Building } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Local Jobs in Pittsburgh | Full-Time & Part-Time Employment',
  description: 'Find local jobs in Pittsburgh. Browse full-time and part-time positions from local employers. Career opportunities across all industries.',
  keywords: 'local jobs Pittsburgh, employment, full-time jobs, part-time jobs, career opportunities',
  openGraph: {
    title: 'Local Jobs in Pittsburgh | Employment Opportunities',
    description: 'Browse local job listings in Pittsburgh. Find full-time and part-time positions from trusted employers.',
    images: [
      {
        url: '/images/jobs/local-jobs-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Local jobs in Pittsburgh'
      }
    ]
  }
}

export default function LocalJobsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Local Jobs in Pittsburgh",
    "description": "Find full-time and part-time job opportunities from local Pittsburgh employers.",
    "url": "https://pittsburgheverything.com/jobs/local",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const localJobs = [
    {
      title: 'Software Engineer',
      company: 'Google Pittsburgh',
      location: 'Pittsburgh, PA',
      type: 'Full-time',
      salary: '$120K - $150K',
      posted: '2 days ago',
      description: 'Join our growing Pittsburgh office working on cutting-edge AI and cloud technologies.',
      tags: ['Technology', 'Full-time', 'Benefits']
    },
    {
      title: 'Restaurant Server',
      company: 'The Capital Grille',
      location: 'Downtown Pittsburgh',
      type: 'Part-time',
      salary: '$15/hour + tips',
      posted: '1 day ago',
      description: 'Fine dining experience serving premium steaks and seafood. Flexible evening shifts.',
      tags: ['Hospitality', 'Part-time', 'Tips']
    },
    {
      title: 'Marketing Coordinator',
      company: 'Pittsburgh Steelers',
      location: 'Heinz Field',
      type: 'Full-time',
      salary: '$50K - $65K',
      posted: '1 week ago',
      description: 'Support marketing initiatives for Pittsburgh\'s beloved football team. Game day experience required.',
      tags: ['Marketing', 'Sports', 'Full-time']
    },
    {
      title: 'Registered Nurse',
      company: 'UPMC',
      location: 'Oakland',
      type: 'Full-time',
      salary: '$65K - $85K',
      posted: '3 days ago',
      description: 'Join the region\'s leading healthcare provider. Competitive salary and comprehensive benefits.',
      tags: ['Healthcare', 'Nursing', 'Benefits']
    },
    {
      title: 'Barista',
      company: 'Crazy Mocha',
      location: 'Multiple locations',
      type: 'Part-time',
      salary: '$15 - $18/hour',
      posted: '5 days ago',
      description: 'Local coffee roasting company seeking passionate coffee lovers. Morning shifts available.',
      tags: ['Hospitality', 'Coffee', 'Part-time']
    },
    {
      title: 'Financial Advisor',
      company: 'PNC Bank',
      location: 'Downtown Pittsburgh',
      type: 'Full-time',
      salary: '$60K - $100K + commission',
      posted: '1 week ago',
      description: 'Build relationships with clients and provide comprehensive financial planning services.',
      tags: ['Finance', 'Commission', 'Full-time']
    },
    {
      title: 'Teacher',
      company: 'Pittsburgh Public Schools',
      location: 'Various locations',
      type: 'Full-time',
      salary: '$45K - $75K',
      posted: '2 weeks ago',
      description: 'Shape young minds in Pennsylvania\'s largest school district. Multiple grade levels available.',
      tags: ['Education', 'Teaching', 'Benefits']
    },
    {
      title: 'Customer Service Representative',
      company: 'Giant Eagle',
      location: 'Regional stores',
      type: 'Part-time',
      salary: '$14 - $16/hour',
      posted: '4 days ago',
      description: 'Provide excellent customer service at Pennsylvania\'s favorite grocery chain.',
      tags: ['Retail', 'Customer Service', 'Part-time']
    },
    {
      title: 'Project Manager',
      company: 'Duquesne University',
      location: 'Oakland',
      type: 'Full-time',
      salary: '$55K - $70K',
      posted: '1 week ago',
      description: 'Manage construction and renovation projects at a leading Catholic university.',
      tags: ['Construction', 'Management', 'Full-time']
    }
  ]

  const industries = [
    { name: 'Technology', count: 45, color: 'blue' },
    { name: 'Healthcare', count: 38, color: 'green' },
    { name: 'Hospitality', count: 52, color: 'purple' },
    { name: 'Education', count: 29, color: 'orange' },
    { name: 'Finance', count: 24, color: 'red' },
    { name: 'Retail', count: 31, color: 'teal' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Local Jobs in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Find meaningful work with Pittsburgh employers. From entry-level to executive positions across all industries.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">350+</div>
                <div className="text-sm opacity-75">Active Listings</div>
              </div>
              <div className="text-center">
                <Building className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm opacity-75">Local Employers</div>
              </div>
              <div className="text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">$65K</div>
                <div className="text-sm opacity-75">Avg Salary</div>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">7 days</div>
                <div className="text-sm opacity-75">Avg Response</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/jobs/hiring"
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Clock className="w-5 h-5" />
                Urgent Hiring
              </Link>
              <Link
                href="/jobs/post"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors inline-flex items-center justify-center gap-2"
              >
                <Briefcase className="w-5 h-5" />
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs by title, company, or keyword..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold">
                <option>All Types</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
              </select>
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold">
                <option>All Locations</option>
                <option>Downtown</option>
                <option>Oakland</option>
                <option>Shadyside</option>
                <option>Squirrel Hill</option>
              </select>
              <button className="bg-pittsburgh-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-pittsburgh-black mb-4">Browse by Industry</h3>
                <div className="space-y-3">
                  {industries.map((industry) => (
                    <div key={industry.name} className="flex items-center justify-between">
                      <span className="text-gray-700">{industry.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        industry.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                        industry.color === 'green' ? 'bg-green-100 text-green-800' :
                        industry.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                        industry.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                        industry.color === 'red' ? 'bg-red-100 text-red-800' :
                        'bg-teal-100 text-teal-800'
                      }`}>
                        {industry.count}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-semibold text-pittsburgh-black mb-3">Salary Ranges</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-pittsburgh-gold focus:ring-pittsburgh-gold" />
                      <span className="ml-2 text-sm text-gray-700">$30K - $50K</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-pittsburgh-gold focus:ring-pittsburgh-gold" />
                      <span className="ml-2 text-sm text-gray-700">$50K - $75K</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-pittsburgh-gold focus:ring-pittsburgh-gold" />
                      <span className="ml-2 text-sm text-gray-700">$75K - $100K</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-pittsburgh-gold focus:ring-pittsburgh-gold" />
                      <span className="ml-2 text-sm text-gray-700">$100K+</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {localJobs.map((job, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            job.type === 'Full-time' ? 'bg-blue-100 text-blue-800' :
                            job.type === 'Part-time' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {job.type}
                          </span>
                          <span className="text-xs text-gray-500">{job.posted}</span>
                        </div>

                        <h3 className="text-xl font-bold text-pittsburgh-black mb-1">{job.title}</h3>
                        <p className="text-gray-600 mb-2">{job.company}</p>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </span>
                        </div>

                        <p className="text-gray-700 mb-3">{job.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {job.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                      <button className="bg-pittsburgh-gold text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">1</button>
                  <button className="px-3 py-2 bg-pittsburgh-gold text-white border border-pittsburgh-gold rounded-lg">2</button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                  <span className="px-2 py-2 text-gray-500">...</span>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">12</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find the Right Job?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Employers are actively looking for talent. Post your job opening and connect with qualified candidates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/jobs/post"
              className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Post a Job Opening
            </Link>
            <Link
              href="/jobs/hiring"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              View Urgent Openings
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
