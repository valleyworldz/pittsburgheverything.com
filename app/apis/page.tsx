'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Database, Zap, Globe, Heart, Briefcase, Palette, Wrench, RefreshCw } from 'lucide-react'
import APIDashboard from '@/components/APIDashboard'

const categoryIcons = {
  weather: Globe,
  sports: Zap,
  transit: Database,
  government: Database,
  health: Heart,
  business: Briefcase,
  culture: Palette,
  utilities: Wrench
}

const categoryDescriptions = {
  weather: 'Weather forecasts, air quality, and environmental data',
  sports: 'Live scores, schedules, and team information',
  transit: 'Public transportation and mobility data',
  government: 'Public records, demographics, and civic data',
  health: 'Health statistics and medical information',
  business: 'Economic indicators and business data',
  culture: 'Museums, historical data, and cultural resources',
  utilities: 'Development tools and utility APIs'
}

export default function APIsPage() {
  const [showDashboard, setShowDashboard] = useState(false)

  if (showDashboard) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            onClick={() => setShowDashboard(false)}
            variant="outline"
            className="mb-4"
          >
            ← Back to Overview
          </Button>
          <h1 className="text-3xl font-bold mb-2">API Status Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time monitoring of all integrated free APIs
          </p>
        </div>
        <APIDashboard />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Free APIs Mega Collection</h1>
        <p className="text-xl text-muted-foreground mb-6">
          26+ Free APIs organized by category - Zero cost, maximum value
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Badge variant="secondary" className="px-3 py-1">
            <Zap className="h-4 w-4 mr-1" />
            26 APIs
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            <Database className="h-4 w-4 mr-1" />
            8 Categories
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            <Globe className="h-4 w-4 mr-1" />
            $0 Cost
          </Badge>
        </div>
        <Button onClick={() => setShowDashboard(true)} size="lg">
          <RefreshCw className="h-5 w-5 mr-2" />
          View Live API Dashboard
        </Button>
      </div>

      <Tabs defaultValue="weather" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          {Object.entries(categoryIcons).map(([key, Icon]) => (
            <TabsTrigger key={key} value={key} className="flex items-center gap-1">
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(categoryIcons).map(([category, Icon]) => (
          <TabsContent key={category} value={category} className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-2xl">
                      {category.charAt(0).toUpperCase() + category.slice(1)} & {category === 'weather' ? 'Environment' : category === 'sports' ? 'Entertainment' : category === 'transit' ? 'Transit' : category === 'government' ? 'Public Data' : category === 'health' ? 'Education' : category === 'business' ? 'Economy' : category === 'culture' ? 'Recreation' : 'Tools'}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {categoryDescriptions[category as keyof typeof categoryDescriptions]}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* API cards will be populated by the dashboard component */}
                  <div className="text-center py-8 text-muted-foreground col-span-full">
                    <Icon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Click "View Live API Dashboard" above to see detailed API information</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">API Integration Highlights</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600 mb-2">$0</div>
              <p className="text-sm text-muted-foreground">Monthly Cost</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600 mb-2">26+</div>
              <p className="text-sm text-muted-foreground">Free APIs</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600 mb-2">8</div>
              <p className="text-sm text-muted-foreground">Categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600 mb-2">∞</div>
              <p className="text-sm text-muted-foreground">Free Tier Calls</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
