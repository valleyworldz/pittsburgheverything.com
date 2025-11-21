'use client'

import { useEffect, useState } from 'react'

export default function SkipToContent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Show skip link when Tab is pressed
      if (event.key === 'Tab') {
        setIsVisible(true)
      }
    }

    const handleFocus = () => {
      setIsVisible(true)
    }

    const handleBlur = () => {
      // Hide after a delay to allow for navigation
      setTimeout(() => setIsVisible(false), 2000)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', handleFocus)
    document.addEventListener('focusout', handleBlur)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', handleFocus)
      document.removeEventListener('focusout', handleBlur)
    }
  }, [])

  const handleSkip = () => {
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!isVisible) return null

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      className="fixed top-4 left-4 z-[100] bg-pittsburgh-gold text-pittsburgh-black px-4 py-2 rounded-lg font-semibold shadow-lg transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pittsburgh-gold"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      Skip to main content
    </a>
  )
}
