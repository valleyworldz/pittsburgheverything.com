'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { Search, MapPin, Calendar, Star, ArrowRight } from 'lucide-react'

function SearchPageContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (query) {
      // Simulate search - in real app, this would call an API
      setLoading(true)
      setTimeout(() => {
        setResults([
          {
            id: 1,
            type: 'restaurant',
            title: 'Penn Brewery',
            description: 'Historic brewery with great food and beer',
            location: 'Downtown Pittsburgh',
            rating: 4.5,
            url: '/restaurants/penn-brewery'
          },
          {
            id: 2,
            type: 'event',
            title: 'Pittsburgh Food Festival',
            description: 'Annual celebration of Pittsburgh cuisine',
            location: 'Point State Park',
            date: '2024-07-15',
            url: '/events/food-festival'
          },
          {
            id: 3,
            type: 'neighborhood',
            title: 'Lawrenceville',
            description: 'Vibrant neighborhood with shops and restaurants',
            location: 'East Pittsburgh',
            highlights: ['Strip District nearby', 'Great food scene'],
            url: '/neighborhoods/lawrenceville'
          }
        ])
        setLoading(false)
      }, 500)
    } else {
      setResults([])
      setLoading(false)
    }
  }, [query])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'restaurant': return '🍽️'
      case 'event': return '📅'
      case 'neighborhood': return '🏘️'
      default: return '🔍'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'restaurant': return 'text-green-600 bg-green-50'
      case 'event': return 'text-blue-600 bg-blue-50'
      case 'neighborhood': return 'text-purple-600 bg-purple-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Search Pittsburgh</h1>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              defaultValue={query}
              placeholder="Search restaurants, events, neighborhoods..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const newQuery = (e.target as HTMLInputElement).value
                  if (newQuery.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(newQuery.trim())}`
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Search Results */}
        {query && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Search results for "{query}"
            </h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pittsburgh-gold mx-auto mb-4"></div>
                <p className="text-gray-600">Searching Pittsburgh...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={result.url}
                    className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-pittsburgh-gold hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${getTypeColor(result.type)}`}>
                        <span className="text-2xl">{getTypeIcon(result.type)}</span>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {result.title}
                        </h3>

                        <p className="text-gray-600 mb-3">
                          {result.description}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{result.location}</span>
                          </div>

                          {result.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-current text-yellow-400" />
                              <span>{result.rating}</span>
                            </div>
                          )}

                          {result.date && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(result.date).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>

                        {result.highlights && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {result.highlights.map((highlight: string, index: number) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">
                  Try searching for restaurants, events, or neighborhoods in Pittsburgh.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Popular Searches */}
        {!query && (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-6">Popular Searches</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Italian restaurants',
                'Events this weekend',
                'Coffee shops',
                'Parks near downtown',
                'Best pizza in Pittsburgh',
                'Live music venues',
                'Farmers markets'
              ].map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-pittsburgh-gold hover:text-white rounded-full text-sm transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Search Pittsburgh</h1>
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded-lg max-w-md mx-auto mb-8"></div>
              <div className="space-y-4">
                <div className="h-32 bg-gray-200 rounded-lg"></div>
                <div className="h-32 bg-gray-200 rounded-lg"></div>
                <div className="h-32 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  )
}
