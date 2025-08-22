'use client';

import { motion } from 'framer-motion';

export default function NewsNewsletter() {
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
            最新情報をお見逃しなく
          </h2>
          <p className="text-xl text-white/90 mb-8">
            HANATABAの最新ニュース、プレスリリース、
            <br />
            業界動向を定期的にお届けします
          </p>

          {/* Newsletter Signup */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              📧 ニュースレター購読
            </h3>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
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
                購読する
              </button>
            </form>
            <p className="text-xs text-white/70">
              月1回程度の配信です。いつでも配信停止できます。
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-4">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                📰
              </div>
              <h4 className="font-semibold text-white mb-2">プレスキット</h4>
              <p className="text-sm text-white/80 mb-3">
                ロゴ、会社概要、代表者情報などの報道用資料
              </p>
              <a href="/press-kit" className="text-white hover:text-white/80 text-sm underline">
                ダウンロード
              </a>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                📞
              </div>
              <h4 className="font-semibold text-white mb-2">報道関係者様</h4>
              <p className="text-sm text-white/80 mb-3">
                取材・インタビューのお申し込み
              </p>
              <a href="mailto:press@hanataba.jp" className="text-white hover:text-white/80 text-sm underline">
                お問い合わせ
              </a>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                📱
              </div>
              <h4 className="font-semibold text-white mb-2">SNSフォロー</h4>
              <p className="text-sm text-white/80 mb-3">
                最新情報をリアルタイムでチェック
              </p>
              <div className="flex justify-center gap-2">
                <a href="https://twitter.com/hanataba" className="text-white hover:text-white/80">
                  Twitter
                </a>
                <span className="text-white/60">|</span>
                <a href="https://linkedin.com/company/hanataba" className="text-white hover:text-white/80">
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}