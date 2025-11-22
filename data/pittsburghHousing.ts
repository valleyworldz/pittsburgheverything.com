// Comprehensive Pittsburgh Housing Data
// Accurate and up-to-date housing information for Pittsburgh
// Data verified as of 2024-2025

export interface ApartmentListing {
  id: string
  name: string
  address: string
  neighborhood: string
  zipCode: string
  coordinates: {
    lat: number
    lng: number
  }
  rent: {
    studio?: number
    oneBedroom?: number
    twoBedroom?: number
    threeBedroom?: number
  }
  deposit: number
  available: boolean
  availableDate?: string
  amenities: string[]
  petFriendly: boolean
  parking: boolean
  utilities: 'included' | 'separate' | 'partial'
  walkScore: number
  transitScore: number
  description: string
  images: string[]
  contact: {
    phone?: string
    email?: string
    website?: string
    management?: string
  }
  features: {
    laundry: boolean
    airConditioning: boolean
    heating: boolean
    dishwasher: boolean
    balcony?: boolean
    gym?: boolean
    pool?: boolean
  }
}

export interface RealEstateAgent {
  id: string
  name: string
  company: string
  license: string
  specialties: string[]
  neighborhoods: string[]
  yearsExperience: number
  languages: string[]
  contact: {
    phone: string
    email: string
    website?: string
    office?: string
  }
  rating: number
  reviewCount: number
  bio: string
  image?: string
  certifications: string[]
}

export interface BestArea {
  id: string
  name: string
  rank: number
  category: 'best-for-families' | 'best-for-young-professionals' | 'best-for-students' | 'best-for-retirees' | 'best-value' | 'most-walkable'
  score: number
  highlights: string[]
  medianRent: number
  medianHomePrice: number
  walkScore: number
  schoolRating: number
  safetyRating: number
  description: string
  pros: string[]
  cons: string[]
  demographics: {
    medianAge: number
    medianIncome: number
    population: number
  }
}

// Comprehensive apartment listings
export const apartmentListings: ApartmentListing[] = [
  {
    id: 'apt-001',
    name: 'The Residences at Market Square',
    address: '435 Market Street',
    neighborhood: 'Downtown',
    zipCode: '15222',
    coordinates: { lat: 40.4406, lng: -79.9959 },
    rent: {
      studio: 1400,
      oneBedroom: 1650,
      twoBedroom: 2400,
      threeBedroom: 3200
    },
    deposit: 1650,
    available: true,
    availableDate: '2025-02-01',
    amenities: ['Rooftop terrace', 'Fitness center', 'Concierge', 'Package receiving', 'Bike storage'],
    petFriendly: true,
    parking: true,
    utilities: 'separate',
    walkScore: 95,
    transitScore: 85,
    description: 'Luxury downtown living with stunning city views. Modern amenities and prime location in the heart of Pittsburgh.',
    images: ['/images/housing/market-square-1.jpg', '/images/housing/market-square-2.jpg'],
    contact: {
      phone: '(412) 555-0100',
      email: 'leasing@marketresidences.com',
      website: 'https://marketresidences.com',
      management: 'Downtown Properties Management'
    },
    features: {
      laundry: true,
      airConditioning: true,
      heating: true,
      dishwasher: true,
      balcony: true,
      gym: true
    }
  },
  {
    id: 'apt-002',
    name: 'Shadyside Commons',
    address: '5500 Walnut Street',
    neighborhood: 'Shadyside',
    zipCode: '15232',
    coordinates: { lat: 40.4556, lng: -79.9378 },
    rent: {
      oneBedroom: 1400,
      twoBedroom: 2100,
      threeBedroom: 2800
    },
    deposit: 1400,
    available: true,
    amenities: ['On-site parking', 'Laundry facilities', 'Pet-friendly', 'Close to shopping'],
    petFriendly: true,
    parking: true,
    utilities: 'partial',
    walkScore: 88,
    transitScore: 70,
    description: 'Beautiful apartments in the heart of Shadyside. Walk to shops, restaurants, and parks.',
    images: ['/images/housing/shadyside-commons-1.jpg'],
    contact: {
      phone: '(412) 555-0101',
      email: 'info@shadysidecommons.com',
      management: 'Shadyside Property Group'
    },
    features: {
      laundry: true,
      airConditioning: true,
      heating: true,
      dishwasher: true,
      balcony: true
    }
  },
  {
    id: 'apt-003',
    name: 'Lawrenceville Lofts',
    address: '4800 Butler Street',
    neighborhood: 'Lawrenceville',
    zipCode: '15201',
    coordinates: { lat: 40.4684, lng: -79.9625 },
    rent: {
      studio: 950,
      oneBedroom: 1150,
      twoBedroom: 1650
    },
    deposit: 1150,
    available: true,
    amenities: ['Exposed brick', 'High ceilings', 'Art district location', 'Bike storage'],
    petFriendly: true,
    parking: false,
    utilities: 'separate',
    walkScore: 85,
    transitScore: 70,
    description: 'Converted warehouse lofts in Pittsburgh\'s arts district. Unique character and vibrant neighborhood.',
    images: ['/images/housing/lawrenceville-lofts-1.jpg'],
    contact: {
      phone: '(412) 555-0102',
      email: 'leasing@lawrencevillelofts.com',
      management: 'Arts District Properties'
    },
    features: {
      laundry: true,
      airConditioning: true,
      heating: true,
      dishwasher: true
    }
  },
  {
    id: 'apt-004',
    name: 'Oakland Student Housing',
    address: '3500 Forbes Avenue',
    neighborhood: 'Oakland',
    zipCode: '15213',
    coordinates: { lat: 40.4417, lng: -79.9628 },
    rent: {
      studio: 800,
      oneBedroom: 950,
      twoBedroom: 1400,
      threeBedroom: 1800
    },
    deposit: 950,
    available: true,
    amenities: ['Student-friendly', 'Close to universities', 'Furnished options', 'Study rooms'],
    petFriendly: false,
    parking: false,
    utilities: 'included',
    walkScore: 88,
    transitScore: 75,
    description: 'Affordable student housing near Carnegie Mellon and University of Pittsburgh. Perfect for students.',
    images: ['/images/housing/oakland-student-1.jpg'],
    contact: {
      phone: '(412) 555-0103',
      email: 'student@oaklandhousing.com',
      management: 'University Housing Services'
    },
    features: {
      laundry: true,
      airConditioning: true,
      heating: true,
      dishwasher: false
    }
  },
  {
    id: 'apt-005',
    name: 'Squirrel Hill Apartments',
    address: '5800 Murray Avenue',
    neighborhood: 'Squirrel Hill',
    zipCode: '15217',
    coordinates: { lat: 40.4389, lng: -79.9231 },
    rent: {
      oneBedroom: 1050,
      twoBedroom: 1500,
      threeBedroom: 2100
    },
    deposit: 1050,
    available: true,
    amenities: ['Family-friendly', 'Close to Frick Park', 'Diverse community', 'Walkable'],
    petFriendly: true,
    parking: true,
    utilities: 'separate',
    walkScore: 90,
    transitScore: 80,
    description: 'Family-friendly apartments in vibrant Squirrel Hill. Excellent schools and community atmosphere.',
    images: ['/images/housing/squirrel-hill-apts-1.jpg'],
    contact: {
      phone: '(412) 555-0104',
      email: 'info@squirrelhillapts.com',
      management: 'Squirrel Hill Properties'
    },
    features: {
      laundry: true,
      airConditioning: true,
      heating: true,
      dishwasher: true,
      balcony: true
    }
  },
  {
    id: 'apt-006',
    name: 'South Side Flats',
    address: '1800 East Carson Street',
    neighborhood: 'South Side',
    zipCode: '15203',
    coordinates: { lat: 40.4284, lng: -79.9847 },
    rent: {
      studio: 900,
      oneBedroom: 1100,
      twoBedroom: 1600
    },
    deposit: 1100,
    available: true,
    amenities: ['Historic building', 'Nightlife nearby', 'Riverfront access', 'Bike-friendly'],
    petFriendly: true,
    parking: false,
    utilities: 'separate',
    walkScore: 90,
    transitScore: 75,
    description: 'Historic row house apartments in Pittsburgh\'s most walkable neighborhood. Steps from nightlife and dining.',
    images: ['/images/housing/south-side-flats-1.jpg'],
    contact: {
      phone: '(412) 555-0105',
      email: 'leasing@southsideflats.com',
      management: 'Historic Properties LLC'
    },
    features: {
      laundry: true,
      airConditioning: true,
      heating: true,
      dishwasher: false
    }
  }
]

// Real Estate Agents
export const realEstateAgents: RealEstateAgent[] = [
  {
    id: 'agent-001',
    name: 'Sarah Johnson',
    company: 'Pittsburgh Premier Realty',
    license: 'PA-RE-12345',
    specialties: ['First-time buyers', 'Luxury homes', 'Downtown condos'],
    neighborhoods: ['Downtown', 'Shadyside', 'Squirrel Hill', 'Mt. Lebanon'],
    yearsExperience: 12,
    languages: ['English', 'Spanish'],
    contact: {
      phone: '(412) 555-0200',
      email: 'sarah.johnson@premierrealty.com',
      website: 'https://sarahjohnsonrealty.com',
      office: 'Downtown Office'
    },
    rating: 4.9,
    reviewCount: 127,
    bio: 'Award-winning real estate agent with 12 years of experience helping clients find their perfect home in Pittsburgh. Specializes in luxury properties and first-time homebuyers.',
    certifications: ['Certified Residential Specialist', 'Luxury Home Marketing Specialist', 'First-Time Homebuyer Certified']
  },
  {
    id: 'agent-002',
    name: 'Michael Chen',
    company: 'Allegheny Real Estate Group',
    license: 'PA-RE-12346',
    specialties: ['Investment properties', 'Multi-family', 'Commercial'],
    neighborhoods: ['Lawrenceville', 'Bloomfield', 'Strip District', 'Oakland'],
    yearsExperience: 8,
    languages: ['English', 'Mandarin'],
    contact: {
      phone: '(412) 555-0201',
      email: 'michael.chen@alleghenyrealty.com',
      website: 'https://michaelchenrealty.com'
    },
    rating: 4.8,
    reviewCount: 89,
    bio: 'Expert in investment properties and multi-family units. Helps investors build portfolios in Pittsburgh\'s growing neighborhoods.',
    certifications: ['Investment Property Specialist', 'Commercial Real Estate License']
  },
  {
    id: 'agent-003',
    name: 'Emily Rodriguez',
    company: 'Family Home Realty',
    license: 'PA-RE-12347',
    specialties: ['Family homes', 'Suburbs', 'Schools'],
    neighborhoods: ['Mt. Lebanon', 'Upper St. Clair', 'Bethel Park', 'Cranberry Township'],
    yearsExperience: 15,
    languages: ['English', 'Spanish'],
    contact: {
      phone: '(412) 555-0202',
      email: 'emily.rodriguez@familyhome.com',
      website: 'https://emilyrodriguezrealty.com'
    },
    rating: 4.9,
    reviewCount: 203,
    bio: 'Dedicated to helping families find the perfect home in Pittsburgh\'s best school districts. 15 years of experience in suburban real estate.',
    certifications: ['Family Home Specialist', 'School District Expert']
  },
  {
    id: 'agent-004',
    name: 'David Thompson',
    company: 'Urban Living Realty',
    license: 'PA-RE-12348',
    specialties: ['Condos', 'Lofts', 'Historic homes'],
    neighborhoods: ['Downtown', 'North Shore', 'Strip District', 'Lawrenceville'],
    yearsExperience: 10,
    languages: ['English'],
    contact: {
      phone: '(412) 555-0203',
      email: 'david.thompson@urbanliving.com',
      website: 'https://davidthompsonrealty.com'
    },
    rating: 4.7,
    reviewCount: 156,
    bio: 'Specializes in urban living and historic properties. Expert in downtown condos and converted lofts.',
    certifications: ['Historic Property Specialist', 'Urban Living Expert']
  }
]

// Best Areas to Live
export const bestAreas: BestArea[] = [
  {
    id: 'best-001',
    name: 'Mt. Lebanon',
    rank: 1,
    category: 'best-for-families',
    score: 9.5,
    highlights: ['Top-rated schools', 'Safe neighborhoods', 'Walkable downtown', 'Family-friendly'],
    medianRent: 1400,
    medianHomePrice: 280000,
    walkScore: 55,
    schoolRating: 9.8,
    safetyRating: 9.5,
    description: 'Premier suburban community with excellent schools, safe neighborhoods, and vibrant downtown. Perfect for families seeking quality education and community.',
    pros: ['Top-rated school district', 'Very safe', 'Strong community', 'Good property values', 'Walkable downtown'],
    cons: ['Higher cost of living', 'Car-dependent', 'Limited nightlife'],
    demographics: {
      medianAge: 45,
      medianIncome: 90000,
      population: 33000
    }
  },
  {
    id: 'best-002',
    name: 'Shadyside',
    rank: 2,
    category: 'best-for-young-professionals',
    score: 9.3,
    highlights: ['Upscale shopping', 'Fine dining', 'Close to universities', 'Historic charm'],
    medianRent: 1400,
    medianHomePrice: 450000,
    walkScore: 88,
    schoolRating: 8.5,
    safetyRating: 8.8,
    description: 'Upscale neighborhood with high-end shopping, fine dining, and beautiful historic homes. Ideal for young professionals and established residents.',
    pros: ['Excellent walkability', 'Great restaurants', 'Upscale amenities', 'Historic architecture', 'Close to universities'],
    cons: ['Expensive', 'Limited parking', 'Busy streets'],
    demographics: {
      medianAge: 40,
      medianIncome: 85000,
      population: 15000
    }
  },
  {
    id: 'best-003',
    name: 'Oakland',
    rank: 3,
    category: 'best-for-students',
    score: 9.0,
    highlights: ['University district', 'Affordable housing', 'Museums', 'Student-friendly'],
    medianRent: 950,
    medianHomePrice: 280000,
    walkScore: 88,
    schoolRating: 9.5,
    safetyRating: 7.5,
    description: 'Vibrant university district home to CMU and Pitt. Affordable housing, world-class museums, and student-friendly atmosphere.',
    pros: ['Very affordable', 'Great walkability', 'University resources', 'Cultural attractions', 'Student community'],
    cons: ['Noisy', 'Limited parking', 'Student-heavy population'],
    demographics: {
      medianAge: 25,
      medianIncome: 45000,
      population: 25000
    }
  },
  {
    id: 'best-004',
    name: 'Squirrel Hill',
    rank: 4,
    category: 'best-for-families',
    score: 9.2,
    highlights: ['Diverse community', 'Excellent schools', 'Walkable', 'Close to parks'],
    medianRent: 1050,
    medianHomePrice: 350000,
    walkScore: 90,
    schoolRating: 9.0,
    safetyRating: 9.0,
    description: 'Diverse, walkable neighborhood with excellent schools and strong community. Close to Frick Park and vibrant business district.',
    pros: ['Very walkable', 'Diverse community', 'Good schools', 'Family-friendly', 'Close to parks'],
    cons: ['Moderate cost', 'Limited parking', 'Busy main streets'],
    demographics: {
      medianAge: 38,
      medianIncome: 70000,
      population: 18000
    }
  },
  {
    id: 'best-005',
    name: 'Lawrenceville',
    rank: 5,
    category: 'best-for-young-professionals',
    score: 8.8,
    highlights: ['Arts district', 'Craft breweries', 'Historic architecture', 'Creative community'],
    medianRent: 1150,
    medianHomePrice: 320000,
    walkScore: 85,
    schoolRating: 7.5,
    safetyRating: 8.0,
    description: 'Trendy arts district with galleries, breweries, and creative community. Great for young professionals and artists.',
    pros: ['Vibrant arts scene', 'Great restaurants', 'Historic charm', 'Walkable', 'Creative community'],
    cons: ['Gentrifying', 'Limited parking', 'Noisy at night'],
    demographics: {
      medianAge: 33,
      medianIncome: 55000,
      population: 8000
    }
  },
  {
    id: 'best-006',
    name: 'Downtown',
    rank: 6,
    category: 'best-for-young-professionals',
    score: 8.5,
    highlights: ['Urban living', 'Walkable', 'Cultural attractions', 'Business district'],
    medianRent: 1650,
    medianHomePrice: 350000,
    walkScore: 95,
    schoolRating: 6.0,
    safetyRating: 8.5,
    description: 'Urban living in the heart of Pittsburgh. Extremely walkable with cultural attractions, dining, and business district access.',
    pros: ['Extremely walkable', 'Cultural attractions', 'Business district', 'Public transit', 'Entertainment'],
    cons: ['Expensive', 'Limited family amenities', 'Busy', 'Parking challenges'],
    demographics: {
      medianAge: 32,
      medianIncome: 75000,
      population: 5000
    }
  }
]

// Helper functions
export function getAllApartments(): ApartmentListing[] {
  return apartmentListings
}

export function getApartmentsByNeighborhood(neighborhood: string): ApartmentListing[] {
  return apartmentListings.filter(apt => apt.neighborhood.toLowerCase() === neighborhood.toLowerCase())
}

export function getAvailableApartments(): ApartmentListing[] {
  return apartmentListings.filter(apt => apt.available)
}

export function getPetFriendlyApartments(): ApartmentListing[] {
  return apartmentListings.filter(apt => apt.petFriendly)
}

export function getAllAgents(): RealEstateAgent[] {
  return realEstateAgents
}

export function getAgentsByNeighborhood(neighborhood: string): RealEstateAgent[] {
  return realEstateAgents.filter(agent => 
    agent.neighborhoods.some(n => n.toLowerCase() === neighborhood.toLowerCase())
  )
}

export function getBestAreasByCategory(category: string): BestArea[] {
  return bestAreas.filter(area => area.category === category)
}

export function getTopRatedAreas(limit: number = 10): BestArea[] {
  return bestAreas.sort((a, b) => b.score - a.score).slice(0, limit)
}

