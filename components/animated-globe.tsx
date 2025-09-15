"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import type { Mesh } from "three"

interface AnimatedGlobeProps {
  isActive: boolean
}

export function AnimatedGlobe({ isActive }: AnimatedGlobeProps) {
  const meshRef = useRef<Mesh>(null)
  const wireframeRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += 0.003
      wireframeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <group>
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 0, 10]} intensity={0.5} color="#a855f7" />

      {/* Main wireframe sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.8} />
      </mesh>

      {/* Secondary inner wireframe */}
      <mesh ref={wireframeRef}>
        <sphereGeometry args={[1.8, 24, 24]} />
        <meshBasicMaterial color="#ec4899" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Glowing outer ring */}
      <mesh>
        <ringGeometry args={[2.2, 2.4, 64]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Particle effects when active */}
      {isActive && (
        <points>
          <sphereGeometry args={[2.5, 100, 100]} />
          <pointsMaterial color="#ec4899" size={0.02} transparent opacity={0.6} />
        </points>
      )}
    </group>
  )
}
