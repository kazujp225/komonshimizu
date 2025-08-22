'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, createContext, useContext } from 'react';

// スクリーンリーダー対応のライブリージョン
interface LiveAnnouncerProps {
  announcement: string;
  priority?: 'polite' | 'assertive';
}

export function LiveAnnouncer({ announcement, priority = 'polite' }: LiveAnnouncerProps) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (announcement) {
      setMessage('');
      // 短時間後にメッセージを設定（スクリーンリーダーが検知するため）
      setTimeout(() => setMessage(announcement), 100);
    }
  }, [announcement]);

  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}

// キーボードナビゲーション対応のフォーカス管理
export function useFocusManagement() {
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);

  const trapFocus = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }

      if (e.key === 'Escape') {
        container.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  };

  const restoreFocus = () => {
    if (focusedElement) {
      focusedElement.focus();
      setFocusedElement(null);
    }
  };

  const saveFocus = () => {
    setFocusedElement(document.activeElement as HTMLElement);
  };

  return { trapFocus, restoreFocus, saveFocus };
}

// カラーコントラスト対応のテーマコンテキスト
interface AccessibilityContextValue {
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'normal' | 'large' | 'xl';
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  setFontSize: (size: 'normal' | 'large' | 'xl') => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');

  useEffect(() => {
    // システム設定を確認
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    setReducedMotion(prefersReducedMotion);
    setHighContrast(prefersHighContrast);

    // ローカルストレージから設定を復元
    const savedSettings = localStorage.getItem('accessibility_settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setHighContrast(settings.highContrast ?? prefersHighContrast);
      setReducedMotion(settings.reducedMotion ?? prefersReducedMotion);
      setFontSize(settings.fontSize ?? 'normal');
    }
  }, []);

  useEffect(() => {
    // 設定をローカルストレージに保存
    localStorage.setItem('accessibility_settings', JSON.stringify({
      highContrast,
      reducedMotion,
      fontSize
    }));

    // CSS変数を更新
    document.documentElement.classList.toggle('high-contrast', highContrast);
    document.documentElement.classList.toggle('reduced-motion', reducedMotion);
    document.documentElement.classList.toggle('font-large', fontSize === 'large');
    document.documentElement.classList.toggle('font-xl', fontSize === 'xl');
  }, [highContrast, reducedMotion, fontSize]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleReducedMotion = () => setReducedMotion(prev => !prev);

  return (
    <AccessibilityContext.Provider value={{
      highContrast,
      reducedMotion,
      fontSize,
      toggleHighContrast,
      toggleReducedMotion,
      setFontSize
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}

// アクセシビリティ設定パネル
interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessibilityPanel({ isOpen, onClose }: AccessibilityPanelProps) {
  const { 
    highContrast, 
    reducedMotion, 
    fontSize, 
    toggleHighContrast, 
    toggleReducedMotion, 
    setFontSize 
  } = useAccessibility();
  
  const panelRef = useRef<HTMLDivElement>(null);
  const { trapFocus, restoreFocus, saveFocus } = useFocusManagement();

  useEffect(() => {
    if (isOpen && panelRef.current) {
      saveFocus();
      const cleanup = trapFocus(panelRef.current);
      panelRef.current.focus();
      return cleanup;
    } else if (!isOpen) {
      restoreFocus();
    }
  }, [isOpen, saveFocus, trapFocus, restoreFocus]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-panel-title"
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 
                id="accessibility-panel-title"
                className="text-xl font-semibold text-gray-900"
              >
                アクセシビリティ設定
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="設定パネルを閉じる"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* ハイコントラスト */}
              <div>
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    ハイコントラストモード
                  </span>
                  <button
                    onClick={toggleHighContrast}
                    className={`
                      relative w-12 h-6 rounded-full transition-colors
                      ${highContrast ? 'bg-primary-600' : 'bg-gray-300'}
                    `}
                    aria-pressed={highContrast}
                    role="switch"
                  >
                    <motion.div
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                      animate={{ x: highContrast ? 24 : 2 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  </button>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  文字と背景のコントラストを強化します
                </p>
              </div>

              {/* モーション制御 */}
              <div>
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    アニメーション制御
                  </span>
                  <button
                    onClick={toggleReducedMotion}
                    className={`
                      relative w-12 h-6 rounded-full transition-colors
                      ${reducedMotion ? 'bg-primary-600' : 'bg-gray-300'}
                    `}
                    aria-pressed={reducedMotion}
                    role="switch"
                  >
                    <motion.div
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                      animate={{ x: reducedMotion ? 24 : 2 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  </button>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  アニメーションを制限して読みやすくします
                </p>
              </div>

              {/* フォントサイズ */}
              <div>
                <span className="text-sm font-medium text-gray-700 block mb-3">
                  フォントサイズ
                </span>
                <div className="space-y-2">
                  {[
                    { value: 'normal', label: '標準' },
                    { value: 'large', label: '大' },
                    { value: 'xl', label: '特大' }
                  ].map(({ value, label }) => (
                    <label key={value} className="flex items-center">
                      <input
                        type="radio"
                        name="fontSize"
                        value={value}
                        checked={fontSize === value}
                        onChange={() => setFontSize(value as any)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* キーボードショートカット */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  キーボードショートカット
                </h3>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>診断フォームを開く</span>
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Alt + D</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>メインメニュー</span>
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Alt + M</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>検索</span>
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Alt + S</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>お問い合わせ</span>
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Alt + C</kbd>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// アクセシビリティ対応のボタン
interface AccessibleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export function AccessibleButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  ariaLabel,
  ariaDescribedBy,
  ...props
}: AccessibleButtonProps) {
  const { reducedMotion } = useAccessibility();

  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white focus:ring-secondary-500',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-xl'
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-busy={loading}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      whileHover={!reducedMotion ? { scale: 1.02 } : {}}
      whileTap={!reducedMotion ? { scale: 0.98 } : {}}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}
      {...props}
    >
      {loading && (
        <motion.div
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        />
      )}
      {children}
    </motion.button>
  );
}

// アクセシビリティ対応のモーダル
interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function AccessibleModal({ isOpen, onClose, title, children, className = '' }: AccessibleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { trapFocus, restoreFocus, saveFocus } = useFocusManagement();
  const { reducedMotion } = useAccessibility();

  useEffect(() => {
    if (isOpen && modalRef.current) {
      saveFocus();
      const cleanup = trapFocus(modalRef.current);
      modalRef.current.focus();
      
      // ESCキーでモーダルを閉じる
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      
      return () => {
        cleanup();
        document.removeEventListener('keydown', handleEscape);
      };
    } else if (!isOpen) {
      restoreFocus();
    }
  }, [isOpen, onClose, saveFocus, trapFocus, restoreFocus]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
            aria-hidden="true"
          />
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              ref={modalRef}
              initial={reducedMotion ? {} : { opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reducedMotion ? {} : { opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              tabIndex={-1}
              className={`
                bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto
                ${className}
              `}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
                    {title}
                  </h2>
                  <AccessibleButton
                    variant="outline"
                    size="sm"
                    onClick={onClose}
                    ariaLabel="モーダルを閉じる"
                    className="!p-2 !border-gray-300 !text-gray-500 hover:!bg-gray-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </AccessibleButton>
                </div>
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// スキップリンク
export function SkipLinks() {
  return (
    <nav className="sr-only focus-within:not-sr-only">
      <a
        href="#main-content"
        className="absolute top-0 left-0 z-50 bg-primary-600 text-white px-4 py-2 rounded-br-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        メインコンテンツにスキップ
      </a>
      <a
        href="#navigation"
        className="absolute top-0 left-32 z-50 bg-primary-600 text-white px-4 py-2 rounded-br-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        ナビゲーションにスキップ
      </a>
    </nav>
  );
}

// ARIA対応のプログレスバー
interface AccessibleProgressProps {
  value: number;
  max?: number;
  label: string;
  className?: string;
}

export function AccessibleProgress({ value, max = 100, label, className = '' }: AccessibleProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={className}>
      <div className="flex justify-between text-sm text-gray-700 mb-2">
        <span>{label}</span>
        <span aria-label={`${percentage.toFixed(0)}パーセント完了`}>
          {percentage.toFixed(0)}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className="w-full bg-gray-200 rounded-full h-2 overflow-hidden"
      >
        <motion.div
          className="h-full bg-primary-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}