'use client'

import { useState, useEffect } from 'react'
import { Download, ExternalLink, CheckCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react'

interface ImportSource {
  id: 'google' | 'yelp' | 'facebook'
  name: string
  icon: string
  description: string
  setupUrl: string
  color: string
}

interface ImportStats {
  totalImported: number
  bySource: { google: number; yelp: number; facebook: number }
  lastImport?: string
}

interface ImportResult {
  imported: number
  skipped: number
  errors: string[]
  reviews: any[]
}

interface ReviewImportProps {
  businessId: string
  businessName: string
}

export default function ReviewImport({ businessId, businessName }: ReviewImportProps) {
  const [selectedSource, setSelectedSource] = useState<ImportSource | null>(null)
  const [credentials, setCredentials] = useState<Record<string, string>>({})
  const [isImporting, setIsImporting] = useState(false)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)
  const [stats, setStats] = useState<ImportStats | null>(null)
  const [loadingStats, setLoadingStats] = useState(true)

  const sources: ImportSource[] = [
    {
      id: 'google',
      name: 'Google Reviews',
      icon: '🌐',
      description: 'Import reviews from your Google Business Profile',
      setupUrl: 'https://business.google.com',
      color: 'text-blue-600',
    },
    {
      id: 'yelp',
      name: 'Yelp Reviews',
      icon: '⭐',
      description: 'Import reviews from your Yelp business page',
      setupUrl: 'https://biz.yelp.com',
      color: 'text-red-600',
    },
    {
      id: 'facebook',
      name: 'Facebook Reviews',
      icon: '📘',
      description: 'Import reviews from your Facebook business page',
      setupUrl: 'https://business.facebook.com',
      color: 'text-blue-700',
    },
  ]

  useEffect(() => {
    fetchImportStats()
  }, [businessId])

  const fetchImportStats = async () => {
    try {
      const response = await fetch(`/api/reviews/import?businessId=${businessId}`)
      const result = await response.json()

      if (result.success) {
        setStats(result.data)
      }
    } catch (error) {
      console.error('Error fetching import stats:', error)
    } finally {
      setLoadingStats(false)
    }
  }

  const handleImport = async () => {
    if (!selectedSource) return

    setIsImporting(true)
    setImportResult(null)

    try {
      const response = await fetch('/api/reviews/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessId,
          source: selectedSource.id,
          credentials,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setImportResult(result.data)
        await fetchImportStats() // Refresh stats
      } else {
        setImportResult({
          imported: 0,
          skipped: 0,
          errors: [result.message],
          reviews: [],
        })
      }
    } catch (error) {
      console.error('Import error:', error)
      setImportResult({
        imported: 0,
        skipped: 0,
        errors: ['An error occurred during import. Please try again.'],
        reviews: [],
      })
    } finally {
      setIsImporting(false)
    }
  }

  const getCredentialField = (source: ImportSource) => {
    switch (source.id) {
      case 'google':
        return {
          label: 'Google Place ID',
          placeholder: 'ChIJ...',
          key: 'placeId',
          help: 'Find your Place ID in Google Business Profile settings',
        }
      case 'yelp':
        return {
          label: 'Yelp Business ID',
          placeholder: 'your-business-name',
          key: 'yelpId',
          help: 'Your Yelp business URL identifier',
        }
      case 'facebook':
        return {
          label: 'Facebook Page ID',
          placeholder: '123456789',
          key: 'pageId',
          help: 'Your Facebook page numeric ID',
        }
      default:
        return null
    }
  }

  if (loadingStats) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-pittsburgh-black flex items-center gap-2">
          <Download className="w-6 h-6 text-pittsburgh-gold" />
          Import Existing Reviews
        </h2>
        <p className="text-steel-gray mt-1">
          Bring your reviews from Google, Yelp, and Facebook to build your complete review history
        </p>
      </div>

      <div className="p-6">
        {/* Import Stats */}
        {stats && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-pittsburgh-black mb-3">Import Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-pittsburgh-gold">{stats.totalImported}</div>
                <div className="text-sm text-steel-gray">Total Imported</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.bySource.google}</div>
                <div className="text-sm text-steel-gray">From Google</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{stats.bySource.yelp}</div>
                <div className="text-sm text-steel-gray">From Yelp</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-700">{stats.bySource.facebook}</div>
                <div className="text-sm text-steel-gray">From Facebook</div>
              </div>
            </div>
            {stats.lastImport && (
              <p className="text-xs text-steel-gray mt-2">
                Last import: {new Date(stats.lastImport).toLocaleDateString()}
              </p>
            )}
          </div>
        )}

        {/* Source Selection */}
        <div className="mb-6">
          <h3 className="font-semibold text-pittsburgh-black mb-4">Choose a source to import from:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sources.map((source) => (
              <button
                key={source.id}
                onClick={() => setSelectedSource(source)}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  selectedSource?.id === source.id
                    ? 'border-pittsburgh-gold bg-pittsburgh-gold/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{source.icon}</span>
                  <h4 className="font-semibold text-pittsburgh-black">{source.name}</h4>
                </div>
                <p className="text-sm text-steel-gray mb-3">{source.description}</p>
                <a
                  href={source.setupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-pittsburgh-gold hover:text-pittsburgh-black flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  Setup Guide <ExternalLink className="w-3 h-3" />
                </a>
              </button>
            ))}
          </div>
        </div>

        {/* Import Configuration */}
        {selectedSource && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <span className="text-xl">{selectedSource.icon}</span>
              Import from {selectedSource.name}
            </h3>

            {(() => {
              const field = getCredentialField(selectedSource)
              return field ? (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-800 mb-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={credentials[field.key] || ''}
                    onChange={(e) => setCredentials(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={field.placeholder}
                  />
                  <p className="text-xs text-blue-600 mt-1">{field.help}</p>
                </div>
              ) : null
            })()}

            <div className="flex items-center gap-4">
              <button
                onClick={handleImport}
                disabled={isImporting || !credentials[getCredentialField(selectedSource)?.key || '']}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isImporting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Import Reviews
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setSelectedSource(null)
                  setCredentials({})
                }}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Import Results */}
        {importResult && (
          <div className={`p-4 rounded-lg border ${
            importResult.errors.length > 0
              ? 'bg-red-50 border-red-200'
              : 'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              {importResult.errors.length > 0 ? (
                <AlertCircle className="w-5 h-5 text-red-600" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              <h4 className={`font-semibold ${
                importResult.errors.length > 0 ? 'text-red-800' : 'text-green-800'
              }`}>
                Import {importResult.errors.length > 0 ? 'Failed' : 'Complete'}
              </h4>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
              <div>
                <div className="text-2xl font-bold text-green-600">{importResult.imported}</div>
                <div className="text-sm text-green-700">Imported</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{importResult.skipped}</div>
                <div className="text-sm text-yellow-700">Skipped</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{importResult.errors.length}</div>
                <div className="text-sm text-red-700">Errors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{importResult.reviews.length}</div>
                <div className="text-sm text-blue-700">Total Reviews</div>
              </div>
            </div>

            {importResult.errors.length > 0 && (
              <div className="mt-3">
                <h5 className="font-medium text-red-800 mb-2">Errors:</h5>
                <ul className="text-sm text-red-700 space-y-1">
                  {importResult.errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            {importResult.imported > 0 && (
              <div className="mt-3 p-3 bg-green-100 rounded">
                <p className="text-sm text-green-800">
                  <strong>Success!</strong> {importResult.imported} reviews have been imported and are now live on your profile.
                  They will appear in your review list shortly.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-pittsburgh-black mb-2">Need Help?</h3>
          <div className="text-sm text-steel-gray space-y-2">
            <p><strong>Google:</strong> Go to Google Business Profile → Settings → Place ID</p>
            <p><strong>Yelp:</strong> Your business URL is usually "yelp.com/biz/your-business-name"</p>
            <p><strong>Facebook:</strong> Go to your Page → Settings → Page Info → Page ID</p>
            <p className="mt-3">
              <a href="mailto:support@pittsburgheverything.com" className="text-pittsburgh-gold hover:text-pittsburgh-black">
                Contact support
              </a> if you need help finding your IDs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
