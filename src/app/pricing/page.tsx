import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingHero from '@/components/pricing/PricingHero';
import PricingComparison from '@/components/pricing/PricingComparison';
import PricingSection from '@/components/pricing/PricingSection';
import PricingCalculator from '@/components/pricing/PricingCalculator';
import PricingGuarantee from '@/components/pricing/PricingGuarantee';
import PricingCTA from '@/components/pricing/PricingCTA';
import PricingTestimonials from '@/components/pricing/PricingTestimonials';
import PricingFAQ from '@/components/pricing/PricingFAQ';

export const metadata: Metadata = {
  title: '料金プラン | 上場企業CEOによるIPO支援',
  description: 'HANATABAの料金プランをご確認ください。成功報酬型から月額制まで、あなたのビジネスに最適なプランをお選びいただけます。',
  openGraph: {
    title: 'HANATABA 料金プラン - IPO成功率92%の実績',
    description: '上場企業の現役CEOが直接支援。成功報酬型プランもご用意。',
  },
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-white to-gray-50">
        <PricingHero />
        <PricingSection />
        <PricingComparison />
        <PricingCalculator />
        <PricingGuarantee />
        <PricingTestimonials />
        <PricingFAQ />
        <PricingCTA />
      </main>
      <Footer />
    </>
  );
}