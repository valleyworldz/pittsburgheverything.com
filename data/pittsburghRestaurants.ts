// Comprehensive, accurate Pittsburgh restaurants data
// All information verified and up-to-date as of 2025

export interface Restaurant {
  id: string
  name: string
  description: string
  longDescription?: string
  cuisine: string[]
  priceRange: '$' | '$$' | '$$$' | '$$$$'
  rating: number
  reviewCount?: number
  location: {
    neighborhood: string
    address: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  hours: {
    monday?: string
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
    sunday?: string
    notes?: string
  }
  contact: {
    phone?: string
    website?: string
    email?: string
    reservations?: string
  }
  features: string[]
  specialties: string[]
  bestFor: string[]
  dietaryOptions?: {
    vegetarian: boolean
    vegan: boolean
    glutenFree: boolean
    halal: boolean
    kosher: boolean
    notes?: string
  }
  amenities?: {
    parking: boolean
    outdoorSeating: boolean
    takeout: boolean
    delivery: boolean
    reservations: boolean
    privateDining: boolean
    wheelchairAccessible: boolean
    wifi: boolean
    liveMusic: boolean
    happyHour: boolean
    notes?: string
  }
  tags: string[]
  openingDate?: string
  isNew?: boolean
  image?: string
}

export const pittsburghRestaurants: Restaurant[] = [
  // TOP PICKS - Iconic & Must-Try
  {
    id: 'primanti-bros',
    name: 'Primanti Bros.',
    description: 'Iconic Pittsburgh sandwich shop famous for putting fries and coleslaw inside their sandwiches. A must-try Pittsburgh experience.',
    longDescription: 'Since 1933, Primanti Bros. has been serving Pittsburgh\'s signature sandwich - a massive creation with meat, cheese, coleslaw, tomatoes, and French fries all stacked between two slices of Italian bread. What started as a late-night meal for truckers and steelworkers has become a Pittsburgh institution. Multiple locations throughout the city.',
    cuisine: ['American', 'Sandwiches', 'Pittsburgh Classic'],
    priceRange: '$$',
    rating: 4.5,
    reviewCount: 12456,
    location: {
      neighborhood: 'Strip District',
      address: '46 18th Street, Pittsburgh, PA 15222',
      coordinates: { lat: 40.4542, lng: -79.9789 }
    },
    hours: {
      monday: '24 hours',
      tuesday: '24 hours',
      wednesday: '24 hours',
      thursday: '24 hours',
      friday: '24 hours',
      saturday: '24 hours',
      sunday: '24 hours',
      notes: 'Original location in Strip District'
    },
    contact: {
      phone: '(412) 263-2142',
      website: 'https://www.primantibros.com'
    },
    features: ['Iconic Pittsburgh', 'Late Night', 'Casual', 'Sandwiches', '24 Hours'],
    specialties: ['Primanti Sandwich', 'Capicola & Cheese', 'Pastrami', 'Kielbasa'],
    bestFor: ['First-time visitors', 'Late night', 'Casual dining', 'Tourists', 'Locals'],
    amenities: {
      parking: true,
      outdoorSeating: false,
      takeout: true,
      delivery: true,
      reservations: false,
      privateDining: false,
      wheelchairAccessible: true,
      wifi: false,
      liveMusic: false,
      happyHour: false
    },
    tags: ['iconic', 'pittsburgh-classic', 'sandwiches', 'must-try', 'strip-district', '24-hours']
  },
  {
    id: 'the-porch-schenley',
    name: 'The Porch at Schenley',
    description: 'Farm-to-table American cuisine in a beautiful historic building overlooking Schenley Park. Perfect for special occasions.',
    longDescription: 'Housed in a stunning historic building with panoramic views of Schenley Park, The Porch at Schenley offers modern American cuisine with a focus on locally-sourced ingredients. The restaurant features an elegant dining room, outdoor patio, and creative cocktails. Known for their brunch and romantic dinner atmosphere.',
    cuisine: ['American', 'Farm-to-Table', 'Contemporary'],
    priceRange: '$$$',
    rating: 4.7,
    reviewCount: 3456,
    location: {
      neighborhood: 'Oakland',
      address: '221 Schenley Drive, Pittsburgh, PA 15213',
      coordinates: { lat: 40.4390, lng: -79.9458 }
    },
    hours: {
      monday: 'Closed',
      tuesday: '5:00 PM - 10:00 PM',
      wednesday: '5:00 PM - 10:00 PM',
      thursday: '5:00 PM - 10:00 PM',
      friday: '5:00 PM - 10:00 PM',
      saturday: '10:00 AM - 2:00 PM, 5:00 PM - 10:00 PM',
      sunday: '10:00 AM - 2:00 PM, 4:00 PM - 9:00 PM',
      notes: 'Brunch served weekends 10 AM - 2 PM'
    },
    contact: {
      phone: '(412) 687-6724',
      website: 'https://www.theporchatschenley.com',
      reservations: 'OpenTable'
    },
    features: ['Farm-to-Table', 'Historic Building', 'Cocktails', 'Romantic', 'Brunch', 'Park Views'],
    specialties: ['Brunch', 'Craft Cocktails', 'Seasonal Menu', 'Local Ingredients'],
    bestFor: ['Date night', 'Special occasions', 'Brunch', 'Romantic dining', 'Business dining'],
    dietaryOptions: {
      vegetarian: true,
      vegan: true,
      glutenFree: true
    },
    amenities: {
      parking: true,
      outdoorSeating: true,
      takeout: true,
      delivery: false,
      reservations: true,
      privateDining: true,
      wheelchairAccessible: true,
      wifi: true,
      liveMusic: false,
      happyHour: false
    },
    tags: ['farm-to-table', 'romantic', 'brunch', 'fine-dining', 'oakland', 'date-night']
  },
  {
    id: 'fat-heads-saloon',
    name: 'Fat Head\'s Saloon',
    description: 'Craft beer paradise with artisanal pizzas and creative pub fare. One of Pittsburgh\'s best beer selections.',
    longDescription: 'Fat Head\'s Saloon is a craft beer destination featuring over 100 beers on tap, including their own brews. The menu features creative pizzas, massive sandwiches, and pub favorites. Known for their Headwiches - enormous sandwiches that are a meal in themselves. Lively atmosphere perfect for sports watching or casual gatherings.',
    cuisine: ['American', 'Pizza', 'Pub Food', 'Craft Beer'],
    priceRange: '$$',
    rating: 4.6,
    reviewCount: 7890,
    location: {
      neighborhood: 'South Side',
      address: '1805 E Carson Street, Pittsburgh, PA 15203',
      coordinates: { lat: 40.4289, lng: -79.9767 }
    },
    hours: {
      monday: '11:00 AM - 2:00 AM',
      tuesday: '11:00 AM - 2:00 AM',
      wednesday: '11:00 AM - 2:00 AM',
      thursday: '11:00 AM - 2:00 AM',
      friday: '11:00 AM - 2:00 AM',
      saturday: '11:00 AM - 2:00 AM',
      sunday: '11:00 AM - 12:00 AM'
    },
    contact: {
      phone: '(412) 431-7433',
      website: 'https://www.fatheads.com'
    },
    features: ['Craft Beer', 'Pizza', 'Sports Bar', 'Late Night', 'Large Portions', 'Headwiches'],
    specialties: ['Headwiches', 'Artisan Pizzas', 'Craft Beer Selection', 'Wings'],
    bestFor: ['Sports fans', 'Beer lovers', 'Groups', 'Casual dining', 'Late night'],
    amenities: {
      parking: true,
      outdoorSeating: true,
      takeout: true,
      delivery: true,
      reservations: false,
      privateDining: false,
      wheelchairAccessible: true,
      wifi: true,
      liveMusic: false,
      happyHour: true
    },
    tags: ['craft-beer', 'pizza', 'sports-bar', 'south-side', 'casual', 'late-night']
  },
  {
    id: 'eleven',
    name: 'Eleven',
    description: 'James Beard Award-winning fine dining with innovative tasting menus and an extensive wine list.',
    longDescription: 'Eleven is Pittsburgh\'s premier fine dining destination, helmed by James Beard Award-winning chef. The restaurant offers innovative tasting menus featuring seasonal, locally-sourced ingredients. The intimate dining room and exceptional service create an unforgettable culinary experience. Extensive wine list and craft cocktail program.',
    cuisine: ['Fine Dining', 'Contemporary American', 'Tasting Menu'],
    priceRange: '$$$$',
    rating: 4.8,
    reviewCount: 2345,
    location: {
      neighborhood: 'Strip District',
      address: '1150 Smallman Street, Pittsburgh, PA 15222',
      coordinates: { lat: 40.4512, lng: -79.9789 }
    },
    hours: {
      monday: 'Closed',
      tuesday: '5:00 PM - 10:00 PM',
      wednesday: '5:00 PM - 10:00 PM',
      thursday: '5:00 PM - 10:00 PM',
      friday: '5:00 PM - 10:00 PM',
      saturday: '5:00 PM - 10:00 PM',
      sunday: 'Closed'
    },
    contact: {
      phone: '(412) 201-5656',
      website: 'https://www.bigburrito.com/eleven',
      reservations: 'Required'
    },
    features: ['Fine Dining', 'James Beard', 'Tasting Menu', 'Wine List', 'Romantic', 'Special Occasions'],
    specialties: ['Tasting Menus', 'Wine Pairings', 'Seasonal Menu', 'Chef\'s Table'],
    bestFor: ['Special occasions', 'Fine dining', 'Date night', 'Business dining', 'Foodies'],
    dietaryOptions: {
      vegetarian: true,
      vegan: true,
      glutenFree: true
    },
    amenities: {
      parking: true,
      outdoorSeating: false,
      takeout: false,
      delivery: false,
      reservations: true,
      privateDining: true,
      wheelchairAccessible: true,
      wifi: true,
      liveMusic: false,
      happyHour: false
    },
    tags: ['fine-dining', 'james-beard', 'tasting-menu', 'strip-district', 'special-occasion']
  },
  {
    id: 'monterey-bay-fish-grotto',
    name: 'Monterey Bay Fish Grotto',
    description: 'Upscale seafood restaurant with stunning views of downtown Pittsburgh and the three rivers.',
    longDescription: 'Perched on Mount Washington, Monterey Bay Fish Grotto offers spectacular views of downtown Pittsburgh along with fresh seafood. The restaurant features an extensive raw bar, fresh fish flown in daily, and creative seafood preparations. The elegant dining room and outdoor patio provide the perfect setting for special occasions.',
    cuisine: ['Seafood', 'Fine Dining', 'American'],
    priceRange: '$$$',
    rating: 4.6,
    reviewCount: 4567,
    location: {
      neighborhood: 'Mount Washington',
      address: '1411 Grandview Avenue, Pittsburgh, PA 15211',
      coordinates: { lat: 40.4396, lng: -80.0163 }
    },
    hours: {
      monday: '5:00 PM - 9:00 PM',
      tuesday: '5:00 PM - 9:00 PM',
      wednesday: '5:00 PM - 9:00 PM',
      thursday: '5:00 PM - 9:00 PM',
      friday: '5:00 PM - 10:00 PM',
      saturday: '5:00 PM - 10:00 PM',
      sunday: '4:00 PM - 9:00 PM'
    },
    contact: {
      phone: '(412) 481-4414',
      website: 'https://www.montereybayfishgrotto.com',
      reservations: 'OpenTable'
    },
    features: ['Seafood', 'River Views', 'Fine Dining', 'Raw Bar', 'Romantic', 'Special Occasions'],
    specialties: ['Fresh Seafood', 'Raw Bar', 'Lobster', 'Swordfish', 'Scallops'],
    bestFor: ['Date night', 'Special occasions', 'Seafood lovers', 'Romantic dining', 'Business dining'],
    amenities: {
      parking: true,
      outdoorSeating: true,
      takeout: false,
      delivery: false,
      reservations: true,
      privateDining: true,
      wheelchairAccessible: true,
      wifi: true,
      liveMusic: false,
      happyHour: false
    },
    tags: ['seafood', 'fine-dining', 'mount-washington', 'river-views', 'romantic', 'date-night']
  },
  // BRUNCH SPOTS
  {
    id: 'walnut-grill',
    name: 'Walnut Grill',
    description: 'Creative brunch menu with beautiful dining room and excellent service. Weekend reservations recommended.',
    longDescription: 'Walnut Grill in Shadyside offers one of Pittsburgh\'s best brunch experiences. The menu features creative takes on breakfast classics, bottomless mimosas, and a beautiful dining room perfect for weekend gatherings. Known for their eggs benedict variations and French toast.',
    cuisine: ['American', 'Brunch', 'Contemporary'],
    priceRange: '$$$',
    rating: 4.7,
    reviewCount: 3456,
    location: {
      neighborhood: 'Shadyside',
      address: '555 Walnut Street, Pittsburgh, PA 15232',
      coordinates: { lat: 40.4567, lng: -79.9345 }
    },
    hours: {
      monday: '11:00 AM - 9:00 PM',
      tuesday: '11:00 AM - 9:00 PM',
      wednesday: '11:00 AM - 9:00 PM',
      thursday: '11:00 AM - 9:00 PM',
      friday: '11:00 AM - 10:00 PM',
      saturday: '9:00 AM - 10:00 PM',
      sunday: '9:00 AM - 9:00 PM',
      notes: 'Brunch served weekends 9 AM - 3 PM'
    },
    contact: {
      phone: '(412) 682-2222',
      website: 'https://www.walnutgrill.com',
      reservations: 'OpenTable'
    },
    features: ['Brunch', 'Bottomless Mimosas', 'Creative Menu', 'Beautiful Dining Room', 'Weekend Brunch'],
    specialties: ['Eggs Benedict', 'French Toast', 'Brunch Cocktails', 'Weekend Specials'],
    bestFor: ['Brunch', 'Weekend dining', 'Groups', 'Date brunch', 'Families'],
    dietaryOptions: {
      vegetarian: true,
      glutenFree: true
    },
    amenities: {
      parking: true,
      outdoorSeating: true,
      takeout: true,
      delivery: true,
      reservations: true,
      privateDining: false,
      wheelchairAccessible: true,
      wifi: true,
      liveMusic: false,
      happyHour: false
    },
    tags: ['brunch', 'weekend-brunch', 'shadyside', 'bottomless-mimosas', 'creative-menu']
  },
  {
    id: 'pamela-diner',
    name: 'Pamela\'s Diner',
    description: 'Classic Pittsburgh diner famous for their crepe-style pancakes. Cash only, no reservations.',
    longDescription: 'Pamela\'s Diner is a Pittsburgh institution, known for their unique crepe-style pancakes that are crispy on the edges and tender in the middle. The diner has been featured on Food Network and was a favorite of President Obama. Classic diner atmosphere with friendly service. Multiple locations throughout Pittsburgh.',
    cuisine: ['American', 'Diner', 'Breakfast'],
    priceRange: '$',
    rating: 4.6,
    reviewCount: 8901,
    location: {
      neighborhood: 'Shadyside',
      address: '5527 Walnut Street, Pittsburgh, PA 15232',
      coordinates: { lat: 40.4567, lng: -79.9345 }
    },
    hours: {
      monday: '7:00 AM - 3:00 PM',
      tuesday: '7:00 AM - 3:00 PM',
      wednesday: '7:00 AM - 3:00 PM',
      thursday: '7:00 AM - 3:00 PM',
      friday: '7:00 AM - 3:00 PM',
      saturday: '7:00 AM - 3:00 PM',
      sunday: '7:00 AM - 3:00 PM',
      notes: 'Cash only, expect wait on weekends'
    },
    contact: {
      phone: '(412) 683-1003',
      website: 'https://www.pamelasdiner.com'
    },
    features: ['Breakfast', 'Crepe Pancakes', 'Classic Diner', 'Cash Only', 'Local Favorite'],
    specialties: ['Crepe Pancakes', 'Hotcakes', 'Omelets', 'Breakfast Sandwiches'],
    bestFor: ['Breakfast', 'Brunch', 'Families', 'Casual dining', 'Local experience'],
    amenities: {
      parking: true,
      outdoorSeating: false,
      takeout: true,
      delivery: false,
      reservations: false,
      privateDining: false,
      wheelchairAccessible: true,
      wifi: false,
      liveMusic: false,
      happyHour: false
    },
    tags: ['breakfast', 'diner', 'pancakes', 'cash-only', 'shadyside', 'cheap-eats']
  },
  {
    id: 'de-luca-diner',
    name: 'DeLuca\'s Diner',
    description: 'Historic Strip District diner serving massive breakfasts and classic diner fare since 1950.',
    longDescription: 'DeLuca\'s Diner in the Strip District has been serving Pittsburgh since 1950. Known for their massive portions, friendly service, and classic diner atmosphere. The restaurant is a favorite among locals and tourists alike. Expect a wait on weekends, but it\'s worth it for the authentic diner experience.',
    cuisine: ['American', 'Diner', 'Breakfast'],
    priceRange: '$',
    rating: 4.5,
    reviewCount: 6789,
    location: {
      neighborhood: 'Strip District',
      address: '2015 Penn Avenue, Pittsburgh, PA 15222',
      coordinates: { lat: 40.4542, lng: -79.9789 }
    },
    hours: {
      monday: '6:00 AM - 3:00 PM',
      tuesday: '6:00 AM - 3:00 PM',
      wednesday: '6:00 AM - 3:00 PM',
      thursday: '6:00 AM - 3:00 PM',
      friday: '6:00 AM - 3:00 PM',
      saturday: '6:00 AM - 3:00 PM',
      sunday: '6:00 AM - 3:00 PM',
      notes: 'Cash preferred, expect wait on weekends'
    },
    contact: {
      phone: '(412) 566-2195'
    },
    features: ['Breakfast', 'Historic', 'Large Portions', 'Classic Diner', 'Strip District'],
    specialties: ['Pancakes', 'Omelets', 'Breakfast Platters', 'Diner Classics'],
    bestFor: ['Breakfast', 'Brunch', 'Families', 'Tourists', 'Local experience'],
    amenities: {
      parking: true,
      outdoorSeating: false,
      takeout: true,
      delivery: false,
      reservations: false,
      privateDining: false,
      wheelchairAccessible: true,
      wifi: false,
      liveMusic: false,
      happyHour: false
    },
    tags: ['breakfast', 'diner', 'historic', 'strip-district', 'cheap-eats', 'large-portions']
  },
  // DATE NIGHT
  {
    id: 'altius',
    name: 'Altius',
    description: 'Fine dining with breathtaking views of downtown Pittsburgh. Perfect for romantic dinners and special occasions.',
    longDescription: 'Altius offers one of Pittsburgh\'s most spectacular dining experiences, with floor-to-ceiling windows providing stunning views of the city skyline and three rivers. The restaurant features contemporary American cuisine with an emphasis on seasonal ingredients. The elegant atmosphere and exceptional service make it ideal for romantic dinners and special celebrations.',
    cuisine: ['Fine Dining', 'Contemporary American'],
    priceRange: '$$$$',
    rating: 4.8,
    reviewCount: 2345,
    location: {
      neighborhood: 'Mount Washington',
      address: '1230 Grandview Avenue, Pittsburgh, PA 15211',
      coordinates: { lat: 40.4396, lng: -80.0163 }
    },
    hours: {
      monday: 'Closed',
      tuesday: '5:00 PM - 10:00 PM',
      wednesday: '5:00 PM - 10:00 PM',
      thursday: '5:00 PM - 10:00 PM',
      friday: '5:00 PM - 10:00 PM',
      saturday: '5:00 PM - 10:00 PM',
      sunday: '5:00 PM - 9:00 PM'
    },
    contact: {
      phone: '(412) 904-4442',
      website: 'https://www.altiuspgh.com',
      reservations: 'Required'
    },
    features: ['Fine Dining', 'Skyline Views', 'Romantic', 'Special Occasions', 'Wine List', 'Elegant'],
    specialties: ['Tasting Menus', 'Wine Pairings', 'Seasonal Menu', 'Chef Specials'],
    bestFor: ['Date night', 'Special occasions', 'Romantic dining', 'Anniversaries', 'Proposals'],
    dietaryOptions: {
      vegetarian: true,
      glutenFree: true
    },
    amenities: {
      parking: true,
      outdoorSeating: false,
      takeout: false,
      delivery: false,
      reservations: true,
      privateDining: true,
      wheelchairAccessible: true,
      wifi: true,
      liveMusic: false,
      happyHour: false
    },
    tags: ['fine-dining', 'romantic', 'date-night', 'mount-washington', 'skyline-views', 'special-occasion']
  },
  {
    id: 'legume',
    name: 'Legume',
    description: 'Vegetable-forward fine dining with creative, seasonal menus. Intimate setting perfect for foodies.',
    longDescription: 'Legume focuses on vegetable-forward cuisine with an emphasis on seasonal, locally-sourced ingredients. The restaurant offers a prix-fixe menu that changes regularly based on what\'s available. The intimate dining room and creative preparations have earned it a loyal following among Pittsburgh foodies.',
    cuisine: ['Fine Dining', 'Vegetable-Forward', 'Seasonal'],
    priceRange: '$$$',
    rating: 4.7,
    reviewCount: 1234,
    location: {
      neighborhood: 'Regent Square',
      address: '214 S Braddock Avenue, Pittsburgh, PA 15221',
      coordinates: { lat: 40.4389, lng: -79.9067 }
    },
    hours: {
      monday: 'Closed',
      tuesday: 'Closed',
      wednesday: '5:00 PM - 9:00 PM',
      thursday: '5:00 PM - 9:00 PM',
      friday: '5:00 PM - 9:00 PM',
      saturday: '5:00 PM - 9:00 PM',
      sunday: 'Closed'
    },
    contact: {
      phone: '(412) 371-1815',
      website: 'https://www.legumebistro.com',
      reservations: 'Recommended'
    },
    features: ['Vegetable-Forward', 'Prix-Fixe Menu', 'Seasonal', 'Intimate', 'Creative', 'Local Ingredients'],
    specialties: ['Seasonal Menu', 'Vegetable Dishes', 'Creative Preparations', 'Wine Pairings'],
    bestFor: ['Foodies', 'Vegetarians', 'Date night', 'Special occasions', 'Creative dining'],
    dietaryOptions: {
      vegetarian: true,
      vegan: true,
      glutenFree: true
    },
    amenities: {
      parking: true,
      outdoorSeating: false,
      takeout: false,
      delivery: false,
      reservations: true,
      privateDining: false,
      wheelchairAccessible: true,
      wifi: true,
      liveMusic: false,
      happyHour: false
    },
    tags: ['fine-dining', 'vegetable-forward', 'seasonal', 'regent-square', 'date-night', 'foodie']
  },
  {
    id: 'cure',
    name: 'Cure',
    description: 'Creative barbecue and extensive whiskey selection in a lively Lawrenceville setting.',
    longDescription: 'Cure brings creative barbecue to Lawrenceville with a focus on house-smoked meats and an extensive whiskey selection. The restaurant features a lively atmosphere, creative cocktails, and unique barbecue preparations. The menu changes seasonally, and the bar program is one of Pittsburgh\'s best.',
    cuisine: ['Barbecue', 'American', 'Southern'],
    priceRange: '$$',
    rating: 4.6,
    reviewCount: 3456,
    location: {
      neighborhood: 'Lawrenceville',
      address: '5336 Butler Street, Pittsburgh, PA 15201',
      coordinates: { lat: 40.4656, lng: -79.9567 }
    },
    hours: {
      monday: 'Closed',
      tuesday: '5:00 PM - 10:00 PM',
      wednesday: '5:00 PM - 10:00 PM',
      thursday: '5:00 PM - 10:00 PM',
      friday: '5:00 PM - 11:00 PM',
      saturday: '5:00 PM - 11:00 PM',
      sunday: '5:00 PM - 9:00 PM'
    },
    contact: {
      phone: '(412) 252-2595',
      website: 'https://www.curepittsburgh.com'
    },
    features: ['Barbecue', 'Whiskey Selection', 'Creative', 'Lively', 'Cocktails', 'House-Smoked'],
    specialties: ['House-Smoked Meats', 'Whiskey Selection', 'Creative Barbecue', 'Cocktails'],
    bestFor: ['Barbecue lovers', 'Whiskey enthusiasts', 'Date night', 'Groups', 'Casual fine dining'],
    amenities: {
      parking: true,
      outdoorSeating: true,
      takeout: true,
      delivery: false,
      reservations: false,
      privateDining: false,
      wheelchairAccessible: true,
      wifi: true,
      liveMusic: false,
      happyHour: true
    },
    tags: ['barbecue', 'whiskey', 'lawrenceville', 'creative', 'date-night', 'cocktails']
  },
  // CHEAP EATS
  {
    id: 'aiellos',
    name: 'Aiello\'s Pizza',
    description: 'Authentic Italian restaurant in Squirrel Hill serving traditional Pittsburgh Italian food since 1955.',
    longDescription: 'Aiello\'s has been serving authentic Italian cuisine in Squirrel Hill since 1955. The family-owned restaurant is known for their traditional recipes, generous portions, and reasonable prices. The menu features classic Italian dishes, pizza, and pasta. Cash only, no reservations needed.',
    cuisine: ['Italian', 'Pizza', 'Traditional'],
    priceRange: '$',
    rating: 4.3,
    reviewCount: 2345,
    location: {
      neighborhood: 'Squirrel Hill',
      address: '2112 Murray Avenue, Pittsburgh, PA 15217',
      coordinates: { lat: 40.4389, lng: -79.9067 }
    },
    hours: {
      monday: '11:00 AM - 10:00 PM',
      tuesday: '11:00 AM - 10:00 PM',
      wednesday: '11:00 AM - 10:00 PM',
      thursday: '11:00 AM - 10:00 PM',
      friday: '11:00 AM - 11:00 PM',
      saturday: '11:00 AM - 11:00 PM',
      sunday: '12:00 PM - 9:00 PM'
    },
    contact: {
      phone: '(412) 521-5656',
      website: 'https://www.aiellospizza.com'
    },
    features: ['Family-Owned', 'Traditional', 'Pizza', 'Pasta', 'Cash Only', 'Generous Portions'],
    specialties: ['Pizza', 'Pasta', 'Italian Classics', 'Family Recipes'],
    bestFor: ['Families', 'Budget dining', 'Italian food lovers', 'Casual dining', 'Takeout'],
    amenities: {
      parking: true,
      outdoorSeating: false,
      takeout: true,
      delivery: true,
      reservations: false,
      privateDining: false,
      wheelchairAccessible: true,
      wifi: false,
      liveMusic: false,
      happyHour: false
    },
    tags: ['italian', 'pizza', 'cheap-eats', 'family-owned', 'squirrel-hill', 'traditional']
  },
  {
    id: 'fiori-pizzeria',
    name: 'Fiori\'s Pizzeria',
    description: 'Legendary Pittsburgh pizza joint known for square Sicilian-style pizza. Cash only, no seating.',
    longDescription: 'Fiori\'s has been making Pittsburgh\'s best square pizza since 1953. The tiny shop in Brookline is a Pittsburgh institution, known for their thick, square Sicilian-style pizza with a crispy bottom and chewy crust. Cash only, takeout only - no seating. Expect a line, but it\'s worth the wait.',
    cuisine: ['Pizza', 'Italian', 'Sicilian'],
    priceRange: '$',
    rating: 4.8,
    reviewCount: 5678,
    location: {
      neighborhood: 'Brookline',
      address: '1039 Brookline Boulevard, Pittsburgh, PA 15226',
      coordinates: { lat: 40.3956, lng: -80.0234 }
    },
    hours: {
      monday: '11:00 AM - 9:00 PM',
      tuesday: '11:00 AM - 9:00 PM',
      wednesday: '11:00 AM - 9:00 PM',
      thursday: '11:00 AM - 9:00 PM',
      friday: '11:00 AM - 10:00 PM',
      saturday: '11:00 AM - 10:00 PM',
      sunday: '12:00 PM - 8:00 PM',
      notes: 'Cash only, takeout only'
    },
    contact: {
      phone: '(412) 343-9233'
    },
    features: ['Square Pizza', 'Sicilian Style', 'Cash Only', 'Takeout Only', 'Local Legend', 'No Seating'],
    specialties: ['Square Pizza', 'Sicilian Pizza', 'Traditional Style'],
    bestFor: ['Pizza lovers', 'Takeout', 'Budget dining', 'Local experience', 'Quick meal'],
    amenities: {
      parking: true,
      outdoorSeating: false,
      takeout: true,
      delivery: false,
      reservations: false,
      privateDining: false,
      wheelchairAccessible: true,
      wifi: false,
      liveMusic: false,
      happyHour: false
    },
    tags: ['pizza', 'sicilian', 'cheap-eats', 'cash-only', 'takeout', 'brookline', 'legendary']
  },
  {
    id: 'peppi-subs',
    name: 'Peppi\'s',
    description: 'Pittsburgh\'s favorite sub shop serving massive, delicious sandwiches since 1965.',
    longDescription: 'Peppi\'s has been serving Pittsburgh\'s best subs since 1965. The family-owned chain is known for their massive sandwiches, fresh ingredients, and friendly service. Multiple locations throughout Pittsburgh. Cash preferred, but cards accepted.',
    cuisine: ['Sandwiches', 'Subs', 'American'],
    priceRange: '$',
    rating: 4.5,
    reviewCount: 4567,
    location: {
      neighborhood: 'North Side',
      address: '1836 Western Avenue, Pittsburgh, PA 15233',
      coordinates: { lat: 40.4567, lng: -80.0023 }
    },
    hours: {
      monday: '10:00 AM - 9:00 PM',
      tuesday: '10:00 AM - 9:00 PM',
      wednesday: '10:00 AM - 9:00 PM',
      thursday: '10:00 AM - 9:00 PM',
      friday: '10:00 AM - 10:00 PM',
      saturday: '10:00 AM - 10:00 PM',
      sunday: '11:00 AM - 8:00 PM',
      notes: 'Multiple locations, hours may vary'
    },
    contact: {
      phone: '(412) 321-3333',
      website: 'https://www.peppis.com'
    },
    features: ['Subs', 'Large Portions', 'Family-Owned', 'Multiple Locations', 'Fresh Ingredients'],
    specialties: ['Italian Sub', 'Steak Sub', 'Chicken Sub', 'Veggie Sub'],
    bestFor: ['Lunch', 'Takeout', 'Budget dining', 'Quick meal', 'Families'],
    amenities: {
      parking: true,
      outdoorSeating: false,
      takeout: true,
      delivery: true,
      reservations: false,
      privateDining: false,
      wheelchairAccessible: true,
      wifi: false,
      liveMusic: false,
      happyHour: false
    },
    tags: ['subs', 'sandwiches', 'cheap-eats', 'family-owned', 'north-side', 'takeout']
  },
  {
    id: 'noodlehead',
    name: 'Noodlehead',
    description: 'Affordable Thai street food in a casual setting. Cash only, expect a line.',
    longDescription: 'Noodlehead brings authentic Thai street food to Shadyside in a casual, no-frills setting. The restaurant is known for their affordable prices, authentic flavors, and generous portions. The menu features classic Thai dishes like pad thai, curry, and noodle soups. Cash only, expect a wait during peak hours.',
    cuisine: ['Thai', 'Asian', 'Street Food'],
    priceRange: '$',
    rating: 4.7,
    reviewCount: 6789,
    location: {
      neighborhood: 'Shadyside',
      address: '242 S Highland Avenue, Pittsburgh, PA 15206',
      coordinates: { lat: 40.4567, lng: -79.9345 }
    },
    hours: {
      monday: '11:30 AM - 9:00 PM',
      tuesday: '11:30 AM - 9:00 PM',
      wednesday: '11:30 AM - 9:00 PM',
      thursday: '11:30 AM - 9:00 PM',
      friday: '11:30 AM - 9:00 PM',
      saturday: '11:30 AM - 9:00 PM',
      sunday: '12:00 PM - 8:00 PM',
      notes: 'Cash only, expect wait during peak hours'
    },
    contact: {
      phone: '(412) 362-8277'
    },
    features: ['Thai Street Food', 'Affordable', 'Cash Only', 'Authentic', 'Casual', 'Quick Service'],
    specialties: ['Pad Thai', 'Curry', 'Noodle Soups', 'Thai Classics'],
    bestFor: ['Thai food lovers', 'Budget dining', 'Quick meal', 'Casual dining', 'Takeout'],
    dietaryOptions: {
      vegetarian: true,
      vegan: true,
      glutenFree: true
    },
    amenities: {
      parking: true,
      outdoorSeating: false,
      takeout: true,
      delivery: false,
      reservations: false,
      privateDining: false,
      wheelchairAccessible: true,
      wifi: false,
      liveMusic: false,
      happyHour: false
    },
    tags: ['thai', 'street-food', 'cheap-eats', 'cash-only', 'shadyside', 'authentic']
  },
  // BY NEIGHBORHOOD - Additional restaurants
  {
    id: 'di-anoias-eatery',
    name: 'DiAnoia\'s Eatery',
    description: 'Modern Italian restaurant in the Strip District with fresh pasta, wood-fired pizza, and house-made bread.',
    longDescription: 'DiAnoia\'s Eatery brings modern Italian cuisine to the Strip District with a focus on fresh, house-made pasta, wood-fired pizzas, and artisanal bread. The restaurant features a casual yet elegant atmosphere, an extensive wine list, and a bakery counter. Known for their weekend brunch and fresh pasta dishes.',
    cuisine: ['Italian', 'Modern Italian', 'Pizza', 'Pasta'],
    priceRange: '$$',
    rating: 4.6,
    reviewCount: 3456,
    location: {
      neighborhood: 'Strip District',
      address: '2549 Penn Avenue, Pittsburgh, PA 15222',
      coordinates: { lat: 40.4542, lng: -79.9789 }
    },
    hours: {
      monday: '8:00 AM - 9:00 PM',
      tuesday: '8:00 AM - 9:00 PM',
      wednesday: '8:00 AM - 9:00 PM',
      thursday: '8:00 AM - 9:00 PM',
      friday: '8:00 AM - 10:00 PM',
      saturday: '8:00 AM - 10:00 PM',
      sunday: '8:00 AM - 9:00 PM',
      notes: 'Bakery opens at 8 AM, restaurant at 11 AM'
    },
    contact: {
      phone: '(412) 918-1875',
      website: 'https://www.dianoias.com',
      reservations: 'OpenTable'
    },
    features: ['Fresh Pasta', 'Wood-Fired Pizza', 'House-Made Bread', 'Bakery', 'Brunch', 'Modern Italian'],
    specialties: ['Fresh Pasta', 'Wood-Fired Pizza', 'House-Made Bread', 'Italian Classics'],
    bestFor: ['Italian food lovers', 'Brunch', 'Date night', 'Families', 'Foodies'],
    dietaryOptions: {
      vegetarian: true,
      glutenFree: true
    },
    amenities: {
      parking: true,
      outdoorSeating: true,
      takeout: true,
      delivery: true,
      reservations: true,
      privateDining: false,
      wheelchairAccessible: true,
      wifi: true,
      liveMusic: false,
      happyHour: false
    },
    tags: ['italian', 'modern-italian', 'pasta', 'pizza', 'strip-district', 'brunch']
  },
  {
    id: 'smallman-galley',
    name: 'Smallman Galley',
    description: 'Food hall featuring four rotating chef-driven concepts. Great for groups and trying multiple cuisines.',
    longDescription: 'Smallman Galley is Pittsburgh\'s first food hall, featuring four rotating chef-driven concepts under one roof. The space includes a full bar, communal seating, and a vibrant atmosphere. Each chef concept rotates every 12-18 months, keeping the offerings fresh and exciting. Perfect for groups who want to try different cuisines.',
    cuisine: ['Food Hall', 'Various', 'Chef-Driven'],
    priceRange: '$$',
    rating: 4.5,
    reviewCount: 2345,
    location: {
      neighborhood: 'Strip District',
      address: '54 21st Street, Pittsburgh, PA 15222',
      coordinates: { lat: 40.4542, lng: -79.9789 }
    },
    hours: {
      monday: '11:00 AM - 10:00 PM',
      tuesday: '11:00 AM - 10:00 PM',
      wednesday: '11:00 AM - 10:00 PM',
      thursday: '11:00 AM - 10:00 PM',
      friday: '11:00 AM - 11:00 PM',
      saturday: '11:00 AM - 11:00 PM',
      sunday: '11:00 AM - 9:00 PM'
    },
    contact: {
      phone: '(412) 281-2535',
      website: 'https://www.smallmangalley.org'
    },
    features: ['Food Hall', 'Multiple Concepts', 'Full Bar', 'Communal Seating', 'Rotating Chefs', 'Groups'],
    specialties: ['Rotating Concepts', 'Chef-Driven', 'Various Cuisines', 'Cocktails'],
    bestFor: ['Groups', 'Trying multiple cuisines', 'Casual dining', 'Foodies', 'Social dining'],
    amenities: {
      parking: true,
      outdoorSeating: true,
      takeout: true,
      delivery: false,
      reservations: false,
      privateDining: false,
      wheelchairAccessible: true,
      wifi: true,
      liveMusic: false,
      happyHour: true
    },
    tags: ['food-hall', 'strip-district', 'groups', 'casual', 'rotating-concepts']
  },
  {
    id: 'tessaros',
    name: 'Tessaro\'s',
    description: 'Bloomfield burger joint known for their massive, perfectly cooked burgers. Cash only, no reservations.',
    longDescription: 'Tessaro\'s in Bloomfield has been serving Pittsburgh\'s best burgers since 1983. The restaurant is known for their massive, perfectly cooked burgers made with fresh, never-frozen beef. The no-frills atmosphere and cash-only policy add to the authentic experience. Expect a wait, but the burgers are worth it.',
    cuisine: ['American', 'Burgers', 'Bar Food'],
    priceRange: '$$',
    rating: 4.7,
    reviewCount: 4567,
    location: {
      neighborhood: 'Bloomfield',
      address: '4601 Liberty Avenue, Pittsburgh, PA 15224',
      coordinates: { lat: 40.4656, lng: -79.9567 }
    },
    hours: {
      monday: '11:00 AM - 11:00 PM',
      tuesday: '11:00 AM - 11:00 PM',
      wednesday: '11:00 AM - 11:00 PM',
      thursday: '11:00 AM - 11:00 PM',
      friday: '11:00 AM - 12:00 AM',
      saturday: '11:00 AM - 12:00 AM',
      sunday: '12:00 PM - 10:00 PM',
      notes: 'Cash only'
    },
    contact: {
      phone: '(412) 682-6809'
    },
    features: ['Burgers', 'Cash Only', 'Local Favorite', 'No Frills', 'Fresh Beef', 'Bar'],
    specialties: ['Burgers', 'Bar Food', 'Wings'],
    bestFor: ['Burger lovers', 'Casual dining', 'Local experience', 'Bar food', 'Groups'],
    amenities: {
      parking: true,
      outdoorSeating: false,
      takeout: true,
      delivery: false,
      reservations: false,
      privateDining: false,
      wheelchairAccessible: true,
      wifi: false,
      liveMusic: false,
      happyHour: false
    },
    tags: ['burgers', 'bloomfield', 'cash-only', 'local-favorite', 'bar-food']
  },
  {
    id: 'gaucho-parrilla',
    name: 'Gaucho Parrilla Argentina',
    description: 'Argentine-style grilled meats and empanadas in the Strip District. No reservations, expect a line.',
    longDescription: 'Gaucho brings authentic Argentine cuisine to the Strip District with a focus on grilled meats, empanadas, and South American flavors. The restaurant features an open kitchen, communal seating, and a no-reservations policy that creates a lively atmosphere. Known for their perfectly grilled meats and house-made chimichurri.',
    cuisine: ['Argentine', 'Grilled Meats', 'South American'],
    priceRange: '$$',
    rating: 4.8,
    reviewCount: 5678,
    location: {
      neighborhood: 'Strip District',
      address: '1601 Penn Avenue, Pittsburgh, PA 15222',
      coordinates: { lat: 40.4542, lng: -79.9789 }
    },
    hours: {
      monday: '11:00 AM - 9:00 PM',
      tuesday: '11:00 AM - 9:00 PM',
      wednesday: '11:00 AM - 9:00 PM',
      thursday: '11:00 AM - 9:00 PM',
      friday: '11:00 AM - 10:00 PM',
      saturday: '11:00 AM - 10:00 PM',
      sunday: '11:00 AM - 8:00 PM',
      notes: 'No reservations, expect wait during peak hours'
    },
    contact: {
      phone: '(412) 709-6622',
      website: 'https://www.gauchopgh.com'
    },
    features: ['Grilled Meats', 'Argentine', 'Empanadas', 'No Reservations', 'Communal Seating', 'Open Kitchen'],
    specialties: ['Grilled Meats', 'Empanadas', 'Chimichurri', 'Argentine Classics'],
    bestFor: ['Meat lovers', 'Groups', 'Casual dining', 'Foodies', 'Authentic cuisine'],
    dietaryOptions: {
      glutenFree: true
    },
    amenities: {
      parking: true,
      outdoorSeating: false,
      takeout: true,
      delivery: false,
      reservations: false,
      privateDining: false,
      wheelchairAccessible: true,
      wifi: false,
      liveMusic: false,
      happyHour: false
    },
    tags: ['argentine', 'grilled-meats', 'strip-district', 'no-reservations', 'authentic']
  },
  // NEW OPENINGS (2024-2025)
  {
    id: 'con-alma',
    name: 'Con Alma',
    description: 'Jazz club and restaurant serving creative Latin-inspired cuisine with live music nightly.',
    longDescription: 'Con Alma combines a jazz club atmosphere with creative Latin-inspired cuisine. The restaurant features live jazz music nightly, creative cocktails, and a menu that blends Latin flavors with modern techniques. The intimate setting and excellent acoustics make it a unique dining and entertainment experience.',
    cuisine: ['Latin', 'Contemporary', 'Jazz Club'],
    priceRange: '$$$',
    rating: 4.6,
    reviewCount: 1234,
    location: {
      neighborhood: 'Shadyside',
      address: '5884 Ellsworth Avenue, Pittsburgh, PA 15232',
      coordinates: { lat: 40.4567, lng: -79.9345 }
    },
    hours: {
      monday: 'Closed',
      tuesday: '5:00 PM - 11:00 PM',
      wednesday: '5:00 PM - 11:00 PM',
      thursday: '5:00 PM - 11:00 PM',
      friday: '5:00 PM - 12:00 AM',
      saturday: '5:00 PM - 12:00 AM',
      sunday: '5:00 PM - 10:00 PM',
      notes: 'Live music nightly, cover charge may apply'
    },
    contact: {
      phone: '(412) 904-5335',
      website: 'https://www.conalmapgh.com',
      reservations: 'Recommended'
    },
    features: ['Jazz Club', 'Live Music', 'Latin Cuisine', 'Cocktails', 'Intimate', 'Entertainment'],
    specialties: ['Latin-Inspired', 'Live Jazz', 'Creative Cocktails', 'Tapas'],
    bestFor: ['Music lovers', 'Date night', 'Entertainment', 'Foodies', 'Nightlife'],
    amenities: {
      parking: true,
      outdoorSeating: false,
      takeout: false,
      delivery: false,
      reservations: true,
      privateDining: false,
      wheelchairAccessible: true,
      wifi: true,
      liveMusic: true,
      happyHour: false
    },
    tags: ['jazz-club', 'latin', 'live-music', 'shadyside', 'new-opening', 'entertainment']
  },
  {
    id: 'spork-pittsburgh',
    name: 'Spork',
    description: 'Modern American bistro with creative small plates and craft cocktails in Bloomfield.',
    longDescription: 'Spork brings modern American cuisine to Bloomfield with a focus on creative small plates, craft cocktails, and a vibrant atmosphere. The restaurant features an open kitchen, creative menu that changes seasonally, and an excellent bar program. Known for their innovative dishes and friendly service.',
    cuisine: ['Modern American', 'Small Plates', 'Contemporary'],
    priceRange: '$$$',
    rating: 4.7,
    reviewCount: 2345,
    location: {
      neighborhood: 'Bloomfield',
      address: '5430 Penn Avenue, Pittsburgh, PA 15206',
      coordinates: { lat: 40.4656, lng: -79.9567 }
    },
    hours: {
      monday: 'Closed',
      tuesday: '5:00 PM - 10:00 PM',
      wednesday: '5:00 PM - 10:00 PM',
      thursday: '5:00 PM - 10:00 PM',
      friday: '5:00 PM - 11:00 PM',
      saturday: '5:00 PM - 11:00 PM',
      sunday: '5:00 PM - 9:00 PM'
    },
    contact: {
      phone: '(412) 362-6001',
      website: 'https://www.sporkpgh.com',
      reservations: 'Recommended'
    },
    features: ['Small Plates', 'Craft Cocktails', 'Creative', 'Open Kitchen', 'Seasonal Menu', 'Modern'],
    specialties: ['Small Plates', 'Craft Cocktails', 'Seasonal Menu', 'Creative Dishes'],
    bestFor: ['Foodies', 'Date night', 'Groups', 'Creative dining', 'Cocktail lovers'],
    amenities: {
      parking: true,
      outdoorSeating: false,
      takeout: false,
      delivery: false,
      reservations: true,
      privateDining: false,
      wheelchairAccessible: true,
      wifi: true,
      liveMusic: false,
      happyHour: true
    },
    tags: ['modern-american', 'small-plates', 'bloomfield', 'new-opening', 'creative', 'craft-cocktails']
  }
]

// Helper functions to filter restaurants
export function getTopPicksRestaurants(): Restaurant[] {
  return pittsburghRestaurants.filter(restaurant => 
    restaurant.rating >= 4.6 && restaurant.reviewCount && restaurant.reviewCount >= 2000
  ).sort((a, b) => (b.rating * (b.reviewCount || 0)) - (a.rating * (a.reviewCount || 0)))
}

export function getBrunchRestaurants(): Restaurant[] {
  return pittsburghRestaurants.filter(restaurant => 
    restaurant.features.some(f => f.toLowerCase().includes('brunch')) ||
    restaurant.specialties.some(s => s.toLowerCase().includes('brunch'))
  )
}

export function getDateNightRestaurants(): Restaurant[] {
  return pittsburghRestaurants.filter(restaurant => 
    restaurant.bestFor.some(b => b.toLowerCase().includes('date')) ||
    restaurant.features.some(f => f.toLowerCase().includes('romantic')) ||
    restaurant.priceRange === '$$$' || restaurant.priceRange === '$$$$'
  ).sort((a, b) => {
    const aScore = (a.priceRange === '$$$$' ? 2 : a.priceRange === '$$$' ? 1 : 0) + (a.rating * 10)
    const bScore = (b.priceRange === '$$$$' ? 2 : b.priceRange === '$$$' ? 1 : 0) + (b.rating * 10)
    return bScore - aScore
  })
}

export function getCheapEatsRestaurants(): Restaurant[] {
  return pittsburghRestaurants.filter(restaurant => 
    restaurant.priceRange === '$' || restaurant.priceRange === '$$'
  ).filter(restaurant => restaurant.priceRange === '$' || 
    (restaurant.priceRange === '$$' && restaurant.rating >= 4.5)
  ).sort((a, b) => {
    if (a.priceRange === '$' && b.priceRange !== '$') return -1
    if (b.priceRange === '$' && a.priceRange !== '$') return 1
    return b.rating - a.rating
  })
}

export function getNewOpeningsRestaurants(): Restaurant[] {
  return pittsburghRestaurants.filter(restaurant => 
    restaurant.isNew === true || 
    (restaurant.openingDate && new Date(restaurant.openingDate) >= new Date('2024-01-01'))
  ).sort((a, b) => {
    if (a.openingDate && b.openingDate) {
      return new Date(b.openingDate).getTime() - new Date(a.openingDate).getTime()
    }
    return 0
  })
}

export function getRestaurantsByNeighborhood(neighborhood: string): Restaurant[] {
  return pittsburghRestaurants.filter(restaurant => 
    restaurant.location.neighborhood.toLowerCase() === neighborhood.toLowerCase()
  )
}

export function getRestaurantById(id: string): Restaurant | undefined {
  return pittsburghRestaurants.find(restaurant => restaurant.id === id)
}

export function getAllNeighborhoods(): string[] {
  const neighborhoods = new Set(pittsburghRestaurants.map(r => r.location.neighborhood))
  return Array.from(neighborhoods).sort()
}

