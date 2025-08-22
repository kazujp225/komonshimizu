import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from '@/components/about/AboutHero';
import CompanyInfo from '@/components/about/CompanyInfo';
import TeamSection from '@/components/about/TeamSection';
import MissionVision from '@/components/about/MissionVision';

export const metadata: Metadata = {
  title: '会社概要',
  description: 'HANATABAについて。私たちのミッション、ビジョン、チーム、会社情報をご紹介します。',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <AboutHero />
        <MissionVision />
        <TeamSection />
        <CompanyInfo />
      </main>
      <Footer />
    </>
  );
}