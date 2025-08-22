import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsultationHero from '@/components/consultation/ConsultationHero';
import ConsultationForm from '@/components/consultation/ConsultationForm';
import ConsultationBenefits from '@/components/consultation/ConsultationBenefits';
import ConsultationFAQ from '@/components/consultation/ConsultationFAQ';

export const metadata: Metadata = {
  title: '無料相談予約 | 上場企業CEOが直接回答',
  description: '初回相談無料。上場企業の現役CEOがあなたのIPO準備に関する疑問に直接お答えします。',
};

export default function ConsultationPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <ConsultationHero />
        <ConsultationBenefits />
        <ConsultationForm />
        <ConsultationFAQ />
      </main>
      <Footer />
    </>
  );
}