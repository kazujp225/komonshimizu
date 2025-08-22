'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 'faq_001',
    question: 'IPO実現にはどれくらいの期間がかかりますか？',
    answer: '一般的には3-7年程度ですが、事業の成長段階、市場環境、準備状況により大きく異なります。20代での早期IPOを目指す場合、適切な戦略と準備により3-5年での実現も可能です。'
  },
  {
    id: 'faq_002',
    question: '最低どれくらいの売上でIPOできますか？',
    answer: '東証グロース市場では年商10-20億円程度、マザーズ市場では30億円以上が一般的な目安です。ただし、成長率や収益性、将来性なども重要な判断要素となります。'
  },
  {
    id: 'faq_003',
    question: 'サービスの効果はどのように測定されますか？',
    answer: 'KPI指標（売上成長率、資金調達額、組織規模拡大など）、IPO準備段階の進捗、投資家からの評価向上などを定期的に測定し、レポートとして提供いたします。'
  },
  {
    id: 'faq_004',
    question: '他のコンサルティング会社との違いは何ですか？',
    answer: '20代の若手経営者に特化したノウハウ、AI技術を活用した効率的な分析・提案、実際のIPO成功事例に基づいた実践的なサポートが他社との大きな違いです。'
  },
  {
    id: 'faq_005',
    question: '資金調達のサポートも含まれますか？',
    answer: 'はい。VC・エンジェル投資家のネットワーク紹介、ピッチ資料作成支援、デューデリジェンス対応など、資金調達に必要な全面的なサポートを提供いたします。'
  },
  {
    id: 'faq_006',
    question: '途中でプランを変更することは可能ですか？',
    answer: '可能です。事業の成長段階に応じて、より適切なプランへのアップグレードやダウングレードをいつでも行っていただけます。'
  },
  {
    id: 'faq_007',
    question: '成功報酬制度について詳しく教えてください。',
    answer: 'IPO完全サポートプランでは、IPO達成時に成功報酬をいただく制度も用意しております。初期費用を抑えながら、本格的なサポートを受けることが可能です。'
  },
  {
    id: 'faq_008',
    question: 'どのような業界・事業に対応していますか？',
    answer: 'テクノロジー、フィンテック、ヘルスケア、AI・機械学習、SaaS、Eコマースなど幅広い業界に対応。特に成長性の高いスタートアップ企業を得意としています。'
  }
];

export default function PricingFAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            よくあるご質問
          </h2>
          <p className="text-xl text-gray-600">
            IPOコンサルティングに関するよくあるご質問にお答えします
          </p>
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={faq.id}
              variants={itemVariants}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <button
                className="w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                onClick={() => toggleItem(faq.id)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 w-6 h-6 text-primary-600 transition-transform duration-200 ${
                      openItems.includes(faq.id) ? 'transform rotate-45' : ''
                    }`}
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openItems.includes(faq.id) ? 'auto' : 0,
                  opacity: openItems.includes(faq.id) ? 1 : 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              他にご質問がございますか？
            </h3>
            <p className="text-gray-600 mb-6">
              お気軽にお問い合わせください。専門のコンサルタントがお答えいたします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                メールで相談
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 rounded-lg font-semibold transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                電話で相談
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}