import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppWrapper } from '@/components/layout/app-wrapper'; // Yeni oluşturduğumuz sarmalayıcıyı import ediyoruz
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

// Artık metadata'yı buradan güvenle export edebiliriz
export const metadata: Metadata = {
  title: 'Ümit Akdeniz | Portfolyo',
  description: 'Modern web teknolojileri ile geliştirildi.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`min-h-screen bg-background font-sans antialiased ${inter.variable}`}>
        {/* Tüm istemci taraflı mantık artık bu bileşenin içinde */}
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}