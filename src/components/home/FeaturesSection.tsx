'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const features = [
  {
    id: 1,
    icon: '🎯',
    title: 'AI診断システム',
    description: '12の質問から、あなたのビジネスのIPO実現可能性を92%の精度で分析します。',
    details: [
      '5分で完了する簡単診断',
      '5段階での詳細評価',
      '具体的な改善提案を提供',
    ],
  },
  {
    id: 2,
    icon: '📊',
    title: 'IPO戦略設計',
    description: '業界・事業フェーズに応じた最適なIPOロードマップを策定し、段階的な成長を支援します。',
    details: [
      '3-7年の詳細計画策定',
      '資金調達ラウンドの設計',
      'マイルストーンの明確化',
    ],
  },
  {
    id: 3,
    icon: '🚀',
    title: '専門家チーム',
    description: 'IPO経験者、公認会計士、弁護士など各分野の専門家がチーム一丸となって支援します。',
    details: [
      'IPO経験者のメンタリング',
      '会計・法務の専門支援',
      '証券会社・監査法人の紹介',
    ],
  },
  {
    id: 4,
    icon: '⚡',
    title: '20代特化',
    description: '20代経営者の特徴を活かしたアプローチで、年齢をハンデではなく武器にします。',
    details: [
      'デジタルネイティブの強みを活用',
      'リスク許容度の最適化',
      '同世代ネットワークの提供',
    ],
  },
  {
    id: 5,
    icon: '🤖',
    title: 'AIによる最適化',
    description: 'リアルタイムデータ分析により、常に最適な戦略を提案し続けます。',
    details: [
      'マーケット動向の自動分析',
      'KPI予測と改善提案',
      '競合比較レポート',
    ],
  },
  {
    id: 6,
    icon: '🎓',
    title: '継続的な学習',
    description: '最新のIPO動向、成功事例、業界知識を継続的にアップデートして提供します。',
    details: [
      '週次レポート配信',
      'セミナー・ワークショップ',
      '成功事例の共有',
    ],
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            IPO実現を加速する
            <br className="md:hidden" />
            <span className="text-gradient">6つの特徴</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AIと専門家の知見を組み合わせ、20代経営者に特化した支援を提供します
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center text-sm text-gray-500">
                    <svg
                      className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Link
            href="/assessment"
            className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            これらの特徴を体験する
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            5分の診断で、あなたに最適なサポートを確認できます
          </p>
        </motion.div>
      </div>
    </section>
  );
}