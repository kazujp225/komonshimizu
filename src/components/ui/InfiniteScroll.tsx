'use client';

import { useEffect, useRef, useCallback, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface InfiniteScrollProps {
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  threshold?: number;
  children: ReactNode;
  loader?: ReactNode;
  endMessage?: ReactNode;
  className?: string;
}

export function InfiniteScroll({
  loadMore,
  hasMore,
  loading,
  threshold = 100,
  children,
  loader,
  endMessage,
  className,
}: InfiniteScrollProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        loadMore();
      }
    },
    [hasMore, loading, loadMore]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, threshold]);

  const defaultLoader = (
    <div className="flex justify-center py-4">
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-primary-600 rounded-full"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    </div>
  );

  const defaultEndMessage = (
    <div className="text-center py-4 text-gray-500">
      すべてのコンテンツを表示しました
    </div>
  );

  return (
    <div className={className}>
      {children}
      {loading && (loader || defaultLoader)}
      {!hasMore && !loading && (endMessage || defaultEndMessage)}
      {hasMore && <div ref={sentinelRef} className="h-1" />}
    </div>
  );
}

// Virtual Scroll for large lists
interface VirtualScrollProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => ReactNode;
  overscan?: number;
  className?: string;
}

export function VirtualScroll<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 3,
  className,
}: VirtualScrollProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.ceil((scrollTop + containerHeight) / itemHeight);
  
  const displayStart = Math.max(0, visibleStart - overscan);
  const displayEnd = Math.min(items.length, visibleEnd + overscan);

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollTop(scrollRef.current.scrollTop);
    }
  };

  const totalHeight = items.length * itemHeight;
  const offsetY = displayStart * itemHeight;

  return (
    <div
      ref={scrollRef}
      className={className}
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {items.slice(displayStart, displayEnd).map((item, index) => (
            <div
              key={displayStart + index}
              style={{ height: itemHeight }}
            >
              {renderItem(item, displayStart + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}