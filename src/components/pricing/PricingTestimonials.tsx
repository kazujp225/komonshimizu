'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar: string;
  plan: string;
  result: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 'testimonial_001',
    name: '田中健太',
    position: 'CEO',
    company: 'AI Solutions株式会社',
    content: 'HANATABAのサポートのおかげで、27歳という若さでIPOを実現することができました。特に資金調達戦略と投資家紹介が非常に効果的でした。20代での上場は無謀だと言われていましたが、的確な戦略とサポートにより夢を実現できました。',
    avatar: '/images/avatar-tanaka.jpg',
    plan: 'IPO完全サポート',
    result: '創業4年でIPO達成、時価総額450億円',
    rating: 5
  },
  {
    id: 'testimonial_002',
    name: '佐々木美咲',
    position: 'CEO',
    company: 'MedTech Innovation株式会社',
    content: 'ヘルスケア業界での事業展開は規制も多く複雑でしたが、HANATABAチームの専門知識と経験により、スムーズにIPO準備を進めることができました。25歳での上場という目標を達成でき、本当に感謝しています。',
    avatar: '/images/avatar-sasaki.jpg',
    plan: 'IPO戦略パッケージ',
    result: '創業3年でIPO達成、時価総額280億円',
    rating: 5
  },
  {
    id: 'testimonial_003',
    name: '山田裕太',
    position: 'CEO',
    company: 'FinTech Pro株式会社',
    content: '5分診断から始まり、現在はIPO戦略パッケージを利用しています。月次の戦略ミーティングでは毎回新しい気づきがあり、確実に成長につながっています。来年のIPO達成に向けて順調に進んでいます。',
    avatar: '/images/avatar-yamada.jpg',
    plan: 'IPO戦略パッケージ',
    result: '月成長率25%達成、シリーズB完了',
    rating: 5
  },
  {
    id: 'testimonial_004',
    name: '鈴木花子',
    position: 'COO',
    company: 'TechStartup株式会社',
    content: 'スタートアップ診断で現状を客観的に把握できたことが大きな転機でした。改善すべきポイントが明確になり、その後の事業計画策定がスムーズに進みました。アドバイスに従って組織体制を強化した結果、投資家からの評価も大幅に向上しました。',
    avatar: '/images/avatar-suzuki.jpg',
    plan: 'IPOスタートアップ診断',
    result: '投資家評価向上、次回資金調達準備中',
    rating: 4
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function PricingTestimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            お客様の声
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            HANATABAのサポートによりIPOを実現した経営者の皆様からいただいたお声をご紹介します
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className={`relative ${
                index === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 h-full">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-primary-200">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <StarRating rating={testimonial.rating} />
                  <p className="text-gray-700 leading-relaxed mt-4 text-lg">
                    "{testimonial.content}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.position} @ {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plan and Result */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-primary-50 rounded-lg p-3">
                    <div className="text-xs font-medium text-primary-600 uppercase tracking-wide mb-1">
                      利用プラン
                    </div>
                    <div className="text-sm font-semibold text-primary-900">
                      {testimonial.plan}
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-xs font-medium text-green-600 uppercase tracking-wide mb-1">
                      達成成果
                    </div>
                    <div className="text-sm font-semibold text-green-900">
                      {testimonial.result}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { label: 'IPO成功率', value: '92%', icon: '🎯' },
            { label: '平均IPO期間', value: '3.8年', icon: '⏱️' },
            { label: '資金調達成功', value: '¥420億', icon: '💰' },
            { label: '満足度', value: '4.8/5', icon: '⭐' }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-50 rounded-xl"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              あなたも次の成功者になりませんか？
            </h3>
            <p className="text-lg opacity-90 mb-6">
              まずは5分診断で、あなたのIPO実現可能性をチェックしましょう
            </p>
            <button className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg">
              無料診断を開始
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}