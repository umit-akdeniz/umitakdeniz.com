'use client'

import { ArrowLeft, BookOpen, Calendar, Clock, ExternalLink, Star, Tag, User } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const books = [
  {
    id: 1,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    rating: 5,
    readDate: '2024-01-15',
    genre: 'Programming',
    cover: '/images/clean-code.jpg',
    summary: 'Kod yazmanın sanatı ve temiz kod prensipleri üzerine kapsamlı bir rehber.',
    tags: ['Programming', 'Best Practices', 'Software Development'],
    pages: 464,
    readTime: '2 weeks',
    status: 'completed',
    review:
      "Bu kitap her yazılımcının okuması gereken temel kaynaklardan biri. Uncle Bob'un deneyimlerini aktardığı bu kitapta, kodun okunabilirliği, sürdürülebilirliği ve kalitesi üzerine önemli prensipleri öğreniyoruz. Özellikle fonksiyon ve sınıf tasarımı, isimlendirme kuralları ve yorum yazma konularında verdiği örnekler çok değerli.",
    highlights: [
      'Anlamlı isimlendirme kuralları',
      'Küçük ve odaklanmış fonksiyonlar yazma',
      'Kod duplikasyonunu önleme',
      'Test yazmanın önemi',
    ],
    amazonLink: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350884',
  },
  {
    id: 2,
    title: 'The Pragmatic Programmer',
    author: 'David Thomas, Andrew Hunt',
    rating: 5,
    readDate: '2024-02-20',
    genre: 'Programming',
    cover: '/images/pragmatic-programmer.jpg',
    summary: 'Yazılım geliştirici olarak daha pragmatik ve etkili olmak için pratik öneriler.',
    tags: ['Programming', 'Career', 'Methodology'],
    pages: 352,
    readTime: '2 weeks',
    status: 'completed',
    review:
      'Yazılım geliştirme felsefesi üzerine mükemmel bir kaynak. Sadece kod yazma tekniklerini değil, aynı zamanda problem çözme yaklaşımlarını ve kariyer gelişimi konularını da ele alıyor. DRY prensibi, ortogonal tasarım gibi kavramları çok güzel açıklıyor.',
    highlights: [
      "DRY (Don't Repeat Yourself) prensibi",
      'Ortogonal sistem tasarımı',
      'Prototipleme stratejileri',
      "Sürekli öğrenme mindset'i",
    ],
    amazonLink:
      'https://www.amazon.com/Pragmatic-Programmer-journey-mastery-Anniversary/dp/0135957052',
  },
]

interface Props {
  params: { id: string; locale: string }
}

export default function BookDetailPage({ params }: Props) {
  const book = books.find((b) => b.id === Number.parseInt(params.id))

  if (!book) {
    notFound()
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-600 border-green-500/20'
      case 'reading':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case 'wishlist':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20'
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl" />

        <div className="container relative z-10">
          {/* Back button */}
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Books</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Book Cover */}
            <div className="lg:col-span-1">
              <div className="relative bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl h-96 lg:h-[500px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(book.status)}`}
                  >
                    {book.status === 'completed'
                      ? 'Completed'
                      : book.status === 'reading'
                        ? 'Reading'
                        : book.status === 'wishlist'
                          ? 'Wishlist'
                          : book.status}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-1 mb-3">{renderStars(book.rating)}</div>
                  <div className="text-white/90 text-sm">
                    {book.pages} pages • {book.readTime}
                  </div>
                </div>
              </div>
            </div>

            {/* Book Info */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
                {book.title}
              </h1>

              <div className="flex items-center gap-2 text-lg text-muted-foreground mb-6">
                <User className="w-5 h-5" />
                <span>{book.author}</span>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">{book.summary}</p>

              {/* Meta Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Read Date</div>
                    <div className="font-medium">
                      {new Date(book.readDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Genre</div>
                    <div className="font-medium">{book.genre}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Reading Time</div>
                    <div className="font-medium">{book.readTime}</div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {book.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-secondary/50 backdrop-blur-sm text-secondary-foreground border border-border/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Buy Link */}
              <a
                href={book.amazonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                View on Amazon
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Review & Highlights */}
      <section className="container pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Review */}
            <div>
              <h2 className="text-2xl font-bold mb-6">My Review</h2>
              <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 opacity-50" />
                <div className="relative z-10">
                  <p className="text-muted-foreground leading-relaxed">{book.review}</p>
                </div>
              </div>
            </div>

            {/* Key Highlights */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Key Highlights</h2>
              <div className="space-y-4">
                {book.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-border text-center">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 px-6 py-3 bg-card hover:bg-accent transition-colors duration-300 rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Books
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
