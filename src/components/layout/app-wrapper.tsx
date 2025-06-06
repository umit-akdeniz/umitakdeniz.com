"use client"

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from 'sonner';
import { Preloader } from '@/components/ui/preloader';

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }
    return sessionStorage.getItem('isLoaded') !== 'true';
  });

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('isLoaded', 'true');
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      <div className="relative flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster richColors />
    </ThemeProvider>
  );
}