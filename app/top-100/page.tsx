'use client'

import Top100Table from '@/components/Top100Table'

export default function Top100Page() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-4">Pittsburgh's Top 100</h1>
        <p className="text-xl text-steel-gray max-w-2xl mx-auto">
          The definitive ranking of Pittsburgh's absolute best. From iconic restaurants to hidden gems.
        </p>
      </div>

      <div className="bg-gradient-to-r from-pittsburgh-gold to-yellow-400 rounded-xl p-8 text-pittsburgh-black text-center">
        <h2 className="text-3xl font-black mb-4">🏆 The Ultimate Pittsburgh List</h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-black mb-1">100</div>
            <div className="text-sm">Carefully Selected</div>
          </div>
          <div>
            <div className="text-3xl font-black mb-1">50K+</div>
            <div className="text-sm">Community Reviews</div>
          </div>
          <div>
            <div className="text-3xl font-black mb-1">25</div>
            <div className="text-sm">Expert Contributors</div>
          </div>
          <div>
            <div className="text-3xl font-black mb-1">2024</div>
            <div className="text-sm">Latest Rankings</div>
          </div>
        </div>
      </div>

      <Top100Table />

      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="text-center">
          <h2 className="text-2xl font-black mb-4">How Rankings Work</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-6">
            <div className="text-center">
              <div className="bg-pittsburgh-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="font-bold mb-2">Community Reviews</h3>
              <p className="text-steel-gray text-sm">
                Real ratings and reviews from Pittsburgh residents and visitors
              </p>
            </div>
            <div className="text-center">
              <div className="bg-pittsburgh-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-bold mb-2">Expert Curation</h3>
              <p className="text-steel-gray text-sm">
                Local experts, food critics, and cultural influencers contribute
              </p>
            </div>
            <div className="text-center">
              <div className="bg-pittsburgh-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-bold mb-2">Data-Driven</h3>
              <p className="text-steel-gray text-sm">
                Visit frequency, social mentions, and quality metrics factored in
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
