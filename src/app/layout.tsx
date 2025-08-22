import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | HANATABA',
    default: 'HANATABA - IPOの地図 × 20歳の羅針盤 × AIの推進力',
  },
  description: 'IPOの地図と20歳の羅針盤を、AIの推進力に繋げて、今日の売上まで引きずり上げる',
  keywords: ['IPO', 'スタートアップ', '20代経営者', 'AI', 'コンサルティング', '上場支援'],
  authors: [{ name: 'HANATABA Team' }],
  creator: 'HANATABA',
  publisher: 'HANATABA',
  metadataBase: new URL('https://hanataba.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://hanataba.com',
    siteName: 'HANATABA',
    title: 'HANATABA - IPOの地図 × 20歳の羅針盤 × AIの推進力',
    description: 'IPOの地図と20歳の羅針盤を、AIの推進力に繋げて、今日の売上まで引きずり上げる',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HANATABA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HANATABA - IPOの地図 × 20歳の羅針盤 × AIの推進力',
    description: 'IPOの地図と20歳の羅針盤を、AIの推進力に繋げて、今日の売上まで引きずり上げる',
    images: ['/twitter-image.jpg'],
    creator: '@hanataba',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-token',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}