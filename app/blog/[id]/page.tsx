"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Share2, Facebook, Twitter, ThumbsUp, MessageCircle, Bookmark, Tag } from 'lucide-react'

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Mock blog posts data (same as in blog index page)
  const blogPosts = [
    {
      id: 'pittsburgh-restaurant-week-2025',
      title: 'Ultimate Guide to Pittsburgh Restaurant Week 2025',
      excerpt: 'Everything you need to know about this year\'s Restaurant Week, including participating restaurants, menu highlights, and reservation tips.',
      author: 'Pittsburgh Food Critic',
      date: '2025-01-20',
      category: 'Food & Dining',
      tags: ['restaurant week', 'dining', 'food', 'events'],
      image: '/images/events/food-festival.svg',
      readTime: '5 min read',
      content: `
        <h2>What's New in 2025</h2>
        <p>Pittsburgh Restaurant Week 2025 brings an exciting lineup of culinary experiences across the city's diverse neighborhoods. This year's event features over 80 participating restaurants, from fine dining establishments to casual eateries, all offering specially crafted prix fixe menus at incredible value.</p>

        <h2>Participating Restaurants</h2>
        <p>From Lawrenceville's trendy bistros to Oakland's university district favorites, Restaurant Week spans the entire city. Popular spots like Fat Head's Saloon, The Porch at Schenley, and newcomer hotspots are all participating with creative menus designed specifically for the event.</p>

        <h2>Menu Highlights</h2>
        <p>Expect to find innovative takes on Pittsburgh classics, seasonal ingredients, and international influences. Many restaurants are featuring local, sustainable ingredients and craft cocktails to complement their prix fixe offerings.</p>

        <h2>Reservation Tips</h2>
        <p>Book early! Popular restaurants fill up quickly. We recommend reserving at least 2-3 weeks in advance. Some restaurants offer walk-in seating, but reservations guarantee your spot.</p>

        <h2>Complete Restaurant List</h2>
        <p>Check out our comprehensive list of participating restaurants, organized by neighborhood and cuisine type. Each listing includes menu details, pricing, and reservation information.</p>
      `,
      relatedPosts: ['best-pittsburgh-winter-activities', 'pittsburgh-coffee-scene']
    },
    {
      id: 'best-pittsburgh-winter-activities',
      title: 'Top Winter Activities in Pittsburgh: Beat the Cold',
      excerpt: 'From indoor attractions to winter sports, discover the best ways to enjoy Pittsburgh during the colder months.',
      author: 'Local Guide',
      date: '2025-01-18',
      category: 'Activities',
      tags: ['winter', 'activities', 'indoor', 'sports'],
      image: '/images/og-image.svg',
      readTime: '7 min read',
      content: `
        <h2>Indoor Attractions</h2>
        <p>Pittsburgh offers world-class indoor experiences that make winter the perfect time to explore. From museums to theaters, there's something for everyone regardless of the weather outside.</p>

        <h2>Carnegie Museum of Art</h2>
        <p>One of the finest art collections in the country, featuring works from around the world. The museum's indoor sculpture court and special exhibitions make it a winter favorite.</p>

        <h2>Winter Sports</h2>
        <p>For the adventurous, Pittsburgh's surrounding hills offer excellent skiing and snowboarding at local resorts. Seven Springs and Hidden Valley are just a short drive away.</p>

        <h2>Indoor Markets & Shopping</h2>
        <p>The Strip District offers indoor shopping and dining experiences. Local markets, specialty shops, and cozy cafes provide perfect winter outings.</p>

        <h2>Cultural Events</h2>
        <p>Winter brings a full calendar of concerts, theater productions, and cultural events at venues like Heinz Hall and the Benedum Center.</p>
      `,
      relatedPosts: ['pittsburgh-restaurant-week-2025', 'pittsburgh-sports-preview']
    },
    {
      id: 'pittsburgh-business-growth-2025',
      title: 'Pittsburgh Business Landscape: Growth Trends for 2025',
      excerpt: 'Analysis of emerging business sectors, startup scene, and economic opportunities in Pittsburgh for the coming year.',
      author: 'Business Analyst',
      date: '2025-01-15',
      category: 'Business',
      tags: ['business', 'economy', 'startups', 'trends'],
      image: '/images/og-image.svg',
      readTime: '8 min read',
      content: `
        <h2>Economic Overview</h2>
        <p>Pittsburgh's economy continues to diversify beyond its traditional manufacturing roots. The city has become a hub for technology, healthcare, and education industries.</p>

        <h2>Tech Sector Growth</h2>
        <p>The tech scene is booming with companies in AI, robotics, and software development. Pittsburgh's universities provide a steady stream of talented graduates and researchers.</p>

        <h2>Healthcare Innovation</h2>
        <p>World-class medical institutions drive innovation in healthcare technology, pharmaceuticals, and medical devices. UPMC and other institutions lead groundbreaking research.</p>

        <h2>Startup Ecosystem</h2>
        <p>The startup community is thriving with incubators, accelerators, and venture capital investment. From biotech to fintech, entrepreneurs find fertile ground in Pittsburgh.</p>

        <h2>Real Estate Development</h2>
        <p>Continued investment in infrastructure and residential development signals confidence in Pittsburgh's long-term growth prospects.</p>
      `,
      relatedPosts: ['pittsburgh-coffee-scene', 'hidden-gems-pittsburgh']
    },
    {
      id: 'hidden-gems-pittsburgh',
      title: 'Hidden Gems: Underrated Spots in Pittsburgh Neighborhoods',
      excerpt: 'Discover lesser-known but amazing local businesses, parks, and attractions throughout Pittsburgh\'s diverse neighborhoods.',
      author: 'Local Explorer',
      date: '2025-01-12',
      category: 'Local Guide',
      tags: ['hidden gems', 'neighborhoods', 'local', 'discover'],
      image: '/images/og-image.svg',
      readTime: '6 min read',
      content: `
        <h2>Lawrenceville</h2>
        <p>This trendy neighborhood hides some of Pittsburgh's best-kept secrets. Beyond the main strip, explore side streets for unique boutiques and hidden cafes.</p>

        <h2>Oakland</h2>
        <p>While most visitors stick to the main attractions, Oakland offers quiet parks and specialty shops that showcase Pittsburgh's intellectual side.</p>

        <h2>South Side</h2>
        <p>Known for its nightlife, the South Side also features charming residential streets and local businesses that have served the community for generations.</p>

        <h2>Strip District</h2>
        <p>While the main market area gets attention, venture into the surrounding streets for authentic Pittsburgh experiences and local favorites.</p>

        <h2>Mt. Washington</h2>
        <p>The view isn't the only attraction. This neighborhood offers unique shops, restaurants, and a perspective on Pittsburgh few visitors experience.</p>
      `,
      relatedPosts: ['pittsburgh-business-growth-2025', 'pittsburgh-coffee-scene']
    },
    {
      id: 'pittsburgh-coffee-scene',
      title: 'The Evolution of Pittsburgh\'s Coffee Culture',
      excerpt: 'From local roasteries to specialty cafes, explore how Pittsburgh has become a coffee destination.',
      author: 'Food Writer',
      date: '2025-01-10',
      category: 'Food & Dining',
      tags: ['coffee', 'culture', 'local', 'roasteries'],
      image: '/images/deals/crazy-mocha-student.svg',
      readTime: '4 min read',
      content: `
        <h2>Local Roasteries</h2>
        <p>Pittsburgh's coffee scene is driven by passionate local roasters who source beans from around the world. From Oakland's historic roasteries to Lawrenceville's modern cafes, the city offers diverse coffee experiences.</p>

        <h2>Third Wave Influence</h2>
        <p>The third wave coffee movement has transformed Pittsburgh's coffee culture. Specialty cafes focus on quality, sustainability, and education, offering single-origin coffees and innovative brewing methods.</p>

        <h2>Neighborhood Favorites</h2>
        <p>Each neighborhood has its coffee personality. Oakland serves students and professionals, while Lawrenceville attracts coffee enthusiasts seeking unique experiences.</p>

        <h2>Industry Impact</h2>
        <p>Coffee culture supports local economies and creates community spaces. Pittsburgh's coffee scene contributes to the city's vibrant food and beverage industry.</p>
      `,
      relatedPosts: ['pittsburgh-restaurant-week-2025', 'hidden-gems-pittsburgh']
    },
    {
      id: 'pittsburgh-sports-preview',
      title: 'Pittsburgh Sports Preview: 2025 Season Outlook',
      excerpt: 'What to expect from the Steelers, Penguins, and Pirates in the coming season, plus local sports events.',
      author: 'Sports Editor',
      date: '2025-01-08',
      category: 'Sports',
      tags: ['steelers', 'penguins', 'pirates', 'sports'],
      image: '/images/events/steelers-game.svg',
      readTime: '9 min read',
      content: `
        <h2>Steelers Preview</h2>
        <p>The Steelers enter 2025 with a mix of veteran leadership and young talent. Key storylines include the development of the quarterback position and defensive improvements.</p>

        <h2>Penguins Outlook</h2>
        <p>Pittsburgh's hockey team looks to build on recent success. The roster features a strong mix of young stars and experienced players ready to contend for the Stanley Cup.</p>

        <h2>Pirates Season</h2>
        <p>After several rebuilding years, the Pirates show signs of competitiveness. Young prospects and strategic acquisitions position the team for an improved 2025 season.</p>

        <h2>Local Sports Scene</h2>
        <p>Beyond professional teams, Pittsburgh offers amateur sports leagues, running clubs, and recreational opportunities that engage the entire community.</p>

        <h2>Fan Experience</h2>
        <p>From Heinz Field to PPG Paints Arena, Pittsburgh's sports venues offer world-class experiences that enhance the excitement of game day.</p>
      `,
      relatedPosts: ['best-pittsburgh-winter-activities', 'pittsburgh-business-growth-2025']
    }
  ]

  useEffect(() => {
    const postId = params.id as string
    const foundPost = blogPosts.find(p => p.id === postId)

    if (foundPost) {
      setPost(foundPost)
      setLikes(Math.floor(Math.random() * 50) + 10) // Mock likes
    } else {
      router.push('/blog')
    }

    setLoading(false)
  }, [params.id, router])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = `Check out: ${post?.title}`

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-300 rounded w-64 mb-4 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-48 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-pittsburgh-gold hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const relatedPosts = blogPosts.filter(p => post.relatedPosts.includes(p.id))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-pittsburgh-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 md:h-96 bg-gradient-to-r from-pittsburgh-gold to-yellow-400">
        <div className="absolute inset-0 bg-black/30"></div>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-pittsburgh-gold text-white px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">{post.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-pittsburgh-black mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-pittsburgh-gold rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-pittsburgh-black">{post.author}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleShare('facebook')}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="p-2 text-gray-600 hover:text-blue-700 transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Share article"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag: string) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.replace(/\s+/g, '-')}`}
              className="inline-flex items-center gap-1 bg-gray-100 hover:bg-pittsburgh-gold hover:text-white px-3 py-1 rounded-full text-sm transition-colors"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </Link>
          ))}
        </div>

        {/* Engagement */}
        <div className="flex items-center justify-between py-6 border-t border-b border-gray-200 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              {likes} {isLiked ? 'Liked' : 'Like'}
            </button>

            <button className="flex items-center gap-2 bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
              <MessageCircle className="w-4 h-4" />
              Comment
            </button>
          </div>

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isBookmarked ? 'bg-pittsburgh-gold text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            {isBookmarked ? 'Saved' : 'Save'}
          </button>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-pittsburgh-black mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost: any) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <span className="bg-pittsburgh-gold text-white px-2 py-1 rounded text-xs font-medium mb-2 inline-block">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-bold text-pittsburgh-black mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
