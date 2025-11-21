import Head from 'next/head'
import { Business, Review } from '@/types'

interface ReviewSEOHeadProps {
  business: Business
  reviews: Review[]
  averageRating: number
  totalReviews: number
  pageType: 'business' | 'category' | 'neighborhood' | 'search'
  canonicalUrl?: string
}

export default function ReviewSEOHead({
  business,
  reviews,
  averageRating,
  totalReviews,
  pageType,
  canonicalUrl
}: ReviewSEOHeadProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pittsburgheverything.com'
  const url = canonicalUrl || `${baseUrl}/businesses/${business.id}`

  // Generate SEO-optimized title
  const getTitle = () => {
    const rating = averageRating.toFixed(1)
    const reviewText = totalReviews === 1 ? '1 review' : `${totalReviews} reviews`

    switch (pageType) {
      case 'business':
        return `${business.name} - ${rating} Stars (${reviewText}) | PittsburghEverything.com`
      default:
        return `${business.name} Reviews & Ratings | PittsburghEverything.com`
    }
  }

  // Generate SEO-optimized description
  const getDescription = () => {
    const rating = averageRating.toFixed(1)
    const reviewText = totalReviews === 1 ? '1 customer review' : `${totalReviews} customer reviews`

    let description = `Read ${reviewText} for ${business.name} in Pittsburgh. Average rating: ${rating} stars. `

    if (reviews.length > 0) {
      const recentReview = reviews[0]
      const truncatedReview = recentReview.content.length > 100
        ? recentReview.content.substring(0, 100) + '...'
        : recentReview.content
      description += `Recent review: "${truncatedReview}"`
    }

    description += ` Find honest reviews, photos, and ratings from real Pittsburgh customers on PittsburghEverything.com.`

    return description.length > 160 ? description.substring(0, 157) + '...' : description
  }

  // Generate keywords
  const getKeywords = () => {
    const baseKeywords = [
      business.name,
      `${business.name} reviews`,
      `${business.name} ratings`,
      business.category,
      business.neighborhood || 'Pittsburgh',
      'Pittsburgh reviews',
      'local business reviews',
      'customer reviews',
      'restaurant reviews',
      'business ratings'
    ]

    if (business.category === 'restaurant' && business.subcategory) {
      baseKeywords.push(`${business.subcategory} restaurant`)
    }

    return baseKeywords.join(', ')
  }

  // Generate Open Graph tags
  const getOpenGraphTags = () => {
    const rating = averageRating.toFixed(1)
    const image = business.image || '/images/default-business.svg'

    return [
      { property: 'og:title', content: getTitle() },
      { property: 'og:description', content: getDescription() },
      { property: 'og:image', content: image.startsWith('http') ? image : `${baseUrl}${image}` },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'business.business' },
      { property: 'og:site_name', content: 'PittsburghEverything.com' },
      { property: 'business:contact_data:street_address', content: business.address },
      { property: 'business:contact_data:locality', content: 'Pittsburgh' },
      { property: 'business:contact_data:region', content: 'PA' },
      { property: 'business:contact_data:country_name', content: 'United States' },
      { property: 'business:contact_data:phone_number', content: business.phone || '' },
      { property: 'place:location:latitude', content: '40.4406' },
      { property: 'place:location:longitude', content: '-79.9959' }
    ]
  }

  // Generate Twitter Card tags
  const getTwitterTags = () => {
    const image = business.image || '/images/default-business.svg'

    return [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: getTitle() },
      { name: 'twitter:description', content: getDescription() },
      { name: 'twitter:image', content: image.startsWith('http') ? image : `${baseUrl}${image}` },
      { name: 'twitter:site', content: '@PittsburghEverything' }
    ]
  }

  // Generate review-specific meta tags
  const getReviewMetaTags = () => [
    { name: 'rating', content: averageRating.toFixed(1) },
    { name: 'reviewCount', content: totalReviews.toString() },
    { name: 'bestRating', content: '5' },
    { name: 'worstRating', content: '1' },
    { name: 'businessType', content: business.category },
    { name: 'neighborhood', content: business.neighborhood || 'Pittsburgh' }
  ]

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{getTitle()}</title>
      <meta name="description" content={getDescription()} />
      <meta name="keywords" content={getKeywords()} />
      <link rel="canonical" href={url} />

      {/* Review-specific Meta Tags */}
      {getReviewMetaTags().map((tag, index) => (
        <meta key={`review-meta-${index}`} name={tag.name} content={tag.content} />
      ))}

      {/* Open Graph Tags */}
      {getOpenGraphTags().map((tag, index) => (
        <meta key={`og-${index}`} property={tag.property} content={tag.content} />
      ))}

      {/* Twitter Card Tags */}
      {getTwitterTags().map((tag, index) => (
        <meta key={`twitter-${index}`} name={tag.name} content={tag.content} />
      ))}

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="US-PA" />
      <meta name="geo.placename" content="Pittsburgh" />
      <meta name="geo.position" content="40.4406;-79.9959" />
      <meta name="ICBM" content="40.4406, -79.9959" />

      {/* Business-specific structured data */}
      <meta name="business:name" content={business.name} />
      <meta name="business:address" content={business.address} />
      <meta name="business:phone" content={business.phone || ''} />
      <meta name="business:url" content={url} />

      {/* Mobile optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=yes" />

      {/* Review platform specific */}
      <meta name="review-platform" content="PittsburghEverything.com" />
      <meta name="review-verification" content="email" />
      <meta name="review-moderation" content="automated" />
    </Head>
  )
}

// Component for category/review listing pages
export function CategorySEOHead({
  category,
  neighborhood,
  totalBusinesses,
  averageRating,
  totalReviews,
  canonicalUrl
}: {
  category: string
  neighborhood?: string
  totalBusinesses: number
  averageRating: number
  totalReviews: number
  canonicalUrl: string
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pittsburgheverything.com'
  const title = neighborhood
    ? `${category} in ${neighborhood} - ${totalBusinesses} Places (${averageRating.toFixed(1)}★) | PittsburghEverything.com`
    : `${category} in Pittsburgh - ${totalBusinesses} Places (${averageRating.toFixed(1)}★) | PittsburghEverything.com`

  const description = neighborhood
    ? `Find the best ${category.toLowerCase()} in ${neighborhood}, Pittsburgh. ${totalBusinesses} places with ${totalReviews} reviews and ${averageRating.toFixed(1)} average rating. Read honest reviews from local customers.`
    : `Find the best ${category.toLowerCase()} in Pittsburgh. ${totalBusinesses} places with ${totalReviews} reviews and ${averageRating.toFixed(1)} average rating. Read honest reviews from local customers.`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={`${category}, ${neighborhood || 'Pittsburgh'}, reviews, ratings, local business`} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Category specific */}
      <meta name="category" content={category} />
      {neighborhood && <meta name="neighborhood" content={neighborhood} />}
      <meta name="total-businesses" content={totalBusinesses.toString()} />
      <meta name="average-rating" content={averageRating.toFixed(1)} />
      <meta name="total-reviews" content={totalReviews.toString()} />
    </Head>
  )
}
