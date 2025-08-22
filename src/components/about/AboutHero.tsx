'use client';

import { motion } from 'framer-motion';

export default function AboutHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-300 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-white border border-primary-200 rounded-full text-sm font-semibold text-primary-800 mb-6 shadow-sm">
            🏢 About HANATABA
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            次世代のIPOを、
            <br />
            <span className="text-gradient">共に創造する</span>
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            私たちHANATABAは、若手起業家の挑戦を全力でサポートし、
            日本から世界に羽ばたく企業を生み出すことを使命としています。
          </p>

          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl mb-3">🚀</div>
              <div className="text-2xl font-bold text-primary-600 mb-1">2019</div>
              <div className="text-sm text-gray-600">創業年</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl mb-3">🌟</div>
              <div className="text-2xl font-bold text-primary-600 mb-1">42社</div>
              <div className="text-sm text-gray-600">IPO支援実績</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl mb-3">👥</div>
              <div className="text-2xl font-bold text-primary-600 mb-1">35名</div>
              <div className="text-sm text-gray-600">専門チーム</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}