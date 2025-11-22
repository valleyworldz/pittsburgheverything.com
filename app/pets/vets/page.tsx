import { Metadata } from 'next'
import VetsGroomersClient from './VetsGroomersClient'

export const metadata: Metadata = {
  title: 'Vets & Groomers in Pittsburgh | PittsburghEverything.com',
  description: 'Find trusted veterinary clinics and professional grooming services for your pets. From routine care to emergency services.',
  keywords: 'veterinary, vets, groomers, Pittsburgh, pet care, emergency vet',
  openGraph: {
    title: 'Vets & Groomers in Pittsburgh',
    description: 'Find trusted veterinary clinics and professional grooming services for your pets.',
    type: 'website'
  }
}

export default function VetsGroomersPage() {
  return <VetsGroomersClient />
}

