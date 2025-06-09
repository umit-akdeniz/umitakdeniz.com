import axios from 'axios'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export const strapiClient = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add bearer token if available
if (process.env.STRAPI_API_TOKEN) {
  strapiClient.defaults.headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`
}

export interface StrapiResponse<T> {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiSingleResponse<T> {
  data: T
  meta: Record<string, unknown>
}

export interface StrapiProject {
  id: number
  attributes: {
    title: string
    slug: string
    description: string
    technologies: string[]
    githubUrl?: string
    demoUrl?: string
    featured: boolean
    publishedAt: string
    createdAt: string
    updatedAt: string
    image?: {
      data?: {
        attributes: {
          url: string
          alternativeText?: string
        }
      }
    }
  }
}

export interface StrapiArticle {
  id: number
  attributes: {
    title: string
    slug: string
    description: string
    content?: string
    category: string
    status: string
    authors: string[]
    journal?: string
    doi?: string
    arxiv?: string
    citations: number
    publishedAt?: string
    createdAt: string
    updatedAt: string
    image?: {
      data?: {
        attributes: {
          url: string
          alternativeText?: string
        }
      }
    }
  }
}

export interface StrapiAlbum {
  id: number
  attributes: {
    title: string
    slug: string
    description: string
    location?: string
    publishedAt: string
    createdAt: string
    updatedAt: string
    coverImage?: {
      data?: {
        attributes: {
          url: string
          alternativeText?: string
        }
      }
    }
    photos?: {
      data: Array<{
        attributes: {
          url: string
          alternativeText?: string
        }
      }>
    }
  }
}

export interface StrapiProduct {
  id: number
  attributes: {
    title: string
    slug: string
    description: string
    price: number
    currency: string
    category: string
    status: string
    publishedAt: string
    createdAt: string
    updatedAt: string
    image?: {
      data?: {
        attributes: {
          url: string
          alternativeText?: string
        }
      }
    }
  }
}

// API functions
export async function getProjects(): Promise<StrapiProject[]> {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiProject>>('/projects?populate=*')
    return response.data.data
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getProject(slug: string): Promise<StrapiProject | null> {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiProject>>(
      `/projects?filters[slug][$eq]=${slug}&populate=*`
    )
    return response.data.data[0] || null
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function getArticles(): Promise<StrapiArticle[]> {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiArticle>>('/articles?populate=*')
    return response.data.data
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export async function getArticle(slug: string): Promise<StrapiArticle | null> {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiArticle>>(
      `/articles?filters[slug][$eq]=${slug}&populate=*`
    )
    return response.data.data[0] || null
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

export async function getAlbums(): Promise<StrapiAlbum[]> {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiAlbum>>('/albums?populate=*')
    return response.data.data
  } catch (error) {
    console.error('Error fetching albums:', error)
    return []
  }
}

export async function getAlbum(slug: string): Promise<StrapiAlbum | null> {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiAlbum>>(
      `/albums?filters[slug][$eq]=${slug}&populate=*`
    )
    return response.data.data[0] || null
  } catch (error) {
    console.error('Error fetching album:', error)
    return null
  }
}

export async function getProducts(): Promise<StrapiProduct[]> {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiProduct>>('/products?populate=*')
    return response.data.data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProduct(slug: string): Promise<StrapiProduct | null> {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiProduct>>(
      `/products?filters[slug][$eq]=${slug}&populate=*`
    )
    return response.data.data[0] || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

// Helper function to get media URL
export function getStrapiMediaUrl(url?: string): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${STRAPI_URL}${url}`
}
