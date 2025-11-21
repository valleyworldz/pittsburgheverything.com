import type { Metadata } from 'next'
import { Users, Heart, Target, Briefcase } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Careers | PittsburghEverything',
  description: 'Join our team and help build Pittsburgh\'s premier local business platform.',
  keywords: 'careers, jobs, Pittsburgh tech, local platform, team',
}

export default function CareersPage() {
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

          <div className="text-center mt-12">
            <p className="text-gray-600">
              We're always looking for talented individuals who share our passion for Pittsburgh.
              Check back soon for open positions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
