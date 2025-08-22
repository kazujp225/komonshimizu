'use client';

import { motion } from 'framer-motion';

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: '電話番号',
    value: '03-1234-5678',
    subtext: '平日 9:00-18:00',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'メールアドレス',
    value: 'info@hanataba.com',
    subtext: '24時間受付',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: '所在地',
    value: '東京都港区六本木',
    subtext: '1-1-1 HANATABAビル',
  },
];

const faqItems = [
  {
    question: '相談は無料ですか？',
    answer: '初回相談は無料です。まずはお気軽にご相談ください。',
  },
  {
    question: 'オンライン相談は可能ですか？',
    answer: 'はい、Zoom等を使用したオンライン相談も承っております。',
  },
  {
    question: '返信までどのくらいかかりますか？',
    answer: '通常2営業日以内にご返信させていただきます。',
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          お問い合わせ先
        </h3>
        <div className="space-y-4">
          {contactInfo.map((info, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                {info.icon}
              </div>
              <div className="ml-4">
                <div className="text-sm text-gray-500">{info.label}</div>
                <div className="font-semibold text-gray-900">{info.value}</div>
                {info.subtext && (
                  <div className="text-xs text-gray-500">{info.subtext}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick FAQ */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          よくあるご質問
        </h3>
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-primary-100 pb-3 last:border-0">
              <h4 className="font-medium text-gray-900 mb-1">
                {item.question}
              </h4>
              <p className="text-sm text-gray-600">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Office Hours */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          営業時間
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">平日</span>
            <span className="font-medium text-gray-900">9:00 - 18:00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">土曜日</span>
            <span className="font-medium text-gray-900">10:00 - 16:00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">日曜・祝日</span>
            <span className="font-medium text-red-600">休業</span>
          </div>
        </div>
      </motion.div>

      {/* Emergency Contact */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-red-50 rounded-xl p-6 border border-red-100"
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              緊急のご相談
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>緊急の場合は、以下までご連絡ください：</p>
              <p className="font-semibold mt-1">080-1234-5678</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}