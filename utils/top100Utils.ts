import type { Top100Item } from '@/data/pittsburghTop100'

export function filterTop100(
  items: Top100Item[],
  filters: {
    searchQuery?: string
    category?: string
    neighborhood?: string
    priceRange?: string
    minRating?: number
    verifiedOnly?: boolean
    trendingOnly?: boolean
  }
): Top100Item[] {
  let filtered = [...items]

  // Search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.location.neighborhood.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      (item.subcategory && item.subcategory.toLowerCase().includes(query))
    )
  }

  // Category filter
  if (filters.category && filters.category !== 'All Categories') {
    filtered = filtered.filter(item =>
      item.category.toLowerCase() === filters.category!.toLowerCase()
    )
  }

  // Neighborhood filter
  if (filters.neighborhood && filters.neighborhood !== 'All Locations') {
    filtered = filtered.filter(item =>
      item.location.neighborhood.toLowerCase() === filters.neighborhood!.toLowerCase()
    )
  }

  // Price range filter
  if (filters.priceRange && filters.priceRange !== 'All Prices') {
    filtered = filtered.filter(item =>
      item.priceRange === filters.priceRange
    )
  }

  // Min rating filter
  if (filters.minRating && filters.minRating > 0) {
    filtered = filtered.filter(item => item.rating >= filters.minRating!)
  }

  // Verified only filter
  if (filters.verifiedOnly) {
    filtered = filtered.filter(item => item.verified)
  }

  // Trending only filter
  if (filters.trendingOnly) {
    filtered = filtered.filter(item => item.trending)
  }

  return filtered
}

export function sortTop100(items: Top100Item[], sortBy: string): Top100Item[] {
  const sorted = [...items]

  switch (sortBy) {
    case 'rank-asc':
      return sorted.sort((a, b) => a.rank - b.rank)
    case 'rank-desc':
      return sorted.sort((a, b) => b.rank - a.rank)
    case 'rating-high':
      return sorted.sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating
        return b.reviewCount - a.reviewCount
      })
    case 'rating-low':
      return sorted.sort((a, b) => {
        if (a.rating !== b.rating) return a.rating - b.rating
        return a.reviewCount - b.reviewCount
      })
    case 'reviews-high':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount)
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    case 'trending':
      return sorted.sort((a, b) => {
        if (a.trending && !b.trending) return -1
        if (!a.trending && b.trending) return 1
        return a.rank - b.rank
      })
    default:
      return sorted.sort((a, b) => a.rank - b.rank)
  }
}

