import { ProjectCard } from '@/components/ui/project-card'
import { prisma } from '@/lib/prisma'

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="container py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Projects</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A collection of my projects and work. Each project is built with different technologies
          and approaches, showcasing various skills and innovations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            image={project.image || '/images/placeholder.jpg'}
            technologies={project.technologies || []}
            githubUrl={project.githubUrl || ''}
            liveUrl={project.demoUrl || ''}
          />
        ))}
      </div>
    </div>
  )
}
