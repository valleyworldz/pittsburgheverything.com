import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, Phone, Mail, Globe, MapPin, Award, Users } from 'lucide-react'
import { getAllAgents, getAgentsByNeighborhood } from '@/data/pittsburghHousing'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Pittsburgh Real Estate Agents | Top Realtors Directory | PittsburghEverything',
  description: 'Find the best real estate agents in Pittsburgh. Browse top-rated realtors by neighborhood, specialty, and experience. Connect with trusted professionals.',
  keywords: 'Pittsburgh real estate agents, Pittsburgh realtors, real estate agents, home buying, home selling, Pittsburgh',
  openGraph: {
    title: 'Pittsburgh Real Estate Agents Directory',
    description: 'Find trusted real estate agents in Pittsburgh for buying or selling your home.',
    images: [
      {
        url: '/images/housing/real-estate-agents.jpg',
        width: 1200,
        height: 630,
        alt: 'Pittsburgh real estate agents'
      }
    ]
  }
}

export default function RealEstateAgentsPage() {
  const allAgents = getAllAgents()
  const neighborhoods = Array.from(new Set(allAgents.flatMap(agent => agent.neighborhoods))).sort()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Pittsburgh Real Estate Agents",
    "description": "Directory of top real estate agents in Pittsburgh",
    "itemListElement": allAgents.map((agent, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "RealEstateAgent",
        "name": agent.name,
        "worksFor": {
          "@type": "RealEstateAgent",
          "name": agent.company
        },
        "telephone": agent.contact.phone,
        "email": agent.contact.email,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": agent.rating,
          "reviewCount": agent.reviewCount
        }
      }
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Pittsburgh Real Estate Agents
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Connect with trusted, experienced real estate professionals in Pittsburgh. Find the perfect agent for your needs.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{allAgents.length}+</div>
                <div className="text-sm opacity-75">Top Agents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{neighborhoods.length}+</div>
                <div className="text-sm opacity-75">Neighborhoods</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">4.8+</div>
                <div className="text-sm opacity-75">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">10+</div>
                <div className="text-sm opacity-75">Years Exp</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agents List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {allAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function AgentCard({ agent }: { agent: any }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-20 h-20 bg-pittsburgh-gold rounded-full flex items-center justify-center text-pittsburgh-black font-bold text-xl">
          {agent.name.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-pittsburgh-black mb-1">{agent.name}</h3>
          <p className="text-pittsburgh-gold font-semibold mb-2">{agent.company}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(agent.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {agent.rating} ({agent.reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{agent.bio}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-sm text-gray-600 mb-1">Experience</div>
          <div className="font-semibold">{agent.yearsExperience} years</div>
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">License</div>
          <div className="font-semibold text-sm">{agent.license}</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2 flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          Neighborhoods
        </div>
        <div className="flex flex-wrap gap-2">
          {agent.neighborhoods.map((neighborhood: string, idx: number) => (
            <span key={idx} className="text-xs bg-pittsburgh-gold/20 text-pittsburgh-black px-2 py-1 rounded">
              {neighborhood}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2 flex items-center gap-1">
          <Award className="w-4 h-4" />
          Specialties
        </div>
        <div className="flex flex-wrap gap-2">
          {agent.specialties.map((specialty: string, idx: number) => (
            <span key={idx} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
              {specialty}
            </span>
          ))}
        </div>
      </div>

      {agent.certifications.length > 0 && (
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">Certifications</div>
          <div className="flex flex-wrap gap-2">
            {agent.certifications.map((cert: string, idx: number) => (
              <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {cert}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4 border-t space-y-2">
        <a
          href={`tel:${agent.contact.phone}`}
          className="flex items-center gap-2 text-pittsburgh-gold hover:underline"
        >
          <Phone className="w-4 h-4" />
          {agent.contact.phone}
        </a>
        <a
          href={`mailto:${agent.contact.email}`}
          className="flex items-center gap-2 text-pittsburgh-gold hover:underline"
        >
          <Mail className="w-4 h-4" />
          {agent.contact.email}
        </a>
        {agent.contact.website && (
          <a
            href={agent.contact.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-pittsburgh-gold hover:underline"
          >
            <Globe className="w-4 h-4" />
            Visit Website
          </a>
        )}
      </div>
    </div>
  )
}

