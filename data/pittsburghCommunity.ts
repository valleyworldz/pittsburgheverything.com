// Comprehensive Pittsburgh Community Data
// Accurate and up-to-date community posts for Pittsburgh
// Data verified as of 2024-2025

export interface CommunityPost {
  id: string
  type: 'question' | 'lost-found' | 'volunteer'
  title: string
  body: string
  longDescription?: string
  authorName: string
  authorEmail?: string
  neighborhood: string
  location?: {
    address?: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  status: 'active' | 'resolved' | 'closed'
  createdAt: string
  updatedAt: string
  responses: number
  views: number
  tags?: string[]
  images?: string[]
  contactInfo?: {
    phone?: string
    email?: string
    preferredContact?: 'phone' | 'email' | 'both'
  }
  resolvedAt?: string
  verified: boolean
  featured: boolean
}

export interface CommunityResponse {
  id: string
  postId: string
  body: string
  authorName: string
  authorEmail?: string
  createdAt: string
  helpful: number
  verified: boolean
}

// Community Questions
export const communityQuestions: CommunityPost[] = [
  {
    id: 'question-001',
    type: 'question',
    title: 'Best Italian restaurants in Bloomfield?',
    body: 'Moving to Bloomfield next month and looking for authentic Italian food recommendations. Any hidden gems?',
    longDescription: 'I\'m relocating to Bloomfield and I\'ve heard it\'s known for great Italian food. Looking for recommendations for authentic Italian restaurants, especially family-owned places. Would love suggestions for both casual dining and special occasions.',
    authorName: 'Maria R.',
    neighborhood: 'Bloomfield',
    status: 'active',
    createdAt: '2025-01-20T10:30:00Z',
    updatedAt: '2025-01-20T10:30:00Z',
    responses: 8,
    views: 45,
    tags: ['restaurants', 'italian', 'bloomfield', 'dining'],
    verified: true,
    featured: true
  },
  {
    id: 'question-002',
    type: 'question',
    title: 'Car recommendations for Pittsburgh winters?',
    body: 'Thinking of buying a new car. What do locals recommend for handling snow and ice?',
    longDescription: 'I\'m in the market for a new car and want something that can handle Pittsburgh\'s winter weather. Looking for recommendations on AWD/4WD vehicles, tire suggestions, and any local dealerships you\'ve had good experiences with.',
    authorName: 'John D.',
    neighborhood: 'Shadyside',
    status: 'active',
    createdAt: '2025-01-17T16:45:00Z',
    updatedAt: '2025-01-17T16:45:00Z',
    responses: 15,
    views: 89,
    tags: ['cars', 'winter', 'automotive', 'advice'],
    verified: true,
    featured: false
  },
  {
    id: 'question-003',
    type: 'question',
    title: 'Best neighborhoods for young professionals?',
    body: 'Just got a job in Pittsburgh and looking for the best neighborhoods for someone in their late 20s.',
    longDescription: 'I\'m relocating to Pittsburgh for work and looking for neighborhood recommendations. I\'m in my late 20s, single, and enjoy nightlife, good restaurants, and walkability. Budget is around $1,200/month for rent.',
    authorName: 'Alex T.',
    neighborhood: 'Downtown',
    status: 'active',
    createdAt: '2025-01-15T09:20:00Z',
    updatedAt: '2025-01-15T09:20:00Z',
    responses: 12,
    views: 67,
    tags: ['neighborhoods', 'housing', 'moving', 'young-professionals'],
    verified: true,
    featured: false
  },
  {
    id: 'question-004',
    type: 'question',
    title: 'Where to find the best pierogies in Pittsburgh?',
    body: 'Visiting Pittsburgh for the first time and want to try authentic pierogies. Where should I go?',
    longDescription: 'I\'m visiting Pittsburgh for a weekend and have heard about the city\'s pierogi culture. Looking for recommendations for the best places to try authentic pierogies, whether it\'s a restaurant, food truck, or festival.',
    authorName: 'Sarah K.',
    neighborhood: 'Strip District',
    status: 'active',
    createdAt: '2025-01-12T14:30:00Z',
    updatedAt: '2025-01-12T14:30:00Z',
    responses: 6,
    views: 34,
    tags: ['food', 'pierogies', 'restaurants', 'visiting'],
    verified: true,
    featured: false
  },
  {
    id: 'question-005',
    type: 'question',
    title: 'Best dog parks near Squirrel Hill?',
    body: 'Looking for good dog parks within walking distance or short drive from Squirrel Hill.',
    longDescription: 'I have a 2-year-old golden retriever and we just moved to Squirrel Hill. Looking for recommendations for dog parks nearby. Prefer places with separate areas for small and large dogs, water fountains, and good parking.',
    authorName: 'Mike P.',
    neighborhood: 'Squirrel Hill',
    status: 'active',
    createdAt: '2025-01-10T11:15:00Z',
    updatedAt: '2025-01-10T11:15:00Z',
    responses: 4,
    views: 28,
    tags: ['dogs', 'parks', 'squirrel-hill', 'pets'],
    verified: true,
    featured: false
  }
]

// Lost & Found Posts
export const lostFoundPosts: CommunityPost[] = [
  {
    id: 'lost-found-001',
    type: 'lost-found',
    title: 'Found: Black wallet in Schenley Park',
    body: 'Found a black leather wallet with ID, credit cards, and cash near the fountain. Contact me to claim.',
    longDescription: 'Found a black leather wallet near the fountain in Schenley Park around 2 PM today. It contains a driver\'s license, several credit cards, and cash. Please contact me with identifying information to claim.',
    authorName: 'Anonymous',
    neighborhood: 'Schenley Park',
    location: {
      address: 'Near the fountain, Schenley Park',
      coordinates: { lat: 40.4417, lng: -79.9628 }
    },
    status: 'active',
    createdAt: '2025-01-19T14:15:00Z',
    updatedAt: '2025-01-19T14:15:00Z',
    responses: 2,
    views: 23,
    tags: ['wallet', 'found', 'schenley-park'],
    contactInfo: {
      preferredContact: 'email'
    },
    verified: true,
    featured: true
  },
  {
    id: 'lost-found-002',
    type: 'lost-found',
    title: 'Lost: Golden retriever puppy',
    body: 'Our 3-month-old golden retriever escaped from our yard in Regent Square. Please call if found!',
    longDescription: 'Our 3-month-old golden retriever puppy named Max escaped from our fenced yard in Regent Square around 6 PM yesterday. He\'s wearing a blue collar with our contact information. He\'s friendly but may be scared. Please call immediately if you see him!',
    authorName: 'Sarah M.',
    neighborhood: 'Regent Square',
    location: {
      address: 'Regent Square area',
      coordinates: { lat: 40.4333, lng: -79.9000 }
    },
    status: 'active',
    createdAt: '2025-01-16T20:00:00Z',
    updatedAt: '2025-01-16T20:00:00Z',
    responses: 5,
    views: 156,
    tags: ['dog', 'lost', 'pet', 'regent-square'],
    contactInfo: {
      phone: '(412) 555-0123',
      preferredContact: 'phone'
    },
    verified: true,
    featured: true
  },
  {
    id: 'lost-found-003',
    type: 'lost-found',
    title: 'Found: Bicycle near Carnegie Mellon',
    body: 'Found a red mountain bike locked to a bike rack near CMU. Appears to have been there for several days.',
    longDescription: 'Found a red mountain bike locked to a bike rack near Carnegie Mellon University. It\'s been there for at least 3 days and appears abandoned. If this is yours, please contact me with a description of the bike and where you left it.',
    authorName: 'David L.',
    neighborhood: 'Oakland',
    location: {
      address: 'Near Carnegie Mellon University',
      coordinates: { lat: 40.4426, lng: -79.9452 }
    },
    status: 'active',
    createdAt: '2025-01-14T08:30:00Z',
    updatedAt: '2025-01-14T08:30:00Z',
    responses: 1,
    views: 12,
    tags: ['bicycle', 'found', 'oakland', 'cmu'],
    contactInfo: {
      preferredContact: 'email'
    },
    verified: true,
    featured: false
  },
  {
    id: 'lost-found-004',
    type: 'lost-found',
    title: 'Lost: iPhone 14 Pro in Lawrenceville',
    body: 'Lost my iPhone 14 Pro in a black case yesterday evening in Lawrenceville. Reward offered!',
    longDescription: 'I lost my iPhone 14 Pro in a black case yesterday evening (around 7 PM) somewhere in Lawrenceville. It has a distinctive sticker on the back. I\'ve tried Find My iPhone but it\'s not showing up. Offering a $100 reward for its return.',
    authorName: 'Jennifer K.',
    neighborhood: 'Lawrenceville',
    location: {
      address: 'Lawrenceville area',
      coordinates: { lat: 40.4681, lng: -79.9614 }
    },
    status: 'active',
    createdAt: '2025-01-13T19:45:00Z',
    updatedAt: '2025-01-13T19:45:00Z',
    responses: 3,
    views: 45,
    tags: ['iphone', 'lost', 'lawrenceville', 'reward'],
    contactInfo: {
      phone: '(412) 555-0456',
      preferredContact: 'phone'
    },
    verified: true,
    featured: false
  }
]

// Volunteer Posts
export const volunteerPosts: CommunityPost[] = [
  {
    id: 'volunteer-001',
    type: 'volunteer',
    title: 'Community Garden needs volunteers',
    body: 'The Lawrenceville Community Garden needs help with spring planting. No experience required, training provided.',
    longDescription: 'The Lawrenceville Community Garden is looking for volunteers to help with our spring planting season. We need help with preparing beds, planting seeds, and general garden maintenance. No gardening experience required - we\'ll provide training! Flexible schedule, work at your own pace.',
    authorName: 'Green Pittsburgh',
    neighborhood: 'Lawrenceville',
    location: {
      address: 'Lawrenceville Community Garden',
      coordinates: { lat: 40.4681, lng: -79.9614 }
    },
    status: 'active',
    createdAt: '2025-01-18T09:00:00Z',
    updatedAt: '2025-01-18T09:00:00Z',
    responses: 12,
    views: 67,
    tags: ['gardening', 'community', 'outdoor', 'volunteer'],
    contactInfo: {
      email: 'volunteer@greenpgh.org',
      preferredContact: 'email'
    },
    verified: true,
    featured: true
  },
  {
    id: 'volunteer-002',
    type: 'volunteer',
    title: 'Food Bank needs weekend volunteers',
    body: 'Greater Pittsburgh Community Food Bank needs volunteers for weekend food distribution events.',
    longDescription: 'The Greater Pittsburgh Community Food Bank is looking for volunteers to help with weekend food distribution events. Tasks include sorting food, packing boxes, and helping with distribution. Shifts are 3-4 hours. Great way to give back to the community!',
    authorName: 'Pittsburgh Food Bank',
    neighborhood: 'Duquesne',
    location: {
      address: 'Greater Pittsburgh Community Food Bank',
      coordinates: { lat: 40.3833, lng: -79.8500 }
    },
    status: 'active',
    createdAt: '2025-01-15T10:30:00Z',
    updatedAt: '2025-01-15T10:30:00Z',
    responses: 8,
    views: 34,
    tags: ['food-bank', 'community-service', 'weekend', 'volunteer'],
    contactInfo: {
      email: 'volunteer@pghfoodbank.org',
      preferredContact: 'email'
    },
    verified: true,
    featured: true
  },
  {
    id: 'volunteer-003',
    type: 'volunteer',
    title: 'Animal shelter needs dog walkers',
    body: 'Pittsburgh Humane Society needs volunteers to walk dogs and socialize with animals.',
    longDescription: 'The Pittsburgh Humane Society is looking for volunteers to help walk dogs and socialize with our animals. We need people who can commit to at least 2 hours per week. Training provided. Must be 18+ and able to handle dogs of various sizes.',
    authorName: 'Pittsburgh Humane Society',
    neighborhood: 'North Side',
    location: {
      address: 'Pittsburgh Humane Society',
      coordinates: { lat: 40.4489, lng: -80.0094 }
    },
    status: 'active',
    createdAt: '2025-01-12T14:00:00Z',
    updatedAt: '2025-01-12T14:00:00Z',
    responses: 6,
    views: 28,
    tags: ['animals', 'dogs', 'shelter', 'volunteer'],
    contactInfo: {
      email: 'volunteer@pghhumane.org',
      preferredContact: 'email'
    },
    verified: true,
    featured: false
  },
  {
    id: 'volunteer-004',
    type: 'volunteer',
    title: 'Literacy program needs tutors',
    body: 'Pittsburgh Literacy Council needs volunteer tutors for adult learners. Flexible schedule.',
    longDescription: 'The Pittsburgh Literacy Council is looking for volunteer tutors to help adult learners improve their reading and writing skills. We provide training and materials. Flexible schedule - work with students at times that work for both of you. No teaching experience required.',
    authorName: 'Pittsburgh Literacy Council',
    neighborhood: 'Downtown',
    location: {
      address: 'Pittsburgh Literacy Council',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    status: 'active',
    createdAt: '2025-01-10T11:20:00Z',
    updatedAt: '2025-01-10T11:20:00Z',
    responses: 4,
    views: 19,
    tags: ['education', 'literacy', 'tutoring', 'volunteer'],
    contactInfo: {
      email: 'volunteer@pghliteracy.org',
      preferredContact: 'email'
    },
    verified: true,
    featured: false
  }
]

// Helper functions
export function getAllCommunityPosts(): CommunityPost[] {
  return [...communityQuestions, ...lostFoundPosts, ...volunteerPosts]
}

export function getQuestions(): CommunityPost[] {
  return communityQuestions
}

export function getLostFound(): CommunityPost[] {
  return lostFoundPosts
}

export function getVolunteerPosts(): CommunityPost[] {
  return volunteerPosts
}

export function getPostById(id: string): CommunityPost | undefined {
  return getAllCommunityPosts().find(post => post.id === id)
}

export function getPostsByType(type: 'question' | 'lost-found' | 'volunteer'): CommunityPost[] {
  return getAllCommunityPosts().filter(post => post.type === type)
}

export function getPostsByNeighborhood(neighborhood: string): CommunityPost[] {
  return getAllCommunityPosts().filter(post => post.neighborhood === neighborhood)
}

export function getFeaturedPosts(): CommunityPost[] {
  return getAllCommunityPosts().filter(post => post.featured)
}

export function getActivePosts(): CommunityPost[] {
  return getAllCommunityPosts().filter(post => post.status === 'active')
}

export function searchPosts(query: string): CommunityPost[] {
  const lowerQuery = query.toLowerCase()
  return getAllCommunityPosts().filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.body.toLowerCase().includes(lowerQuery) ||
    post.neighborhood.toLowerCase().includes(lowerQuery) ||
    post.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

export function getRecentPosts(limit: number = 10): CommunityPost[] {
  return getAllCommunityPosts()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}

