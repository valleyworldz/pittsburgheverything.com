// Utility functions for restaurant data processing
// Accurate hours parsing and status calculation

export interface RestaurantHours {
  monday?: string
  tuesday?: string
  wednesday?: string
  thursday?: string
  friday?: string
  saturday?: string
  sunday?: string
  notes?: string
}

export interface RestaurantStatus {
  isOpen: boolean
  status: string
  nextOpen?: string
  nextClose?: string
}

/**
 * Parse time string (e.g., "11:00 AM - 10:00 PM") and return hours
 */
function parseTimeRange(timeString: string): { open: number; close: number } | null {
  if (!timeString || timeString === 'Closed' || timeString === '24 hours') {
    return null
  }

  const parts = timeString.split(' - ')
  if (parts.length !== 2) return null

  const parseTime = (timeStr: string): number => {
    const trimmed = timeStr.trim().toUpperCase()
    const isPM = trimmed.includes('PM')
    const isAM = trimmed.includes('AM')
    
    // Remove AM/PM and extract numbers
    const timeOnly = trimmed.replace(/[AP]M/i, '').trim()
    const [hours, minutes = '0'] = timeOnly.split(':')
    
    let hour24 = parseInt(hours, 10)
    const min = parseInt(minutes, 10)

    // Convert to 24-hour format
    if (isPM && hour24 !== 12) {
      hour24 += 12
    } else if (isAM && hour24 === 12) {
      hour24 = 0
    }

    return hour24 * 60 + min // Return minutes since midnight
  }

  try {
    const open = parseTime(parts[0])
    const close = parseTime(parts[1])
    
    // Handle closing after midnight (e.g., 11:00 PM - 2:00 AM)
    if (close < open) {
      return { open, close: close + 24 * 60 }
    }
    
    return { open, close }
  } catch {
    return null
  }
}

/**
 * Get current restaurant status based on hours
 */
export function getRestaurantStatus(hours: RestaurantHours): RestaurantStatus {
  const now = new Date()
  const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()]
  const currentDayHours = hours[dayOfWeek as keyof RestaurantHours]
  
  // Closed today
  if (!currentDayHours || currentDayHours === 'Closed') {
    // Find next open day
    const nextOpen = findNextOpenDay(hours, now)
    return {
      isOpen: false,
      status: 'Closed',
      nextOpen: nextOpen ? `Opens ${nextOpen.day} at ${nextOpen.time}` : undefined
    }
  }

  // 24 hours
  if (currentDayHours === '24 hours') {
    return {
      isOpen: true,
      status: 'Open 24 Hours',
      nextClose: undefined
    }
  }

  // Parse time range
  const timeRange = parseTimeRange(currentDayHours)
  if (!timeRange) {
    return {
      isOpen: true,
      status: currentDayHours
    }
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const isOpen = currentMinutes >= timeRange.open && currentMinutes < timeRange.close

  if (isOpen) {
    const closeTime = formatMinutesToTime(timeRange.close % (24 * 60))
    return {
      isOpen: true,
      status: `Open until ${closeTime}`,
      nextClose: closeTime
    }
  } else {
    // Find next open time
    if (currentMinutes < timeRange.open) {
      const openTime = formatMinutesToTime(timeRange.open)
      return {
        isOpen: false,
        status: `Opens today at ${openTime}`,
        nextOpen: openTime
      }
    } else {
      const nextOpen = findNextOpenDay(hours, now)
      return {
        isOpen: false,
        status: 'Closed',
        nextOpen: nextOpen ? `Opens ${nextOpen.day} at ${nextOpen.time}` : undefined
      }
    }
  }
}

/**
 * Format minutes since midnight to readable time
 */
function formatMinutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  const period = hours >= 12 ? 'PM' : 'AM'
  const hour12 = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours
  return `${hour12}:${mins.toString().padStart(2, '0')} ${period}`
}

/**
 * Find the next day the restaurant is open
 */
function findNextOpenDay(hours: RestaurantHours, fromDate: Date): { day: string; time: string } | null {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const currentDayIndex = fromDate.getDay()
  
  // Check next 7 days
  for (let i = 1; i <= 7; i++) {
    const checkDayIndex = (currentDayIndex + i) % 7
    const dayName = days[checkDayIndex]
    const dayHours = hours[dayName as keyof RestaurantHours]
    
    if (dayHours && dayHours !== 'Closed' && dayHours !== '24 hours') {
      const timeRange = parseTimeRange(dayHours)
      if (timeRange) {
        const openTime = formatMinutesToTime(timeRange.open)
        const dayDisplay = dayName.charAt(0).toUpperCase() + dayName.slice(1)
        return { day: dayDisplay, time: openTime }
      }
    } else if (dayHours === '24 hours') {
      const dayDisplay = dayName.charAt(0).toUpperCase() + dayName.slice(1)
      return { day: dayDisplay, time: '12:00 AM' }
    }
  }
  
  return null
}

/**
 * Get formatted hours for display
 */
export function formatRestaurantHours(hours: RestaurantHours): Array<{ day: string; hours: string }> {
  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ]

  return days.map(({ key, label }) => ({
    day: label,
    hours: hours[key as keyof RestaurantHours] || 'Closed'
  }))
}

/**
 * Check if restaurant is currently open
 */
export function isRestaurantOpen(hours: RestaurantHours): boolean {
  return getRestaurantStatus(hours).isOpen
}

/**
 * Get distance between two coordinates (Haversine formula)
 */
export function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959 // Earth radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

