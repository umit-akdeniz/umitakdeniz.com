const axios = require('axios')
const fs = require('fs')
const path = require('path')

const STRAPI_URL = 'http://localhost:1337'
const API_BASE = `${STRAPI_URL}/api`

// Read JSON data
const projectsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../content/projects.json'), 'utf8')
)
const articlesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../content/articles.json'), 'utf8')
)

async function createProjects() {
  console.log('Migrating projects...')

  for (const project of projectsData) {
    try {
      const response = await axios.post(`${API_BASE}/projects`, {
        data: {
          title: project.title,
          slug: project.slug,
          description: project.description,
          technologies: project.technologies,
          githubUrl: project.githubUrl,
          demoUrl: project.demoUrl,
          featured: project.featured,
          publishedAt: project.publishedAt,
        },
      })
      console.log(`✓ Created project: ${project.title}`)
    } catch (error) {
      console.error(
        `✗ Failed to create project: ${project.title}`,
        error.response?.data || error.message
      )
    }
  }
}

async function createArticles() {
  console.log('Migrating articles...')

  for (const article of articlesData) {
    try {
      const response = await axios.post(`${API_BASE}/articles`, {
        data: {
          title: article.title,
          slug: article.slug,
          description: article.description,
          category: article.category,
          status: article.status,
          authors: article.authors,
          journal: article.journal,
          doi: article.doi || null,
          arxiv: article.arxiv || null,
          citations: article.citations,
          publishedAt: article.publishedAt,
        },
      })
      console.log(`✓ Created article: ${article.title}`)
    } catch (error) {
      console.error(
        `✗ Failed to create article: ${article.title}`,
        error.response?.data || error.message
      )
    }
  }
}

async function main() {
  try {
    // Check if Strapi is running
    await axios.get(STRAPI_URL)
    console.log('Strapi is running!')

    await createProjects()
    await createArticles()

    console.log('Migration completed!')
  } catch (error) {
    console.error('Error:', error.message)
    console.log('Make sure Strapi is running on http://localhost:1337')
  }
}

main()
