'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAccessibility, AccessibilityPanel } from './AccessibilityHelpers';

interface AccessibilityToolbarProps {
  className?: string;
}

export function AccessibilityToolbar({ className = '' }: AccessibilityToolbarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const { 
    highContrast, 
    reducedMotion, 
    fontSize,
    toggleHighContrast,
    toggleReducedMotion,
    setFontSize
  } = useAccessibility();

  // キーボードショートカット
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + A でアクセシビリティツールバー表示切り替え
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        setIsVisible(prev => !prev);
      }
      
      // Alt + H でハイコントラスト切り替え
      if (e.altKey && e.key === 'h') {
        e.preventDefault();
        toggleHighContrast();
      }
      
      // Alt + R でアニメーション制御切り替え
      if (e.altKey && e.key === 'r') {
        e.preventDefault();
        toggleReducedMotion();
      }
      
      // Alt + + でフォントサイズアップ
      if (e.altKey && e.key === '+') {
        e.preventDefault();
        if (fontSize === 'normal') setFontSize('large');
        else if (fontSize === 'large') setFontSize('xl');
      }
      
      // Alt + - でフォントサイズダウン
      if (e.altKey && e.key === '-') {
        e.preventDefault();
        if (fontSize === 'xl') setFontSize('large');
        else if (fontSize === 'large') setFontSize('normal');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fontSize, toggleHighContrast, toggleReducedMotion, setFontSize]);

  if (!isVisible) {
    return (
      <motion.button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        whileHover={!reducedMotion ? { scale: 1.05 } : {}}
        whileTap={!reducedMotion ? { scale: 0.95 } : {}}
        aria-label="アクセシビリティツールバーを表示"
        title="Alt + A"
      >
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h.01M12 12h.01M7 16h.01" />
        </svg>
      </motion.button>
    );
  }

  return (
    <>
      <motion.div
        initial={!reducedMotion ? { opacity: 0, y: 20 } : {}}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed bottom-4 right-4 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 ${className}`}
      >
        {/* ツールバーヘッダー */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm font-medium text-gray-700">
              アクセシビリティ
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={isExpanded ? "ツールバーを折りたたむ" : "ツールバーを展開"}
            >
              <motion.svg 
                className="w-4 h-4 text-gray-600"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.2 }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
            
            <button
              onClick={() => setIsPanelOpen(true)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="詳細設定を開く"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            
            <button
              onClick={() => setIsVisible(false)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="ツールバーを非表示"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* クイック設定 */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={!reducedMotion ? { opacity: 0, height: 0 } : {}}
              animate={{ opacity: 1, height: 'auto' }}
              exit={!reducedMotion ? { opacity: 0, height: 0 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              className="p-4 space-y-3"
            >
              {/* ハイコントラスト */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">ハイコントラスト</span>
                <button
                  onClick={toggleHighContrast}
                  className={`
                    relative w-10 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500
                    ${highContrast ? 'bg-primary-600' : 'bg-gray-300'}
                  `}
                  aria-pressed={highContrast}
                  role="switch"
                  title="Alt + H"
                >
                  <motion.div
                    className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                    animate={{ x: highContrast ? 18 : 2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                </button>
              </div>

              {/* アニメーション制御 */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">アニメーション制御</span>
                <button
                  onClick={toggleReducedMotion}
                  className={`
                    relative w-10 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500
                    ${reducedMotion ? 'bg-primary-600' : 'bg-gray-300'}
                  `}
                  aria-pressed={reducedMotion}
                  role="switch"
                  title="Alt + R"
                >
                  <motion.div
                    className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                    animate={{ x: reducedMotion ? 18 : 2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                </button>
              </div>

              {/* フォントサイズ */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">フォントサイズ</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      if (fontSize === 'xl') setFontSize('large');
                      else if (fontSize === 'large') setFontSize('normal');
                    }}
                    disabled={fontSize === 'normal'}
                    className="w-6 h-6 flex items-center justify-center text-xs bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label="フォントサイズを小さく"
                    title="Alt + -"
                  >
                    A-
                  </button>
                  
                  <span className="text-xs text-gray-600 px-2">
                    {fontSize === 'normal' ? '標準' : fontSize === 'large' ? '大' : '特大'}
                  </span>
                  
                  <button
                    onClick={() => {
                      if (fontSize === 'normal') setFontSize('large');
                      else if (fontSize === 'large') setFontSize('xl');
                    }}
                    disabled={fontSize === 'xl'}
                    className="w-6 h-6 flex items-center justify-center text-xs bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label="フォントサイズを大きく"
                    title="Alt + +"
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* 音声読み上げ（Web Speech API対応ブラウザのみ） */}
              {typeof window !== 'undefined' && 'speechSynthesis' in window && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">音声読み上げ</span>
                  <SpeechControls />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ステータス表示 */}
        <div className="px-4 py-2 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${highContrast ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>コントラスト</span>
            </div>
            
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${reducedMotion ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>アニメーション</span>
            </div>
            
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${fontSize !== 'normal' ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>フォント</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 詳細設定パネル */}
      <AccessibilityPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
      />
    </>
  );
}

// 音声読み上げコントロール
function SpeechControls() {
  const [isReading, setIsReading] = useState(false);

  const startReading = () => {
    if ('speechSynthesis' in window) {
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        const text = mainContent.innerText || mainContent.textContent || '';
        const utterance = new SpeechSynthesisUtterance(text.slice(0, 1000)); // 最初の1000文字のみ
        
        utterance.onstart = () => setIsReading(true);
        utterance.onend = () => setIsReading(false);
        utterance.onerror = () => setIsReading(false);
        
        // 日本語に設定
        utterance.lang = 'ja-JP';
        utterance.rate = 0.8;
        
        speechSynthesis.speak(utterance);
      }
    }
  };

  const stopReading = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsReading(false);
    }
  };

  return (
    <button
      onClick={isReading ? stopReading : startReading}
      className="flex items-center gap-1 px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label={isReading ? "読み上げを停止" : "ページを読み上げ"}
    >
      {isReading ? (
        <>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          </svg>
          停止
        </>
      ) : (
        <>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
          読み上げ
        </>
      )}
    </button>
  );
}

export default AccessibilityToolbar;