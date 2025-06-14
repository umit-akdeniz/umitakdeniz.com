'use client'

import { useUiStore } from '@/stores/ui-store'
import { AnimatePresence, motion } from 'framer-motion'
import { Briefcase, Mail, PenTool, User } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export function MobileNav() {
  const { isMenuOpen, closeMenu } = useUiStore()

  const mainLinks = [
    { href: '/about', label: 'About', icon: User },
    { href: '/projects', label: 'Projects', icon: Briefcase },
    { href: '/blog', label: 'Blog', icon: PenTool },
  ]

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <span className="text-xl font-bold">Menu</span>
              <button onClick={closeMenu} className="p-2 hover:bg-accent rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {mainLinks.map((link, index) => {
                  const Icon = link.icon
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="flex items-center gap-4 p-4 rounded-xl bg-card/50 hover:bg-accent transition-all duration-200 group"
                      >
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-lg font-medium">{link.label}</span>
                      </Link>
                    </motion.div>
                  )
                })}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card/50 hover:bg-accent transition-all duration-200 group"
                  >
                    <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                      <Mail className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-lg font-medium">Contact</span>
                  </Link>
                </motion.div>
              </div>
            </nav>

            <div className="p-6 border-t border-border/50">
              <div className="flex items-center justify-center gap-4">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
