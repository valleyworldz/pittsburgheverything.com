import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RestaurantDetail from '@/components/RestaurantDetail'
import type { Restaurant } from '@/types'

// This would typically come from a database or API
const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Primanti Bros.',
    description: 'Iconic Pittsburgh sandwich shop famous for putting fries and coleslaw inside their sandwiches. A must-try Pittsburgh experience.',
    cuisine: 'American',
    priceRange: '$$',
    rating: 4.5,
    address: '3803 Forbes Ave, Pittsburgh, PA 15213',
    phone: '(412) 621-4444',
    website: 'https://primantibros.com',
    neighborhood: 'Oakland',
    image: '/images/restaurants/primanti-bros.jpg',
    features: ['Sandwiches', 'Late Night', 'Iconic Pittsburgh', 'Casual'],
    hours: {
      monday: '24 hours',
      tuesday: '24 hours',
      wednesday: '24 hours',
      thursday: '24 hours',
      friday: '24 hours',
      saturday: '24 hours',
      sunday: '24 hours'
    }
  },
  {
    id: '2',
    name: 'The Porch at Schenley',
    description: 'Farm-to-table American cuisine in a beautiful historic building overlooking Schenley Park. Perfect for special occasions.',
    cuisine: 'American',
    priceRange: '$$$',
    rating: 4.7,
    address: '221 Schenley Dr, Pittsburgh, PA 15213',
    phone: '(412) 687-6724',
    website: 'https://theporchatschenley.com',
    neighborhood: 'Schenley Park',
    image: '/images/restaurants/the-porch.jpg',
    features: ['Farm-to-Table', 'Historic Building', 'Cocktails', 'Romantic'],
    hours: {
      monday: '5:00 PM - 10:00 PM',
      tuesday: '5:00 PM - 10:00 PM',
      wednesday: '5:00 PM - 10:00 PM',
      thursday: '5:00 PM - 10:00 PM',
      friday: '5:00 PM - 10:00 PM',
      saturday: '5:00 PM - 10:00 PM',
      sunday: '4:00 PM - 9:00 PM'
    }
  },
  {
    id: '3',
    name: 'Fat Head\'s Saloon',
    description: 'Craft beer and artisanal pizza in the heart of Pittsburgh. A favorite among locals and visitors alike.',
    cuisine: 'Pizza',
    priceRange: '$$',
    rating: 4.6,
    address: '1805 E Carson St, Pittsburgh, PA 15203',
    phone: '(412) 431-7433',
    website: 'https://fatheads.com',
    neighborhood: 'South Side',
    image: '/images/restaurants/fat-heads.jpg',
    features: ['Craft Beer', 'Pizza', 'Sports Bar', 'Late Night'],
    hours: {
      monday: '11:00 AM - 12:00 AM',
      tuesday: '11:00 AM - 12:00 AM',
      wednesday: '11:00 AM - 12:00 AM',
      thursday: '11:00 AM - 12:00 AM',
      friday: '11:00 AM - 1:00 AM',
      saturday: '11:00 AM - 1:00 AM',
      sunday: '11:00 AM - 12:00 AM'
    }
  }
]

interface RestaurantPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: RestaurantPageProps): Promise<Metadata> {
  const restaurant = mockRestaurants.find(r => r.id === params.id)

  if (!restaurant) {
    return {
      title: 'Restaurant Not Found | PittsburghEverything',
    }
  }

  return {
    title: `${restaurant.name} | Pittsburgh Restaurants | PittsburghEverything`,
    description: restaurant.description,
    keywords: [
      restaurant.name,
      restaurant.cuisine,
      'Pittsburgh restaurant',
      restaurant.neighborhood,
      'food',
      'dining'
    ].join(', '),
    openGraph: {
      title: `${restaurant.name} - ${restaurant.cuisine} Restaurant in ${restaurant.neighborhood}`,
      description: restaurant.description,
      images: restaurant.image ? [restaurant.image] : [],
    },
  }
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const restaurant = mockRestaurants.find(r => r.id === params.id)

  if (!restaurant) {
    notFound()
  }

  return <RestaurantDetail restaurant={restaurant} />
}
