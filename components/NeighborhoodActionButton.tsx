'use client'

interface NeighborhoodActionButtonProps {
  neighborhoodName: string
  action: 'explore' | 'view-map'
}

export default function NeighborhoodActionButton({ neighborhoodName, action }: NeighborhoodActionButtonProps) {
  const handleClick = () => {
    if (action === 'explore') {
      // Navigate to neighborhood page - this will be handled by Link wrapper
    } else if (action === 'view-map') {
      // Open Google Maps
      const query = encodeURIComponent(`${neighborhoodName}, Pittsburgh, PA`)
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank')
    }
  }

  return (
    <button
      onClick={handleClick}
      className="btn-primary cursor-pointer"
    >
      {action === 'explore' ? `Explore ${neighborhoodName}` : 'View on Map'}
    </button>
  )
}
