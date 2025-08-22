'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { getCaseStudies } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function CaseStudiesList() {
  const caseStudies = getCaseStudies();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Filter/Search Section (Future Enhancement) */}
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-wrap justify-center gap-3">
          {['すべて', 'AI・テクノロジー', 'クリーンテック', 'ヘルスケア', 'フィンテック'].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'すべて'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-primary-300 hover:text-primary-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Case Studies Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {caseStudies.map((study, index) => (
          <motion.article
            key={study.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            whileHover={{ y: -5 }}
          >
            <Link href={`/case-studies/${study.id}`}>
              {/* Header Image/Pattern */}
              <div className="h-48 bg-gradient-to-br from-primary-100 to-accent-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10" />
                <div className="absolute top-6 left-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 text-right">
                  <div className="text-white/80 text-sm font-medium mb-1">
                    {study.company.industry}
                  </div>
                  <div className="text-white text-lg font-bold">
                    IPO達成
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Company Info */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {study.subtitle}
                    </p>
                    <div className="text-sm text-gray-500">
                      {study.company.name}
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-primary-600 mb-1">
                      {study.founder.ageAtIPO}歳
                    </div>
                    <div className="text-xs text-gray-600">IPO時年齢</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-primary-600 mb-1">
                      {formatCurrency(study.company.currentMarketCap)}
                    </div>
                    <div className="text-xs text-gray-600">時価総額</div>
                  </div>
                </div>

                {/* Founder Info */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {study.founder.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {study.founder.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      創業者・代表取締役CEO
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-500">
                      創業: {formatDate(study.company.founded)}
                    </div>
                    <div className="text-primary-600 font-semibold">
                      IPO: {formatDate(study.company.ipoDate)}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 text-primary-800">
                    {study.company.industry}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                    IPO達成
                  </span>
                  {study.founder.ageAtIPO <= 30 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                      20代経営者
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {study.views.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      {study.shares}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {study.downloads}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* Load More / Pagination */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <button className="bg-white border-2 border-gray-300 hover:border-primary-600 text-gray-700 hover:text-primary-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:bg-primary-50">
          さらに読み込む
        </button>
        <p className="text-sm text-gray-500 mt-4">
          {caseStudies.length}件中 {caseStudies.length}件を表示
        </p>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="mt-20 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3 className="text-2xl font-bold mb-4">
          あなたも次の成功事例になりませんか？
        </h3>
        <p className="text-lg opacity-90 mb-6">
          まずは5分間の無料診断で、あなたのIPO実現可能性をチェックしましょう
        </p>
        <Link
          href="/assessment"
          className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          無料診断を開始
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}