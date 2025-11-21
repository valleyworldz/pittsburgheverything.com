// Accessibility Utilities and Audit Tools for PittsburghEverything

export interface AccessibilityIssue {
  severity: 'error' | 'warning' | 'info'
  message: string
  element?: string
  selector?: string
  suggestion: string
  wcag?: string // WCAG guideline reference
}

export interface AccessibilityReport {
  score: number
  totalIssues: number
  errors: number
  warnings: number
  info: number
  issues: AccessibilityIssue[]
  timestamp: Date
}

// Color contrast utilities
export function getContrastRatio(color1: string, color2: string): number {
  // Convert hex to RGB
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2) return 1

  // Calculate relative luminance
  const lum1 = getRelativeLuminance(rgb1)
  const lum2 = getRelativeLuminance(rgb2)

  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)

  return (brightest + 0.05) / (darkest + 0.05)
}

function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

function getRelativeLuminance(rgb: { r: number, g: number, b: number }): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// Accessibility audit functions
export function auditAccessibility(): AccessibilityReport {
  const issues: AccessibilityIssue[] = []
  const elements = document.querySelectorAll('*')

  // Check for missing alt text on images
  const images = document.querySelectorAll('img')
  images.forEach((img, index) => {
    if (!img.hasAttribute('alt') || img.getAttribute('alt') === '') {
      issues.push({
        severity: 'error',
        message: 'Image missing alt text',
        element: 'img',
        selector: `img:nth-of-type(${index + 1})`,
        suggestion: 'Add descriptive alt text for screen readers',
        wcag: '1.1.1 Non-text Content'
      })
    }
  })

  // Check for missing labels on form inputs
  const inputs = document.querySelectorAll('input, select, textarea')
  inputs.forEach((input, index) => {
    const hasLabel = document.querySelector(`label[for="${input.id}"]`) ||
                    input.closest('label') ||
                    input.getAttribute('aria-label') ||
                    input.getAttribute('aria-labelledby')

    if (!hasLabel && input.type !== 'submit' && input.type !== 'button' && input.type !== 'hidden') {
      issues.push({
        severity: 'error',
        message: 'Form input missing label',
        element: input.tagName.toLowerCase(),
        selector: `${input.tagName.toLowerCase()}:nth-of-type(${index + 1})`,
        suggestion: 'Add label element or aria-label attribute',
        wcag: '1.3.1 Info and Relationships'
      })
    }
  })

  // Check for heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  let lastLevel = 0
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1))
    if (level - lastLevel > 1 && lastLevel !== 0) {
      issues.push({
        severity: 'warning',
        message: 'Skipped heading level',
        element: heading.tagName.toLowerCase(),
        selector: `${heading.tagName.toLowerCase()}:nth-of-type(${index + 1})`,
        suggestion: 'Use sequential heading levels (h1→h2→h3, etc.)',
        wcag: '1.3.1 Info and Relationships'
      })
    }
    lastLevel = level
  })

  // Check for missing document title
  if (!document.title || document.title.trim() === '') {
    issues.push({
      severity: 'error',
      message: 'Document missing title',
      element: 'title',
      suggestion: 'Add descriptive page title in head',
      wcag: '2.4.2 Page Titled'
    })
  }

  // Check for missing lang attribute
  if (!document.documentElement.hasAttribute('lang')) {
    issues.push({
      severity: 'error',
      message: 'Document missing lang attribute',
      element: 'html',
      suggestion: 'Add lang="en" to html element',
      wcag: '3.1.1 Language of Page'
    })
  }

  // Check for sufficient color contrast
  const textElements = document.querySelectorAll('*')
  textElements.forEach((element, index) => {
    const style = window.getComputedStyle(element)
    const color = style.color
    const backgroundColor = style.backgroundColor

    if (color && backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
      const contrast = getContrastRatio(color, backgroundColor)
      const minContrast = element.tagName.match(/^H[1-6]$/) || style.fontWeight >= 700 ? 3 : 4.5

      if (contrast < minContrast) {
        issues.push({
          severity: 'warning',
          message: `Low color contrast ratio: ${contrast.toFixed(2)}:1`,
          element: element.tagName.toLowerCase(),
          selector: `${element.tagName.toLowerCase()}:nth-of-type(${index + 1})`,
          suggestion: 'Increase contrast between text and background colors',
          wcag: '1.4.3 Contrast (Minimum)'
        })
      }
    }
  })

  // Check for focus indicators
  const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]')
  focusableElements.forEach((element, index) => {
    const style = window.getComputedStyle(element, ':focus')
    const hasFocusIndicator = style.outline !== 'none' ||
                             style.boxShadow !== 'none' ||
                             style.border !== 'none'

    if (!hasFocusIndicator) {
      issues.push({
        severity: 'warning',
        message: 'Element missing visible focus indicator',
        element: element.tagName.toLowerCase(),
        selector: `${element.tagName.toLowerCase()}:nth-of-type(${index + 1})`,
        suggestion: 'Add visible focus styles (outline, border, or box-shadow)',
        wcag: '2.4.7 Focus Visible'
      })
    }
  })

  // Check for ARIA landmarks
  const hasMain = document.querySelector('main, [role="main"]')
  const hasNav = document.querySelector('nav, [role="navigation"]')
  const hasHeader = document.querySelector('header, [role="banner"]')
  const hasFooter = document.querySelector('footer, [role="contentinfo"]')

  if (!hasMain) {
    issues.push({
      severity: 'info',
      message: 'Missing main landmark',
      suggestion: 'Add main element or role="main" for primary content',
      wcag: '1.3.1 Info and Relationships'
    })
  }

  if (!hasNav) {
    issues.push({
      severity: 'info',
      message: 'Missing navigation landmark',
      suggestion: 'Add nav element or role="navigation" for site navigation',
      wcag: '1.3.1 Info and Relationships'
    })
  }

  // Calculate score
  const errors = issues.filter(i => i.severity === 'error').length
  const warnings = issues.filter(i => i.severity === 'warning').length
  const info = issues.filter(i => i.severity === 'info').length

  // Scoring algorithm: errors are -10 points, warnings -2, info -1
  const baseScore = 100
  const penalty = (errors * 10) + (warnings * 2) + (info * 1)
  const score = Math.max(0, baseScore - penalty)

  return {
    score,
    totalIssues: issues.length,
    errors,
    warnings,
    info,
    issues,
    timestamp: new Date()
  }
}

// Keyboard navigation helpers
export function makeElementTabbable(element: HTMLElement, tabbable: boolean = true) {
  if (tabbable) {
    element.setAttribute('tabindex', '0')
  } else {
    element.removeAttribute('tabindex')
  }
}

export function trapFocus(container: HTMLElement) {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

  function handleTabKey(e: KeyboardEvent) {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus()
        e.preventDefault()
      }
    }
  }

  container.addEventListener('keydown', handleTabKey)

  // Focus first element
  if (firstElement) {
    firstElement.focus()
  }

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleTabKey)
  }
}

// Screen reader announcements
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.style.position = 'absolute'
  announcement.style.left = '-10000px'
  announcement.style.width = '1px'
  announcement.style.height = '1px'
  announcement.style.overflow = 'hidden'

  announcement.textContent = message

  document.body.appendChild(announcement)

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// High contrast mode detection
export function isHighContrastMode(): boolean {
  const testElement = document.createElement('div')
  testElement.style.color = 'rgb(31, 41, 55)' // Tailwind gray-800
  testElement.style.backgroundColor = 'rgb(255, 255, 255)' // White

  document.body.appendChild(testElement)
  const computedStyle = window.getComputedStyle(testElement)
  const isHighContrast = computedStyle.color === computedStyle.backgroundColor
  document.body.removeChild(testElement)

  return isHighContrast
}

// Reduced motion preference
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Initialize accessibility features
export function initializeAccessibility() {
  // Add skip links for keyboard users
  const skipLink = document.createElement('a')
  skipLink.href = '#main-content'
  skipLink.textContent = 'Skip to main content'
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-pittsburgh-gold text-black px-4 py-2 rounded z-50'

  document.body.insertBefore(skipLink, document.body.firstChild)

  // Add high contrast toggle
  const contrastToggle = document.createElement('button')
  contrastToggle.textContent = 'Toggle High Contrast'
  contrastToggle.className = 'fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-2 rounded shadow-lg z-40 text-sm'
  contrastToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('high-contrast')
  })

  document.body.appendChild(contrastToggle)

  // Add focus-visible polyfill for older browsers
  if (!CSS.supports('selector(:focus-visible)')) {
    const style = document.createElement('style')
    style.textContent = `
      .focus-visible:focus {
        outline: 2px solid #e65100;
        outline-offset: 2px;
      }
    `
    document.head.appendChild(style)
  }

  // Monitor for dynamic content changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            // Check for accessibility issues in new content
            if (element.tagName === 'IMG' && !element.hasAttribute('alt')) {
              console.warn('New image added without alt text:', element)
            }
          }
        })
      }
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  // Cleanup function
  return () => {
    observer.disconnect()
    if (skipLink.parentNode) {
      skipLink.parentNode.removeChild(skipLink)
    }
    if (contrastToggle.parentNode) {
      contrastToggle.parentNode.removeChild(contrastToggle)
    }
  }
}

// CSS for high contrast mode
export const highContrastCSS = `
  .high-contrast {
    --bg-primary: #000000;
    --bg-secondary: #ffffff;
    --text-primary: #ffffff;
    --text-secondary: #000000;
    --border-color: #ffffff;
    --focus-color: #ffff00;
  }

  .high-contrast * {
    background-color: var(--bg-primary) !important;
    color: var(--text-primary) !important;
    border-color: var(--border-color) !important;
  }

  .high-contrast img {
    filter: contrast(1.2) brightness(1.1);
  }

  .high-contrast button,
  .high-contrast a,
  .high-contrast input,
  .high-contrast select,
  .high-contrast textarea {
    border: 2px solid var(--focus-color) !important;
  }

  .high-contrast button:focus,
  .high-contrast a:focus,
  .high-contrast input:focus,
  .high-contrast select:focus,
  .high-contrast textarea:focus {
    outline: 3px solid var(--focus-color) !important;
    outline-offset: 2px !important;
  }
`

// Inject high contrast CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = highContrastCSS
  document.head.appendChild(style)
}
