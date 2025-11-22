'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Database, Zap, Globe, Heart, Briefcase, Palette, Wrench, RefreshCw, Code, Book, Activity, Settings, BarChart3, Shield } from 'lucide-react'
import APIDashboard from '@/components/APIDashboard'
import Link from 'next/link'

const devSections = [
  {
    id: 'apis',
    title: 'API Dashboard',
    description: 'Monitor API health, performance, and status',
    icon: Activity,
    color: 'text-blue-600'
  },
  {
    id: 'docs',
    title: 'API Documentation',
    description: 'Complete API reference and integration guides',
    icon: Book,
    color: 'text-purple-600'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Site analytics and performance metrics',
    icon: BarChart3,
    color: 'text-green-600'
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    description: 'Development utilities and debugging tools',
    icon: Settings,
    color: 'text-orange-600'
  }
]

export default function DevDashPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAPIDashboard, setShowAPIDashboard] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-red-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Developer Dashboard</h1>
                <p className="text-sm text-gray-600">Internal tools and API management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-red-600 border-red-200">
                🔒 Internal Access Only
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = '/'}
              >
                ← Back to Site
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="apis" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>APIs</span>
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex items-center space-x-2">
              <Book className="w-4 h-4" />
              <span>Docs</span>
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Tools</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {devSections.map((section) => {
                const Icon = section.icon
                return (
                  <Card key={section.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => setActiveTab(section.id)}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gray-100`}>
                          <Icon className={`w-6 h-6 ${section.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{section.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {section.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold">23</div>
                      <p className="text-sm text-muted-foreground">Active APIs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold">99.9%</div>
                      <p className="text-sm text-muted-foreground">Uptime</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="text-2xl font-bold">&lt;100ms</div>
                      <p className="text-sm text-muted-foreground">Response Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest API calls and system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Weather API called successfully</span>
                    <span className="text-muted-foreground ml-auto">2 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Events API updated cache</span>
                    <span className="text-muted-foreground ml-auto">5 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>New business review submitted</span>
                    <span className="text-muted-foreground ml-auto">8 min ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* APIs Tab */}
          <TabsContent value="apis" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">API Management</h2>
                <p className="text-muted-foreground">Monitor and manage all integrated APIs</p>
              </div>
              <Button
                onClick={() => setShowAPIDashboard(!showAPIDashboard)}
                variant={showAPIDashboard ? "secondary" : "default"}
              >
                {showAPIDashboard ? 'Hide' : 'Show'} Live Dashboard
              </Button>
            </div>

            {showAPIDashboard ? (
              <APIDashboard />
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">API Dashboard</h3>
                    <p className="text-gray-600 mb-6">
                      Click "Show Live Dashboard" to view real-time API monitoring and health checks.
                    </p>
                    <Button onClick={() => setShowAPIDashboard(true)}>
                      Show Live Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="docs" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">API Documentation</h2>
              <p className="text-muted-foreground">Complete reference for integrating with PittsburghEverything APIs</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Getting Started */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Code className="w-5 h-5" />
                    <span>Getting Started</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Authentication</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span>API Key Required</span>
                      </div>
                      <p className="text-muted-foreground">Contact developer team for API access.</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Rate Limits</h4>
                    <p className="text-sm text-muted-foreground">
                      Free tier: 1000 requests/hour
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Base URL</h4>
                    <code className="block p-2 bg-muted rounded text-sm font-mono">
                      https://pittsburgheverything.com/api
                    </code>
                  </div>
                </CardContent>
              </Card>

              {/* API Endpoints */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5" />
                    <span>API Endpoints</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded">
                      <span className="font-mono text-sm bg-green-100 text-green-800 px-2 py-1 rounded">GET</span>
                      <code className="font-mono text-sm">/api/live/weather</code>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded">
                      <span className="font-mono text-sm bg-green-100 text-green-800 px-2 py-1 rounded">GET</span>
                      <code className="font-mono text-sm">/api/live/events</code>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded">
                      <span className="font-mono text-sm bg-green-100 text-green-800 px-2 py-1 rounded">GET</span>
                      <code className="font-mono text-sm">/api/businesses</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* SDKs & Tools */}
            <Card>
              <CardHeader>
                <CardTitle>SDKs & Libraries</CardTitle>
                <CardDescription>Official libraries to speed up development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl mb-2">📱</div>
                    <h3 className="font-semibold mb-2">JavaScript SDK</h3>
                    <p className="text-sm text-muted-foreground mb-3">Web application integration</p>
                    <Badge variant="secondary">Coming Soon</Badge>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl mb-2">🐍</div>
                    <h3 className="font-semibold mb-2">Python SDK</h3>
                    <p className="text-sm text-muted-foreground mb-3">Data analysis and automation</p>
                    <Badge variant="secondary">Coming Soon</Badge>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl mb-2">📡</div>
                    <h3 className="font-semibold mb-2">REST API</h3>
                    <p className="text-sm text-muted-foreground mb-3">Direct API access</p>
                    <Button size="sm">View Docs →</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Developer Tools</h2>
              <p className="text-muted-foreground">Utilities and debugging tools for development</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">API Tester</CardTitle>
                  <CardDescription>Test API endpoints directly</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Open Tester
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Webhook Logs</CardTitle>
                  <CardDescription>View recent webhook deliveries</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    View Logs
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance</CardTitle>
                  <CardDescription>Core Web Vitals and metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    View Metrics
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Error Logs</CardTitle>
                  <CardDescription>Application errors and debugging</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    View Errors
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cache Manager</CardTitle>
                  <CardDescription>Clear and manage cached data</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Manage Cache
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">System Status</CardTitle>
                  <CardDescription>Server health and uptime</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">All Systems Operational</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
