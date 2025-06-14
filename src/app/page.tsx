import { PhysicsShapes } from '@/components/3d/physics-shapes'
import { QuantumFieldVisualization } from '@/components/3d/quantum-field'
import { Experience } from '@/components/sections/experience'
import { FeaturedProjects } from '@/components/sections/featured-projects'
import { Hero } from '@/components/sections/hero'
import { Skills } from '@/components/sections/skills'
import { TechStack } from '@/components/sections/tech-stack'
import { InteractiveCursor } from '@/components/ui/interactive-cursor'
import { InteractiveShapes } from '@/components/ui/interactive-shapes'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { Suspense } from 'react'

export default function HomePage() {
  return (
    <>
      <InteractiveCursor />
      <ScrollProgress />
      <Hero />
      <InteractiveShapes />

      <section className="container py-20 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Physics & Computer Science
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interactive visualizations of atomic structures, molecular dynamics, and astronomical
            phenomena
          </p>
        </div>
        <Suspense
          fallback={<div className="h-96 w-full bg-secondary/20 rounded-lg animate-pulse" />}
        >
          <PhysicsShapes />
        </Suspense>
      </section>

      <TechStack />
      <FeaturedProjects />

      <section className="container py-20 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Quantum Field Theory
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Exploring the fundamental nature of reality through computational physics
          </p>
        </div>
        <Suspense
          fallback={<div className="h-80 w-full bg-secondary/20 rounded-lg animate-pulse" />}
        >
          <QuantumFieldVisualization />
        </Suspense>
      </section>

      <Skills />
      <Experience />
    </>
  )
}
