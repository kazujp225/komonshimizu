'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

type BlogPost = {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
};

type Props = {
  currentId: string;
  posts: BlogPost[];
};

export default function BlogRelated({ currentId, posts }: Props) {
  // Filter out current post and get up to 3 related posts
  const relatedPosts = posts
    .filter(post => post.id !== currentId)
    .slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            関連記事
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <a href={`/blog/${post.id}`} className="block">
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gray-100 rounded-t-xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <Badge variant="info" size="sm" className="mb-3">
                      {post.category}
                    </Badge>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <a
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              すべての記事を見る
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}