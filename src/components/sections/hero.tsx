'use client'

import { FloatingShapes } from '@/components/3d/floating-shapes'
import { Button } from '@/components/ui/button'
import { AnimatedCubes } from '@/components/ui/animated-cubes'
import { FloatingOrbs } from '@/components/ui/floating-orbs'
import { GeometricPatterns } from '@/components/ui/geometric-patterns'
import { ParticleSystem } from '@/components/ui/particle-system'
import { SpiderWeb } from '@/components/ui/spider-web'
import { Code, Globe, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Interactive Background Elements */}
      <GeometricPatterns />
      <FloatingOrbs />
      <ParticleSystem />
      <SpiderWeb />
      <AnimatedCubes />
      
      {/* 3D Floating Shapes */}
      <Suspense fallback={null}>
        <FloatingShapes />
      </Suspense>

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />

      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-10 blur-sm animate-pulse" />
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-10 blur-sm animate-bounce" />
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-10 blur-sm animate-spin" />

      <div className="container relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Glowing Badge */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-500/10 backdrop-blur-sm border border-primary/20 rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Available for Work
            </span>
          </div>
        </div>

        {/* Main Title with Gradient */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
            Ümit Akdeniz
          </span>
        </h1>

        {/* Subtitle with typing effect */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-medium text-muted-foreground mb-2">
            Physics Graduate & Full-Stack Developer
          </h2>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
          Passionate about quantum physics and modern web development. Creating innovative solutions
          at the intersection of science and technology.
        </p>

        {/* Floating Icons */}
        <div className="flex items-center justify-center gap-8 mb-12">
          <div className="p-4 bg-blue-500/10 rounded-full hover:scale-110 transition-all duration-300 hover:bg-blue-500/20 backdrop-blur-sm border border-blue-500/20">
            <Code className="w-8 h-8 text-blue-500" />
          </div>
          <div className="p-4 bg-purple-500/10 rounded-full hover:scale-110 transition-all duration-300 hover:bg-purple-500/20 backdrop-blur-sm border border-purple-500/20">
            <Zap className="w-8 h-8 text-purple-500" />
          </div>
          <div className="p-4 bg-green-500/10 rounded-full hover:scale-110 transition-all duration-300 hover:bg-green-500/20 backdrop-blur-sm border border-green-500/20">
            <Globe className="w-8 h-8 text-green-500" />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button
            asChild
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white border-0 px-8 py-6 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/contact">
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="group border-2 border-primary/20 hover:border-primary/40 bg-background/50 backdrop-blur-sm px-8 py-6 text-lg font-semibold rounded-2xl hover:scale-105 transition-all duration-300"
          >
            <Link href="/projects">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-primary transition-all duration-300">
                View My Work
              </span>
            </Link>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center animate-bounce">
            <div className="w-1 h-3 bg-muted-foreground/30 rounded-full mt-2" />
          </div>
        </div>
      </div>
    </section>
  )
}
