"use client"

import { useEffect, useRef } from "react"

export function MixerVisual() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create particles
    const particleCount = 5
    const particles: HTMLDivElement[] = []

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "mixer-particle"
      container.appendChild(particle)
      particles.push(particle)

      // Position particles on orbits
      const orbit = i % 3
      const angle = (i / particleCount) * Math.PI * 2
      const orbitRadius = [42.5, 32.5, 22.5][orbit]
      const x = Math.cos(angle) * orbitRadius
      const y = Math.sin(angle) * orbitRadius

      particle.style.left = `calc(50% + ${x}%)`
      particle.style.top = `calc(50% + ${y}%)`
    }

    // Cleanup
    return () => {
      particles.forEach((particle) => {
        if (container.contains(particle)) {
          container.removeChild(particle)
        }
      })
    }
  }, [])

  return (
    <div className="mixer-container" ref={containerRef}>
      <div className="mixer-visual">
        <div className="mixer-orbit"></div>
        <div className="mixer-orbit"></div>
        <div className="mixer-orbit"></div>
        <div className="mixer-inner">
          <div className="text-primary text-xl font-bold">VANTA</div>
        </div>
      </div>
    </div>
  )
}
