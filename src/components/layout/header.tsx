"use client" // 'use client' ekliyoruz çünkü hook kullanacağız

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useUiStore } from '@/stores/ui-store';
import { ThemeToggle } from './theme-toggle';
import { MobileNav } from './mobile-nav';

export function Header() {
  const { isMenuOpen, toggleMenu } = useUiStore();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">ÜA</span> {/* Kısa isim mobil için */}
            </Link>
            {/* Masaüstü Navigasyonu */}
            <nav className="hidden items-center gap-6 text-sm md:flex">
              <Link href="/projects" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Projeler
              </Link>
              <Link href="/blog" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Blog
              </Link>
              <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Hakkımda
              </Link>
              <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
                İletişim
              </Link>
            </nav>
          </div>

          {/* Mobil Menü Tetikleyici */}
          <div className="flex flex-1 items-center justify-end space-x-2">
            <div className="md:hidden">
              <button onClick={toggleMenu} aria-label="Menüyü aç/kapat">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            <div className='hidden md:flex items-center space-x-2'>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      {/* Mobil Navigasyon Bileşeni */}
      <MobileNav />
    </>
  );
}