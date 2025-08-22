'use client';

import { motion } from 'framer-motion';
import { formatNumber } from '@/lib/utils';

const stats = [
  {
    id: 1,
    name: '支援企業数',
    value: 72,
    suffix: '社',
    description: '2024年12月現在',
    color: 'text-primary-600',
  },
  {
    id: 2,
    name: '総調達額',
    value: 650,
    suffix: '億円',
    description: '累計実績',
    color: 'text-accent-600',
  },
  {
    id: 3,
    name: 'IPO達成',
    value: 12,
    suffix: '社',
    description: '過去3年間',
    color: 'text-primary-600',
  },
  {
    id: 4,
    name: '平均年商成長率',
    value: 245,
    suffix: '%',
    description: '支援開始から3年間',
    color: 'text-accent-600',
  },
];

const achievements = [
  {
    title: '20代でIPO実現',
    companies: ['テクノロジーソリューション株式会社', 'EcoTech Innovations株式会社'],
    highlight: '29歳・26歳でIPO',
  },
  {
    title: '業界最速IPO',
    companies: ['EcoTech Innovations株式会社'],
    highlight: '創業4年2ヶ月',
  },
  {
    title: '大型資金調達',
    companies: ['複数社'],
    highlight: 'シリーズB 50億円',
  },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            確かな実績
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            HANATABAの支援により、多くの企業がIPO実現への道のりを歩んでいます
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 + 0.1 * index }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-2xl md:text-3xl">{stat.suffix}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{stat.name}</h3>
              <p className="text-sm text-gray-500">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            主な成果
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {achievement.title}
                  </h4>
                  <div className="text-2xl font-bold text-primary-600 mb-3">
                    {achievement.highlight}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    {achievement.companies.map((company, companyIndex) => (
                      <div key={companyIndex}>{company}</div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 mb-8">
            信頼いただいているパートナー
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-gray-400 font-semibold">東証グロース</div>
            <div className="h-8 w-px bg-gray-300" />
            <div className="text-gray-400 font-semibold">主要証券会社</div>
            <div className="h-8 w-px bg-gray-300" />
            <div className="text-gray-400 font-semibold">大手監査法人</div>
            <div className="h-8 w-px bg-gray-300" />
            <div className="text-gray-400 font-semibold">VC・PE</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}