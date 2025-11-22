import type { Metadata } from 'next'
import Link from 'next/link'
import NeighborhoodMap from '@/components/NeighborhoodMap'
import NeighborhoodsClient from './NeighborhoodsClient'
import { getAllNeighborhoods } from '@/data/pittsburghNeighborhoods'

export const metadata: Metadata = {
  title: 'Pittsburgh Neighborhoods Guide | PittsburghEverything',
  description: 'Explore Pittsburgh neighborhoods. Find the perfect area to live, work, or visit with our comprehensive neighborhood guide.',
  keywords: 'Pittsburgh neighborhoods, Oakland, South Side, Shadyside, Lawrenceville, Strip District',
}

export default function NeighborhoodsPage() {
  const allNeighborhoods = getAllNeighborhoods()
  const totalPopulation = allNeighborhoods.reduce((sum, n) => sum + n.population, 0)
  const avgWalkScore = Math.round(allNeighborhoods.reduce((sum, n) => sum + n.walkScore, 0) / allNeighborhoods.length)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-4">Pittsburgh Neighborhoods</h1>
        <p className="text-xl text-steel-gray max-w-2xl mx-auto">
          Discover what makes each Pittsburgh neighborhood unique. From historic districts to vibrant arts scenes. Explore all neighborhoods within 40 miles of downtown Pittsburgh.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-black text-pittsburgh-gold mb-2">{allNeighborhoods.length}+</div>
            <div className="text-steel-gray">Neighborhoods Covered</div>
          </div>
          <div>
            <div className="text-3xl font-black text-pittsburgh-gold mb-2">{totalPopulation.toLocaleString()}+</div>
            <div className="text-steel-gray">Total Residents</div>
          </div>
          <div>
            <div className="text-3xl font-black text-pittsburgh-gold mb-2">{avgWalkScore}</div>
            <div className="text-steel-gray">Average Walk Score</div>
          </div>
        </div>
      </div>

      <NeighborhoodMap />

      <NeighborhoodsClient />

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
