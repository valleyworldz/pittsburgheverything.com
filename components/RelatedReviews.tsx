'use client'

import Link from 'next/link'
import { Star, MapPin, ArrowRight } from 'lucide-react'
import type { Business } from '@/types'

interface RelatedReviewsProps {
  currentBusiness: Business
  relatedBusinesses: Array<{
    business: Business
    averageRating: number
    reviewCount: number
    topReview?: string
  }>
  title?: string
}

export default function RelatedReviews({
  currentBusiness,
  relatedBusinesses,
  title = "Similar Places"
}: RelatedReviewsProps) {
  if (relatedBusinesses.length === 0) return null

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-pittsburgh-black">{title}</h2>
        <Link
          href={`/search?category=${currentBusiness.category}&neighborhood=${currentBusiness.neighborhood}`}
          className="text-pittsburgh-gold hover:text-pittsburgh-black text-sm font-medium flex items-center gap-1"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {relatedBusinesses.slice(0, 3).map(({ business, averageRating, reviewCount, topReview }) => (
          <Link
            key={business.id}
            href={`/businesses/${business.id}`}
            className="block group"
          >
            <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
              {/* Business Image */}
              <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                {business.image ? (
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full bg-pittsburgh-gold/10 flex items-center justify-center">
                    <span className="text-pittsburgh-gold font-bold text-lg">
                      {business.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Business Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-pittsburgh-black group-hover:text-pittsburgh-gold transition-colors truncate">
                  {business.name}
                </h3>

                <div className="flex items-center gap-2 text-sm text-steel-gray mb-1">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{business.neighborhood || 'Pittsburgh'}</span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-pittsburgh-gold fill-current" />
                    <span className="text-sm font-medium text-pittsburgh-black">
                      {averageRating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-sm text-steel-gray">
                    ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
                  </span>
                </div>

                {topReview && (
                  <p className="text-sm text-steel-gray line-clamp-2 italic">
                    "{topReview}"
                  </p>
                )}

                <div className="flex items-center gap-1 mt-2 text-xs text-pittsburgh-gold group-hover:text-pittsburgh-black">
                  <span>Read reviews</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* SEO-friendly footer links */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href={`/search?category=${currentBusiness.category}`}
            className="text-pittsburgh-gold hover:text-pittsburgh-black hover:underline"
          >
            More {currentBusiness.category}
          </Link>
          {currentBusiness.neighborhood && (
            <>
              <span className="text-gray-300">•</span>
              <Link
                href={`/search?neighborhood=${currentBusiness.neighborhood}`}
                className="text-pittsburgh-gold hover:text-pittsburgh-black hover:underline"
              >
                {currentBusiness.neighborhood} businesses
              </Link>
            </>
          )}
          <span className="text-gray-300">•</span>
          <Link
            href="/top-100"
            className="text-pittsburgh-gold hover:text-pittsburgh-black hover:underline"
          >
            Pittsburgh's Top 100
          </Link>
        </div>
      </div>
    </div>
  )
}

// Component for review breadcrumbs
export function ReviewBreadcrumbs({
  business,
  category,
  neighborhood
}: {
  business?: Business
  category?: string
  neighborhood?: string
}) {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Businesses', url: '/search' }
  ]

  if (category) {
    breadcrumbs.push({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      url: `/search?category=${category}`
    })
  }

  if (neighborhood) {
    breadcrumbs.push({
      name: neighborhood,
      url: `/search?neighborhood=${neighborhood}`
    })
  }

  if (business) {
    breadcrumbs.push({
      name: business.name,
      url: `/businesses/${business.id}`
    })
  }

  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-400">/</span>}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-pittsburgh-black font-medium" aria-current="page">
                {crumb.name}
              </span>
            ) : (
              <Link
                href={crumb.url}
                className="text-pittsburgh-gold hover:text-pittsburgh-black transition-colors"
              >
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Component for popular review searches
export function PopularReviewSearches() {
  const popularSearches = [
    { query: 'best pizza pittsburgh', url: '/search?q=best+pizza+pittsburgh' },
    { query: 'coffee shops oakland', url: '/search?q=coffee+shops+oakland' },
    { query: 'italian restaurants', url: '/search?q=italian+restaurants' },
    { query: 'bars lawrenceville', url: '/search?q=bars+lawrenceville' },
    { query: 'breakfast spots', url: '/search?q=breakfast+spots' },
    { query: 'food trucks pittsburgh', url: '/search?q=food+trucks+pittsburgh' }
  ]

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-pittsburgh-black mb-3">Popular Searches</h3>
      <div className="flex flex-wrap gap-2">
        {popularSearches.map((search, index) => (
          <Link
            key={index}
            href={search.url}
            className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-steel-gray hover:text-pittsburgh-black hover:border-pittsburgh-gold transition-colors"
          >
            {search.query}
          </Link>
        ))}
      </div>
    </div>
  )
}

// Component for review schema markup
export function ReviewSchemaMarkup({ business, reviews }: {
  business: Business
  reviews: Array<{ rating: number, content: string, author: string, date: string }>
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.name,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
      "reviewCount": reviews.length,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": review.author },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5,
        "worstRating": 1
      },
      "reviewBody": review.content,
      "datePublished": review.date
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
