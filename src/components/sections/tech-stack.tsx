"use client"

import { motion } from "framer-motion"
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiPrisma,
  SiPostgresql,
  SiFramer,
  SiThreedotjs
} from "@icons-pack/react-simple-icons"

const tech = [
  { name: "React", icon: <SiReact size={32} /> },
  { name: "Next.js", icon: <SiNextdotjs size={32} /> },
  { name: "TypeScript", icon: <SiTypescript size={32} /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={32} /> },
  { name: "Framer Motion", icon: <SiFramer size={32} /> },
  { name: "Three.js", icon: <SiThreedotjs size={32} /> },
  { name: "Prisma", icon: <SiPrisma size={32} /> },
  { name: "PostgreSQL", icon: <SiPostgresql size={32} /> },
]

// npm install @icons-pack/react-simple-icons komutu ile yüklemeniz gerekir
// VEYA lucide-react ikonlarını kullanabilirsiniz. Örnek:
// import { Code } from "lucide-react"
// { name: "React", icon: <Code size={32} /> }

export function TechStack() {
  const FADE_IN_ANIMATION_VARIANTS = {
    initial: { opacity: 0, y: 10 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  }

  return (
    <section className="container py-20 text-center md:py-24">
      <h2 className="text-3xl font-bold tracking-tight mb-12">
        Kullandığım Teknolojiler
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
        {tech.map((item, i) => (
          <motion.div
            key={item.name}
            variants={FADE_IN_ANIMATION_VARIANTS}
            initial="initial"
            whileInView="animate"
            custom={i}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center gap-4 p-4 border rounded-lg bg-card hover:bg-accent transition-colors"
          >
            {item.icon}
            <span className="text-sm font-medium text-muted-foreground">{item.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}