# 収益戦略実装ガイド（REVENUE_STRATEGY.md）

## 🎯 収益の方程式
```
Revenue = トラフィック × CVR × ACV × 継続率（NRR）
```

## 1. トラフィック獲得戦略

### 1.1 短尺コンテンツ戦略
#### 実装タスク
- [ ] TikTok/YouTube Shorts/Instagram Reels の30秒動画テンプレート作成
- [ ] 構成：つかみ（3秒）→逆張り（7秒）→証拠（10秒）→一手（7秒）→CTA（3秒）
- [ ] 日次投稿スケジュール（1日3本）
- [ ] プロフィール固定リンクを診断ページへ設定

#### コンテンツテーマ（14日分）
1. Day 1: 「なぜ"広告より先に価格"を変えると今月の売上が上がるのか」
2. Day 2: 「20歳の肌感：TikTokでB2Bが刺さる"3つの切り口"」
3. Day 3: 「AIで営業の"Exit基準"を監視し、滞留ゼロにする方法」
4. Day 4: 「IPO経験者が語る：年商1億円の再現可能な仕組み」
5. Day 5: 「値引き禁止でも成約率を上げる価格プレイブック」
6. Day 6: 「90日で売上を上げる：週次レビューの型」
7. Day 7: 「採用で失敗しない：90日成果定義の作り方」
8. Day 8: 「AIが営業メモから次アクションを自動生成」
9. Day 9: 「顧客継続率110%を達成するアップセル設計」
10. Day 10: 「B2B営業のCVRを2倍にする診断フォーム」
11. Day 11: 「IPOを目指す社長が今日やるべき3つのこと」
12. Day 12: 「20歳起業家が見た：失敗する会社の共通点」
13. Day 13: 「AIで提案書の勝率を30%上げる方法」
14. Day 14: 「売上が止まった時の是正アクション5選」

### 1.2 アウトバウンド戦略
#### 日次タスク（60タッチ/日）
```javascript
// アウトバウンドプロセス
const outboundProcess = {
  channels: ['Email', 'X_DM', 'LinkedIn'],
  dailyTarget: 20, // リスト数
  touchesPerList: 3, // チャネル数
  totalTouches: 60,
  
  template: {
    subject: "90日で売上が上がる仕組みを作るHANATABAです",
    body: `
"90日で売上が上がる仕組み"を作るHANATABAです。
IPO経験×20歳視点×AIで今日から動く設計を提案中。
5分診断→あなたの数値で即フィードバックします。
必要なら30分で施策まで落とします。
興味あればこちら▶︎ [診断リンク]
    `,
    trackingParams: {
      utm_source: 'outbound',
      utm_medium: 'dm',
      utm_campaign: 'sprint_90d'
    }
  }
};
```

## 2. CVR最適化戦略

### 2.1 ファネル設計
```yaml
awareness:
  - 短尺コンテンツ視聴
  - SNS投稿リーチ
  
interest:
  - プロフィールリンククリック
  - LP訪問
  
consideration:
  - 5分診断開始（form_start）
  - 診断完了（form_submit）
  
intent:
  - 無料相談予約
  - 資料ダウンロード
  
purchase:
  - 相談実施
  - 提案書送付
  - 契約締結
```

### 2.2 CVR改善施策
#### A/Bテスト計画
```javascript
const abTests = [
  {
    id: 'hero_cta_001',
    hypothesis: '「5分診断」は「無料相談」より着手率が高い',
    variants: {
      control: { cta: '無料相談を予約', expectedCVR: 0.02 },
      treatment: { cta: '5分診断を受ける', expectedCVR: 0.035 }
    },
    sampleSize: 2000,
    confidence: 0.95
  },
  {
    id: 'proof_format_002',
    hypothesis: '数値＋注釈は動画より信頼性が高い',
    variants: {
      control: { type: 'video', expectedCVR: 0.025 },
      treatment: { type: 'numbers_with_footnotes', expectedCVR: 0.03 }
    }
  },
  {
    id: 'pricing_layout_003',
    hypothesis: 'デコイ効果でCore選択率が上がる',
    variants: {
      control: { layout: 'linear', coreSelection: 0.4 },
      treatment: { layout: 'decoy_center', coreSelection: 0.55 }
    }
  }
];
```

## 3. ACV（平均顧客単価）最大化

### 3.1 価格戦略
```javascript
const pricingStrategy = {
  packages: {
    good: {
      name: '90日スプリント',
      price: 1500000,
      term: '90日',
      features: ['設計', '実装', '是正'],
      targetShare: 0.3
    },
    better: {
      name: 'HANATABA Core リテイナー',
      price: 300000,
      term: '月額',
      annualValue: 3600000,
      features: ['WBR', 'MBR', 'QBR', '実働支援'],
      targetShare: 0.5 // 主力商品
    },
    best: {
      name: 'Core＋AI RevOps Pack',
      price: 450000,
      term: '月額',
      annualValue: 5400000,
      features: ['Core全機能', 'AI自動化', '提案レビュー'],
      targetShare: 0.2,
      role: 'decoy' // デコイ効果
    }
  },
  
  positioning: {
    layout: 'Good → Best（中央）→ Better',
    psychology: 'Bestをデコイにして、Betterを合理的選択に見せる'
  }
};
```

### 3.2 アップセル/クロスセル戦略
```yaml
upsell_triggers:
  - timing: 契約3ヶ月後
    offer: AI RevOps Pack追加
    expected_take_rate: 0.25
    
  - timing: 年次更新時
    offer: Core → Core+AI Pack
    expected_take_rate: 0.35
    
cross_sell_opportunities:
  - product: IPOメンターホームルーム
    target: Core契約者の役員層
    price: 100000/月
    
  - product: 採用スコアカード作成
    target: 成長フェーズの顧客
    price: 500000/回
    
  - product: 価格プレイブック作成
    target: 営業改革中の顧客
    price: 800000/回
```

## 4. NRR（継続率）向上戦略

### 4.1 目標設定
```javascript
const nrrTargets = {
  baseline: {
    grossRetention: 0.92, // 解約を除く継続率
    expansion: 0.20, // アップセル/クロスセル
    targetNRR: 1.12 // 112%
  },
  
  monthly_metrics: {
    churnRate: 0.007, // 月次解約率0.7%
    expansionRate: 0.017, // 月次拡張率1.7%
    netGrowth: 0.01 // 純成長率1%
  }
};
```

### 4.2 継続施策
```yaml
retention_playbook:
  onboarding:
    - day_1: キックオフ＆期待値整合
    - day_7: 初回WBR実施
    - day_30: 初回MBR＆成果確認
    - day_90: QBR＆次期計画
    
  engagement:
    - weekly: WBR（未設定タスクゼロ）
    - monthly: MBR（月次振り返り）
    - quarterly: QBR（四半期戦略会議）
    
  early_warning:
    - usage_decline: 利用頻度低下アラート
    - satisfaction_check: NPS月次測定
    - risk_scoring: AIによる解約リスク予測
```

## 5. 月次/週次KPI

### 5.1 月次目標
```javascript
const monthlyTargets = {
  revenue: {
    new: 5400000, // 新規売上
    recurring: 8100000, // 継続売上
    total: 13500000
  },
  
  pipeline: {
    coverage: 4, // カバレッジ率
    required: 54000000, // 必要パイプライン
    qualified: 45, // Qualified商談数
    win_rate: 0.20
  },
  
  leads: {
    required: 180, // 必要リード数
    qualified_rate: 0.25,
    sources: {
      organic: 60,
      outbound: 60,
      content: 40,
      referral: 20
    }
  }
};
```

### 5.2 週次KPI
```yaml
weekly_kpis:
  traffic:
    - sessions: 2500
    - unique_visitors: 1800
    - content_views: 10000
    
  conversion:
    - diagnostic_starts: 90
    - diagnostic_completes: 45
    - consultation_bookings: 12
    
  sales:
    - qualified_meetings: 10
    - proposals_sent: 8
    - deals_closed: 2
    
  retention:
    - wbr_completion_rate: 100%
    - nps_responses: 15
    - expansion_conversations: 5
```

## 6. 実装チェックリスト

### Phase 1: 基盤構築（Week 1）
- [ ] GTMタグ設置＆イベント設定
- [ ] CRMパイプライン構築
- [ ] 価格表ページ作成
- [ ] 5分診断フォーム実装

### Phase 2: トラフィック開始（Week 2）
- [ ] SNSアカウント設定
- [ ] 短尺動画3本/日の投稿開始
- [ ] アウトバウンドリスト作成
- [ ] DMテンプレート配信開始

### Phase 3: 最適化（Week 3-4）
- [ ] A/Bテスト開始
- [ ] CVRダッシュボード構築
- [ ] WBRプロセス確立
- [ ] AIツール連携

### Phase 4: スケール（Month 2+）
- [ ] コンテンツ量産体制
- [ ] セールスチーム拡張
- [ ] カスタマーサクセス強化
- [ ] 自動化推進

## 7. リスク管理

### 7.1 数値の透明性
```javascript
const disclaimers = {
  revenue: '※前年同期比、n=50社基準',
  retention: '※12ヶ月継続顧客、n=35社',
  nps: '※四半期調査、回答率65%',
  conversion: '※診断完了→相談予約、30日以内'
};
```

### 7.2 ガードレール
- 価格変更時は既存顧客にグランドファザー条項適用
- AI出力は必ず人間レビュー
- 返金ポリシーを明文化（30日以内、条件付き）
- コンプライアンスチェック（月次）

---
*このドキュメントは週次で更新し、実績値を反映させること*