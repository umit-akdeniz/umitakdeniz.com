import { SpinningBox } from '@/components/3d/spinning-box'
import { Experience } from '@/components/sections/experience'
import { FeaturedProjects } from '@/components/sections/featured-projects'
import { Hero } from '@/components/sections/hero'
import { Skills } from '@/components/sections/skills'
import { Stats } from '@/components/sections/stats'
import { TechStack } from '@/components/sections/tech-stack'
import { InteractiveCursor } from '@/components/ui/interactive-cursor'
import { PackageShowcase } from '@/components/ui/package-showcase'
import { ParallaxSection } from '@/components/ui/parallax-section'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { Suspense } from 'react'

export default function HomePage() {
  return (
    <>
      <InteractiveCursor />
      <ScrollProgress />
      <Hero />
      <Stats />
      <TechStack />
      <FeaturedProjects />
      <PackageShowcase />
      
      <section className="container text-center py-20 md:py-24">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Interactive 3D Demo</h2>
        <Suspense
          fallback={<div className="h-[400px] w-full bg-secondary rounded-lg animate-pulse" />}
        >
          <SpinningBox />
        </Suspense>
      </section>

      <Skills />
      <Experience />
    </>
  )
}
