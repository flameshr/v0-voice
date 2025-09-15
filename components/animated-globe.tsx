"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import type { Mesh, Points } from "three"

interface AnimatedGlobeProps {
  isActive: boolean
}

export function AnimatedGlobe({ isActive }: AnimatedGlobeProps) {
  const meshRef = useRef<Mesh>(null)
  const particlesRef = useRef<Points>(null)
  const wireframeRef = useRef<Mesh>(null)

  const wireframeGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const radius = 2

    // Create flowing meridian lines (longitude)
    for (let i = 0; i < 12; i++) {
      const phi = (i / 12) * Math.PI * 2
      for (let j = 0; j <= 50; j++) {
        const theta = (j / 50) * Math.PI
        const x = radius * Math.sin(theta) * Math.cos(phi)
        const y = radius * Math.cos(theta)
        const z = radius * Math.sin(theta) * Math.sin(phi)
        vertices.push(x, y, z)
      }
    }

    // Create flowing latitude lines
    for (let i = 0; i < 8; i++) {
      const theta = ((i + 1) / 9) * Math.PI
      const currentRadius = radius * Math.sin(theta)
      const y = radius * Math.cos(theta)

      for (let j = 0; j <= 40; j++) {
        const phi = (j / 40) * Math.PI * 2
        const x = currentRadius * Math.cos(phi)
        const z = currentRadius * Math.sin(phi)
        vertices.push(x, y, z)
      }
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [])

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const colors = []

    for (let i = 0; i < 1000; i++) {
      // Random positions around the sphere
      const radius = 2.5 + Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.cos(phi)
      const z = radius * Math.sin(phi) * Math.sin(theta)

      vertices.push(x, y, z)

      // Purple to pink gradient colors
      const color = new THREE.Color()
      color.setHSL(0.8 - Math.random() * 0.1, 0.8, 0.6)
      colors.push(color.r, color.g, color.b)
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))
    return geometry
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const amplitude = isActive ? 1 + Math.sin(time * 8) * 0.3 : 1

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.008
      meshRef.current.scale.setScalar(amplitude)

      // Gentle floating motion
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.1
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= 0.005
      wireframeRef.current.rotation.x = Math.sin(time * 0.3) * 0.1
    }

    if (particlesRef.current && isActive) {
      particlesRef.current.rotation.y += 0.002
      particlesRef.current.rotation.x += 0.001

      // Animate particle positions for flowing effect
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time * 2 + positions[i]) * 0.002
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 8]} intensity={1.5} color="#a855f7" />
      <pointLight position={[0, 0, -8]} intensity={0.8} color="#ec4899" />

      <mesh ref={meshRef}>
        <primitive object={wireframeGeometry} />
        <lineBasicMaterial color="#a855f7" transparent opacity={0.9} />
      </mesh>

      <mesh ref={wireframeRef}>
        <sphereGeometry args={[1.6, 16, 12]} />
        <meshBasicMaterial color="#ec4899" wireframe transparent opacity={0.3} />
      </mesh>

      <points ref={particlesRef}>
        <primitive object={particleGeometry} />
        <pointsMaterial
          size={0.015}
          transparent
          opacity={isActive ? 0.8 : 0.4}
          vertexColors
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={isActive ? 0.1 : 0.05} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}
