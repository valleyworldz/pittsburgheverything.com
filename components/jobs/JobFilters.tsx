'use client'

import { Search, Filter, X } from 'lucide-react'
import { useState } from 'react'

interface JobFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedType: string
  onTypeChange: (type: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedNeighborhood: string
  onNeighborhoodChange: (neighborhood: string) => void
  selectedExperience: string
  onExperienceChange: (experience: string) => void
  salaryRange: string
  onSalaryRangeChange: (range: string) => void
  remoteOnly: boolean
  onRemoteOnlyChange: (remote: boolean) => void
  urgentOnly: boolean
  onUrgentOnlyChange: (urgent: boolean) => void
  onClearFilters: () => void
}

const jobTypes = ['All Types', 'Full-time', 'Part-time', 'Contract', 'Freelance', 'Temporary']
const categories = ['All Categories', 'Technology', 'Healthcare', 'Hospitality', 'Education', 'Finance', 'Retail', 'Marketing', 'Management']
const neighborhoods = ['All Locations', 'Downtown', 'Oakland', 'Shadyside', 'Squirrel Hill', 'Lawrenceville', 'South Side', 'Strip District', 'North Shore', 'East Liberty']
const experienceLevels = ['All Levels', 'Entry', 'Mid', 'Senior', 'Executive']
const salaryRanges = ['All Ranges', '$30K - $50K', '$50K - $75K', '$75K - $100K', '$100K+', 'Hourly: $15-20', 'Hourly: $20-25', 'Hourly: $25+']

export default function JobFilters({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedCategory,
  onCategoryChange,
  selectedNeighborhood,
  onNeighborhoodChange,
  selectedExperience,
  onExperienceChange,
  salaryRange,
  onSalaryRangeChange,
  remoteOnly,
  onRemoteOnlyChange,
  urgentOnly,
  onUrgentOnlyChange,
  onClearFilters
}: JobFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const hasActiveFilters = 
    searchQuery !== '' ||
    selectedType !== 'All Types' ||
    selectedCategory !== 'All Categories' ||
    selectedNeighborhood !== 'All Locations' ||
    selectedExperience !== 'All Levels' ||
    salaryRange !== 'All Ranges' ||
    remoteOnly ||
    urgentOnly

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search jobs by title, company, or keyword..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
        >
          {jobTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={selectedNeighborhood}
          onChange={(e) => onNeighborhoodChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
        >
          {neighborhoods.map(neighborhood => (
            <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
          ))}
        </select>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center gap-2 text-sm"
        >
          <Filter className="w-4 h-4" />
          More Filters
        </button>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors inline-flex items-center gap-2 text-sm"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-pittsburgh-black mb-2">
                Experience Level
              </label>
              <select
                value={selectedExperience}
                onChange={(e) => onExperienceChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
              >
                {experienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-pittsburgh-black mb-2">
                Salary Range
              </label>
              <select
                value={salaryRange}
                onChange={(e) => onSalaryRangeChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold text-sm"
              >
                {salaryRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => onRemoteOnlyChange(e.target.checked)}
                className="rounded border-gray-300 text-pittsburgh-gold focus:ring-pittsburgh-gold"
              />
              <span className="text-sm text-gray-700">Remote Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={urgentOnly}
                onChange={(e) => onUrgentOnlyChange(e.target.checked)}
                className="rounded border-gray-300 text-pittsburgh-gold focus:ring-pittsburgh-gold"
              />
              <span className="text-sm text-gray-700">Urgent Hiring Only</span>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

