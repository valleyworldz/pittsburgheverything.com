'use client'

import { useState, useEffect } from 'react'
import { Search, Star, MapPin, Phone, Globe } from 'lucide-react'
import Link from 'next/link'
import type { Business } from '@/types'

interface ServiceDirectoryProps {
  category?: string
  limit?: number
}

const serviceCategories = [
  'All Services',
  'Healthcare',
  'Legal',
  'Financial',
  'Home Services',
  'Auto Services',
  'Beauty & Wellness',
  'Education',
  'Real Estate',
  'Pet Services',
  'Professional Services'
]

export default function ServiceDirectory({ category, limit }: ServiceDirectoryProps) {
  const [services, setServices] = useState<Business[]>([])
  const [filteredServices, setFilteredServices] = useState<Business[]>([])
  const [selectedCategory, setSelectedCategory] = useState(category || 'All Services')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch services from API
    // For now, using mock data
    const mockServices: Business[] = [
      {
        id: '1',
        name: 'Pittsburgh Family Dentistry',
        description: 'Comprehensive dental care for the whole family',
        category: 'Healthcare',
        address: '123 Main St, Pittsburgh, PA 15201',
        phone: '(412) 555-0123',
        email: 'info@pghfamilydentistry.com',
        website: 'https://pghfamilydentistry.com',
        neighborhood: 'Downtown',
        rating: 4.8,
        features: ['Emergency Care', 'Insurance Accepted', 'Weekend Hours']
      },
      {
        id: '2',
        name: 'Smith & Associates Law',
        description: 'Experienced attorneys serving Pittsburgh for 25+ years',
        category: 'Legal',
        address: '456 Liberty Ave, Pittsburgh, PA 15222',
        phone: '(412) 555-0456',
        email: 'contact@smithlaw.com',
        website: 'https://smithlaw.com',
        neighborhood: 'Downtown',
        rating: 4.9,
        features: ['Free Consultation', 'Estate Planning', 'Business Law']
      },
      {
        id: '3',
        name: 'Pittsburgh Plumbing Co.',
        description: '24/7 emergency plumbing services',
        category: 'Home Services',
        address: '789 Fifth Ave, Pittsburgh, PA 15219',
        phone: '(412) 555-0789',
        email: 'service@pghplumbing.com',
        neighborhood: 'Strip District',
        rating: 4.6,
        features: ['24/7 Service', 'Licensed & Insured', 'Free Estimates']
      },
      {
        id: '4',
        name: 'Steel City Bank',
        description: 'Community banking with personal service',
        category: 'Financial',
        address: '321 Market St, Pittsburgh, PA 15203',
        phone: '(412) 555-0321',
        website: 'https://steelcitybank.com',
        neighborhood: 'South Side',
        rating: 4.4,
        features: ['Online Banking', 'Mortgages', 'Business Accounts']
      }
    ]

    setServices(mockServices)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = services

    // Filter by category
    if (selectedCategory !== 'All Services') {
      filtered = filtered.filter(service => service.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredServices(filtered)
  }, [services, selectedCategory, searchQuery])

  const displayServices = limit ? filteredServices.slice(0, limit) : filteredServices

  const renderStars = (rating?: number) => {
    if (!rating) return null

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'text-pittsburgh-gold fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-steel-gray">({rating})</span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-6"></div>
          <div className="h-12 bg-gray-200 rounded mb-6"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
              <div className="bg-gray-200 rounded h-4 mb-2"></div>
              <div className="bg-gray-200 rounded h-4 w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Category Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-steel-gray mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-primary"
            >
              {serviceCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-steel-gray mb-2">
              Search Services
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, description, or category..."
                className="input-primary pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-steel-gray" />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {displayServices.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-steel-gray mb-2">No services found</h3>
          <p className="text-steel-gray">Try adjusting your search or category filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayServices.map((service) => (
            <div key={service.id} className="card group cursor-pointer hover:scale-105 transition-transform">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-pittsburgh-gold transition-colors">
                      {service.name}
                    </h3>
                    <span className="bg-pittsburgh-gold/10 text-pittsburgh-gold px-3 py-1 rounded-full text-sm font-semibold">
                      {service.category}
                    </span>
                  </div>
                  {service.rating && renderStars(service.rating)}
                </div>

                <p className="text-steel-gray mb-4 line-clamp-2">
                  {service.description}
                </p>

                <div className="space-y-2 text-sm text-steel-gray mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{service.address} • {service.neighborhood}</span>
                  </div>

                  {service.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>{service.phone}</span>
                    </div>
                  )}
                </div>

                {service.features && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="bg-gray-100 text-steel-gray px-2 py-1 rounded-full text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {service.website && (
                      <a
                        href={service.website}
                        className="text-pittsburgh-gold hover:text-pittsburgh-black transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        // Show service details modal or navigate to service page
                        alert(`Service Details:\n\n${service.name}\n${service.description}\n\nCategory: ${service.category}\nAddress: ${service.address}\nPhone: ${service.phone || 'Not provided'}\nWebsite: ${service.website || 'Not provided'}\n\nFeatures: ${service.features?.join(', ') || 'None listed'}`)
                      }}
                      className="text-pittsburgh-gold hover:text-pittsburgh-black font-medium transition-colors text-sm cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        // Contact service - open phone or email
                        if (service.phone) {
                          window.location.href = `tel:${service.phone}`
                        } else if (service.email) {
                          window.location.href = `mailto:${service.email}?subject=Inquiry about ${service.name}`
                        } else {
                          alert(`Contact Information for ${service.name}:\n\nPhone: ${service.phone || 'Not provided'}\nEmail: ${service.email || 'Not provided'}\nAddress: ${service.address}`)
                        }
                      }}
                      className="btn-outline text-sm px-4 py-2 cursor-pointer"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {limit && filteredServices.length > limit && (
        <div className="text-center">
          <Link
            href={`/services?category=${selectedCategory}&search=${encodeURIComponent(searchQuery)}`}
            className="btn-secondary"
          >
            View All Services ({filteredServices.length})
          </Link>
        </div>
      )}
    </div>
  )
}
