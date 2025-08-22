'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AssessmentCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            あなたのビジネスの
            <br className="md:hidden" />
            IPO実現可能性は？
          </h2>
          <p className="text-xl mb-8 opacity-90">
            12の質問に答えるだけで、詳細な診断結果と改善提案をお届け
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl mb-3">⏱️</div>
              <h3 className="font-semibold mb-2">所要時間 5分</h3>
              <p className="text-sm opacity-80">シンプルな質問で素早く診断</p>
            </motion.div>
            
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl mb-3">🎯</div>
              <h3 className="font-semibold mb-2">5段階評価</h3>
              <p className="text-sm opacity-80">詳細な分析と具体的な提案</p>
            </motion.div>
            
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="font-semibold mb-2">完全無料</h3>
              <p className="text-sm opacity-80">登録不要で今すぐ開始可能</p>
            </motion.div>
          </div>

          <Link
            href="/assessment"
            className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            無料診断を今すぐ開始
          </Link>

          <p className="mt-4 text-sm opacity-75">
            ※ 結果はその場で確認できます。メールアドレス登録は任意です。
          </p>
        </motion.div>
      </div>
    </section>
  );
}