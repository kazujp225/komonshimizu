'use client';

import { motion } from 'framer-motion';
import { Accordion } from '@/components/ui/TabsAccordion';

const faqItems = [
  {
    id: 'faq-1',
    title: '本当に無料ですか？',
    content: 'はい、初回60分の相談は完全無料です。追加料金や隠れた費用は一切ありません。相談後の営業電話なども行いませんので、安心してご利用ください。',
  },
  {
    id: 'faq-2',
    title: 'どんな相談ができますか？',
    content: 'IPO準備の進め方、資金調達戦略、内部統制構築、事業計画策定、監査法人選定など、上場に関するあらゆる相談が可能です。創業直後の企業から具体的な上場準備中の企業まで対応しています。',
  },
  {
    id: 'faq-3',
    title: 'オンラインでも相談できますか？',
    content: 'はい、Zoom等を使用したオンライン相談に対応しています。全国どこからでもご相談いただけます。対面をご希望の場合は、東京オフィスでの相談も可能です。',
  },
  {
    id: 'faq-4',
    title: '相談前に準備するものはありますか？',
    content: '特別な準備は不要ですが、事業計画書や財務諸表があればより具体的なアドバイスが可能です。現在の課題や質問事項をメモしておくと、限られた時間を有効活用できます。',
  },
  {
    id: 'faq-5',
    title: 'NDAは締結できますか？',
    content: 'はい、ご希望に応じてNDA（秘密保持契約）を締結いたします。安心して貴社の重要情報をお話しください。',
  },
];

export default function ConsultationFAQ() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              よくある質問
            </h2>
            <p className="text-lg text-gray-600">
              無料相談に関する疑問にお答えします
            </p>
          </div>

          <Accordion items={faqItems} variant="separated" allowMultiple />

          {/* Additional CTA */}
          <motion.div
            className="mt-12 text-center bg-primary-50 rounded-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-lg font-semibold text-gray-900 mb-4">
              その他のご質問はお気軽にお問い合わせください
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:03-1234-5678"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                03-1234-5678
              </a>
              <a
                href="mailto:contact@hanataba.jp"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@hanataba.jp
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}