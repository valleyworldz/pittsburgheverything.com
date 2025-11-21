'use client'

interface ActivityActionButtonProps {
  activity: {
    name: string
    location: string
    duration: string
    price: string
    rating: number
    category: string
    highlights: string[]
    description: string
  }
}

export default function ActivityActionButton({ activity }: ActivityActionButtonProps) {
  const handleClick = () => {
    alert(`${activity.name}\n\n📍 Location: ${activity.location}\n⏰ Duration: ${activity.duration}\n💰 Price: ${activity.price}\n⭐ Rating: ${activity.rating}/5\n🏷️ Category: ${activity.category}\n\n🎯 Highlights:\n${activity.highlights.map(h => `• ${h}`).join('\n')}\n\n📝 ${activity.description}`)
  }

  return (
    <button
      onClick={handleClick}
      className="bg-pittsburgh-gold text-pittsburgh-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-sm cursor-pointer"
    >
      Learn More
    </button>
  )
}
