'use client';

import { motion } from 'framer-motion';

const benefits = [
  {
    icon: '🎯',
    title: '実績に基づくアドバイス',
    description: '26歳でIPOを達成し、42社の上場支援実績を持つCEOが直接対応',
  },
  {
    icon: '📊',
    title: '具体的な成長戦略',
    description: '年商1億円から10億円への成長ロードマップを明確に提示',
  },
  {
    icon: '🚀',
    title: '即実行可能な施策',
    description: '明日から実践できる具体的なアクションプランを提供',
  },
  {
    icon: '💰',
    title: '資金調達ノウハウ',
    description: 'VCとの交渉術や適切なバリュエーション設定方法を伝授',
  },
  {
    icon: '📈',
    title: '内部統制の構築',
    description: 'J-SOX対応を含む上場基準を満たす体制づくりをサポート',
  },
  {
    icon: '🤝',
    title: '人脈の活用',
    description: '監査法人、証券会社、VCなど必要な関係者をご紹介',
  },
];

export default function ConsultationBenefits() {
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
            無料相談で得られる
            <span className="text-gradient">6つの価値</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            60分の相談で、IPO実現への道筋が明確になります
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Process Steps */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            相談の流れ
          </h3>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { step: '1', title: '予約', desc: 'フォームから申込' },
              { step: '2', title: '日程調整', desc: '24時間以内に連絡' },
              { step: '3', title: '相談実施', desc: '60分間の個別相談' },
              { step: '4', title: 'フォロー', desc: '資料送付&次回提案' },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-6 left-full w-full">
                    <svg className="w-full h-0.5">
                      <line
                        x1="0"
                        y1="0"
                        x2="100%"
                        y2="0"
                        stroke="#D63E6C"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}