import type { JobListing } from '@/data/pittsburghJobs'

export function filterJobs(
  jobs: JobListing[],
  filters: {
    searchQuery?: string
    type?: string
    category?: string
    neighborhood?: string
    experience?: string
    salaryRange?: string
    remoteOnly?: boolean
    urgentOnly?: boolean
  }
): JobListing[] {
  let filtered = [...jobs]

  // Search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    filtered = filtered.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query) ||
      job.location.neighborhood.toLowerCase().includes(query) ||
      job.skills.some(skill => skill.toLowerCase().includes(query))
    )
  }

  // Type filter
  if (filters.type && filters.type !== 'All Types') {
    const typeMap: Record<string, string> = {
      'Full-time': 'full-time',
      'Part-time': 'part-time',
      'Contract': 'contract',
      'Freelance': 'freelance',
      'Temporary': 'temporary'
    }
    const typeValue = typeMap[filters.type] || filters.type.toLowerCase()
    filtered = filtered.filter(job => job.type === typeValue)
  }

  // Category filter
  if (filters.category && filters.category !== 'All Categories') {
    filtered = filtered.filter(job => 
      job.category.toLowerCase() === filters.category!.toLowerCase()
    )
  }

  // Neighborhood filter
  if (filters.neighborhood && filters.neighborhood !== 'All Locations') {
    filtered = filtered.filter(job =>
      job.location.neighborhood.toLowerCase() === filters.neighborhood!.toLowerCase()
    )
  }

  // Experience level filter
  if (filters.experience && filters.experience !== 'All Levels') {
    const experienceMap: Record<string, string> = {
      'Entry': 'entry',
      'Mid': 'mid',
      'Senior': 'senior',
      'Executive': 'executive'
    }
    const experienceValue = experienceMap[filters.experience] || filters.experience.toLowerCase()
    filtered = filtered.filter(job => job.experienceLevel === experienceValue)
  }

  // Salary range filter
  if (filters.salaryRange && filters.salaryRange !== 'All Ranges') {
    filtered = filtered.filter(job => {
      if (!job.salary) return false
      
      const range = filters.salaryRange!
      if (range.includes('Hourly')) {
        if (!job.salary.hourly) return false
        const min = job.salary.min || 0
        if (range.includes('$15-20')) return min >= 15 && min < 20
        if (range.includes('$20-25')) return min >= 20 && min < 25
        if (range.includes('$25+')) return min >= 25
      } else {
        if (!job.salary.annual) return false
        const min = job.salary.min || 0
        if (range.includes('$30K - $50K')) return min >= 30000 && min < 50000
        if (range.includes('$50K - $75K')) return min >= 50000 && min < 75000
        if (range.includes('$75K - $100K')) return min >= 75000 && min < 100000
        if (range.includes('$100K+')) return min >= 100000
      }
      return true
    })
  }

  // Remote only filter
  if (filters.remoteOnly) {
    filtered = filtered.filter(job => job.remote)
  }

  // Urgent only filter
  if (filters.urgentOnly) {
    filtered = filtered.filter(job => job.urgent)
  }

  return filtered
}

export function sortJobs(jobs: JobListing[], sortBy: string): JobListing[] {
  const sorted = [...jobs]

  switch (sortBy) {
    case 'date-newest':
      return sorted.sort((a, b) => 
        new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      )
    case 'date-oldest':
      return sorted.sort((a, b) => 
        new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime()
      )
    case 'salary-high':
      return sorted.sort((a, b) => {
        const aSalary = a.salary?.max || a.salary?.min || 0
        const bSalary = b.salary?.max || b.salary?.min || 0
        return bSalary - aSalary
      })
    case 'salary-low':
      return sorted.sort((a, b) => {
        const aSalary = a.salary?.min || 0
        const bSalary = b.salary?.min || 0
        return aSalary - bSalary
      })
    case 'company':
      return sorted.sort((a, b) => a.company.localeCompare(b.company))
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'urgent':
      return sorted.sort((a, b) => {
        if (a.urgent && !b.urgent) return -1
        if (!a.urgent && b.urgent) return 1
        return 0
      })
    default:
      return sorted
  }
}

