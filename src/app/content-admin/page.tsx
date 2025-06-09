'use client'

import { Button } from '@/components/ui/button'
import {
  BarChart3,
  Calendar,
  Database,
  Edit3,
  ExternalLink,
  Eye,
  FileText,
  Folder,
  Plus,
  Save,
  Settings,
  Trash2,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Project {
  id: string
  title: string
  slug: string
  description: string
  image?: string
  technologies: string[]
  githubUrl?: string
  demoUrl?: string
  featured: boolean
  published: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
  author?: {
    name: string
    email: string
  }
}

interface Article {
  id: string
  title: string
  slug: string
  description: string
  category: string
  journal?: string
  status: string
  type: string
  citations: number
  doi?: string
  arxiv?: string
  authors: string[]
  keywords: string[]
  publishedAt?: string
  createdAt: string
  updatedAt: string
  author?: {
    name: string
    email: string
  }
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [projects, setProjects] = useState<Project[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null)
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('admin-token')
    if (!token) {
      router.push('/admin-login')
      return
    }
    setIsAuthenticated(true)
  }, [])

  useEffect(() => {
    if (isAuthenticated && activeTab === 'projects') {
      fetchProjects()
    } else if (isAuthenticated && activeTab === 'articles') {
      fetchArticles()
    }
  }, [activeTab, isAuthenticated])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/content/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
    setLoading(false)
  }

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/content/articles')
      if (response.ok) {
        const data = await response.json()
        setArticles(data)
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
    }
    setLoading(false)
  }

  const saveProject = async (projectData: Partial<Project>) => {
    setError('')
    setSuccess('')

    // Validation
    if (!projectData.title?.trim()) {
      setError('Project title is required')
      return
    }
    if (!projectData.slug?.trim()) {
      setError('Project slug is required')
      return
    }
    if (!projectData.description?.trim()) {
      setError('Project description is required')
      return
    }

    try {
      const response = await fetch('/api/content/projects', {
        method: projectData.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...projectData,
          slug: projectData.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
          createdAt: projectData.id ? projectData.createdAt : new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        await fetchProjects()
        setEditingProject(null)
        setSuccess('Project saved successfully!')
      } else {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        setError(
          errorData.details || errorData.error || `Failed to save project (${response.status})`
        )
      }
    } catch (error) {
      setError('Network error occurred')
      console.error('Error saving project:', error)
    }
  }

  const saveArticle = async (articleData: Partial<Article>) => {
    setError('')
    setSuccess('')

    // Validation
    if (!articleData.title?.trim()) {
      setError('Article title is required')
      return
    }
    if (!articleData.slug?.trim()) {
      setError('Article slug is required')
      return
    }
    if (!articleData.description?.trim()) {
      setError('Article description is required')
      return
    }

    try {
      const response = await fetch('/api/content/articles', {
        method: articleData.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...articleData,
          slug: articleData.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
          authors: Array.isArray(articleData.authors) ? articleData.authors : [],
          keywords: Array.isArray(articleData.keywords) ? articleData.keywords : [],
          createdAt: articleData.id ? articleData.createdAt : new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        await fetchArticles()
        setEditingArticle(null)
        setSuccess('Article saved successfully!')
      } else {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        setError(
          errorData.details || errorData.error || `Failed to save article (${response.status})`
        )
      }
    } catch (error) {
      setError('Network error occurred')
      console.error('Error saving article:', error)
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Status Messages */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">{error}</div>
      )}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          {success}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
              <p className="text-2xl font-bold">{projects.length}</p>
            </div>
            <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center">
              <Folder className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Articles</p>
              <p className="text-2xl font-bold">{articles.length}</p>
            </div>
            <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Database</p>
              <p className="text-xl font-bold">PostgreSQL</p>
            </div>
            <div className="h-12 w-12 bg-purple-500/10 rounded-full flex items-center justify-center">
              <Database className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Update</p>
              <p className="text-sm font-bold">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="h-12 w-12 bg-orange-500/10 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            className="h-16 flex-col gap-2"
            variant="outline"
            onClick={() => {
              setActiveTab('projects')
              setEditingProject({
                title: '',
                slug: '',
                description: '',
                technologies: [],
                featured: false,
                published: true,
              })
            }}
          >
            <Plus className="h-6 w-6" />
            <span>Add New Project</span>
          </Button>
          <Button
            className="h-16 flex-col gap-2"
            variant="outline"
            onClick={() => {
              setActiveTab('articles')
              setEditingArticle({
                title: '',
                slug: '',
                description: '',
                category: 'research',
                status: 'draft',
                type: 'research',
                citations: 0,
                authors: [],
                keywords: [],
              })
            }}
          >
            <Edit3 className="h-6 w-6" />
            <span>Add New Article</span>
          </Button>
          <Link href="/" target="_blank">
            <Button className="h-16 flex-col gap-2 w-full" variant="outline">
              <ExternalLink className="h-6 w-6" />
              <span>View Website</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )

  const renderProjectForm = () => (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">
            {editingProject?.id ? 'Edit Project' : 'Add New Project'}
          </h3>
          <Button variant="ghost" size="sm" onClick={() => setEditingProject(null)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (editingProject) {
              saveProject(editingProject)
            }
          }}
          className="space-y-4"
        >
          {/* Form Error Messages */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              className="w-full p-2 border border-border rounded-lg bg-background"
              value={editingProject?.title || ''}
              onChange={(e) => setEditingProject((prev) => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <input
              type="text"
              className="w-full p-2 border border-border rounded-lg bg-background"
              value={editingProject?.slug || ''}
              onChange={(e) => {
                const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')
                setEditingProject((prev) => ({ ...prev, slug }))
              }}
              placeholder="auto-generated-from-title"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              URL-friendly version of the title (lowercase, no spaces)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full p-2 border border-border rounded-lg bg-background"
              rows={3}
              value={editingProject?.description || ''}
              onChange={(e) =>
                setEditingProject((prev) => ({ ...prev, description: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
            <input
              type="text"
              className="w-full p-2 border border-border rounded-lg bg-background"
              value={editingProject?.technologies?.join(', ') || ''}
              onChange={(e) =>
                setEditingProject((prev) => ({
                  ...prev,
                  technologies: e.target.value
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean),
                }))
              }
              placeholder="React, TypeScript, Node.js"
            />
            <p className="text-xs text-muted-foreground mt-1">Separate technologies with commas</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">GitHub URL</label>
            <input
              type="url"
              className="w-full p-2 border border-border rounded-lg bg-background"
              value={editingProject?.githubUrl || ''}
              onChange={(e) =>
                setEditingProject((prev) => ({ ...prev, githubUrl: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Demo URL</label>
            <input
              type="url"
              className="w-full p-2 border border-border rounded-lg bg-background"
              value={editingProject?.demoUrl || ''}
              onChange={(e) => setEditingProject((prev) => ({ ...prev, demoUrl: e.target.value }))}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editingProject?.featured || false}
                onChange={(e) =>
                  setEditingProject((prev) => ({ ...prev, featured: e.target.checked }))
                }
              />
              <span className="text-sm">Featured</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editingProject?.published !== false}
                onChange={(e) =>
                  setEditingProject((prev) => ({ ...prev, published: e.target.checked }))
                }
              />
              <span className="text-sm">Published</span>
            </label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Save Project
            </Button>
            <Button type="button" variant="outline" onClick={() => setEditingProject(null)}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Projects</h3>
        <Button
          onClick={() =>
            setEditingProject({
              title: '',
              slug: '',
              description: '',
              technologies: [],
              featured: false,
              published: true,
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Project
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-card/50 border border-border/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold">{project.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Featured: {project.featured ? 'Yes' : 'No'}</span>
                    <span>Published: {project.published ? 'Yes' : 'No'}</span>
                    <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingProject(project)}>
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingProject && renderProjectForm()}
    </div>
  )

  const renderArticles = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Articles</h3>
        <Button
          onClick={() =>
            setEditingArticle({
              title: '',
              slug: '',
              description: '',
              category: 'research',
              status: 'draft',
              type: 'research',
              citations: 0,
              authors: [],
              keywords: [],
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Article
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {articles.map((article) => (
            <div key={article.id} className="bg-card/50 border border-border/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold">{article.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{article.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Category: {article.category}</span>
                    <span>Status: {article.status}</span>
                    <span>Citations: {article.citations}</span>
                    <span>Authors: {article.authors.join(', ')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingArticle(article)}>
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingArticle && renderArticleForm()}
    </div>
  )

  const renderArticleForm = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-background border border-border rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {editingArticle?.id ? 'Edit Article' : 'Add New Article'}
          </h3>
          <Button size="sm" variant="ghost" onClick={() => setEditingArticle(null)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (editingArticle) saveArticle(editingArticle)
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              className="w-full p-2 border border-border rounded-lg bg-background"
              value={editingArticle?.title || ''}
              onChange={(e) => setEditingArticle((prev) => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Slug *</label>
            <input
              type="text"
              className="w-full p-2 border border-border rounded-lg bg-background"
              value={editingArticle?.slug || ''}
              onChange={(e) => setEditingArticle((prev) => ({ ...prev, slug: e.target.value }))}
              placeholder="url-friendly-slug"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              rows={3}
              className="w-full p-2 border border-border rounded-lg bg-background"
              value={editingArticle?.description || ''}
              onChange={(e) =>
                setEditingArticle((prev) => ({ ...prev, description: e.target.value }))
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                className="w-full p-2 border border-border rounded-lg bg-background"
                value={editingArticle?.category || 'research'}
                onChange={(e) =>
                  setEditingArticle((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                <option value="research">Research</option>
                <option value="technical">Technical</option>
                <option value="tutorial">Tutorial</option>
                <option value="review">Review</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                className="w-full p-2 border border-border rounded-lg bg-background"
                value={editingArticle?.status || 'draft'}
                onChange={(e) => setEditingArticle((prev) => ({ ...prev, status: e.target.value }))}
              >
                <option value="draft">Draft</option>
                <option value="In Preparation">In Preparation</option>
                <option value="Under Review">Under Review</option>
                <option value="Published">Published</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Journal</label>
              <input
                type="text"
                className="w-full p-2 border border-border rounded-lg bg-background"
                value={editingArticle?.journal || ''}
                onChange={(e) =>
                  setEditingArticle((prev) => ({ ...prev, journal: e.target.value }))
                }
                placeholder="Journal name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Citations</label>
              <input
                type="number"
                className="w-full p-2 border border-border rounded-lg bg-background"
                value={editingArticle?.citations || 0}
                onChange={(e) =>
                  setEditingArticle((prev) => ({
                    ...prev,
                    citations: Number.parseInt(e.target.value) || 0,
                  }))
                }
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">DOI</label>
              <input
                type="text"
                className="w-full p-2 border border-border rounded-lg bg-background"
                value={editingArticle?.doi || ''}
                onChange={(e) => setEditingArticle((prev) => ({ ...prev, doi: e.target.value }))}
                placeholder="10.1000/182"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">arXiv ID</label>
              <input
                type="text"
                className="w-full p-2 border border-border rounded-lg bg-background"
                value={editingArticle?.arxiv || ''}
                onChange={(e) => setEditingArticle((prev) => ({ ...prev, arxiv: e.target.value }))}
                placeholder="2301.00000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Authors (comma-separated)</label>
            <input
              type="text"
              className="w-full p-2 border border-border rounded-lg bg-background"
              value={editingArticle?.authors?.join(', ') || ''}
              onChange={(e) =>
                setEditingArticle((prev) => ({
                  ...prev,
                  authors: e.target.value
                    .split(',')
                    .map((a) => a.trim())
                    .filter(Boolean),
                }))
              }
              placeholder="John Doe, Jane Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Keywords (comma-separated)</label>
            <input
              type="text"
              className="w-full p-2 border border-border rounded-lg bg-background"
              value={editingArticle?.keywords?.join(', ') || ''}
              onChange={(e) =>
                setEditingArticle((prev) => ({
                  ...prev,
                  keywords: e.target.value
                    .split(',')
                    .map((k) => k.trim())
                    .filter(Boolean),
                }))
              }
              placeholder="machine learning, ai, research"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Save Article
            </Button>
            <Button type="button" variant="outline" onClick={() => setEditingArticle(null)}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">System Information</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <h4 className="font-medium">Database</h4>
              <p className="text-sm text-muted-foreground">PostgreSQL with Prisma ORM</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-600">Connected</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <h4 className="font-medium">Content Management</h4>
              <p className="text-sm text-muted-foreground">
                Database-driven with rich content support
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-600">Active</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <h4 className="font-medium">Email Service</h4>
              <p className="text-sm text-muted-foreground">SMTP integration for contact forms</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-yellow-600">Pending Setup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const handleLogout = () => {
    localStorage.removeItem('admin-token')
    router.push('/admin-login')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-6 flex items-center">
            <Settings className="mr-2 h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Content Admin</span>
          </div>
          <nav className="flex items-center space-x-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 text-sm font-medium transition-all duration-200 px-3 py-2 rounded-lg ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'text-foreground/60 hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Website
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <Settings className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight capitalize mb-2">
            {activeTab === 'overview' ? 'Dashboard Overview' : `${activeTab} Management`}
          </h1>
          <p className="text-muted-foreground">
            {activeTab === 'overview'
              ? 'Monitor your content and manage your website from here.'
              : `Manage your ${activeTab} content efficiently.`}
          </p>
        </div>

        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'projects' && renderProjects()}
        {activeTab === 'articles' && renderArticles()}
        {activeTab === 'settings' && renderSettings()}
      </main>
    </div>
  )
}
