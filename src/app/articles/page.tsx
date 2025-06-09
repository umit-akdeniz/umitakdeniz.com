import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { Award, BookOpen, Calendar, ExternalLink, FileText, Users } from 'lucide-react'
import Link from 'next/link'

const articleCategories = [
  { id: 'all', label: 'All Articles' },
  { id: 'research', label: 'Research Papers' },
  { id: 'technical', label: 'Technical Blogs' },
  { id: 'tutorial', label: 'Tutorials' },
  { id: 'review', label: 'Reviews' },
]

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
  })

  // İlk yüklemede tüm makaleleri göster
  const filteredArticles = articles

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-500/10 text-green-600 border-green-500/20'
      case 'Under Review':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case 'In Progress':
        return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      case 'In Preparation':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20'
      case 'Completed':
        return 'bg-teal-500/10 text-teal-600 border-teal-500/20'
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
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Academic & Technical Writing
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
            Research Articles
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Academic papers, research findings, and technical writings on physics and technology
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto mt-8 rounded-full" />
        </div>
      </section>

      {/* Articles Title */}
      <section className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4">All Articles</h2>
        </div>
      </section>

      {/* Articles List */}
      <section className="container pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredArticles.map((article, index) => (
            <div
              key={article.id}
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:border-primary/30 hover:-translate-y-1">
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <div className="relative z-10 p-6">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                      📄
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span
                              className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(article.status)}`}
                            >
                              {article.status}
                            </span>
                            <span className="px-3 py-1 text-xs bg-secondary/50 text-secondary-foreground rounded-full">
                              {article.category}
                            </span>
                          </div>
                          <Link href={`/articles/${article.slug}`}>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300 cursor-pointer">
                              {article.title}
                            </h3>
                          </Link>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {article.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {article.publishedAt
                              ? new Date(article.publishedAt).toLocaleDateString()
                              : 'Not published'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{article.journal || 'No journal'}</span>
                        </div>
                        {article.citations > 0 && (
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            <span>{article.citations} citations</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>
                            {article.authors?.length || 0} author
                            {(article.authors?.length || 0) > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground mb-4">
                        <span className="font-medium">Authors:</span>{' '}
                        {article.authors?.join(', ') || 'No authors'}
                      </div>

                      <div className="flex gap-2">
                        {article.doi && (
                          <Button size="sm" variant="default" asChild>
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
                          <Button size="sm" variant="outline" asChild>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
