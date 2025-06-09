'use client'

import { useEffect, useRef } from 'react'

export function AnimatedCubes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    const cubes: Array<{
      x: number
      y: number
      size: number
      rotation: number
      rotationSpeed: number
      dx: number
      dy: number
      opacity: number
    }> = []

    const createCube = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 30 + 10,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.3 + 0.1,
    })

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const drawCube = (cube: (typeof cubes)[0]) => {
      ctx.save()
      ctx.translate(cube.x, cube.y)
      ctx.rotate(cube.rotation)
      ctx.globalAlpha = cube.opacity

      // Küp çizimi
      const size = cube.size
      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 1

      // Küp kenarları
      ctx.beginPath()
      ctx.rect(-size / 2, -size / 2, size, size)
      ctx.stroke()

      // İç çizgiler
      ctx.beginPath()
      ctx.moveTo(-size / 4, -size / 2)
      ctx.lineTo(-size / 4, size / 2)
      ctx.moveTo(size / 4, -size / 2)
      ctx.lineTo(size / 4, size / 2)
      ctx.moveTo(-size / 2, -size / 4)
      ctx.lineTo(size / 2, -size / 4)
      ctx.moveTo(-size / 2, size / 4)
      ctx.lineTo(size / 2, size / 4)
      ctx.stroke()

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      cubes.forEach((cube) => {
        cube.x += cube.dx
        cube.y += cube.dy
        cube.rotation += cube.rotationSpeed

        // Sınır kontrolü
        if (cube.x < 0 || cube.x > canvas.width) cube.dx *= -1
        if (cube.y < 0 || cube.y > canvas.height) cube.dy *= -1

        drawCube(cube)
      })

      animationId = requestAnimationFrame(animate)
    }

    // Initialize
    resizeCanvas()
    for (let i = 0; i < 8; i++) {
      cubes.push(createCube())
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
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      style={{ zIndex: -1 }}
    />
  )
}
