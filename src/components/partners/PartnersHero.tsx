'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

export default function PartnersHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge variant="info" size="lg" className="mb-6">
            🤝 信頼のパートナーネットワーク
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            IPO実現を支える
            <br />
            <span className="text-gradient">強力なパートナー</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            監査法人、証券会社、VCなど、
            <br />
            IPOに必要なすべての専門家と連携
          </p>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto">
            <motion.div
              className="bg-white rounded-lg p-4 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-2xl font-bold text-primary-600">50+</div>
              <div className="text-xs text-gray-600">提携企業</div>
            </motion.div>
            <motion.div
              className="bg-white rounded-lg p-4 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-2xl font-bold text-primary-600">4大</div>
              <div className="text-xs text-gray-600">監査法人</div>
            </motion.div>
            <motion.div
              className="bg-white rounded-lg p-4 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-2xl font-bold text-primary-600">20+</div>
              <div className="text-xs text-gray-600">VC連携</div>
            </motion.div>
            <motion.div
              className="bg-white rounded-lg p-4 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-2xl font-bold text-primary-600">100+</div>
              <div className="text-xs text-gray-600">専門家</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}