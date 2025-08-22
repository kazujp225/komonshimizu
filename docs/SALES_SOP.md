# 営業SOP（Standard Operating Procedure）詳細設計（SALES_SOP.md）

## 🎯 営業プロセスの目的
**再現可能な営業プロセスでWin率20%以上、売上予測精度90%を実現**

## 1. 営業ステージ定義とExit基準

### 1.1 ステージ定義
```yaml
sales_stages:
  1_lead:
    definition: 初回接点を持った見込み客
    sources:
      - インバウンド（診断/資料DL）
      - アウトバウンド（DM/コールド）
      - リファラル（紹介）
    duration: 1-3日
    conversion_target: 25%
    
  2_discovery:
    definition: 初回商談を実施
    objective: 課題とBANTの確認
    duration: 30分
    conversion_target: 40%
    
  3_qualified:
    definition: 提案価値が確認された商談
    objective: 意思決定者の巻き込み
    duration: 5-10日
    conversion_target: 50%
    
  4_proposal:
    definition: 提案書を提出
    objective: 条件交渉と合意形成
    duration: 7-14日
    conversion_target: 40%
    
  5_negotiation:
    definition: 最終条件の調整
    objective: 契約締結の準備
    duration: 3-7日
    conversion_target: 80%
    
  6_closed_won:
    definition: 契約締結
    objective: キックオフ準備
    duration: 1-3日
    conversion_target: 100%
```

### 1.2 Exit基準（ステージゲート）
```javascript
const exitCriteria = {
  lead_to_discovery: {
    required: [
      'プロファイル情報完備',
      '予算レンジ確認',
      '商談日時設定'
    ],
    optional: [
      '競合情報',
      '導入時期'
    ],
    disqualifiers: [
      '予算10万円未満',
      '意思決定権限なし',
      '競合導入済み'
    ]
  },
  
  discovery_to_qualified: {
    required: [
      'BANT全項目確認',
      '課題の優先順位明確',
      '意思決定プロセス把握',
      '次回アクション合意'
    ],
    optional: [
      'ROI試算完了',
      'デモ実施'
    ],
    disqualifiers: [
      '予算未確保',
      '6ヶ月以上先の検討',
      '課題認識なし'
    ]
  },
  
  qualified_to_proposal: {
    required: [
      '意思決定者との面談完了',
      '要件定義合意',
      '予算承認プロセス確認',
      'カスタマイズ要件整理'
    ],
    optional: [
      'セキュリティ審査',
      '法務確認'
    ],
    disqualifiers: [
      '意思決定者の反対',
      '予算凍結',
      '競合選定'
    ]
  },
  
  proposal_to_negotiation: {
    required: [
      '提案書の合意',
      '契約条件の基本合意',
      '導入スケジュール確定',
      '社内承認プロセス開始'
    ],
    optional: [
      'リファレンスチェック',
      'パイロット実施'
    ],
    disqualifiers: [
      '条件不一致',
      '承認却下',
      'プロジェクト中止'
    ]
  }
};
```

## 2. 商談スクリプトとテンプレート

### 2.1 Discovery商談スクリプト
```javascript
const discoveryScript = {
  opening: {
    duration: 5,
    script: `
      本日はお時間をいただきありがとうございます。
      まず30分で、[会社名]様の現状の課題と、
      私たちがお力になれる領域を明確にさせていただければと思います。
      最後に次のステップもご相談させてください。
    `,
    objectives: [
      'アジェンダ合意',
      'ラポール構築',
      '期待値調整'
    ]
  },
  
  qualification: {
    duration: 15,
    questions: {
      budget: {
        primary: '改善施策にどの程度の予算を想定されていますか？',
        follow_up: [
          '予算の承認プロセスを教えていただけますか？',
          '予算確保の時期はいつ頃でしょうか？'
        ]
      },
      
      authority: {
        primary: '最終的な意思決定にはどなたが関わられますか？',
        follow_up: [
          '決裁までのプロセスを教えてください',
          '他に相談が必要な方はいらっしゃいますか？'
        ]
      },
      
      need: {
        primary: '現在最も解決したい課題は何でしょうか？',
        follow_up: [
          'この課題による具体的な影響は？',
          '理想的な解決状態は？',
          '過去に試した対策は？'
        ]
      },
      
      timeline: {
        primary: 'いつまでに解決したいとお考えですか？',
        follow_up: [
          '導入に向けてのマイルストーンは？',
          '検討期間はどの程度を想定？'
        ]
      }
    }
  },
  
  value_proposition: {
    duration: 7,
    framework: {
      situation: '理解した課題の要約',
      complication: '課題が続く場合のリスク',
      resolution: 'HANATABAの解決策',
      benefit: '期待される成果'
    },
    proof_points: [
      '類似企業の成功事例',
      'ROI試算',
      '差別化ポイント'
    ]
  },
  
  next_steps: {
    duration: 3,
    actions: [
      '意思決定者を含む次回商談の設定',
      'カスタマイズ提案書の作成',
      '追加情報の提供'
    ],
    commitment: '具体的な日程と参加者の確定'
  }
};
```

### 2.2 提案書テンプレート
```markdown
# [会社名]様向け ご提案書

## エグゼクティブサマリー
- 課題：[特定された課題]
- 解決策：[提案するソリューション]
- 期待成果：[定量的な成果目標]
- 投資額：[価格とROI]

## 現状分析
### 課題の詳細
- [課題1：具体的な問題と影響]
- [課題2：具体的な問題と影響]
- [課題3：具体的な問題と影響]

### 改善機会
- 短期（30日）：[Quick Win施策]
- 中期（90日）：[本格改善]
- 長期（1年）：[持続的成長]

## ソリューション提案
### プログラム概要
[選択されたプログラムの詳細]

### 実施内容
1. Phase 1: Discovery（2週間）
   - [具体的な活動]
2. Phase 2: Design（4週間）
   - [具体的な活動]
3. Phase 3: Implementation（4週間）
   - [具体的な活動]
4. Phase 4: Optimization（2週間）
   - [具体的な活動]

### 成果物
- [成果物リスト]

## 投資対効果
### コスト
- プログラム費用：¥[金額]
- 追加オプション：¥[金額]
- 合計：¥[金額]

### 期待リターン
- 売上改善：+[%]（¥[金額]）
- コスト削減：-[%]（¥[金額]）
- 投資回収期間：[月数]ヶ月

## 成功事例
[類似企業の具体的な成果]

## 実施スケジュール
[ガントチャート形式のスケジュール]

## 契約条件
- 契約期間：[期間]
- 支払条件：[条件]
- 保証事項：[内容]

## 次のステップ
1. [日付]：契約締結
2. [日付]：キックオフ
3. [日付]：第一マイルストーン
```

## 3. パイプライン管理

### 3.1 パイプライン健全性指標
```javascript
const pipelineMetrics = {
  coverage: {
    formula: 'パイプライン総額 / 売上目標',
    target: 4.0, // 4倍カバレッジ
    calculation: {
      qualified_pipeline: 40000000,
      monthly_target: 10000000,
      coverage_ratio: 4.0
    }
  },
  
  velocity: {
    formula: '商談数 × Win率 × 平均単価 / 営業サイクル',
    metrics: {
      deals_in_pipeline: 50,
      average_win_rate: 0.20,
      average_deal_size: 3600000,
      average_sales_cycle: 45 // days
    },
    monthly_velocity: 8000000
  },
  
  stage_conversion: {
    lead_to_discovery: 0.25,
    discovery_to_qualified: 0.40,
    qualified_to_proposal: 0.50,
    proposal_to_won: 0.32,
    overall: 0.016 // 1.6%
  },
  
  health_score: {
    green: { // 健全
      coverage: '>= 4x',
      aged_deals: '< 10%',
      stage_balance: 'ファネル型'
    },
    yellow: { // 要注意
      coverage: '3-4x',
      aged_deals: '10-20%',
      stage_balance: '偏りあり'
    },
    red: { // 危険
      coverage: '< 3x',
      aged_deals: '> 20%',
      stage_balance: '著しい偏り'
    }
  }
};
```

### 3.2 商談スコアリング
```javascript
const dealScoring = {
  factors: {
    budget_confirmed: { weight: 0.25, score: [0, 1] },
    decision_maker_engaged: { weight: 0.20, score: [0, 1] },
    timeline_defined: { weight: 0.15, score: [0, 1] },
    competition_status: { weight: 0.15, score: [0, 0.5, 1] },
    use_case_fit: { weight: 0.15, score: [0, 0.5, 1] },
    champion_identified: { weight: 0.10, score: [0, 1] }
  },
  
  scoring_rules: {
    hot: { range: [0.8, 1.0], action: '優先対応' },
    warm: { range: [0.5, 0.8], action: '標準フォロー' },
    cold: { range: [0, 0.5], action: '育成 or 離脱' }
  },
  
  automation: {
    hot_deals: 'スラック通知 + 日次レビュー',
    warm_deals: '週次レビュー',
    cold_deals: '月次レビュー or アーカイブ'
  }
};
```

## 4. セールスイネーブルメント

### 4.1 営業資料体系
```yaml
sales_collateral:
  awareness_stage:
    - one_pager: 会社概要1枚
    - case_studies: 業界別事例集
    - roi_calculator: ROI計算ツール
    
  consideration_stage:
    - demo_script: デモシナリオ
    - comparison_matrix: 競合比較表
    - reference_list: 顧客リファレンス
    
  decision_stage:
    - proposal_template: 提案書テンプレート
    - contract_template: 契約書雛形
    - implementation_plan: 導入計画書
    
  objection_handling:
    価格が高い:
      response: ROI試算と分割払いオプション提示
      supporting_material: ROI計算シート
      
    社内リソース不足:
      response: 実働支援サービスの説明
      supporting_material: サポート体制資料
      
    競合導入済み:
      response: 併用メリットと移行支援
      supporting_material: 移行事例
```

### 4.2 営業トレーニングプログラム
```javascript
const salesTraining = {
  onboarding: {
    week1: {
      topics: ['製品知識', '市場理解', '競合分析'],
      activities: ['シャドーイング', '録画レビュー'],
      assessment: 'ロールプレイ'
    },
    week2: {
      topics: ['Discovery手法', 'BANT確認', '価値提案'],
      activities: ['実商談同行', 'メンタリング'],
      assessment: '模擬商談'
    },
    week3: {
      topics: ['提案作成', '交渉術', 'クロージング'],
      activities: ['提案書作成', '実商談主担当'],
      assessment: '実商談評価'
    }
  },
  
  ongoing: {
    weekly: {
      activity: 'ロールプレイ',
      duration: '60分',
      focus: '直近の失注要因'
    },
    monthly: {
      activity: 'ベストプラクティス共有',
      duration: '90分',
      focus: '成功事例の横展開'
    },
    quarterly: {
      activity: 'スキルアセスメント',
      duration: '半日',
      focus: '個別改善計画'
    }
  }
};
```

## 5. WBR（週次ビジネスレビュー）

### 5.1 WBRアジェンダ
```yaml
wbr_agenda:
  duration: 60分
  participants:
    - 営業責任者
    - 営業メンバー
    - カスタマーサクセス
    - マーケティング（必要時）
    
  agenda:
    1_metrics_review: # 10分
      - 先週の成果（受注/失注）
      - パイプライン変化
      - 活動量（商談数/提案数）
      
    2_deal_review: # 30分
      - Hot deals レビュー
      - リスク商談の対策
      - 失注分析
      
    3_forecast: # 10分
      - 月次予測の更新
      - カバレッジ確認
      - ギャップ対策
      
    4_action_items: # 10分
      - 先週のアクション振り返り
      - 今週のアクション設定
      - ブロッカーの解消
```

### 5.2 WBRダッシュボード
```javascript
const wbrDashboard = {
  kpis: {
    weekly: {
      new_pipeline: { target: 2500000, actual: 0 },
      closed_won: { target: 2000000, actual: 0 },
      meetings_held: { target: 10, actual: 0 },
      proposals_sent: { target: 5, actual: 0 }
    },
    
    mtd: { // Month to Date
      revenue: { target: 10000000, actual: 0, progress: '0%' },
      pipeline_created: { target: 15000000, actual: 0 },
      win_rate: { target: 0.20, actual: 0 }
    },
    
    qtd: { // Quarter to Date
      revenue: { target: 30000000, actual: 0, progress: '0%' },
      new_logos: { target: 10, actual: 0 },
      nrr: { target: 1.12, actual: 0 }
    }
  },
  
  pipeline_health: {
    total_value: 0,
    coverage_ratio: 0,
    average_age: 0,
    stuck_deals: [], // 30日以上動きなし
    at_risk: [] // スコア低下
  },
  
  activity_metrics: {
    calls_made: 0,
    emails_sent: 0,
    meetings_booked: 0,
    demos_completed: 0,
    proposals_created: 0
  }
};
```

## 6. 営業テクノロジースタック

### 6.1 CRM設定
```yaml
crm_configuration:
  platform: HubSpot/Salesforce
  
  custom_fields:
    - deal_score: 商談スコア（0-100）
    - exit_criteria: Exit基準チェックリスト
    - next_action: 次のアクション
    - risk_flag: リスクフラグ
    - champion: チャンピオン名
    
  automation:
    - stage_transition: Exit基準チェック
    - task_creation: フォローアップタスク自動生成
    - notification: Hot deal通知
    - reporting: 日次/週次レポート
    
  integration:
    - email: Gmail/Outlook連携
    - calendar: カレンダー同期
    - phone: 通話録音/文字起こし
    - document: 提案書管理
```

### 6.2 セールステックスタック
```javascript
const salesTech = {
  prospecting: {
    tools: ['LinkedIn Sales Navigator', 'Apollo.io'],
    purpose: 'リード発掘',
    budget: 50000 // 月額
  },
  
  engagement: {
    tools: ['Outreach', 'SalesLoft'],
    purpose: 'シーケンス自動化',
    budget: 100000
  },
  
  intelligence: {
    tools: ['Gong', 'Chorus'],
    purpose: '商談分析',
    budget: 150000
  },
  
  enablement: {
    tools: ['Showpad', 'Seismic'],
    purpose: '営業資料管理',
    budget: 80000
  },
  
  forecasting: {
    tools: ['Clari', 'InsightSquared'],
    purpose: '予測精度向上',
    budget: 120000
  }
};
```

## 7. 営業コンペンセーション

### 7.1 インセンティブ設計
```yaml
compensation_structure:
  base_salary: 
    ratio: 0.6 # 固定給比率
    amount: 6000000 # 年額
    
  variable:
    ratio: 0.4 # 変動給比率
    ote: 4000000 # On Target Earnings
    
  quota:
    annual: 48000000 # 年間目標
    quarterly: 12000000
    monthly: 4000000
    
  commission_rates:
    0-50%: 0.05 # 達成率別レート
    50-80%: 0.08
    80-100%: 0.10
    100-120%: 0.12
    120%+: 0.15
    
  accelerators:
    new_logo: 1.5x # 新規顧客
    multi_year: 1.3x # 複数年契約
    upsell: 1.2x # アップセル
    
  spiffs: # 特別インセンティブ
    quarterly_bonus: 500000 # 四半期達成
    annual_bonus: 2000000 # 年間達成
    president_club: 'ハワイ旅行' # トップ成績者
```

## 8. 実装チェックリスト

### Week 1: プロセス設計
- [ ] 営業ステージとExit基準の定義
- [ ] 商談スクリプトの作成
- [ ] 提案書テンプレートの準備
- [ ] CRM設定

### Week 2: チーム準備
- [ ] 営業トレーニング実施
- [ ] ロールプレイセッション
- [ ] 営業資料の整備
- [ ] ツール導入

### Week 3: 運用開始
- [ ] パイプライン構築
- [ ] 初回WBR実施
- [ ] KPIトラッキング開始
- [ ] 日次スタンドアップ

### Week 4: 最適化
- [ ] 初月レビュー
- [ ] プロセス改善
- [ ] トレーニング計画更新
- [ ] 予測精度検証

---
*営業は科学。データに基づいて継続的に改善すること*