import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '모아허브 — 배정길의 작업실',
    template: '%s · 모아허브'
  },
  description: '개인 개발자의 포트폴리오와 개발 일지',
  metadataBase: new URL('https://moahub.co.kr'),
  openGraph: {
    title: '모아허브 — 배정길의 작업실',
    description: '개인 개발자의 포트폴리오와 개발 일지',
    url: 'https://moahub.co.kr',
    siteName: '모아허브',
    locale: 'ko_KR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: '모아허브 — 배정길의 작업실',
    description: '개인 개발자의 포트폴리오와 개발 일지'
  },
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/rss.xml', title: '모아허브 RSS' }]
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
