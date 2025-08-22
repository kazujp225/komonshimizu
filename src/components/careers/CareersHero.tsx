'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

export default function CareersHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge variant="success" size="lg" className="mb-6">
            🚀 We're Hiring!
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            次世代のIPOを
            <br />
            <span className="text-gradient">一緒に創りませんか？</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            日本のスタートアップエコシステムを変革し、
            <br />
            企業の成長を加速させるプロフェッショナル集団
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-3xl font-bold text-primary-600">50+</div>
              <div className="text-sm text-gray-600">メンバー</div>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-3xl font-bold text-primary-600">28歳</div>
              <div className="text-sm text-gray-600">平均年齢</div>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-3xl font-bold text-primary-600">200%</div>
              <div className="text-sm text-gray-600">成長率</div>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-3xl font-bold text-primary-600">4.8</div>
              <div className="text-sm text-gray-600">社員満足度</div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="#positions"
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105"
            >
              募集中のポジションを見る
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}