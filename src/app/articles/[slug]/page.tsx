import { Button } from '@/components/ui/button'
import { getArticle } from '@/lib/content-manager'
import { ArrowLeft, Award, BookOpen, Calendar, ExternalLink, FileText, Users } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'published':
      return 'bg-green-500/10 text-green-600 border-green-500/20'
    case 'under-review':
      return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
    case 'in-progress':
      return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
    case 'draft':
      return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
    default:
      return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
  }
}

export default function ArticleDetailPage({ params }: Props) {
  const article = getArticle(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10" />

        <div className="container relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/articles">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Articles
              </Button>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            {/* Article Icon */}
            <div className="inline-flex w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl items-center justify-center text-3xl mb-6">
              ⚛️
            </div>

            {/* Status & Type */}
            <div className="flex justify-center gap-3 mb-6">
              <span
                className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(article.status)}`}
              >
                {article.status}
              </span>
              <span className="px-3 py-1 text-sm rounded-full bg-secondary/50 text-secondary-foreground">
                Research Paper
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
              {article.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              {article.description}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString()
                    : 'Not published'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{article.journal || 'No journal'}</span>
              </div>
              {article.citations > 0 && (
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>{article.citations} citations</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>
                  {article.authors.length} author{article.authors.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {article.doi && (
                <Button size="lg" asChild>
                  <a
                    href={`https://doi.org/${article.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    DOI
                  </a>
                </Button>
              )}
              {article.arxiv && (
                <Button size="lg" variant="outline" asChild>
                  <a
                    href={`https://arxiv.org/abs/${article.arxiv}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    arXiv
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Details */}
      <section className="container py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Authors */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-primary" />
              Authors
            </h2>
            <div className="space-y-2">
              {article.authors.map((author: string, index: number) => (
                <div key={index} className="text-sm">
                  <div className="font-medium">{author}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Research Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Publication Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Journal:</span>
                  <span>{article.journal || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span>{article.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="capitalize">{article.category}</span>
                </div>
                {article.citations > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Citations:</span>
                    <span>{article.citations}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Access Links</h3>
              <div className="space-y-3">
                {article.doi && (
                  <Button className="w-full" asChild>
                    <a
                      href={`https://doi.org/${article.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Publisher Website
                    </a>
                  </Button>
                )}
                {article.arxiv && (
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={`https://arxiv.org/abs/${article.arxiv}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View on arXiv
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
