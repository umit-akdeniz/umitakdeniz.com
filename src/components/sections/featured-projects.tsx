import { ProjectCard } from '@/components/ui/project-card'

const featuredProjects = [
  {
    id: 1,
    title: 'Quantum State Visualizer',
    description:
      'Interactive quantum state visualizer with 3D qubit animations using React Three Fiber',
    technologies: ['React', 'Three.js', 'TypeScript', 'Framer Motion'],
    image: '/images/project-1.jpg',
    githubUrl: 'https://github.com/umitakdeniz',
    liveUrl: 'https://example.com',
  },
  {
    id: 2,
    title: 'Physics Simulation Engine',
    description:
      'Real-time physics simulation engine with WebGL support - particle systems and collision calculations',
    technologies: ['JavaScript', 'WebGL', 'Canvas', 'WebWorkers'],
    image: '/images/project-2.jpg',
    githubUrl: 'https://github.com/umitakdeniz',
    liveUrl: 'https://example.com',
  },
  {
    id: 3,
    title: 'Mathematical Function Plotter',
    description:
      'Advanced mathematical function plotter with 2D/3D graphics and interactive manipulation',
    technologies: ['Next.js', 'D3.js', 'MathJax', 'Tailwind'],
    image: '/images/project-3.jpg',
    githubUrl: 'https://github.com/umitakdeniz',
    liveUrl: 'https://example.com',
  },
]

export function FeaturedProjects() {
  return (
    <section className="relative container py-20 text-center md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 rounded-3xl" />

      <div className="relative z-10 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto rounded-full" />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project) => (
          <div key={project.id}>
            <ProjectCard
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
