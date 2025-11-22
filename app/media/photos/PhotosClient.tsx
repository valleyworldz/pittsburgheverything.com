'use client'

import { useState, useMemo } from 'react'
import { Grid, List, Search, Filter, X, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

type ViewMode = 'grid' | 'list'

interface Photo {
  id: string
  title: string
  description?: string
  category: string
  url: string
  thumbnail?: string
  tags: string[]
  neighborhood?: string
  featured: boolean
  altText: string
}

// Mock data - replace with actual API call later
const mockPhotos: Photo[] = [
  {
    id: '1',
    title: 'Pittsburgh Skyline at Sunset',
    description: 'Beautiful view of the Pittsburgh skyline during golden hour',
    category: 'skyline',
    url: '/images/pittsburgh-skyline.jpg',
    tags: ['skyline', 'sunset', 'downtown'],
    featured: true,
    altText: 'Pittsburgh skyline at sunset'
  },
  {
    id: '2',
    title: 'Point State Park Fountain',
    description: 'The iconic fountain at Point State Park',
    category: 'parks',
    url: '/images/point-state-park.jpg',
    tags: ['parks', 'fountain', 'downtown'],
    neighborhood: 'Downtown',
    featured: true,
    altText: 'Point State Park fountain'
  },
  {
    id: '3',
    title: 'Strip District Market',
    description: 'Vibrant market scene in the Strip District',
    category: 'neighborhoods',
    url: '/images/strip-district.jpg',
    tags: ['neighborhoods', 'market', 'food'],
    neighborhood: 'Strip District',
    featured: false,
    altText: 'Strip District market scene'
  }
]

const categories = ['all', 'skyline', 'neighborhoods', 'parks', 'events', 'food', 'architecture']

export default function PhotosClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const filteredPhotos = useMemo(() => {
    let result = mockPhotos

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(photo => photo.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(photo =>
        photo.title.toLowerCase().includes(query) ||
        photo.description?.toLowerCase().includes(query) ||
        photo.tags.some(tag => tag.toLowerCase().includes(query)) ||
        photo.neighborhood?.toLowerCase().includes(query)
      )
    }

    // Sort: featured first
    result = [...result].sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return a.title.localeCompare(b.title)
    })

    return result
  }, [searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pittsburgh Photos Gallery</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Explore stunning photos of Pittsburgh neighborhoods, events, skyline, food, and more. 
            Discover the beauty of the Steel City through our curated photo gallery.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-gray-900">{filteredPhotos.length}</div>
            <div className="text-sm text-gray-600">Photos</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-gray-900">
              {new Set(filteredPhotos.map(p => p.category)).size}
            </div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-gray-900">
              {filteredPhotos.filter(p => p.featured).length}
            </div>
            <div className="text-sm text-gray-600">Featured</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="text-gray-400 w-5 h-5" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600">
            {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'} found
          </div>
          <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Photo Gallery */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No photos found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
              >
                <div className="relative aspect-square bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  </div>
                  {photo.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{photo.title}</h3>
                  {photo.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{photo.description}</p>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {photo.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-xl transition-shadow flex gap-6"
              >
                <div className="relative w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                  {photo.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Featured
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{photo.title}</h3>
                  {photo.description && (
                    <p className="text-gray-600 mb-3">{photo.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {photo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {photo.neighborhood && (
                    <p className="text-sm text-gray-500">📍 {photo.neighborhood}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{selectedPhoto.title}</h2>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6">
              <div className="relative aspect-video bg-gray-200 rounded-lg mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="w-24 h-24 text-gray-400" />
                </div>
              </div>
              {selectedPhoto.description && (
                <p className="text-gray-700 mb-4">{selectedPhoto.description}</p>
              )}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPhoto.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {selectedPhoto.neighborhood && (
                <p className="text-gray-600">📍 {selectedPhoto.neighborhood}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

