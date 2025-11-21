import { Review, Business } from '@/types'

interface ReviewStructuredDataProps {
  business: Business
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

export default function ReviewStructuredData({
  business,
  reviews,
  averageRating,
  totalReviews
}: ReviewStructuredDataProps) {
  // Generate JSON-LD structured data for Google rich snippets
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.name,
    "description": business.description,
    "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://pittsburgheverything.com'}/businesses/${business.id}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address,
      "addressLocality": "Pittsburgh",
      "addressRegion": "PA",
      "postalCode": business.address.match(/\b\d{5}\b/)?.[0] || "",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.4406, // Pittsburgh coordinates
      "longitude": -79.9959
    },
    "telephone": business.phone,
    "email": business.email,
    "image": business.image,
    "priceRange": business.priceRange,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating.toFixed(1),
      "reviewCount": totalReviews,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.slice(0, 10).map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.userName
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.content,
      "datePublished": review.createdAt,
      "publisher": {
        "@type": "Organization",
        "name": "PittsburghEverything.com"
      }
    })),
    "openingHours": business.hours ? Object.entries(business.hours).map(([day, hours]) => {
      const dayMap: { [key: string]: string } = {
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday'
      }
      return `${dayMap[day]} ${hours}`
    }) : undefined,
    "servesCuisine": business.category === 'restaurant' ? business.subcategory || 'American' : undefined,
    "paymentAccepted": ["Cash", "Credit Card"],
    "currenciesAccepted": "USD"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}

// Component for individual review structured data
export function ReviewItemStructuredData({ review, business }: { review: Review, business: Business }) {
  const reviewData = {
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.userName
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewBody": review.content,
    "datePublished": review.createdAt,
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": business.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": business.address,
        "addressLocality": "Pittsburgh",
        "addressRegion": "PA",
        "addressCountry": "US"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "PittsburghEverything.com",
      "url": process.env.NEXT_PUBLIC_BASE_URL || 'https://pittsburgheverything.com'
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(reviewData, null, 2)
      }}
    />
  )
}

// FAQ structured data for review pages
export function ReviewFAQStructuredData() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I write a review on PittsburghEverything.com?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Writing a review is easy! Click the 'Write a Review' button on any business page, fill out the form with your experience, and submit. You'll receive a verification email to confirm your review."
        }
      },
      {
        "@type": "Question",
        "name": "Are reviews verified on PittsburghEverything.com?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We verify reviews through email confirmation to ensure authenticity. Verified reviews are marked with a checkmark and help customers trust the feedback."
        }
      },
      {
        "@type": "Question",
        "name": "How do businesses respond to reviews?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Businesses can respond to reviews through their dashboard. Responses appear publicly and help show customers that businesses care about feedback."
        }
      },
      {
        "@type": "Question",
        "name": "Can I edit my review after posting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Currently, reviews cannot be edited after submission for authenticity. If you need to update information, you can submit a new review or contact us for assistance."
        }
      },
      {
        "@type": "Question",
        "name": "How does the review system prevent fake reviews?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We use advanced fraud detection, email verification, and manual moderation to prevent fake reviews. Our system analyzes patterns and flags suspicious activity."
        }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData, null, 2)
      }}
    />
  )
}

// Breadcrumb structured data
export function BreadcrumbStructuredData({ breadcrumbs }: {
  breadcrumbs: Array<{ name: string, url: string }>
}) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData, null, 2)
      }}
    />
  )
}
