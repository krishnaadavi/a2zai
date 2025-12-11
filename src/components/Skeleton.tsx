'use client';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%] rounded ${className}`}
      style={{
        animation: 'shimmer 1.5s infinite',
      }}
    />
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="flex flex-col p-5 rounded-xl bg-gray-900 border border-gray-800">
      {/* Category */}
      <Skeleton className="h-5 w-20 rounded mb-3" />

      {/* Title */}
      <div className="space-y-2 flex-1">
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-4/5 rounded" />
        <Skeleton className="h-5 w-3/5 rounded" />
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
        <Skeleton className="h-4 w-4 rounded" />
      </div>
    </div>
  );
}

export function NewsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function FiltersSkeleton() {
  return (
    <div className="space-y-4">
      {/* Search */}
      <Skeleton className="h-12 w-full rounded-xl" />

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-20 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export function GlossaryCardSkeleton() {
  return (
    <div className="p-5 rounded-xl bg-gray-900 border border-gray-800">
      <div className="flex items-start justify-between mb-3">
        <Skeleton className="h-6 w-32 rounded" />
        <Skeleton className="h-5 w-16 rounded" />
      </div>
      <Skeleton className="h-4 w-full rounded mb-2" />
      <Skeleton className="h-4 w-4/5 rounded" />
    </div>
  );
}

export function ExplainerCardSkeleton() {
  return (
    <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-5 w-20 rounded" />
        <Skeleton className="h-5 w-16 rounded" />
      </div>
      <Skeleton className="h-7 w-3/4 rounded mb-2" />
      <Skeleton className="h-4 w-full rounded mb-4" />
      <Skeleton className="h-4 w-2/3 rounded" />
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* Avatar and name */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-40 rounded" />
          <Skeleton className="h-4 w-56 rounded" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
