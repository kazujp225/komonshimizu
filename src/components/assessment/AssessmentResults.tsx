'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import type { AssessmentResult } from '@/types';

interface Props {
  result: AssessmentResult;
  score: number;
}

export default function AssessmentResults({ result, score }: Props) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Email subscription:', email);
    setIsSubscribed(true);
  };

  const progressPercentage = (score / 100) * 100;

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full text-4xl mb-6"
          style={{ backgroundColor: result.color + '20' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {result.icon}
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {result.title}
        </motion.h1>
        
        <motion.p
          className="text-xl text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {result.subtitle}
        </motion.p>

        {/* Score Circle */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgb(229, 231, 235)"
                strokeWidth="6"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke={result.color}
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - progressPercentage / 100) }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{score}</div>
                <div className="text-xs text-gray-500">/ 100</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Result Card */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">診断結果</h3>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">IPO実現可能性</span>
              <span className="text-2xl font-bold" style={{ color: result.color }}>
                {result.probability}%
              </span>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {result.description}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            🎯 推奨アクション
          </h4>
          <ul className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              >
                <svg
                  className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"
                  style={{ color: result.color }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">{recommendation}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            🚀 次のステップ
          </h4>
          <ul className="space-y-3">
            {result.nextSteps.map((step, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
              >
                <span className="inline-flex items-center justify-center w-6 h-6 mr-3 mt-0.5 bg-primary-600 text-white text-xs font-bold rounded-full flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-gray-700">{step}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          ⏰ 想定タイムライン
        </h3>
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full">
            <span className="text-lg font-semibold text-gray-900">
              {result.timeline}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Email Subscription */}
      <motion.div
        className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl p-8 text-white mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">
            詳細なレポートをお送りします
          </h3>
          <p className="text-lg opacity-90 mb-6">
            この診断結果の詳細分析レポートと、あなた専用の改善提案をメールでお送りします（無料）
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="メールアドレスを入力"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  送信
                </button>
              </div>
              <p className="text-sm opacity-75 mt-3">
                ※ スパムメールは送信しません。いつでも配信停止可能です。
              </p>
            </form>
          ) : (
            <div className="text-center">
              <div className="text-2xl mb-2">✅</div>
              <p className="text-lg">
                ありがとうございます！詳細レポートを送信いたします。
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/pricing"
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            プランを確認する
          </Link>
          <Link
            href="/case-studies"
            className="border-2 border-gray-300 hover:border-primary-600 text-gray-700 hover:text-primary-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 hover:bg-primary-50"
          >
            成功事例を見る
          </Link>
        </div>
        
        <div>
          <button
            onClick={() => window.location.reload()}
            className="text-gray-500 hover:text-gray-700 underline underline-offset-4"
          >
            もう一度診断する
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}