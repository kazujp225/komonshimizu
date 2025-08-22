'use client';

import { motion } from 'framer-motion';

const values = [
  {
    icon: '🎯',
    title: 'Mission Driven',
    description: '日本のIPOを再定義し、スタートアップの成功を加速させる',
  },
  {
    icon: '🚀',
    title: 'Speed & Quality',
    description: '圧倒的なスピードと品質の両立。妥協なき実行力',
  },
  {
    icon: '💡',
    title: 'Innovation First',
    description: '常識を疑い、新しい価値を創造する挑戦者精神',
  },
  {
    icon: '🤝',
    title: 'Team Work',
    description: '個性を活かし、チームで最高の成果を生み出す',
  },
  {
    icon: '📈',
    title: 'Growth Mindset',
    description: '失敗を恐れず、常に学び続ける成長志向',
  },
  {
    icon: '✨',
    title: 'Client Success',
    description: 'クライアントの成功が私たちの成功',
  },
];

export default function CareersCulture() {
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
            私たちの<span className="text-gradient">価値観</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            HANATABAは、これらの価値観を共有し、
            共に成長できる仲間を求めています
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Culture Images */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-3xl mb-2">🏢</div>
                <p className="font-semibold">モダンなオフィス</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-3xl mb-2">👥</div>
                <p className="font-semibold">チームワーク</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-3xl mb-2">🎉</div>
                <p className="font-semibold">イベント&交流</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}