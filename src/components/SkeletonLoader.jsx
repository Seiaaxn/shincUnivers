import React from 'react'

const SkeletonLoader = ({ count = 6, type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative aspect-[2/3] bg-zinc-200 dark:bg-zinc-800">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-100/20 to-transparent animate-shimmer"></div>
            </div>
            <div className="p-2 space-y-2">
              <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-full"></div>
              <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4 mx-auto"></div>
              <div className="h-7 bg-zinc-200 dark:bg-zinc-700 rounded-md mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse flex gap-3 bg-white dark:bg-zinc-900 rounded-lg p-3 border border-zinc-200 dark:border-zinc-800">
          <div className="w-16 h-20 bg-zinc-200 dark:bg-zinc-700 rounded-md shrink-0"></div>
          <div className="flex-1 space-y-2 py-1">
            <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
            <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2"></div>
            <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonLoader
