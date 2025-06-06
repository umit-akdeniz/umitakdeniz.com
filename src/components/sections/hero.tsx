"use client" // Animasyonlar istemci tarafında çalışır

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function Hero() {
  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  }

  return (
    <motion.section
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className="container flex flex-col items-center justify-center py-20 text-center md:py-32"
    >
      <motion.h1
        variants={FADE_UP_ANIMATION_VARIANTS}
        className="text-4xl font-bold tracking-tight md:text-6xl"
      >
        Modern Web Deneyimleri Tasarlıyorum
      </motion.h1>
      <motion.p
        variants={FADE_UP_ANIMATION_VARIANTS}
        className="mt-6 max-w-2xl text-lg text-muted-foreground"
      >
        Merhaba, ben Ümit. Full-stack geliştirici olarak, kullanıcı dostu ve
        yüksek performanslı web uygulamaları ve siteleri oluşturuyorum.
      </motion.p>
      <motion.div
        variants={FADE_UP_ANIMATION_VARIANTS}
        className="mt-8 flex gap-4"
      >
        <Button asChild size="lg">
          <Link href="/contact">İletişime Geç</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/projects">Projelerimi Gör</Link>
        </Button>
      </motion.div>
    </motion.section>
  )
}