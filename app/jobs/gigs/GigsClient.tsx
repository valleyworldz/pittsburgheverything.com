'use client'

import { useState, useMemo } from 'react'
import { Grid, List, Zap } from 'lucide-react'
import { getGigJobs } from '@/data/pittsburghJobs'
import JobCard from '@/components/jobs/JobCard'
import JobFilters from '@/components/jobs/JobFilters'
import { JobListSkeleton } from '@/components/jobs/LoadingSkeleton'
import ErrorState from '@/components/jobs/ErrorState'
import { filterJobs, sortJobs } from '@/utils/jobUtils'

export default function GigsClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('Freelance')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All Locations')
  const [selectedExperience, setSelectedExperience] = useState('All Levels')
  const [salaryRange, setSalaryRange] = useState('All Ranges')
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [urgentOnly, setUrgentOnly] = useState(false)
  const [sortBy, setSortBy] = useState('date-newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [error, setError] = useState<string | null>(null)

  const allJobs = useMemo(() => {
    try {
      return getGigJobs()
    } catch (err) {
      setError('Failed to load gigs')
      return []
    }
  }, [])

  const filteredJobs = useMemo(() => {
    const filtered = filterJobs(allJobs, {
      searchQuery,
      type: selectedType,
      category: selectedCategory,
      neighborhood: selectedNeighborhood,
      experience: selectedExperience,
      salaryRange,
      remoteOnly,
      urgentOnly
    })
    return sortJobs(filtered, sortBy)
  }, [allJobs, searchQuery, selectedType, selectedCategory, selectedNeighborhood, selectedExperience, salaryRange, remoteOnly, urgentOnly, sortBy])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedType('Freelance')
    setSelectedCategory('All Categories')
    setSelectedNeighborhood('All Locations')
    setSelectedExperience('All Levels')
    setSalaryRange('All Ranges')
    setRemoteOnly(false)
    setUrgentOnly(false)
  }

  const handleApply = (jobId: string) => {
    const job = allJobs.find(j => j.id === jobId)
    if (job?.contact.applyUrl) {
      window.open(job.contact.applyUrl, '_blank')
    } else if (job?.contact.email) {
      window.location.href = `mailto:${job.contact.email}?subject=Application for ${job.title}`
    }
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => setError(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <JobFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedNeighborhood={selectedNeighborhood}
            onNeighborhoodChange={setSelectedNeighborhood}
            selectedExperience={selectedExperience}
            onExperienceChange={setSelectedExperience}
            salaryRange={salaryRange}
            onSalaryRangeChange={setSalaryRange}
            remoteOnly={remoteOnly}
            onRemoteOnlyChange={setRemoteOnly}
            urgentOnly={urgentOnly}
            onUrgentOnlyChange={setUrgentOnly}
            onClearFilters={handleClearFilters}
          />

          {/* Sort and View Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'gig' : 'gigs'} found
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
              >
                <option value="date-newest">Newest First</option>
                <option value="date-oldest">Oldest First</option>
                <option value="salary-high">Pay: High to Low</option>
                <option value="salary-low">Pay: Low to High</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-pittsburgh-black mb-2">No gigs found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or check back later for new opportunities.
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={handleApply}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

