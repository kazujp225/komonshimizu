'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    id: 'ipo-consulting',
    category: 'コンサルティング',
    title: 'IPO総合コンサルティング',
    description: '上場準備の全体設計から実行まで、経験豊富なコンサルタントが伴走支援',
    features: [
      'IPOスケジュール策定',
      '上場申請書類作成支援',
      '証券会社・監査法人選定',
      '上場審査対応',
    ],
    icon: '🎯',
    color: 'from-primary-500 to-primary-600',
  },
  {
    id: 'internal-control',
    category: '内部統制',
    title: '内部統制構築支援',
    description: 'J-SOX対応を含む内部統制システムの設計・構築・運用を支援',
    features: [
      '業務フロー整備',
      'リスク評価・対応',
      '規程類整備',
      '内部監査体制構築',
    ],
    icon: '🔒',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'fundraising',
    category: '資金調達',
    title: '資金調達支援',
    description: 'VC/PE、金融機関からの資金調達を戦略立案から実行まで支援',
    features: [
      '事業計画策定',
      '投資家マッチング',
      'ピッチ資料作成',
      'バリュエーション算定',
    ],
    icon: '💰',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'ir-strategy',
    category: 'IR戦略',
    title: 'IR戦略立案・実行',
    description: '上場前後のIR活動を戦略的に設計し、企業価値向上を実現',
    features: [
      'エクイティストーリー作成',
      '投資家向け資料作成',
      'ロードショー支援',
      '決算説明会運営',
    ],
    icon: '📢',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'cfo-service',
    category: '経営管理',
    title: 'CFO代行サービス',
    description: '上場企業レベルの財務・経理体制を構築し、CFO機能を提供',
    features: [
      '月次決算早期化',
      '予実管理体制構築',
      'KPI設計・モニタリング',
      '取締役会資料作成',
    ],
    icon: '👔',
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: 'ai-analytics',
    category: 'テクノロジー',
    title: 'AI経営分析',
    description: '最新のAI技術を活用し、成長戦略の立案と実行を支援',
    features: [
      '成長予測モデル構築',
      '競合分析・市場分析',
      'リスク予測・対策',
      'オペレーション最適化',
    ],
    icon: '🤖',
    color: 'from-accent-500 to-accent-600',
  },
];

export default function ServicesList() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            提供サービス
          </h2>
          <p className="text-lg text-gray-600">
            あなたのステージに合わせた最適なサービスを提供します
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Service Header */}
              <div className={`h-2 bg-gradient-to-r ${service.color}`} />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {service.category}
                  </span>
                  <span className="text-3xl">{service.icon}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm">
                      <svg
                        className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={`/services/${service.id}`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  詳細を見る
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}