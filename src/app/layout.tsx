import { AppWrapper } from '@/components/layout/app-wrapper'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ümit Akdeniz – Theoretical Physics & Quantum Research',
  description: 'Personal academic website of Ümit Akdeniz, physicist specializing in quantum mechanics, chaos theory, and Higgs physics.',
  keywords: 'Ümit Akdeniz, physics, quantum mechanics, theoretical physics, Higgs, chaos theory, research',
  authors: [{ name: 'Ümit Akdeniz' }],
  openGraph: {
    title: 'Ümit Akdeniz – Theoretical Physics & Quantum Research',
    description: 'Personal academic website of Ümit Akdeniz, physicist specializing in quantum mechanics, chaos theory, and Higgs physics.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ümit Akdeniz – Theoretical Physics & Quantum Research',
    description: 'Personal academic website of Ümit Akdeniz, physicist specializing in quantum mechanics, chaos theory, and Higgs physics.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ümit Akdeniz',
    jobTitle: 'Theoretical Physicist',
    description: 'Physicist specializing in quantum mechanics, chaos theory, and Higgs physics',
    url: 'https://umitakdeniz.com',
    sameAs: [
      'https://scholar.google.com/citations?user=umitakdeniz',
      'https://www.researchgate.net/profile/Umit-Akdeniz',
      'https://github.com/umit-akdeniz',
      'https://linkedin.com/in/umitakdeniz',
    ],
    knowsAbout: [
      'Theoretical Physics',
      'Quantum Mechanics',
      'Chaos Theory',
      'Higgs Physics',
      'Computational Physics',
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'University',
    },
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}