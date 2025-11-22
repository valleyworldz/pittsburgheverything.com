import { Metadata } from 'next'
import { ArrowLeft, MessageSquare, Search, Heart, Eye, MessageCircle, Clock, MapPin, User } from 'lucide-react'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // In production, fetch post data here
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

// Mock data - in production, fetch from database
const communityPosts = [
  {
    id: '1',
    type: 'question',
    title: 'Best Italian restaurants in Bloomfield?',
    body: 'Moving to Bloomfield next month and looking for authentic Italian food recommendations. Any hidden gems? I\'m particularly interested in family-owned places with traditional recipes. Also, any recommendations for good pizza places?',
    authorName: 'Maria R.',
    neighborhood: 'Bloomfield',
    createdAt: '2025-01-20T10:30:00Z',
    status: 'active',
    responses: 8,
    views: 45,
    replies: [
      {
        id: 'r1',
        authorName: 'Tony M.',
        body: 'You have to try Piccolo Forno on Butler Street! Amazing wood-fired pizza and authentic Italian dishes. Family-owned for generations.',
        createdAt: '2025-01-20T11:15:00Z',
        isAdminResponse: false
      },
      {
        id: 'r2',
        authorName: 'Lisa K.',
        body: 'I second Piccolo Forno! Also check out DiAnoia\'s Eatery - great pasta and they make their own bread. Welcome to Bloomfield!',
        createdAt: '2025-01-20T12:30:00Z',
        isAdminResponse: false
      },
      {
        id: 'r3',
        authorName: 'PittsburghEverything',
        body: 'Great question! Bloomfield is known as Pittsburgh\'s Little Italy. Check out our restaurant guide for more recommendations: /restaurants',
        createdAt: '2025-01-20T14:00:00Z',
        isAdminResponse: true
      }
    ]
  },
  {
    id: '2',
    type: 'lost-found',
    title: 'Found: Black wallet in Schenley Park',
    body: 'Found a black leather wallet with ID, credit cards, and cash near the fountain. Contact me to claim. I\'ll be at the park until 5pm today, or you can email me.',
    authorName: 'Anonymous',
    neighborhood: 'Schenley Park',
    createdAt: '2025-01-19T14:15:00Z',
    status: 'active',
    responses: 2,
    views: 23,
    replies: [
      {
        id: 'r1',
        authorName: 'Mike T.',
        body: 'That might be mine! I lost my wallet yesterday. Can you describe the ID name?',
        createdAt: '2025-01-19T15:00:00Z',
        isAdminResponse: false
      }
    ]
  },
  {
    id: '3',
    type: 'volunteer',
    title: 'Community Garden needs volunteers',
    body: 'The Lawrenceville Community Garden needs help with spring planting. No experience required, training provided. We meet every Saturday morning from 9am-12pm. Great way to meet neighbors and learn about gardening!',
    authorName: 'Green Pittsburgh',
    neighborhood: 'Lawrenceville',
    createdAt: '2025-01-18T09:00:00Z',
    status: 'active',
    responses: 12,
    views: 67,
    replies: [
      {
        id: 'r1',
        authorName: 'Sarah J.',
        body: 'I\'d love to help! I\'m new to gardening but excited to learn. Should I just show up on Saturday?',
        createdAt: '2025-01-18T10:30:00Z',
        isAdminResponse: false
      },
      {
        id: 'r2',
        authorName: 'Green Pittsburgh',
        body: 'Yes! Just come to the garden at 9am. We\'ll provide all tools and gloves. Looking forward to meeting you!',
        createdAt: '2025-01-18T11:00:00Z',
        isAdminResponse: false
      }
    ]
  },
  {
    id: '4',
    type: 'question',
    title: 'Car recommendations for Pittsburgh winters?',
    body: 'Thinking of buying a new car. What do locals recommend for handling snow and ice? I\'m looking for something reliable that can handle Pittsburgh\'s hills and winter weather.',
    authorName: 'John D.',
    neighborhood: 'Shadyside',
    createdAt: '2025-01-17T16:45:00Z',
    status: 'active',
    responses: 15,
    views: 89,
    replies: []
  },
  {
    id: '5',
    type: 'lost-found',
    title: 'Lost: Golden retriever puppy',
    body: 'Our 3-month-old golden retriever escaped from our yard in Regent Square. Please call if found! He\'s wearing a blue collar with our phone number. His name is Max and he\'s very friendly.',
    authorName: 'Sarah M.',
    neighborhood: 'Regent Square',
    createdAt: '2025-01-16T20:00:00Z',
    status: 'active',
    responses: 5,
    views: 156,
    replies: []
  }
]

function getPostById(id: string) {
  return communityPosts.find(post => post.id === id)
}

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
                  {post.body}
                </div>
              </div>
            </div>
          </article>

          {/* Replies Section */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-pittsburgh-black flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Responses ({post.replies?.length || 0})
              </h2>
            </div>

            {post.replies && post.replies.length > 0 ? (
              <div className="space-y-6">
                {post.replies.map((reply) => (
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

