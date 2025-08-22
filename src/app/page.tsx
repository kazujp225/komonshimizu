import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import AssessmentCTA from '@/components/home/AssessmentCTA';
import StatsSection from '@/components/home/StatsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BlogSection from '@/components/home/BlogSection';

export const metadata: Metadata = {
  title: 'IPO実現への最短ルート',
  description: '20代経営者に特化したIPO支援サービス。AIの力で、あなたの事業を次のレベルへ。5分間の診断で、IPO実現可能性を無料チェック。',
  openGraph: {
    title: 'HANATABA - IPO実現への最短ルート',
    description: '20代経営者に特化したIPO支援サービス。AIの力で、あなたの事業を次のレベルへ。',
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AssessmentCTA />
        <StatsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
}