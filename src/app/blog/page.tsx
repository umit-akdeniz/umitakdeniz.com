import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <div className="container py-20 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Teknoloji, geliştirme ve deneyimlerim üzerine yazılar.
        </p>
      </div>
      <div className="space-y-8">
        {allPosts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="block p-6 border rounded-lg hover:bg-accent transition-colors"
          >
            <h2 className="text-2xl font-bold">{post.frontmatter.title}</h2>
            <p className="text-muted-foreground mt-2">{new Date(post.frontmatter.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="mt-4 text-foreground/80">{post.frontmatter.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}