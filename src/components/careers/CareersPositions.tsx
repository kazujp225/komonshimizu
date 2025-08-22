'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

const positions = [
  {
    id: 1,
    title: 'IPOコンサルタント',
    department: 'コンサルティング',
    type: '正社員',
    location: '東京',
    experience: '3年以上',
    salary: '600-1,200万円',
    description: 'クライアント企業のIPO準備をリードし、上場実現まで伴走します。',
    requirements: [
      '監査法人、証券会社、事業会社でのIPO関連業務経験',
      '財務会計、内部統制に関する知識',
      'プロジェクトマネジメント能力',
    ],
    isNew: true,
    isUrgent: true,
  },
  {
    id: 2,
    title: 'シニアマネージャー',
    department: 'コンサルティング',
    type: '正社員',
    location: '東京',
    experience: '7年以上',
    salary: '1,000-1,800万円',
    description: '複数のIPOプロジェクトを統括し、チームをリードします。',
    requirements: [
      'IPO支援の実務経験5年以上',
      'チームマネジメント経験',
      '公認会計士資格保有者歓迎',
    ],
    isNew: false,
    isUrgent: true,
  },
  {
    id: 3,
    title: 'ビジネスディベロップメント',
    department: '営業',
    type: '正社員',
    location: '東京・リモート',
    experience: '2年以上',
    salary: '500-900万円',
    description: '新規クライアントの開拓と関係構築を担当します。',
    requirements: [
      'B2B営業経験2年以上',
      'スタートアップ業界への理解',
      '提案資料作成スキル',
    ],
    isNew: true,
    isUrgent: false,
  },
  {
    id: 4,
    title: 'データアナリスト',
    department: 'テクノロジー',
    type: '正社員',
    location: 'フルリモート',
    experience: '2年以上',
    salary: '500-800万円',
    description: 'クライアントデータの分析と、AIツールの開発をサポートします。',
    requirements: [
      'Python、SQLの実務経験',
      'データ分析、可視化スキル',
      '機械学習の基礎知識',
    ],
    isNew: true,
    isUrgent: false,
  },
  {
    id: 5,
    title: 'マーケティングマネージャー',
    department: 'マーケティング',
    type: '正社員',
    location: '東京・リモート',
    experience: '5年以上',
    salary: '700-1,100万円',
    description: 'ブランド戦略の立案と、マーケティング施策の実行を統括します。',
    requirements: [
      'B2Bマーケティング経験3年以上',
      'デジタルマーケティングの知見',
      'コンテンツ制作ディレクション経験',
    ],
    isNew: false,
    isUrgent: false,
  },
];

const departments = [
  { id: 'all', name: 'すべて' },
  { id: 'consulting', name: 'コンサルティング' },
  { id: 'sales', name: '営業' },
  { id: 'tech', name: 'テクノロジー' },
  { id: 'marketing', name: 'マーケティング' },
];

export default function CareersPositions() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const filteredPositions = positions.filter(
    position => selectedDepartment === 'all' || 
    position.department.toLowerCase().includes(selectedDepartment.toLowerCase())
  );

  return (
    <section id="positions" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            募集中の<span className="text-gradient">ポジション</span>
          </h2>
          <p className="text-lg text-gray-600">
            あなたのスキルと情熱を活かせるポジションを見つけてください
          </p>
        </motion.div>

        {/* Department Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedDepartment === dept.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>

        {/* Positions List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredPositions.map((position, index) => (
            <motion.div
              key={position.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {position.title}
                    </h3>
                    {position.isNew && (
                      <Badge variant="success" size="sm">New</Badge>
                    )}
                    {position.isUrgent && (
                      <Badge variant="warning" size="sm">急募</Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {position.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {position.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {position.type}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-3">
                    {position.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" size="sm">
                      経験: {position.experience}
                    </Badge>
                    <Badge variant="secondary" size="sm">
                      年収: {position.salary}
                    </Badge>
                  </div>

                  <details className="text-sm">
                    <summary className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium">
                      必要なスキル・経験
                    </summary>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      {position.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary-500 mt-0.5">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>

                <div className="flex-shrink-0">
                  <a
                    href={`/careers/apply?position=${position.id}`}
                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    応募する
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPositions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              現在、該当するポジションはありません
            </p>
          </div>
        )}
      </div>
    </section>
  );
}