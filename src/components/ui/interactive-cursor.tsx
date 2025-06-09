'use client'

import { useEffect, useState } from 'react'

export function InteractiveCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)
    const handleMouseOut = () => setIsVisible(false)

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    document.addEventListener('mousemove', updatePosition)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      document.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('mouseout', handleMouseOut)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 transition-all duration-75 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: position.x - 8,
          top: position.y - 8,
          transform: isHovering ? 'scale(2)' : 'scale(1)',
        }}
      >
        <div className="w-4 h-4 bg-primary/30 rounded-full backdrop-blur-sm border border-primary/50" />
      </div>

      <div
        className={`fixed top-0 left-0 pointer-events-none z-40 transition-all duration-150 ${
          isVisible ? 'opacity-30' : 'opacity-0'
        }`}
        style={{
          left: position.x - 20,
          top: position.y - 20,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
        }}
      >
        <div className="w-10 h-10 border border-primary/30 rounded-full" />
      </div>
    </>
  )
}
