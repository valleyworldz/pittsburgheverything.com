import { Metadata } from 'next'
import { MapPin, Clock, DollarSign, Phone, Globe, Calendar, Utensils, Camera, Info } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'First-Time Visitor Guide to Pittsburgh | Complete Travel Guide',
  description: 'Your complete guide for first-time visitors to Pittsburgh. Everything you need to know about attractions, dining, transportation, and more.',
  keywords: 'Pittsburgh first-time visitor, travel guide, Pittsburgh tourism, visitor information, Pittsburgh attractions',
  openGraph: {
    title: 'First-Time Visitor Guide to Pittsburgh | Complete Travel Guide',
    description: 'Your complete guide for first-time visitors to Pittsburgh.',
    images: [
      {
        url: '/images/visitors/first-time-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'First-time visitor guide to Pittsburgh'
      }
    ]
  }
}

export default function FirstTimeGuidePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "First-Time Visitor Guide to Pittsburgh",
    "description": "Your complete guide for first-time visitors to Pittsburgh.",
    "url": "https://pittsburgheverything.com/visitors/first-time",
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              First-Time Visitor Guide to Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Welcome to Pittsburgh! This comprehensive guide will help you make the most of your first visit to the Steel City.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Getting Around */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-pittsburgh-black">Getting Around</h2>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-pittsburgh-gold font-bold">•</span>
                  <span><strong>Port Authority Transit:</strong> Bus and light rail system covering the entire city. Single ride: $2.75, Day pass: $7.00</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pittsburgh-gold font-bold">•</span>
                  <span><strong>Inclines:</strong> Duquesne and Monongahela inclines offer stunning city views. $2.75 one-way</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pittsburgh-gold font-bold">•</span>
                  <span><strong>Rideshare:</strong> Uber and Lyft are widely available throughout the city</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pittsburgh-gold font-bold">•</span>
                  <span><strong>Parking:</strong> Downtown parking available in garages ($12-20/day) and metered street parking ($1/hour)</span>
                </li>
              </ul>
              <Link
                href="/visitors/parking"
                className="mt-4 inline-block text-pittsburgh-gold font-semibold hover:underline"
              >
                Learn more about parking & transit →
              </Link>
            </div>

            {/* Must-See Attractions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-pittsburgh-black">Must-See Attractions</h2>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-pittsburgh-gold font-bold">•</span>
                  <span><strong>Duquesne Incline:</strong> Historic cable car with panoramic city views</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pittsburgh-gold font-bold">•</span>
                  <span><strong>Phipps Conservatory:</strong> Beautiful botanical gardens and seasonal flower shows</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pittsburgh-gold font-bold">•</span>
                  <span><strong>Carnegie Science Center:</strong> Interactive science museum with planetarium</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pittsburgh-gold font-bold">•</span>
                  <span><strong>Heinz History Center:</strong> Western Pennsylvania's largest history museum</span>
                </li>
              </ul>
              <Link
                href="/things-to-do/must-see"
                className="mt-4 inline-block text-pittsburgh-gold font-semibold hover:underline"
              >
                Explore all attractions →
              </Link>
            </div>
          </div>

          {/* Dining */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Utensils className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-pittsburgh-black">Dining in Pittsburgh</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-pittsburgh-black mb-2">Must-Try Foods</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Primanti Bros Sandwich:</strong> Pittsburgh's iconic sandwich with fries and coleslaw inside</li>
                  <li>• <strong>Pierogies:</strong> Polish dumplings, a local favorite</li>
                  <li>• <strong>Fish Fry:</strong> Traditional Friday fish fry (especially during Lent)</li>
                  <li>• <strong>Chipped Ham:</strong> Thinly sliced ham, a Pittsburgh specialty</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-pittsburgh-black mb-2">Best Neighborhoods for Dining</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Strip District:</strong> Markets, food vendors, and casual dining</li>
                  <li>• <strong>Lawrenceville:</strong> Trendy restaurants and hip food scene</li>
                  <li>• <strong>Shadyside:</strong> Upscale dining and fine restaurants</li>
                  <li>• <strong>Downtown:</strong> Business district with diverse options</li>
                </ul>
              </div>
            </div>
            <Link
              href="/restaurants/top-picks"
              className="mt-4 inline-block text-pittsburgh-gold font-semibold hover:underline"
            >
              Explore all restaurants →
            </Link>
          </div>

          {/* Essential Information */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-pittsburgh-gold" />
                <h3 className="font-bold text-pittsburgh-black">Best Time to Visit</h3>
              </div>
              <p className="text-gray-700 text-sm">
                <strong>Spring (April-June):</strong> Mild weather, blooming gardens, festivals<br/>
                <strong>Summer (July-August):</strong> Warm weather, outdoor activities, major events<br/>
                <strong>Fall (September-November):</strong> Beautiful foliage, comfortable temperatures<br/>
                <strong>Winter (December-March):</strong> Cold but festive, indoor attractions, fewer crowds
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-pittsburgh-gold" />
                <h3 className="font-bold text-pittsburgh-black">Budget Tips</h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Many museums offer free admission days</li>
                <li>• Use public transit for affordable transportation</li>
                <li>• Explore free attractions like parks and markets</li>
                <li>• Look for happy hour specials at restaurants</li>
                <li>• Visit during off-peak seasons for better hotel rates</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-5 h-5 text-pittsburgh-gold" />
                <h3 className="font-bold text-pittsburgh-black">Quick Tips</h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Pittsburgh is very walkable in downtown areas</li>
                <li>• Bring comfortable shoes for hills and walking</li>
                <li>• Tipping: 15-20% at restaurants, $1-2 per drink at bars</li>
                <li>• Weather can change quickly - dress in layers</li>
                <li>• Download the Port Authority app for transit schedules</li>
              </ul>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-pittsburgh-black mb-4">Additional Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-pittsburgh-black mb-3">Helpful Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/visitors/stay" className="text-pittsburgh-gold hover:underline">
                      Where to Stay →
                    </Link>
                  </li>
                  <li>
                    <Link href="/visitors/parking" className="text-pittsburgh-gold hover:underline">
                      Parking & Transit →
                    </Link>
                  </li>
                  <li>
                    <Link href="/things-to-do/must-see" className="text-pittsburgh-gold hover:underline">
                      Must-See Attractions →
                    </Link>
                  </li>
                  <li>
                    <Link href="/restaurants/top-picks" className="text-pittsburgh-gold hover:underline">
                      Top Restaurants →
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-pittsburgh-black mb-3">Emergency Contacts</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Emergency:</strong> 911</li>
                  <li><strong>Non-Emergency Police:</strong> (412) 323-7800</li>
                  <li><strong>Visitor Information:</strong> (412) 281-7711</li>
                  <li><strong>Port Authority Transit:</strong> (412) 442-2000</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

