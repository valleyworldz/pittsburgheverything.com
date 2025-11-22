export function HotelCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
        </div>
      </div>
      <div className="h-4 w-1/4 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-5/6 bg-gray-200 rounded mb-4"></div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
      </div>
      <div className="flex justify-end pt-4 border-t">
        <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  )
}

export function HotelListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <HotelCardSkeleton key={i} />
      ))}
    </div>
  )
}

