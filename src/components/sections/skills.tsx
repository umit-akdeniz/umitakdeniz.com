'use client'

import { motion } from 'framer-motion'
import { Atom, Brain, Calculator } from 'lucide-react'

const coreCompetencies = [
  {
    key: 'theoretical',
    icon: Atom,
    title: 'Theoretical Physics',
    areas: ['Quantum Mechanics', 'Statistical Physics', 'Theoretical Analysis'],
  },
  {
    key: 'computational',
    icon: Calculator,
    title: 'Computational Methods',
    areas: ['Mathematical Modeling', 'Numerical Methods', 'Data Analysis'],
  },
  {
    key: 'research',
    icon: Brain,
    title: 'Research Methodology',
    areas: ['Scientific Research', 'Academic Writing', 'Peer Review'],
  },
]

export function Skills() {
  return (
    <section className="container py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Core Competencies</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Essential competencies in theoretical physics and research methodology
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {coreCompetencies.map((competency, index) => {
          const Icon = competency.icon
          return (
            <motion.div
              key={competency.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-lg border hover:shadow-lg transition-shadow"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{competency.title}</h3>
              </div>

              <ul className="space-y-3">
                {competency.areas.map((area, areaIndex) => (
                  <li key={areaIndex} className="text-sm text-muted-foreground flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                    {area}
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}