import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { ArrowLeft, Calendar, ExternalLink, MapPin, Package, Star } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

async function getProduct(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        author: {
          select: { name: true },
        },
      },
    })
    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Live':
      return 'bg-green-500/10 text-green-600 border-green-500/20'
    case 'Beta':
      return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
    case 'Coming Soon':
      return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
    default:
      return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${product.color || 'from-blue-500/10 to-purple-600/10'}`}
        />

        <div className="container relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/products">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div
              className={`relative h-96 bg-gradient-to-br ${product.color || 'from-blue-500 to-purple-600'} rounded-3xl overflow-hidden flex items-center justify-center`}
            >
              <div className="text-8xl">{product.image || '📦'}</div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
                  {product.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                {product.year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{product.year}</span>
                  </div>
                )}
                {product.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{product.location}</span>
                  </div>
                )}
                {product.condition && (
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span>{product.condition}</span>
                  </div>
                )}
                {product.price && (
                  <div className="text-2xl font-bold text-primary">{product.price}</div>
                )}
              </div>

              {/* Status & Type */}
              <div className="flex gap-3">
                <span
                  className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(product.status)}`}
                >
                  {product.status}
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-secondary/50 text-secondary-foreground">
                  {product.type}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="container py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Full Description */}
          {product.fullDescription && (
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Detailed Description</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">{product.fullDescription}</p>
              </div>
            </div>
          )}

          {/* History */}
          {product.history && (
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">History & Background</h2>
              <p className="text-muted-foreground leading-relaxed">{product.history}</p>
            </div>
          )}

          {/* Specifications */}
          {product.specs && (
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specs as Record<string, any>).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border/30">
                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-muted-foreground">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{product.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span>{product.status}</span>
                </div>
                {product.acquired && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Acquired:</span>
                    <span>{product.acquired}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span>{product.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
