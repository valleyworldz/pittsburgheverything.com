import { Metadata } from 'next'
import AIGuideClient from './AIGuideClient'

export const metadata: Metadata = {
  title: 'AI Pittsburgh Guide | Ask Anything About Pittsburgh | PittsburghEverything.com',
  description: 'Get instant, personalized answers about Pittsburgh restaurants, events, neighborhoods, housing, jobs, and more. Powered by AI with real-time data.',
  keywords: 'AI guide, Pittsburgh recommendations, Pittsburgh chatbot, local guide, Pittsburgh assistant',
  openGraph: {
    title: 'AI Pittsburgh Guide',
    description: 'Get instant, personalized answers about Pittsburgh restaurants, events, neighborhoods, and more.',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function AIGuidePage() {
  return <AIGuideClient />
}
