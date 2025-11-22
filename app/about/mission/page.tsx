import { Metadata } from 'next'
import { Target, Heart, Users, Globe, Award, TrendingUp, MapPin, Star } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Our Mission | PittsburghEverything | Connecting Pittsburgh',
  description: 'Learn about PittsburghEverything\'s mission to connect Pittsburgh residents, businesses, and visitors with the best of the Steel City. Discover our values, goals, and commitment to the community.',
  keywords: 'PittsburghEverything mission, Pittsburgh community, local business support, Steel City guide, Pittsburgh values',
  openGraph: {
    title: 'Our Mission | PittsburghEverything',
    description: 'Connecting Pittsburgh residents, businesses, and visitors with the best of the Steel City.',
    type: 'website'
  }
}

export default function MissionPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Our Mission - PittsburghEverything",
    "description": "PittsburghEverything's mission to connect Pittsburgh with the best local businesses, events, and experiences.",
    "url": "https://pittsburgheverything.com/about/mission"
  }

  const missionStatement = {
    title: "Our Mission",
    content: "To be Pittsburgh's most comprehensive and trusted resource for local information, connecting residents, businesses, and visitors with everything the Steel City has to offer. We're building a platform that celebrates Pittsburgh's unique neighborhoods, supports local businesses, and helps everyone discover the best of our city."
  }

  const vision = {
    title: "Our Vision",
    content: "We envision a Pittsburgh where every resident and visitor has easy access to accurate, up-to-date information about local businesses, events, and experiences. A city where local businesses thrive through increased visibility, and where community connections are strengthened through shared knowledge and discovery."
  }

  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "Everything we do is designed to strengthen the Pittsburgh community. We prioritize local businesses, support neighborhood initiatives, and celebrate what makes Pittsburgh unique.",
      color: "text-red-600"
    },
    {
      icon: Target,
      title: "Accuracy & Trust",
      description: "We verify every business listing, update information in real-time, and ensure our users can trust the information they find on our platform.",
      color: "text-blue-600"
    },
    {
      icon: Users,
      title: "Inclusivity",
      description: "Pittsburgh is a city of diverse neighborhoods and communities. We're committed to representing all of Pittsburgh, from Downtown to the suburbs, ensuring everyone feels welcome.",
      color: "text-green-600"
    },
    {
      icon: Globe,
      title: "Innovation",
      description: "We leverage the latest technology and data sources to provide real-time information, personalized recommendations, and the best possible user experience.",
      color: "text-purple-600"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in everything we do - from the quality of our content to the user experience. Good enough isn't good enough for Pittsburgh.",
      color: "text-yellow-600"
    },
    {
      icon: TrendingUp,
      title: "Growth",
      description: "We're committed to continuous improvement, listening to our community, and evolving our platform to better serve Pittsburgh's needs.",
      color: "text-orange-600"
    }
  ]

  const goals = [
    {
      year: "2025",
      objectives: [
        "Cover all 90+ Pittsburgh neighborhoods with comprehensive listings",
        "Reach 10,000+ verified business listings",
        "Launch community features for local engagement",
        "Integrate real-time event and deal information"
      ]
    },
    {
      year: "Long-term",
      objectives: [
        "Become the #1 resource for Pittsburgh local information",
        "Support 1,000+ local businesses with premium listings",
        "Build a thriving community of 100,000+ active users",
        "Expand to cover surrounding Pittsburgh metro area"
      ]
    }
  ]

  const impact = [
    {
      icon: MapPin,
      metric: "90+",
      label: "Pittsburgh Neighborhoods",
      description: "Complete coverage of all Pittsburgh areas"
    },
    {
      icon: Star,
      metric: "1,000+",
      label: "Verified Businesses",
      description: "Accurate listings with real-time information"
    },
    {
      icon: Users,
      metric: "50,000+",
      label: "User Reviews",
      description: "Authentic feedback from Pittsburgh locals"
    },
    {
      icon: TrendingUp,
      metric: "Growing",
      label: "Daily Active Users",
      description: "Pittsburghers discovering local businesses daily"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold via-yellow-400 to-orange-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Our Mission
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Connecting Pittsburgh with the best local businesses, events, and experiences.
              Building a stronger community, one discovery at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about"
                className="bg-white text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Learn More About Us
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-pittsburgh-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">{missionStatement.title}</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              {missionStatement.content}
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">{vision.title}</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              {vision.content}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do in service of the Pittsburgh community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center`}>
                    <value.icon className={`w-6 h-6 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-pittsburgh-black">{value.title}</h3>
                </div>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Our Goals</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Clear objectives that drive our mission forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {goals.map((goal, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pittsburgh-gold rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-pittsburgh-black">{goal.year} Goals</h3>
                </div>
                <ul className="space-y-3">
                  {goal.objectives.map((objective, objIndex) => (
                    <li key={objIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-pittsburgh-gold rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Measurable results of our commitment to Pittsburgh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impact.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-pittsburgh-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-pittsburgh-black mb-2">{item.metric}</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{item.label}</div>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us in Building a Better Pittsburgh</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Whether you're a business owner, community member, or visitor, you're part of what makes Pittsburgh great.
            Help us connect the Steel City.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit-business"
              className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              List Your Business
            </Link>
            <Link
              href="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              Get In Touch
            </Link>
            <Link
              href="/newsletter"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              Join Our Newsletter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

