'use client'

import { Code, Coffee, GitBranch, Users } from 'lucide-react'

const stats = [
  {
    icon: Code,
    value: '50+',
    label: 'projects',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: GitBranch,
    value: '1000+',
    label: 'commits',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Coffee,
    value: '500+',
    label: 'cups',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    icon: Users,
    value: '10+',
    label: 'clients',
    color: 'from-purple-500 to-pink-500',
  },
]

export function Stats() {
  return (
    <section className="relative container py-20 md:py-24">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl" />

      <div className="relative z-10 text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
          By the Numbers
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A snapshot of my journey in technology and development
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="group relative hover:scale-105 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 text-center">
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Icon */}
                <div className="relative z-10 mb-4 flex justify-center">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Value */}
                <div className="relative z-10 mb-2">
                  <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                </div>

                {/* Label */}
                <p className="relative z-10 text-sm text-muted-foreground font-medium">
                  {stat.label === 'projects'
                    ? 'Projects'
                    : stat.label === 'commits'
                      ? 'Git Commits'
                      : stat.label === 'cups'
                        ? 'Coffee Cups'
                        : stat.label === 'clients'
                          ? 'Happy Clients'
                          : stat.label}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
