'use client';

import { motion } from 'framer-motion';

export default function CaseStudyCTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            あなたの企業も成功事例に
          </h2>
          <p className="text-xl text-white/90 mb-8">
            実績豊富な専門家チームが、
            <br />
            貴社のIPO実現を全力でサポートします
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8 text-left">
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold text-white">42社の実績</div>
              <div className="text-sm text-white/80">上場支援成功企業数</div>
            </motion.div>
            
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold text-white">最短2年</div>
              <div className="text-sm text-white/80">IPO実現までの期間</div>
            </motion.div>
            
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-2xl mb-2">📈</div>
              <div className="font-semibold text-white">92%</div>
              <div className="text-sm text-white/80">IPO成功率</div>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/consultation"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              無料相談を予約する
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="/assessment"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              5分診断を受ける
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}