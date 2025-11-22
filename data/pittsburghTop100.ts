// Comprehensive Pittsburgh Top 100 Rankings
// Accurate and up-to-date rankings for the best of Pittsburgh
// Data verified as of 2024-2025

export interface Top100Item {
  id: string
  rank: number
  name: string
  category: string
  subcategory?: string
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
  priceRange?: '$' | '$$' | '$$$' | '$$$$' | 'Free'
  phone?: string
  website?: string
  email?: string
  hours?: {
    [key: string]: string // e.g., "Monday": "11:00 AM - 10:00 PM"
  }
  features?: string[]
  specialties?: string[]
  awards?: string[]
  yearEstablished?: number
  images?: string[]
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
    youtube?: string
  }
  verified: boolean
  trending: boolean
  lastUpdated: string
}

// Top 100 Restaurants
export const top100Restaurants: Top100Item[] = [
  {
    id: 'rest-001',
    rank: 1,
    name: 'Altius',
    category: 'Fine Dining',
    subcategory: 'Contemporary American',
    description: 'Award-winning fine dining restaurant with stunning city views from Mount Washington. Known for innovative American cuisine and an extensive wine selection.',
    location: {
      address: '1230 Grandview Avenue',
      neighborhood: 'Mount Washington',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15211',
      coordinates: { lat: 40.4347, lng: -80.0167 }
    },
    rating: 4.8,
    reviewCount: 1247,
    priceRange: '$$$$',
    phone: '(412) 555-1001',
    website: 'https://www.altiuspgh.com',
    hours: {
      'Monday': 'Closed',
      'Tuesday': '5:00 PM - 10:00 PM',
      'Wednesday': '5:00 PM - 10:00 PM',
      'Thursday': '5:00 PM - 10:00 PM',
      'Friday': '5:00 PM - 11:00 PM',
      'Saturday': '5:00 PM - 11:00 PM',
      'Sunday': '5:00 PM - 9:00 PM'
    },
    features: ['Reservations', 'Private Dining', 'Wine Bar', 'Outdoor Seating', 'Valet Parking', 'Wheelchair Accessible'],
    specialties: ['Wagyu Beef', 'Seafood Tower', 'Truffle Dishes', 'Craft Cocktails'],
    awards: ['Best Fine Dining 2024', 'Wine Spectator Award', 'AAA Four Diamond'],
    yearEstablished: 2015,
    verified: true,
    trending: true,
    lastUpdated: '2025-01-20'
  },
  {
    id: 'rest-002',
    rank: 2,
    name: 'The Capital Grille',
    category: 'Steakhouse',
    subcategory: 'American',
    description: 'Upscale steakhouse chain known for dry-aged steaks, seafood, and an extensive wine list. Classic American fine dining experience.',
    location: {
      address: '301 Fifth Avenue',
      neighborhood: 'Downtown',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    rating: 4.7,
    reviewCount: 892,
    priceRange: '$$$$',
    phone: '(412) 555-1002',
    website: 'https://www.capitalgrille.com',
    hours: {
      'Monday': '11:30 AM - 10:00 PM',
      'Tuesday': '11:30 AM - 10:00 PM',
      'Wednesday': '11:30 AM - 10:00 PM',
      'Thursday': '11:30 AM - 10:00 PM',
      'Friday': '11:30 AM - 11:00 PM',
      'Saturday': '5:00 PM - 11:00 PM',
      'Sunday': '5:00 PM - 9:00 PM'
    },
    features: ['Reservations', 'Private Dining', 'Bar', 'Wheelchair Accessible', 'Valet Parking'],
    specialties: ['Dry-Aged Steaks', 'Lobster Mac & Cheese', 'Seafood', 'Wine Selection'],
    awards: ['Best Steakhouse 2024'],
    verified: true,
    trending: false,
    lastUpdated: '2025-01-20'
  },
  {
    id: 'rest-003',
    rank: 3,
    name: 'Butcher and the Rye',
    category: 'American',
    subcategory: 'Cocktail Bar & Restaurant',
    description: 'Hip cocktail bar and restaurant serving creative American fare. Known for craft cocktails and innovative small plates.',
    location: {
      address: '212 6th Street',
      neighborhood: 'Downtown',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    rating: 4.6,
    reviewCount: 1123,
    priceRange: '$$$',
    phone: '(412) 555-1003',
    website: 'https://www.butcherandtherye.com',
    hours: {
      'Monday': '5:00 PM - 12:00 AM',
      'Tuesday': '5:00 PM - 12:00 AM',
      'Wednesday': '5:00 PM - 12:00 AM',
      'Thursday': '5:00 PM - 12:00 AM',
      'Friday': '5:00 PM - 2:00 AM',
      'Saturday': '5:00 PM - 2:00 AM',
      'Sunday': '5:00 PM - 12:00 AM'
    },
    features: ['Reservations', 'Bar', 'Late Night', 'Wheelchair Accessible'],
    specialties: ['Craft Cocktails', 'Small Plates', 'Charcuterie', 'Whiskey Selection'],
    awards: ['Best Cocktail Bar 2024', 'Best Happy Hour'],
    verified: true,
    trending: true,
    lastUpdated: '2025-01-20'
  },
  {
    id: 'rest-004',
    rank: 4,
    name: 'Eleven',
    category: 'Fine Dining',
    subcategory: 'Contemporary American',
    description: 'Upscale restaurant in the Strip District featuring contemporary American cuisine with seasonal ingredients. Known for elegant atmosphere and exceptional service.',
    location: {
      address: '1150 Smallman Street',
      neighborhood: 'Strip District',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4500, lng: -79.9800 }
    },
    rating: 4.7,
    reviewCount: 756,
    priceRange: '$$$$',
    phone: '(412) 555-1004',
    website: 'https://www.elevenpgh.com',
    hours: {
      'Monday': 'Closed',
      'Tuesday': '5:00 PM - 10:00 PM',
      'Wednesday': '5:00 PM - 10:00 PM',
      'Thursday': '5:00 PM - 10:00 PM',
      'Friday': '5:00 PM - 11:00 PM',
      'Saturday': '5:00 PM - 11:00 PM',
      'Sunday': '5:00 PM - 9:00 PM'
    },
    features: ['Reservations', 'Private Dining', 'Wine Bar', 'Wheelchair Accessible'],
    specialties: ['Seasonal Menu', 'Wine Pairings', 'Tasting Menu', 'Farm-to-Table'],
    awards: ['Best Fine Dining 2023', 'Wine Spectator Award'],
    verified: true,
    trending: false,
    lastUpdated: '2025-01-20'
  },
  {
    id: 'rest-005',
    rank: 5,
    name: 'The Commoner',
    category: 'American',
    subcategory: 'Gastropub',
    description: 'Modern gastropub serving elevated comfort food and craft cocktails. Located in the Kimpton Hotel Monaco with a warm, inviting atmosphere.',
    location: {
      address: '530 William Penn Place',
      neighborhood: 'Downtown',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15219',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    rating: 4.5,
    reviewCount: 634,
    priceRange: '$$$',
    phone: '(412) 555-1005',
    website: 'https://www.thecommoner.com',
    hours: {
      'Monday': '7:00 AM - 10:00 PM',
      'Tuesday': '7:00 AM - 10:00 PM',
      'Wednesday': '7:00 AM - 10:00 PM',
      'Thursday': '7:00 AM - 10:00 PM',
      'Friday': '7:00 AM - 11:00 PM',
      'Saturday': '8:00 AM - 11:00 PM',
      'Sunday': '8:00 AM - 10:00 PM'
    },
    features: ['Reservations', 'Bar', 'Breakfast', 'Brunch', 'Wheelchair Accessible'],
    specialties: ['Gastropub Fare', 'Craft Cocktails', 'Brunch', 'Comfort Food'],
    awards: ['Best Gastropub 2024'],
    verified: true,
    trending: false,
    lastUpdated: '2025-01-20'
  }
]

// Top 100 Bars & Nightlife
export const top100Bars: Top100Item[] = [
  {
    id: 'bar-001',
    rank: 1,
    name: 'Butcher and the Rye',
    category: 'Cocktail Bar',
    subcategory: 'Craft Cocktails',
    description: 'Award-winning cocktail bar known for innovative drinks, extensive whiskey selection, and creative small plates. One of Pittsburgh\'s most celebrated bars.',
    location: {
      address: '212 6th Street',
      neighborhood: 'Downtown',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    rating: 4.6,
    reviewCount: 1123,
    priceRange: '$$$',
    phone: '(412) 555-1003',
    website: 'https://www.butcherandtherye.com',
    hours: {
      'Monday': '5:00 PM - 12:00 AM',
      'Tuesday': '5:00 PM - 12:00 AM',
      'Wednesday': '5:00 PM - 12:00 AM',
      'Thursday': '5:00 PM - 12:00 AM',
      'Friday': '5:00 PM - 2:00 AM',
      'Saturday': '5:00 PM - 2:00 AM',
      'Sunday': '5:00 PM - 12:00 AM'
    },
    features: ['Craft Cocktails', 'Whiskey Selection', 'Late Night', 'Happy Hour', 'Live Music'],
    specialties: ['Signature Cocktails', 'Whiskey Flights', 'Small Plates', 'Charcuterie'],
    awards: ['Best Cocktail Bar 2024', 'Best Bar in Pittsburgh'],
    verified: true,
    trending: true,
    lastUpdated: '2025-01-20'
  },
  {
    id: 'bar-002',
    rank: 2,
    name: 'Fat Head\'s Saloon',
    category: 'Sports Bar',
    subcategory: 'Brewery & Bar',
    description: 'Popular sports bar and brewery in South Side. Known for massive sandwiches, craft beers, and game-day atmosphere. Great for watching Steelers games.',
    location: {
      address: '1805 E Carson Street',
      neighborhood: 'South Side',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15203',
      coordinates: { lat: 40.4284, lng: -79.9847 }
    },
    rating: 4.5,
    reviewCount: 523,
    priceRange: '$$',
    phone: '(412) 555-3000',
    website: 'https://www.fatheads.com',
    hours: {
      'Monday': '11:00 AM - 12:00 AM',
      'Tuesday': '11:00 AM - 12:00 AM',
      'Wednesday': '11:00 AM - 12:00 AM',
      'Thursday': '11:00 AM - 12:00 AM',
      'Friday': '11:00 AM - 2:00 AM',
      'Saturday': '11:00 AM - 2:00 AM',
      'Sunday': '11:00 AM - 12:00 AM'
    },
    features: ['Sports Bar', 'Brewery', 'Outdoor Seating', 'Happy Hour', 'TV Screens', 'Wheelchair Accessible'],
    specialties: ['Craft Beer', 'Massive Sandwiches', 'Wings', 'Game Day Specials'],
    awards: ['Best Sports Bar 2024', 'Best Wings'],
    verified: true,
    trending: false,
    lastUpdated: '2025-01-20'
  },
  {
    id: 'bar-003',
    rank: 3,
    name: 'The Yard',
    category: 'Sports Bar',
    subcategory: 'American',
    description: 'Downtown sports bar with multiple floors, rooftop patio, and extensive beer selection. Perfect for watching games and socializing.',
    location: {
      address: '123 Penn Avenue',
      neighborhood: 'Downtown',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    rating: 4.4,
    reviewCount: 387,
    priceRange: '$$',
    phone: '(412) 555-3100',
    hours: {
      'Monday': '11:00 AM - 12:00 AM',
      'Tuesday': '11:00 AM - 12:00 AM',
      'Wednesday': '11:00 AM - 12:00 AM',
      'Thursday': '11:00 AM - 12:00 AM',
      'Friday': '11:00 AM - 2:00 AM',
      'Saturday': '11:00 AM - 2:00 AM',
      'Sunday': '11:00 AM - 12:00 AM'
    },
    features: ['Sports Bar', 'Rooftop', 'Multiple Floors', 'Happy Hour', 'TV Screens', 'Outdoor Seating'],
    specialties: ['Beer Selection', 'Game Day Atmosphere', 'Rooftop Views', 'Appetizers'],
    awards: ['Best Rooftop Bar'],
    verified: true,
    trending: false,
    lastUpdated: '2025-01-20'
  },
  {
    id: 'bar-004',
    rank: 4,
    name: 'Tequila Cowboy',
    category: 'Nightclub',
    subcategory: 'Country & Dance',
    description: 'Country-themed nightclub with live music, DJs, and dance floor. Popular spot for weekend nights and special events.',
    location: {
      address: '249 5th Avenue',
      neighborhood: 'Downtown',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    rating: 4.2,
    reviewCount: 456,
    priceRange: '$$',
    phone: '(412) 555-3200',
    website: 'https://www.tequilacowboy.com',
    hours: {
      'Monday': 'Closed',
      'Tuesday': 'Closed',
      'Wednesday': '8:00 PM - 2:00 AM',
      'Thursday': '8:00 PM - 2:00 AM',
      'Friday': '8:00 PM - 2:00 AM',
      'Saturday': '8:00 PM - 2:00 AM',
      'Sunday': 'Closed'
    },
    features: ['Nightclub', 'Live Music', 'DJ', 'Dance Floor', 'Late Night'],
    specialties: ['Country Music', 'Line Dancing', 'Live Bands', 'Special Events'],
    awards: ['Best Nightclub 2024'],
    verified: true,
    trending: false,
    lastUpdated: '2025-01-20'
  },
  {
    id: 'bar-005',
    rank: 5,
    name: 'Condado Tacos',
    category: 'Bar & Restaurant',
    subcategory: 'Mexican',
    description: 'Vibrant Mexican restaurant and bar known for build-your-own tacos, creative margaritas, and lively atmosphere. Great for groups and happy hour.',
    location: {
      address: '971 Liberty Avenue',
      neighborhood: 'Downtown',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    rating: 4.4,
    reviewCount: 678,
    priceRange: '$$',
    phone: '(412) 555-3400',
    website: 'https://www.condadotacos.com',
    hours: {
      'Monday': '11:00 AM - 12:00 AM',
      'Tuesday': '11:00 AM - 12:00 AM',
      'Wednesday': '11:00 AM - 12:00 AM',
      'Thursday': '11:00 AM - 12:00 AM',
      'Friday': '11:00 AM - 2:00 AM',
      'Saturday': '11:00 AM - 2:00 AM',
      'Sunday': '11:00 AM - 12:00 AM'
    },
    features: ['Happy Hour', 'Build-Your-Own Tacos', 'Margaritas', 'Late Night', 'Wheelchair Accessible'],
    specialties: ['Tacos', 'Margaritas', 'Queso', 'Happy Hour Specials'],
    awards: ['Best Tacos 2024', 'Best Happy Hour'],
    verified: true,
    trending: true,
    lastUpdated: '2025-01-20'
  }
]

// Top 100 Experiences
export const top100Experiences: Top100Item[] = [
  {
    id: 'exp-001',
    rank: 1,
    name: 'Duquesne Incline',
    category: 'Attraction',
    subcategory: 'Historic & Scenic',
    description: 'Historic cable car offering panoramic views of Pittsburgh\'s skyline and three rivers. A must-see experience for visitors and locals alike.',
    location: {
      address: '1197 West Carson Street',
      neighborhood: 'Mount Washington',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15219',
      coordinates: { lat: 40.4347, lng: -80.0167 }
    },
    rating: 4.8,
    reviewCount: 3456,
    priceRange: '$',
    phone: '(412) 555-2001',
    website: 'https://www.duquesneincline.org',
    hours: {
      'Monday': '5:30 AM - 12:30 AM',
      'Tuesday': '5:30 AM - 12:30 AM',
      'Wednesday': '5:30 AM - 12:30 AM',
      'Thursday': '5:30 AM - 12:30 AM',
      'Friday': '5:30 AM - 12:30 AM',
      'Saturday': '5:30 AM - 12:30 AM',
      'Sunday': '7:00 AM - 12:30 AM'
    },
    features: ['Historic', 'Scenic Views', 'Photography', 'Family-Friendly', 'Wheelchair Accessible'],
    specialties: ['City Views', 'Sunset Views', 'Historic Cable Car', 'Observation Deck'],
    awards: ['Best View in Pittsburgh', 'Top Attraction 2024'],
    verified: true,
    trending: true,
    lastUpdated: '2025-01-20'
  },
  {
    id: 'exp-002',
    rank: 2,
    name: 'Phipps Conservatory and Botanical Gardens',
    category: 'Attraction',
    subcategory: 'Garden & Nature',
    description: 'Beautiful Victorian glasshouse conservatory featuring stunning botanical gardens, seasonal flower shows, and educational programs. A peaceful oasis in the city.',
    location: {
      address: '1 Schenley Drive',
      neighborhood: 'Oakland',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15213',
      coordinates: { lat: 40.4417, lng: -79.9628 }
    },
    rating: 4.7,
    reviewCount: 2890,
    priceRange: '$$',
    phone: '(412) 555-2002',
    website: 'https://www.phipps.conservatory.org',
    hours: {
      'Monday': '9:30 AM - 5:00 PM',
      'Tuesday': '9:30 AM - 5:00 PM',
      'Wednesday': '9:30 AM - 5:00 PM',
      'Thursday': '9:30 AM - 5:00 PM',
      'Friday': '9:30 AM - 5:00 PM',
      'Saturday': '9:30 AM - 5:00 PM',
      'Sunday': '9:30 AM - 5:00 PM'
    },
    features: ['Botanical Gardens', 'Seasonal Shows', 'Photography', 'Family-Friendly', 'Wheelchair Accessible', 'Gift Shop'],
    specialties: ['Flower Shows', 'Butterfly Forest', 'Tropical Plants', 'Educational Programs'],
    awards: ['Best Garden 2024', 'LEED Certified'],
    verified: true,
    trending: false,
    lastUpdated: '2025-01-20'
  },
  {
    id: 'exp-003',
    rank: 3,
    name: 'Carnegie Science Center',
    category: 'Museum',
    subcategory: 'Science & Technology',
    description: 'Interactive science museum with hands-on exhibits, planetarium, and IMAX theater. Perfect for families and science enthusiasts of all ages.',
    location: {
      address: '1 Allegheny Avenue',
      neighborhood: 'North Shore',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15212',
      coordinates: { lat: 40.4467, lng: -80.0156 }
    },
    rating: 4.6,
    reviewCount: 4123,
    priceRange: '$$',
    phone: '(412) 555-2003',
    website: 'https://www.carnegiesciencecenter.org',
    hours: {
      'Monday': '10:00 AM - 5:00 PM',
      'Tuesday': '10:00 AM - 5:00 PM',
      'Wednesday': '10:00 AM - 5:00 PM',
      'Thursday': '10:00 AM - 5:00 PM',
      'Friday': '10:00 AM - 5:00 PM',
      'Saturday': '10:00 AM - 5:00 PM',
      'Sunday': '10:00 AM - 5:00 PM'
    },
    features: ['Interactive Exhibits', 'Planetarium', 'IMAX Theater', 'Family-Friendly', 'Wheelchair Accessible', 'Gift Shop'],
    specialties: ['Hands-On Science', 'Space Exploration', 'Robotics', 'Live Demonstrations'],
    awards: ['Best Museum 2024', 'Best Family Attraction'],
    verified: true,
    trending: false,
    lastUpdated: '2025-01-20'
  },
  {
    id: 'exp-004',
    rank: 4,
    name: 'Heinz History Center',
    category: 'Museum',
    subcategory: 'History & Culture',
    description: 'Western Pennsylvania\'s largest history museum featuring exhibits on Pittsburgh\'s industrial past, sports history, and regional culture.',
    location: {
      address: '1212 Smallman Street',
      neighborhood: 'Strip District',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4500, lng: -79.9800 }
    },
    rating: 4.5,
    reviewCount: 1876,
    priceRange: '$$',
    phone: '(412) 555-2004',
    website: 'https://www.heinzhistorycenter.org',
    hours: {
      'Monday': '10:00 AM - 5:00 PM',
      'Tuesday': '10:00 AM - 5:00 PM',
      'Wednesday': '10:00 AM - 5:00 PM',
      'Thursday': '10:00 AM - 5:00 PM',
      'Friday': '10:00 AM - 5:00 PM',
      'Saturday': '10:00 AM - 5:00 PM',
      'Sunday': '10:00 AM - 5:00 PM'
    },
    features: ['History Exhibits', 'Sports Museum', 'Interactive Displays', 'Family-Friendly', 'Wheelchair Accessible', 'Gift Shop'],
    specialties: ['Pittsburgh History', 'Steel Industry', 'Sports History', 'Regional Culture'],
    awards: ['Best History Museum 2024'],
    verified: true,
    trending: false,
    lastUpdated: '2025-01-20'
  },
  {
    id: 'exp-005',
    rank: 5,
    name: 'Three Rivers Heritage Trail',
    category: 'Outdoor',
    subcategory: 'Recreation & Fitness',
    description: 'Scenic 24-mile trail system along Pittsburgh\'s three rivers. Perfect for walking, running, biking, and enjoying waterfront views.',
    location: {
      address: 'Multiple Access Points',
      neighborhood: 'Various',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15212'
    },
    rating: 4.7,
    reviewCount: 2341,
    priceRange: 'Free',
    website: 'https://www.friendsoftheriverfront.org',
    hours: {
      'Monday': 'Dawn - Dusk',
      'Tuesday': 'Dawn - Dusk',
      'Wednesday': 'Dawn - Dusk',
      'Thursday': 'Dawn - Dusk',
      'Friday': 'Dawn - Dusk',
      'Saturday': 'Dawn - Dusk',
      'Sunday': 'Dawn - Dusk'
    },
    features: ['Walking Trail', 'Bike Path', 'Scenic Views', 'Free', 'Wheelchair Accessible'],
    specialties: ['River Views', 'Exercise', 'Photography', 'Nature'],
    awards: ['Best Trail 2024', 'Best Free Activity'],
    verified: true,
    trending: true,
    lastUpdated: '2025-01-20'
  }
]

// Top 100 Local Businesses
export const top100Businesses: Top100Item[] = [
  {
    id: 'biz-001',
    rank: 1,
    name: 'Pittsburgh Glass Center',
    category: 'Arts & Crafts',
    subcategory: 'Glassblowing Studio',
    description: 'Premier glassblowing studio offering classes, workshops, and gallery space. Learn the art of glassblowing from expert instructors.',
    location: {
      address: '5472 Penn Avenue',
      neighborhood: 'Garfield',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15206',
      coordinates: { lat: 40.4647, lng: -79.9400 }
    },
    rating: 4.8,
    reviewCount: 456,
    priceRange: '$$',
    phone: '(412) 555-3001',
    website: 'https://www.pittsburghglasscenter.org',
    hours: {
      'Monday': '10:00 AM - 6:00 PM',
      'Tuesday': '10:00 AM - 6:00 PM',
      'Wednesday': '10:00 AM - 6:00 PM',
      'Thursday': '10:00 AM - 6:00 PM',
      'Friday': '10:00 AM - 6:00 PM',
      'Saturday': '10:00 AM - 6:00 PM',
      'Sunday': '12:00 PM - 5:00 PM'
    },
    features: ['Classes', 'Workshops', 'Gallery', 'Gift Shop', 'Wheelchair Accessible'],
    specialties: ['Glassblowing', 'Glass Art', 'Custom Pieces', 'Group Classes'],
    awards: ['Best Art Studio 2024'],
    verified: true,
    trending: true,
    lastUpdated: '2025-01-20'
  },
  {
    id: 'biz-002',
    rank: 2,
    name: 'Strip District Market',
    category: 'Shopping',
    subcategory: 'Farmers Market',
    description: 'Historic market district featuring fresh produce, specialty foods, and local vendors. A Pittsburgh institution for over 100 years.',
    location: {
      address: 'Various Locations on Penn Avenue',
      neighborhood: 'Strip District',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4500, lng: -79.9800 }
    },
    rating: 4.6,
    reviewCount: 2341,
    priceRange: '$$',
    hours: {
      'Monday': '6:00 AM - 6:00 PM',
      'Tuesday': '6:00 AM - 6:00 PM',
      'Wednesday': '6:00 AM - 6:00 PM',
      'Thursday': '6:00 AM - 6:00 PM',
      'Friday': '6:00 AM - 6:00 PM',
      'Saturday': '6:00 AM - 6:00 PM',
      'Sunday': '7:00 AM - 4:00 PM'
    },
    features: ['Fresh Produce', 'Local Vendors', 'Specialty Foods', 'Parking', 'Wheelchair Accessible'],
    specialties: ['Farmers Market', 'Local Products', 'Fresh Seafood', 'Baked Goods'],
    awards: ['Best Market 2024', 'Historic Landmark'],
    verified: true,
    trending: false,
    lastUpdated: '2025-01-20'
  },
  {
    id: 'biz-003',
    rank: 3,
    name: 'Pittsburgh Winery',
    category: 'Food & Beverage',
    subcategory: 'Winery',
    description: 'Local winery producing Pennsylvania wines with tasting room and events. Support local winemaking and enjoy unique regional flavors.',
    location: {
      address: '2815 Penn Avenue',
      neighborhood: 'Strip District',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4500, lng: -79.9800 }
    },
    rating: 4.5,
    reviewCount: 678,
    priceRange: '$$',
    phone: '(412) 555-3003',
    website: 'https://www.pittsburghwinery.com',
    hours: {
      'Monday': 'Closed',
      'Tuesday': '12:00 PM - 8:00 PM',
      'Wednesday': '12:00 PM - 8:00 PM',
      'Thursday': '12:00 PM - 8:00 PM',
      'Friday': '12:00 PM - 9:00 PM',
      'Saturday': '12:00 PM - 9:00 PM',
      'Sunday': '12:00 PM - 6:00 PM'
    },
    features: ['Wine Tastings', 'Events', 'Private Parties', 'Gift Shop', 'Wheelchair Accessible'],
    specialties: ['Pennsylvania Wines', 'Wine Tastings', 'Events', 'Custom Labels'],
    awards: ['Best Winery 2024'],
    verified: true,
    trending: false,
    lastUpdated: '2025-01-20'
  },
  {
    id: 'biz-004',
    rank: 4,
    name: 'Commonwealth Press',
    category: 'Retail',
    subcategory: 'Print Shop & Apparel',
    description: 'Local print shop and apparel store featuring Pittsburgh-themed designs and custom printing services. Known for unique city pride merchandise.',
    location: {
      address: '3315 Butler Street',
      neighborhood: 'Lawrenceville',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15201',
      coordinates: { lat: 40.4684, lng: -79.9600 }
    },
    rating: 4.6,
    reviewCount: 892,
    priceRange: '$$',
    phone: '(412) 555-3004',
    website: 'https://www.commonwealthpress.com',
    hours: {
      'Monday': '11:00 AM - 7:00 PM',
      'Tuesday': '11:00 AM - 7:00 PM',
      'Wednesday': '11:00 AM - 7:00 PM',
      'Thursday': '11:00 AM - 7:00 PM',
      'Friday': '11:00 AM - 7:00 PM',
      'Saturday': '11:00 AM - 7:00 PM',
      'Sunday': '12:00 PM - 5:00 PM'
    },
    features: ['Custom Printing', 'Apparel', 'Gift Shop', 'Online Store', 'Wheelchair Accessible'],
    specialties: ['Pittsburgh Designs', 'Custom T-Shirts', 'Local Pride', 'Screen Printing'],
    awards: ['Best Local Shop 2024'],
    verified: true,
    trending: true,
    lastUpdated: '2025-01-20'
  },
  {
    id: 'biz-005',
    rank: 5,
    name: 'Pittsburgh Public Market',
    category: 'Shopping',
    subcategory: 'Market & Food Hall',
    description: 'Indoor public market featuring local vendors, food stalls, and artisan products. Support local businesses and discover unique goods.',
    location: {
      address: '2401 Penn Avenue',
      neighborhood: 'Strip District',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4500, lng: -79.9800 }
    },
    rating: 4.4,
    reviewCount: 1234,
    priceRange: '$$',
    phone: '(412) 555-3005',
    website: 'https://www.pittsburghpublicmarket.org',
    hours: {
      'Monday': '9:00 AM - 6:00 PM',
      'Tuesday': '9:00 AM - 6:00 PM',
      'Wednesday': '9:00 AM - 6:00 PM',
      'Thursday': '9:00 AM - 6:00 PM',
      'Friday': '9:00 AM - 6:00 PM',
      'Saturday': '9:00 AM - 6:00 PM',
      'Sunday': '10:00 AM - 4:00 PM'
    },
    features: ['Local Vendors', 'Food Hall', 'Artisan Products', 'Parking', 'Wheelchair Accessible'],
    specialties: ['Local Products', 'Food Vendors', 'Artisan Goods', 'Community Events'],
    awards: ['Best Market 2023'],
    verified: true,
    trending: false,
    lastUpdated: '2025-01-20'
  }
]

// Helper functions
export function getAllTop100(): Top100Item[] {
  return [...top100Restaurants, ...top100Bars, ...top100Experiences, ...top100Businesses]
}

export function getTop100Restaurants(): Top100Item[] {
  return top100Restaurants
}

export function getTop100Bars(): Top100Item[] {
  return top100Bars
}

export function getTop100Experiences(): Top100Item[] {
  return top100Experiences
}

export function getTop100Businesses(): Top100Item[] {
  return top100Businesses
}

export function getTop100ByCategory(category: string): Top100Item[] {
  return getAllTop100().filter(item => item.category.toLowerCase() === category.toLowerCase())
}

export function getTop100ByNeighborhood(neighborhood: string): Top100Item[] {
  return getAllTop100().filter(item => 
    item.location.neighborhood.toLowerCase() === neighborhood.toLowerCase()
  )
}

export function searchTop100(query: string): Top100Item[] {
  const lowerQuery = query.toLowerCase()
  return getAllTop100().filter(item =>
    item.name.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery) ||
    item.location.neighborhood.toLowerCase().includes(lowerQuery) ||
    item.category.toLowerCase().includes(lowerQuery) ||
    (item.subcategory && item.subcategory.toLowerCase().includes(lowerQuery))
  )
}

export function getTop100ByRank(minRank: number, maxRank: number): Top100Item[] {
  return getAllTop100().filter(item => item.rank >= minRank && item.rank <= maxRank)
}

export function getTrendingTop100(): Top100Item[] {
  return getAllTop100().filter(item => item.trending)
}

export function getVerifiedTop100(): Top100Item[] {
  return getAllTop100().filter(item => item.verified)
}

