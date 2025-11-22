import { Metadata } from 'next'
import PhotosClient from './PhotosClient'

export const metadata: Metadata = {
  title: 'Pittsburgh Photos Gallery | PittsburghEverything.com',
  description: 'Explore stunning photos of Pittsburgh neighborhoods, events, skyline, food, and more. Discover the beauty of the Steel City through our curated photo gallery.',
  keywords: 'Pittsburgh photos, Pittsburgh gallery, Pittsburgh images, Steel City photos, Pittsburgh neighborhoods, Pittsburgh skyline',
  openGraph: {
    title: 'Pittsburgh Photos Gallery',
    description: 'Explore stunning photos of Pittsburgh neighborhoods, events, skyline, food, and more.',
    type: 'website'
  }
}

export default function PhotosPage() {
  return <PhotosClient />
}

