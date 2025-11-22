// Utility functions for event filtering and sorting

import type { Event } from '@/data/pittsburghEvents'
import type { FilterState } from '@/components/events/EventFilters'

export function filterEvents(events: Event[], filters: FilterState): Event[] {
  let filtered = [...events]

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(event =>
      event.title.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower) ||
      event.location.name.toLowerCase().includes(searchLower) ||
      event.venue.name.toLowerCase().includes(searchLower) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }

  // Category filter
  if (filters.category.length > 0) {
    filtered = filtered.filter(event =>
      filters.category.includes(event.category) ||
      (event.subcategory && filters.category.includes(event.subcategory))
    )
  }

  // Neighborhood filter
  if (filters.neighborhood.length > 0) {
    filtered = filtered.filter(event =>
      filters.neighborhood.includes(event.location.neighborhood)
    )
  }

  // Date range filter
  if (filters.dateRange !== 'all') {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    filtered = filtered.filter(event => {
      const eventDate = new Date(event.startDate)
      eventDate.setHours(0, 0, 0, 0)

      switch (filters.dateRange) {
        case 'today':
          return eventDate.getTime() === today.getTime()
        case 'tomorrow':
          const tomorrow = new Date(today)
          tomorrow.setDate(tomorrow.getDate() + 1)
          return eventDate.getTime() === tomorrow.getTime()
        case 'weekend':
          const dayOfWeek = now.getDay()
          const daysUntilFriday = (5 - dayOfWeek + 7) % 7
          const friday = new Date(today)
          friday.setDate(today.getDate() + daysUntilFriday)
          const sunday = new Date(friday)
          sunday.setDate(friday.getDate() + 2)
          return eventDate >= friday && eventDate <= sunday
        case 'week':
          const weekEnd = new Date(today)
          weekEnd.setDate(today.getDate() + 7)
          return eventDate >= today && eventDate <= weekEnd
        case 'month':
          const monthEnd = new Date(today)
          monthEnd.setMonth(today.getMonth() + 1)
          return eventDate >= today && eventDate <= monthEnd
        default:
          return true
      }
    })
  }

  // Price range filter
  if (filters.priceRange.length > 0) {
    filtered = filtered.filter(event => {
      if (filters.priceRange.includes('free') && event.price.isFree) {
        return true
      }
      if (filters.priceRange.includes('under-25') && !event.price.isFree && event.price.min < 25) {
        return true
      }
      if (filters.priceRange.includes('25-50') && !event.price.isFree && event.price.min >= 25 && event.price.min < 50) {
        return true
      }
      if (filters.priceRange.includes('50+') && !event.price.isFree && event.price.min >= 50) {
        return true
      }
      return false
    })
  }

  // Features filter
  if (filters.features.length > 0) {
    filtered = filtered.filter(event => {
      const eventFeatures = event.features.map(f => f.toLowerCase())
      const eventTags = event.tags.map(t => t.toLowerCase())
      return filters.features.some(filterFeature => {
        const filterLower = filterFeature.toLowerCase()
        return eventFeatures.some(f => f.includes(filterLower)) ||
               eventTags.some(t => t.includes(filterLower)) ||
               (filterLower === 'free' && event.price.isFree) ||
               (filterLower === 'family-friendly' && (event.category === 'Family' || event.tags.includes('family')))
      })
    })
  }

  // Age restriction filter
  if (filters.ageRestriction.length > 0) {
    filtered = filtered.filter(event => {
      if (!event.ageRestriction) {
        return filters.ageRestriction.includes('All Ages') || filters.ageRestriction.includes('Family-Friendly')
      }
      return filters.ageRestriction.some(age => {
        if (age === 'All Ages') return !event.ageRestriction || event.ageRestriction === 'All Ages'
        if (age === 'Family-Friendly') return !event.ageRestriction || event.ageRestriction.includes('All')
        return event.ageRestriction ? event.ageRestriction.includes(age) : false
      })
    })
  }

  return filtered
}

export function sortEvents(events: Event[], sortBy: string): Event[] {
  const sorted = [...events]

  switch (sortBy) {
    case 'date-asc':
      return sorted.sort((a, b) => {
        const dateA = new Date(`${a.startDate}T${a.startTime}`).getTime()
        const dateB = new Date(`${b.startDate}T${b.startTime}`).getTime()
        return dateA - dateB
      })
    
    case 'date-desc':
      return sorted.sort((a, b) => {
        const dateA = new Date(`${a.startDate}T${a.startTime}`).getTime()
        const dateB = new Date(`${b.startDate}T${b.startTime}`).getTime()
        return dateB - dateA
      })
    
    case 'price-asc':
      return sorted.sort((a, b) => {
        if (a.price.isFree && !b.price.isFree) return -1
        if (!a.price.isFree && b.price.isFree) return 1
        return a.price.min - b.price.min
      })
    
    case 'price-desc':
      return sorted.sort((a, b) => {
        if (a.price.isFree && !b.price.isFree) return -1
        if (!a.price.isFree && b.price.isFree) return 1
        return (b.price.max || b.price.min) - (a.price.max || a.price.min)
      })
    
    case 'name-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    
    case 'name-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title))
    
    default:
      return sorted
  }
}

export function isEventHappeningNow(event: Event): boolean {
  const now = new Date()
  const start = new Date(`${event.startDate}T${event.startTime}`)
  const end = event.endTime 
    ? new Date(`${event.startDate}T${event.endTime}`)
    : new Date(start.getTime() + 2 * 60 * 60 * 1000) // Default 2 hours if no end time
  
  return now >= start && now <= end
}

export function isEventUpcoming(event: Event): boolean {
  const now = new Date()
  const start = new Date(`${event.startDate}T${event.startTime}`)
  return start > now
}

export function getTimeUntilEvent(event: Event): string {
  const now = new Date()
  const eventDate = new Date(`${event.startDate}T${event.startTime}`)
  const diff = eventDate.getTime() - now.getTime()

  if (diff < 0) {
    return 'Happening Now'
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''}`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`
  } else {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`
  }
}

