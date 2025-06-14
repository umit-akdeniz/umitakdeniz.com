'use client'

import { Button } from '@/components/ui/button'
import { Calendar, Clock, Tag } from 'lucide-react'
import Link from 'next/link'

const mockPosts = [
  {
    id: '1',
    title: 'The Future of Quantum Computing',
    excerpt:
      'Exploring the potential applications of quantum computing in modern science and technology.',
    content: '',
    slug: 'future-quantum-computing',
    published: true,
    featured: true,
    publishedAt: new Date('2024-12-01'),
    tags: ['quantum', 'computing', 'science'],
    readTime: 8,
  },
  {
    id: '2',
    title: 'Machine Learning in Particle Physics',
    excerpt:
      'How artificial intelligence is revolutionizing particle physics research and data analysis.',
    content: '',
    slug: 'ml-particle-physics',
    published: true,
    featured: false,
    publishedAt: new Date('2024-11-15'),
    tags: ['ml', 'physics', 'research'],
    readTime: 12,
  },
  {
    id: '3',
    title: 'Computational Astrophysics Methods',
    excerpt:
      'Modern computational techniques for modeling astronomical phenomena and cosmic structures.',
    content: '',
    slug: 'computational-astrophysics',
    published: true,
    featured: false,
    publishedAt: new Date('2024-10-30'),
    tags: ['astrophysics', 'simulation', 'cosmos'],
    readTime: 15,
  },
]

export default function BlogPage() {
  const featuredPosts = mockPosts.filter((post) => post.featured)
  const regularPosts = mockPosts.filter((post) => !post.featured)

  const getBadgeColor = (tag: string) => {
    const colors: Record<string, string> = {
      quantum: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      computing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      science: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      ml: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      physics: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      research: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      astrophysics: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      simulation: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
      cosmos: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
    }
    return colors[tag] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  return (
    <div className="container py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Thoughts and insights about physics, computer science, and technology.
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <span className="w-6 h-1 bg-primary rounded-full" />
              Featured Articles
            </h2>
            <div className="space-y-8">
              {featuredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-xl hover:border-primary/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(tag)}`}
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime} min read
                        </span>
                      </div>

                      <Button variant="ghost" asChild>
                        <Link href={`/blog/${post.slug}`}>Read More →</Link>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <span className="w-6 h-1 bg-accent rounded-full" />
              Latest Articles
            </h2>
            <div className="grid gap-6">
              {regularPosts.map((post) => (
                <article
                  key={post.id}
                  className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20"
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${getBadgeColor(tag)}`}
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min
                      </span>
                    </div>

                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/blog/${post.slug}`}>Read →</Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {mockPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
            <p className="text-muted-foreground">
              Check back soon for new articles about physics, computer science, and technology.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
