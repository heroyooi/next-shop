import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './layout.module.scss';
import AuthWatcher from '@/components/AuthWatcher';
import AuthButton from '@/components/AuthButton';
import CartSync from '@/components/CartSync';

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
          <AuthButton />
        </header>
        <AuthWatcher />
        <CartSync />
        <main>{children}</main>
      </body>
    </html>
  );
}
