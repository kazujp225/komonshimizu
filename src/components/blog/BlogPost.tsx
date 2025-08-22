'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { getRecentBlogPosts } from '@/lib/mockData';
import type { BlogPost as BlogPostType } from '@/types';

interface Props {
  post: BlogPostType;
}

export default function BlogPost({ post }: Props) {
  const relatedPosts = getRecentBlogPosts(3).filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Breadcrumbs */}
      <motion.nav
        className="flex items-center space-x-2 text-sm text-gray-500 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/" className="hover:text-primary-600">ホーム</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-primary-600">ブログ</Link>
        <span>/</span>
        <span className="text-gray-900 truncate">{post.title}</span>
      </motion.nav>

      {/* Header */}
      <motion.header
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Category */}
        <div className="mb-6">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            post.category === 'IPO戦略' ? 'bg-purple-100 text-purple-800' :
            post.category === 'テクノロジー' ? 'bg-blue-100 text-blue-800' :
            post.category === '資金調達' ? 'bg-green-100 text-green-800' :
            post.category === 'マーケティング' ? 'bg-orange-100 text-orange-800' :
            post.category === 'IPO分析' ? 'bg-indigo-100 text-indigo-800' :
            'bg-primary-100 text-primary-800'
          }`}>
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-200">
          {/* Author */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-gray-900">
                {post.author.name}
              </div>
              <div className="text-sm text-gray-600">
                {post.author.role}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-300" />

          {/* Date */}
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(post.publishedAt)}
          </div>

          {/* Reading Time */}
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readingTime}分で読める
          </div>

          {/* Views */}
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {post.engagement.views.toLocaleString()} views
          </div>
        </div>
      </motion.header>

      {/* Article Content */}
      <motion.article
        className="prose prose-lg max-w-none mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="text-gray-700 leading-relaxed space-y-6">
          {/* This would be the actual post content */}
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '</p><p>').replace(/^<p>/, '').replace(/<\/p>$/, '') }} />
        </div>
      </motion.article>

      {/* Tags */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">タグ</h3>
        <div className="flex flex-wrap gap-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700 cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="text-2xl font-bold mb-4">
          {post.cta}
        </h3>
        <Link
          href="/assessment"
          className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          5分診断を開始
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </motion.div>

      {/* Social Share */}
      <motion.div
        className="flex items-center justify-between py-8 border-t border-b border-gray-200 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            この記事をシェア
          </h3>
          <p className="text-gray-600">
            他の人にも役立つ情報をシェアしましょう
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </button>
          <button className="flex items-center justify-center w-12 h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
            </svg>
          </button>
          <button className="flex items-center justify-center w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              <path d="M11.893 5.5c-.413 0-.832.097-1.239.29-.474.225-.923.553-1.324.968-.535.555-.832 1.269-.832 1.984 0 .621.188 1.155.555 1.644l2.97 4.581c.215.331.215.744 0 1.075l-2.97 4.581c-.367.489-.555 1.023-.555 1.644 0 .715.297 1.429.832 1.984.401.415.85.743 1.324.968.407.193.826.29 1.239.29s.832-.097 1.239-.29c.474-.225.923-.553 1.324-.968.535-.555.832-1.269.832-1.984 0-.621-.188-1.155-.555-1.644l-2.97-4.581c-.215-.331-.215-.744 0-1.075l2.97-4.581c.367-.489.555-1.023.555-1.644 0-.715-.297-1.429-.832-1.984-.401-.415-.85-.743-1.324-.968-.407-.193-.826-.29-1.239-.29z"/>
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            関連記事
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost, index) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                className="group"
              >
                <article className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300">
                  {/* Image */}
                  <div className="h-32 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-2xl opacity-50">
                      {relatedPost.category === 'IPO戦略' && '🎯'}
                      {relatedPost.category === 'テクノロジー' && '🤖'}
                      {relatedPost.category === '資金調達' && '💰'}
                      {relatedPost.category === 'マーケティング' && '📈'}
                      {relatedPost.category === 'IPO分析' && '📊'}
                      {!['IPO戦略', 'テクノロジー', '資金調達', 'マーケティング', 'IPO分析'].includes(relatedPost.category) && '📝'}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <div className="text-xs text-primary-600 font-medium mb-2">
                      {relatedPost.category}
                    </div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="mt-3 text-xs text-gray-500">
                      {formatDate(relatedPost.publishedAt)} • {relatedPost.readingTime}分
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </motion.section>
      )}

      {/* Navigation */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <Link
          href="/blog"
          className="text-gray-500 hover:text-gray-700 underline underline-offset-4"
        >
          ← すべての記事に戻る
        </Link>
      </motion.div>
    </div>
  );
}