'use client';

import { motion } from 'framer-motion';

export default function ServicesHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            IPO実現への
            <span className="text-gradient">トータルソリューション</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            戦略立案から実行まで、上場準備のすべてのフェーズで
            <br />
            プロフェッショナルチームが伴走支援します
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {[
              { icon: '📊', label: '内部統制', desc: 'J-SOX対応' },
              { icon: '💰', label: '資金調達', desc: 'VC/PE紹介' },
              { icon: '📈', label: 'IR戦略', desc: '投資家対応' },
              { icon: '🤖', label: 'AI分析', desc: '成長予測' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="bg-white rounded-lg p-4 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-semibold text-gray-900">{item.label}</div>
                <div className="text-xs text-gray-600">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}