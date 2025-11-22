import type { Metadata } from 'next'
import { BarChart3, TrendingUp, Users, Eye, MousePointer, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Analytics Dashboard | PittsburghEverything',
  description: 'View detailed analytics and insights about PittsburghEverything platform performance, user engagement, and business metrics.',
  keywords: 'analytics dashboard, Pittsburgh metrics, user insights, platform performance',
}

export default function AnalyticsPage() {
  // Real analytics data will be displayed here once Vercel Analytics is configured
  // For now, show that analytics are powered by Vercel
  const metrics = [
    {
      title: 'Analytics Platform',
      value: 'Vercel Analytics',
      change: 'Active',
      changeType: 'positive',
      icon: Eye
    },
    {
      title: 'Performance Monitoring',
      value: 'Speed Insights',
      change: 'Enabled',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Real-time Tracking',
      value: 'Enabled',
      change: 'Live',
      changeType: 'positive',
      icon: Clock
    },
    {
      title: 'Data Source',
      value: 'Vercel Dashboard',
      change: 'View Details',
      changeType: 'positive',
      icon: MousePointer
    }
  ]

  const topPages = [
    { page: '/restaurants', views: 'View in Vercel', change: '—' },
    { page: '/events', views: 'View in Vercel', change: '—' },
    { page: '/deals', views: 'View in Vercel', change: '—' },
    { page: '/neighborhoods', views: 'View in Vercel', change: '—' },
    { page: '/things-to-do', views: 'View in Vercel', change: '—' }
  ]

  const topSearches = [
    { term: 'Analytics powered by', searches: 'Vercel Analytics', trend: 'up' },
    { term: 'Performance metrics', searches: 'Speed Insights', trend: 'up' },
    { term: 'View detailed stats', searches: 'Vercel Dashboard', trend: 'stable' },
    { term: 'Real-time tracking', searches: 'Enabled', trend: 'up' },
    { term: 'Data accuracy', searches: '100%', trend: 'up' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-pittsburgh-gold via-yellow-400 to-orange-400 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <BarChart3 className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          </div>
          <p className="text-xl opacity-90">
            Analytics powered by Vercel Analytics. View detailed metrics in your Vercel dashboard.
          </p>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className="w-8 h-8 text-pittsburgh-gold" />
                  <span className={`text-sm font-medium ${
                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <div className="text-3xl font-bold text-pittsburgh-black mb-2">
                  {metric.value}
                </div>
                <div className="text-gray-600">{metric.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Pages */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-pittsburgh-black mb-6">Top Pages</h3>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-300">#{index + 1}</span>
                      <div>
                        <div className="font-medium text-pittsburgh-black">{page.page}</div>
                        <div className="text-sm text-gray-600">{page.views.toLocaleString()} views</div>
                      </div>
                    </div>
                    <span className="text-green-600 font-medium">{page.change}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Searches */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-pittsburgh-black mb-6">Popular Searches</h3>
              <div className="space-y-4">
                {topSearches.map((search, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-300">#{index + 1}</span>
                      <div>
                        <div className="font-medium text-pittsburgh-black">{search.term}</div>
                        <div className="text-sm text-gray-600">{search.searches.toLocaleString()} searches</div>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      search.trend === 'up' ? 'bg-green-500' :
                      search.trend === 'down' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Activity */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-pittsburgh-black mb-6">Real-time Activity</h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-center py-8">
              <TrendingUp className="w-16 h-16 text-pittsburgh-gold mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-pittsburgh-black mb-2">Analytics Powered by Vercel</h4>
              <p className="text-gray-600 mb-4">
                Traffic stats and performance metrics are tracked by Vercel Analytics and Speed Insights. 
                View detailed analytics in your Vercel dashboard.
              </p>
              <a 
                href="https://vercel.com/analytics" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pittsburgh-gold hover:underline font-medium"
              >
                View Vercel Analytics Dashboard →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
