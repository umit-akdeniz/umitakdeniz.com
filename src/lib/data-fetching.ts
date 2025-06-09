// Client-side data fetching functions

export async function fetchBlogPosts() {
  try {
    const response = await fetch('/api/blog')
    if (!response.ok) throw new Error('Failed to fetch blog posts')
    return await response.json()
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function fetchBlogPost(slug: string) {
  try {
    const response = await fetch(`/api/blog/${slug}`)
    if (!response.ok) throw new Error('Failed to fetch blog post')
    return await response.json()
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function fetchProducts() {
  try {
    const response = await fetch('/api/products')
    if (!response.ok) throw new Error('Failed to fetch products')
    return await response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function fetchProduct(slug: string) {
  try {
    const response = await fetch(`/api/products/${slug}`)
    if (!response.ok) throw new Error('Failed to fetch product')
    return await response.json()
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function fetchAlbums() {
  try {
    const response = await fetch('/api/albums')
    if (!response.ok) throw new Error('Failed to fetch albums')
    return await response.json()
  } catch (error) {
    console.error('Error fetching albums:', error)
    return []
  }
}

export async function fetchAlbum(slug: string) {
  try {
    const response = await fetch(`/api/albums/${slug}`)
    if (!response.ok) throw new Error('Failed to fetch album')
    return await response.json()
  } catch (error) {
    console.error('Error fetching album:', error)
    return null
  }
}

export async function fetchPhotos() {
  try {
    const response = await fetch('/api/photos')
    if (!response.ok) throw new Error('Failed to fetch photos')
    return await response.json()
  } catch (error) {
    console.error('Error fetching photos:', error)
    return []
  }
}

export async function fetchPhoto(slug: string) {
  try {
    const response = await fetch(`/api/photos/${slug}`)
    if (!response.ok) throw new Error('Failed to fetch photo')
    return await response.json()
  } catch (error) {
    console.error('Error fetching photo:', error)
    return null
  }
}

export async function fetchArticles() {
  try {
    const response = await fetch('/api/articles')
    if (!response.ok) throw new Error('Failed to fetch articles')
    return await response.json()
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export async function fetchArticle(slug: string) {
  try {
    const response = await fetch(`/api/articles/${slug}`)
    if (!response.ok) throw new Error('Failed to fetch article')
    return await response.json()
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}
