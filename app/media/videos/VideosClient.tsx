'use client'

import { useState, useMemo } from 'react'
import { Grid, List, Search, Filter, X, Video, Play } from 'lucide-react'

type ViewMode = 'grid' | 'list'

interface VideoItem {
  id: string
  title: string
  description?: string
  category: string
  url: string
  thumbnail?: string
  tags: string[]
  neighborhood?: string
  featured: boolean
  duration?: string
  source?: 'youtube' | 'vimeo' | 'custom'
}

// Mock data - replace with actual API call later
const mockVideos: VideoItem[] = [
  {
    id: '1',
    title: 'Pittsburgh Skyline Time-Lapse',
    description: 'Beautiful time-lapse of the Pittsburgh skyline throughout the day',
    category: 'skyline',
    url: 'https://www.youtube.com/watch?v=example1',
    tags: ['skyline', 'time-lapse', 'downtown'],
    featured: true,
    duration: '2:30',
    source: 'youtube'
  },
  {
    id: '2',
    title: 'Exploring the Strip District',
    description: 'A tour of the vibrant Strip District market',
    category: 'neighborhoods',
    url: 'https://www.youtube.com/watch?v=example2',
    tags: ['neighborhoods', 'market', 'food'],
    neighborhood: 'Strip District',
    featured: true,
    duration: '5:15',
    source: 'youtube'
  },
  {
    id: '3',
    title: 'Pittsburgh Food Scene',
    description: 'Discovering the best restaurants in Pittsburgh',
    category: 'food',
    url: 'https://www.youtube.com/watch?v=example3',
    tags: ['food', 'restaurants', 'dining'],
    featured: false,
    duration: '8:45',
    source: 'youtube'
  }
]

const categories = ['all', 'skyline', 'neighborhoods', 'events', 'food', 'culture', 'sports']

export default function VideosClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)

  const filteredVideos = useMemo(() => {
    let result = mockVideos

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(video => video.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(video =>
        video.title.toLowerCase().includes(query) ||
        video.description?.toLowerCase().includes(query) ||
        video.tags.some(tag => tag.toLowerCase().includes(query)) ||
        video.neighborhood?.toLowerCase().includes(query)
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

  const getEmbedUrl = (video: VideoItem) => {
    if (video.source === 'youtube') {
      // Extract video ID from YouTube URL
      const match = video.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}`
      }
    }
    return video.url
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pittsburgh Videos Gallery</h1>
          <p className="text-xl text-red-100 max-w-3xl">
            Watch videos showcasing Pittsburgh neighborhoods, events, food, culture, and more. 
            Experience the Steel City through our curated video collection.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-gray-900">{filteredVideos.length}</div>
            <div className="text-sm text-gray-600">Videos</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-gray-900">
              {new Set(filteredVideos.map(v => v.category)).size}
            </div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-gray-900">
              {filteredVideos.filter(v => v.featured).length}
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
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                      ? 'bg-red-600 text-white'
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
            {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'} found
          </div>
          <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Gallery */}
        {filteredVideos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
              >
                <div className="relative aspect-video bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black bg-opacity-50 rounded-full p-4">
                      <Play className="w-12 h-12 text-white" fill="white" />
                    </div>
                  </div>
                  {video.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Featured
                    </div>
                  )}
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{video.title}</h3>
                  {video.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{video.description}</p>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {video.tags.slice(0, 3).map((tag) => (
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
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-xl transition-shadow flex gap-6"
              >
                <div className="relative w-48 h-32 bg-gray-200 rounded-lg flex-shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black bg-opacity-50 rounded-full p-3">
                      <Play className="w-8 h-8 text-white" fill="white" />
                    </div>
                  </div>
                  {video.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Featured
                    </div>
                  )}
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{video.title}</h3>
                  {video.description && (
                    <p className="text-gray-600 mb-3">{video.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {video.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {video.neighborhood && (
                    <p className="text-sm text-gray-500">📍 {video.neighborhood}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{selectedVideo.title}</h2>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6">
              <div className="relative aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                {selectedVideo.source === 'youtube' ? (
                  <iframe
                    src={getEmbedUrl(selectedVideo)}
                    title={selectedVideo.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="w-24 h-24 text-gray-400" />
                  </div>
                )}
              </div>
              {selectedVideo.description && (
                <p className="text-gray-700 mb-4">{selectedVideo.description}</p>
              )}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedVideo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {selectedVideo.neighborhood && (
                <p className="text-gray-600 mb-4">📍 {selectedVideo.neighborhood}</p>
              )}
              <a
                href={selectedVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
              >
                Watch on {selectedVideo.source === 'youtube' ? 'YouTube' : 'Original Source'} →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

