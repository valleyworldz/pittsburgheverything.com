import { Metadata } from 'next'
import ParksClient from './ParksClient'

export const metadata: Metadata = {
  title: 'Parks & Playgrounds in Pittsburgh | PittsburghEverything.com',
  description: 'Discover beautiful parks, playgrounds, and outdoor spaces perfect for family fun. From playgrounds to nature trails, find your next adventure.',
  keywords: 'parks, playgrounds, Pittsburgh, outdoor, family, nature, trails',
  openGraph: {
    title: 'Parks & Playgrounds in Pittsburgh',
    description: 'Discover beautiful parks, playgrounds, and outdoor spaces perfect for family fun.',
    type: 'website'
  }
}

export default function ParksPage() {
  return <ParksClient />
}

