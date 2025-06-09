'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Camera, Download, Heart, MapPin, Share, Tag } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const photos = [
  {
    id: 1,
    slug: 'quantum-physics-lab-setup',
    title: 'Quantum Physics Lab Setup',
    description: 'Our quantum computing research laboratory with state-of-the-art equipment',
    category: 'lab',
    location: 'University Physics Department',
    date: '2024-02-15',
    image: '🔬',
    likes: 42,
    color: 'from-blue-500 to-cyan-600',
    fullDescription:
      'This photograph captures our cutting-edge quantum physics laboratory during a late-night research session. The setup includes a dilution refrigerator operating at millikelvin temperatures, laser systems for qubit manipulation, and complex microwave electronics for quantum control. The blue glow comes from our cryogenic system indicators, creating an otherworldly atmosphere that perfectly represents the frontier nature of quantum research.',
    camera: 'Canon EOS R5',
    lens: 'RF 24-70mm f/2.8',
    settings: 'f/2.8, 1/60s, ISO 3200',
    tags: ['quantum', 'physics', 'laboratory', 'research', 'science', 'technology'],
    story:
      'This image was taken during a breakthrough moment in our quantum error correction experiment. We had been working for weeks to stabilize our qubit system, and this night everything finally came together. The ethereal lighting perfectly captured the magic of that moment when science fiction becomes science fact.',
    technical: {
      Equipment: 'Dilution Refrigerator, Laser Systems',
      Temperature: '10 millikelvin',
      'Research Focus': 'Quantum Error Correction',
      Collaboration: 'University Physics Dept',
      Duration: '18-month project',
      Publication: 'Physical Review Letters (pending)',
    },
  },
  {
    id: 2,
    slug: 'cern-conference-2024',
    title: 'CERN Conference 2024',
    description: 'Presenting research findings at the European Physics Conference',
    category: 'conferences',
    location: 'CERN, Geneva',
    date: '2024-03-20',
    image: '🎤',
    likes: 89,
    color: 'from-purple-500 to-pink-600',
    fullDescription:
      'A moment captured during my presentation at the European Physics Conference at CERN. This photograph shows me presenting our latest findings on machine learning applications in particle physics data analysis. The auditorium was packed with fellow researchers, and the energy in the room was palpable as we discussed the future of AI in high-energy physics.',
    camera: 'Sony A7R IV',
    lens: '70-200mm f/2.8',
    settings: 'f/4, 1/125s, ISO 1600',
    tags: ['CERN', 'conference', 'presentation', 'physics', 'research', 'Geneva'],
    story:
      'This was my first major international conference presentation. I was nervous but excited to share our work with the global physics community. The response was incredible - we had researchers from around the world approaching us afterward to discuss potential collaborations.',
    technical: {
      Event: 'European Physics Conference 2024',
      Audience: '500+ researchers',
      Topic: 'ML in Particle Physics',
      Duration: '45-minute presentation',
      'Follow-up': '12 collaboration requests',
      'Media Coverage': 'Physics Today feature',
    },
  },
]

export default function PhotoDetailPage() {
  const params = useParams()
  const photoSlug = params.id as string
  const photo = photos.find((p) => p.slug === photoSlug)

  if (!photo) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Photo not found</h1>
        <Link href="/photos">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Photos
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${photo.color} opacity-10`} />
        <div className="container relative z-10">
          <Link
            href="/photos"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Photos
          </Link>

          <div className="max-w-6xl mx-auto">
            {/* Main Photo */}
            <div className="mb-8">
              <div
                className={`relative h-96 bg-gradient-to-br ${photo.color} rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl`}
              >
                <div className="text-8xl">{photo.image}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Photo Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 backdrop-blur-sm hover:bg-white"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    {photo.likes}
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 backdrop-blur-sm hover:bg-white"
                  >
                    <Share className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 backdrop-blur-sm hover:bg-white"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>

                {/* Photo Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-4 text-sm mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{photo.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(photo.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Camera className="w-4 h-4" />
                      <span>{photo.camera}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">{photo.title}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{photo.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container pb-20">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Story */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Story Behind the Photo</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{photo.fullDescription}</p>
              <p className="text-muted-foreground leading-relaxed">{photo.story}</p>
            </div>

            {/* Tags */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {photo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/50 text-secondary-foreground rounded-full text-sm"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Details */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Technical Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(photo.technical).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-3 bg-card rounded-lg border">
                    <span className="font-medium">{key}</span>
                    <span className="text-muted-foreground text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Camera Info */}
            <div className="bg-card rounded-xl p-6 border">
              <h3 className="font-semibold mb-4">Camera Settings</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Camera</span>
                  <span className="text-muted-foreground">{photo.camera}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lens</span>
                  <span className="text-muted-foreground">{photo.lens}</span>
                </div>
                <div className="flex justify-between">
                  <span>Settings</span>
                  <span className="text-muted-foreground">{photo.settings}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category</span>
                  <span className="text-muted-foreground capitalize">{photo.category}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full">
                <Heart className="w-4 h-4 mr-2" />
                Like Photo
              </Button>
              <Button className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button className="w-full" variant="outline">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
