'use client';

import { motion } from 'framer-motion';

const benefits = [
  {
    category: '報酬・評価',
    icon: '💰',
    items: [
      '業界トップクラスの給与水準',
      '年2回の昇給機会',
      'インセンティブ制度',
      'ストックオプション制度',
    ],
  },
  {
    category: '働き方',
    icon: '🏖️',
    items: [
      'フレックスタイム制',
      'リモートワーク可',
      '年間休日125日以上',
      '有給取得率90%以上',
    ],
  },
  {
    category: '成長支援',
    icon: '📚',
    items: [
      '書籍購入費全額補助',
      '資格取得支援制度',
      '外部研修参加費補助',
      'メンター制度',
    ],
  },
  {
    category: '健康・福利厚生',
    icon: '🏥',
    items: [
      '社会保険完備',
      '健康診断・人間ドック',
      'ジム利用補助',
      '産休・育休制度',
    ],
  },
  {
    category: 'オフィス環境',
    icon: '🏢',
    items: [
      '最新設備のオフィス',
      'フリードリンク・スナック',
      '昼寝スペース完備',
      '社内ライブラリー',
    ],
  },
  {
    category: 'イベント・交流',
    icon: '🎉',
    items: [
      '月1回のチームビルディング',
      '四半期ごとの全社イベント',
      '社内勉強会',
      '懇親会費補助',
    ],
  },
];

export default function CareersBenefits() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            充実の<span className="text-gradient">福利厚生</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            社員が最高のパフォーマンスを発揮できる環境を提供します
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {benefit.category}
                </h3>
              </div>
              <ul className="space-y-2">
                {benefit.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Employee Testimonials */}
        <motion.div
          className="mt-16 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            社員の声
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div>
                  <div className="font-semibold text-gray-900">A.K</div>
                  <div className="text-sm text-gray-600">コンサルタント・2年目</div>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                「若手でも大きな裁量を持って仕事ができ、成長スピードが圧倒的に速い環境です。」
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div>
                  <div className="font-semibold text-gray-900">M.T</div>
                  <div className="text-sm text-gray-600">マネージャー・4年目</div>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                「フレックスとリモートワークで、ライフワークバランスを保ちながら働けています。」
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <div>
                  <div className="font-semibold text-gray-900">S.Y</div>
                  <div className="text-sm text-gray-600">エンジニア・3年目</div>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                「最新技術に触れられ、自分のアイデアがすぐに形になる刺激的な職場です。」
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}