import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'jejuolledev — Blog',
    template: '%s · jejuolledev'
  },
  description: '제주에서 개발하며 기록하는 미니멀 블로그.',
  metadataBase: new URL('https://jejuolledev.com'),
  openGraph: {
    title: 'jejuolledev — Blog',
    description: '제주에서 개발하며 기록하는 미니멀 블로그.',
    url: 'https://jejuolledev.com',
    siteName: 'jejuolledev',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/og?title=jejuolledev&subtitle=Minimal%20tech%20journal',
        width: 1200,
        height: 630
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'jejuolledev — Blog',
    description: '제주에서 개발하며 기록하는 미니멀 블로그.',
    images: ['/og?title=jejuolledev&subtitle=Minimal%20tech%20journal']
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
      <body className="min-h-screen bg-canvas text-text">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
