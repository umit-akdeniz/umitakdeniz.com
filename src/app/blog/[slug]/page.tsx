import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'

// Bu fonksiyon, Next.js'e hangi sayfaları build zamanında oluşturacağını söyler
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({
    slug: post.slug,
  }))
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { frontmatter, content } = getPostBySlug(params.slug)
  
  const options = {
    mdxOptions: {
      rehypePlugins: [rehypeHighlight as any],
    },
  }

  return (
    <article className="container py-20 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">{frontmatter.title}</h1>
      <p className="text-muted-foreground mb-8">
        {new Date(frontmatter.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      
      <div className="prose dark:prose-invert max-w-none">
        <MDXRemote source={content} options={options} />
      </div>
    </article>
  )
}