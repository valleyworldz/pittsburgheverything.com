import type { Metadata } from 'next'
import { Newspaper, Download, Mail, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Press & Media | PittsburghEverything',
  description: 'Press releases, media resources, and contact information for PittsburghEverything.',
  keywords: 'press releases, media kit, press contact, Pittsburgh news',
}

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-pittsburgh-gold via-yellow-400 to-orange-400 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Newspaper className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Press & Media</h1>
          </div>
          <p className="text-xl opacity-90">
            Resources and information for journalists covering PittsburghEverything.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-pittsburgh-black mb-6">Press Kit</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Download className="w-5 h-5 text-pittsburgh-gold" />
                  <div>
                    <div className="font-medium">Company Overview</div>
                    <div className="text-sm text-gray-600">PDF • 2.3 MB</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Download className="w-5 h-5 text-pittsburgh-gold" />
                  <div>
                    <div className="font-medium">Logo Assets</div>
                    <div className="text-sm text-gray-600">ZIP • 15 MB</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Download className="w-5 h-5 text-pittsburgh-gold" />
                  <div>
                    <div className="font-medium">High-Resolution Images</div>
                    <div className="text-sm text-gray-600">ZIP • 45 MB</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-pittsburgh-black mb-6">Press Contact</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-pittsburgh-gold mt-1" />
                  <div>
                    <div className="font-medium">Press Inquiries</div>
                    <div className="text-gray-600">press@pittsburgheverything.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-pittsburgh-gold mt-1" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-gray-600">+1 (412) 555-PRESS</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-pittsburgh-black mb-2">About PittsburghEverything</h3>
                <p className="text-gray-600 text-sm">
                  PittsburghEverything is Pittsburgh's premier local business directory and community platform,
                  connecting residents and visitors with the best restaurants, events, businesses, and experiences in the Steel City.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
