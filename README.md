# HANATABA - IPO実現への最短ルート 🚀

![HANATABA](https://img.shields.io/badge/HANATABA-IPO_Consulting-D63E6C?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## 📋 概要

**HANATABA（ハナタバ）** は、20代の若手経営者に特化したIPO支援サービスです。現役上場企業CEOが直接サポートし、あなたの事業を次のレベルへ導きます。

### ✨ 特徴

- 🎯 **現役上場企業CEO直接サポート** - 26歳最年少上場記録保持者が1対1で指導
- 📊 **5分間IPO可能性診断** - AIを活用した精密な診断システム
- 💰 **完全成功報酬制度** - リスクを最小限に抑えた料金体系
- 🚀 **92%のIPO成功率** - 業界トップクラスの実績

## 🛠 技術スタック

### フロントエンド
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: Context API

### バックエンド
- **API**: Next.js API Routes
- **Database**: PostgreSQL (Supabase)
- **Authentication**: NextAuth.js
- **Payment**: Stripe

### AI/ML
- **LLM**: OpenAI GPT-4
- **Vector DB**: Pinecone
- **Analytics**: Google Analytics 4

## 🚀 クイックスタート

### 必要要件
- Node.js 18.0以上
- npm または yarn
- Git

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/kazujp225/komonshimizu.git
cd hanataba-web

# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env.local
# .env.localファイルを編集して必要な環境変数を設定
```

### 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
```

ブラウザで http://localhost:3000 を開いてください。

### ビルド

```bash
npm run build
npm start
```

## 📁 プロジェクト構成

```
hanataba-web/
├── src/
│   ├── app/                  # Next.js App Router pages
│   ├── components/           # Reactコンポーネント
│   │   ├── home/            # ホームページコンポーネント
│   │   ├── ui/              # UIコンポーネントライブラリ
│   │   └── ...              # その他のページコンポーネント
│   ├── contexts/            # React Context providers
│   ├── lib/                 # ユーティリティ関数
│   ├── styles/              # グローバルスタイル
│   ├── types/               # TypeScript型定義
│   └── utils/               # ヘルパー関数
├── public/                  # 静的ファイル
├── .env.example            # 環境変数テンプレート
├── next.config.ts          # Next.js設定
├── tailwind.config.ts      # Tailwind CSS設定
└── tsconfig.json           # TypeScript設定
```

## 🎨 デザインシステム

### カラーパレット

- **Primary**: `#D63E6C` (HANATABA Pink)
- **Secondary**: `#0A2540` (Navy)
- **Accent**: `#0F766E` (Teal)
- **Success**: `#10B981` (Green)
- **Warning**: `#F59E0B` (Amber)
- **Error**: `#EF4444` (Red)

### フォント

- **日本語**: Noto Sans JP
- **英数字**: Inter
- **コード**: JetBrains Mono

## 🔧 環境変数

以下の環境変数を`.env.local`に設定してください：

```env
# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3000

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# OpenAI
OPENAI_API_KEY=sk-XXXXXXXXXX

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

## 📊 主要機能

1. **IPO可能性診断**
   - 5分間の簡単な診断
   - AI分析による詳細レポート
   - 個別改善提案

2. **料金プラン**
   - Good: 月額10万円
   - Better: 月額30万円
   - Best: 月額100万円
   - 完全成功報酬オプション

3. **ケーススタディ**
   - 成功事例の詳細紹介
   - 業界別の成功パターン
   - タイムラインと成長曲線

4. **ブログ/リソース**
   - IPO準備ガイド
   - 資金調達ノウハウ
   - 経営者インタビュー

## 🧪 テスト

```bash
# ユニットテスト
npm run test

# E2Eテスト
npm run test:e2e

# カバレッジレポート
npm run test:coverage
```

## 📦 デプロイ

### Vercel (推奨)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kazujp225/komonshimizu)

### その他のプラットフォーム

- AWS Amplify
- Netlify
- Google Cloud Run
- Azure Static Web Apps

## 🤝 コントリビューション

コントリビューションは大歓迎です！詳細は[CONTRIBUTING.md](./CONTRIBUTING.md)をご覧ください。

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](./LICENSE)ファイルをご覧ください。

## 📞 お問い合わせ

- **Website**: [https://hanataba.jp](https://hanataba.jp)
- **Email**: info@hanataba.jp
- **Twitter**: [@hanataba_ipo](https://twitter.com/hanataba_ipo)
- **LinkedIn**: [HANATABA Inc.](https://linkedin.com/company/hanataba)

## 🙏 謝辞

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Vercel](https://vercel.com/)

---

<p align="center">
  Made with ❤️ by HANATABA Team
  <br/>
  <strong>IPOの地図 × 20歳の羅針盤 × AIの推進力</strong>
</p>