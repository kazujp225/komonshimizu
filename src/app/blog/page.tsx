import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogList from '@/components/blog/BlogList';

export const metadata: Metadata = {
  title: 'ブログ',
  description: 'IPO、スタートアップ経営、AI活用に関する最新情報をお届けします。20代経営者のための実践的な記事を定期更新中。',
  openGraph: {
    title: 'HANATABA ブログ - IPO・起業の最新情報',
    description: '20代経営者のためのIPO・スタートアップ経営情報をお届けします。',
  },
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ブログ
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              IPO、スタートアップ経営、AI活用に関する最新情報をお届けします。
              20代経営者のための実践的な知識とインサイトを定期更新中。
            </p>
          </div>

          <BlogList />
        </div>
      </main>
      <Footer />
    </>
  );
}