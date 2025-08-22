import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import KPIDashboard from '@/components/dashboard/KPIDashboard';

export const metadata: Metadata = {
  title: 'KPIダッシュボード',
  description: 'HANATABAのビジネスKPIと成果指標をリアルタイムで確認できるダッシュボードです。',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              KPIダッシュボード
            </h1>
            <p className="text-gray-600">
              ビジネス指標とパフォーマンスをリアルタイムで監視
            </p>
          </div>

          <KPIDashboard />
        </div>
      </main>
      <Footer />
    </>
  );
}