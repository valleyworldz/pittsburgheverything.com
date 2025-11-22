import { Metadata } from 'next'
import { Briefcase, MapPin, DollarSign, Clock, Search } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import { getAllJobs, getUrgentJobs, getAllCompanies } from '@/data/pittsburghJobs'
import JobCard from '@/components/jobs/JobCard'

export const metadata: Metadata = {
  title: 'Jobs in Pittsburgh | Local Employment & Career Opportunities',
  description: 'Find local jobs in Pittsburgh. Browse hiring now listings, local jobs, gigs, and career opportunities across all industries.',
  keywords: 'Pittsburgh jobs, local employment, hiring, careers, gigs, job opportunities',
  openGraph: {
    title: 'Jobs in Pittsburgh | Local Employment',
    description: 'Find your next career opportunity in Pittsburgh. Browse local jobs, gigs, and employment listings.',
    images: [
      {
        url: '/images/jobs/pittsburgh-jobs.jpg',
        width: 1200,
        height: 630,
        alt: 'Pittsburgh job opportunities'
      }
    ]
  }
}

export default function JobsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pittsburgh Jobs & Employment",
    "description": "Find local jobs, gigs, and career opportunities in Pittsburgh.",
    "url": "https://pittsburgheverything.com/jobs",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const allJobs = getAllJobs()
  const urgentJobs = getUrgentJobs()
  const companies = getAllCompanies()
  
  const totalJobs = allJobs.length
  const totalCompanies = companies.length
  const avgSalary = Math.round(
    allJobs
      .filter(job => job.salary?.annual)
      .reduce((sum, job) => sum + (job.salary?.min || 0), 0) / 
    allJobs.filter(job => job.salary?.annual).length
  ) || 65000

  const featuredJobs = allJobs
    .filter(job => !job.urgent)
    .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
    .slice(0, 4)

  const jobCategories = [
    {
      title: 'Hiring Now',
      href: '/jobs/hiring',
      description: 'Urgent job openings and immediate hiring opportunities',
      icon: Clock,
      count: `${urgentJobs.length}+`,
      color: 'green'
    },
    {
      title: 'Local Jobs',
      href: '/jobs/local',
      description: 'Full-time and part-time positions in Pittsburgh',
      icon: Briefcase,
      count: `${allJobs.filter(j => j.type === 'full-time' || j.type === 'part-time').length}+`,
      color: 'blue'
    },
    {
      title: 'Gigs',
      href: '/jobs/gigs',
      description: 'Freelance work, side hustles, and temporary opportunities',
      icon: DollarSign,
      count: `${allJobs.filter(j => j.type === 'freelance' || j.type === 'contract' || j.type === 'temporary').length}+`,
      color: 'purple'
    },
    {
      title: 'Post a Job',
      href: '/jobs/post',
      description: 'Employers can post job openings for free',
      icon: Search,
      count: 'Free',
      color: 'orange'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Jobs in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Find your next career opportunity in Pittsburgh. From entry-level to executive positions across all industries.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">{totalJobs}+</div>
                <div className="text-sm opacity-75">Active Jobs</div>
              </div>
              <div className="text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">{totalCompanies}+</div>
                <div className="text-sm opacity-75">Companies</div>
              </div>
              <div className="text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">${Math.round(avgSalary / 1000)}K</div>
                <div className="text-sm opacity-75">Avg Salary</div>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">24hrs</div>
                <div className="text-sm opacity-75">Avg Time to Hire</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/jobs/hiring"
                className="bg-white text-pittsburgh-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Clock className="w-5 h-5" />
                View Hiring Now
              </Link>
              <Link
                href="/jobs/post"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors inline-flex items-center justify-center gap-2"
              >
                <Briefcase className="w-5 h-5" />
                Post a Job Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Explore Job Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect job for your skills and career goals in Pittsburgh's growing economy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {jobCategories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className="group bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:bg-white"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    category.color === 'green' ? 'bg-green-100' :
                    category.color === 'blue' ? 'bg-blue-100' :
                    category.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      category.color === 'green' ? 'text-green-600' :
                      category.color === 'blue' ? 'text-blue-600' :
                      category.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                    }`} />
                  </div>

                  <h3 className="text-xl font-bold text-pittsburgh-black mb-2 group-hover:text-pittsburgh-gold transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pittsburgh-gold">{category.count}</span>
                    <span className="text-sm text-gray-500 group-hover:text-pittsburgh-gold transition-colors">
                      View →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Featured Job Listings
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hot opportunities from top Pittsburgh employers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/jobs/local"
              className="bg-pittsburgh-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors inline-flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              View All Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Job Stats & Insights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Pittsburgh Job Market Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding Pittsburgh's employment landscape
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-blue-800 mb-2">Technology</h3>
              <p className="text-blue-600 mb-4">Highest paying sector with 25% above national average</p>
              <div className="text-3xl font-bold text-blue-800">$85K</div>
              <div className="text-sm text-blue-600">Average salary</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-green-800 mb-2">Healthcare</h3>
              <p className="text-green-600 mb-4">Stable industry with excellent benefits</p>
              <div className="text-3xl font-bold text-green-800">$65K</div>
              <div className="text-sm text-green-600">Average salary</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-purple-800 mb-2">Education</h3>
              <p className="text-purple-600 mb-4">Growing opportunities in higher education</p>
              <div className="text-3xl font-bold text-purple-800">$55K</div>
              <div className="text-sm text-purple-600">Average salary</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Job?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join hundreds of Pittsburgh professionals who found their dream job through our platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/jobs/hiring"
              className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Browse Job Openings
            </Link>
            <Link
              href="/jobs/post"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              Post a Job Opening
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
