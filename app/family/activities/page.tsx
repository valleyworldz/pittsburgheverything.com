import { Metadata } from 'next'
import ActivitiesClient from './ActivitiesClient'

export const metadata: Metadata = {
  title: 'Kids Activities in Pittsburgh | PittsburghEverything.com',
  description: 'Discover fun and educational activities for kids of all ages in Pittsburgh. From museums to parks, find the perfect family adventure.',
  keywords: 'kids activities, family fun, Pittsburgh, children, museums, parks, entertainment',
  openGraph: {
    title: 'Kids Activities in Pittsburgh',
    description: 'Discover fun and educational activities for kids of all ages in Pittsburgh.',
    type: 'website'
  }
}

export default function ActivitiesPage() {
  return <ActivitiesClient />
}

