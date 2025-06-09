'use client'

import { motion } from 'framer-motion'
import { Camera, Code, Globe, Package, Palette, Zap } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const packages = [
  {
    name: 'Framer Motion',
    description: 'Güçlü animasyon kütüphanesi',
    descriptionEn: 'Powerful animation library',
    icon: Zap,
    example: 'Sayfa geçişleri, hover efektleri, scroll animasyonları',
    exampleEn: 'Page transitions, hover effects, scroll animations',
    usage: 'motion.div, variants, useAnimation',
    color: 'from-pink-500 to-violet-500',
  },
  {
    name: 'Three.js + React Three Fiber',
    description: '3D grafikler ve WebGL',
    descriptionEn: '3D graphics and WebGL',
    icon: Package,
    example: 'Spinning cube, 3D modeller, interaktif sahneler',
    exampleEn: 'Spinning cube, 3D models, interactive scenes',
    usage: 'Canvas, useFrame, useLoader',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Lenis',
    description: 'Smooth scroll deneyimi',
    descriptionEn: 'Smooth scroll experience',
    icon: Globe,
    example: 'Doğal kaydırma, momentum, easing',
    exampleEn: 'Natural scrolling, momentum, easing',
    usage: 'new Lenis(), raf loop, scroll events',
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'React Intersection Observer',
    description: 'Görünürlük algılama',
    descriptionEn: 'Visibility detection',
    icon: Camera,
    example: 'Lazy loading, scroll triggers, animasyon tetikleyicileri',
    exampleEn: 'Lazy loading, scroll triggers, animation triggers',
    usage: 'useInView, threshold, triggerOnce',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'Next.js + TypeScript',
    description: 'Modern web framework',
    descriptionEn: 'Modern web framework',
    icon: Code,
    example: 'SSR, SSG, API routes, type safety',
    exampleEn: 'SSR, SSG, API routes, type safety',
    usage: 'App Router, middleware, metadata',
    color: 'from-gray-600 to-gray-800',
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework',
    descriptionEn: 'Utility-first CSS framework',
    icon: Palette,
    example: 'Responsive design, dark mode, custom variants',
    exampleEn: 'Responsive design, dark mode, custom variants',
    usage: 'className, @apply, arbitrary values',
    color: 'from-teal-500 to-blue-600',
  },
]

export function PackageShowcase() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section ref={ref} className="container py-20">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-3xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Kullandığım Modern Paketler
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Bu projede kullanılan modern kütüphaneler ve canlı örnekleri
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg, index) => {
          const Icon = pkg.icon
          return (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-sm p-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Animated Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-0 group-hover:opacity-10 transition-all duration-500`}
              />

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all duration-500" />

              {/* Floating Icon */}
              <motion.div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${pkg.color} mb-4 shadow-lg`}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-6 h-6 text-white" />
              </motion.div>

              {/* Content with micro-animations */}
              <motion.h3
                className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
              >
                {pkg.name}
              </motion.h3>
              <motion.p className="text-muted-foreground mb-4" whileHover={{ x: 3 }}>
                {pkg.description}
              </motion.p>

              {/* Interactive Example */}
              <motion.div
                className="mb-4 p-3 bg-secondary/30 rounded-lg border group-hover:bg-secondary/50 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-sm font-medium text-primary mb-2 flex items-center">
                  <Zap className="w-3 h-3 mr-1" />
                  Canlı Örnek:
                </h4>
                <p className="text-sm text-muted-foreground">{pkg.example}</p>
              </motion.div>

              {/* Animated Usage Badge */}
              <motion.div className="space-y-2" whileHover={{ y: -2 }}>
                <h4 className="text-sm font-medium text-primary">API/Hooks:</h4>
                <motion.code
                  className="text-xs bg-gradient-to-r from-secondary to-secondary/70 px-3 py-2 rounded-lg font-mono block border group-hover:border-primary/30 transition-colors"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 4px 12px rgba(var(--primary), 0.2)',
                  }}
                >
                  {pkg.usage}
                </motion.code>
              </motion.div>

              {/* Sparkle Effect on Hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'linear',
                  }}
                  className="w-4 h-4 text-primary"
                >
                  ✨
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Code Examples Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-16 bg-card rounded-xl border p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Örnek Kod Parçacıkları</h3>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Framer Motion Example */}
          <div>
            <h4 className="text-sm font-medium text-primary mb-2">
              Framer Motion - Scroll Animation
            </h4>
            <pre className="bg-secondary/50 p-4 rounded-lg text-sm overflow-x-auto">
              <code>{`// Scroll tetiklemeli animasyon
const { ref, inView } = useInView()

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 50 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>`}</code>
            </pre>
          </div>

          {/* Lenis Example */}
          <div>
            <h4 className="text-sm font-medium text-primary mb-2">Lenis - Smooth Scroll</h4>
            <pre className="bg-secondary/50 p-4 rounded-lg text-sm overflow-x-auto">
              <code>{`// Smooth scroll setup
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}`}</code>
            </pre>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
