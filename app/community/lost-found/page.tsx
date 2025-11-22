import { Metadata } from 'next'
import LostFoundClient from './LostFoundClient'

export const metadata: Metadata = {
  title: 'Lost & Found | Pittsburgh Community | PittsburghEverything.com',
  description: 'Report lost items or help reunite found items with their owners. Together we can help recover what\'s lost in Pittsburgh.',
  keywords: 'Pittsburgh lost found, lost items, found items, community help, Pittsburgh',
  openGraph: {
    title: 'Lost & Found - PittsburghEverything',
    description: 'Report lost items or help reunite found items with their owners.',
    type: 'website'
  }
}

export default function LostFoundPage() {
  return <LostFoundClient />
}

