'use client'

import { ArrowRight, BookOpen, Calendar, Clock, Star, Tag, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const staticBooks = [
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
  },
  {
    id: 3,
    title: 'System Design Interview',
    author: 'Alex Xu',
    rating: 4,
    readDate: '2024-03-10',
    genre: 'System Design',
    cover: '/images/system-design.jpg',
    summary: 'Büyük ölçekli sistem tasarımı için kapsamlı rehber ve mülakat hazırlığı.',
    tags: ['System Design', 'Interview', 'Architecture'],
    pages: 280,
    readTime: '3 weeks',
    status: 'completed',
  },
  {
    id: 4,
    title: 'Atomic Habits',
    author: 'James Clear',
    rating: 5,
    readDate: '2024-04-05',
    genre: 'Self Development',
    cover: '/images/atomic-habits.jpg',
    summary: 'Küçük değişikliklerle büyük sonuçlar elde etme sanatı.',
    tags: ['Habits', 'Productivity', 'Personal Growth'],
    pages: 320,
    readTime: '1 week',
    status: 'completed',
  },
  {
    id: 5,
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    rating: 5,
    readDate: '2024-05-12',
    genre: 'Database',
    cover: '/images/data-intensive.jpg',
    summary: 'Modern veri sistemlerinin temellerini anlatan kapsamlı rehber.',
    tags: ['Database', 'Distributed Systems', 'Data Engineering'],
    pages: 616,
    readTime: '4 weeks',
    status: 'reading',
  },
  {
    id: 6,
    title: 'The Clean Coder',
    author: 'Robert C. Martin',
    rating: 4,
    readDate: '2024-06-01',
    genre: 'Programming',
    cover: '/images/clean-coder.jpg',
    summary: 'Profesyonel yazılımcı olma yolculuğu ve mesleki etik.',
    tags: ['Programming', 'Professionalism', 'Career'],
    pages: 256,
    readTime: '1.5 weeks',
    status: 'reading',
  },
]

const genres = ['All', 'Programming', 'System Design', 'Database', 'Self Development']
const statuses = ['All', 'completed', 'reading', 'wishlist']

export default function BooksPage() {
  const books = staticBooks
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')

  const filteredBooks = books.filter((book) => {
    const genreMatch = selectedGenre === 'All' || book.genre === selectedGenre
    const statusMatch = selectedStatus === 'All' || book.status === selectedStatus
    return genreMatch && statusMatch
  })

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
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
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl" />

        <div className="container relative z-10 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
            My Reading List
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Books that have shaped my understanding of technology, programming, and personal
            development
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto mt-8 rounded-full" />
        </div>
      </section>

      {/* Filters */}
      <section className="container pb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground">Filter by Genre:</span>
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  selectedGenre === genre
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border hover:border-primary/30'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground">Filter by Status:</span>
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors capitalize ${
                  selectedStatus === status
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border hover:border-primary/30'
                }`}
              >
                {status === 'completed'
                  ? 'Completed'
                  : status === 'reading'
                    ? 'Reading'
                    : status === 'wishlist'
                      ? 'Wishlist'
                      : status}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="container pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book, index) => (
            <article
              key={book.id}
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link href={`/books/${book.id}`}>
                <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:border-primary/30 hover:-translate-y-2">
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Book cover */}
                  <div className="relative h-64 bg-gradient-to-br from-primary/20 to-purple-500/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(book.status)}`}
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
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-1 mb-2">{renderStars(book.rating)}</div>
                    </div>
                  </div>

                  <div className="relative z-10 p-6">
                    {/* Book info */}
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {book.title}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <User className="w-4 h-4" />
                      <span>{book.author}</span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                      {book.summary}
                    </p>

                    {/* Meta info */}
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(book.readDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{book.readTime}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {book.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-secondary/50 backdrop-blur-sm text-secondary-foreground border border-border/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read more */}
                    <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all duration-300">
                      <span>Read Review</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground">Try adjusting your filters to see more books</p>
          </div>
        )}
      </section>
    </div>
  )
}
