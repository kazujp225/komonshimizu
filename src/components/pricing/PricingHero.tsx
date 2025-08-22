'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { CountdownTimer } from '@/components/ui/CountdownTimer';

export default function PricingHero() {
  // 月末までの日付を計算
  const today = new Date();
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 opacity-50" />
      
      <div className="relative container mx-auto px-4">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Trust Badge */}
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Badge variant="success" size="lg" className="animate-pulse">
              🎯 IPO成功率 92%
            </Badge>
            <Badge variant="info" size="lg">
              累計42社支援実績
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-gradient">結果にコミット</span>する
            <br />
            IPO支援プラン
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            上場企業の現役CEOが直接伴走。
            <br />
            <span className="font-semibold text-primary-600">
              成功報酬型プラン
            </span>
            もご用意しています
          </p>

          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <motion.div
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-3xl mb-2">💰</div>
              <div className="font-semibold text-gray-900">初期費用0円</div>
              <div className="text-sm text-gray-600">成功報酬プランあり</div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-semibold text-gray-900">返金保証</div>
              <div className="text-sm text-gray-600">3ヶ月満足保証付き</div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-3xl mb-2">🚀</div>
              <div className="font-semibold text-gray-900">即日開始</div>
              <div className="text-sm text-gray-600">最短24時間で支援開始</div>
            </motion.div>
          </div>

          {/* Limited Time Offer */}
          <motion.div
            className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left flex-1">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <span className="text-2xl">🔥</span>
                  <span className="font-bold text-red-600">期間限定オファー</span>
                </div>
                <p className="text-gray-700">
                  今月中のお申し込みで
                  <span className="font-bold text-2xl text-red-600 block lg:inline mx-1">初月50%OFF</span>
                  <span className="block lg:inline">+ 無料コンサル3回付き</span>
                </p>
              </div>
              <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow-sm">
                <span className="text-xs text-gray-600 mb-2">オファー終了まで</span>
                <CountdownTimer
                  endDate={endOfMonth}
                  variant="minimal"
                  showDays={false}
                />
              </div>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            className="flex items-center justify-center gap-8 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">523社</span>が利用中
              </div>
              <div className="text-xs text-gray-500">
                過去30日間で<span className="font-semibold">87社</span>が新規契約
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}