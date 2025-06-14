import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://umitakdeniz.com'

  // Static pages - academic focus
  const staticPages = ['', '/about', '/projects', '/blog', '/contact']

  const staticRoutes: MetadataRoute.Sitemap = []

  // Generate routes for English only
  staticPages.forEach((page) => {
    staticRoutes.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'daily' : 'weekly',
      priority: page === '' ? 1 : 0.8,
    })
  })

  return staticRoutes
}
