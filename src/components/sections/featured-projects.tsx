import { Project, ProjectCard } from "@/components/ui/project-card"

// mockProjects verisine 'image' alanı ekliyoruz
const mockProjects: Project[] = [
  {
    id: 1,
    title: "E-Ticaret Platformu",
    description: "Next.js ve Stripe entegrasyonu ile modern bir e-ticaret sitesi.",
    tags: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    image: "/images/project-1.jpg", // Örnek resim yolu
  },
  {
    id: 2,
    title: "Blog Sitesi",
    description: "Markdown destekli, statik site oluşturma (SSG) ile yüksek performanslı blog.",
    tags: ["React", "Gatsby", "GraphQL", "Contentful"],
    image: "/images/project-2.jpg",
  },
  {
    id: 3,
    title: "3D Portfolyo",
    description: "React Three Fiber kullanarak oluşturulmuş interaktif 3D portfolyo sitesi.",
    tags: ["Three.js", "R3F", "Framer Motion"],
    image: "/images/project-3.jpg",
  },
]

export function FeaturedProjects() {
  return (
    <section className="container py-20 text-center md:py-24">
      <h2 className="text-3xl font-bold tracking-tight mb-12">
        Öne Çıkan Projeler
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}