'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

interface CountdownTimerProps {
  endTime: Date | string
  onExpire?: () => void
  className?: string
  showIcon?: boolean
}

export default function CountdownTimer({ 
  endTime, 
  onExpire, 
  className = '',
  showIcon = true 
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>('')
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const updateTimer = () => {
      const end = typeof endTime === 'string' ? new Date(endTime) : endTime
      const now = new Date()
      const diff = end.getTime() - now.getTime()

      if (diff <= 0) {
        setIsExpired(true)
        setTimeLeft('Expired')
        if (onExpire) onExpire()
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`)
      } else if (minutes > 0) {
        setTimeLeft(`${minutes}m ${seconds}s`)
      } else {
        setTimeLeft(`${seconds}s`)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [endTime, onExpire])

  if (isExpired) {
    return (
      <span className={`text-red-600 font-semibold ${className}`}>
        {showIcon && <Clock className="w-4 h-4 inline mr-1" />}
        Expired
      </span>
    )
  }

  return (
    <span className={`text-orange-600 font-semibold ${className}`}>
      {showIcon && <Clock className="w-4 h-4 inline mr-1" />}
      {timeLeft}
    </span>
  )
}

