'use client'

import { useState } from 'react'
import { MessageSquare, Search, Heart, Eye, MessageCircle, MapPin, Clock, CheckCircle, Award } from 'lucide-react'
import Link from 'next/link'
import type { CommunityPost } from '@/data/pittsburghCommunity'
import { motion } from 'framer-motion'

interface PostCardProps {
  post: CommunityPost
}

const postTypeConfig = {
  question: {
    icon: MessageSquare,
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    badgeColor: 'bg-blue-100 text-blue-800'
  },
  'lost-found': {
    icon: Search,
    color: 'orange',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-600',
    badgeColor: 'bg-orange-100 text-orange-800'
  },
  volunteer: {
    icon: Heart,
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
    badgeColor: 'bg-green-100 text-green-800'
  }
}

export default function PostCard({ post }: PostCardProps) {
  const config = postTypeConfig[post.type]
  const Icon = config.icon

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
    return date.toLocaleDateString()
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100"
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${config.bgColor}`}>
          <Icon className={`w-6 h-6 ${config.textColor}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.badgeColor}`}>
                  {post.type === 'question' ? 'Question' : post.type === 'lost-found' ? 'Lost & Found' : 'Volunteer'}
                </span>
                {post.featured && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Award className="w-3 h-3" />
                    Featured
                  </span>
                )}
                {post.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                )}
                {post.status === 'resolved' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Resolved
                  </span>
                )}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>{post.neighborhood}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                <Link 
                  href={`/community/${post.id}`} 
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h3>

              <p className="text-gray-700 mb-3 line-clamp-2">{post.body}</p>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>by {post.authorName}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{getTimeAgo(post.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1" title="Views">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
              <div className="flex items-center gap-1" title="Responses">
                <MessageCircle className="w-4 h-4" />
                <span>{post.responses}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

