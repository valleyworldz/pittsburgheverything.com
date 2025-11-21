// Data Formatting and Display Utilities

import { format, formatDistanceToNow, parseISO } from 'date-fns'

/**
 * Format currency values
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Format numbers with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

/**
 * Format percentages
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Format phone numbers
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }

  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `(${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }

  return phone // Return original if format doesn't match
}

/**
 * Format addresses
 */
export function formatAddress(street: string, city = 'Pittsburgh', state = 'PA', zip?: string): string {
  const parts = [street, city, state]
  if (zip) parts.push(zip)
  return parts.filter(Boolean).join(', ')
}

/**
 * Format business hours
 */
export function formatHours(hours: { [key: string]: string }): string[] {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return days.map((day, index) => {
    const hoursValue = hours[day] || 'Closed'
    return `${dayNames[index]}: ${hoursValue}`
  })
}

/**
 * Check if business is currently open
 */
export function isBusinessOpen(hours: { [key: string]: string }): boolean {
  const now = new Date()
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const today = dayNames[now.getDay()]

  const todayHours = hours[today]
  if (!todayHours || todayHours === 'Closed') return false

  // Parse hours like "9:00 AM - 5:00 PM"
  const match = todayHours.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i)
  if (!match) return false

  const [, openHour, openMin, openPeriod, closeHour, closeMin, closePeriod] = match

  const openTime = parseTime(openHour, openMin, openPeriod)
  const closeTime = parseTime(closeHour, closeMin, closePeriod)
  const currentTime = now.getHours() * 60 + now.getMinutes()

  return currentTime >= openTime && currentTime <= closeTime
}

function parseTime(hour: string, min: string, period: string): number {
  let h = parseInt(hour, 10)
  const m = parseInt(min, 10)

  if (period.toUpperCase() === 'PM' && h !== 12) h += 12
  if (period.toUpperCase() === 'AM' && h === 12) h = 0

  return h * 60 + m
}

/**
 * Format ratings display
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

/**
 * Format distance
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`
  }
  return `${(meters / 1000).toFixed(1)}km`
}

/**
 * Format duration
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`
  }

  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (mins === 0) {
    return `${hours}h`
  }

  return `${hours}h ${mins}m`
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return formatDistanceToNow(dateObj, { addSuffix: true })
}

/**
 * Format dates
 */
export function formatDate(date: string | Date, formatStr = 'MMM d, yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatStr)
}

/**
 * Format event dates and times
 */
export function formatEventDateTime(date: string, time: string): string {
  const dateObj = parseISO(date)
  const dateStr = format(dateObj, 'EEE, MMM d')
  return `${dateStr} at ${time}`
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

/**
 * Capitalize first letter of each word
 */
export function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, l => l.toUpperCase())
}

/**
 * Convert to title case
 */
export function toTitleCase(str: string): string {
  return str.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}

/**
 * Slugify text for URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Format price ranges
 */
export function formatPriceRange(range: string): string {
  switch (range) {
    case '$': return 'Budget-friendly'
    case '$$': return 'Moderate'
    case '$$$': return 'Expensive'
    case '$$$$': return 'Very Expensive'
    default: return range
  }
}

/**
 * Format file sizes
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`
}

/**
 * Format coordinates
 */
export function formatCoordinates(lat: number, lng: number): string {
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`
}

/**
 * Generate random ID
 */
export function generateId(length = 8): string {
  return Math.random().toString(36).substring(2, length + 2)
}

/**
 * Format business status
 */
export function formatBusinessStatus(status: string): string {
  switch (status.toLowerCase()) {
    case 'active': return 'Active'
    case 'inactive': return 'Inactive'
    case 'pending': return 'Pending Review'
    case 'suspended': return 'Suspended'
    default: return capitalizeWords(status)
  }
}

/**
 * Format lead status
 */
export function formatLeadStatus(status: string): string {
  switch (status.toLowerCase()) {
    case 'new': return 'New Lead'
    case 'contacted': return 'Contacted'
    case 'qualified': return 'Qualified'
    case 'converted': return 'Converted'
    case 'lost': return 'Lost'
    default: return capitalizeWords(status)
  }
}
