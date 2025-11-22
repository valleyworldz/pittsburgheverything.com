import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MapPin, Users, TrendingUp, Home, Star, DollarSign, Clock, Car, Bike, Heart } from 'lucide-react'
import Link from 'next/link'
import NeighborhoodActionButton from '@/components/NeighborhoodActionButton'
import NeighborhoodMap from '@/components/NeighborhoodMap'
import StructuredData from '@/components/StructuredData'
import { getNeighborhoodBySlug, getAllNeighborhoods } from '@/data/pittsburghNeighborhoods'
import type { NeighborhoodData } from '@/data/pittsburghNeighborhoods'

interface NeighborhoodPageProps {
  params: {
    id: string
  }
}

// Legacy neighborhood data for backward compatibility
const neighborhoodData = {
  'downtown': {
    name: 'Downtown Pittsburgh',
    description: 'The vibrant heart of Pittsburgh with skyscrapers, cultural attractions, and urban energy. Home to major corporations, museums, and entertainment venues. The Golden Triangle pulses with business activity, world-class dining, and iconic attractions.',
    population: 5000,
    walkScore: 95,
    medianIncome: 75000,
    attractions: [
      { name: 'Point State Park', type: 'Park', description: 'Historic park at the confluence of Pittsburgh\'s three rivers, featuring fountains, memorials, and river views' },
      { name: 'Duquesne Incline', type: 'Attraction', description: 'Historic 1877 cable car ride offering panoramic views of the city skyline and rivers' },
      { name: 'PPG Paints Arena', type: 'Sports', description: 'Home of the Pittsburgh Penguins NHL team and major concerts' },
      { name: 'Carnegie Museum of Art', type: 'Museum', description: 'World-class art collection spanning 5,000 years of human creativity' },
      { name: 'Heinz Hall', type: 'Theater', description: 'Home of the Pittsburgh Symphony Orchestra and performing arts venue' },
      { name: 'Market Square', type: 'Historic', description: 'Pittsburgh\'s original town square, now a bustling public plaza' },
      { name: 'David L. Lawrence Convention Center', type: 'Convention', description: 'Modern convention facility hosting major events and exhibitions' },
      { name: 'Rivers Casino', type: 'Entertainment', description: 'Luxury casino with gaming, dining, and entertainment options' },
      { name: 'The Andy Warhol Museum', type: 'Museum', description: 'Dedicated to the life and work of pop art pioneer Andy Warhol' },
      { name: 'Benedum Center', type: 'Theater', description: 'Historic theater hosting Broadway shows and performances' }
    ],
    dining: [
      { category: 'Fine Dining', spots: [
        'The Capital Grille - Classic steakhouse with premium wines',
        'Nine on Nine - Rooftop fine dining with city views',
        'Alma at The Mansion - Seasonal French-American cuisine',
        'Lidia\'s Pittsburgh - Italian cuisine from celebrity chef Lidia Bastianich',
        'Meat & Potatoes - Modern American with creative dishes',
        'The Commoner - Eclectic menu with craft cocktails',
        'Sushi Azabu - Authentic Japanese sushi and kaiseki',
        'Eleven Contemporary Kitchen - Innovative tasting menus'
      ]},
      { category: 'Casual Dining', spots: [
        'Primanti Bros. - Iconic sandwiches with fries and coleslaw',
        'The Original Fish Market - Seafood and steaks since 1892',
        'Piper\'s Pub - Irish pub with extensive beer selection',
        'Fat Head\'s Saloon - Craft beer and elevated pub fare',
        'Church Brew Works - Brewery with artisanal pizzas',
        'Penn Brewery - Historic brewery with German-inspired cuisine',
        'Gaucho Parrilla Argentina - Authentic Argentine steakhouse',
        'Thai Place - Traditional Thai cuisine with fresh ingredients'
      ]},
      { category: 'Coffee & Desserts', spots: [
        'Starbucks Reserve Roastery - Specialty coffee experience',
        'Crazy Mocha - Pittsburgh\'s original coffee roaster',
        'Press Coffee - Third-wave coffee with local beans',
        'Bistro To Go - French bakery and café',
        'Dozen Bakery - Artisanal breads and pastries',
        'La Roche Bakery - French pastries and chocolates',
        'Prantl\'s Bakery - Historic German bakery since 1916',
        'Buttercream Bakeshop - Custom cakes and desserts'
      ]},
      { category: 'Quick Bites & Food Hall', spots: [
        'Strip District Food Hall - Multiple vendors in one location',
        'Market Square Food Court - Casual dining options',
        'Chipotle - Fresh Mexican-inspired cuisine',
        'Shake Shack - Premium burgers and shakes',
        'Sweetgreen - Healthy salads and grain bowls',
        'Pret A Manger - Fresh sandwiches and coffee',
        'Au Bon Pain - Bakery café with soups and sandwiches',
        'Caffeine Underground - Specialty coffee and light bites'
      ]}
    ],
    shops: [
      { category: 'Luxury Retail', spots: [
        'Neiman Marcus - High-end fashion and accessories',
        'Saks Fifth Avenue - Designer clothing and cosmetics',
        'Louis Vuitton - Luxury handbags and leather goods',
        'Tiffany & Co. - Fine jewelry and luxury gifts',
        'Cartier - Iconic watches and jewelry',
        'Hermès - Luxury fashion and accessories',
        'Chanel - Designer fashion and beauty',
        'Rolex - Premium timepieces'
      ]},
      { category: 'Department Stores', spots: [
        'Macy\'s - Full-service department store',
        'Nordstrom - Fashion, beauty, and home goods',
        'Kohl\'s - National department store chain',
        'JCPenney - Family clothing and home goods',
        'Target - General merchandise and groceries',
        'Walmart Supercenter - One-stop shopping',
        'Marshalls - Off-price fashion and home goods',
        'TJ Maxx - Discount designer brands'
      ]},
      { category: 'Specialty Boutiques', spots: [
        'Anthropologie - Boho-chic fashion and home decor',
        'Williams Sonoma - Gourmet kitchen and cookware',
        'Pottery Barn - Home furnishings and decor',
        'West Elm - Modern furniture and accessories',
        'Banana Republic - Contemporary professional wear',
        'J.Crew - Classic American style',
        'Brooks Brothers - Traditional menswear',
        'Ann Taylor - Women\'s professional clothing'
      ]},
      { category: 'Bookstores & Gifts', spots: [
        'Barnes & Noble - Books, music, and gifts',
        'Joseph-Beth Booksellers - Independent bookstore',
        'The University of Pittsburgh Bookstore - Academic texts',
        'Carnegie Mellon University Bookstore - Tech and education',
        'Hallmark Gold Crown - Cards and gifts',
        'Paper Source - Stationery and party supplies',
        'Williams Sonoma Home - Kitchen and entertaining',
        'Pittsburgh Pop Art - Local artist merchandise'
      ]}
    ],
    events: [
      { category: 'Business & Professional', events: [
        'Pittsburgh Business Show - Annual business expo',
        'TechPGH Summit - Technology and innovation conference',
        'Pittsburgh Wine Festival - Wine tasting and networking',
        'Real Estate Forum - Property investment seminars',
        'Legal Conference - Continuing education for attorneys',
        'Healthcare Summit - Medical industry networking',
        'Financial Planning Symposium - Investment strategies',
        'Startup Pitch Competition - Entrepreneur showcase'
      ]},
      { category: 'Cultural & Arts', events: [
        'Pittsburgh Symphony Orchestra concerts',
        'Carnegie Museum of Art exhibitions',
        'Benedum Center Broadway shows',
        'Pittsburgh Dance Council performances',
        'Andy Warhol Museum special exhibits',
        'Film festivals and screenings',
        'Jazz concerts at various venues',
        'Art gallery openings and receptions'
      ]},
      { category: 'Sports & Entertainment', events: [
        'Pittsburgh Penguins home games',
        'Steelers games at Heinz Field',
        'Pirates games at PNC Park',
        'WWE events and wrestling',
        'Comedy shows at various clubs',
        'Live music at Stage AE',
        'Casino entertainment shows',
        'Holiday parades and festivals'
      ]},
      { category: 'Seasonal Festivals', events: [
        'Pittsburgh Taco Festival - Summer food celebration',
        'Pittsburgh Arts Festival - Outdoor art showcase',
        'Light Up Night - Holiday tree lighting',
        'St. Patrick\'s Day Parade - Irish heritage celebration',
        'Bastille Day Festival - French culture celebration',
        'Oktoberfest - German beer and food festival',
        'Christmas Tree Lighting - Holiday festivities',
        'New Year\'s Eve celebration - City-wide countdown'
      ]}
    ],
    photos: [
      { category: 'Skyline Views', images: [
        'Golden Triangle from Mt. Washington',
        'Point State Park sunset views',
        'Duquesne Incline panorama',
        'Riverside views from Roberto Clemente Bridge',
        'Downtown from PNC Park',
        'City lights at night',
        'Morning skyline from the Allegheny',
        'Historic buildings and modern towers'
      ]},
      { category: 'Historic Landmarks', images: [
        'Point State Park fountains',
        'Duquesne Incline historic cars',
        'Market Square cobblestone plaza',
        'Carnegie Library architectural details',
        'Heinz Hall ornate facade',
        'Mellon Square modernist sculpture',
        'Historic bank buildings',
        'Art Deco skyscrapers'
      ]},
      { category: 'Cultural Attractions', images: [
        'Andy Warhol Museum exhibits',
        'Carnegie Museum of Art galleries',
        'PPG Paints Arena interior',
        'Benedum Center stage productions',
        'Convention Center exhibits',
        'Rivers Casino gaming floor',
        'Sports memorabilia collections',
        'Public art installations'
      ]},
      { category: 'Street Life', images: [
        'Market Square bustling activity',
        'Liberty Avenue shopping district',
        'Food hall dining scenes',
        'Street performers and musicians',
        'Business professionals during lunch',
        'Tourists exploring the triangle',
        'Seasonal decorations and events',
        'Nightlife and entertainment districts'
      ]}
    ],
    transportation: {
      public: ['Port Authority buses', 'Light Rail (T)', 'Uber/Lyft', 'Pittsburgh Regional Transit'],
      parking: 'Multiple downtown parking garages with hourly rates, validated parking at major attractions',
      highways: ['I-279', 'I-376', 'US-19', 'Pennsylvania Turnpike'],
      walking: 'Extremely walkable with connecting skywalks and tunnels',
      biking: 'Bike Pittsburgh routes, bike sharing stations',
      airports: 'Pittsburgh International Airport (PIT) - 30 minutes away'
    },
    realEstate: {
      medianHomePrice: 350000,
      walkScore: 95,
      transitScore: 85,
      bikeScore: 70,
      propertyTypes: ['High-rise condos', 'Loft apartments', 'Historic brownstones', 'Modern luxury towers']
    },
    demographics: {
      medianAge: 32,
      medianIncome: 75000,
      educationLevel: 'Bachelor\'s Degree',
      workforce: 'Business professionals, corporate executives, young professionals, tourists'
    }
  },
  'oakland': {
    name: 'Oakland',
    description: 'Pittsburgh\'s academic and medical hub, home to Carnegie Mellon University, University of Pittsburgh, and major hospitals.',
    population: 25000,
    walkScore: 88,
    medianIncome: 45000,
    attractions: [
      { name: 'Carnegie Museum of Natural History', type: 'Museum', description: 'Dinosaur fossils and natural science exhibits' },
      { name: 'Phipps Conservatory', type: 'Garden', description: 'Stunning botanical gardens and glasshouse' },
      { name: 'Heinz Field', type: 'Sports', description: 'Home of the Pittsburgh Steelers' },
      { name: 'Carnegie Mellon University', type: 'Education', description: 'World-renowned research university' },
      { name: 'Schenley Park', type: 'Park', description: 'Large urban park with trails and recreation' }
    ],
    dining: [
      { category: 'Student Favorites', spots: ['The Porch at Schenley', 'Fuel and Fuddle', 'Union Grill'] },
      { category: 'International', spots: ['India Garden', 'Ali Baba', 'Sushi Too'] },
      { category: 'Quick Bites', spots: ['Primanti Bros.', 'Subway', 'Chipotle'] }
    ],
    transportation: {
      public: ['Port Authority buses', 'Light Rail (T)', 'Campus shuttles'],
      parking: 'Street parking and university lots (permit required)',
      highways: ['I-376', 'Fifth Avenue buses']
    },
    realEstate: {
      medianHomePrice: 280000,
      walkScore: 88,
      transitScore: 75,
      bikeScore: 65
    },
    demographics: {
      medianAge: 25,
      medianIncome: 45000,
      educationLevel: 'Graduate Degree'
    }
  },
  'lawrenceville': {
    name: 'Lawrenceville',
    description: 'Artsy neighborhood known for its galleries, boutiques, historic architecture, and vibrant arts scene. A creative hub where artists, entrepreneurs, and foodies converge along Butler Street\'s bustling corridor.',
    population: 8000,
    walkScore: 85,
    medianIncome: 55000,
    attractions: [
      { name: 'Lawrenceville Arts & Entertainment District', type: 'Arts', description: 'Monthly arts events, gallery openings, and creative community gatherings' },
      { name: 'Pittsburgh Glass Center', type: 'Arts', description: 'Working glass studio offering classes, workshops, and public demonstrations' },
      { name: 'Murry Avenue', type: 'Shopping', description: 'Historic commercial street lined with unique boutiques and specialty shops' },
      { name: 'Row House Cinema', type: 'Theater', description: 'Independent movie theater showcasing indie films and hosting film festivals' },
      { name: 'Artery', type: 'Arts', description: 'Artist studios, creative spaces, and maker community in converted industrial buildings' },
      { name: 'The ToonSeum', type: 'Museum', description: 'Museum of cartoon and comic art featuring original artwork and exhibits' },
      { name: 'Randyland', type: 'Art', description: 'Colorful outsider art installation and creative public art space' },
      { name: 'Pittsburgh Vintage Grand Prix', type: 'Sports', description: 'Annual vintage car race through the neighborhood streets' },
      { name: 'Lawrenceville Farmers Market', type: 'Market', description: 'Saturday morning market with local produce, crafts, and artisanal goods' },
      { name: 'Butler Street Bridge Park', type: 'Park', description: 'Linear park along the railroad tracks with community gardens and trails' }
    ],
    dining: [
      { category: 'Craft Beer & Breweries', spots: [
        'Church Brew Works - Historic church turned brewery with artisanal pizzas',
        'Fat Head\'s Saloon - Craft beer pioneer with extensive tap list and pub fare',
        'Roundabout Brewery - Neighborhood brewery with seasonal beers and events',
        'Penn Brewery - Historic brewery with German-inspired cuisine and tours',
        'East End Brewing - Local brewery with creative IPAs and stouts',
        'Artery Brewing - Small-batch brewery with experimental beers',
        'Grind House Brewing - Coffee-infused beers and creative taproom',
        'Lawrenceville Beer Distributor - Craft beer shop and tasting room'
      ]},
      { category: 'Casual Dining & Comfort Food', spots: [
        'Alewife - Eclectic menu with creative brunch options and craft cocktails',
        'Spork - Modern comfort food with globally inspired small plates',
        'Taco Mamacita - Authentic Mexican tacos and fresh margaritas',
        'Bridge & Bite - Farm-to-table American cuisine with craft cocktails',
        'The Lawrenceville Butcher - Specialty meats and gourmet sandwiches',
        'Piper\'s Pub - Irish pub with extensive whiskey selection',
        'The Porch at Schenley - Casual dining with outdoor seating',
        'Fuel and Fuddle - Student favorite with burgers and beer specials'
      ]},
      { category: 'Bakeries & Desserts', spots: [
        'Dozen Bakery - Artisanal breads, pastries, and coffee',
        'La Gourmandine - French bakery with authentic croissants and tarts',
        'Buttercream Bakeshop - Custom cakes, cupcakes, and dessert catering',
        'Prantl\'s Bakery - Historic German bakery with strudel and pretzels',
        'Bistro To Go - French bakery café with quiches and salads',
        'La Roche Bakery - French pastries and artisanal chocolates',
        'Crazy Mocha - Specialty coffee and fresh baked goods',
        'The Milk Shake Factory - Classic milkshakes and ice cream treats'
      ]},
      { category: 'Ethnic & International', spots: [
        'Thai Place - Traditional Thai cuisine with fresh herbs and spices',
        'India Garden - Authentic Indian curries and tandoori specialties',
        'Gaucho Parrilla Argentina - Argentine steaks and empanadas',
        'Umami - Pan-Asian fusion with sushi and noodle dishes',
        'Ali Baba - Middle Eastern mezze and kebabs',
        'Sushi Too - Fresh sushi and Japanese specialties',
        'Greek Grill - Gyros, souvlaki, and Mediterranean salads',
        'Mama Rosa\'s Pizza - Authentic Italian pizza and pasta'
      ]},
      { category: 'Coffee & Cafes', spots: [
        'Steel City Coffee Roasters - Local coffee roasting and specialty drinks',
        'Crazy Mocha - Pittsburgh\'s original third-wave coffee shop',
        'Press Coffee - Single-origin beans and latte art',
        'Caffeine Underground - Specialty coffee and light breakfast',
        'Starbucks Reserve Roastery - Premium coffee experience',
        'The Coffee Tree Roasters - Organic coffee and community space',
        '412 Coffee & Tea - Local roaster with tea selection',
        'Commonplace Coffee - Neighborhood café with outdoor seating'
      ]},
      { category: 'Food Markets & Specialty', spots: [
        'Whole Foods Market - Organic groceries and specialty foods',
        'Penn Avenue Fish Company - Fresh seafood and gourmet products',
        'The Spice Island Tea House - Rare teas and spices',
        'Giant Eagle - Full-service grocery with deli and bakery',
        'Trader Joe\'s - Unique specialty and organic products',
        'Aldi - Budget-friendly groceries and international foods',
        'Local butcher shops - Specialty meats and charcuterie',
        'Farmers markets - Seasonal local produce and artisanal goods'
      ]}
    ],
    shops: [
      { category: 'Boutiques & Fashion', spots: [
        'Murry Avenue boutiques - Unique clothing and accessories',
        'Anthropologie - Boho-chic fashion and home decor',
        'Urban Outfitters - Trendy casual wear and accessories',
        'H&M - Fast-fashion clothing and basics',
        'Banana Republic - Contemporary professional wear',
        'J.Crew - Classic American style clothing',
        'Gap - Casual clothing for all ages',
        'Old Navy - Affordable family clothing'
      ]},
      { category: 'Art Galleries & Studios', spots: [
        'Lawrenceville Arts Collective - Contemporary local artists',
        'Pittsburgh Glass Center gift shop - Handmade glass art',
        'Artery artist studios - Working artist spaces',
        'Gallery openings - Monthly rotating exhibits',
        'Randyland art shop - Unique outsider art',
        'Local print shops - Custom artwork and prints',
        'Frame shops - Custom framing services',
        'Art supply stores - Materials for creative projects'
      ]},
      { category: 'Home & Garden', spots: [
        'West Elm - Modern furniture and home accessories',
        'Pottery Barn - Traditional home furnishings',
        'CB2 - Contemporary furniture and decor',
        'Williams Sonoma - Gourmet kitchenware',
        'Crate & Barrel - Kitchen and dining essentials',
        'Bed Bath & Beyond - Home organization and decor',
        'Garden centers - Plants, gardening supplies',
        'Antique shops - Vintage furniture and collectibles'
      ]},
      { category: 'Specialty & Gifts', spots: [
        'Butler Street Books - Independent bookstore with events',
        'Paper Source - Stationery and party supplies',
        'Hallmark - Cards, gifts, and home decor',
        'Williams Sonoma Home - Entertaining and kitchen gifts',
        'Pittsburgh Pop Art - Local artist merchandise',
        'Craft stores - DIY supplies and materials',
        'Vintage shops - Retro clothing and accessories',
        'Bicycle shops - Cycling gear and repairs'
      ]},
      { category: 'Health & Beauty', spots: [
        'Lawrenceville Hair Studio - Full-service salon',
        'Beauty salons - Hair, nails, and spa services',
        'Fitness studios - Yoga, pilates, and personal training',
        'Wellness centers - Massage and holistic services',
        'Pharmacies - Health and beauty products',
        'Vitamin shops - Supplements and natural remedies',
        'Tanning salons - Sunless tanning services',
        'Barber shops - Traditional grooming services'
      ]}
    ],
    events: [
      { category: 'Arts & Culture', events: [
        'Lawrenceville Arts Festival - Annual outdoor art celebration',
        'Gallery openings - Monthly new exhibit receptions',
        'Film screenings at Row House Cinema',
        'Pittsburgh Vintage Grand Prix car race',
        'Randyland art installations and events',
        'Glass blowing demonstrations',
        'Artist studio tours and open houses',
        'Comic book and cartoon art exhibits'
      ]},
      { category: 'Food & Drink', events: [
        'Lawrenceville Farmers Market - Saturday produce market',
        'Brewery tours and tastings',
        'Restaurant week specials',
        'Food truck festivals',
        'Wine and beer pairing events',
        'Cooking classes and demonstrations',
        'Charcuterie and cheese tastings',
        'Coffee cupping events'
      ]},
      { category: 'Community & Seasonal', events: [
        'Butler Street Bridge Park events',
        'Neighborhood association meetings',
        'Holiday tree lighting and parades',
        'Summer concert series',
        'Halloween costume contests',
        'Easter egg hunts',
        'Independence Day fireworks',
        'Thanksgiving community dinners'
      ]},
      { category: 'Fitness & Wellness', events: [
        'Yoga in the park sessions',
        'Group fitness classes',
        'Running club meetups',
        'Cycling tours and rides',
        'Pilates workshops',
        'Meditation and wellness retreats',
        'Health and nutrition seminars',
        'Spa day promotions and events'
      ]}
    ],
    photos: [
      { category: 'Arts & Culture', images: [
        'Lawrenceville Arts District murals',
        'Pittsburgh Glass Center demonstrations',
        'Artery artist studios',
        'Randyland colorful installations',
        'Gallery exhibit openings',
        'Row House Cinema marquee',
        'Street art and murals',
        'Public art installations'
      ]},
      { category: 'Historic Architecture', images: [
        'Historic row houses on Butler Street',
        'Converted industrial buildings',
        'Victorian architecture details',
        'Street lamps and cobblestone',
        'Historic storefronts',
        'Bridge and river views',
        'Neighborhood churches',
        '19th-century commercial buildings'
      ]},
      { category: 'Food & Dining', images: [
        'Butler Street dining scene',
        'Brewery interiors and beer gardens',
        'Farmers market produce displays',
        'Restaurant patios and outdoor seating',
        'Bakery cases with fresh pastries',
        'Coffee shop atmospheres',
        'Food truck gatherings',
        'Bar and nightlife scenes'
      ]},
      { category: 'Community & Lifestyle', images: [
        'Farmers market crowds',
        'Street festivals and events',
        'People walking dogs',
        'Bicycle riders on trails',
        'Community gardens',
        'Local business owners',
        'Neighborhood children playing',
        'Seasonal decorations'
      ]}
    ],
    transportation: {
      public: ['Port Authority buses (61A, 61B, 61C, 61D)', 'Bike Pittsburgh routes', 'Uber/Lyft', 'Shared bikes and scooters'],
      parking: 'Street parking (free on Sundays), residential permit parking, nearby garages',
      highways: ['I-279 (Parkway North)', 'US-19 (Butler Street)', 'Pennsylvania Turnpike access'],
      walking: 'Highly walkable with connecting sidewalks and crosswalks',
      biking: 'Bike trails along the Allegheny River, bike lanes on Butler Street',
      transit: 'Light Rail (T) accessible via downtown connection'
    },
    realEstate: {
      medianHomePrice: 320000,
      walkScore: 85,
      transitScore: 65,
      bikeScore: 75,
      propertyTypes: ['Historic row houses', 'Victorian homes', 'Loft apartments', 'Modern condos', 'Artist studios']
    },
    demographics: {
      medianAge: 35,
      medianIncome: 55000,
      educationLevel: 'Bachelor\'s Degree',
      workforce: 'Artists, entrepreneurs, young professionals, creatives, food industry workers'
    }
  },
  'south-side': {
    name: 'South Side',
    description: 'Historic South Side Flats with trendy shops, restaurants, nightlife, and the famous South Side Works.',
    population: 12000,
    walkScore: 82,
    medianIncome: 65000,
    attractions: [
      { name: 'South Side Works', type: 'Shopping', description: 'Canal Place shopping and entertainment complex' },
      { name: 'Carnegie Library of Pittsburgh', type: 'Library', description: 'Historic library with events and programs' },
      { name: 'Station Square', type: 'Entertainment', description: 'Riverfront entertainment and dining complex' },
      { name: 'South Side Slopes', type: 'Historic', description: 'Historic neighborhood with cobblestone streets' },
      { name: 'Mr. Smalls Theatre', type: 'Comedy', description: 'Popular comedy club and theater' }
    ],
    dining: [
      { category: 'Pizza', spots: ['Aiello\'s', 'Slice on the South Side', 'Fat Head\'s Saloon'] },
      { name: 'Mexican', spots: ['Mad Mex', 'Taco Mamacita', 'Carmen\'s'] },
      { name: 'Bars & Pubs', spots: ['The Second Mile', 'Voodoo Lounge', 'Piper\'s Pub'] }
    ],
    transportation: {
      public: ['Port Authority buses', 'South Shore Riverboat', 'Bike paths'],
      parking: 'Street parking and garages',
      highways: ['I-376', 'US-19']
    },
    realEstate: {
      medianHomePrice: 290000,
      walkScore: 82,
      transitScore: 70,
      bikeScore: 68
    },
    demographics: {
      medianAge: 33,
      medianIncome: 65000,
      educationLevel: 'Bachelor\'s Degree'
    }
  },
  'shadyside': {
    name: 'Shadyside',
    description: 'Upscale neighborhood known for high-end shopping, fine dining, and proximity to Chatham University. A sophisticated residential area with tree-lined streets, historic homes, and cultural institutions.',
    population: 15000,
    walkScore: 78,
    medianIncome: 85000,
    attractions: [
      { name: 'Walnut Street Shopping District', type: 'Shopping', description: 'Upscale boutiques, galleries, and specialty stores along historic Walnut Street' },
      { name: 'Rodef Shalom Congregation', type: 'Historic', description: 'Historic synagogue and cultural center with beautiful architecture' },
      { name: 'Frick Park', type: 'Park', description: 'One of Pittsburgh\'s largest urban parks with trails, sports facilities, and recreation' },
      { name: 'Chatham University', type: 'Education', description: 'Liberal arts university known for women\'s education and innovation' },
      { name: 'The Andy Warhol Museum', type: 'Museum', description: 'World-renowned museum dedicated to pop art pioneer Andy Warhol' },
      { name: 'Phipps Conservatory', type: 'Garden', description: 'Stunning botanical gardens with seasonal exhibits and butterfly house' },
      { name: 'Shadyside Hospital', type: 'Medical', description: 'Major medical center and teaching hospital' },
      { name: 'Carnegie Library of Pittsburgh - Shadyside', type: 'Library', description: 'Historic library with community programs and events' },
      { name: 'Shadyside Park', type: 'Park', description: 'Neighborhood park with playgrounds and community gardens' },
      { name: 'Fifth Avenue Place', type: 'Shopping', description: 'Upscale shopping center with luxury brands and dining' }
    ],
    dining: [
      { category: 'Fine Dining & Upscale', spots: [
        'Casbah - Moroccan-inspired cuisine with belly dancing',
        'Sushi Kim - Authentic Japanese sushi and kaiseki dining',
        'Alma at The Mansion - Seasonal French-American fine dining',
        'The Capital Grille - Classic steakhouse with premium wines',
        'Lidia\'s Pittsburgh - Celebrity chef Italian cuisine',
        'Nine on Nine - Rooftop dining with city views',
        'Sushi Azabu - Michelin-star level Japanese cuisine',
        'Meat & Potatoes - Creative American tasting menus'
      ]},
      { category: 'Casual & Contemporary', spots: [
        'Piada - Italian street food with build-your-own panini',
        'Mediterra - Mediterranean grill with fresh healthy options',
        'The Porch at Schenley - Casual dining with outdoor seating',
        'Fuel and Fuddle - Pub fare with extensive beer selection',
        'Union Grill - Neighborhood favorite with brunch and dinner',
        'Spork - Eclectic global small plates',
        'Alewife - Creative brunch and dinner menu',
        'Taco Mamacita - Fresh Mexican tacos and margaritas'
      ]},
      { category: 'Coffee, Bakeries & Desserts', spots: [
        'Crazy Mocha - Specialty coffee and fresh pastries',
        'Dozen Bakery - Artisanal breads and European-style pastries',
        'Bistro To Go - French bakery with quiches and salads',
        'La Roche Bakery - French pastries and artisanal chocolates',
        'Prantl\'s Bakery - Historic German bakery with strudel',
        'Buttercream Bakeshop - Custom cakes and cupcakes',
        'Press Coffee - Third-wave coffee with local beans',
        'Starbucks Reserve Roastery - Premium coffee experience'
      ]},
      { category: 'International & Ethnic', spots: [
        'India Garden - Authentic Indian curries and tandoori',
        'Ali Baba - Middle Eastern mezze and kebabs',
        'Gaucho Parrilla Argentina - Argentine steaks and wines',
        'Umami - Pan-Asian fusion cuisine',
        'Sushi Too - Fresh sushi and Japanese specialties',
        'Thai Place - Traditional Thai with fresh herbs',
        'Greek Grill - Gyros, souvlaki, and Mediterranean salads',
        'Mediterranean Grill - Healthy Mediterranean cuisine'
      ]},
      { category: 'Quick Service & Markets', spots: [
        'Whole Foods Market - Organic groceries and prepared foods',
        'Giant Eagle - Full-service grocery with specialty sections',
        'Trader Joe\'s - Unique specialty and organic products',
        'Chipotle - Fresh Mexican-inspired bowls and burritos',
        'Sweetgreen - Healthy salads and grain bowls',
        'Pret A Manger - Fresh sandwiches and gourmet coffee',
        'Caffeine Underground - Specialty coffee and light bites',
        'Local juice bars and smoothie shops'
      ]}
    ],
    shops: [
      { category: 'Luxury & Designer', spots: [
        'Fifth Avenue Place - Luxury shopping center',
        'Neiman Marcus - High-end fashion and accessories',
        'Saks Fifth Avenue - Designer clothing and cosmetics',
        'Louis Vuitton - Luxury handbags and leather goods',
        'Tiffany & Co. - Fine jewelry and luxury gifts',
        'Cartier - Iconic watches and jewelry',
        'Hermès - Luxury fashion and accessories',
        'Rolex - Premium timepieces'
      ]},
      { category: 'Boutiques & Specialty', spots: [
        'Anthropologie - Boho-chic fashion and home decor',
        'Banana Republic - Contemporary professional wear',
        'J.Crew - Classic American style clothing',
        'Williams Sonoma - Gourmet kitchenware',
        'Pottery Barn - Traditional home furnishings',
        'West Elm - Modern furniture and accessories',
        'Brooks Brothers - Traditional menswear',
        'Ann Taylor - Women\'s professional clothing'
      ]},
      { category: 'Art Galleries & Cultural', spots: [
        'The Andy Warhol Museum shop - Pop art merchandise',
        'Phipps Conservatory gift shop - Botanical books and art',
        'Chatham University galleries - Student art exhibitions',
        'Local art galleries - Rotating contemporary exhibits',
        'Frame shops - Custom framing services',
        'Art supply stores - Materials for artists',
        'Bookstores - Academic and specialty books',
        'Music stores - Instruments and recordings'
      ]},
      { category: 'Health & Wellness', spots: [
        'Shadyside Hospital - Medical services and clinics',
        'Wellness centers - Massage and holistic services',
        'Fitness studios - Yoga, pilates, and personal training',
        'Beauty salons - Hair, nails, and spa services',
        'Pharmacies - Health and beauty products',
        'Vitamin shops - Supplements and natural remedies',
        'Dental practices - Cosmetic and general dentistry',
        'Chiropractic offices - Alternative healthcare'
      ]},
      { category: 'Services & Professional', spots: [
        'Carnegie Library - Community programs and research',
        'Professional offices - Law firms, accountants, consultants',
        'Real estate agencies - Property sales and rentals',
        'Insurance agencies - Personal and business insurance',
        'Banks and financial services - Local and national banks',
        'Travel agencies - Vacation planning and booking',
        'Pet services - Grooming, boarding, veterinary',
        'Dry cleaners and tailors - Clothing care services'
      ]}
    ],
    events: [
      { category: 'Cultural & Arts', events: [
        'Andy Warhol Museum exhibitions and events',
        'Phipps Conservatory seasonal flower shows',
        'Chatham University theater productions',
        'Rodef Shalom cultural programs',
        'Library author talks and readings',
        'Art gallery openings and receptions',
        'Chamber music concerts',
        'Film screenings and festivals'
      ]},
      { category: 'Community & Education', events: [
        'Frick Park outdoor concerts and festivals',
        'Shadyside Farmers Market',
        'Library story hours and programs',
        'University open houses and lectures',
        'Neighborhood association meetings',
        'School events and performances',
        'Community health fairs',
        'Senior center activities'
      ]},
      { category: 'Seasonal Celebrations', events: [
        'Holiday tree lighting in Frick Park',
        'Easter egg hunts and spring festivals',
        'Summer concert series',
        'Halloween costume contests',
        'Independence Day fireworks viewing',
        'Thanksgiving community dinners',
        'Christmas parades and events',
        'New Year\'s Eve celebrations'
      ]},
      { category: 'Sports & Recreation', events: [
        'Frick Park running races and walks',
        'Tennis tournaments',
        'Golf outings and clinics',
        'Yoga in the park sessions',
        'Cycling club rides',
        'Swimming lessons and programs',
        'Fitness boot camps',
        'Outdoor movie screenings'
      ]}
    ],
    photos: [
      { category: 'Historic & Architectural', images: [
        'Tree-lined streets with Victorian homes',
        'Rodef Shalom Congregation architecture',
        'Historic mansions and brownstones',
        'Chatham University campus buildings',
        'Carnegie Library ornate facade',
        'Shadyside Hospital medical center',
        'Fifth Avenue Place modern design',
        '19th-century commercial buildings'
      ]},
      { category: 'Parks & Nature', images: [
        'Frick Park trails and forests',
        'Phipps Conservatory glasshouses',
        'Shadyside Park playgrounds',
        'Garden squares and community gardens',
        'Seasonal flower displays',
        'Urban green spaces',
        'River views and bridges',
        'Botanical garden exhibits'
      ]},
      { category: 'Cultural & Arts', images: [
        'Andy Warhol Museum exhibits',
        'Phipps Conservatory butterfly house',
        'Chatham University art galleries',
        'Rodef Shalom sanctuary',
        'Library reading rooms',
        'Theater productions',
        'Art installations',
        'Cultural performances'
      ]},
      { category: 'Lifestyle & Community', images: [
        'Walnut Street shopping district',
        'Restaurant patios and outdoor dining',
        'Farmers market produce displays',
        'Coffee shop atmospheres',
        'Fitness classes and wellness',
        'Community events and gatherings',
        'Professional services districts',
        'Family-friendly neighborhood scenes'
      ]}
    ],
    transportation: {
      public: ['Port Authority buses (61A, 61B, 71A, 71B)', 'Bike Pittsburgh routes', 'Uber/Lyft', 'Shared bikes and scooters'],
      parking: 'Street parking with meters, private garages, residential permits',
      highways: ['I-376 (Parkway East)', 'US-19 (Fifth Avenue)', 'Pennsylvania Turnpike access'],
      walking: 'Very walkable with sidewalks and crosswalks throughout',
      biking: 'Bike lanes on Fifth and Walnut Streets, park trails',
      transit: 'Light Rail (T) accessible via downtown or Oakland connections'
    },
    realEstate: {
      medianHomePrice: 450000,
      walkScore: 78,
      transitScore: 55,
      bikeScore: 72,
      propertyTypes: ['Victorian homes', 'Brownstones', 'Luxury condos', 'Townhouses', 'Modern apartments']
    },
    demographics: {
      medianAge: 38,
      medianIncome: 85000,
      educationLevel: 'Graduate Degree',
      workforce: 'Medical professionals, academics, business executives, artists, young families'
    }
  },
  'squirrel-hill': {
    name: 'Squirrel Hill',
    description: 'Diverse neighborhood known for its strong Jewish community, excellent restaurants, Carnegie Mellon University proximity, and family-friendly atmosphere. One of Pittsburgh\'s most walkable and culturally rich areas.',
    population: 25000,
    walkScore: 82,
    medianIncome: 75000,
    attractions: [
      { name: 'Carnegie Mellon University', type: 'Education', description: 'World-renowned research university and tech innovation hub' },
      { name: 'Squirrel Hill Historic District', type: 'Historic', description: 'National historic landmark with beautiful architecture' },
      { name: 'Pittsburgh Center for the Arts', type: 'Arts', description: 'Community arts center with galleries and performance spaces' },
      { name: 'Tree of Life Synagogue', type: 'Religious', description: 'Historic synagogue and community center' },
      { name: 'Schenley Park', type: 'Park', description: 'Large urban park with golf course, trails, and recreation' },
      { name: 'Phipps Conservatory', type: 'Garden', description: 'World-class botanical gardens and seasonal exhibits' },
      { name: 'Carnegie Museum of Art', type: 'Museum', description: 'Extensive art collection spanning 5,000 years' },
      { name: 'Carnegie Museum of Natural History', type: 'Museum', description: 'Dinosaurs, gems, and natural science exhibits' },
      { name: 'Squirrel Hill Farmers Market', type: 'Market', description: 'Saturday market with local produce and artisanal goods' },
      { name: 'The Jewish Community Center', type: 'Community', description: 'Cultural center with pools, gyms, and community programs' }
    ],
    dining: [
      { category: 'Jewish Deli & Kosher', spots: [
        'Miles deli - Classic Jewish deli sandwiches and matzo ball soup',
        'Alpine Village - Traditional kosher dairy restaurant',
        'Dave & Andy\'s - Homemade ice cream and casual kosher dining',
        'Shalom Kosher - Modern kosher cuisine and event catering',
        'Kosher restaurants - Multiple options for traditional Jewish cuisine',
        'Deli counters - Fresh kosher meats, cheeses, and prepared foods',
        'Bakery delis - Rye bread, bagels, and Jewish pastries',
        'Kosher supermarkets - Specialty Jewish grocery items'
      ]},
      { category: 'Diverse International', spots: [
        'India Garden - Authentic Indian curries and tandoori specialties',
        'Ali Baba - Middle Eastern mezze, kebabs, and falafel',
        'Umami - Pan-Asian fusion with sushi and noodle dishes',
        'Sushi Too - Fresh sushi and Japanese specialties',
        'Thai Place - Traditional Thai cuisine with fresh herbs',
        'Gaucho Parrilla Argentina - Argentine steaks and empanadas',
        'Mediterranean Grill - Healthy Mediterranean salads and wraps',
        'Greek Grill - Gyros, souvlaki, and Greek salads'
      ]},
      { category: 'American & Contemporary', spots: [
        'The Porch at Schenley - Casual dining with outdoor seating',
        'Fuel and Fuddle - Pub fare with extensive beer selection',
        'Union Grill - Neighborhood favorite with brunch and dinner',
        'Spork - Eclectic global small plates',
        'Alewife - Creative brunch and dinner menu',
        'Piada - Italian street food and build-your-own panini',
        'Mediterra - Mediterranean grill with healthy options',
        'Taco Mamacita - Fresh Mexican tacos and margaritas'
      ]},
      { category: 'Bakeries & Desserts', spots: [
        'Dozen Bakery - Artisanal breads and European-style pastries',
        'La Roche Bakery - French pastries and artisanal chocolates',
        'Prantl\'s Bakery - Historic German bakery with strudel',
        'Buttercream Bakeshop - Custom cakes and cupcakes',
        'Bistro To Go - French bakery with quiches and salads',
        'Crazy Mocha - Specialty coffee and fresh pastries',
        'Dave & Andy\'s - Homemade ice cream parlor',
        'Local ice cream shops - Premium ice cream and frozen treats'
      ]},
      { category: 'Coffee & Cafes', spots: [
        'Crazy Mocha - Specialty coffee and community space',
        'Press Coffee - Third-wave coffee with local beans',
        'Starbucks Reserve Roastery - Premium coffee experience',
        'Caffeine Underground - Specialty coffee and light bites',
        'The Coffee Tree Roasters - Organic coffee and tea',
        '412 Coffee & Tea - Local roaster with extensive selection',
        'Commonplace Coffee - Neighborhood café atmosphere',
        'University coffee shops - Student-friendly study spots'
      ]},
      { category: 'Markets & Specialty Foods', spots: [
        'Whole Foods Market - Organic groceries and specialty items',
        'Giant Eagle - Full-service grocery with international sections',
        'Trader Joe\'s - Unique specialty and organic products',
        'Local butcher shops - Specialty meats and charcuterie',
        'Farmers markets - Seasonal local produce and goods',
        'Kosher markets - Jewish specialty foods and ingredients',
        'International markets - Ethnic groceries and spices',
        'Health food stores - Organic and natural products'
      ]}
    ],
    shops: [
      { category: 'Books & Education', spots: [
        'Carnegie Mellon University Bookstore - Academic texts and gear',
        'Barnes & Noble - Books, music, and gifts',
        'Joseph-Beth Booksellers - Independent bookstore',
        'University bookstores - Academic supplies',
        'Specialty book shops - Technical and professional books',
        'Comic book stores - Graphic novels and collectibles',
        'Music stores - Instruments and recordings',
        'Art supply stores - Materials for students and artists'
      ]},
      { category: 'Fashion & Apparel', spots: [
        'Anthropologie - Boho-chic fashion and home decor',
        'Banana Republic - Contemporary professional wear',
        'J.Crew - Classic American style clothing',
        'Gap - Casual clothing for all ages',
        'Old Navy - Affordable family clothing',
        'H&M - Fast-fashion and trendy basics',
        'Local boutiques - Unique and designer clothing',
        'Sporting goods stores - Athletic wear and equipment'
      ]},
      { category: 'Home & Garden', spots: [
        'Williams Sonoma - Gourmet kitchenware',
        'Pottery Barn - Traditional home furnishings',
        'West Elm - Modern furniture and accessories',
        'CB2 - Contemporary furniture and decor',
        'Bed Bath & Beyond - Home organization and decor',
        'Garden centers - Plants and gardening supplies',
        'Hardware stores - Home improvement supplies',
        'Antique shops - Vintage furniture and collectibles'
      ]},
      { category: 'Health & Wellness', spots: [
        'CVS Pharmacy - Health and beauty products',
        'Giant Eagle Pharmacy - Prescriptions and wellness',
        'Vitamin shops - Supplements and natural remedies',
        'Fitness centers - Gyms and personal training',
        'Yoga studios - Classes and wellness programs',
        'Beauty salons - Hair, nails, and spa services',
        'Dental practices - General and cosmetic dentistry',
        'Medical clinics - Primary care and specialists'
      ]},
      { category: 'Specialty & Cultural', spots: [
        'Jewish community centers - Cultural programs and services',
        'Kosher markets - Jewish specialty foods',
        'International markets - Ethnic groceries',
        'Bookstores - Academic and specialty books',
        'Music stores - Instruments and sheet music',
        'Art galleries - Local artist exhibitions',
        'Craft stores - DIY supplies and materials',
        'Pet stores - Supplies and grooming services'
      ]}
    ],
    events: [
      { category: 'Academic & University', events: [
        'Carnegie Mellon lectures and seminars',
        'University open houses and tours',
        'Tech conferences and innovation events',
        'Research presentations',
        'Student performances and exhibitions',
        'Career fairs and networking events',
        'Alumni events and reunions',
        'Continuing education workshops'
      ]},
      { category: 'Cultural & Community', events: [
        'Jewish Community Center programs',
        'Synagogue events and celebrations',
        'Farmers market gatherings',
        'Arts center exhibitions and performances',
        'Library programs and readings',
        'Community festivals and parades',
        'Cultural celebrations and holidays',
        'Neighborhood association events'
      ]},
      { category: 'Sports & Recreation', events: [
        'Schenley Park golf tournaments',
        'Running races and walks',
        'Tennis tournaments',
        'Swimming competitions',
        'Yoga in the park',
        'Cycling club rides',
        'Outdoor concerts',
        'Fitness challenges'
      ]},
      { category: 'Seasonal & Holiday', events: [
        'High Holy Days celebrations',
        'Passover seders and events',
        'Hanukkah festivals',
        'Christmas tree lighting',
        'Easter celebrations',
        'Summer concert series',
        'Halloween events',
        'New Year\'s celebrations'
      ]}
    ],
    photos: [
      { category: 'University & Education', images: [
        'Carnegie Mellon University campus',
        'Modern tech buildings and innovation centers',
        'Student life and campus activities',
        'Research facilities and labs',
        'Historic academic buildings',
        'Student housing and dormitories',
        'Library and study spaces',
        'Athletic facilities and fields'
      ]},
      { category: 'Cultural & Historic', images: [
        'Squirrel Hill Historic District architecture',
        'Tree of Life Synagogue',
        'Jewish Community Center facilities',
        'Historic homes and brownstones',
        'Cultural landmarks and memorials',
        'Community centers and synagogues',
        'Traditional architecture',
        'Neighborhood heritage sites'
      ]},
      { category: 'Parks & Nature', images: [
        'Schenley Park landscapes',
        'Phipps Conservatory exhibits',
        'Golf course and recreation areas',
        'Trails and walking paths',
        'Seasonal park activities',
        'Botanical gardens and greenhouses',
        'Urban green spaces',
        'Outdoor recreational facilities'
      ]},
      { category: 'Community & Lifestyle', images: [
        'Farmers market scenes',
        'Diverse dining establishments',
        'Family-friendly neighborhoods',
        'Shopping districts',
        'Community events',
        'Local businesses',
        'Cultural celebrations',
        'Daily neighborhood life'
      ]}
    ],
    transportation: {
      public: ['Port Authority buses (61A, 61B, 71A, 71B, 28X)', 'Bike Pittsburgh routes', 'Uber/Lyft', 'Shared bikes and scooters'],
      parking: 'Street parking with meters, university lots, residential permits',
      highways: ['I-376 (Parkway East)', 'US-19 (Forbes Avenue)', 'Pennsylvania Turnpike access'],
      walking: 'Highly walkable with extensive sidewalks and pedestrian paths',
      biking: 'Bike lanes on Forbes and Morewood Avenues, park trails',
      transit: 'Light Rail (T) accessible via downtown or Oakland connections'
    },
    realEstate: {
      medianHomePrice: 420000,
      walkScore: 82,
      transitScore: 65,
      bikeScore: 75,
      propertyTypes: ['Victorian homes', 'Brownstones', 'Modern apartments', 'Student housing', 'Family homes', 'Luxury condos']
    },
    demographics: {
      medianAge: 35,
      medianIncome: 75000,
      educationLevel: 'Graduate Degree',
      workforce: 'Academics, researchers, tech professionals, medical workers, families, students'
    }
  },
  'strip-district': {
    name: 'Strip District',
    description: 'Historic warehouse district transformed into a food and shopping destination with specialty markets and ethnic groceries. Pittsburgh\'s wholesale food hub with authentic international cuisine.',
    population: 800,
    walkScore: 90,
    medianIncome: 70000,
    attractions: [
      { name: 'Whole Foods Market', type: 'Grocery', description: 'Organic and specialty foods with extensive prepared foods section' },
      { name: 'Penn Avenue Fish Company', type: 'Market', description: 'Historic seafood market with fresh fish and gourmet products' },
      { name: 'Pittsburgh Public Market', type: 'Market', description: 'Year-round farmers market with local vendors and specialty foods' },
      { name: 'Local craft breweries', type: 'Brewery', description: 'Multiple breweries offering tours, tastings, and craft beer' },
      { name: 'Randyland', type: 'Art', description: 'Colorful outsider art installation by folk artist Randy Gilson' },
      { name: 'The Pittsburgh Vintage Grand Prix', type: 'Sports', description: 'Annual vintage car race through the warehouse district' },
      { name: 'Strip District Food Hall', type: 'Dining', description: 'Multiple food vendors under one roof with diverse cuisines' },
      { name: 'Historic warehouses', type: 'Historic', description: 'Converted industrial buildings showcasing 19th-century architecture' },
      { name: 'Antique shops and galleries', type: 'Shopping', description: 'Vintage collectibles, art, and unique finds' },
      { name: 'Spice Island Tea House', type: 'Specialty', description: 'Rare teas, spices, and international gourmet products' }
    ],
    dining: [
      { category: 'Wholesale Markets', spots: [
        'Penn Avenue Fish Company - Fresh seafood and gourmet products',
        'Stan Musial\'s Warehouse - Italian wholesale foods and imports',
        'Amish Country Store - Bulk foods and Pennsylvania Dutch specialties',
        'Warehouse produce markets - Wholesale fruits and vegetables',
        'Italian food warehouses - Imported pasta, cheeses, and oils',
        'Asian wholesale markets - Specialty Asian ingredients',
        'Middle Eastern markets - Spices, nuts, and Mediterranean goods',
        'Latin American markets - Tropical fruits and specialty items'
      ]},
      { category: 'Ethnic & International', spots: [
        'Thai Place - Traditional Thai cuisine with fresh herbs and curries',
        'Gaucho Parrilla Argentina - Authentic Argentine steaks and empanadas',
        'Umami - Pan-Asian fusion with sushi and noodle dishes',
        'Ali Baba - Middle Eastern mezze, kebabs, and falafel',
        'India Garden - Authentic Indian curries and tandoori specialties',
        'Greek Grill - Gyros, souvlaki, and Greek salads',
        'Mediterranean Grill - Healthy Mediterranean cuisine',
        'Sushi Too - Fresh sushi and Japanese specialties'
      ]},
      { category: 'Contemporary & Casual', spots: [
        'Strip District Food Hall - Multiple vendors with diverse options',
        'Piada - Italian street food and build-your-own panini',
        'Mediterra - Mediterranean grill with healthy options',
        'Fuel and Fuddle - Pub fare with craft beer selection',
        'Alewife - Creative brunch and dinner menu',
        'Taco Mamacita - Fresh Mexican tacos and margaritas',
        'Spork - Eclectic global small plates',
        'Church Brew Works - Pizza and craft beer'
      ]},
      { category: 'Bakeries & Desserts', spots: [
        'Prantl\'s Bakery - Historic German bakery with strudel and pretzels',
        'Dozen Bakery - Artisanal breads and European-style pastries',
        'La Roche Bakery - French pastries and artisanal chocolates',
        'Buttercream Bakeshop - Custom cakes and dessert catering',
        'Bistro To Go - French bakery with quiches and salads',
        'Crazy Mocha - Specialty coffee and fresh baked goods',
        'Local ice cream shops - Premium ice cream and treats',
        'Dessert shops - Specialty chocolates and confections'
      ]},
      { category: 'Coffee & Quick Bites', spots: [
        'Crazy Mocha - Specialty coffee roasting and drinks',
        'Press Coffee - Third-wave coffee with local beans',
        'Starbucks Reserve Roastery - Premium coffee experience',
        'Caffeine Underground - Specialty coffee and light bites',
        'The Coffee Tree Roasters - Organic coffee and community space',
        '412 Coffee & Tea - Local roaster with tea selection',
        'Food hall quick service - Fast casual dining options',
        'Market cafés - Coffee and light meals'
      ]},
      { category: 'Specialty Markets', spots: [
        'Whole Foods Market - Organic groceries and prepared foods',
        'Penn Avenue Fish Company - Seafood market',
        'Spice Island Tea House - Rare teas and spices',
        'Local butcher shops - Specialty meats and charcuterie',
        'Farmers markets - Seasonal local produce',
        'International markets - Ethnic specialty foods',
        'Health food stores - Organic and natural products',
        'Bulk food stores - Wholesale quantities of staples'
      ]}
    ],
    shops: [
      { category: 'Food Markets & Specialty', spots: [
        'Whole Foods Market - Organic and specialty groceries',
        'Penn Avenue Fish Company - Fresh seafood and gourmet',
        'Spice Island Tea House - Rare teas and international spices',
        'Stan Musial\'s Warehouse - Italian wholesale foods',
        'Amish Country Store - Bulk foods and specialties',
        'Warehouse produce markets - Fresh fruits and vegetables',
        'International markets - Ethnic groceries and ingredients',
        'Bulk food stores - Wholesale staples and pantry items'
      ]},
      { category: 'Antiques & Collectibles', spots: [
        'Antique shops - Vintage furniture and collectibles',
        'Art galleries - Contemporary and folk art',
        'Vintage clothing stores - Retro fashion and accessories',
        'Record stores - Vinyl records and music memorabilia',
        'Book dealers - Rare books and collectibles',
        'Toy stores - Vintage toys and collectibles',
        'Jewelry shops - Antique and estate jewelry',
        'Curio shops - Unique oddities and treasures'
      ]},
      { category: 'Home & Kitchen', spots: [
        'Williams Sonoma - Gourmet kitchenware and cookware',
        'Sur La Table - Cooking classes and kitchen tools',
        'Pottery Barn - Home furnishings and decor',
        'West Elm - Modern furniture and accessories',
        'CB2 - Contemporary furniture and decor',
        'Hardware stores - Tools and home improvement',
        'Garden centers - Plants and outdoor supplies',
        'Restaurant supply stores - Professional kitchen equipment'
      ]},
      { category: 'Specialty & Unique', spots: [
        'Randyland - Folk art and outsider art',
        'Art supply stores - Materials for artists and crafters',
        'Craft stores - DIY supplies and materials',
        'Music stores - Instruments and accessories',
        'Pet stores - Supplies for pets',
        'Sporting goods - Athletic equipment and apparel',
        'Bicycle shops - Bikes and cycling gear',
        'Photography stores - Cameras and supplies'
      ]},
      { category: 'Services & Professional', spots: [
        'Professional kitchens - Commercial cooking facilities',
        'Food photography studios - Commercial photography',
        'Event spaces - Warehouse venues for parties',
        'Art studios - Working spaces for artists',
        'Brewery taprooms - Craft beer tasting',
        'Coffee roasting facilities - Bean processing',
        'Food processing plants - Local manufacturing',
        'Distribution centers - Wholesale logistics'
      ]}
    ],
    events: [
      { category: 'Food & Markets', events: [
        'Pittsburgh Public Market - Year-round market activities',
        'Farmers market weekends - Seasonal produce and goods',
        'Food festivals - Ethnic cuisine celebrations',
        'Brewery tours and tastings',
        'Cooking demonstrations',
        'Wine and beer pairings',
        'Charcuterie classes',
        'Baking workshops'
      ]},
      { category: 'Arts & Culture', events: [
        'Randyland art exhibits',
        'Gallery openings and receptions',
        'Art walks and studio tours',
        'Craft fairs and markets',
        'Music performances',
        'Theater productions',
        'Film screenings',
        'Cultural festivals'
      ]},
      { category: 'Community & Seasonal', events: [
        'Pittsburgh Vintage Grand Prix car race',
        'Warehouse district festivals',
        'Holiday markets and events',
        'Summer concert series',
        'Art and craft shows',
        'Neighborhood clean-ups',
        'Community meetings',
        'Charity events'
      ]},
      { category: 'Business & Industry', events: [
        'Food industry trade shows',
        'Restaurant supply expos',
        'Brewery industry events',
        'Wholesale food conventions',
        'Culinary competitions',
        'Business networking events',
        'Industry conferences',
        'Professional development seminars'
      ]}
    ],
    photos: [
      { category: 'Historic Architecture', images: [
        '19th-century warehouse buildings',
        'Converted industrial spaces',
        'Cobblestone streets',
        'Historic loading docks',
        'Architectural details',
        'Street lamps and signage',
        'Building facades',
        'Urban warehouse district'
      ]},
      { category: 'Food Markets', images: [
        'Penn Avenue Fish Company displays',
        'Warehouse produce markets',
        'Italian food warehouses',
        'Spice markets and tea houses',
        'Farmers market stalls',
        'Food hall interiors',
        'Gourmet product displays',
        'Fresh food preparations'
      ]},
      { category: 'Arts & Culture', images: [
        'Randyland colorful installations',
        'Antique shop interiors',
        'Art gallery exhibits',
        'Craft fair displays',
        'Street art and murals',
        'Performance spaces',
        'Cultural events',
        'Community gatherings'
      ]},
      { category: 'Street Life', images: [
        'Pedestrian activity',
        'Food cart vendors',
        'Market day crowds',
        'Street performers',
        'Delivery trucks',
        'Tourist groups',
        'Local shoppers',
        'Seasonal decorations'
      ]}
    ],
    transportation: {
      public: ['Port Authority buses (61A, 61B, 71A, 71B)', 'Bike Pittsburgh routes', 'Uber/Lyft', 'Shared bikes and scooters'],
      parking: 'Street parking with meters, warehouse lots, nearby garages',
      highways: ['I-279 (Parkway North)', 'US-19 (Penn Avenue)', 'I-376 access'],
      walking: 'Extremely walkable with pedestrian-friendly streets',
      biking: 'Bike lanes and routes throughout the district',
      transit: 'Light Rail (T) accessible via downtown connection'
    },
    realEstate: {
      medianHomePrice: 380000,
      walkScore: 90,
      transitScore: 60,
      bikeScore: 80,
      propertyTypes: ['Converted lofts', 'Warehouse apartments', 'Modern condos', 'Historic buildings', 'Commercial spaces']
    },
    demographics: {
      medianAge: 36,
      medianIncome: 70000,
      educationLevel: 'Bachelor\'s Degree',
      workforce: 'Food industry workers, artists, entrepreneurs, chefs, retail workers, young professionals'
    }
  }
}

export async function generateMetadata({ params }: NeighborhoodPageProps): Promise<Metadata> {
  // Try to get from new comprehensive data first
  let neighborhood = getNeighborhoodBySlug(params.id)
  
  // Fallback to legacy data if not found
  if (!neighborhood) {
    const legacyData = neighborhoodData[params.id as keyof typeof neighborhoodData]
    if (!legacyData) {
      return {
        title: 'Neighborhood Not Found | PittsburghEverything',
        description: 'Discover Pittsburgh neighborhoods, restaurants, events, and attractions.',
      }
    }
    // Use legacy data for metadata - create a compatible structure
    const legacyDining = (legacyData as any).dining || []
    const legacyShops = (legacyData as any).shops || []
    const legacyEvents = (legacyData as any).events || []
    const legacyAttractions = legacyData.attractions || []
    
    neighborhood = {
      name: legacyData.name,
      description: legacyData.description,
      walkScore: legacyData.walkScore || 0,
      attractions: legacyAttractions,
      dining: legacyDining,
      shops: legacyShops,
      events: legacyEvents
    } as NeighborhoodData
  }

  const restaurants = neighborhood.dining?.flatMap((cat: any) => cat.spots) || []
  const shops = neighborhood.shops?.flatMap((cat: any) => cat.spots) || []
  const events = neighborhood.events?.flatMap((cat: any) => cat.events) || []

  const keywords = [
    neighborhood.name,
    'Pittsburgh neighborhood',
    `${neighborhood.name} restaurants`,
    `${neighborhood.name} attractions`,
    `${neighborhood.name} shopping`,
    `${neighborhood.name} events`,
    `${neighborhood.name} dining`,
    `${neighborhood.name} guide`,
    'Pittsburgh local guide',
    'Pittsburgh neighborhoods',
    'Pittsburgh attractions',
    'Pittsburgh restaurants',
    'Pittsburgh events',
    'Pittsburgh shopping'
  ].join(', ')

  return {
    title: `${neighborhood.name} Neighborhood Guide | Restaurants, Events, Shopping | PittsburghEverything`,
    description: `Complete guide to ${neighborhood.name}, Pittsburgh: ${restaurants.slice(0, 3).join(', ')} & ${restaurants.length - 3}+ more restaurants, ${shops.length}+ shops, ${events.length}+ events. Walk Score ${neighborhood.walkScore}/100. ${neighborhood.description}`,
    keywords,
    authors: [{ name: 'PittsburghEverything' }],
    creator: 'PittsburghEverything',
    publisher: 'PittsburghEverything',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://pittsburgheverything.com'),
    alternates: {
      canonical: `/neighborhoods/${params.id}`,
    },
    openGraph: {
      title: `${neighborhood.name} Neighborhood Guide | PittsburghEverything`,
      description: `Explore ${neighborhood.name}: ${neighborhood.attractions.length} attractions, ${restaurants.length}+ restaurants, ${shops.length}+ shops. ${neighborhood.description}`,
      url: `/neighborhoods/${params.id}`,
      siteName: 'PittsburghEverything',
      images: [
        {
          url: `/images/neighborhoods/${params.id}.jpg`,
          width: 1200,
          height: 630,
          alt: `${neighborhood.name} neighborhood in Pittsburgh`,
          type: 'image/jpeg',
        },
        {
          url: `/images/neighborhoods/${params.id}-attractions.jpg`,
          width: 1200,
          height: 630,
          alt: `${neighborhood.name} attractions and landmarks`,
          type: 'image/jpeg',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${neighborhood.name} | Pittsburgh Neighborhood Guide`,
      description: `Complete guide to ${neighborhood.name}: restaurants, shopping, events, and attractions. ${neighborhood.description}`,
      images: [`/images/neighborhoods/${params.id}.jpg`],
      creator: '@pittsburgheverything',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-site-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    },
    category: 'Local Guide',
  }
}

// Helper function to convert legacy data to new format
function convertLegacyToNew(legacyData: any, id: string): NeighborhoodData {
  return {
    id,
    name: legacyData.name,
    slug: id,
    type: 'neighborhood' as const,
    county: 'Allegheny',
    distanceFromDowntown: 0,
    direction: 'Central' as const,
    coordinates: { lat: 40.4406, lng: -79.9959 },
    zipCodes: [],
    population: legacyData.population || 0,
    medianIncome: legacyData.medianIncome || 0,
    medianHomePrice: legacyData.realEstate?.medianHomePrice || 0,
    walkScore: legacyData.walkScore || 0,
    transitScore: legacyData.realEstate?.transitScore || 0,
    bikeScore: legacyData.realEstate?.bikeScore || 0,
    description: legacyData.description,
    highlights: [],
    attractions: Array.isArray(legacyData.attractions) ? legacyData.attractions : [],
    dining: Array.isArray(legacyData.dining) ? legacyData.dining.map((d: any) => ({
      category: d.category || '',
      spots: Array.isArray(d.spots) ? d.spots : []
    })) : [],
    shops: Array.isArray(legacyData.shops) ? legacyData.shops.map((s: any) => ({
      category: s.category || '',
      spots: Array.isArray(s.spots) ? s.spots : []
    })) : [],
    events: Array.isArray(legacyData.events) ? legacyData.events.map((e: any) => ({
      category: e.category || '',
      events: Array.isArray(e.events) ? e.events : []
    })) : [],
    photos: Array.isArray(legacyData.photos) ? legacyData.photos.map((p: any) => ({
      category: p.category || '',
      images: Array.isArray(p.images) ? p.images : []
    })) : [],
    transportation: {
      public: Array.isArray(legacyData.transportation?.public) ? legacyData.transportation.public : [],
      parking: legacyData.transportation?.parking || '',
      highways: Array.isArray(legacyData.transportation?.highways) ? legacyData.transportation.highways : [],
      walking: legacyData.transportation?.walking || '',
      biking: legacyData.transportation?.biking || '',
      airports: legacyData.transportation?.airports || ''
    },
    realEstate: {
      medianHomePrice: legacyData.realEstate?.medianHomePrice || 0,
      walkScore: legacyData.realEstate?.walkScore || legacyData.walkScore || 0,
      transitScore: legacyData.realEstate?.transitScore || 0,
      bikeScore: legacyData.realEstate?.bikeScore || 0,
      propertyTypes: Array.isArray(legacyData.realEstate?.propertyTypes) ? legacyData.realEstate.propertyTypes : []
    },
    demographics: {
      medianAge: legacyData.demographics?.medianAge || 0,
      medianIncome: legacyData.demographics?.medianIncome || legacyData.medianIncome || 0,
      educationLevel: legacyData.demographics?.educationLevel || '',
      workforce: legacyData.demographics?.workforce || ''
    },
    seo: {
      title: `${legacyData.name} Guide | PittsburghEverything`,
      description: legacyData.description,
      keywords: [],
      h1: legacyData.name
    }
  }
}

export default function NeighborhoodPage({ params }: NeighborhoodPageProps) {
  // Try to get from new comprehensive data first
  let neighborhood = getNeighborhoodBySlug(params.id)
  
  // Fallback to legacy data if not found
  if (!neighborhood) {
    const legacyData = neighborhoodData[params.id as keyof typeof neighborhoodData]
    if (!legacyData) {
      notFound()
    }
    // Convert legacy format to new format
    neighborhood = convertLegacyToNew(legacyData, params.id)
  }

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": neighborhood.name,
    "description": neighborhood.description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pittsburgh",
      "addressRegion": "PA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.4406,
      "longitude": -79.9959
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "1250"
    },
    "containsPlace": (neighborhood as any).attractions?.map((attraction: any) => ({
      "@type": "TouristAttraction",
      "name": attraction.name,
      "description": attraction.description
    })),
    "hasPart": [
      {
        "@type": "FoodEstablishment",
        "name": "Local Restaurants",
        "description": `${(neighborhood as any).dining?.length || 0} dining categories with ${(neighborhood as any).dining?.flatMap((cat: any) => cat.spots).length || 0} restaurants`
      },
      {
        "@type": "Store",
        "name": "Local Shopping",
        "description": `${(neighborhood as any).shops?.length || 0} shopping categories with ${(neighborhood as any).shops?.flatMap((cat: any) => cat.spots).length || 0} shops`
      }
    ],
    "event": (neighborhood as any).events?.map((category: any) => ({
      "@type": "Event",
      "name": `${category.category} Events`,
      "description": category.events.join(', ')
    })),
    "image": [
      `/images/neighborhoods/${params.id}.jpg`,
      `/images/neighborhoods/${params.id}-attractions.jpg`
    ],
    "sameAs": [
      `https://en.wikipedia.org/wiki/${neighborhood.name},_Pittsburgh`,
      `https://www.google.com/maps/place/${encodeURIComponent(neighborhood.name + ', Pittsburgh, PA')}`
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={structuredData} />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              {neighborhood.name}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {neighborhood.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">{neighborhood.population.toLocaleString()}</div>
                <div className="text-sm opacity-75">Population</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">{neighborhood.walkScore}</div>
                <div className="text-sm opacity-75">Walk Score</div>
              </div>
              <div className="text-center">
                <Home className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">${neighborhood.medianIncome.toLocaleString()}</div>
                <div className="text-sm opacity-75">Median Income</div>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-pittsburgh-gold" />
                <div className="text-2xl font-bold">{neighborhood.attractions.length}</div>
                <div className="text-sm opacity-75">Attractions</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/restaurants?neighborhood=${encodeURIComponent(neighborhood.name)}`}
                className="bg-pittsburgh-gold text-pittsburgh-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Find Restaurants
              </Link>
              <Link
                href={`/events?location=${encodeURIComponent(neighborhood.name)}`}
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors inline-flex items-center justify-center gap-2"
              >
                <Clock className="w-5 h-5" />
                Local Events
              </Link>
              <Link
                href={`/services?neighborhood=${encodeURIComponent(neighborhood.name)}`}
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors inline-flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Find Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Attractions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Top Attractions in {neighborhood.name}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes {neighborhood.name} special - from historic landmarks to cultural hotspots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {neighborhood.attractions.map((attraction, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-pittsburgh-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                      {attraction.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-pittsburgh-black mb-2">{attraction.name}</h3>
                  <p className="text-gray-700">{attraction.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Dining in {neighborhood.name}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From casual bites to fine dining, explore {neighborhood.name}'s culinary scene.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {neighborhood.dining.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-pittsburgh-black mb-4">{category.category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {category.spots.map((spot, spotIndex) => (
                    <div key={spotIndex} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-pittsburgh-gold rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{spot}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Shopping in {neighborhood.name}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover unique boutiques, specialty shops, and retail destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(neighborhood as any).shops?.map((category: any, index: number) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-pittsburgh-black mb-4">{category.category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {category.spots.map((spot: string, spotIndex: number) => (
                    <div key={spotIndex} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-pittsburgh-gold rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{spot}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Events & Activities in {neighborhood.name}
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Join festivals, cultural events, and community gatherings throughout the year.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(neighborhood as any).events?.map((category: any, index: number) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold text-pittsburgh-gold mb-4">{category.category}</h3>
                <div className="space-y-2">
                  {category.events.map((event: string, eventIndex: number) => (
                    <div key={eventIndex} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-pittsburgh-gold rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-white/90 text-sm">{event}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              {neighborhood.name} Photo Gallery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the beauty and character of {neighborhood.name} through stunning photography.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(neighborhood as any).photos?.map((category: any, index: number) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-pittsburgh-black mb-4">{category.category}</h3>
                <div className="grid grid-cols-1 gap-3">
                  {category.images.map((image: string, imageIndex: number) => (
                    <div key={imageIndex} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-3 h-3 bg-pittsburgh-gold rounded-full mt-1.5 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm italic">"{image}"</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transportation & Lifestyle */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Transportation */}
            <div>
              <h2 className="text-3xl font-bold text-pittsburgh-black mb-6">Getting Around</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-pittsburgh-black mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-pittsburgh-gold" />
                    Public Transportation
                  </h3>
                  <ul className="space-y-1 text-gray-700">
                    {neighborhood.transportation.public.map((option, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-pittsburgh-gold rounded-full"></div>
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-pittsburgh-black mb-3 flex items-center gap-2">
                    <Car className="w-5 h-5 text-pittsburgh-gold" />
                    Parking
                  </h3>
                  <p className="text-gray-700">{neighborhood.transportation.parking}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-pittsburgh-black mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-pittsburgh-gold" />
                    Major Highways
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.transportation.highways.map((highway, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {highway}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Lifestyle & Real Estate */}
            <div>
              <h2 className="text-3xl font-bold text-pittsburgh-black mb-6">Lifestyle & Living</h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-pittsburgh-black mb-4">Community Profile</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pittsburgh-gold">{neighborhood.demographics.medianAge}</div>
                      <div className="text-sm text-gray-600">Median Age</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pittsburgh-gold">${neighborhood.demographics.medianIncome.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Median Income</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-sm font-medium text-pittsburgh-black">{neighborhood.demographics.educationLevel}</div>
                    <div className="text-xs text-gray-600">Education Level</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-pittsburgh-gold/10 to-yellow-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-pittsburgh-black mb-4">Real Estate</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Median Home Price</span>
                      <span className="font-bold text-pittsburgh-black">${neighborhood.realEstate.medianHomePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Walk Score</span>
                      <span className="font-bold text-pittsburgh-black">{neighborhood.realEstate.walkScore}/100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Transit Score</span>
                      <span className="font-bold text-pittsburgh-black">{neighborhood.realEstate.transitScore}/100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Bike Score</span>
                      <span className="font-bold text-pittsburgh-black">{neighborhood.realEstate.bikeScore}/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Maps Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Explore {neighborhood.name} Maps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Navigate restaurants, shops, attractions, and transportation options with our interactive maps.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-pittsburgh-black mb-4">Transportation & Accessibility</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Walk Score: {neighborhood.realEstate.walkScore}/100 - {neighborhood.realEstate.walkScore >= 80 ? 'Excellent' : neighborhood.realEstate.walkScore >= 60 ? 'Good' : 'Fair'} pedestrian access</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Bike Score: {neighborhood.realEstate.bikeScore}/100 - {neighborhood.realEstate.bikeScore >= 70 ? 'Bike-friendly' : 'Basic bike access'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Transit Score: {neighborhood.realEstate.transitScore}/100 - {neighborhood.transportation.public.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-pittsburgh-black mb-4">Major Routes & Highways</h3>
              <div className="space-y-2">
                {neighborhood.transportation.highways.map((highway, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-pittsburgh-gold rounded-full"></div>
                    <span className="text-gray-700">{highway}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-3">{(neighborhood.transportation as any).transit || 'Multiple transportation options available'}</p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-pittsburgh-black mb-4">Interactive Neighborhood Map</h3>
            <p className="text-gray-600 mb-6">Find restaurants, shops, events, and attractions all in one place.</p>
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-4xl mx-auto">
              <NeighborhoodMap interactive={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Local Businesses CTA */}
      <section className="py-16 bg-gradient-to-r from-pittsburgh-black to-steel-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Local Businesses in {neighborhood.name}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Find the best restaurants, shops, and services that make {neighborhood.name} special.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/restaurants?neighborhood=${encodeURIComponent(neighborhood.name)}`}
              className="bg-pittsburgh-gold text-pittsburgh-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Browse Restaurants
            </Link>
            <Link
              href={`/services?category=all&neighborhood=${encodeURIComponent(neighborhood.name)}`}
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              Find Services
            </Link>
            <Link
              href={`/deals?location=${encodeURIComponent(neighborhood.name)}`}
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pittsburgh-black transition-colors"
            >
              View Local Deals
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function generateStaticParams() {
  // Get all neighborhoods from new comprehensive data
  const allNeighborhoods = getAllNeighborhoods()
  
  // Also include legacy neighborhoods
  const legacyIds = Object.keys(neighborhoodData)
  
  // Combine and deduplicate
  const allIds = new Set([
    ...allNeighborhoods.map(n => n.slug),
    ...legacyIds
  ])
  
  return Array.from(allIds).map((id) => ({
    id,
  }))
}
