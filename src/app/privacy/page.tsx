import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PrivacyContent from '@/components/legal/PrivacyContent';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | HANATABA',
  description: 'HANATABAのプライバシーポリシーです。',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <PrivacyContent />
      </main>
      <Footer />
    </>
  );
}