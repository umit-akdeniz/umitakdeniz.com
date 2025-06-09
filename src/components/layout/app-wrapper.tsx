'use client'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Preloader } from '@/components/ui/preloader'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === 'undefined') {
      return true
    }
    return sessionStorage.getItem('isLoaded') !== 'true'
  })

  // Smooth scroll hook
  useSmoothScroll()

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
        sessionStorage.setItem('isLoaded', 'true')
      }, 2500)

      return () => clearTimeout(timer)
    }
  }, [isLoading])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>

      <div className="relative flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster richColors />
    </ThemeProvider>
  )
}
