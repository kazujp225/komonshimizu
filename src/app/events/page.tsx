import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventsHero from '@/components/events/EventsHero';
import EventsList from '@/components/events/EventsList';
import EventsCTA from '@/components/events/EventsCTA';

export const metadata: Metadata = {
  title: 'セミナー・イベント | IPO準備の学習機会',
  description: 'HANATABAが主催するIPOセミナー、ウェビナー、勉強会の情報をお届けします。専門家から直接学べる機会を提供。',
};

export default function EventsPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <EventsHero />
        <EventsList />
        <EventsCTA />
      </main>
      <Footer />
    </>
  );
}