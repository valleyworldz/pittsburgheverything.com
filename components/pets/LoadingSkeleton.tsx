export function DogParkCardSkeleton() {
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

export function DogParkListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <DogParkCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function PetFriendlySpotCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="p-4 border-b">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-full mb-2" />
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-4" />
      </div>
      <div className="p-4 bg-blue-50">
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-full mb-2" />
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

export function PetFriendlySpotListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <PetFriendlySpotCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function VetGroomerCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="p-4 border-b">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-full mb-2" />
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-4" />
      </div>
      <div className="p-4 bg-gray-50">
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

export function VetGroomerListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <VetGroomerCardSkeleton key={i} />
      ))}
    </div>
  )
}

