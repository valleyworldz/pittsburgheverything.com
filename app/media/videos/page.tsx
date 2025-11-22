import { Metadata } from 'next'
import VideosClient from './VideosClient'

export const metadata: Metadata = {
  title: 'Pittsburgh Videos Gallery | PittsburghEverything.com',
  description: 'Watch videos showcasing Pittsburgh neighborhoods, events, food, culture, and more. Experience the Steel City through our curated video collection.',
  keywords: 'Pittsburgh videos, Pittsburgh video gallery, Pittsburgh YouTube, Steel City videos, Pittsburgh events videos',
  openGraph: {
    title: 'Pittsburgh Videos Gallery',
    description: 'Watch videos showcasing Pittsburgh neighborhoods, events, food, culture, and more.',
    type: 'website'
  }
}

export default function VideosPage() {
  return <VideosClient />
}

