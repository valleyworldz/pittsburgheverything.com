export function ActivityCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300" />
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-full mb-2" />
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-4" />
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-300 rounded w-20" />
          <div className="h-6 bg-gray-300 rounded w-20" />
          <div className="h-6 bg-gray-300 rounded w-20" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 bg-gray-300 rounded flex-1" />
          <div className="h-10 bg-gray-300 rounded flex-1" />
        </div>
      </div>
    </div>
  )
}

export function ActivityListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ActivityCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function RestaurantCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="p-4 border-b">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-full mb-2" />
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-4" />
      </div>
      <div className="p-4 bg-blue-50">
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
        <div className="flex gap-2 mb-2">
          <div className="h-6 bg-gray-300 rounded w-20" />
          <div className="h-6 bg-gray-300 rounded w-20" />
        </div>
      </div>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <div className="h-10 bg-gray-300 rounded flex-1" />
          <div className="h-10 bg-gray-300 rounded flex-1" />
        </div>
      </div>
    </div>
  )
}

export function RestaurantListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <RestaurantCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ParkCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300" />
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-full mb-2" />
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-4" />
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-300 rounded w-20" />
          <div className="h-6 bg-gray-300 rounded w-20" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 bg-gray-300 rounded flex-1" />
          <div className="h-10 bg-gray-300 rounded flex-1" />
        </div>
      </div>
    </div>
  )
}

export function ParkListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ParkCardSkeleton key={i} />
      ))}
    </div>
  )
}

