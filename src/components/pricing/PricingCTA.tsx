'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CountdownTimer } from '@/components/ui/CountdownTimer';

export default function PricingCTA() {
  // Calculate end of month
  const today = new Date();
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);

  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Limited Offer Badge */}
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <div className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2">
              <span className="animate-pulse">🔥</span>
              期間限定オファー
              <span className="animate-pulse">🔥</span>
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            今なら初月50%OFF
            <br />
            <span className="text-3xl md:text-4xl">
              + 無料コンサル3回付き
            </span>
          </h2>

          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            上場企業の現役CEOがあなたのIPOを直接支援。
            今月中のお申し込みで特別価格が適用されます。
          </p>

          {/* Countdown */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 inline-block">
            <p className="text-white/90 mb-3 text-sm">オファー終了まで</p>
            <CountdownTimer
              endDate={endOfMonth}
              variant="flip"
              showDays={true}
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/assessment"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
            >
              無料診断を開始する
              <span className="ml-2">→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
            >
              相談予約をする
            </Link>
          </div>

          {/* Trust Elements */}
          <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>クレジットカード不要</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>いつでも解約可能</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>返金保証付き</span>
            </div>
          </div>

          {/* Urgency Message */}
          <motion.div
            className="mt-12 inline-block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/50 rounded-lg px-6 py-3 text-white">
              <p className="text-sm font-semibold">
                ⚠️ 残り枠わずか：今月の新規受付は
                <span className="text-yellow-300 font-bold mx-1">あと3社</span>
                のみ
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}