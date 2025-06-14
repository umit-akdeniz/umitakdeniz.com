'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function QuantumField() {
  const pointsRef = useRef<any>(null)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1000 * 3)
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05

      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i]) * 0.001
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={pointsRef} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4ecdc4"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors={false}
      />
    </Points>
  )
}

function WaveFunction() {
  const meshRef = useRef<any>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array
      const time = state.clock.elapsedTime

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const z = positions[i + 2]
        const distance = Math.sqrt(x * x + z * z)
        positions[i + 1] = Math.sin(distance * 0.5 - time * 2) * 0.3
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true
      meshRef.current.geometry.computeVertexNormals()
    }
  })

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(8, 8, 50, 50)
    return geo
  }, [])

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <meshStandardMaterial color="#a8e6cf" wireframe transparent opacity={0.6} />
    </mesh>
  )
}

export function QuantumFieldVisualization() {
  return (
    <div className="w-full h-80 relative overflow-hidden rounded-lg">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 5, 0]} intensity={0.8} color="#4ecdc4" />
        <pointLight position={[5, 0, 5]} intensity={0.5} color="#ff6b6b" />

        <QuantumField />
        <WaveFunction />
      </Canvas>

      <div className="absolute top-4 right-4 text-xs text-muted-foreground font-mono">
        QUANTUM FIELD SIMULATION
      </div>
    </div>
  )
}
