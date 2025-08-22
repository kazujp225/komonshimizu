'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

const partnerCategories = [
  {
    id: 'audit',
    name: '監査法人',
    icon: '📊',
    description: '上場審査に対応する大手監査法人',
    partners: [
      {
        name: 'EY新日本有限責任監査法人',
        description: 'グローバルネットワークを活かした高品質な監査サービス',
        specialties: ['IPO監査', '内部統制監査', 'IFRS対応'],
        logo: '🏢',
      },
      {
        name: '有限責任監査法人トーマツ',
        description: '豊富なIPO支援実績と専門的なアドバイザリー',
        specialties: ['IPO準備支援', 'リスク管理', 'DX支援'],
        logo: '🏢',
      },
      {
        name: 'PwCあらた有限責任監査法人',
        description: '革新的な監査アプローチと総合的な支援',
        specialties: ['ESG対応', 'サイバーセキュリティ', 'グローバル展開'],
        logo: '🏢',
      },
      {
        name: '有限責任あずさ監査法人',
        description: '業界特化型の専門知識と実践的サポート',
        specialties: ['テクノロジー業界', 'ヘルスケア', '製造業'],
        logo: '🏢',
      },
    ],
  },
  {
    id: 'securities',
    name: '証券会社',
    icon: '📈',
    description: '主幹事証券として上場をリード',
    partners: [
      {
        name: '野村證券',
        description: '国内最大手の証券会社として豊富な実績',
        specialties: ['大型IPO', '海外展開支援', 'IR戦略'],
        logo: '🏦',
      },
      {
        name: '大和証券',
        description: '中堅・新興企業のIPOに強み',
        specialties: ['グロース市場', 'スタートアップ支援', '資本政策'],
        logo: '🏦',
      },
      {
        name: 'SMBC日興証券',
        description: '総合金融グループの強みを活かした支援',
        specialties: ['資金調達', 'M&A', 'ウェルスマネジメント'],
        logo: '🏦',
      },
      {
        name: 'みずほ証券',
        description: 'きめ細かいサポートと柔軟な対応',
        specialties: ['地方企業IPO', '事業承継', 'ESG投資'],
        logo: '🏦',
      },
    ],
  },
  {
    id: 'vc',
    name: 'ベンチャーキャピタル',
    icon: '💰',
    description: '成長資金の提供と経営支援',
    partners: [
      {
        name: 'グロービス・キャピタル・パートナーズ',
        description: '日本最大級の独立系VC',
        specialties: ['シリーズA-C', 'SaaS', 'ディープテック'],
        logo: '💎',
      },
      {
        name: 'インキュベイトファンド',
        description: 'シード・アーリーステージに特化',
        specialties: ['起業家支援', 'グローバル展開', 'Web3'],
        logo: '💎',
      },
      {
        name: 'DNX Ventures',
        description: 'B2B SaaSに特化したグローバルVC',
        specialties: ['エンタープライズ', 'クラウド', 'AI/ML'],
        logo: '💎',
      },
      {
        name: 'JAFCO',
        description: '日本最古参のVCとして豊富な実績',
        specialties: ['レイター投資', 'IPO支援', 'バイアウト'],
        logo: '💎',
      },
    ],
  },
  {
    id: 'legal',
    name: '法律事務所',
    icon: '⚖️',
    description: 'IPO関連の法務サポート',
    partners: [
      {
        name: '西村あさひ法律事務所',
        description: '日本最大級の総合法律事務所',
        specialties: ['証券法務', 'コーポレートガバナンス', 'M&A'],
        logo: '⚖️',
      },
      {
        name: 'TMI総合法律事務所',
        description: 'テクノロジー分野に強み',
        specialties: ['知的財産', 'データ保護', 'スタートアップ法務'],
        logo: '⚖️',
      },
      {
        name: '森・濱田松本法律事務所',
        description: '資本市場案件のトップティア',
        specialties: ['資本政策', 'ストックオプション', '開示規制'],
        logo: '⚖️',
      },
    ],
  },
  {
    id: 'consulting',
    name: 'コンサルティング',
    icon: '🎯',
    description: '経営戦略・業務改善支援',
    partners: [
      {
        name: 'デロイト トーマツ コンサルティング',
        description: '総合的な経営コンサルティング',
        specialties: ['DX戦略', '組織変革', 'リスク管理'],
        logo: '📋',
      },
      {
        name: 'PwCコンサルティング',
        description: 'デジタル時代の変革支援',
        specialties: ['AI活用', 'サステナビリティ', 'サプライチェーン'],
        logo: '📋',
      },
      {
        name: 'EYストラテジー・アンド・コンサルティング',
        description: '成長戦略と実行支援',
        specialties: ['新規事業', '海外展開', 'PMI'],
        logo: '📋',
      },
    ],
  },
];

export default function PartnersList() {
  const [activeCategory, setActiveCategory] = useState('audit');

  const activePartners = partnerCategories.find(cat => cat.id === activeCategory);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {partnerCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Category Description */}
          {activePartners && (
            <motion.div
              key={activePartners.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {activePartners.name}パートナー
              </h2>
              <p className="text-gray-600">
                {activePartners.description}
              </p>
            </motion.div>
          )}

          {/* Partners Grid */}
          {activePartners && (
            <motion.div
              key={activePartners.id}
              className="grid md:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {activePartners.partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      {partner.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {partner.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {partner.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {partner.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" size="sm">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Partnership Benefits */}
          <motion.div
            className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              パートナーシップのメリット
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  🚀
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  スピーディーな対応
                </h4>
                <p className="text-sm text-gray-600">
                  事前連携により、通常より30%短い期間でIPO準備が可能
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  💡
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  ワンストップサービス
                </h4>
                <p className="text-sm text-gray-600">
                  必要な専門家をすべて紹介、窓口一本化で効率的
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  🎯
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  最適なマッチング
                </h4>
                <p className="text-sm text-gray-600">
                  企業規模・業界に応じた最適なパートナーを選定
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}