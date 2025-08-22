'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

export default function NewsHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge variant="info" size="lg" className="mb-6">
            📰 最新情報
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ニュース&
            <br />
            <span className="text-gradient">プレスリリース</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            HANATABAの最新動向、サービス情報、
            <br />
            メディア掲載をお知らせします
          </p>

          {/* Latest News Highlight */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Badge variant="success" size="sm" className="mb-3">
              最新
            </Badge>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              シリーズA資金調達完了のお知らせ
            </h2>
            <p className="text-gray-600 text-sm mb-3">
              総額10億円の資金調達を実施し、IPO支援サービスを大幅拡充
            </p>
            <div className="text-xs text-gray-500">2024年1月15日</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}