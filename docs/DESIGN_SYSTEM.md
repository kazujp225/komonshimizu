# UIデザインシステム（DESIGN_SYSTEM.md）

## 🎯 デザインシステムの目的
**一貫性のあるブランド体験と開発効率の最大化**

## 1. デザイン原則

### 1.1 ブランドアイデンティティ
```yaml
brand_identity:
  concept: "IPOの地図 × 20歳の羅針盤 × AIの推進力"
  
  personality:
    - Authority（権威性）: 信頼できる専門知識
    - Agility（俊敏性）: 素早い実装と改善
    - Youth（若々しさ）: 新しい視点と好奇心
    
  voice_and_tone:
    - 明確で簡潔
    - データドリブン
    - 行動を促す
    - 過度にカジュアルにならない
```

### 1.2 デザイン原則
```javascript
const designPrinciples = {
  clarity: {
    description: '明確性を最優先',
    guidelines: [
      '3秒で価値が伝わる',
      '専門用語は最小限',
      '視覚的階層を明確に'
    ]
  },
  
  consistency: {
    description: '一貫性のある体験',
    guidelines: [
      'パターンの再利用',
      '予測可能な動作',
      'ブランド要素の統一'
    ]
  },
  
  efficiency: {
    description: '効率的なインタラクション',
    guidelines: [
      'クリック数の最小化',
      'ローディング時間の最適化',
      'モバイルファースト'
    ]
  },
  
  accessibility: {
    description: 'すべての人に使いやすく',
    guidelines: [
      'WCAG 2.1 AA準拠',
      'キーボードナビゲーション',
      'スクリーンリーダー対応'
    ]
  }
};
```

## 2. カラーシステム

### 2.1 カラーパレット
```css
/* tokens/colors.css */
:root {
  /* Primary - HANATABA Pink */
  --color-primary-50: #FDF2F6;
  --color-primary-100: #FCE7EE;
  --color-primary-200: #FBCFDD;
  --color-primary-300: #F8A8C2;
  --color-primary-400: #F27299;
  --color-primary-500: #E84A7C;
  --color-primary-600: #D63E6C;  /* Main */
  --color-primary-700: #BA2E5A;
  --color-primary-800: #9B274B;
  --color-primary-900: #822441;
  
  /* Secondary - Navy */
  --color-secondary-50: #E6E9ED;
  --color-secondary-100: #C2CAD6;
  --color-secondary-200: #9BA8BA;
  --color-secondary-300: #73869E;
  --color-secondary-400: #566B89;
  --color-secondary-500: #395174;
  --color-secondary-600: #2C4967;
  --color-secondary-700: #1F3F5A;  /* Main */
  --color-secondary-800: #0A2540;
  --color-secondary-900: #061529;
  
  /* Accent - Teal */
  --color-accent-50: #E6FAF8;
  --color-accent-100: #B3F0E9;
  --color-accent-200: #80E6DA;
  --color-accent-300: #4DDCCB;
  --color-accent-400: #26D3BD;
  --color-accent-500: #00C9AE;
  --color-accent-600: #0F766E;  /* Main */
  --color-accent-700: #0A5A54;
  --color-accent-800: #064440;
  --color-accent-900: #032E2C;
  
  /* Semantic Colors */
  --color-success: #15803D;
  --color-warning: #B45309;
  --color-danger: #B91C1C;
  --color-info: #1D4ED8;
  
  /* Neutral */
  --color-neutral-0: #FFFFFF;
  --color-neutral-50: #F8FAFC;
  --color-neutral-100: #F1F5F9;
  --color-neutral-200: #E2E8F0;
  --color-neutral-300: #CBD5E1;
  --color-neutral-400: #94A3B8;
  --color-neutral-500: #64748B;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1E293B;
  --color-neutral-900: #0F172A;
  --color-neutral-950: #020617;
}
```

### 2.2 カラー使用ガイドライン
```javascript
const colorUsage = {
  text: {
    primary: 'neutral-900',      // 本文
    secondary: 'neutral-600',    // 補助テキスト
    disabled: 'neutral-400',     // 無効状態
    inverse: 'neutral-0',        // 暗い背景上
    link: 'primary-600',         // リンク
    linkHover: 'primary-700'     // リンクホバー
  },
  
  background: {
    primary: 'neutral-0',        // メイン背景
    secondary: 'neutral-50',     // セクション背景
    tertiary: 'neutral-100',     // カード背景
    inverse: 'secondary-800',    // ダークセクション
    overlay: 'rgba(0,0,0,0.5)'   // モーダルオーバーレイ
  },
  
  border: {
    default: 'neutral-200',      // 通常の境界線
    focus: 'primary-600',        // フォーカス時
    error: 'danger',             // エラー状態
    success: 'success'           // 成功状態
  },
  
  interactive: {
    primary: {
      default: 'primary-600',
      hover: 'primary-700',
      active: 'primary-800',
      disabled: 'primary-300'
    },
    secondary: {
      default: 'secondary-700',
      hover: 'secondary-800',
      active: 'secondary-900',
      disabled: 'secondary-300'
    }
  }
};
```

## 3. タイポグラフィ

### 3.1 フォントシステム
```css
/* tokens/typography.css */
:root {
  /* Font Families */
  --font-primary: 'Noto Sans JP', sans-serif;
  --font-secondary: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Font Sizes - Fluid Typography */
  --font-size-xs: clamp(0.75rem, 1.5vw, 0.875rem);    /* 12-14px */
  --font-size-sm: clamp(0.875rem, 2vw, 1rem);         /* 14-16px */
  --font-size-base: clamp(1rem, 2.5vw, 1.125rem);     /* 16-18px */
  --font-size-lg: clamp(1.125rem, 3vw, 1.25rem);      /* 18-20px */
  --font-size-xl: clamp(1.25rem, 3.5vw, 1.5rem);      /* 20-24px */
  --font-size-2xl: clamp(1.5rem, 4vw, 1.875rem);      /* 24-30px */
  --font-size-3xl: clamp(1.875rem, 5vw, 2.25rem);     /* 30-36px */
  --font-size-4xl: clamp(2.25rem, 6vw, 3rem);         /* 36-48px */
  --font-size-5xl: clamp(3rem, 7vw, 3.75rem);         /* 48-60px */
  
  /* Font Weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;
  --line-height-loose: 2;
  
  /* Letter Spacing */
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
}
```

### 3.2 テキストスタイル
```scss
// styles/typography.scss
.heading-1 {
  font-family: var(--font-primary);
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-neutral-900);
  
  @media (max-width: 768px) {
    font-size: var(--font-size-4xl);
  }
}

.heading-2 {
  font-family: var(--font-primary);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-neutral-900);
}

.heading-3 {
  font-family: var(--font-primary);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  color: var(--color-neutral-900);
}

.body-large {
  font-family: var(--font-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-relaxed);
  color: var(--color-neutral-700);
}

.body-base {
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-relaxed);
  color: var(--color-neutral-700);
}

.caption {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
  color: var(--color-neutral-600);
}

.label {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: var(--color-neutral-600);
}
```

## 4. スペーシングシステム

### 4.1 スペーシングトークン
```css
/* tokens/spacing.css */
:root {
  /* Base unit: 4px */
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
  
  /* Layout Spacing */
  --container-padding: var(--space-6);
  --section-padding-y: var(--space-20);
  --card-padding: var(--space-6);
  --input-padding-x: var(--space-4);
  --input-padding-y: var(--space-3);
  --button-padding-x: var(--space-6);
  --button-padding-y: var(--space-3);
}
```

### 4.2 レイアウトグリッド
```scss
// styles/layout.scss
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--container-padding);
  
  @media (min-width: 640px) {
    padding: 0 var(--space-8);
  }
  
  @media (min-width: 1024px) {
    padding: 0 var(--space-10);
  }
}

.grid {
  display: grid;
  gap: var(--space-6);
  
  &--2 {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  
  &--3 {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  
  &--4 {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

.stack {
  display: flex;
  flex-direction: column;
  
  &--small { gap: var(--space-2); }
  &--medium { gap: var(--space-4); }
  &--large { gap: var(--space-8); }
}
```

## 5. コンポーネント

### 5.1 ボタン
```jsx
// components/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-3 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-600/30',
        secondary: 'bg-secondary-700 text-white hover:bg-secondary-800 focus:ring-secondary-700/30',
        ghost: 'bg-transparent border border-neutral-200 text-neutral-700 hover:bg-neutral-50',
        danger: 'bg-danger text-white hover:bg-red-700 focus:ring-danger/30',
        link: 'bg-transparent text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline'
      },
      size: {
        sm: 'text-sm px-3 py-1.5 rounded-md',
        md: 'text-base px-4 py-2 rounded-lg',
        lg: 'text-lg px-6 py-3 rounded-lg',
        xl: 'text-xl px-8 py-4 rounded-xl'
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false
    }
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  size,
  fullWidth,
  onClick,
  disabled,
  loading,
  icon
}) => {
  return (
    <button
      className={buttonVariants({ variant, size, fullWidth })}
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

### 5.2 フォーム要素
```jsx
// components/Input.tsx
export const Input = ({
  label,
  error,
  hint,
  required,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="label">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      
      <input
        className={`
          w-full px-4 py-3 
          border rounded-lg 
          font-primary text-base
          transition-all duration-200
          ${error 
            ? 'border-danger focus:ring-danger/30' 
            : 'border-neutral-200 focus:ring-primary-600/30'
          }
          focus:outline-none focus:ring-3 focus:border-primary-600
          disabled:bg-neutral-50 disabled:cursor-not-allowed
        `}
        aria-invalid={!!error}
        aria-describedby={error ? 'error-message' : hint ? 'hint-message' : undefined}
        {...props}
      />
      
      {error && (
        <p id="error-message" className="text-sm text-danger flex items-center">
          <ExclamationIcon className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
      
      {hint && !error && (
        <p id="hint-message" className="text-sm text-neutral-600">
          {hint}
        </p>
      )}
    </div>
  );
};
```

### 5.3 カード
```jsx
// components/Card.tsx
export const Card = ({
  title,
  description,
  image,
  actions,
  variant = 'default',
  className = ''
}) => {
  const variants = {
    default: 'bg-white border border-neutral-200',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-transparent border-2 border-primary-600',
    gradient: 'bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-200'
  };
  
  return (
    <div className={`
      rounded-xl overflow-hidden
      transition-all duration-300
      hover:shadow-xl hover:-translate-y-1
      ${variants[variant]}
      ${className}
    `}>
      {image && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-6 space-y-4">
        {title && (
          <h3 className="heading-3">{title}</h3>
        )}
        
        {description && (
          <p className="body-base text-neutral-600">
            {description}
          </p>
        )}
        
        {actions && (
          <div className="flex gap-3 pt-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
```

## 6. アニメーション

### 6.1 トランジション
```css
/* tokens/animations.css */
:root {
  /* Durations */
  --duration-instant: 0ms;
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;
  --duration-slower: 500ms;
  
  /* Easings */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Transition Utilities */
.transition-all {
  transition-property: all;
  transition-duration: var(--duration-normal);
  transition-timing-function: var(--ease-in-out);
}

.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-duration: var(--duration-fast);
  transition-timing-function: var(--ease-in-out);
}

.transition-transform {
  transition-property: transform;
  transition-duration: var(--duration-normal);
  transition-timing-function: var(--ease-spring);
}
```

### 6.2 アニメーションパターン
```javascript
// animations/patterns.js
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  
  stagger: {
    animate: { transition: { staggerChildren: 0.1 } }
  }
};

// Framer Motion Usage
<motion.div
  initial="initial"
  animate="animate"
  variants={animations.slideUp}
>
  Content
</motion.div>
```

## 7. アイコンシステム

### 7.1 アイコンライブラリ
```jsx
// components/Icon.tsx
import { 
  ChevronRight,
  Check,
  X,
  AlertCircle,
  Info,
  Download,
  Upload,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Search,
  Menu,
  Settings,
  LogOut,
  ArrowRight,
  ExternalLink,
  Play,
  Pause
} from 'lucide-react';

const icons = {
  chevronRight: ChevronRight,
  check: Check,
  close: X,
  alert: AlertCircle,
  info: Info,
  download: Download,
  upload: Upload,
  calendar: Calendar,
  clock: Clock,
  user: User,
  mail: Mail,
  phone: Phone,
  search: Search,
  menu: Menu,
  settings: Settings,
  logout: LogOut,
  arrowRight: ArrowRight,
  externalLink: ExternalLink,
  play: Play,
  pause: Pause
};

export const Icon = ({ name, size = 24, color = 'currentColor', ...props }) => {
  const IconComponent = icons[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  return <IconComponent size={size} color={color} {...props} />;
};
```

## 8. レスポンシブデザイン

### 8.1 ブレークポイント
```css
/* tokens/breakpoints.css */
:root {
  --breakpoint-xs: 360px;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* Media Query Mixins (Sass) */
@mixin xs-up { @media (min-width: 360px) { @content; } }
@mixin sm-up { @media (min-width: 640px) { @content; } }
@mixin md-up { @media (min-width: 768px) { @content; } }
@mixin lg-up { @media (min-width: 1024px) { @content; } }
@mixin xl-up { @media (min-width: 1280px) { @content; } }
@mixin 2xl-up { @media (min-width: 1536px) { @content; } }
```

### 8.2 レスポンシブユーティリティ
```css
/* Responsive Display Utilities */
.hidden-mobile { display: none; }
.hidden-tablet { display: initial; }
.hidden-desktop { display: initial; }

@media (min-width: 768px) {
  .hidden-mobile { display: initial; }
  .hidden-tablet { display: none; }
}

@media (min-width: 1024px) {
  .hidden-tablet { display: initial; }
  .hidden-desktop { display: none; }
}
```

## 9. ダークモード

### 9.1 ダークモード実装
```css
/* Dark Mode Variables */
[data-theme="dark"] {
  --color-text-primary: var(--color-neutral-100);
  --color-text-secondary: var(--color-neutral-400);
  --color-bg-primary: var(--color-neutral-900);
  --color-bg-secondary: var(--color-neutral-800);
  --color-border: var(--color-neutral-700);
}

/* Component Dark Mode Overrides */
[data-theme="dark"] .card {
  background: var(--color-bg-secondary);
  border-color: var(--color-border);
}

[data-theme="dark"] .button-primary {
  background: var(--color-primary-700);
}
```

### 9.2 テーマ切り替え
```javascript
// utils/theme.js
export const ThemeManager = {
  init() {
    const saved = localStorage.getItem('theme') || 'light';
    this.setTheme(saved);
  },
  
  setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  },
  
  toggle() {
    const current = document.documentElement.dataset.theme;
    this.setTheme(current === 'dark' ? 'light' : 'dark');
  }
};
```

## 10. 実装チェックリスト

### 基盤構築
- [ ] デザイントークンファイル作成
- [ ] カラーシステム実装
- [ ] タイポグラフィ設定
- [ ] スペーシングシステム

### コンポーネント開発
- [ ] ボタンコンポーネント
- [ ] フォーム要素
- [ ] カードコンポーネント
- [ ] ナビゲーション

### 最適化
- [ ] レスポンシブ対応
- [ ] ダークモード実装
- [ ] アニメーション追加
- [ ] アクセシビリティ確認

---
*デザインシステムは生きたドキュメント。継続的に改善し、チーム全体で維持すること*