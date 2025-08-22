'use client';

import { motion } from 'framer-motion';

const guarantees = [
  {
    icon: '💰',
    title: '返金保証',
    description: '3ヶ月以内にご満足いただけない場合、全額返金いたします',
    details: '契約から90日以内',
  },
  {
    icon: '🎯',
    title: '成果保証',
    description: 'KPI達成できない場合、追加コンサルティングを無償提供',
    details: '目標未達成時',
  },
  {
    icon: '🔒',
    title: '価格保証',
    description: '契約期間中の料金値上げなし。初回契約価格を維持',
    details: '最大3年間固定',
  },
  {
    icon: '⚡',
    title: '即日対応保証',
    description: '緊急の相談には24時間以内に専門家が対応',
    details: '365日サポート',
  },
];

export default function PricingGuarantee() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            安心の4つの保証
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            HANATABAは結果にコミットします。
            ご満足いただけるまで、全力でサポートいたします。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={guarantee.title}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{guarantee.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {guarantee.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {guarantee.description}
              </p>
              <div className="inline-flex items-center px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold">
                {guarantee.details}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-8 p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">98%</div>
              <div className="text-sm text-gray-600">顧客満足度</div>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">92%</div>
              <div className="text-sm text-gray-600">IPO成功率</div>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">42社</div>
              <div className="text-sm text-gray-600">支援実績</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}