'use client'

import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'

interface AutoRefreshProps {
  onRefresh: () => Promise<void> | void
  interval?: number // in milliseconds
  showIndicator?: boolean
}

export default function AutoRefresh({ 
  onRefresh, 
  interval = 60000, // Default 1 minute
  showIndicator = true 
}: AutoRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  useEffect(() => {
    const refreshData = async () => {
      setIsRefreshing(true)
      try {
        await onRefresh()
        setLastRefresh(new Date())
      } catch (error) {
        console.error('Auto-refresh error:', error)
      } finally {
        setIsRefreshing(false)
      }
    }

    // Initial refresh
    refreshData()

    // Set up interval
    const intervalId = setInterval(refreshData, interval)

    return () => clearInterval(intervalId)
  }, [onRefresh, interval])

  const getTimeSinceRefresh = () => {
    const seconds = Math.floor((new Date().getTime() - lastRefresh.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m ago`
  }

  if (!showIndicator) return null

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <RefreshCw 
        className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} 
      />
      <span>
        {isRefreshing ? 'Updating...' : `Updated ${getTimeSinceRefresh()}`}
      </span>
    </div>
  )
}

