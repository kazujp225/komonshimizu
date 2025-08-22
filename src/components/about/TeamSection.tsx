'use client';

import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: '山田 太郎',
    position: 'CEO / Founder',
    description: '26歳で上場を達成。累計42社のIPO支援実績を持つ、日本最年少の上場企業CEO。',
    image: '/images/team/ceo.jpg',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: '佐藤 花子',
    position: 'COO',
    description: '元大手証券会社IPO部門責任者。15年以上の上場準備支援経験を持つスペシャリスト。',
    image: '/images/team/coo.jpg',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: '鈴木 健一',
    position: 'CFO',
    description: '公認会計士。複数のスタートアップでCFOを歴任し、3社のIPOを成功に導く。',
    image: '/images/team/cfo.jpg',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: '田中 美咲',
    position: 'Head of AI',
    description: '元Google AIリサーチャー。機械学習を活用した企業価値評価システムを開発。',
    image: '/images/team/ai-head.jpg',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
];

export default function TeamSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            経営チーム
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            IPOのプロフェッショナルが、あなたの成功を全力でサポートします
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                {/* Profile Image Placeholder */}
                <div className="h-64 bg-gradient-to-br from-primary-100 to-accent-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-4xl">{member.name.charAt(0)}</span>
                    </div>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <div className="flex justify-center space-x-4">
                        <a
                          href={member.social.twitter}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                          </svg>
                        </a>
                        <a
                          href={member.social.linkedin}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <div className="text-primary-600 font-medium text-sm mb-3">
                    {member.position}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Advisory Board */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            アドバイザリーボード
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: '渡辺 一郎',
                title: '元東証取締役',
                company: '日本取引所グループ',
              },
              {
                name: '高橋 明美',
                title: 'Managing Partner',
                company: 'Global Ventures Capital',
              },
              {
                name: '伊藤 隆司',
                title: '代表取締役社長',
                company: '株式会社イノベーション',
              },
            ].map((advisor, index) => (
              <motion.div
                key={advisor.name}
                className="bg-gray-50 rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {advisor.name.charAt(0)}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {advisor.name}
                </h4>
                <div className="text-sm text-primary-600 mb-1">
                  {advisor.title}
                </div>
                <div className="text-xs text-gray-500">
                  {advisor.company}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}