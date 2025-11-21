import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MapPin, Users, TrendingUp, Home, Star, DollarSign, Clock, Car, Bike, Heart } from 'lucide-react'
import Link from 'next/link'

interface NeighborhoodPageProps {
  params: {
    id: string
  }
}

const neighborhoodData = {
  'downtown': {
    name: 'Downtown Pittsburgh',
    description: 'The vibrant heart of Pittsburgh with skyscrapers, cultural attractions, and urban energy. Home to major corporations, museums, and entertainment venues.',
    population: 5000,
    walkScore: 95,
    medianIncome: 75000,
    attractions: [
      { name: 'Point State Park', type: 'Park', description: 'Historic park at the confluence of Pittsburgh\'s three rivers' },
      { name: 'Duquesne Incline', type: 'Attraction', description: 'Historic cable car ride with panoramic views' },
      { name: 'PPG Paints Arena', type: 'Sports', description: 'Home of the Pittsburgh Penguins' },
      { name: 'Carnegie Museum of Art', type: 'Museum', description: 'World-class art collection' },
      { name: 'Heinz Hall', type: 'Theater', description: 'Home of the Pittsburgh Symphony Orchestra' }
    ],
    dining: [
      { category: 'Fine Dining', spots: ['The Capital Grille', 'Nine on Nine', 'Alma at The Mansion'] },
      { category: 'Casual', spots: ['Primanti Bros.', 'The Original Fish Market', 'Piper\'s Pub'] },
      { category: 'Coffee Shops', spots: ['Starbucks Reserve Roastery', 'Crazy Mocha', 'Press Coffee'] }
    ],
    transportation: {
      public: ['Port Authority buses', 'Light Rail (T)', 'Uber/Lyft'],
      parking: 'Multiple downtown parking garages with hourly rates',
      highways: ['I-279', 'I-376', 'US-19']
    },
    realEstate: {
      medianHomePrice: 350000,
      walkScore: 95,
      transitScore: 85,
      bikeScore: 70
    },
    demographics: {
      medianAge: 32,
      medianIncome: 75000,
      educationLevel: 'Bachelor\'s Degree'
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
    description: 'Artsy neighborhood known for its galleries, boutiques, historic architecture, and vibrant arts scene.',
    population: 8000,
    walkScore: 85,
    medianIncome: 55000,
    attractions: [
      { name: 'Lawrenceville Arts & Entertainment District', type: 'Arts', description: 'Monthly arts events and gallery openings' },
      { name: 'Pittsburgh Glass Center', type: 'Arts', description: 'Glass blowing and art classes' },
      { name: 'Murry Avenue', type: 'Shopping', description: 'Unique boutiques and specialty shops' },
      { name: 'Row House Cinema', type: 'Theater', description: 'Independent movie theater' },
      { name: 'Artery', type: 'Arts', description: 'Artist studios and creative spaces' }
    ],
    dining: [
      { category: 'Craft Beer', spots: ['Church Brew Works', 'Fat Head\'s Saloon', 'Roundabout Brewery'] },
      { category: 'Casual Dining', spots: ['Alewife', 'Spork', 'Taco Mamacita'] },
      { category: 'Bakeries', spots: ['Dozen Bakery', 'La Gourmandine', 'Buttercream Bakeshop'] }
    ],
    transportation: {
      public: ['Port Authority buses', 'Bike trails', 'Uber/Lyft'],
      parking: 'Street parking (free on Sundays)',
      highways: ['I-279', 'US-19']
    },
    realEstate: {
      medianHomePrice: 320000,
      walkScore: 85,
      transitScore: 65,
      bikeScore: 75
    },
    demographics: {
      medianAge: 35,
      medianIncome: 55000,
      educationLevel: 'Bachelor\'s Degree'
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
    description: 'Upscale neighborhood known for high-end shopping, fine dining, and proximity to Chatham University.',
    population: 15000,
    walkScore: 78,
    medianIncome: 85000,
    attractions: [
      { name: 'Walnut Street Shopping', type: 'Shopping', description: 'Upscale boutiques and specialty stores' },
      { name: 'Rodef Shalom Congregation', type: 'Historic', description: 'Historic synagogue and cultural center' },
      { name: 'Frick Park', type: 'Park', description: 'Large urban park with trails and recreation' },
      { name: 'Chatham University', type: 'Education', description: 'Liberal arts university' },
      { name: 'The Andy Warhol Museum', type: 'Museum', description: 'Museum dedicated to Andy Warhol\'s life and work' }
    ],
    dining: [
      { category: 'Fine Dining', spots: ['Casbah', 'Sushi Kim', 'Alma at The Mansion'] },
      { category: 'Casual', spots: ['Piada', 'Mediterra', 'The Porch at Schenley'] },
      { category: 'Coffee & Desserts', spots: ['Crazy Mocha', 'Dozen Bakery', 'Bistro To Go'] }
    ],
    transportation: {
      public: ['Port Authority buses', 'Bike lanes', 'Uber/Lyft'],
      parking: 'Street parking and private lots',
      highways: ['I-376', 'US-19']
    },
    realEstate: {
      medianHomePrice: 450000,
      walkScore: 78,
      transitScore: 55,
      bikeScore: 72
    },
    demographics: {
      medianAge: 38,
      medianIncome: 85000,
      educationLevel: 'Graduate Degree'
    }
  },
  'strip-district': {
    name: 'Strip District',
    description: 'Historic warehouse district transformed into a food and shopping destination with specialty markets and ethnic groceries.',
    population: 800,
    walkScore: 90,
    medianIncome: 70000,
    attractions: [
      { name: 'Whole Foods Market', type: 'Grocery', description: 'Organic and specialty foods' },
      { name: 'Penn Avenue Fish Company', type: 'Market', description: 'Fresh seafood market' },
      { name: 'Local craft breweries', type: 'Brewery', description: 'Tour and taste local beers' },
      { name: 'Pittsburgh Public Market', type: 'Market', description: 'Farmers market and specialty vendors' },
      { name: 'Randyland', type: 'Art', description: 'Colorful outsider art installation' }
    ],
    dining: [
      { category: 'Food Hall', spots: ['Strip District Food Hall', 'Market Square', 'Penn Avenue'] },
      { category: 'Ethnic Cuisine', spots: ['Thai Place', 'Gaucho Parrilla Argentina', 'Umami'] },
      { category: 'Bakeries', spots: ['Prantl\'s Bakery', 'Dozen Bakery', 'La Roche Bakery'] }
    ],
    transportation: {
      public: ['Port Authority buses', 'Bike racks', 'Walkable district'],
      parking: 'Street parking and nearby garages',
      highways: ['I-279', 'US-19']
    },
    realEstate: {
      medianHomePrice: 380000,
      walkScore: 90,
      transitScore: 60,
      bikeScore: 80
    },
    demographics: {
      medianAge: 36,
      medianIncome: 70000,
      educationLevel: 'Bachelor\'s Degree'
    }
  }
}

export async function generateMetadata({ params }: NeighborhoodPageProps): Promise<Metadata> {
  const neighborhood = neighborhoodData[params.id as keyof typeof neighborhoodData]

  if (!neighborhood) {
    return {
      title: 'Neighborhood Not Found | PittsburghEverything'
    }
  }

  return {
    title: `${neighborhood.name} | Pittsburgh Neighborhood Guide | PittsburghEverything`,
    description: `Explore ${neighborhood.name} - ${neighborhood.description}. Find restaurants, attractions, transportation, and real estate information.`,
    keywords: `${neighborhood.name}, Pittsburgh neighborhood, ${neighborhood.name} restaurants, ${neighborhood.name} attractions`,
    openGraph: {
      title: `${neighborhood.name} | Pittsburgh Neighborhood Guide`,
      description: neighborhood.description,
      images: [
        {
          url: `/images/neighborhoods/${params.id}.svg`,
          width: 1200,
          height: 630,
          alt: neighborhood.name,
        },
      ],
    },
  }
}

export default function NeighborhoodPage({ params }: NeighborhoodPageProps) {
  const neighborhood = neighborhoodData[params.id as keyof typeof neighborhoodData]

  if (!neighborhood) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {neighborhood.dining.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-pittsburgh-black mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.spots.map((spot, spotIndex) => (
                    <li key={spotIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pittsburgh-gold rounded-full"></div>
                      <span className="text-gray-700">{spot}</span>
                    </li>
                  ))}
                </ul>
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
  return Object.keys(neighborhoodData).map((id) => ({
    id,
  }))
}
