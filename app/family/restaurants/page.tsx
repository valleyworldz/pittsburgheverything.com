import { Metadata } from 'next'
import RestaurantsClient from './RestaurantsClient'

export const metadata: Metadata = {
  title: 'Family Restaurants in Pittsburgh | PittsburghEverything.com',
  description: 'Find kid-friendly restaurants with high chairs, kids menus, and family-friendly atmospheres. Perfect for dining out with the whole family.',
  keywords: 'family restaurants, kid-friendly, Pittsburgh, dining, high chairs, kids menu',
  openGraph: {
    title: 'Family Restaurants in Pittsburgh',
    description: 'Find kid-friendly restaurants with high chairs, kids menus, and family-friendly atmospheres.',
    type: 'website'
  }
}

export default function RestaurantsPage() {
  return <RestaurantsClient />
}

