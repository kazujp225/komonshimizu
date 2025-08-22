'use client';

import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
// import { ScrollReveal, Typewriter, ElasticButton } from '../ui/AdvancedAnimations';
// import { WaveBackground, InteractiveLighting, AdvancedParticleSystem } from '../ui/AdvancedEffects';

// スクロールベースのパララックスとインタラクション
const useParallax = () => {
  const [offsetY, setOffsetY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return offsetY;
};

// アニメーションのバリエーション
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.645, 0.045, 0.355, 1.000]
    }
  }
};

export default function HeroSection() {
  const parallaxOffset = useParallax();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // マウス追従効果
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // 限定キャンペーン終了日時
  const campaignEndDate = new Date();
  campaignEndDate.setDate(campaignEndDate.getDate() + 7);

  return (
    <section 
      ref={ref}
      className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* インタラクティブ背景要素 */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5"
          style={{
            transform: `translateY(${parallaxOffset * 0.5}px)`
          }}
        />
        
        {/* フローティングパーティクル */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary-300/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* マウス追従グラデーション */}
        {isHovered && (
          <div
            className="absolute w-96 h-96 bg-gradient-radial from-primary-200/20 to-transparent rounded-full pointer-events-none transition-opacity duration-300"
            style={{
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
            }}
          />
        )}
        
        <svg
          className="absolute bottom-0 left-0 right-0 text-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{
            transform: `translateY(${parallaxOffset * 0.3}px)`
          }}
        >
          <path
            d="M0,0 C150,100 350,0 600,80 C850,160 1050,40 1200,100 L1200,120 L0,120 Z"
            className="fill-current"
          />
        </svg>
      </div>

      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
                {/* プロフェッショナルなキャンペーンバナー */}
                <motion.div 
                  variants={itemVariants}
                  className="mb-10"
                >
                  {/* メインキャンペーンバナー */}
                  <div className="max-w-5xl mx-auto bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 border border-red-200/50 rounded-2xl p-6 mb-6 shadow-lg backdrop-blur-sm">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                      {/* 左側：キャンペーン内容 */}
                      <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{ 
                              rotate: [0, 10, -10, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg"
                          >
                            ⚡
                          </motion.div>
                          <div className="text-left">
                            <div className="text-lg font-bold text-red-800 mb-1">
                              【期間限定特典】初期費用完全無料
                            </div>
                            <div className="text-sm text-red-600">
                              通常¥300,000 → 今なら¥0
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* 右側：カウントダウン */}
                      <motion.div 
                        className="flex items-center gap-3 px-5 py-3 bg-white/80 border border-gray-200 rounded-xl shadow-sm backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="text-sm text-gray-700 font-medium">
                          キャンペーン終了まで:
                        </div>
                        <CountdownTimer endDate={campaignEndDate} variant="compact" showDays={false} />
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* CEO直接サポートバッジ - より洗練されたデザイン */}
                  <div className="flex justify-center">
                    <motion.div 
                      className="group inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer backdrop-blur-sm border border-primary-500/20"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl"
                      >
                        🎯
                      </motion.div>
                      <div className="text-left">
                        <div className="text-lg font-bold">
                          現役上場企業CEO直接サポート
                        </div>
                        <div className="text-primary-100 text-sm">
                          26歳最年少上場記録保持者が1対1で指導
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                        業界初
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight"
                variants={itemVariants}
              >
                <motion.span
                  className="inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  上場企業の現役CEOが
                </motion.span>
                <br />
                <motion.span 
                  className="text-gradient relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  あなたのIPOを伴走支援
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: isInView ? "100%" : 0 }}
                    transition={{ delay: 4, duration: 1 }}
                  />
                </motion.span>
              </motion.h1>
            </motion.div>
          </motion.div>

          <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
            実際にIPOを成功させた<strong className="text-primary-700">現役上場企業のCEO</strong>が、
            <br className="hidden lg:block" />
            あなたの事業成長から上場準備まで<strong className="text-primary-700">1対1で直接サポート</strong>します
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 text-sm text-gray-600 bg-gray-50 rounded-2xl p-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary-600 font-bold">1</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">26歳でIPO達成</div>
                <div className="text-xs">日本最年少上場記録</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary-600 font-bold">2</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">時価総額450億円</div>
                <div className="text-xs">現在も成長継続中</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary-600 font-bold">3</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">42社支援実績</div>
                <div className="text-xs">92%がIPO達成</div>
              </div>
            </div>
          </motion.div>

          {/* 強化されたCTAボタンセクション */}
          <motion.div
            className="mb-12"
            variants={itemVariants}
          >
            <div className="flex flex-col lg:flex-row gap-4 justify-center items-stretch mb-8 max-w-5xl mx-auto">
              {/* メインCTAボタン */}
              <Link
                href="/assessment"
                className="group relative bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center overflow-hidden flex-1 lg:flex-initial lg:min-w-[320px]"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <motion.span
                  className="relative z-10 flex items-center gap-3"
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl">🚀</span>
                  <span className="whitespace-nowrap">無料でIPO可能性を診断</span>
                  <motion.svg 
                    className="w-6 h-6 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </motion.span>
                
                {/* 背景リップル効果 */}
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-2xl"
                  whileHover={{
                    scale: [1, 1.05, 1],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{ duration: 0.8 }}
                />
              </Link>
              
              {/* セカンダリCTAボタン */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 lg:flex-initial lg:min-w-[280px]"
              >
                <Link
                  href="/case-studies"
                  className="group w-full h-full border-2 border-gray-300 hover:border-primary-600 text-gray-700 hover:text-primary-600 px-8 py-6 rounded-2xl text-lg font-semibold transition-all duration-200 hover:bg-primary-50 backdrop-blur-sm bg-white/90 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xl">📊</span>
                    <span className="whitespace-nowrap">IPO成功事例を見る</span>
                    <motion.svg 
                      className="w-5 h-5 flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      whileHover={{ rotate: 45 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </motion.svg>
                  </span>
                </Link>
              </motion.div>
            </div>
            
            {/* 社会的証明の追加 */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600"
              variants={itemVariants}
            >
              <div className="flex items-center gap-1">
                <div className="flex -space-x-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold text-xs`}
                      style={{
                        backgroundColor: `hsl(${i * 60 + 200}, 70%, 60%)`
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center text-white font-semibold text-xs">
                    +8
                  </div>
                </div>
                <span className="ml-2">今週12名が診断を完了</span>
              </div>
              
              <div className="w-px h-4 bg-gray-300 hidden sm:block"></div>
              
              <div className="flex items-center gap-1">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                <span>平均診断時間: 3分12秒</span>
              </div>
            </motion.div>
          </motion.div>

          {/* 強化されたクレデンシャル */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <motion.div 
              className="inline-flex items-center gap-3 text-sm text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full px-6 py-3 shadow-lg mb-6"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </motion.div>
              <span className="font-medium">経済産業省「J-Startup」認定コンサルタント</span>
              <div className="w-px h-4 bg-gray-300"></div>
              <motion.span
                animate={{ color: ["#666", "#16a34a", "#666"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="font-medium"
              >
                ✓ 完全成功報酬制度あり
              </motion.span>
            </motion.div>
            
            {/* 追加の信頼指標 */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 mb-8"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>SSL暗号化通信</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span>ISO27001準拠</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span>プライバシーマーク取得</span>
              </div>
            </motion.div>
          </motion.div>

          {/* 実績データの動的表示 */}
          <motion.div
            className="mt-12 text-center"
            variants={itemVariants}
          >
            <p className="text-sm text-gray-500 mb-6">
              ※ 2024年実績より算出（最終更新: {new Date().toLocaleDateString('ja-JP')}）
            </p>
            
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="text-3xl font-bold text-primary-600 mb-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2, duration: 1 }}
                    >
                      72
                    </motion.span>
                    <span className="text-xl">社</span>
                  </motion.div>
                  <div className="text-sm text-gray-600">支援実績</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <motion.div
                      className="bg-primary-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ delay: 1.5, duration: 1.5 }}
                    />
                  </div>
                </motion.div>
                
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="text-3xl font-bold text-accent-600 mb-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
                    <span>650</span>
                    <span className="text-xl">億円</span>
                  </motion.div>
                  <div className="text-sm text-gray-600">総調達額</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <motion.div
                      className="bg-accent-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ delay: 1.7, duration: 1.5 }}
                    />
                  </div>
                </motion.div>
                
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="text-3xl font-bold text-green-600 mb-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                  >
                    <span>92</span>
                    <span className="text-xl">%</span>
                  </motion.div>
                  <div className="text-sm text-gray-600">IPO成功率</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <motion.div
                      className="bg-green-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ delay: 1.9, duration: 1.5 }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}