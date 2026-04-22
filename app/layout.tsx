import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import './globals.css';
import { AUTHOR, SITE_URL } from '@/lib/persona';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'iamlazyck',
    template: '%s · iamlazyck',
  },
  description:
    '리서치 회사에서 일하는 nerd 의 공개 노트. ML, GenAI, VLM, automation, vibe coder.',
  openGraph: {
    title: 'iamlazyck',
    description:
      '리서치 회사에서 일하는 nerd 의 공개 노트. ML, GenAI, VLM, automation, vibe coder.',
    url: SITE_URL,
    siteName: 'iamlazyck',
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'google-adsense-account': 'ca-pub-9926984776851936',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9926984776851936"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <div className="page-wrapper">
          <header className="site-header">
            <div className="container">
              <Link href="/" className="brand">
                iamlazyck
              </Link>
              <nav>
                <Link href="/posts">posts</Link>
                <Link href="/diary">diary</Link>
                <Link href="/about">about</Link>
              </nav>
            </div>
          </header>
          <main>
            <div className="container">{children}</div>
          </main>
          <footer className="site-footer">
            <div className="container">
              <div className="footer-links">
                <Link href="/about">about</Link>
                <Link href="/privacy">privacy</Link>
                <Link href="/terms">terms</Link>
              </div>
              <div>
                © {new Date().getFullYear()} {AUTHOR.name} · 리서치·자동화·강아지
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
