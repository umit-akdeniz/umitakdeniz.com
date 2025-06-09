'use client'

import { useEffect, useRef, useState } from 'react'

interface ParallaxSectionProps {
  children: React.ReactNode
  offset?: number
  className?: string
}

export function ParallaxSection({ children, offset = 0.5, className = '' }: ParallaxSectionProps) {
  const [scrollY, setScrollY] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${scrollY * offset}px)`,
      }}
    >
      {children}
    </div>
  )
}
