'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

const newsItems = [
  {
    id: 1,
    type: 'プレスリリース',
    title: 'シリーズA資金調達完了のお知らせ',
    excerpt: '総額10億円の資金調達を実施し、IPO支援サービスの拡充と新機能開発を加速します。',
    date: '2024年1月15日',
    category: '資金調達',
    isLatest: true,
  },
  {
    id: 2,
    type: 'メディア掲載',
    title: '日経新聞にCEOインタビューが掲載されました',
    excerpt: 'IPO支援の現状と今後の展望について、代表取締役CEOが語りました。',
    date: '2024年1月10日',
    category: 'メディア',
    isLatest: false,
  },
  {
    id: 3,
    type: 'サービス',
    title: 'AI診断ツール「IPO Compass」正式リリース',
    excerpt: '独自のAI技術を活用したIPO準備状況診断ツールの提供を開始しました。',
    date: '2024年1月5日',
    category: 'プロダクト',
    isLatest: false,
  },
  {
    id: 4,
    type: 'イベント',
    title: 'IPOセミナー「上場への道筋」開催報告',
    excerpt: '経営者100名が参加したIPOセミナーが盛況のうちに終了しました。',
    date: '2023年12月20日',
    category: 'イベント',
    isLatest: false,
  },
  {
    id: 5,
    type: 'プレスリリース',
    title: '監査法人・証券会社との提携拡大',
    excerpt: '新たに5社との戦略的パートナーシップを締結し、サービス提供範囲を拡大しました。',
    date: '2023年12月15日',
    category: 'パートナーシップ',
    isLatest: false,
  },
  {
    id: 6,
    type: 'サービス',
    title: '新プラン「IPO Premium」提供開始',
    excerpt: '大型IPOを目指す企業向けのプレミアムサポートプランの提供を開始しました。',
    date: '2023年12月10日',
    category: 'プロダクト',
    isLatest: false,
  },
  {
    id: 7,
    type: 'メディア掲載',
    title: 'TechCrunchに当社サービスが紹介されました',
    excerpt: 'IPO支援の革新的なアプローチについて、海外メディアでも注目を集めています。',
    date: '2023年12月5日',
    category: 'メディア',
    isLatest: false,
  },
  {
    id: 8,
    type: 'プレスリリース',
    title: '累計支援企業数100社突破',
    excerpt: 'サービス開始から3年で、100社のIPO準備支援を達成しました。',
    date: '2023年12月1日',
    category: 'マイルストーン',
    isLatest: false,
  },
];

const categories = [
  { id: 'all', name: 'すべて' },
  { id: '資金調達', name: '資金調達' },
  { id: 'プロダクト', name: 'プロダクト' },
  { id: 'メディア', name: 'メディア' },
  { id: 'イベント', name: 'イベント' },
  { id: 'パートナーシップ', name: 'パートナーシップ' },
];

export default function NewsList() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredNews = newsItems.filter(
    item => selectedCategory === 'all' || item.category === selectedCategory
  );

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const currentItems = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* News List */}
          <div className="space-y-4">
            {currentItems.map((item, index) => (
              <motion.article
                key={item.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        variant={item.type === 'プレスリリース' ? 'info' : 
                                item.type === 'メディア掲載' ? 'success' : 
                                item.type === 'サービス' ? 'warning' : 'secondary'} 
                        size="sm"
                      >
                        {item.type}
                      </Badge>
                      {item.isLatest && (
                        <Badge variant="success" size="sm">New</Badge>
                      )}
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 cursor-pointer">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3">
                      {item.excerpt}
                    </p>

                    <Badge variant="secondary" size="sm">
                      {item.category}
                    </Badge>
                  </div>

                  <div className="flex-shrink-0">
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
                      詳細を見る
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                前へ
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    currentPage === page
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                次へ
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}