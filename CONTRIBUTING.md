# Contributing to HANATABA

HANATABAプロジェクトへの貢献をご検討いただき、ありがとうございます！

## 📋 行動規範

このプロジェクトに参加することで、すべての参加者は以下の行動規範に従うことに同意します：

- 建設的で敬意のあるコミュニケーション
- 多様性と包括性の尊重
- プロフェッショナルな態度の維持

## 🚀 貢献の方法

### 1. イシューの報告

バグを見つけた場合や新機能の提案がある場合：

1. [既存のイシュー](https://github.com/kazujp225/komonshimizu/issues)を確認
2. 同様のイシューがない場合は、新しいイシューを作成
3. 明確で詳細な説明を記載

#### バグレポートのテンプレート

```markdown
**バグの説明**
バグの明確で簡潔な説明

**再現手順**
1. '...'に移動
2. '....'をクリック
3. '....'までスクロール
4. エラーを確認

**期待される動作**
期待される動作の明確で簡潔な説明

**スクリーンショット**
該当する場合は、問題を説明するスクリーンショットを追加

**環境:**
- OS: [例: macOS]
- ブラウザ: [例: Chrome, Safari]
- バージョン: [例: 22]
```

### 2. プルリクエストの作成

#### 準備

```bash
# リポジトリをフォーク
# フォークしたリポジトリをクローン
git clone https://github.com/your-username/komonshimizu.git
cd hanataba-web

# アップストリームの設定
git remote add upstream https://github.com/kazujp225/komonshimizu.git

# 最新の変更を取得
git fetch upstream
git checkout main
git merge upstream/main
```

#### 開発フロー

```bash
# 新しいブランチを作成
git checkout -b feature/your-feature-name

# 変更を加える
# ...

# コードのフォーマット
npm run format

# リント実行
npm run lint

# テスト実行
npm run test

# コミット
git add .
git commit -m "feat: 新機能の説明"

# プッシュ
git push origin feature/your-feature-name
```

#### コミットメッセージの規約

[Conventional Commits](https://www.conventionalcommits.org/)に従ってください：

- `feat:` 新機能
- `fix:` バグ修正
- `docs:` ドキュメントのみの変更
- `style:` コードの意味に影響しない変更（空白、フォーマット、セミコロンなど）
- `refactor:` バグ修正でも機能追加でもないコード変更
- `perf:` パフォーマンスを向上させるコード変更
- `test:` テストの追加や修正
- `chore:` ビルドプロセスやツールの変更

例：
```
feat: IPO診断フォームに進捗インジケーターを追加
fix: モバイルビューでのヘッダーレイアウトの問題を修正
docs: READMEにデプロイ手順を追加
```

### 3. コードスタイルガイド

#### TypeScript/JavaScript

- ES6+の機能を使用
- 関数型プログラミングを優先
- 明確で説明的な変数名を使用

```typescript
// Good
const calculateIPOScore = (companyData: CompanyData): number => {
  // ...
};

// Bad
const calc = (d: any) => {
  // ...
};
```

#### React/Next.js

- 関数コンポーネントとフックを使用
- コンポーネントは単一責任の原則に従う
- PropTypesまたはTypeScriptの型定義を使用

```tsx
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  );
};
```

#### CSS/Tailwind

- Tailwind CSSのユーティリティクラスを優先
- カスタムCSSは最小限に
- レスポンシブデザインを考慮

```tsx
// Good
<div className="flex flex-col md:flex-row gap-4 p-6">

// Bad
<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
```

### 4. テスト

すべての新機能にはテストを含めてください：

```typescript
// example.test.ts
import { calculateIPOScore } from './ipo-calculator';

describe('IPO Calculator', () => {
  it('should calculate score correctly', () => {
    const companyData = {
      revenue: 1000000,
      growthRate: 0.5,
      // ...
    };
    
    expect(calculateIPOScore(companyData)).toBe(85);
  });
});
```

## 📝 プルリクエストのレビュープロセス

1. **自動チェック**: CI/CDパイプラインがテストとリントを実行
2. **コードレビュー**: メンテナーがコードをレビュー
3. **フィードバック**: 必要に応じて変更を要求
4. **承認**: 2名以上のレビュアーの承認後にマージ

## 🏗 開発環境のセットアップ

### 必要なツール

- Node.js 18.0以上
- npm または yarn
- Git
- VS Code（推奨）

### VS Code拡張機能（推奨）

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin

### 環境変数

`.env.example`をコピーして`.env.local`を作成：

```bash
cp .env.example .env.local
```

## 📚 ドキュメント

ドキュメントの改善も大歓迎です：

- コードコメントの追加
- READMEの更新
- 使用例の追加
- APIドキュメントの改善

## 🆘 ヘルプ

質問がある場合：

1. [FAQ](./docs/FAQ.md)を確認
2. [Discussions](https://github.com/kazujp225/komonshimizu/discussions)で質問
3. [Discord](https://discord.gg/hanataba)コミュニティに参加

## 📄 ライセンス

このプロジェクトに貢献することで、あなたのコントリビューションがMITライセンスの下でライセンスされることに同意します。

---

ありがとうございます！ 🙏