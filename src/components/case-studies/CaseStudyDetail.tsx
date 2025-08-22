'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { CaseStudy } from '@/types';

interface Props {
  caseStudy: CaseStudy;
}

export default function CaseStudyDetail({ caseStudy }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Breadcrumbs */}
      <motion.nav
        className="flex items-center space-x-2 text-sm text-gray-500 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/" className="hover:text-primary-600">ホーム</Link>
        <span>/</span>
        <Link href="/case-studies" className="hover:text-primary-600">成功事例</Link>
        <span>/</span>
        <span className="text-gray-900">{caseStudy.company.name}</span>
      </motion.nav>

      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {caseStudy.title}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {caseStudy.subtitle}
        </p>
        
        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {caseStudy.founder.ageAtIPO}歳
            </div>
            <div className="text-sm text-gray-600">IPO時年齢</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {Math.round((new Date(caseStudy.company.ipoDate).getTime() - new Date(caseStudy.company.founded).getTime()) / (365.25 * 24 * 60 * 60 * 1000))}年
            </div>
            <div className="text-sm text-gray-600">創業〜IPO</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {formatCurrency(caseStudy.company.currentMarketCap)}
            </div>
            <div className="text-sm text-gray-600">時価総額</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {caseStudy.company.industry}
            </div>
            <div className="text-sm text-gray-600">業界</div>
          </div>
        </div>
      </motion.div>

      {/* Company Overview */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">企業概要</h2>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">会社名</span>
                  <div className="text-gray-900 font-semibold">{caseStudy.company.name}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">業界</span>
                  <div className="text-gray-900">{caseStudy.company.industry}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">創業</span>
                  <div className="text-gray-900">{formatDate(caseStudy.company.founded)}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">IPO</span>
                  <div className="text-gray-900">{formatDate(caseStudy.company.ipoDate)}</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">創業者</h3>
              <div className="flex items-start">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  {caseStudy.founder.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-lg mb-1">
                    {caseStudy.founder.name}
                  </div>
                  <div className="text-gray-600 mb-3">
                    創業者・代表取締役CEO
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {caseStudy.founder.background}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Challenge */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mr-3">
              ⚠️
            </span>
            {caseStudy.challenge.title}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {caseStudy.challenge.description}
          </p>
          <ul className="space-y-3">
            {caseStudy.challenge.specificChallenges.map((challenge, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-0.5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Solution */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-3">
              💡
            </span>
            {caseStudy.solution.title}
          </h2>
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-2">アプローチ</h3>
            <p className="text-blue-800">{caseStudy.solution.approach}</p>
          </div>
          
          <div className="space-y-8">
            {caseStudy.solution.keyInitiatives.map((initiative, index) => (
              <div key={index} className="border-l-4 border-primary-500 pl-6">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {initiative.initiative}
                </h4>
                <p className="text-gray-700 mb-3">
                  {initiative.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {initiative.timeline}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    {initiative.impact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Results Timeline */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mr-3">
              📈
            </span>
            {caseStudy.results.title}
          </h2>
          
          <div className="space-y-6">
            {caseStudy.results.timeline.map((event, index) => (
              <div key={index} className="flex">
                <div className="flex flex-col items-center mr-6">
                  <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
                  {index < caseStudy.results.timeline.length - 1 && (
                    <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center mb-2">
                    <div className="text-sm font-medium text-primary-600 mr-4">
                      {formatDate(event.date)}
                    </div>
                    {event.amount && (
                      <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-md">
                        {formatCurrency(event.amount)}
                      </div>
                    )}
                    {event.marketCap && (
                      <div className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-md ml-2">
                        時価総額 {formatCurrency(event.marketCap)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {event.milestone}
                  </h3>
                  <p className="text-gray-700">
                    {event.details}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Key Metrics */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">主要指標</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {Object.entries(caseStudy.results.keyMetrics).map(([key, value]) => (
                <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-primary-600 mb-1">
                    {value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Success Factors & Quote */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 border border-primary-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 mr-3">
              🎯
            </span>
            {caseStudy.lessons.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {caseStudy.lessons.successFactors.map((factor, index) => (
              <div key={index} className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  {factor.factor}
                </h4>
                <p className="text-gray-700">
                  {factor.description}
                </p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="bg-white rounded-xl p-8 border-l-4 border-primary-500">
            <div className="text-primary-200 mb-4">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-4c0-2.2 1.8-4 4-4V8zM22 8c-3.3 0-6 2.7-6 6v10h10V14h-4c0-2.2 1.8-4 4-4V8z" />
              </svg>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 italic">
              "{caseStudy.lessons.quote}"
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                {caseStudy.lessons.quotee.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {caseStudy.lessons.quotee}
                </div>
              </div>
            </div>
          </blockquote>
        </div>
      </motion.section>

      {/* Impact */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mr-3">
              🌟
            </span>
            インパクト
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                ビジネスインパクト
              </h3>
              <ul className="space-y-3">
                {caseStudy.impact.businessImpact.map((impact, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{impact}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                社会インパクト
              </h3>
              <ul className="space-y-3">
                {caseStudy.impact.socialImpact.map((impact, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{impact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.div
        className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        <h3 className="text-2xl font-bold mb-4">
          あなたも同様の成功を実現できます
        </h3>
        <p className="text-lg opacity-90 mb-6">
          まずは5分間の無料診断で、あなたのIPO実現可能性をチェックしましょう
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/assessment"
            className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            無料診断を開始
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
          >
            他の事例を見る
          </Link>
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.div
        className="mt-12 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        <Link
          href="/case-studies"
          className="text-gray-500 hover:text-gray-700 underline underline-offset-4"
        >
          ← すべての成功事例に戻る
        </Link>
      </motion.div>
    </div>
  );
}