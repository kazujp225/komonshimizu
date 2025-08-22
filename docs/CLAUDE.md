# CLAUDE.md - HANATABA実装マスタードキュメント

## 🎯 プロジェクト概要
**HANATABA** - IPOの地図 × 20歳の羅針盤 × AIの推進力で、年商1億円を再現性で達成する

## 📁 ドキュメント構成

### 戦略レイヤー
1. **[PLAN.md](./PLAN.md)** - 全体戦略と4時間スプリント計画
2. **[REVENUE_STRATEGY.md](./REVENUE_STRATEGY.md)** - 収益戦略の詳細設計

### プロダクトレイヤー  
3. **[PRODUCT_DESIGN.md](./PRODUCT_DESIGN.md)** - プロダクト/オファー設計
4. **[SALES_SOP.md](./SALES_SOP.md)** - 営業SOPとプロセス設計

### 実装レイヤー
5. **[WEBSITE_SPEC.md](./WEBSITE_SPEC.md)** - Webサイト実装仕様
6. **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - UIデザインシステム
7. **[AI_IMPLEMENTATION.md](./AI_IMPLEMENTATION.md)** - AI実装ガイド

### マーケティングレイヤー
8. **[CONTENT_SYSTEM.md](./CONTENT_SYSTEM.md)** - コンテンツ戦略
9. **[ANALYTICS_SEO.md](./ANALYTICS_SEO.md)** - 分析/SEO設計

---

## 🚀 クイックスタート

### Phase 1: 基盤構築（Week 1）
```bash
# 1. 開発環境セットアップ
npm create next-app@latest hanataba-web --typescript --tailwind --app
cd hanataba-web

# 2. 必要なパッケージインストール
npm install @vercel/analytics framer-motion class-variance-authority
npm install -D @types/gtag.js

# 3. デザイントークン設定
cp ./DESIGN_SYSTEM.md ./styles/tokens.css

# 4. 環境変数設定
echo "NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX" >> .env.local
echo "OPENAI_API_KEY=sk-XXXXXXXXXX" >> .env.local
```

### Phase 2: コア機能実装（Week 2）
- [ ] ホームページ（LP）実装
- [ ] 5分診断フォーム実装  
- [ ] 価格ページ実装
- [ ] 予約システム構築

### Phase 3: 営業システム構築（Week 3）
- [ ] CRM（HubSpot/Salesforce）設定
- [ ] 営業ステージとExit基準設定
- [ ] WBRダッシュボード構築
- [ ] AI商談分析ツール実装

### Phase 4: コンテンツ/マーケティング（Week 4）
- [ ] 短尺動画10本制作
- [ ] ブログ記事5本公開
- [ ] メールシーケンス設定
- [ ] GA4/GTM設定完了

---

## 📊 目標KPI

### 月次目標
```yaml
revenue:
  mrr: ¥10,000,000
  new_customers: 10
  churn_rate: < 5%

pipeline:
  qualified_leads: 45
  win_rate: 20%
  average_deal_size: ¥3,600,000

marketing:
  website_sessions: 10,000
  conversion_rate: 2%
  content_pieces: 30
```

### 週次KPI
```yaml
week_1:
  - サイト公開
  - 診断フォーム完成
  - GA4設定完了

week_2:
  - 初回リード獲得
  - 短尺動画5本投稿
  - CRM連携完了

week_3:
  - 商談5件実施
  - WBR開始
  - AI分析開始

week_4:
  - 初回クローズ
  - NRR測定開始
  - 最適化サイクル確立
```

---

## 🛠 技術スタック

### フロントエンド
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + CSS Modules
- **Animation**: Framer Motion
- **State**: Zustand/Context API

### バックエンド
- **API**: Next.js API Routes
- **Database**: PostgreSQL (Supabase)
- **Auth**: NextAuth.js
- **Payment**: Stripe

### AI/ML
- **LLM**: OpenAI GPT-4
- **Vector DB**: Pinecone
- **ML Models**: Python (scikit-learn)
- **Deployment**: Vercel AI SDK

### 分析/モニタリング
- **Analytics**: Google Analytics 4
- **Heatmap**: Hotjar/Clarity
- **Error**: Sentry
- **Performance**: Vercel Analytics

### 営業ツール
- **CRM**: HubSpot/Salesforce
- **Calendar**: Calendly
- **Email**: SendGrid
- **Phone**: Twilio

---

## 🎨 ブランドガイドライン

### カラーパレット
```css
Primary: #D63E6C (HANATABA Pink)
Secondary: #0A2540 (Navy)
Accent: #0F766E (Teal)
```

### フォント
```css
日本語: Noto Sans JP
英数字: Inter
コード: JetBrains Mono
```

### トーン&マナー
- **権威性** - データと実績で裏付け
- **俊敏性** - 素早い実装と改善
- **若々しさ** - 新しい視点と挑戦

---

## 📝 コンテンツ優先順位

### 今すぐ作成（Week 1）
1. ヒーローコピー3パターン
2. 5分診断の質問設計
3. 価格表とFAQ
4. メタディスクリプション

### 次に作成（Week 2）
1. 短尺動画スクリプト10本
2. ブログ記事3本
3. 営業資料テンプレート
4. ケーススタディ2本

### 継続的に作成（Week 3+）
1. 週次ブログ記事
2. 日次短尺動画
3. 月次ウェビナー
4. 四半期レポート

---

## 🔄 開発ワークフロー

### 日次タスク
```bash
# 朝のルーティン（9:00）
1. 昨日の数値確認（GA4）
2. 本日のタスク確認（Notion/Linear）
3. スタンドアップミーティング（15分）

# 開発作業（9:30-18:00）
- Feature Branch作成
- 実装 → テスト → PR
- コードレビュー
- マージ → デプロイ

# 夕方のルーティン（18:00）
1. 進捗更新
2. 明日のタスク準備
3. ブロッカー共有
```

### 週次レビュー（WBR）
```yaml
agenda:
  - KPI進捗確認（15分）
  - 商談レビュー（30分）  
  - 改善アクション（15分）
  
participants:
  - 営業責任者
  - マーケティング
  - プロダクト
  
output:
  - 週次レポート
  - アクションアイテム
  - 来週の優先順位
```

---

## 🚨 リスクと対策

### 技術的リスク
- **LCP > 2.5秒** → 画像最適化、CDN導入
- **CVR < 1%** → A/Bテスト実施、UX改善
- **AI精度低下** → モデル再学習、人力レビュー

### ビジネスリスク
- **リード不足** → アウトバウンド強化
- **Win率低下** → 営業トレーニング実施
- **チャーン増加** → CS体制強化

---

## 📞 サポート

### 緊急時の対応
```yaml
critical_issues:
  - サイトダウン → Vercel Status確認
  - 決済エラー → Stripe Dashboard確認
  - データ漏洩 → インシデント対応手順実行

contacts:
  tech_lead: "@tech_lead_slack"
  product_owner: "@po_slack"
  customer_success: "@cs_slack"
```

### リソース
- [Notion](https://notion.so/hanataba) - プロジェクト管理
- [Figma](https://figma.com/hanataba) - デザイン
- [GitHub](https://github.com/hanataba) - コード管理
- [Slack](https://hanataba.slack.com) - コミュニケーション

---

## ✅ チェックリスト

### 本日やること
- [ ] LPのヒーロー実装（A/B/Cパターン）
- [ ] 価格表公開（Good/Better/Best）
- [ ] 短尺動画3本撮影・投稿
- [ ] アウトバウンド60タッチ送信
- [ ] WBRのExit基準チェック

### 今週の成果物
- [ ] Webサイト公開
- [ ] 5分診断フォーム稼働
- [ ] CRM連携完了
- [ ] 初回リード10件獲得
- [ ] 短尺動画15本投稿

### 今月の目標
- [ ] MRR ¥1,000,000達成
- [ ] 顧客3社獲得
- [ ] NPS 50以上
- [ ] Win率 20%達成

---

## 🎯 成功の定義

```javascript
const success = {
  shortTerm: {
    '30_days': 'MVP完成、初回顧客獲得',
    '60_days': 'MRR ¥3M、プロセス確立',
    '90_days': 'MRR ¥10M、チーム拡大'
  },
  
  midTerm: {
    '6_months': 'ARR ¥100M、Series A準備',
    '12_months': 'ARR ¥300M、20名体制'
  },
  
  longTerm: {
    '3_years': 'IPO準備開始',
    '5_years': '上場、ARR ¥10B'
  }
};
```

---

*「IPOの地図と20歳の羅針盤を、AIの推進力に繋げて、今日の売上まで引きずり上げる」*

**Last Updated**: 2024年12月
**Version**: 1.0.0
**Author**: HANATABA Team