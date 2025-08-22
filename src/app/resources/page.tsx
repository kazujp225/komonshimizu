import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ResourcesHero from '@/components/resources/ResourcesHero';
import ResourcesGrid from '@/components/resources/ResourcesGrid';
import ResourcesCTA from '@/components/resources/ResourcesCTA';

export const metadata: Metadata = {
  title: 'リソースセンター | IPO準備資料・ツール',
  description: 'IPO準備に必要な資料、チェックリスト、テンプレートを無料でダウンロード。実践的なツールで上場準備を効率化。',
};

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <ResourcesHero />
        <ResourcesGrid />
        <ResourcesCTA />
      </main>
      <Footer />
    </>
  );
}