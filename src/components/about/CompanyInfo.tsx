'use client';

import { motion } from 'framer-motion';

const companyDetails = [
  { label: '会社名', value: '株式会社HANATABA' },
  { label: '設立', value: '2019年4月1日' },
  { label: '資本金', value: '5,000万円' },
  { label: '代表取締役', value: '山田 太郎' },
  { label: '従業員数', value: '35名（2024年12月現在）' },
  { label: '事業内容', value: 'IPOコンサルティング、経営支援、AI活用支援' },
  { label: '所在地', value: '〒106-0032\n東京都港区六本木1-1-1 HANATABAビル' },
  { label: '電話番号', value: '03-1234-5678' },
  { label: 'メール', value: 'info@hanataba.com' },
];

const offices = [
  {
    city: '東京',
    type: '本社',
    address: '港区六本木1-1-1',
    phone: '03-1234-5678',
  },
  {
    city: '大阪',
    type: '支社',
    address: '北区梅田2-2-2',
    phone: '06-1234-5678',
  },
  {
    city: '福岡',
    type: '支社',
    address: '博多区博多駅前3-3-3',
    phone: '092-123-4567',
  },
];

const certifications = [
  '経営革新等支援機関認定',
  'プライバシーマーク取得',
  'ISO27001認証取得',
  '働きがいのある会社認定',
];

export default function CompanyInfo() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            会社情報
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            信頼と実績で、日本のスタートアップエコシステムを支えます
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Company Details Table */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {companyDetails.map((detail, index) => (
                <div
                  key={detail.label}
                  className={`p-6 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 text-sm font-medium text-gray-500">
                      {detail.label}
                    </div>
                    <div className="ml-4 text-gray-900 whitespace-pre-line">
                      {detail.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Office Locations */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              拠点情報
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {offices.map((office, index) => (
                <motion.div
                  key={office.city}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {office.city}
                      </h4>
                      <span className="text-sm text-primary-600">{office.type}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>{office.address}</p>
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {office.phone}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              認定・資格
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {cert}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Partnership Logos */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              提携パートナー
            </h3>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                {['Microsoft', 'Google Cloud', 'AWS', 'Salesforce'].map((partner, index) => (
                  <div
                    key={partner}
                    className="h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 font-semibold"
                  >
                    {partner}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}