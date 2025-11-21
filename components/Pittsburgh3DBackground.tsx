'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Pittsburgh3DBackgroundProps {
  className?: string
}

export default function Pittsburgh3DBackground({ className = '' }: Pittsburgh3DBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Pittsburgh-themed colors (black, gold, steel gray)
    const pittsburghGold = new THREE.Color(0xFDB927)
    const pittsburghBlack = new THREE.Color(0x000000)
    const steelGray = new THREE.Color(0x5A5A5A)

    // Create floating particles representing Pittsburgh's energy
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 100
    const positions = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      color: pittsburghGold,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Create subtle geometric shapes representing Pittsburgh's bridges/rivers
    const bridgeGeometry = new THREE.BoxGeometry(0.1, 0.1, 2)
    const bridgeMaterial = new THREE.MeshBasicMaterial({
      color: steelGray,
      transparent: true,
      opacity: 0.3,
    })

    const bridges: THREE.Mesh[] = []
    for (let i = 0; i < 5; i++) {
      const bridge = new THREE.Mesh(bridgeGeometry, bridgeMaterial.clone())
      bridge.position.x = (Math.random() - 0.5) * 8
      bridge.position.y = (Math.random() - 0.5) * 4
      bridge.rotation.z = Math.random() * Math.PI * 2
      scene.add(bridge)
      bridges.push(bridge)
    }

    // Create golden orbs representing Pittsburgh's landmarks
    const landmarkGeometry = new THREE.SphereGeometry(0.15, 16, 16)
    const landmarkMaterial = new THREE.MeshBasicMaterial({
      color: pittsburghGold,
      transparent: true,
      opacity: 0.4,
    })

    const landmarks: THREE.Mesh[] = []
    for (let i = 0; i < 8; i++) {
      const landmark = new THREE.Mesh(landmarkGeometry, landmarkMaterial.clone())
      landmark.position.x = (Math.random() - 0.5) * 10
      landmark.position.y = (Math.random() - 0.5) * 6
      landmark.position.z = (Math.random() - 0.5) * 4
      scene.add(landmark)
      landmarks.push(landmark)
    }

    // Animation
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)

      // Rotate particles slowly
      particles.rotation.y += 0.001
      particles.rotation.x += 0.0005

      // Animate bridges (subtle movement)
      bridges.forEach((bridge, index) => {
        bridge.rotation.z += 0.0005 * (index % 2 === 0 ? 1 : -1)
        bridge.position.y += Math.sin(Date.now() * 0.001 + index) * 0.0001
      })

      // Animate landmarks (gentle floating)
      landmarks.forEach((landmark, index) => {
        landmark.position.y += Math.sin(Date.now() * 0.001 + index) * 0.0005
        landmark.rotation.x += 0.002
        landmark.rotation.y += 0.003
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      rendererRef.current.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      )
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
      rendererRef.current?.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      bridgeGeometry.dispose()
      bridgeMaterial.dispose()
      landmarkGeometry.dispose()
      landmarkMaterial.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  )
}

