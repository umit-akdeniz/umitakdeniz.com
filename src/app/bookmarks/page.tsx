'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ExternalLink,
  FileText,
  Filter,
  Globe,
  Heart,
  Image as ImageIcon,
  Plus,
  Search,
  Tag,
  Video,
  X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Bookmark {
  id: string
  title: string
  url: string
  description: string
  image?: string
  tags: string[]
  type: 'article' | 'video' | 'image' | 'link'
  dateAdded: string
  isLiked: boolean
}

const mockBookmarks: Bookmark[] = [
  {
    id: '1',
    title: 'Quantum Computing Breakthrough: IBM',
    url: 'https://example.com/quantum-computing',
    description: 'Latest advances in quantum computing technology from IBM Research',
    image: '/images/quantum.jpg',
    tags: ['Quantum', 'Technology', 'Physics', 'Research'],
    type: 'article',
    dateAdded: '2024-01-15',
    isLiked: true,
  },
  {
    id: '2',
    title: 'Introduction to Three.js',
    url: 'https://threejs.org/docs/',
    description: 'Comprehensive guide to creating 3D graphics on the web',
    tags: ['JavaScript', '3D', 'WebGL', 'Tutorial'],
    type: 'article',
    dateAdded: '2024-01-10',
    isLiked: false,
  },
  {
    id: '3',
    title: 'Physics Simulation Demo',
    url: 'https://example.com/physics-demo',
    description: 'Interactive physics simulation built with Canvas API',
    image: '/images/physics-sim.jpg',
    tags: ['Physics', 'Simulation', 'Canvas', 'Demo'],
    type: 'video',
    dateAdded: '2024-01-08',
    isLiked: true,
  },
  {
    id: '4',
    title: 'Mathematical Beauty',
    url: 'https://example.com/math-art',
    description: 'Beautiful mathematical visualizations and patterns',
    image: '/images/math-art.jpg',
    tags: ['Mathematics', 'Art', 'Visualization'],
    type: 'image',
    dateAdded: '2024-01-05',
    isLiked: false,
  },
  {
    id: '5',
    title: 'React Performance Optimization',
    url: 'https://react.dev/learn',
    description: 'Best practices for optimizing React applications',
    tags: ['React', 'Performance', 'JavaScript', 'Web Development'],
    type: 'article',
    dateAdded: '2024-01-01',
    isLiked: true,
  },
]

const typeIcons = {
  article: FileText,
  video: Video,
  image: ImageIcon,
  link: Globe,
}

const typeColors = {
  article: 'from-blue-500 to-cyan-500',
  video: 'from-red-500 to-pink-500',
  image: 'from-green-500 to-emerald-500',
  link: 'from-purple-500 to-violet-500',
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(mockBookmarks)
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>(mockBookmarks)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string>('all')
  const [showAddForm, setShowAddForm] = useState(false)

  // Get all unique tags
  const allTags = Array.from(new Set(bookmarks.flatMap((b) => b.tags)))

  // Filter bookmarks based on search, tags, and type
  useEffect(() => {
    let filtered = bookmarks

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((b) => selectedTags.some((tag) => b.tags.includes(tag)))
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter((b) => b.type === selectedType)
    }

    setFilteredBookmarks(filtered)
  }, [searchTerm, selectedTags, selectedType, bookmarks])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const toggleLike = (id: string) => {
    setBookmarks((prev) => prev.map((b) => (b.id === id ? { ...b, isLiked: !b.isLiked } : b)))
  }

  return (
    <div className="container py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          >
            My Bookmark Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A curated collection of interesting articles, videos, and resources
          </motion.p>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border p-6 mb-8 backdrop-blur-sm bg-background/50"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Type Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Content Type</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('all')}
                className="rounded-full"
              >
                All
              </Button>
              {Object.entries(typeIcons).map(([type, Icon]) => (
                <Button
                  key={type}
                  variant={selectedType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className="rounded-full"
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {type === 'article'
                    ? 'Article'
                    : type === 'video'
                      ? 'Video'
                      : type === 'image'
                        ? 'Image'
                        : 'Link'}
                </Button>
              ))}
            </div>
          </div>

          {/* Tag Filter */}
          <div>
            <h3 className="text-sm font-medium mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs transition-all hover:scale-105 ${
                    selectedTags.includes(tag)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  <Tag className="w-3 h-3 mr-1 inline" />
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {(selectedTags.length > 0 || selectedType !== 'all' || searchTerm) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedTags([])
                  setSelectedType('all')
                  setSearchTerm('')
                }}
                className="rounded-full"
              >
                <X className="w-3 h-3 mr-1" />
                Clear Filters
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Bookmarks Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredBookmarks.map((bookmark, index) => {
              const Icon = typeIcons[bookmark.type]
              return (
                <motion.div
                  key={bookmark.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-card rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${typeColors[bookmark.type]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  {/* Image */}
                  {bookmark.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={bookmark.image}
                        alt={bookmark.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Type Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs bg-gradient-to-r ${typeColors[bookmark.type]} text-white`}
                      >
                        <Icon className="w-3 h-3 mr-1" />
                        {bookmark.type === 'article'
                          ? 'Article'
                          : bookmark.type === 'video'
                            ? 'Video'
                            : bookmark.type === 'image'
                              ? 'Image'
                              : 'Link'}
                      </div>
                      <button
                        onClick={() => toggleLike(bookmark.id)}
                        className="p-1 rounded-full hover:bg-background/50 transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 transition-all ${
                            bookmark.isLiked
                              ? 'fill-red-500 text-red-500'
                              : 'text-muted-foreground hover:text-red-400'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {bookmark.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {bookmark.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {bookmark.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {bookmark.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{bookmark.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {new Date(bookmark.dateAdded).toLocaleDateString('tr-TR')}
                      </span>
                      <Link
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-primary hover:underline"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Visit
                      </Link>
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 pointer-events-none transition-colors duration-300" />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredBookmarks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No bookmarks found</h3>
            <p className="text-muted-foreground">
              Try different filters or modify your search term
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
