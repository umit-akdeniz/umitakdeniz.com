import { AppWrapper } from '@/components/layout/app-wrapper'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ümit Akdeniz - Software Engineer & Physicist',
  description:
    'Portfolio website of Ümit Akdeniz - Software Engineer & Physicist. Research, projects, and technical articles.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
