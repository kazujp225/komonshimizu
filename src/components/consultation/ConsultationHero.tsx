'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

export default function ConsultationHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge variant="info" size="lg" className="mb-6">
            🎯 初回相談無料・オンライン対応可
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            上場企業CEOに
            <br />
            <span className="text-gradient">直接相談できる60分</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            26歳でIPOを達成した現役CEOが
            <br />
            あなたの課題に具体的なアドバイスをします
          </p>

          {/* Trust Elements */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-3xl mb-2">⏱️</div>
              <div className="font-semibold text-gray-900">即日対応</div>
              <div className="text-sm text-gray-600">最短24時間以内</div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-3xl mb-2">💰</div>
              <div className="font-semibold text-gray-900">完全無料</div>
              <div className="text-sm text-gray-600">初回60分無料</div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-3xl mb-2">🔒</div>
              <div className="font-semibold text-gray-900">秘密厳守</div>
              <div className="text-sm text-gray-600">NDA締結可能</div>
            </motion.div>
          </div>

          {/* Available Slots */}
          <motion.div
            className="mt-8 inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-6 py-3">
              <p className="text-sm font-semibold text-yellow-800">
                ⚠️ 今週の空き枠：残り3枠のみ
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}