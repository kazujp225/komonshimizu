'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPricingPlans } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import { Badge, NotificationBadge } from '@/components/ui/Badge';
import { Tooltip } from '@/components/ui/Tooltip';
import type { PricingPlan } from '@/types';

type BillingCycle = 'monthly' | 'quarterly' | 'annually';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annually');
  const [isClient, setIsClient] = useState(false);
  const plans = getPricingPlans();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getPriceForCycle = (plan: PricingPlan, cycle: BillingCycle) => {
    if (plan.duration === 'one_time') return plan.price;
    
    switch (cycle) {
      case 'monthly':
        return plan.price;
      case 'quarterly':
        return plan.price * 3 * 0.95;
      case 'annually':
        return plan.price * 12 * 0.85;
      default:
        return plan.price;
    }
  };

  const getSavings = (plan: PricingPlan, cycle: BillingCycle) => {
    if (plan.duration === 'one_time') return 0;
    
    switch (cycle) {
      case 'monthly':
        return 0;
      case 'quarterly':
        return plan.price * 3 * 0.05;
      case 'annually':
        return plan.price * 12 * 0.15;
      default:
        return 0;
    }
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-full inline-flex relative">
            <div
              className="absolute inset-y-1 bg-white rounded-full shadow-sm transition-all duration-300"
              style={{
                width: '33.333%',
                transform: `translateX(${
                  billingCycle === 'monthly' ? '0%' : 
                  billingCycle === 'quarterly' ? '100%' : '200%'
                })`,
              }}
            />
            {(['monthly', 'quarterly', 'annually'] as BillingCycle[]).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={`
                  relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors
                  ${billingCycle === cycle ? 'text-primary-600' : 'text-gray-600'}
                `}
              >
                {cycle === 'monthly' && '月額'}
                {cycle === 'quarterly' && '3ヶ月'}
                {cycle === 'annually' && (
                  <span className="flex items-center gap-1">
                    年額
                    <Badge variant="success" size="sm">15%OFF</Badge>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const price = getPriceForCycle(plan, billingCycle);
            const savings = getSavings(plan, billingCycle);
            const isPopular = plan.name === 'Professional';
            const isEnterprise = plan.name === 'Enterprise';

            return (
              <motion.div
                key={plan.id}
                className={`
                  relative rounded-2xl bg-white overflow-hidden transition-all
                  ${isPopular ? 'ring-2 ring-primary-500 shadow-xl lg:scale-105 z-10' : 'shadow-lg'}
                  ${isEnterprise ? 'bg-gradient-to-br from-gray-900 to-gray-800' : ''}
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 right-4">
                    <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                      🏆 人気No.1
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="mb-6">
                    <h3 className={`text-2xl font-bold mb-2 ${isEnterprise ? 'text-white' : 'text-gray-900'}`}>
                      {plan.name}
                      {isEnterprise && (
                        <span className="ml-2 text-sm font-normal text-gray-300">
                          カスタマイズ可能
                        </span>
                      )}
                    </h3>
                    <p className={`${isEnterprise ? 'text-gray-300' : 'text-gray-600'}`}>
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {isClient && (
                      <>
                        {isEnterprise ? (
                          <div className="text-white">
                            <span className="text-3xl font-bold">要相談</span>
                            <p className="text-sm text-gray-300 mt-2">
                              企業規模に応じた最適プラン
                            </p>
                          </div>
                        ) : (
                          <div>
                            <div className="flex flex-col">
                              <span className="text-3xl font-bold text-gray-900">
                                {formatCurrency(price, 'JPY')}
                              </span>
                              <span className="text-sm text-gray-600 mt-1">
                                {billingCycle === 'monthly' ? '月額' : billingCycle === 'quarterly' ? '3ヶ月ごと' : '年額（月割り ' + formatCurrency(Math.floor(price / 12), 'JPY') + '）'}
                              </span>
                            </div>
                            {savings > 0 && (
                              <div className="mt-3">
                                <Badge variant="success" size="sm">
                                  {formatCurrency(savings, 'JPY')} お得
                                </Badge>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${
                            isEnterprise ? 'text-green-400' : 'text-green-500'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className={`text-sm ${isEnterprise ? 'text-gray-300' : 'text-gray-700'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Special Offers */}
                  {plan.name === 'Starter' && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 text-blue-800">
                        <span className="text-lg">🎁</span>
                        <span className="text-sm font-semibold">初回特典</span>
                      </div>
                      <p className="text-xs text-blue-700 mt-1">
                        無料診断レポート付き
                      </p>
                    </div>
                  )}

                  {plan.name === 'Professional' && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg border border-primary-200">
                      <div className="flex items-center gap-2 text-primary-800">
                        <span className="text-lg">🔥</span>
                        <span className="text-sm font-semibold">期間限定</span>
                      </div>
                      <p className="text-xs text-primary-700 mt-1">
                        CEO直接メンタリング月2回付き
                      </p>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Link
                    href={isEnterprise ? '/contact' : '/assessment'}
                    className={`
                      block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all
                      ${isPopular 
                        ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:shadow-lg transform hover:-translate-y-1' 
                        : isEnterprise
                        ? 'bg-white text-gray-900 hover:bg-gray-100'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                      }
                    `}
                  >
                    {isEnterprise ? 'お問い合わせ' : '今すぐ始める'}
                  </Link>

                  {/* Trust Indicators */}
                  <div className={`mt-6 pt-6 border-t ${isEnterprise ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex justify-center gap-4 text-xs">
                      <Tooltip content="SSL暗号化通信">
                        <span className={`flex items-center gap-1 ${isEnterprise ? 'text-gray-400' : 'text-gray-500'}`}>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          安全な決済
                        </span>
                      </Tooltip>
                      <Tooltip content="いつでも解約可能">
                        <span className={`flex items-center gap-1 ${isEnterprise ? 'text-gray-400' : 'text-gray-500'}`}>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          解約自由
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Benefits */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-600 mb-4">
            全プラン共通特典
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              '📚 IPOガイドブック',
              '📞 24時間サポート',
              '🎯 月次レポート',
              '🤝 専属担当者',
              '💳 請求書払い対応',
            ].map((benefit) => (
              <Badge key={benefit} variant="default" size="lg">
                {benefit}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}