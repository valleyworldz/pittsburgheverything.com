export default function APIsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">API Integrations</h1>
        <p className="text-xl text-muted-foreground">
          PittsburghEverything.com integrates with 23 free APIs to provide real-time data
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Weather & Environment</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Real-time weather forecasts and air quality data
          </p>
          <div className="text-2xl font-bold text-green-600">1 API</div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Sports & Entertainment</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Live scores for Steelers, Penguins, and Pirates
          </p>
          <div className="text-2xl font-bold text-blue-600">3 APIs</div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Transportation</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Real-time transit and mobility data
          </p>
          <div className="text-2xl font-bold text-purple-600">4 APIs</div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Government & Data</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Public records and civic information
          </p>
          <div className="text-2xl font-bold text-orange-600">4 APIs</div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Health & Education</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Health statistics and educational resources
          </p>
          <div className="text-2xl font-bold text-red-600">1 API</div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Business & Economy</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Economic indicators and business data
          </p>
          <div className="text-2xl font-bold text-indigo-600">3 APIs</div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Culture & Recreation</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Museums, parks, and cultural institutions
          </p>
          <div className="text-2xl font-bold text-pink-600">5 APIs</div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Utilities & Tools</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Development tools and utility services
          </p>
          <div className="text-2xl font-bold text-gray-600">3 APIs</div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">All Free APIs</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Every API integration is completely free with no subscription costs
          </p>
          <div className="flex justify-center items-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">23</div>
              <div className="text-sm text-muted-foreground">Free APIs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">$0</div>
              <div className="text-sm text-muted-foreground">Monthly Cost</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">∞</div>
              <div className="text-sm text-muted-foreground">Free Tier</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
