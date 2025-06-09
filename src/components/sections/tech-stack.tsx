'use client'

import {
  Activity,
  Atom,
  Box,
  Brain,
  Calculator,
  Code2,
  Cpu,
  Database,
  FileCode,
  FileText,
  Globe,
  Layers,
  Palette,
  Settings,
  Terminal,
  Zap,
} from 'lucide-react'
import { useState } from 'react'

const webTech = [
  { name: 'React', icon: <Code2 size={32} /> },
  { name: 'Next.js', icon: <Globe size={32} /> },
  { name: 'TypeScript', icon: <FileCode size={32} /> },
  { name: 'JavaScript', icon: <Terminal size={32} /> },
  { name: 'Tailwind CSS', icon: <Palette size={32} /> },
  { name: 'Framer Motion', icon: <Activity size={32} /> },
  { name: 'Three.js', icon: <Box size={32} /> },
  { name: 'Prisma', icon: <Layers size={32} /> },
  { name: 'PostgreSQL', icon: <Database size={32} /> },
  { name: 'PHP', icon: <Code2 size={32} /> },
  { name: 'C#', icon: <Settings size={32} /> },
]

const physicsTech = [
  { name: 'Python', icon: <Terminal size={32} /> },
  { name: 'C++', icon: <Code2 size={32} /> },
  { name: 'MATLAB', icon: <Calculator size={32} /> },
  { name: 'Mathematica', icon: <Calculator size={32} /> },
  { name: 'LabVIEW', icon: <Zap size={32} /> },
  { name: 'LaTeX', icon: <FileCode size={32} /> },
  { name: 'ROOT', icon: <Database size={32} /> },
  { name: 'GEANT4', icon: <Atom size={32} /> },
  { name: 'Keras', icon: <Brain size={32} /> },
  { name: 'PyTorch', icon: <Cpu size={32} /> },
  { name: 'Qiskit', icon: <Atom size={32} /> },
]

// npm install @icons-pack/react-simple-icons komutu ile yüklemeniz gerekir
// VEYA lucide-react ikonlarını kullanabilirsiniz. Örnek:
// import { Code } from "lucide-react"
// { name: "React", icon: <Code size={32} /> }

export function TechStack() {
  const [activeTab, setActiveTab] = useState('web')

  const currentTech = activeTab === 'web' ? webTech : physicsTech

  return (
    <section className="relative container py-20 text-center md:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Tech Stack
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Technologies and tools I use for web development and physics research
        </p>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl">
            <button
              onClick={() => setActiveTab('web')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'web'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Web Development
            </button>
            <button
              onClick={() => setActiveTab('physics')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'physics'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Physics Research
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {currentTech.map((item, i) => (
          <div
            key={item.name}
            className="group relative flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 hover:-translate-y-1"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 text-foreground/80 group-hover:text-primary transition-colors duration-300">
              {item.icon}
            </div>
            <span className="relative z-10 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
