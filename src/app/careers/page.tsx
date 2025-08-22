import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CareersHero from '@/components/careers/CareersHero';
import CareersCulture from '@/components/careers/CareersCulture';
import CareersPositions from '@/components/careers/CareersPositions';
import CareersBenefits from '@/components/careers/CareersBenefits';
import CareersCTA from '@/components/careers/CareersCTA';

export const metadata: Metadata = {
  title: '採用情報 | 一緒にIPOの未来を創る',
  description: 'HANATABAで一緒に働きませんか？IPO支援のプロフェッショナルとして成長できる環境があります。',
};

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <CareersHero />
        <CareersCulture />
        <CareersPositions />
        <CareersBenefits />
        <CareersCTA />
      </main>
      <Footer />
    </>
  );
}