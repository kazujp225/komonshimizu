'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Modal } from './Modal';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'page' | 'blog' | 'case-study' | 'help';
  icon?: string;
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    title: 'IPO準備の5分診断',
    description: 'あなたの企業のIPO準備状況を無料で診断',
    url: '/assessment',
    type: 'page',
    icon: '📊',
  },
  {
    id: '2',
    title: '料金プラン',
    description: '3つのプランから最適なものをお選びください',
    url: '/pricing',
    type: 'page',
    icon: '💰',
  },
  {
    id: '3',
    title: 'シリーズAで10億円調達に成功',
    description: 'AIスタートアップの資金調達成功事例',
    url: '/case-studies/1',
    type: 'case-study',
    icon: '🎯',
  },
  {
    id: '4',
    title: 'IPO準備の基本ステップ',
    description: '上場準備に必要な10のステップを解説',
    url: '/blog/1',
    type: 'blog',
    icon: '📝',
  },
  {
    id: '5',
    title: '会社概要',
    description: 'HANATABAについて',
    url: '/about',
    type: 'page',
    icon: '🏢',
  },
];

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Search logic
  useEffect(() => {
    if (query.trim()) {
      const filtered = mockSearchResults.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          router.push(results[selectedIndex].url);
          onClose();
        }
        break;
      case 'Escape':
        onClose();
        break;
    }
  }, [isOpen, results, selectedIndex, router, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const typeColors = {
    page: 'bg-blue-100 text-blue-800',
    blog: 'bg-green-100 text-green-800',
    'case-study': 'bg-purple-100 text-purple-800',
    help: 'bg-yellow-100 text-yellow-800',
  };

  const typeLabels = {
    page: 'ページ',
    blog: 'ブログ',
    'case-study': '事例',
    help: 'ヘルプ',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Search Modal */}
          <div className="fixed inset-x-0 top-20 z-50 px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mx-auto max-w-2xl"
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
                {/* Search Input */}
                <div className="border-b border-gray-200 p-4">
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="検索..."
                      className="w-full rounded-lg border-0 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      autoFocus
                    />
                    {query && (
                      <button
                        onClick={() => setQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Search Results */}
                <div className="max-h-96 overflow-y-auto">
                  {results.length > 0 ? (
                    <div className="p-2">
                      {results.map((result, index) => (
                        <button
                          key={result.id}
                          onClick={() => {
                            router.push(result.url);
                            onClose();
                          }}
                          className={`w-full rounded-lg p-3 text-left transition-colors ${
                            index === selectedIndex
                              ? 'bg-primary-50 border border-primary-200'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{result.icon}</span>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium text-gray-900">
                                  {result.title}
                                </h3>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[result.type]}`}>
                                  {typeLabels[result.type]}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">
                                {result.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : query ? (
                    <div className="p-8 text-center text-gray-500">
                      「{query}」に一致する結果が見つかりません
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      検索キーワードを入力してください
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1">
                        <kbd className="rounded bg-gray-200 px-1.5 py-0.5 font-mono">↑↓</kbd>
                        選択
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="rounded bg-gray-200 px-1.5 py-0.5 font-mono">Enter</kbd>
                        開く
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="rounded bg-gray-200 px-1.5 py-0.5 font-mono">Esc</kbd>
                        閉じる
                      </span>
                    </div>
                    <div>
                      {results.length > 0 && (
                        <span>{results.length}件の結果</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// Search Trigger Button
export function SearchTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 hover:border-gray-400 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">検索</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono text-gray-500">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <GlobalSearch isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}