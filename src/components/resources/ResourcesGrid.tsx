'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/TabsAccordion';

const categories = [
  { id: 'all', label: 'すべて' },
  { id: 'checklist', label: 'チェックリスト' },
  { id: 'template', label: 'テンプレート' },
  { id: 'guide', label: 'ガイド' },
  { id: 'whitepaper', label: 'ホワイトペーパー' },
  { id: 'video', label: '動画' },
];

const resources = [
  {
    id: 1,
    category: 'checklist',
    type: 'PDF',
    title: 'IPO準備チェックリスト',
    description: '上場準備に必要な100項目を網羅した実践的チェックリスト',
    downloadCount: 15000,
    rating: 4.9,
    pages: 25,
    badge: '人気No.1',
    featured: true,
  },
  {
    id: 2,
    category: 'template',
    type: 'Excel',
    title: '事業計画テンプレート',
    description: 'VCや証券会社に提出できる3ヵ年事業計画のExcelテンプレート',
    downloadCount: 12000,
    rating: 4.8,
    pages: 15,
    badge: '更新版',
  },
  {
    id: 3,
    category: 'guide',
    type: 'PDF',
    title: '内部統制構築ガイド',
    description: 'J-SOX対応を含む内部統制の構築手順を詳しく解説',
    downloadCount: 8500,
    rating: 4.7,
    pages: 48,
  },
  {
    id: 4,
    category: 'whitepaper',
    type: 'PDF',
    title: '資金調達戦略レポート2024',
    description: '最新の資金調達トレンドとVCの投資動向を分析',
    downloadCount: 6200,
    rating: 4.9,
    pages: 32,
    badge: 'New',
    featured: true,
  },
  {
    id: 5,
    category: 'template',
    type: 'PowerPoint',
    title: 'ピッチデッキテンプレート',
    description: '投資家向けプレゼン資料の完全版テンプレート',
    downloadCount: 9800,
    rating: 4.8,
    pages: 20,
  },
  {
    id: 6,
    category: 'video',
    type: 'Video',
    title: 'IPO実現への道のり（全5回）',
    description: '上場企業CEOが語るIPO準備の実践ノウハウ',
    downloadCount: 5500,
    rating: 4.9,
    pages: 0,
    duration: '2時間30分',
    badge: '限定公開',
  },
  {
    id: 7,
    category: 'checklist',
    type: 'PDF',
    title: '監査法人選定チェックリスト',
    description: '監査法人選びのポイントと評価基準',
    downloadCount: 4200,
    rating: 4.6,
    pages: 12,
  },
  {
    id: 8,
    category: 'guide',
    type: 'PDF',
    title: 'IR戦略ハンドブック',
    description: '上場前後のIR活動の進め方と注意点',
    downloadCount: 3800,
    rating: 4.7,
    pages: 35,
  },
];

export default function ResourcesGrid() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Search and Filter */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
                  placeholder="資料を検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Sort */}
            <select className="px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option>人気順</option>
              <option>新着順</option>
              <option>評価順</option>
              <option>ダウンロード数順</option>
            </select>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                resource.featured ? 'ring-2 ring-primary-500' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      resource.type === 'PDF' ? 'bg-red-100 text-red-600' :
                      resource.type === 'Excel' ? 'bg-green-100 text-green-600' :
                      resource.type === 'PowerPoint' ? 'bg-orange-100 text-orange-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {resource.type}
                    </span>
                    {resource.badge && (
                      <Badge variant={resource.badge === 'New' ? 'success' : 'warning'} size="sm">
                        {resource.badge}
                      </Badge>
                    )}
                  </div>
                  {resource.featured && (
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {resource.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  {resource.pages > 0 && (
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {resource.pages}ページ
                    </span>
                  )}
                  {resource.duration && (
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {resource.duration}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    {resource.downloadCount.toLocaleString()}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(resource.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{resource.rating}</span>
                </div>

                {/* Download Button */}
                <button className="w-full py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  無料ダウンロード
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 mb-4">
              該当する資料が見つかりませんでした
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              フィルターをクリア
            </button>
          </div>
        )}
      </div>
    </section>
  );
}