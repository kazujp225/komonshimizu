import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CaseStudiesList from '@/components/case-studies/CaseStudiesList';

export const metadata: Metadata = {
  title: '成功事例',
  description: 'HANATABAの支援により、IPOを実現した企業の成功事例をご紹介します。20代経営者たちの軌跡から、あなたの事業成長のヒントを見つけてください。',
  openGraph: {
    title: 'HANATABA 成功事例 - IPO実現企業の軌跡',
    description: '20代でIPOを実現した経営者たちの成功ストーリー。具体的な戦略と成果をご紹介します。',
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              成功事例
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              HANATABAの支援により、IPOを実現した企業の成功事例をご紹介します。
              20代経営者たちの軌跡から、あなたの事業成長のヒントを見つけてください。
            </p>
          </div>

          <CaseStudiesList />
        </div>
      </main>
      <Footer />
    </>
  );
}