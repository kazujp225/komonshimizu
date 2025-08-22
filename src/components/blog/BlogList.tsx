'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { getBlogPosts } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';

export default function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [searchQuery, setSearchQuery] = useState('');
  
  const allPosts = getBlogPosts();
  const categories = ['すべて', 'IPO戦略', 'テクノロジー', '資金調達', 'マーケティング', 'IPO分析'];

  // Filter posts
  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCategory === 'すべて' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search and Filter */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            placeholder="記事を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-primary-300 hover:text-primary-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.div
        className="mb-8 text-center text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {filteredPosts.length}件の記事が見つかりました
        {(selectedCategory !== 'すべて' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('すべて');
              setSearchQuery('');
            }}
            className="ml-2 text-primary-600 hover:text-primary-700 underline underline-offset-4"
          >
            フィルタをクリア
          </button>
        )}
      </motion.div>

      {/* Blog Posts Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => (
          <motion.article
            key={post.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * (index % 6) }}
          >
            <Link href={`/blog/${post.slug}`}>
              {/* Image placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <div className="text-4xl opacity-50">
                  {post.category === 'IPO戦略' && '🎯'}
                  {post.category === 'テクノロジー' && '🤖'}
                  {post.category === '資金調達' && '💰'}
                  {post.category === 'マーケティング' && '📈'}
                  {post.category === 'IPO分析' && '📊'}
                  {!['IPO戦略', 'テクノロジー', '資金調達', 'マーケティング', 'IPO分析'].includes(post.category) && '📝'}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category and reading time */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                    post.category === 'IPO戦略' ? 'bg-purple-100 text-purple-800' :
                    post.category === 'テクノロジー' ? 'bg-blue-100 text-blue-800' :
                    post.category === '資金調達' ? 'bg-green-100 text-green-800' :
                    post.category === 'マーケティング' ? 'bg-orange-100 text-orange-800' :
                    post.category === 'IPO分析' ? 'bg-indigo-100 text-indigo-800' :
                    'bg-primary-100 text-primary-800'
                  }`}>
                    {post.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readingTime}分
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3 text-sm">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-gray-400">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Meta info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-xs font-semibold mr-3">
                      {post.author.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {post.author.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(post.publishedAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {post.engagement.views.toLocaleString()}
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            記事が見つかりませんでした
          </h3>
          <p className="text-gray-600 mb-6">
            検索条件を変更して再度お試しください
          </p>
          <button
            onClick={() => {
              setSelectedCategory('すべて');
              setSearchQuery('');
            }}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            すべての記事を表示
          </button>
        </motion.div>
      )}

      {/* Load More */}
      {filteredPosts.length > 0 && (
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button className="bg-white border-2 border-gray-300 hover:border-primary-600 text-gray-700 hover:text-primary-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:bg-primary-50">
            さらに読み込む
          </button>
        </motion.div>
      )}

      {/* Newsletter Signup */}
      <motion.div
        className="mt-20 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          最新記事をお見逃しなく
        </h3>
        <p className="text-gray-600 mb-6">
          IPO・スタートアップ経営に関する最新記事を週2回お届けします
        </p>
        <div className="flex max-w-md mx-auto gap-3">
          <input
            type="email"
            placeholder="メールアドレスを入力"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            購読
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          いつでも配信停止可能です。スパムメールは送信しません。
        </p>
      </motion.div>
    </div>
  );
}