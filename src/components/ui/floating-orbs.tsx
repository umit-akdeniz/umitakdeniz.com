'use client'

import { useEffect, useRef } from 'react'

export function FloatingOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const orbs: Array<{
      x: number
      y: number
      radius: number
      dx: number
      dy: number
      hue: number
      opacity: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const createOrb = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 40 + 20,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      hue: Math.random() * 360,
      opacity: Math.random() * 0.3 + 0.1,
    })

    const drawOrb = (orb: typeof orbs[0]) => {
      // Create radial gradient
      const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius)
      gradient.addColorStop(0, `hsla(${orb.hue}, 70%, 60%, ${orb.opacity})`)
      gradient.addColorStop(1, `hsla(${orb.hue}, 70%, 60%, 0)`)

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
      ctx.fill()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      orbs.forEach((orb) => {
        orb.x += orb.dx
        orb.y += orb.dy
        orb.hue += 0.5

        // Bounce off edges
        if (orb.x < 0 || orb.x > canvas.width) orb.dx *= -1
        if (orb.y < 0 || orb.y > canvas.height) orb.dy *= -1

        drawOrb(orb)
      })

      animationId = requestAnimationFrame(animate)
    }

    // Initialize
    resizeCanvas()
    for (let i = 0; i < 6; i++) {
      orbs.push(createOrb())
    }

    window.addEventListener('resize', resizeCanvas)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      style={{ zIndex: -3 }}
    />
  )
}