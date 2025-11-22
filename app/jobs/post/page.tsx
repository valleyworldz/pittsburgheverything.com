import { Metadata } from 'next'
import { Briefcase, DollarSign, MapPin, Clock, Users, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Post a Job in Pittsburgh | Free Job Listings & Hiring',
  description: 'Post your job opening for free in Pittsburgh. Reach qualified candidates through PittsburghEverything. Easy posting, fast hiring.',
  keywords: 'post job Pittsburgh, free job posting, hire employees, job listings, recruiting',
  openGraph: {
    title: 'Post a Job in Pittsburgh | Free & Easy',
    description: 'Post your job opening and find qualified candidates in Pittsburgh. Free posting with fast results.',
    images: [
      {
        url: '/images/jobs/post-job-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Post a job in Pittsburgh'
      }
    ]
  }
}

export default function PostJobPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Post a Job in Pittsburgh",
    "description": "Post job openings for free and reach qualified candidates in Pittsburgh.",
    "url": "https://pittsburgheverything.com/jobs/post",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  const benefits = [
    {
      icon: DollarSign,
      title: 'Free Posting',
      description: 'Post unlimited jobs at no cost'
    },
    {
      icon: Users,
      title: 'Quality Candidates',
      description: 'Reach pre-qualified local applicants'
    },
    {
      icon: Clock,
      title: 'Fast Results',
      description: 'Most jobs get first applications within 24 hours'
    },
    {
      icon: CheckCircle,
      title: 'Easy Process',
      description: 'Simple form takes less than 5 minutes'
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
              Post a Job in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Find qualified candidates quickly. Post your job opening for free and reach Pittsburgh's best talent.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm opacity-75">Posting</div>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">Fast</div>
                <div className="text-sm opacity-75">Hiring</div>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">24hrs</div>
                <div className="text-sm opacity-75">Response</div>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">Easy</div>
                <div className="text-sm opacity-75">Process</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">🚀 Start Hiring Today</h3>
              <p className="opacity-90">
                Post your job and start receiving applications within hours. No hidden fees, no contracts.
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
              Why Post With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get better candidates faster with our Pittsburgh-focused job platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-pittsburgh-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-pittsburgh-black mb-4">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Job Posting Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Post Your Job Opening
            </h2>
            <p className="text-xl text-gray-600">
              Takes less than 5 minutes. Start receiving applications today.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <form className="space-y-6">
              {/* Job Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-pittsburgh-black mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="e.g. Restaurant Server, Software Engineer"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-pittsburgh-black mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  placeholder="Your company or organization name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-pittsburgh-black mb-2">
                  Location *
                </label>
                <select
                  id="location"
                  name="location"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                >
                  <option value="">Select a location</option>
                  <option value="downtown">Downtown Pittsburgh</option>
                  <option value="oakland">Oakland</option>
                  <option value="shadyside">Shadyside</option>
                  <option value="squirrel-hill">Squirrel Hill</option>
                  <option value="lawrenceville">Lawrenceville</option>
                  <option value="south-side">South Side</option>
                  <option value="strip-district">Strip District</option>
                  <option value="multiple">Multiple Locations</option>
                  <option value="remote">Remote</option>
                </select>
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-semibold text-pittsburgh-black mb-2">
                  Job Type *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Full-time', 'Part-time', 'Contract', 'Freelance'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value={type.toLowerCase()}
                        required
                        className="text-pittsburgh-gold focus:ring-pittsburgh-gold"
                      />
                      <span className="ml-2 text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="salaryMin" className="block text-sm font-semibold text-pittsburgh-black mb-2">
                    Minimum Salary
                  </label>
                  <input
                    type="text"
                    id="salaryMin"
                    name="salaryMin"
                    placeholder="e.g. $15/hour or $45,000/year"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="salaryMax" className="block text-sm font-semibold text-pittsburgh-black mb-2">
                    Maximum Salary (Optional)
                  </label>
                  <input
                    type="text"
                    id="salaryMax"
                    name="salaryMax"
                    placeholder="e.g. $25/hour or $65,000/year"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-pittsburgh-black mb-2">
                  Job Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={6}
                  placeholder="Describe the role, responsibilities, requirements, and what makes your company a great place to work..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent resize-none"
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-semibold text-pittsburgh-black mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-semibold text-pittsburgh-black mb-2">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    required
                    placeholder="your.email@company.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                  />
                </div>
              </div>

              {/* Optional Phone */}
              <div>
                <label htmlFor="contactPhone" className="block text-sm font-semibold text-pittsburgh-black mb-2">
                  Contact Phone (Optional)
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  placeholder="(412) 555-0123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
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
                  confirm this job posting is legitimate and complies with all applicable laws.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-pittsburgh-gold text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:ring-offset-2"
                >
                  Post Job for Free
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
              <h3 className="text-lg font-bold text-pittsburgh-black mb-2">How long does my job posting stay active?</h3>
              <p className="text-gray-700">Job postings remain active for 30 days. You can edit or repost your job anytime.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-pittsburgh-black mb-2">Do I get notified when someone applies?</h3>
              <p className="text-gray-700">Yes! You'll receive email notifications for each application with the candidate's contact information.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-pittsburgh-black mb-2">Can I edit my job posting after publishing?</h3>
              <p className="text-gray-700">Absolutely. You can edit job details, update salary, or change the description at any time.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-pittsburgh-black mb-2">What if I hire someone through your platform?</h3>
              <p className="text-gray-700">Congratulations! We just ask that you let us know so we can help celebrate your success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Posting?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our team is here to help you find the perfect candidate for your Pittsburgh business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/jobs"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              Browse All Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
