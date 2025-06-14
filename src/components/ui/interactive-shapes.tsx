'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function InteractiveShapes() {
  const [hoveredShape, setHoveredShape] = useState<number | null>(null)

  const shapes = [
    {
      id: 1,
      type: 'circle',
      size: 80,
      position: { top: '15%', left: '10%' },
      color: 'rgba(34, 197, 94, 0.1)',
      hoverColor: 'rgba(34, 197, 94, 0.3)',
    },
    {
      id: 2,
      type: 'triangle',
      size: 60,
      position: { top: '25%', right: '15%' },
      color: 'rgba(34, 197, 94, 0.08)',
      hoverColor: 'rgba(34, 197, 94, 0.25)',
    },
    {
      id: 3,
      type: 'hexagon',
      size: 70,
      position: { bottom: '20%', left: '8%' },
      color: 'rgba(34, 197, 94, 0.12)',
      hoverColor: 'rgba(34, 197, 94, 0.35)',
    },
    {
      id: 4,
      type: 'square',
      size: 50,
      position: { top: '60%', right: '20%' },
      color: 'rgba(34, 197, 94, 0.06)',
      hoverColor: 'rgba(34, 197, 94, 0.2)',
    },
    {
      id: 5,
      type: 'diamond',
      size: 65,
      position: { bottom: '35%', right: '10%' },
      color: 'rgba(34, 197, 94, 0.1)',
      hoverColor: 'rgba(34, 197, 94, 0.3)',
    },
  ]

  const getShapeComponent = (shape: (typeof shapes)[0]) => {
    const commonProps = {
      width: shape.size,
      height: shape.size,
      style: {
        position: 'absolute' as const,
        ...shape.position,
        cursor: 'pointer',
        userSelect: 'none' as const,
      },
      onMouseEnter: () => setHoveredShape(shape.id),
      onMouseLeave: () => setHoveredShape(null),
    }

    const isHovered = hoveredShape === shape.id
    const currentColor = isHovered ? shape.hoverColor : shape.color

    switch (shape.type) {
      case 'circle':
        return (
          <motion.div
            key={shape.id}
            {...commonProps}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: isHovered ? 1.2 : 1,
              rotate: isHovered ? 180 : 0,
              backgroundColor: currentColor,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              ...commonProps.style,
              borderRadius: '50%',
              backgroundColor: currentColor,
            }}
          />
        )

      case 'triangle':
        return (
          <motion.div
            key={shape.id}
            {...commonProps}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: isHovered ? 1.2 : 1,
              rotate: isHovered ? 120 : 0,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              ...commonProps.style,
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${currentColor}`,
            }}
          />
        )

      case 'hexagon':
        return (
          <motion.div
            key={shape.id}
            {...commonProps}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: isHovered ? 1.2 : 1,
              rotate: isHovered ? 60 : 0,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              ...commonProps.style,
              backgroundColor: currentColor,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          />
        )

      case 'square':
        return (
          <motion.div
            key={shape.id}
            {...commonProps}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: isHovered ? 1.2 : 1,
              rotate: isHovered ? 45 : 0,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              ...commonProps.style,
              backgroundColor: currentColor,
            }}
          />
        )

      case 'diamond':
        return (
          <motion.div
            key={shape.id}
            {...commonProps}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: isHovered ? 1.2 : 1,
              rotate: isHovered ? 90 : 45,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              ...commonProps.style,
              backgroundColor: currentColor,
              transform: 'rotate(45deg)',
            }}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {shapes.map((shape) => (
        <div key={shape.id} className="pointer-events-auto">
          {getShapeComponent(shape)}
        </div>
      ))}

      {/* Interactive Hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="fixed bottom-6 left-6 z-10 pointer-events-auto"
      >
        <div className="bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-lg px-3 py-2 text-xs text-primary font-medium flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          Hover over the shapes to interact
        </div>
      </motion.div>
    </div>
  )
}
