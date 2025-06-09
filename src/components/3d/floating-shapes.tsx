'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { type Mesh, Vector3 } from 'three'

function FloatingShape({
  position,
  geometry,
  speed,
}: { position: Vector3; geometry: string; speed: number }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed
      meshRef.current.rotation.y += speed * 0.8
      meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime + position.x) * 0.3
    }
  })

  const geometryComponent = useMemo(() => {
    switch (geometry) {
      case 'sphere':
        return <sphereGeometry args={[0.5, 16, 16]} />
      case 'box':
        return <boxGeometry args={[0.6, 0.6, 0.6]} />
      case 'octahedron':
        return <octahedronGeometry args={[0.6]} />
      case 'torus':
        return <torusGeometry args={[0.4, 0.2, 8, 16]} />
      default:
        return <sphereGeometry args={[0.5, 16, 16]} />
    }
  }, [geometry])

  return (
    <mesh ref={meshRef} position={position}>
      {geometryComponent}
      <meshStandardMaterial
        color={`hsl(${Math.random() * 360}, 70%, 60%)`}
        transparent
        opacity={0.6}
        roughness={0.3}
        metalness={0.8}
      />
    </mesh>
  )
}

function Scene() {
  const shapes = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      position: new Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 8
      ),
      geometry: ['sphere', 'box', 'octahedron', 'torus'][Math.floor(Math.random() * 4)],
      speed: 0.005 + Math.random() * 0.01,
    }))
  }, [])

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />

      {shapes.map((shape) => (
        <FloatingShape
          key={shape.id}
          position={shape.position}
          geometry={shape.geometry}
          speed={shape.speed}
        />
      ))}
    </>
  )
}

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ background: 'transparent' }}>
        <Scene />
      </Canvas>
    </div>
  )
}
