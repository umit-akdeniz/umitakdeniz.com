import { type BlogPost, getBlogPosts, saveBlogPosts } from '@/lib/content-manager'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const posts = getBlogPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const posts = getBlogPosts()

    // Generate new ID
    const newId = (Math.max(...posts.map((p) => Number.parseInt(p.id)), 0) + 1).toString()

    // Create new post
    const newPost: BlogPost = {
      id: newId,
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: data.content,
      category: data.category,
      tags: data.tags || [],
      featured: data.featured || false,
      image: data.image,
      readTime: data.readTime,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Add to posts array and save
    const updatedPosts = [...posts, newPost]
    saveBlogPosts(updatedPosts)

    return NextResponse.json(newPost)
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const posts = getBlogPosts()

    // Find and update the post
    const postIndex = posts.findIndex((p) => p.id === data.id)
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    // Update the post
    posts[postIndex] = {
      ...posts[postIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    }

    saveBlogPosts(posts)

    return NextResponse.json(posts[postIndex])
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
    }

    const posts = getBlogPosts()
    const filteredPosts = posts.filter((p) => p.id !== id)

    if (posts.length === filteredPosts.length) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    saveBlogPosts(filteredPosts)

    return NextResponse.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 })
  }
}
