'use client'

import { Button } from '@/components/ui/button'
import { Clock, Music, Play } from 'lucide-react'
import Link from 'next/link'

const albums = [
  {
    id: 1,
    slug: 'master-of-puppets',
    title: 'Master of Puppets',
    artist: 'Metallica',
    description: 'Third studio album by American heavy metal band Metallica',
    genre: 'Heavy Metal',
    year: '1986',
    duration: '54:47',
    tracks: 8,
    image: '🎸',
    rating: 5,
    label: 'Elektra Records',
    color: 'from-red-600 to-orange-600',
  },
  {
    id: 2,
    slug: 'dark-side-of-the-moon',
    title: 'The Dark Side of the Moon',
    artist: 'Pink Floyd',
    description: 'Eighth studio album by English rock band Pink Floyd',
    genre: 'Progressive Rock',
    year: '1973',
    duration: '42:59',
    tracks: 9,
    image: '🌙',
    rating: 5,
    label: 'Harvest Records',
    color: 'from-purple-600 to-pink-600',
  },
  {
    id: 3,
    slug: 'nevermind',
    title: 'Nevermind',
    artist: 'Nirvana',
    description: 'Second studio album by American rock band Nirvana',
    genre: 'Grunge',
    year: '1991',
    duration: '48:55',
    tracks: 12,
    image: '🎤',
    rating: 5,
    label: 'DGC Records',
    color: 'from-blue-600 to-teal-600',
  },
]

export default function AlbumsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl" />

        <div className="container relative z-10 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-500/10 backdrop-blur-sm border border-primary/20 rounded-full">
              <Music className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Classic Albums
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
            Music Albums
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Classic albums that have shaped music history and continue to inspire generations.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto mt-8 rounded-full" />
        </div>
      </section>

      {/* Albums Grid */}
      <section className="container pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {albums.map((album, index) => (
            <div
              key={album.id}
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:border-primary/30 hover:-translate-y-2">
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${album.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Album Cover */}
                <div
                  className={`relative h-48 bg-gradient-to-br ${album.color} overflow-hidden flex items-center justify-center`}
                >
                  <div className="text-6xl">{album.image}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Play Button Overlay */}
                  <Link
                    href={`/albums/${album.slug}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
                    </div>
                  </Link>

                  {/* Genre Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-background/80 backdrop-blur-sm text-foreground border border-border/50">
                      {album.genre}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 p-6">
                  {/* Album Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {album.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {album.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Music className="w-3 h-3" />
                      <span>{album.tracks} tracks</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{album.duration}</span>
                    </div>
                  </div>

                  {/* Album Details */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{album.artist}</span>
                      <span>•</span>
                      <span>{album.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {'★'.repeat(album.rating)}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    size="sm"
                    className="w-full bg-primary hover:bg-primary/90"
                    asChild
                  >
                    <Link href={`/albums/${album.slug}`}>
                      <Music className="w-4 h-4 mr-2" />
                      View Album
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
