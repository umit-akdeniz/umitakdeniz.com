import { Button } from '@/components/ui/button'
import { getBlogPost, getBlogPosts } from '@/lib/content-manager'
import { ArrowLeft, Calendar, Clock, Share2, Tag, User } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'tech':
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
      {/* Header with back button */}
      <section className="relative py-12 border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5" />
        <div className="container relative z-10">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
        {post.image && (
          <div className="absolute inset-0 opacity-10">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Category and Featured Badge */}
            <div className="flex justify-center gap-3 mb-6">
              <span
                className={`px-3 py-1 text-sm rounded-full border ${getBadgeColor(post.category)}`}
              >
                {post.category}
              </span>
              {post.featured && (
                <span className="px-3 py-1 text-sm bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 rounded-full">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              {post.description}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              {post.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              )}
              {post.updatedAt && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Updated {new Date(post.updatedAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-secondary/50 backdrop-blur-sm text-secondary-foreground border border-border/30"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12">
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-pre:bg-card prose-pre:border prose-pre:border-border">
              <div className="whitespace-pre-wrap leading-relaxed">{post.content}</div>
            </div>
          </div>

          {/* Article footer */}
          <footer className="mt-12 pt-8 border-t border-border/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button variant="outline" asChild>
                <Link href="/blog" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share Article
              </Button>
            </div>
          </footer>
        </div>
      </section>
    </div>
  )
}
