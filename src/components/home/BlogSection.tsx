'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { getRecentBlogPosts } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';

export default function BlogSection() {
  const recentPosts = getRecentBlogPosts(3);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            最新の記事
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            IPO、スタートアップ経営、AI活用に関する最新情報とインサイトをお届けします
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {recentPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <Link href={`/blog/${post.slug}`}>
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl opacity-50">📝</div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category and reading time */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 text-primary-800">
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center justify-between">
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

        {/* Tags */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['IPO戦略', 'AI活用', '資金調達', '20代経営者', 'スタートアップ', '成長戦略'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-primary-300 hover:text-primary-600 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          <Link
            href="/blog"
            className="inline-flex items-center justify-center border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
          >
            すべての記事を見る
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}