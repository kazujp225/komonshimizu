'use client';

import { motion } from 'framer-motion';

export default function CareersCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            あなたの挑戦を待っています
          </h2>
          <p className="text-xl text-white/90 mb-8">
            日本のIPOを変革する仲間として、
            <br />
            一緒に新しい未来を創りませんか？
          </p>

          {/* Application Process */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              { step: '1', title: '応募', desc: 'Web応募フォーム' },
              { step: '2', title: '書類選考', desc: '1週間以内に回答' },
              { step: '3', title: '面接', desc: '2-3回実施' },
              { step: '4', title: '内定', desc: 'オファー提示' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-white">
                  {item.step}
                </div>
                <div className="font-semibold text-white mb-1">{item.title}</div>
                <div className="text-xs text-white/80">{item.desc}</div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="#positions"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              募集中のポジションを見る
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              カジュアル面談を希望
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </a>
          </div>

          {/* Contact Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              採用に関するお問い合わせ
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-white/90">
              <a href="mailto:recruit@hanataba.jp" className="hover:text-white transition-colors">
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  recruit@hanataba.jp
                </span>
              </a>
              <span className="hidden sm:block">|</span>
              <a href="tel:03-1234-5678" className="hover:text-white transition-colors">
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  03-1234-5678
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}