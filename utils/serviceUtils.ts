import type { ServiceBusiness } from '@/data/pittsburghServices'

export function filterServices(
  services: ServiceBusiness[],
  filters: {
    searchQuery?: string
    subcategory?: string
    neighborhood?: string
    priceRange?: string
    verifiedOnly?: boolean
    emergencyOnly?: boolean
  }
): ServiceBusiness[] {
  let filtered = [...services]

  // Search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    filtered = filtered.filter(service =>
      service.name.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.location.neighborhood.toLowerCase().includes(query) ||
      service.services.some(s => s.toLowerCase().includes(query)) ||
      service.specialties.some(s => s.toLowerCase().includes(query))
    )
  }

  // Subcategory filter
  if (filters.subcategory && filters.subcategory !== 'All Categories') {
    filtered = filtered.filter(service =>
      service.subcategory.toLowerCase() === filters.subcategory!.toLowerCase()
    )
  }

  // Neighborhood filter
  if (filters.neighborhood && filters.neighborhood !== 'All Locations') {
    filtered = filtered.filter(service =>
      service.location.neighborhood.toLowerCase() === filters.neighborhood!.toLowerCase()
    )
  }

  // Price range filter
  if (filters.priceRange && filters.priceRange !== 'All Prices') {
    const priceMap: Record<string, string> = {
      'Budget Friendly ($)': '$',
      'Moderate ($$)': '$$',
      'Premium ($$$)': '$$$',
      'Luxury ($$$$)': '$$$$'
    }
    const priceValue = priceMap[filters.priceRange] || filters.priceRange
    filtered = filtered.filter(service => service.priceRange === priceValue)
  }

  // Verified only filter
  if (filters.verifiedOnly) {
    filtered = filtered.filter(service => service.verified)
  }

  // Emergency only filter
  if (filters.emergencyOnly) {
    filtered = filtered.filter(service => service.emergencyService)
  }

  return filtered
}

export function sortServices(services: ServiceBusiness[], sortBy: string): ServiceBusiness[] {
  const sorted = [...services]

  switch (sortBy) {
    case 'rating-high':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'rating-low':
      return sorted.sort((a, b) => a.rating - b.rating)
    case 'reviews-high':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount)
    case 'reviews-low':
      return sorted.sort((a, b) => a.reviewCount - b.reviewCount)
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    case 'featured':
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return 0
      })
    default:
      return sorted
  }
}

