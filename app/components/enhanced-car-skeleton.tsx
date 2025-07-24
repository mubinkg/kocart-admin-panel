export default function EnhancedCarSkeleton() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <EnhancedCarCard />
        <EnhancedCarCard />
        <EnhancedCarCard />
        <EnhancedCarCard />
      </div>
    </div>
  )
}

function EnhancedCarCard() {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      {/* Header icons */}
      <div className="absolute left-4 top-4 z-10">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300 shadow-sm"></div>
      </div>
      <div className="absolute right-4 top-4 z-10">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300 shadow-sm"></div>
      </div>

      {/* Price badge */}
      <div className="absolute left-4 top-16 z-10">
        <div className="h-7 w-24 animate-pulse rounded-md bg-red-200 shadow-sm"></div>
      </div>

      {/* Car info section */}
      <div className="absolute left-4 top-28 z-10 space-y-3">
        <div className="h-5 w-36 animate-pulse rounded bg-gray-300 shadow-sm"></div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="h-4 w-4 animate-pulse rounded bg-gray-300"></div>
            <div className="h-4 w-16 animate-pulse rounded bg-gray-300"></div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-4 w-4 animate-pulse rounded bg-gray-300"></div>
            <div className="h-4 w-12 animate-pulse rounded bg-gray-300"></div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 animate-pulse rounded bg-gray-300"></div>
          <div className="h-4 w-24 animate-pulse rounded bg-gray-300"></div>
        </div>
      </div>

      {/* Main image container */}
      <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
        <div className="h-full w-full animate-pulse bg-gray-300"></div>

        {/* Car silhouette placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-24 w-40 animate-pulse rounded-lg bg-gray-400 opacity-50"></div>
        </div>

        {/* Navigation arrows */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-400 shadow-md"></div>
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-400 shadow-md"></div>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 animate-pulse rounded-full ${i === 0 ? "bg-white" : "bg-gray-400"} shadow-sm`}
            ></div>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="h-11 w-28 animate-pulse rounded-md bg-red-200 shadow-sm"></div>
          <div className="text-right">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-300 mb-1"></div>
            <div className="h-3 w-16 animate-pulse rounded bg-gray-300"></div>
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </div>
  )
}
