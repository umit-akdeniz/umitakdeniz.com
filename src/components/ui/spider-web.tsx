'use client'

import { useEffect, useRef } from 'react'

export function SpiderWeb() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let mouseX = 0
    let mouseY = 0

    const nodes: Array<{
      x: number
      y: number
      originalX: number
      originalY: number
      vx: number
      vy: number
    }> = []

    const createNodes = () => {
      nodes.length = 0
      const cols = Math.floor(canvas.width / 100)
      const rows = Math.floor(canvas.height / 100)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = (i * canvas.width) / (cols - 1)
          const y = (j * canvas.height) / (rows - 1)
          nodes.push({
            x,
            y,
            originalX: x,
            originalY: y,
            vx: 0,
            vy: 0,
          })
        }
      }
    }

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      createNodes()
    }

    const drawConnections = () => {
      ctx.strokeStyle = '#3b82f6'
      ctx.globalAlpha = 0.15
      ctx.lineWidth = 1

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const drawNodes = () => {
      ctx.fillStyle = '#3b82f6'
      ctx.globalAlpha = 0.6

      nodes.forEach((node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const updateNodes = () => {
      nodes.forEach((node) => {
        const dx = mouseX - node.x
        const dy = mouseY - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const force = (100 - distance) / 100
          node.vx -= (dx / distance) * force * 0.03
          node.vy -= (dy / distance) * force * 0.03
        }

        // Return to original position
        node.vx += (node.originalX - node.x) * 0.02
        node.vy += (node.originalY - node.y) * 0.02

        // Apply velocity
        node.x += node.vx
        node.y += node.vy

        // Damping
        node.vx *= 0.98
        node.vy *= 0.98
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      updateNodes()
      drawConnections()
      drawNodes()
      animationId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    // Initialize
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    canvas.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  )
}