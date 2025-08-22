'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

export default function ResourcesHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge variant="info" size="lg" className="mb-6">
            📚 無料ダウンロード資料
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            IPO準備の
            <span className="text-gradient">実践ツール</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            上場企業42社の支援実績から生まれた
            <br />
            実践的な資料とテンプレートを無料提供
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-3xl font-bold text-primary-600">50+</div>
              <div className="text-sm text-gray-600">資料・ツール</div>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-3xl font-bold text-primary-600">10万</div>
              <div className="text-sm text-gray-600">ダウンロード数</div>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-3xl font-bold text-primary-600">4.8</div>
              <div className="text-sm text-gray-600">平均評価</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}