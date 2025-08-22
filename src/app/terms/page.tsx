import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TermsContent from '@/components/legal/TermsContent';

export const metadata: Metadata = {
  title: '利用規約 | HANATABA',
  description: 'HANATABAサービスの利用規約です。',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <TermsContent />
      </main>
      <Footer />
    </>
  );
}