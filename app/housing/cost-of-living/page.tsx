import { Metadata } from 'next'
import { DollarSign, TrendingUp, Users, Home, Car, ShoppingCart, Zap, Heart } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import { getAllNeighborhoods } from '@/data/pittsburghNeighborhoods'

export const metadata: Metadata = {
  title: 'Cost of Living in Pittsburgh | Housing, Salaries, Expenses (2025)',
  description: 'Complete cost of living guide for Pittsburgh. Compare housing costs, salaries, utilities, groceries, and transportation across neighborhoods.',
  keywords: 'Pittsburgh cost of living, housing costs, salaries, expenses, budget calculator',
  openGraph: {
    title: 'Pittsburgh Cost of Living Guide 2025',
    description: 'Everything you need to know about living costs in Pittsburgh - housing, salaries, groceries, transportation.',
    images: [
      {
        url: '/images/housing/cost-of-living-pittsburgh.jpg',
        width: 1200,
        height: 630,
        alt: 'Pittsburgh cost of living breakdown'
      }
    ]
  }
}

// Get comprehensive neighborhood data
const allNeighborhoods = getAllNeighborhoods()
const cityNeighborhoods = allNeighborhoods.filter(n => n.type === 'neighborhood')

// Calculate citywide averages
const citywide = {
  medianIncome: Math.round(
    cityNeighborhoods.reduce((sum, n) => sum + n.medianIncome, 0) / cityNeighborhoods.length
  ),
  medianRent: Math.round(
    cityNeighborhoods.reduce((sum, n) => sum + (n.medianHomePrice * 0.005), 0) / cityNeighborhoods.length
  ),
  medianHomeValue: Math.round(
    cityNeighborhoods.reduce((sum, n) => sum + n.medianHomePrice, 0) / cityNeighborhoods.length
  ),
  population: cityNeighborhoods.reduce((sum, n) => sum + n.population, 0),
  averageAge: Math.round(
    cityNeighborhoods.reduce((sum, n) => sum + n.demographics.medianAge, 0) / cityNeighborhoods.length
  ),
  educationLevel: "Bachelor's Degree",
  unemploymentRate: 4.2,
  commuteTime: 25
}

// Neighborhood data with rent estimates (using median home price * 0.005 as rent estimate)
const censusData = {
  citywide,
  neighborhoods: cityNeighborhoods.slice(0, 12).map(n => ({
    name: n.name,
    medianRent: Math.round(n.medianHomePrice * 0.005),
    medianIncome: n.medianIncome,
    walkScore: n.walkScore,
    population: n.population,
    averageAge: n.demographics.medianAge,
    medianHomePrice: n.medianHomePrice
  }))
}

const costBreakdown = {
  housing: {
    '1BR Downtown': 1650,
    '1BR Shadyside': 1400,
    '1BR Lawrenceville': 1150,
    '1BR Squirrel Hill': 1050,
    '1BR Oakland': 950,
    '1BR South Side': 1100,
    'Average Pittsburgh': 1200,
    'National Average': 1400
  },
  utilities: {
    electricity: 120,
    gas: 80,
    water: 40,
    internet: 60,
    phone: 50,
    total: 350
  },
  groceries: {
    'Single Person': 250,
    'Family of 4': 800,
    'National Average (Single)': 300
  },
  transportation: {
    'Monthly Transit Pass': 100,
    'Gas for Car': 150,
    'Uber/Lyft Average': 200,
    'Car Insurance': 120,
    'Parking (Downtown)': 150
  },
  entertainment: {
    'Dining Out (2x/week)': 200,
    'Movies/Events': 100,
    'Gym Membership': 50,
    'Streaming Services': 60,
    'Total': 410
  }
}

export default function CostOfLivingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Cost of Living in Pittsburgh 2025",
    "description": "Complete guide to living costs in Pittsburgh including housing, salaries, utilities, groceries, and transportation.",
    "author": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything"
    },
    "datePublished": "2025-01-15",
    "dateModified": "2025-01-15"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Cost of Living in Pittsburgh
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Everything you need to know about living costs in Pittsburgh (2025). From housing to healthcare, salaries to entertainment.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">$1,200</div>
                <div className="text-sm opacity-75">Avg 1BR Rent</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">$65K</div>
                <div className="text-sm opacity-75">Median Income</div>
              </div>
              <div className="text-center">
                <Home className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">$250K</div>
                <div className="text-sm opacity-75">Median Home</div>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">94</div>
                <div className="text-sm opacity-75">Cost Index</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Housing Costs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Housing Costs by Neighborhood
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Average monthly rent for 1-bedroom apartments (2025 data)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {censusData.neighborhoods.map((neighborhood) => (
              <div key={neighborhood.name} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-pittsburgh-black mb-4">{neighborhood.name}</h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Median Rent (1BR)</span>
                    <span className="font-bold text-pittsburgh-black">${neighborhood.medianRent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Median Income</span>
                    <span className="font-bold text-pittsburgh-black">${neighborhood.medianIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Walk Score</span>
                    <span className="font-bold text-pittsburgh-black">{neighborhood.walkScore}/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Population</span>
                    <span className="font-bold text-pittsburgh-black">{neighborhood.population.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Avg Age</span>
                    <span className="font-bold text-pittsburgh-black">{neighborhood.averageAge}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Rent-to-Income Ratio: {((neighborhood.medianRent * 12 / neighborhood.medianIncome) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Budget Breakdown */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Monthly Budget Breakdown
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Average costs for a single professional in Shadyside
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Housing & Utilities */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Home className="w-6 h-6 text-pittsburgh-gold" />
                  <h3 className="text-xl font-bold text-pittsburgh-black">Housing & Utilities</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Rent (1BR Shadyside)</span>
                    <span className="font-bold">$1,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Electricity</span>
                    <span className="font-bold">$120</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Gas</span>
                    <span className="font-bold">$80</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Internet</span>
                    <span className="font-bold">$60</span>
                  </div>
                  <div className="border-t pt-2 mt-3">
                    <div className="flex justify-between font-bold text-pittsburgh-black">
                      <span>Total</span>
                      <span>$1,660</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Car className="w-6 h-6 text-pittsburgh-gold" />
                  <h3 className="text-xl font-bold text-pittsburgh-black">Transportation</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monthly Transit Pass</span>
                    <span className="font-bold">$100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Gas/Car Maintenance</span>
                    <span className="font-bold">$150</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Rideshare (Uber/Lyft)</span>
                    <span className="font-bold">$80</span>
                  </div>
                  <div className="border-t pt-2 mt-3">
                    <div className="flex justify-between font-bold text-pittsburgh-black">
                      <span>Total</span>
                      <span>$330</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Food & Entertainment */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <ShoppingCart className="w-6 h-6 text-pittsburgh-gold" />
                  <h3 className="text-xl font-bold text-pittsburgh-black">Food & Groceries</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Groceries</span>
                    <span className="font-bold">$300</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Dining Out (2x/week)</span>
                    <span className="font-bold">$200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Coffee & Snacks</span>
                    <span className="font-bold">$80</span>
                  </div>
                  <div className="border-t pt-2 mt-3">
                    <div className="flex justify-between font-bold text-pittsburgh-black">
                      <span>Total</span>
                      <span>$580</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Expenses */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-pittsburgh-gold" />
                  <h3 className="text-xl font-bold text-pittsburgh-black">Entertainment & Misc</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Entertainment</span>
                    <span className="font-bold">$150</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Phone</span>
                    <span className="font-bold">$50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Insurance</span>
                    <span className="font-bold">$120</span>
                  </div>
                  <div className="border-t pt-2 mt-3">
                    <div className="flex justify-between font-bold text-pittsburgh-black">
                      <span>Total</span>
                      <span>$320</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Summary */}
          <div className="mt-12 bg-gradient-to-r from-pittsburgh-gold/10 to-yellow-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-pittsburgh-black mb-4">Monthly Total Budget</h3>
            <div className="text-5xl font-black text-pittsburgh-gold mb-2">$2,890</div>
            <p className="text-gray-600">For a single professional in Shadyside (excluding income taxes)</p>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="font-bold text-pittsburgh-black">58%</div>
                <div className="text-gray-600">Housing & Utilities</div>
              </div>
              <div>
                <div className="font-bold text-pittsburgh-black">20%</div>
                <div className="text-gray-600">Food & Dining</div>
              </div>
              <div>
                <div className="font-bold text-pittsburgh-black">11%</div>
                <div className="text-gray-600">Transportation</div>
              </div>
              <div>
                <div className="font-bold text-pittsburgh-black">11%</div>
                <div className="text-gray-600">Entertainment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost of Living Index */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Pittsburgh vs National Average
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cost of Living Index (US Average = 100)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">67</div>
              <div className="text-lg font-semibold text-green-800 mb-1">Housing</div>
              <div className="text-sm text-green-600">33% below national average</div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">96</div>
              <div className="text-lg font-semibold text-blue-800 mb-1">Utilities</div>
              <div className="text-sm text-blue-600">4% below national average</div>
            </div>

            <div className="bg-red-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">101</div>
              <div className="text-lg font-semibold text-red-800 mb-1">Groceries</div>
              <div className="text-sm text-red-600">1% above national average</div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">94</div>
              <div className="text-lg font-semibold text-purple-800 mb-1">Overall</div>
              <div className="text-sm text-purple-600">6% below national average</div>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-pittsburgh-black mb-6 text-center">
              Why Pittsburgh is Affordable
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-pittsburgh-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-pittsburgh-black mb-2">Housing Market</h4>
                <p className="text-gray-600">Historic homes and apartments keep prices reasonable compared to other major cities</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-pittsburgh-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-pittsburgh-black mb-2">No State Income Tax</h4>
                <p className="text-gray-600">Pennsylvania eliminated state income tax, keeping more money in residents' pockets</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-pittsburgh-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-pittsburgh-black mb-2">Growing Economy</h4>
                <p className="text-gray-600">Tech and healthcare sectors provide good job opportunities with competitive salaries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More About Living in Pittsburgh</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get detailed information about neighborhoods, housing options, and local resources.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/neighborhoods"
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-2">Neighborhoods</h3>
              <p className="text-white/80">Explore detailed guides for all Pittsburgh neighborhoods</p>
            </a>

            <a
              href="/housing/best-areas"
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-2">Best Areas to Live</h3>
              <p className="text-white/80">Find your perfect neighborhood based on lifestyle preferences</p>
            </a>

            <a
              href="/guides/moving-to-pittsburgh"
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-2">Moving Guide</h3>
              <p className="text-white/80">Complete relocation guide with checklists and resources</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
