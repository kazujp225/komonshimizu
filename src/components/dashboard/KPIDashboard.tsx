'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getDashboardKPIs, getGrowthMetrics, getConversionFunnelData } from '@/lib/mockData';
import { formatCurrency, formatPercentage } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

interface KPICardProps {
  title: string;
  value: string;
  trend: number;
  icon: string;
  description: string;
}

const KPICard = ({ title, value, trend, icon, description }: KPICardProps) => (
  <motion.div
    variants={itemVariants}
    className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="text-2xl">{icon}</div>
      <div className={`flex items-center text-sm font-medium ${
        trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-500'
      }`}>
        {trend !== 0 && (
          <svg 
            className={`w-4 h-4 mr-1 ${trend > 0 ? 'transform rotate-0' : 'transform rotate-180'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        )}
        {trend !== 0 && `${Math.abs(trend)}%`}
      </div>
    </div>
    <div className="text-2xl font-bold text-gray-900 mb-1">
      {value}
    </div>
    <div className="text-sm text-gray-500">
      {description}
    </div>
  </motion.div>
);

interface ChartBarProps {
  label: string;
  value: number;
  maxValue: number;
  color?: string;
}

const ChartBar = ({ label, value, maxValue, color = 'from-primary-500 to-accent-500' }: ChartBarProps) => {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div className="relative flex-1 min-w-0">
      <div className="mb-2">
        <div className={`bg-gradient-to-t ${color} rounded-t-lg relative transition-all duration-700 ease-out`}
             style={{ height: `${Math.max(percentage, 5)}%` }}>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap">
            {typeof value === 'number' && value > 1000000 ? formatCurrency(value) : value.toLocaleString()}
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-500 text-center truncate px-1">
        {label}
      </div>
    </div>
  );
};

export default function KPIDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [kpis, setKPIs] = useState<any>(null);
  const [growthMetrics, setGrowthMetrics] = useState<any>(null);
  const [funnelData, setFunnelData] = useState<any>(null);

  useEffect(() => {
    setKPIs(getDashboardKPIs());
    setGrowthMetrics(getGrowthMetrics());
    setFunnelData(getConversionFunnelData());
  }, []);

  const tabs = [
    { id: 'overview', name: '概要', icon: '📊' },
    { id: 'growth', name: '成長指標', icon: '📈' },
    { id: 'funnel', name: 'コンバージョン', icon: '🎯' },
    { id: 'retention', name: '継続率', icon: '🔄' }
  ];

  if (!kpis || !growthMetrics || !funnelData) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Status Bar */}
      <motion.div
        className="mb-6 flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border border-gray-200"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">システム正常稼働中</span>
        </div>
        <div className="text-sm text-gray-500">
          最終更新: {new Date().toLocaleDateString('ja-JP')} {new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="border-b border-gray-200 bg-white rounded-t-lg">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activeTab}
      >
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title="MRR"
                value={formatCurrency(kpis.current.mrr)}
                trend={kpis.trends.mrr}
                icon="💰"
                description="月次経常収益"
              />
              <KPICard
                title="顧客数"
                value={`${kpis.current.customers}社`}
                trend={kpis.trends.customers}
                icon="👥"
                description="アクティブ顧客数"
              />
              <KPICard
                title="チャーン率"
                value={formatPercentage(kpis.current.churnRate)}
                trend={kpis.trends.churnRate}
                icon="📉"
                description="月次解約率"
              />
              <KPICard
                title="成約率"
                value={formatPercentage(kpis.current.winRate)}
                trend={kpis.trends.winRate}
                icon="🎯"
                description="商談成約率"
              />
            </div>

            {/* Revenue Chart */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                月次売上推移
              </h3>
              <div className="h-64 flex items-end space-x-2 px-4">
                {kpis.revenueHistory.map((month: any, index: number) => (
                  <ChartBar
                    key={index}
                    label={month.month}
                    value={month.revenue}
                    maxValue={Math.max(...kpis.revenueHistory.map((m: any) => m.revenue))}
                  />
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white"
              >
                <div className="text-3xl mb-3">🚀</div>
                <div className="text-2xl font-bold mb-1">
                  {kpis.revenueHistory.length > 1 
                    ? ((kpis.revenueHistory[kpis.revenueHistory.length - 1].revenue / kpis.revenueHistory[kpis.revenueHistory.length - 2].revenue - 1) * 100).toFixed(1) 
                    : 0}%
                </div>
                <div className="text-sm opacity-90">前月比成長率</div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"
              >
                <div className="text-3xl mb-3">💎</div>
                <div className="text-2xl font-bold mb-1">
                  {formatCurrency(kpis.current.mrr * 12)}
                </div>
                <div className="text-sm opacity-90">予測年間収益</div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white"
              >
                <div className="text-3xl mb-3">⭐</div>
                <div className="text-2xl font-bold mb-1">
                  {formatCurrency(kpis.current.mrr / kpis.current.customers)}
                </div>
                <div className="text-sm opacity-90">顧客単価</div>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'growth' && (
          <div className="space-y-8">
            {/* Growth Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <KPICard
                title="成長率"
                value={formatPercentage(growthMetrics.monthlyGrowthRate)}
                trend={5.2}
                icon="🚀"
                description="月次成長率"
              />
              <KPICard
                title="ARR"
                value={formatCurrency(growthMetrics.arr)}
                trend={12.5}
                icon="📊"
                description="年次経常収益"
              />
              <KPICard
                title="LTV/CAC"
                value={`${growthMetrics.ltvCacRatio.toFixed(1)}x`}
                trend={8.3}
                icon="💎"
                description="投資回収効率"
              />
            </div>

            {/* Cohort Analysis */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                コホート分析（月次継続率）
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 bg-gray-50">コホート</th>
                      {Array.from({ length: 12 }, (_, i) => (
                        <th key={i} className="text-center py-3 px-2 font-medium text-gray-700 bg-gray-50 min-w-[60px]">
                          {i}ヶ月
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {growthMetrics.cohortData.map((cohort: any, index: number) => (
                      <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">
                          {cohort.month}
                        </td>
                        {cohort.retention.map((rate: number, monthIndex: number) => (
                          <td
                            key={monthIndex}
                            className="py-3 px-2 text-center text-sm rounded transition-colors"
                            style={{
                              backgroundColor: rate > 0 ? `rgba(214, 62, 108, ${(rate / 100) * 0.8 + 0.1})` : 'transparent',
                              color: rate > 60 ? 'white' : rate > 0 ? '#1f2937' : '#9ca3af'
                            }}
                          >
                            {rate > 0 ? `${rate}%` : '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                色の濃さが継続率の高さを表しています
              </div>
            </motion.div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  🎯 主要指標
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">NRR (売上継続率)</span>
                    <span className="font-semibold text-lg">{formatPercentage(growthMetrics.nrr)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">LTV (顧客生涯価値)</span>
                    <span className="font-semibold text-lg">{formatCurrency(growthMetrics.ltv)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">CAC (顧客獲得単価)</span>
                    <span className="font-semibold text-lg">{formatCurrency(growthMetrics.cac)}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  📈 成長トレンド
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">月次成長率目標達成</span>
                      <span className="text-green-600 font-semibold">良好</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">顧客獲得目標</span>
                      <span className="text-blue-600 font-semibold">順調</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'funnel' && (
          <div className="space-y-8">
            {/* Funnel Visualization */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                コンバージョンファネル
              </h3>
              <div className="space-y-4">
                {funnelData.stages.map((stage: any, index: number) => {
                  const percentage = (stage.count / funnelData.stages[0].count) * 100;
                  const conversionRate = index > 0 
                    ? (stage.count / funnelData.stages[index - 1].count) * 100 
                    : 100;
                  
                  return (
                    <div key={stage.name} className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-medium text-gray-900">{stage.name}</div>
                        <div className="text-sm text-gray-500 flex items-center space-x-4">
                          <span>{stage.count.toLocaleString()}人</span>
                          <span>({percentage.toFixed(1)}%)</span>
                          {index > 0 && (
                            <span className="text-primary-600 font-medium">
                              CV率: {conversionRate.toFixed(1)}%
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-lg h-12 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-primary-500 to-accent-500 h-full rounded-lg flex items-center justify-center text-white font-semibold transition-all duration-1000 ease-out"
                            style={{ width: `${percentage}%` }}
                          >
                            {percentage > 20 && index > 0 && (
                              <span>CV: {conversionRate.toFixed(1)}%</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Conversion Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title="総合CV率"
                value={formatPercentage(funnelData.overallConversion)}
                trend={3.2}
                icon="🎯"
                description="リードから成約まで"
              />
              <KPICard
                title="平均取引額"
                value={formatCurrency(funnelData.avgDealSize)}
                trend={7.5}
                icon="💰"
                description="1件あたり契約金額"
              />
              <KPICard
                title="営業サイクル"
                value={`${funnelData.avgSalesCycle}日`}
                trend={-5.2}
                icon="⏱️"
                description="平均成約期間"
              />
              <KPICard
                title="パイプライン"
                value={funnelData.pipelineValue}
                trend={15.3}
                icon="🎪"
                description="見込み売上総額"
              />
            </div>

            {/* Pipeline Details */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                パイプライン詳細
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { stage: 'リード', count: 450, value: '¥180M', color: 'bg-gray-500' },
                  { stage: '商談中', count: 85, value: '¥340M', color: 'bg-yellow-500' },
                  { stage: '提案済み', count: 32, value: '¥192M', color: 'bg-orange-500' },
                  { stage: 'クロージング', count: 12, value: '¥84M', color: 'bg-green-500' }
                ].map((item, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className={`w-4 h-4 ${item.color} rounded-full mx-auto mb-2`}></div>
                    <div className="text-sm font-medium text-gray-700 mb-1">{item.stage}</div>
                    <div className="text-xl font-bold text-gray-900">{item.count}</div>
                    <div className="text-sm text-gray-500">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'retention' && (
          <div className="space-y-8">
            {/* Retention Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <KPICard
                title="月次チャーン率"
                value={formatPercentage(kpis.current.churnRate)}
                trend={-2.1}
                icon="🔄"
                description="月次解約率"
              />
              <KPICard
                title="NRR"
                value={formatPercentage(growthMetrics.nrr)}
                trend={4.8}
                icon="📈"
                description="ネット売上継続率"
              />
              <KPICard
                title="LTV"
                value={formatCurrency(growthMetrics.ltv)}
                trend={6.5}
                icon="💎"
                description="顧客生涯価値"
              />
            </div>

            {/* Retention Chart */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                月次継続率推移
              </h3>
              <div className="h-64 flex items-end space-x-2 px-4">
                {Array.from({ length: 12 }, (_, index) => {
                  const retentionRate = Math.max(75, 95 - (index * 2) - Math.random() * 5);
                  return (
                    <ChartBar
                      key={index}
                      label={`${index + 1}M`}
                      value={retentionRate}
                      maxValue={100}
                      color="from-green-500 to-emerald-500"
                    />
                  );
                })}
              </div>
            </motion.div>

            {/* Churn Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  解約理由分析
                </h3>
                <div className="space-y-3">
                  {[
                    { reason: '予算不足', percentage: 35, color: 'bg-red-500' },
                    { reason: '機能不足', percentage: 25, color: 'bg-orange-500' },
                    { reason: 'サポート', percentage: 20, color: 'bg-yellow-500' },
                    { reason: 'その他', percentage: 20, color: 'bg-gray-500' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-24 text-sm text-gray-600">{item.reason}</div>
                      <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${item.color} h-2 rounded-full transition-all duration-700 ease-out`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <div className="w-10 text-sm font-medium text-gray-700">
                        {item.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  継続施策効果
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">オンボーディング改善</span>
                      <span className="text-green-600 font-semibold">+12%</span>
                    </div>
                    <div className="text-xs text-gray-500">新規顧客の継続率向上</div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">カスタマーサクセス強化</span>
                      <span className="text-green-600 font-semibold">+8%</span>
                    </div>
                    <div className="text-xs text-gray-500">既存顧客満足度向上</div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">機能拡充</span>
                      <span className="text-blue-600 font-semibold">+15%</span>
                    </div>
                    <div className="text-xs text-gray-500">アップセル成功率向上</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}