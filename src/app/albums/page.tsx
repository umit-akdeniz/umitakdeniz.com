import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { Clock, Music, Play } from 'lucide-react'
import Link from 'next/link'

export default async function AlbumsPage() {
  const albums = await prisma.album.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
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
                  className={`relative h-48 bg-gradient-to-br ${album.color || 'from-purple-600 to-pink-600'} overflow-hidden flex items-center justify-center`}
                >
                  <div className="text-6xl">{album.image || '🎵'}</div>
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
                      <span className="font-medium">
                        {(album as any).artist || 'Unknown Artist'}
                      </span>
                      <span>•</span>
                      <span>{(album as any).year || new Date(album.createdAt).getFullYear()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {'★'.repeat((album as any).rating || 5)}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90" asChild>
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
