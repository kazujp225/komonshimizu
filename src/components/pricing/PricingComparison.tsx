'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Tooltip } from '@/components/ui/Tooltip';

const features = [
  { category: '基本機能', items: [
    { name: 'IPO準備診断', starter: true, pro: true, enterprise: true },
    { name: '月次レポート', starter: true, pro: true, enterprise: true },
    { name: '専属担当者', starter: false, pro: true, enterprise: true },
    { name: 'オンラインサポート', starter: '営業時間内', pro: '24時間', enterprise: '24時間' },
  ]},
  { category: 'コンサルティング', items: [
    { name: 'CEOメンタリング', starter: false, pro: '月1回', enterprise: '週1回' },
    { name: '事業計画策定支援', starter: false, pro: true, enterprise: true },
    { name: '資金調達支援', starter: false, pro: '基本', enterprise: '完全サポート' },
    { name: 'IR戦略立案', starter: false, pro: false, enterprise: true },
  ]},
  { category: '実務支援', items: [
    { name: '内部統制構築', starter: 'テンプレート', pro: 'カスタマイズ', enterprise: '完全構築' },
    { name: '監査法人紹介', starter: false, pro: true, enterprise: true },
    { name: '証券会社紹介', starter: false, pro: true, enterprise: true },
    { name: '役員研修', starter: false, pro: '年2回', enterprise: '無制限' },
  ]},
  { category: 'AI機能', items: [
    { name: 'AI財務分析', starter: '基本', pro: '高度', enterprise: 'カスタム' },
    { name: 'リスク予測', starter: false, pro: true, enterprise: true },
    { name: '競合分析', starter: false, pro: '四半期', enterprise: 'リアルタイム' },
    { name: '成長シミュレーション', starter: false, pro: false, enterprise: true },
  ]},
];

export default function PricingComparison() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('基本機能');

  const renderValue = (value: boolean | string) => {
    if (value === true) {
      return (
        <svg className="w-6 h-6 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    } else if (value === false) {
      return (
        <svg className="w-6 h-6 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    } else {
      return <span className="text-sm font-medium text-gray-700">{value}</span>;
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            詳細機能比較
          </h2>
          <p className="text-lg text-gray-600">
            各プランの機能を詳しく比較して、最適なプランをお選びください
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
              <div className="p-4 md:p-6 font-semibold text-sm md:text-base">機能</div>
              <div className="p-4 md:p-6 text-center">
                <div className="font-semibold text-sm md:text-base mb-1">Starter</div>
                <div className="text-xs md:text-sm opacity-90">基本プラン</div>
              </div>
              <div className="p-4 md:p-6 text-center">
                <div className="inline-block bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full mb-1">
                  人気
                </div>
                <div className="font-semibold text-sm md:text-base">Professional</div>
                <div className="text-xs md:text-sm opacity-90">標準プラン</div>
              </div>
              <div className="p-4 md:p-6 text-center">
                <div className="font-semibold text-sm md:text-base mb-1">Enterprise</div>
                <div className="text-xs md:text-sm opacity-90">完全サポート</div>
              </div>
            </div>

            {/* Table Body */}
            {features.map((category) => (
              <div key={category.category}>
                {/* Category Header */}
                <button
                  onClick={() => setExpandedCategory(
                    expandedCategory === category.category ? null : category.category
                  )}
                  className="w-full grid grid-cols-4 bg-gray-50 hover:bg-gray-100 transition-colors border-t border-gray-200"
                >
                  <div className="p-4 font-semibold text-gray-900 flex items-center">
                    <svg
                      className={`w-5 h-5 mr-2 transform transition-transform ${
                        expandedCategory === category.category ? 'rotate-90' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {category.category}
                  </div>
                  <div className="p-4"></div>
                  <div className="p-4"></div>
                  <div className="p-4"></div>
                </button>

                {/* Category Items */}
                {expandedCategory === category.category && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {category.items.map((item, index) => (
                      <div
                        key={item.name}
                        className={`grid grid-cols-4 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        } border-t border-gray-200`}
                      >
                        <div className="p-4 text-sm text-gray-700 flex items-center">
                          {item.name}
                          <Tooltip content="詳細情報">
                            <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </Tooltip>
                        </div>
                        <div className="p-4 text-center">{renderValue(item.starter)}</div>
                        <div className="p-4 text-center bg-primary-50/30">{renderValue(item.pro)}</div>
                        <div className="p-4 text-center">{renderValue(item.enterprise)}</div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}

            {/* Footer CTA */}
            <div className="grid grid-cols-4 bg-gray-100 border-t-2 border-gray-200">
              <div className="p-6"></div>
              <div className="p-6">
                <button className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  選択する
                </button>
              </div>
              <div className="p-6">
                <button className="w-full py-2 px-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg hover:shadow-lg transition-all">
                  選択する
                </button>
              </div>
              <div className="p-6">
                <button className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  お問い合わせ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}