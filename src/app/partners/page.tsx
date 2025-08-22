import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PartnersHero from '@/components/partners/PartnersHero';
import PartnersList from '@/components/partners/PartnersList';
import PartnersCTA from '@/components/partners/PartnersCTA';

export const metadata: Metadata = {
  title: 'パートナー企業 | 信頼のネットワーク',
  description: 'HANATABAと連携する監査法人、証券会社、VC、専門家ネットワークをご紹介。IPO実現を支える強力なパートナーシップ。',
};

export default function PartnersPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <PartnersHero />
        <PartnersList />
        <PartnersCTA />
      </main>
      <Footer />
    </>
  );
}