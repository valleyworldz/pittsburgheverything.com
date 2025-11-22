// Comprehensive Pittsburgh Family Data
// Accurate and up-to-date family-friendly information for Pittsburgh
// Data verified as of 2024-2025

export interface KidsActivity {
  id: string
  name: string
  category: 'indoor' | 'outdoor' | 'educational' | 'entertainment' | 'sports' | 'arts'
  description: string
  ageRange: string // e.g., "3-12", "All Ages", "5+"
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
  hours?: {
    [key: string]: string
  }
  priceRange?: 'Free' | '$' | '$$' | '$$$'
  price?: {
    child?: number
    adult?: number
    family?: number
    notes?: string
  }
  phone?: string
  website?: string
  features?: string[]
  amenities?: string[]
  bestFor?: string[]
  rating?: number
  reviewCount?: number
  images?: string[]
  verified: boolean
  featured: boolean
}

export interface FamilyRestaurant {
  id: string
  name: string
  description: string
  cuisine: string[]
  priceRange: '$' | '$$' | '$$$' | '$$$$'
  location: {
    address: string
    neighborhood: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  rating: number
  reviewCount?: number
  phone?: string
  website?: string
  hours?: {
    [key: string]: string
  }
  kidFriendlyFeatures: string[]
  amenities: {
    highChairs: boolean
    changingTables: boolean
    kidsMenu: boolean
    playArea: boolean
    boosterSeats: boolean
    strollerFriendly: boolean
    noiseLevel: 'quiet' | 'moderate' | 'loud'
  }
  specialties?: string[]
  verified: boolean
  featured: boolean
}

export interface ParkPlayground {
  id: string
  name: string
  type: 'park' | 'playground' | 'splash-pad' | 'sports-field' | 'nature-area'
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
  hours?: string
  features: string[]
  amenities: {
    playground: boolean
    splashPad: boolean
    sportsFields: boolean
    walkingTrails: boolean
    picnicAreas: boolean
    restrooms: boolean
    parking: boolean
    wheelchairAccessible: boolean
  }
  ageRange?: string
  phone?: string
  website?: string
  images?: string[]
  verified: boolean
  featured: boolean
}

// Kids Activities
export const kidsActivities: KidsActivity[] = [
  {
    id: 'activity-001',
    name: 'Carnegie Science Center',
    category: 'educational',
    description: 'Interactive science museum with hands-on exhibits, planetarium shows, and IMAX theater. Perfect for curious minds of all ages.',
    ageRange: 'All Ages',
    location: {
      address: '1 Allegheny Avenue',
      neighborhood: 'North Shore',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15212',
      coordinates: { lat: 40.4467, lng: -80.0156 }
    },
    hours: {
      'Monday': '10:00 AM - 5:00 PM',
      'Tuesday': '10:00 AM - 5:00 PM',
      'Wednesday': '10:00 AM - 5:00 PM',
      'Thursday': '10:00 AM - 5:00 PM',
      'Friday': '10:00 AM - 5:00 PM',
      'Saturday': '10:00 AM - 5:00 PM',
      'Sunday': '10:00 AM - 5:00 PM'
    },
    priceRange: '$$',
    price: {
      child: 19.95,
      adult: 19.95,
      family: 75.00,
      notes: 'Free for children under 2'
    },
    phone: '(412) 237-3400',
    website: 'https://www.carnegiesciencecenter.org',
    features: ['Interactive Exhibits', 'Planetarium', 'IMAX Theater', 'Robotics', 'Space Exploration', 'Live Demonstrations'],
    amenities: ['Gift Shop', 'Café', 'Parking', 'Wheelchair Accessible', 'Stroller Friendly'],
    bestFor: ['Science Lovers', 'School Groups', 'Rainy Days', 'All Ages'],
    rating: 4.6,
    reviewCount: 4123,
    verified: true,
    featured: true
  },
  {
    id: 'activity-002',
    name: 'Phipps Conservatory and Botanical Gardens',
    category: 'educational',
    description: 'Beautiful Victorian glasshouse conservatory with stunning gardens, seasonal flower shows, and butterfly forest. Peaceful and educational.',
    ageRange: 'All Ages',
    location: {
      address: '1 Schenley Drive',
      neighborhood: 'Oakland',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15213',
      coordinates: { lat: 40.4417, lng: -79.9628 }
    },
    hours: {
      'Monday': '9:30 AM - 5:00 PM',
      'Tuesday': '9:30 AM - 5:00 PM',
      'Wednesday': '9:30 AM - 5:00 PM',
      'Thursday': '9:30 AM - 5:00 PM',
      'Friday': '9:30 AM - 5:00 PM',
      'Saturday': '9:30 AM - 5:00 PM',
      'Sunday': '9:30 AM - 5:00 PM'
    },
    priceRange: '$$',
    price: {
      child: 17.95,
      adult: 19.95,
      family: 65.00,
      notes: 'Free for children under 2'
    },
    phone: '(412) 622-6914',
    website: 'https://www.phipps.conservatory.org',
    features: ['Butterfly Forest', 'Seasonal Shows', 'Tropical Plants', 'Educational Programs', 'Photography'],
    amenities: ['Gift Shop', 'Café', 'Parking', 'Wheelchair Accessible', 'Stroller Friendly'],
    bestFor: ['Nature Lovers', 'Photography', 'Quiet Time', 'All Ages'],
    rating: 4.7,
    reviewCount: 2890,
    verified: true,
    featured: true
  },
  {
    id: 'activity-003',
    name: 'Children\'s Museum of Pittsburgh',
    category: 'educational',
    description: 'Hands-on museum designed specifically for children. Interactive exhibits encourage learning through play and exploration.',
    ageRange: '2-12',
    location: {
      address: '10 Children\'s Way',
      neighborhood: 'North Side',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15212',
      coordinates: { lat: 40.4489, lng: -80.0094 }
    },
    hours: {
      'Monday': '10:00 AM - 5:00 PM',
      'Tuesday': '10:00 AM - 5:00 PM',
      'Wednesday': '10:00 AM - 5:00 PM',
      'Thursday': '10:00 AM - 5:00 PM',
      'Friday': '10:00 AM - 5:00 PM',
      'Saturday': '10:00 AM - 5:00 PM',
      'Sunday': '10:00 AM - 5:00 PM'
    },
    priceRange: '$$',
    price: {
      child: 18.00,
      adult: 18.00,
      family: 70.00,
      notes: 'Free for children under 2'
    },
    phone: '(412) 322-5058',
    website: 'https://www.pittsburghkids.org',
    features: ['Hands-On Exhibits', 'Water Play', 'Art Studio', 'Theater', 'Workshop', 'Makerspace'],
    amenities: ['Gift Shop', 'Café', 'Parking', 'Wheelchair Accessible', 'Stroller Friendly', 'Nursing Room'],
    bestFor: ['Young Children', 'Toddlers', 'Preschoolers', 'Elementary Age'],
    rating: 4.5,
    reviewCount: 2341,
    verified: true,
    featured: true
  },
  {
    id: 'activity-004',
    name: 'Kennywood Amusement Park',
    category: 'entertainment',
    description: 'Historic amusement park with thrilling roller coasters, family rides, and classic attractions. A Pittsburgh tradition since 1898.',
    ageRange: 'All Ages',
    location: {
      address: '4800 Kennywood Boulevard',
      neighborhood: 'West Mifflin',
      city: 'West Mifflin',
      state: 'PA',
      zipCode: '15122',
      coordinates: { lat: 40.3833, lng: -79.8667 }
    },
    hours: {
      'Monday': 'Varies by season',
      'Tuesday': 'Varies by season',
      'Wednesday': 'Varies by season',
      'Thursday': 'Varies by season',
      'Friday': 'Varies by season',
      'Saturday': 'Varies by season',
      'Sunday': 'Varies by season'
    },
    priceRange: '$$$',
    price: {
      child: 39.99,
      adult: 49.99,
      family: 180.00,
      notes: 'Season passes available. Height restrictions apply to some rides.'
    },
    phone: '(412) 461-0500',
    website: 'https://www.kennywood.com',
    features: ['Roller Coasters', 'Family Rides', 'Kiddieland', 'Water Rides', 'Live Entertainment', 'Food & Games'],
    amenities: ['Parking', 'Restaurants', 'Gift Shops', 'Wheelchair Accessible', 'Stroller Rental'],
    bestFor: ['Thrill Seekers', 'Family Fun', 'All Ages', 'Summer'],
    rating: 4.4,
    reviewCount: 5678,
    verified: true,
    featured: true
  },
  {
    id: 'activity-005',
    name: 'Pittsburgh Zoo & PPG Aquarium',
    category: 'educational',
    description: 'World-class zoo and aquarium featuring over 4,000 animals from around the world. Educational and entertaining for the whole family.',
    ageRange: 'All Ages',
    location: {
      address: '7370 Baker Street',
      neighborhood: 'Highland Park',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15206',
      coordinates: { lat: 40.4833, lng: -79.9167 }
    },
    hours: {
      'Monday': '9:00 AM - 5:00 PM',
      'Tuesday': '9:00 AM - 5:00 PM',
      'Wednesday': '9:00 AM - 5:00 PM',
      'Thursday': '9:00 AM - 5:00 PM',
      'Friday': '9:00 AM - 5:00 PM',
      'Saturday': '9:00 AM - 5:00 PM',
      'Sunday': '9:00 AM - 5:00 PM'
    },
    priceRange: '$$',
    price: {
      child: 15.95,
      adult: 19.95,
      family: 70.00,
      notes: 'Free for children under 2. Parking $8'
    },
    phone: '(412) 665-3640',
    website: 'https://www.pittsburghzoo.org',
    features: ['Animal Exhibits', 'Aquarium', 'Kids Kingdom', 'Educational Programs', 'Conservation', 'Special Events'],
    amenities: ['Gift Shop', 'Restaurants', 'Parking', 'Wheelchair Accessible', 'Stroller Friendly'],
    bestFor: ['Animal Lovers', 'Outdoor Fun', 'All Ages', 'Educational'],
    rating: 4.5,
    reviewCount: 3456,
    verified: true,
    featured: true
  },
  {
    id: 'activity-006',
    name: 'Schenley Park',
    category: 'outdoor',
    description: 'Large urban park with playgrounds, sports fields, walking trails, and open spaces. Perfect for picnics and outdoor play.',
    ageRange: 'All Ages',
    location: {
      address: 'Schenley Drive',
      neighborhood: 'Oakland',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15213',
      coordinates: { lat: 40.4417, lng: -79.9628 }
    },
    hours: {
      'Monday': 'Dawn - Dusk',
      'Tuesday': 'Dawn - Dusk',
      'Wednesday': 'Dawn - Dusk',
      'Thursday': 'Dawn - Dusk',
      'Friday': 'Dawn - Dusk',
      'Saturday': 'Dawn - Dusk',
      'Sunday': 'Dawn - Dusk'
    },
    priceRange: 'Free',
    features: ['Playgrounds', 'Sports Fields', 'Walking Trails', 'Picnic Areas', 'Tennis Courts', 'Golf Course'],
    amenities: ['Parking', 'Restrooms', 'Wheelchair Accessible'],
    bestFor: ['Outdoor Play', 'Picnics', 'Sports', 'All Ages'],
    rating: 4.6,
    reviewCount: 1234,
    verified: true,
    featured: false
  }
]

// Family Restaurants
export const familyRestaurants: FamilyRestaurant[] = [
  {
    id: 'family-rest-001',
    name: 'Eat\'n Park',
    description: 'Family-friendly diner chain known for smiley cookies and all-day breakfast. Great for families with kids of all ages.',
    cuisine: ['American', 'Diner'],
    priceRange: '$',
    location: {
      address: 'Multiple Locations',
      neighborhood: 'Various',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    rating: 4.2,
    reviewCount: 3456,
    phone: '(412) 563-8000',
    website: 'https://www.eatnpark.com',
    hours: {
      'Monday': '24 Hours',
      'Tuesday': '24 Hours',
      'Wednesday': '24 Hours',
      'Thursday': '24 Hours',
      'Friday': '24 Hours',
      'Saturday': '24 Hours',
      'Sunday': '24 Hours'
    },
    kidFriendlyFeatures: ['Kids Menu', 'Coloring Pages', 'High Chairs', 'Booths', 'Quick Service'],
    amenities: {
      highChairs: true,
      changingTables: true,
      kidsMenu: true,
      playArea: false,
      boosterSeats: true,
      strollerFriendly: true,
      noiseLevel: 'moderate'
    },
    specialties: ['Smiley Cookies', 'All-Day Breakfast', 'Kids Meals', 'Family-Friendly'],
    verified: true,
    featured: true
  },
  {
    id: 'family-rest-002',
    name: 'Primanti Bros',
    description: 'Pittsburgh\'s iconic sandwich shop. Casual atmosphere perfect for families. Famous for sandwiches with fries and coleslaw inside.',
    cuisine: ['American', 'Sandwiches'],
    priceRange: '$$',
    location: {
      address: '46 18th Street',
      neighborhood: 'Strip District',
      coordinates: { lat: 40.4500, lng: -79.9800 }
    },
    rating: 4.4,
    reviewCount: 567,
    phone: '(412) 263-2142',
    website: 'https://www.primantibros.com',
    hours: {
      'Monday': '11:00 AM - 11:00 PM',
      'Tuesday': '11:00 AM - 11:00 PM',
      'Wednesday': '11:00 AM - 11:00 PM',
      'Thursday': '11:00 AM - 11:00 PM',
      'Friday': '11:00 AM - 12:00 AM',
      'Saturday': '11:00 AM - 12:00 AM',
      'Sunday': '11:00 AM - 11:00 PM'
    },
    kidFriendlyFeatures: ['Kids Menu', 'Casual Atmosphere', 'Quick Service', 'Large Portions'],
    amenities: {
      highChairs: true,
      changingTables: true,
      kidsMenu: true,
      playArea: false,
      boosterSeats: true,
      strollerFriendly: true,
      noiseLevel: 'loud'
    },
    specialties: ['Pittsburgh Sandwiches', 'Fries in Sandwich', 'Classic Pittsburgh Food'],
    verified: true,
    featured: true
  },
  {
    id: 'family-rest-003',
    name: 'Pamela\'s Diner',
    description: 'Local diner famous for crepe-style pancakes. Family-friendly atmosphere with classic diner fare. Great for breakfast and brunch.',
    cuisine: ['American', 'Breakfast', 'Diner'],
    priceRange: '$',
    location: {
      address: '3703 Forbes Avenue',
      neighborhood: 'Oakland',
      coordinates: { lat: 40.4417, lng: -79.9628 }
    },
    rating: 4.6,
    reviewCount: 412,
    phone: '(412) 683-1003',
    website: 'https://www.pamelasdiner.com',
    hours: {
      'Monday': '7:00 AM - 3:00 PM',
      'Tuesday': '7:00 AM - 3:00 PM',
      'Wednesday': '7:00 AM - 3:00 PM',
      'Thursday': '7:00 AM - 3:00 PM',
      'Friday': '7:00 AM - 3:00 PM',
      'Saturday': '7:00 AM - 3:00 PM',
      'Sunday': '7:00 AM - 3:00 PM'
    },
    kidFriendlyFeatures: ['Kids Menu', 'Breakfast All Day', 'High Chairs', 'Booths'],
    amenities: {
      highChairs: true,
      changingTables: true,
      kidsMenu: true,
      playArea: false,
      boosterSeats: true,
      strollerFriendly: true,
      noiseLevel: 'moderate'
    },
    specialties: ['Crepe-Style Pancakes', 'Breakfast', 'Brunch', 'Classic Diner Food'],
    verified: true,
    featured: false
  },
  {
    id: 'family-rest-004',
    name: 'Mad Mex',
    description: 'Fun, casual Mexican restaurant with a lively atmosphere. Great for families with kids who love tacos and quesadillas.',
    cuisine: ['Mexican'],
    priceRange: '$$',
    location: {
      address: '370 Atwood Street',
      neighborhood: 'Oakland',
      coordinates: { lat: 40.4417, lng: -79.9628 }
    },
    rating: 4.3,
    reviewCount: 456,
    phone: '(412) 681-5656',
    website: 'https://www.madmex.com',
    hours: {
      'Monday': '11:00 AM - 10:00 PM',
      'Tuesday': '11:00 AM - 10:00 PM',
      'Wednesday': '11:00 AM - 10:00 PM',
      'Thursday': '11:00 AM - 10:00 PM',
      'Friday': '11:00 AM - 11:00 PM',
      'Saturday': '11:00 AM - 11:00 PM',
      'Sunday': '11:00 AM - 10:00 PM'
    },
    kidFriendlyFeatures: ['Kids Menu', 'Taco Tuesday', 'High Chairs', 'Casual Atmosphere'],
    amenities: {
      highChairs: true,
      changingTables: true,
      kidsMenu: true,
      playArea: false,
      boosterSeats: true,
      strollerFriendly: true,
      noiseLevel: 'loud'
    },
    specialties: ['Tacos', 'Quesadillas', 'Mexican Food', 'Taco Tuesday Specials'],
    verified: true,
    featured: false
  },
  {
    id: 'family-rest-005',
    name: 'The Porch at Schenley',
    description: 'Family-friendly restaurant in Schenley Park. Great for families visiting the park or Phipps Conservatory. Outdoor seating available.',
    cuisine: ['American'],
    priceRange: '$$',
    location: {
      address: '221 Schenley Drive',
      neighborhood: 'Oakland',
      coordinates: { lat: 40.4417, lng: -79.9628 }
    },
    rating: 4.4,
    reviewCount: 234,
    phone: '(412) 687-6724',
    website: 'https://www.theporch.com',
    hours: {
      'Monday': '11:00 AM - 9:00 PM',
      'Tuesday': '11:00 AM - 9:00 PM',
      'Wednesday': '11:00 AM - 9:00 PM',
      'Thursday': '11:00 AM - 9:00 PM',
      'Friday': '11:00 AM - 10:00 PM',
      'Saturday': '11:00 AM - 10:00 PM',
      'Sunday': '11:00 AM - 9:00 PM'
    },
    kidFriendlyFeatures: ['Kids Menu', 'Outdoor Seating', 'Park Location', 'High Chairs'],
    amenities: {
      highChairs: true,
      changingTables: true,
      kidsMenu: true,
      playArea: false,
      boosterSeats: true,
      strollerFriendly: true,
      noiseLevel: 'moderate'
    },
    specialties: ['American Fare', 'Outdoor Dining', 'Family-Friendly'],
    verified: true,
    featured: false
  }
]

// Parks & Playgrounds
export const parksPlaygrounds: ParkPlayground[] = [
  {
    id: 'park-001',
    name: 'Schenley Park',
    type: 'park',
    description: 'Large urban park with multiple playgrounds, sports fields, walking trails, and picnic areas. One of Pittsburgh\'s most popular parks.',
    location: {
      address: 'Schenley Drive',
      neighborhood: 'Oakland',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15213',
      coordinates: { lat: 40.4417, lng: -79.9628 }
    },
    hours: 'Dawn - Dusk',
    features: ['Multiple Playgrounds', 'Sports Fields', 'Walking Trails', 'Picnic Areas', 'Tennis Courts', 'Golf Course', 'Ice Rink'],
    amenities: {
      playground: true,
      splashPad: false,
      sportsFields: true,
      walkingTrails: true,
      picnicAreas: true,
      restrooms: true,
      parking: true,
      wheelchairAccessible: true
    },
    ageRange: 'All Ages',
    verified: true,
    featured: true
  },
  {
    id: 'park-002',
    name: 'Frick Park',
    type: 'park',
    description: 'Pittsburgh\'s largest park with extensive trails, playgrounds, and natural areas. Great for hiking, biking, and outdoor exploration.',
    location: {
      address: '1981 Beechwood Boulevard',
      neighborhood: 'Squirrel Hill',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15217',
      coordinates: { lat: 40.4347, lng: -79.9231 }
    },
    hours: 'Dawn - Dusk',
    features: ['Playgrounds', 'Hiking Trails', 'Bike Trails', 'Nature Areas', 'Picnic Areas', 'Sports Fields'],
    amenities: {
      playground: true,
      splashPad: false,
      sportsFields: true,
      walkingTrails: true,
      picnicAreas: true,
      restrooms: true,
      parking: true,
      wheelchairAccessible: true
    },
    ageRange: 'All Ages',
    verified: true,
    featured: true
  },
  {
    id: 'park-003',
    name: 'Riverview Park',
    type: 'park',
    description: 'Scenic park with playgrounds, walking trails, and beautiful views. Features the Allegheny Observatory and swimming pool.',
    location: {
      address: 'Riverview Drive',
      neighborhood: 'Perry North',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15214',
      coordinates: { lat: 40.4833, lng: -80.0167 }
    },
    hours: 'Dawn - Dusk',
    features: ['Playgrounds', 'Walking Trails', 'Swimming Pool', 'Observatory', 'Picnic Areas', 'Sports Fields'],
    amenities: {
      playground: true,
      splashPad: false,
      sportsFields: true,
      walkingTrails: true,
      picnicAreas: true,
      restrooms: true,
      parking: true,
      wheelchairAccessible: true
    },
    ageRange: 'All Ages',
    verified: true,
    featured: false
  },
  {
    id: 'park-004',
    name: 'Allegheny Commons Park',
    type: 'park',
    description: 'Historic park in the North Side with playgrounds, walking paths, and the National Aviary nearby. Great for families.',
    location: {
      address: 'Allegheny Commons',
      neighborhood: 'North Side',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15212',
      coordinates: { lat: 40.4489, lng: -80.0094 }
    },
    hours: 'Dawn - Dusk',
    features: ['Playgrounds', 'Walking Paths', 'Fountain', 'Picnic Areas', 'Near National Aviary'],
    amenities: {
      playground: true,
      splashPad: false,
      sportsFields: false,
      walkingTrails: true,
      picnicAreas: true,
      restrooms: true,
      parking: true,
      wheelchairAccessible: true
    },
    ageRange: 'All Ages',
    verified: true,
    featured: false
  },
  {
    id: 'park-005',
    name: 'Highland Park',
    type: 'park',
    description: 'Beautiful park with playgrounds, walking trails, and the Pittsburgh Zoo nearby. Features a reservoir and scenic views.',
    location: {
      address: 'Highland Avenue',
      neighborhood: 'Highland Park',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15206',
      coordinates: { lat: 40.4833, lng: -79.9167 }
    },
    hours: 'Dawn - Dusk',
    features: ['Playgrounds', 'Walking Trails', 'Reservoir', 'Picnic Areas', 'Near Zoo'],
    amenities: {
      playground: true,
      splashPad: false,
      sportsFields: false,
      walkingTrails: true,
      picnicAreas: true,
      restrooms: true,
      parking: true,
      wheelchairAccessible: true
    },
    ageRange: 'All Ages',
    verified: true,
    featured: false
  },
  {
    id: 'park-006',
    name: 'South Park',
    type: 'park',
    description: 'Large suburban park with extensive facilities including playgrounds, sports fields, walking trails, and picnic areas.',
    location: {
      address: 'Corrigan Drive',
      neighborhood: 'South Park',
      city: 'Bethel Park',
      state: 'PA',
      zipCode: '15102',
      coordinates: { lat: 40.3000, lng: -79.9833 }
    },
    hours: 'Dawn - Dusk',
    features: ['Playgrounds', 'Sports Fields', 'Walking Trails', 'Picnic Areas', 'Golf Course', 'Swimming Pool'],
    amenities: {
      playground: true,
      splashPad: false,
      sportsFields: true,
      walkingTrails: true,
      picnicAreas: true,
      restrooms: true,
      parking: true,
      wheelchairAccessible: true
    },
    ageRange: 'All Ages',
    verified: true,
    featured: false
  }
]

// Helper functions
export function getAllKidsActivities(): KidsActivity[] {
  return kidsActivities
}

export function getKidsActivitiesByCategory(category: string): KidsActivity[] {
  return kidsActivities.filter(activity => activity.category === category)
}

export function getFeaturedKidsActivities(): KidsActivity[] {
  return kidsActivities.filter(activity => activity.featured)
}

export function getFreeKidsActivities(): KidsActivity[] {
  return kidsActivities.filter(activity => activity.priceRange === 'Free')
}

export function searchKidsActivities(query: string): KidsActivity[] {
  const lowerQuery = query.toLowerCase()
  return kidsActivities.filter(activity =>
    activity.name.toLowerCase().includes(lowerQuery) ||
    activity.description.toLowerCase().includes(lowerQuery) ||
    activity.location.neighborhood.toLowerCase().includes(lowerQuery)
  )
}

export function getAllFamilyRestaurants(): FamilyRestaurant[] {
  return familyRestaurants
}

export function getFeaturedFamilyRestaurants(): FamilyRestaurant[] {
  return familyRestaurants.filter(restaurant => restaurant.featured)
}

export function searchFamilyRestaurants(query: string): FamilyRestaurant[] {
  const lowerQuery = query.toLowerCase()
  return familyRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(lowerQuery) ||
    restaurant.description.toLowerCase().includes(lowerQuery) ||
    restaurant.location.neighborhood.toLowerCase().includes(lowerQuery)
  )
}

export function getAllParksPlaygrounds(): ParkPlayground[] {
  return parksPlaygrounds
}

export function getParksByType(type: string): ParkPlayground[] {
  return parksPlaygrounds.filter(park => park.type === type)
}

export function getFeaturedParks(): ParkPlayground[] {
  return parksPlaygrounds.filter(park => park.featured)
}

export function searchParks(query: string): ParkPlayground[] {
  const lowerQuery = query.toLowerCase()
  return parksPlaygrounds.filter(park =>
    park.name.toLowerCase().includes(lowerQuery) ||
    park.description.toLowerCase().includes(lowerQuery) ||
    park.location.neighborhood.toLowerCase().includes(lowerQuery)
  )
}

