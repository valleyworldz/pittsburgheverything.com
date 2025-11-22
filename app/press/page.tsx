"use client"

import { useState } from 'react'
import { Newspaper, Download, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react'

export default function PressPage() {
  const [downloadStatus, setDownloadStatus] = useState<{[key: string]: 'idle' | 'downloading' | 'success' | 'error'}>({
    'company-overview': 'idle',
    'logo-assets': 'idle',
    'high-res-images': 'idle'
  })

  const handleDownload = async (fileName: string, displayName: string) => {
    setDownloadStatus(prev => ({ ...prev, [fileName]: 'downloading' }))

    try {
      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // In a real application, this would be a real download link
      // For now, we'll just show a success message
      alert(`Download started: ${displayName}\n\nIn a production environment, this would download the actual file.`)

      setDownloadStatus(prev => ({ ...prev, [fileName]: 'success' }))

      // Reset status after 3 seconds
      setTimeout(() => {
        setDownloadStatus(prev => ({ ...prev, [fileName]: 'idle' }))
      }, 3000)

    } catch (error) {
      setDownloadStatus(prev => ({ ...prev, [fileName]: 'error' }))

      // Reset status after 3 seconds
      setTimeout(() => {
        setDownloadStatus(prev => ({ ...prev, [fileName]: 'idle' }))
      }, 3000)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-pittsburgh-gold via-yellow-400 to-orange-400 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Newspaper className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Press & Media</h1>
          </div>
          <p className="text-xl opacity-90">
            Resources and information for journalists covering PittsburghEverything.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-pittsburgh-black mb-6">Press Kit</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-pittsburgh-gold" />
                    <div>
                      <div className="font-medium">Company Overview</div>
                      <div className="text-sm text-gray-600">PDF • 2.3 MB</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload('company-overview', 'Company Overview PDF')}
                    disabled={downloadStatus['company-overview'] === 'downloading'}
                    className="px-4 py-2 bg-pittsburgh-gold text-white rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {downloadStatus['company-overview'] === 'downloading' ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
                        Downloading...
                      </>
                    ) : downloadStatus['company-overview'] === 'success' ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Downloaded
                      </>
                    ) : downloadStatus['company-overview'] === 'error' ? (
                      <>
                        <AlertCircle className="w-4 h-4" />
                        Failed
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-pittsburgh-gold" />
                    <div>
                      <div className="font-medium">Logo Assets</div>
                      <div className="text-sm text-gray-600">ZIP • 15 MB</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload('logo-assets', 'Logo Assets ZIP')}
                    disabled={downloadStatus['logo-assets'] === 'downloading'}
                    className="px-4 py-2 bg-pittsburgh-gold text-white rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {downloadStatus['logo-assets'] === 'downloading' ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
                        Downloading...
                      </>
                    ) : downloadStatus['logo-assets'] === 'success' ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Downloaded
                      </>
                    ) : downloadStatus['logo-assets'] === 'error' ? (
                      <>
                        <AlertCircle className="w-4 h-4" />
                        Failed
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-pittsburgh-gold" />
                    <div>
                      <div className="font-medium">High-Resolution Images</div>
                      <div className="text-sm text-gray-600">ZIP • 45 MB</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload('high-res-images', 'High-Resolution Images ZIP')}
                    disabled={downloadStatus['high-res-images'] === 'downloading'}
                    className="px-4 py-2 bg-pittsburgh-gold text-white rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {downloadStatus['high-res-images'] === 'downloading' ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
                        Downloading...
                      </>
                    ) : downloadStatus['high-res-images'] === 'success' ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Downloaded
                      </>
                    ) : downloadStatus['high-res-images'] === 'error' ? (
                      <>
                        <AlertCircle className="w-4 h-4" />
                        Failed
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-pittsburgh-black mb-6">Press Contact</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-pittsburgh-gold mt-1" />
                  <div>
                    <div className="font-medium">Press Inquiries</div>
                    <div className="text-gray-600">press@pittsburgheverything.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-pittsburgh-gold mt-1" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-gray-600">+1 (412) 555-PRESS</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-pittsburgh-black mb-2">About PittsburghEverything</h3>
                <p className="text-gray-600 text-sm">
                  PittsburghEverything is Pittsburgh's premier local business directory and community platform,
                  connecting residents and visitors with the best restaurants, events, businesses, and experiences in the Steel City.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
