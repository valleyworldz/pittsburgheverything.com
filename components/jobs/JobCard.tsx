'use client'

import { MapPin, DollarSign, Briefcase, Clock, Building, ExternalLink, Share2, Heart } from 'lucide-react'
import { useState } from 'react'
import type { JobListing } from '@/data/pittsburghJobs'
import Link from 'next/link'

interface JobCardProps {
  job: JobListing
  onApply?: (jobId: string) => void
  onShare?: (jobId: string) => void
}

export default function JobCard({ job, onApply, onShare }: JobCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: `${job.title} at ${job.company}`,
        text: job.description,
        url: window.location.href
      }).catch(() => {})
    } else if (onShare) {
      onShare(job.id)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-blue-100 text-blue-800'
      case 'part-time':
        return 'bg-green-100 text-green-800'
      case 'contract':
        return 'bg-purple-100 text-purple-800'
      case 'freelance':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getExperienceColor = (level: string) => {
    switch (level) {
      case 'entry':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'mid':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'senior':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'executive':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-all duration-300 border-l-4 ${
      job.urgent ? 'border-red-500' : 'border-transparent'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {job.urgent && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                ⚡ Urgent
              </span>
            )}
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(job.type)}`}>
              {job.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getExperienceColor(job.experienceLevel)}`}>
              {job.experienceLevel.charAt(0).toUpperCase() + job.experienceLevel.slice(1)}
            </span>
            {job.remote && (
              <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-semibold">
                Remote
              </span>
            )}
            <span className="text-xs text-gray-500">{formatDate(job.postedDate)}</span>
          </div>

          <h3 className="text-xl font-bold text-pittsburgh-black mb-1 hover:text-pittsburgh-gold transition-colors">
            {job.title}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <Building className="w-4 h-4 text-gray-400" />
            <p className="text-gray-600 font-medium">{job.company}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={handleFavorite}
            className={`p-2 rounded-full transition-colors ${
              isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
            aria-label="Save job"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full text-gray-400 hover:text-pittsburgh-gold hover:bg-yellow-50 transition-colors"
            aria-label="Share job"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Location and Details */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3 flex-wrap">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {job.location.neighborhood}, {job.location.city}
        </span>
        {job.salary && (
          <span className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            {job.salary.display}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Briefcase className="w-4 h-4" />
          {job.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Skills */}
      {job.skills && job.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-xs text-gray-500 px-2 py-1">+{job.skills.length - 4} more</span>
          )}
        </div>
      )}

      {/* Benefits Preview */}
      {job.benefits && job.benefits.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Benefits:</p>
          <div className="flex flex-wrap gap-1">
            {job.benefits.slice(0, 3).map((benefit, index) => (
              <span key={index} className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">
                {benefit}
              </span>
            ))}
            {job.benefits.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">+{job.benefits.length - 3} more</span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          Posted {formatDate(job.postedDate)}
        </div>
        <div className="flex items-center gap-2">
          {job.contact.applyUrl ? (
            <a
              href={job.contact.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pittsburgh-gold text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors inline-flex items-center gap-2"
            >
              Apply Now
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <button
              onClick={() => onApply?.(job.id)}
              className="bg-pittsburgh-gold text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

