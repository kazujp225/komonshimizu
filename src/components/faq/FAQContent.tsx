'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Accordion } from '@/components/ui/TabsAccordion';

const faqCategories = [
  {
    category: 'サービス全般',
    items: [
      {
        id: 'service-1',
        title: 'HANATABAの特徴は何ですか？',
        content: '上場企業の現役CEOが直接支援することが最大の特徴です。26歳でIPOを達成し、42社の上場支援実績を持つ経営者が、実体験に基づいた具体的なアドバイスを提供します。',
      },
      {
        id: 'service-2',
        title: 'どのような企業が対象ですか？',
        content: 'IPOを目指すすべての企業が対象です。創業直後のスタートアップから、具体的に上場準備を進めている企業まで、ステージに応じた最適なサポートを提供します。',
      },
      {
        id: 'service-3',
        title: 'オンラインでのサポートは可能ですか？',
        content: 'はい、完全オンライン対応可能です。Zoom等を活用し、全国どこからでもサービスを受けていただけます。必要に応じて対面でのミーティングも実施しています。',
      },
    ],
  },
  {
    category: '料金・契約',
    items: [
      {
        id: 'pricing-1',
        title: '初期費用はかかりますか？',
        content: '成功報酬型プランでは初期費用0円でスタート可能です。月額プランも初月50%OFFキャンペーンを実施中です。詳細は料金ページをご確認ください。',
      },
      {
        id: 'pricing-2',
        title: '契約期間の縛りはありますか？',
        content: '最短3ヶ月からご契約いただけます。また、3ヶ月の満足保証期間を設けており、万が一ご満足いただけない場合は全額返金いたします。',
      },
      {
        id: 'pricing-3',
        title: '追加料金は発生しますか？',
        content: '基本サービスの範囲内であれば追加料金は発生しません。特別なプロジェクトや追加サービスをご希望の場合は、事前にお見積りをご提示します。',
      },
    ],
  },
  {
    category: 'IPO準備',
    items: [
      {
        id: 'ipo-1',
        title: 'IPOまでにどのくらいの期間が必要ですか？',
        content: '企業の状況により異なりますが、一般的には2〜3年程度の準備期間が必要です。内部統制の構築状況や業績により、より短期間での上場も可能です。',
      },
      {
        id: 'ipo-2',
        title: '内部統制構築はどのように進めますか？',
        content: 'J-SOX対応を含む内部統制を段階的に構築します。まず現状分析を行い、必要な規程類の整備、業務フローの文書化、リスク評価を順次実施していきます。',
      },
      {
        id: 'ipo-3',
        title: '監査法人の選定はサポートしてもらえますか？',
        content: 'はい、企業規模や業種に応じた最適な監査法人をご紹介します。複数の監査法人との面談設定から、選定基準の策定までトータルでサポートします。',
      },
    ],
  },
  {
    category: '資金調達',
    items: [
      {
        id: 'funding-1',
        title: 'VCからの資金調達は支援してもらえますか？',
        content: '事業計画の策定からピッチ資料作成、投資家とのマッチング、交渉まで一貫してサポートします。独自のネットワークから最適な投資家をご紹介します。',
      },
      {
        id: 'funding-2',
        title: 'バリュエーションはどのように算定しますか？',
        content: '業界標準の手法（DCF法、類似企業比較法等）を用いて適正なバリュエーションを算定します。投資家との交渉においても有利な条件を引き出すサポートをします。',
      },
      {
        id: 'funding-3',
        title: '銀行借入のサポートもありますか？',
        content: 'はい、金融機関からの資金調達もサポートしています。事業計画書の作成から金融機関との交渉まで、豊富な実績に基づいた支援を提供します。',
      },
    ],
  },
];

export default function FAQContent() {
  const [activeCategory, setActiveCategory] = useState('サービス全般');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    items: cat.items.filter(
      item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(cat => cat.items.length > 0);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
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
                placeholder="質問を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            className="flex flex-wrap gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {faqCategories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeCategory === cat.category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {searchQuery ? (
              // Show all matching items when searching
              filteredCategories.map((cat) => (
                <div key={cat.category} className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {cat.category}
                  </h3>
                  <Accordion
                    items={cat.items}
                    variant="bordered"
                    allowMultiple
                  />
                </div>
              ))
            ) : (
              // Show only active category when not searching
              <Accordion
                items={faqCategories.find(c => c.category === activeCategory)?.items || []}
                variant="separated"
                allowMultiple
              />
            )}
          </motion.div>

          {/* No Results */}
          {searchQuery && filteredCategories.length === 0 && (
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
              <p className="text-gray-600">
                「{searchQuery}」に関する質問は見つかりませんでした
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                検索をクリア
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}