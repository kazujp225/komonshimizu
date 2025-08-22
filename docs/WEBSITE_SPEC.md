# Webサイト実装仕様書（WEBSITE_SPEC.md）

## 🎯 サイト目標
**目的**: 3秒で価値を理解→5分診断→無料相談→契約のファネル最適化

## 1. サイトマップ

```
/
├── /                           # ホーム（LP）
├── /program                    # プログラム詳細
│   ├── /90d-sprint            # 90日スプリント
│   ├── /core-retainer         # Coreリテイナー
│   └── /ai-revops             # AI RevOps Pack
├── /cases                     # 成果事例一覧
│   └── /cases/[slug]          # 事例詳細
├── /pricing                   # 価格
├── /diagnostic                # 5分診断
├── /booking                   # 無料相談予約
├── /resources                 # 資料/テンプレート
├── /insights                  # コラム/記事
│   └── /insights/[slug]       # 記事詳細
├── /about                     # 私たちについて
├── /self-employed-bud         # 個人経営者向け
├── /faq                       # よくある質問
├── /careers                   # 採用
└── /legal                     # 法務
    ├── /privacy               # プライバシーポリシー
    ├── /terms                 # 利用規約
    └── /tokusho               # 特定商取引法
```

## 2. ページ別実装仕様

### 2.1 ホームページ（LP）
```javascript
// pages/index.jsx
const HomePage = {
  meta: {
    title: 'HANATABA - 年商1億円を再現性で達成する',
    description: 'IPO経験×20歳視点×AIで、今日の売上から上げる。90日で売上が上がる仕組みを構築。',
    ogImage: '/og/home.png'
  },
  
  sections: [
    {
      id: 'hero',
      component: 'HeroSection',
      props: {
        headline: '年商1億円を"再現性"で達成する。',
        subheadline: 'IPO経験×20歳視点×AIで、今日の売上から上げる。',
        badges: [
          { label: '平均継続率', value: '92%', note: '※12ヶ月継続、n=35社' },
          { label: '90日完了率', value: '95%', note: '※KPI達成基準' },
          { label: '実装まで伴走', value: '100%', note: '※全プログラム' }
        ],
        primaryCTA: { text: '5分診断を受ける', href: '/diagnostic' },
        secondaryCTA: { text: '無料相談を予約', href: '/booking' }
      }
    },
    {
      id: 'proof',
      component: 'ProofSection',
      props: {
        testimonials: [], // 実名証言
        logos: [], // 導入企業ロゴ
        metrics: [] // 成果数値
      }
    },
    {
      id: 'differentiation',
      component: 'VennDiagram',
      props: {
        circles: [
          { label: 'コーチング', description: '意識・行動変革' },
          { label: 'コンサル', description: '戦略設計' },
          { label: '実働', description: '実装支援' }
        ],
        center: { label: 'AI', description: '自動化・効率化' }
      }
    },
    {
      id: 'transformation',
      component: 'BeforeAfter',
      props: {
        before: {
          title: '現在',
          items: ['属人的な営業', '価格戦略なし', '採用基準曖昧']
        },
        after: {
          title: '90日後',
          items: ['再現可能な仕組み', '最適化された価格', '明確な採用基準']
        }
      }
    },
    {
      id: 'timeline',
      component: 'Timeline',
      props: {
        milestones: [
          { week: 1, title: 'キックオフ', activities: ['現状診断', 'ゴール設定'] },
          { week: 4, title: 'WBR開始', activities: ['週次レビュー', 'KPI追跡'] },
          { week: 8, title: 'MBR実施', activities: ['月次振り返り', '戦略調整'] },
          { week: 12, title: 'QBR完了', activities: ['成果測定', '次期計画'] }
        ]
      }
    },
    {
      id: 'pricing-summary',
      component: 'PricingCards',
      props: {
        layout: 'decoy', // Good → Best（中央）→ Better
        plans: [] // 価格プラン
      }
    },
    {
      id: 'cases-carousel',
      component: 'CasesCarousel',
      props: {
        filters: ['営業', '採用', '価格', '資金'],
        cases: [] // 事例データ
      }
    },
    {
      id: 'faq-preview',
      component: 'FAQAccordion',
      props: {
        categories: ['時間', '費用', '人手'],
        faqs: [] // FAQ データ
      }
    },
    {
      id: 'mini-diagnostic',
      component: 'MiniDiagnostic',
      props: {
        questions: 5,
        redirectTo: '/diagnostic'
      }
    },
    {
      id: 'final-cta',
      component: 'CTASection',
      props: {
        headline: '今日から売上を上げる',
        primaryCTA: { text: '5分診断を受ける', href: '/diagnostic' }
      }
    }
  ]
};
```

### 2.2 診断ページ
```javascript
// pages/diagnostic.jsx
const DiagnosticPage = {
  meta: {
    title: '5分診断 - あなたの成長機会を特定',
    description: '5つの質問で、売上改善のポテンシャルを診断。具体的なアクションプランを提案。'
  },
  
  flow: {
    intro: {
      title: '5分であなたの成長機会を特定',
      description: '以下の5つの質問にお答えください',
      time: '所要時間：約5分'
    },
    
    questions: [
      {
        id: 'revenue',
        type: 'radio',
        question: '現在の年商規模は？',
        options: [
          { value: 'under-100m', label: '1億円未満' },
          { value: '100-300m', label: '1-3億円' },
          { value: '300m-1b', label: '3-10億円' },
          { value: 'over-1b', label: '10億円以上' }
        ]
      },
      // ... 他の質問
    ],
    
    results: {
      scoring: 'weighted', // 重み付けスコアリング
      display: {
        score: true,
        weakPoints: 3, // TOP3の改善点
        recommendations: true,
        bookingCTA: true
      }
    }
  },
  
  tracking: {
    events: [
      'diagnostic_start',
      'question_answered',
      'diagnostic_complete',
      'result_viewed',
      'booking_clicked'
    ]
  }
};
```

### 2.3 価格ページ
```javascript
// pages/pricing.jsx
const PricingPage = {
  meta: {
    title: '価格 - 投資対効果の高いプログラム',
    description: 'あなたのステージに合わせた3つのプラン。全て成果にコミット。'
  },
  
  layout: {
    type: 'comparison-table',
    highlight: 'better', // Core を強調
    decoyPosition: 'center' // Best をデコイとして中央配置
  },
  
  plans: [
    {
      id: 'good',
      name: '90日スプリント',
      price: 1500000,
      billing: 'one-time',
      features: {
        included: ['現状診断', '戦略設計', '実装支援', '週次レビュー'],
        excluded: ['継続サポート', 'AI自動化']
      },
      cta: { text: '詳細を見る', href: '/program/90d-sprint' }
    },
    {
      id: 'better',
      name: 'HANATABA Core',
      price: 300000,
      billing: 'monthly',
      recommended: true,
      features: {
        included: ['WBR/MBR/QBR', '実働20時間/月', '提案レビュー無制限', '営業同行'],
        excluded: ['AI自動化']
      },
      cta: { text: '無料相談する', href: '/booking' }
    },
    {
      id: 'best',
      name: 'Core + AI Pack',
      price: 450000,
      billing: 'monthly',
      isDecoy: true,
      features: {
        included: ['Core全機能', 'AI自動化', '予測分析', '自動レポート'],
        excluded: []
      },
      cta: { text: '詳細を見る', href: '/program/ai-revops' }
    }
  ],
  
  additionalSections: [
    'ComparisonTable',
    'ROICalculator',
    'MoneyBackGuarantee',
    'FAQ'
  ]
};
```

## 3. コンポーネント実装

### 3.1 共通コンポーネント
```jsx
// components/common/Button.jsx
export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick,
  href,
  disabled = false,
  fullWidth = false,
  icon = null,
  loading = false
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-3';
  
  const variants = {
    primary: 'bg-primary-700 text-white hover:bg-primary-800 focus:ring-primary-700/30',
    secondary: 'bg-secondary-700 text-white hover:bg-secondary-800 focus:ring-secondary-700/30',
    ghost: 'bg-transparent border border-neutral-200 text-neutral-700 hover:bg-neutral-50',
    accent: 'bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-600/30'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-lg',
    xl: 'px-8 py-4 text-xl rounded-xl'
  };
  
  const className = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${loading ? 'cursor-wait' : ''}
  `;
  
  if (href && !disabled) {
    return (
      <Link href={href} className={className}>
        {loading && <Spinner className="mr-2" />}
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </Link>
    );
  }
  
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <Spinner className="mr-2" />}
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};
```

### 3.2 フォームコンポーネント
```jsx
// components/forms/DiagnosticForm.jsx
export const DiagnosticForm = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const questions = [/* ... */];
  
  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    // Track event
    gtag('event', 'question_answered', {
      question_id: questionId,
      question_number: currentStep + 1
    });
    
    // Auto-advance to next question
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Calculate score
      const score = calculateScore(answers);
      
      // Track completion
      gtag('event', 'diagnostic_complete', { score });
      
      // Submit to backend
      const result = await submitDiagnostic(answers);
      
      // Show results
      onComplete(result);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-700 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-neutral-600 mt-2">
          質問 {currentStep + 1} / {questions.length}
        </p>
      </div>
      
      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Question
            {...questions[currentStep]}
            onAnswer={handleAnswer}
            value={answers[questions[currentStep].id]}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="ghost"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          戻る
        </Button>
        
        {currentStep === questions.length - 1 && (
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={isSubmitting}
          >
            診断結果を見る
          </Button>
        )}
      </div>
    </div>
  );
};
```

## 4. パフォーマンス最適化

### 4.1 Core Web Vitals
```javascript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256]
  },
  
  webpack: (config, { dev, isServer }) => {
    // Code splitting
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /node_modules/
        }
      }
    };
    
    return config;
  }
};

// パフォーマンス監視
export const performanceMonitoring = {
  targets: {
    lcp: 2500, // Largest Contentful Paint < 2.5s
    fid: 100,  // First Input Delay < 100ms
    cls: 0.1,  // Cumulative Layout Shift < 0.1
    ttfb: 600  // Time to First Byte < 600ms
  },
  
  monitoring: {
    tool: 'web-vitals',
    reporting: 'Google Analytics',
    alerts: true
  }
};
```

### 4.2 画像最適化
```jsx
// components/common/OptimizedImage.jsx
import Image from 'next/image';

export const OptimizedImage = ({ 
  src, 
  alt, 
  priority = false,
  className = '',
  sizes = '100vw'
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={630}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      sizes={sizes}
      className={className}
      placeholder="blur"
      blurDataURL={generateBlurDataURL(src)}
    />
  );
};
```

## 5. SEO実装

### 5.1 メタデータ管理
```jsx
// components/seo/SEO.jsx
import Head from 'next/head';

export const SEO = ({
  title,
  description,
  canonical,
  ogImage,
  noindex = false,
  jsonLd
}) => {
  const siteTitle = 'HANATABA';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = 'IPO経験×20歳視点×AIで、今日の売上から上げる。';
  const baseUrl = 'https://hanataba.com';
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={ogImage || `${baseUrl}/og-default.png`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical || baseUrl} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={ogImage || `${baseUrl}/og-default.png`} />
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Noindex */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* JSON-LD */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
};
```

### 5.2 構造化データ
```javascript
// utils/structured-data.js
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HANATABA',
  url: 'https://hanataba.com',
  logo: 'https://hanataba.com/logo.png',
  sameAs: [
    'https://twitter.com/hanataba',
    'https://www.linkedin.com/company/hanataba'
  ]
});

export const generateServiceSchema = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.description,
  provider: {
    '@type': 'Organization',
    name: 'HANATABA'
  },
  offers: {
    '@type': 'Offer',
    price: service.price,
    priceCurrency: 'JPY'
  },
  aggregateRating: service.rating ? {
    '@type': 'AggregateRating',
    ratingValue: service.rating.value,
    reviewCount: service.rating.count
  } : undefined
});
```

## 6. アクセシビリティ

### 6.1 WCAG 2.1 AA準拠
```jsx
// components/a11y/SkipLink.jsx
export const SkipLink = () => (
  <a
    href="#main"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-700 text-white px-4 py-2 rounded-lg z-50"
  >
    メインコンテンツへスキップ
  </a>
);

// components/a11y/ScreenReaderOnly.jsx
export const ScreenReaderOnly = ({ children }) => (
  <span className="sr-only">{children}</span>
);
```

### 6.2 キーボードナビゲーション
```javascript
// hooks/useKeyboardNavigation.js
export const useKeyboardNavigation = () => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Escape key closes modals
      if (e.key === 'Escape') {
        closeAllModals();
      }
      
      // Tab trap in modals
      if (e.key === 'Tab' && isModalOpen()) {
        trapFocus(e);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
};
```

## 7. 実装チェックリスト

### Phase 1: 基盤（Week 1）
- [ ] Next.js プロジェクトセットアップ
- [ ] デザイントークン実装
- [ ] 共通コンポーネント作成
- [ ] ルーティング設定

### Phase 2: コアページ（Week 2）
- [ ] ホームページ実装
- [ ] 診断ページ実装
- [ ] 価格ページ実装
- [ ] 予約ページ実装

### Phase 3: 機能実装（Week 3）
- [ ] フォーム バリデーション
- [ ] API連携
- [ ] 決済システム統合
- [ ] CRM連携

### Phase 4: 最適化（Week 4）
- [ ] パフォーマンス チューニング
- [ ] SEO最適化
- [ ] A/Bテスト設定
- [ ] アナリティクス実装

---
*Lighthouse スコア 90+ を維持しながら開発を進めること*