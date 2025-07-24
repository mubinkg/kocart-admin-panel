export default function CarListingSkeleton() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <CarCardSkeleton />
        <CarCardSkeleton />
        <CarCardSkeleton />
        <CarCardSkeleton />
      </div>
    </div>
  )
}

function CarCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
      {/* Header with share and favorite icons */}
      <div className="absolute left-4 top-4 z-10">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300"></div>
      </div>
      <div className="absolute right-4 top-4 z-10">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300"></div>
      </div>

      {/* Price */}
      <div className="absolute left-4 top-16 z-10">
        <div className="h-6 w-20 animate-pulse rounded bg-gray-300"></div>
      </div>

      {/* Car details */}
      <div className="absolute left-4 top-28 z-10 space-y-2">
        <div className="h-4 w-32 animate-pulse rounded bg-gray-300"></div>
        <div className="flex items-center space-x-4">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-300"></div>
          <div className="h-4 w-12 animate-pulse rounded bg-gray-300"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 animate-pulse rounded bg-gray-300"></div>
          <div className="h-4 w-20 animate-pulse rounded bg-gray-300"></div>
        </div>
      </div>

      {/* Main image area */}
      <div className="relative h-64 bg-gray-200">
        <div className="h-full w-full animate-pulse bg-gray-300"></div>

        {/* Navigation arrows */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2">
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-400"></div>
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-400"></div>
        </div>

        {/* Image pagination dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400"></div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400"></div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400"></div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400"></div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400"></div>
        </div>
      </div>

      {/* Bottom section with details button */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="h-10 w-24 animate-pulse rounded bg-gray-300"></div>
          <div className="space-y-1">
            <div className="h-3 w-16 animate-pulse rounded bg-gray-300"></div>
            <div className="h-3 w-12 animate-pulse rounded bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
