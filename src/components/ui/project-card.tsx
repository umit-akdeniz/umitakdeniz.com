'use client'

import { cn } from '@/lib/utils'
import { useLikeStore } from '@/stores/like-store'
import { ExternalLink, Github, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
}

export function ProjectCard({
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  const { likedProjects, toggleLike } = useLikeStore()
  const projectId = title.toLowerCase().replace(/\s+/g, '-')
  const isLiked = likedProjects.includes(projectId)

  return (
    <div className="relative group overflow-hidden text-left hover:-translate-y-2 transition-all duration-300 ease-out">
      <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:border-primary/30">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Floating Action Buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            {githubUrl && (
              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-background/90 backdrop-blur-sm hover:bg-background border border-border/50 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Github className="w-4 h-4" />
              </Link>
            )}
            {liveUrl && (
              <Link
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-primary/90 backdrop-blur-sm hover:bg-primary text-primary-foreground rounded-full transition-all duration-300 hover:scale-110"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        <div className="relative z-10 p-6">
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full bg-secondary/50 backdrop-blur-sm text-secondary-foreground border border-border/30 hover:border-primary/30 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Like Button */}
        <button
          onClick={() => toggleLike(projectId)}
          className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Beğen"
        >
          <Heart
            className={cn(
              'w-4 h-4 transition-all duration-300',
              isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-400 hover:text-red-400'
            )}
          />
        </button>
      </div>
    </div>
  )
}
