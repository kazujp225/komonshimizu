'use client';

import { motion } from 'framer-motion';

const values = [
  {
    icon: '💡',
    title: 'Innovation',
    description: '常に新しい価値を創造し、イノベーションを起こし続けます',
  },
  {
    icon: '🤝',
    title: 'Partnership',
    description: '真のパートナーとして、クライアントと共に成長します',
  },
  {
    icon: '⚡',
    title: 'Speed',
    description: 'スピード感を持って、迅速に課題解決に取り組みます',
  },
  {
    icon: '🎯',
    title: 'Result',
    description: '結果にコミットし、確実な成果を生み出します',
  },
];

export default function MissionVision() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                若手起業家の挑戦を全力でサポートし、
                日本経済の新たな成長エンジンとなる企業を生み出す。
                IPOという目標を通じて、企業価値の最大化と
                社会へのインパクト創出を実現します。
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🌟</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                2030年までに、日本から100社の
                ユニコーン企業を生み出し、
                アジアNo.1のIPOコンサルティングファームとなる。
                次世代のリーダーたちと共に、新しい産業を創造します。
              </p>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}