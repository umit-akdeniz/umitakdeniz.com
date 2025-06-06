"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useUiStore } from "@/stores/ui-store"

const links = [
  { href: "/projects", label: "Projeler" },
  { href: "/about", label: "Hakkımda" },
  { href: "/contact", label: "İletişim" },
]

export function MobileNav() {
  const { isMenuOpen, closeMenu } = useUiStore()

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-40 bg-background md:hidden"
        >
          <nav className="container flex flex-col items-center justify-center h-full gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-2xl font-semibold transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}