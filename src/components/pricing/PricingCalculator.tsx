'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';

export default function PricingCalculator() {
  const [employees, setEmployees] = useState(10);
  const [revenue, setRevenue] = useState(100); // in millions
  const [timeline, setTimeline] = useState(24); // months to IPO
  const [services, setServices] = useState({
    consulting: true,
    internal_control: true,
    fundraising: false,
    ir_support: false,
    ai_analytics: true,
  });

  // Calculate recommended plan and price
  const calculateRecommendation = () => {
    let basePrice = 300000; // Base monthly price
    let plan = 'Starter';

    // Adjust based on company size
    if (employees > 50) {
      basePrice += 100000;
      plan = 'Professional';
    }
    if (employees > 100) {
      basePrice += 200000;
      plan = 'Enterprise';
    }

    // Adjust based on revenue
    if (revenue > 500) {
      basePrice += 150000;
      plan = 'Professional';
    }
    if (revenue > 1000) {
      basePrice += 300000;
      plan = 'Enterprise';
    }

    // Adjust based on timeline urgency
    if (timeline < 12) {
      basePrice *= 1.5; // Rush premium
      plan = 'Enterprise';
    } else if (timeline < 18) {
      basePrice *= 1.2;
      if (plan === 'Starter') plan = 'Professional';
    }

    // Add service costs
    let additionalCost = 0;
    if (services.fundraising) additionalCost += 200000;
    if (services.ir_support) additionalCost += 150000;
    if (!services.consulting) basePrice *= 0.7;
    if (!services.internal_control) basePrice *= 0.8;
    if (!services.ai_analytics) basePrice *= 0.9;

    const totalMonthly = basePrice + additionalCost;
    const totalProject = totalMonthly * timeline;
    const savings = totalMonthly * timeline * 0.15; // Annual discount

    return {
      plan,
      monthlyPrice: totalMonthly,
      totalPrice: totalProject,
      savings,
      discountedTotal: totalProject - savings,
    };
  };

  const result = calculateRecommendation();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              料金シミュレーター
            </h2>
            <p className="text-lg text-gray-600">
              あなたの企業に最適なプランと料金を算出します
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  企業情報を入力
                </h3>

                {/* Employees Slider */}
                <div>
                  <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                    <span>従業員数</span>
                    <span className="text-primary-600 font-bold">{employees}名</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="500"
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1名</span>
                    <span>500名</span>
                  </div>
                </div>

                {/* Revenue Slider */}
                <div>
                  <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                    <span>年間売上高</span>
                    <span className="text-primary-600 font-bold">{revenue}百万円</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="5000"
                    step="10"
                    value={revenue}
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10百万円</span>
                    <span>5,000百万円</span>
                  </div>
                </div>

                {/* Timeline Slider */}
                <div>
                  <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                    <span>IPO目標期間</span>
                    <span className="text-primary-600 font-bold">{timeline}ヶ月</span>
                  </label>
                  <input
                    type="range"
                    min="6"
                    max="60"
                    step="6"
                    value={timeline}
                    onChange={(e) => setTimeline(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>6ヶ月</span>
                    <span>60ヶ月</span>
                  </div>
                </div>

                {/* Services Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    必要なサービス
                  </label>
                  <div className="space-y-2">
                    {Object.entries({
                      consulting: 'IPOコンサルティング',
                      internal_control: '内部統制構築支援',
                      fundraising: '資金調達支援',
                      ir_support: 'IR戦略サポート',
                      ai_analytics: 'AI分析ツール',
                    }).map(([key, label]) => (
                      <label key={key} className="flex items-center p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={services[key as keyof typeof services]}
                          onChange={(e) => setServices({
                            ...services,
                            [key]: e.target.checked,
                          })}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Result Section */}
              <div>
                <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl p-8 text-white">
                  <h3 className="text-xl font-semibold mb-6">
                    推奨プラン
                  </h3>

                  {/* Recommended Plan */}
                  <div className="mb-6">
                    <div className="text-3xl font-bold mb-2">
                      {result.plan}プラン
                    </div>
                    <div className="text-sm opacity-90">
                      あなたの企業に最適なプランです
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-white/20">
                      <span className="text-sm">月額料金</span>
                      <span className="font-bold text-lg">
                        {formatCurrency(result.monthlyPrice, 'JPY')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/20">
                      <span className="text-sm">プロジェクト総額</span>
                      <span className="line-through opacity-70 text-sm">
                        {formatCurrency(result.totalPrice, 'JPY')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/20">
                      <span className="text-sm">年間契約割引</span>
                      <span className="text-green-300 font-bold">
                        -{formatCurrency(result.savings, 'JPY')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-white/10 rounded-lg px-3">
                      <span className="font-semibold">お支払い総額</span>
                      <div className="text-right">
                        <span className="font-bold text-2xl block">
                          {formatCurrency(result.discountedTotal, 'JPY')}
                        </span>
                        <span className="text-xs opacity-90">
                          （月々 {formatCurrency(Math.floor(result.discountedTotal / timeline), 'JPY')}）
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Special Offer */}
                  {timeline < 12 && (
                    <div className="bg-white/10 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-300">⚡</span>
                        <span className="font-semibold">急速成長サポート</span>
                      </div>
                      <p className="text-sm opacity-90">
                        短期間でのIPO実現に向けて、専門チームが集中支援
                      </p>
                    </div>
                  )}

                  {/* CTA */}
                  <button className="w-full py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    このプランで見積もりを取得
                  </button>

                  {/* Contact */}
                  <p className="text-center text-sm mt-4 opacity-90">
                    または
                    <a href="/contact" className="underline ml-1">
                      専門家に相談する
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}