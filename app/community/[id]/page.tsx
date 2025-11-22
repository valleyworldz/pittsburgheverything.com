import { Metadata } from 'next'
import { ArrowLeft, MessageSquare, Search, Heart, Eye, MessageCircle, Clock, MapPin, User } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import { notFound } from 'next/navigation'
import { getPostById } from '@/data/pittsburghCommunity'
import type { CommunityPost } from '@/data/pittsburghCommunity'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = getPostById(params.id)
  
  if (!post) {
    return {
      title: 'Post Not Found | Pittsburgh Community'
    }
  }

  return {
    title: `${post.title} | Pittsburgh Community`,
    description: post.body.substring(0, 160),
  }
}

// Mock replies - in production, fetch from database
const mockReplies: Array<{
  id: string
  authorName: string
  body: string
  createdAt: string
  isAdminResponse: boolean
}> = []

const postTypeConfig = {
  question: {
    icon: MessageSquare,
    color: 'blue',
    label: 'Question',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800'
  },
  'lost-found': {
    icon: Search,
    color: 'orange',
    label: 'Lost & Found',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800'
  },
  volunteer: {
    icon: Heart,
    color: 'green',
    label: 'Volunteer',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800'
  }
}

export default function CommunityPostPage({ params }: { params: { id: string } }) {
  const post = getPostById(params.id)

  if (!post) {
    notFound()
  }

  const config = postTypeConfig[post.type as keyof typeof postTypeConfig]
  const Icon = config.icon

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    "headline": post.title,
    "text": post.body,
    "author": {
      "@type": "Person",
      "name": post.authorName || "Anonymous"
    },
    "dateCreated": post.createdAt,
    "url": `https://pittsburgheverything.com/community/${post.id}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />

      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-pittsburgh-gold mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Community
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Post */}
          <article className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                post.type === 'question' ? 'bg-blue-100' :
                post.type === 'lost-found' ? 'bg-orange-100' : 'bg-green-100'
              }`}>
                <Icon className={`w-6 h-6 ${
                  post.type === 'question' ? 'text-blue-600' :
                  post.type === 'lost-found' ? 'text-orange-600' : 'text-green-600'
                }`} />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor}`}>
                    {config.label}
                  </span>
                  {post.neighborhood && (
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {post.neighborhood}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-pittsburgh-black mb-4">
                  {post.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.authorName || 'Anonymous'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.views} views
                  </span>
                </div>

                <div className="prose max-w-none text-gray-700 whitespace-pre-wrap mb-6">
                  {post.longDescription || post.body}
                </div>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Replies Section */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-pittsburgh-black flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Responses ({post.responses || 0})
              </h2>
            </div>

            {mockReplies.length > 0 ? (
              <div className="space-y-6">
                {mockReplies.map((reply) => (
                  <div key={reply.id} className="border-l-4 border-gray-200 pl-6 py-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-pittsburgh-gold rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {reply.authorName?.charAt(0).toUpperCase() || 'A'}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {reply.authorName}
                            {reply.isAdminResponse && (
                              <span className="ml-2 text-xs bg-pittsburgh-gold text-white px-2 py-0.5 rounded-full">
                                Admin
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(reply.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{reply.body}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No responses yet. Be the first to help!</p>
                <p className="text-sm text-gray-400 mt-2">
                  {post.responses > 0 ? `${post.responses} people have shown interest` : 'Be the first to respond'}
                </p>
              </div>
            )}

            {/* Reply Form */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-semibold text-pittsburgh-black mb-4">Add a Response</h3>
              <form className="space-y-4">
                <textarea
                  rows={6}
                  placeholder="Share your thoughts, answer the question, or provide helpful information..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent resize-none"
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Email (optional)"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-pittsburgh-gold text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                  >
                    Post Response
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

