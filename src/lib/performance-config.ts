// パフォーマンス設定とオプティマイゼーション

/**
 * アニメーション設定
 */
export const ANIMATION_CONFIG = {
  // 通常のアニメーション設定
  default: {
    duration: 0.3,
    ease: [0.25, 0.1, 0.25, 1],
  },
  
  // 高速アニメーション（頻繁に発生するもの）
  fast: {
    duration: 0.15,
    ease: "easeOut",
  },
  
  // スムーズなアニメーション（重要な要素）
  smooth: {
    duration: 0.6,
    ease: [0.645, 0.045, 0.355, 1.000],
  },
  
  // バウンス効果
  bounce: {
    type: "spring",
    stiffness: 400,
    damping: 10,
  },
  
  // スプリングアニメーション
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  }
} as const;

/**
 * パフォーマンス最適化設定
 */
export const PERFORMANCE_CONFIG = {
  // 遅延読み込み設定
  lazyLoading: {
    rootMargin: '50px',
    threshold: 0.1,
  },
  
  // 仮想スクロール設定
  virtualScroll: {
    itemHeight: 80,
    overscan: 5,
    bufferSize: 10,
  },
  
  // デバウンス・スロットル設定
  debounce: {
    search: 300,
    resize: 250,
    scroll: 100,
  },
  
  throttle: {
    mousemove: 16, // 60fps
    scroll: 16,
    resize: 100,
  },
  
  // キャッシュ設定
  cache: {
    maxSize: 50,
    ttl: 5 * 60 * 1000, // 5分
  },
  
  // バッチ処理設定
  batch: {
    size: 10,
    delay: 50,
  }
} as const;

/**
 * レスポンシブ設定
 */
export const RESPONSIVE_CONFIG = {
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  
  // モバイル最適化
  mobile: {
    reduceAnimations: true,
    smallerImages: true,
    simplifiedEffects: true,
  },
  
  // 低パワーデバイス対応
  lowPower: {
    disableParallax: true,
    reduceParticles: true,
    simplifyShaders: true,
  }
} as const;

/**
 * 画像最適化設定
 */
export const IMAGE_CONFIG = {
  // 画質設定
  quality: {
    thumbnail: 60,
    standard: 80,
    high: 90,
  },
  
  // リサイズ設定
  sizes: {
    thumbnail: 150,
    small: 400,
    medium: 800,
    large: 1200,
    xlarge: 1920,
  },
  
  // フォーマット優先順位
  formats: ['webp', 'avif', 'jpg'],
  
  // 遅延読み込み設定
  lazyLoading: {
    placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Y2EzYWYiPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
    blurAmount: 10,
  }
} as const;

/**
 * コード分割設定
 */
export const CODE_SPLITTING_CONFIG = {
  // チャンク分割設定
  chunks: {
    vendor: ['react', 'react-dom', 'framer-motion'],
    ui: ['@/components/ui'],
    utils: ['@/utils', '@/lib'],
  },
  
  // 動的インポート設定
  dynamicImports: {
    preload: true,
    webpackChunkName: true,
  }
} as const;

/**
 * ユーティリティ関数
 */

// デバイス判定
export const getDeviceInfo = () => {
  if (typeof window === 'undefined') return { type: 'server', isMobile: false };
  
  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isLowPowerDevice = /Android.*[4-6]\./i.test(userAgent) || /iPhone.*OS [8-9]/i.test(userAgent);
  
  return {
    type: isMobile ? 'mobile' : 'desktop',
    isMobile,
    isLowPowerDevice,
    hasTouch: 'ontouchstart' in window,
    supportsWebP: (() => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    })(),
  };
};

// パフォーマンス設定の動的調整
export const getDynamicConfig = () => {
  const device = getDeviceInfo();
  const connection = (navigator as any)?.connection;
  
  const config = {
    ...PERFORMANCE_CONFIG,
    animations: { ...ANIMATION_CONFIG },
  };
  
  // モバイルデバイスの場合
  if (device.isMobile) {
    config.animations.default.duration *= 0.8;
    config.debounce.search = 500;
    config.throttle.scroll = 32; // 30fps
  }
  
  // 低パワーデバイスの場合
  if (device.isLowPowerDevice) {
    config.animations.default.duration *= 0.5;
    config.virtualScroll.overscan = 3;
    config.throttle.mousemove = 100;
  }
  
  // 低速接続の場合
  if (connection?.effectiveType === '2g' || connection?.effectiveType === '3g') {
    config.lazyLoading.rootMargin = '20px';
    config.cache.maxSize = 20;
    config.batch.size = 5;
  }
  
  return config;
};

// メモリ使用量監視
export const getMemoryUsage = (): { used: number; total: number; percentage: number } | null => {
  if (typeof window === 'undefined' || !(performance as any).memory) {
    return null;
  }
  
  const memory = (performance as any).memory;
  const used = memory.usedJSHeapSize / 1024 / 1024; // MB
  const total = memory.totalJSHeapSize / 1024 / 1024; // MB
  const percentage = (used / total) * 100;
  
  return { used, total, percentage };
};

// FPS測定
export const measureFPS = (duration = 1000): Promise<number> => {
  return new Promise((resolve) => {
    let frames = 0;
    const startTime = performance.now();
    
    const tick = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime - startTime < duration) {
        requestAnimationFrame(tick);
      } else {
        const fps = (frames * 1000) / (currentTime - startTime);
        resolve(Math.round(fps));
      }
    };
    
    requestAnimationFrame(tick);
  });
};

// パフォーマンス警告
export const checkPerformanceWarnings = () => {
  const warnings: string[] = [];
  
  // メモリ使用量チェック
  const memory = getMemoryUsage();
  if (memory && memory.percentage > 80) {
    warnings.push(`高メモリ使用量: ${memory.percentage.toFixed(1)}%`);
  }
  
  // 大きなDOM要素数チェック
  const elementCount = document.querySelectorAll('*').length;
  if (elementCount > 1000) {
    warnings.push(`大量のDOM要素: ${elementCount}個`);
  }
  
  // 未使用CSS警告（開発環境のみ）
  if (process.env.NODE_ENV === 'development') {
    const styleSheets = Array.from(document.styleSheets);
    const unusedRules = styleSheets
      .flatMap(sheet => {
        try {
          return Array.from(sheet.cssRules || []);
        } catch {
          return [];
        }
      })
      .filter(rule => {
        if (rule.type !== 1) return false; // CSSStyleRule
        try {
          return !document.querySelector((rule as CSSStyleRule).selectorText);
        } catch {
          return false;
        }
      });
    
    if (unusedRules.length > 100) {
      warnings.push(`未使用CSS: ${unusedRules.length}ルール`);
    }
  }
  
  return warnings;
};

// パフォーマンス最適化の自動実行
export const autoOptimize = () => {
  const config = getDynamicConfig();
  
  // アニメーションの設定を適用
  document.documentElement.style.setProperty(
    '--animation-duration-fast',
    `${config.animations.fast.duration}s`
  );
  document.documentElement.style.setProperty(
    '--animation-duration-default',
    `${config.animations.default.duration}s`
  );
  
  // 低パワーデバイス用の最適化
  const device = getDeviceInfo();
  if (device.isLowPowerDevice) {
    document.documentElement.classList.add('low-power-device');
  }
  
  if (device.isMobile) {
    document.documentElement.classList.add('mobile-device');
  }
  
  return config;
};

// パフォーマンス監視開始
export const startPerformanceMonitoring = (options: {
  enableMemoryMonitoring?: boolean;
  enableFPSMonitoring?: boolean;
  warningThreshold?: number;
} = {}) => {
  const {
    enableMemoryMonitoring = true,
    enableFPSMonitoring = true,
    warningThreshold = 5000,
  } = options;
  
  let memoryInterval: NodeJS.Timeout;
  let fpsInterval: NodeJS.Timeout;
  
  if (enableMemoryMonitoring) {
    memoryInterval = setInterval(() => {
      const memory = getMemoryUsage();
      if (memory && memory.percentage > 90) {
        console.warn(`Memory usage critical: ${memory.percentage.toFixed(1)}%`);
      }
    }, 10000);
  }
  
  if (enableFPSMonitoring) {
    fpsInterval = setInterval(async () => {
      const fps = await measureFPS(1000);
      if (fps < 30) {
        console.warn(`Low FPS detected: ${fps}`);
      }
    }, 30000);
  }
  
  // パフォーマンス警告チェック
  const warningInterval = setInterval(() => {
    const warnings = checkPerformanceWarnings();
    if (warnings.length > 0) {
      console.warn('Performance warnings:', warnings.join(', '));
    }
  }, warningThreshold);
  
  // クリーンアップ関数
  return () => {
    if (memoryInterval) clearInterval(memoryInterval);
    if (fpsInterval) clearInterval(fpsInterval);
    clearInterval(warningInterval);
  };
};