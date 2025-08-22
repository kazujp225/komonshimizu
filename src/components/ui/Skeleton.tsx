'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200';
  
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
  };

  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1em' : '100%'),
  };

  return (
    <div
      className={cn(
        baseClasses,
        animationClasses[animation],
        variantClasses[variant],
        className
      )}
      style={style}
    />
  );
}

// Composite Skeleton Components
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('bg-white rounded-xl p-6 shadow-lg', className)}>
      <Skeleton variant="rounded" height={200} className="mb-4" />
      <Skeleton variant="text" className="mb-2" />
      <Skeleton variant="text" width="80%" className="mb-4" />
      <div className="flex gap-2">
        <Skeleton variant="rounded" width={80} height={32} />
        <Skeleton variant="rounded" width={80} height={32} />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex gap-4">
          <Skeleton variant="text" width={150} />
          <Skeleton variant="text" width={200} />
          <Skeleton variant="text" width={100} />
          <Skeleton variant="text" width={100} className="ml-auto" />
        </div>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="p-4 border-b border-gray-100">
          <div className="flex gap-4 items-center">
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={150} />
            <Skeleton variant="rectangular" width={80} height={24} className="ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <Skeleton variant="circular" width={size} height={size} />
      <div className="flex-1">
        <Skeleton variant="text" width={120} className="mb-1" />
        <Skeleton variant="text" width={80} height="0.875em" />
      </div>
    </div>
  );
}