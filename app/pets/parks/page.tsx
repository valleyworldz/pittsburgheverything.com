import { Metadata } from 'next'
import DogParksClient from './DogParksClient'

export const metadata: Metadata = {
  title: 'Dog Parks in Pittsburgh | PittsburghEverything.com',
  description: 'Find the perfect off-leash dog park for your furry friend. Discover fenced areas, amenities, and rules for safe play.',
  keywords: 'dog parks, Pittsburgh, off-leash, dogs, pet-friendly, parks',
  openGraph: {
    title: 'Dog Parks in Pittsburgh',
    description: 'Find the perfect off-leash dog park for your furry friend.',
    type: 'website'
  }
}

export default function DogParksPage() {
  return <DogParksClient />
}

