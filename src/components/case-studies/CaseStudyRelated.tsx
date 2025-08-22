'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

type CaseStudy = {
  id: string;
  company: string;
  industry: string;
  title: string;
  description: string;
  timeline: string;
  revenue: string;
  valuation: string;
};

type Props = {
  currentId: string;
  caseStudies: CaseStudy[];
};

export default function CaseStudyRelated({ currentId, caseStudies }: Props) {
  // Filter out current case study and get up to 3 related ones
  const relatedCases = caseStudies
    .filter(cs => cs.id !== currentId)
    .slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            その他の成功事例
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedCases.map((caseStudy, index) => (
              <motion.article
                key={caseStudy.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <a href={`/case-studies/${caseStudy.id}`} className="block p-6">
                  <Badge variant="info" size="sm" className="mb-3">
                    {caseStudy.industry}
                  </Badge>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {caseStudy.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {caseStudy.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">期間: {caseStudy.timeline}</span>
                    <span className="text-primary-600 font-semibold">
                      詳細を見る →
                    </span>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <a
              href="/case-studies"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              すべての成功事例を見る
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