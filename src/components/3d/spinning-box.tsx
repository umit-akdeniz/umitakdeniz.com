"use client" // 3D sahneler ve interaktivite istemci tarafında çalışır

import { useRef } from 'react'
import * as THREE from 'three' // <--- EKLENEN SATIR
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial } from '@react-three/drei'

function Scene() {
  const meshRef = useRef<THREE.Mesh>(null!)

  // Her karede objeyi yavaşça döndürmek için
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <>
      {/* Sahnenin ışıkları */}
      <ambientLight intensity={1} />
      <directionalLight position={[0, 2, 5]} intensity={1.5} />

      {/* 3D Objemiz */}
      <mesh ref={meshRef}>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <MeshDistortMaterial
          color="#8A2BE2" // Küpün rengi (mor)
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.1}
        />
      </mesh>

      {/* Kamera Kontrolü (fare ile döndürme/yakınlaştırma) */}
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export function SpinningBox() {
  return (
    <div className="h-[400px] w-full md:h-[500px]">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  )
}