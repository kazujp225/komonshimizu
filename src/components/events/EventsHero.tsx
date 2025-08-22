'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

export default function EventsHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge variant="success" size="lg" className="mb-6">
            🎓 学習機会
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            IPOを学ぶ
            <br />
            <span className="text-gradient">セミナー&イベント</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            専門家から直接学べる実践的な
            <br />
            IPOセミナーとイベントを開催
          </p>

          {/* Upcoming Event Highlight */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Badge variant="warning" size="sm" className="mb-3">
              開催予定
            </Badge>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              【無料ウェビナー】IPO準備完全ガイド
            </h2>
            <p className="text-gray-600 text-sm mb-3">
              上場準備の全体像から具体的なアクションプランまで、2時間で完全解説
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">2024年2月15日 19:00-21:00</span>
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                詳細・申込み →
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
            <motion.div
              className="bg-white rounded-lg p-4 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-2xl font-bold text-primary-600">50+</div>
              <div className="text-xs text-gray-600">開催イベント</div>
            </motion.div>
            <motion.div
              className="bg-white rounded-lg p-4 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-2xl font-bold text-primary-600">3000+</div>
              <div className="text-xs text-gray-600">参加者数</div>
            </motion.div>
            <motion.div
              className="bg-white rounded-lg p-4 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-2xl font-bold text-primary-600">4.9</div>
              <div className="text-xs text-gray-600">満足度</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}