import { Skeleton } from '@/components/ui/Skeleton';

export default function AssessmentLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar Skeleton */}
          <div className="mb-8">
            <Skeleton variant="rounded" height={8} />
          </div>

          {/* Question Card Skeleton */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <Skeleton variant="text" width={100} height={24} className="mb-2" />
              <Skeleton variant="text" height={32} className="mb-4" />
              <Skeleton variant="text" width="80%" />
            </div>

            {/* Options Skeleton */}
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} variant="rounded" height={60} />
              ))}
            </div>

            {/* Navigation Buttons Skeleton */}
            <div className="flex justify-between mt-8">
              <Skeleton variant="rounded" width={100} height={40} />
              <Skeleton variant="rounded" width={100} height={40} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}