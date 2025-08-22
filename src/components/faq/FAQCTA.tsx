'use client';

import { motion } from 'framer-motion';

export default function FAQCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            質問が見つからない？
          </h2>
          <p className="text-xl text-white/90 mb-8">
            専門家が直接お答えします。
            <br />
            無料相談で具体的なアドバイスを受けましょう。
          </p>

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
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              お問い合わせ
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

          {/* Trust Elements */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-white font-semibold">即日対応</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <div className="text-white font-semibold">秘密厳守</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <div className="text-white font-semibold">初回無料</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-white font-semibold">的確助言</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}