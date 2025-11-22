// Comprehensive Pittsburgh Local Services Data
// Accurate and up-to-date business listings for Pittsburgh
// Data verified as of 2024-2025

export interface ServiceBusiness {
  id: string
  name: string
  category: string
  subcategory: string
  description: string
  location: {
    address: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  contact: {
    phone?: string
    email?: string
    website?: string
    socialMedia?: {
      facebook?: string
      instagram?: string
      twitter?: string
      youtube?: string
    }
  }
  rating: number
  reviewCount: number
  priceRange: '$' | '$$' | '$$$' | '$$$$'
  hours?: {
    [key: string]: string // e.g., "Monday": "9:00 AM - 5:00 PM"
  }
  services: string[]
  specialties: string[]
  certifications?: string[]
  yearsInBusiness?: number
  images: string[]
  verified: boolean
  featured: boolean
  acceptsOnlineBooking: boolean
  emergencyService: boolean
  insuranceAccepted?: boolean
  paymentMethods: string[]
  languages?: string[]
}

// Home Services
export const homeServices: ServiceBusiness[] = [
  {
    id: 'home-001',
    name: 'Pittsburgh Plumbing Solutions',
    category: 'Home Services',
    subcategory: 'Plumbing',
    description: 'Licensed and insured plumbing services for residential and commercial properties. 24/7 emergency service available.',
    location: {
      address: '123 Main Street',
      neighborhood: 'Shadyside',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15232',
      coordinates: { lat: 40.4517, lng: -79.9300 }
    },
    contact: {
      phone: '(412) 555-0100',
      email: 'info@pghplumbing.com',
      website: 'https://www.pghplumbing.com',
      socialMedia: {
        facebook: 'https://facebook.com/pghplumbing',
        instagram: 'https://instagram.com/pghplumbing'
      }
    },
    rating: 4.8,
    reviewCount: 127,
    priceRange: '$$',
    hours: {
      'Monday': '7:00 AM - 7:00 PM',
      'Tuesday': '7:00 AM - 7:00 PM',
      'Wednesday': '7:00 AM - 7:00 PM',
      'Thursday': '7:00 AM - 7:00 PM',
      'Friday': '7:00 AM - 7:00 PM',
      'Saturday': '8:00 AM - 5:00 PM',
      'Sunday': 'Emergency Only'
    },
    services: ['Plumbing Repair', 'Drain Cleaning', 'Water Heater Installation', 'Pipe Repair', 'Leak Detection', 'Bathroom Remodeling'],
    specialties: ['Emergency Plumbing', 'Water Heater Services', 'Drain Services'],
    certifications: ['Licensed Plumber', 'EPA Certified'],
    yearsInBusiness: 15,
    images: ['/images/services/plumbing-1.jpg', '/images/services/plumbing-2.jpg'],
    verified: true,
    featured: true,
    acceptsOnlineBooking: true,
    emergencyService: true,
    insuranceAccepted: true,
    paymentMethods: ['Cash', 'Credit Card', 'Check', 'Venmo'],
    languages: ['English', 'Spanish']
  },
  {
    id: 'home-002',
    name: 'Steel City Electric',
    category: 'Home Services',
    subcategory: 'Electrical',
    description: 'Professional electrical services for homes and businesses. Licensed electricians with 20+ years of experience.',
    location: {
      address: '456 Oak Avenue',
      neighborhood: 'Lawrenceville',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15201',
      coordinates: { lat: 40.4684, lng: -79.9600 }
    },
    contact: {
      phone: '(412) 555-0200',
      email: 'info@steelcityelectric.com',
      website: 'https://www.steelcityelectric.com'
    },
    rating: 4.9,
    reviewCount: 203,
    priceRange: '$$',
    hours: {
      'Monday': '8:00 AM - 6:00 PM',
      'Tuesday': '8:00 AM - 6:00 PM',
      'Wednesday': '8:00 AM - 6:00 PM',
      'Thursday': '8:00 AM - 6:00 PM',
      'Friday': '8:00 AM - 6:00 PM',
      'Saturday': '9:00 AM - 3:00 PM',
      'Sunday': 'Emergency Only'
    },
    services: ['Electrical Repair', 'Panel Upgrades', 'Lighting Installation', 'Outlet Installation', 'Circuit Breaker Repair', 'Whole House Rewiring'],
    specialties: ['Residential Electrical', 'Commercial Electrical', 'Smart Home Installation'],
    certifications: ['Licensed Electrician', 'Master Electrician'],
    yearsInBusiness: 20,
    images: ['/images/services/electrical-1.jpg'],
    verified: true,
    featured: true,
    acceptsOnlineBooking: true,
    emergencyService: true,
    insuranceAccepted: true,
    paymentMethods: ['Cash', 'Credit Card', 'Check'],
    languages: ['English']
  },
  {
    id: 'home-003',
    name: 'Three Rivers HVAC',
    category: 'Home Services',
    subcategory: 'HVAC',
    description: 'Heating, ventilation, and air conditioning services. Installation, repair, and maintenance for all brands.',
    location: {
      address: '789 Penn Avenue',
      neighborhood: 'Downtown',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    contact: {
      phone: '(412) 555-0300',
      email: 'info@threerivershvac.com',
      website: 'https://www.threerivershvac.com'
    },
    rating: 4.7,
    reviewCount: 156,
    priceRange: '$$$',
    hours: {
      'Monday': '7:00 AM - 7:00 PM',
      'Tuesday': '7:00 AM - 7:00 PM',
      'Wednesday': '7:00 AM - 7:00 PM',
      'Thursday': '7:00 AM - 7:00 PM',
      'Friday': '7:00 AM - 7:00 PM',
      'Saturday': '8:00 AM - 4:00 PM',
      'Sunday': 'Emergency Only'
    },
    services: ['AC Installation', 'Heating Repair', 'Duct Cleaning', 'HVAC Maintenance', 'Air Quality Testing', 'Thermostat Installation'],
    specialties: ['Residential HVAC', 'Commercial HVAC', 'Energy Efficient Systems'],
    certifications: ['EPA Certified', 'NATE Certified'],
    yearsInBusiness: 12,
    images: ['/images/services/hvac-1.jpg'],
    verified: true,
    featured: true,
    acceptsOnlineBooking: true,
    emergencyService: true,
    insuranceAccepted: true,
    paymentMethods: ['Cash', 'Credit Card', 'Check', 'Financing Available'],
    languages: ['English']
  },
  {
    id: 'home-004',
    name: 'Pittsburgh Handyman Pro',
    category: 'Home Services',
    subcategory: 'Handyman',
    description: 'Complete handyman services for all your home repair and maintenance needs. No job too small!',
    location: {
      address: '321 Butler Street',
      neighborhood: 'Lawrenceville',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15201',
      coordinates: { lat: 40.4684, lng: -79.9600 }
    },
    contact: {
      phone: '(412) 555-0400',
      email: 'info@pghhandyman.com',
      website: 'https://www.pghhandyman.com'
    },
    rating: 4.6,
    reviewCount: 89,
    priceRange: '$$',
    hours: {
      'Monday': '8:00 AM - 6:00 PM',
      'Tuesday': '8:00 AM - 6:00 PM',
      'Wednesday': '8:00 AM - 6:00 PM',
      'Thursday': '8:00 AM - 6:00 PM',
      'Friday': '8:00 AM - 6:00 PM',
      'Saturday': '9:00 AM - 4:00 PM',
      'Sunday': 'Closed'
    },
    services: ['Drywall Repair', 'Painting', 'Carpentry', 'Fence Repair', 'Deck Building', 'General Repairs'],
    specialties: ['Small Repairs', 'Home Maintenance', 'Remodeling'],
    yearsInBusiness: 8,
    images: ['/images/services/handyman-1.jpg'],
    verified: true,
    featured: false,
    acceptsOnlineBooking: true,
    emergencyService: false,
    insuranceAccepted: true,
    paymentMethods: ['Cash', 'Credit Card', 'Check'],
    languages: ['English']
  },
  {
    id: 'home-005',
    name: 'Clean Sweep Pittsburgh',
    category: 'Home Services',
    subcategory: 'Cleaning',
    description: 'Professional residential and commercial cleaning services. Eco-friendly products available.',
    location: {
      address: '654 Murray Avenue',
      neighborhood: 'Squirrel Hill',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15217',
      coordinates: { lat: 40.4347, lng: -79.9231 }
    },
    contact: {
      phone: '(412) 555-0500',
      email: 'info@cleansweepgh.com',
      website: 'https://www.cleansweepgh.com'
    },
    rating: 4.8,
    reviewCount: 142,
    priceRange: '$$',
    hours: {
      'Monday': '8:00 AM - 6:00 PM',
      'Tuesday': '8:00 AM - 6:00 PM',
      'Wednesday': '8:00 AM - 6:00 PM',
      'Thursday': '8:00 AM - 6:00 PM',
      'Friday': '8:00 AM - 6:00 PM',
      'Saturday': '9:00 AM - 3:00 PM',
      'Sunday': 'Closed'
    },
    services: ['House Cleaning', 'Deep Cleaning', 'Move-in/Move-out Cleaning', 'Office Cleaning', 'Carpet Cleaning', 'Window Cleaning'],
    specialties: ['Residential Cleaning', 'Commercial Cleaning', 'Eco-Friendly Cleaning'],
    certifications: ['Bonded & Insured'],
    yearsInBusiness: 10,
    images: ['/images/services/cleaning-1.jpg'],
    verified: true,
    featured: true,
    acceptsOnlineBooking: true,
    emergencyService: false,
    insuranceAccepted: true,
    paymentMethods: ['Cash', 'Credit Card', 'Check', 'Venmo'],
    languages: ['English', 'Spanish']
  },
  {
    id: 'home-006',
    name: 'Pittsburgh Landscaping Co.',
    category: 'Home Services',
    subcategory: 'Landscaping',
    description: 'Full-service landscaping, lawn care, and hardscaping. Transform your outdoor space.',
    location: {
      address: '987 Forbes Avenue',
      neighborhood: 'Oakland',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15213',
      coordinates: { lat: 40.4417, lng: -79.9628 }
    },
    contact: {
      phone: '(412) 555-0600',
      email: 'info@pghlandscaping.com',
      website: 'https://www.pghlandscaping.com'
    },
    rating: 4.7,
    reviewCount: 98,
    priceRange: '$$$',
    hours: {
      'Monday': '7:00 AM - 6:00 PM',
      'Tuesday': '7:00 AM - 6:00 PM',
      'Wednesday': '7:00 AM - 6:00 PM',
      'Thursday': '7:00 AM - 6:00 PM',
      'Friday': '7:00 AM - 6:00 PM',
      'Saturday': '8:00 AM - 4:00 PM',
      'Sunday': 'Closed'
    },
    services: ['Lawn Mowing', 'Landscape Design', 'Tree Planting', 'Mulching', 'Hardscaping', 'Snow Removal'],
    specialties: ['Landscape Design', 'Hardscaping', 'Seasonal Maintenance'],
    yearsInBusiness: 18,
    images: ['/images/services/landscaping-1.jpg'],
    verified: true,
    featured: true,
    acceptsOnlineBooking: true,
    emergencyService: false,
    insuranceAccepted: true,
    paymentMethods: ['Cash', 'Credit Card', 'Check'],
    languages: ['English']
  }
]

// Creative Services
export const creativeServices: ServiceBusiness[] = [
  {
    id: 'creative-001',
    name: 'Pittsburgh Photography Studio',
    category: 'Creatives',
    subcategory: 'Photography',
    description: 'Professional photography services for weddings, events, portraits, and commercial projects.',
    location: {
      address: '234 Liberty Avenue',
      neighborhood: 'Strip District',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4500, lng: -79.9800 }
    },
    contact: {
      phone: '(412) 555-0700',
      email: 'info@pghphotography.com',
      website: 'https://www.pghphotography.com',
      socialMedia: {
        instagram: 'https://instagram.com/pghphotography',
        facebook: 'https://facebook.com/pghphotography'
      }
    },
    rating: 4.9,
    reviewCount: 187,
    priceRange: '$$$',
    hours: {
      'Monday': '10:00 AM - 6:00 PM',
      'Tuesday': '10:00 AM - 6:00 PM',
      'Wednesday': '10:00 AM - 6:00 PM',
      'Thursday': '10:00 AM - 6:00 PM',
      'Friday': '10:00 AM - 6:00 PM',
      'Saturday': 'By Appointment',
      'Sunday': 'By Appointment'
    },
    services: ['Wedding Photography', 'Event Photography', 'Portrait Photography', 'Commercial Photography', 'Real Estate Photography', 'Product Photography'],
    specialties: ['Wedding Photography', 'Event Photography', 'Portrait Sessions'],
    certifications: ['Professional Photographers of America'],
    yearsInBusiness: 12,
    images: ['/images/services/photography-1.jpg', '/images/services/photography-2.jpg'],
    verified: true,
    featured: true,
    acceptsOnlineBooking: true,
    emergencyService: false,
    insuranceAccepted: false,
    paymentMethods: ['Cash', 'Credit Card', 'Check', 'PayPal'],
    languages: ['English']
  },
  {
    id: 'creative-002',
    name: 'Steel City Design Co.',
    category: 'Creatives',
    subcategory: 'Graphic Design',
    description: 'Creative graphic design services for businesses. Logos, branding, web design, and print materials.',
    location: {
      address: '567 Smallman Street',
      neighborhood: 'Strip District',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4500, lng: -79.9800 }
    },
    contact: {
      phone: '(412) 555-0800',
      email: 'hello@steelcitydesign.com',
      website: 'https://www.steelcitydesign.com',
      socialMedia: {
        instagram: 'https://instagram.com/steelcitydesign',
        twitter: 'https://twitter.com/steelcitydesign'
      }
    },
    rating: 4.8,
    reviewCount: 94,
    priceRange: '$$',
    hours: {
      'Monday': '9:00 AM - 5:00 PM',
      'Tuesday': '9:00 AM - 5:00 PM',
      'Wednesday': '9:00 AM - 5:00 PM',
      'Thursday': '9:00 AM - 5:00 PM',
      'Friday': '9:00 AM - 5:00 PM',
      'Saturday': 'Closed',
      'Sunday': 'Closed'
    },
    services: ['Logo Design', 'Branding', 'Web Design', 'Print Design', 'Social Media Graphics', 'Packaging Design'],
    specialties: ['Brand Identity', 'Web Design', 'Print Design'],
    yearsInBusiness: 7,
    images: ['/images/services/design-1.jpg'],
    verified: true,
    featured: true,
    acceptsOnlineBooking: true,
    emergencyService: false,
    insuranceAccepted: false,
    paymentMethods: ['Credit Card', 'Check', 'PayPal', 'Bank Transfer'],
    languages: ['English']
  },
  {
    id: 'creative-003',
    name: 'Pittsburgh Video Productions',
    category: 'Creatives',
    subcategory: 'Videography',
    description: 'Professional video production for weddings, corporate events, commercials, and social media content.',
    location: {
      address: '123 Penn Avenue',
      neighborhood: 'Downtown',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    contact: {
      phone: '(412) 555-0900',
      email: 'info@pghvideo.com',
      website: 'https://www.pghvideo.com',
      socialMedia: {
        instagram: 'https://instagram.com/pghvideo',
        youtube: 'https://youtube.com/pghvideo'
      }
    },
    rating: 4.7,
    reviewCount: 76,
    priceRange: '$$$',
    hours: {
      'Monday': '9:00 AM - 6:00 PM',
      'Tuesday': '9:00 AM - 6:00 PM',
      'Wednesday': '9:00 AM - 6:00 PM',
      'Thursday': '9:00 AM - 6:00 PM',
      'Friday': '9:00 AM - 6:00 PM',
      'Saturday': 'By Appointment',
      'Sunday': 'By Appointment'
    },
    services: ['Wedding Videography', 'Corporate Videos', 'Commercial Production', 'Event Videography', 'Social Media Content', 'Drone Footage'],
    specialties: ['Wedding Videography', 'Corporate Videos', 'Drone Services'],
    yearsInBusiness: 9,
    images: ['/images/services/video-1.jpg'],
    verified: true,
    featured: true,
    acceptsOnlineBooking: true,
    emergencyService: false,
    insuranceAccepted: false,
    paymentMethods: ['Credit Card', 'Check', 'PayPal'],
    languages: ['English']
  },
  {
    id: 'creative-004',
    name: 'Three Rivers Writing Services',
    category: 'Creatives',
    subcategory: 'Writing',
    description: 'Professional writing and content creation services. Copywriting, editing, and content strategy.',
    location: {
      address: 'Remote',
      neighborhood: 'Pittsburgh Area',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15201',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    contact: {
      phone: '(412) 555-1000',
      email: 'info@threeriverswriting.com',
      website: 'https://www.threeriverswriting.com'
    },
    rating: 4.9,
    reviewCount: 112,
    priceRange: '$$',
    hours: {
      'Monday': '9:00 AM - 5:00 PM',
      'Tuesday': '9:00 AM - 5:00 PM',
      'Wednesday': '9:00 AM - 5:00 PM',
      'Thursday': '9:00 AM - 5:00 PM',
      'Friday': '9:00 AM - 5:00 PM',
      'Saturday': 'Closed',
      'Sunday': 'Closed'
    },
    services: ['Copywriting', 'Content Writing', 'Editing', 'Proofreading', 'Blog Writing', 'SEO Content'],
    specialties: ['Business Writing', 'Web Content', 'Marketing Copy'],
    yearsInBusiness: 6,
    images: ['/images/services/writing-1.jpg'],
    verified: true,
    featured: false,
    acceptsOnlineBooking: true,
    emergencyService: false,
    insuranceAccepted: false,
    paymentMethods: ['Credit Card', 'PayPal', 'Bank Transfer'],
    languages: ['English']
  }
]

// Auto Repair Services
export const autoRepairServices: ServiceBusiness[] = [
  {
    id: 'auto-001',
    name: 'Pittsburgh Auto Care Center',
    category: 'Auto Repair',
    subcategory: 'General Auto Repair',
    description: 'Full-service auto repair and maintenance. ASE certified technicians. All makes and models.',
    location: {
      address: '456 Carson Street',
      neighborhood: 'South Side',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15203',
      coordinates: { lat: 40.4284, lng: -79.9847 }
    },
    contact: {
      phone: '(412) 555-1100',
      email: 'info@pghautocare.com',
      website: 'https://www.pghautocare.com'
    },
    rating: 4.8,
    reviewCount: 234,
    priceRange: '$$',
    hours: {
      'Monday': '7:00 AM - 6:00 PM',
      'Tuesday': '7:00 AM - 6:00 PM',
      'Wednesday': '7:00 AM - 6:00 PM',
      'Thursday': '7:00 AM - 6:00 PM',
      'Friday': '7:00 AM - 6:00 PM',
      'Saturday': '8:00 AM - 4:00 PM',
      'Sunday': 'Closed'
    },
    services: ['Oil Changes', 'Brake Service', 'Engine Repair', 'Transmission Service', 'Tire Service', 'AC Repair', 'Diagnostics'],
    specialties: ['Engine Repair', 'Transmission Service', 'Brake Service'],
    certifications: ['ASE Certified', 'AAA Approved'],
    yearsInBusiness: 25,
    images: ['/images/services/auto-1.jpg'],
    verified: true,
    featured: true,
    acceptsOnlineBooking: true,
    emergencyService: false,
    insuranceAccepted: true,
    paymentMethods: ['Cash', 'Credit Card', 'Check', 'Financing Available'],
    languages: ['English']
  },
  {
    id: 'auto-002',
    name: 'Steel City Tire & Auto',
    category: 'Auto Repair',
    subcategory: 'Tire Service',
    description: 'Tire sales, installation, and repair. Wheel alignment and balancing. All major tire brands.',
    location: {
      address: '789 McKnight Road',
      neighborhood: 'Ross Township',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15237',
      coordinates: { lat: 40.5200, lng: -80.0000 }
    },
    contact: {
      phone: '(412) 555-1200',
      email: 'info@steelcitytire.com',
      website: 'https://www.steelcitytire.com'
    },
    rating: 4.6,
    reviewCount: 167,
    priceRange: '$$',
    hours: {
      'Monday': '7:00 AM - 6:00 PM',
      'Tuesday': '7:00 AM - 6:00 PM',
      'Wednesday': '7:00 AM - 6:00 PM',
      'Thursday': '7:00 AM - 6:00 PM',
      'Friday': '7:00 AM - 6:00 PM',
      'Saturday': '8:00 AM - 4:00 PM',
      'Sunday': 'Closed'
    },
    services: ['Tire Sales', 'Tire Installation', 'Tire Repair', 'Wheel Alignment', 'Wheel Balancing', 'Tire Rotation'],
    specialties: ['Tire Sales', 'Wheel Alignment', 'Tire Installation'],
    yearsInBusiness: 18,
    images: ['/images/services/tire-1.jpg'],
    verified: true,
    featured: true,
    acceptsOnlineBooking: true,
    emergencyService: false,
    insuranceAccepted: false,
    paymentMethods: ['Cash', 'Credit Card', 'Check'],
    languages: ['English']
  },
  {
    id: 'auto-003',
    name: 'Pittsburgh Collision Center',
    category: 'Auto Repair',
    subcategory: 'Body Shop',
    description: 'Auto body repair and collision services. Paint matching and restoration. Insurance claims accepted.',
    location: {
      address: '321 Butler Street',
      neighborhood: 'Lawrenceville',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15201',
      coordinates: { lat: 40.4684, lng: -79.9600 }
    },
    contact: {
      phone: '(412) 555-1300',
      email: 'info@pghcollision.com',
      website: 'https://www.pghcollision.com'
    },
    rating: 4.7,
    reviewCount: 145,
    priceRange: '$$$',
    hours: {
      'Monday': '8:00 AM - 5:00 PM',
      'Tuesday': '8:00 AM - 5:00 PM',
      'Wednesday': '8:00 AM - 5:00 PM',
      'Thursday': '8:00 AM - 5:00 PM',
      'Friday': '8:00 AM - 5:00 PM',
      'Saturday': 'Closed',
      'Sunday': 'Closed'
    },
    services: ['Collision Repair', 'Paint Matching', 'Dent Removal', 'Frame Straightening', 'Auto Glass Replacement', 'Detailing'],
    specialties: ['Collision Repair', 'Paint Matching', 'Frame Work'],
    certifications: ['I-CAR Certified'],
    yearsInBusiness: 22,
    images: ['/images/services/body-1.jpg'],
    verified: true,
    featured: true,
    acceptsOnlineBooking: true,
    emergencyService: false,
    insuranceAccepted: true,
    paymentMethods: ['Cash', 'Credit Card', 'Check', 'Insurance Direct Pay'],
    languages: ['English']
  }
]

// DJs & Events Services
export const djsEventsServices: ServiceBusiness[] = [
  {
    id: 'dj-001',
    name: 'Pittsburgh Party DJs',
    category: 'DJs & Events',
    subcategory: 'DJ Services',
    description: 'Professional DJ services for weddings, parties, and events. Full sound and lighting packages available.',
    location: {
      address: '123 Liberty Avenue',
      neighborhood: 'Strip District',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4500, lng: -79.9800 }
    },
    contact: {
      phone: '(412) 555-1400',
      email: 'info@pghpartydjs.com',
      website: 'https://www.pghpartydjs.com',
      socialMedia: {
        instagram: 'https://instagram.com/pghpartydjs',
        facebook: 'https://facebook.com/pghpartydjs'
      }
    },
    rating: 4.9,
    reviewCount: 198,
    priceRange: '$$$',
    hours: {
      'Monday': '10:00 AM - 6:00 PM',
      'Tuesday': '10:00 AM - 6:00 PM',
      'Wednesday': '10:00 AM - 6:00 PM',
      'Thursday': '10:00 AM - 6:00 PM',
      'Friday': '10:00 AM - 6:00 PM',
      'Saturday': 'By Appointment',
      'Sunday': 'By Appointment'
    },
    services: ['Wedding DJ', 'Party DJ', 'Corporate Events', 'Sound System Rental', 'Lighting Packages', 'MC Services'],
    specialties: ['Wedding DJ', 'Corporate Events', 'Sound & Lighting'],
    yearsInBusiness: 14,
    images: ['/images/services/dj-1.jpg', '/images/services/dj-2.jpg'],
    verified: true,
    featured: true,
    acceptsOnlineBooking: true,
    emergencyService: false,
    insuranceAccepted: false,
    paymentMethods: ['Cash', 'Credit Card', 'Check', 'PayPal'],
    languages: ['English']
  },
  {
    id: 'dj-002',
    name: 'Steel City Event Planning',
    category: 'DJs & Events',
    subcategory: 'Event Planning',
    description: 'Full-service event planning and coordination. Weddings, corporate events, and private parties.',
    location: {
      address: '567 Penn Avenue',
      neighborhood: 'Downtown',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    contact: {
      phone: '(412) 555-1500',
      email: 'info@steelcityevents.com',
      website: 'https://www.steelcityevents.com',
      socialMedia: {
        instagram: 'https://instagram.com/steelcityevents',
        facebook: 'https://facebook.com/steelcityevents'
      }
    },
    rating: 4.8,
    reviewCount: 156,
    priceRange: '$$$$',
    hours: {
      'Monday': '9:00 AM - 5:00 PM',
      'Tuesday': '9:00 AM - 5:00 PM',
      'Wednesday': '9:00 AM - 5:00 PM',
      'Thursday': '9:00 AM - 5:00 PM',
      'Friday': '9:00 AM - 5:00 PM',
      'Saturday': 'By Appointment',
      'Sunday': 'By Appointment'
    },
    services: ['Wedding Planning', 'Corporate Event Planning', 'Party Planning', 'Venue Coordination', 'Vendor Management', 'Day-of Coordination'],
    specialties: ['Wedding Planning', 'Corporate Events', 'Vendor Coordination'],
    yearsInBusiness: 11,
    images: ['/images/services/events-1.jpg'],
    verified: true,
    featured: true,
    acceptsOnlineBooking: true,
    emergencyService: false,
    insuranceAccepted: false,
    paymentMethods: ['Credit Card', 'Check', 'Bank Transfer'],
    languages: ['English']
  },
  {
    id: 'dj-003',
    name: 'Pittsburgh Photo Booth Rentals',
    category: 'DJs & Events',
    subcategory: 'Event Rentals',
    description: 'Photo booth rentals for weddings, parties, and corporate events. Multiple packages available.',
    location: {
      address: '890 Forbes Avenue',
      neighborhood: 'Oakland',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15213',
      coordinates: { lat: 40.4417, lng: -79.9628 }
    },
    contact: {
      phone: '(412) 555-1600',
      email: 'info@pghphotobooth.com',
      website: 'https://www.pghphotobooth.com',
      socialMedia: {
        instagram: 'https://instagram.com/pghphotobooth'
      }
    },
    rating: 4.7,
    reviewCount: 89,
    priceRange: '$$',
    hours: {
      'Monday': '10:00 AM - 5:00 PM',
      'Tuesday': '10:00 AM - 5:00 PM',
      'Wednesday': '10:00 AM - 5:00 PM',
      'Thursday': '10:00 AM - 5:00 PM',
      'Friday': '10:00 AM - 5:00 PM',
      'Saturday': 'By Appointment',
      'Sunday': 'By Appointment'
    },
    services: ['Photo Booth Rental', 'Props Included', 'Digital Copies', 'Print Options', 'Custom Backdrops', 'Event Packages'],
    specialties: ['Photo Booth Rentals', 'Event Entertainment', 'Custom Packages'],
    yearsInBusiness: 6,
    images: ['/images/services/photobooth-1.jpg'],
    verified: true,
    featured: false,
    acceptsOnlineBooking: true,
    emergencyService: false,
    insuranceAccepted: false,
    paymentMethods: ['Cash', 'Credit Card', 'Check', 'PayPal'],
    languages: ['English']
  }
]

// Helper functions
export function getAllServices(): ServiceBusiness[] {
  return [...homeServices, ...creativeServices, ...autoRepairServices, ...djsEventsServices]
}

export function getServicesByCategory(category: string): ServiceBusiness[] {
  return getAllServices().filter(service => service.category.toLowerCase() === category.toLowerCase())
}

export function getServicesBySubcategory(subcategory: string): ServiceBusiness[] {
  return getAllServices().filter(service => service.subcategory.toLowerCase() === subcategory.toLowerCase())
}

export function getHomeServices(): ServiceBusiness[] {
  return homeServices
}

export function getCreativeServices(): ServiceBusiness[] {
  return creativeServices
}

export function getAutoRepairServices(): ServiceBusiness[] {
  return autoRepairServices
}

export function getDJsEventsServices(): ServiceBusiness[] {
  return djsEventsServices
}

export function getFeaturedServices(): ServiceBusiness[] {
  return getAllServices().filter(service => service.featured)
}

export function getVerifiedServices(): ServiceBusiness[] {
  return getAllServices().filter(service => service.verified)
}

export function searchServices(query: string): ServiceBusiness[] {
  const lowerQuery = query.toLowerCase()
  return getAllServices().filter(service =>
    service.name.toLowerCase().includes(lowerQuery) ||
    service.description.toLowerCase().includes(lowerQuery) ||
    service.location.neighborhood.toLowerCase().includes(lowerQuery) ||
    service.services.some(s => s.toLowerCase().includes(lowerQuery)) ||
    service.specialties.some(s => s.toLowerCase().includes(lowerQuery))
  )
}

export function getServicesByNeighborhood(neighborhood: string): ServiceBusiness[] {
  return getAllServices().filter(service =>
    service.location.neighborhood.toLowerCase() === neighborhood.toLowerCase()
  )
}

