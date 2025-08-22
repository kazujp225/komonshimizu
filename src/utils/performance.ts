// パフォーマンス最適化ユーティリティ

import { useEffect, useRef, useCallback, useMemo } from 'react';

/**
 * デバウンス関数
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const debounceRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      
      debounceRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * スロットル関数
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const lastRun = useRef(Date.now());

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    },
    [callback, delay]
  );

  return throttledCallback;
}

/**
 * Intersection Observer フック
 */
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, options]);

  return isVisible;
}

/**
 * 仮想スクロール用のフック
 */
export function useVirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  overscan = 5,
}: {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight),
      items.length - 1
    );

    const start = Math.max(0, startIndex - overscan);
    const end = Math.min(items.length - 1, endIndex + overscan);

    return {
      items: items.slice(start, end + 1),
      startIndex: start,
      endIndex: end,
      offsetY: start * itemHeight,
    };
  }, [items, itemHeight, containerHeight, scrollTop, overscan]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    handleScroll,
    totalHeight: items.length * itemHeight,
  };
}

/**
 * 画像遅延読み込み
 */
export function useLazyImage(src: string, placeholder?: string) {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      setIsError(false);
    };

    img.onerror = () => {
      setIsError(true);
      setIsLoaded(false);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { imageSrc, isLoaded, isError };
}

/**
 * メモ化された計算処理
 */
export function useExpensiveCalculation<T, R>(
  calculation: (value: T) => R,
  dependencies: T[],
  shouldRecalculate?: (prev: T[], current: T[]) => boolean
): R {
  const prevDeps = useRef<T[]>();
  const cachedResult = useRef<R>();

  const result = useMemo(() => {
    const hasChanged = shouldRecalculate
      ? shouldRecalculate(prevDeps.current || [], dependencies)
      : !prevDeps.current || 
        prevDeps.current.length !== dependencies.length ||
        prevDeps.current.some((dep, index) => dep !== dependencies[index]);

    if (hasChanged) {
      prevDeps.current = dependencies;
      cachedResult.current = calculation(dependencies[0]); // 最初の依存関係を使用
    }

    return cachedResult.current;
  }, dependencies);

  return result as R;
}

/**
 * パフォーマンス測定
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startMeasurement(name: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (!this.metrics.has(name)) {
        this.metrics.set(name, []);
      }
      
      this.metrics.get(name)!.push(duration);
      
      // 最新の100件のみ保持
      if (this.metrics.get(name)!.length > 100) {
        this.metrics.get(name)!.shift();
      }
      
      console.debug(`Performance [${name}]: ${duration.toFixed(2)}ms`);
    };
  }

  getAverageTime(name: string): number {
    const measurements = this.metrics.get(name) || [];
    if (measurements.length === 0) return 0;
    
    const sum = measurements.reduce((acc, val) => acc + val, 0);
    return sum / measurements.length;
  }

  getMetrics(): Record<string, { average: number; count: number }> {
    const result: Record<string, { average: number; count: number }> = {};
    
    this.metrics.forEach((measurements, name) => {
      result[name] = {
        average: this.getAverageTime(name),
        count: measurements.length,
      };
    });
    
    return result;
  }

  clearMetrics(name?: string): void {
    if (name) {
      this.metrics.delete(name);
    } else {
      this.metrics.clear();
    }
  }
}

/**
 * React Suspense用のリソースローダー
 */
export function createResource<T>(
  fetcher: () => Promise<T>
): {
  read(): T;
  preload(): void;
} {
  let status = 'pending';
  let result: T;
  let suspender: Promise<T>;

  const load = () => {
    suspender = fetcher()
      .then((data) => {
        status = 'success';
        result = data;
      })
      .catch((error) => {
        status = 'error';
        result = error;
      });
  };

  return {
    read() {
      if (status === 'pending') {
        if (!suspender) load();
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
      throw new Error('Unexpected status');
    },
    preload() {
      if (!suspender) load();
    },
  };
}

/**
 * Web Workers用のフック
 */
export function useWebWorker<T, R>(
  workerFunction: (data: T) => R,
  dependencies: any[] = []
) {
  const workerRef = useRef<Worker>();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<R | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback((data: T): Promise<R> => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current) {
        // Web Worker スクリプトを動的に作成
        const workerScript = `
          self.onmessage = function(e) {
            try {
              const result = (${workerFunction.toString()})(e.data);
              self.postMessage({ success: true, result });
            } catch (error) {
              self.postMessage({ success: false, error: error.message });
            }
          }
        `;
        
        const blob = new Blob([workerScript], { type: 'application/javascript' });
        workerRef.current = new Worker(URL.createObjectURL(blob));
      }

      setIsLoading(true);
      setError(null);

      workerRef.current.onmessage = (e) => {
        setIsLoading(false);
        
        if (e.data.success) {
          setResult(e.data.result);
          resolve(e.data.result);
        } else {
          const error = new Error(e.data.error);
          setError(error);
          reject(error);
        }
      };

      workerRef.current.onerror = (error) => {
        setIsLoading(false);
        setError(error as any);
        reject(error);
      };

      workerRef.current.postMessage(data);
    });
  }, dependencies);

  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  return { execute, isLoading, result, error };
}

/**
 * Bundle分割用のダイナミックインポート
 */
export function useDynamicImport<T>(
  importFunc: () => Promise<{ default: T }>,
  options: {
    preload?: boolean;
    fallback?: T;
  } = {}
) {
  const [component, setComponent] = useState<T | null>(options.fallback || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadComponent = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const module = await importFunc();
      setComponent(module.default);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [importFunc]);

  useEffect(() => {
    if (options.preload) {
      loadComponent();
    }
  }, [loadComponent, options.preload]);

  return {
    component,
    isLoading,
    error,
    loadComponent,
  };
}

// React import追加
import { useState } from 'react';