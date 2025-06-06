"use client"

import Image from "next/image" // Next.js'in Image bileşenini import ediyoruz
import { Heart } from "lucide-react"
import { useLikeStore } from "@/stores/like-store"
import { cn } from "@/lib/utils"

export type Project = {
  id: number
  title: string
  description: string
  tags: string[]
  image: string // 'image' tipini ekliyoruz
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { likedProjects, toggleLike } = useLikeStore()
  const isLiked = likedProjects.includes(project.id)

  return (
    <div className="relative border rounded-lg bg-card group overflow-hidden text-left shadow-lg transition-all hover:shadow-xl">
      {/* Image Bileşeni */}
      <div className="relative w-full h-48">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 h-10">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <button
        onClick={() => toggleLike(project.id)}
        className="absolute top-4 right-4 p-1.5 rounded-full bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Beğen"
      >
        <Heart className={cn(
          "w-5 h-5 text-gray-400 transition-all",
          isLiked && "fill-red-500 text-red-500"
        )} />
      </button>
    </div>
  )
}