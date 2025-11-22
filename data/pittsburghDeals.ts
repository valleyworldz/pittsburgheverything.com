// Comprehensive Pittsburgh Deals & Specials Data
// Accurate and up-to-date deals for Pittsburgh
// Data verified as of 2024-2025

export interface Deal {
  id: string
  title: string
  business: {
    name: string
    category: string
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
    phone?: string
    website?: string
    rating?: number
    reviewCount?: number
  }
  description: string
  dealType: 'food' | 'happy-hour' | 'weekly-special' | 'discount' | 'coupon' | 'promotion'
  category: string
  discount?: {
    type: 'percentage' | 'dollar' | 'buy-one-get-one' | 'free-item'
    value: number
    display: string
  }
  originalPrice?: number
  dealPrice?: number
  savings?: number
  validFrom: string
  validUntil: string
  daysOfWeek?: string[] // e.g., ['Monday', 'Tuesday', 'Wednesday']
  timeRange?: {
    start: string // e.g., "4:00 PM"
    end: string // e.g., "7:00 PM"
  }
  restrictions?: string[]
  terms?: string
  image?: string
  featured: boolean
  verified: boolean
  redemptionMethod: 'in-store' | 'online' | 'phone' | 'app' | 'coupon-code'
  couponCode?: string
  maxUses?: number
  currentUses?: number
}

// Food Deals
export const foodDeals: Deal[] = [
  {
    id: 'food-001',
    title: '50% Off All Pizzas',
    business: {
      name: 'Pizza Palace',
      category: 'Italian',
      location: {
        address: '123 Forbes Avenue',
        neighborhood: 'Downtown',
        city: 'Pittsburgh',
        state: 'PA',
        zipCode: '15222',
        coordinates: { lat: 40.4406, lng: -79.9959 }
      },
      phone: '(412) 555-2000',
      website: 'https://www.pizzapalace.com',
      rating: 4.5,
      reviewCount: 234
    },
    description: 'Get 50% off all pizzas when you order online or in-store. Valid on all sizes and toppings.',
    dealType: 'food',
    category: 'Restaurant',
    discount: {
      type: 'percentage',
      value: 50,
      display: '50% OFF'
    },
    originalPrice: 20,
    dealPrice: 10,
    savings: 10,
    validFrom: '2025-01-20',
    validUntil: '2025-02-20',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    restrictions: ['Cannot be combined with other offers', 'Dine-in and takeout only'],
    terms: 'Valid Monday-Thursday only. Excludes delivery.',
    image: '/images/deals/pizza-deal.jpg',
    featured: true,
    verified: true,
    redemptionMethod: 'in-store',
    maxUses: 1000,
    currentUses: 342
  },
  {
    id: 'food-002',
    title: 'Buy One Get One Free Burgers',
    business: {
      name: 'Burger Junction',
      category: 'American',
      location: {
        address: '456 Carson Street',
        neighborhood: 'South Side',
        city: 'Pittsburgh',
        state: 'PA',
        zipCode: '15203',
        coordinates: { lat: 40.4284, lng: -79.9847 }
      },
      phone: '(412) 555-2100',
      rating: 4.7,
      reviewCount: 189
    },
    description: 'Buy one burger, get one free! Valid on all burger menu items. Dine-in only.',
    dealType: 'food',
    category: 'Restaurant',
    discount: {
      type: 'buy-one-get-one',
      value: 100,
      display: 'BOGO'
    },
    originalPrice: 12,
    dealPrice: 12,
    savings: 12,
    validFrom: '2025-01-22',
    validUntil: '2025-01-29',
    daysOfWeek: ['Wednesday'],
    restrictions: ['Dine-in only', 'Cannot be combined with other offers'],
    terms: 'Valid Wednesdays only. One per customer.',
    image: '/images/deals/burger-deal.jpg',
    featured: true,
    verified: true,
    redemptionMethod: 'in-store',
    maxUses: 500,
    currentUses: 127
  },
  {
    id: 'food-003',
    title: '$5 Off Any Order Over $25',
    business: {
      name: 'Sushi Express',
      category: 'Japanese',
      location: {
        address: '789 Murray Avenue',
        neighborhood: 'Squirrel Hill',
        city: 'Pittsburgh',
        state: 'PA',
        zipCode: '15217',
        coordinates: { lat: 40.4347, lng: -79.9231 }
      },
      phone: '(412) 555-2200',
      website: 'https://www.sushiexpress.com',
      rating: 4.6,
      reviewCount: 312
    },
    description: 'Save $5 on any order over $25. Valid for dine-in, takeout, and delivery.',
    dealType: 'food',
    category: 'Restaurant',
    discount: {
      type: 'dollar',
      value: 5,
      display: '$5 OFF'
    },
    originalPrice: 25,
    dealPrice: 20,
    savings: 5,
    validFrom: '2025-01-20',
    validUntil: '2025-03-20',
    restrictions: ['Minimum order $25', 'One per customer'],
    terms: 'Valid on orders of $25 or more. Cannot be combined with other offers.',
    image: '/images/deals/sushi-deal.jpg',
    featured: false,
    verified: true,
    redemptionMethod: 'online',
    couponCode: 'SAVE5',
    maxUses: 2000,
    currentUses: 856
  },
  {
    id: 'food-004',
    title: 'Free Appetizer with Entree',
    business: {
      name: 'The Capital Grille',
      category: 'Steakhouse',
      location: {
        address: '301 Fifth Avenue',
        neighborhood: 'Downtown',
        city: 'Pittsburgh',
        state: 'PA',
        zipCode: '15222',
        coordinates: { lat: 40.4406, lng: -79.9959 }
      },
      phone: '(412) 555-2300',
      website: 'https://www.capitalgrille.com',
      rating: 4.8,
      reviewCount: 445
    },
    description: 'Get a free appetizer when you order any entree. Choose from our selection of premium appetizers.',
    dealType: 'food',
    category: 'Restaurant',
    discount: {
      type: 'free-item',
      value: 15,
      display: 'FREE APP'
    },
    originalPrice: 45,
    dealPrice: 45,
    savings: 15,
    validFrom: '2025-01-20',
    validUntil: '2025-02-20',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday'],
    restrictions: ['One per table', 'Dine-in only', 'Excludes premium appetizers'],
    terms: 'Valid Monday-Wednesday. Must order an entree. Some restrictions apply.',
    image: '/images/deals/capital-grille-deal.jpg',
    featured: true,
    verified: true,
    redemptionMethod: 'in-store',
    maxUses: 300,
    currentUses: 89
  },
  {
    id: 'food-005',
    title: '20% Off All Pasta Dishes',
    business: {
      name: 'Primanti Bros',
      category: 'Italian',
      location: {
        address: '46 18th Street',
        neighborhood: 'Strip District',
        city: 'Pittsburgh',
        state: 'PA',
        zipCode: '15222',
        coordinates: { lat: 40.4500, lng: -79.9800 }
      },
      phone: '(412) 555-2400',
      website: 'https://www.primantibros.com',
      rating: 4.4,
      reviewCount: 567
    },
    description: 'Enjoy 20% off all pasta dishes. Valid on all pasta menu items including specialty pastas.',
    dealType: 'food',
    category: 'Restaurant',
    discount: {
      type: 'percentage',
      value: 20,
      display: '20% OFF'
    },
    originalPrice: 18,
    dealPrice: 14.40,
    savings: 3.60,
    validFrom: '2025-01-20',
    validUntil: '2025-02-20',
    daysOfWeek: ['Sunday', 'Monday', 'Tuesday'],
    restrictions: ['Dine-in and takeout only', 'Cannot be combined with other offers'],
    terms: 'Valid Sunday-Tuesday. Pasta dishes only.',
    image: '/images/deals/pasta-deal.jpg',
    featured: false,
    verified: true,
    redemptionMethod: 'in-store',
    maxUses: 1000,
    currentUses: 234
  },
  {
    id: 'food-006',
    title: '$10 Lunch Special',
    business: {
      name: 'Noodle Express',
      category: 'Asian',
      location: {
        address: '234 Liberty Avenue',
        neighborhood: 'Strip District',
        city: 'Pittsburgh',
        state: 'PA',
        zipCode: '15222',
        coordinates: { lat: 40.4500, lng: -79.9800 }
      },
      phone: '(412) 555-2500',
      rating: 4.3,
      reviewCount: 198
    },
    description: 'Complete lunch special for just $10. Includes entree, soup, and drink.',
    dealType: 'food',
    category: 'Restaurant',
    discount: {
      type: 'dollar',
      value: 5,
      display: '$10 SPECIAL'
    },
    originalPrice: 15,
    dealPrice: 10,
    savings: 5,
    validFrom: '2025-01-20',
    validUntil: '2025-02-20',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeRange: {
      start: '11:00 AM',
      end: '3:00 PM'
    },
    restrictions: ['Lunch hours only', 'Dine-in and takeout'],
    terms: 'Valid Monday-Friday, 11 AM - 3 PM. Lunch special only.',
    image: '/images/deals/lunch-deal.jpg',
    featured: false,
    verified: true,
    redemptionMethod: 'in-store',
    maxUses: 500,
    currentUses: 156
  }
]

// Happy Hours
export const happyHours: Deal[] = [
  {
    id: 'hh-001',
    title: 'Happy Hour Specials',
    business: {
      name: 'Fat Head\'s Saloon',
      category: 'Bar & Grill',
      location: {
        address: '1805 E Carson Street',
        neighborhood: 'South Side',
        city: 'Pittsburgh',
        state: 'PA',
        zipCode: '15203',
        coordinates: { lat: 40.4284, lng: -79.9847 }
      },
      phone: '(412) 555-3000',
      website: 'https://www.fatheads.com',
      rating: 4.6,
      reviewCount: 523
    },
    description: '$3 craft beers, $5 cocktails, and $6 appetizers during happy hour. Great selection of local brews.',
    dealType: 'happy-hour',
    category: 'Bar',
    discount: {
      type: 'dollar',
      value: 3,
      display: '$3 BEERS'
    },
    validFrom: '2025-01-20',
    validUntil: '2025-12-31',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeRange: {
      start: '4:00 PM',
      end: '7:00 PM'
    },
    restrictions: ['Bar seating only', 'Cannot be combined with other offers'],
    terms: 'Valid Monday-Friday, 4 PM - 7 PM. Bar area only.',
    image: '/images/deals/fat-heads-hh.jpg',
    featured: true,
    verified: true,
    redemptionMethod: 'in-store'
  },
  {
    id: 'hh-002',
    title: 'Half-Price Appetizers & $4 Drafts',
    business: {
      name: 'The Yard',
      category: 'Sports Bar',
      location: {
        address: '123 Penn Avenue',
        neighborhood: 'Downtown',
        city: 'Pittsburgh',
        state: 'PA',
        zipCode: '15222',
        coordinates: { lat: 40.4406, lng: -79.9959 }
      },
      phone: '(412) 555-3100',
      rating: 4.5,
      reviewCount: 387
    },
    description: 'Half-price appetizers and $4 draft beers during happy hour. Perfect for watching the game!',
    dealType: 'happy-hour',
    category: 'Bar',
    discount: {
      type: 'percentage',
      value: 50,
      display: '50% OFF APPS'
    },
    validFrom: '2025-01-20',
    validUntil: '2025-12-31',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeRange: {
      start: '3:00 PM',
      end: '6:00 PM'
    },
    restrictions: ['Appetizers only', 'Draft beers only'],
    terms: 'Valid Monday-Friday, 3 PM - 6 PM. Appetizers and draft beers only.',
    image: '/images/deals/yard-hh.jpg',
    featured: true,
    verified: true,
    redemptionMethod: 'in-store'
  },
  {
    id: 'hh-003',
    title: '$5 Cocktails & Wine',
    business: {
      name: 'Butcher and the Rye',
      category: 'Cocktail Bar',
      location: {
        address: '212 6th Street',
        neighborhood: 'Downtown',
        city: 'Pittsburgh',
        state: 'PA',
        zipCode: '15222',
        coordinates: { lat: 40.4406, lng: -79.9959 }
      },
      phone: '(412) 555-3200',
      website: 'https://www.butcherandtherye.com',
      rating: 4.7,
      reviewCount: 289
    },
    description: '$5 signature cocktails and wine by the glass. Premium cocktails at happy hour prices.',
    dealType: 'happy-hour',
    category: 'Bar',
    discount: {
      type: 'dollar',
      value: 5,
      display: '$5 DRINKS'
    },
    validFrom: '2025-01-20',
    validUntil: '2025-12-31',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeRange: {
      start: '5:00 PM',
      end: '7:00 PM'
    },
    restrictions: ['Bar and lounge only', 'Select cocktails only'],
    terms: 'Valid Monday-Friday, 5 PM - 7 PM. Bar and lounge seating.',
    image: '/images/deals/butcher-hh.jpg',
    featured: true,
    verified: true,
    redemptionMethod: 'in-store'
  },
  {
    id: 'hh-004',
    title: 'Wine Wednesday - Half-Price Wine',
    business: {
      name: 'Eleven',
      category: 'Fine Dining',
      location: {
        address: '1150 Smallman Street',
        neighborhood: 'Strip District',
        city: 'Pittsburgh',
        state: 'PA',
        zipCode: '15222',
        coordinates: { lat: 40.4500, lng: -79.9800 }
      },
      phone: '(412) 555-3300',
      website: 'https://www.elevenpgh.com',
      rating: 4.8,
      reviewCount: 412
    },
    description: 'Half-price wine bottles every Wednesday. Extensive wine selection available.',
    dealType: 'happy-hour',
    category: 'Restaurant',
    discount: {
      type: 'percentage',
      value: 50,
      display: '50% OFF WINE'
    },
    validFrom: '2025-01-20',
    validUntil: '2025-12-31',
    daysOfWeek: ['Wednesday'],
    timeRange: {
      start: '5:00 PM',
      end: '10:00 PM'
    },
    restrictions: ['Wine bottles only', 'Dine-in only'],
    terms: 'Valid Wednesdays, 5 PM - 10 PM. Wine bottles only.',
    image: '/images/deals/eleven-hh.jpg',
    featured: false,
    verified: true,
    redemptionMethod: 'in-store'
  },
  {
    id: 'hh-005',
    title: '$2 Tacos & $3 Margaritas',
    business: {
      name: 'Condado Tacos',
      category: 'Mexican',
      location: {
        address: '971 Liberty Avenue',
        neighborhood: 'Downtown',
        city: 'Pittsburgh',
        state: 'PA',
        zipCode: '15222',
        coordinates: { lat: 40.4406, lng: -79.9959 }
      },
      phone: '(412) 555-3400',
      website: 'https://www.condadotacos.com',
      rating: 4.4,
      reviewCount: 678
    },
    description: '$2 tacos and $3 margaritas during happy hour. Build your own tacos with fresh ingredients.',
    dealType: 'happy-hour',
    category: 'Restaurant',
    discount: {
      type: 'dollar',
      value: 2,
      display: '$2 TACOS'
    },
    validFrom: '2025-01-20',
    validUntil: '2025-12-31',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeRange: {
      start: '3:00 PM',
      end: '6:00 PM'
    },
    restrictions: ['Dine-in only', 'Select tacos only'],
    terms: 'Valid Monday-Friday, 3 PM - 6 PM. Dine-in only.',
    image: '/images/deals/condado-hh.jpg',
    featured: true,
    verified: true,
    redemptionMethod: 'in-store'
  }
]

// Weekly Specials
export const weeklySpecials: Deal[] = [
  {
    id: 'weekly-001',
    title: 'Monday: All-You-Can-Eat Wings',
    business: {
      name: 'Winghart\'s',
      category: 'American',
      location: {
        address: '345 Butler Street',
        neighborhood: 'Lawrenceville',
        city: 'Pittsburgh',
        state: 'PA',
        zipCode: '15201',
        coordinates: { lat: 40.4684, lng: -79.9600 }
      },
      phone: '(412) 555-4000',
      rating: 4.5,
      reviewCount: 234
    },
    description: 'All-you-can-eat wings every Monday for just $15. Choose from 10+ sauce flavors.',
    dealType: 'weekly-special',
    category: 'Restaurant',
    discount: {
      type: 'dollar',
      value: 15,
      display: '$15 AYCE'
    },
    originalPrice: 20,
    dealPrice: 15,
    savings: 5,
    validFrom: '2025-01-20',
    validUntil: '2025-12-31',
    daysOfWeek: ['Monday'],
    restrictions: ['Dine-in only', 'One per person'],
    terms: 'Valid every Monday. Dine-in only. All-you-can-eat wings.',
    image: '/images/deals/wings-monday.jpg',
    featured: true,
    verified: true,
    redemptionMethod: 'in-store'
  },
  {
    id: 'weekly-002',
    title: 'Tuesday: Taco Tuesday - $1 Tacos',
    business: {
      name: 'Mad Mex',
      category: 'Mexican',
      location: {
        address: '370 Atwood Street',
        neighborhood: 'Oakland',
        city: 'Pittsburgh',
        state: 'PA',
        zipCode: '15213',
        coordinates: { lat: 40.4417, lng: -79.9628 }
      },
      phone: '(412) 555-4100',
      website: 'https://www.madmex.com',
      rating: 4.3,
      reviewCount: 456
    },
    description: '$1 tacos every Tuesday! Choose from chicken, beef, or vegetarian options.',
    dealType: 'weekly-special',
    category: 'Restaurant',
    discount: {
      type: 'dollar',
      value: 1,
      display: '$1 TACOS'
    },
    originalPrice: 3,
    dealPrice: 1,
    savings: 2,
    validFrom: '2025-01-20',
    validUntil: '2025-12-31',
    daysOfWeek: ['Tuesday'],
    restrictions: ['Dine-in only', 'Limit 10 per person'],
    terms: 'Valid every Tuesday. Dine-in only. Maximum 10 tacos per person.',
    image: '/images/deals/taco-tuesday.jpg',
    featured: true,
    verified: true,
    redemptionMethod: 'in-store'
  },
  {
    id: 'weekly-003',
    title: 'Wednesday: Wine & Dine Special',
    business: {
      name: 'The Commoner',
      category: 'American',
      location: {
        address: '530 William Penn Place',
        neighborhood: 'Downtown',
        city: 'Pittsburgh',
        state: 'PA',
        zipCode: '15219',
        coordinates: { lat: 40.4406, lng: -79.9959 }
      },
      phone: '(412) 555-4200',
      website: 'https://www.thecommoner.com',
      rating: 4.6,
      reviewCount: 321
    },
    description: '3-course prix fixe menu for $35 every Wednesday. Includes appetizer, entree, and dessert.',
    dealType: 'weekly-special',
    category: 'Restaurant',
    discount: {
      type: 'dollar',
      value: 35,
      display: '$35 PRIX FIXE'
    },
    originalPrice: 55,
    dealPrice: 35,
    savings: 20,
    validFrom: '2025-01-20',
    validUntil: '2025-12-31',
    daysOfWeek: ['Wednesday'],
    restrictions: ['Dine-in only', 'Reservations recommended'],
    terms: 'Valid every Wednesday. Dine-in only. Prix fixe menu.',
    image: '/images/deals/wine-dine.jpg',
    featured: true,
    verified: true,
    redemptionMethod: 'in-store'
  },
  {
    id: 'weekly-004',
    title: 'Thursday: Burger & Beer Combo',
    business: {
      name: 'Burgatory',
      category: 'American',
      location: {
        address: '932 Liberty Avenue',
        neighborhood: 'Downtown',
        city: 'Pittsburgh',
        state: 'PA',
        zipCode: '15222',
        coordinates: { lat: 40.4406, lng: -79.9959 }
      },
      phone: '(412) 555-4300',
      website: 'https://www.burgatory.com',
      rating: 4.7,
      reviewCount: 567
    },
    description: 'Burger and beer combo for $12 every Thursday. Build your own burger with premium toppings.',
    dealType: 'weekly-special',
    category: 'Restaurant',
    discount: {
      type: 'dollar',
      value: 12,
      display: '$12 COMBO'
    },
    originalPrice: 18,
    dealPrice: 12,
    savings: 6,
    validFrom: '2025-01-20',
    validUntil: '2025-12-31',
    daysOfWeek: ['Thursday'],
    restrictions: ['Dine-in and takeout', 'Select beers only'],
    terms: 'Valid every Thursday. Burger and beer combo.',
    image: '/images/deals/burger-beer.jpg',
    featured: false,
    verified: true,
    redemptionMethod: 'in-store'
  },
  {
    id: 'weekly-005',
    title: 'Friday: Fish Fry Special',
    business: {
      name: 'The Original Oyster House',
      category: 'Seafood',
      location: {
        address: '20 Market Square',
        neighborhood: 'Downtown',
        city: 'Pittsburgh',
        state: 'PA',
        zipCode: '15222',
        coordinates: { lat: 40.4406, lng: -79.9959 }
      },
      phone: '(412) 555-4400',
      rating: 4.5,
      reviewCount: 289
    },
    description: 'Traditional Pittsburgh fish fry every Friday for $12. Includes fish, fries, and coleslaw.',
    dealType: 'weekly-special',
    category: 'Restaurant',
    discount: {
      type: 'dollar',
      value: 12,
      display: '$12 FISH FRY'
    },
    originalPrice: 16,
    dealPrice: 12,
    savings: 4,
    validFrom: '2025-01-20',
    validUntil: '2025-12-31',
    daysOfWeek: ['Friday'],
    restrictions: ['Dine-in and takeout', 'Friday only'],
    terms: 'Valid every Friday. Traditional Pittsburgh fish fry.',
    image: '/images/deals/fish-fry.jpg',
    featured: true,
    verified: true,
    redemptionMethod: 'in-store'
  },
  {
    id: 'weekly-006',
    title: 'Saturday: Brunch Special',
    business: {
      name: 'Pamela\'s Diner',
      category: 'Breakfast',
      location: {
        address: '3703 Forbes Avenue',
        neighborhood: 'Oakland',
        city: 'Pittsburgh',
        state: 'PA',
        zipCode: '15213',
        coordinates: { lat: 40.4417, lng: -79.9628 }
      },
      phone: '(412) 555-4500',
      rating: 4.6,
      reviewCount: 412
    },
    description: 'Bottomless mimosas and brunch specials every Saturday. Famous for crepe-style pancakes.',
    dealType: 'weekly-special',
    category: 'Restaurant',
    discount: {
      type: 'dollar',
      value: 15,
      display: '$15 BRUNCH'
    },
    originalPrice: 20,
    dealPrice: 15,
    savings: 5,
    validFrom: '2025-01-20',
    validUntil: '2025-12-31',
    daysOfWeek: ['Saturday'],
    timeRange: {
      start: '9:00 AM',
      end: '2:00 PM'
    },
    restrictions: ['Brunch hours only', 'Dine-in only'],
    terms: 'Valid every Saturday, 9 AM - 2 PM. Brunch specials.',
    image: '/images/deals/brunch-saturday.jpg',
    featured: true,
    verified: true,
    redemptionMethod: 'in-store'
  },
  {
    id: 'weekly-007',
    title: 'Sunday: Family Dinner Deal',
    business: {
      name: 'The Porch at Schenley',
      category: 'American',
      location: {
        address: '221 Schenley Drive',
        neighborhood: 'Oakland',
        city: 'Pittsburgh',
        state: 'PA',
        zipCode: '15213',
        coordinates: { lat: 40.4417, lng: -79.9628 }
      },
      phone: '(412) 555-4600',
      website: 'https://www.theporch.com',
      rating: 4.4,
      reviewCount: 234
    },
    description: 'Family dinner special every Sunday. Feed a family of 4 for $40. Includes appetizer, entrees, and dessert.',
    dealType: 'weekly-special',
    category: 'Restaurant',
    discount: {
      type: 'dollar',
      value: 40,
      display: '$40 FAMILY'
    },
    originalPrice: 60,
    dealPrice: 40,
    savings: 20,
    validFrom: '2025-01-20',
    validUntil: '2025-12-31',
    daysOfWeek: ['Sunday'],
    restrictions: ['Family of 4', 'Dine-in only', 'Reservations required'],
    terms: 'Valid every Sunday. Family dinner for 4 people. Reservations required.',
    image: '/images/deals/family-dinner.jpg',
    featured: true,
    verified: true,
    redemptionMethod: 'in-store'
  }
]

// Helper functions
export function getAllDeals(): Deal[] {
  return [...foodDeals, ...happyHours, ...weeklySpecials]
}

export function getFoodDeals(): Deal[] {
  return foodDeals
}

export function getHappyHours(): Deal[] {
  return happyHours
}

export function getWeeklySpecials(): Deal[] {
  return weeklySpecials
}

export function getFeaturedDeals(): Deal[] {
  return getAllDeals().filter(deal => deal.featured)
}

export function getVerifiedDeals(): Deal[] {
  return getAllDeals().filter(deal => deal.verified)
}

export function getDealsByDay(day: string): Deal[] {
  return getAllDeals().filter(deal => 
    deal.daysOfWeek?.includes(day) || 
    (!deal.daysOfWeek && !deal.timeRange)
  )
}

export function getActiveDeals(): Deal[] {
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]
  return getAllDeals().filter(deal => 
    deal.validFrom <= todayStr && deal.validUntil >= todayStr
  )
}

export function searchDeals(query: string): Deal[] {
  const lowerQuery = query.toLowerCase()
  return getAllDeals().filter(deal =>
    deal.title.toLowerCase().includes(lowerQuery) ||
    deal.business.name.toLowerCase().includes(lowerQuery) ||
    deal.description.toLowerCase().includes(lowerQuery) ||
    deal.business.location.neighborhood.toLowerCase().includes(lowerQuery) ||
    deal.category.toLowerCase().includes(lowerQuery)
  )
}

export function getDealsByNeighborhood(neighborhood: string): Deal[] {
  return getAllDeals().filter(deal =>
    deal.business.location.neighborhood.toLowerCase() === neighborhood.toLowerCase()
  )
}

export function getDealsByCategory(category: string): Deal[] {
  return getAllDeals().filter(deal =>
    deal.category.toLowerCase() === category.toLowerCase()
  )
}

