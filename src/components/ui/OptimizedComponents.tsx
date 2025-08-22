'use client';

import React, { memo, useMemo, useCallback, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useDebounce, useThrottle, useLazyImage, PerformanceMonitor } from '@/utils/performance';

// メモ化されたアニメーション付きカード
interface OptimizedCardProps {
  title: string;
  description: string;
  image?: string;
  onClick?: () => void;
  className?: string;
}

export const OptimizedCard = memo(({ title, description, image, onClick, className = '' }: OptimizedCardProps) => {
  const { imageSrc, isLoaded, isError } = useLazyImage(image || '');
  
  const handleClick = useCallback(() => {
    const endMeasurement = PerformanceMonitor.getInstance().startMeasurement('card-click');
    onClick?.();
    endMeasurement();
  }, [onClick]);

  const cardVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -5, scale: 1.02 },
    tap: { scale: 0.98 }
  }), []);

  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer ${className}`}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      layout // 効率的なレイアウトアニメーション
    >
      {image && (
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          {!isLoaded && !isError && (
            <div className="absolute inset-0 animate-pulse bg-gray-300" />
          )}
          {isLoaded && (
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
          {isError && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              画像を読み込めませんでした
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 line-clamp-3">{description}</p>
      </div>
    </motion.div>
  );
});

OptimizedCard.displayName = 'OptimizedCard';

// 仮想スクロール対応のリスト
interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  height: number;
  className?: string;
}

export function VirtualizedList<T>({ 
  items, 
  renderItem, 
  itemHeight, 
  height, 
  className = '' 
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = React.useState(0);
  
  const handleScroll = useThrottle((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, 16); // 60fps制限

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(height / itemHeight) + 1,
      items.length - 1
    );

    return {
      startIndex: Math.max(0, startIndex),
      endIndex,
      items: items.slice(startIndex, endIndex + 1),
      offsetY: startIndex * itemHeight,
    };
  }, [items, itemHeight, height, scrollTop]);

  const totalHeight = items.length * itemHeight;

  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ height }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${visibleItems.offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.items.map((item, index) => (
            <div
              key={visibleItems.startIndex + index}
              style={{ height: itemHeight }}
            >
              {renderItem(item, visibleItems.startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 遅延ローディング対応の画像コンポーネント
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  blurDataURL?: string;
}

export const LazyImage = memo(({ 
  src, 
  alt, 
  className = '', 
  placeholder,
  blurDataURL 
}: LazyImageProps) => {
  const { imageSrc, isLoaded, isError } = useLazyImage(src, placeholder);
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          aria-hidden="true"
        />
      )}
      
      {!isLoaded && !isError && !blurDataURL && (
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
      )}
      
      {isLoaded && (
        <motion.img
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />
      )}
      
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          画像を読み込めませんでした
        </div>
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

// 最適化されたフォーム
interface OptimizedFormProps {
  children: React.ReactNode;
  onSubmit: (data: Record<string, any>) => void;
  className?: string;
}

export const OptimizedForm = memo(({ children, onSubmit, className = '' }: OptimizedFormProps) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    const endMeasurement = PerformanceMonitor.getInstance().startMeasurement('form-submit');
    
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());
      onSubmit(data);
    }
    
    endMeasurement();
  }, [onSubmit]);

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit}
      className={className}
    >
      {children}
    </form>
  );
});

OptimizedForm.displayName = 'OptimizedForm';

// デバウンスされた検索入力
interface DebouncedSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  delay?: number;
  className?: string;
}

export const DebouncedSearch = memo(({ 
  onSearch, 
  placeholder = '検索...', 
  delay = 300,
  className = ''
}: DebouncedSearchProps) => {
  const [value, setValue] = React.useState('');
  
  const debouncedSearch = useDebounce(onSearch, delay);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  }, [debouncedSearch]);

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
      {value && (
        <button
          onClick={() => {
            setValue('');
            onSearch('');
          }}
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
});

DebouncedSearch.displayName = 'DebouncedSearch';

// 条件付きレンダリング最適化
interface ConditionalRenderProps {
  condition: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  keepMounted?: boolean;
}

export const ConditionalRender = memo(({ 
  condition, 
  children, 
  fallback, 
  keepMounted = false 
}: ConditionalRenderProps) => {
  if (!condition && !keepMounted) {
    return fallback ? <>{fallback}</> : null;
  }

  return (
    <div style={{ display: condition ? 'block' : 'none' }}>
      {children}
    </div>
  );
});

ConditionalRender.displayName = 'ConditionalRender';

// 重い計算処理の最適化
interface ExpensiveComponentProps {
  data: any[];
  processor: (data: any[]) => any;
  children: (processedData: any) => React.ReactNode;
}

export const ExpensiveComponent = memo(({ data, processor, children }: ExpensiveComponentProps) => {
  const processedData = useMemo(() => {
    const endMeasurement = PerformanceMonitor.getInstance().startMeasurement('expensive-calculation');
    const result = processor(data);
    endMeasurement();
    return result;
  }, [data, processor]);

  return <>{children(processedData)}</>;
});

ExpensiveComponent.displayName = 'ExpensiveComponent';

// バンドル分割されたコンポーネントローダー
interface LazyComponentLoaderProps {
  loader: () => Promise<{ default: React.ComponentType<any> }>;
  fallback?: React.ReactNode;
  props?: any;
}

export const LazyComponentLoader = ({ 
  loader, 
  fallback = <div>読み込み中...</div>, 
  props = {} 
}: LazyComponentLoaderProps) => {
  const LazyComponent = React.lazy(loader);

  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// パフォーマンス監視コンポーネント
export const PerformanceMonitorDisplay = memo(() => {
  const [metrics, setMetrics] = React.useState<Record<string, { average: number; count: number }>>({});

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(PerformanceMonitor.getInstance().getMetrics());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-xs">
      <h4 className="font-semibold mb-2">Performance Metrics</h4>
      {Object.entries(metrics).map(([name, data]) => (
        <div key={name} className="mb-1">
          <span className="font-medium">{name}:</span>
          <span className="ml-2">{data.average.toFixed(2)}ms (×{data.count})</span>
        </div>
      ))}
    </div>
  );
});

PerformanceMonitorDisplay.displayName = 'PerformanceMonitorDisplay';

// 最適化されたモーダル
interface OptimizedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const OptimizedModal = memo(({ isOpen, onClose, children, className = '' }: OptimizedModalProps) => {
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscapeKey]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
    >
      <motion.div
        className={`bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto ${className}`}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
});

OptimizedModal.displayName = 'OptimizedModal';