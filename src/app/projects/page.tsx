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
    status: 'active',
    featured: true,
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
    status: 'active',
    featured: true,
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
    status: 'development',
    featured: true,
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
    status: 'active',
    featured: true,
  },
  {
    id: '5',
    title: 'Quantum State Visualizer',
    description:
      'Interactive quantum state visualization tool with 3D qubit representations and quantum gate operations.',
    technologies: ['React', 'Three.js', 'WebGL', 'Quantum Computing'],
    image: '/images/quantum-viz.jpg',
    githubUrl: 'https://github.com/umit-akdeniz/quantum-viz',
    demoUrl: 'https://quantum.umitakdeniz.com',
    slug: 'quantum-visualizer',
    status: 'development',
    featured: false,
  },
  {
    id: '6',
    title: 'Astrophysics Data Pipeline',
    description:
      'Automated data processing pipeline for astronomical observations and celestial object detection.',
    technologies: ['Python', 'Apache Airflow', 'Computer Vision', 'Astronomy'],
    image: '/images/astro-pipeline.jpg',
    githubUrl: 'https://github.com/umit-akdeniz/astro-pipeline',
    demoUrl: '',
    slug: 'astrophysics-pipeline',
    status: 'research',
    featured: false,
  },
]

export default function ProjectsPage() {
  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: {
        label: 'Active',
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      },
      development: {
        label: 'In Development',
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      },
      research: {
        label: 'Research',
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      },
      archived: {
        label: 'Archived',
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active
    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    )
  }

  return (
    <div className="container py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore my work in physics, computer science, and AI development.
          </p>
        </div>

        {/* Featured Projects */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
            <span className="w-6 h-1 bg-primary rounded-full" />
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <div key={project.id} className="group relative">
                <div className="absolute top-4 right-4 z-10">{getStatusBadge(project.status)}</div>
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

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <span className="w-6 h-1 bg-accent rounded-full" />
              Research & Development
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <div key={project.id} className="group relative">
                  <div className="absolute top-4 right-4 z-10">
                    {getStatusBadge(project.status)}
                  </div>
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    technologies={project.technologies.slice(0, 3)}
                    githubUrl={project.githubUrl}
                    liveUrl={project.demoUrl}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted/50 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            More projects coming soon...
          </div>
        </div>
      </div>
    </div>
  )
}
