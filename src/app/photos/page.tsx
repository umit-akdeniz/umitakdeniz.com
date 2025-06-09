'use client'

import { Button } from '@/components/ui/button'
import { Calendar, Camera, Download, ExternalLink, Heart, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const photoCategories = [
  { id: 'all', label: 'All Photos' },
  { id: 'lab', label: 'Laboratory' },
  { id: 'conferences', label: 'Conferences' },
  { id: 'nature', label: 'Nature & Physics' },
  { id: 'tech', label: 'Tech & Setup' },
]

const photos = [
  {
    id: 1,
    slug: 'quantum-physics-lab-setup',
    title: 'Quantum Physics Lab Setup',
    description: 'Our quantum computing research laboratory with state-of-the-art equipment',
    category: 'lab',
    location: 'University Physics Department',
    date: '2024-02-15',
    image: '🔬',
    likes: 42,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 2,
    slug: 'cern-conference-2024',
    title: 'CERN Conference 2024',
    description: 'Presenting research findings at the European Physics Conference',
    category: 'conferences',
    location: 'CERN, Geneva',
    date: '2024-03-20',
    image: '🎤',
    likes: 89,
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 3,
    slug: 'particle-accelerator-visualization',
    title: 'Particle Accelerator Visualization',
    description: 'Beautiful visualization of particle trajectories in our simulation',
    category: 'lab',
    location: 'Research Center',
    date: '2024-01-10',
    image: '⚛️',
    likes: 127,
    color: 'from-green-500 to-teal-600',
  },
  {
    id: 4,
    slug: 'northern-lights-and-physics',
    title: 'Northern Lights & Physics',
    description: "Aurora Borealis - Nature's own particle physics demonstration",
    category: 'nature',
    location: 'Iceland',
    date: '2023-12-05',
    image: '🌌',
    likes: 234,
    color: 'from-indigo-500 to-purple-700',
  },
  {
    id: 5,
    slug: 'my-development-setup',
    title: 'My Development Setup',
    description: 'Coding environment for physics simulations and web development',
    category: 'tech',
    location: 'Home Office',
    date: '2024-01-25',
    image: '💻',
    likes: 76,
    color: 'from-gray-600 to-gray-800',
  },
  {
    id: 6,
    slug: 'laser-interferometry-experiment',
    title: 'Laser Interferometry Experiment',
    description: 'LIGO-style gravitational wave detection experiment setup',
    category: 'lab',
    location: 'Advanced Physics Lab',
    date: '2024-02-28',
    image: '🔬',
    likes: 95,
    color: 'from-red-500 to-orange-600',
  },
  {
    id: 7,
    slug: 'mathematics-and-coffee',
    title: 'Mathematics & Coffee',
    description: 'Late night equation solving with quantum field theory notes',
    category: 'tech',
    location: 'Study Room',
    date: '2024-03-01',
    image: '📚',
    likes: 58,
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 8,
    slug: 'scientific-conference-panel',
    title: 'Scientific Conference Panel',
    description: 'Panel discussion on the future of quantum computing',
    category: 'conferences',
    location: 'MIT Conference Center',
    date: '2024-03-15',
    image: '🎯',
    likes: 103,
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: 9,
    slug: 'galaxy-simulation-render',
    title: 'Galaxy Simulation Render',
    description: 'N-body simulation of galaxy formation using CUDA acceleration',
    category: 'tech',
    location: 'Computational Lab',
    date: '2024-02-20',
    image: '🌌',
    likes: 156,
    color: 'from-purple-600 to-pink-700',
  },
]

export default function PhotosPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredPhotos =
    selectedCategory === 'all'
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl" />

        <div className="container relative z-10 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-500/10 backdrop-blur-sm border border-primary/20 rounded-full">
              <Camera className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Visual Journey
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
            Photo Gallery
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Capturing moments from research, conferences, and the intersection of science and nature
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto mt-8 rounded-full" />
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="container">
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 p-1 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl">
            {photoCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photos Grid */}
      <section className="container pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:border-primary/30 hover:-translate-y-2">
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${photo.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Photo */}
                <Link
                  href={`/photos/${photo.slug}`}
                  className={`relative h-64 bg-gradient-to-br ${photo.color} overflow-hidden flex items-center justify-center block cursor-pointer`}
                >
                  <div className="text-8xl">{photo.image}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Photo Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 text-xs mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{photo.location}</span>
                      <Calendar className="w-3 h-3 ml-2" />
                      <span>{new Date(photo.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons Overlay */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                        <Heart className="w-4 h-4 text-red-500" />
                      </button>
                      <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                        <Download className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                </Link>

                <div className="relative z-10 p-6">
                  {/* Photo Info */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {photo.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {photo.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>{photo.likes}</span>
                    </div>
                    <Button size="sm" variant="ghost" className="text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Full
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
