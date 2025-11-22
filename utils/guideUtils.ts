import type { Guide } from '@/data/pittsburghGuides'

export function filterGuides(
  guides: Guide[],
  filters: {
    searchQuery?: string
    category?: string
    tag?: string
    featuredOnly?: boolean
    verifiedOnly?: boolean
  }
): Guide[] {
  let filtered = [...guides]

  // Search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    filtered = filtered.filter(guide =>
      guide.title.toLowerCase().includes(query) ||
      guide.excerpt.toLowerCase().includes(query) ||
      guide.description.toLowerCase().includes(query) ||
      guide.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Category filter
  if (filters.category && filters.category !== 'All Categories') {
    filtered = filtered.filter(guide =>
      guide.category.toLowerCase() === filters.category!.toLowerCase()
    )
  }

  // Tag filter
  if (filters.tag && filters.tag !== 'All Tags') {
    filtered = filtered.filter(guide =>
      guide.tags.some(tag => tag.toLowerCase() === filters.tag!.toLowerCase())
    )
  }

  // Featured only filter
  if (filters.featuredOnly) {
    filtered = filtered.filter(guide => guide.featured)
  }

  // Verified only filter
  if (filters.verifiedOnly) {
    filtered = filtered.filter(guide => guide.verified)
  }

  return filtered
}

export function sortGuides(guides: Guide[], sortBy: string): Guide[] {
  const sorted = [...guides]

  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
    case 'oldest':
      return sorted.sort((a, b) => 
        new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      )
    case 'updated':
      return sorted.sort((a, b) => 
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      )
    case 'reading-time-asc':
      return sorted.sort((a, b) => a.readingTime - b.readingTime)
    case 'reading-time-desc':
      return sorted.sort((a, b) => b.readingTime - a.readingTime)
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title))
    case 'featured':
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return 0
      })
    default:
      return sorted.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
  }
}

