import type { Metadata } from 'next'
import { Mail, Bell, Calendar, Gift } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Newsletter | PittsburghEverything',
  description: 'Subscribe to our Pittsburgh newsletter for weekly updates on local events, deals, and business news.',
  keywords: 'newsletter, Pittsburgh updates, local events, deals, business news',
}

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-pittsburgh-gold via-yellow-400 to-orange-400 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Mail className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Pittsburgh Newsletter</h1>
          </div>
          <p className="text-xl opacity-90">
            Stay updated with the best of Pittsburgh delivered to your inbox.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Bell className="w-16 h-16 text-pittsburgh-gold mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-pittsburgh-black mb-4">Weekly Pittsburgh Digest</h2>
          <p className="text-gray-600 mb-8">
            Get curated updates on local events, exclusive deals, business news, and community highlights every week.
          </p>

          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">What You'll Receive:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-pittsburgh-gold mt-1" />
                <div>
                  <div className="font-medium">Weekly Events Calendar</div>
                  <div className="text-sm text-gray-600">Never miss important local happenings</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Gift className="w-5 h-5 text-pittsburgh-gold mt-1" />
                <div>
                  <div className="font-medium">Exclusive Deals</div>
                  <div className="text-sm text-gray-600">Special offers from local businesses</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
