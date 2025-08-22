// Mock data for development - All data defined inline

import type {
  Company,
  AssessmentQuestion,
  AssessmentResult,
  PricingPlan,
  Customer,
  BlogPost,
  Video,
  CaseStudy,
} from '@/types';

// Companies Data
const companiesData = {
  companies: [
    {
      id: 'freee-2019',
      name: 'freee株式会社',
      industry: 'フィンテック',
      founded: '2012-07-09',
      ipoDate: '2019-12-17',
      currentMarketCap: 180000000000,
      tags: ['クラウド会計', 'SaaS', 'スモールビジネス'],
      description: 'クラウド会計ソフトを提供するフィンテック企業'
    },
    {
      id: 'mercari-2018',
      name: '株式会社メルカリ',
      industry: 'Eコマース',
      founded: '2013-02-01',
      ipoDate: '2018-06-19',
      currentMarketCap: 450000000000,
      tags: ['フリマアプリ', 'C2C', 'モバイル'],
      description: 'フリマアプリ「メルカリ」を運営するEコマース企業'
    }
  ]
};

// Assessment Questions Data
const questionsData = {
  questions: [
    {
      id: 'q1',
      category: 'basic_info',
      question: 'あなたの現在の年齢は？',
      type: 'single_choice' as const,
      options: [
        { value: 'under_20', label: '20歳未満', score: 1 },
        { value: '20_25', label: '20-25歳', score: 5 },
        { value: '26_30', label: '26-30歳', score: 4 },
        { value: '31_35', label: '31-35歳', score: 3 },
        { value: 'over_35', label: '36歳以上', score: 2 }
      ],
      weight: 0.8
    },
    {
      id: 'q2',
      category: 'business_stage',
      question: '現在のビジネスステージは？',
      type: 'single_choice' as const,
      options: [
        { value: 'idea', label: 'アイデア段階', score: 1 },
        { value: 'prototype', label: 'プロトタイプ開発中', score: 2 },
        { value: 'mvp', label: 'MVP完成', score: 3 },
        { value: 'revenue', label: '売上発生', score: 4 },
        { value: 'growth', label: '成長段階', score: 5 }
      ],
      weight: 1.0
    },
    {
      id: 'q3',
      category: 'market_size',
      question: 'ターゲット市場の規模は？',
      type: 'single_choice' as const,
      options: [
        { value: 'small', label: '100億円未満', score: 2 },
        { value: 'medium', label: '100-1000億円', score: 3 },
        { value: 'large', label: '1000億円-1兆円', score: 4 },
        { value: 'huge', label: '1兆円以上', score: 5 },
        { value: 'unknown', label: 'わからない', score: 1 }
      ],
      weight: 0.9
    },
    {
      id: 'q4',
      category: 'team',
      question: 'チーム規模は？',
      type: 'single_choice' as const,
      options: [
        { value: 'solo', label: '1人（自分のみ）', score: 1 },
        { value: 'small', label: '2-5人', score: 3 },
        { value: 'medium', label: '6-20人', score: 4 },
        { value: 'large', label: '21人以上', score: 5 },
        { value: 'none', label: 'まだチームなし', score: 1 }
      ],
      weight: 0.7
    },
    {
      id: 'q5',
      category: 'funding',
      question: '資金調達の経験は？',
      type: 'single_choice' as const,
      options: [
        { value: 'none', label: '未経験', score: 1 },
        { value: 'friends', label: '友人・家族から', score: 2 },
        { value: 'angel', label: 'エンジェル投資家から', score: 3 },
        { value: 'vc', label: 'VC・投資ファンドから', score: 4 },
        { value: 'multiple', label: '複数回の調達経験', score: 5 }
      ],
      weight: 0.8
    },
    {
      id: 'q6',
      category: 'revenue',
      question: '現在の月間売上は？',
      type: 'single_choice' as const,
      options: [
        { value: 'zero', label: '0円', score: 1 },
        { value: 'small', label: '1万円-10万円', score: 2 },
        { value: 'medium', label: '10万円-100万円', score: 3 },
        { value: 'large', label: '100万円-1000万円', score: 4 },
        { value: 'huge', label: '1000万円以上', score: 5 }
      ],
      weight: 1.0
    },
    {
      id: 'q7',
      category: 'technology',
      question: 'プロダクトの技術的優位性は？',
      type: 'single_choice' as const,
      options: [
        { value: 'none', label: '特になし', score: 1 },
        { value: 'some', label: 'ある程度あり', score: 2 },
        { value: 'strong', label: '強い優位性あり', score: 4 },
        { value: 'patent', label: '特許取得済み', score: 5 },
        { value: 'unknown', label: 'わからない', score: 1 }
      ],
      weight: 0.6
    },
    {
      id: 'q8',
      category: 'competition',
      question: '競合の状況は？',
      type: 'single_choice' as const,
      options: [
        { value: 'none', label: '競合なし', score: 3 },
        { value: 'few', label: '少数の競合', score: 4 },
        { value: 'many', label: '多くの競合', score: 2 },
        { value: 'dominant', label: '圧倒的な競合がいる', score: 1 },
        { value: 'unknown', label: 'わからない', score: 2 }
      ],
      weight: 0.7
    },
    {
      id: 'q9',
      category: 'scalability',
      question: 'ビジネスモデルの拡張性は？',
      type: 'single_choice' as const,
      options: [
        { value: 'low', label: '限定的', score: 2 },
        { value: 'medium', label: '中程度', score: 3 },
        { value: 'high', label: '高い', score: 4 },
        { value: 'global', label: 'グローバル展開可能', score: 5 },
        { value: 'unknown', label: 'わからない', score: 1 }
      ],
      weight: 0.9
    },
    {
      id: 'q10',
      category: 'experience',
      question: 'あなたの起業・経営経験は？',
      type: 'single_choice' as const,
      options: [
        { value: 'none', label: '初回起業', score: 2 },
        { value: 'some', label: '小規模事業の経験あり', score: 3 },
        { value: 'serial', label: '連続起業家', score: 4 },
        { value: 'executive', label: '大手企業での経営経験', score: 4 },
        { value: 'successful', label: '過去に成功したIPO経験', score: 5 }
      ],
      weight: 0.8
    },
    {
      id: 'q11',
      category: 'commitment',
      question: 'IPOに向けた本気度は？',
      type: 'single_choice' as const,
      options: [
        { value: 'low', label: '興味程度', score: 1 },
        { value: 'medium', label: '検討中', score: 2 },
        { value: 'high', label: '真剣に考えている', score: 4 },
        { value: 'committed', label: '絶対に実現したい', score: 5 },
        { value: 'unsure', label: 'まだ決めていない', score: 1 }
      ],
      weight: 1.0
    },
    {
      id: 'q12',
      category: 'timeline',
      question: 'IPOの希望時期は？',
      type: 'single_choice' as const,
      options: [
        { value: '1_year', label: '1年以内', score: 2 },
        { value: '3_years', label: '3年以内', score: 4 },
        { value: '5_years', label: '5年以内', score: 5 },
        { value: '10_years', label: '10年以内', score: 3 },
        { value: 'flexible', label: '時期は問わない', score: 2 }
      ],
      weight: 0.6
    }
  ]
};

// Assessment Results Data
const resultsData = {
  results: [
    {
      id: 'level_1',
      level: 1,
      title: 'IPO準備段階レベル1',
      subtitle: '基礎固めからスタート',
      description: 'まずはビジネスの基盤作りに集中しましょう。市場調査、チーム作り、MVPの開発など、IPOに向けた長期的な準備が必要です。',
      recommendations: [
        '市場調査とビジネスモデルの検証',
        'チームメンバーの採用・確保',
        'MVP（最小機能製品）の開発',
        '初期顧客の獲得とフィードバック収集'
      ],
      scoreRange: { min: 12, max: 24 },
      color: 'red'
    },
    {
      id: 'level_2',
      level: 2,
      title: 'IPO準備段階レベル2',
      subtitle: '成長基盤の構築',
      description: 'ビジネスの基盤ができてきました。次は持続的な成長に向けた体制づくりと、初期の資金調達を検討する段階です。',
      recommendations: [
        '持続可能なビジネスモデルの確立',
        '初回資金調達の準備・実行',
        '営業・マーケティング体制の構築',
        '内部統制システムの基礎作り'
      ],
      scoreRange: { min: 25, max: 36 },
      color: 'orange'
    },
    {
      id: 'level_3',
      level: 3,
      title: 'IPO準備段階レベル3',
      subtitle: '成長加速フェーズ',
      description: '事業が軌道に乗り始めています。さらなる成長に向けた投資と組織体制の強化、複数回の資金調達を検討する時期です。',
      recommendations: [
        'シリーズA/Bラウンドの資金調達',
        '組織体制とガバナンス強化',
        '事業拡大・新市場開拓',
        'IPO準備に向けた管理体制構築'
      ],
      scoreRange: { min: 37, max: 48 },
      color: 'yellow'
    },
    {
      id: 'level_4',
      level: 4,
      title: 'IPO準備段階レベル4',
      subtitle: 'IPO直前準備',
      description: '高い成長率と強固な事業基盤を築けています。IPOに向けた具体的な準備を始める段階です。専門家チームとの連携が重要になります。',
      recommendations: [
        'IPO準備のための専門チーム結成',
        '監査法人・証券会社の選定',
        '内部統制システムの完全構築',
        'IR体制の整備と投資家向け資料準備'
      ],
      scoreRange: { min: 49, max: 56 },
      color: 'green'
    },
    {
      id: 'level_5',
      level: 5,
      title: 'IPO準備段階レベル5',
      subtitle: 'IPO実行準備完了',
      description: '素晴らしい！IPO実現に向けた条件が整っています。専門的なサポートを受けながら、上場申請に向けた最終準備を進めましょう。',
      recommendations: [
        '上場申請書類の作成・提出',
        '証券取引所での審査対応',
        '機関投資家向けロードショー実施',
        '上場後の成長戦略の策定・実行'
      ],
      scoreRange: { min: 57, max: 60 },
      color: 'blue'
    }
  ]
};

// Pricing Plans Data
const plansData = {
  plans: [
    {
      id: 'good',
      name: 'IPOスタートアップ診断',
      tier: 'Good',
      price: 980000,
      duration: 'one_time',
      features: [
        'IPO実現可能性の詳細診断',
        '市場分析レポート',
        'ビジネスモデル評価',
        'アクションプラン策定',
        'メール相談サポート（3ヶ月間）'
      ],
      description: 'IPO実現に向けた現状把握と基本戦略の策定',
      popular: false,
      cta: '診断を申し込む'
    },
    {
      id: 'better',
      name: 'IPO戦略パッケージ',
      tier: 'Better',
      price: 2980000,
      duration: 'monthly',
      originalPrice: 3500000,
      features: [
        'IPOスタートアップ診断（全内容）',
        '月次戦略ミーティング（2回）',
        '投資家紹介・マッチング',
        '資金調達戦略サポート',
        '組織・ガバナンス体制構築支援',
        '24時間チャットサポート',
        'IPO準備チェックリスト提供'
      ],
      description: 'IPO実現に向けた包括的なサポートと戦略実行支援',
      popular: true,
      cta: '戦略パッケージを選ぶ'
    },
    {
      id: 'best',
      name: 'IPO完全サポート',
      tier: 'Best',
      price: 8800000,
      duration: 'monthly',
      originalPrice: 12000000,
      features: [
        'IPO戦略パッケージ（全内容）',
        '専任コンサルタント配置',
        '週次戦略会議（4回/月）',
        'IPO申請書類作成支援',
        '証券会社・監査法人紹介',
        'IR戦略・投資家対応支援',
        '上場後成長戦略策定',
        '無制限コンサルティング',
        '成功報酬制度あり'
      ],
      description: 'IPO成功まで伴走する最高レベルのコンサルティング',
      popular: false,
      cta: '完全サポートを選ぶ'
    }
  ]
};

// Customers Data
const customersData = {
  customers: [
    {
      id: 'customer_001',
      name: '田中太郎',
      email: 'tanaka@example.com',
      company: 'TechStartup株式会社',
      subscription: {
        planId: 'better',
        startDate: '2024-01-15',
        status: 'active',
        totalLifetimeValue: 15000000
      },
      assessmentScore: 45,
      profile: {
        age: 28,
        industry: 'テクノロジー',
        businessStage: 'growth',
        teamSize: 15
      }
    },
    {
      id: 'customer_002',
      name: '佐藤花子',
      email: 'sato@example.com',
      company: 'AI Solutions株式会社',
      subscription: {
        planId: 'best',
        startDate: '2024-02-20',
        status: 'active',
        totalLifetimeValue: 32000000
      },
      assessmentScore: 52,
      profile: {
        age: 26,
        industry: 'AI・機械学習',
        businessStage: 'growth',
        teamSize: 45
      }
    },
    {
      id: 'customer_003',
      name: '山田健一',
      email: 'yamada@example.com',
      company: 'FinTech Innovation株式会社',
      subscription: {
        planId: 'better',
        startDate: '2024-03-10',
        status: 'active',
        totalLifetimeValue: 18000000
      },
      assessmentScore: 48,
      profile: {
        age: 31,
        industry: 'フィンテック',
        businessStage: 'scaling',
        teamSize: 25
      }
    },
    {
      id: 'customer_004',
      name: '鈴木美咲',
      email: 'suzuki@example.com',
      company: 'HealthTech Pro株式会社',
      subscription: {
        planId: 'good',
        startDate: '2024-04-05',
        status: 'active',
        totalLifetimeValue: 5000000
      },
      assessmentScore: 38,
      profile: {
        age: 29,
        industry: 'ヘルスケア',
        businessStage: 'mvp',
        teamSize: 8
      }
    }
  ]
};

// Blog Posts Data
const blogPostsData = {
  blogPosts: [
    {
      id: 'blog_001',
      title: '20代でIPOを実現するための5つの戦略',
      slug: '20s-ipo-strategy-guide',
      excerpt: '若手起業家がIPOを成功させるために必要な戦略と実践的なアプローチを詳しく解説します。',
      content: `
# 20代でIPOを実現するための5つの戦略

20代でのIPO実現は決して不可能ではありません。実際に、多くの若手起業家がこの偉業を達成しています。

## 1. 市場タイミングの見極め

成長市場での事業展開が重要です。

## 2. 強固なチーム作り

優秀なメンバーとの協働が成功の鍵となります。

## 3. 資金調達戦略

段階的な資金調達により、持続的な成長を実現します。

## 4. スケーラブルなビジネスモデル

拡張性の高いビジネスモデルの構築が必須です。

## 5. 早期からのIPO準備

内部統制やガバナンス体制の整備を早期から始めましょう。
      `,
      category: 'IPO戦略',
      tags: ['20代起業', 'IPO戦略', '若手経営者', '資金調達'],
      author: {
        name: '佐藤CEO',
        role: 'IPOコンサルタント',
        avatar: 'https://example.com/avatar1.jpg'
      },
      publishedAt: '2024-10-15T09:00:00Z',
      readingTime: 8,
      engagement: {
        views: 15420,
        likes: 234,
        shares: 67,
        comments: 45
      },
      cta: 'あなたも5分診断でIPOの可能性をチェックしてみませんか？'
    },
    {
      id: 'blog_002',
      title: 'フィンテック企業のIPO成功事例分析',
      slug: 'fintech-ipo-case-study',
      excerpt: '近年注目を集めるフィンテック企業のIPO事例を分析し、成功要因を探ります。',
      content: `
# フィンテック企業のIPO成功事例分析

フィンテック業界は近年、多くのIPO成功事例を生み出しています。

## 主要成功事例

### freee株式会社
2019年にマザーズ市場で上場を果たした代表的な事例です。

### 株式会社マネーフォワード
家計簿アプリから事業を拡大し、2017年に上場を実現しました。

## 成功要因の分析

1. 明確な市場ニーズの特定
2. スケーラブルなSaaSモデル
3. 強固な技術基盤
4. 規制対応への早期着手

## 学べるポイント

これらの事例から学べる重要なポイントを詳しく解説します。
      `,
      category: 'IPO分析',
      tags: ['フィンテック', 'IPO事例', 'SaaS', 'マネーフォワード', 'freee'],
      author: {
        name: '田中アナリスト',
        role: '金融アナリスト',
        avatar: 'https://example.com/avatar2.jpg'
      },
      publishedAt: '2024-10-10T14:30:00Z',
      readingTime: 12,
      engagement: {
        views: 8900,
        likes: 156,
        shares: 42,
        comments: 28
      },
      cta: 'フィンテック分野での起業を考えているなら、まずは診断から始めましょう'
    },
    {
      id: 'blog_003',
      title: 'AI・テクノロジー企業の資金調達トレンド2024',
      slug: 'ai-tech-funding-trends-2024',
      excerpt: '2024年のAI・テクノロジー企業への投資動向と資金調達戦略について解説します。',
      content: `
# AI・テクノロジー企業の資金調達トレンド2024

2024年のテクノロジー業界では、AI関連企業への投資が活発化しています。

## 投資トレンド

### 生成AI企業への集中投資
ChatGPTの成功を受け、生成AI分野への投資が急増しています。

### エンタープライズAIの注目
企業向けAIソリューションへの需要が高まっています。

## 資金調達のポイント

1. 明確なAI戦略の提示
2. 実証済みのビジネスモデル
3. 経験豊富なチーム
4. スケールアップ計画

## 今後の展望

AI企業のIPOラッシュが予想される中、準備すべき要素を解説します。
      `,
      category: 'テクノロジー',
      tags: ['AI', '資金調達', 'テクノロジー', '生成AI', 'エンタープライズ'],
      author: {
        name: '山田CTO',
        role: 'テクノロジーコンサルタント',
        avatar: 'https://example.com/avatar3.jpg'
      },
      publishedAt: '2024-10-05T11:15:00Z',
      readingTime: 10,
      engagement: {
        views: 12300,
        likes: 189,
        shares: 58,
        comments: 34
      },
      cta: 'AI分野での起業支援も行っています。まずは診断でポテンシャルを確認しましょう'
    }
  ]
};

// Videos Data
const videosData = {
  shortVideos: [
    {
      id: 'video_001',
      title: '20歳でIPOを目指す理由',
      duration: 60,
      thumbnail: 'https://example.com/thumb1.jpg',
      url: 'https://example.com/video1.mp4',
      category: 'IPO戦略',
      tags: ['20代起業', 'IPO', 'モチベーション'],
      performance: {
        totalViews: 25000,
        likes: 890,
        shares: 156,
        comments: 78
      },
      publishedAt: '2024-10-12T16:00:00Z'
    }
  ]
};

// Case Studies Data
const caseStudiesData = {
  caseStudies: [
    {
      id: 'case_001',
      title: '27歳でIPO達成！AI企業の成長ストーリー',
      subtitle: 'テクノロジーの力で社会課題を解決する起業家の軌跡',
      company: {
        name: 'AI Solutions株式会社',
        industry: 'AI・テクノロジー',
        founded: '2020-03-15',
        ipoDate: '2024-09-20',
        currentMarketCap: 45000000000
      },
      founder: {
        name: '鈴木健太',
        ageAtIPO: 27,
        background: '東京大学工学部卒業後、GoogleでAIエンジニアとして3年間勤務'
      },
      story: {
        challenge: '企業の業務効率化におけるAI活用の課題',
        solution: 'ノーコードAIプラットフォームの開発',
        growth: '創業4年で売上100億円を達成',
        ipo: '2024年9月に東証グロース市場へ上場'
      },
      timeline: [
        {
          date: '2020-03',
          milestone: '会社設立',
          description: '元Google社員として独立、AI企業を創業'
        },
        {
          date: '2020-12',
          milestone: 'シードラウンド',
          description: '3億円の資金調達を実施'
        },
        {
          date: '2022-06',
          milestone: 'シリーズA',
          description: '15億円の資金調達、事業拡大'
        },
        {
          date: '2023-11',
          milestone: 'シリーズB',
          description: '50億円の資金調達、海外展開開始'
        },
        {
          date: '2024-09',
          milestone: 'IPO',
          description: '東証グロース市場への上場達成'
        }
      ],
      metrics: {
        totalFunding: '68億円',
        employeeGrowth: '3名 → 180名',
        revenueGrowth: '0円 → 100億円',
        valuation: '450億円'
      },
      views: 5420,
      shares: 234,
      downloads: 156
    },
    {
      id: 'case_002',
      title: '25歳女性CEO、ヘルスケア分野でIPO実現',
      subtitle: '医療×テクノロジーで新しい価値を創造した女性起業家',
      company: {
        name: 'MedTech Innovation株式会社',
        industry: 'ヘルスケア',
        founded: '2021-01-10',
        ipoDate: '2024-11-15',
        currentMarketCap: 28000000000
      },
      founder: {
        name: '佐々木美咲',
        ageAtIPO: 25,
        background: '慶應義塾大学医学部卒業、医師免許取得後にMBA取得'
      },
      story: {
        challenge: '医療現場での診断精度向上の課題',
        solution: 'AI診断支援システムの開発',
        growth: '創業3年で医療機関1000施設に導入',
        ipo: '2024年11月に東証マザーズ市場へ上場'
      },
      timeline: [
        {
          date: '2021-01',
          milestone: '会社設立',
          description: '医師としての経験を活かしMedTech企業を創業'
        },
        {
          date: '2021-08',
          milestone: 'プロダクト開発',
          description: 'AI診断支援システムのプロトタイプ完成'
        },
        {
          date: '2022-03',
          milestone: 'シードラウンド',
          description: '8億円の資金調達を実施'
        },
        {
          date: '2023-05',
          milestone: 'シリーズA',
          description: '25億円の資金調達、薬事承認取得'
        },
        {
          date: '2024-11',
          milestone: 'IPO',
          description: '東証マザーズ市場への上場達成'
        }
      ],
      metrics: {
        totalFunding: '33億円',
        employeeGrowth: '5名 → 120名',
        revenueGrowth: '0円 → 45億円',
        valuation: '280億円'
      },
      views: 4890,
      shares: 198,
      downloads: 142
    }
  ]
};

// Utility functions for data access
export const getBlogPosts = (): BlogPost[] => {
  return blogPostsData.blogPosts;
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPostsData.blogPosts.find(post => post.slug === slug);
};

export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPostsData.blogPosts.find(post => post.id === id);
};

export const getRecentBlogPosts = (limit: number = 5): BlogPost[] => {
  return blogPostsData.blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};

export const getAssessmentQuestions = (): AssessmentQuestion[] => {
  return questionsData.questions;
};

export const getAssessmentResult = (score: number): AssessmentResult | undefined => {
  return resultsData.results.find(result => 
    score >= result.scoreRange.min && score <= result.scoreRange.max
  );
};

export const getAssessmentResultByScore = (score: number): AssessmentResult | undefined => {
  return resultsData.results.find(result => 
    score >= result.scoreRange.min && score <= result.scoreRange.max
  );
};

export const getAssessmentSections = () => {
  // Group questions by category for better UX
  const sections = [
    {
      id: 'basic_info',
      title: '基本情報',
      description: 'あなたの基本的な情報についてお聞かせください',
      questions: questionsData.questions.filter(q => q.category === 'basic_info')
    },
    {
      id: 'business',
      title: 'ビジネス状況',
      description: '現在のビジネスの状況についてお聞かせください',
      questions: questionsData.questions.filter(q => 
        ['business_stage', 'market_size', 'revenue', 'scalability'].includes(q.category)
      )
    },
    {
      id: 'team_funding',
      title: 'チーム・資金調達',
      description: 'チーム構成と資金調達についてお聞かせください',
      questions: questionsData.questions.filter(q => 
        ['team', 'funding', 'experience'].includes(q.category)
      )
    },
    {
      id: 'competitive',
      title: '競争優位性',
      description: '競合状況と技術的優位性についてお聞かせください',
      questions: questionsData.questions.filter(q => 
        ['technology', 'competition'].includes(q.category)
      )
    },
    {
      id: 'commitment',
      title: 'IPOへのコミット',
      description: 'IPOに対する意欲とタイムラインについてお聞かせください',
      questions: questionsData.questions.filter(q => 
        ['commitment', 'timeline'].includes(q.category)
      )
    }
  ];

  return sections;
};

export const getPricingPlans = (): PricingPlan[] => {
  return plansData.plans;
};

export const getCaseStudies = () => {
  return caseStudiesData.caseStudies;
};

export const getCaseStudyById = (id: string) => {
  return caseStudiesData.caseStudies.find(study => study.id === id);
};

export const getTopVideos = (limit: number = 10) => {
  return videosData.shortVideos
    .sort((a, b) => b.performance.totalViews - a.performance.totalViews)
    .slice(0, limit);
};

export const getCustomers = (): Customer[] => {
  return customersData.customers;
};

export const getHighValueCustomers = (): Customer[] => {
  return customersData.customers.filter(
    customer => customer.subscription.totalLifetimeValue > 10000000
  );
};

// Search functions
export const searchBlogPosts = (query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase();
  return blogPostsData.blogPosts.filter(
    post =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const searchCompanies = (query: string): Company[] => {
  const lowercaseQuery = query.toLowerCase();
  return companiesData.companies.filter(
    company =>
      company.name.toLowerCase().includes(lowercaseQuery) ||
      company.industry.toLowerCase().includes(lowercaseQuery) ||
      company.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// Dashboard KPI functions
export const getDashboardKPIs = () => {
  return {
    current: {
      mrr: 8500000,
      customers: 42,
      churnRate: 0.035,
      winRate: 0.22
    },
    trends: {
      mrr: 15.3,
      customers: 8.7,
      churnRate: -2.1,
      winRate: 5.8
    },
    revenueHistory: [
      { month: '4月', revenue: 4200000 },
      { month: '5月', revenue: 5100000 },
      { month: '6月', revenue: 5800000 },
      { month: '7月', revenue: 6500000 },
      { month: '8月', revenue: 7200000 },
      { month: '9月', revenue: 7900000 },
      { month: '10月', revenue: 8500000 }
    ]
  };
};

export const getGrowthMetrics = () => {
  return {
    monthlyGrowthRate: 0.18,
    arr: 102000000,
    ltvCacRatio: 4.2,
    nrr: 1.15,
    ltv: 24500000,
    cac: 5800000,
    cohortData: [
      {
        month: '2024-04',
        retention: [100, 95, 88, 82, 78, 75, 72, 70, 68, 66, 64, 62]
      },
      {
        month: '2024-05',
        retention: [100, 96, 90, 85, 81, 78, 75, 73, 71, 69, 67, 0]
      },
      {
        month: '2024-06',
        retention: [100, 97, 92, 87, 83, 80, 77, 75, 73, 71, 0, 0]
      },
      {
        month: '2024-07',
        retention: [100, 98, 93, 88, 84, 81, 78, 76, 74, 0, 0, 0]
      },
      {
        month: '2024-08',
        retention: [100, 98, 94, 89, 85, 82, 79, 77, 0, 0, 0, 0]
      },
      {
        month: '2024-09',
        retention: [100, 99, 95, 90, 86, 83, 80, 0, 0, 0, 0, 0]
      },
      {
        month: '2024-10',
        retention: [100, 99, 96, 91, 87, 84, 0, 0, 0, 0, 0, 0]
      }
    ]
  };
};

export const getConversionFunnelData = () => {
  return {
    stages: [
      { name: 'Webサイト訪問', count: 12500 },
      { name: '5分診断開始', count: 2100 },
      { name: '診断完了', count: 1680 },
      { name: '資料ダウンロード', count: 945 },
      { name: '商談申込', count: 420 },
      { name: '商談実施', count: 315 },
      { name: '提案書提出', count: 168 },
      { name: '成約', count: 52 }
    ],
    overallConversion: 0.0042,
    avgDealSize: 3600000,
    avgSalesCycle: 45,
    pipelineValue: '¥420M'
  };
};