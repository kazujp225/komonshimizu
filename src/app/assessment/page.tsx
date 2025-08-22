import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentForm from '@/components/assessment/AssessmentForm';

export const metadata: Metadata = {
  title: 'IPO実現力診断（5分間）',
  description: 'あなたのビジネスのIPO実現可能性を無料診断。20代経営者特化の分析で、具体的な改善提案をお届けします。',
  openGraph: {
    title: 'IPO実現力診断 - あなたの可能性を5分でチェック',
    description: '20代経営者のためのIPO診断ツール。無料で詳細な分析結果と改善提案を提供します。',
  },
};

export default function AssessmentPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                IPO実現力診断
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                あなたのビジネスのIPO実現可能性を診断します
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>所要時間：約5分</span>
              </div>
            </div>

            <AssessmentForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}