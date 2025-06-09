import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://umitakdeniz.com'

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/projects',
    '/blog',
    '/contact',
    '/albums',
    '/photos',
    '/products',
    '/articles',
    '/bookmarks',
    '/books',
  ]

  // Languages
  const languages = ['', '/tr', '/de', '/fr', '/es']

  const staticRoutes: MetadataRoute.Sitemap = []

  // Generate routes for each language
  languages.forEach((lang) => {
    staticPages.forEach((page) => {
      staticRoutes.push({
        url: `${baseUrl}${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.8,
      })
    })
  })

  return staticRoutes
}
