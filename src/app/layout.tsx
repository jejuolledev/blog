import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'jejuolledev — Developer Portfolio',
    template: '%s · jejuolledev'
  },
  description: '프론트엔드 개발자의 포트폴리오와 개발 일지',
  metadataBase: new URL('https://jejuolledev.com'),
  openGraph: {
    title: 'jejuolledev — Developer Portfolio',
    description: '프론트엔드 개발자의 포트폴리오와 개발 일지',
    url: 'https://jejuolledev.com',
    siteName: 'jejuolledev',
    locale: 'ko_KR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'jejuolledev — Developer Portfolio',
    description: '프론트엔드 개발자의 포트폴리오와 개발 일지'
  },
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/rss.xml', title: 'jejuolledev RSS' }]
    }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen bg-canvas text-text antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
