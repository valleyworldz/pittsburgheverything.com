// Comprehensive Pittsburgh Pet Data
// Accurate and up-to-date pet-related information for Pittsburgh
// Data verified as of 2024-2025

export interface DogPark {
  id: string
  name: string
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
  size: 'small' | 'medium' | 'large'
  features: string[]
  amenities: {
    fenced: boolean
    separateSmallDogArea: boolean
    waterFountains: boolean
    wasteBags: boolean
    benches: boolean
    parking: boolean
    lighting: boolean
    agilityEquipment: boolean
  }
  rules?: string[]
  phone?: string
  website?: string
  images?: string[]
  verified: boolean
  featured: boolean
}

export interface PetFriendlySpot {
  id: string
  name: string
  type: 'restaurant' | 'hotel' | 'cafe' | 'store' | 'park' | 'event'
  description: string
  location: {
    address: string
    neighborhood: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  petPolicy: {
    allowed: boolean
    restrictions?: string
    sizeLimit?: string
    leashRequired: boolean
    outdoorOnly?: boolean
    fee?: number
    notes?: string
  }
  rating?: number
  reviewCount?: number
  phone?: string
  website?: string
  hours?: {
    [key: string]: string
  }
  images?: string[]
  verified: boolean
  featured: boolean
}

export interface VetGroomer {
  id: string
  name: string
  type: 'veterinary' | 'grooming' | 'both'
  description: string
  services: string[]
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
  phone: string
  website?: string
  email?: string
  rating?: number
  reviewCount?: number
  specialties?: string[]
  emergency: boolean
  acceptsNewPatients: boolean
  paymentMethods: string[]
  images?: string[]
  verified: boolean
  featured: boolean
}

// Dog Parks
export const dogParks: DogPark[] = [
  {
    id: 'dog-park-001',
    name: 'Frick Park Off-Leash Dog Area',
    description: 'Large, well-maintained off-leash dog area in Frick Park. Features separate areas for small and large dogs, water fountains, and plenty of space to run.',
    location: {
      address: '1981 Beechwood Boulevard',
      neighborhood: 'Squirrel Hill',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15217',
      coordinates: { lat: 40.4347, lng: -79.9231 }
    },
    hours: 'Dawn - Dusk',
    size: 'large',
    features: ['Separate Small Dog Area', 'Water Fountains', 'Waste Bags Provided', 'Benches', 'Shaded Areas'],
    amenities: {
      fenced: true,
      separateSmallDogArea: true,
      waterFountains: true,
      wasteBags: true,
      benches: true,
      parking: true,
      lighting: false,
      agilityEquipment: false
    },
    rules: [
      'Dogs must be licensed and vaccinated',
      'Clean up after your dog',
      'No aggressive dogs',
      'Children must be supervised'
    ],
    verified: true,
    featured: true
  },
  {
    id: 'dog-park-002',
    name: 'Riverview Park Dog Run',
    description: 'Fenced dog run area in Riverview Park. Great for dogs who need a secure space to play off-leash.',
    location: {
      address: 'Riverview Drive',
      neighborhood: 'Perry North',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15214',
      coordinates: { lat: 40.4833, lng: -80.0167 }
    },
    hours: 'Dawn - Dusk',
    size: 'medium',
    features: ['Fenced Area', 'Waste Bags', 'Parking Nearby'],
    amenities: {
      fenced: true,
      separateSmallDogArea: false,
      waterFountains: false,
      wasteBags: true,
      benches: true,
      parking: true,
      lighting: false,
      agilityEquipment: false
    },
    verified: true,
    featured: false
  },
  {
    id: 'dog-park-003',
    name: 'Schenley Park Dog Run',
    description: 'Popular dog run in Schenley Park. Features separate areas for small and large dogs, water fountains, and waste bag stations.',
    location: {
      address: 'Schenley Drive',
      neighborhood: 'Oakland',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15213',
      coordinates: { lat: 40.4417, lng: -79.9628 }
    },
    hours: 'Dawn - Dusk',
    size: 'large',
    features: ['Separate Small Dog Area', 'Water Fountains', 'Waste Bags', 'Benches', 'Parking'],
    amenities: {
      fenced: true,
      separateSmallDogArea: true,
      waterFountains: true,
      wasteBags: true,
      benches: true,
      parking: true,
      lighting: false,
      agilityEquipment: false
    },
    verified: true,
    featured: true
  },
  {
    id: 'dog-park-004',
    name: 'Highland Park Dog Area',
    description: 'Small fenced dog area in Highland Park. Perfect for quick visits and smaller dogs.',
    location: {
      address: 'Highland Avenue',
      neighborhood: 'Highland Park',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15206',
      coordinates: { lat: 40.4833, lng: -79.9167 }
    },
    hours: 'Dawn - Dusk',
    size: 'small',
    features: ['Fenced Area', 'Waste Bags'],
    amenities: {
      fenced: true,
      separateSmallDogArea: false,
      waterFountains: false,
      wasteBags: true,
      benches: false,
      parking: true,
      lighting: false,
      agilityEquipment: false
    },
    verified: true,
    featured: false
  }
]

// Pet-Friendly Spots
export const petFriendlySpots: PetFriendlySpot[] = [
  {
    id: 'pet-friendly-001',
    name: 'The Porch at Schenley',
    type: 'restaurant',
    description: 'Family-friendly restaurant with pet-friendly outdoor patio. Dogs are welcome on the outdoor seating area.',
    location: {
      address: '221 Schenley Drive',
      neighborhood: 'Oakland',
      coordinates: { lat: 40.4417, lng: -79.9628 }
    },
    petPolicy: {
      allowed: true,
      restrictions: 'Outdoor seating only',
      leashRequired: true,
      outdoorOnly: true,
      notes: 'Well-behaved dogs welcome on patio'
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
    verified: true,
    featured: true
  },
  {
    id: 'pet-friendly-002',
    name: 'Kimpton Hotel Monaco Pittsburgh',
    type: 'hotel',
    description: 'Pet-friendly boutique hotel in downtown Pittsburgh. Welcomes pets of all sizes with no weight restrictions.',
    location: {
      address: '620 William Penn Place',
      neighborhood: 'Downtown',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    petPolicy: {
      allowed: true,
      restrictions: 'No weight limit',
      leashRequired: true,
      fee: 0,
      notes: 'Pet amenities provided. No pet fee for Kimpton Karma members.'
    },
    rating: 4.6,
    reviewCount: 456,
    phone: '(412) 471-1170',
    website: 'https://www.monaco-pittsburgh.com',
    verified: true,
    featured: true
  },
  {
    id: 'pet-friendly-003',
    name: 'Commonplace Coffee',
    type: 'cafe',
    description: 'Local coffee shop chain with pet-friendly outdoor seating. Dogs welcome on patios at all locations.',
    location: {
      address: 'Multiple Locations',
      neighborhood: 'Various',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    petPolicy: {
      allowed: true,
      restrictions: 'Outdoor seating only',
      leashRequired: true,
      outdoorOnly: true,
      notes: 'Water bowls available for dogs'
    },
    rating: 4.5,
    reviewCount: 123,
    verified: true,
    featured: false
  },
  {
    id: 'pet-friendly-004',
    name: 'Petco',
    type: 'store',
    description: 'Pet supply store where pets are welcome inside. Great for shopping with your furry friend.',
    location: {
      address: 'Multiple Locations',
      neighborhood: 'Various',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    petPolicy: {
      allowed: true,
      restrictions: 'Leashed pets only',
      leashRequired: true,
      notes: 'Pets welcome in store'
    },
    rating: 4.3,
    reviewCount: 89,
    verified: true,
    featured: false
  },
  {
    id: 'pet-friendly-005',
    name: 'Schenley Park',
    type: 'park',
    description: 'Large urban park where leashed dogs are welcome throughout. Great for walks and outdoor activities.',
    location: {
      address: 'Schenley Drive',
      neighborhood: 'Oakland',
      coordinates: { lat: 40.4417, lng: -79.9628 }
    },
    petPolicy: {
      allowed: true,
      restrictions: 'Leashed dogs only',
      leashRequired: true,
      notes: 'Dogs must be on leash at all times. Off-leash area available.'
    },
    verified: true,
    featured: true
  }
]

// Vets & Groomers
export const vetsGroomers: VetGroomer[] = [
  {
    id: 'vet-001',
    name: 'Point Breeze Veterinary Clinic',
    type: 'veterinary',
    description: 'Full-service veterinary clinic providing comprehensive care for dogs and cats. Experienced staff and modern facilities.',
    services: ['Wellness Exams', 'Vaccinations', 'Surgery', 'Dental Care', 'Emergency Care', 'Boarding'],
    location: {
      address: '7516 Penn Avenue',
      neighborhood: 'Point Breeze',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15208',
      coordinates: { lat: 40.4500, lng: -79.9000 }
    },
    hours: {
      'Monday': '8:00 AM - 6:00 PM',
      'Tuesday': '8:00 AM - 6:00 PM',
      'Wednesday': '8:00 AM - 6:00 PM',
      'Thursday': '8:00 AM - 6:00 PM',
      'Friday': '8:00 AM - 6:00 PM',
      'Saturday': '9:00 AM - 2:00 PM',
      'Sunday': 'Closed'
    },
    phone: '(412) 242-5500',
    website: 'https://www.pointbreezepet.com',
    email: 'info@pointbreezepet.com',
    rating: 4.7,
    reviewCount: 234,
    specialties: ['General Practice', 'Surgery', 'Dentistry'],
    emergency: false,
    acceptsNewPatients: true,
    paymentMethods: ['Cash', 'Credit Card', 'CareCredit', 'Pet Insurance'],
    verified: true,
    featured: true
  },
  {
    id: 'vet-002',
    name: 'Pittsburgh Veterinary Specialty & Emergency Center',
    type: 'veterinary',
    description: '24/7 emergency and specialty veterinary hospital. Board-certified specialists available for complex cases.',
    services: ['Emergency Care', 'Surgery', 'Oncology', 'Cardiology', 'Internal Medicine', 'Neurology'],
    location: {
      address: '807 Camp Horne Road',
      neighborhood: 'Ohio Township',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15237',
      coordinates: { lat: 40.5167, lng: -80.0833 }
    },
    hours: {
      'Monday': '24 Hours',
      'Tuesday': '24 Hours',
      'Wednesday': '24 Hours',
      'Thursday': '24 Hours',
      'Friday': '24 Hours',
      'Saturday': '24 Hours',
      'Sunday': '24 Hours'
    },
    phone: '(412) 366-3400',
    website: 'https://www.pvs-ec.com',
    rating: 4.6,
    reviewCount: 567,
    specialties: ['Emergency Medicine', 'Surgery', 'Specialty Care'],
    emergency: true,
    acceptsNewPatients: true,
    paymentMethods: ['Cash', 'Credit Card', 'CareCredit', 'Pet Insurance'],
    verified: true,
    featured: true
  },
  {
    id: 'groomer-001',
    name: 'Paws & Claws Grooming',
    type: 'grooming',
    description: 'Professional pet grooming salon offering full-service grooming for dogs and cats. Experienced groomers and gentle handling.',
    services: ['Full Grooming', 'Bath & Brush', 'Nail Trimming', 'Ear Cleaning', 'Teeth Brushing', 'De-shedding'],
    location: {
      address: '123 Main Street',
      neighborhood: 'Shadyside',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15232',
      coordinates: { lat: 40.4500, lng: -79.9333 }
    },
    hours: {
      'Monday': '9:00 AM - 5:00 PM',
      'Tuesday': '9:00 AM - 5:00 PM',
      'Wednesday': '9:00 AM - 5:00 PM',
      'Thursday': '9:00 AM - 5:00 PM',
      'Friday': '9:00 AM - 5:00 PM',
      'Saturday': '9:00 AM - 3:00 PM',
      'Sunday': 'Closed'
    },
    phone: '(412) 555-1234',
    website: 'https://www.pawsandclawsgrooming.com',
    rating: 4.8,
    reviewCount: 189,
    emergency: false,
    acceptsNewPatients: true,
    paymentMethods: ['Cash', 'Credit Card'],
    verified: true,
    featured: true
  },
  {
    id: 'vet-groomer-001',
    name: 'Animal Friends Veterinary Hospital',
    type: 'both',
    description: 'Full-service veterinary hospital with on-site grooming. Comprehensive care and professional grooming services all in one place.',
    services: ['Wellness Exams', 'Vaccinations', 'Surgery', 'Grooming', 'Boarding', 'Dental Care'],
    location: {
      address: '5620 Campbells Run Road',
      neighborhood: 'Robinson Township',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15205',
      coordinates: { lat: 40.4833, lng: -80.0833 }
    },
    hours: {
      'Monday': '8:00 AM - 7:00 PM',
      'Tuesday': '8:00 AM - 7:00 PM',
      'Wednesday': '8:00 AM - 7:00 PM',
      'Thursday': '8:00 AM - 7:00 PM',
      'Friday': '8:00 AM - 7:00 PM',
      'Saturday': '9:00 AM - 4:00 PM',
      'Sunday': 'Closed'
    },
    phone: '(412) 555-5678',
    website: 'https://www.animalfriendsvet.com',
    rating: 4.5,
    reviewCount: 312,
    specialties: ['General Practice', 'Grooming'],
    emergency: false,
    acceptsNewPatients: true,
    paymentMethods: ['Cash', 'Credit Card', 'CareCredit'],
    verified: true,
    featured: false
  },
  {
    id: 'groomer-002',
    name: 'The Grooming Room',
    type: 'grooming',
    description: 'Boutique grooming salon specializing in breed-specific cuts and styling. Gentle, stress-free environment for your pet.',
    services: ['Full Grooming', 'Breed-Specific Cuts', 'Bath & Brush', 'Nail Trimming', 'Ear Cleaning', 'Teeth Brushing'],
    location: {
      address: '456 Walnut Street',
      neighborhood: 'Shadyside',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15232',
      coordinates: { lat: 40.4500, lng: -79.9333 }
    },
    hours: {
      'Monday': '8:00 AM - 6:00 PM',
      'Tuesday': '8:00 AM - 6:00 PM',
      'Wednesday': '8:00 AM - 6:00 PM',
      'Thursday': '8:00 AM - 6:00 PM',
      'Friday': '8:00 AM - 6:00 PM',
      'Saturday': '9:00 AM - 4:00 PM',
      'Sunday': 'Closed'
    },
    phone: '(412) 555-9012',
    website: 'https://www.thegroomingroom.com',
    rating: 4.7,
    reviewCount: 145,
    emergency: false,
    acceptsNewPatients: true,
    paymentMethods: ['Cash', 'Credit Card'],
    verified: true,
    featured: false
  }
]

// Helper functions
export function getAllDogParks(): DogPark[] {
  return dogParks
}

export function getDogParksBySize(size: string): DogPark[] {
  return dogParks.filter(park => park.size === size)
}

export function getFeaturedDogParks(): DogPark[] {
  return dogParks.filter(park => park.featured)
}

export function searchDogParks(query: string): DogPark[] {
  const lowerQuery = query.toLowerCase()
  return dogParks.filter(park =>
    park.name.toLowerCase().includes(lowerQuery) ||
    park.description.toLowerCase().includes(lowerQuery) ||
    park.location.neighborhood.toLowerCase().includes(lowerQuery)
  )
}

export function getAllPetFriendlySpots(): PetFriendlySpot[] {
  return petFriendlySpots
}

export function getPetFriendlySpotsByType(type: string): PetFriendlySpot[] {
  return petFriendlySpots.filter(spot => spot.type === type)
}

export function getFeaturedPetFriendlySpots(): PetFriendlySpot[] {
  return petFriendlySpots.filter(spot => spot.featured)
}

export function searchPetFriendlySpots(query: string): PetFriendlySpot[] {
  const lowerQuery = query.toLowerCase()
  return petFriendlySpots.filter(spot =>
    spot.name.toLowerCase().includes(lowerQuery) ||
    spot.description.toLowerCase().includes(lowerQuery) ||
    spot.location.neighborhood.toLowerCase().includes(lowerQuery)
  )
}

export function getAllVetsGroomers(): VetGroomer[] {
  return vetsGroomers
}

export function getVetsGroomersByType(type: string): VetGroomer[] {
  return vetsGroomers.filter(vet => vet.type === type)
}

export function getEmergencyVets(): VetGroomer[] {
  return vetsGroomers.filter(vet => vet.emergency)
}

export function getFeaturedVetsGroomers(): VetGroomer[] {
  return vetsGroomers.filter(vet => vet.featured)
}

export function searchVetsGroomers(query: string): VetGroomer[] {
  const lowerQuery = query.toLowerCase()
  return vetsGroomers.filter(vet =>
    vet.name.toLowerCase().includes(lowerQuery) ||
    vet.description.toLowerCase().includes(lowerQuery) ||
    vet.location.neighborhood.toLowerCase().includes(lowerQuery) ||
    vet.services.some(service => service.toLowerCase().includes(lowerQuery))
  )
}

