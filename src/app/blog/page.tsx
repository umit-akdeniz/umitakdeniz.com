import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { Calendar, Clock, Tag } from 'lucide-react'
import Link from 'next/link'

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: {
      published: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
  })

  // Featured posts (posts with featured: true)
  const featuredPosts = posts.filter((post) => (post as any).featured || false)
  const regularPosts = posts.filter((post) => !(post as any).featured)

  const getBadgeColor = (tag: string) => {
    if (!tag) return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
    switch (tag.toLowerCase()) {
      case 'tech':
      case 'technology':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case 'personal':
        return 'bg-green-500/10 text-green-600 border-green-500/20'
      case 'tutorial':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20'
      case 'review':
        return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
    }
  }

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
              <Tag className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Personal Blog
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
            My Blog
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Thoughts, experiences, and insights from my journey in technology and physics
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto mt-8 rounded-full" />
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="container py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Posts</h2>
            <p className="text-muted-foreground">Highlighted content worth reading</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {featuredPosts.slice(0, 2).map((post, index) => (
              <div
                key={post.id}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:border-primary/30 hover:-translate-y-1">
                  {post.image && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      {(post.tags || []).slice(0, 3).map((tag, idx) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 text-xs rounded-full border ${idx === 0 ? getBadgeColor(tag) : 'bg-secondary/50 text-secondary-foreground border-secondary/20'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 cursor-pointer">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {post.excerpt || 'No description available'}
                    </p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString()
                              : new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>5 min read</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/blog/${post.slug}`}>Read More →</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="container pb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4">All Posts</h2>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <Tag className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Posts Yet</h3>
            <p className="text-muted-foreground">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {[...featuredPosts, ...regularPosts].map((post, index) => (
              <div
                key={post.id}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:border-primary/30 hover:-translate-y-1">
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  <div className="relative z-10 p-6">
                    <div className="flex gap-6">
                      {post.image && (
                        <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span
                                className={`px-3 py-1 text-xs rounded-full border bg-blue-500/10 text-blue-600 border-blue-500/20`}
                              >
                                {post.tags[0] || 'General'}
                              </span>
                              {post.featured && (
                                <span className="px-2 py-1 text-xs bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 rounded-full">
                                  Featured
                                </span>
                              )}
                            </div>
                            <Link href={`/blog/${post.slug}`}>
                              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300 cursor-pointer">
                                {post.title}
                              </h3>
                            </Link>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {post.excerpt || 'No description available'}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {post.publishedAt
                                ? new Date(post.publishedAt).toLocaleDateString()
                                : new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>5 min read</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {(post.tags || []).slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-secondary/50 text-secondary-foreground rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Button size="sm" variant="ghost" asChild>
                            <Link href={`/blog/${post.slug}`}>Read More →</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
