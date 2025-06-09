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

              <div className="relative group">
                <button className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60">
                  Collections
                  <svg
                    className="w-4 h-4 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link
                      href="/books"
                      className="block px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Books
                    </Link>
                    <Link
                      href="/albums"
                      className="block px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Albums
                    </Link>
                    <Link
                      href="/photos"
                      className="block px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Photos
                    </Link>
                    <Link
                      href="/products"
                      className="block px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Products
                    </Link>
                    <Link
                      href="/articles"
                      className="block px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Articles
                    </Link>
                    <Link
                      href="/bookmarks"
                      className="block px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Bookmarks
                    </Link>
                  </div>
                </div>
              </div>

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
