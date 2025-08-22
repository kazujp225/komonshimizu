'use client';

import { motion } from 'framer-motion';
import { getCustomers } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function TestimonialsSection() {
  const customers = getCustomers().slice(0, 3); // Get top 3 customers

  const testimonials = [
    {
      id: 1,
      content: 'HANATABのおかげで、IPOに向けた戦略が明確になり、2年間で計画通りに上場を実現できました。特に20代経営者特化のアプローチが素晴らしかった。',
      author: {
        name: '田中 健太',
        role: 'テクノロジーソリューション株式会社 代表取締役CEO',
        company: 'テクノロジーソリューション株式会社',
        age: 29,
        achievement: '2023年12月IPO達成',
        photo: '/images/testimonials/tanaka.jpg'
      },
    },
    {
      id: 2,
      content: '専門家チームによる伴走支援により、IPO準備プロセスをスムーズに進めることができました。特に資金調達と組織体制構築の支援が決定的でした。',
      author: {
        name: '佐藤 美咲',
        role: 'EcoTech Innovations株式会社 代表取締役CEO',
        company: 'EcoTech Innovations株式会社',
        age: 26,
        achievement: '2024年9月IPO達成',
        photo: '/images/testimonials/sato.jpg'
      },
    },
    {
      id: 3,
      content: 'AI診断から始まり、段階的な支援を受けることで、事業の課題が明確になり、効率的に成長することができました。同世代の経営者仲間とのネットワークも貴重です。',
      author: {
        name: '鈴木 大輔',
        role: 'HealthTech Plus株式会社 代表取締役CEO',
        company: 'HealthTech Plus株式会社',
        age: 32,
        achievement: '薬事承認取得、IPO準備中',
        photo: '/images/testimonials/suzuki.jpg'
      },
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            経営者の声
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            HANATABAの支援により成長を遂げた経営者たちの体験談をご紹介します
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              {/* Quote Icon */}
              <div className="text-primary-200 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-4c0-2.2 1.8-4 4-4V8zM22 8c-3.3 0-6 2.7-6 6v10h10V14h-4c0-2.2 1.8-4 4-4V8z" />
                </svg>
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-gray-700 leading-relaxed mb-6">
                "{testimonial.content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold mr-4 flex-shrink-0">
                  {testimonial.author.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">
                    {testimonial.author.name}
                    <span className="text-sm text-gray-500 ml-2">
                      ({testimonial.author.age}歳)
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {testimonial.author.role}
                  </div>
                  <div className="inline-flex items-center text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-md">
                    🎉 {testimonial.author.achievement}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats from testimonials */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center space-x-8 bg-white rounded-xl p-6 shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">95%</div>
              <div className="text-sm text-gray-600">顧客満足度</div>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">8.6</div>
              <div className="text-sm text-gray-600">平均NPS</div>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">100%</div>
              <div className="text-sm text-gray-600">継続率</div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-6">
            あなたも次の成功事例になりませんか？
          </p>
          <a
            href="/case-studies"
            className="text-primary-600 hover:text-primary-700 font-medium underline underline-offset-4"
          >
            すべての成功事例を見る →
          </a>
        </motion.div>
      </div>
    </section>
  );
}