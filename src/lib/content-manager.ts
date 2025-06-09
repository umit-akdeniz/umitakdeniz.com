// Simple file-based content management system
// Bu basit bir CMS alternatifidir - JSON dosyaları ile içerik yönetimi

import fs from 'fs'
import path from 'path'

const contentDir = path.join(process.cwd(), 'content')

// Content types
export interface Project {
  id: string
  title: string
  slug: string
  description: string
  image?: string
  technologies: string[]
  githubUrl?: string
  demoUrl?: string
  featured: boolean
  publishedAt: string
}

export interface Article {
  id: string
  title: string
  slug: string
  description: string
  category: string
  journal?: string
  status: string
  authors: string[]
  doi?: string
  arxiv?: string
  citations: number
  publishedAt?: string
}

export interface Album {
  id: string
  title: string
  slug: string
  description: string
  genre: string
  duration: string
  tracks: number
  image?: string
  spotifyUrl?: string
  youtubeUrl?: string
  color?: string
  publishedAt: string
}

export interface Product {
  id: string
  title: string
  slug: string
  description: string
  fullDescription?: string
  category: string
  type: string
  status: string
  price?: string
  year?: string
  image?: string
  color?: string
  publishedAt: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  description: string
  content: string
  category: string
  tags: string[]
  featured: boolean
  image?: string
  readTime?: string
  publishedAt: string
  updatedAt?: string
}

// Generic functions
function ensureContentDir() {
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true })
  }
}

function readJsonFile<T>(filename: string): T[] {
  ensureContentDir()
  const filePath = path.join(contentDir, filename)

  if (!fs.existsSync(filePath)) {
    return []
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(content)
  } catch (error) {
    console.error(`Error reading ${filename}:`, error)
    return []
  }
}

function writeJsonFile<T>(filename: string, data: T[]) {
  ensureContentDir()
  const filePath = path.join(contentDir, filename)

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error(`Error writing ${filename}:`, error)
    throw error
  }
}

// Project functions
export function getProjects(): Project[] {
  return readJsonFile<Project>('projects.json')
}

export function getProject(slug: string): Project | null {
  const projects = getProjects()
  return projects.find((p) => p.slug === slug) || null
}

export function saveProjects(projects: Project[]) {
  writeJsonFile('projects.json', projects)
}

// Article functions
export function getArticles(): Article[] {
  return readJsonFile<Article>('articles.json')
}

export function getArticle(slug: string): Article | null {
  const articles = getArticles()
  return articles.find((a) => a.slug === slug) || null
}

export function saveArticles(articles: Article[]) {
  writeJsonFile('articles.json', articles)
}

// Album functions
export function getAlbums(): Album[] {
  return readJsonFile<Album>('albums.json')
}

export function getAlbum(slug: string): Album | null {
  const albums = getAlbums()
  return albums.find((a) => a.slug === slug) || null
}

export function saveAlbums(albums: Album[]) {
  writeJsonFile('albums.json', albums)
}

// Product functions
export function getProducts(): Product[] {
  return readJsonFile<Product>('products.json')
}

export function getProduct(slug: string): Product | null {
  const products = getProducts()
  return products.find((p) => p.slug === slug) || null
}

export function saveProducts(products: Product[]) {
  writeJsonFile('products.json', products)
}

// Blog functions
export function getBlogPosts(): BlogPost[] {
  return readJsonFile<BlogPost>('blog.json')
}

export function getBlogPost(slug: string): BlogPost | null {
  const posts = getBlogPosts()
  return posts.find((p) => p.slug === slug) || null
}

export function saveBlogPosts(posts: BlogPost[]) {
  writeJsonFile('blog.json', posts)
}
