'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

type BlogPost = {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  thumbnail: string;
  tags: string[];
};

type Props = {
  post: BlogPost;
};

export default function BlogDetail({ post }: Props) {
  const breadcrumbItems = [
    { label: 'ホーム', href: '/' },
    { label: 'ブログ', href: '/blog' },
    { label: post.title, href: `/blog/${post.id}` },
  ];

  return (
    <article className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} className="mb-8" />

          {/* Header */}
          <motion.header
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="info" size="sm" className="mb-4">
              {post.category}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              {post.description}
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{post.author}</div>
                <div className="text-sm text-gray-600">
                  {post.authorRole} · {post.date} · {post.readTime}読了
                </div>
              </div>
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div
            className="mb-12 bg-gray-100 rounded-xl overflow-hidden aspect-video"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Mock content based on the post ID */}
            {post.id === 'ipo-timeline-guide' && (
              <>
                <h2>はじめに</h2>
                <p>
                  IPO（Initial Public Offering）を実現するまでには、一般的に2〜3年の準備期間が必要です。
                  この期間は企業の状況や業界によって異なりますが、計画的な準備が成功の鍵となります。
                </p>

                <h2>Phase 1: 準備期（N-3年）</h2>
                <h3>主要タスク</h3>
                <ul>
                  <li>経営管理体制の整備</li>
                  <li>事業計画の策定</li>
                  <li>資本政策の検討</li>
                  <li>監査法人の選定</li>
                </ul>
                <p>
                  この段階では、上場企業としての基盤作りに注力します。
                  特に重要なのは、透明性の高い経営管理体制の構築です。
                </p>

                <h2>Phase 2: 体制構築期（N-2年）</h2>
                <h3>内部統制の構築</h3>
                <p>
                  J-SOX対応を含む内部統制システムの構築は、この時期の最重要課題です。
                  業務プロセスの文書化、リスク評価、統制活動の設計を進めます。
                </p>

                <blockquote>
                  <p>
                    「内部統制は単なるルール作りではなく、企業文化の変革です」
                    - 上場企業CEO
                  </p>
                </blockquote>

                <h2>Phase 3: 申請準備期（N-1年）</h2>
                <h3>上場申請書類の作成</h3>
                <p>
                  Ⅰの部、Ⅱの部といった上場申請書類の作成を本格化させます。
                  同時に、主幹事証券会社との連携を密にし、上場審査に向けた準備を進めます。
                </p>

                <h2>Phase 4: 上場申請・審査（N年）</h2>
                <p>
                  いよいよ上場申請を行い、証券取引所の審査を受けます。
                  この期間は約3〜6ヶ月で、質問対応や追加資料の提出など、
                  審査対応に全社を挙げて取り組む必要があります。
                </p>

                <h2>まとめ</h2>
                <p>
                  IPO実現には長期的な視点と計画的な準備が不可欠です。
                  各フェーズで必要なタスクを着実にこなし、
                  専門家のサポートを受けながら進めることが成功への近道です。
                </p>
              </>
            )}

            {post.id === 'fundraising-strategy' && (
              <>
                <h2>資金調達の重要性</h2>
                <p>
                  スタートアップの成長において、適切なタイミングでの資金調達は極めて重要です。
                  特にシリーズAは、事業の本格的な拡大フェーズへの入り口となる重要なラウンドです。
                </p>

                <h2>戦略1: 明確なビジョンとロードマップ</h2>
                <p>
                  投資家が最も重視するのは、明確なビジョンと実現可能なロードマップです。
                  3〜5年後の姿を具体的に描き、そこに至るマイルストーンを設定しましょう。
                </p>

                <h2>戦略2: 強固なユニットエコノミクス</h2>
                <p>
                  LTV（顧客生涯価値）とCAC（顧客獲得コスト）の関係を明確に示し、
                  ビジネスモデルの健全性を証明することが重要です。
                </p>

                <h2>戦略3: チームの強み</h2>
                <p>
                  優秀なチームは、最も重要な投資判断基準の一つです。
                  各メンバーの専門性と実績を明確に示しましょう。
                </p>

                <h2>戦略4: 市場機会の明確化</h2>
                <p>
                  TAM（Total Addressable Market）、SAM（Serviceable Available Market）、
                  SOM（Serviceable Obtainable Market）を明確に定義し、
                  市場機会の大きさを示すことが重要です。
                </p>

                <h2>戦略5: 競争優位性の構築</h2>
                <p>
                  技術的な優位性、ネットワーク効果、ブランド力など、
                  持続可能な競争優位性を明確に示しましょう。
                </p>
              </>
            )}

            {post.id === 'internal-control' && (
              <>
                <h2>内部統制とは</h2>
                <p>
                  内部統制は、企業の業務の有効性と効率性、財務報告の信頼性、
                  法令遵守を確保するための仕組みです。上場企業には、
                  金融商品取引法に基づく内部統制報告制度（J-SOX）への対応が求められます。
                </p>

                <h2>構築のステップ</h2>
                <h3>Step 1: 現状分析</h3>
                <p>
                  まず現在の業務プロセスと統制活動を把握し、
                  リスクと統制のギャップを特定します。
                </p>

                <h3>Step 2: 基本方針の策定</h3>
                <p>
                  内部統制の基本方針を定め、全社的な統制環境を整備します。
                  経営者のコミットメントが極めて重要です。
                </p>

                <h3>Step 3: 業務プロセスの文書化</h3>
                <p>
                  重要な業務プロセスについて、フローチャート、
                  業務記述書、リスクコントロールマトリクスを作成します。
                </p>

                <h3>Step 4: 統制活動の設計</h3>
                <p>
                  識別されたリスクに対する統制活動を設計し、実装します。
                  予防的統制と発見的統制のバランスが重要です。
                </p>

                <h3>Step 5: 評価と改善</h3>
                <p>
                  内部統制の有効性を定期的に評価し、
                  不備があれば改善措置を講じます。PDCAサイクルを回すことが重要です。
                </p>

                <h2>よくある課題と対策</h2>
                <ul>
                  <li>文書化の負担 → 段階的アプローチとツールの活用</li>
                  <li>現場の理解不足 → 継続的な教育とコミュニケーション</li>
                  <li>形骸化のリスク → 定期的な見直しと改善</li>
                </ul>
              </>
            )}
          </motion.div>

          {/* Tags */}
          <motion.div
            className="mt-12 pt-6 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Share Buttons */}
          <motion.div
            className="mt-8 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-gray-600 font-medium">シェア：</span>
            <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </button>
            <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </article>
  );
}