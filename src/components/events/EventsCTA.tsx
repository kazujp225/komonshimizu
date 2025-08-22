'use client';

import { motion } from 'framer-motion';

export default function EventsCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            学習を実践に繋げませんか？
          </h2>
          <p className="text-xl text-white/90 mb-8">
            セミナーで得た知識を活かして、
            <br />
            実際のIPO準備を始めましょう
          </p>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-2xl mb-2">📚</div>
              <div className="font-semibold text-white mb-1">継続学習</div>
              <div className="text-sm text-white/80">
                月1回の定期セミナーで最新情報をキャッチアップ
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-2xl mb-2">🤝</div>
              <div className="font-semibold text-white mb-1">ネットワーキング</div>
              <div className="text-sm text-white/80">
                同じ目標を持つ経営者との貴重な交流機会
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-2xl mb-2">💡</div>
              <div className="font-semibold text-white mb-1">実践サポート</div>
              <div className="text-sm text-white/80">
                学んだ内容の実践を個別コンサルでサポート
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="/consultation"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              無料相談で実践プランを相談
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="/assessment"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              5分診断で準備状況をチェック
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </a>
          </div>

          {/* Event Notifications */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              🔔 イベント通知を受け取る
            </h3>
            <p className="text-white/80 mb-4">
              新しいセミナーやイベントの開催情報をいち早くお届けします
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="メールアドレス"
                className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                登録する
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}