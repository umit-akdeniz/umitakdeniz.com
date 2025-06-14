'use client'

import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  Float,
  MeshWobbleMaterial,
  Sphere,
  Icosahedron,
  Octahedron,
} from '@react-three/drei'
import { useRef } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'

function AtomicStructure() {
  const groupRef = useRef<any>()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Nucleus */}
      <Sphere args={[0.3]} position={[0, 0, 0]}>
        <MeshWobbleMaterial color="#ff6b6b" factor={0.6} speed={2} />
      </Sphere>

      {/* Electron orbits */}
      {[1, 1.5, 2].map((radius, i) => (
        <group key={i}>
          {Array.from({ length: i + 2 }).map((_, j) => {
            const angle = (j / (i + 2)) * Math.PI * 2
            return (
              <Float key={j} speed={1 + i * 0.5} rotationIntensity={0.3} floatIntensity={0.2}>
                <Sphere
                  args={[0.05]}
                  position={[
                    Math.cos(angle) * radius,
                    Math.sin(angle * 0.5) * 0.3,
                    Math.sin(angle) * radius,
                  ]}
                >
                  <meshStandardMaterial color="#4ecdc4" />
                </Sphere>
              </Float>
            )
          })}
        </group>
      ))}
    </group>
  )
}

function GalaxySpiral() {
  const spiralRef = useRef<any>(null)

  useFrame((state) => {
    if (spiralRef.current) {
      spiralRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={spiralRef}>
      {Array.from({ length: 50 }).map((_, i) => {
        const angle = (i / 50) * Math.PI * 6
        const radius = i * 0.1
        return (
          <Float key={i} speed={0.5} rotationIntensity={0.1}>
            <Sphere
              args={[0.02 + Math.random() * 0.03]}
              position={[
                Math.cos(angle) * radius,
                (Math.random() - 0.5) * 0.5,
                Math.sin(angle) * radius,
              ]}
            >
              <meshStandardMaterial
                color={`hsl(${240 + i * 2}, 70%, ${60 + Math.random() * 20}%)`}
                emissive={`hsl(${240 + i * 2}, 50%, ${10 + Math.random() * 10}%)`}
              />
            </Sphere>
          </Float>
        )
      })}
    </group>
  )
}

function MolecularStructure() {
  const moleculeRef = useRef<any>()

  useFrame((state) => {
    if (moleculeRef.current) {
      moleculeRef.current.rotation.y = state.clock.elapsedTime * 0.2
      moleculeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.2
    }
  })

  return (
    <group ref={moleculeRef}>
      {/* Central molecule */}
      <Icosahedron args={[0.4]} position={[0, 0, 0]}>
        <MeshWobbleMaterial color="#a8e6cf" factor={0.3} speed={1} />
      </Icosahedron>

      {/* Surrounding atoms */}
      {[
        [1.2, 0, 0],
        [-1.2, 0, 0],
        [0, 1.2, 0],
        [0, -1.2, 0],
        [0, 0, 1.2],
        [0, 0, -1.2],
      ].map((pos, i) => (
        <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.2}>
          <Octahedron args={[0.2]} position={pos as [number, number, number]}>
            <meshStandardMaterial color="#ffd93d" />
          </Octahedron>
        </Float>
      ))}

      {/* Bonds */}
      {[
        [1.2, 0, 0],
        [-1.2, 0, 0],
        [0, 1.2, 0],
        [0, -1.2, 0],
        [0, 0, 1.2],
        [0, 0, -1.2],
      ].map((pos, i) => (
        <mesh key={`bond-${i}`} position={[pos[0] * 0.5, pos[1] * 0.5, pos[2] * 0.5]}>
          <cylinderGeometry args={[0.02, 0.02, 0.8]} />
          <meshStandardMaterial color="#666" opacity={0.7} transparent />
        </mesh>
      ))}
    </group>
  )
}

export function PhysicsShapes() {
  return (
    <div className="w-full h-96 relative">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4ecdc4" />

        <group position={[-3, 0, 0]}>
          <AtomicStructure />
        </group>

        <group position={[3, 0, 0]} scale={0.3}>
          <GalaxySpiral />
        </group>

        <group position={[0, -2, 0]} scale={0.8}>
          <MolecularStructure />
        </group>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
        Physics • Computer Science • Astronomy
      </div>
    </div>
  )
}
