import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Calendar, MapPin, Clock, Star, Heart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface CategoryPageProps {
  params: {
    category: string
  }
}

const categoryData = {
  'cultural-museums': {
    title: 'Cultural & Museums',
    icon: '🏛️',
    description: 'Explore Pittsburgh\'s world-class museums, galleries, and cultural institutions',
    activities: [
      {
        name: 'Carnegie Museum of Art',
        description: 'One of the oldest art museums in the US with extensive collections',
        image: '/images/placeholder-event.svg',
        rating: 4.7,
        price: '$15',
        duration: '2-3 hours',
        location: 'Oakland',
        highlights: ['American art', 'European masterpieces', 'Contemporary exhibits'],
        category: 'Museum'
      },
      {
        name: 'Andy Warhol Museum',
        description: 'Dedicated to the life and work of Pittsburgh\'s famous pop artist',
        image: '/images/placeholder-event.svg',
        rating: 4.6,
        price: '$20',
        duration: '1-2 hours',
        location: 'North Shore',
        highlights: ['Warhol\'s art', 'Interactive exhibits', 'Film screenings'],
        category: 'Museum'
      },
      {
        name: 'Carnegie Museum of Natural History',
        description: 'Dinosaurs, gems, and ancient artifacts from around the world',
        image: '/images/placeholder-event.svg',
        rating: 4.8,
        price: '$15',
        duration: '2-4 hours',
        location: 'Oakland',
        highlights: ['Dinosaur fossils', 'Gem collection', 'Planetarium'],
        category: 'Museum'
      },
      {
        name: 'Heinz History Center',
        description: 'Interactive exhibits on Pittsburgh and regional history',
        image: '/images/placeholder-event.svg',
        rating: 4.5,
        price: '$18',
        duration: '2-3 hours',
        location: 'Strip District',
        highlights: ['Local history', 'Interactive exhibits', 'Sports Hall of Fame'],
        category: 'History'
      },
      {
        name: 'Mattress Factory',
        description: 'Contemporary art installations in a renovated warehouse',
        image: '/images/placeholder-event.svg',
        rating: 4.4,
        price: '$10',
        duration: '1-2 hours',
        location: 'North Side',
        highlights: ['Contemporary art', 'Site-specific installations', 'Artist residencies'],
        category: 'Contemporary Art'
      },
      {
        name: 'Pittsburgh Glass Center',
        description: 'Glass blowing demonstrations and art classes',
        image: '/images/placeholder-event.svg',
        rating: 4.6,
        price: '$12',
        duration: '1 hour',
        location: 'Lawrenceville',
        highlights: ['Glass blowing', 'Art classes', 'Live demonstrations'],
        category: 'Arts & Crafts'
      }
    ]
  },
  'outdoor-nature': {
    title: 'Outdoor & Nature',
    icon: '🌳',
    description: 'Experience Pittsburgh\'s beautiful parks, trails, and natural attractions',
    activities: [
      {
        name: 'Phipps Conservatory',
        description: 'Victorian glasshouse with seasonal exhibits and butterfly garden',
        image: '/images/placeholder-event.svg',
        rating: 4.9,
        price: '$14.95',
        duration: '1-2 hours',
        location: 'Oakland',
        highlights: ['Tropical plants', 'Seasonal exhibits', 'Butterfly garden'],
        category: 'Botanical Garden'
      },
      {
        name: 'Schenley Park',
        description: 'Large urban park with trails, golf, and Flagstaff Hill overlook',
        image: '/images/placeholder-event.svg',
        rating: 4.7,
        price: 'Free',
        duration: '1-4 hours',
        location: 'Schenley Park',
        highlights: ['Hiking trails', 'Panoramic views', 'Recreation facilities'],
        category: 'Urban Park'
      },
      {
        name: 'Frick Park',
        description: 'Pittsburgh\'s largest city park with meadows, streams, and trails',
        image: '/images/placeholder-event.svg',
        rating: 4.8,
        price: 'Free',
        duration: '1-3 hours',
        location: 'Squirrel Hill',
        highlights: ['Wildflower meadows', 'Clayton Henry Trail', 'Dog park'],
        category: 'City Park'
      },
      {
        name: 'Point State Park',
        description: 'Historic park at the confluence of Pittsburgh\'s three rivers',
        image: '/images/placeholder-event.svg',
        rating: 4.6,
        price: 'Free',
        duration: '1-2 hours',
        location: 'Downtown',
        highlights: ['Fountain displays', 'River views', 'Historic significance'],
        category: 'Historic Park'
      },
      {
        name: 'Highland Park',
        description: 'Reservoir park with walking paths and picnic areas',
        image: '/images/placeholder-event.svg',
        rating: 4.5,
        price: 'Free',
        duration: '1-2 hours',
        location: 'East Liberty',
        highlights: ['Reservoir views', 'Walking paths', 'Picnic areas'],
        category: 'Reservoir Park'
      },
      {
        name: 'Riverview Park',
        description: 'Scenic park along the Ohio River with river views',
        image: '/images/placeholder-event.svg',
        rating: 4.4,
        price: 'Free',
        duration: '30-60 minutes',
        location: 'Millvale',
        highlights: ['River views', 'Walking trails', 'Picnic spots'],
        category: 'River Park'
      }
    ]
  },
  'sports-entertainment': {
    title: 'Sports & Entertainment',
    icon: '⚽',
    description: 'Catch a game, enjoy live music, or experience Pittsburgh\'s entertainment scene',
    activities: [
      {
        name: 'Pittsburgh Steelers Game',
        description: 'Watch the legendary Steelers at Acrisure Stadium',
        image: '/images/events/steelers-game.svg',
        rating: 4.9,
        price: '$50+',
        duration: '3+ hours',
        location: 'Acrisure Stadium',
        highlights: ['NFL football', 'Tailgating', 'Game day atmosphere'],
        category: 'Professional Sports'
      },
      {
        name: 'Pittsburgh Penguins Game',
        description: 'Cheer for the Penguins at PPG Paints Arena',
        image: '/images/placeholder-event.svg',
        rating: 4.8,
        price: '$30+',
        duration: '3 hours',
        location: 'PPG Paints Arena',
        highlights: ['NHL hockey', 'Stanley Cup winners', 'Arena entertainment'],
        category: 'Professional Sports'
      },
      {
        name: 'Stage AE Outdoor Amphitheater',
        description: 'Outdoor concert venue on Pittsburgh\'s North Shore',
        image: '/images/placeholder-event.svg',
        rating: 4.7,
        price: 'Varies',
        duration: '2-3 hours',
        location: 'North Shore',
        highlights: ['Outdoor concerts', 'River views', 'Major artists'],
        category: 'Live Music'
      },
      {
        name: 'Mr. Smalls Theatre',
        description: 'Intimate comedy club and performance venue',
        image: '/images/placeholder-event.svg',
        rating: 4.6,
        price: '$15-25',
        duration: '1-2 hours',
        location: 'Millvale',
        highlights: ['Stand-up comedy', 'Live performances', 'Intimate setting'],
        category: 'Comedy & Theater'
      },
      {
        name: 'Heinz Hall',
        description: 'Home of the Pittsburgh Symphony Orchestra',
        image: '/images/placeholder-event.svg',
        rating: 4.8,
        price: '$25+',
        duration: '2 hours',
        location: 'Downtown',
        highlights: ['Classical music', 'World-class orchestra', 'Elegant venue'],
        category: 'Performing Arts'
      },
      {
        name: 'Benedum Center',
        description: 'Historic theater for Broadway shows and performances',
        image: '/images/placeholder-event.svg',
        rating: 4.7,
        price: '$40+',
        duration: '2-3 hours',
        location: 'Cultural District',
        highlights: ['Broadway shows', 'Historic theater', 'Cultural performances'],
        category: 'Theater'
      }
    ]
  },
  'food-drink': {
    title: 'Food & Drink',
    icon: '🍽️',
    description: 'Explore Pittsburgh\'s culinary scene from iconic sandwiches to craft breweries',
    activities: [
      {
        name: 'Primanti Bros. Sandwich Tour',
        description: 'Experience the iconic Pittsburgh sandwich with fries and coleslaw',
        image: '/images/restaurants/primanti-bros.svg',
        rating: 4.8,
        price: '$12-15',
        duration: '30-45 minutes',
        location: 'Multiple locations',
        highlights: ['Iconic sandwich', 'Fries in sandwich', 'Local tradition'],
        category: 'Local Cuisine'
      },
      {
        name: 'Strip District Food Tour',
        description: 'Explore the historic Strip District\'s food vendors and markets',
        image: '/images/placeholder-event.svg',
        rating: 4.7,
        price: '$20-30',
        duration: '2-3 hours',
        location: 'Strip District',
        highlights: ['Specialty foods', 'Ethnic markets', 'Food vendors'],
        category: 'Food Tour'
      },
      {
        name: 'Brewery Tours',
        description: 'Visit Pittsburgh\'s craft breweries and local beer scene',
        image: '/images/placeholder-event.svg',
        rating: 4.6,
        price: '$15-25',
        duration: '1-2 hours',
        location: 'Various locations',
        highlights: ['Craft beer', 'Brewery tours', 'Beer tasting'],
        category: 'Brewery Tour'
      },
      {
        name: 'Farmers Markets',
        description: 'Fresh local produce and artisanal goods at city farmers markets',
        image: '/images/placeholder-event.svg',
        rating: 4.5,
        price: 'Free entry',
        duration: '1-2 hours',
        location: 'Various locations',
        highlights: ['Fresh produce', 'Local vendors', 'Artisanal goods'],
        category: 'Farmers Market'
      },
      {
        name: 'Restaurant Week',
        description: 'Special multi-course menus at participating restaurants',
        image: '/images/events/food-festival.svg',
        rating: 4.9,
        price: '$25-35',
        duration: '2 hours',
        location: 'Various restaurants',
        highlights: ['Chef specials', 'Affordable dining', 'Restaurant variety'],
        category: 'Special Event'
      },
      {
        name: 'Coffee Shop Hopping',
        description: 'Explore Pittsburgh\'s specialty coffee and local roasteries',
        image: '/images/placeholder-event.svg',
        rating: 4.4,
        price: '$3-6',
        duration: '1-2 hours',
        location: 'Various neighborhoods',
        highlights: ['Specialty coffee', 'Local roasteries', 'Coffee culture'],
        category: 'Coffee Culture'
      }
    ]
  },
  'shopping-retail': {
    title: 'Shopping & Retail',
    icon: '🛍️',
    description: 'From boutique shopping to historic markets, explore Pittsburgh\'s retail scene',
    activities: [
      {
        name: 'Station Square',
        description: 'Shopping, dining, and entertainment complex',
        image: '/images/placeholder-event.svg',
        rating: 4.6,
        price: 'Free',
        duration: '2-4 hours',
        location: 'South Side',
        highlights: ['Shopping mall', 'Riverboat rides', 'Entertainment'],
        category: 'Shopping Center'
      },
      {
        name: 'The Mall at Robinson',
        description: 'Major shopping mall with department stores and boutiques',
        image: '/images/placeholder-event.svg',
        rating: 4.4,
        price: 'Free',
        duration: '2-3 hours',
        location: 'Robinson Township',
        highlights: ['Department stores', 'Fashion boutiques', 'Dining options'],
        category: 'Shopping Mall'
      },
      {
        name: 'SouthSide Works',
        description: 'Canal Place shopping with unique stores and restaurants',
        image: '/images/placeholder-event.svg',
        rating: 4.5,
        price: 'Free',
        duration: '2-3 hours',
        location: 'South Side',
        highlights: ['Unique boutiques', 'Local shops', 'Entertainment venues'],
        category: 'Lifestyle Center'
      },
      {
        name: 'Strip District Shopping',
        description: 'Historic warehouse district with specialty shops',
        image: '/images/placeholder-event.svg',
        rating: 4.7,
        price: 'Free',
        duration: '1-2 hours',
        location: 'Strip District',
        highlights: ['Specialty foods', 'Antiques', 'Unique finds'],
        category: 'Historic District'
      },
      {
        name: 'Walnut Street',
        description: 'Upscale shopping district in Shadyside',
        image: '/images/placeholder-event.svg',
        rating: 4.6,
        price: 'Free',
        duration: '2-3 hours',
        location: 'Shadyside',
        highlights: ['High-end boutiques', 'Designer stores', 'Fine dining'],
        category: 'Upscale Shopping'
      },
      {
        name: 'Lawrenceville Arts District',
        description: 'Art galleries, boutiques, and creative spaces',
        image: '/images/placeholder-event.svg',
        rating: 4.5,
        price: 'Free',
        duration: '2-3 hours',
        location: 'Lawrenceville',
        highlights: ['Art galleries', 'Unique boutiques', 'Creative spaces'],
        category: 'Arts & Culture'
      }
    ]
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = categoryData[params.category as keyof typeof categoryData]

  if (!category) {
    return {
      title: 'Activity Category Not Found | PittsburghEverything'
    }
  }

  return {
    title: `${category.title} in Pittsburgh | Things to Do | PittsburghEverything`,
    description: category.description,
    keywords: [`Pittsburgh ${category.title.toLowerCase()}`, 'Pittsburgh activities', 'things to do Pittsburgh'],
    openGraph: {
      title: `${category.title} in Pittsburgh`,
      description: category.description,
      images: [
        {
          url: '/images/og-image.svg',
          width: 1200,
          height: 630,
          alt: category.title,
        },
      ],
    },
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categoryData[params.category as keyof typeof categoryData]

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-pittsburgh-gold to-pittsburgh-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/things-to-do"
            className="inline-flex items-center gap-2 text-pittsburgh-gold hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Things to Do
          </Link>

          <div className="text-center">
            <div className="text-6xl mb-4">{category.icon}</div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              {category.title}
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.activities.map((activity, index) => (
              <div key={activity.name} className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={activity.image}
                    alt={activity.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/images/placeholder-event.svg'
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-pittsburgh-gold text-pittsburgh-black px-3 py-1 rounded-full text-sm font-semibold">
                    {activity.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-pittsburgh-black">
                    ⭐ {activity.rating}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-pittsburgh-black mb-2">
                    {activity.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {activity.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{activity.duration}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {activity.highlights.slice(0, 3).map((highlight) => (
                      <span
                        key={highlight}
                        className="bg-pittsburgh-gold/10 text-pittsburgh-gold px-2 py-1 rounded-full text-xs"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-pittsburgh-gold">
                      {activity.price}
                    </span>
                    <button
                      onClick={() => {
                        alert(`${category.icon} ${activity.name}\n\n📍 Location: ${activity.location}\n⏰ Duration: ${activity.duration}\n💰 Price: ${activity.price}\n⭐ Rating: ${activity.rating}/5\n🏷️ Category: ${activity.category}\n\n🎯 Highlights:\n${activity.highlights.map(h => `• ${h}`).join('\n')}\n\n📝 ${activity.description}`)
                      }}
                      className="bg-pittsburgh-gold text-pittsburgh-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-sm cursor-pointer"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittsburgh-black mb-4">
              Explore Other Categories
            </h2>
            <p className="text-gray-600">
              Discover more ways to experience Pittsburgh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(categoryData)
              .filter(([key]) => key !== params.category)
              .slice(0, 4)
              .map(([key, cat]) => (
                <Link
                  key={key}
                  href={`/things-to-do/${key}`}
                  className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow group"
                >
                  <div className="text-4xl mb-4">{cat.icon}</div>
                  <h3 className="text-lg font-bold text-pittsburgh-black group-hover:text-pittsburgh-gold transition-colors mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {cat.description}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(categoryData).map((category) => ({
    category,
  }))
}
