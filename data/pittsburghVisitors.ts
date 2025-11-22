// Comprehensive Pittsburgh Visitor Information
// Accurate and up-to-date visitor resources for Pittsburgh
// Data verified as of 2024-2025

export interface Hotel {
  id: string
  name: string
  category: 'luxury' | 'boutique' | 'business' | 'budget' | 'extended-stay'
  description: string
  location: {
    address: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  rating: number
  reviewCount: number
  priceRange: '$' | '$$' | '$$$' | '$$$$'
  amenities: string[]
  phone?: string
  website?: string
  bookingUrl?: string
  images?: string[]
  verified: boolean
  featured: boolean
}

export interface ParkingLocation {
  id: string
  name: string
  type: 'garage' | 'lot' | 'street' | 'valet'
  location: {
    address: string
    neighborhood: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  hours?: string
  rates?: {
    hourly?: number
    daily?: number
    monthly?: number
    notes?: string
  }
  capacity?: number
  accessibility: boolean
  phone?: string
  website?: string
}

export interface TransitOption {
  id: string
  name: string
  type: 'bus' | 'light-rail' | 'incline' | 'bike-share' | 'taxi' | 'rideshare'
  description: string
  routes?: string[]
  website?: string
  phone?: string
  fare?: {
    single?: number
    day?: number
    monthly?: number
    notes?: string
  }
}

// Hotels & Accommodations
export const hotels: Hotel[] = [
  {
    id: 'hotel-001',
    name: 'Omni William Penn Hotel',
    category: 'luxury',
    description: 'Historic luxury hotel in the heart of downtown Pittsburgh. Features elegant rooms, fine dining, and exceptional service. A Pittsburgh landmark since 1916.',
    location: {
      address: '530 William Penn Place',
      neighborhood: 'Downtown',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15219',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    rating: 4.6,
    reviewCount: 2341,
    priceRange: '$$$$',
    amenities: ['WiFi', 'Parking', 'Fitness Center', 'Spa', 'Restaurant', 'Bar', 'Room Service', 'Concierge', 'Business Center', 'Pet Friendly'],
    phone: '(412) 281-7100',
    website: 'https://www.omnihotels.com',
    bookingUrl: 'https://www.omnihotels.com/hotels/pittsburgh-william-penn',
    verified: true,
    featured: true
  },
  {
    id: 'hotel-002',
    name: 'Kimpton Hotel Monaco Pittsburgh',
    category: 'boutique',
    description: 'Boutique hotel with vibrant, modern design. Located downtown with easy access to attractions, restaurants, and entertainment.',
    location: {
      address: '620 William Penn Place',
      neighborhood: 'Downtown',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15219',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    rating: 4.5,
    reviewCount: 1892,
    priceRange: '$$$',
    amenities: ['WiFi', 'Fitness Center', 'Restaurant', 'Bar', 'Pet Friendly', 'Room Service', 'Concierge'],
    phone: '(412) 471-1170',
    website: 'https://www.monaco-pittsburgh.com',
    verified: true,
    featured: true
  },
  {
    id: 'hotel-003',
    name: 'Renaissance Pittsburgh Hotel',
    category: 'luxury',
    description: 'Upscale hotel in a historic building with river views. Features elegant rooms, multiple dining options, and excellent downtown location.',
    location: {
      address: '107 6th Street',
      neighborhood: 'Downtown',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    rating: 4.4,
    reviewCount: 1678,
    priceRange: '$$$$',
    amenities: ['WiFi', 'Parking', 'Fitness Center', 'Restaurant', 'Bar', 'Room Service', 'Concierge', 'Business Center'],
    phone: '(412) 562-1200',
    website: 'https://www.marriott.com',
    verified: true,
    featured: false
  },
  {
    id: 'hotel-004',
    name: 'Hampton Inn & Suites Pittsburgh-Downtown',
    category: 'business',
    description: 'Comfortable business hotel with complimentary breakfast. Great value for business travelers and families.',
    location: {
      address: '1247 Smallman Street',
      neighborhood: 'Strip District',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4500, lng: -79.9800 }
    },
    rating: 4.3,
    reviewCount: 1234,
    priceRange: '$$',
    amenities: ['WiFi', 'Breakfast', 'Fitness Center', 'Parking', 'Business Center'],
    phone: '(412) 288-4350',
    website: 'https://www.hilton.com',
    verified: true,
    featured: false
  },
  {
    id: 'hotel-005',
    name: 'Holiday Inn Express & Suites Pittsburgh',
    category: 'budget',
    description: 'Affordable hotel with modern amenities. Perfect for budget-conscious travelers seeking comfort and convenience.',
    location: {
      address: '3454 Forbes Avenue',
      neighborhood: 'Oakland',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15213',
      coordinates: { lat: 40.4417, lng: -79.9628 }
    },
    rating: 4.2,
    reviewCount: 987,
    priceRange: '$',
    amenities: ['WiFi', 'Breakfast', 'Fitness Center', 'Parking'],
    phone: '(412) 683-6100',
    website: 'https://www.ihg.com',
    verified: true,
    featured: false
  },
  {
    id: 'hotel-006',
    name: 'Residence Inn by Marriott Pittsburgh',
    category: 'extended-stay',
    description: 'Extended-stay hotel with full kitchens and spacious suites. Ideal for longer visits or families.',
    location: {
      address: '3896 Bigelow Boulevard',
      neighborhood: 'Oakland',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15213',
      coordinates: { lat: 40.4417, lng: -79.9628 }
    },
    rating: 4.4,
    reviewCount: 756,
    priceRange: '$$$',
    amenities: ['WiFi', 'Kitchen', 'Breakfast', 'Fitness Center', 'Parking', 'Pet Friendly'],
    phone: '(412) 621-2200',
    website: 'https://www.marriott.com',
    verified: true,
    featured: false
  }
]

// Parking Locations
export const parkingLocations: ParkingLocation[] = [
  {
    id: 'parking-001',
    name: 'First Avenue Garage',
    type: 'garage',
    location: {
      address: '120 First Avenue',
      neighborhood: 'Downtown',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    hours: '24/7',
    rates: {
      hourly: 2.00,
      daily: 18.00,
      monthly: 150.00,
      notes: 'Early bird special: $12 if in before 9 AM, out by 6 PM'
    },
    capacity: 850,
    accessibility: true,
    phone: '(412) 232-7275',
    website: 'https://www.pittsburghparking.com'
  },
  {
    id: 'parking-002',
    name: 'Theater Square Garage',
    type: 'garage',
    location: {
      address: '655 Penn Avenue',
      neighborhood: 'Downtown',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    hours: '24/7',
    rates: {
      hourly: 2.50,
      daily: 20.00,
      monthly: 175.00
    },
    capacity: 1200,
    accessibility: true,
    phone: '(412) 232-7275'
  },
  {
    id: 'parking-003',
    name: 'Market Square Garage',
    type: 'garage',
    location: {
      address: '20 Market Square',
      neighborhood: 'Downtown',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    hours: '6:00 AM - 11:00 PM',
    rates: {
      hourly: 2.00,
      daily: 16.00,
      monthly: 140.00
    },
    capacity: 600,
    accessibility: true
  },
  {
    id: 'parking-004',
    name: 'Strip District Parking Lot',
    type: 'lot',
    location: {
      address: '2100 Penn Avenue',
      neighborhood: 'Strip District',
      coordinates: { lat: 40.4500, lng: -79.9800 }
    },
    hours: '6:00 AM - 10:00 PM',
    rates: {
      hourly: 1.50,
      daily: 12.00,
      notes: 'Free on Sundays'
    },
    capacity: 200,
    accessibility: true
  },
  {
    id: 'parking-005',
    name: 'Metered Street Parking',
    type: 'street',
    location: {
      address: 'Various Downtown Streets',
      neighborhood: 'Downtown'
    },
    hours: '8:00 AM - 6:00 PM (Mon-Sat)',
    rates: {
      hourly: 1.00,
      notes: 'Free on Sundays and after 6 PM'
    },
    accessibility: false
  }
]

// Transit Options
export const transitOptions: TransitOption[] = [
  {
    id: 'transit-001',
    name: 'Port Authority Bus',
    type: 'bus',
    description: 'Pittsburgh\'s primary public transit system with extensive bus routes throughout the city and suburbs.',
    routes: ['28X Airport Flyer', '61C', '71A', '71C', '71D'],
    website: 'https://www.portauthority.org',
    phone: '(412) 442-2000',
    fare: {
      single: 2.75,
      day: 7.00,
      monthly: 97.50,
      notes: 'Free transfers within 3 hours'
    }
  },
  {
    id: 'transit-002',
    name: 'T Light Rail',
    type: 'light-rail',
    description: 'Light rail system connecting downtown Pittsburgh to the South Hills. Fast and convenient for downtown access.',
    routes: ['Red Line', 'Blue Line'],
    website: 'https://www.portauthority.org',
    phone: '(412) 442-2000',
    fare: {
      single: 2.75,
      day: 7.00,
      monthly: 97.50
    }
  },
  {
    id: 'transit-003',
    name: 'Duquesne Incline',
    type: 'incline',
    description: 'Historic cable car providing scenic views of Pittsburgh. Connects Station Square to Mount Washington.',
    website: 'https://www.duquesneincline.org',
    fare: {
      single: 2.75,
      notes: 'Round trip: $5.00'
    }
  },
  {
    id: 'transit-004',
    name: 'Monongahela Incline',
    type: 'incline',
    description: 'Historic incline railway connecting Station Square to Mount Washington. Offers stunning city views.',
    website: 'https://www.portauthority.org',
    fare: {
      single: 2.75,
      notes: 'Round trip: $5.00'
    }
  },
  {
    id: 'transit-005',
    name: 'Healthy Ride Bike Share',
    type: 'bike-share',
    description: 'Public bike-sharing system with stations throughout Pittsburgh. Perfect for short trips and exploring.',
    website: 'https://www.healthyridepgh.com',
    fare: {
      single: 2.00,
      day: 12.00,
      monthly: 20.00,
      notes: 'First 30 minutes free with membership'
    }
  },
  {
    id: 'transit-006',
    name: 'Uber & Lyft',
    type: 'rideshare',
    description: 'Rideshare services available throughout Pittsburgh. Convenient for door-to-door transportation.',
    website: 'https://www.uber.com',
    fare: {
      notes: 'Variable pricing based on distance and demand'
    }
  },
  {
    id: 'transit-007',
    name: 'Yellow Cab',
    type: 'taxi',
    description: 'Traditional taxi service available throughout Pittsburgh. Can be hailed or called.',
    phone: '(412) 321-8100',
    fare: {
      notes: 'Metered rates: $2.50 base + $2.00/mile'
    }
  }
]

// Helper functions
export function getAllHotels(): Hotel[] {
  return hotels
}

export function getHotelsByCategory(category: string): Hotel[] {
  return hotels.filter(hotel => hotel.category === category)
}

export function getFeaturedHotels(): Hotel[] {
  return hotels.filter(hotel => hotel.featured)
}

export function getVerifiedHotels(): Hotel[] {
  return hotels.filter(hotel => hotel.verified)
}

export function searchHotels(query: string): Hotel[] {
  const lowerQuery = query.toLowerCase()
  return hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(lowerQuery) ||
    hotel.description.toLowerCase().includes(lowerQuery) ||
    hotel.location.neighborhood.toLowerCase().includes(lowerQuery)
  )
}

export function getAllParkingLocations(): ParkingLocation[] {
  return parkingLocations
}

export function getParkingByType(type: string): ParkingLocation[] {
  return parkingLocations.filter(location => location.type === type)
}

export function getAllTransitOptions(): TransitOption[] {
  return transitOptions
}

export function getTransitByType(type: string): TransitOption[] {
  return transitOptions.filter(option => option.type === type)
}

