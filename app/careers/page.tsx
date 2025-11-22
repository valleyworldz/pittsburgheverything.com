"use client"

import { useState } from 'react'
import { Users, Heart, Target, Briefcase, MapPin, Clock, DollarSign, Send } from 'lucide-react'

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [applicationStatus, setApplicationStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const jobOpenings = [
    {
      id: 'frontend-developer',
      title: 'Frontend Developer',
      type: 'Full-time',
      location: 'Pittsburgh, PA (Hybrid)',
      salary: '$70,000 - $90,000',
      description: 'Build beautiful, responsive web applications using React, Next.js, and modern frontend technologies.',
      requirements: [
        '3+ years React experience',
        'Next.js proficiency',
        'TypeScript knowledge',
        'UI/UX design sensibility'
      ],
      benefits: [
        'Health insurance',
        '401(k) matching',
        'Flexible work hours',
        'Professional development budget'
      ]
    },
    {
      id: 'backend-engineer',
      title: 'Backend Engineer',
      type: 'Full-time',
      location: 'Pittsburgh, PA (Remote-first)',
      salary: '$80,000 - $100,000',
      description: 'Design and implement scalable APIs and data processing systems for our local business platform.',
      requirements: [
        '4+ years backend development',
        'Node.js or Python expertise',
        'Database design experience',
        'API development skills'
      ],
      benefits: [
        'Comprehensive health coverage',
        'Stock options',
        'Unlimited PTO',
        'Home office stipend'
      ]
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      type: 'Full-time',
      location: 'Pittsburgh, PA (On-site)',
      salary: '$90,000 - $110,000',
      description: 'Lead product strategy and development for features that connect Pittsburgh businesses with customers.',
      requirements: [
        '5+ years product management',
        'Data-driven decision making',
        'Local business experience preferred',
        'Strong communication skills'
      ],
      benefits: [
        'Competitive salary',
        'Performance bonuses',
        'Team outing budget',
        'Professional certification support'
      ]
    },
    {
      id: 'marketing-specialist',
      title: 'Digital Marketing Specialist',
      type: 'Full-time',
      location: 'Pittsburgh, PA (Hybrid)',
      salary: '$55,000 - $70,000',
      description: 'Grow our platform through digital marketing campaigns, SEO, and community engagement.',
      requirements: [
        '2+ years digital marketing',
        'SEO/SEM experience',
        'Social media expertise',
        'Analytics proficiency'
      ],
      benefits: [
        'Health and dental',
        'Professional development',
        'Flexible schedule',
        'Creative work environment'
      ]
    }
  ]

  const handleApply = async (jobId: string) => {
    setApplicationStatus('submitting')

    try {
      // Simulate application submission
      await new Promise(resolve => setTimeout(resolve, 2000))

      const job = jobOpenings.find(j => j.id === jobId)
      alert(`Application submitted for ${job?.title}!\n\nWe'll review your application and get back to you within 5 business days.`)

      setApplicationStatus('success')
      setTimeout(() => setApplicationStatus('idle'), 3000)
    } catch (error) {
      setApplicationStatus('error')
      setTimeout(() => setApplicationStatus('idle'), 3000)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-pittsburgh-gold via-yellow-400 to-orange-400 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Briefcase className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Careers</h1>
          </div>
          <p className="text-xl opacity-90">
            Join our mission to connect Pittsburgh with everything it has to offer.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-pittsburgh-black mb-4">Why Work With Us?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We're building Pittsburgh's digital future. Join a passionate team dedicated to showcasing the Steel City.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="w-12 h-12 text-pittsburgh-gold mx-auto mb-4" />
              <h3 className="font-bold text-pittsburgh-black mb-2">Collaborative Culture</h3>
              <p className="text-gray-600">Work with a diverse team of Pittsburgh natives and tech enthusiasts.</p>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 text-pittsburgh-gold mx-auto mb-4" />
              <h3 className="font-bold text-pittsburgh-black mb-2">Community Impact</h3>
              <p className="text-gray-600">Make a real difference in supporting local businesses and community.</p>
            </div>
            <div className="text-center">
              <Target className="w-12 h-12 text-pittsburgh-gold mx-auto mb-4" />
              <h3 className="font-bold text-pittsburgh-black mb-2">Growth Opportunities</h3>
              <p className="text-gray-600">Learn cutting-edge technologies while working on meaningful projects.</p>
            </div>
          </div>

          {/* Open Positions */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-8 text-center">Open Positions</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {jobOpenings.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-pittsburgh-black mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{job.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-pittsburgh-black mb-2">Requirements:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-pittsburgh-gold rounded-full"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-pittsburgh-black mb-2">Benefits:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {job.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleApply(job.id)}
                      disabled={applicationStatus === 'submitting'}
                      className="w-full bg-pittsburgh-gold text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {applicationStatus === 'submitting' ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          Applying...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Apply Now
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Status */}
          {applicationStatus === 'success' && (
            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <div className="text-green-800 font-medium">Application submitted successfully!</div>
              <div className="text-green-600 text-sm mt-1">We'll review your application and get back to you soon.</div>
            </div>
          )}

          {applicationStatus === 'error' && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
              <div className="text-red-800 font-medium">Application submission failed</div>
              <div className="text-red-600 text-sm mt-1">Please try again or contact us directly.</div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Don't See Your Perfect Role?</h2>
            <p className="text-xl mb-6 opacity-90">
              We're always growing our team. Send us your resume and let us know how you can contribute to Pittsburgh's digital future.
            </p>
            <button className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
              Send General Application
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
