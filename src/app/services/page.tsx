import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesList from '@/components/services/ServicesList';
import ServiceProcess from '@/components/services/ServiceProcess';
import ServiceCTA from '@/components/services/ServiceCTA';

export const metadata: Metadata = {
  title: 'サービス一覧 | IPO支援サービス',
  description: 'HANATABAが提供するIPO支援サービスの詳細。内部統制構築、資金調達支援、IR戦略立案など、上場準備に必要なすべてをサポート。',
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <ServicesHero />
        <ServicesList />
        <ServiceProcess />
        <ServiceCTA />
      </main>
      <Footer />
    </>
  );
}