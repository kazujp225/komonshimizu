'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface UserProfile {
  companyStage: 'idea' | 'mvp' | 'growth' | 'scaling';
  industry: 'saas' | 'ecommerce' | 'fintech' | 'healthcare' | 'other';
  revenue: 'pre-revenue' | 'under-1m' | '1m-10m' | '10m-100m' | 'over-100m';
  visitCount: number;
  lastVisit?: Date;
  interests: string[];
}

// マイクロコピーのコンテキスト別バリエーション
const microCopy = {
  headlines: {
    firstVisit: [
      'あなたの会社もIPO実現へ',
      'スタートアップから上場企業へ',
      '次世代の経営者をサポート'
    ],
    returning: [
      'お帰りなさい！IPO準備は進んでいますか？',
      '前回から新しい情報をお届けします',
      'あなたの成長を一緒に加速しましょう'
    ],
    highIntent: [
      'IPO実現まで平均2.3年',
      '今すぐ無料診断を始めませんか？',
      '成功への第一歩を踏み出そう'
    ]
  },
  ctaButtons: {
    idea: {
      primary: '💡 アイデアをIPOまで導く',
      secondary: '成功事例を見てみる'
    },
    mvp: {
      primary: '🚀 MVPから上場への道筋',
      secondary: '資金調達戦略を学ぶ'
    },
    growth: {
      primary: '📈 成長を加速してIPOへ',
      secondary: '内部統制の準備を始める'
    },
    scaling: {
      primary: '⚡ 上場準備を本格化',
      secondary: '監査法人を紹介してもらう'
    }
  },
  socialProofs: {
    saas: '90%のSaaS企業がIPO達成',
    ecommerce: 'EC業界での成功実績No.1',
    fintech: 'FinTech特化の専門ノウハウ',
    healthcare: '医療系スタートアップ支援経験豊富'
  },
  urgencyMessages: {
    'pre-revenue': '早期準備でIPO成功率が3倍に',
    'under-1m': '年商1億円突破企業の85%がIPO達成',
    '1m-10m': 'あと1年でIPO準備完了可能',
    '10m-100m': 'IPO直前期の最重要フェーズ',
    'over-100m': '大型IPOの実績多数'
  }
};

// ユーザープロファイリングフック
export function useUserProfile(): UserProfile {
  const [profile, setProfile] = useState<UserProfile>({
    companyStage: 'growth',
    industry: 'saas',
    revenue: 'under-1m',
    visitCount: 1,
    interests: []
  });

  useEffect(() => {
    // LocalStorageからユーザープロファイルを取得
    const saved = localStorage.getItem('hanataba_user_profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfile({
        ...parsed,
        visitCount: (parsed.visitCount || 0) + 1,
        lastVisit: parsed.lastVisit ? new Date(parsed.lastVisit) : undefined
      });
    } else {
      // 初回訪問者のプロファイリング
      const inferredProfile = inferUserProfile();
      setProfile(prev => ({ ...prev, ...inferredProfile }));
    }

    // 行動追跡
    trackUserBehavior();

    return () => {
      // プロファイルを保存
      localStorage.setItem('hanataba_user_profile', JSON.stringify({
        ...profile,
        lastVisit: new Date()
      }));
    };
  }, []);

  // ユーザープロファイルの推論
  const inferUserProfile = (): Partial<UserProfile> => {
    const referrer = document.referrer;
    const userAgent = navigator.userAgent;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    let inferredProfile: Partial<UserProfile> = {};

    // リファラーからの推論
    if (referrer.includes('linkedin')) {
      inferredProfile.companyStage = 'scaling';
    } else if (referrer.includes('twitter') || referrer.includes('x.com')) {
      inferredProfile.companyStage = 'growth';
    }

    // タイムゾーンからの推論（日本以外からのアクセス）
    if (!timeZone.includes('Tokyo') && !timeZone.includes('Asia')) {
      inferredProfile.interests = ['global-expansion'];
    }

    return inferredProfile;
  };

  // 行動追跡
  const trackUserBehavior = () => {
    // スクロール深度
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      maxScroll = Math.max(maxScroll, scrollPercentage);
    };

    // マウスの動き（エンゲージメント測定）
    let mouseMovements = 0;
    const handleMouseMove = () => {
      mouseMovements++;
    };

    // 滞在時間
    const startTime = Date.now();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // 5秒後にエンゲージメントを評価
    const timer = setTimeout(() => {
      const timeSpent = (Date.now() - startTime) / 1000;
      const engaged = maxScroll > 30 || mouseMovements > 50 || timeSpent > 30;
      
      if (engaged) {
        setProfile(prev => ({
          ...prev,
          interests: [...prev.interests, 'high-engagement']
        }));
      }
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  };

  return profile;
}

interface PersonalizedHeadlineProps {
  fallback: string;
  className?: string;
}

export function PersonalizedHeadline({ fallback, className = '' }: PersonalizedHeadlineProps) {
  const profile = useUserProfile();
  const [headline, setHeadline] = useState(fallback);
  const [isPersonalized, setIsPersonalized] = useState(false);

  useEffect(() => {
    let personalizedHeadline = fallback;
    let personalized = false;

    // 訪問回数による分岐
    if (profile.visitCount === 1) {
      const firstVisitHeadlines = microCopy.headlines.firstVisit;
      personalizedHeadline = firstVisitHeadlines[Math.floor(Math.random() * firstVisitHeadlines.length)];
      personalized = true;
    } else if (profile.visitCount > 1) {
      const returningHeadlines = microCopy.headlines.returning;
      personalizedHeadline = returningHeadlines[Math.floor(Math.random() * returningHeadlines.length)];
      personalized = true;
    }

    // 高インテント（複数回訪問、長時間滞在）
    if (profile.interests.includes('high-engagement') && profile.visitCount > 2) {
      const highIntentHeadlines = microCopy.headlines.highIntent;
      personalizedHeadline = highIntentHeadlines[Math.floor(Math.random() * highIntentHeadlines.length)];
      personalized = true;
    }

    setHeadline(personalizedHeadline);
    setIsPersonalized(personalized);
  }, [profile, fallback]);

  return (
    <motion.h1
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {headline}
      {isPersonalized && (
        <motion.span
          className="inline-block ml-2 text-sm text-primary-600"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          ✨
        </motion.span>
      )}
    </motion.h1>
  );
}

interface PersonalizedCTAProps {
  className?: string;
  onClick?: () => void;
}

export function PersonalizedCTA({ className = '', onClick }: PersonalizedCTAProps) {
  const profile = useUserProfile();
  const [ctaText, setCTAText] = useState('無料診断を開始');
  const [secondaryCTA, setSecondaryCTA] = useState('詳細を見る');

  useEffect(() => {
    const stageCTA = microCopy.ctaButtons[profile.companyStage];
    if (stageCTA) {
      setCTAText(stageCTA.primary);
      setSecondaryCTA(stageCTA.secondary);
    }
  }, [profile.companyStage]);

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <motion.button
        onClick={onClick}
        className="group relative overflow-hidden bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
        <span className="relative z-10">{ctaText}</span>
      </motion.button>

      <motion.button
        className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {secondaryCTA}
      </motion.button>
    </div>
  );
}

interface PersonalizedSocialProofProps {
  className?: string;
}

export function PersonalizedSocialProof({ className = '' }: PersonalizedSocialProofProps) {
  const profile = useUserProfile();
  const [socialProof, setSocialProof] = useState('業界トップクラスの実績');

  useEffect(() => {
    const industryProof = microCopy.socialProofs[profile.industry];
    if (industryProof) {
      setSocialProof(industryProof);
    }
  }, [profile.industry]);

  return (
    <motion.div
      className={`inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="w-4 h-4"
      >
        🏆
      </motion.div>
      <span className="text-sm font-medium text-gray-700">{socialProof}</span>
    </motion.div>
  );
}

interface PersonalizedUrgencyProps {
  className?: string;
}

export function PersonalizedUrgency({ className = '' }: PersonalizedUrgencyProps) {
  const profile = useUserProfile();
  const [urgencyMessage, setUrgencyMessage] = useState('');
  const [showUrgency, setShowUrgency] = useState(false);

  useEffect(() => {
    // 2回目以降の訪問者にのみ緊急性メッセージを表示
    if (profile.visitCount > 1) {
      const message = microCopy.urgencyMessages[profile.revenue];
      if (message) {
        setUrgencyMessage(message);
        setShowUrgency(true);
      }
    }
  }, [profile.visitCount, profile.revenue]);

  if (!showUrgency) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`bg-gradient-to-r from-orange-100 to-red-100 border border-orange-300 rounded-lg p-4 ${className}`}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xl"
          >
            ⚡
          </motion.div>
          <div>
            <div className="font-semibold text-orange-800 text-sm">
              {urgencyMessage}
            </div>
            <div className="text-orange-700 text-xs mt-1">
              あなたの企業ステージに最適化された情報です
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// A/Bテスト機能
interface ABTestVariant {
  id: string;
  weight: number;
  content: React.ReactNode;
}

interface ABTestProps {
  testName: string;
  variants: ABTestVariant[];
  className?: string;
}

export function ABTest({ testName, variants, className = '' }: ABTestProps) {
  const [selectedVariant, setSelectedVariant] = useState<ABTestVariant | null>(null);

  useEffect(() => {
    // ローカルストレージから既存の選択を確認
    const savedVariant = localStorage.getItem(`ab_test_${testName}`);
    
    if (savedVariant) {
      const variant = variants.find(v => v.id === savedVariant);
      if (variant) {
        setSelectedVariant(variant);
        return;
      }
    }

    // 重み付きランダム選択
    const totalWeight = variants.reduce((sum, variant) => sum + variant.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const variant of variants) {
      random -= variant.weight;
      if (random <= 0) {
        setSelectedVariant(variant);
        localStorage.setItem(`ab_test_${testName}`, variant.id);
        
        // アナリティクスに送信（実装時）
        // analytics.track('ab_test_assigned', { testName, variantId: variant.id });
        break;
      }
    }
  }, [testName, variants]);

  if (!selectedVariant) return null;

  return (
    <div className={className}>
      {selectedVariant.content}
    </div>
  );
}

// 行動予測に基づくレコメンデーション
export function BehaviorBasedRecommendation({ className = '' }: { className?: string }) {
  const profile = useUserProfile();
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    const recs: string[] = [];

    // 訪問回数に基づく推奨
    if (profile.visitCount === 1) {
      recs.push('まずは5分診断で現状把握をしませんか？');
    } else if (profile.visitCount > 3 && !profile.interests.includes('consultation-booked')) {
      recs.push('そろそろ専門家に直接相談してみませんか？');
    }

    // 企業ステージに基づく推奨
    if (profile.companyStage === 'scaling' && !profile.interests.includes('ipo-guide-downloaded')) {
      recs.push('IPO準備ガイドをダウンロードして詳細をチェック');
    }

    // 滞在時間が長い場合
    if (profile.interests.includes('high-engagement')) {
      recs.push('あなたのような意欲的な経営者には特別プランがあります');
    }

    setRecommendations(recs.slice(0, 1)); // 最初の1つのみ表示
  }, [profile]);

  if (recommendations.length === 0) return null;

  return (
    <motion.div
      className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <div className="flex items-start gap-3">
        <div className="text-lg">💡</div>
        <div>
          <div className="font-semibold text-blue-800 text-sm mb-1">
            あなたにおすすめ
          </div>
          <div className="text-blue-700 text-sm">
            {recommendations[0]}
          </div>
        </div>
      </div>
    </motion.div>
  );
}