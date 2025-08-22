import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsHero from '@/components/news/NewsHero';
import NewsList from '@/components/news/NewsList';
import NewsNewsletter from '@/components/news/NewsNewsletter';

export const metadata: Metadata = {
  title: 'ニュース・プレスリリース | 最新情報',
  description: 'HANATABAの最新ニュース、プレスリリース、メディア掲載情報をお届けします。',
};

export default function NewsPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <NewsHero />
        <NewsList />
        <NewsNewsletter />
      </main>
      <Footer />
    </>
  );
}