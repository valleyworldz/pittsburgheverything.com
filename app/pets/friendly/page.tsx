import { Metadata } from 'next'
import PetFriendlySpotsClient from './PetFriendlySpotsClient'

export const metadata: Metadata = {
  title: 'Pet-Friendly Spots in Pittsburgh | PittsburghEverything.com',
  description: 'Discover restaurants, hotels, cafes, and businesses where your pets are welcome. Find the perfect spot to bring your furry friend.',
  keywords: 'pet-friendly, Pittsburgh, restaurants, hotels, cafes, dogs, pets',
  openGraph: {
    title: 'Pet-Friendly Spots in Pittsburgh',
    description: 'Discover restaurants, hotels, cafes, and businesses where your pets are welcome.',
    type: 'website'
  }
}

export default function PetFriendlySpotsPage() {
  return <PetFriendlySpotsClient />
}

