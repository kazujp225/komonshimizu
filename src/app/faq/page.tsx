import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQHero from '@/components/faq/FAQHero';
import FAQContent from '@/components/faq/FAQContent';
import FAQCTA from '@/components/faq/FAQCTA';

export const metadata: Metadata = {
  title: 'よくある質問 | IPO支援サービス',
  description: 'IPO準備に関するよくある質問と回答。料金、期間、サポート内容など、お客様からの疑問にお答えします。',
};

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <FAQHero />
        <FAQContent />
        <FAQCTA />
      </main>
      <Footer />
    </>
  );
}