import type { Deal } from '@/data/pittsburghDeals'

export function filterDeals(
  deals: Deal[],
  filters: {
    searchQuery?: string
    category?: string
    neighborhood?: string
    day?: string
    activeOnly?: boolean
    verifiedOnly?: boolean
    dealType?: string
  }
): Deal[] {
  let filtered = [...deals]

  // Search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    filtered = filtered.filter(deal =>
      deal.title.toLowerCase().includes(query) ||
      deal.business.name.toLowerCase().includes(query) ||
      deal.description.toLowerCase().includes(query) ||
      deal.business.location.neighborhood.toLowerCase().includes(query) ||
      deal.category.toLowerCase().includes(query)
    )
  }

  // Category filter
  if (filters.category && filters.category !== 'All Categories') {
    filtered = filtered.filter(deal =>
      deal.category.toLowerCase() === filters.category!.toLowerCase()
    )
  }

  // Neighborhood filter
  if (filters.neighborhood && filters.neighborhood !== 'All Locations') {
    filtered = filtered.filter(deal =>
      deal.business.location.neighborhood.toLowerCase() === filters.neighborhood!.toLowerCase()
    )
  }

  // Day filter
  if (filters.day && filters.day !== 'All Days') {
    filtered = filtered.filter(deal => {
      if (!deal.daysOfWeek || deal.daysOfWeek.length === 0) return false
      return deal.daysOfWeek.includes(filters.day!)
    })
  }

  // Active only filter
  if (filters.activeOnly) {
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]
    const todayDay = today.toLocaleDateString('en-US', { weekday: 'long' })
    
    filtered = filtered.filter(deal => {
      const isDateValid = deal.validFrom <= todayStr && deal.validUntil >= todayStr
      const isDayValid = !deal.daysOfWeek || deal.daysOfWeek.length === 0 || deal.daysOfWeek.includes(todayDay)
      
      if (deal.timeRange) {
        const now = new Date()
        const currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
        // Simple time comparison (could be enhanced)
        return isDateValid && isDayValid
      }
      
      return isDateValid && isDayValid
    })
  }

  // Verified only filter
  if (filters.verifiedOnly) {
    filtered = filtered.filter(deal => deal.verified)
  }

  // Deal type filter
  if (filters.dealType) {
    filtered = filtered.filter(deal => deal.dealType === filters.dealType)
  }

  return filtered
}

export function sortDeals(deals: Deal[], sortBy: string): Deal[] {
  const sorted = [...deals]

  switch (sortBy) {
    case 'savings-high':
      return sorted.sort((a, b) => (b.savings || 0) - (a.savings || 0))
    case 'savings-low':
      return sorted.sort((a, b) => (a.savings || 0) - (b.savings || 0))
    case 'expiring-soon':
      return sorted.sort((a, b) => 
        new Date(a.validUntil).getTime() - new Date(b.validUntil).getTime()
      )
    case 'newest':
      return sorted.sort((a, b) => 
        new Date(b.validFrom).getTime() - new Date(a.validFrom).getTime()
      )
    case 'rating-high':
      return sorted.sort((a, b) => 
        (b.business.rating || 0) - (a.business.rating || 0)
      )
    case 'name-asc':
      return sorted.sort((a, b) => a.business.name.localeCompare(b.business.name))
    case 'name-desc':
      return sorted.sort((a, b) => b.business.name.localeCompare(a.business.name))
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

export function getCurrentDay(): string {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' })
}

export function isDealActive(deal: Deal): boolean {
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]
  const todayDay = today.toLocaleDateString('en-US', { weekday: 'long' })
  
  const isDateValid = deal.validFrom <= todayStr && deal.validUntil >= todayStr
  const isDayValid = !deal.daysOfWeek || deal.daysOfWeek.length === 0 || deal.daysOfWeek.includes(todayDay)
  
  if (deal.timeRange) {
    // Could enhance with actual time comparison
    return isDateValid && isDayValid
  }
  
  return isDateValid && isDayValid
}

