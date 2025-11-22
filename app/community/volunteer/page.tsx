import { Metadata } from 'next'
import VolunteerClient from './VolunteerClient'

export const metadata: Metadata = {
  title: 'Volunteer Opportunities | Pittsburgh Community | PittsburghEverything.com',
  description: 'Find volunteer opportunities and give back to the Pittsburgh community. Make a difference in your neighborhood.',
  keywords: 'Pittsburgh volunteer, volunteer opportunities, community service, Pittsburgh',
  openGraph: {
    title: 'Volunteer Opportunities - PittsburghEverything',
    description: 'Find volunteer opportunities and give back to the Pittsburgh community.',
    type: 'website'
  }
}

export default function VolunteerPage() {
  return <VolunteerClient />
}

