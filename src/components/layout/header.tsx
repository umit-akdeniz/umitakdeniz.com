'use client'

import { useUiStore } from '@/stores/ui-store'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { MobileNav } from './mobile-nav'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  const { isMenuOpen, toggleMenu } = useUiStore()

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">ÜA</span>
            </Link>
            <nav className="hidden items-center gap-6 text-sm md:flex">
              <Link
                href="/about"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                About
              </Link>
              <Link
                href="/projects"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-2">
            <div className="md:hidden">
              <button type="button" onClick={toggleMenu} aria-label="Toggle menu">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      <MobileNav />
    </>
  )
}