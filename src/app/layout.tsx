import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'Next 쇼핑몰',
  description: 'Next.js + Firebase 쇼핑몰',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <header className={styles.navbar}>
          <nav>
            <Link href="/">🏠 홈</Link>
            <Link href="/cart">🛒 장바구니</Link>
            <Link href="/about">ℹ️ 소개</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
