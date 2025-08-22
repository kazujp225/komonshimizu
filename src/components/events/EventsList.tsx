'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

const events = [
  {
    id: 1,
    title: 'IPO準備完全ガイド',
    type: 'ウェビナー',
    status: 'upcoming',
    date: '2024年2月15日',
    time: '19:00-21:00',
    format: 'オンライン',
    price: '無料',
    capacity: '100名',
    registered: 78,
    description: '上場準備の全体像から具体的なアクションプランまで、2時間で完全解説します。',
    speakers: ['山田太郎 (CEO)', '佐藤花子 (CFO)'],
    topics: ['IPOタイムライン', '内部統制構築', '資金調達戦略'],
  },
  {
    id: 2,
    title: '資金調達戦略セミナー',
    type: 'セミナー',
    status: 'upcoming',
    date: '2024年2月20日',
    time: '14:00-17:00',
    format: '東京オフィス',
    price: '5,000円',
    capacity: '30名',
    registered: 12,
    description: 'VCからの資金調達を成功させるための実践的な戦略とピッチのコツを学びます。',
    speakers: ['田中一郎 (COO)', 'ゲストVC'],
    topics: ['バリュエーション', 'ピッチデッキ作成', 'VC交渉術'],
  },
  {
    id: 3,
    title: 'IPO事例研究会',
    type: '勉強会',
    status: 'upcoming',
    date: '2024年2月25日',
    time: '15:00-18:00',
    format: 'ハイブリッド',
    price: '3,000円',
    capacity: '50名',
    registered: 35,
    description: '最近の上場事例を詳しく分析し、成功要因と課題を議論します。',
    speakers: ['業界専門家', '上場企業CEO'],
    topics: ['最新IPO事例', '成功要因分析', 'Q&Aセッション'],
  },
  {
    id: 4,
    title: '内部統制構築ワークショップ',
    type: 'ワークショップ',
    status: 'past',
    date: '2024年1月20日',
    time: '10:00-16:00',
    format: '東京オフィス',
    price: '15,000円',
    capacity: '20名',
    registered: 20,
    description: 'J-SOX対応を含む内部統制の構築方法を実際の演習を通じて学習しました。',
    speakers: ['公認会計士', '内部統制専門家'],
    topics: ['J-SOX対応', '業務フロー設計', '実務演習'],
  },
  {
    id: 5,
    title: 'スタートアップIPOトレンド',
    type: 'ウェビナー',
    status: 'past',
    date: '2024年1月15日',
    time: '19:00-20:30',
    format: 'オンライン',
    price: '無料',
    capacity: '200名',
    registered: 180,
    description: '2024年のIPO市場動向とスタートアップの上場トレンドを解説しました。',
    speakers: ['証券アナリスト', '投資銀行部門責任者'],
    topics: ['市場動向', '上場基準', '投資家動向'],
  },
];

const eventTypes = [
  { id: 'all', name: 'すべて' },
  { id: 'upcoming', name: '開催予定' },
  { id: 'past', name: '過去のイベント' },
];

const formats = [
  { id: 'all', name: 'すべて' },
  { id: 'online', name: 'オンライン' },
  { id: 'offline', name: 'オフライン' },
  { id: 'hybrid', name: 'ハイブリッド' },
];

export default function EventsList() {
  const [selectedType, setSelectedType] = useState('upcoming');
  const [selectedFormat, setSelectedFormat] = useState('all');

  const filteredEvents = events.filter(event => {
    const typeMatch = selectedType === 'all' || event.status === selectedType;
    const formatMatch = selectedFormat === 'all' || 
      (selectedFormat === 'online' && event.format === 'オンライン') ||
      (selectedFormat === 'offline' && event.format === '東京オフィス') ||
      (selectedFormat === 'hybrid' && event.format === 'ハイブリッド');
    
    return typeMatch && formatMatch;
  });

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                イベント状況
              </label>
              <div className="flex gap-2">
                {eventTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedType === type.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                開催形式
              </label>
              <div className="flex gap-2">
                {formats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedFormat === format.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {format.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={event.status === 'upcoming' ? 'success' : 'secondary'} 
                        size="sm"
                      >
                        {event.type}
                      </Badge>
                      {event.status === 'upcoming' && (
                        <Badge variant="warning" size="sm">
                          {event.price === '無料' ? '無料' : '有料'}
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">{event.date}</div>
                      <div className="text-xs text-gray-600">{event.time}</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>{event.format}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{event.registered}/{event.capacity}名</span>
                      {event.status === 'upcoming' && (
                        <div className="ml-auto">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary-600 h-2 rounded-full" 
                              style={{ width: `${(event.registered / parseInt(event.capacity)) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span>{event.price}</span>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-700 mb-2">主な内容</div>
                    <div className="flex flex-wrap gap-1">
                      {event.topics.map((topic, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Speakers */}
                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-700 mb-2">講師</div>
                    <div className="text-sm text-gray-600">
                      {event.speakers.join(', ')}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-4">
                    {event.status === 'upcoming' ? (
                      <button 
                        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                          event.registered >= parseInt(event.capacity)
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-primary-600 text-white hover:bg-primary-700'
                        }`}
                        disabled={event.registered >= parseInt(event.capacity)}
                      >
                        {event.registered >= parseInt(event.capacity) ? '満席' : '申込み'}
                      </button>
                    ) : (
                      <button className="w-full py-3 bg-gray-100 text-gray-600 rounded-lg font-semibold">
                        アーカイブ動画
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                現在、該当するイベントはありません
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}