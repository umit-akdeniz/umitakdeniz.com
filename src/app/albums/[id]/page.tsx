'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, ExternalLink, Heart, Music, Play, Users } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const albums = [
  {
    id: 1,
    slug: 'focus-and-flow',
    title: 'Focus & Flow',
    description: 'Deep work and concentration playlist for coding sessions',
    genre: 'Electronic/Ambient',
    duration: '2h 34m',
    tracks: 28,
    image: '🎵',
    spotify: 'https://spotify.com/playlist/focus-flow',
    youtube: 'https://youtube.com/playlist?list=focus-flow',
    color: 'from-blue-500 to-purple-600',
    fullDescription:
      'This carefully curated playlist is designed for deep focus and sustained concentration during coding sessions. Featuring a blend of ambient electronic music, minimal techno, and atmospheric soundscapes, each track is selected to maintain mental clarity while avoiding distraction. The progression moves from gentle morning motivation through intense afternoon focus to late-night flow states.',
    mood: 'Focused, Calm, Productive',
    created: 'January 2023',
    lastUpdated: 'March 2024',
    totalPlays: '1,247',
    followers: '89',
    featured: [
      { title: 'Weightless', artist: 'Marconi Union', duration: '8:08' },
      { title: 'Avril 14th', artist: 'Aphex Twin', duration: '2:04' },
      { title: 'Ryo', artist: 'Ólafur Arnalds', duration: '3:47' },
      { title: 'On Earth As It Is In Heaven', artist: 'Ólafur Arnalds', duration: '6:21' },
      { title: 'Klara', artist: 'Nils Frahm', duration: '2:45' },
    ],
  },
  {
    id: 2,
    slug: 'physics-vibes',
    title: 'Physics Vibes',
    description: 'Classical and ambient music inspired by the cosmos',
    genre: 'Classical/Ambient',
    duration: '1h 52m',
    tracks: 22,
    image: '🌌',
    spotify: 'https://spotify.com/playlist/physics-vibes',
    youtube: 'https://youtube.com/playlist?list=physics-vibes',
    color: 'from-purple-500 to-pink-600',
    fullDescription:
      "A collection of cosmic classical pieces and ambient compositions that capture the wonder of physics and the universe. From Bach's mathematical precision to Brian Eno's ambient landscapes, this playlist accompanies late-night study sessions and contemplation of the cosmos. Perfect for reading physics papers or pondering the mysteries of quantum mechanics.",
    mood: 'Contemplative, Cosmic, Inspiring',
    created: 'September 2022',
    lastUpdated: 'February 2024',
    totalPlays: '892',
    followers: '156',
    featured: [
      { title: 'Clair de Lune', artist: 'Claude Debussy', duration: '4:38' },
      { title: 'Music for Airports', artist: 'Brian Eno', duration: '17:21' },
      { title: 'The Blue Notebooks', artist: 'Max Richter', duration: '4:12' },
      { title: 'Spiegel im Spiegel', artist: 'Arvo Pärt', duration: '8:00' },
      { title: 'Metamorphosis Two', artist: 'Philip Glass', duration: '5:31' },
    ],
  },
]

export default function AlbumDetailPage() {
  const params = useParams()
  const albumSlug = params.id as string
  const album = albums.find((a) => a.slug === albumSlug)

  if (!album) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Album not found</h1>
        <Link href="/albums">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Albums
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${album.color} opacity-10`} />
        <div className="container relative z-10">
          <Link
            href="/albums"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Albums
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-6 mb-6">
              <div
                className={`w-32 h-32 bg-gradient-to-br ${album.color} rounded-2xl flex items-center justify-center text-6xl shadow-2xl`}
              >
                {album.image}
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">PLAYLIST</div>
                <h1 className="text-5xl font-bold tracking-tight mb-2">{album.title}</h1>
                <p className="text-lg text-muted-foreground mb-4">{album.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{album.tracks} tracks</span>
                  <span>•</span>
                  <span>{album.duration}</span>
                  <span>•</span>
                  <span>{album.followers} followers</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Play className="w-5 h-5 mr-2" fill="currentColor" />
                Play on Spotify
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="w-5 h-5 mr-2" />
                Like
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container pb-20">
        <div className="max-w-4xl grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">About This Playlist</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{album.fullDescription}</p>
            </div>

            {/* Featured Tracks */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Featured Tracks</h2>
              <div className="space-y-3">
                {album.featured.map((track, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 bg-card rounded-lg border hover:bg-accent transition-colors group"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{track.title}</div>
                      <div className="text-sm text-muted-foreground">{track.artist}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{track.duration}</div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-card rounded-xl p-6 border">
              <h3 className="font-semibold mb-4">Playlist Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Genre</span>
                  <span className="text-muted-foreground">{album.genre}</span>
                </div>
                <div className="flex justify-between">
                  <span>Created</span>
                  <span className="text-muted-foreground">{album.created}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated</span>
                  <span className="text-muted-foreground">{album.lastUpdated}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Plays</span>
                  <span className="text-muted-foreground">{album.totalPlays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mood</span>
                  <span className="text-muted-foreground">{album.mood}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                <a href={album.spotify} target="_blank" rel="noopener noreferrer">
                  <Music className="w-4 h-4 mr-2" />
                  Open in Spotify
                </a>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <a href={album.youtube} target="_blank" rel="noopener noreferrer">
                  <Play className="w-4 h-4 mr-2" />
                  Watch on YouTube
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
