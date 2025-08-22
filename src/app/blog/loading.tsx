import { Skeleton, SkeletonCard } from '@/components/ui/Skeleton';

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-20">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton variant="text" width={200} height={40} className="mx-auto mb-4" />
          <Skeleton variant="text" width={400} height={24} className="mx-auto" />
        </div>

        {/* Category Filter Skeleton */}
        <div className="flex justify-center gap-4 mb-12">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" width={100} height={40} />
          ))}
        </div>

        {/* Blog Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}