'use client'

import { useEffect, useRef } from 'react'

export function GeometricPatterns() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const patterns = svg.querySelectorAll('.animated-pattern')
    
    patterns.forEach((pattern, index) => {
      const animation = pattern.animate([
        { transform: 'rotate(0deg) scale(1)' },
        { transform: `rotate(360deg) scale(${1 + Math.sin(index) * 0.2})` }
      ], {
        duration: 20000 + index * 5000,
        iterations: Infinity,
        easing: 'linear'
      })
    })

  }, [])

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
      style={{ zIndex: -4 }}
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#gradient1)" strokeWidth="1" opacity="0.3"/>
        </pattern>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Rotating Triangles */}
      <g className="animated-pattern" style={{ transformOrigin: '200px 200px' }}>
        <polygon points="200,100 150,200 250,200" fill="none" stroke="url(#gradient1)" strokeWidth="2" opacity="0.6" />
        <polygon points="200,150 175,200 225,200" fill="url(#gradient1)" opacity="0.1" />
      </g>

      <g className="animated-pattern" style={{ transformOrigin: '800px 300px' }}>
        <polygon points="800,200 750,300 850,300" fill="none" stroke="url(#gradient2)" strokeWidth="2" opacity="0.6" />
        <polygon points="800,250 775,300 825,300" fill="url(#gradient2)" opacity="0.1" />
      </g>

      {/* Rotating Hexagons */}
      <g className="animated-pattern" style={{ transformOrigin: '300px 700px' }}>
        <polygon points="300,650 350,675 350,725 300,750 250,725 250,675" fill="none" stroke="url(#gradient1)" strokeWidth="2" opacity="0.5" />
        <polygon points="300,670 330,685 330,715 300,730 270,715 270,685" fill="url(#gradient1)" opacity="0.1" />
      </g>

      <g className="animated-pattern" style={{ transformOrigin: '700px 800px' }}>
        <polygon points="700,750 750,775 750,825 700,850 650,825 650,775" fill="none" stroke="url(#gradient2)" strokeWidth="2" opacity="0.5" />
        <polygon points="700,770 730,785 730,815 700,830 670,815 670,785" fill="url(#gradient2)" opacity="0.1" />
      </g>

      {/* Circles */}
      <g className="animated-pattern" style={{ transformOrigin: '500px 500px' }}>
        <circle cx="500" cy="500" r="50" fill="none" stroke="url(#gradient1)" strokeWidth="2" opacity="0.4" />
        <circle cx="500" cy="500" r="30" fill="url(#gradient1)" opacity="0.1" />
      </g>
    </svg>
  )
}