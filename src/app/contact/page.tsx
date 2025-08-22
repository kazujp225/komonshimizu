import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'HANATABAへのお問い合わせ。IPOコンサルティングに関するご相談、サービスに関するご質問など、お気軽にお問い合わせください。',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                お問い合わせ
              </h1>
              <p className="text-xl text-gray-600">
                IPO実現に向けた第一歩を踏み出しましょう
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ContactForm />
              </div>
              <div>
                <ContactInfo />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}