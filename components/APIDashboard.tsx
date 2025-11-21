'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { RefreshCw, ExternalLink, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react'
import { API_CATEGORIES } from '@/config/apis'

interface APIHealth {
  status: 'healthy' | 'degraded' | 'down'
  responseTime?: number
  lastChecked: string
}

interface APIConfig {
  key: string
  name: string
  description: string
  url: string
  freeTier: string
  rateLimit: string
  enabled: boolean
  dataTypes: string[]
  status: string
  category: string
  healthCheck: APIHealth
}

interface APICategoryData {
  [category: string]: APIConfig[]
}

interface APIStatusResponse {
  categories: typeof API_CATEGORIES
  apisByCategory: APICategoryData
  totalAPIs: number
  activeAPIs: number
  categoryStats: Array<{
    key: string
    name: string
    count: number
    active: number
  }>
  lastUpdated: string
}

export default function APIDashboard() {
  const [apiData, setApiData] = useState<APIStatusResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('weather')

  const fetchAPIStatus = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/status')
      if (response.ok) {
        const data = await response.json()
        setApiData(data)
      }
    } catch (error) {
      console.error('Failed to fetch API status:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAPIStatus()
  }, [])

  const getStatusIcon = (status: string, health: APIHealth) => {
    if (health.status === 'healthy') {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    } else if (health.status === 'degraded') {
      return <AlertCircle className="h-4 w-4 text-yellow-500" />
    } else {
      return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusBadge = (api: APIConfig) => {
    if (!api.enabled) {
      return <Badge variant="secondary">Inactive</Badge>
    }

    switch (api.healthCheck.status) {
      case 'healthy':
        return <Badge className="bg-green-100 text-green-800">Healthy</Badge>
      case 'degraded':
        return <Badge className="bg-yellow-100 text-yellow-800">Degraded</Badge>
      case 'down':
        return <Badge variant="destructive">Down</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-6 w-6 animate-spin mr-2" />
        Loading API status...
      </div>
    )
  }

  if (!apiData) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Failed to load API data</p>
        <Button onClick={fetchAPIStatus} className="mt-4">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total APIs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{apiData.totalAPIs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active APIs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{apiData.activeAPIs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{apiData.categoryStats.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {new Date(apiData.lastUpdated).toLocaleTimeString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          {apiData.categoryStats.map((category) => (
            <TabsTrigger
              key={category.key}
              value={category.key}
              className="text-xs"
            >
              {category.name.split(' ')[0]}
              <Badge variant="secondary" className="ml-1 text-xs">
                {category.active}/{category.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {apiData.categoryStats.map((category) => (
          <TabsContent key={category.key} value={category.key} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.active} of {category.count} APIs active
                </p>
              </div>
              <Button onClick={fetchAPIStatus} size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {apiData.apisByCategory[category.key]?.map((api) => (
                <Card key={api.key} className="relative">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(api.status, api.healthCheck)}
                        <CardTitle className="text-base">{api.name}</CardTitle>
                      </div>
                      {getStatusBadge(api)}
                    </div>
                    <CardDescription className="text-sm">{api.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Free Tier:</span>
                        <span className="font-medium">{api.freeTier}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Rate Limit:</span>
                        <span className="font-medium">{api.rateLimit}</span>
                      </div>

                      {api.healthCheck.responseTime && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Response:</span>
                          <span className="font-medium">{api.healthCheck.responseTime}ms</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {api.dataTypes.slice(0, 3).map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                      {api.dataTypes.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{api.dataTypes.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(api.healthCheck.lastChecked).toLocaleTimeString()}
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(api.url, '_blank')}
                        className="h-8 px-2"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )) || (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No APIs in this category
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
