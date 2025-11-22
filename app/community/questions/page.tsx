import { Metadata } from 'next'
import QuestionsClient from './QuestionsClient'

export const metadata: Metadata = {
  title: 'Community Questions | Ask & Answer | PittsburghEverything.com',
  description: 'Ask questions and get answers from the Pittsburgh community. Find local recommendations, advice, and knowledge.',
  keywords: 'Pittsburgh questions, community forum, ask locals, Q&A, Pittsburgh advice',
  openGraph: {
    title: 'Community Questions - PittsburghEverything',
    description: 'Ask questions and get answers from the Pittsburgh community.',
    type: 'website'
  }
}

export default function QuestionsPage() {
  return <QuestionsClient />
}

