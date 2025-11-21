import type { Metadata } from 'next'
import Link from 'next/link'
import NeighborhoodMap from '@/components/NeighborhoodMap'

export const metadata: Metadata = {
  title: 'Pittsburgh Neighborhoods Guide | PittsburghEverything',
  description: 'Explore Pittsburgh neighborhoods. Find the perfect area to live, work, or visit with our comprehensive neighborhood guide.',
  keywords: 'Pittsburgh neighborhoods, Oakland, South Side, Shadyside, Lawrenceville, Strip District',
}

export default function NeighborhoodsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-4">Pittsburgh Neighborhoods</h1>
        <p className="text-xl text-steel-gray max-w-2xl mx-auto">
          Discover what makes each Pittsburgh neighborhood unique. From historic districts to vibrant arts scenes.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-black text-pittsburgh-gold mb-2">90</div>
            <div className="text-steel-gray">Neighborhoods Covered</div>
          </div>
          <div>
            <div className="text-3xl font-black text-pittsburgh-gold mb-2">300K+</div>
            <div className="text-steel-gray">Pittsburgh Residents</div>
          </div>
          <div>
            <div className="text-3xl font-black text-pittsburgh-gold mb-2">95%</div>
            <div className="text-steel-gray">Average Walk Score</div>
          </div>
        </div>
      </div>

      <NeighborhoodMap />

      <div className="bg-gradient-to-r from-pittsburgh-gold/10 to-steel-gray/10 rounded-xl p-8">
        <div className="text-center">
          <h2 className="text-2xl font-black mb-4">Planning to Move to Pittsburgh?</h2>
          <p className="mb-6 text-steel-gray max-w-2xl mx-auto">
            Get personalized neighborhood recommendations based on your lifestyle, budget, and preferences.
          </p>
          <Link href="/neighborhoods/quiz" className="btn-primary">
            Find My Perfect Neighborhood
          </Link>
        </div>
      </div>
    </div>
  )
}
