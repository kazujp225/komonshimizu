'use client';

import { motion } from 'framer-motion';

export default function FAQHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            よくある質問
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            IPO準備に関する疑問にお答えします
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-primary-600">200+</div>
              <div className="text-sm text-gray-600">回答済み質問</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-primary-600">24h</div>
              <div className="text-sm text-gray-600">返答時間</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-primary-600">98%</div>
              <div className="text-sm text-gray-600">満足度</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}