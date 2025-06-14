'use client'

import { ProjectCard } from '@/components/ui/project-card'

const projects = [
  {
    id: '1',
    title: 'Higgs to bb Classifier',
    description:
      'A deep learning project that classifies Higgs → bb̄ decays using advanced machine learning techniques and particle physics data analysis.',
    technologies: ['Python', 'TensorFlow', 'Particle Physics', 'Deep Learning'],
    image: '/images/higgs-project.jpg',
    githubUrl: 'https://github.com/umit-akdeniz/hbb',
    demoUrl: 'https://hbb.umitakdeniz.com',
    slug: 'higgs-bb-classifier',
  },
  {
    id: '2',
    title: 'Chaos and the Discovery of America',
    description:
      'A study of the discovery of America through chaos theory and dynamical systems, exploring historical events through mathematical models.',
    technologies: ['Python', 'Chaos Theory', 'Mathematical Modeling', 'Data Visualization'],
    image: '/images/chaos-project.jpg',
    githubUrl: 'https://github.com/umit-akdeniz/chaos',
    demoUrl: 'https://chaos.umitakdeniz.com',
    slug: 'chaos-discovery-america',
  },
  {
    id: '3',
    title: 'YZÇözümleri – AI Solutions',
    description:
      'A startup idea focused on AI-powered scientific and industrial solutions, providing cutting-edge artificial intelligence applications.',
    technologies: ['AI/ML', 'Business Development', 'Scientific Computing', 'Industrial Solutions'],
    image: '/images/yzcozum-project.jpg',
    githubUrl: 'https://github.com/umit-akdeniz/yzcozum',
    demoUrl: 'https://yzcozum.com',
    slug: 'yzcozumleri-ai',
  },
  {
    id: '4',
    title: 'UncopyrightTR',
    description:
      'A community for Turkish creators to share copyright-free content, fostering creative collaboration and open-source culture.',
    technologies: ['Next.js', 'Community Platform', 'Content Management', 'Turkish Localization'],
    image: '/images/uncopyright-project.jpg',
    githubUrl: 'https://github.com/umit-akdeniz/uncopyrighttr',
    demoUrl: 'https://uncopyrighttr.com',
    slug: 'uncopyrighttr',
  },
]

export function FeaturedProjects() {
  return (
    <section className="relative container py-20 text-center md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-3xl" />

      <div className="relative z-10 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
          Explore my latest work in physics, computer science, and AI development.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="group">
            <ProjectCard
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              githubUrl={project.githubUrl}
              liveUrl={project.demoUrl}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
