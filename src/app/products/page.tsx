'use client'

import { Button } from '@/components/ui/button'
import { ExternalLink, Package } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const productCategories = [
  { id: 'all', label: 'All Products' },
  { id: 'vehicles', label: 'Vehicles' },
  { id: 'computers', label: 'Computers' },
  { id: 'vintage', label: 'Vintage Tech' },
]

const products = [
  {
    id: 1,
    slug: 'quantum-calculator',
    title: 'Quantum Calculator',
    description: 'Advanced quantum physics calculator with interactive visualizations',
    category: 'computers',
    type: 'Software',
    status: 'Live',
    year: '2024',
    price: 'Free',
    image: '🧮',
    color: 'from-blue-500 to-purple-600',
  },
  {
    id: 2,
    slug: 'vintage-typewriter',
    title: 'Vintage Typewriter Collection',
    description: 'Collection of restored vintage typewriters from the 1940s-1960s',
    category: 'vintage',
    type: 'Hardware',
    status: 'Collection',
    year: '1950s',
    price: '€2,500',
    image: '⌨️',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 3,
    slug: 'physics-simulation-engine',
    title: 'Physics Simulation Engine',
    description: 'Real-time physics simulation engine built with WebGL and Three.js',
    category: 'computers',
    type: 'Software',
    status: 'Beta',
    year: '2024',
    price: 'Open Source',
    image: '🔬',
    color: 'from-green-500 to-teal-600',
  },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-green-500/10 text-green-600 border-green-500/20'
      case 'Beta':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case 'Coming Soon':
        return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      case 'Collection':
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
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-500/10 backdrop-blur-sm border border-primary/20 rounded-full">
              <Package className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Digital Products & Collection
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
            My Products
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Software tools, vintage collections, and digital products I've created or collected
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto mt-8 rounded-full" />
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="container">
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 p-1 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl">
            {productCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:border-primary/30 hover:-translate-y-2">
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${product.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Product Header */}
                <div
                  className={`relative h-32 bg-gradient-to-br ${product.color} overflow-hidden flex items-center justify-center`}
                >
                  <div className="text-4xl">{product.image}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(product.status)}`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-background/80 backdrop-blur-sm text-foreground border border-border/50">
                      {product.type}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 p-6">
                  {/* Product Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {product.description}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-4">
                    <span className="px-2 py-1 bg-secondary/50 rounded">{product.year}</span>
                    <span className="px-2 py-1 bg-secondary/50 rounded">{product.category}</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded font-medium">
                      {product.price}
                    </span>
                  </div>

                  {/* Action Button */}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" asChild>
                      <Link href={`/products/${product.slug}`}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
