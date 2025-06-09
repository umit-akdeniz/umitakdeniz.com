import { groq } from 'next-sanity'

// Projects
export const projectsQuery = groq`*[_type == "project"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  image,
  technologies,
  githubUrl,
  demoUrl,
  featured,
  publishedAt
}`

export const projectQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  image,
  technologies,
  githubUrl,
  demoUrl,
  featured,
  publishedAt
}`

// Articles
export const articlesQuery = groq`*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  category,
  journal,
  status,
  authors,
  doi,
  arxiv,
  citations,
  publishedAt
}`

export const articleQuery = groq`*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  category,
  journal,
  status,
  authors,
  doi,
  arxiv,
  citations,
  publishedAt
}`

// Albums
export const albumsQuery = groq`*[_type == "album"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  genre,
  duration,
  tracks,
  image,
  spotifyUrl,
  youtubeUrl,
  color,
  publishedAt
}`

export const albumQuery = groq`*[_type == "album" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  genre,
  duration,
  tracks,
  image,
  spotifyUrl,
  youtubeUrl,
  color,
  publishedAt
}`

// Products
export const productsQuery = groq`*[_type == "product"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  fullDescription,
  category,
  type,
  status,
  price,
  year,
  image,
  color,
  publishedAt
}`

export const productQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  fullDescription,
  category,
  type,
  status,
  price,
  year,
  image,
  color,
  publishedAt
}`

// Blog Posts
export const blogPostsQuery = groq`*[_type == "blogPost" && published == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  image,
  tags,
  publishedAt
}`

export const blogPostQuery = groq`*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  content,
  image,
  tags,
  publishedAt
}`
