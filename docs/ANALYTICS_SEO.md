# 分析・SEO設計（ANALYTICS_SEO.md）

## 🎯 分析・SEOの目的
**データドリブンな意思決定と自然検索からの継続的な流入確保**

## 1. 分析フレームワーク

### 1.1 KPIツリー
```yaml
north_star_metric:
  name: Monthly Recurring Revenue (MRR)
  target: ¥10,000,000
  
  level_1_drivers:
    new_mrr:
      formula: 新規顧客数 × 平均契約額
      weight: 0.4
      
    expansion_mrr:
      formula: 既存顧客数 × アップセル率 × アップセル額
      weight: 0.3
      
    churned_mrr:
      formula: 解約顧客数 × 平均契約額 × -1
      weight: 0.3
      
  level_2_drivers:
    acquisition:
      - リード数
      - リード→商談転換率
      - 商談→成約率
      - 平均契約期間
      
    activation:
      - オンボーディング完了率
      - Time to Value
      - 初回利用率
      
    retention:
      - 月次継続率
      - 利用頻度
      - エンゲージメントスコア
      
    revenue:
      - 平均契約額
      - アップセル率
      - 契約期間延長率
```

### 1.2 計測イベント設計
```javascript
// analytics/events.js
const trackingEvents = {
  // ユーザー行動
  user_actions: {
    page_view: {
      trigger: 'ページ読み込み',
      parameters: {
        page_title: 'string',
        page_location: 'url',
        page_path: 'string'
      }
    },
    
    scroll_depth: {
      trigger: '25%, 50%, 75%, 90%到達',
      parameters: {
        percent_scrolled: 'number'
      }
    },
    
    click: {
      trigger: 'CTA/リンククリック',
      parameters: {
        link_text: 'string',
        link_url: 'string',
        link_domain: 'string',
        outbound: 'boolean'
      }
    },
    
    video_engagement: {
      trigger: '再生/一時停止/完了',
      parameters: {
        video_title: 'string',
        video_percent: 'number',
        video_current_time: 'number'
      }
    }
  },
  
  // コンバージョンイベント
  conversion_events: {
    lead_capture: {
      trigger: 'フォーム送信成功',
      parameters: {
        form_name: 'string',
        form_type: 'string',
        lead_source: 'string'
      },
      value: 1000 // 推定価値
    },
    
    diagnostic_start: {
      trigger: '診断開始',
      parameters: {
        diagnostic_type: 'string'
      }
    },
    
    diagnostic_complete: {
      trigger: '診断完了',
      parameters: {
        diagnostic_score: 'number',
        diagnostic_result: 'string'
      },
      value: 5000
    },
    
    booking_complete: {
      trigger: '相談予約完了',
      parameters: {
        meeting_type: 'string',
        meeting_date: 'date'
      },
      value: 10000
    },
    
    purchase: {
      trigger: '契約締結',
      parameters: {
        transaction_id: 'string',
        value: 'number',
        currency: 'string',
        items: 'array'
      }
    }
  },
  
  // カスタムイベント
  custom_events: {
    content_download: {
      trigger: '資料ダウンロード',
      parameters: {
        content_name: 'string',
        content_type: 'string',
        content_category: 'string'
      }
    },
    
    tool_usage: {
      trigger: 'ツール利用',
      parameters: {
        tool_name: 'string',
        tool_action: 'string',
        tool_value: 'string'
      }
    }
  }
};
```

## 2. Google Analytics 4 設定

### 2.1 GA4実装
```javascript
// analytics/ga4-setup.js
// Google Tag Manager経由での実装
const gtmConfig = {
  container_id: 'GTM-XXXXXX',
  
  dataLayer_structure: {
    event: 'event_name',
    event_parameters: {},
    user_properties: {
      user_id: 'string',
      user_type: 'string',
      company_size: 'string',
      industry: 'string'
    },
    ecommerce: {
      transaction_id: 'string',
      value: 'number',
      currency: 'JPY',
      items: []
    }
  }
};

// GA4イベント送信関数
function trackEvent(eventName, parameters = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...parameters
  });
}

// Enhanced Ecommerce
function trackPurchase(transactionData) {
  window.dataLayer.push({
    event: 'purchase',
    ecommerce: {
      transaction_id: transactionData.id,
      value: transactionData.total,
      currency: 'JPY',
      items: transactionData.items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        quantity: item.quantity
      }))
    }
  });
}
```

### 2.2 カスタムディメンション/メトリクス
```yaml
custom_dimensions:
  user_scope:
    - name: company_type
      description: 企業タイプ（スタートアップ/中小/大企業）
    - name: user_role
      description: ユーザーの役職
    - name: lifecycle_stage
      description: カスタマーライフサイクルステージ
      
  event_scope:
    - name: content_category
      description: コンテンツカテゴリ
    - name: cta_position
      description: CTAの配置位置
    - name: ab_test_variant
      description: A/Bテストバリアント
      
custom_metrics:
  - name: engagement_score
    scope: user
    measurement_unit: standard
    description: ユーザーエンゲージメントスコア（0-100）
    
  - name: lead_score
    scope: user
    measurement_unit: standard
    description: リードスコア（0-100）
```

## 3. SEO戦略

### 3.1 キーワード戦略
```javascript
const keywordStrategy = {
  primary_keywords: {
    'B2B営業効率化': {
      search_volume: 5400,
      difficulty: 65,
      intent: 'informational',
      target_page: '/insights/b2b-sales-efficiency'
    },
    
    '営業SOP': {
      search_volume: 2900,
      difficulty: 45,
      intent: 'informational',
      target_page: '/resources/sales-sop-template'
    },
    
    'IPO準備': {
      search_volume: 8100,
      difficulty: 72,
      intent: 'informational',
      target_page: '/insights/ipo-preparation'
    },
    
    '価格戦略コンサル': {
      search_volume: 1300,
      difficulty: 58,
      intent: 'transactional',
      target_page: '/program/pricing-strategy'
    }
  },
  
  long_tail_keywords: {
    'B2B SaaS 営業 効率化 方法': {
      search_volume: 320,
      difficulty: 35,
      intent: 'informational'
    },
    
    'スタートアップ 営業プロセス 構築': {
      search_volume: 210,
      difficulty: 28,
      intent: 'informational'
    },
    
    '営業 WBR やり方': {
      search_volume: 140,
      difficulty: 22,
      intent: 'informational'
    }
  },
  
  content_clusters: {
    営業改革: {
      pillar_page: '/営業改革完全ガイド',
      cluster_pages: [
        '/営業プロセス最適化',
        '/営業KPI設定',
        '/営業ツール選定',
        '/営業トレーニング'
      ]
    },
    
    価格戦略: {
      pillar_page: '/価格戦略マスターガイド',
      cluster_pages: [
        '/価格設定手法',
        '/競合価格分析',
        '/価格心理学',
        '/アップセル戦略'
      ]
    }
  }
};
```

### 3.2 テクニカルSEO
```html
<!-- SEO最適化HTMLテンプレート -->
<!DOCTYPE html>
<html lang="ja">
<head>
  <!-- 基本メタタグ -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ページタイトル（32-60文字）| HANATABA</title>
  <meta name="description" content="メタディスクリプション（120-160文字）">
  
  <!-- Open Graph -->
  <meta property="og:title" content="OGタイトル">
  <meta property="og:description" content="OG説明文">
  <meta property="og:image" content="https://hanataba.com/og-image.jpg">
  <meta property="og:url" content="https://hanataba.com/current-page">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="HANATABA">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Twitterタイトル">
  <meta name="twitter:description" content="Twitter説明文">
  <meta name="twitter:image" content="https://hanataba.com/twitter-image.jpg">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://hanataba.com/canonical-url">
  
  <!-- Hreflang（多言語対応の場合） -->
  <link rel="alternate" hreflang="ja" href="https://hanataba.com/ja/page">
  <link rel="alternate" hreflang="en" href="https://hanataba.com/en/page">
  
  <!-- 構造化データ -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HANATABA",
    "url": "https://hanataba.com",
    "logo": "https://hanataba.com/logo.png",
    "sameAs": [
      "https://twitter.com/hanataba",
      "https://www.linkedin.com/company/hanataba"
    ]
  }
  </script>
</head>
```

### 3.3 構造化データ
```javascript
// structured-data/schemas.js
const schemas = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HANATABA",
    "alternateName": "花束",
    "url": "https://hanataba.com",
    "logo": "https://hanataba.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+81-3-XXXX-XXXX",
      "contactType": "customer service",
      "availableLanguage": ["Japanese", "English"]
    },
    "sameAs": [
      "https://twitter.com/hanataba",
      "https://www.linkedin.com/company/hanataba",
      "https://www.facebook.com/hanataba"
    ]
  },
  
  service: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "HANATABA Core リテイナー",
    "description": "IPO経験×20歳視点×AIで売上を上げる継続支援サービス",
    "provider": {
      "@type": "Organization",
      "name": "HANATABA"
    },
    "serviceType": "ビジネスコンサルティング",
    "areaServed": {
      "@type": "Country",
      "name": "Japan"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "サービスプラン",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "90日スプリント"
          },
          "price": "1500000",
          "priceCurrency": "JPY"
        }
      ]
    }
  },
  
  faq: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "どのくらいの期間で成果が出ますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "90日以内に測定可能な成果を出すことを目標としています。"
        }
      }
    ]
  },
  
  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "ホーム",
        "item": "https://hanataba.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "プログラム",
        "item": "https://hanataba.com/program"
      }
    ]
  }
};
```

## 4. コンバージョン最適化

### 4.1 CRO（Conversion Rate Optimization）
```javascript
const croStrategy = {
  funnel_optimization: {
    awareness_to_interest: {
      current_rate: 0.10,
      target_rate: 0.15,
      tactics: [
        'ヒーローコピーの改善',
        'ソーシャルプルーフの追加',
        'ローディング速度改善'
      ]
    },
    
    interest_to_consideration: {
      current_rate: 0.25,
      target_rate: 0.35,
      tactics: [
        '5分診断の追加',
        'リードマグネットの提供',
        'チャットボット実装'
      ]
    },
    
    consideration_to_intent: {
      current_rate: 0.30,
      target_rate: 0.45,
      tactics: [
        'ケーススタディの充実',
        'デモ動画の追加',
        '無料相談の強調'
      ]
    },
    
    intent_to_purchase: {
      current_rate: 0.20,
      target_rate: 0.30,
      tactics: [
        '提案書の質向上',
        'オンボーディング説明',
        '返金保証の追加'
      ]
    }
  },
  
  ab_testing_plan: {
    test_1: {
      element: 'ヒーローCTA',
      variants: ['無料相談を予約', '5分診断を受ける'],
      hypothesis: '診断の方が心理的ハードルが低い',
      success_metric: 'クリック率',
      sample_size: 5000,
      duration: '2週間'
    },
    
    test_2: {
      element: '価格表示',
      variants: ['価格非表示', '価格表示'],
      hypothesis: '価格透明性が信頼を生む',
      success_metric: '問い合わせ率',
      sample_size: 3000,
      duration: '3週間'
    }
  }
};
```

### 4.2 ヒートマップ分析
```javascript
// analytics/heatmap-config.js
const heatmapConfig = {
  tool: 'Hotjar/Clarity',
  
  tracking_pages: [
    '/', // ホーム
    '/pricing', // 価格
    '/diagnostic', // 診断
    '/booking' // 予約
  ],
  
  metrics_to_track: {
    click_map: {
      purpose: 'クリックされる要素の特定',
      insights: 'CTA配置の最適化'
    },
    
    scroll_map: {
      purpose: 'スクロール深度の把握',
      insights: 'コンテンツ長の最適化'
    },
    
    move_map: {
      purpose: 'マウス動線の理解',
      insights: 'UI要素の配置改善'
    },
    
    session_recordings: {
      purpose: 'ユーザー行動の詳細観察',
      insights: 'UXの問題点発見'
    }
  }
};
```

## 5. ダッシュボード設計

### 5.1 エグゼクティブダッシュボード
```yaml
executive_dashboard:
  update_frequency: Daily
  
  key_metrics:
    revenue:
      - MRR
      - ARR
      - Growth Rate
      - Churn Rate
      
    pipeline:
      - Pipeline Value
      - Pipeline Coverage
      - Win Rate
      - Sales Cycle
      
    marketing:
      - Website Traffic
      - Lead Generation
      - CAC
      - LTV/CAC Ratio
      
    customer:
      - NPS
      - CSAT
      - Product Usage
      - Support Tickets
      
  visualizations:
    - type: line_chart
      metric: MRR推移
      period: 過去12ヶ月
      
    - type: funnel_chart
      metric: コンバージョンファネル
      stages: [訪問, リード, 商談, 成約]
      
    - type: cohort_analysis
      metric: 顧客継続率
      cohort_by: 契約月
      
    - type: heatmap
      metric: 曜日×時間別コンバージョン
```

### 5.2 オペレーショナルダッシュボード
```javascript
const operationalDashboards = {
  sales_dashboard: {
    realtime_metrics: [
      'アクティブ商談数',
      '本日のアクティビティ',
      '今週の成約'
    ],
    
    daily_metrics: [
      '新規リード数',
      '商談設定数',
      '提案書送付数',
      'Win/Loss'
    ],
    
    alerts: [
      {
        condition: 'パイプラインカバレッジ < 3x',
        action: 'Slack通知',
        priority: 'high'
      },
      {
        condition: '商談停滞 > 30日',
        action: 'マネージャーにエスカレーション',
        priority: 'medium'
      }
    ]
  },
  
  marketing_dashboard: {
    traffic_sources: {
      organic: { sessions: 0, conversion: 0 },
      paid: { sessions: 0, conversion: 0 },
      social: { sessions: 0, conversion: 0 },
      direct: { sessions: 0, conversion: 0 },
      referral: { sessions: 0, conversion: 0 }
    },
    
    content_performance: {
      top_pages: [],
      top_blog_posts: [],
      top_downloads: []
    },
    
    campaign_performance: {
      active_campaigns: [],
      cost_per_lead: 0,
      roi: 0
    }
  }
};
```

## 6. レポーティング

### 6.1 定期レポート
```yaml
reporting_schedule:
  daily:
    recipients: [営業チーム, マーケティングチーム]
    metrics:
      - 新規リード数
      - 商談数
      - Webサイトトラフィック
    format: Slackサマリー
    
  weekly:
    recipients: [経営陣, 部門長]
    metrics:
      - WBRサマリー
      - パイプライン状況
      - マーケティングKPI
    format: PDFレポート
    
  monthly:
    recipients: [取締役会, 投資家]
    metrics:
      - MRR/ARR
      - 顧客獲得/解約
      - ユニットエコノミクス
    format: スライド形式
    
  quarterly:
    recipients: [全社]
    metrics:
      - OKR達成状況
      - 戦略的イニシアチブ
      - 市場分析
    format: 詳細レポート
```

### 6.2 自動レポート生成
```python
# reporting/automated_reports.py
class AutomatedReporting:
    def __init__(self):
        self.data_sources = {
            'ga4': GoogleAnalytics4(),
            'crm': Salesforce(),
            'database': PostgreSQL()
        }
    
    def generate_daily_report(self):
        """日次レポート生成"""
        metrics = {
            'traffic': self.data_sources['ga4'].get_daily_traffic(),
            'leads': self.data_sources['crm'].get_daily_leads(),
            'revenue': self.data_sources['database'].get_daily_revenue()
        }
        
        report = self.format_report(metrics, 'daily')
        self.send_slack(report)
        
    def generate_weekly_report(self):
        """週次レポート生成"""
        data = self.collect_weekly_data()
        insights = self.generate_insights(data)
        recommendations = self.generate_recommendations(insights)
        
        report = {
            'data': data,
            'insights': insights,
            'recommendations': recommendations
        }
        
        pdf = self.create_pdf(report)
        self.send_email(pdf, self.get_recipients('weekly'))
```

## 7. パフォーマンス監視

### 7.1 Core Web Vitals
```javascript
// performance/web-vitals.js
import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

const vitalsThresholds = {
  LCP: { good: 2500, needs_improvement: 4000 },  // Largest Contentful Paint
  FID: { good: 100, needs_improvement: 300 },     // First Input Delay
  CLS: { good: 0.1, needs_improvement: 0.25 },    // Cumulative Layout Shift
  FCP: { good: 1800, needs_improvement: 3000 },   // First Contentful Paint
  TTFB: { good: 800, needs_improvement: 1800 }    // Time to First Byte
};

function sendToAnalytics({ name, delta, value, id }) {
  // Google Analyticsに送信
  gtag('event', name, {
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    metric_id: id,
    metric_value: value,
    metric_delta: delta
  });
  
  // パフォーマンス基準チェック
  const threshold = vitalsThresholds[name];
  if (threshold) {
    if (value <= threshold.good) {
      console.log(`✅ ${name}: ${value} (Good)`);
    } else if (value <= threshold.needs_improvement) {
      console.warn(`⚠️ ${name}: ${value} (Needs Improvement)`);
    } else {
      console.error(`❌ ${name}: ${value} (Poor)`);
    }
  }
}

// Web Vitals測定
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
getFCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### 7.2 エラー監視
```javascript
// monitoring/error-tracking.js
const errorTracking = {
  tool: 'Sentry',
  
  config: {
    dsn: 'https://xxx@sentry.io/xxx',
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
    
    beforeSend(event, hint) {
      // PII情報の除去
      if (event.request) {
        delete event.request.cookies;
        delete event.request.data;
      }
      return event;
    }
  },
  
  custom_errors: {
    trackConversionError: (error, context) => {
      Sentry.captureException(error, {
        tags: {
          section: 'conversion',
          severity: 'high'
        },
        context
      });
    },
    
    trackAPIError: (endpoint, status, response) => {
      Sentry.captureMessage(`API Error: ${endpoint}`, {
        level: 'error',
        extra: { status, response }
      });
    }
  }
};
```

## 8. プライバシー・コンプライアンス

### 8.1 Cookie管理
```javascript
// privacy/cookie-consent.js
const cookieConsent = {
  categories: {
    necessary: {
      name: '必須Cookie',
      description: 'サイトの基本機能に必要',
      required: true
    },
    
    analytics: {
      name: '分析Cookie',
      description: 'サイトの利用状況を分析',
      required: false,
      cookies: ['_ga', '_gid', '_gat']
    },
    
    marketing: {
      name: 'マーケティングCookie',
      description: '広告の最適化に使用',
      required: false,
      cookies: ['_fbp', '_gcl_au']
    }
  },
  
  implementation: `
    // Cookie同意バナー表示
    if (!getCookie('cookie_consent')) {
      showConsentBanner();
    }
    
    // 同意に基づいてトラッキング有効化
    function enableTracking(categories) {
      if (categories.includes('analytics')) {
        loadGoogleAnalytics();
      }
      if (categories.includes('marketing')) {
        loadMarketingPixels();
      }
    }
  `
};
```

## 9. 実装チェックリスト

### Phase 1: 基盤構築（Week 1）
- [ ] GA4プロパティ作成
- [ ] GTM設定
- [ ] 基本イベント実装
- [ ] Cookie同意バナー

### Phase 2: 詳細設定（Week 2）
- [ ] カスタムイベント設定
- [ ] Eコマーストラッキング
- [ ] カスタムディメンション
- [ ] 構造化データ実装

### Phase 3: 最適化（Week 3）
- [ ] A/Bテスト環境構築
- [ ] ヒートマップツール導入
- [ ] パフォーマンス監視
- [ ] エラートラッキング

### Phase 4: 運用開始（Week 4）
- [ ] ダッシュボード構築
- [ ] 自動レポート設定
- [ ] アラート設定
- [ ] チームトレーニング

---
*データは意思決定の羅針盤。正確な計測と継続的な改善が成功への道*